/**
 * Elysia API Server — thin orchestrator that mounts route plugins.
 *
 * Route modules live in ./routes/ and own their own state.
 * Shared types, constants, and utilities live in ./lib/shared.ts.
 *
 * Migration from Express: Elysia is Bun-native (~18x faster), supports
 * SSE via generator functions, and WebSocket natively.
 */
import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { existsSync } from "fs";
import { join, dirname } from "path";
import { PROJECT_ROOT, CLAUDE_DIR, getLLMKeys } from "./lib/shared";
import { dbStats, DB_PATH } from "./lib/database";
import { logError, logFatal } from "./lib/logger";

// --- Route plugins ---
import { claudeRoutes, initClaude, claudeSessions, sseClients, persistSessions, wireStreamJson, heartbeat as claudeHeartbeat } from "./routes/claude";
import { dashboardRoutes } from "./routes/dashboard";
import { settingsRoutes } from "./routes/settings";
import { projectsRoutes, getActiveProjectPath, setActiveProject, getUserProjects, initProjectsRouter } from "./routes/projects";
import { templatesRoutes, initTemplatesRouter } from "./routes/templates";
import { devServerRoutes, devServers, getDefaultContainerRuntime, getDevServerCount } from "./routes/dev-server";
import { integrationsRoutes, initIntegrationsContext } from "./routes/integrations";
import { llmRoutes } from "./routes/llm";
import { suggestionsRoutes, initSuggestions } from "./routes/suggestions";
import { opsRoutes, initOps } from "./routes/ops";
import { cleanupAll } from "./lib/cleanup";

const PORT = 3201;

// --- Static files ---
function findDistDir(): string | null {
  const scriptDir = dirname(new URL(import.meta.url).pathname);
  const candidates = [
    join(scriptDir, "../views/ui"),
    join(scriptDir, "../../views/ui"),
    join(PROJECT_ROOT, "app/build/views/ui"),
    join(scriptDir, "../../dist"),
    join(PROJECT_ROOT, "app/dist"),
    join(PROJECT_ROOT, "dist"),
    join(scriptDir, "../dist"),
    join(scriptDir, "dist"),
  ];
  for (const p of candidates) {
    if (existsSync(join(p, "index.html"))) return p;
  }
  return null;
}

const distPath = findDistDir();

// --- Wire up module dependencies ---
initClaude({ getActiveProject: () => getActiveProjectPath() });
initProjectsRouter({ claudeSessions, sseClients, wireStreamJson, persistSessions, devServers });
initTemplatesRouter({ claudeSessions, sseClients, wireStreamJson, persistSessions });
initIntegrationsContext({
  getActiveProject: () => getActiveProjectPath(),
  setActiveProject,
  getUserProjects: () => getUserProjects(),
});
initSuggestions(claudeSessions, () => getActiveProjectPath());
initOps(() => getActiveProjectPath());

// --- App setup ---
const app = new Elysia()
  // Security headers
  .onBeforeHandle(({ set }) => {
    set.headers["X-Content-Type-Options"] = "nosniff";
    set.headers["X-Frame-Options"] = "DENY";
    set.headers["X-XSS-Protection"] = "1; mode=block";
    set.headers["Referrer-Policy"] = "strict-origin-when-cross-origin";
  })
  // CORS
  .use(cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3200",
      "http://127.0.0.1:5173",
      "http://127.0.0.1:3200",
    ],
    maxAge: 86400,
  }))
  // Route plugins
  .use(claudeRoutes)
  .use(dashboardRoutes)
  .use(settingsRoutes)
  .use(projectsRoutes)
  .use(templatesRoutes)
  .use(devServerRoutes)
  .use(integrationsRoutes)
  .use(llmRoutes)
  .use(suggestionsRoutes)
  .use(opsRoutes)
  // Open external URL (macOS)
  .post("/api/browser/open-external", ({ body, set }) => {
    const { url } = body as { url?: string };
    if (!url || typeof url !== "string") {
      set.status = 400;
      return { error: "url required" };
    }
    try {
      const parsed = new URL(url);
      if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
        set.status = 400;
        return { error: "Only HTTP/HTTPS URLs" };
      }
      Bun.spawnSync(["open", url]);
      return { ok: true };
    } catch (err: unknown) {
      set.status = 500;
      return { error: err instanceof Error ? err.message : "Failed to open URL" };
    }
  })
  // Database stats
  .get("/api/db/stats", () => {
    return { ...dbStats(), path: DB_PATH };
  })
  // Health endpoint
  .get("/api/health", async () => {
    const defaultContainerRuntime = getDefaultContainerRuntime();
    const llmKeys = getLLMKeys();
    const bridgedCredentials: string[] = [];
    if (llmKeys.anthropicApiKey) bridgedCredentials.push("ANTHROPIC_API_KEY");
    if (llmKeys.bedrockApiKey) bridgedCredentials.push("CLAUDE_CODE_USE_BEDROCK");
    if (llmKeys.openaiApiKey) bridgedCredentials.push("OPENAI_API_KEY");
    if (llmKeys.googleApiKey) bridgedCredentials.push("GOOGLE_GENERATIVE_AI_API_KEY");
    if (llmKeys.groqApiKey) bridgedCredentials.push("GROQ_API_KEY");
    if (llmKeys.openRouterApiKey) bridgedCredentials.push("OPENROUTER_API_KEY");

    let memoryWorkerHealthy = false;
    try {
      const r = await fetch("http://localhost:37777/api/health", { signal: AbortSignal.timeout(1000) });
      memoryWorkerHealthy = r.ok;
    } catch {}

    return {
      status: "ok",
      version: "3.2.0",
      port: PORT,
      defaultRuntime: defaultContainerRuntime || "native",
      devServers: getDevServerCount(),
      bridgedCredentials,
      memory: { workerHealthy: memoryWorkerHealthy, port: 37777 },
      projectRoot: PROJECT_ROOT,
      claudeDir: CLAUDE_DIR,
    };
  })
  // Static files + SPA fallback — serve built React app
  // Must use Bun.file() for correct MIME types (Elysia staticPlugin conflicts with wildcard)
  .get("/*", ({ path, set }) => {
    if (!distPath) {
      set.status = 404;
      return { error: "Not found" };
    }
    // Try to serve the exact file first (assets, CSS, JS, images)
    const filePath = join(distPath, path);
    if (path !== "/" && existsSync(filePath) && !filePath.includes("..")) {
      return Bun.file(filePath);
    }
    // SPA fallback — serve index.html for all non-file routes
    const indexPath = join(distPath, "index.html");
    if (existsSync(indexPath)) {
      return Bun.file(indexPath);
    }
    set.status = 404;
    return { error: "Not found" };
  })
  // Global error handler
  .onError(({ error, set, request }) => {
    const path = new URL(request.url).pathname;
    logError(`${request.method} ${path}`, error);
    set.status = 500;
    return { error: "Internal server error" };
  })
  .listen({ port: PORT, hostname: "127.0.0.1" });

console.log(`API server running on http://127.0.0.1:${PORT}`);

// --- Graceful shutdown ---
process.on("SIGTERM", () => { cleanupAll(); process.exit(0); });
process.on("SIGINT", () => { cleanupAll(); process.exit(0); });
process.on("unhandledRejection", (reason) => {
  logError("unhandledRejection", reason);
});
process.on("uncaughtException", (err) => {
  logFatal("uncaughtException", err);
  cleanupAll();
  process.exit(1);
});

// --- SSE heartbeat: detect dead clients every 30s ---
setInterval(claudeHeartbeat, 30_000);

export { app };
