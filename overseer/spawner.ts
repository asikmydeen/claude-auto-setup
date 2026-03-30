// SDLC Overseer — Agent Spawner
// Spawns Claude Code (or other provider) sessions in worktrees

import { spawn, type ChildProcess } from "child_process";
import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { createAgentSession, updateAgentSession, updateTaskStatus, assignTask, logEvent } from "./db";
import { buildKnowledgeContext } from "./knowledge";
import { buildInternalContext, getInternalRouting, isKiroAvailable } from "./kiro";
import { buildMemoryContext, captureAgentCompletion } from "./memory";
import type { AgentRole, AgentSession, Task } from "./types";

// Global flag — set by overseer when --internal mode is active
let internalMode = false;
export function setInternalMode(enabled: boolean): void { internalMode = enabled; }
export function getInternalMode(): boolean { return internalMode; }

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
 * Build role-specific plugin hints so agents know which plugins to leverage.
 * SECURITY: All strings are hardcoded literals. If this function is ever extended
 * to accept user input or external config, sanitize inputs to prevent prompt injection.
 */
function buildPluginHints(role: AgentRole): string | null {
  const hints: string[] = [];

  // Universal plugins available to all roles
  const universal = [
    "- **context7**: Fetch library/SDK docs — use when unsure about an API",
    "- **serena**: Semantic code navigation — find callers, references, symbols",
    "- **sequential-thinking**: Structured reasoning with branching hypotheses",
  ];

  // Role-specific plugin activation
  const rolePlugins: Record<string, string[]> = {
    "senior-engineer": [
      "- **superpowers TDD**: Write failing test first, then implement, then verify",
      "- **superpowers verification**: Produce evidence that acceptance criteria are met",
    ],
    "engineer": [
      "- **superpowers TDD**: Write failing test first, then implement, then verify",
      "- **superpowers verification**: Produce evidence that acceptance criteria are met",
    ],
    "frontend-engineer": [
      "- **superpowers TDD**: Write failing test first, then implement, then verify",
      "- **ui-ux-pro-max**: Design system intelligence — component patterns, accessibility, responsive design",
    ],
    "backend-engineer": [
      "- **superpowers TDD**: Write failing test first, then implement, then verify",
      "- **superpowers verification**: Produce evidence that acceptance criteria are met",
    ],
    "qa-engineer": [
      "- **superpowers TDD**: Comprehensive test coverage with red-green-refactor",
      "- **superpowers verification**: Automated verification with evidence",
    ],
    "security-engineer": [
      "- **security-guidance**: OWASP patterns and vulnerability detection",
      "- **superpowers verification**: Verify security fixes with evidence",
    ],
    "tech-lead": [
      "- **superpowers brainstorming**: Explore architectural approaches before committing",
      "- **superpowers code-review**: Structured review methodology",
    ],
  };

  const specific = rolePlugins[role] || [];
  if (specific.length === 0 && universal.length === 0) return null;

  hints.push("## Available Plugins");
  hints.push("Use these plugins when they would help with your task:");
  hints.push(...universal);
  if (specific.length > 0) {
    hints.push(...specific);
  }

  return hints.join("\n");
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

  // Internal context (Kiro consultation instructions)
  if (internalMode) {
    const internalCtx = buildInternalContext(opts.projectRoot);
    if (internalCtx) {
      parts.push(internalCtx);
      parts.push("");
    }
  }

  // Knowledge store (centralized decisions from this epic)
  const knowledgeCtx = buildKnowledgeContext(opts.epicId);
  if (knowledgeCtx) {
    parts.push(knowledgeCtx);
    parts.push("");
  }

  // claude-mem (cross-session memory — past observations, patterns, gotchas)
  const memoryCtx = buildMemoryContext(opts.role, opts.task.title, opts.task.description);
  if (memoryCtx) {
    parts.push(memoryCtx);
    parts.push("");
  }

  // Plugin guidance (role-specific)
  const pluginHints = buildPluginHints(opts.role);
  if (pluginHints) {
    parts.push(pluginHints);
    parts.push("");
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
    case "kiro":
      cmd = "kiro-cli";
      args = ["-p", fullPrompt, "--allow-tool=shell", "--allow-tool=write"];
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

    // Persist to claude-mem (cross-session learning)
    captureAgentCompletion(opts.role, opts.task.title, success, stdout.slice(-500));
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

  // Use internal routing when in internal mode
  const routing: Record<string, string[]> = internalMode && isKiroAvailable()
    ? getInternalRouting()
    : {
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
