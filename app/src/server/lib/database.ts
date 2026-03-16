/**
 * SQLite database for persistent session and project storage.
 *
 * Uses bun:sqlite (zero dependencies, built into Bun runtime).
 * WAL mode for concurrent reads. ACID transactions for writes.
 *
 * Schema:
 *   projects  — user's project list with config
 *   sessions  — Claude chat sessions with metadata
 *   messages  — conversation turns (user + assistant)
 */
import { Database } from "bun:sqlite";
import { existsSync, mkdirSync } from "fs";
import { join } from "path";
import { CLAUDE_DIR } from "./shared";

// --- Database setup ---

const DB_DIR = join(CLAUDE_DIR, "data");
const DB_PATH = join(DB_DIR, "sidekick.db");

if (!existsSync(DB_DIR)) mkdirSync(DB_DIR, { recursive: true });

const db = new Database(DB_PATH, { create: true });

// WAL mode for better concurrent read performance
db.run("PRAGMA journal_mode = WAL");
db.run("PRAGMA foreign_keys = ON");
db.run("PRAGMA busy_timeout = 5000");

// --- Schema migration ---

db.run(`
  CREATE TABLE IF NOT EXISTS projects (
    path TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    added_at TEXT NOT NULL DEFAULT (datetime('now')),
    last_active TEXT,
    source TEXT NOT NULL DEFAULT 'manual',
    config TEXT DEFAULT '{}'
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    project_path TEXT NOT NULL,
    claude_session_id TEXT,
    prompt TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'running',
    exit_code INTEGER,
    started_at TEXT NOT NULL,
    ended_at TEXT,
    files_changed TEXT DEFAULT '[]',
    pid INTEGER
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id TEXT NOT NULL,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    timestamp TEXT NOT NULL,
    FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE
  )
`);

// Indexes
db.run("CREATE INDEX IF NOT EXISTS idx_sessions_project ON sessions(project_path)");
db.run("CREATE INDEX IF NOT EXISTS idx_sessions_status ON sessions(status)");
db.run("CREATE INDEX IF NOT EXISTS idx_sessions_started ON sessions(started_at DESC)");
db.run("CREATE INDEX IF NOT EXISTS idx_messages_session ON messages(session_id)");

// --- Prepared statements ---

const stmts = {
  // Projects
  upsertProject: db.prepare(`
    INSERT INTO projects (path, name, added_at, source, config)
    VALUES ($path, $name, $added_at, $source, $config)
    ON CONFLICT(path) DO UPDATE SET
      name = COALESCE($name, projects.name),
      last_active = datetime('now'),
      config = COALESCE($config, projects.config)
  `),
  getProject: db.prepare("SELECT * FROM projects WHERE path = $path"),
  listProjects: db.prepare("SELECT * FROM projects ORDER BY last_active DESC NULLS LAST, added_at DESC"),
  deleteProject: db.prepare("DELETE FROM projects WHERE path = $path"),
  touchProject: db.prepare("UPDATE projects SET last_active = datetime('now') WHERE path = $path"),

  // Sessions
  insertSession: db.prepare(`
    INSERT INTO sessions (id, project_path, prompt, status, started_at, pid)
    VALUES ($id, $project_path, $prompt, $status, $started_at, $pid)
  `),
  updateSession: db.prepare(`
    UPDATE sessions SET
      status = COALESCE($status, status),
      exit_code = COALESCE($exit_code, exit_code),
      ended_at = COALESCE($ended_at, ended_at),
      claude_session_id = COALESCE($claude_session_id, claude_session_id),
      files_changed = COALESCE($files_changed, files_changed),
      pid = COALESCE($pid, pid)
    WHERE id = $id
  `),
  getSession: db.prepare("SELECT * FROM sessions WHERE id = $id"),
  listSessionsByProject: db.prepare(`
    SELECT * FROM sessions WHERE project_path = $project_path
    ORDER BY started_at DESC LIMIT $limit
  `),
  listRecentSessions: db.prepare(`
    SELECT * FROM sessions ORDER BY started_at DESC LIMIT $limit
  `),
  deleteSession: db.prepare("DELETE FROM sessions WHERE id = $id"),
  getSessionByClaudeId: db.prepare("SELECT * FROM sessions WHERE claude_session_id = $claude_session_id"),

  // Messages
  insertMessage: db.prepare(`
    INSERT INTO messages (session_id, role, content, timestamp)
    VALUES ($session_id, $role, $content, $timestamp)
  `),
  getMessages: db.prepare(`
    SELECT * FROM messages WHERE session_id = $session_id ORDER BY id ASC
  `),
  getLastMessage: db.prepare(`
    SELECT * FROM messages WHERE session_id = $session_id ORDER BY id DESC LIMIT 1
  `),
  deleteMessages: db.prepare("DELETE FROM messages WHERE session_id = $session_id"),
};

// --- Public API ---

export interface DBProject {
  path: string;
  name: string;
  added_at: string;
  last_active: string | null;
  source: string;
  config: string; // JSON string
}

export interface DBSession {
  id: string;
  project_path: string;
  claude_session_id: string | null;
  prompt: string;
  status: string;
  exit_code: number | null;
  started_at: string;
  ended_at: string | null;
  files_changed: string; // JSON array string
  pid: number | null;
}

export interface DBMessage {
  id: number;
  session_id: string;
  role: string;
  content: string;
  timestamp: string;
}

// --- Projects ---

export function dbUpsertProject(path: string, name: string, source = "manual", config = "{}"): void {
  stmts.upsertProject.run({
    $path: path,
    $name: name,
    $added_at: new Date().toISOString(),
    $source: source,
    $config: config,
  });
}

