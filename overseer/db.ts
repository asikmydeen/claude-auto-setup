// SDLC Overseer — SQLite Database (bun:sqlite)

import { Database } from "bun:sqlite";
import { randomUUID } from "crypto";
import type {
  Epic, EpicStatus, Story, StoryStatus, Priority,
  Task, TaskStatus, TaskType,
  AgentSession, AgentRole, AgentStatus,
  Knowledge, KnowledgeCategory,
  MergeQueueEntry, MergeStatus,
  SprintLogEntry, SprintEventType,
} from "./types";

let db: Database;

export function initDb(dbPath: string): Database {
  db = new Database(dbPath, { create: true });
  db.run("PRAGMA journal_mode = WAL");
  db.run("PRAGMA foreign_keys = ON");
  db.run("PRAGMA busy_timeout = 5000");
  migrate();
  return db;
}

export function getDb(): Database {
  if (!db) throw new Error("Database not initialized — call initDb() first");
  return db;
}

// --- Schema Migration ---

function migrate() {
  db.run(`
    CREATE TABLE IF NOT EXISTS epics (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'draft',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS stories (
      id TEXT PRIMARY KEY,
      epic_id TEXT NOT NULL REFERENCES epics(id),
      title TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      acceptance_criteria TEXT NOT NULL DEFAULT '',
      priority TEXT NOT NULL DEFAULT 'P2',
      status TEXT NOT NULL DEFAULT 'backlog',
      story_points INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      story_id TEXT NOT NULL REFERENCES stories(id),
      title TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      type TEXT NOT NULL DEFAULT 'backend',
      assigned_role TEXT NOT NULL DEFAULT '',
      assigned_agent_id TEXT,
      status TEXT NOT NULL DEFAULT 'queued',
      worktree_path TEXT,
      branch_name TEXT,
      started_at TEXT,
      completed_at TEXT,
      dependencies TEXT NOT NULL DEFAULT '[]',
      created_at TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS agent_sessions (
      id TEXT PRIMARY KEY,
      task_id TEXT REFERENCES tasks(id),
      role TEXT NOT NULL,
      pid INTEGER,
      claude_session_id TEXT,
      worktree_path TEXT,
      branch_name TEXT,
      status TEXT NOT NULL DEFAULT 'running',
      started_at TEXT NOT NULL,
      ended_at TEXT,
      output TEXT,
      error TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS knowledge (
      id TEXT PRIMARY KEY,
      epic_id TEXT NOT NULL REFERENCES epics(id),
      category TEXT NOT NULL,
      key TEXT NOT NULL,
      value TEXT NOT NULL,
      source_agent TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS merge_queue (
      id TEXT PRIMARY KEY,
      task_id TEXT NOT NULL REFERENCES tasks(id),
      branch_name TEXT NOT NULL,
      worktree_path TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL DEFAULT 'pending',
      conflict_files TEXT,
      resolved_by TEXT,
      merged_at TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS sprint_log (
      id TEXT PRIMARY KEY,
      epic_id TEXT NOT NULL,
      event_type TEXT NOT NULL,
      details TEXT NOT NULL DEFAULT '',
      agent_role TEXT NOT NULL DEFAULT '',
      timestamp TEXT NOT NULL
    )
  `);

  // Indexes for common queries
  db.run("CREATE INDEX IF NOT EXISTS idx_stories_epic ON stories(epic_id)");
  db.run("CREATE INDEX IF NOT EXISTS idx_tasks_story ON tasks(story_id)");
  db.run("CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status)");
  db.run("CREATE INDEX IF NOT EXISTS idx_agents_status ON agent_sessions(status)");
  db.run("CREATE INDEX IF NOT EXISTS idx_knowledge_epic ON knowledge(epic_id)");
  db.run("CREATE INDEX IF NOT EXISTS idx_merge_status ON merge_queue(status)");
  db.run("CREATE INDEX IF NOT EXISTS idx_sprint_log_epic ON sprint_log(epic_id)");
}

// --- Prepared Statements ---

const now = () => new Date().toISOString();

// --- Epic CRUD ---

export function createEpic(title: string, description: string): Epic {
  const epic: Epic = {
    id: randomUUID(),
    title,
    description,
    status: "draft",
    created_at: now(),
    updated_at: now(),
  };
  db.prepare("INSERT INTO epics (id, title, description, status, created_at, updated_at) VALUES ($id, $title, $description, $status, $created_at, $updated_at)")
    .run({ $id: epic.id, $title: epic.title, $description: epic.description, $status: epic.status, $created_at: epic.created_at, $updated_at: epic.updated_at });
  logEvent(epic.id, "epic_created", `Epic: ${title}`, "overseer");
  return epic;
}

export function updateEpicStatus(id: string, status: EpicStatus): void {
  db.prepare("UPDATE epics SET status = $status, updated_at = $updated_at WHERE id = $id")
    .run({ $id: id, $status: status, $updated_at: now() });
}

