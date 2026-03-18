#!/usr/bin/env bun
// SDLC Overseer — Terminal Dashboard
// Live-refreshing TUI showing epic progress, agent status, task board, and events.
// Usage: bun overseer/dashboard.ts --epic <id>
//        bun overseer/dashboard.ts --latest

import { Database } from "bun:sqlite";
import { existsSync } from "fs";
import { join } from "path";
import type { Task, AgentSession, SprintLogEntry, Epic } from "./types";

const HOME = process.env.HOME || "~";
const DB_PATH = join(HOME, ".claude", "data", "overseer.db");
const REFRESH_MS = 2000;

// --- CLI ---
const args = process.argv.slice(2);
let epicId = "";
let watchMode = true;

for (let i = 0; i < args.length; i++) {
  switch (args[i]) {
    case "--epic": epicId = args[++i] || ""; break;
    case "--latest": epicId = "__latest__"; break;
    case "--once": watchMode = false; break;
    case "--help": case "-h":
      console.log(`
SDLC Dashboard — Live Sprint Board

Usage:
  bun overseer/dashboard.ts --epic <id>    Watch a specific epic
  bun overseer/dashboard.ts --latest       Watch the most recent epic
  bun overseer/dashboard.ts --once         Print once and exit

Controls: Ctrl+C to exit
`);
      process.exit(0);
  }
}

if (!epicId) { console.error("Missing --epic <id> or --latest"); process.exit(1); }

// --- DB (readonly, safe for concurrent access while overseer writes) ---
if (!existsSync(DB_PATH)) { console.error(`Database not found: ${DB_PATH}`); process.exit(1); }

function openDb(): Database {
  return new Database(DB_PATH, { readonly: true });
}

// Readonly query wrappers with retry on I/O errors
function safeQuery<T>(fn: (db: Database) => T, fallback: T): T {
  let db: Database | null = null;
  try {
    db = openDb();
    return fn(db);
  } catch {
    return fallback;
  } finally {
    try { db?.close(); } catch { /* ignore */ }
  }
}

function getEpic(id: string): Epic | null {
  return safeQuery(db => db.prepare("SELECT * FROM epics WHERE id = $id").get({ $id: id }) as Epic | null, null);
}

function getTasksByEpic(epicId: string): Task[] {
  return safeQuery(db => db.prepare("SELECT t.* FROM tasks t JOIN stories s ON t.story_id = s.id WHERE s.epic_id = $id ORDER BY t.created_at").all({ $id: epicId }) as Task[], []);
}

function getEpicStats(epicId: string): { total: number; queued: number; inProgress: number; done: number; failed: number } {
  const tasks = getTasksByEpic(epicId);
  return {
    total: tasks.length,
    queued: tasks.filter(t => t.status === "queued").length,
    inProgress: tasks.filter(t => ["assigned", "in_progress", "review"].includes(t.status)).length,
    done: tasks.filter(t => ["merged", "done"].includes(t.status)).length,
    failed: tasks.filter(t => t.status === "failed").length,
  };
}

function getRunningAgents(): AgentSession[] {
  return safeQuery(db => db.prepare("SELECT * FROM agent_sessions WHERE status = 'running' ORDER BY started_at").all() as AgentSession[], []);
}

function getPendingMerges(): Array<{ branch_name: string; status: string; conflict_files?: string }> {
  return safeQuery(db => db.prepare("SELECT * FROM merge_queue WHERE status IN ('pending','merging') ORDER BY rowid").all() as any[], []);
}

function getSprintLog(epicId: string, limit: number): SprintLogEntry[] {
  return safeQuery(db => db.prepare("SELECT * FROM sprint_log WHERE epic_id = $id ORDER BY timestamp DESC LIMIT $limit").all({ $id: epicId, $limit: limit }) as SprintLogEntry[], []);
}

// Resolve --latest
if (epicId === "__latest__") {
  const latest = safeQuery(db => db.prepare("SELECT id FROM epics ORDER BY created_at DESC LIMIT 1").get() as { id: string } | null, null);
  if (!latest) { console.error("No epics found."); process.exit(1); }
  epicId = latest.id;
}

