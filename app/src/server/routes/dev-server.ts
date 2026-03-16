import { Router } from "express";
import type express from "express";
import {
  readFileSync,
  existsSync,
} from "fs";
import { join, resolve } from "path";
import { execFileSync, spawn } from "child_process";
import { HOME, buildProjectEnv } from "../lib/shared";

const router = Router();

// ============================================================
// CONTAINER RUNTIME DETECTION
// ============================================================

interface RuntimeInfo {
  available: Array<{ name: string; version: string }>;
  preferred: string | null;
  native: true;
}

let cachedRuntimes: RuntimeInfo | null = null;

function detectContainerRuntimes(): RuntimeInfo {
  if (cachedRuntimes) return cachedRuntimes;

  const runtimes: Array<{ name: string; version: string }> = [];
  const candidates = ["docker", "podman", "finch", "nerdctl"];

  for (const rt of candidates) {
    try {
      const version = execFileSync(rt, ["--version"], { encoding: "utf-8", timeout: 5000 }).trim();
      const match = version.match(/(\d+\.\d+[\.\d]*)/);
      runtimes.push({ name: rt, version: match?.[1] || "unknown" });
    } catch {}
  }

  // Prefer podman (rootless/daemonless) > docker > others
  const preferOrder = ["podman", "docker", "finch", "nerdctl"];
  const preferred = preferOrder.find((r) => runtimes.some((rt) => rt.name === r)) || null;

  cachedRuntimes = { available: runtimes, preferred, native: true };
  return cachedRuntimes;
}

router.get("/api/runtime/detect", (_req, res) => {
  res.json(detectContainerRuntimes());
});

// ============================================================
// DEV SERVER MANAGEMENT — start/stop/status for project dev servers
// ============================================================

interface DevServerEntry {
  process: ReturnType<typeof spawn>;
  port: number;
  cwd: string;
  status: string;
  output: string[];
  runtime: "native" | string; // "native" | "docker" | "podman" | etc.
  containerId?: string;
}

export const devServers = new Map<string, DevServerEntry>();

// Port manager — auto-assign unique ports to avoid conflicts
let nextPort = 4100;
const usedPorts = new Set<number>();

function findFreePort(): number {
  // Try ports starting from nextPort, skip any in use
  for (let p = nextPort; p < nextPort + 200; p++) {
    if (!usedPorts.has(p)) {
      // Quick check if port is actually free
      try {
        execFileSync("lsof", ["-i", `:${p}`], { encoding: "utf-8", timeout: 2000 });
        // Port is in use by another process
        usedPorts.add(p);
      } catch {
        // lsof found nothing — port is free
        usedPorts.add(p);
        nextPort = p + 1;
        return p;
      }
    }
  }
  // Fallback
  return nextPort++;
}

function releasePort(port: number) {
  usedPorts.delete(port);
}

// Detect preferred container runtime (Podman first, then Docker)
function getDefaultRuntime(): string | null {
  for (const rt of ["podman", "docker", "finch"]) {
    try {
      execFileSync("which", [rt], { encoding: "utf-8", timeout: 2000 });
      return rt;
    } catch {}
  }
  return null;
}

const defaultContainerRuntime = getDefaultRuntime();

// Detect package manager and dev command for a project
function detectDevCommand(projectCwd: string): { cmd: string; args: string[]; port: number; installCmd: string } | { error: string } {
  let cmd = "npm"; // default to npm (always available)
  let args = ["run", "dev"];
  const port = findFreePort(); // Auto-assign unique port

  if (existsSync(join(projectCwd, "bun.lockb")) || existsSync(join(projectCwd, "bun.lock"))) {
    cmd = "bun"; args = ["run", "dev"];
  } else if (existsSync(join(projectCwd, "package-lock.json"))) {
    cmd = "npm"; args = ["run", "dev"];
  } else if (existsSync(join(projectCwd, "yarn.lock"))) {
    cmd = "npx"; args = ["yarn", "dev"];
  } else if (existsSync(join(projectCwd, "pnpm-lock.yaml"))) {
    cmd = "npx"; args = ["pnpm", "dev"];
  }

  try {
    const pkg = JSON.parse(readFileSync(join(projectCwd, "package.json"), "utf-8"));
    if (!pkg.scripts?.dev) {
      if (pkg.scripts?.start) { args = ["run", "start"]; }
      else { return { error: "No dev or start script in package.json" }; }
    }
  } catch {
    return { error: "No package.json found. Build the project first." };
  }

  return { cmd, args, port, installCmd: cmd === "bun" ? "bun" : "npm" };
}

