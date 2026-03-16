/**
 * Project management routes — file changes, project CRUD, filesystem browsing,
 * project intelligence, project type detection, and the legacy launch endpoint.
 */
import { Elysia } from "elysia";
import {
  readFileSync,
  readdirSync,
  existsSync,
} from "fs";
import { join, dirname, resolve } from "path";
import { homedir } from "os";
import { execFileSync, spawn } from "child_process";
import { randomUUID } from "crypto";

import {
  HOME,
  CLAUDE_DIR,
  PROJECT_ROOT,
  ClaudeSession,
  buildProjectEnv,
} from "../lib/shared";
import { logError } from "../lib/logger";

// ---------------------------------------------------------------------------
// Shared state — injected from the main server via `initProjectsRouter()`
// ---------------------------------------------------------------------------

let claudeSessions: Map<string, ClaudeSession>;
let sseClients: Map<string, Set<ReadableStreamDefaultController>>;
let wireStreamJson: (
  child: ReturnType<typeof spawn>,
  session: ClaudeSession,
  sessionId: string,
) => void;
let persistSessions: () => void;
let devServers: Map<string, { process: ReturnType<typeof spawn>; port: number; cwd: string; status: string; output: string[]; runtime: string; containerId?: string }>;

/** Active project directory — exported so other modules (e.g. templates) can read/write it. */
export let activeProjectPath: string = PROJECT_ROOT;

export function setActiveProject(path: string) {
  activeProjectPath = path;
}

/** Getter for activeProjectPath (for use from index.ts) */
export function getActiveProjectPath(): string {
  return activeProjectPath;
}

/** In-memory storage for user's manually-added projects */
export const userProjects: Array<{ path: string; name: string; addedAt: string }> = [];

/** Getter for userProjects (for use from index.ts) */
export function getUserProjects(): Array<{ path: string; name: string; addedAt: string }> {
  return userProjects;
}

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------

/** Detect file changes in a git working tree (staged + unstaged + untracked). */
export function detectFileChanges(cwd: string): string[] {
  try {
    const staged = execFileSync("git", ["diff", "--name-only", "--cached"], {
      cwd,
      encoding: "utf-8",
      timeout: 5000,
    }).trim();
    const unstaged = execFileSync("git", ["diff", "--name-only"], {
      cwd,
      encoding: "utf-8",
      timeout: 5000,
    }).trim();
    const untracked = execFileSync(
      "git",
      ["ls-files", "--others", "--exclude-standard"],
      { cwd, encoding: "utf-8", timeout: 5000 },
    ).trim();
    return [
      ...new Set(
        [
          ...staged.split("\n"),
          ...unstaged.split("\n"),
          ...untracked.split("\n"),
        ].filter(Boolean),
      ),
    ];
  } catch {
    return [];
  }
}

/** Auto-discover projects from ~/.claude/projects/ */
function discoverProjects(): Array<{ path: string; name: string }> {
  const projectsDir = join(CLAUDE_DIR, "projects");
  if (!existsSync(projectsDir)) return [];
  try {
    return readdirSync(projectsDir)
      .filter((d) => d.startsWith("-"))
      .map((d) => {
        // Decode the directory name: -Users-foo-project becomes /Users/foo/project
        const decoded = "/" + d.slice(1).replace(/-/g, "/");
        return { path: decoded, name: decoded.split("/").pop() || d };
      })
      .filter((p) => existsSync(p.path))
      .slice(0, 20);
  } catch {
    return [];
  }
}

type ProjectType = "frontend" | "backend" | "fullstack" | "cli" | "static" | "unknown";

function detectProjectType(cwd: string): ProjectType {
  try {
    const pkgPath = join(cwd, "package.json");
    if (!existsSync(pkgPath)) {
      // Check for static site (index.html at root)
      if (existsSync(join(cwd, "index.html"))) return "static";
      return "unknown";
    }

    const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
    const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };
    const scripts = pkg.scripts || {};

    // Fullstack frameworks detected first (they bundle frontend + backend)
    const fullstackFw = ["next", "nuxt", "remix", "@redwoodjs/core", "@blitzjs/next"];
    if (fullstackFw.some((fw) => allDeps[fw])) return "fullstack";

    const webFrameworks = ["react", "vue", "svelte", "@angular/core", "vite", "astro", "express", "fastify", "hono", "koa", "@nestjs/core", "hapi"];

    // CLI detection: has bin field + no web frameworks + no dev/start script
    if (pkg.bin && !webFrameworks.some((fw) => allDeps[fw])) {
      if (!scripts.dev && !scripts.start) return "cli";
    }

    const hasFrontend = !!(allDeps.react || allDeps.vue || allDeps.svelte || allDeps["@angular/core"] || allDeps.vite || allDeps.astro);
    const hasBackend = !!(allDeps.express || allDeps.fastify || allDeps.hono || allDeps.koa || allDeps["@nestjs/core"] || allDeps.hapi);

    if (hasFrontend && hasBackend) return "fullstack";
    if (hasFrontend) return "frontend";
    if (hasBackend) return "backend";

    // Fallback: if has dev script, assume frontend-ish
    if (scripts.dev) return "frontend";
    if (scripts.start) return "backend";

    return "unknown";
  } catch {
    return "unknown";
  }
}

