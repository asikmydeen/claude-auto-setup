// SDLC Overseer — Agent Spawner
// Spawns Claude Code (or other provider) sessions in worktrees

import { spawn, type ChildProcess } from "child_process";
import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { createAgentSession, updateAgentSession, updateTaskStatus, assignTask, logEvent } from "./db";
import type { AgentRole, AgentSession, Task } from "./types";

interface SpawnResult {
  session: AgentSession;
  process: ChildProcess;
}

interface SpawnOptions {
  task: Task;
  epicId: string;
  role: AgentRole;
  worktreePath: string;
  branchName: string;
  prompt: string;
  projectRoot: string;
  provider?: string; // claude (default), codex, copilot, gemini
}

/**
 * Build the agent's context prompt including:
 * - Task description and acceptance criteria
 * - Codebase patterns (from codebase-patterns.md)
 * - Knowledge store entries relevant to this task
 * - Worktree instructions
 */
function buildAgentPrompt(opts: SpawnOptions): string {
  const parts: string[] = [];

  // Role header
  parts.push(`You are a ${opts.role} working on task: ${opts.task.title}`);
  parts.push(`Branch: ${opts.branchName} | Worktree: ${opts.worktreePath}`);
  parts.push("");

  // Task details
  parts.push("## Task");
  parts.push(opts.task.description || opts.task.title);
  parts.push("");

  // Codebase patterns (if available)
  const patternsPath = join(opts.projectRoot, ".claude/rules/codebase-patterns.md");
  if (existsSync(patternsPath)) {
    try {
      const patterns = readFileSync(patternsPath, "utf-8");
      parts.push("## Codebase Patterns (FOLLOW THESE)");
      parts.push(patterns.slice(0, 3000)); // Limit to avoid token overflow
      parts.push("");
    } catch { /* skip if unreadable */ }
  }

  // Project intel (if available)
  const intelPath = join(opts.projectRoot, ".claude/rules/project-intel.md");
  if (existsSync(intelPath)) {
    try {
      const intel = readFileSync(intelPath, "utf-8");
      // Only include Quick Reference section (L0/L1)
      const quickRef = intel.split("## L2:")[0] || intel.slice(0, 2000);
      parts.push("## Project Context");
      parts.push(quickRef.slice(0, 2000));
      parts.push("");
    } catch { /* skip */ }
  }

  // Custom prompt
  if (opts.prompt) {
    parts.push("## Instructions");
    parts.push(opts.prompt);
    parts.push("");
  }

  // Worktree rules
  parts.push("## Git Rules");
  parts.push(`- You are working in worktree: ${opts.worktreePath}`);
  parts.push(`- Your branch: ${opts.branchName}`);
  parts.push("- Commit your work with descriptive messages");
  parts.push("- Do NOT push to remote — the merge manager handles that");
  parts.push("- Do NOT switch branches or modify other worktrees");
  parts.push("- When done, ensure build and tests pass in your worktree");

  return parts.join("\n");
}

/**
 * Spawn a Claude Code session (or other provider) for a task.
 */
export function spawnAgent(opts: SpawnOptions): SpawnResult {
  const provider = opts.provider || "claude";
  const fullPrompt = buildAgentPrompt(opts);

  // Create DB record + assign task to worktree/branch
  const session = createAgentSession(opts.task.id, opts.role, opts.worktreePath, opts.branchName);
  assignTask(opts.task.id, session.id, opts.worktreePath, opts.branchName);
  updateTaskStatus(opts.task.id, "in_progress");
  logEvent(opts.epicId, "task_started", `${opts.role}: ${opts.task.title}`, opts.role);

  // Build spawn command based on provider
  let cmd: string;
  let args: string[];
  const env: Record<string, string> = {
    ...process.env as Record<string, string>,
    CLAUDECODE: "",
    CLAUDE_CODE_ENTRYPOINT: "",
  };

  switch (provider) {
    case "codex":
      cmd = "codex";
      args = ["-q", fullPrompt, "--full-auto"];
      break;
    case "copilot":
      cmd = "copilot";
      args = ["-p", fullPrompt, "--allow-tool=shell", "--allow-tool=write"];
      break;
    case "gemini":
      cmd = "gemini";
      args = []; // gemini reads from stdin
      break;
    default: // claude
      cmd = "claude";
      args = [
        "-p", fullPrompt,
        "--allowedTools", "Read,Grep,Glob,Bash,Edit,Write",
        "--output-format", "text",
        "--dangerously-skip-permissions",
      ];
      break;
  }

  const child = spawn(cmd, args, {
    cwd: opts.worktreePath,
    env,
    stdio: ["ignore", "pipe", "pipe"],
    detached: false,
  });

  // Track PID
  updateAgentSession(session.id, { pid: child.pid ?? null });

  // Collect output
  let stdout = "";
  let stderr = "";

  child.stdout?.on("data", (chunk: Buffer) => { stdout += chunk.toString(); });
  child.stderr?.on("data", (chunk: Buffer) => { stderr += chunk.toString(); });

  child.on("close", (code: number | null) => {
    const success = code === 0;
    updateAgentSession(session.id, {
      status: success ? "completed" : "failed",
      output: stdout.slice(-10000), // Last 10KB
      error: stderr.slice(-5000),
    });
    updateTaskStatus(opts.task.id, success ? "review" : "failed");
    logEvent(
      opts.epicId,
      success ? "task_completed" : "task_failed",
      `${opts.role}: ${opts.task.title} (exit ${code})`,
      opts.role,
    );
  });

  child.on("error", (err: Error) => {
    updateAgentSession(session.id, { status: "failed", error: err.message });
    updateTaskStatus(opts.task.id, "failed");
    logEvent(opts.epicId, "task_failed", `${opts.role}: spawn error — ${err.message}`, opts.role);
  });

  return { session, process: child };
}

/**
 * Kill an agent process.
 */
export function killAgent(pid: number, sessionId: string): void {
  try {
    process.kill(pid, "SIGTERM");
    updateAgentSession(sessionId, { status: "killed" });
  } catch {
    // Process might already be dead
  }
}

/**
 * Choose the best provider for a task type using dispatch.sh logic.
 */
export function selectProvider(taskType: string, projectRoot: string): string {
  const dispatchPath = join(projectRoot, "dispatch.sh");
  if (!existsSync(dispatchPath)) return "claude";

  // Simple mapping (matches providers.json routing)
  const routing: Record<string, string[]> = {
    frontend: ["codex", "claude"],
    backend: ["claude", "codex"],
    api: ["claude", "codex"],
    test: ["codex", "claude"],
    docs: ["gemini", "claude"],
    infra: ["claude"],
    devops: ["copilot", "claude"],
    security: ["claude"],
    design: ["claude"],
  };

  const chain = routing[taskType] || ["claude"];
  for (const provider of chain) {
    try {
      const which = Bun.spawnSync(["which", provider]);
      if (which.exitCode === 0) return provider;
    } catch { /* not installed */ }
  }

  return "claude";
}