// Wire output capture + readiness detection for a dev server entry
function wireDevServerOutput(child: ReturnType<typeof spawn>, entry: DevServerEntry) {
  const onData = (data: Buffer) => {
    const text = data.toString();
    entry.output.push(text);
    const portMatch = text.match(/(?:localhost|127\.0\.0\.1):(\d{4,5})/);
    if (portMatch) entry.port = parseInt(portMatch[1], 10);
    if (text.includes("ready") || text.includes("Local:") || text.includes("listening") || text.includes("started") || portMatch) {
      entry.status = "running";
    }
  };
  child.stdout?.on("data", onData);
  child.stderr?.on("data", onData);
  child.on("close", (code) => { entry.status = code === 0 ? "stopped" : "error"; });
}

// Wait for dev server to become ready, then respond
function waitForReady(entry: DevServerEntry, res: express.Response, timeoutMs = 8000) {
  let waited = 0;
  const check = setInterval(() => {
    waited += 500;
    if (entry.status === "running" || waited >= timeoutMs) {
      clearInterval(check);
      if (entry.status !== "running") entry.status = "running";
      res.json({ ok: true, port: entry.port, status: entry.status, runtime: entry.runtime });
    }
  }, 500);
  // Clear interval if client disconnects
  res.on("close", () => clearInterval(check));
}

