// SDLC Overseer — Shared Types

// --- Epic ---
export type EpicStatus = "draft" | "planning" | "active" | "done" | "cancelled";

export interface Epic {
  id: string;
  title: string;
  description: string;
  status: EpicStatus;
  created_at: string;
  updated_at: string;
}

// --- Story ---
export type Priority = "P0" | "P1" | "P2" | "P3";
export type StoryStatus = "backlog" | "ready" | "in_progress" | "review" | "done";

export interface Story {
  id: string;
  epic_id: string;
  title: string;
  description: string;
  acceptance_criteria: string;
  priority: Priority;
  status: StoryStatus;
  story_points: number;
  created_at: string;
}

// --- Task ---
export type TaskType = "frontend" | "backend" | "api" | "test" | "infra" | "docs" | "design" | "devops" | "security";
export type TaskStatus = "queued" | "assigned" | "in_progress" | "blocked" | "review" | "merged" | "done" | "failed";

export interface Task {
  id: string;
  story_id: string;
  title: string;
  description: string;
  type: TaskType;
  assigned_role: string;
  assigned_agent_id: string | null;
  status: TaskStatus;
  worktree_path: string | null;
  branch_name: string | null;
  started_at: string | null;
  completed_at: string | null;
  dependencies: string; // JSON array of task IDs
  created_at: string;
}

// --- Agent Session ---
export type AgentRole =
  | "product-manager" | "project-manager" | "tech-lead"
  | "senior-engineer" | "engineer" | "frontend-engineer" | "backend-engineer"
  | "qa-engineer" | "security-engineer"
  | "merge-manager" | "devops-engineer" | "release-engineer"
  | "guardian" | "overseer";

export type AgentStatus = "running" | "paused" | "completed" | "failed" | "killed";

export interface AgentSession {
  id: string;
  task_id: string | null;
  role: AgentRole;
  pid: number | null;
  claude_session_id: string | null;
  worktree_path: string | null;
  branch_name: string | null;
  status: AgentStatus;
  started_at: string;
  ended_at: string | null;
  output: string | null;
  error: string | null;
}

// --- Knowledge ---
export type KnowledgeCategory =
  | "architecture" | "api_contract" | "data_model"
  | "pattern" | "decision" | "discovery" | "gotcha";

export interface Knowledge {
  id: string;
  epic_id: string;
  category: KnowledgeCategory;
  key: string;
  value: string;
  source_agent: string;
  created_at: string;
}

// --- Merge Queue ---
export type MergeStatus = "pending" | "merging" | "conflict" | "resolved" | "merged" | "failed";

export interface MergeQueueEntry {
  id: string;
  task_id: string;
  branch_name: string;
  worktree_path: string;
  status: MergeStatus;
  conflict_files: string | null;
  resolved_by: string | null;
  merged_at: string | null;
}

// --- Sprint Log ---
export type SprintEventType =
  | "epic_created" | "story_created" | "task_created"
  | "task_assigned" | "task_started" | "task_completed" | "task_failed"
  | "merge_started" | "merge_completed" | "conflict_detected" | "conflict_resolved"
  | "test_passed" | "test_failed"
  | "release_created" | "knowledge_added";

export interface SprintLogEntry {
  id: string;
  epic_id: string;
  event_type: SprintEventType;
  details: string;
  agent_role: string;
  timestamp: string;
}

// --- Scheduler ---
export interface TaskNode {
  task: Task;
  dependsOn: string[]; // task IDs this task depends on
  dependedOnBy: string[]; // task IDs that depend on this task
}

export interface SchedulerState {
  epicId: string;
  maxConcurrency: number;
  running: Map<string, AgentSession>;
  completed: Set<string>;
  failed: Set<string>;
}

// --- Overseer Config ---
export interface OverseerConfig {
  maxConcurrency: number;
  dbPath: string;
  worktreeRoot: string;
  providers: string[]; // available CLI providers
  projectRoot: string;
}
