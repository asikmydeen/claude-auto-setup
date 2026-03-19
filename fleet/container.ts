// Fleet — Container Lifecycle Manager
// Builds images, runs containers with injected credentials,
// captures output, handles cleanup. Supports Docker + Podman.

import { spawn, execFileSync, type ChildProcess } from "child_process";
import { existsSync, mkdirSync, writeFileSync, unlinkSync, readdirSync } from "fs";
import { join } from "path";
import type { Account, FleetContainer, FleetSettings } from "./types";

const MAX_LOG_SIZE = 100_000; // 100KB per stream during accumulation

/** Find superpowers skills directory (searches known plugin install paths). */
function findSuperpowersSkills(homeDir: string): string | null {
  const candidates = [
    // Claude Code official marketplace
    join(homeDir, ".claude", "plugins", "cache", "claude-plugins-official", "superpowers"),
    // obra marketplace
    join(homeDir, ".claude", "plugins", "cache", "superpowers-marketplace", "superpowers"),
    // User-installed skills
    join(homeDir, ".claude", "skills"),
  ];

  for (const base of candidates) {
    // Check for versioned path (e.g. superpowers/5.0.5/skills/)
    if (existsSync(base)) {
      try {
        const entries = readdirSync(base);
        for (const entry of entries) {
          const skillsDir = join(base, entry, "skills");
          if (existsSync(skillsDir) && existsSync(join(skillsDir, "test-driven-development"))) {
            return skillsDir;
          }
        }
      } catch { /* skip */ }
      // Direct skills dir (non-versioned)
      const directSkills = join(base, "skills");
      if (existsSync(directSkills)) return directSkills;
      // Is itself a skills dir
      if (existsSync(join(base, "test-driven-development"))) return base;
    }
  }
  return null;
}

// --- Provider Auth Classification ---
// Browser-auth providers run LOCALLY (need persistent auth in ~/.kiro, ~/.amp, etc.)
// API-key providers run in CONTAINERS (credentials injected via env-file)
const LOCAL_ONLY_PROVIDERS = new Set(["kiro", "amp"]);

/** Check if a provider requires local execution (browser auth). */
export function isLocalProvider(provider: string): boolean {
  return LOCAL_ONLY_PROVIDERS.has(provider);
}

// --- Provider Selection & Command Building ---
// Matches the patterns in overseer/spawner.ts and dispatch.sh

/** Map credentials → best CLI provider for this account. */
function selectProviderForAccount(account: Account): string {
  const creds = account.credentials;

  // Explicit provider list in account config takes priority
  if (account.providers && account.providers.length > 0) {
    return account.providers[0];
  }

  // Infer from credentials
  if (creds.ANTHROPIC_API_KEY || creds.CLAUDE_CODE_USE_BEDROCK || creds.AWS_BEARER_TOKEN_BEDROCK) return "claude";
  if (creds.OPENAI_API_KEY) return "codex";
  if (creds.GOOGLE_GENERATIVE_AI_API_KEY) return "gemini";
  if (creds.COPILOT_GITHUB_TOKEN || creds.GH_TOKEN || creds.GITHUB_TOKEN) return "copilot";
  if (creds.GROQ_API_KEY || creds.OPENROUTER_API_KEY) return "claude"; // Claude can use these via SDK

  return "claude"; // Default fallback
}

/** Build CLI command args for a given provider + prompt. */
function buildProviderCommand(provider: string, prompt: string): string[] {
  switch (provider) {
    case "codex":
      return ["codex", "-q", prompt, "--full-auto"];

    case "gemini":
      // Gemini reads from stdin — use sh -c to pipe
      return ["sh", "-c", `echo ${JSON.stringify(prompt)} | gemini`];

    case "copilot":
      return ["copilot", "-p", prompt, "--allow-tool=shell", "--allow-tool=write"];

    case "kiro":
      return ["kiro-cli", "-p", prompt, "--allow-tool=shell", "--allow-tool=write"];

    case "amp":
      // Amp reads from stdin
      return ["sh", "-c", `echo ${JSON.stringify(prompt)} | amp`];

    case "claude":
    default:
      return [
        "claude", "-p", prompt,
        "--allowedTools", "Read,Grep,Glob,Bash,Edit,Write",
        "--output-format", "text",
        "--dangerously-skip-permissions",
      ];
  }
}

