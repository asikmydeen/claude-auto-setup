import { Elysia } from "elysia";
import {
  readFileSync,
  existsSync,
} from "fs";
import { join } from "path";
import { execFileSync, spawn } from "child_process";
import { randomUUID } from "crypto";
import { registerCleanup } from "../lib/cleanup";
import { logError, logWarn } from "../lib/logger";
import {
  PROJECT_ROOT,
  HOME,
  buildProjectEnv,
  loadProjectEnv,
  saveProjectEnv,
  loadIntegrations,
  getProjectEnvPath,
} from "../lib/shared";

/** Shared state injected from the main server module */
let _getActiveProject: () => string;

/**
 * Initialize with references to shared mutable state from the main server.
 * Must be called before the router handles any requests.
 */
export function initOps(
  getActiveProject: () => string,
) {
  _getActiveProject = getActiveProject;
}

// ============================================================
// OPS PANEL — Shell execution with streaming
// ============================================================

const opsProcesses = new Map<string, { process: ReturnType<typeof spawn>; output: string[]; status: string; exitCode: number | null }>();

// ============================================================
// MEMORY SYSTEM (claude-mem proxy)
// ============================================================

const CLAUDE_MEM_WORKER = "http://localhost:37777";
const CLAUDE_MEM_ALLOWED_PATHS = ["/health", "/api/stats", "/api/search", "/api/observations"];

async function fetchClaudeMemWorker(path: string, timeout = 3000): Promise<Response | null> {
  const basePath = path.split("?")[0];
  if (!CLAUDE_MEM_ALLOWED_PATHS.includes(basePath)) return null;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);
    const res = await fetch(`${CLAUDE_MEM_WORKER}${path}`, { signal: controller.signal });
    clearTimeout(timer);
    return res;
  } catch {
    return null;
  }
}

// Register cleanup for graceful shutdown
registerCleanup(() => {
  for (const [id, entry] of opsProcesses) {
    try { entry.process.kill("SIGTERM"); } catch (err) { logError("ops:cleanup:kill", err); }
    opsProcesses.delete(id);
  }
});

