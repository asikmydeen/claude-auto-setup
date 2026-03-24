// Fleet — SQLite Database
// Tracks runs, tasks, and container history.
// Separate from overseer.db and sidekick.db.

import { Database } from "bun:sqlite";
import { existsSync, mkdirSync } from "fs";
import { join } from "path";
import type { FleetRunRecord, FleetTaskRecord, FleetContainerRecord, FleetIntelRecord } from "./types";

const DB_DIR = join(process.env.HOME || "~", ".claude", "data");
const DB_PATH = join(DB_DIR, "fleet.db");

let db: Database;

function getDb(): Database {
  if (db) return db;

  if (!existsSync(DB_DIR)) {
    mkdirSync(DB_DIR, { recursive: true });
  }

  db = new Database(DB_PATH);
  db.run("PRAGMA journal_mode = WAL");
  db.run("PRAGMA foreign_keys = ON");
  db.run("PRAGMA busy_timeout = 5000");

  // Create tables
  db.run(`CREATE TABLE IF NOT EXISTS fleet_runs (
    id TEXT PRIMARY KEY,
    mode TEXT NOT NULL,
    prompt TEXT NOT NULL,
    workers INTEGER NOT NULL DEFAULT 1,
    project_root TEXT NOT NULL DEFAULT '',
    status TEXT NOT NULL DEFAULT 'running',
    started_at TEXT NOT NULL,
    completed_at TEXT,
    summary TEXT
  )`);

  // Migration: add project_root if table already exists without it
  try {
    db.run("ALTER TABLE fleet_runs ADD COLUMN project_root TEXT NOT NULL DEFAULT ''");
  } catch { /* column already exists */ }

  db.run(`CREATE TABLE IF NOT EXISTS fleet_tasks (
    id TEXT PRIMARY KEY,
    run_id TEXT NOT NULL REFERENCES fleet_runs(id),
    prompt TEXT NOT NULL,
    task_type TEXT NOT NULL DEFAULT 'general',
    mode TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    account_id TEXT,
    container_id TEXT,
    parent_task_id TEXT,
    stage INTEGER,
    result TEXT,
    error TEXT,
    started_at TEXT,
    completed_at TEXT,
    created_at TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS fleet_containers (
    id TEXT PRIMARY KEY,
    task_id TEXT NOT NULL,
    account_id TEXT NOT NULL,
    name TEXT NOT NULL,
    runtime TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'creating',
    exit_code INTEGER,
    started_at TEXT NOT NULL,
    stopped_at TEXT
  )`);

  // Intel cache — stores project intel with fingerprint-based dedup and TTL
  db.run(`CREATE TABLE IF NOT EXISTS fleet_intel (
    project_fingerprint TEXT PRIMARY KEY,
    project_root TEXT NOT NULL,
    git_remote TEXT,
    intel_content TEXT,
    patterns_content TEXT,
    file_hash TEXT NOT NULL,
    generated_at TEXT NOT NULL,
    expires_at TEXT NOT NULL,
    generation_status TEXT NOT NULL DEFAULT 'success',
    token_cost INTEGER DEFAULT 0
  )`);
  db.run("CREATE INDEX IF NOT EXISTS idx_fleet_intel_root ON fleet_intel(project_root)");

  // Indexes
  db.run("CREATE INDEX IF NOT EXISTS idx_fleet_tasks_run ON fleet_tasks(run_id)");
  db.run("CREATE INDEX IF NOT EXISTS idx_fleet_tasks_status ON fleet_tasks(status)");
  db.run("CREATE INDEX IF NOT EXISTS idx_fleet_containers_task ON fleet_containers(task_id)");

  return db;
}

// --- Prepared Statements (cached for performance) ---

let _cachedStmts: ReturnType<typeof buildStmts> | null = null;

