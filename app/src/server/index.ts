/**
 * Express API Server — thin orchestrator that mounts route modules.
 *
 * Route modules live in ./routes/ and own their own state.
 * Shared types, constants, and utilities live in ./lib/shared.ts.
 */
import express from "express";
import cors from "cors";
import { execFileSync } from "child_process";
import { existsSync } from "fs";
import { join, dirname } from "path";
import { PROJECT_ROOT, CLAUDE_DIR, getLLMKeys } from "./lib/shared";

// --- Route modules ---
import claudeRoutes, {
  initClaude,
  claudeSessions,
  sseClients,
  persistSessions,
  wireStreamJson,
  cleanup as cleanupClaude,
  heartbeat as claudeHeartbeat,
} from "./routes/claude";
import dashboardRoutes from "./routes/dashboard";
import settingsRoutes from "./routes/settings";
import projectsRoutes, {
  activeProjectPath,
  setActiveProject,
  userProjects,
  initProjectsRouter,
} from "./routes/projects";
import templatesRoutes, { initTemplatesRouter } from "./routes/templates";
import devServerRoutes, {
  devServers,
  getDefaultContainerRuntime,
  getDevServerCount,
  cleanup as cleanupDevServers,
} from "./routes/dev-server";
import integrationsRoutes, { initIntegrationsContext } from "./routes/integrations";
import llmRoutes from "./routes/llm";
import suggestionsRoutes, { initSuggestions } from "./routes/suggestions";
import opsRoutes, { initOps, cleanup as cleanupOps } from "./routes/ops";

// --- App setup ---
const app = express();
const PORT = 3201;

// Security headers
app.use((_req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3200",
      "http://127.0.0.1:5173",
      "http://127.0.0.1:3200",
    ],
    maxAge: 86400,
  })
);
app.use(express.json({ limit: "100kb" }));

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
if (distPath) {
  console.log(`Serving static files from: ${distPath}`);
  app.use(express.static(distPath));
}

// --- Wire up module dependencies ---
initClaude({ getActiveProject: () => activeProjectPath });
initProjectsRouter({ claudeSessions, sseClients, wireStreamJson, persistSessions, devServers });
initTemplatesRouter({ claudeSessions, sseClients, wireStreamJson, persistSessions });
initIntegrationsContext({
  getActiveProject: () => activeProjectPath,
  setActiveProject,
  getUserProjects: () => userProjects,
});
initSuggestions(claudeSessions, () => activeProjectPath);
initOps(() => activeProjectPath);

// --- Mount routes ---
app.use(claudeRoutes);
app.use(dashboardRoutes);
app.use(settingsRoutes);
app.use(projectsRoutes);
app.use(templatesRoutes);
app.use(devServerRoutes);
app.use(integrationsRoutes);
app.use(llmRoutes);
app.use(suggestionsRoutes);
app.use(opsRoutes);

// --- Health endpoints ---
app.post("/api/browser/open-external", (req, res) => {
  const { url } = req.body;
  if (!url || typeof url !== "string") return res.status(400).json({ error: "url required" });
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
      return res.status(400).json({ error: "Only HTTP/HTTPS URLs" });
    }
    execFileSync("open", [url], { timeout: 5000 });
    res.json({ ok: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to open URL";
    res.status(500).json({ error: msg });
  }
});

app.get("/api/health", async (_req, res) => {
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

  res.json({
    status: "ok",
    version: "3.1.0",
    port: PORT,
    defaultRuntime: defaultContainerRuntime || "native",
    devServers: getDevServerCount(),
    bridgedCredentials,
    memory: { workerHealthy: memoryWorkerHealthy, port: 37777 },
    projectRoot: PROJECT_ROOT,
    claudeDir: CLAUDE_DIR,
  });
});

// --- SPA fallback ---
if (distPath) {
  app.get("*", (_req, res) => {
    res.sendFile(join(distPath, "index.html"));
  });
}

// --- Centralized error handler ---
app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("Unhandled route error:", err);
  if (!res.headersSent) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// --- Start server ---
app.listen(PORT, "127.0.0.1", () => {
  console.log(`API server running on http://127.0.0.1:${PORT}`);
});

// --- Graceful shutdown ---
function cleanupAll() {
  console.log("Cleaning up child processes...");
  cleanupClaude();
  cleanupDevServers();
  cleanupOps();
}

process.on("SIGTERM", () => { cleanupAll(); process.exit(0); });
process.on("SIGINT", () => { cleanupAll(); process.exit(0); });
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled promise rejection:", reason);
});

// --- SSE heartbeat: detect dead clients every 30s ---
setInterval(claudeHeartbeat, 30_000);

export { app };