/** Get all providers an account can use based on its credentials. */
export function getAccountProviders(account: Account): string[] {
  const providers: string[] = [];
  const creds = account.credentials;

  if (creds.ANTHROPIC_API_KEY || creds.CLAUDE_CODE_USE_BEDROCK || creds.AWS_BEARER_TOKEN_BEDROCK) providers.push("claude");
  if (creds.OPENAI_API_KEY) providers.push("codex");
  if (creds.GOOGLE_GENERATIVE_AI_API_KEY) providers.push("gemini");
  if (creds.COPILOT_GITHUB_TOKEN || creds.GH_TOKEN || creds.GITHUB_TOKEN) providers.push("copilot");
  if ((creds.AWS_PROFILE || creds.AWS_ACCESS_KEY_ID) && creds.CLAUDE_CODE_USE_BEDROCK) providers.push("kiro");

  // If explicit providers set, use those
  if (account.providers && account.providers.length > 0) return account.providers;

  return providers.length > 0 ? providers : ["claude"];
}

/** Select best provider for a task type from an account's available providers. */
export function selectProviderForTask(account: Account, taskType: string): string {
  const available = getAccountProviders(account);

  // Task-type routing (matches overseer/spawner.ts + dispatch.sh)
  const routing: Record<string, string[]> = {
    "test-writing": ["codex", "claude", "gemini"],
    "test": ["codex", "claude"],
    "frontend": ["codex", "claude"],
    "backend": ["claude", "codex"],
    "api": ["claude", "codex"],
    "documentation": ["gemini", "claude"],
    "docs": ["gemini", "claude"],
    "code-review-quality": ["amp", "claude"],
    "code-review-security": ["claude", "amp"],
    "infrastructure-aws": ["kiro", "claude"],
    "infra": ["kiro", "claude"],
    "devops": ["copilot", "claude"],
    "github-pr": ["copilot", "claude"],
    "git-operations": ["copilot", "codex", "claude"],
    "simple-edit": ["codex", "copilot", "claude"],
    "boilerplate-generation": ["codex", "gemini", "claude"],
  };

  const chain = routing[taskType] || ["claude"];
  for (const provider of chain) {
    if (available.includes(provider)) return provider;
  }

  return available[0] || "claude";
}

export class ContainerManager {
  private runtime: string;
  private image: string;
  private taskTimeoutMs: number;
  private containerMemory: string;
  private containerCpus: string;
  private active: Map<string, { process: ChildProcess; container: FleetContainer }> = new Map();

  constructor(settings: FleetSettings) {
    this.runtime = settings.runtime;
    this.image = settings.containerImage;
    this.taskTimeoutMs = settings.taskTimeoutMs;
    this.containerMemory = settings.containerMemory;
    this.containerCpus = settings.containerCpus;

    // Detect stale containers from previous runs
    this.detectStaleContainers();
  }

  /** Warn about orphaned fleet containers from a previous run. */
  private detectStaleContainers(): void {
    const running = this.listRunning();
    if (running.length > 0) {
      console.error(`\x1b[33m[fleet]\x1b[0m Found ${running.length} stale fleet container(s) from a previous run:`);
      for (const c of running) {
        console.error(`  ${c.name} (${c.status})`);
      }
      console.error(`\x1b[33m[fleet]\x1b[0m Run: bun fleet/fleet.ts --stop to clean them up`);
    }
  }

