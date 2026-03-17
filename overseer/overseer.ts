#!/usr/bin/env bun
// SDLC Overseer — Main Orchestrator
// Usage: bun overseer/overseer.ts --epic "Build a todo app with React and Supabase"
//        bun overseer/overseer.ts --status <epic-id>
//        bun overseer/overseer.ts --list

import { existsSync, mkdirSync } from "fs";
import { join } from "path";
import { initDb, createEpic, updateEpicStatus, getEpic, getTasksByEpic, getEpicStats, getSprintLog, logEvent, getRunningAgents, updateTaskStatus, enqueueMerge, getPendingMerges, updateMergeStatus } from "./db";
import { createWorktree, mergeWorktree, removeWorktree, ensureWorktreeGitignore, cleanupAllWorktrees } from "./worktree";
import { spawnAgent, killAgent, selectProvider } from "./spawner";
import { getNextBatch, isEpicComplete, getBlockedTasks, formatProgress } from "./scheduler";
import { buildKnowledgeContext } from "./knowledge";
import type { OverseerConfig, Task } from "./types";

// --- Config ---
const DB_PATH = join(process.env.HOME || "~", ".claude", "data", "overseer.db");
const PROJECT_ROOT = process.cwd();
const MAX_CONCURRENCY = 5;
const POLL_INTERVAL_MS = 5000; // Check for completed tasks every 5s

const config: OverseerConfig = {
  maxConcurrency: MAX_CONCURRENCY,
  dbPath: DB_PATH,
  worktreeRoot: join(PROJECT_ROOT, ".worktrees"),
  providers: [],
  projectRoot: PROJECT_ROOT,
};

// --- CLI Parsing ---
const args = process.argv.slice(2);
let mode: "epic" | "status" | "list" | "cleanup" = "epic";
let epicDescription = "";
let epicId = "";

for (let i = 0; i < args.length; i++) {
  switch (args[i]) {
    case "--epic": epicDescription = args[++i] || ""; mode = "epic"; break;
    case "--status": epicId = args[++i] || ""; mode = "status"; break;
    case "--list": mode = "list"; break;
    case "--cleanup": mode = "cleanup"; break;
    case "--max-concurrency": config.maxConcurrency = parseInt(args[++i] || "5", 10); break;
    case "--help":
    case "-h":
      console.log(`
SDLC Overseer — Virtual Engineering Team

Usage:
  bun overseer/overseer.ts --epic "Build a todo app"     Start a new epic
  bun overseer/overseer.ts --status <epic-id>            Show epic progress
  bun overseer/overseer.ts --list                        List all epics
  bun overseer/overseer.ts --cleanup                     Remove all worktrees

Options:
  --max-concurrency N    Max parallel agents (default: 5)
`);
      process.exit(0);
  }
}

// --- Initialize ---
const dbDir = join(process.env.HOME || "~", ".claude", "data");
if (!existsSync(dbDir)) mkdirSync(dbDir, { recursive: true });
initDb(DB_PATH);

// --- Logging ---
function log(msg: string) { console.log(`[overseer] ${msg}`); }
function logErr(msg: string) { console.error(`[overseer] ERROR: ${msg}`); }

// --- Mode: Status ---
if (mode === "status") {
  if (!epicId) { logErr("Missing epic ID. Usage: --status <epic-id>"); process.exit(1); }
  const epic = getEpic(epicId);
  if (!epic) { logErr(`Epic not found: ${epicId}`); process.exit(1); }

  console.log(`\nEpic: ${epic.title}`);
  console.log(`Status: ${epic.status}`);
  console.log(`Created: ${epic.created_at}\n`);
  console.log(formatProgress(epicId));

  const recentLog = getSprintLog(epicId, 10);
  if (recentLog.length > 0) {
    console.log("\nRecent events:");
    for (const entry of recentLog.reverse()) {
      console.log(`  [${entry.timestamp.slice(11, 19)}] ${entry.agent_role}: ${entry.details}`);
    }
  }
  process.exit(0);
}

// --- Mode: List ---
if (mode === "list") {
  const { getDb } = await import("./db");
  const epics = getDb().prepare("SELECT * FROM epics ORDER BY created_at DESC").all() as Array<{ id: string; title: string; status: string; created_at: string }>;
  if (epics.length === 0) { console.log("No epics found."); process.exit(0); }

  console.log("\nEpics:");
  for (const e of epics) {
    const stats = getEpicStats(e.id);
    console.log(`  ${e.id.slice(0, 8)} | ${e.status.padEnd(10)} | ${stats.done}/${stats.total} tasks | ${e.title}`);
  }
  process.exit(0);
}

// --- Mode: Cleanup ---
if (mode === "cleanup") {
  log("Cleaning up all worktrees...");
  cleanupAllWorktrees(PROJECT_ROOT);
  log("Done.");
  process.exit(0);
}

// --- Mode: Epic ---
if (!epicDescription) {
  logErr("Missing epic description. Usage: --epic \"Build a todo app\"");
  process.exit(1);
}

log(`Starting epic: "${epicDescription}"`);
log(`Max concurrency: ${config.maxConcurrency}`);
log(`Project root: ${PROJECT_ROOT}`);
log(`Database: ${DB_PATH}`);

// Ensure .worktrees is gitignored
ensureWorktreeGitignore(PROJECT_ROOT);

// Create the epic
const epic = createEpic(epicDescription, epicDescription);
updateEpicStatus(epic.id, "planning");
log(`Epic created: ${epic.id}`);

