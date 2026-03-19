#!/usr/bin/env bun
// Fleet — Multi-Account Container Orchestration
//
// Usage:
//   bun fleet/fleet.ts --pool tasks.json [--workers 4]
//   bun fleet/fleet.ts --scatter "prompt" [--workers 4] [--strategy best|merge|all]
//   bun fleet/fleet.ts --decompose "complex task" [--workers 4]
//   bun fleet/fleet.ts --pipeline "task" --stages research,implement,test,review
//   bun fleet/fleet.ts --status
//   bun fleet/fleet.ts --build-image
//   bun fleet/fleet.ts --init
//   bun fleet/fleet.ts --stop
//   bun fleet/fleet.ts --accounts

import { readFileSync, existsSync, writeFileSync, mkdirSync } from "fs";
import { join, resolve } from "path";
import { AccountPool, loadFleetConfig, initFleetConfig } from "./pool";
import { ContainerManager } from "./container";
import {
  createRun, updateRunStatus, getRecentRuns, getRunsByProject, getTasksByRun,
  createFleetTask, updateFleetTask,
  createContainerRecord, updateContainerRecord,
} from "./db";
import type { FleetConfig, FleetTask, FleetRunResult, ScatterStrategy } from "./types";
import { onFleetStart, onTaskComplete, onAccountCooldown, onFleetComplete } from "./bridge";
import { runSetup, addAccount, loadFromCsv } from "./setup";
import { selectProviderForTask, getAccountProviders, isLocalProvider } from "./container";

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
// PRE-FLIGHT: Ensure project has intel before dispatching
// ============================================================================

