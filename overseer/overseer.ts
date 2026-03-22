#!/usr/bin/env bun
// SDLC Overseer — Main Orchestrator
// Usage: bun overseer/overseer.ts --epic "Build a todo app with React and Supabase"
//        bun overseer/overseer.ts --status <epic-id>
//        bun overseer/overseer.ts --list

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import {
  initDb, createEpic, updateEpicStatus, getEpic, getEpicStats,
  getSprintLog, logEvent, createStory, createTask, updateTaskStatus,
  enqueueMerge, getPendingMerges, updateMergeStatus, getTasksByEpic,
} from "./db";
import { createWorktree, mergeWorktree, removeWorktree, ensureWorktreeGitignore, cleanupAllWorktrees } from "./worktree";
import { spawnAgent, selectProvider } from "./spawner";
import { getNextBatch, isEpicComplete, getBlockedTasks, formatProgress } from "./scheduler";
import { buildKnowledgeContext, exportKnowledgeToVault } from "./knowledge";
import { generateBoard } from "./board";
import { runBrowserVerification } from "./browser-verify";
import { detectInternalProject, isKiroAvailable } from "./kiro";
import { isMemoryAvailable, captureMemory } from "./memory";
import { setInternalMode } from "./spawner";
import { canUseCmux, onEpicStart, onProgress, onEpicComplete, onAgentStart, onMergeComplete, getPlatformInfo } from "./cmux";
import type { OverseerConfig, AgentRole, Priority, TaskType } from "./types";

// --- Config ---
const HOME = process.env.HOME || process.env.USERPROFILE || "~";
const DB_PATH = join(HOME, ".claude", "data", "overseer.db");
const PROJECT_ROOT = process.cwd();
const MAX_CONCURRENCY = 5;
const POLL_INTERVAL_MS = 5000;

const config: OverseerConfig = {
  maxConcurrency: MAX_CONCURRENCY,
  dbPath: DB_PATH,
  worktreeRoot: join(PROJECT_ROOT, ".worktrees"),
  providers: [],
  projectRoot: PROJECT_ROOT,
};

// --- CLI ---
const args = process.argv.slice(2);
let mode: "epic" | "status" | "list" | "cleanup" = "epic";
let epicDescription = "";
let epicId = "";
let forceInternal: boolean | null = null; // null = auto-detect

for (let i = 0; i < args.length; i++) {
  switch (args[i]) {
    case "--epic": epicDescription = args[++i] || ""; mode = "epic"; break;
    case "--status": epicId = args[++i] || ""; mode = "status"; break;
    case "--list": mode = "list"; break;
    case "--cleanup": mode = "cleanup"; break;
    case "--internal": forceInternal = true; break;
    case "--external": forceInternal = false; break;
    case "--max-concurrency": config.maxConcurrency = parseInt(args[++i] || "5", 10); break;
    case "--help": case "-h":
      console.log(`
SDLC Overseer — Virtual Engineering Team

Usage:
  bun overseer/overseer.ts --epic "Build a todo app"     Start a new epic
  bun overseer/overseer.ts --status <epic-id>            Show epic progress
  bun overseer/overseer.ts --list                        List all epics
  bun overseer/overseer.ts --cleanup                     Remove all worktrees

Options:
  --internal               Force internal mode (Kiro-assisted, Amazon patterns)
  --external               Force external mode (standard, no Kiro)
  --max-concurrency N      Max parallel agents (default: 5)
`);
      process.exit(0);
  }
}

// --- Init ---
const dbDir = join(HOME, ".claude", "data");
if (!existsSync(dbDir)) mkdirSync(dbDir, { recursive: true });
initDb(DB_PATH);

function log(msg: string) { console.log(`[overseer] ${msg}`); }
function logErr(msg: string) { console.error(`[overseer] ERROR: ${msg}`); }

// Ensure .overseer/ exists for planning artifacts
const overseerDir = join(PROJECT_ROOT, ".overseer");
if (!existsSync(overseerDir)) mkdirSync(overseerDir, { recursive: true });

