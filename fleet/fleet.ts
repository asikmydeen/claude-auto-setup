#!/usr/bin/env bun
// Fleet — Multi-Account Worker Orchestration
//
// Usage:
//   bun fleet/fleet.ts --pool tasks.json [--workers 4]
//   bun fleet/fleet.ts --scatter "prompt" [--workers 4] [--strategy best|merge|all]
//   bun fleet/fleet.ts --decompose "complex task" [--workers 4]
//   bun fleet/fleet.ts --pipeline "task" --stages research,implement,test,review
//   bun fleet/fleet.ts --status
//   bun fleet/fleet.ts --init
//   bun fleet/fleet.ts --kill
//   bun fleet/fleet.ts --accounts

import { readFileSync, existsSync, writeFileSync, mkdirSync } from "fs";
import { join, resolve } from "path";
import { createHash } from "crypto";
import { execFileSync } from "child_process";
import { AccountPool, loadFleetConfig, initFleetConfig } from "./pool";
import { WorkerManager, selectProviderForTask, isLocalProvider, findSuperpowersSkills, getAccountProviders } from "./worker";
import {
  createRun, updateRunStatus, getRecentRuns, getRunsByProject, getTasksByRun,
  createFleetTask, updateFleetTask,
  createWorkerRecord, updateWorkerRecord,
  getCachedIntel, getCachedIntelByRoot, cacheIntel, cacheIntelFailure, listCachedIntel,
} from "./db";
import type { FleetConfig, FleetTask, FleetRunResult, ScatterStrategy, FleetWorker } from "./types";
import { onFleetStart, onTaskComplete, onAccountCooldown, onFleetComplete } from "./bridge";
import { runSetup, addAccount, loadFromCsv } from "./setup";