async function ensureProjectIntel(
  config: FleetConfig,
  projectRoot: string,
  containers: ContainerManager,
): Promise<void> {
  const intelPath = join(projectRoot, ".claude", "rules", "project-intel.md");
  if (existsSync(intelPath)) {
    ok("Project intel: found");
    return;
  }

  info("No project-intel.md found — generating before dispatch...");

  // Use first account to generate intel
  const pool = new AccountPool(config);
  const account = pool.allocate("fleet-init");
  if (!account) {
    warn("No accounts available for intel generation — proceeding without intel");
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

  const container = containers.run({
    account: account.account,
    taskId: "fleet-init",
    prompt: initPrompt,
    projectRoot,
    outputDir,
    provider: "claude",
  });

  info("Generating project intel (this runs once per project)...");
  const result = await containers.waitForContainer("fleet-init");
  pool.release(account.account.id, result?.exitCode === 0);

  if (result?.exitCode === 0 && existsSync(intelPath)) {
    ok("Project intel: generated");
  } else {
    warn("Intel generation incomplete — fleet will proceed without it");
  }
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
  const containers = new ContainerManager(config.settings);
  const runId = generateId();
  const startedAt = new Date().toISOString();
  const outputBase = join(projectRoot, ".fleet", runId);

  mkdirSync(outputBase, { recursive: true });
  createRun(runId, "pool", `Pool: ${tasksInput.length} tasks`, workers, projectRoot);

  // Pre-flight: ensure project has intel
  await ensureProjectIntel(config, projectRoot, containers);

  console.error(`\n${BOLD}Run: ${CYAN}${runId}${RESET}  ${DIM}(fleet --live to monitor from another terminal)${RESET}`);
  info(`Pool mode: ${tasksInput.length} tasks, ${workers} workers, ${pool.size} accounts`);
  info(`Output: ${outputBase}`);
  onFleetStart("pool", tasksInput.length, workers);

  // Graceful shutdown on Ctrl+C — stop all containers
  const cleanup = () => {
    console.error(`\n${YELLOW}[fleet]${RESET} Ctrl+C — stopping containers...`);
    containers.stopAll();
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
      status: "pending" as const, accountId: null, containerId: null,
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

      const container = local
        ? containers.runLocal({ taskId: task.id, prompt: task.prompt, projectRoot, provider })
        : containers.run({
            account: account.account,
            taskId: task.id,
            prompt: task.prompt,
            projectRoot,
            outputDir,
            provider,
          });

      task.containerId = container.name;
      pool.setContainer(account.account.id, container.name);

      createContainerRecord(`${container.name}-${Date.now()}`, task.id, account.account.id, container.name, config.settings.runtime);
      updateFleetTask(task.id, { status: "running", container_id: container.name });
      task.status = "running";

      running.set(task.id, { task, accountId: account.account.id });
    }

    if (running.size === 0 && pending.length > 0) {
      // All accounts busy or in cooldown — wait
      info(`Waiting for account... (${pending.length} pending, ${pool.counts().cooldown} cooling down)`);
      await pool.waitForAvailable(30_000);
      continue;
    }

    if (running.size === 0) break; // All done

    // Wait for any container to finish
    await new Promise((r) => setTimeout(r, 3000));

    // Check for completed containers
    for (const [taskId, entry] of running) {
      const result = await containers.waitForContainer(taskId);
      if (!result) continue; // Still running
      if (result.status !== "stopped" && result.status !== "failed") continue;

      const success = result.exitCode === 0;
      const isRateLimited = ContainerManager.isRateLimited(result.output || "", result.error || "");

      entry.task.completedAt = new Date().toISOString();

      if (isRateLimited) {
        // Rate limited — cooldown account, record attempt, requeue task
        warn(`[${taskId}] Rate limited on ${entry.accountId} — requeuing`);
        pool.cooldown(entry.accountId);
        onAccountCooldown(entry.accountId);
        entry.task.attemptedAccounts.push(entry.accountId);
        entry.task.status = "pending";
        entry.task.accountId = null;
        entry.task.containerId = null;
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

        // Write result to file
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

      updateContainerRecord(result.name, result.status, result.exitCode);
      running.delete(taskId);
    }
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
  const containers = new ContainerManager(config.settings);

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

  info("Phase 1: Decomposing task...");
  containers.run({
    account: decompAccount.account,
    taskId: "decompose-planning",
    prompt: decomposePrompt,
    projectRoot,
    outputDir: decompOutputDir,
  });

  const decompResult = await containers.waitForContainer("decompose-planning");
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
  const containers = new ContainerManager(config.settings);
  const runId = generateId();
  const startedAt = new Date().toISOString();
  const outputBase = join(projectRoot, ".fleet", runId);
  mkdirSync(outputBase, { recursive: true });

  // Pre-flight: ensure project has intel
  await ensureProjectIntel(config, projectRoot, containers);

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
      status: "pending", accountId: null, containerId: null,
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
    const container = pipelineLocal
      ? containers.runLocal({ taskId, prompt: stagePrompt, projectRoot, provider: pipelineProvider })
      : containers.run({
          account: allocated.account,
          taskId,
          prompt: stagePrompt,
          projectRoot,
          outputDir,
          provider: pipelineProvider,
    });

    task.containerId = container.name;
    pool.setContainer(allocated.account.id, container.name);

    createContainerRecord(container.name, taskId, allocated.account.id, container.name, config.settings.runtime);
    updateFleetTask(taskId, {
      status: "running", account_id: allocated.account.id,
      container_id: container.name, started_at: task.startedAt,
    });

    // Wait for stage to complete (pipeline is sequential)
    const result = await containers.waitForContainer(taskId);
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

    updateContainerRecord(container.name, result?.status || "failed", result?.exitCode);
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
): Promise<FleetRunResult> {
  const pool = new AccountPool(config);
  const containers = new ContainerManager(config.settings);

  // Pre-flight
  await ensureProjectIntel(config, projectRoot, containers);

  console.error(`\n${BOLD}Superpowers Mode${RESET} ${DIM}brainstorm → plan → execute${RESET}`);
  info(`Feature: "${featureDescription.slice(0, 80)}..."`);
  info(`Workers: ${workers} accounts`);

  // ── Phase 1: Brainstorm ──────────────────────────────────────────────────
  console.error(`\n${BOLD}Phase 1: Brainstorming${RESET} ${DIM}(design before code)${RESET}`);

  const brainstormAccount = pool.allocate("sp-brainstorm");
  if (!brainstormAccount) {
    error("No accounts available");
    return emptyResult("superpowers");
  }

  const brainstormPrompt = `You have superpowers. Use the brainstorming skill.

The user wants to build: ${featureDescription}

IMPORTANT: Since this is a non-interactive session, you cannot ask the user clarifying questions. Instead:
1. Explore the project context (files, docs, recent commits)
2. Make reasonable assumptions based on the codebase
3. Propose 2-3 approaches with trade-offs and pick the best one
4. Write a complete design document to docs/superpowers/specs/ and commit it
5. Do NOT ask questions — make decisions and document your reasoning

After writing the design doc, immediately invoke the writing-plans skill to create the implementation plan.
Save the plan to docs/superpowers/plans/ and commit it.

The plan MUST use checkbox format: - [ ] **Step N: description**
Each step should be 2-5 minutes of work, with exact file paths and code.`;

  const brainstormOutputDir = join(projectRoot, ".fleet", "superpowers-brainstorm");
  mkdirSync(brainstormOutputDir, { recursive: true });

  containers.run({
    account: brainstormAccount.account,
    taskId: "sp-brainstorm",
    prompt: brainstormPrompt,
    projectRoot,
    outputDir: brainstormOutputDir,
    provider: "claude",
  });

  info("Brainstorming + planning (this takes a few minutes)...");
  const brainstormResult = await containers.waitForContainer("sp-brainstorm");
  pool.release(brainstormAccount.account.id, brainstormResult?.exitCode === 0);

  if (brainstormResult?.exitCode !== 0) {
    error("Brainstorming failed");
    if (brainstormResult?.error) error(brainstormResult.error.slice(0, 500));
    return emptyResult("superpowers");
  }

  ok("Brainstorming + planning complete");

  // ── Phase 2: Extract tasks from plan ─────────────────────────────────────
  console.error(`\n${BOLD}Phase 2: Extracting tasks from plan${RESET}`);

  // Find the plan file
  const planDir = join(projectRoot, "docs", "superpowers", "plans");
  let planContent = "";

  if (existsSync(planDir)) {
    const planFiles = Bun.spawnSync(["find", planDir, "-name", "*.md", "-type", "f"])
      .stdout.toString().trim().split("\n").filter(Boolean);

    if (planFiles.length > 0) {
      // Get most recent plan
      const sorted = planFiles.sort().reverse();
      planContent = readFileSync(sorted[0], "utf-8");
      ok(`Found plan: ${sorted[0]}`);
    }
  }

  // If no plan file on disk, extract from brainstorm output
  if (!planContent && brainstormResult?.output) {
    planContent = brainstormResult.output;
    info("Using plan from brainstorm output");
  }

  if (!planContent) {
    error("No plan found — brainstorming didn't produce a plan");
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

  // ── Phase 4: Final review ────────────────────────────────────────────────
  if (result.summary.completed > 0) {
    console.error(`\n${BOLD}Phase 4: Code review${RESET}`);

    const reviewAccount = pool.allocate("sp-review");
    if (reviewAccount) {
      const reviewPrompt = `You have superpowers. Use the requesting-code-review skill.

Review all changes made in this session. Check:
1. Spec compliance — does the implementation match the design doc in docs/superpowers/specs/?
2. Code quality — clean, tested, no dead code, follows codebase patterns
3. Test coverage — are all cases covered? Do tests actually test behavior?

Write your review to docs/superpowers/reviews/ and commit.`;

      containers.run({
        account: reviewAccount.account,
        taskId: "sp-review",
        prompt: reviewPrompt,
        projectRoot,
        outputDir: join(projectRoot, ".fleet", "superpowers-review"),
        provider: "claude",
      });

      info("Running final code review...");
      const reviewResult = await containers.waitForContainer("sp-review");
      pool.release(reviewAccount.account.id, reviewResult?.exitCode === 0);

      if (reviewResult?.exitCode === 0) {
        ok("Code review complete");
        // Write review output
        const reviewPath = join(projectRoot, ".fleet", "superpowers-review", "review.txt");
        writeFileSync(reviewPath, reviewResult?.output || "(no output)");
      } else {
        warn("Code review failed (non-critical)");
      }
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

/** Group TDD tasks into batches (test+implement+verify should stay together). */
function batchTddTasks(
  tasks: Array<{ prompt: string; taskType: string }>,
): Array<Array<{ prompt: string; taskType: string }>> {
  const batches: Array<Array<{ prompt: string; taskType: string }>> = [];
  let current: Array<{ prompt: string; taskType: string }> = [];

  for (const task of tasks) {
    current.push(task);

    // TDD cycle: write test → run test → implement → run test → commit
    // Group these into batches of ~5 steps, or break on "commit" step
    const lower = task.prompt.toLowerCase();
    if (lower.includes("commit") || current.length >= 5) {
      batches.push([...current]);
      current = [];
    }
  }

  // Remaining tasks
  if (current.length > 0) {
    batches.push(current);
  }

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
  const containers = new ContainerManager(config.settings);
  const running = containers.listRunning();
  const cwd = process.cwd();
  const runs = showAll ? getRecentRuns(5) : getRunsByProject(cwd, 5);

  console.error(`${BOLD}Fleet Live Status${RESET}`);
  console.error("");

  // Running containers
  if (running.length > 0) {
    console.error(`  ${BOLD}Active Containers (${running.length}):${RESET}`);
    for (const c of running) {
      console.error(`    ${GREEN}●${RESET} ${c.name}  ${DIM}${c.status}${RESET}`);
    }
  } else {
    console.error(`  ${DIM}No active fleet containers${RESET}`);
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
${BOLD}Fleet — Multi-Account Container Orchestration${RESET}

${BOLD}Modes:${RESET}
  --pool <tasks.json>              Worker pool processes a queue of tasks
  --scatter <prompt>               Same task to N workers, merge results
  --decompose <prompt>             Split into subtasks, one per worker
  --pipeline <prompt> --stages ... Sequential stages, fresh account per stage
  --superpowers <feature>          Brainstorm → plan → fleet execute (TDD, reviews)

${BOLD}Options:${RESET}
  --workers <N>                    Max concurrent workers (default: all accounts)
  --stages <s1,s2,...>             Pipeline stages (comma-separated)
  --strategy <best|merge|all>      Scatter result strategy (default: merge)
  --project <path>                 Project root (default: cwd)
  --config <path>                  Account config path
  --task-type <type>               Task type for single-prompt modes

${BOLD}Management:${RESET}
  --status                         Show fleet status + recent runs
  --live                           Live view: active containers, progress, tasks
  --build-image                    Build the fleet container image
  --setup                          Interactive account setup wizard
  --from-csv <file>                Load accounts from CSV (one key per line or comma-separated)
  --init                           Create default config at ~/.claude/fleet/accounts.json
  --add-account                    Quick-add: --add-account "Label" KEY=val KEY2=val2
  --stop                           Stop all running fleet containers
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

  const containers = new ContainerManager(config.settings);

  // Check runtime
  if (!containers.runtimeAvailable()) {
    error(`Container runtime '${config.settings.runtime}' not available. Install Docker or Podman.`);
    process.exit(1);
  }

  // --build-image
  if (args.includes("--build-image")) {
    const dockerfilePath = join(import.meta.dir, "Dockerfile");
    if (!existsSync(dockerfilePath)) {
      error(`Dockerfile not found at ${dockerfilePath}`);
      process.exit(1);
    }
    info(`Building fleet image: ${config.settings.containerImage}...`);
    const result = containers.buildImage(dockerfilePath);
    if (result.success) {
      ok(`Image built: ${config.settings.containerImage}`);
    } else {
      error(`Build failed: ${result.output}`);
      process.exit(1);
    }
    return;
  }

  // --stop
  if (args.includes("--stop")) {
    const stopped = containers.stopAll();
    ok(`Stopped ${stopped} fleet container(s)`);
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

  // Check image exists
  if (!containers.imageExists()) {
    warn(`Fleet image '${config.settings.containerImage}' not found. Building...`);
    const dockerfilePath = join(import.meta.dir, "Dockerfile");
    const result = containers.buildImage(dockerfilePath);
    if (!result.success) {
      error(`Image build failed. Run: bun fleet/fleet.ts --build-image`);
      process.exit(1);
    }
    ok("Image built successfully");
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

  // --decompose <prompt>
  const decomposeIdx = args.indexOf("--decompose");
  if (decomposeIdx !== -1 && args[decomposeIdx + 1]) {
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

  // --superpowers <feature>
  const spIdx = args.indexOf("--superpowers");
  if (spIdx !== -1 && args[spIdx + 1]) {
    const feature = args[spIdx + 1];
    await runSuperpowers(config, feature, workers, projectRoot);
    return;
  }

  error("No mode specified. Use --pool, --scatter, --decompose, --pipeline, or --superpowers. See --help.");
  process.exit(1);
}

main().catch((err) => {
  error(err instanceof Error ? err.message : String(err));
  process.exit(1);
});
