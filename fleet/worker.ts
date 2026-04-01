// Fleet — Containerless Worker Manager
// Spawns CLI agents as direct processes with git worktrees for isolation.
// Replaces container.ts — no Docker/Podman dependency.

import { spawn, execFileSync, type ChildProcess } from "child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";
import type { Account, FleetWorker, FleetSettings } from "./types";

const MAX_LOG_SIZE = 100_000; // 100KB per stream during accumulation

let _cachedSkillsPath: string | null | undefined;

/** Find superpowers skills directory (cached -- filesystem walk happens once). */
export function findSuperpowersSkills(homeDir: string): string | null {
  if (_cachedSkillsPath !== undefined) return _cachedSkillsPath;
  const candidates = [
    join(homeDir, ".claude", "plugins", "cache", "claude-plugins-official", "superpowers"),
    join(homeDir, ".claude", "plugins", "cache", "superpowers-marketplace", "superpowers"),
    join(homeDir, ".claude", "skills"),
  ];
  for (const base of candidates) {
    if (!existsSync(base)) continue;
    try {
      for (const entry of readdirSync(base)) {
        const skillsDir = join(base, entry, "skills");
        if (existsSync(skillsDir) && existsSync(join(skillsDir, "test-driven-development"))) {
          _cachedSkillsPath = skillsDir;
          return skillsDir;
        }
      }
    } catch { /* skip */ }
    const directSkills = join(base, "skills");
    if (existsSync(directSkills)) { _cachedSkillsPath = directSkills; return directSkills; }
    if (existsSync(join(base, "test-driven-development"))) { _cachedSkillsPath = base; return base; }
  }
  _cachedSkillsPath = null;
  return null;
}

const LOCAL_ONLY_PROVIDERS = new Set(["kiro", "amp"]);

/** Check if a provider requires local execution (browser auth). */
export function isLocalProvider(provider: string): boolean {
  return LOCAL_ONLY_PROVIDERS.has(provider);
}

function selectProviderForAccount(account: Account): string {
  const c = account.credentials;
  if (account.providers?.length) return account.providers[0];
  if (c.ANTHROPIC_API_KEY || c.CLAUDE_CODE_USE_BEDROCK || c.AWS_BEARER_TOKEN_BEDROCK) return "claude";
  if (c.OPENAI_API_KEY) return "codex";
  if (c.GOOGLE_GENERATIVE_AI_API_KEY) return "gemini";
  if (c.COPILOT_GITHUB_TOKEN || c.GH_TOKEN || c.GITHUB_TOKEN) return "copilot";
  return "claude";
}

function buildProviderCommand(provider: string, prompt: string): string[] {
  switch (provider) {
    case "codex": return ["codex", "-q", prompt, "--full-auto"];
    case "gemini": return ["sh", "-c", `echo ${JSON.stringify(prompt)} | gemini`];
    case "copilot": return ["copilot", "-p", prompt, "--allow-tool=shell", "--allow-tool=write"];
    case "kiro": return ["kiro-cli", "-p", prompt, "--allow-tool=shell", "--allow-tool=write"];
    case "amp": return ["sh", "-c", `echo ${JSON.stringify(prompt)} | amp`];
    case "claude": default:
      return ["claude", "-p", prompt, "--allowedTools", "Read,Grep,Glob,Bash,Edit,Write",
        "--output-format", "text", "--dangerously-skip-permissions"];
  }
}

export function getAccountProviders(account: Account): string[] {
  if (account.providers?.length) return account.providers;
  const p: string[] = [], c = account.credentials;
  if (c.ANTHROPIC_API_KEY || c.CLAUDE_CODE_USE_BEDROCK || c.AWS_BEARER_TOKEN_BEDROCK) p.push("claude");
  if (c.OPENAI_API_KEY) p.push("codex");
  if (c.GOOGLE_GENERATIVE_AI_API_KEY) p.push("gemini");
  if (c.COPILOT_GITHUB_TOKEN || c.GH_TOKEN || c.GITHUB_TOKEN) p.push("copilot");
  if ((c.AWS_PROFILE || c.AWS_ACCESS_KEY_ID) && c.CLAUDE_CODE_USE_BEDROCK) p.push("kiro");
  return p.length > 0 ? p : ["claude"];
}

export function selectProviderForTask(account: Account, taskType: string): string {
  const available = getAccountProviders(account);
  const routing: Record<string, string[]> = {
    "test-writing": ["codex", "claude", "gemini"], "test": ["codex", "claude"],
    "frontend": ["codex", "claude"], "backend": ["claude", "codex"],
    "api": ["claude", "codex"], "documentation": ["gemini", "claude"],
    "docs": ["gemini", "claude"], "code-review-quality": ["amp", "claude"],
    "code-review-security": ["claude", "amp"], "infrastructure-aws": ["kiro", "claude"],
    "infra": ["kiro", "claude"], "devops": ["copilot", "claude"],
    "github-pr": ["copilot", "claude"], "git-operations": ["copilot", "codex", "claude"],
    "simple-edit": ["codex", "copilot", "claude"], "boilerplate-generation": ["codex", "gemini", "claude"],
  };
  const chain = routing[taskType] || ["claude"];
  for (const prov of chain) { if (available.includes(prov)) return prov; }
  return available[0] || "claude";
}