// --- Logging ---
const DIM = "\x1b[2m";
const RESET = "\x1b[0m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const RED = "\x1b[31m";
const CYAN = "\x1b[36m";
const BOLD = "\x1b[1m";

const info = (msg: string) => console.error(`${DIM}[fleet]${RESET} ${msg}`);
const ok = (msg: string) => console.error(`${GREEN}[fleet]${RESET} ${msg}`);
const warn = (msg: string) => console.error(`${YELLOW}[fleet]${RESET} ${msg}`);
const error = (msg: string) => console.error(`${RED}[fleet]${RESET} ${msg}`);

function generateId(): string {
  return `fleet-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

// ============================================================================
// PROJECT FINGERPRINTING — identify projects by content, not path
// ============================================================================

/** Track already-ensured projects within this process to prevent double-calls. */
const _ensuredProjects = new Set<string>();

/**
 * Generate a stable fingerprint for a project directory.
 * Priority: git remote URL > manifest file content > fallback to path.
 * Same repo from different paths (symlinks, worktrees) → same fingerprint.
 */
function projectFingerprint(projectRoot: string): { fingerprint: string; gitRemote: string | null; fileHash: string } {
  let gitRemote: string | null = null;

  // 1. Try git remote URL (same repo = same intel regardless of checkout path)
  try {
    gitRemote = execFileSync("git", ["-C", projectRoot, "remote", "get-url", "origin"], {
      encoding: "utf-8", timeout: 3000, stdio: ["pipe", "pipe", "pipe"],
    }).trim();
    if (gitRemote) {
      const hash = createHash("sha256").update(gitRemote).digest("hex").slice(0, 16);
      return { fingerprint: hash, gitRemote, fileHash: hash };
    }
  } catch { /* not a git repo or no remote */ }

  // 2. Hash key manifest file (package.json, Cargo.toml, etc.)
  const markers = ["package.json", "Cargo.toml", "go.mod", "pyproject.toml", "pom.xml", "build.gradle", "Gemfile", "composer.json", "mix.exs"];
  for (const m of markers) {
    const p = join(projectRoot, m);
    if (existsSync(p)) {
      try {
        const content = readFileSync(p, "utf-8").slice(0, 1000); // First 1KB — enough for name+version
        const hash = createHash("sha256").update(content).digest("hex").slice(0, 16);
        return { fingerprint: hash, gitRemote: null, fileHash: hash };
      } catch { /* unreadable */ }
    }
  }

  // 3. Fallback: resolve path (handles symlinks) and hash it
  let resolved = projectRoot;
  try {
    resolved = execFileSync("realpath", [projectRoot], {
      encoding: "utf-8", timeout: 2000, stdio: ["pipe", "pipe", "pipe"],
    }).trim();
  } catch { /* realpath not available — use raw path */ }
  const hash = createHash("sha256").update(resolved).digest("hex").slice(0, 16);
  return { fingerprint: hash, gitRemote: null, fileHash: hash };
}

/**
 * Check if a project directory looks empty (no source files worth scanning).
 * Prevents wasting an account on intel generation for /tmp test dirs.
 */
function isEmptyProject(projectRoot: string): boolean {
  const indicators = [
    "package.json", "Cargo.toml", "go.mod", "pyproject.toml", "pom.xml",
    "Makefile", "CMakeLists.txt", "build.gradle", "Gemfile", "composer.json",
    "mix.exs", "setup.py", "requirements.txt", "tsconfig.json", ".gitignore",
    "src", "lib", "app", "cmd", "internal",
  ];
  for (const f of indicators) {
    if (existsSync(join(projectRoot, f))) return false;
  }
  return true;
}

// ============================================================================
// PRE-FLIGHT: Ensure project has intel before dispatching
// ============================================================================

async function ensureProjectIntel(
  config: FleetConfig,
  projectRoot: string,
  workers: WorkerManager,
): Promise<void> {
  // Dedup: skip if already ensured this run (fixes superpowers double-call)
  if (_ensuredProjects.has(projectRoot)) return;

  const intelPath = join(projectRoot, ".claude", "rules", "project-intel.md");
  const patternsPath = join(projectRoot, ".claude", "rules", "codebase-patterns.md");

  // 1. Check filesystem first (zero-cost if file exists)
  if (existsSync(intelPath)) {
    ok("Project intel: found on disk");
    _ensuredProjects.add(projectRoot);

    // Opportunistically cache to DB for future cross-path lookups
    const { fingerprint, gitRemote, fileHash } = projectFingerprint(projectRoot);
    const cached = getCachedIntel(fingerprint);
    if (!cached) {
      try {
        cacheIntel({
          fingerprint, projectRoot, gitRemote,
          intelContent: readFileSync(intelPath, "utf-8"),
          patternsContent: existsSync(patternsPath) ? readFileSync(patternsPath, "utf-8") : null,
          fileHash,
        });
      } catch { /* non-critical — DB write failure shouldn't block fleet */ }
    }
    return;
  }

  // 2. Check DB cache by fingerprint (cross-path dedup)
  const { fingerprint, gitRemote, fileHash } = projectFingerprint(projectRoot);
  const cached = getCachedIntel(fingerprint);

  if (cached) {
    if (cached.generation_status === "success" && cached.intel_content) {
      // Cache hit — write to disk and return
      mkdirSync(join(projectRoot, ".claude", "rules"), { recursive: true });
      writeFileSync(intelPath, cached.intel_content);
      if (cached.patterns_content) {
        writeFileSync(patternsPath, cached.patterns_content);
      }
      ok(`Project intel: restored from cache (fingerprint: ${fingerprint.slice(0, 8)})`);
      _ensuredProjects.add(projectRoot);
      return;
    }

    if (cached.generation_status === "failed" || cached.generation_status === "empty_project") {
      // Negative cache hit — don't waste an account retrying
      info(`Project intel: skipped (${cached.generation_status}, cached ${cached.generated_at.slice(0, 16)})`);
      _ensuredProjects.add(projectRoot);
      return;
    }
  }

  // Also check by project root path (fallback if fingerprint changed)
  const cachedByRoot = getCachedIntelByRoot(projectRoot);
  if (cachedByRoot && cachedByRoot.generation_status === "success" && cachedByRoot.intel_content) {
    mkdirSync(join(projectRoot, ".claude", "rules"), { recursive: true });
    writeFileSync(intelPath, cachedByRoot.intel_content);
    if (cachedByRoot.patterns_content) {
      writeFileSync(patternsPath, cachedByRoot.patterns_content);
    }
    ok(`Project intel: restored from cache (path match)`);
    _ensuredProjects.add(projectRoot);
    return;
  }

  // 3. Empty project check — don't waste an account
  if (isEmptyProject(projectRoot)) {
    info("Project intel: empty project detected, skipping generation");
    cacheIntelFailure({ fingerprint, projectRoot, gitRemote, fileHash, status: "empty_project" });
    _ensuredProjects.add(projectRoot);
    return;
  }

  // 4. Generate via worker (no cache hit, non-empty project)
  info("No project-intel.md found — generating before dispatch...");

  const pool = new AccountPool(config);
  const account = pool.allocate("fleet-init");
  if (!account) {
    warn("No accounts available for intel generation — proceeding without intel");
    _ensuredProjects.add(projectRoot);
    return;
  }

  const initPrompt = `You are initializing a project. Scan the codebase and create a project intelligence file.

1. Explore the directory structure, key files, and architecture
2. Identify the tech stack, build commands, test commands
3. Write a concise project-intel.md to .claude/rules/project-intel.md

Keep it under 200 lines. Focus on: stack, architecture, key directories, build/test commands, API surface, known gotchas.
Create the .claude/rules/ directory if it doesn't exist.`;

  const outputDir = join(projectRoot, ".fleet", "init");
  mkdirSync(outputDir, { recursive: true });

  workers.run({
    account: account.account,
    taskId: "fleet-init",
    prompt: initPrompt,
    projectRoot,
    outputDir,
    provider: "claude",
  });

  info("Generating project intel (this runs once per project, cached for 24 hours)...");
  const result = await workers.waitForContainer("fleet-init");
  pool.release(account.account.id, result?.exitCode === 0);

  if (result?.exitCode === 0 && existsSync(intelPath)) {
    ok("Project intel: generated and cached");
    // Cache the generated intel
    try {
      cacheIntel({
        fingerprint, projectRoot, gitRemote,
        intelContent: readFileSync(intelPath, "utf-8"),
        patternsContent: existsSync(patternsPath) ? readFileSync(patternsPath, "utf-8") : null,
        fileHash,
      });
    } catch { /* non-critical */ }
  } else {
    warn("Intel generation incomplete — fleet will proceed without it");
    cacheIntelFailure({ fingerprint, projectRoot, gitRemote, fileHash, status: "failed" });
  }

  _ensuredProjects.add(projectRoot);
}

// ============================================================================
// MODE 1: POOL — Worker pool processes a queue of independent tasks
// ============================================================================

async function runPool(
  config: FleetConfig,
  tasksInput: Array<{ prompt: string; taskType?: string }>,
  workers: number,
  projectRoot: string,
): Promise<FleetRunResult> {
  const pool = new AccountPool(config);
  const workerMgr = new WorkerManager(config.settings);
  const runId = generateId();
  const startedAt = new Date().toISOString();
  const outputBase = join(projectRoot, ".fleet", runId);

  mkdirSync(outputBase, { recursive: true });
  workerMgr.prepareFleetConfig(outputBase);
  createRun(runId, "pool", `Pool: ${tasksInput.length} tasks`, workers, projectRoot);

  // Pre-flight: ensure project has intel
  await ensureProjectIntel(config, projectRoot, workerMgr);

  console.error(`\n${BOLD}Run: ${CYAN}${runId}${RESET}  ${DIM}(fleet --live to monitor from another terminal)${RESET}`);
  info(`Pool mode: ${tasksInput.length} tasks, ${workers} workers, ${pool.size} accounts`);
  info(`Output: ${outputBase}`);
  onFleetStart("pool", tasksInput.length, workers);

  // Graceful shutdown on Ctrl+C — kill all workers
  const cleanup = () => {
    console.error(`\n${YELLOW}[fleet]${RESET} Ctrl+C — killing workers...`);
    workerMgr.killAll();
    updateRunStatus(runId, "failed", { total: tasks.length, completed: 0, failed: 0, requeued: 0 });
    process.exit(130);
  };
  process.on("SIGINT", cleanup);
  process.on("SIGTERM", cleanup);

  // Create all tasks in DB
  const tasks: FleetTask[] = tasksInput.map((t, i) => {
    const id = `${runId}-t${String(i).padStart(3, "0")}`;
    createFleetTask(id, runId, t.prompt, t.taskType || "general", "pool");
    return {
      id, prompt: t.prompt, taskType: t.taskType || "general", mode: "pool" as const,
      status: "pending" as const, accountId: null, workerId: null,
      parentTaskId: null, stage: null, result: null, error: null,
      startedAt: null, completedAt: null, attemptedAccounts: [],
    };
  });

  // Process queue
  const pending = [...tasks];
  const running: Map<string, { task: FleetTask; accountId: string }> = new Map();
  const completed: FleetTask[] = [];
  const failed: FleetTask[] = [];
  let requeued = 0;

  try {
  while (pending.length > 0 || running.size > 0) {
    // Dispatch tasks to available accounts (up to worker limit)
    while (pending.length > 0 && running.size < workers) {
      if (pool.spawnLimitReached) {
        warn("Spawn safety limit reached — stopping dispatch");
        break;
      }
      const nextTask = pending[0];
      const account = pool.allocate(nextTask.id, nextTask.attemptedAccounts);
      if (!account) break; // No accounts available

      const task = pending.shift()!;
      task.accountId = account.account.id;
      task.status = "allocated";
      task.startedAt = new Date().toISOString();

      updateFleetTask(task.id, {
        status: "allocated",
        account_id: account.account.id,
        started_at: task.startedAt,
      });

      const outputDir = join(outputBase, task.id);
      const provider = selectProviderForTask(account.account, task.taskType);
      const local = isLocalProvider(provider);
      info(`[${task.id}] → ${account.account.label} (${provider}${local ? ", local" : ""}) | ${task.prompt.slice(0, 60)}...`);

      let worker: FleetWorker;
      if (local) {
        worker = workerMgr.runLocal({ taskId: task.id, prompt: task.prompt, projectRoot, provider });
      } else {
        worker = workerMgr.run({
          account: account.account,
          taskId: task.id,
          prompt: task.prompt,
          projectRoot,
          outputDir,
          provider,
        });
      }

      task.workerId = worker.id;
      pool.setWorker(account.account.id, worker.id);

      createWorkerRecord(`${worker.id}-${Date.now()}`, task.id, account.account.id, worker.pid, worker.worktreePath);
      updateFleetTask(task.id, { status: "running", worker_id: worker.id });
      task.status = "running";

      running.set(task.id, { task, accountId: account.account.id });
    }

    if (running.size === 0 && pending.length > 0) {
      // All accounts busy or in cooldown — wait (event-driven)
      info(`Waiting for account... (${pending.length} pending, ${pool.counts().cooldown} cooling down)`);
      await pool.waitForAvailable(30_000);
      continue;
    }

    if (running.size === 0) break; // All done

    // Event-driven: wait for ANY worker to complete (no polling delay)
    const result = await workerMgr.waitForAnyCompletion();
    if (!result) continue;

    // Find the running entry for this completed worker
    const taskId = result.taskId;
    const entry = running.get(taskId);
    if (!entry) continue; // Shouldn't happen, but safety

    const success = result.exitCode === 0;
    const isRateLimited = WorkerManager.isRateLimited(result.output || "", result.error || "");

    entry.task.completedAt = new Date().toISOString();

    if (isRateLimited) {
      warn(`[${taskId}] Rate limited on ${entry.accountId} — requeuing`);
      pool.cooldown(entry.accountId);
      onAccountCooldown(entry.accountId);
      entry.task.attemptedAccounts.push(entry.accountId);
      entry.task.status = "pending";
      entry.task.accountId = null;
      entry.task.workerId = null;
      pending.push(entry.task);
      requeued++;
      updateFleetTask(taskId, { status: "pending" });
    } else if (success) {
      entry.task.status = "completed";
      entry.task.result = result.output;
      completed.push(entry.task);
      pool.release(entry.accountId, true);
      ok(`[${taskId}] Completed (${entry.accountId})`);
      onTaskComplete(taskId, completed.length, tasks.length, "pool", true);

      updateFleetTask(taskId, {
        status: "completed",
        result: result.output,
        completed_at: entry.task.completedAt,
      });

      const resultPath = join(outputBase, `${taskId}.txt`);
      writeFileSync(resultPath, result.output || "(no output)");
    } else {
      entry.task.status = "failed";
      entry.task.error = result.error;
      failed.push(entry.task);
      pool.release(entry.accountId, false);
      error(`[${taskId}] Failed (exit ${result.exitCode})`);
      onTaskComplete(taskId, completed.length + failed.length, tasks.length, "pool", false);

      updateFleetTask(taskId, {
        status: "failed",
        error: result.error,
        completed_at: entry.task.completedAt,
      });
    }

    updateWorkerRecord(result.id, result.status, result.exitCode);
    running.delete(taskId);
  }
  } finally {
    // Cleanup handled by WorkerManager
  }

  const summary = { total: tasks.length, completed: completed.length, failed: failed.length, requeued };
  updateRunStatus(runId, failed.length === tasks.length ? "failed" : "completed", summary);
  onFleetComplete("pool", completed.length, failed.length, tasks.length);

  const runResult: FleetRunResult = {
    mode: "pool",
    tasks,
    startedAt,
    completedAt: new Date().toISOString(),
    summary,
  };

  printSummary(runResult, pool);
  return runResult;
}

// ============================================================================
// MODE 2: SCATTER — Same task to N workers, collect all results
// ============================================================================

async function runScatter(
  config: FleetConfig,
  prompt: string,
  workers: number,
  strategy: ScatterStrategy,
  projectRoot: string,
): Promise<FleetRunResult> {
  info(`Scatter mode: "${prompt.slice(0, 60)}..." → ${workers} workers (strategy: ${strategy})`);

  // Create N identical tasks
  const tasks = Array.from({ length: workers }, (_, i) => ({
    prompt: `${prompt}\n\n[Worker ${i + 1}/${workers} — provide your independent analysis]`,
    taskType: "general",
  }));

  // Run as pool (same dispatch logic)
  const result = await runPool(config, tasks, workers, projectRoot);
  result.mode = "scatter";

  // Merge results based on strategy
  const outputs = result.tasks
    .filter((t) => t.status === "completed" && t.result)
    .map((t, i) => `## Worker ${i + 1}\n\n${t.result}`);

  if (outputs.length === 0) {
    warn("No workers completed successfully");
    return result;
  }

  switch (strategy) {
    case "all":
      result.mergedResult = outputs.join("\n\n---\n\n");
      break;
    case "best":
      // Use the longest output as "best" (heuristic — more thorough = longer)
      result.mergedResult = outputs.reduce((a, b) => (a.length > b.length ? a : b));
      break;
    case "merge":
      result.mergedResult =
        `# Merged Results (${outputs.length} workers)\n\n` + outputs.join("\n\n---\n\n");
      break;
  }

  if (result.mergedResult) {
    const outPath = join(projectRoot, ".fleet", "scatter-result.md");
    writeFileSync(outPath, result.mergedResult);
    ok(`Merged result written to ${outPath}`);
  }

  return result;
}

// ============================================================================
// MODE 3: DECOMPOSE — Split task into subtasks, one per worker
// ============================================================================

async function runDecompose(
  config: FleetConfig,
  prompt: string,
  workers: number,
  projectRoot: string,
): Promise<FleetRunResult> {
  info(`Decompose mode: splitting task into ${workers} subtasks...`);

  // Phase 1: Use one account to decompose the task
  const decomposePrompt = `You are a task decomposer. Break the following task into exactly ${workers} independent subtasks that can be worked on in parallel by different workers. Each subtask should be self-contained.

Task: ${prompt}

Output ONLY a JSON array of objects with "prompt" and "taskType" fields. taskType must be one of: frontend, backend, api, test, docs, infra, devops, security, general.

Example:
[
  {"prompt": "Implement the user authentication module with JWT tokens", "taskType": "backend"},
  {"prompt": "Create the login and registration UI components", "taskType": "frontend"},
  {"prompt": "Write unit and integration tests for auth flow", "taskType": "test"}
]

Output the JSON array and nothing else.`;

  const pool = new AccountPool(config);
  const workerMgr = new WorkerManager(config.settings);

  // Allocate one account for decomposition
  const decompAccount = pool.allocate("decompose-planning");
  if (!decompAccount) {
    error("No accounts available for task decomposition");
    return {
      mode: "decompose", tasks: [], startedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(), summary: { total: 0, completed: 0, failed: 0, requeued: 0 },
    };
  }

  const decompOutputDir = join(projectRoot, ".fleet", "decompose-plan");
  mkdirSync(decompOutputDir, { recursive: true });
  workerMgr.prepareFleetConfig(decompOutputDir);

  info("Phase 1: Decomposing task...");
  workerMgr.run({
    account: decompAccount.account,
    taskId: "decompose-planning",
    prompt: decomposePrompt,
    projectRoot,
    outputDir: decompOutputDir,
  });

  const decompResult = await workerMgr.waitForContainer("decompose-planning");
  pool.release(decompAccount.account.id, decompResult?.exitCode === 0);

  // Parse subtasks from output
  let subtasks: Array<{ prompt: string; taskType: string }>;
  try {
    const output = decompResult?.output || "";
    // Extract JSON array from output (might have surrounding text)
    const jsonMatch = output.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error("No JSON array in decomposition output");
    subtasks = JSON.parse(jsonMatch[0]);
    if (!Array.isArray(subtasks) || subtasks.length === 0) throw new Error("Empty subtask array");
  } catch (err) {
    warn(`Decomposition failed, falling back to equal split`);
    // Fallback: create N copies with numbered sections
    subtasks = Array.from({ length: workers }, (_, i) => ({
      prompt: `${prompt}\n\nFocus on part ${i + 1} of ${workers}. Coordinate your work to avoid overlap.`,
      taskType: "general",
    }));
  }

  ok(`Decomposed into ${subtasks.length} subtasks`);
  for (const [i, st] of subtasks.entries()) {
    info(`  ${i + 1}. [${st.taskType}] ${st.prompt.slice(0, 80)}...`);
  }

  // Phase 2: Run subtasks via pool
  const result = await runPool(config, subtasks, workers, projectRoot);
  result.mode = "decompose";
  return result;
}

// ============================================================================
// MODE 4: PIPELINE — Sequential stages, fresh account per stage
// ============================================================================

async function runPipeline(
  config: FleetConfig,
  prompt: string,
  stages: string[],
  projectRoot: string,
): Promise<FleetRunResult> {
  const pool = new AccountPool(config);
  const workerMgr = new WorkerManager(config.settings);
  const runId = generateId();
  const startedAt = new Date().toISOString();
  const outputBase = join(projectRoot, ".fleet", runId);
  mkdirSync(outputBase, { recursive: true });
  workerMgr.prepareFleetConfig(outputBase);

  // Pre-flight: ensure project has intel
  await ensureProjectIntel(config, projectRoot, workerMgr);

  createRun(runId, "pipeline", `Pipeline: ${stages.join(" → ")}`, stages.length, projectRoot);
  info(`Pipeline mode: ${stages.join(" → ")} (${stages.length} stages)`);

  const tasks: FleetTask[] = [];
  let previousOutput = "";
  let completedCount = 0;
  let failedCount = 0;

  for (let stageIdx = 0; stageIdx < stages.length; stageIdx++) {
    const stageName = stages[stageIdx];
    const taskId = `${runId}-s${stageIdx}`;

    // Build stage prompt with context from previous stages
    let stagePrompt = `## Stage: ${stageName} (${stageIdx + 1}/${stages.length})\n\n`;
    stagePrompt += `Original task: ${prompt}\n\n`;

    if (previousOutput) {
      stagePrompt += `## Output from previous stage (${stages[stageIdx - 1]})\n\n`;
      stagePrompt += previousOutput.slice(0, 10_000); // Limit context
      stagePrompt += "\n\n";
    }

    stagePrompt += `Your role in this pipeline is: **${stageName}**\n`;
    stagePrompt += `Complete your stage thoroughly. Your output will be passed to the next stage.\n`;

    // Map stage name to task type
    const taskType = stageToTaskType(stageName);

    const task: FleetTask = {
      id: taskId, prompt: stagePrompt, taskType, mode: "pipeline",
      status: "pending", accountId: null, workerId: null,
      parentTaskId: null, stage: stageIdx, result: null, error: null,
      startedAt: null, completedAt: null, attemptedAccounts: [],
    };
    tasks.push(task);

    createFleetTask(taskId, runId, stagePrompt, taskType, "pipeline", null, stageIdx);

    // Allocate account (wait if needed)
    info(`Stage ${stageIdx + 1}/${stages.length}: ${stageName}`);
    const account = await pool.waitForAvailable(120_000);
    if (!account) {
      error(`No accounts available for stage ${stageName}`);
      task.status = "failed";
      task.error = "No accounts available";
      failedCount++;
      updateFleetTask(taskId, { status: "failed", error: task.error });
      break; // Pipeline broken — can't continue
    }

    // Allocate and run
    const allocated = pool.allocate(taskId);
    if (!allocated) { failedCount++; break; }

    task.accountId = allocated.account.id;
    task.status = "running";
    task.startedAt = new Date().toISOString();

    const outputDir = join(outputBase, taskId);
    const pipelineProvider = selectProviderForTask(allocated.account, taskType);
    const pipelineLocal = isLocalProvider(pipelineProvider);
    const worker = pipelineLocal
      ? workerMgr.runLocal({ taskId, prompt: stagePrompt, projectRoot, provider: pipelineProvider })
      : workerMgr.run({
          account: allocated.account,
          taskId,
          prompt: stagePrompt,
          projectRoot,
          outputDir,
          provider: pipelineProvider,
    });

    task.workerId = worker.id;
    pool.setWorker(allocated.account.id, worker.id);

    createWorkerRecord(worker.id, taskId, allocated.account.id, worker.pid, worker.worktreePath);
    updateFleetTask(taskId, {
      status: "running", account_id: allocated.account.id,
      worker_id: worker.id, started_at: task.startedAt,
    });

    // Wait for stage to complete (pipeline is sequential)
    const result = await workerMgr.waitForContainer(taskId);
    task.completedAt = new Date().toISOString();

    if (result && result.exitCode === 0) {
      task.status = "completed";
      task.result = result.output;
      previousOutput = result.output || "";
      completedCount++;
      pool.release(allocated.account.id, true);
      ok(`  Stage ${stageName} complete`);

      updateFleetTask(taskId, {
        status: "completed", result: result.output,
        completed_at: task.completedAt,
      });

      writeFileSync(join(outputBase, `stage-${stageIdx}-${stageName}.txt`), result.output || "");
    } else {
      task.status = "failed";
      task.error = result?.error || "Unknown error";
      failedCount++;
      pool.release(allocated.account.id, false);
      error(`  Stage ${stageName} failed`);

      updateFleetTask(taskId, {
        status: "failed", error: task.error,
        completed_at: task.completedAt,
      });

      // Pipeline broken on failure — mark remaining stages as cancelled
      warn("Pipeline broken — skipping remaining stages");
      for (let skipIdx = stageIdx + 1; skipIdx < stages.length; skipIdx++) {
        const skipTaskId = `${runId}-s${skipIdx}`;
        createFleetTask(skipTaskId, runId, "(cancelled)", stageToTaskType(stages[skipIdx]), "pipeline", null, skipIdx);
        updateFleetTask(skipTaskId, { status: "failed", error: "Pipeline broken by previous stage failure" });
        failedCount++;
      }
      break;
    }

    updateWorkerRecord(worker.id, result?.status || "failed", result?.exitCode);
  }

  const summary = { total: stages.length, completed: completedCount, failed: failedCount, requeued: 0 };
  updateRunStatus(runId, failedCount > 0 ? "failed" : "completed", summary);

  const runResult: FleetRunResult = {
    mode: "pipeline",
    tasks,
    startedAt,
    completedAt: new Date().toISOString(),
    summary,
  };

  printSummary(runResult, pool);
  return runResult;
}

/** Map stage name to dispatch task type. */
function stageToTaskType(stage: string): string {
  const lower = stage.toLowerCase();
  if (lower.includes("research") || lower.includes("explore")) return "large-file-analysis";
  if (lower.includes("plan") || lower.includes("design") || lower.includes("architect")) return "architecture-design";
  if (lower.includes("implement") || lower.includes("build") || lower.includes("code")) return "backend-implementation";
  if (lower.includes("test")) return "test-writing";
  if (lower.includes("review") || lower.includes("audit")) return "code-review-quality";
  if (lower.includes("doc")) return "documentation";
  if (lower.includes("security")) return "code-review-security";
  return "general";
}

// ============================================================================
// MODE 5: SUPERPOWERS — Brainstorm → Plan → Fleet Execute
// ============================================================================

async function runSuperpowers(
  config: FleetConfig,
  featureDescription: string,
  workers: number,
  projectRoot: string,
  decompose = false,
  maxTasks = 0, // 0 = auto (workers * 5)
): Promise<FleetRunResult> {
  const pool = new AccountPool(config);
  const workerMgr = new WorkerManager(config.settings);

  // Pre-flight
  const fleetBase = join(projectRoot, ".fleet");
  mkdirSync(fleetBase, { recursive: true });
  workerMgr.prepareFleetConfig(fleetBase);
  await ensureProjectIntel(config, projectRoot, workerMgr);

  // Task budget: prevents over-decomposition (138 tasks for a calculator = bad)
  const taskBudget = maxTasks > 0 ? maxTasks : workers * 5;

  const modeLabel = decompose ? "decompose → plan → execute" : "brainstorm → plan → execute";
  console.error(`\n${BOLD}Superpowers Mode${RESET} ${DIM}${modeLabel}${RESET}`);
  info(`Feature: "${featureDescription.slice(0, 80)}..."`);
  info(`Workers: ${workers} accounts, task budget: ~${taskBudget}`);

  // Inject project intel to skip exploration (saves 60-80% of planning time)
  const intelPath = join(projectRoot, ".claude", "rules", "project-intel.md");
  let intelContext = "";
  if (existsSync(intelPath)) {
    try {
      const raw = readFileSync(intelPath, "utf-8");
      if (raw.length > 8000) {
        const lastSection = raw.lastIndexOf("\n## ", 8000);
        intelContext = lastSection > 2000 ? raw.slice(0, lastSection) : raw.slice(0, 8000);
      } else {
        intelContext = raw;
      }
    } catch { /* proceed without */ }
  }
  if (intelContext) ok("Loaded project intel for planning prompts");

  // Load codebase patterns for planning prompts (ensures workers follow project conventions)
  let patternsContext = "";
  const patternsPath = join(projectRoot, ".claude", "rules", "codebase-patterns.md");
  if (existsSync(patternsPath)) {
    try {
      const raw = readFileSync(patternsPath, "utf-8");
      if (raw.length > 4000) {
        const lastSection = raw.lastIndexOf("\n## ", 4000);
        patternsContext = lastSection > 1000 ? raw.slice(0, lastSection) : raw.slice(0, 4000);
      } else {
        patternsContext = raw;
      }
    } catch { /* proceed without */ }
  }
  if (patternsContext) ok("Loaded codebase patterns for planning prompts");

  // Detect frontend/UI tasks for plugin hints
  const featureLower = featureDescription.toLowerCase();
  const isFrontendTask = /\b(ui|ux|frontend|component|react|vue|angular|css|design|layout|page|dashboard|form)\b/.test(featureLower);
  const pluginHints = isFrontendTask
    ? "\n## Plugin Guidance\n- **ui-ux-pro-max** is available — use it for design system intelligence, component patterns, accessibility, and responsive design.\n- **superpowers TDD** is available — write failing tests first, then implement.\n"
    : "\n## Plugin Guidance\n- **superpowers TDD** is available — write failing tests first, then implement.\n- **superpowers verification** is available — verify each task produces correct output.\n";

  const intelBlock = intelContext ? `\n## Project Intelligence (pre-scanned — use this instead of exploring)\n${intelContext}\n` : "";
  const patternsBlock = patternsContext ? `\n## Codebase Patterns (follow these conventions for all new code)\n${patternsContext}\n` : "";
  const exploreInstruction = intelContext
    ? "The project has already been scanned (see above). Use the intel directly — do NOT run ls or read files unless you need specific implementation details not covered above."
    : "1. Quickly explore the project (ls, read key files, check package.json)";

  // ── Decompose + parallel plan (when --decompose flag is set) ────────────
  let allPlanContents: string[] = [];

  if (decompose) {
    // Phase 0: Decompose feature into independent components
    console.error(`\n${BOLD}Phase 0: Decomposing feature${RESET} ${DIM}(splitting into independent components)${RESET}`);

    const decompAccount = pool.allocate("sp-decompose");
    if (!decompAccount) {
      error("No accounts available for decomposition");
      return emptyResult("superpowers");
    }

    const componentsTarget = Math.min(Math.max(2, workers), 5); // 2-5 components, scaled to workers
    const tasksPerComponent = Math.max(3, Math.floor(taskBudget / componentsTarget));

    const decompPrompt = `You are a senior architect. Break this feature into independent components that can be built in parallel by separate teams. This is NON-INTERACTIVE — make all decisions yourself.
${intelBlock}${patternsBlock}${pluginHints}
## Feature
${featureDescription}

## Budget
- Target: ${componentsTarget} components (we have ${workers} parallel workers)
- Each component will get ~${tasksPerComponent} implementation tasks
- Total task budget: ~${taskBudget} tasks across ALL components
- DO NOT over-decompose. A simple feature = 2 components. A complex feature = 4-5 max.

## Output Format (CRITICAL)
Output ONLY a JSON array. Each item has "name" (short component name) and "description" (what to build, specific enough for a developer to create a TDD plan).

Example:
[
  {"name": "auth-api", "description": "Build JWT authentication endpoints: POST /auth/login, POST /auth/register, POST /auth/refresh. Include bcrypt password hashing, token generation, and middleware for protected routes."},
  {"name": "auth-ui", "description": "Build login and registration React components with form validation, error handling, and token storage in localStorage."}
]

Rules:
- Each component must be independently buildable (no circular dependencies)
- ${componentsTarget} components (±1). Fewer large components > many tiny ones.
- Be SPECIFIC in descriptions — include file paths, endpoints, field names
- Output the JSON array and NOTHING else`;

    const decompOutputDir = join(projectRoot, ".fleet", "superpowers-decompose");
    mkdirSync(decompOutputDir, { recursive: true });

    workerMgr.run({
      account: decompAccount.account,
      taskId: "sp-decompose",
      prompt: decompPrompt,
      projectRoot,
      outputDir: decompOutputDir,
      provider: "claude",
    });

    info("Decomposing feature into components...");
    const decompResult = await workerMgr.waitForContainer("sp-decompose");
    pool.release(decompAccount.account.id, decompResult?.exitCode === 0);

    let components: Array<{ name: string; description: string }>;
    try {
      const output = decompResult?.output || "";
      const jsonMatch = output.match(/\[[\s\S]*\]/);
      if (!jsonMatch) throw new Error("No JSON array in decomposition output");
      components = JSON.parse(jsonMatch[0]);
      if (!Array.isArray(components) || components.length === 0) throw new Error("Empty component array");
    } catch {
      warn("Decomposition failed — falling back to single-plan mode");
      components = [{ name: "full-feature", description: featureDescription }];
    }

    ok(`Decomposed into ${components.length} components:`);
    for (const [i, c] of components.entries()) {
      info(`  ${i + 1}. ${c.name}: ${c.description.slice(0, 70)}...`);
    }

    // Phase 1: Plan each component in parallel
    console.error(`\n${BOLD}Phase 1: Parallel planning${RESET} ${DIM}(${components.length} components, one plan each)${RESET}`);

    const planOutputDir = join(projectRoot, ".fleet", "superpowers-plans");
    mkdirSync(planOutputDir, { recursive: true });

    // Launch planning workers in parallel (one per component)
    const planningTasks: Array<{ taskId: string; accountId: string; componentName: string }> = [];

    for (const [i, component] of components.entries()) {
      const planAccount = pool.allocate(`sp-plan-${i}`);
      if (!planAccount) {
        warn(`No account available for component "${component.name}" — will be planned later`);
        // Fall back: add component description directly so it gets decomposed in pool
        allPlanContents.push(`- [ ] **Implement ${component.name}: ${component.description}**`);
        continue;
      }

      const componentPrompt = `You are a senior engineer creating a TDD implementation plan for ONE component. This is NON-INTERACTIVE — make all decisions yourself.
${intelBlock}${patternsBlock}${pluginHints}
## Component: ${component.name}
${component.description}

## Context
This is part of a larger feature: "${featureDescription}"
Other components are being built in parallel — focus ONLY on this component.

## Your Task
${exploreInstruction}
${intelContext ? "1." : "2."} Write an implementation plan with CHECKBOX TASKS for this component ONLY

## Task Budget: ${tasksPerComponent} tasks MAX
Each task is a COMPLETE TDD cycle (write test + implement + verify + commit).
Do NOT split "write test" and "implement" into separate tasks.

## Plan Format (CRITICAL — follow exactly)
Each checkbox = one complete TDD cycle. NOT micro-steps.

GOOD (one task = full cycle):
- [ ] **TDD: GET /todos endpoint — write failing test in tests/todo.test.js, implement handler in routes/todo.js, verify test passes, commit**
- [ ] **TDD: POST /todos endpoint — write failing test, implement with validation, verify, commit**
- [ ] **TDD: Input validation middleware — test missing/invalid fields, implement validateTodo(), verify, commit**

BAD (too granular — DO NOT do this):
- [ ] **Create test file with failing test**
- [ ] **Run test to verify it fails**
- [ ] **Implement the handler**
- [ ] **Run test to verify it passes**
- [ ] **Commit**

## Rules
- Write the plan directly to stdout (do NOT save to a file)
- Use EXACTLY the \`- [ ] **description**\` format for every task
- MAXIMUM ${tasksPerComponent} tasks. Group related work into single tasks.
- Each task = write test + implement + verify + commit (full TDD cycle)
- Do NOT implement anything — ONLY write the plan`;

      const taskId = `sp-plan-${i}`;
      workerMgr.run({
        account: planAccount.account,
        taskId,
        prompt: componentPrompt,
        projectRoot,
        outputDir: join(planOutputDir, component.name),
        provider: "claude",
      });

      planningTasks.push({ taskId, accountId: planAccount.account.id, componentName: component.name });
      info(`  Planning: ${component.name} → ${planAccount.account.label}`);
    }

    // Wait for all planning workers to complete
    if (planningTasks.length > 0) {
      info(`Waiting for ${planningTasks.length} planning workers...`);
      for (const pt of planningTasks) {
        const planResult = await workerMgr.waitForContainer(pt.taskId);
        pool.release(pt.accountId, planResult?.exitCode === 0);

        if (planResult?.exitCode === 0 && planResult.output) {
          allPlanContents.push(`## Component: ${pt.componentName}\n\n${planResult.output}`);
          ok(`  ${pt.componentName}: plan ready`);
        } else {
          warn(`  ${pt.componentName}: planning failed — adding as single task`);
          const comp = components.find((c) => c.name === pt.componentName);
          allPlanContents.push(`- [ ] **Implement ${pt.componentName}: ${comp?.description || "see feature description"}**`);
        }
      }
    }

    ok(`All ${components.length} component plans ready`);

  } else {
    // ── Original single-plan mode ───────────────────────────────────────────
    console.error(`\n${BOLD}Phase 1: Planning${RESET} ${DIM}(design + implementation plan)${RESET}`);

    const brainstormAccount = pool.allocate("sp-plan");
    if (!brainstormAccount) {
      error("No accounts available");
      return emptyResult("superpowers");
    }

    const brainstormPrompt = `You are a senior engineer creating an implementation plan. This is a NON-INTERACTIVE autonomous session — do NOT ask questions, make all decisions yourself.

## Feature Request
${featureDescription}
${intelBlock}${patternsBlock}${pluginHints}
## Your Task
${exploreInstruction}
${intelContext ? "1." : "2."} Design the solution (pick the simplest approach that works)
${intelContext ? "2." : "3."} Write an implementation plan with CHECKBOX TASKS

## Task Budget: ~${taskBudget} tasks MAXIMUM
Each task is a COMPLETE TDD cycle (write test + implement + verify + commit).
Do NOT split "write test" and "implement" into separate tasks.

## Plan Format (CRITICAL — follow exactly)
Each checkbox = one complete TDD cycle. NOT micro-steps.

GOOD (one task = full cycle):
- [ ] **TDD: GET /todos — write failing test in tests/todo.test.js, implement handler in index.js, verify passes, commit**
- [ ] **TDD: POST /todos — write failing test, implement with validation, verify, commit**
- [ ] **TDD: Error handling — test 404/400 responses, implement error middleware, verify, commit**

BAD (too granular — DO NOT do this):
- [ ] **Create test file with failing test**
- [ ] **Run test to verify it fails**
- [ ] **Implement the handler**
- [ ] **Run test to verify it passes**
- [ ] **Commit**

## Rules
- Write the plan directly to stdout (do NOT save to a file)
- Use EXACTLY the \`- [ ] **description**\` format for every task
- MAXIMUM ${taskBudget} tasks total. Group related work into single tasks.
- Each task = write test + implement + verify + commit (full TDD cycle)
- No frameworks, keep it simple
- Do NOT implement anything — ONLY write the plan`;

    const brainstormOutputDir = join(projectRoot, ".fleet", "superpowers-brainstorm");
    mkdirSync(brainstormOutputDir, { recursive: true });

    workerMgr.run({
      account: brainstormAccount.account,
      taskId: "sp-plan",
      prompt: brainstormPrompt,
      projectRoot,
      outputDir: brainstormOutputDir,
      provider: "claude",
    });

    info("Planning (creating task plan)...");
    const brainstormResult = await workerMgr.waitForContainer("sp-plan");
    pool.release(brainstormAccount.account.id, brainstormResult?.exitCode === 0);

    if (brainstormResult?.exitCode !== 0) {
      error("Planning failed");
      if (brainstormResult?.error) error(brainstormResult.error.slice(0, 500));
      return emptyResult("superpowers");
    }

    ok("Planning complete");

    // Collect plan content from output or disk
    const planDir = join(projectRoot, "docs", "superpowers", "plans");
    if (existsSync(planDir)) {
      const planFiles = Bun.spawnSync(["find", planDir, "-name", "*.md", "-type", "f"])
        .stdout.toString().trim().split("\n").filter(Boolean);
      if (planFiles.length > 0) {
        const sorted = planFiles.sort().reverse();
        allPlanContents.push(readFileSync(sorted[0], "utf-8"));
        ok(`Found plan: ${sorted[0]}`);
      }
    }
    if (allPlanContents.length === 0 && brainstormResult?.output) {
      allPlanContents.push(brainstormResult.output);
      info("Using plan from brainstorm output");
    }
  }

  // ── Phase 2: Extract tasks from plan(s) ────────────────────────────────
  console.error(`\n${BOLD}Phase 2: Extracting tasks from plan${decompose ? "s" : ""}${RESET}`);

  const planContent = allPlanContents.join("\n\n");

  if (!planContent) {
    error("No plan found — planning didn't produce output");
    return emptyResult("superpowers");
  }

  // Parse checkbox tasks from plan
  const tasks = parsePlanTasks(planContent);

  if (tasks.length === 0) {
    // Fallback: if no checkboxes found, treat the whole plan as context and decompose
    warn("No checkbox tasks found in plan — falling back to decompose mode");
    return runDecompose(config, `${featureDescription}\n\nContext from design:\n${planContent.slice(0, 5000)}`, workers, projectRoot);
  }

  ok(`Extracted ${tasks.length} tasks from plan`);
  for (const [i, t] of tasks.entries()) {
    info(`  ${i + 1}. ${t.prompt.slice(0, 70)}...`);
  }

  // ── Phase 3: Fleet Execute ───────────────────────────────────────────────
  console.error(`\n${BOLD}Phase 3: Fleet execution${RESET} ${DIM}(${tasks.length} tasks, ${workers} workers)${RESET}`);

  // Group sequential tasks into batches (TDD tasks must run in order within a batch)
  const taskBatches = batchTddTasks(tasks);
  info(`Organized into ${taskBatches.length} batch(es)`);

  // Execute batches
  const allTasks: Array<{ prompt: string; taskType?: string }> = [];
  for (const batch of taskBatches) {
    // Each batch becomes a single fleet task (steps run sequentially inside)
    const batchPrompt = batch.map((t, i) => `Step ${i + 1}: ${t.prompt}`).join("\n\n");
    allTasks.push({
      prompt: `You have superpowers. Use the test-driven-development skill.\n\nExecute these steps IN ORDER (they are TDD red-green-refactor steps):\n\n${batchPrompt}\n\nAfter completing all steps, commit your work with a descriptive message.`,
      taskType: batch[0].taskType || "backend",
    });
  }

  const result = await runPool(config, allTasks, workers, projectRoot);

  // ── Phase 4: Two-stage review (parallel) ──────────────────────────────────
  if (result.summary.completed > 0) {
    console.error(`\n${BOLD}Phase 4: Two-Stage Review${RESET} ${DIM}(spec compliance + code quality in parallel)${RESET}`);

    const reviewDir = join(projectRoot, ".fleet", "superpowers-review");
    mkdirSync(reviewDir, { recursive: true });

    // Stage 1: Spec compliance review
    const specAccount = pool.allocate("sp-spec-review");
    let specReviewDone: Promise<void> | null = null;
    if (specAccount) {
      const specPrompt = `You are a SPEC COMPLIANCE REVIEWER. This is stage 1 of a 2-stage review.

Your ONLY job: verify the implementation matches the design specification.

1. Read the design doc in docs/superpowers/specs/ (or the plan in docs/superpowers/plans/)
2. Read the actual implementation (all source files, not just index.js)
3. For EACH requirement in the spec, check if it's implemented:
   - List each requirement and mark it PASS or FAIL
   - For FAIL items, explain what's missing or wrong
4. Check that no EXTRA features were added beyond the spec (gold plating)

Output format:
## Spec Compliance Review

### Requirements Checklist
- [PASS/FAIL] Requirement 1: description
- [PASS/FAIL] Requirement 2: description
...

### Missing Requirements
(list any spec items not implemented)

### Extra Features (Gold Plating)
(list any features added that weren't in the spec)

### Verdict: PASS / FAIL (with summary)`;

      workerMgr.run({
        account: specAccount.account,
        taskId: "sp-spec-review",
        prompt: specPrompt,
        projectRoot,
        outputDir: join(reviewDir, "spec"),
        provider: "claude",
      });

      specReviewDone = workerMgr.waitForContainer("sp-spec-review").then((r) => {
        pool.release(specAccount.account.id, r?.exitCode === 0);
        if (r?.exitCode === 0) {
          writeFileSync(join(reviewDir, "spec-review.txt"), r?.output || "");
          ok("Stage 1: Spec compliance — done");
        } else {
          warn("Stage 1: Spec compliance — failed (non-critical)");
        }
      });
      info("Stage 1: Spec compliance reviewer dispatched");
    }

    // Stage 2: Code quality review (parallel with stage 1)
    const qualityAccount = pool.allocate("sp-quality-review");
    let qualityReviewDone: Promise<void> | null = null;
    if (qualityAccount) {
      const qualityPrompt = `You are a CODE QUALITY REVIEWER. This is stage 2 of a 2-stage review.

Your ONLY job: review code quality, NOT spec compliance (that's handled separately).

Review ALL source files for:
1. **Bugs**: logic errors, off-by-one, null handling, race conditions
2. **Security**: injection, XSS, auth issues, input validation
3. **Tests**: coverage gaps, tests that don't test real behavior, missing edge cases
4. **Code quality**: naming, structure, DRY, error handling, readability
5. **Performance**: obvious N+1, memory leaks, unnecessary allocations

Output format:
## Code Quality Review

### Critical Issues (must fix)
1. [file:line] Description — fix suggestion

### Warnings (should fix)
1. [file:line] Description — fix suggestion

### Good Practices Found
- What's done well

### Test Coverage Assessment
- What's covered, what's missing

### Verdict: APPROVE / REQUEST CHANGES (with summary)`;

      workerMgr.run({
        account: qualityAccount.account,
        taskId: "sp-quality-review",
        prompt: qualityPrompt,
        projectRoot,
        outputDir: join(reviewDir, "quality"),
        provider: "claude",
      });

      qualityReviewDone = workerMgr.waitForContainer("sp-quality-review").then((r) => {
        pool.release(qualityAccount.account.id, r?.exitCode === 0);
        if (r?.exitCode === 0) {
          writeFileSync(join(reviewDir, "quality-review.txt"), r?.output || "");
          ok("Stage 2: Code quality — done");
        } else {
          warn("Stage 2: Code quality — failed (non-critical)");
        }
      });
      info("Stage 2: Code quality reviewer dispatched");
    }

    // Wait for both reviews to complete (they run in parallel)
    if (specReviewDone || qualityReviewDone) {
      info("Waiting for reviews (running in parallel)...");
      await Promise.all([specReviewDone, qualityReviewDone].filter(Boolean));

      // Print review summaries
      const specReview = existsSync(join(reviewDir, "spec-review.txt"))
        ? readFileSync(join(reviewDir, "spec-review.txt"), "utf-8") : null;
      const qualityReview = existsSync(join(reviewDir, "quality-review.txt"))
        ? readFileSync(join(reviewDir, "quality-review.txt"), "utf-8") : null;

      if (specReview || qualityReview) {
        console.error(`\n${BOLD}Review Results${RESET}`);
        if (specReview) {
          const verdict = specReview.match(/Verdict:\s*(PASS|FAIL)/i);
          console.error(`  Spec compliance: ${verdict?.[1] === "PASS" ? GREEN : RED}${verdict?.[1] || "unknown"}${RESET}`);
        }
        if (qualityReview) {
          const verdict = qualityReview.match(/Verdict:\s*(APPROVE|REQUEST CHANGES)/i);
          console.error(`  Code quality:    ${verdict?.[1] === "APPROVE" ? GREEN : YELLOW}${verdict?.[1] || "unknown"}${RESET}`);
        }
        console.error(`  Full reports: ${reviewDir}/`);
      }
    } else {
      warn("No accounts available for review (all busy or in cooldown)");
    }
  }

  result.mode = "superpowers" as any;
  return result;
}

/** Parse checkbox tasks from a superpowers plan. */
function parsePlanTasks(planContent: string): Array<{ prompt: string; taskType: string }> {
  const tasks: Array<{ prompt: string; taskType: string }> = [];
  const lines = planContent.split("\n");

  let currentTask = "";
  let inTask = false;

  for (const line of lines) {
    // Match: - [ ] **Step N: description** or - [ ] description
    const checkboxMatch = line.match(/^-\s*\[\s*[\sx]?\s*\]\s*(.+)/);

    if (checkboxMatch) {
      // Save previous task
      if (inTask && currentTask) {
        tasks.push({ prompt: currentTask.trim(), taskType: inferTaskType(currentTask) });
      }
      currentTask = checkboxMatch[1];
      inTask = true;
    } else if (inTask) {
      // Continue collecting lines for current task (code blocks, instructions, etc.)
      if (line.match(/^-\s*\[/) || line.match(/^#{1,3}\s/) || line.match(/^---/)) {
        // New section or checkbox — save current task
        tasks.push({ prompt: currentTask.trim(), taskType: inferTaskType(currentTask) });
        currentTask = "";
        inTask = false;
      } else {
        currentTask += "\n" + line;
      }
    }
  }

  // Don't forget last task
  if (inTask && currentTask) {
    tasks.push({ prompt: currentTask.trim(), taskType: inferTaskType(currentTask) });
  }

  return tasks;
}

/** Infer task type from task content. */
function inferTaskType(task: string): string {
  const lower = task.toLowerCase();
  if (lower.includes("test") || lower.includes("spec") || lower.includes("assert")) return "test";
  if (lower.includes("commit") || lower.includes("git")) return "general";
  if (lower.includes("frontend") || lower.includes("component") || lower.includes("ui")) return "frontend";
  if (lower.includes("api") || lower.includes("endpoint") || lower.includes("route")) return "api";
  if (lower.includes("doc") || lower.includes("readme")) return "docs";
  return "backend";
}

/**
 * Group TDD tasks into batches for fleet dispatch.
 *
 * New-style tasks (full TDD cycles like "TDD: GET /todos — write test, implement, verify, commit")
 * become 1 batch each (1:1 mapping — each is already a complete unit of work).
 *
 * Old-style micro-step tasks ("Create test file", "Run test", "Implement", "Commit")
 * are grouped into batches of ~5 (backward compat).
 */
function batchTddTasks(
  tasks: Array<{ prompt: string; taskType: string }>,
): Array<Array<{ prompt: string; taskType: string }>> {
  // Detect if tasks are new-style (full cycles) or old-style (micro-steps)
  // Heuristic: if most tasks contain "TDD:" or "commit" in the prompt, they're full cycles
  const fullCycleCount = tasks.filter((t) => {
    const lower = t.prompt.toLowerCase();
    return lower.includes("tdd:") || (lower.includes("test") && lower.includes("implement"));
  }).length;
  const isFullCycleFormat = fullCycleCount > tasks.length * 0.5;

  if (isFullCycleFormat) {
    // Each task is a complete TDD cycle — 1 batch per task
    return tasks.map((t) => [t]);
  }

  // Legacy micro-step format — group into batches of ~5
  const batches: Array<Array<{ prompt: string; taskType: string }>> = [];
  let current: Array<{ prompt: string; taskType: string }> = [];

  for (const task of tasks) {
    current.push(task);
    const lower = task.prompt.toLowerCase();
    if (lower.includes("commit") || current.length >= 5) {
      batches.push([...current]);
      current = [];
    }
  }
  if (current.length > 0) batches.push(current);

  return batches;
}

/** Empty result for early exits. */
function emptyResult(mode: string): FleetRunResult {
  return {
    mode: mode as any,
    tasks: [],
    startedAt: new Date().toISOString(),
    completedAt: new Date().toISOString(),
    summary: { total: 0, completed: 0, failed: 0, requeued: 0 },
  };
}

// ============================================================================
// UTILITY — Print summary, parse args
// ============================================================================

function printSummary(result: FleetRunResult, pool: AccountPool): void {
  console.error("");
  console.error(`${BOLD}Fleet Run Complete${RESET}`);
  console.error(`  Mode: ${result.mode}`);
  console.error(`  Tasks: ${result.summary.total} total, ${GREEN}${result.summary.completed} completed${RESET}, ${RED}${result.summary.failed} failed${RESET}, ${YELLOW}${result.summary.requeued} requeued${RESET}`);
  console.error(`  Duration: ${Math.round((new Date(result.completedAt).getTime() - new Date(result.startedAt).getTime()) / 1000)}s`);
  console.error("");

  // Account usage
  console.error(`${BOLD}Account Usage${RESET}`);
  for (const status of pool.all()) {
    const stateColor = status.state === "idle" ? GREEN : status.state === "cooldown" ? YELLOW : RED;
    console.error(`  ${status.account.label}: ${stateColor}${status.state}${RESET} | ${status.tasksCompleted} done, ${status.tasksFailed} failed`);
  }
  console.error("");
}

function printStatus(showAll = false): void {
  const cwd = process.cwd();
  const runs = showAll ? getRecentRuns(10) : getRunsByProject(cwd, 10);
  const scope = showAll ? "(all projects)" : cwd;

  if (runs.length === 0) {
    info(showAll ? "No fleet runs recorded" : `No fleet runs for ${cwd}\n  Use fleet --status --all to see all projects`);
    return;
  }

  console.error(`${BOLD}Fleet Runs${RESET} ${DIM}${scope}${RESET}`);
  for (const run of runs) {
    const statusColor = run.status === "completed" ? GREEN : run.status === "running" ? CYAN : RED;
    const summary = run.summary ? JSON.parse(run.summary) : null;
    console.error(`  ${run.id} | ${run.mode} | ${statusColor}${run.status}${RESET} | ${run.started_at}`);
    if (summary) {
      console.error(`    ${summary.completed}/${summary.total} completed, ${summary.failed} failed`);
    }
  }
}

function printLive(config: FleetConfig, showAll = false): void {
  const workerMgr = new WorkerManager(config.settings);
  const running = workerMgr.listRunning();
  const cwd = process.cwd();
  const runs = showAll ? getRecentRuns(5) : getRunsByProject(cwd, 5);

  console.error(`${BOLD}Fleet Live Status${RESET}`);
  console.error("");

  // Running workers
  if (running.length > 0) {
    console.error(`  ${BOLD}Active Workers (${running.length}):${RESET}`);
    for (const w of running) {
      console.error(`    ${GREEN}●${RESET} ${w.id}  ${DIM}pid=${w.pid || "?"}${RESET}`);
    }
  } else {
    console.error(`  ${DIM}No active fleet workers${RESET}`);
  }
  console.error("");

  // Recent runs with task details
  const activeRun = runs.find((r) => r.status === "running");
  if (activeRun) {
    const tasks = getTasksByRun(activeRun.id);
    const done = tasks.filter((t) => t.status === "completed").length;
    const failed = tasks.filter((t) => t.status === "failed").length;
    const inProgress = tasks.filter((t) => t.status === "running" || t.status === "allocated").length;
    const pending = tasks.filter((t) => t.status === "pending").length;
    const total = tasks.length;

    // Progress bar
    const pct = total > 0 ? Math.round(((done + failed) / total) * 100) : 0;
    const barLen = 30;
    const filled = Math.round((pct / 100) * barLen);
    const bar = `[${"=".repeat(filled)}${"-".repeat(barLen - filled)}]`;

    console.error(`  ${BOLD}Active Run: ${CYAN}${activeRun.id}${RESET}`);
    console.error(`    Mode: ${activeRun.mode} | Workers: ${activeRun.workers}`);
    console.error(`    Progress: ${bar} ${pct}% (${done + failed}/${total})`);
    console.error(`    ${GREEN}Done: ${done}${RESET} | ${CYAN}Running: ${inProgress}${RESET} | ${DIM}Pending: ${pending}${RESET} | ${RED}Failed: ${failed}${RESET}`);
    console.error("");

    // Per-task status
    console.error(`  ${BOLD}Tasks:${RESET}`);
    for (const t of tasks) {
      const icon = t.status === "completed" ? `${GREEN}✓${RESET}` :
                   t.status === "failed" ? `${RED}✗${RESET}` :
                   t.status === "running" || t.status === "allocated" ? `${CYAN}●${RESET}` :
                   `${DIM}○${RESET}`;
      const acct = t.account_id ? ` (${t.account_id})` : "";
      console.error(`    ${icon} ${t.id}${acct} — ${t.prompt.slice(0, 60)}...`);
    }
  } else {
    console.error(`  ${DIM}No active runs${RESET}`);
  }

  console.error("");

  // Recent completed runs
  const recentDone = runs.filter((r) => r.status !== "running").slice(0, 3);
  if (recentDone.length > 0) {
    console.error(`  ${BOLD}Recent Runs:${RESET}`);
    for (const r of recentDone) {
      const color = r.status === "completed" ? GREEN : RED;
      const summary = r.summary ? JSON.parse(r.summary) : null;
      const sumStr = summary ? ` (${summary.completed}/${summary.total} done)` : "";
      console.error(`    ${color}${r.status}${RESET} ${r.id} | ${r.mode}${sumStr}`);
    }
  }
  console.error("");
}

/** Load task queue from JSON file. Accepts array of strings or array of {prompt, taskType}. */
function loadTaskQueue(path: string): Array<{ prompt: string; taskType?: string }> {
  if (!existsSync(path)) throw new Error(`Task queue file not found: ${path}`);
  const raw = JSON.parse(readFileSync(path, "utf-8"));

  if (Array.isArray(raw)) {
    return raw.map((item) => {
      if (typeof item === "string") return { prompt: item };
      if (item.prompt) return { prompt: item.prompt, taskType: item.taskType || item.type };
      throw new Error(`Invalid task item: ${JSON.stringify(item)}`);
    });
  }

  if (raw.tasks && Array.isArray(raw.tasks)) {
    return raw.tasks.map((item: { prompt: string; taskType?: string; type?: string }) => ({
      prompt: item.prompt,
      taskType: item.taskType || item.type,
    }));
  }

  throw new Error("Task queue must be a JSON array or {tasks: [...]}");
}

// ============================================================================
// CLI
// ============================================================================

async function main(): Promise<void> {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
    console.log(`
${BOLD}Fleet — Multi-Account Worker Orchestration${RESET}

${BOLD}Modes:${RESET}
  --pool <tasks.json>              Worker pool processes a queue of tasks
  --scatter <prompt>               Same task to N workers, merge results
  --decompose <prompt>             Split into subtasks, one per worker
  --pipeline <prompt> --stages ... Sequential stages, fresh account per stage
  --superpowers <feature>          Plan → fleet execute → review (TDD)
  --superpowers ... --decompose    Decompose → parallel plan → execute → review
  --superpowers ... --max-tasks N  Task budget (default: workers × 5)

${BOLD}Options:${RESET}
  --workers <N>                    Max concurrent workers (default: all accounts)
  --stages <s1,s2,...>             Pipeline stages (comma-separated)
  --strategy <best|merge|all>      Scatter result strategy (default: merge)
  --project <path>                 Project root (default: cwd)
  --config <path>                  Account config path
  --task-type <type>               Task type for single-prompt modes

${BOLD}Management:${RESET}
  --status                         Show fleet status + recent runs
  --live                           Live view: active workers, progress, tasks
  --intel                          List cached project intel (fingerprints, TTL)
  --intel --clear                  Clear all cached intel
  --intel --clear <path>           Clear cached intel for a specific project
  --setup                          Interactive account setup wizard
  --from-csv <file>                Load accounts from CSV (one key per line or comma-separated)
  --init                           Create default config at ~/.claude/fleet/accounts.json
  --add-account                    Quick-add: --add-account "Label" KEY=val KEY2=val2
  --kill                           Kill all running fleet workers
  --accounts                       List configured accounts
`);
    return;
  }

  // --- Management commands (no config needed) ---

  if (args.includes("--setup")) {
    await runSetup();
    return;
  }

  if (args.includes("--from-csv")) {
    const csvIdx = args.indexOf("--from-csv");
    const csvPath = args[csvIdx + 1];
    if (!csvPath || csvPath.startsWith("--")) {
      error("Usage: fleet --from-csv keys.csv [--region us-east-1]");
      process.exit(1);
    }
    const regionIdx = args.indexOf("--region");
    const region = (regionIdx !== -1 && args[regionIdx + 1]) ? args[regionIdx + 1] : "us-east-1";
    try {
      console.log(loadFromCsv(csvPath, region));
    } catch (err) {
      error(err instanceof Error ? err.message : String(err));
      process.exit(1);
    }
    return;
  }

  if (args.includes("--init")) {
    console.log(initFleetConfig());
    return;
  }

  if (args.includes("--add-account")) {
    const addIdx = args.indexOf("--add-account");
    const label = args[addIdx + 1];
    if (!label || label.startsWith("--")) {
      error('Usage: --add-account "Label" ANTHROPIC_API_KEY=sk-ant-... OPENAI_API_KEY=sk-...');
      process.exit(1);
    }
    const creds: Record<string, string> = {};
    for (let i = addIdx + 2; i < args.length; i++) {
      if (args[i].startsWith("--")) break;
      const eqIdx = args[i].indexOf("=");
      if (eqIdx > 0) {
        creds[args[i].slice(0, eqIdx)] = args[i].slice(eqIdx + 1);
      }
    }
    if (Object.keys(creds).length === 0) {
      error("No credentials provided. Format: KEY=value KEY2=value2");
      process.exit(1);
    }
    console.log(addAccount(label, creds));
    return;
  }

  if (args.includes("--status")) {
    try {
      printStatus(args.includes("--all"));
    } catch {
      info("No fleet history (database not initialized)");
    }
    return;
  }

  if (args.includes("--live")) {
    try {
      const liveConfig = loadFleetConfig();
      printLive(liveConfig, args.includes("--all"));
    } catch {
      info("No fleet config found. Run: fleet --from-csv keys.csv");
    }
    return;
  }

  // --- Commands that need config ---

  let configPath: string | undefined;
  const configIdx = args.indexOf("--config");
  if (configIdx !== -1 && args[configIdx + 1]) {
    configPath = args[configIdx + 1];
  }

  let config: FleetConfig | undefined;
  try {
    config = loadFleetConfig(configPath);
  } catch (err) {
    error(err instanceof Error ? err.message : String(err));
    process.exit(1);
    return; // unreachable, but satisfies TS flow analysis
  }

  // --kill
  if (args.includes("--kill")) {
    const workerMgr = new WorkerManager(config.settings);
    const killed = workerMgr.killAll();
    ok(`Killed ${killed} fleet worker(s)`);
    return;
  }

  // --accounts
  if (args.includes("--accounts")) {
    console.error(`${BOLD}Configured Accounts (${config.accounts.length})${RESET}`);
    for (const acct of config.accounts) {
      const creds = Object.keys(acct.credentials);
      const masked = creds.map((k) => {
        const v = acct.credentials[k];
        return `${k}=${v.slice(0, 4)}...${v.slice(-4)}`;
      });
      const providers = getAccountProviders(acct);
      console.error(`  ${acct.id}: ${acct.label || "(no label)"}`);
      console.error(`    Credentials: ${masked.join(", ")}`);
      console.error(`    CLI agents:  ${providers.join(", ")}`);
    }
    return;
  }

  // --intel [--clear]
  if (args.includes("--intel")) {
    if (args.includes("--clear")) {
      // Clear specific project or all
      const clearIdx = args.indexOf("--clear");
      const clearTarget = args[clearIdx + 1];
      if (clearTarget && !clearTarget.startsWith("--")) {
        const { fingerprint } = projectFingerprint(resolve(clearTarget));
        const { deleteCachedIntel } = await import("./db");
        deleteCachedIntel(fingerprint);
        ok(`Cleared intel cache for: ${clearTarget} (fingerprint: ${fingerprint.slice(0, 8)})`);
      } else {
        // Clear all — drop and recreate
        info("Clearing all cached intel...");
        const records = listCachedIntel(1000);
        const { deleteCachedIntel } = await import("./db");
        for (const r of records) deleteCachedIntel(r.project_fingerprint);
        ok(`Cleared ${records.length} cached intel record(s)`);
      }
      return;
    }

    // List cached intel
    const records = listCachedIntel(50);
    if (records.length === 0) {
      info("No cached intel records. Intel will be cached on first fleet run per project.");
      return;
    }
    console.error(`${BOLD}Cached Project Intel (${records.length})${RESET}`);
    for (const r of records) {
      const expired = new Date(r.expires_at).getTime() < Date.now();
      const statusColor = r.generation_status === "success" ? GREEN : r.generation_status === "empty_project" ? DIM : YELLOW;
      const expiryStr = expired ? `${RED}expired${RESET}` : `expires ${r.expires_at.slice(0, 10)}`;
      console.error(`  ${statusColor}${r.generation_status}${RESET} | ${r.project_fingerprint.slice(0, 8)} | ${expiryStr}`);
      console.error(`    ${DIM}${r.project_root}${RESET}${r.git_remote ? ` (${r.git_remote})` : ""}`);
    }
    return;
  }

  // --- Parse common options ---

  let workers = config.settings.maxConcurrent;
  const workersIdx = args.indexOf("--workers");
  if (workersIdx !== -1 && args[workersIdx + 1]) {
    workers = Math.min(parseInt(args[workersIdx + 1], 10), config.accounts.length);
  }
  // Cap workers to account count
  workers = Math.min(workers, config.accounts.length);

  let projectRoot = process.cwd();
  const projectIdx = args.indexOf("--project");
  if (projectIdx !== -1 && args[projectIdx + 1]) {
    projectRoot = resolve(args[projectIdx + 1]);
  }

  // --- Mode dispatch ---

  // --pool <tasks.json>
  const poolIdx = args.indexOf("--pool");
  if (poolIdx !== -1 && args[poolIdx + 1]) {
    const tasksPath = resolve(args[poolIdx + 1]);
    const tasks = loadTaskQueue(tasksPath);
    await runPool(config, tasks, workers, projectRoot);
    return;
  }

  // --scatter <prompt>
  const scatterIdx = args.indexOf("--scatter");
  if (scatterIdx !== -1 && args[scatterIdx + 1]) {
    const prompt = args[scatterIdx + 1];
    let strategy: ScatterStrategy = "merge";
    const stratIdx = args.indexOf("--strategy");
    if (stratIdx !== -1 && args[stratIdx + 1]) {
      strategy = args[stratIdx + 1] as ScatterStrategy;
    }
    await runScatter(config, prompt, workers, strategy, projectRoot);
    return;
  }

  // --decompose <prompt> (standalone mode — not used with --superpowers)
  const decomposeIdx = args.indexOf("--decompose");
  const hasSuperpowers = args.includes("--superpowers");
  if (decomposeIdx !== -1 && !hasSuperpowers && args[decomposeIdx + 1] && !args[decomposeIdx + 1].startsWith("--")) {
    const prompt = args[decomposeIdx + 1];
    await runDecompose(config, prompt, workers, projectRoot);
    return;
  }

  // --pipeline <prompt> --stages <s1,s2,...>
  const pipelineIdx = args.indexOf("--pipeline");
  if (pipelineIdx !== -1 && args[pipelineIdx + 1]) {
    const prompt = args[pipelineIdx + 1];
    const stagesIdx = args.indexOf("--stages");
    if (stagesIdx === -1 || !args[stagesIdx + 1]) {
      error("--pipeline requires --stages (comma-separated). Example: --stages research,implement,test,review");
      process.exit(1);
    }
    const stages = args[stagesIdx + 1].split(",").map((s) => s.trim());
    await runPipeline(config, prompt, stages, projectRoot);
    return;
  }

  // --superpowers <feature> [--decompose] [--max-tasks N]
  const spIdx = args.indexOf("--superpowers");
  if (spIdx !== -1 && args[spIdx + 1]) {
    const feature = args[spIdx + 1];
    const spDecompose = args.includes("--decompose");
    const maxTasksIdx = args.indexOf("--max-tasks");
    const spMaxTasks = (maxTasksIdx !== -1 && args[maxTasksIdx + 1]) ? parseInt(args[maxTasksIdx + 1], 10) : 0;
    await runSuperpowers(config, feature, workers, projectRoot, spDecompose, spMaxTasks);
    return;
  }

  error("No mode specified. Use --pool, --scatter, --decompose, --pipeline, or --superpowers. See --help.");
  process.exit(1);
}

main().catch((err) => {
  error(err instanceof Error ? err.message : String(err));
  process.exit(1);
});
