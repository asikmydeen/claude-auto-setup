// Fleet — Multi-Account Container Orchestration Types

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
  containerId: string | null;
  currentTaskId: string | null;
  cooldownUntil: string | null;
  tasksCompleted: number;
  tasksFailed: number;
  lastUsed: string | null;
}

// --- Container ---

export type ContainerStatus = "creating" | "running" | "stopped" | "failed" | "removed";

export interface FleetContainer {
  id: string; // docker/podman container ID
  accountId: string;
  name: string; // fleet-{accountId}-{shortTaskId}
  status: ContainerStatus;
  taskId: string;
  pid: number | null;
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
  containerId: string | null;
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

export type ContainerRuntime = "docker" | "podman";

export interface FleetSettings {
  maxConcurrent: number;
  cooldownMs: number;
  containerImage: string;
  runtime: ContainerRuntime;
  taskTimeoutMs: number;
  containerMemory: string; // docker --memory flag (default: "4g")
  containerCpus: string; // docker --cpus flag (default: "2")
  maxTotalSpawns: number; // safety limit per run (default: 500)
}

export interface FleetConfig {
  accounts: Account[];
  settings: FleetSettings;
}

export const DEFAULT_SETTINGS: FleetSettings = {
  maxConcurrent: 4,
  cooldownMs: 60_000,
  containerImage: "claude-fleet:latest",
  runtime: "docker",
  taskTimeoutMs: 600_000, // 10 minutes
  containerMemory: "4g",
  containerCpus: "2",
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
  container_id: string | null;
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

export interface FleetContainerRecord {
  id: string;
  task_id: string;
  account_id: string;
  name: string;
  runtime: string;
  status: string;
  exit_code: number | null;
  started_at: string;
  stopped_at: string | null;
}