// ===========================================================================
// WorkerManager — process spawning + git worktree isolation
// ===========================================================================

export class WorkerManager {
  private taskTimeoutMs: number;
  private worktreeDir: string;
  private active: Map<string, { process: ChildProcess; worker: FleetWorker }> = new Map();
  private completionQueue: FleetWorker[] = [];
  private completionWaiters: Array<(worker: FleetWorker) => void> = [];
  private _fleetSettingsPath: string | null = null;

  constructor(settings: FleetSettings) {
    this.taskTimeoutMs = settings.taskTimeoutMs;
    this.worktreeDir = settings.worktreeDir;
  }

  /** Generate fleet-specific settings.json with hooks/MCP/model stripped. */
  prepareFleetConfig(outputDir: string): void {
    const homeDir = process.env.HOME || "/tmp";
    const settingsPath = join(homeDir, ".claude", "settings.json");
    if (!existsSync(settingsPath)) return;

    try {
      const settings = JSON.parse(readFileSync(settingsPath, "utf-8"));
      delete settings.hooks;
      delete settings.mcpServers;
      delete settings.model;

      if (!existsSync(outputDir)) mkdirSync(outputDir, { recursive: true });
      const fleetSettingsPath = join(outputDir, "settings-fleet.json");
      writeFileSync(fleetSettingsPath, JSON.stringify(settings, null, 2));
      this._fleetSettingsPath = fleetSettingsPath;
    } catch { /* fall back to host settings */ }
  }

  /** Run a task in an isolated git worktree. Credentials injected via env (never on disk). */
  async run(opts: {
    account: Account;
    taskId: string;
    prompt: string;
    projectRoot: string;
    outputDir: string;
    provider?: string;
  }): Promise<FleetWorker> {
    if (!existsSync(opts.outputDir)) mkdirSync(opts.outputDir, { recursive: true });

    const worktreePath = await this.createWorktree(opts.projectRoot, opts.taskId);
    const provider = opts.provider || selectProviderForAccount(opts.account);
    const cmd = buildProviderCommand(provider, opts.prompt);

    const env: Record<string, string> = {
      ...(process.env as Record<string, string>),
      ...opts.account.credentials,
      CLAUDECODE: "",
      CLAUDE_CODE_ENTRYPOINT: "",
    };
    if (this._fleetSettingsPath && existsSync(this._fleetSettingsPath)) {
      env.CLAUDE_CONFIG_DIR = join(this._fleetSettingsPath, "..");
    }

    const shortId = opts.taskId.slice(0, 8);
    const worker: FleetWorker = {
      id: `worker-${shortId}`,
      accountId: opts.account.id,
      taskId: opts.taskId,
      pid: null,
      worktreePath,
      status: "starting",
      startedAt: new Date().toISOString(),
      stoppedAt: null,
      exitCode: null,
      output: null,
      error: null,
    };

    const child = spawn(cmd[0], cmd.slice(1), {
      cwd: worktreePath, env, stdio: ["ignore", "pipe", "pipe"], detached: false,
    });
    worker.pid = child.pid ?? null;
    worker.status = "running";

    this.trackProcess(child, worker, opts.taskId);
    return worker;
  }

  /** Run a task LOCALLY (no worktree) for browser-auth providers like Kiro/Amp. */
  runLocal(opts: {
    account: Account;
    taskId: string;
    prompt: string;
    projectRoot: string;
    outputDir: string;
    provider: string;
  }): FleetWorker {
    const shortId = opts.taskId.slice(0, 8);
    const cmd = buildProviderCommand(opts.provider, opts.prompt);

    const worker: FleetWorker = {
      id: `local-${shortId}`,
      accountId: "local",
      taskId: opts.taskId,
      pid: null,
      worktreePath: null,
      status: "running",
      startedAt: new Date().toISOString(),
      stoppedAt: null,
      exitCode: null,
      output: null,
      error: null,
    };

    const env: Record<string, string> = {
      ...(process.env as Record<string, string>),
      CLAUDECODE: "",
      CLAUDE_CODE_ENTRYPOINT: "",
    };

    const child = spawn(cmd[0], cmd.slice(1), {
      cwd: opts.projectRoot, env, stdio: ["ignore", "pipe", "pipe"], detached: false,
    });
    worker.pid = child.pid ?? null;

    this.trackProcess(child, worker, opts.taskId);
    return worker;
  }