router.post("/api/dev-server/start", (req, res) => {
  const { cwd: projectCwd, runtime: requestedRuntime } = req.body;
  if (!projectCwd) return res.status(400).json({ error: "cwd is required" });

  // Path validation: only allow paths under home directory
  const resolvedCwd = resolve(projectCwd);
  if (!resolvedCwd.startsWith(HOME) || resolvedCwd.includes("..")) {
    return res.status(400).json({ error: "Invalid project path" });
  }

  // Check if already running in our map
  const existing = devServers.get(projectCwd);
  if (existing && existing.status === "running") {
    return res.json({ ok: true, port: existing.port, status: "already-running", runtime: existing.runtime });
  }
  // Clean up stale entry
  if (existing && existing.status !== "running" && existing.status !== "installing" && existing.status !== "starting") {
    releasePort(existing.port);
    devServers.delete(projectCwd);
  }

  const devCmd = detectDevCommand(projectCwd);
  if ("error" in devCmd) return res.status(400).json({ error: devCmd.error });

  const { cmd, args, port, installCmd } = devCmd;

  // Container mode: default to Podman if available, unless explicitly "native"
  const allowedRuntimes = ["docker", "podman", "finch", "nerdctl"];
  let containerRuntime: string | null = null;
  if (requestedRuntime === "native") {
    containerRuntime = null;
  } else if (requestedRuntime && allowedRuntimes.includes(requestedRuntime)) {
    containerRuntime = requestedRuntime;
  } else {
    // Auto-detect: use Podman/Docker by default for isolation
    containerRuntime = defaultContainerRuntime;
  }

  if (containerRuntime) {
    try {
      // Verify runtime is available
      execFileSync("which", [containerRuntime], { encoding: "utf-8", timeout: 3000 });
    } catch {
      // Fallback to native
      console.log(`Container runtime "${containerRuntime}" not found, falling back to native`);
      return startNative(projectCwd, cmd, args, port, installCmd, res);
    }

    try {
      const image = cmd === "bun" ? "oven/bun:1-slim" : "node:22-slim";
      const sanitized = projectCwd.replace(/[^a-zA-Z0-9]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
      const containerName = `sidekick-dev-${sanitized.slice(-40)}`;

      // Check if container already exists and is running — reuse it
      try {
        const inspect = execFileSync(containerRuntime, ["inspect", "--format", "{{.State.Status}}", containerName], { encoding: "utf-8", timeout: 5000 }).trim();
        if (inspect === "running") {
          // Container is already running — detect its port and reuse
          const portInfo = execFileSync(containerRuntime, ["port", containerName], { encoding: "utf-8", timeout: 3000 }).trim();
          const portMatch = portInfo.match(/-> 0\.0\.0\.0:(\d+)/);
          const existingPort = portMatch ? parseInt(portMatch[1], 10) : port;

          // Re-attach to it by spawning a logs follower as the "process"
          const child = spawn(containerRuntime, ["logs", "-f", containerName], {
            cwd: projectCwd,
            stdio: ["ignore", "pipe", "pipe"],
          });

          const entry: DevServerEntry = {
            process: child, port: existingPort, cwd: projectCwd, status: "running",
            output: [`Reattached to existing container: ${containerName}\n`], runtime: containerRuntime, containerId: containerName,
          };
          devServers.set(projectCwd, entry);
          wireDevServerOutput(child, entry);

          return res.json({ ok: true, port: existingPort, status: "running", runtime: containerRuntime });
        }
        // Container exists but not running — remove it
        try { execFileSync(containerRuntime, ["rm", "-f", containerName], { encoding: "utf-8", timeout: 5000 }); } catch {}
      } catch {
        // Container doesn't exist — that's fine, we'll create it
      }

      // Install deps inside container first (if node_modules doesn't exist)
      const installStep = !existsSync(join(projectCwd, "node_modules"))
        ? `${installCmd} install && ` : "";

      // Read .env from project dir to pass into container
      const envFlags: string[] = [];
      const dotEnvPath = join(resolvedCwd, ".env");
      if (existsSync(dotEnvPath)) {
        const envContent = readFileSync(dotEnvPath, "utf-8");
        for (const line of envContent.split("\n")) {
          const trimmed = line.trim();
          if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
            envFlags.push("-e", trimmed);
          }
        }
      }

      const containerArgs = [
        "run", "--rm",
        "--name", containerName,
        "-v", `${resolvedCwd}:/app`,
        "-w", "/app",
        "-p", `${port}:${port}`,
        "-e", `PORT=${port}`,
        "-e", "BROWSER=none",
        "-e", "HOST=0.0.0.0",
        // File watching: macOS volume mounts don't propagate inotify events,
        // so dev servers must use polling to detect file changes for HMR
        "-e", "CHOKIDAR_USEPOLLING=true",
        "-e", "WATCHPACK_POLLING=true",
        "-e", "FAST_REFRESH=true",
        // Pass project .env vars into the container
        ...envFlags,
        image,
        "sh", "-c", `${installStep}${cmd} ${args.join(" ")}`,
      ];

      const child = spawn(containerRuntime, containerArgs, {
        cwd: projectCwd,
        stdio: ["ignore", "pipe", "pipe"],
      });

      const entry: DevServerEntry = {
        process: child, port, cwd: projectCwd, status: "starting",
        output: [], runtime: containerRuntime, containerId: containerName,
      };
      devServers.set(projectCwd, entry);
      wireDevServerOutput(child, entry);
      waitForReady(entry, res, 30000); // Containers need more startup time
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to start container";
      // Fallback to native on container failure
      console.log(`Container start failed: ${msg}. Falling back to native.`);
      startNative(projectCwd, cmd, args, port, installCmd, res);
    }
    return;
  }

  // Native mode (default)
  startNative(projectCwd, cmd, args, port, installCmd, res);
});

function launchDevProcess(projectCwd: string, cmd: string, args: string[], port: number) {
  const child = spawn(cmd, args, {
    cwd: projectCwd,
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...buildProjectEnv(projectCwd), PORT: String(port), BROWSER: "none" },
  });

  const entry: DevServerEntry = { process: child, port, cwd: projectCwd, status: "starting", output: [], runtime: "native" };
  devServers.set(projectCwd, entry);
  wireDevServerOutput(child, entry);
  return entry;
}

function startNative(projectCwd: string, cmd: string, args: string[], port: number, installCmd: string, res: express.Response) {
  // Need to install deps first — do it async
  if (!existsSync(join(projectCwd, "node_modules"))) {
    const installProc = spawn(installCmd, ["install"], {
      cwd: projectCwd,
      stdio: ["ignore", "pipe", "pipe"],
      env: buildProjectEnv(projectCwd),
    });

    // Track install as the dev server entry so /status works during install
    const entry: DevServerEntry = {
      process: installProc, port, cwd: projectCwd, status: "installing", output: [], runtime: "native",
    };
    devServers.set(projectCwd, entry);
    installProc.stdout?.on("data", (d: Buffer) => entry.output.push(d.toString()));
    installProc.stderr?.on("data", (d: Buffer) => entry.output.push(d.toString()));
    installProc.on("close", () => {
      // Install done — launch the dev server (no HTTP response needed, frontend polls /status)
      devServers.delete(projectCwd);
      try {
        launchDevProcess(projectCwd, cmd, args, port);
      } catch {}
    });
    // Respond immediately — frontend polls /status
    res.json({ ok: true, port, status: "installing", runtime: "native" });
  } else {
    // Deps already installed — launch and wait for ready
    try {
      const entry = launchDevProcess(projectCwd, cmd, args, port);
      waitForReady(entry, res);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to start dev server";
      res.status(500).json({ error: msg });
    }
  }
}

