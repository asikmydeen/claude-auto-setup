// Fleet — Multi-Account Orchestration Types (containerless)

// --- Account ---

export interface Account {
  id: string;
  label: string;
  credentials: Record<string, string>; // env var name → value
  providers?: string[]; // available CLI providers for this account
  rateLimit?: { rpm?: number; tpm?: number };
}

export type AccountState = "idle" | "busy" | "cooldown" | "error" | "disabled";

export interface AccountStatus {
  account: Account;
  state: AccountState;
  workerId: string | null;
  currentTaskId: string | null;
  cooldownUntil: string | null;
  tasksCompleted: number;
  tasksFailed: number;
  lastUsed: string | null;
}

// --- Worker (replaces Container) ---

export type WorkerStatus = "starting" | "running" | "stopped" | "failed";

export interface FleetWorker {
  id: string;
  accountId: string;
  taskId: string;
  pid: number | null;
  worktreePath: string | null;
  status: WorkerStatus;
  startedAt: string;
  stoppedAt: string | null;
  exitCode: number | null;
  output: string | null;
  error: string | null;
}

// --- Fleet Task ---

export type FleetMode = "pool" | "scatter" | "decompose" | "pipeline";
export type FleetTaskStatus = "pending" | "allocated" | "running" | "completed" | "failed" | "requeued";

export interface FleetTask {
  id: string;
  prompt: string;
  taskType: string; // dispatch task type (test-writing, backend-implementation, etc.)
  mode: FleetMode;
  status: FleetTaskStatus;
  accountId: string | null;
  workerId: string | null;
  parentTaskId: string | null; // for decompose/pipeline subtasks
  stage: number | null; // for pipeline mode (0-indexed)
  result: string | null;
  error: string | null;
  startedAt: string | null;
  completedAt: string | null;
  attemptedAccounts: string[]; // accounts that already tried this task (rate-limit tracking)
}

// --- Fleet Run ---

export type ScatterStrategy = "best" | "merge" | "all";

export interface FleetRunOptions {
  mode: FleetMode;
  prompt: string;
  workers?: number; // max concurrent workers (default: all accounts)
  stages?: string[]; // pipeline mode stage names
  taskQueue?: FleetTask[]; // pool mode: pre-built task list
  taskQueuePath?: string; // pool mode: path to tasks.json
  projectRoot: string;
  scatterStrategy?: ScatterStrategy; // scatter mode result handling
  outputDir?: string; // where to write results
}

export interface FleetRunResult {
  mode: FleetMode;
  tasks: FleetTask[];
  startedAt: string;
  completedAt: string;
  summary: {
    total: number;
    completed: number;
    failed: number;
    requeued: number;
  };
  mergedResult?: string; // scatter mode merged output
}

// --- Fleet Config ---

export interface FleetSettings {
  maxConcurrent: number;
  cooldownMs: number;
  taskTimeoutMs: number;
  worktreeDir: string; // relative to project root (default: ".fleet/worktrees")
  maxTotalSpawns: number; // safety limit per run (default: 500)
}

export interface FleetConfig {
  accounts: Account[];
  settings: FleetSettings;
}

export const DEFAULT_SETTINGS: FleetSettings = {
  maxConcurrent: 4,
  cooldownMs: 60_000,
  taskTimeoutMs: 600_000, // 10 minutes
  worktreeDir: ".fleet/worktrees",
  maxTotalSpawns: 500,
};

// --- Database Records ---

export interface FleetTaskRecord {
  id: string;
  run_id: string;
  prompt: string;
  task_type: string;
  mode: string;
  status: string;
  account_id: string | null;
  worker_id: string | null;
  parent_task_id: string | null;
  stage: number | null;
  result: string | null;
  error: string | null;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
}

export interface FleetRunRecord {
  id: string;
  mode: string;
  prompt: string;
  workers: number;
  status: string; // running | completed | failed
  started_at: string;
  completed_at: string | null;
  summary: string | null; // JSON
}

export interface FleetWorkerRecord {
  id: string;
  task_id: string;
  account_id: string;
  pid: number | null;
  worktree_path: string | null;
  status: string;
  exit_code: number | null;
  started_at: string;
  stopped_at: string | null;
}

// --- Intel Cache ---

export interface FleetIntelRecord {
  project_fingerprint: string;
  project_root: string;
  git_remote: string | null;
  intel_content: string | null;
  patterns_content: string | null;
  file_hash: string;
  generated_at: string;
  expires_at: string;
  generation_status: "success" | "failed" | "empty_project";
  token_cost: number;
}
