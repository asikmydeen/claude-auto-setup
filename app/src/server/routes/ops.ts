import { Router } from "express";
import {
  readFileSync,
  existsSync,
} from "fs";
import { join } from "path";
import { execFileSync, spawn } from "child_process";
import { randomUUID } from "crypto";
import {
  PROJECT_ROOT,
  HOME,
  buildProjectEnv,
  loadProjectEnv,
  saveProjectEnv,
  loadIntegrations,
  getProjectEnvPath,
} from "../lib/shared";

const router = Router();

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
// INSTALL / DISPATCH (run project scripts via spawn)
// ============================================================

router.post("/api/install", (req, res) => {
  const { flags = [] } = req.body;
  try {
    const output = execFileSync(
      "bash",
      [join(PROJECT_ROOT, "install.sh"), ...flags],
      { encoding: "utf-8", timeout: 60000, cwd: PROJECT_ROOT }
    );
    res.json({ ok: true, output });
  } catch (e: unknown) {
    const err = e as { stdout?: string; stderr?: string };
    res.json({ ok: false, output: err.stdout || "", error: err.stderr || "" });
  }
});

router.post("/api/dispatch", (req, res) => {
  const { task, type, provider } = req.body;
  const args = [join(PROJECT_ROOT, "dispatch.sh"), "--task", task, "--type", type];
  if (provider) args.push("--provider", provider);
  try {
    const output = execFileSync("bash", args, {
      encoding: "utf-8",
      timeout: 120000,
      cwd: PROJECT_ROOT,
    });
    res.json({ ok: true, output });
  } catch (e: unknown) {
    const err = e as { stdout?: string; stderr?: string };
    res.json({ ok: false, output: err.stdout || "", error: err.stderr || "" });
  }
});

// ============================================================
// GIT INTEGRATION
// ============================================================

router.get("/api/git/status", (req, res) => {
  const activeProject = _getActiveProject();
  const cwd = (req.query.cwd as string) || activeProject;
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

    res.json({
      branch,
      clean: files.length === 0,
      staged: staged.length,
      modified: modified.length,
      files,
      ahead,
      behind,
    });
  } catch (e) {
    res.json({ branch: "unknown", clean: true, staged: 0, modified: 0, files: [], ahead: 0, behind: 0, error: "Not a git repository" });
  }
});

router.get("/api/git/log", (req, res) => {
  const activeProject = _getActiveProject();
  const cwd = (req.query.cwd as string) || activeProject;
  const limit = Math.min(parseInt((req.query.limit as string) || "10", 10), 50);
  try {
    const raw = execFileSync("git", [
      "log", `--max-count=${limit}`,
      "--pretty=format:%H|%h|%s|%an|%ar|%ai",
    ], { cwd, encoding: "utf-8", timeout: 5000 }).trim();

    const commits = raw.split("\n").filter(Boolean).map((line) => {
      const [hash, short, subject, author, relativeDate, date] = line.split("|");
      return { hash, short, subject, author, relativeDate, date };
    });

    res.json(commits);
  } catch {
    res.json([]);
  }
});

router.get("/api/git/diff", (req, res) => {
  const activeProject = _getActiveProject();
  const cwd = (req.query.cwd as string) || activeProject;
  const staged = req.query.staged === "true";
  try {
    const args = ["diff"];
    if (staged) args.push("--cached");
    args.push("--stat");
    const stat = execFileSync("git", args, { cwd, encoding: "utf-8", timeout: 5000 }).trim();

    const fullArgs = ["diff"];
    if (staged) fullArgs.push("--cached");
    const full = execFileSync("git", fullArgs, { cwd, encoding: "utf-8", timeout: 10000 }).trim();

    res.json({ stat, diff: full.slice(0, 50000) }); // Limit diff size
  } catch {
    res.json({ stat: "", diff: "" });
  }
});

// ============================================================
// OPS PANEL — Shell execution with streaming
// ============================================================

const opsProcesses = new Map<string, { process: ReturnType<typeof spawn>; output: string[]; status: string; exitCode: number | null }>();