function buildStmts(d: Database) {
  return {
    // Runs
    insertRun: d.prepare(
      "INSERT INTO fleet_runs (id, mode, prompt, workers, project_root, status, started_at) VALUES ($id, $mode, $prompt, $workers, $project_root, $status, $started_at)"
    ),
    updateRun: d.prepare(
      "UPDATE fleet_runs SET status = COALESCE($status, status), completed_at = COALESCE($completed_at, completed_at), summary = COALESCE($summary, summary) WHERE id = $id"
    ),
    getRun: d.prepare("SELECT * FROM fleet_runs WHERE id = $id"),
    getRecentRuns: d.prepare("SELECT * FROM fleet_runs ORDER BY started_at DESC LIMIT $limit"),
    getRunsByProject: d.prepare("SELECT * FROM fleet_runs WHERE project_root = $project_root ORDER BY started_at DESC LIMIT $limit"),

    // Tasks
    insertTask: d.prepare(
      "INSERT INTO fleet_tasks (id, run_id, prompt, task_type, mode, status, parent_task_id, stage, created_at) VALUES ($id, $run_id, $prompt, $task_type, $mode, $status, $parent_task_id, $stage, $created_at)"
    ),
    updateTask: d.prepare(
      "UPDATE fleet_tasks SET status = COALESCE($status, status), account_id = COALESCE($account_id, account_id), container_id = COALESCE($container_id, container_id), result = COALESCE($result, result), error = COALESCE($error, error), started_at = COALESCE($started_at, started_at), completed_at = COALESCE($completed_at, completed_at) WHERE id = $id"
    ),
    getTask: d.prepare("SELECT * FROM fleet_tasks WHERE id = $id"),
    getTasksByRun: d.prepare("SELECT * FROM fleet_tasks WHERE run_id = $run_id ORDER BY created_at"),
    getPendingTasks: d.prepare("SELECT * FROM fleet_tasks WHERE run_id = $run_id AND status = 'pending' ORDER BY created_at"),

    // Containers
    insertContainer: d.prepare(
      "INSERT INTO fleet_containers (id, task_id, account_id, name, runtime, status, started_at) VALUES ($id, $task_id, $account_id, $name, $runtime, $status, $started_at)"
    ),
    updateContainer: d.prepare(
      "UPDATE fleet_containers SET status = COALESCE($status, status), exit_code = COALESCE($exit_code, exit_code), stopped_at = COALESCE($stopped_at, stopped_at) WHERE id = $id"
    ),

    // Intel cache
    getIntel: d.prepare("SELECT * FROM fleet_intel WHERE project_fingerprint = $fingerprint"),
    getIntelByRoot: d.prepare("SELECT * FROM fleet_intel WHERE project_root = $project_root ORDER BY generated_at DESC LIMIT 1"),
    upsertIntel: d.prepare(
      `INSERT INTO fleet_intel (project_fingerprint, project_root, git_remote, intel_content, patterns_content, file_hash, generated_at, expires_at, generation_status, token_cost)
       VALUES ($fingerprint, $project_root, $git_remote, $intel_content, $patterns_content, $file_hash, $generated_at, $expires_at, $status, $token_cost)
       ON CONFLICT(project_fingerprint) DO UPDATE SET
         project_root = $project_root, git_remote = $git_remote,
         intel_content = COALESCE($intel_content, intel_content),
         patterns_content = COALESCE($patterns_content, patterns_content),
         file_hash = $file_hash, generated_at = $generated_at,
         expires_at = $expires_at, generation_status = $status,
         token_cost = $token_cost`
    ),
    deleteIntel: d.prepare("DELETE FROM fleet_intel WHERE project_fingerprint = $fingerprint"),
    listIntel: d.prepare("SELECT project_fingerprint, project_root, git_remote, generation_status, generated_at, expires_at FROM fleet_intel ORDER BY generated_at DESC LIMIT $limit"),
  };
}

function stmts() {
  if (!_cachedStmts) _cachedStmts = buildStmts(getDb());
  return _cachedStmts;
}

// --- Run CRUD ---

export function createRun(id: string, mode: string, prompt: string, workers: number, projectRoot = ""): FleetRunRecord {
  const record: FleetRunRecord = {
    id,
    mode,
    prompt: prompt.slice(0, 2000),
    workers,
    status: "running",
    started_at: new Date().toISOString(),
    completed_at: null,
    summary: null,
  };
  stmts().insertRun.run({
    $id: record.id, $mode: record.mode, $prompt: record.prompt,
    $workers: record.workers, $project_root: projectRoot,
    $status: record.status, $started_at: record.started_at,
  });
  return record;
}

export function updateRunStatus(id: string, status: string, summary?: object): void {
  stmts().updateRun.run({
    $id: id,
    $status: status,
    $completed_at: status === "completed" || status === "failed" ? new Date().toISOString() : null,
    $summary: summary ? JSON.stringify(summary) : null,
  });
}

export function getRun(id: string): FleetRunRecord | null {
  return stmts().getRun.get({ $id: id }) as FleetRunRecord | null;
}

export function getRecentRuns(limit = 10): FleetRunRecord[] {
  return stmts().getRecentRuns.all({ $limit: limit }) as FleetRunRecord[];
}

export function getRunsByProject(projectRoot: string, limit = 10): FleetRunRecord[] {
  return stmts().getRunsByProject.all({ $project_root: projectRoot, $limit: limit }) as FleetRunRecord[];
}

// --- Task CRUD ---

export function createFleetTask(
  id: string, runId: string, prompt: string, taskType: string, mode: string,
  parentTaskId?: string | null, stage?: number | null,
): FleetTaskRecord {
  const record: FleetTaskRecord = {
    id, run_id: runId, prompt: prompt.slice(0, 5000), task_type: taskType, mode,
    status: "pending", account_id: null, container_id: null,
    parent_task_id: parentTaskId ?? null, stage: stage ?? null,
    result: null, error: null, started_at: null, completed_at: null,
    created_at: new Date().toISOString(),
  };
  stmts().insertTask.run({
    $id: record.id, $run_id: record.run_id, $prompt: record.prompt,
    $task_type: record.task_type, $mode: record.mode, $status: record.status,
    $parent_task_id: record.parent_task_id, $stage: record.stage,
    $created_at: record.created_at,
  });
  return record;
}