  /** Check if the container runtime is available. */
  runtimeAvailable(): boolean {
    try {
      execFileSync(this.runtime, ["--version"], { encoding: "utf-8", timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /** Check if the fleet image exists. */
  imageExists(): boolean {
    try {
      const out = execFileSync(this.runtime, ["images", "-q", this.image], {
        encoding: "utf-8",
        timeout: 10000,
      }).trim();
      return out.length > 0;
    } catch {
      return false;
    }
  }

  /** Build the fleet agent image from the Dockerfile. */
  buildImage(dockerfilePath: string): { success: boolean; output: string } {
    const dir = join(dockerfilePath, "..");
    try {
      const output = execFileSync(
        this.runtime,
        ["build", "-t", this.image, "-f", dockerfilePath, dir],
        { encoding: "utf-8", timeout: 300_000 }, // 5 min for image build
      );
      return { success: true, output };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      return { success: false, output: msg };
    }
  }

  /** Run a container with injected credentials. Returns immediately — container runs async. */
  run(opts: {
    account: Account;
    taskId: string;
    prompt: string;
    projectRoot: string;
    outputDir: string;
    provider?: string; // claude (default), codex, gemini, kiro, copilot, amp
  }): FleetContainer {
    const shortId = opts.taskId.slice(0, 8);
    const containerName = `fleet-${opts.account.id}-${shortId}`;

    // Ensure output dir exists
    if (!existsSync(opts.outputDir)) {
      mkdirSync(opts.outputDir, { recursive: true });
    }

    // Build docker run args
    const homeDir = process.env.HOME || "/tmp";
    const claudeDir = join(homeDir, ".claude");
    const fleetUser = "/home/fleet"; // non-root user in Dockerfile

    const args: string[] = [
      "run", "--rm",
      "--name", containerName,
      // Mount project (read-write) and output dir
      "-v", `${opts.projectRoot}:/project`,
      "-v", `${opts.outputDir}:/output`,
      "-w", "/project",
    ];

    // Mount global claude-auto-setup config (read-only) — gives containers
    // the same rules, commands, agents, and instructions as local setup.
    // Only safe dirs mounted — no credentials, databases, or MCP server paths.
    const configMounts: Array<[string, string]> = [
      [join(claudeDir, "CLAUDE.md"), join(fleetUser, ".claude", "CLAUDE.md")],
      [join(claudeDir, "rules"), join(fleetUser, ".claude", "rules")],
      [join(claudeDir, "commands"), join(fleetUser, ".claude", "commands")],
      [join(claudeDir, "agents"), join(fleetUser, ".claude", "agents")],
    ];

    // Mount superpowers skills (if installed) — gives containers TDD, debugging,
    // brainstorming, subagent-driven-development, etc.
    const superpowersSkills = findSuperpowersSkills(homeDir);
    if (superpowersSkills) {
      configMounts.push([superpowersSkills, join(fleetUser, ".claude", "skills")]);
    }

    for (const [hostPath, containerPath] of configMounts) {
      if (existsSync(hostPath)) {
        args.push("-v", `${hostPath}:${containerPath}:ro`);
      }
    }

    // Inject credentials via temp env-file (not visible in `ps`, deleted after spawn)
    // Still visible in `docker inspect` — acceptable tradeoff for operational simplicity.
    const envLines: string[] = [];
    for (const [key, value] of Object.entries(opts.account.credentials)) {
      envLines.push(`${key}=${value}`);
    }
    envLines.push("CLAUDECODE=");
    envLines.push("CLAUDE_CODE_ENTRYPOINT=");

    const envFilePath = join(opts.outputDir, `.env-${shortId}`);
    writeFileSync(envFilePath, envLines.join("\n"), { mode: 0o600 });
    args.push("--env-file", envFilePath);

    // Resource limits (configurable via FleetSettings)
    args.push("--memory", this.containerMemory);
    args.push("--cpus", this.containerCpus);

    // Image + provider-specific command
    const provider = opts.provider || selectProviderForAccount(opts.account);
    args.push(this.image);
    args.push(...buildProviderCommand(provider, opts.prompt));

    const container: FleetContainer = {
      id: "", // filled after spawn
      accountId: opts.account.id,
      name: containerName,
      status: "creating",
      taskId: opts.taskId,
      pid: null,
      startedAt: new Date().toISOString(),
      stoppedAt: null,
      exitCode: null,
      output: null,
      error: null,
    };

    const child = spawn(this.runtime, args, {
      stdio: ["ignore", "pipe", "pipe"],
      detached: false,
    });

    container.pid = child.pid ?? null;
    container.status = "running";

    // Try to get container ID
    try {
      const cid = execFileSync(this.runtime, ["ps", "-q", "-f", `name=${containerName}`], {
        encoding: "utf-8",
        timeout: 5000,
      }).trim();
      if (cid) container.id = cid;
    } catch {
      container.id = containerName; // Fallback to name
    }

    // Collect output (capped to prevent memory exhaustion on verbose tasks)
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

    // Track active container
    this.active.set(opts.taskId, { process: child, container });

    // Cleanup env file after container starts (credentials no longer needed on disk)
    setTimeout(() => { try { unlinkSync(envFilePath); } catch { /* already gone */ } }, 5000);

    // Timeout handler (with race protection)
    let timedOut = false;
    const timeout = setTimeout(() => {
      timedOut = true;
      this.stop(containerName);
      container.status = "failed";
      container.error = `Timeout after ${this.taskTimeoutMs}ms`;
      container.stoppedAt = new Date().toISOString();
      this.active.delete(opts.taskId);
    }, this.taskTimeoutMs);

    child.on("close", (code: number | null) => {
      clearTimeout(timeout);
      if (timedOut) return; // Don't overwrite timeout error
      container.exitCode = code;
      container.status = code === 0 ? "stopped" : "failed";
      container.stoppedAt = new Date().toISOString();
      container.output = stdout.slice(-50_000); // Last 50KB
      container.error = stderr.slice(-10_000);
      this.active.delete(opts.taskId);
    });

    child.on("error", (err: Error) => {
      clearTimeout(timeout);
      if (timedOut) return;
      container.status = "failed";
      container.error = err.message;
      container.stoppedAt = new Date().toISOString();
      this.active.delete(opts.taskId);
    });

    return container;
  }

  /**
   * Run a task LOCALLY (not in container) for browser-auth providers like Kiro/Amp.
   * Uses the local CLI with existing auth tokens in ~/.kiro/, ~/.amp/, etc.
   * Matches the overseer/spawner.ts pattern.
   */
  runLocal(opts: {
    taskId: string;
    prompt: string;
    projectRoot: string;
    provider: string;
  }): FleetContainer {
    const cmdArgs = buildProviderCommand(opts.provider, opts.prompt);
    const cmd = cmdArgs[0];
    const spawnArgs = cmdArgs.slice(1);

    const container: FleetContainer = {
      id: `local-${opts.taskId.slice(0, 8)}`,
      accountId: "local",
      name: `local-${opts.provider}-${opts.taskId.slice(0, 8)}`,
      status: "running",
      taskId: opts.taskId,
      pid: null,
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

    const child = spawn(cmd, spawnArgs, {
      cwd: opts.projectRoot,
      env,
      stdio: ["ignore", "pipe", "pipe"],
      detached: false,
    });

    container.pid = child.pid ?? null;

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

    this.active.set(opts.taskId, { process: child, container });

    let timedOut = false;
    const timeout = setTimeout(() => {
      timedOut = true;
      try { child.kill("SIGTERM"); } catch { /* already dead */ }
      container.status = "failed";
      container.error = `Timeout after ${this.taskTimeoutMs}ms`;
      container.stoppedAt = new Date().toISOString();
      this.active.delete(opts.taskId);
    }, this.taskTimeoutMs);

    child.on("close", (code: number | null) => {
      clearTimeout(timeout);
      if (timedOut) return;
      container.exitCode = code;
      container.status = code === 0 ? "stopped" : "failed";
      container.stoppedAt = new Date().toISOString();
      container.output = stdout.slice(-50_000);
      container.error = stderr.slice(-10_000);
      this.active.delete(opts.taskId);
    });

    child.on("error", (err: Error) => {
      clearTimeout(timeout);
      if (timedOut) return;
      container.status = "failed";
      container.error = err.message;
      container.stoppedAt = new Date().toISOString();
      this.active.delete(opts.taskId);
    });

    return container;
  }

  /** Wait for a specific container to complete. */
  async waitForContainer(taskId: string): Promise<FleetContainer | null> {
    const entry = this.active.get(taskId);
    if (!entry) return null;

    return new Promise((resolve) => {
      entry.process.on("close", () => resolve(entry.container));
      entry.process.on("error", () => resolve(entry.container));
    });
  }

  /** Stop a container by name. */
  stop(containerName: string): void {
    try {
      execFileSync(this.runtime, ["stop", containerName], {
        encoding: "utf-8",
        timeout: 15_000,
      });
    } catch {
      // Container might already be stopped
      try {
        execFileSync(this.runtime, ["rm", "-f", containerName], {
          encoding: "utf-8",
          timeout: 5000,
        });
      } catch { /* ignore */ }
    }
  }

  /** Stop all active fleet containers. */
  stopAll(): number {
    let stopped = 0;
    try {
      const out = execFileSync(this.runtime, ["ps", "-q", "-f", "name=fleet-"], {
        encoding: "utf-8",
        timeout: 10_000,
      }).trim();
      if (out) {
        const ids = out.split("\n").filter(Boolean);
        for (const id of ids) {
          try {
            execFileSync(this.runtime, ["stop", id], { encoding: "utf-8", timeout: 15_000 });
            stopped++;
          } catch { /* ignore */ }
        }
      }
    } catch { /* no containers */ }
    return stopped;
  }

  /** Get logs from a running container. */
  logs(containerName: string, tail = 100): string {
    try {
      return execFileSync(this.runtime, ["logs", "--tail", String(tail), containerName], {
        encoding: "utf-8",
        timeout: 10_000,
      });
    } catch {
      return "";
    }
  }

  /** List all running fleet containers. */
  listRunning(): Array<{ name: string; status: string; created: string }> {
    try {
      const out = execFileSync(
        this.runtime,
        ["ps", "--filter", "name=fleet-", "--format", "{{.Names}}\t{{.Status}}\t{{.CreatedAt}}"],
        { encoding: "utf-8", timeout: 10_000 },
      ).trim();
      if (!out) return [];
      return out.split("\n").map((line) => {
        const [name, status, created] = line.split("\t");
        return { name, status, created };
      });
    } catch {
      return [];
    }
  }

  /** Check if a task's output contains rate limit signals. */
  static isRateLimited(output: string, error: string): boolean {
    const combined = `${output} ${error}`.toLowerCase();
    return (
      combined.includes("429") ||
      combined.includes("rate limit") ||
      combined.includes("too many requests") ||
      combined.includes("quota exceeded") ||
      combined.includes("overloaded")
    );
  }

  /** Get the number of currently active containers. */
  get activeCount(): number {
    return this.active.size;
  }
}