// ---------------------------------------------------------------------------
// Elysia plugin
// ---------------------------------------------------------------------------

export const projectsRoutes = new Elysia()

  // ============================================================
  // FILE CHANGES (git diff in PROJECT_ROOT)
  // ============================================================

  .get("/api/files/changes", () => {
    try {
      const files = detectFileChanges(PROJECT_ROOT);
      return { files, cwd: PROJECT_ROOT };
    } catch {
      return { files: [], cwd: PROJECT_ROOT };
    }
  })

  // ============================================================
  // PROJECT MANAGEMENT
  // ============================================================

  .get("/api/projects", () => {
    const discovered = discoverProjects();
    const manual = userProjects;
    // Merge, deduplicate by path
    const allPaths = new Set<string>();
    const all: Array<{ path: string; name: string; source: string }> = [];

    // Active project first
    allPaths.add(activeProjectPath);
    all.push({ path: activeProjectPath, name: activeProjectPath.split("/").pop() || "project", source: "active" });

    for (const p of manual) {
      if (!allPaths.has(p.path)) {
        allPaths.add(p.path);
        all.push({ ...p, source: "manual" });
      }
    }
    for (const p of discovered) {
      if (!allPaths.has(p.path)) {
        allPaths.add(p.path);
        all.push({ ...p, source: "discovered" });
      }
    }

    return { active: activeProjectPath, projects: all };
  })

  .post("/api/projects", ({ body, set }) => {
    const { path: projectPath } = body as { path?: string };
    if (!projectPath || typeof projectPath !== "string") {
      set.status = 400;
      return { error: "Path is required" };
    }
    const cleanPath = projectPath.trim();
    if (!existsSync(cleanPath)) {
      set.status = 400;
      return { error: "Path does not exist" };
    }
    // Add to manual list if not already there
    if (!userProjects.some((p) => p.path === cleanPath)) {
      userProjects.push({
        path: cleanPath,
        name: cleanPath.split("/").pop() || "project",
        addedAt: new Date().toISOString(),
      });
    }
    return { ok: true };
  })

  .put("/api/projects/active", ({ body, set }) => {
    const { path: projectPath } = body as { path?: string };
    if (!projectPath || !existsSync(projectPath)) {
      set.status = 400;
      return { error: "Invalid project path" };
    }
    activeProjectPath = projectPath;
    return { ok: true, active: activeProjectPath };
  })

  // Delete project — removes from list, optionally deletes files
  .delete("/api/projects", ({ query, set }) => {
    const projectPath = query.path as string;
    const deleteFiles = query.deleteFiles === "true";
    if (!projectPath) {
      set.status = 400;
      return { error: "path is required" };
    }

    // Remove from manual projects list
    const idx = userProjects.findIndex((p) => p.path === projectPath);
    if (idx >= 0) userProjects.splice(idx, 1);

    // Stop any dev server running for this project
    const devServer = devServers.get(projectPath);
    if (devServer) {
      try { devServer.process.kill("SIGTERM"); } catch (err) { logError("projects:delete:kill", err); }
      devServers.delete(projectPath);
    }

    // Delete files if requested
    if (deleteFiles) {
      const absPath = resolve(projectPath);
      // Safety: only delete under home directory
      if (absPath.startsWith(HOME) && absPath !== HOME) {
        try {
          execFileSync("rm", ["-rf", absPath], { timeout: 30000 });
        } catch {}
      }
    }

    return { ok: true, deleted: deleteFiles };
  })

  // Open project in system Finder/file manager
  .post("/api/projects/reveal", ({ body, set }) => {
    const { path: projectPath } = body as { path?: string };
    if (!projectPath) {
      set.status = 400;
      return { error: "path required" };
    }
    try {
      execFileSync("open", [projectPath], { timeout: 5000 });
      return { ok: true };
    } catch {
      set.status = 500;
      return { error: "Failed to reveal in Finder" };
    }
  })

  // Backwards-compatible launch endpoint (creates a session, returns { pid, status })
  .post("/api/claude/launch", ({ body, set }) => {
    const { prompt, flags = [] } = body as { prompt?: string; flags?: string[] };
    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      set.status = 400;
      return { error: "Prompt is required" };
    }
    if (!Array.isArray(flags) || !flags.every((f: unknown) => typeof f === "string")) {
      set.status = 400;
      return { error: "flags must be an array of strings" };
    }

    try {
      const claudePath = execFileSync("which", ["claude"], {
        encoding: "utf-8",
      }).trim();
      if (!claudePath) {
        set.status = 404;
        return { error: "Claude not found" };
      }

      const id = randomUUID().slice(0, 12);
      const args = ["-p", prompt.trim(), "--output-format", "stream-json", "--verbose", "--dangerously-skip-permissions", ...flags];
      const env = buildProjectEnv(PROJECT_ROOT);

      const child = spawn(claudePath, args, {
        env,
        cwd: PROJECT_ROOT,
        stdio: ["ignore", "pipe", "pipe"],
      });

      const session: ClaudeSession = {
        id,
        prompt: prompt.trim(),
        status: "running",
        messages: [
          { role: "user", content: prompt.trim(), timestamp: new Date().toISOString() },
        ],
        output: [],
        exitCode: null,
        startedAt: new Date().toISOString(),
        pid: child.pid,
        cwd: PROJECT_ROOT,
        process: child,
      };

      claudeSessions.set(id, session);
      wireStreamJson(child, session, id);

      child.on("close", (code) => {
        session.status = code === 0 ? "done" : "error";
        session.exitCode = code;
        session.endedAt = new Date().toISOString();
        session.messages.push({
          role: "assistant",
          content: session.output.join(""),
          timestamp: new Date().toISOString(),
        });
        delete session.process;

        if (code === 0) {
          session.filesChanged = detectFileChanges(session.cwd);
        }

        const clients = sseClients.get(id);
        if (clients) {
          for (const client of clients) {
            client.enqueue(`data: ${JSON.stringify({ type: "done", exitCode: code, filesChanged: session.filesChanged })}\n\n`);
            try { client.close(); } catch {}
          }
          sseClients.delete(id);
        }
        persistSessions();
        // Keep in memory for 2h, persist handles disk storage
        setTimeout(() => { persistSessions(); claudeSessions.delete(id); }, 7200000);
      });

      return { pid: child.pid || 0, status: "launched", sessionId: id };
    } catch {
      set.status = 500;
      return { error: "Failed to launch Claude" };
    }
  })

  // Keep old polling endpoint for backwards compat
  .get("/api/claude/:pid/output", ({ params }) => {
    const pid = parseInt(params.pid, 10);
    // Find session by PID
    for (const session of claudeSessions.values()) {
      if (session.pid === pid) {
        const output = [...session.output];
        const done = session.status !== "running";
        return { output, done, exitCode: session.exitCode };
      }
    }
    return { output: [], done: true };
  })

  // ============================================================
  // FILESYSTEM BROWSING (for folder picker)
  // ============================================================

  .get("/api/filesystem/browse", ({ query, set }) => {
    const requestedPath = (query.path as string) || homedir();

    // Security: resolve to absolute path and prevent escaping to system dirs
    const absPath = resolve(requestedPath);

    // Basic security: only allow browsing under home directory or /tmp
    const homeDir = homedir();
    if (!absPath.startsWith(homeDir) && !absPath.startsWith("/tmp") && absPath !== "/") {
      set.status = 403;
      return { error: "Access denied" };
    }

    if (!existsSync(absPath)) {
      set.status = 404;
      return { error: "Path not found" };
    }

    try {
      const entries = readdirSync(absPath, { withFileTypes: true });
      const dirs: Array<{
        name: string;
        path: string;
        isGitRepo: boolean;
        hasPackageJson: boolean;
      }> = [];

      for (const entry of entries) {
        if (!entry.isDirectory()) continue;
        if (entry.name.startsWith(".") && entry.name !== ".claude") continue; // Skip hidden dirs except .claude

        const fullPath = join(absPath, entry.name);
        dirs.push({
          name: entry.name,
          path: fullPath,
          isGitRepo: existsSync(join(fullPath, ".git")),
          hasPackageJson: existsSync(join(fullPath, "package.json")),
        });
      }

      // Sort: git repos first, then alphabetical
      dirs.sort((a, b) => {
        if (a.isGitRepo && !b.isGitRepo) return -1;
        if (!a.isGitRepo && b.isGitRepo) return 1;
        return a.name.localeCompare(b.name);
      });

      // Get parent
      const parent = absPath === "/" ? null : dirname(absPath);

      return {
        current: absPath,
        parent: parent && parent.startsWith(homeDir) ? parent : (absPath === homeDir ? null : homeDir),
        name: absPath.split("/").pop() || "/",
        dirs,
        isGitRepo: existsSync(join(absPath, ".git")),
        hasPackageJson: existsSync(join(absPath, "package.json")),
      };
    } catch {
      set.status = 500;
      return { error: "Failed to read directory" };
    }
  })

  // ============================================================
  // PROJECT INTELLIGENCE
  // ============================================================

  .get("/api/projects/intel", ({ query }) => {
    const cwd = (query.cwd as string) || activeProjectPath;
    const intelPath = join(cwd, ".claude/rules/project-intel.md");
    const claudeMdPath = join(cwd, ".claude/CLAUDE.md");

    const result: {
      hasIntel: boolean;
      hasClaude: boolean;
      intel?: string;
      claudeMd?: string;
      summary?: { stack?: string; commands?: string[]; lastUpdated?: string };
    } = {
      hasIntel: existsSync(intelPath),
      hasClaude: existsSync(claudeMdPath),
    };

    if (result.hasIntel) {
      try {
        const content = readFileSync(intelPath, "utf-8");
        result.intel = content;
        // Parse quick summary
        const stackMatch = content.match(/## Stack\n([\s\S]*?)(?=\n## )/);
        const commandsMatch = content.match(/## Build\/Test\/Lint Commands\n([\s\S]*?)(?=\n## )/);
        const dateMatch = content.match(/Last updated[:\s]*(\d{4}-\d{2}-\d{2})/);
        result.summary = {
          stack: stackMatch?.[1]?.trim().slice(0, 500),
          commands: commandsMatch?.[1]?.match(/- .+/g)?.slice(0, 10)?.map(c => c.replace(/^- /, "")) || [],
          lastUpdated: dateMatch?.[1],
        };
      } catch {}
    }

    if (result.hasClaude) {
      try { result.claudeMd = readFileSync(claudeMdPath, "utf-8").slice(0, 2000); } catch {}
    }

    return result;
  })

  .post("/api/projects/init", ({ body, set }) => {
    const { cwd } = body as { cwd?: string };
    const targetCwd = cwd || activeProjectPath;
    const initScript = join(PROJECT_ROOT, "project-init.sh");

    if (!existsSync(initScript)) {
      set.status = 404;
      return { error: "project-init.sh not found" };
    }

    try {
      const output = execFileSync("bash", [initScript], {
        cwd: targetCwd,
        encoding: "utf-8",
        timeout: 30000,
        env: { ...process.env, HOME: HOME },
      });
      return { ok: true, output };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Init failed";
      set.status = 500;
      return { error: msg };
    }
  })

  // ============================================================
  // PROJECT TYPE DETECTION
  // ============================================================

  .get("/api/projects/type", ({ query, set }) => {
    const cwd = query.cwd as string;
    if (!cwd) {
      set.status = 400;
      return { error: "cwd is required" };
    }
    return { type: detectProjectType(cwd) };
  });

// ---------------------------------------------------------------------------
// Initialization — must be called from the main server to inject shared state
// ---------------------------------------------------------------------------

export interface ProjectsRouterDeps {
  claudeSessions: Map<string, ClaudeSession>;
  sseClients: Map<string, Set<ReadableStreamDefaultController>>;
  wireStreamJson: (
    child: ReturnType<typeof spawn>,
    session: ClaudeSession,
    sessionId: string,
  ) => void;
  persistSessions: () => void;
  devServers: Map<string, { process: ReturnType<typeof spawn>; port: number; cwd: string; status: string; output: string[]; runtime: string; containerId?: string }>;
}

export function initProjectsRouter(deps: ProjectsRouterDeps) {
  claudeSessions = deps.claudeSessions;
  sseClients = deps.sseClients;
  wireStreamJson = deps.wireStreamJson;
  persistSessions = deps.persistSessions;
  devServers = deps.devServers;
}