router.get("/api/dev-server/status", (req, res) => {
  const projectCwd = req.query.cwd as string;
  if (!projectCwd) return res.status(400).json({ error: "cwd required" });

  const entry = devServers.get(projectCwd);
  if (!entry) return res.json({ running: false });

  res.json({
    running: entry.status === "running" || entry.status === "starting",
    status: entry.status,
    port: entry.port,
    runtime: entry.runtime,
    containerId: entry.containerId || null,
    output: entry.output.slice(-20).join(""),
  });
});

// SSE stream of dev server logs
router.get("/api/dev-server/logs", (req, res) => {
  const projectCwd = req.query.cwd as string;
  if (!projectCwd) return res.status(400).json({ error: "cwd required" });

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const entry = devServers.get(projectCwd);

  // Send existing output as replay
  if (entry) {
    res.write(`data: ${JSON.stringify({ type: "replay", content: entry.output.join("") })}\n\n`);
    res.write(`data: ${JSON.stringify({ type: "status", status: entry.status, port: entry.port, runtime: entry.runtime, containerId: entry.containerId })}\n\n`);
  } else {
    res.write(`data: ${JSON.stringify({ type: "status", status: "not-started" })}\n\n`);
  }

  // Stream new output as it comes
  if (entry?.process) {
    const onData = (data: Buffer) => {
      try { res.write(`data: ${JSON.stringify({ type: "log", content: data.toString() })}\n\n`); } catch {}
    };
    entry.process.stdout?.on("data", onData);
    entry.process.stderr?.on("data", onData);

    const onClose = () => {
      try { res.write(`data: ${JSON.stringify({ type: "status", status: entry.status, port: entry.port })}\n\n`); } catch {}
    };
    entry.process.on("close", onClose);

    // Cleanup on client disconnect
    res.on("close", () => {
      entry.process?.stdout?.removeListener("data", onData);
      entry.process?.stderr?.removeListener("data", onData);
      entry.process?.removeListener("close", onClose);
    });
  }

  // Heartbeat
  const hb = setInterval(() => { try { res.write(":\n\n"); } catch { clearInterval(hb); } }, 15000);
  res.on("close", () => clearInterval(hb));
});

router.post("/api/dev-server/stop", (req, res) => {
  const { cwd: projectCwd } = req.body;
  const entry = devServers.get(projectCwd);
  if (!entry) return res.json({ ok: true });

  // Release the port
  releasePort(entry.port);
  // Kill the process — containers with --rm auto-remove on exit
  try { entry.process.kill("SIGTERM"); } catch {}
  // Safety: force-remove container if still hanging after 3s
  if (entry.containerId && entry.runtime !== "native") {
    setTimeout(() => {
      try { execFileSync(entry.runtime, ["rm", "-f", entry.containerId!], { encoding: "utf-8", timeout: 5000 }); } catch {}
    }, 3000);
  }
  devServers.delete(projectCwd);
  res.json({ ok: true });
});

/** Get the default container runtime detected at startup (for health endpoint) */
export function getDefaultContainerRuntime(): string | null {
  return defaultContainerRuntime;
}

/** Get the current number of tracked dev servers (for health endpoint) */
export function getDevServerCount(): number {
  return devServers.size;
}

/** Cleanup function for graceful shutdown — stops all running dev servers and releases ports */
export function cleanup() {
  for (const [cwd, entry] of devServers) {
    releasePort(entry.port);
    try { entry.process.kill("SIGTERM"); } catch {}
    if (entry.containerId && entry.runtime !== "native") {
      try { execFileSync(entry.runtime, ["rm", "-f", entry.containerId!], { encoding: "utf-8", timeout: 5000 }); } catch {}
    }
    devServers.delete(cwd);
  }
}

export default router;