  /** Attach output collection, timeout, and lifecycle handlers to a spawned process. */
  private trackProcess(child: ChildProcess, worker: FleetWorker, taskId: string): void {
    let stdout = "";
    let stderr = "";
    child.stdout?.on("data", (chunk: Buffer) => {
      stdout += chunk.toString();
      if (stdout.length > MAX_LOG_SIZE) stdout = stdout.slice(-MAX_LOG_SIZE);
    });
    child.stderr?.on("data", (chunk: Buffer) => {
      stderr += chunk.toString();
      if (stderr.length > MAX_LOG_SIZE) stderr = stderr.slice(-MAX_LOG_SIZE);
    });

    this.active.set(taskId, { process: child, worker });

    let timedOut = false;
    const timeout = setTimeout(() => {
      timedOut = true;
      try { child.kill("SIGTERM"); } catch { /* already dead */ }
      worker.status = "failed";
      worker.error = `Timeout after ${this.taskTimeoutMs}ms`;
      worker.stoppedAt = new Date().toISOString();
      this.active.delete(taskId);
      this.notifyCompletion(worker);
    }, this.taskTimeoutMs);

    child.on("close", (code: number | null) => {
      clearTimeout(timeout);
      if (timedOut) return;
      worker.exitCode = code;
      worker.status = code === 0 ? "stopped" : "failed";
      worker.stoppedAt = new Date().toISOString();
      worker.output = stdout.slice(-50_000);
      worker.error = stderr.slice(-10_000);
      this.active.delete(taskId);
      this.notifyCompletion(worker);
    });

    child.on("error", (err: Error) => {
      clearTimeout(timeout);
      if (timedOut) return;
      worker.status = "failed";
      worker.error = err.message;
      worker.stoppedAt = new Date().toISOString();
      this.active.delete(taskId);
      this.notifyCompletion(worker);
    });
  }

  // --- Git Worktree Management ---

  async createWorktree(projectRoot: string, taskId: string): Promise<string> {
    const shortId = taskId.slice(0, 8);
    const worktreeBase = join(projectRoot, this.worktreeDir);
    const worktreePath = join(worktreeBase, shortId);
    const branchName = `fleet/${shortId}`;
    if (!existsSync(worktreeBase)) mkdirSync(worktreeBase, { recursive: true });
    try {
      execFileSync("git", ["worktree", "add", worktreePath, "-b", branchName], {
        cwd: projectRoot, encoding: "utf-8", timeout: 30_000,
      });
    } catch {
      try {
        execFileSync("git", ["worktree", "add", worktreePath, branchName], {
          cwd: projectRoot, encoding: "utf-8", timeout: 30_000,
        });
      } catch (e) {
        throw new Error(`Failed to create worktree: ${e instanceof Error ? e.message : String(e)}`);
      }
    }
    return worktreePath;
  }

  async removeWorktree(worktreePath: string): Promise<void> {
    try { execFileSync("git", ["worktree", "remove", worktreePath, "--force"], { encoding: "utf-8", timeout: 15_000 }); } catch { /* ok */ }
    const shortId = worktreePath.split("/").pop();
    if (shortId) {
      try { execFileSync("git", ["branch", "-D", `fleet/${shortId}`], { encoding: "utf-8", timeout: 5_000 }); } catch { /* ok */ }
    }
  }

  async cleanupWorktrees(projectRoot: string): Promise<void> {
    const worktreeBase = join(projectRoot, this.worktreeDir);
    if (!existsSync(worktreeBase)) return;
    try { execFileSync("git", ["worktree", "prune"], { cwd: projectRoot, encoding: "utf-8", timeout: 10_000 }); } catch { /* ok */ }
    try {
      for (const entry of readdirSync(worktreeBase)) await this.removeWorktree(join(worktreeBase, entry));
    } catch { /* ok */ }
  }

  // --- Completion Notification (event-driven) ---

  private notifyCompletion(worker: FleetWorker): void {
    if (this.completionWaiters.length > 0) this.completionWaiters.shift()!(worker);
    else this.completionQueue.push(worker);
  }

  async waitForAnyCompletion(timeoutMs?: number): Promise<FleetWorker | null> {
    if (this.completionQueue.length > 0) return this.completionQueue.shift()!;
    if (this.active.size === 0) return null;
    return new Promise((resolve) => {
      let timer: ReturnType<typeof setTimeout> | null = null;
      const waiter = (w: FleetWorker) => { if (timer) clearTimeout(timer); resolve(w); };
      this.completionWaiters.push(waiter);
      if (timeoutMs !== undefined) {
        timer = setTimeout(() => {
          const idx = this.completionWaiters.indexOf(waiter);
          if (idx !== -1) this.completionWaiters.splice(idx, 1);
          resolve(null);
        }, timeoutMs);
      }
    });
  }

  // --- Rate Limit Detection ---

  isRateLimited(worker: FleetWorker): boolean {
    const s = `${worker.output || ""} ${worker.error || ""}`.toLowerCase();
    return s.includes("429") || s.includes("rate limit") || s.includes("too many requests")
      || s.includes("quota exceeded") || s.includes("overloaded");
  }

  // --- Process Management ---

  killAll(): void {
    for (const [, { process: p, worker: w }] of this.active) {
      try { p.kill("SIGTERM"); } catch { /* dead */ }
      w.status = "failed"; w.error = "Killed by killAll()"; w.stoppedAt = new Date().toISOString();
    }
    this.active.clear();
  }

  getActive(): Map<string, { process: ChildProcess; worker: FleetWorker }> { return this.active; }
  get activeCount(): number { return this.active.size; }
}