// --- Rendering ---
const COLS = process.stdout.columns || 80;
const RESET = "\x1b[0m";
const BOLD = "\x1b[1m";
const DIM = "\x1b[2m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const RED = "\x1b[31m";
const BLUE = "\x1b[34m";
const CYAN = "\x1b[36m";
const MAGENTA = "\x1b[35m";

function hr(char = "─") { return char.repeat(Math.min(COLS, 80)); }
function truncate(s: string, len: number) { return s.length > len ? s.slice(0, len - 1) + "…" : s; }

function statusColor(status: string): string {
  switch (status) {
    case "done": case "merged": case "completed": return GREEN;
    case "in_progress": case "assigned": case "running": case "merging": return YELLOW;
    case "failed": case "killed": case "conflict": return RED;
    case "queued": case "pending": return DIM;
    case "review": return CYAN;
    case "blocked": return MAGENTA;
    default: return RESET;
  }
}

function statusIcon(status: string): string {
  switch (status) {
    case "done": case "merged": case "completed": return "✓";
    case "in_progress": case "assigned": case "running": return "▶";
    case "failed": case "killed": return "✗";
    case "queued": case "pending": return "○";
    case "review": return "◎";
    case "blocked": return "⊘";
    case "conflict": return "⚠";
    default: return "·";
  }
}

function progressBar(done: number, total: number, width = 30): string {
  if (total === 0) return `[${"─".repeat(width)}] 0%`;
  const pct = Math.round((done / total) * 100);
  const filled = Math.floor((done / total) * width);
  const bar = "█".repeat(filled) + "░".repeat(width - filled);
  return `[${bar}] ${pct}%`;
}

function renderEpicHeader(epicId: string): string[] {
  const epic = getEpic(epicId);
  if (!epic) return ["Epic not found"];
  const stats = getEpicStats(epicId);
  const lines: string[] = [];

  lines.push(`${BOLD}${CYAN}SDLC Dashboard${RESET}  ${DIM}${new Date().toLocaleTimeString()}${RESET}`);
  lines.push(hr());
  lines.push(`${BOLD}Epic:${RESET} ${truncate(epic.title, 60)}  ${DIM}(${epic.id.slice(0, 8)})${RESET}`);
  lines.push(`${BOLD}Status:${RESET} ${statusColor(epic.status)}${epic.status.toUpperCase()}${RESET}  ${progressBar(stats.done, stats.total)}`);
  lines.push(`${DIM}Tasks: ${stats.total} total | ${stats.queued} queued | ${stats.inProgress} running | ${stats.done} done | ${stats.failed} failed${RESET}`);

  return lines;
}

function renderKanban(epicId: string): string[] {
  const tasks = getTasksByEpic(epicId);
  const lines: string[] = [];
  lines.push("");
  lines.push(`${BOLD}Task Board${RESET}`);
  lines.push(hr("─"));

  // Group by status
  const columns: Record<string, Task[]> = {
    "Queued": tasks.filter(t => t.status === "queued"),
    "Running": tasks.filter(t => ["assigned", "in_progress"].includes(t.status)),
    "Review": tasks.filter(t => t.status === "review"),
    "Done": tasks.filter(t => ["merged", "done"].includes(t.status)),
    "Failed": tasks.filter(t => ["failed", "blocked"].includes(t.status)),
  };

  for (const [col, items] of Object.entries(columns)) {
    if (items.length === 0) continue;
    const color = col === "Done" ? GREEN : col === "Running" ? YELLOW : col === "Failed" ? RED : col === "Review" ? CYAN : DIM;
    lines.push(`  ${color}${BOLD}${col}${RESET} ${DIM}(${items.length})${RESET}`);
    for (const task of items.slice(0, 8)) {
      const icon = statusIcon(task.status);
      const role = task.assigned_role ? `${DIM}[${task.assigned_role}]${RESET}` : "";
      lines.push(`    ${color}${icon}${RESET} ${truncate(task.title, 55)} ${role}`);
    }
    if (items.length > 8) lines.push(`    ${DIM}... +${items.length - 8} more${RESET}`);
  }

  return lines;
}

function renderAgents(): string[] {
  const agents = getRunningAgents();
  const lines: string[] = [];

  if (agents.length === 0) return [];

  lines.push("");
  lines.push(`${BOLD}Active Agents${RESET} ${DIM}(${agents.length}/5 slots)${RESET}`);
  lines.push(hr("─"));

  for (const agent of agents) {
    const elapsed = agent.started_at
      ? Math.round((Date.now() - new Date(agent.started_at).getTime()) / 1000)
      : 0;
    const elapsedStr = elapsed > 60 ? `${Math.floor(elapsed / 60)}m${elapsed % 60}s` : `${elapsed}s`;
    lines.push(`  ${YELLOW}▶${RESET} ${BOLD}${agent.role}${RESET} ${DIM}PID:${agent.pid || "?"}${RESET} ${DIM}${elapsedStr}${RESET}`);
    if (agent.branch_name) {
      lines.push(`    ${DIM}Branch: ${agent.branch_name}${RESET}`);
    }
  }

  return lines;
}

function renderMergeQueue(): string[] {
  const merges = getPendingMerges();
  if (merges.length === 0) return [];

  const lines: string[] = [];
  lines.push("");
  lines.push(`${BOLD}Merge Queue${RESET} ${DIM}(${merges.length} pending)${RESET}`);
  lines.push(hr("─"));

  for (const m of merges) {
    const color = statusColor(m.status);
    lines.push(`  ${color}${statusIcon(m.status)}${RESET} ${m.branch_name} ${DIM}(${m.status})${RESET}`);
    if (m.conflict_files) lines.push(`    ${RED}Conflicts: ${m.conflict_files}${RESET}`);
  }

  return lines;
}

function renderTimeline(epicId: string): string[] {
  const events = getSprintLog(epicId, 10);
  if (events.length === 0) return [];

  const lines: string[] = [];
  lines.push("");
  lines.push(`${BOLD}Recent Events${RESET}`);
  lines.push(hr("─"));

  for (const ev of events.reverse()) {
    const time = ev.timestamp.slice(11, 19);
    const typeColor = ev.event_type.includes("fail") || ev.event_type.includes("conflict") ? RED
      : ev.event_type.includes("complete") || ev.event_type.includes("merged") ? GREEN
      : DIM;
    lines.push(`  ${DIM}${time}${RESET} ${typeColor}${ev.event_type.padEnd(18)}${RESET} ${truncate(ev.details, 45)}`);
  }

  return lines;
}

function render() {
  const lines = [
    ...renderEpicHeader(epicId),
    ...renderKanban(epicId),
    ...renderAgents(),
    ...renderMergeQueue(),
    ...renderTimeline(epicId),
    "",
    `${DIM}Press Ctrl+C to exit${RESET}`,
  ];

  // Clear screen and move cursor to top
  process.stdout.write("\x1b[2J\x1b[H");
  console.log(lines.join("\n"));
}

// --- Main ---
if (watchMode) {
  render();
  const interval = setInterval(render, REFRESH_MS);
  process.on("SIGINT", () => { clearInterval(interval); process.stdout.write("\x1b[?25h"); process.exit(0); });
} else {
  render();
}