router.post("/api/ops/run", (req, res) => {
  const activeProject = _getActiveProject();
  const { command, args: cmdArgs = [], cwd: opsCwd } = req.body;
  if (!command || typeof command !== "string") return res.status(400).json({ error: "command is required" });

  // Allowlist of safe commands
  const ALLOWED_CMDS = ["aws", "npm", "npx", "node", "bun", "make", "git", "docker", "cdk", "sam", "terraform", "kubectl"];
  if (!ALLOWED_CMDS.includes(command)) {
    return res.status(400).json({ error: `Command "${command}" is not allowed. Allowed: ${ALLOWED_CMDS.join(", ")}` });
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

    res.status(201).json({ ok: true, id, pid: child.pid });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to run command";
    res.status(500).json({ error: msg });
  }
});

router.get("/api/ops/stream/:id", (req, res) => {
  const entry = opsProcesses.get(req.params.id);
  if (!entry) return res.status(404).json({ error: "Process not found" });

  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "X-Accel-Buffering": "no",
  });

  // Send existing output
  if (entry.output.length > 0) {
    res.write(`data: ${JSON.stringify({ type: "output", content: entry.output.join("") })}\n\n`);
  }

  if (entry.status !== "running") {
    res.write(`data: ${JSON.stringify({ type: "done", exitCode: entry.exitCode })}\n\n`);
    return res.end();
  }

  // Stream new output
  const interval = setInterval(() => {
    if (entry.output.length > 0) {
      res.write(`data: ${JSON.stringify({ type: "output", content: entry.output.join("") })}\n\n`);
    }
    if (entry.status !== "running") {
      res.write(`data: ${JSON.stringify({ type: "done", exitCode: entry.exitCode })}\n\n`);
      clearInterval(interval);
      res.end();
    }
  }, 500);

  req.on("close", () => clearInterval(interval));
});

router.post("/api/ops/stop/:id", (req, res) => {
  const entry = opsProcesses.get(req.params.id);
  if (!entry) return res.status(404).json({ error: "Process not found" });
  try { entry.process.kill("SIGTERM"); } catch {}
  res.json({ ok: true });
});

// ============================================================
// PER-PROJECT ENVIRONMENT CONFIGURATION
// ============================================================

// GET project env config
router.get("/api/projects/env", (req, res) => {
  const cwd = req.query.cwd as string;
  if (!cwd) return res.status(400).json({ error: "cwd required" });

  const config = loadProjectEnv(cwd);
  const globalConfig = loadIntegrations();

  // Also return which global integrations are available for override
  res.json({
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
  });
});

// PUT project env config (full replace)
router.put("/api/projects/env", (req, res) => {
  const { cwd, config } = req.body;
  if (!cwd || !config) return res.status(400).json({ error: "cwd and config required" });
  saveProjectEnv(cwd, config);
  res.json({ ok: true });
});

// PATCH project env (merge specific fields)
router.patch("/api/projects/env", (req, res) => {
  const { cwd, env: envVars, supabase, aws } = req.body;
  if (!cwd) return res.status(400).json({ error: "cwd required" });

  const existing = loadProjectEnv(cwd);

  if (envVars !== undefined) existing.env = envVars;
  if (supabase !== undefined) existing.supabase = supabase;
  if (aws !== undefined) existing.aws = aws;

  saveProjectEnv(cwd, existing);
  res.json({ ok: true, config: existing });
});

// DELETE a specific env var from project
router.delete("/api/projects/env/var", (req, res) => {
  const cwd = req.query.cwd as string;
  const key = req.query.key as string;
  if (!cwd || !key) return res.status(400).json({ error: "cwd and key required" });

  const config = loadProjectEnv(cwd);
  if (config.env) {
    delete config.env[key];
    if (Object.keys(config.env).length === 0) delete config.env;
  }
  saveProjectEnv(cwd, config);
  res.json({ ok: true });
});

// ============================================================
// EMBEDDED BROWSER — full rewriting proxy for iframe embedding
// ============================================================