export const opsRoutes = new Elysia()

  // ============================================================
  // INSTALL / DISPATCH (run project scripts via spawn)
  // ============================================================

  .post("/api/install", ({ body, set }) => {
    const { flags = [] } = body as { flags?: string[] };
    try {
      const output = execFileSync(
        "bash",
        [join(PROJECT_ROOT, "install.sh"), ...flags],
        { encoding: "utf-8", timeout: 60000, cwd: PROJECT_ROOT }
      );
      return { ok: true, output };
    } catch (e: unknown) {
      const err = e as { stdout?: string; stderr?: string };
      return { ok: false, output: err.stdout || "", error: err.stderr || "" };
    }
  })

  .post("/api/dispatch", ({ body, set }) => {
    const { task, type, provider } = body as { task: string; type: string; provider?: string };
    const args = [join(PROJECT_ROOT, "dispatch.sh"), "--task", task, "--type", type];
    if (provider) args.push("--provider", provider);
    try {
      const output = execFileSync("bash", args, {
        encoding: "utf-8",
        timeout: 120000,
        cwd: PROJECT_ROOT,
      });
      return { ok: true, output };
    } catch (e: unknown) {
      const err = e as { stdout?: string; stderr?: string };
      return { ok: false, output: err.stdout || "", error: err.stderr || "" };
    }
  })

  // ============================================================
  // GIT INTEGRATION
  // ============================================================

  .get("/api/git/status", ({ query, set }) => {
    const activeProject = _getActiveProject();
    const cwd = (query.cwd as string) || activeProject;
    try {
      const branch = execFileSync("git", ["rev-parse", "--abbrev-ref", "HEAD"], {
        cwd, encoding: "utf-8", timeout: 5000,
      }).trim();

      const statusRaw = execFileSync("git", ["status", "--porcelain", "-u"], {
        cwd, encoding: "utf-8", timeout: 5000,
      }).trim();

      const files: Array<{ status: string; file: string }> = [];
      for (const line of statusRaw.split("\n").filter(Boolean)) {
        const status = line.slice(0, 2).trim();
        const file = line.slice(3);
        files.push({ status, file });
      }

      const staged = files.filter((f) => "ACDMR".includes(f.status[0] || ""));
      const modified = files.filter((f) => "ACDMR".includes(f.status[1] || "") || f.status === "??");

      let ahead = 0;
      let behind = 0;
      try {
        const abRaw = execFileSync("git", ["rev-list", "--left-right", "--count", `HEAD...@{u}`], {
          cwd, encoding: "utf-8", timeout: 5000,
        }).trim();
        const [a, b] = abRaw.split("\t").map(Number);
        ahead = a || 0;
        behind = b || 0;
      } catch {}

      return {
        branch,
        clean: files.length === 0,
        staged: staged.length,
        modified: modified.length,
        files,
        ahead,
        behind,
      };
    } catch (e) {
      return { branch: "unknown", clean: true, staged: 0, modified: 0, files: [], ahead: 0, behind: 0, error: "Not a git repository" };
    }
  })

  .get("/api/git/log", ({ query, set }) => {
    const activeProject = _getActiveProject();
    const cwd = (query.cwd as string) || activeProject;
    const limit = Math.min(parseInt((query.limit as string) || "10", 10), 50);
    try {
      const raw = execFileSync("git", [
        "log", `--max-count=${limit}`,
        "--pretty=format:%H|%h|%s|%an|%ar|%ai",
      ], { cwd, encoding: "utf-8", timeout: 5000 }).trim();

      const commits = raw.split("\n").filter(Boolean).map((line) => {
        const [hash, short, subject, author, relativeDate, date] = line.split("|");
        return { hash, short, subject, author, relativeDate, date };
      });

      return commits;
    } catch {
      return [];
    }
  })

  .get("/api/git/diff", ({ query, set }) => {
    const activeProject = _getActiveProject();
    const cwd = (query.cwd as string) || activeProject;
    const staged = query.staged === "true";
    try {
      const args = ["diff"];
      if (staged) args.push("--cached");
      args.push("--stat");
      const stat = execFileSync("git", args, { cwd, encoding: "utf-8", timeout: 5000 }).trim();

      const fullArgs = ["diff"];
      if (staged) fullArgs.push("--cached");
      const full = execFileSync("git", fullArgs, { cwd, encoding: "utf-8", timeout: 10000 }).trim();

      return { stat, diff: full.slice(0, 50000) }; // Limit diff size
    } catch {
      return { stat: "", diff: "" };
    }
  })

  // ============================================================
  // OPS PANEL — Shell execution with streaming
  // ============================================================

  .post("/api/ops/run", ({ body, set }) => {
    const activeProject = _getActiveProject();
    const { command, args: cmdArgs = [], cwd: opsCwd } = body as { command: string; args?: string[]; cwd?: string };
    if (!command || typeof command !== "string") {
      set.status = 400;
      return { error: "command is required" };
    }

    // Allowlist of safe commands
    const ALLOWED_CMDS = ["aws", "npm", "npx", "node", "bun", "make", "git", "docker", "cdk", "sam", "terraform", "kubectl"];
    if (!ALLOWED_CMDS.includes(command)) {
      set.status = 400;
      return { error: `Command "${command}" is not allowed. Allowed: ${ALLOWED_CMDS.join(", ")}` };
    }

    const projectCwd = opsCwd || activeProject;
    const env = buildProjectEnv(projectCwd);

    const id = randomUUID().slice(0, 12);
    // spawn() doesn't use shell, but validate args for defense in depth
    const safeArgs = (cmdArgs as string[]).filter(a => typeof a === "string" && a.length < 1000);

    try {
      const child = spawn(command, safeArgs, {
        env,
        cwd: opsCwd || activeProject,
        stdio: ["ignore", "pipe", "pipe"],
      });

      const opsEntry = { process: child, output: [] as string[], status: "running", exitCode: null as number | null };
      opsProcesses.set(id, opsEntry);

      child.stdout?.on("data", (data: Buffer) => opsEntry.output.push(data.toString()));
      child.stderr?.on("data", (data: Buffer) => opsEntry.output.push(data.toString()));
      child.on("close", (code) => {
        opsEntry.status = code === 0 ? "done" : "error";
        opsEntry.exitCode = code;
        // Clean up after 30 min
        setTimeout(() => opsProcesses.delete(id), 1800000);
      });

      set.status = 201;
      return { ok: true, id, pid: child.pid };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to run command";
      set.status = 500;
      return { error: msg };
    }
  })

  // SSE stream for ops process output (backwards compatibility)
  .get("/api/ops/stream/:id", ({ params, set }) => {
    const entry = opsProcesses.get(params.id);
    if (!entry) {
      set.status = 404;
      return { error: "Process not found" };
    }

    return new Response(
      new ReadableStream({
        start(controller) {
          const encoder = new TextEncoder();
          const send = (data: unknown) => {
            try {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
            } catch {}
          };

          // Send existing output
          if (entry.output.length > 0) {
            send({ type: "output", content: entry.output.join("") });
          }

          if (entry.status !== "running") {
            send({ type: "done", exitCode: entry.exitCode });
            controller.close();
            return;
          }

          // Stream new output
          const interval = setInterval(() => {
            if (entry.output.length > 0) {
              send({ type: "output", content: entry.output.join("") });
            }
            if (entry.status !== "running") {
              send({ type: "done", exitCode: entry.exitCode });
              clearInterval(interval);
              controller.close();
            }
          }, 500);
        },
      }),
      {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          "Connection": "keep-alive",
          "X-Accel-Buffering": "no",
        },
      }
    );
  })

  .post("/api/ops/stop/:id", ({ params, set }) => {
    const entry = opsProcesses.get(params.id);
    if (!entry) {
      set.status = 404;
      return { error: "Process not found" };
    }
    try { entry.process.kill("SIGTERM"); } catch (err) { logError("ops:stop", err); }
    return { ok: true };
  })

  // ============================================================
  // WebSocket: real-time ops process output + stdin
  // ============================================================

  .ws("/api/ws/ops/:id", {
    open(ws) {
      const id = (ws.data as unknown as { params: { id: string } }).params.id;
      const entry = opsProcesses.get(id);
      if (!entry) {
        ws.send(JSON.stringify({ type: "error", message: "Process not found" }));
        ws.close();
        return;
      }

      // Send existing output
      if (entry.output.length > 0) {
        ws.send(JSON.stringify({ type: "output", content: entry.output.join("") }));
      }

      if (entry.status !== "running") {
        ws.send(JSON.stringify({ type: "done", exitCode: entry.exitCode }));
        ws.close();
        return;
      }

      // Stream stdout/stderr to the WebSocket
      const onStdout = (data: Buffer) => {
        try { ws.send(JSON.stringify({ type: "stdout", content: data.toString() })); } catch (err) { logWarn("ops:ws:stdout", err instanceof Error ? err.message : String(err)); }
      };
      const onStderr = (data: Buffer) => {
        try { ws.send(JSON.stringify({ type: "stderr", content: data.toString() })); } catch (err) { logWarn("ops:ws:stderr", err instanceof Error ? err.message : String(err)); }
      };
      const onClose = (code: number | null) => {
        try {
          ws.send(JSON.stringify({ type: "done", exitCode: code }));
          ws.close();
        } catch (err) { logWarn("ops:ws:done", err instanceof Error ? err.message : String(err)); }
      };

      entry.process.stdout?.on("data", onStdout);
      entry.process.stderr?.on("data", onStderr);
      entry.process.on("close", onClose);

      // Store listeners for cleanup
      (ws.data as unknown as Record<string, unknown>)._opsListeners = { onStdout, onStderr, onClose, entry };
    },
    message(ws, data) {
      // Write to process stdin
      const id = (ws.data as unknown as { params: { id: string } }).params.id;
      const entry = opsProcesses.get(id);
      if (entry && entry.process.stdin) {
        const msg = typeof data === "string" ? data : String(data);
        try { entry.process.stdin.write(msg); } catch (err) { logWarn("ops:ws:stdin", err instanceof Error ? err.message : String(err)); }
      }
    },
    close(ws) {
      // Remove listeners
      const listeners = (ws.data as unknown as Record<string, unknown>)._opsListeners as {
        onStdout: (data: Buffer) => void;
        onStderr: (data: Buffer) => void;
        onClose: (code: number | null) => void;
        entry: { process: ReturnType<typeof spawn> };
      } | undefined;
      if (listeners) {
        listeners.entry.process.stdout?.removeListener("data", listeners.onStdout);
        listeners.entry.process.stderr?.removeListener("data", listeners.onStderr);
        listeners.entry.process.removeListener("close", listeners.onClose);
      }
    },
  })

  // ============================================================
  // WebSocket: interactive terminal
  // ============================================================

  .ws("/api/ws/terminal", {
    open(ws) {
      const query = (ws.data as unknown as { query?: { cwd?: string } }).query;
      const activeProject = _getActiveProject();
      const cwd = query?.cwd || activeProject;

      const shell = spawn("/bin/zsh", ["-i"], {
        cwd,
        stdio: ["pipe", "pipe", "pipe"],
        env: {
          ...process.env,
          ...buildProjectEnv(cwd),
          TERM: "xterm-256color",
          LANG: "en_US.UTF-8",
        },
      });

      const onStdout = (data: Buffer) => {
        try { ws.send(JSON.stringify({ type: "stdout", content: data.toString() })); } catch (err) { logWarn("ops:terminal:stdout", err instanceof Error ? err.message : String(err)); }
      };
      const onStderr = (data: Buffer) => {
        try { ws.send(JSON.stringify({ type: "stderr", content: data.toString() })); } catch (err) { logWarn("ops:terminal:stderr", err instanceof Error ? err.message : String(err)); }
      };
      const onClose = (code: number | null) => {
        try {
          ws.send(JSON.stringify({ type: "exit", exitCode: code }));
          ws.close();
        } catch (err) { logWarn("ops:terminal:done", err instanceof Error ? err.message : String(err)); }
      };

      shell.stdout?.on("data", onStdout);
      shell.stderr?.on("data", onStderr);
      shell.on("close", onClose);

      // Store shell process for message/close handlers
      (ws.data as unknown as Record<string, unknown>)._shell = shell;
      (ws.data as unknown as Record<string, unknown>)._shellListeners = { onStdout, onStderr, onClose };
    },
    message(ws, data) {
      const shell = (ws.data as unknown as Record<string, unknown>)._shell as ReturnType<typeof spawn> | undefined;
      if (shell && shell.stdin) {
        const msg = typeof data === "string" ? data : String(data);
        try { shell.stdin.write(msg); } catch (err) { logWarn("ops:terminal:stdin", err instanceof Error ? err.message : String(err)); }
      }
    },
    close(ws) {
      const shell = (ws.data as unknown as Record<string, unknown>)._shell as ReturnType<typeof spawn> | undefined;
      if (shell) {
        try { shell.kill("SIGTERM"); } catch (err) { logError("ops:terminal:kill", err); }
      }
      // Remove listeners
      const listeners = (ws.data as unknown as Record<string, unknown>)._shellListeners as {
        onStdout: (data: Buffer) => void;
        onStderr: (data: Buffer) => void;
        onClose: (code: number | null) => void;
      } | undefined;
      if (listeners && shell) {
        shell.stdout?.removeListener("data", listeners.onStdout);
        shell.stderr?.removeListener("data", listeners.onStderr);
        shell.removeListener("close", listeners.onClose);
      }
    },
  })

  // ============================================================
  // PER-PROJECT ENVIRONMENT CONFIGURATION
  // ============================================================

  // GET project env config
  .get("/api/projects/env", ({ query, set }) => {
    const cwd = query.cwd as string;
    if (!cwd) {
      set.status = 400;
      return { error: "cwd required" };
    }

    const config = loadProjectEnv(cwd);
    const globalConfig = loadIntegrations();

    // Also return which global integrations are available for override
    return {
      config,
      global: {
        supabase: globalConfig.supabase ? {
          projectRef: globalConfig.supabase.projectRef,
          projectName: globalConfig.supabase.projectName,
          url: globalConfig.supabase.url,
        } : null,
        aws: {
          activeProfile: globalConfig.aws?.activeProfile || "default",
          profiles: (() => {
            const profiles: string[] = [];
            try {
              const credsPath = join(HOME, ".aws/credentials");
              const configPath = join(HOME, ".aws/config");
              if (existsSync(credsPath)) {
                const m = readFileSync(credsPath, "utf-8").match(/\[([^\]]+)\]/g);
                if (m) profiles.push(...m.map(s => s.replace(/[[\]]/g, "")));
              }
              if (existsSync(configPath)) {
                const m = readFileSync(configPath, "utf-8").match(/\[profile ([^\]]+)\]/g);
                if (m) profiles.push(...m.map(s => s.replace(/\[profile |\]/g, "")));
              }
            } catch {}
            return [...new Set(profiles)];
          })(),
        },
      },
      hasProjectEnvFile: existsSync(getProjectEnvPath(cwd)),
    };
  })

  // PUT project env config (full replace)
  .put("/api/projects/env", ({ body, set }) => {
    const { cwd, config } = body as { cwd: string; config: unknown };
    if (!cwd || !config) {
      set.status = 400;
      return { error: "cwd and config required" };
    }
    saveProjectEnv(cwd, config as Parameters<typeof saveProjectEnv>[1]);
    return { ok: true };
  })

  // PATCH project env (merge specific fields)
  .patch("/api/projects/env", ({ body, set }) => {
    const { cwd, env: envVars, supabase, aws } = body as { cwd: string; env?: Record<string, string>; supabase?: unknown; aws?: unknown };
    if (!cwd) {
      set.status = 400;
      return { error: "cwd required" };
    }

    const existing = loadProjectEnv(cwd);

    if (envVars !== undefined) existing.env = envVars;
    if (supabase !== undefined) (existing as Record<string, unknown>).supabase = supabase;
    if (aws !== undefined) (existing as Record<string, unknown>).aws = aws;

    saveProjectEnv(cwd, existing);
    return { ok: true, config: existing };
  })

  // DELETE a specific env var from project
  .delete("/api/projects/env/var", ({ query, set }) => {
    const cwd = query.cwd as string;
    const key = query.key as string;
    if (!cwd || !key) {
      set.status = 400;
      return { error: "cwd and key required" };
    }

    const config = loadProjectEnv(cwd);
    if (config.env) {
      delete config.env[key];
      if (Object.keys(config.env).length === 0) delete config.env;
    }
    saveProjectEnv(cwd, config);
    return { ok: true };
  })

  // ============================================================
  // EMBEDDED BROWSER — full rewriting proxy for iframe embedding
  // ============================================================

  // Proxy all requests: /api/browser/proxy?url=<encoded-url>
  // Strips X-Frame-Options, CSP frame-ancestors, rewrites links to go through proxy
  .get("/api/browser/proxy", async ({ query, set }) => {
    const targetUrl = query.url as string;
    if (!targetUrl) {
      set.status = 400;
      return "url parameter required";
    }

    let parsed: URL;
    try {
      parsed = new URL(targetUrl);
      if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
        set.status = 400;
        return "Only HTTP/HTTPS URLs";
      }
    } catch {
      set.status = 400;
      return "Invalid URL";
    }

    try {
      const resp = await fetch(targetUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15",
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
          "Accept-Encoding": "identity",
          "Referer": targetUrl,
        },
        redirect: "follow",
      });

      const contentType = resp.headers.get("content-type") || "application/octet-stream";

      if (contentType.includes("text/html")) {
        let html = await resp.text();
        const origin = `${parsed.protocol}//${parsed.host}`;
        const proxyBase = "/api/browser/proxy?url=";

        // 1. Inject <base> for relative URL resolution
        if (!html.includes("<base ")) {
          html = html.replace(/<head([^>]*)>/i, `<head$1><base href="${origin}${parsed.pathname.replace(/\/[^/]*$/, "/")}">` );
        }

        // 2. Inject script to intercept link clicks and form submits, routing them through proxy
        const interceptScript = `
<script data-proxy-inject>
(function() {
  const PROXY = "${proxyBase}";
  function proxyUrl(url) {
    if (!url || url.startsWith("javascript:") || url.startsWith("#") || url.startsWith("data:") || url.startsWith("blob:")) return url;
    try {
      const abs = new URL(url, document.baseURI).href;
      if (abs.startsWith("${origin}") || abs.startsWith("http")) {
        return PROXY + encodeURIComponent(abs);
      }
    } catch {}
    return url;
  }
  // Intercept clicks on links
  document.addEventListener("click", function(e) {
    const a = e.target.closest("a[href]");
    if (a && a.href && !a.href.startsWith("javascript:") && a.target !== "_blank") {
      e.preventDefault();
      const dest = proxyUrl(a.getAttribute("href"));
      // Notify parent about navigation
      window.parent.postMessage({ type: "proxy-navigate", url: new URL(a.getAttribute("href"), document.baseURI).href }, "*");
      window.location.href = dest;
    }
  }, true);
  // Intercept form submissions
  document.addEventListener("submit", function(e) {
    const form = e.target;
    if (form.action) {
      form.action = proxyUrl(form.action);
    }
  }, true);
  // Report current URL to parent
  window.parent.postMessage({ type: "proxy-loaded", url: "${targetUrl}", title: document.title }, "*");
  // Watch for title changes
  new MutationObserver(function() {
    window.parent.postMessage({ type: "proxy-title", title: document.title }, "*");
  }).observe(document.querySelector("title") || document.head, { childList: true, characterData: true, subtree: true });
})();
</script>`;
        html = html.replace(/<\/body>/i, interceptScript + "</body>");

        return new Response(html, {
          headers: {
            "Content-Type": contentType,
          },
        });
      } else {
        // Binary — pipe through
        const buffer = await resp.arrayBuffer();
        const headers: Record<string, string> = {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=3600",
        };
        // Forward safe headers
        for (const h of ["content-language", "last-modified", "etag"]) {
          const val = resp.headers.get(h);
          if (val) headers[h] = val;
        }
        return new Response(Buffer.from(buffer), { headers });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Proxy error";
      set.status = 502;
      return `<html><body><h3>Failed to load</h3><p>${msg}</p><p>${targetUrl}</p></body></html>`;
    }
  })

  // Also allow localhost/127.0.0.1 for viewing local dev servers
  .get("/api/browser/local", ({ query, set }) => {
    const port = parseInt(query.port as string, 10);
    if (!port || port < 1000 || port > 65535) {
      set.status = 400;
      return { error: "Invalid port" };
    }
    // Redirect to the local server — this works because same-origin iframes are allowed
    set.redirect = `http://localhost:${port}${query.path || "/"}`;
  })

  // ============================================================
  // MEMORY SYSTEM (claude-mem proxy)
  // ============================================================

  .get("/api/memory/status", async ({ set }) => {
    const healthRes = await fetchClaudeMemWorker("/health");
    if (!healthRes || !healthRes.ok) {
      return {
        workerHealthy: false,
        observations: null,
        sessions: null,
        dbSize: null,
      };
    }

    try {
      // Try to get stats from the worker — response is nested: { worker: {...}, database: {...} }
      const statsRes = await fetchClaudeMemWorker("/api/stats");
      if (statsRes?.ok) {
        const stats = await statsRes.json() as { database?: { observations?: number; sessions?: number; size?: number; summaries?: number }; worker?: Record<string, unknown> };
        const db = stats.database || {};
        const sizeBytes = db.size ?? 0;
        const dbSize = sizeBytes > 1048576 ? `${(sizeBytes / 1048576).toFixed(1)} MB` : sizeBytes > 1024 ? `${(sizeBytes / 1024).toFixed(0)} KB` : `${sizeBytes} B`;

        return {
          workerHealthy: true,
          observations: db.observations ?? 0,
          sessions: db.sessions ?? 0,
          dbSize,
        };
      } else {
        return { workerHealthy: true, observations: null, sessions: null, dbSize: null };
      }
    } catch {
      return { workerHealthy: true, observations: null, sessions: null, dbSize: null };
    }
  })

  .get("/api/memory/search", async ({ query, set }) => {
    const q = (query.q as string)?.trim();
    if (!q) return { results: [] };
    if (q.length > 500) {
      set.status = 400;
      return { error: "Query too long" };
    }

    const limit = Math.min(Math.max(parseInt(query.limit as string) || 20, 1), 100);
    const searchRes = await fetchClaudeMemWorker(`/api/search?q=${encodeURIComponent(q)}&limit=${limit}`);

    if (!searchRes || !searchRes.ok) {
      return { results: [] };
    }

    try {
      const data = await searchRes.json() as Record<string, unknown>;
      return { results: data.results ?? data.observations ?? [] };
    } catch {
      return { results: [] };
    }
  })

  .get("/api/memory/observations", async ({ query, set }) => {
    const limit = Math.min(Math.max(parseInt(query.limit as string) || 20, 1), 100);
    const obsRes = await fetchClaudeMemWorker(`/api/observations?limit=${limit}`);

    if (!obsRes || !obsRes.ok) {
      return { observations: [] };
    }

    try {
      const data = await obsRes.json();
      return data;
    } catch {
      return { observations: [] };
    }
  });

/** Cleanup function for graceful shutdown */
export function cleanup() {
  // Kill all running ops processes
  for (const [id, entry] of opsProcesses) {
    try { entry.process.kill("SIGTERM"); } catch (err) { logError("ops:cleanup:kill", err); }
    opsProcesses.delete(id);
  }
}

export default opsRoutes;