// --- Phase 1: Planning ---
// Spawn Product Manager to break epic into stories
log("Phase 1: Planning — spawning Product Manager...");

const pmPrompt = `You are the Product Manager for this epic:

"${epicDescription}"

Your job:
1. Break this epic into 3-8 user stories
2. Each story needs: title, description, acceptance criteria, priority (P0-P3), story points (1-5)
3. Write the stories as a JSON array to a file: .overseer/stories.json

Format:
[
  {
    "title": "Story title",
    "description": "What and why",
    "acceptance_criteria": "- Criterion 1\\n- Criterion 2",
    "priority": "P0",
    "story_points": 3
  }
]

Think about the user's perspective. What are the minimum stories to deliver a working product?
Consider: setup/scaffolding, core features, UI, data persistence, error handling, testing.
Write the JSON file and nothing else.`;

// For planning, we don't need a worktree — run in project root
const pmWorktree = createWorktree(PROJECT_ROOT, epic.id, "planning");

// Create a placeholder task for the PM
const { createTask, createStory } = await import("./db");
const pmTask = createTask(
  // We need a story first — create a meta-story for planning
  (() => {
    const planningStory = createStory(epic.id, "Epic Planning", "Break epic into stories and tasks", "Stories and tasks created", "P0", 1);
    return planningStory.id;
  })(),
  epic.id,
  "Break epic into user stories",
  pmPrompt,
  "docs",
  "product-manager",
);

const provider = selectProvider("docs", PROJECT_ROOT);
log(`Spawning PM agent (provider: ${provider})...`);

const pmResult = spawnAgent({
  task: pmTask,
  epicId: epic.id,
  role: "product-manager",
  worktreePath: pmWorktree.path,
  branchName: pmWorktree.branch,
  prompt: pmPrompt,
  projectRoot: PROJECT_ROOT,
  provider,
});

log(`PM agent spawned (PID: ${pmResult.process.pid})`);
log("Waiting for PM to complete planning...");

// Wait for PM to finish
await new Promise<void>((resolve) => {
  pmResult.process.on("close", () => resolve());
});

log("PM completed. Moving to execution phase...");
updateEpicStatus(epic.id, "active");

// --- Phase 2: Execution Loop ---
// Poll for ready tasks, spawn agents, track completion, merge results
log("Phase 2: Execution — starting scheduler loop...");

async function executionLoop() {
  while (!isEpicComplete(epic.id)) {
    // 1. Get next batch of ready tasks
    const batch = getNextBatch(epic.id, config.maxConcurrency);

    // 2. Spawn agents for each task
    for (const task of batch) {
      const wt = createWorktree(PROJECT_ROOT, epic.id, task.id);
      const prov = selectProvider(task.type, PROJECT_ROOT);
      const knowledgeCtx = buildKnowledgeContext(epic.id);

      const prompt = [
        task.description,
        knowledgeCtx ? `\n${knowledgeCtx}` : "",
      ].join("\n");

      log(`Spawning ${task.assigned_role}: ${task.title} (provider: ${prov}, branch: ${wt.branch})`);

      spawnAgent({
        task,
        epicId: epic.id,
        role: (task.assigned_role || "engineer") as any,
        worktreePath: wt.path,
        branchName: wt.branch,
        prompt,
        projectRoot: PROJECT_ROOT,
        provider: prov,
      });
    }

    // 3. Process merge queue
    const pendingMerges = getPendingMerges();
    for (const merge of pendingMerges) {
      log(`Merging: ${merge.branch_name}`);
      updateMergeStatus(merge.id, "merging");
      const result = mergeWorktree(PROJECT_ROOT, merge.branch_name);

      if (result.success) {
        updateMergeStatus(merge.id, "merged");
        updateTaskStatus(merge.task_id, "done");
        logEvent(epic.id, "merge_completed", `Merged: ${merge.branch_name}`, "merge-manager");
        removeWorktree(PROJECT_ROOT, merge.worktree_path, merge.branch_name);
        log(`Merged successfully: ${merge.branch_name}`);
      } else {
        updateMergeStatus(merge.id, "conflict", { conflictFiles: result.conflicts?.join(", ") });
        logEvent(epic.id, "conflict_detected", `Conflict in ${merge.branch_name}: ${result.conflicts?.join(", ")}`, "merge-manager");
        log(`CONFLICT in ${merge.branch_name}: ${result.conflicts?.join(", ")}`);
      }
    }

    // 4. Check for blocked tasks
    const blocked = getBlockedTasks(epic.id);
    for (const t of blocked) {
      log(`BLOCKED: ${t.title} (dependency failed)`);
      updateTaskStatus(t.id, "failed");
    }

    // 5. Print progress
    console.log("\n" + formatProgress(epic.id) + "\n");

    // 6. Wait before next poll
    await new Promise(resolve => setTimeout(resolve, POLL_INTERVAL_MS));
  }
}

await executionLoop();

// --- Complete ---
const stats = getEpicStats(epic.id);
updateEpicStatus(epic.id, stats.failed > 0 ? "done" : "done");

log("\n=== Epic Complete ===");
log(`Title: ${epic.title}`);
log(`Tasks: ${stats.done} done, ${stats.failed} failed, ${stats.total} total`);
log(`Epic ID: ${epic.id}`);

// Cleanup worktrees
cleanupAllWorktrees(PROJECT_ROOT);
log("Worktrees cleaned up.");