export function updateFleetTask(id: string, updates: Partial<Pick<FleetTaskRecord,
  "status" | "account_id" | "container_id" | "result" | "error" | "started_at" | "completed_at"
>>): void {
  stmts().updateTask.run({
    $id: id,
    $status: updates.status ?? null,
    $account_id: updates.account_id ?? null,
    $container_id: updates.container_id ?? null,
    $result: updates.result ? updates.result.slice(0, 50_000) : null,
    $error: updates.error ? updates.error.slice(0, 10_000) : null,
    $started_at: updates.started_at ?? null,
    $completed_at: updates.completed_at ?? null,
  });
}

export function getFleetTask(id: string): FleetTaskRecord | null {
  return stmts().getTask.get({ $id: id }) as FleetTaskRecord | null;
}

export function getTasksByRun(runId: string): FleetTaskRecord[] {
  return stmts().getTasksByRun.all({ $run_id: runId }) as FleetTaskRecord[];
}

export function getPendingTasks(runId: string): FleetTaskRecord[] {
  return stmts().getPendingTasks.all({ $run_id: runId }) as FleetTaskRecord[];
}

// --- Container CRUD ---

export function createContainerRecord(
  id: string, taskId: string, accountId: string, name: string, runtime: string,
): void {
  stmts().insertContainer.run({
    $id: id, $task_id: taskId, $account_id: accountId,
    $name: name, $runtime: runtime, $status: "running",
    $started_at: new Date().toISOString(),
  });
}

export function updateContainerRecord(id: string, status: string, exitCode?: number | null): void {
  stmts().updateContainer.run({
    $id: id, $status: status,
    $exit_code: exitCode ?? null,
    $stopped_at: status === "stopped" || status === "failed" ? new Date().toISOString() : null,
  });
}

// --- Intel Cache CRUD ---

const INTEL_TTL_MS = 24 * 60 * 60 * 1000; // 1 day
const INTEL_NEGATIVE_TTL_MS = 60 * 60 * 1000;   // 1 hour for failed/empty

/** Get cached intel by project fingerprint. Returns null if not found or expired. */
export function getCachedIntel(fingerprint: string, allowExpired = false): FleetIntelRecord | null {
  const record = stmts().getIntel.get({ $fingerprint: fingerprint }) as FleetIntelRecord | null;
  if (!record) return null;
  if (!allowExpired && new Date(record.expires_at).getTime() < Date.now()) return null;
  return record;
}

/** Get cached intel by project root path (fallback when fingerprint misses). */
export function getCachedIntelByRoot(projectRoot: string): FleetIntelRecord | null {
  const record = stmts().getIntelByRoot.get({ $project_root: projectRoot }) as FleetIntelRecord | null;
  if (!record) return null;
  if (new Date(record.expires_at).getTime() < Date.now()) return null;
  return record;
}

/** Cache successful intel generation. */
export function cacheIntel(opts: {
  fingerprint: string;
  projectRoot: string;
  gitRemote: string | null;
  intelContent: string;
  patternsContent: string | null;
  fileHash: string;
}): void {
  const now = new Date().toISOString();
  const expires = new Date(Date.now() + INTEL_TTL_MS).toISOString();
  stmts().upsertIntel.run({
    $fingerprint: opts.fingerprint,
    $project_root: opts.projectRoot,
    $git_remote: opts.gitRemote,
    $intel_content: opts.intelContent,
    $patterns_content: opts.patternsContent,
    $file_hash: opts.fileHash,
    $generated_at: now,
    $expires_at: expires,
    $status: "success",
    $token_cost: 0,
  });
}

/** Cache a failed or empty-project intel attempt (negative cache). */
export function cacheIntelFailure(opts: {
  fingerprint: string;
  projectRoot: string;
  gitRemote: string | null;
  fileHash: string;
  status: "failed" | "empty_project";
}): void {
  const now = new Date().toISOString();
  const expires = new Date(Date.now() + INTEL_NEGATIVE_TTL_MS).toISOString();
  stmts().upsertIntel.run({
    $fingerprint: opts.fingerprint,
    $project_root: opts.projectRoot,
    $git_remote: opts.gitRemote,
    $intel_content: null,
    $patterns_content: null,
    $file_hash: opts.fileHash,
    $generated_at: now,
    $expires_at: expires,
    $status: opts.status,
    $token_cost: 0,
  });
}

/** List all cached intel records (for diagnostics). */
export function listCachedIntel(limit = 20): FleetIntelRecord[] {
  return stmts().listIntel.all({ $limit: limit }) as FleetIntelRecord[];
}

/** Delete a cached intel record. */
export function deleteCachedIntel(fingerprint: string): void {
  stmts().deleteIntel.run({ $fingerprint: fingerprint });
}