// --- Mode: Status ---
if (mode === "status") {
  if (!epicId) { logErr("Missing epic ID"); process.exit(1); }
  const epic = getEpic(epicId);
  if (!epic) { logErr(`Epic not found: ${epicId}`); process.exit(1); }
  console.log(`\nEpic: ${epic.title}`);
  console.log(`Status: ${epic.status}`);
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
  const epics = getDb().prepare("SELECT * FROM epics ORDER BY created_at DESC").all() as Array<{ id: string; title: string; status: string }>;
  if (epics.length === 0) { console.log("No epics found."); process.exit(0); }
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
if (!epicDescription) { logErr("Missing --epic. Use --help."); process.exit(1); }

// --- Internal Mode Detection ---
let isInternal = false;
if (forceInternal !== null) {
  isInternal = forceInternal;
} else {
  const detection = detectInternalProject(PROJECT_ROOT);
  isInternal = detection.isInternal;
  if (isInternal) {
    log(`Internal project detected: ${detection.indicators.join(", ")}`);
  }
}

if (isInternal) {
  if (isKiroAvailable()) {
    setInternalMode(true);
    log("Internal mode: ON — Kiro CLI will be consulted for internal context");
  } else {
    log("WARNING: Internal project detected but kiro-cli not installed. Running without internal context.");
    log("  Install: npm install -g @anthropic-ai/kiro-cli && kiro auth");
  }
}

log(`Starting epic: "${epicDescription}"`);
log(`Mode: ${isInternal ? "INTERNAL (Kiro-assisted)" : "EXTERNAL"}`);
log(`Max concurrency: ${config.maxConcurrency}`);

// Platform info
const platform = getPlatformInfo();
if (platform.ssh) log("Running over SSH — cmux terminal tabs disabled");

// Memory status
if (isMemoryAvailable()) {
  log("claude-mem: connected — agents will read/write persistent memory");
} else {
  log("claude-mem: offline — agents run without cross-session memory");
}

ensureWorktreeGitignore(PROJECT_ROOT);

const epic = createEpic(epicDescription, epicDescription);
updateEpicStatus(epic.id, "planning");
log(`Epic ID: ${epic.id.slice(0, 8)}`);

// cmux integration: open dashboard split + sidebar status (macOS only, no-op elsewhere)
if (canUseCmux()) {
  const overseerDir = new URL(".", import.meta.url).pathname;
  onEpicStart(overseerDir, epic.id, epicDescription);
  log("cmux: Dashboard split opened + sidebar status set");
}

// ===== PHASE 0: REQUIREMENTS GATHERING (GSD-inspired) =====
// Requirements Analyst + Domain Researcher run BEFORE any planning.
// This ensures the overseer has complete details before building anything.

log("\n=== REQUIREMENTS PHASE ===");
log("Gathering complete requirements before planning...");

const planningStory = createStory(epic.id, "Epic Planning", "Plan the epic", "Stories and tasks created", "P0" as Priority, 1);

// --- Step 0a: Requirements Analyst → PROJECT.md + REQUIREMENTS.md ---
const raPrompt = `You are a Requirements Analyst. Your job is to deeply understand this epic and produce structured requirements documents BEFORE any planning begins.

Epic: "${epicDescription}"

IMPORTANT: You MUST create the directory and write the files.

1. Run: mkdir -p .overseer
2. Explore the project directory to understand if this is a new or existing project
3. Identify gray areas — what's ambiguous, what assumptions are you making?
4. Write .overseer/PROJECT.md with: vision, goals, users/roles, core flows, tech stack, assumptions, open questions
5. Write .overseer/REQUIREMENTS.md with: must-have (v1), should-have, could-have (v2), out-of-scope, non-functional requirements

Use MoSCoW prioritization. Number requirements (REQ-001, REQ-002...).
If it's a brownfield project, note existing patterns that must be followed.
Be thorough — downstream agents (PM, Tech Lead, Engineers) depend on your output.`;

const raTask = createTask(planningStory.id, epic.id, "Gather requirements", raPrompt, "docs" as TaskType, "requirements-analyst");
await runPlanningAgent(raTask.id, "requirements-analyst", raPrompt);
log("Requirements Analyst completed.");

// --- Step 0b: Domain Researcher → RESEARCH.md (parallel-safe, but run after RA so it can read PROJECT.md) ---
const drPrompt = `You are a Domain Researcher. Investigate the technical domain for this project.

1. Read .overseer/PROJECT.md and .overseer/REQUIREMENTS.md (created by requirements analyst)
2. If existing project: read package.json, tsconfig.json, explore src/ structure
3. Research: tech stack validation, key libraries, implementation patterns, integration notes, risks
4. Write .overseer/RESEARCH.md with: tech stack assessment, key libraries table, implementation patterns, risks & gotchas, recommendations for planning
5. Write .overseer/knowledge/research-findings.json with key decisions as JSON array

Focus on decisions that would be expensive to change later. Time-box: investigate what matters.`;

const drTask = createTask(planningStory.id, epic.id, "Research domain", drPrompt, "docs" as TaskType, "domain-researcher");
await runPlanningAgent(drTask.id, "domain-researcher", drPrompt);
log("Domain Researcher completed.");

// Move research artifacts to References/ vault directory
const refsDir = join(overseerDir, "References");
if (!existsSync(refsDir)) mkdirSync(refsDir, { recursive: true });
for (const docName of ["RESEARCH.md", "REQUIREMENTS.md", "PROJECT.md"]) {
  const srcPath = join(overseerDir, docName);
  if (existsSync(srcPath)) {
    const content = readFileSync(srcPath, "utf-8");
    writeFileSync(join(refsDir, docName), content);
    log(`Moved ${docName} → References/${docName}`);
  }
}

// ===== PHASE 1: PLANNING =====
log("\n=== PLANNING PHASE ===");

// --- Step 1: Product Manager → stories.json (now reads PROJECT.md + REQUIREMENTS.md + RESEARCH.md) ---
log("Spawning Product Manager...");

const pmPrompt = `You are a Product Manager. Break this epic into user stories.

Epic: "${epicDescription}"

IMPORTANT: Read these files FIRST (created by requirements analyst and researcher):
- .overseer/PROJECT.md — project vision, goals, users, core flows
- .overseer/REQUIREMENTS.md — prioritized requirements (MoSCoW)
- .overseer/RESEARCH.md — tech stack research, patterns, risks

Then:
1. Create user stories that cover ALL "Must Have" requirements from REQUIREMENTS.md
2. Each story maps to one or more requirements (reference REQ-xxx)
3. Write 3-8 user stories as JSON to .overseer/stories.json

Format (STRICT — valid JSON array):
[
  {
    "title": "Story title",
    "description": "What to build and why. References: REQ-001, REQ-003",
    "acceptance_criteria": "- AC 1\\n- AC 2",
    "priority": "P0",
    "story_points": 2
  }
]

Stories must trace back to requirements. Every Must-Have requirement should be covered by at least one story.
Keep it simple and focused. Write the file, then stop.`;

const pmTask = createTask(planningStory.id, epic.id, "Break epic into stories", pmPrompt, "docs" as TaskType, "product-manager");

await runPlanningAgent(pmTask.id, "product-manager", pmPrompt);
log("Product Manager completed.");

// Parse stories.json → create Story records
const storiesPath = join(PROJECT_ROOT, ".overseer", "stories.json");
let stories: Array<{ title: string; description: string; acceptance_criteria: string; priority: string; story_points: number }> = [];

if (existsSync(storiesPath)) {
  try {
    stories = JSON.parse(readFileSync(storiesPath, "utf-8"));
    log(`Parsed ${stories.length} stories from stories.json`);
  } catch (err) {
    logErr(`Failed to parse stories.json: ${err}`);
  }
} else {
  logErr("stories.json not found — PM agent may have failed. Creating default stories.");
  stories = [
    { title: "Project Setup", description: "Initialize project structure and dependencies", acceptance_criteria: "- Project builds\n- Dependencies installed", priority: "P0", story_points: 1 },
    { title: "Core Implementation", description: epicDescription, acceptance_criteria: "- Feature works end-to-end", priority: "P0", story_points: 3 },
    { title: "Testing", description: "Write tests for core functionality", acceptance_criteria: "- Tests pass\n- Key paths covered", priority: "P1", story_points: 2 },
  ];
  writeFileSync(storiesPath, JSON.stringify(stories, null, 2));
}

// Create Story records in DB
const storyRecords = stories.map(s =>
  createStory(epic.id, s.title, s.description, s.acceptance_criteria, s.priority as Priority, s.story_points)
);
log(`Created ${storyRecords.length} stories in database.`);

// --- Step 2: Project Manager → tasks.json ---
log("Spawning Project Manager...");

const pjmPrompt = `You are a Project Manager. Read .overseer/stories.json and break each story into implementation tasks.

1. Read .overseer/stories.json
2. For each story, create 1-4 concrete tasks
3. Assign roles: frontend-engineer, backend-engineer, engineer, senior-engineer, qa-engineer
4. Identify dependencies between tasks (by title)
5. Write to .overseer/tasks.json

Format (STRICT — valid JSON array):
[
  {
    "story_title": "Parent Story Title (must match exactly)",
    "title": "Task title",
    "description": "Specific instructions for the engineer",
    "type": "backend",
    "assigned_role": "backend-engineer",
    "dependencies": [],
    "priority": "P0"
  }
]

Task types: frontend, backend, api, test, infra, docs, design
Keep tasks small (1-3 files each). Write the file, then stop.`;

const pjmTask = createTask(planningStory.id, epic.id, "Create sprint tasks", pjmPrompt, "docs" as TaskType, "project-manager");
await runPlanningAgent(pjmTask.id, "project-manager", pjmPrompt);
log("Project Manager completed.");

// Parse tasks.json → create Task records
const tasksPath = join(PROJECT_ROOT, ".overseer", "tasks.json");
let taskDefs: Array<{ story_title: string; title: string; description: string; type: string; assigned_role: string; dependencies: string[]; priority: string }> = [];

if (existsSync(tasksPath)) {
  try {
    taskDefs = JSON.parse(readFileSync(tasksPath, "utf-8"));
    log(`Parsed ${taskDefs.length} tasks from tasks.json`);
  } catch (err) {
    logErr(`Failed to parse tasks.json: ${err}`);
  }
} else {
  logErr("tasks.json not found — PjM agent may have failed. Creating default tasks.");
  taskDefs = storyRecords.map(s => ({
    story_title: s.title,
    title: `Implement: ${s.title}`,
    description: s.description,
    type: "backend" as string,
    assigned_role: "engineer",
    dependencies: [],
    priority: s.priority,
  }));
  writeFileSync(tasksPath, JSON.stringify(taskDefs, null, 2));
}

// Build story title → ID map
const storyMap = new Map(storyRecords.map(s => [s.title, s.id]));

// Build task title → ID map (for dependency resolution)
const taskTitleToId = new Map<string, string>();

// Create Task records in DB
for (const td of taskDefs) {
  const storyId = storyMap.get(td.story_title) || storyRecords[0]?.id || planningStory.id;
  // Resolve dependency titles to IDs
  const depIds = td.dependencies
    .map(depTitle => taskTitleToId.get(depTitle))
    .filter((id): id is string => !!id);

  const task = createTask(
    storyId, epic.id, td.title, td.description,
    (td.type || "backend") as TaskType,
    td.assigned_role || "engineer",
    depIds,
  );
  taskTitleToId.set(td.title, task.id);
}

log(`Created ${taskDefs.length} tasks in database.`);
updateTaskStatus(pmTask.id, "done");
updateTaskStatus(pjmTask.id, "done");

// ===== EXECUTION PHASE =====
updateEpicStatus(epic.id, "active");

// Generate board after planning
generateBoard(epic.id, PROJECT_ROOT);
log("Sprint board generated: .overseer/board.md, .overseer/epic.md");

log("\n=== EXECUTION PHASE ===");
log(formatProgress(epic.id));

// Track running agent processes
const runningProcesses = new Map<string, { pid: number; taskId: string }>();

async function executionLoop() {
  let emptyLoops = 0;

  while (!isEpicComplete(epic.id)) {
    // 1. Check for tasks in "review" status → enqueue for merge
    const allTasks = getTasksByEpic(epic.id);
    for (const task of allTasks) {
      if (task.status === "review") {
        // Planning tasks (branch "main" or no branch) skip merge — mark done directly
        if (!task.branch_name || task.branch_name === "main" || !task.worktree_path || task.worktree_path === PROJECT_ROOT) {
          updateTaskStatus(task.id, "done");
          continue;
        }
        log(`Task completed, enqueueing merge: ${task.title}`);
        enqueueMerge(task.id, task.branch_name, task.worktree_path);
        updateTaskStatus(task.id, "merged"); // Move out of review to prevent re-enqueue
      }
    }

    // 2. Process merge queue
    const pendingMerges = getPendingMerges();
    for (const merge of pendingMerges) {
      log(`Merging: ${merge.branch_name}`);
      updateMergeStatus(merge.id, "merging");
      try {
        const result = mergeWorktree(PROJECT_ROOT, merge.branch_name);
        if (result.success) {
          updateMergeStatus(merge.id, "merged");
          updateTaskStatus(merge.task_id, "done");
          logEvent(epic.id, "merge_completed", `Merged: ${merge.branch_name}`, "merge-manager");
          removeWorktree(PROJECT_ROOT, merge.worktree_path, merge.branch_name);
          log(`  Merged: ${merge.branch_name}`);
          onMergeComplete(merge.branch_name);
        } else {
          updateMergeStatus(merge.id, "conflict", { conflictFiles: result.conflicts?.join(", ") });
          logEvent(epic.id, "conflict_detected", merge.branch_name, "merge-manager");
          log(`  CONFLICT: ${merge.branch_name} — ${result.conflicts?.join(", ")}`);
          // Mark as done anyway to unblock pipeline (conflict logged)
          updateTaskStatus(merge.task_id, "done");
        }
      } catch (err) {
        logErr(`Merge failed: ${err}`);
        updateMergeStatus(merge.id, "failed");
        updateTaskStatus(merge.task_id, "done"); // Don't block pipeline
      }
    }

    // 3. Spawn new agents for ready tasks
    const batch = getNextBatch(epic.id, config.maxConcurrency);
    for (const task of batch) {
      try {
        const wt = createWorktree(PROJECT_ROOT, epic.id, task.id);
        const prov = selectProvider(task.type, PROJECT_ROOT);
        const knowledgeCtx = buildKnowledgeContext(epic.id);

        const taskPrompt = [
          task.description,
          knowledgeCtx ? `\n${knowledgeCtx}` : "",
          `\nWhen done, commit your changes and exit.`,
        ].join("\n");

        log(`Spawning ${task.assigned_role}: ${task.title} [${wt.branch}]`);
        onAgentStart(task.assigned_role, task.title);

        const result = spawnAgent({
          task,
          epicId: epic.id,
          role: (task.assigned_role || "engineer") as AgentRole,
          worktreePath: wt.path,
          branchName: wt.branch,
          prompt: taskPrompt,
          projectRoot: PROJECT_ROOT,
          provider: prov,
        });

        if (result.process.pid) {
          runningProcesses.set(task.id, { pid: result.process.pid, taskId: task.id });
        }
      } catch (err) {
        logErr(`Failed to spawn agent for task "${task.title}": ${err}`);
        updateTaskStatus(task.id, "failed");
      }
    }

    // 4. Mark blocked tasks
    for (const t of getBlockedTasks(epic.id)) {
      log(`BLOCKED: ${t.title}`);
      updateTaskStatus(t.id, "failed");
    }

    // 5. Progress + update board + cmux sidebar
    const progress = formatProgress(epic.id);
    console.log(`\n${progress}`);
    generateBoard(epic.id, PROJECT_ROOT);
    const pStats = getEpicStats(epic.id);
    onProgress(pStats.done, pStats.total, "Executing");

    // 6. Detect stall (no tasks running, none ready, not complete)
    if (batch.length === 0 && pendingMerges.length === 0) {
      emptyLoops++;
      if (emptyLoops > 6) { // 30 seconds with no progress
        log("Pipeline stalled — no tasks running or ready. Checking...");
        const stats = getEpicStats(epic.id);
        if (stats.queued === 0 && stats.inProgress === 0) {
          log("All tasks processed. Exiting loop.");
          break;
        }
      }
    } else {
      emptyLoops = 0;
    }

    await new Promise(resolve => setTimeout(resolve, POLL_INTERVAL_MS));
  }
}

await executionLoop();

// ===== COMPLETE =====
const stats = getEpicStats(epic.id);
updateEpicStatus(epic.id, "done");

log("\n=== EPIC COMPLETE ===");
log(`Epic: ${epic.title}`);
log(`Tasks: ${stats.done} done, ${stats.failed} failed, ${stats.total} total`);
log(`ID: ${epic.id}`);
log(formatProgress(epic.id));

// Browser verification (cmux only — opens browser, checks UI elements)
log("Running browser verification...");
const uiResult = await runBrowserVerification({ projectRoot: PROJECT_ROOT, epicId: epic.id });
if (uiResult) {
  const uiPass = uiResult.checks.filter(c => c.passed).length;
  const uiTotal = uiResult.checks.length;
  log(`UI Verification: ${uiPass}/${uiTotal} checks passed`);
  if (uiResult.screenshot) log(`Screenshot: ${uiResult.screenshot}`);
} else {
  log("Browser verification skipped (cmux not available or not a web project)");
}

// Export knowledge to vault Notes/ directory
exportKnowledgeToVault(epic.id, overseerDir);
log("Knowledge exported to .overseer/Notes/");

// Final board update + cmux completion
generateBoard(epic.id, PROJECT_ROOT);
log("Final board written to .overseer/");
onEpicComplete(epic.title, stats);

// Persist epic completion to memory (cross-session learning)
captureMemory({
  type: "feature",
  content: `SDLC Epic completed: "${epic.title}" — ${stats.done}/${stats.total} tasks done, ${stats.failed} failed. Mode: ${isInternal ? "internal" : "external"}.`,
  context: `Epic ID: ${epic.id}. Project: ${PROJECT_ROOT}.`,
});

cleanupAllWorktrees(PROJECT_ROOT);
log("Worktrees cleaned up.");

// --- Helper: Run a planning agent in the project root (not worktree) ---
async function runPlanningAgent(taskId: string, role: AgentRole, prompt: string): Promise<void> {
  updateTaskStatus(taskId, "in_progress");
  const task = (await import("./db")).getTask(taskId)!;
  const provider = selectProvider("docs", PROJECT_ROOT);

  const result = spawnAgent({
    task,
    epicId: epic.id,
    role,
    worktreePath: PROJECT_ROOT, // Planning agents work in project root
    branchName: "main",
    prompt,
    projectRoot: PROJECT_ROOT,
    provider,
  });

  log(`  ${role} spawned (PID: ${result.process.pid}, provider: ${provider})`);

  return new Promise<void>((resolve) => {
    result.process.on("close", (code) => {
      log(`  ${role} exited (code: ${code})`);
      // Planning agents go straight to "done" — no merge queue
      updateTaskStatus(taskId, code === 0 ? "done" : "failed");
      resolve();
    });
    // Timeout after 5 minutes
    setTimeout(() => {
      log(`  ${role} timed out — killing`);
      try { result.process.kill("SIGTERM"); } catch {}
      updateTaskStatus(taskId, "done");
      resolve();
    }, 5 * 60 * 1000);
  });
}