export function getEpic(id: string): Epic | null {
  return db.prepare("SELECT * FROM epics WHERE id = $id").get({ $id: id }) as Epic | null;
}

// --- Story CRUD ---

export function createStory(epicId: string, title: string, description: string, acceptanceCriteria: string, priority: Priority, storyPoints: number): Story {
  const story: Story = {
    id: randomUUID(),
    epic_id: epicId,
    title,
    description,
    acceptance_criteria: acceptanceCriteria,
    priority,
    status: "backlog",
    story_points: storyPoints,
    created_at: now(),
  };
  db.prepare("INSERT INTO stories (id, epic_id, title, description, acceptance_criteria, priority, status, story_points, created_at) VALUES ($id, $epic_id, $title, $description, $acceptance_criteria, $priority, $status, $story_points, $created_at)")
    .run({ $id: story.id, $epic_id: story.epic_id, $title: story.title, $description: story.description, $acceptance_criteria: story.acceptance_criteria, $priority: story.priority, $status: story.status, $story_points: story.story_points, $created_at: story.created_at });
  logEvent(epicId, "story_created", `Story: ${title} (${priority})`, "project-manager");
  return story;
}

export function updateStoryStatus(id: string, status: StoryStatus): void {
  db.prepare("UPDATE stories SET status = $status WHERE id = $id").run({ $id: id, $status: status });
}

export function getStoriesByEpic(epicId: string): Story[] {
  return db.prepare("SELECT * FROM stories WHERE epic_id = $epic_id ORDER BY priority, created_at").all({ $epic_id: epicId }) as Story[];
}

// --- Task CRUD ---

export function createTask(storyId: string, epicId: string, title: string, description: string, type: TaskType, assignedRole: string, dependencies: string[] = []): Task {
  const task: Task = {
    id: randomUUID(),
    story_id: storyId,
    title,
    description,
    type,
    assigned_role: assignedRole,
    assigned_agent_id: null,
    status: "queued",
    worktree_path: null,
    branch_name: null,
    started_at: null,
    completed_at: null,
    dependencies: JSON.stringify(dependencies),
    created_at: now(),
  };
  db.prepare("INSERT INTO tasks (id, story_id, title, description, type, assigned_role, status, dependencies, created_at) VALUES ($id, $story_id, $title, $description, $type, $assigned_role, $status, $dependencies, $created_at)")
    .run({ $id: task.id, $story_id: task.story_id, $title: task.title, $description: task.description, $type: task.type, $assigned_role: task.assigned_role, $status: task.status, $dependencies: task.dependencies, $created_at: task.created_at });
  logEvent(epicId, "task_created", `Task: ${title} (${type}, ${assignedRole})`, "project-manager");
  return task;
}

export function updateTaskStatus(id: string, status: TaskStatus): void {
  const updates: Record<string, string> = { $id: id, $status: status };
  let sql = "UPDATE tasks SET status = $status";
  if (status === "in_progress") {
    sql += ", started_at = $started_at";
    updates.$started_at = now();
  }
  if (status === "done" || status === "failed") {
    sql += ", completed_at = $completed_at";
    updates.$completed_at = now();
  }
  sql += " WHERE id = $id";
  db.prepare(sql).run(updates);
}

export function assignTask(taskId: string, agentId: string, worktreePath: string, branchName: string): void {
  db.prepare("UPDATE tasks SET assigned_agent_id = $agent_id, worktree_path = $worktree, branch_name = $branch, status = 'assigned' WHERE id = $id")
    .run({ $id: taskId, $agent_id: agentId, $worktree: worktreePath, $branch: branchName });
}

export function getTasksByStory(storyId: string): Task[] {
  return db.prepare("SELECT * FROM tasks WHERE story_id = $story_id ORDER BY created_at").all({ $story_id: storyId }) as Task[];
}

export function getTasksByEpic(epicId: string): Task[] {
  return db.prepare("SELECT t.* FROM tasks t JOIN stories s ON t.story_id = s.id WHERE s.epic_id = $epic_id ORDER BY t.created_at").all({ $epic_id: epicId }) as Task[];
}

export function getQueuedTasks(epicId: string): Task[] {
  return db.prepare("SELECT t.* FROM tasks t JOIN stories s ON t.story_id = s.id WHERE s.epic_id = $epic_id AND t.status = 'queued' ORDER BY s.priority, t.created_at").all({ $epic_id: epicId }) as Task[];
}

export function getRunningTasks(): Task[] {
  return db.prepare("SELECT * FROM tasks WHERE status IN ('assigned', 'in_progress')").all() as Task[];
}

export function getTask(id: string): Task | null {
  return db.prepare("SELECT * FROM tasks WHERE id = $id").get({ $id: id }) as Task | null;
}

// --- Agent Session CRUD ---