// Proxy all requests: /api/browser/proxy?url=<encoded-url>
// Strips X-Frame-Options, CSP frame-ancestors, rewrites links to go through proxy
router.get("/api/browser/proxy", async (req, res) => {
  const targetUrl = req.query.url as string;
  if (!targetUrl) return res.status(400).send("url parameter required");

  let parsed: URL;
  try {
    parsed = new URL(targetUrl);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
      return res.status(400).send("Only HTTP/HTTPS URLs");
    }
  } catch {
    return res.status(400).send("Invalid URL");
  }

  try {
    const resp = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15",
        "Accept": req.headers.accept || "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "identity",
        "Referer": targetUrl,
      },
      redirect: "follow",
    });

    const contentType = resp.headers.get("content-type") || "application/octet-stream";
    res.setHeader("Content-Type", contentType);
    // Cache proxied assets for performance
    if (!contentType.includes("text/html")) {
      res.setHeader("Cache-Control", "public, max-age=3600");
    }

    // Explicitly DO NOT forward: x-frame-options, content-security-policy
    // Forward safe headers only
    for (const h of ["content-language", "last-modified", "etag"]) {
      const val = resp.headers.get(h);
      if (val) res.setHeader(h, val);
    }

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

      res.send(html);
    } else {
      // Binary — pipe through
      const buffer = await resp.arrayBuffer();
      res.send(Buffer.from(buffer));
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Proxy error";
    res.status(502).send(`<html><body><h3>Failed to load</h3><p>${msg}</p><p>${targetUrl}</p></body></html>`);
  }
});

// Also allow localhost/127.0.0.1 for viewing local dev servers
router.get("/api/browser/local", (req, res) => {
  const port = parseInt(req.query.port as string, 10);
  if (!port || port < 1000 || port > 65535) return res.status(400).json({ error: "Invalid port" });
  // Redirect to the local server — this works because same-origin iframes are allowed
  res.redirect(`http://localhost:${port}${req.query.path || "/"}`);
});

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

router.get("/api/memory/status", async (_req, res) => {
  const healthRes = await fetchClaudeMemWorker("/health");
  if (!healthRes || !healthRes.ok) {
    return res.json({
      workerHealthy: false,
      observations: null,
      sessions: null,
      dbSize: null,
    });
  }

  try {
    // Try to get stats from the worker — response is nested: { worker: {...}, database: {...} }
    const statsRes = await fetchClaudeMemWorker("/api/stats");
    if (statsRes?.ok) {
      const stats = await statsRes.json() as { database?: { observations?: number; sessions?: number; size?: number; summaries?: number }; worker?: Record<string, unknown> };
      const db = stats.database || {};
      const sizeBytes = db.size ?? 0;
      const dbSize = sizeBytes > 1048576 ? `${(sizeBytes / 1048576).toFixed(1)} MB` : sizeBytes > 1024 ? `${(sizeBytes / 1024).toFixed(0)} KB` : `${sizeBytes} B`;

      res.json({
        workerHealthy: true,
        observations: db.observations ?? 0,
        sessions: db.sessions ?? 0,
        dbSize,
      });
    } else {
      res.json({ workerHealthy: true, observations: null, sessions: null, dbSize: null });
    }
  } catch {
    res.json({ workerHealthy: true, observations: null, sessions: null, dbSize: null });
  }
});

router.get("/api/memory/search", async (req, res) => {
  const q = (req.query.q as string)?.trim();
  if (!q) return res.json({ results: [] });
  if (q.length > 500) return res.status(400).json({ error: "Query too long" });

  const limit = Math.min(Math.max(parseInt(req.query.limit as string) || 20, 1), 100);
  const searchRes = await fetchClaudeMemWorker(`/api/search?q=${encodeURIComponent(q)}&limit=${limit}`);

  if (!searchRes || !searchRes.ok) {
    return res.json({ results: [] });
  }

  try {
    const data = await searchRes.json() as Record<string, unknown>;
    res.json({ results: data.results ?? data.observations ?? [] });
  } catch {
    res.json({ results: [] });
  }
});

router.get("/api/memory/observations", async (req, res) => {
  const limit = Math.min(Math.max(parseInt(req.query.limit as string) || 20, 1), 100);
  const obsRes = await fetchClaudeMemWorker(`/api/observations?limit=${limit}`);

  if (!obsRes || !obsRes.ok) {
    return res.json({ observations: [] });
  }

  try {
    const data = await obsRes.json();
    res.json(data);
  } catch {
    res.json({ observations: [] });
  }
});

/** Cleanup function for graceful shutdown */
export function cleanup() {
  // Kill all running ops processes
  for (const [id, entry] of opsProcesses) {
    try { entry.process.kill("SIGTERM"); } catch {}
    opsProcesses.delete(id);
  }
}

export default router;