export function dbGetProject(path: string): DBProject | null {
  return stmts.getProject.get({ $path: path }) as DBProject | null;
}

export function dbListProjects(): DBProject[] {
  return stmts.listProjects.all() as DBProject[];
}

export function dbDeleteProject(path: string): void {
  stmts.deleteProject.run({ $path: path });
}

export function dbTouchProject(path: string): void {
  stmts.touchProject.run({ $path: path });
}

// --- Sessions ---

export function dbInsertSession(session: {
  id: string;
  projectPath: string;
  prompt: string;
  status?: string;
  startedAt: string;
  pid?: number;
}): void {
  stmts.insertSession.run({
    $id: session.id,
    $project_path: session.projectPath,
    $prompt: session.prompt,
    $status: session.status || "running",
    $started_at: session.startedAt,
    $pid: session.pid || null,
  });
}

export function dbUpdateSession(id: string, updates: {
  status?: string;
  exitCode?: number | null;
  endedAt?: string;
  claudeSessionId?: string;
  filesChanged?: string[];
  pid?: number;
}): void {
  stmts.updateSession.run({
    $id: id,
    $status: updates.status ?? null,
    $exit_code: updates.exitCode ?? null,
    $ended_at: updates.endedAt ?? null,
    $claude_session_id: updates.claudeSessionId ?? null,
    $files_changed: updates.filesChanged ? JSON.stringify(updates.filesChanged) : null,
    $pid: updates.pid ?? null,
  });
}

export function dbGetSession(id: string): DBSession | null {
  return stmts.getSession.get({ $id: id }) as DBSession | null;
}

export function dbListSessionsByProject(projectPath: string, limit = 50): DBSession[] {
  return stmts.listSessionsByProject.all({ $project_path: projectPath, $limit: limit }) as DBSession[];
}

export function dbListRecentSessions(limit = 100): DBSession[] {
  return stmts.listRecentSessions.all({ $limit: limit }) as DBSession[];
}

export function dbDeleteSession(id: string): void {
  stmts.deleteMessages.run({ $session_id: id });
  stmts.deleteSession.run({ $id: id });
}

export function dbGetSessionByClaudeId(claudeSessionId: string): DBSession | null {
  return stmts.getSessionByClaudeId.get({ $claude_session_id: claudeSessionId }) as DBSession | null;
}

// --- Messages ---

export function dbInsertMessage(sessionId: string, role: string, content: string, timestamp?: string): void {
  stmts.insertMessage.run({
    $session_id: sessionId,
    $role: role,
    $content: content,
    $timestamp: timestamp || new Date().toISOString(),
  });
}

export function dbGetMessages(sessionId: string): DBMessage[] {
  return stmts.getMessages.all({ $session_id: sessionId }) as DBMessage[];
}

// --- Migration: import from sessions.json ---

export function migrateFromJson(sessionsJsonPath: string): number {
  if (!existsSync(sessionsJsonPath)) return 0;

  try {
    const data = JSON.parse(require("fs").readFileSync(sessionsJsonPath, "utf-8")) as Array<{
      id: string;
      prompt: string;
      status: string;
      messages: Array<{ role: string; content: string; timestamp: string }>;
      output: string[];
      exitCode: number | null;
      startedAt: string;
      endedAt?: string;
      pid?: number;
      claudeSessionId?: string;
      filesChanged?: string[];
      cwd: string;
    }>;

    let imported = 0;
    const insertBatch = db.transaction(() => {
      for (const s of data) {
        // Skip if already in DB
        if (stmts.getSession.get({ $id: s.id })) continue;

        stmts.insertSession.run({
          $id: s.id,
          $project_path: s.cwd,
          $prompt: s.prompt,
          $status: s.status,
          $started_at: s.startedAt,
          $pid: s.pid || null,
        });

        stmts.updateSession.run({
          $id: s.id,
          $status: s.status,
          $exit_code: s.exitCode ?? null,
          $ended_at: s.endedAt ?? null,
          $claude_session_id: s.claudeSessionId ?? null,
          $files_changed: s.filesChanged ? JSON.stringify(s.filesChanged) : null,
          $pid: s.pid ?? null,
        });

        for (const m of s.messages) {
          stmts.insertMessage.run({
            $session_id: s.id,
            $role: m.role,
            $content: m.content,
            $timestamp: m.timestamp,
          });
        }

        // Ensure the project exists
        stmts.upsertProject.run({
          $path: s.cwd,
          $name: s.cwd.split("/").pop() || "project",
          $added_at: s.startedAt,
          $source: "session",
          $config: "{}",
        });

        imported++;
      }
    });

    insertBatch();
    return imported;
  } catch (err) {
    console.error("Migration from sessions.json failed:", err);
    return 0;
  }
}

// --- Stats ---

export function dbStats(): { sessions: number; messages: number; projects: number; dbSize: string } {
  const sessions = (db.query("SELECT COUNT(*) as c FROM sessions").get() as { c: number }).c;
  const messages = (db.query("SELECT COUNT(*) as c FROM messages").get() as { c: number }).c;
  const projects = (db.query("SELECT COUNT(*) as c FROM projects").get() as { c: number }).c;
  const pageCount = (db.query("PRAGMA page_count").get() as { page_count: number }).page_count;
  const pageSize = (db.query("PRAGMA page_size").get() as { page_size: number }).page_size;
  const sizeBytes = pageCount * pageSize;
  const dbSize = sizeBytes > 1048576 ? `${(sizeBytes / 1048576).toFixed(1)} MB` : `${(sizeBytes / 1024).toFixed(0)} KB`;

  return { sessions, messages, projects, dbSize };
}

export { db, DB_PATH };