export function createAgentSession(taskId: string | null, role: AgentRole, worktreePath: string | null, branchName: string | null): AgentSession {
  const session: AgentSession = {
    id: randomUUID(),
    task_id: taskId,
    role,
    pid: null,
    claude_session_id: null,
    worktree_path: worktreePath,
    branch_name: branchName,
    status: "running",
    started_at: now(),
    ended_at: null,
    output: null,
    error: null,
  };
  db.prepare("INSERT INTO agent_sessions (id, task_id, role, worktree_path, branch_name, status, started_at) VALUES ($id, $task_id, $role, $worktree_path, $branch_name, $status, $started_at)")
    .run({ $id: session.id, $task_id: session.task_id, $role: session.role, $worktree_path: session.worktree_path, $branch_name: session.branch_name, $status: session.status, $started_at: session.started_at });
  return session;
}

export function updateAgentSession(id: string, updates: Partial<Pick<AgentSession, "pid" | "claude_session_id" | "status" | "output" | "error">>): void {
  const fields: string[] = [];
  const params: Record<string, string | number | null> = { $id: id };
  if (updates.pid !== undefined) { fields.push("pid = $pid"); params.$pid = updates.pid; }
  if (updates.claude_session_id !== undefined) { fields.push("claude_session_id = $csid"); params.$csid = updates.claude_session_id; }
  if (updates.status !== undefined) {
    fields.push("status = $status");
    params.$status = updates.status;
    if (updates.status === "completed" || updates.status === "failed" || updates.status === "killed") {
      fields.push("ended_at = $ended_at");
      params.$ended_at = now();
    }
  }
  if (updates.output !== undefined) { fields.push("output = $output"); params.$output = updates.output; }
  if (updates.error !== undefined) { fields.push("error = $error"); params.$error = updates.error; }
  if (fields.length > 0) {
    db.prepare(`UPDATE agent_sessions SET ${fields.join(", ")} WHERE id = $id`).run(params);
  }
}

export function getRunningAgents(): AgentSession[] {
  return db.prepare("SELECT * FROM agent_sessions WHERE status = 'running'").all() as AgentSession[];
}

// --- Merge Queue ---

export function enqueueMerge(taskId: string, branchName: string, worktreePath: string): MergeQueueEntry {
  const entry: MergeQueueEntry = {
    id: randomUUID(),
    task_id: taskId,
    branch_name: branchName,
    worktree_path: worktreePath,
    status: "pending",
    conflict_files: null,
    resolved_by: null,
    merged_at: null,
  };
  db.prepare("INSERT INTO merge_queue (id, task_id, branch_name, worktree_path, status) VALUES ($id, $task_id, $branch_name, $worktree_path, $status)")
    .run({ $id: entry.id, $task_id: entry.task_id, $branch_name: entry.branch_name, $worktree_path: entry.worktree_path, $status: entry.status });
  return entry;
}

export function updateMergeStatus(id: string, status: MergeStatus, extra?: { conflictFiles?: string; resolvedBy?: string }): void {
  const params: Record<string, string | null> = { $id: id, $status: status };
  let sql = "UPDATE merge_queue SET status = $status";
  if (status === "merged") { sql += ", merged_at = $merged_at"; params.$merged_at = now(); }
  if (extra?.conflictFiles) { sql += ", conflict_files = $cf"; params.$cf = extra.conflictFiles; }
  if (extra?.resolvedBy) { sql += ", resolved_by = $rb"; params.$rb = extra.resolvedBy; }
  sql += " WHERE id = $id";
  db.prepare(sql).run(params);
}

export function getPendingMerges(): MergeQueueEntry[] {
  return db.prepare("SELECT * FROM merge_queue WHERE status = 'pending' ORDER BY rowid").all() as MergeQueueEntry[];
}

// --- Sprint Log ---

export function logEvent(epicId: string, eventType: SprintEventType, details: string, agentRole: string): void {
  db.prepare("INSERT INTO sprint_log (id, epic_id, event_type, details, agent_role, timestamp) VALUES ($id, $epic_id, $event_type, $details, $agent_role, $timestamp)")
    .run({ $id: randomUUID(), $epic_id: epicId, $event_type: eventType, $details: details, $agent_role: agentRole, $timestamp: now() });
}

export function getSprintLog(epicId: string, limit = 50): SprintLogEntry[] {
  return db.prepare("SELECT * FROM sprint_log WHERE epic_id = $epic_id ORDER BY timestamp DESC LIMIT $limit").all({ $epic_id: epicId, $limit: limit }) as SprintLogEntry[];
}

// --- Stats ---

export function getEpicStats(epicId: string): { total: number; queued: number; inProgress: number; done: number; failed: number } {
  const tasks = getTasksByEpic(epicId);
  return {
    total: tasks.length,
    queued: tasks.filter(t => t.status === "queued").length,
    inProgress: tasks.filter(t => ["assigned", "in_progress", "review"].includes(t.status)).length,
    done: tasks.filter(t => ["merged", "done"].includes(t.status)).length,
    failed: tasks.filter(t => t.status === "failed").length,
  };
}
