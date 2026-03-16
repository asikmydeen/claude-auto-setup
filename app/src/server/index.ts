import express from "express";
import cors from "cors";
import { randomUUID } from "crypto";
import {
  readFileSync,
  writeFileSync,
  readdirSync,
  existsSync,
  mkdirSync,
} from "fs";
import { join, dirname, resolve } from "path";
import { execFileSync, spawn } from "child_process";
import { homedir } from "os";
import { streamText, generateText } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createOpenAI } from "@ai-sdk/openai";
import { createAmazonBedrock } from "@ai-sdk/amazon-bedrock";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createMistral } from "@ai-sdk/mistral";
import { createXai } from "@ai-sdk/xai";
import { createGroq } from "@ai-sdk/groq";
import { createDeepSeek } from "@ai-sdk/deepseek";
import { createCohere } from "@ai-sdk/cohere";
import { createTogetherAI } from "@ai-sdk/togetherai";

const app = express();
const PORT = 3201;
const HOME = homedir();
const CLAUDE_DIR = join(HOME, ".claude");
const AGENTS_DIR = join(CLAUDE_DIR, "agents");
const SCRATCH_DIR = join(CLAUDE_DIR, "scratch");
const SETTINGS_PATH = join(CLAUDE_DIR, "settings.json");
const INTEGRATIONS_PATH = join(CLAUDE_DIR, "integrations.json");
const TMP_IMAGES_DIR = join(CLAUDE_DIR, "tmp-images");

// --- Integrations storage (secure, local-only) ---
interface IntegrationsConfig {
  github?: { pat: string; username?: string; connectedAt?: string };
  supabase?: {
    accessToken: string;
    url: string;
    anonKey: string;
    serviceRoleKey?: string;
    projectRef?: string;
    projectName?: string;
    orgName?: string;
    connectedAt?: string;
  };
  aws?: { activeProfile?: string; adaAccount?: string; adaRole?: string };
}

function loadIntegrations(): IntegrationsConfig {
  try {
    if (existsSync(INTEGRATIONS_PATH)) return JSON.parse(readFileSync(INTEGRATIONS_PATH, "utf-8"));
  } catch {}
  return {};
}

function saveIntegrations(config: IntegrationsConfig): void {
  writeFileSync(INTEGRATIONS_PATH, JSON.stringify(config, null, 2), { mode: 0o600 });
}

/** Write a .env file with connected integration credentials for a new project.
 *  Returns context string to include in the Claude prompt so it knows what's available. */
function writeProjectDotEnv(projectDir: string): string {
  const config = loadIntegrations();
  const lines: string[] = [];
  const promptParts: string[] = [];

  // Supabase
  if (config.supabase?.url && config.supabase?.anonKey) {
    // Standard names
    lines.push(`SUPABASE_URL=${config.supabase.url}`);
    lines.push(`SUPABASE_ANON_KEY=${config.supabase.anonKey}`);
    // React (CRA) convention
    lines.push(`REACT_APP_SUPABASE_URL=${config.supabase.url}`);
    lines.push(`REACT_APP_SUPABASE_ANON_KEY=${config.supabase.anonKey}`);
    // Vite convention
    lines.push(`VITE_SUPABASE_URL=${config.supabase.url}`);
    lines.push(`VITE_SUPABASE_ANON_KEY=${config.supabase.anonKey}`);
    // Next.js convention
    lines.push(`NEXT_PUBLIC_SUPABASE_URL=${config.supabase.url}`);
    lines.push(`NEXT_PUBLIC_SUPABASE_ANON_KEY=${config.supabase.anonKey}`);

    promptParts.push(
      `SUPABASE IS ALREADY CONFIGURED. A .env file has been created with all credentials (SUPABASE_URL, SUPABASE_ANON_KEY, plus framework-specific variants like REACT_APP_*, VITE_*, NEXT_PUBLIC_*).` +
      ` The Supabase project URL is: ${config.supabase.url}` +
      (config.supabase.projectName ? ` (project: ${config.supabase.projectName})` : "") +
      `. Do NOT tell the user to add credentials to .env — it's already done.` +
      ` When building features that need a database, use @supabase/supabase-js and initialize with process.env.REACT_APP_SUPABASE_URL (or the appropriate env var for the framework).` +
      ` Also create the required Supabase tables by running the SQL via the Supabase Management API or including a setup script.`
    );
  }

  // AWS
  if (config.aws?.activeProfile) {
    lines.push(`AWS_PROFILE=${config.aws.activeProfile}`);
  }

  if (lines.length > 0) {
    const envPath = join(projectDir, ".env");
    // Merge with existing .env if present
    if (existsSync(envPath)) {
      const existing = readFileSync(envPath, "utf-8");
      const existingKeys = new Set(existing.split("\n").map(l => l.split("=")[0]).filter(Boolean));
      const newLines = lines.filter(l => !existingKeys.has(l.split("=")[0]));
      if (newLines.length > 0) {
        writeFileSync(envPath, existing.trimEnd() + "\n" + newLines.join("\n") + "\n");
      }
    } else {
      writeFileSync(envPath, lines.join("\n") + "\n");
    }
  }

  return promptParts.join("\n");
}

function maskSecret(s: string): string {
  if (s.length <= 8) return "****";
  return s.slice(0, 4) + "****" + s.slice(-4);
}

function findProjectRoot(): string {
  const candidates = [
    resolve(dirname(new URL(import.meta.url).pathname), "../../.."),
    join(HOME, "projects/claude-auto-setup"),
    join(HOME, "claude-code-setup"),
  ];
  for (const c of candidates) {
    if (existsSync(join(c, "install.sh"))) return c;
  }
  return candidates[0];
}

const PROJECT_ROOT = findProjectRoot();
const UNIVERSAL_DIR = join(PROJECT_ROOT, "universal");

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

// Serve built React app — search multiple paths for dist/ (dev vs Electrobun bundle)
function findDistDir(): string | null {
  const scriptDir = dirname(new URL(import.meta.url).pathname);
  const candidates = [
    // Electrobun bundle paths (production — check first)
    join(scriptDir, "../views/ui"),             // Electrobun bundle: app/bun/ → app/views/ui/
    join(scriptDir, "../../views/ui"),          // Electrobun bundle: alternative layout
    join(PROJECT_ROOT, "app/build/views/ui"),   // Electrobun build output
    // Dev paths
    join(scriptDir, "../../dist"),              // dev: running from src/server/
    join(PROJECT_ROOT, "app/dist"),             // from project root
    join(PROJECT_ROOT, "dist"),                 // if running inside app/
    join(scriptDir, "../dist"),                 // alternative layout
    join(scriptDir, "dist"),                    // same dir
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

// --- Sanitization ---
function sanitize(
  obj: Record<string, unknown>,
  allowed: string[]
): Record<string, unknown> {
  const clean: Record<string, unknown> = {};
  for (const key of allowed) {
    if (
      obj[key] !== undefined &&
      key !== "__proto__" &&
      key !== "constructor" &&
      key !== "prototype"
    ) {
      clean[key] =
        typeof obj[key] === "string"
          ? (obj[key] as string).slice(0, 500)
          : obj[key];
    }
  }
  return clean;
}

// ============================================================
// SESSIONS & AGENTS
// ============================================================

interface Session {
  id: string;
  startedAt: string;
  agents: AgentState[];
  project?: string;
  phase?: string;
  steeringCommands?: SteeringCommand[];
  [key: string]: unknown;
}

interface AgentState {
  id: string;
  role?: string;
  status?: string;
  task?: string;
  progress?: { done: number; total: number };
  model?: string;
  updatedAt?: string;
  [key: string]: unknown;
}

interface SteeringCommand {
  id: string;
  command: string;
  target?: string;
  message?: string;
  timestamp: string;
}

const sessions = new Map<string, Session>();
const activity: Array<Record<string, unknown>> = [];

const SESSION_FIELDS = ["id", "project", "phase", "description", "pid", "cwd"];
const AGENT_FIELDS = [
  "id",
  "role",
  "status",
  "task",
  "progress",
  "model",
  "adapter",
];
const ACTIVITY_FIELDS = ["actor", "action", "entity", "details"];
const STEERING_FIELDS = ["command", "target", "message"];

app.get("/api/sessions", (_req, res) => {
  res.json([...sessions.values()]);
});

app.get("/api/sessions/:id", (req, res) => {
  const session = sessions.get(req.params.id);
  if (!session) return res.status(404).json({ error: "Session not found" });
  res.json(session);
});

app.post("/api/sessions", (req, res) => {
  const data = sanitize(req.body, SESSION_FIELDS);
  const session: Session = {
    id: (data.id as string) || randomUUID().slice(0, 12),
    startedAt: new Date().toISOString(),
    agents: [],
    project: (data.project as string) || undefined,
    phase: (data.phase as string) || "idle",
    ...data,
  };
  sessions.set(session.id, session);
  res.status(201).json(session);
});

app.post("/api/sessions/:id/agents", (req, res) => {
  let session = sessions.get(req.params.id);
  if (!session) {
    session = {
      id: req.params.id,
      startedAt: new Date().toISOString(),
      agents: [],
      phase: "active",
    };
    sessions.set(req.params.id, session);
  }
  const agentData = {
    ...sanitize(req.body, AGENT_FIELDS),
    updatedAt: new Date().toISOString(),
  } as AgentState;
  const idx = session.agents.findIndex((a) => a.id === agentData.id);
  if (idx >= 0) {
    session.agents[idx] = agentData;
  } else {
    session.agents.push(agentData);
  }
  res.json(agentData);
});

app.post("/api/sessions/:id/steering", (req, res) => {
  const session = sessions.get(req.params.id);
  if (!session) return res.status(404).json({ error: "Session not found" });
  if (!session.steeringCommands) session.steeringCommands = [];
  session.steeringCommands.push({
    ...(sanitize(req.body, STEERING_FIELDS) as {
      command: string;
      target?: string;
      message?: string;
    }),
    id: randomUUID().slice(0, 8),
    timestamp: new Date().toISOString(),
  });
  res.json({ ok: true });
});

app.get("/api/sessions/:id/commands", (req, res) => {
  const session = sessions.get(req.params.id);
  if (!session) return res.json([]);
  const commands = session.steeringCommands || [];
  session.steeringCommands = [];
  res.json(commands);
});

// ============================================================
// ACTIVITY
// ============================================================

app.get("/api/activity", (_req, res) => {
  res.json(activity.slice().reverse());
});

app.post("/api/activity", (req, res) => {
  const entry = {
    id: randomUUID().slice(0, 12),
    timestamp: new Date().toISOString(),
    ...sanitize(req.body, ACTIVITY_FIELDS),
  };
  activity.push(entry);
  if (activity.length > 1000) activity.splice(0, activity.length - 1000);
  res.status(201).json(entry);
});

// ============================================================
// SKILLS (commands from universal/commands/*.md)
// ============================================================

function parseFrontmatter(content: string): Record<string, unknown> {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fm: Record<string, unknown> = {};
  for (const line of match[1].split("\n")) {
    const [key, ...rest] = line.split(":");
    if (key && rest.length) {
      let val: unknown = rest.join(":").trim();
      if (
        typeof val === "string" &&
        val.startsWith("[") &&
        val.endsWith("]")
      ) {
        val = val
          .slice(1, -1)
          .split(",")
          .map((s: string) => s.trim().replace(/^["']|["']$/g, ""));
      }
      fm[key.trim()] = val;
    }
  }
  return fm;
}

app.get("/api/skills", (_req, res) => {
  const commandsDir = join(UNIVERSAL_DIR, "commands");
  if (!existsSync(commandsDir)) return res.json([]);

  const skills: Array<Record<string, unknown>> = [];
  for (const file of readdirSync(commandsDir)) {
    if (!file.endsWith(".md")) continue;
    try {
      const content = readFileSync(join(commandsDir, file), "utf-8");
      const fm = parseFrontmatter(content);
      skills.push({
        name: fm.name || file.replace(".md", ""),
        description: fm.description || "",
        category: fm.category || "general",
        complexity: fm.complexity || "medium",
        triggers: fm.triggers || [file.replace(".md", "")],
        filename: file,
      });
    } catch {
      skills.push({
        name: file.replace(".md", ""),
        description: "",
        category: "general",
        complexity: "medium",
        triggers: [file.replace(".md", "")],
        filename: file,
      });
    }
  }
  res.json(skills);
});

// ============================================================
// IMAGE UPLOAD (for attaching images to Claude sessions)
// ============================================================

app.post("/api/images/upload", express.json({ limit: "50mb" }), (req, res) => {
  const { images } = req.body;
  if (!images || !Array.isArray(images) || images.length === 0) {
    return res.status(400).json({ error: "No images provided" });
  }
  if (images.length > 10) {
    return res.status(400).json({ error: "Maximum 10 images per upload" });
  }

  mkdirSync(TMP_IMAGES_DIR, { recursive: true });

  const paths: string[] = [];
  for (const img of images) {
    if (!img.name || !img.data) continue;
    const ext = (img.name as string).split(".").pop()?.toLowerCase() || "png";
    if (!["png", "jpg", "jpeg", "gif", "webp"].includes(ext)) continue;
    const filePath = join(TMP_IMAGES_DIR, `${randomUUID()}.${ext}`);
    writeFileSync(filePath, Buffer.from(img.data as string, "base64"));
    paths.push(filePath);
  }

  res.json({ paths });
});

// ============================================================
// SETTINGS (read/write ~/.claude/settings.json)
// ============================================================

app.get("/api/settings", (_req, res) => {
  try {
    if (!existsSync(SETTINGS_PATH)) return res.json({});
    const raw = readFileSync(SETTINGS_PATH, "utf-8");
    res.json(JSON.parse(raw));
  } catch {
    res.status(500).json({ error: "Failed to read settings" });
  }
});

app.put("/api/settings", (req, res) => {
  try {
    const current = existsSync(SETTINGS_PATH)
      ? JSON.parse(readFileSync(SETTINGS_PATH, "utf-8"))
      : {};
    const updated = { ...current, ...req.body };
    writeFileSync(SETTINGS_PATH, JSON.stringify(updated, null, 2) + "\n");
    res.json({ ok: true, settings: updated });
  } catch {
    res.status(500).json({ error: "Failed to save settings" });
  }
});

// ============================================================
// AGENT CONFIGS (read/write ~/.claude/agents/*.md)
// ============================================================

function parseAgentMd(filepath: string) {
  const raw = readFileSync(filepath, "utf-8");
  const fm = parseFrontmatter(raw);
  const bodyMatch = raw.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/);
  return {
    name: (fm.name as string) || "",
    filename: filepath.split("/").pop() || "",
    model: fm.model as string | undefined,
    tools: fm.tools as string | undefined,
    memory: fm.memory as string | undefined,
    background: fm.background as string | undefined,
    maxTurns: (fm.maxTurns || fm["max-turns"]) as string | undefined,
    description: fm.description as string | undefined,
    content: bodyMatch ? bodyMatch[1].trim() : raw,
  };
}

app.get("/api/agents/configs", (_req, res) => {
  try {
    if (!existsSync(AGENTS_DIR)) return res.json([]);
    const agents = readdirSync(AGENTS_DIR)
      .filter((f) => f.endsWith(".md"))
      .map((f) => parseAgentMd(join(AGENTS_DIR, f)));
    res.json(agents);
  } catch {
    res.status(500).json({ error: "Failed to read agent configs" });
  }
});

app.put("/api/agents/configs/:name", (req, res) => {
  try {
    // Sanitize filename to prevent path traversal
    const rawName = req.params.name.replace(/[^a-zA-Z0-9_-]/g, "");
    if (!rawName) return res.status(400).json({ error: "Invalid agent name" });
    const filename = `${rawName}.md`;
    const filepath = join(AGENTS_DIR, filename);
    // Double-check resolved path is within AGENTS_DIR
    if (!filepath.startsWith(AGENTS_DIR)) {
      return res.status(400).json({ error: "Invalid path" });
    }
    const { model, tools, memory, background, maxTurns, description, content } =
      req.body;

    const fmLines = ["---"];
    if (req.body.name) fmLines.push(`name: ${req.body.name}`);
    if (description) fmLines.push(`description: ${description}`);
    if (tools) fmLines.push(`tools: ${tools}`);
    if (model) fmLines.push(`model: ${model}`);
    if (background) fmLines.push(`background: ${background}`);
    if (memory) fmLines.push(`memory: ${memory}`);
    if (maxTurns) fmLines.push(`maxTurns: ${maxTurns}`);
    fmLines.push("---");

    const fullContent = fmLines.join("\n") + "\n\n" + (content || "");
    if (!existsSync(AGENTS_DIR)) mkdirSync(AGENTS_DIR, { recursive: true });
    writeFileSync(filepath, fullContent);
    res.json({ ok: true });
  } catch {
    res.status(500).json({ error: "Failed to save agent config" });
  }
});

// ============================================================
// PROVIDERS (detect installed + read providers.json)
// ============================================================

app.get("/api/providers", (_req, res) => {
  const providersPath = join(UNIVERSAL_DIR, "providers.json");
  try {
    const config = existsSync(providersPath)
      ? JSON.parse(readFileSync(providersPath, "utf-8"))
      : { providers: {}, task_routing: {} };

    const installed: Record<string, { path: string; version: string }> = {};
    const cliNames: Record<string, string> = {
      claude: "claude",
      codex: "codex",
      gemini: "gemini",
      amp: "amp",
      kiro: "kiro-cli",
    };

    for (const [name, cli] of Object.entries(cliNames)) {
      try {
        const path = execFileSync("which", [cli], {
          encoding: "utf-8",
        }).trim();
        let version = "";
        try {
          version = execFileSync(cli, ["--version"], {
            encoding: "utf-8",
            timeout: 5000,
          }).trim();
        } catch {}
        if (path) installed[name] = { path, version };
      } catch {}
    }

    res.json({ config, installed });
  } catch {
    res.status(500).json({ error: "Failed to read providers" });
  }
});

// ============================================================
// RULES (read universal/rules/*.md)
// ============================================================

app.get("/api/rules", (_req, res) => {
  const rulesDir = join(UNIVERSAL_DIR, "rules");
  if (!existsSync(rulesDir)) return res.json([]);

  try {
    const rules = readdirSync(rulesDir)
      .filter((f) => f.endsWith(".md"))
      .map((f) => {
        const content = readFileSync(join(rulesDir, f), "utf-8");
        const firstLine =
          content
            .split("\n")
            .find((l) => l.startsWith("# "))
            ?.replace("# ", "") || f.replace(".md", "");
        return {
          filename: f,
          name: f.replace(".md", ""),
          title: firstLine,
          lines: content.split("\n").length,
          preview: content.slice(0, 500),
        };
      });
    res.json(rules);
  } catch {
    res.status(500).json({ error: "Failed to read rules" });
  }
});

app.get("/api/rules/:name", (req, res) => {
  const rulesDir = join(UNIVERSAL_DIR, "rules");
  // Sanitize to prevent path traversal
  const rawName = req.params.name.replace(/[^a-zA-Z0-9_-]/g, "");
  if (!rawName) return res.status(400).json({ error: "Invalid rule name" });
  const filename = `${rawName}.md`;
  const filepath = join(rulesDir, filename);
  if (!filepath.startsWith(rulesDir) || !existsSync(filepath))
    return res.status(404).json({ error: "Rule not found" });
  try {
    res.json({ content: readFileSync(filepath, "utf-8") });
  } catch {
    res.status(500).json({ error: "Failed to read rule" });
  }
});

// ============================================================
// ENFORCEMENT STATE
// ============================================================

app.get("/api/enforcement", (_req, res) => {
  const statePath = join(SCRATCH_DIR, "enforce-state.json");
  try {
    if (!existsSync(statePath)) return res.json({ active: false });
    const raw = readFileSync(statePath, "utf-8");
    const state = JSON.parse(raw);
    // Normalize files_changed: array on disk → count for UI
    if (Array.isArray(state.files_changed)) {
      state.files_changed = state.files_changed.length;
    }
    res.json({ active: true, ...state });
  } catch {
    res.json({ active: false });
  }
});

// ============================================================
// CLAUDE INTERACTION (chat-like with SSE streaming)
// ============================================================

interface ClaudeMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

// Parse stream-json lines and emit rich SSE events
interface StreamEvent {
  type: "text" | "tool_use" | "tool_result" | "agent_start" | "agent_output" | "agent_done" | "result";
  content?: string;
  sessionId?: string;
  tool?: string;
  toolUseId?: string;
  agentName?: string;
  agentPrompt?: string;
  input?: string;
  resultText?: string;
}

function parseStreamJsonLine(line: string): StreamEvent[] {
  try {
    const obj = JSON.parse(line);
    const events: StreamEvent[] = [];
    const sid = obj.session_id;

    // Assistant message — may contain text AND tool_use blocks
    if (obj.type === "assistant" && obj.message?.content) {
      for (const block of obj.message.content) {
        if (block.type === "text" && block.text) {
          events.push({ type: "text", content: block.text, sessionId: sid });
        }
        if (block.type === "tool_use") {
          const isAgent = block.name === "Agent";
          if (isAgent) {
            events.push({
              type: "agent_start",
              toolUseId: block.id,
              agentName: block.input?.subagent_type || block.input?.name || "agent",
              agentPrompt: typeof block.input?.prompt === "string"
                ? block.input.prompt.slice(0, 500)
                : JSON.stringify(block.input).slice(0, 300),
              sessionId: sid,
            });
          } else {
            events.push({
              type: "tool_use",
              tool: block.name,
              toolUseId: block.id,
              input: typeof block.input === "string"
                ? block.input.slice(0, 500)
                : JSON.stringify(block.input).slice(0, 500),
              sessionId: sid,
            });
          }
        }
      }
    }

    // Tool result (user message with tool_result)
    if (obj.type === "user" && obj.message?.content) {
      for (const block of obj.message.content) {
        if (block.type === "tool_result") {
          const content = typeof block.content === "string"
            ? block.content.slice(0, 2000)
            : JSON.stringify(block.content).slice(0, 2000);
          events.push({
            type: "tool_result",
            toolUseId: block.tool_use_id,
            content,
            sessionId: sid,
          });
        }
      }
    }

    // Final result
    if (obj.type === "result") {
      events.push({ type: "result", resultText: obj.result, sessionId: sid });
    }

    return events;
  } catch {
    return [];
  }
}

// Send an SSE event to all connected clients for a session
function broadcastSSE(sessionId: string, event: Record<string, unknown>) {
  const clients = sseClients.get(sessionId);
  if (!clients) return;
  const data = JSON.stringify(event);
  for (const client of clients) {
    client.write(`data: ${data}\n\n`);
  }
}

// Wire up stream-json stdout parsing for a Claude child process
function wireStreamJson(
  child: ReturnType<typeof spawn>,
  session: ClaudeSession,
  sessionId: string,
) {
  let lineBuffer = "";

  child.stdout?.on("data", (data: Buffer) => {
    lineBuffer += data.toString();
    const lines = lineBuffer.split("\n");
    lineBuffer = lines.pop() || "";

    for (const line of lines) {
      if (!line.trim()) continue;
      const events = parseStreamJsonLine(line);

      for (const evt of events) {
        if (evt.sessionId && !session.claudeSessionId) {
          session.claudeSessionId = evt.sessionId;
        }

        if (evt.type === "text" && evt.content) {
          // Cap output buffer at 50,000 chunks to prevent memory leaks on long sessions
          if (session.output.length < 50_000) session.output.push(evt.content);
          broadcastSSE(sessionId, { type: "chunk", content: evt.content });
        } else if (evt.type === "tool_use") {
          broadcastSSE(sessionId, {
            type: "tool_use",
            tool: evt.tool,
            toolUseId: evt.toolUseId,
            input: evt.input,
          });
        } else if (evt.type === "tool_result") {
          broadcastSSE(sessionId, {
            type: "tool_result",
            toolUseId: evt.toolUseId,
            content: evt.content,
          });
        } else if (evt.type === "agent_start") {
          broadcastSSE(sessionId, {
            type: "agent_start",
            toolUseId: evt.toolUseId,
            agentName: evt.agentName,
            agentPrompt: evt.agentPrompt,
          });
        }
      }
    }
  });

  // Stderr — only forward real errors
  child.stderr?.on("data", (data: Buffer) => {
    const chunk = data.toString();
    if (chunk.includes("Error") || chunk.includes("error")) {
      if (session.output.length < 50_000) session.output.push(chunk);
      broadcastSSE(sessionId, { type: "chunk", content: chunk });
    }
  });
}

interface ClaudeSession {
  id: string;
  prompt: string;
  status: "running" | "done" | "error" | "stopped";
  messages: ClaudeMessage[];
  output: string[];
  exitCode: number | null;
  startedAt: string;
  endedAt?: string;
  pid?: number;
  claudeSessionId?: string;
  filesChanged?: string[];
  cwd: string;
  process?: ReturnType<typeof spawn>;
}

const claudeSessions = new Map<string, ClaudeSession>();
const sseClients = new Map<string, Set<express.Response>>();

// Session persistence — save completed sessions to disk
const SESSIONS_FILE = join(SCRATCH_DIR, "sessions.json");

function persistSessions() {
  try {
    if (!existsSync(SCRATCH_DIR)) mkdirSync(SCRATCH_DIR, { recursive: true });
    const toSave = [...claudeSessions.values()]
      .map(({ process, ...s }) => ({
        ...s,
        // If still running at persist time, mark as interrupted
        status: s.status === "running" ? "error" as const : s.status,
      }))
      .slice(-100); // Keep last 100 sessions
    writeFileSync(SESSIONS_FILE, JSON.stringify(toSave), { mode: 0o600 });
  } catch {}
}

// Auto-persist every 30 seconds so sessions survive crashes
setInterval(persistSessions, 30_000);

function loadPersistedSessions() {
  try {
    if (existsSync(SESSIONS_FILE)) {
      const data = JSON.parse(readFileSync(SESSIONS_FILE, "utf-8")) as ClaudeSession[];
      for (const s of data) {
        if (!claudeSessions.has(s.id)) claudeSessions.set(s.id, s);
      }
    }
  } catch {}
}

// Load persisted sessions on startup
loadPersistedSessions();

function detectFileChanges(cwd: string): string[] {
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
      { cwd, encoding: "utf-8", timeout: 5000 }
    ).trim();
    return [
      ...new Set(
        [
          ...staged.split("\n"),
          ...unstaged.split("\n"),
          ...untracked.split("\n"),
        ].filter(Boolean)
      ),
    ];
  } catch {
    return [];
  }
}

// List all sessions
app.get("/api/claude/sessions", (_req, res) => {
  const list = [...claudeSessions.values()].map(({ process, ...s }) => s);
  res.json(list.reverse());
});

// Get single session
app.get("/api/claude/sessions/:id", (req, res) => {
  const session = claudeSessions.get(req.params.id);
  if (!session) return res.status(404).json({ error: "Session not found" });
  const { process, ...safe } = session;
  res.json(safe);
});

// Launch new session
app.post("/api/claude/sessions", (req, res) => {
  const { prompt, cwd, imagePaths } = req.body;
  if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const claudePath = execFileSync("which", ["claude"], {
      encoding: "utf-8",
    }).trim();
    if (!claudePath) return res.status(404).json({ error: "Claude CLI not found" });

    const id = randomUUID().slice(0, 12);
    const args = ["-p", prompt.trim(), "--output-format", "stream-json", "--verbose", "--dangerously-skip-permissions"];

    // Attach images if provided
    if (Array.isArray(imagePaths)) {
      for (const imgPath of imagePaths) {
        if (typeof imgPath === "string" && existsSync(imgPath)) {
          args.push("--image", imgPath);
        }
      }
    }
    const sessionCwd = cwd || activeProject;
    const env = buildProjectEnv(sessionCwd);

    const child = spawn(claudePath, args, {
      env,
      cwd: sessionCwd,
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
      cwd: sessionCwd,
      process: child,
    };

    claudeSessions.set(id, session);
    wireStreamJson(child, session, id);
    persistSessions(); // Persist immediately so session survives crash

    // On close
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

      // Detect file changes after successful completion
      if (code === 0) {
        session.filesChanged = detectFileChanges(session.cwd);
      }

      // Notify SSE clients of completion
      const clients = sseClients.get(id);
      if (clients) {
        for (const client of clients) {
          client.write(`data: ${JSON.stringify({ type: "done", exitCode: code, filesChanged: session.filesChanged })}\n\n`);
          client.end();
        }
        sseClients.delete(id);
      }

      // Persist to disk
      persistSessions();

      // Clean up from memory after 1 hour (stays on disk)
      // Keep in memory for 2h, persist handles disk storage
      setTimeout(() => { persistSessions(); claudeSessions.delete(id); }, 7200000);
    });

    const { process: _, ...safe } = session;
    res.status(201).json(safe);
  } catch {
    res.status(500).json({ error: "Failed to launch Claude" });
  }
});

// SSE stream for a session
app.get("/api/claude/stream/:id", (req, res) => {
  const session = claudeSessions.get(req.params.id);
  if (!session) return res.status(404).json({ error: "Session not found" });

  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "X-Accel-Buffering": "no",
  });

  // Send existing output first
  if (session.output.length > 0) {
    res.write(`data: ${JSON.stringify({ type: "replay", content: session.output.join("") })}\n\n`);
  }

  // If already done, send done event immediately
  if (session.status !== "running") {
    res.write(`data: ${JSON.stringify({ type: "done", exitCode: session.exitCode })}\n\n`);
    res.end();
    return;
  }

  // Register SSE client
  if (!sseClients.has(req.params.id)) {
    sseClients.set(req.params.id, new Set());
  }
  sseClients.get(req.params.id)!.add(res);

  // Clean up on disconnect
  req.on("close", () => {
    sseClients.get(req.params.id)?.delete(res);
  });
});

// Stop a running session
app.post("/api/claude/stop/:id", (req, res) => {
  const session = claudeSessions.get(req.params.id);
  if (!session) return res.status(404).json({ error: "Session not found" });
  if (session.process) {
    session.process.kill("SIGTERM");
    session.status = "stopped";
  }
  res.json({ ok: true });
});

// Delete a session
app.delete("/api/claude/sessions/:id", (req, res) => {
  const session = claudeSessions.get(req.params.id);
  if (session?.process) session.process.kill("SIGTERM");
  claudeSessions.delete(req.params.id);
  res.json({ ok: true });
});

// Send follow-up message to an existing session using --continue
app.post("/api/claude/sessions/:id/message", (req, res) => {
  const session = claudeSessions.get(req.params.id);
  if (!session) return res.status(404).json({ error: "Session not found" });
  if (session.status === "running") {
    return res.status(409).json({ error: "Session is still running" });
  }

  const { prompt, imagePaths } = req.body;
  if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const claudePath = execFileSync("which", ["claude"], {
      encoding: "utf-8",
    }).trim();
    if (!claudePath) return res.status(404).json({ error: "Claude CLI not found" });

    const args = ["-p", prompt.trim(), "--output-format", "stream-json", "--verbose", "--dangerously-skip-permissions", "--continue"];

    // Attach images if provided
    if (Array.isArray(imagePaths)) {
      for (const imgPath of imagePaths) {
        if (typeof imgPath === "string" && existsSync(imgPath)) {
          args.push("--image", imgPath);
        }
      }
    }

    const env = buildProjectEnv(session.cwd);

    const child = spawn(claudePath, args, {
      env,
      cwd: session.cwd,
      stdio: ["ignore", "pipe", "pipe"],
    });

    // Add user message
    session.messages.push({
      role: "user",
      content: prompt.trim(),
      timestamp: new Date().toISOString(),
    });

    // Reset output buffer for this turn
    session.output = [];
    session.status = "running";
    session.pid = child.pid;
    session.exitCode = null;
    session.endedAt = undefined;
    session.process = child;

    wireStreamJson(child, session, session.id);

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

      // Detect file changes after successful completion
      if (code === 0) {
        session.filesChanged = detectFileChanges(session.cwd);
      }

      const clients = sseClients.get(session.id);
      if (clients) {
        for (const client of clients) {
          client.write(`data: ${JSON.stringify({ type: "done", exitCode: code, filesChanged: session.filesChanged })}\n\n`);
          client.end();
        }
        sseClients.delete(session.id);
      }
      persistSessions();
    });

    const { process: _, ...safe } = session;
    res.json(safe);
  } catch {
    res.status(500).json({ error: "Failed to send follow-up" });
  }
});

// ============================================================
// FILE CHANGES (git diff in PROJECT_ROOT)
// ============================================================

app.get("/api/files/changes", (_req, res) => {
  try {
    const files = detectFileChanges(PROJECT_ROOT);
    res.json({ files, cwd: PROJECT_ROOT });
  } catch {
    res.json({ files: [], cwd: PROJECT_ROOT });
  }
});

// ============================================================
// PROJECT MANAGEMENT
// ============================================================

// In-memory storage for user's project list
const userProjects: Array<{ path: string; name: string; addedAt: string }> = [];

// Auto-discover from ~/.claude/projects/
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

// Active project (defaults to PROJECT_ROOT)
let activeProject = PROJECT_ROOT;

app.get("/api/projects", (_req, res) => {
  const discovered = discoverProjects();
  const manual = userProjects;
  // Merge, deduplicate by path
  const allPaths = new Set<string>();
  const all: Array<{ path: string; name: string; source: string }> = [];

  // Active project first
  allPaths.add(activeProject);
  all.push({ path: activeProject, name: activeProject.split("/").pop() || "project", source: "active" });

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

  res.json({ active: activeProject, projects: all });
});

app.post("/api/projects", (req, res) => {
  const { path: projectPath } = req.body;
  if (!projectPath || typeof projectPath !== "string") {
    return res.status(400).json({ error: "Path is required" });
  }
  const cleanPath = projectPath.trim();
  if (!existsSync(cleanPath)) {
    return res.status(400).json({ error: "Path does not exist" });
  }
  // Add to manual list if not already there
  if (!userProjects.some((p) => p.path === cleanPath)) {
    userProjects.push({
      path: cleanPath,
      name: cleanPath.split("/").pop() || "project",
      addedAt: new Date().toISOString(),
    });
  }
  res.json({ ok: true });
});

app.put("/api/projects/active", (req, res) => {
  const { path: projectPath } = req.body;
  if (!projectPath || !existsSync(projectPath)) {
    return res.status(400).json({ error: "Invalid project path" });
  }
  activeProject = projectPath;
  res.json({ ok: true, active: activeProject });
});

// Delete project — removes from list, optionally deletes files
app.delete("/api/projects", (req, res) => {
  const projectPath = req.query.path as string;
  const deleteFiles = req.query.deleteFiles === "true";
  if (!projectPath) return res.status(400).json({ error: "path is required" });

  // Remove from manual projects list
  const idx = userProjects.findIndex((p) => p.path === projectPath);
  if (idx >= 0) userProjects.splice(idx, 1);

  // Stop any dev server running for this project
  const devServer = devServers.get(projectPath);
  if (devServer) {
    try { devServer.process.kill("SIGTERM"); } catch {}
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

  res.json({ ok: true, deleted: deleteFiles });
});

// Open project in system Finder/file manager
app.post("/api/projects/reveal", (req, res) => {
  const { path: projectPath } = req.body;
  if (!projectPath) return res.status(400).json({ error: "path required" });
  try {
    execFileSync("open", [projectPath], { timeout: 5000 });
    res.json({ ok: true });
  } catch {
    res.status(500).json({ error: "Failed to reveal in Finder" });
  }
});

// Backwards-compatible launch endpoint (creates a session, returns { pid, status })
app.post("/api/claude/launch", (req, res) => {
  const { prompt, flags = [] } = req.body;
  if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
    return res.status(400).json({ error: "Prompt is required" });
  }
  if (!Array.isArray(flags) || !flags.every((f: unknown) => typeof f === "string")) {
    return res.status(400).json({ error: "flags must be an array of strings" });
  }

  try {
    const claudePath = execFileSync("which", ["claude"], {
      encoding: "utf-8",
    }).trim();
    if (!claudePath) return res.status(404).json({ error: "Claude not found" });

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
          client.write(`data: ${JSON.stringify({ type: "done", exitCode: code, filesChanged: session.filesChanged })}\n\n`);
          client.end();
        }
        sseClients.delete(id);
      }
      persistSessions();
      // Keep in memory for 2h, persist handles disk storage
      setTimeout(() => { persistSessions(); claudeSessions.delete(id); }, 7200000);
    });

    res.json({ pid: child.pid || 0, status: "launched", sessionId: id });
  } catch {
    res.status(500).json({ error: "Failed to launch Claude" });
  }
});

// Keep old polling endpoint for backwards compat
app.get("/api/claude/:pid/output", (req, res) => {
  const pid = parseInt(req.params.pid, 10);
  // Find session by PID
  for (const session of claudeSessions.values()) {
    if (session.pid === pid) {
      const output = [...session.output];
      const done = session.status !== "running";
      return res.json({ output, done, exitCode: session.exitCode });
    }
  }
  res.json({ output: [], done: true });
});

// ============================================================
// INSTALL / DISPATCH (run project scripts via spawn)
// ============================================================

app.post("/api/install", (req, res) => {
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

app.post("/api/dispatch", (req, res) => {
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

app.get("/api/git/status", (req, res) => {
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

app.get("/api/git/log", (req, res) => {
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

app.get("/api/git/diff", (req, res) => {
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
// SMART SUGGESTIONS (context-aware)
// ============================================================

// Conversation topic detection for context-aware suggestions
type ConversationTopic = "testing" | "debugging" | "refactoring" | "api" | "ui" | "database";

const TOPIC_PATTERNS: Record<ConversationTopic, RegExp> = {
  testing: /\b(test|spec|coverage|jest|vitest|assert|mock|stub|fixture|expect)\b/i,
  debugging: /\b(debug|debugging|debugger|error|bug|crash|exception|stack.?trace|breakpoint|failure|failing|failed)\b|\bfix\s+(bug|error|issue|crash)/i,
  refactoring: /\b(refactor|clean|rename|extract|simplify|restructure|reorganize|deduplicate)\b/i,
  api: /\b(api|endpoint|route|request|response|REST|GraphQL|handler|middleware)\b/i,
  ui: /\b(ui|component|css|style|layout|render|display|button|modal|form|page)\b/i,
  database: /\b(database|db|sql|dynamo|postgres|mongo|collection|schema|migration)\b/i,
};

function detectTopics(messages: ClaudeMessage[]): ConversationTopic[] {
  const recent = messages.slice(-10);
  const text = recent.map((m) => m.content || "").filter(Boolean).join(" ");
  if (!text.trim()) return [];
  return (Object.entries(TOPIC_PATTERNS) as [ConversationTopic, RegExp][])
    .filter(([, pattern]) => pattern.test(text))
    .map(([topic]) => topic);
}

const TOPIC_SUGGESTIONS: Record<ConversationTopic, { id: string; label: string; prompt: string; icon: string }> = {
  testing: { id: "more-tests", label: "Add more test coverage", prompt: "Add more test coverage for the code we just worked on. Focus on edge cases and error paths.", icon: "test-tube" },
  debugging: { id: "continue-debug", label: "Continue debugging", prompt: "Continue investigating and fixing the issue we were debugging", icon: "bug" },
  refactoring: { id: "refactor-related", label: "Refactor related code", prompt: "Look for similar patterns in related files that could benefit from the same refactoring", icon: "sparkles" },
  api: { id: "doc-api", label: "Document API endpoints", prompt: "Document the API endpoints we just worked on with request/response examples", icon: "file-text" },
  ui: { id: "polish-ui", label: "Polish UI components", prompt: "Review and polish the UI components we worked on — accessibility, responsiveness, edge cases", icon: "layout" },
  database: { id: "optimize-db", label: "Optimize database queries", prompt: "Review the database queries we worked on for performance and add proper indexes if needed", icon: "database" },
};

// Suggestions cache (10s TTL) to avoid blocking git calls on every request
const suggestionsCache = new Map<string, { data: unknown; timestamp: number }>();
const SUGGESTIONS_TTL = 10_000;

app.get("/api/suggestions", (req, res) => {
  const cwd = (req.query.cwd as string) || activeProject;
  const sessionId = req.query.sessionId as string | undefined;

  // Cache key includes sessionId for conversation-aware caching
  const cacheKey = sessionId ? `${cwd}:${sessionId}` : cwd;
  const cached = suggestionsCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < SUGGESTIONS_TTL) {
    return res.json(cached.data);
  }
  const suggestions: Array<{
    id: string;
    label: string;
    prompt: string;
    icon: string;
    priority: number;
    category: "git" | "code" | "test" | "review" | "fix" | "general";
  }> = [];

  // Conversation-aware suggestions: analyze recent messages if sessionId provided
  if (sessionId) {
    const session = claudeSessions.get(sessionId);
    if (session && session.messages.length > 0) {
      const topics = detectTopics(session.messages);
      for (const topic of topics) {
        const s = TOPIC_SUGGESTIONS[topic];
        if (!suggestions.some((existing) => existing.id === s.id)) {
          suggestions.push({ ...s, priority: 25, category: "general" });
        }
      }
    }
  }

  try {
    // Check git status
    const statusRaw = execFileSync("git", ["status", "--porcelain", "-u"], {
      cwd, encoding: "utf-8", timeout: 5000,
    }).trim();
    const gitFiles = statusRaw.split("\n").filter(Boolean);
    const hasChanges = gitFiles.length > 0;
    const hasUntracked = gitFiles.some((l) => l.startsWith("??"));
    const hasStagedChanges = gitFiles.some((l) => "ACDMR".includes(l[0] || ""));

    if (hasChanges) {
      suggestions.push({
        id: "review-changes",
        label: "Review changes",
        prompt: "Review my uncommitted changes, identify any issues, and suggest improvements",
        icon: "eye",
        priority: 10,
        category: "review",
      });
    }

    if (hasStagedChanges) {
      suggestions.push({
        id: "commit-staged",
        label: "Commit staged changes",
        prompt: "Look at the staged git changes and create a well-formatted commit with an appropriate message",
        icon: "git-commit",
        priority: 9,
        category: "git",
      });
    }

    if (hasChanges && !hasStagedChanges) {
      suggestions.push({
        id: "write-tests",
        label: "Write tests for changes",
        prompt: "Write comprehensive tests for the files I've recently modified",
        icon: "test-tube",
        priority: 8,
        category: "test",
      });
    }

    if (hasUntracked) {
      suggestions.push({
        id: "review-new-files",
        label: `Review ${gitFiles.filter((l) => l.startsWith("??")).length} new files`,
        prompt: "Review the newly created untracked files, check for issues and suggest improvements",
        icon: "file-plus",
        priority: 7,
        category: "review",
      });
    }

    // Check for common project files to suggest relevant actions
    if (existsSync(join(cwd, "package.json"))) {
      // Check if node_modules is missing
      if (!existsSync(join(cwd, "node_modules"))) {
        suggestions.push({
          id: "install-deps",
          label: "Install dependencies",
          prompt: "Run npm install or the appropriate package manager to install dependencies",
          icon: "download",
          priority: 15,
          category: "fix",
        });
      }

      // Check for test script
      try {
        const pkg = JSON.parse(readFileSync(join(cwd, "package.json"), "utf-8"));
        if (pkg.scripts?.test) {
          suggestions.push({
            id: "run-tests",
            label: "Run tests",
            prompt: "Run the test suite and fix any failing tests",
            icon: "play",
            priority: 5,
            category: "test",
          });
        }
        if (pkg.scripts?.lint) {
          suggestions.push({
            id: "run-lint",
            label: "Run linter",
            prompt: "Run the linter and fix any issues found",
            icon: "check",
            priority: 4,
            category: "code",
          });
        }
        if (pkg.scripts?.build) {
          suggestions.push({
            id: "build-project",
            label: "Build project",
            prompt: "Run the build command and fix any build errors",
            icon: "hammer",
            priority: 4,
            category: "code",
          });
        }
      } catch {}
    }

    // Check for Makefile
    if (existsSync(join(cwd, "Makefile"))) {
      suggestions.push({
        id: "run-make",
        label: "Run make",
        prompt: "Check the Makefile targets and run the appropriate build/test commands",
        icon: "terminal",
        priority: 3,
        category: "code",
      });
    }

    // Check for README
    if (!existsSync(join(cwd, "README.md")) && !existsSync(join(cwd, "readme.md"))) {
      suggestions.push({
        id: "create-readme",
        label: "Create README",
        prompt: "Analyze this project and create a comprehensive README.md",
        icon: "file-text",
        priority: 2,
        category: "general",
      });
    }

    // Project intelligence suggestions
    if (!existsSync(join(cwd, ".claude/rules/project-intel.md"))) {
      suggestions.push({
        id: "generate-intel",
        label: "Generate project intelligence",
        prompt: "Analyze this codebase and generate a comprehensive project-intel.md file at .claude/rules/project-intel.md. Include: stack, architecture, directory map, API surface, build/test commands, known gotchas.",
        icon: "brain",
        priority: 20,
        category: "general",
      });
    }

    if (!existsSync(join(cwd, ".claude/CLAUDE.md"))) {
      suggestions.push({
        id: "init-project",
        label: "Initialize AI config",
        prompt: "Set up this project for AI-assisted development. Create .claude/CLAUDE.md with project-specific instructions, key commands, and conventions.",
        icon: "sparkles",
        priority: 18,
        category: "general",
      });
    }

    // Always available
    suggestions.push({
      id: "explain-codebase",
      label: "Explain this codebase",
      prompt: "Give me a high-level overview of this codebase: what it does, how it's structured, key technologies used",
      icon: "info",
      priority: 1,
      category: "general",
    });

  } catch {
    // If git commands fail, provide generic suggestions
    suggestions.push(
      { id: "explain", label: "Explain this codebase", prompt: "Give me a high-level overview of this codebase", icon: "info", priority: 1, category: "general" },
      { id: "review", label: "Review code", prompt: "Review the code for bugs and improvements", icon: "eye", priority: 2, category: "review" },
    );
  }

  // Sort by priority descending
  suggestions.sort((a, b) => b.priority - a.priority);

  // Cache
  suggestionsCache.set(cacheKey, { data: suggestions, timestamp: Date.now() });
  res.json(suggestions);
});

// Follow-up suggestions after a Claude session completes
app.get("/api/suggestions/followup/:sessionId", (req, res) => {
  const session = claudeSessions.get(req.params.sessionId);
  if (!session) return res.json([]);

  const suggestions: Array<{ id: string; label: string; prompt: string; icon: string }> = [];

  if (session.status === "done") {
    // If files were changed, suggest review/test
    if (session.filesChanged && session.filesChanged.length > 0) {
      suggestions.push(
        { id: "test-changes", label: "Write tests for these changes", prompt: "Write comprehensive tests for the files you just modified", icon: "test-tube" },
        { id: "review-work", label: "Review what you did", prompt: "Review the changes you just made. Are there any issues or improvements?", icon: "eye" },
        { id: "commit-work", label: "Commit these changes", prompt: "Stage and commit the changes you just made with an appropriate commit message", icon: "git-commit" },
      );
    }

    // Generic follow-ups
    suggestions.push(
      { id: "continue", label: "Continue improving", prompt: "What else could be improved in the code you just worked on?", icon: "sparkles" },
      { id: "explain", label: "Explain what you did", prompt: "Explain the changes you just made in detail", icon: "info" },
      { id: "docs", label: "Update documentation", prompt: "Update any relevant documentation for the changes you just made", icon: "file-text" },
    );
  }

  if (session.status === "error") {
    suggestions.push(
      { id: "retry", label: "Try a different approach", prompt: "The previous attempt failed. Try a completely different approach to solve: " + session.prompt, icon: "refresh" },
      { id: "debug", label: "Debug the error", prompt: "Debug why the previous attempt failed and fix the issue", icon: "bug" },
    );
  }

  // Add topic-specific follow-ups based on conversation content
  const topics = detectTopics(session.messages);
  for (const topic of topics) {
    const s = TOPIC_SUGGESTIONS[topic];
    if (!suggestions.some((existing) => existing.id === s.id)) {
      suggestions.push(s);
    }
  }

  res.json(suggestions);
});

// ============================================================
// FILESYSTEM BROWSING (for folder picker)
// ============================================================

app.get("/api/filesystem/browse", (req, res) => {
  const requestedPath = (req.query.path as string) || homedir();

  // Security: resolve to absolute path and prevent escaping to system dirs
  const absPath = resolve(requestedPath);

  // Basic security: only allow browsing under home directory or /tmp
  const homeDir = homedir();
  if (!absPath.startsWith(homeDir) && !absPath.startsWith("/tmp") && absPath !== "/") {
    return res.status(403).json({ error: "Access denied" });
  }

  if (!existsSync(absPath)) {
    return res.status(404).json({ error: "Path not found" });
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

    res.json({
      current: absPath,
      parent: parent && parent.startsWith(homeDir) ? parent : (absPath === homeDir ? null : homeDir),
      name: absPath.split("/").pop() || "/",
      dirs,
      isGitRepo: existsSync(join(absPath, ".git")),
      hasPackageJson: existsSync(join(absPath, "package.json")),
    });
  } catch {
    res.status(500).json({ error: "Failed to read directory" });
  }
});

// ============================================================
// PROJECT INTELLIGENCE
// ============================================================

app.get("/api/projects/intel", (req, res) => {
  const cwd = (req.query.cwd as string) || activeProject;
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

  res.json(result);
});

app.post("/api/projects/init", (req, res) => {
  const cwd = (req.body.cwd as string) || activeProject;
  const initScript = join(PROJECT_ROOT, "project-init.sh");

  if (!existsSync(initScript)) {
    return res.status(404).json({ error: "project-init.sh not found" });
  }

  try {
    const output = execFileSync("bash", [initScript], {
      cwd,
      encoding: "utf-8",
      timeout: 30000,
      env: { ...process.env, HOME: HOME },
    });
    res.json({ ok: true, output });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Init failed";
    res.status(500).json({ error: msg });
  }
});

// ============================================================
// TEMPLATE SYSTEM — curated, verified design references
// ============================================================

interface CuratedTemplate {
  id: string;
  category: string;
  style: string;
  label: string;
  desc: string;
  framework: string;
  uiLib: string;
  tags: string[];
  path: string;
  scripts: string[];
}

interface CuratedManifest {
  styles: Record<string, { label: string; desc: string; icon: string }>;
  templates: CuratedTemplate[];
}

const TEMPLATES_DIR = join(PROJECT_ROOT, "extracted_templates");
let curatedCache: CuratedManifest | null = null;

function loadCurated(): CuratedManifest {
  if (curatedCache) return curatedCache;
  try {
    const p = join(TEMPLATES_DIR, "curated.json");
    if (existsSync(p)) curatedCache = JSON.parse(readFileSync(p, "utf-8"));
  } catch {}
  return curatedCache || { styles: {}, templates: [] };
}

// GET /api/templates — returns curated templates grouped by design style
app.get("/api/templates", (_req, res) => {
  const { styles, templates } = loadCurated();
  const grouped = Object.entries(styles).map(([id, meta]) => ({
    id,
    ...meta,
    templates: templates.filter((t) => {
      if (id === "landing") return t.tags.includes("landing") || t.tags.includes("marketing");
      if (id === "dashboard-modern") return t.style === "modern" && !t.tags.includes("landing");
      if (id === "dashboard-material") return t.style === "material" && !t.tags.includes("landing");
      if (id === "dashboard-dark") return t.style === "dark";
      if (id === "dashboard-soft") return t.style === "soft";
      return t.style === "clean" && !t.tags.includes("landing");
    }),
  })).filter((g) => g.templates.length > 0);
  res.json(grouped);
});

// Auto-pick the best template based on user description
function autoPickTemplate(description: string): CuratedTemplate {
  const { templates } = loadCurated();
  const desc = description.toLowerCase();

  // Keyword → style matching
  const isLanding = /landing|marketing|saas|homepage|portfolio|agency|pricing|hero/i.test(desc);
  const isDark = /dark|night|neon|gradient|cyber|gaming/i.test(desc);
  const isMaterial = /material|google|android|mui/i.test(desc);
  const isClean = /clean|classic|simple|minimal|corporate|professional/i.test(desc);

  // Framework preference from description (check specific before general)
  const wantsNuxt = /\bnuxt\b/i.test(desc);
  const wantsNext = /next\.?js|next\s|react.*ssr|server.*component/i.test(desc);
  const wantsVue = /\bvue\b|vuetify/i.test(desc);
  const wantsAngular = /angular|ng\b/i.test(desc);
  const wantsHtml = /\bhtml\b|static.*site|no.*framework|vanilla/i.test(desc);
  const wantsReact = /\breact\b/i.test(desc);

  // Step 1: Filter by framework preference (most specific signal)
  let candidates = templates;
  if (wantsNuxt) {
    const nuxtTemplates = candidates.filter((t) => t.framework === "Nuxt");
    if (nuxtTemplates.length > 0) candidates = nuxtTemplates;
  } else if (wantsNext) {
    const nextTemplates = candidates.filter((t) => t.framework === "Next.js");
    if (nextTemplates.length > 0) candidates = nextTemplates;
  } else if (wantsVue) {
    const vueTemplates = candidates.filter((t) => t.framework === "Vue");
    if (vueTemplates.length > 0) candidates = vueTemplates;
  } else if (wantsAngular) {
    const angTemplates = candidates.filter((t) => t.framework === "Angular");
    if (angTemplates.length > 0) candidates = angTemplates;
  } else if (wantsHtml) {
    const htmlTemplates = candidates.filter((t) => t.framework === "HTML");
    if (htmlTemplates.length > 0) candidates = htmlTemplates;
  } else if (wantsReact) {
    const reactTemplates = candidates.filter((t) => t.framework === "React");
    if (reactTemplates.length > 0) candidates = reactTemplates;
  }

  // Step 2: Filter by style within the framework candidates
  if (isLanding) {
    const landing = candidates.filter((t) => t.tags.includes("landing") || t.tags.includes("marketing"));
    if (landing.length > 0) candidates = landing;
  } else if (isDark) {
    const dark = candidates.filter((t) => t.style === "dark");
    if (dark.length > 0) candidates = dark;
  } else if (isMaterial) {
    const mat = candidates.filter((t) => t.style === "material");
    if (mat.length > 0) candidates = mat;
  } else if (isClean) {
    const clean = candidates.filter((t) => t.style === "clean");
    if (clean.length > 0) candidates = clean;
  }

  // Step 3: If no framework/style matched, default to dashboard (not landing page)
  if (candidates.length === templates.length) {
    // No filters applied — pick a good default dashboard
    // Prefer Material Tailwind (Next.js, modern) as the general-purpose default
    const dashboards = templates.filter((t) => t.tags.includes("dashboard") && !t.tags.includes("landing"));
    if (dashboards.length > 0) candidates = dashboards;
    // Within dashboards, prefer material style (most versatile)
    const materialDash = candidates.filter((t) => t.style === "material");
    if (materialDash.length > 0) candidates = materialDash;
  }

  // Return first match (they're already ordered by quality in curated.json)
  return candidates[0] || templates[0];
}

// POST /api/projects/create-from-template — copy template + always spawn Claude to customize
// templateId is optional — if omitted, auto-picks based on description
app.post("/api/projects/create-from-template", (req, res) => {
  const { templateId, name, description, basePath } = req.body;
  if (!name || !description) {
    return res.status(400).json({ error: "name and description are required" });
  }

  const { templates } = loadCurated();
  const template = templateId
    ? templates.find((t) => t.id === templateId)
    : autoPickTemplate(description);
  if (!template) return res.status(404).json({ error: "Template not found" });

  const safeName = name.replace(/[^a-zA-Z0-9_-]/g, "-").toLowerCase();
  const base = basePath || join(HOME, "projects");
  const projectDir = join(base, safeName);

  if (!existsSync(base)) mkdirSync(base, { recursive: true });
  if (existsSync(projectDir)) {
    return res.status(409).json({ error: `Directory already exists: ${projectDir}` });
  }

  try {
    // Copy template as starting point
    const templateSrc = join(TEMPLATES_DIR, template.path);
    if (!existsSync(templateSrc)) {
      return res.status(404).json({ error: "Template source directory not found" });
    }
    execFileSync("cp", ["-R", templateSrc, projectDir], { timeout: 30000 });

    // Update package.json name
    const pkgPath = join(projectDir, "package.json");
    if (existsSync(pkgPath)) {
      try {
        const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
        pkg.name = safeName;
        writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
      } catch {}
    }

    // Init git
    try {
      execFileSync("git", ["init"], { cwd: projectDir, encoding: "utf-8", timeout: 5000 });
      execFileSync("git", ["add", "."], { cwd: projectDir, encoding: "utf-8", timeout: 10000 });
      execFileSync("git", ["commit", "-m", "Initial commit from template: " + template.label], { cwd: projectDir, encoding: "utf-8", timeout: 10000 });
    } catch {}

    // Set as active project
    activeProject = projectDir;
    if (!userProjects.some((p) => p.path === projectDir)) {
      userProjects.push({ path: projectDir, name: safeName, addedAt: new Date().toISOString() });
    }

    // Always spawn Claude to customize the template based on user's description
    const claudePath = execFileSync("which", ["claude"], { encoding: "utf-8" }).trim();
    // Write .env with connected integrations (Supabase, AWS) and get prompt context
    const integrationContext = writeProjectDotEnv(projectDir);

    const buildPrompt = `You are building a project called "${name}" for the user.

The user's idea:
${description}

You are working inside a "${template.label}" template (${template.framework} + ${template.uiLib}).
The template already has a working UI with components, layouts, routing, and styling.
${integrationContext ? `\n${integrationContext}\n` : ""}
## Your Process

1. **Explore first** — Use Read, Grep, Glob to study the template structure before editing anything. Understand the components, pages, routing, and design patterns.
2. **Install dependencies** — Run "npm install" plus any extra packages needed (e.g. @supabase/supabase-js if using Supabase).
3. **Customize systematically:**
   - Rename/restructure pages and navigation to fit the user's app
   - Update content, copy, and branding
   - Add new components or pages for features described
   - Wire up data fetching, forms, state management, and interactivity
   - Keep the design system and UI library — build ON the template, don't replace it
4. **Verify your work:**
   - After editing, re-read the files you changed to confirm correctness
   - Check for React hooks rules (no hooks in conditionals, no hooks in callbacks)
   - Check that all imports exist and are correct
   - Run "npm run build" or "npx tsc --noEmit" to catch type errors
   - If errors are found, FIX THEM before finishing
5. **Self-review** — Before marking done, review your changes: are there obvious bugs, missing imports, broken routes, or hardcoded values that should be dynamic?

## Quality Standards
- Match the template's existing code patterns and conventions
- No React hooks violations (hooks must be at top level of components, never conditional)
- All components must render valid JSX (no objects as React children)
- Use the template's existing design tokens, colors, and component library
- Handle loading states and errors for any data fetching
- Do NOT leave placeholder text like "TODO" or "Lorem ipsum" — use realistic data

## Available Tools
You have access to plugins (serena, context7, code-review) and can search codebases, fetch library docs, and review your own code. Use them.

IMPORTANT: Do NOT tell the user to "run npm run dev" or any other command. The app will automatically start the dev server and open it in a browser panel when you're done. Just focus on writing correct, working code.

Build on the template — don't start from scratch. The design is already beautiful.`;

    const id = randomUUID().slice(0, 12);
    const args = ["-p", buildPrompt, "--output-format", "stream-json", "--verbose", "--dangerously-skip-permissions"];
    const env = buildProjectEnv(projectDir);

    const child = spawn(claudePath, args, {
      env,
      cwd: projectDir,
      stdio: ["ignore", "pipe", "pipe"],
    });

    const session: ClaudeSession = {
      id,
      prompt: buildPrompt,
      status: "running",
      messages: [{ role: "user", content: buildPrompt, timestamp: new Date().toISOString() }],
      output: [],
      exitCode: null,
      startedAt: new Date().toISOString(),
      pid: child.pid,
      cwd: projectDir,
      process: child,
    };

    claudeSessions.set(id, session);
    wireStreamJson(child, session, id);

    child.on("close", (code) => {
      session.status = code === 0 ? "done" : "error";
      session.exitCode = code;
      session.endedAt = new Date().toISOString();
      session.messages.push({ role: "assistant", content: session.output.join(""), timestamp: new Date().toISOString() });
      delete session.process;
      if (code === 0) session.filesChanged = detectFileChanges(session.cwd);
      const clients = sseClients.get(id);
      if (clients) {
        for (const client of clients) {
          client.write(`data: ${JSON.stringify({ type: "done", exitCode: code, filesChanged: session.filesChanged })}\n\n`);
          client.end();
        }
        sseClients.delete(id);
      }
      persistSessions();
      setTimeout(() => { persistSessions(); claudeSessions.delete(id); }, 7200000);
    });

    const { process: _, ...safe } = session;
    res.status(201).json({
      ok: true,
      projectDir,
      sessionId: id,
      session: safe,
      template: { id: template.id, label: template.label, framework: template.framework },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to create project from template";
    res.status(500).json({ error: msg });
  }
});

// ============================================================
// PROJECT CREATOR (from scratch — original flow)
// ============================================================

app.post("/api/projects/create", (req, res) => {
  const { name, description, basePath, envVars, supabaseOverride, awsProfile } = req.body;
  if (!name || !description) {
    return res.status(400).json({ error: "Name and description are required" });
  }

  const safeName = name.replace(/[^a-zA-Z0-9_-]/g, "-").toLowerCase();
  const parentDir = resolve(basePath || join(HOME, "projects"));
  // Ensure parent is under home directory
  if (!parentDir.startsWith(HOME) && !parentDir.startsWith("/tmp")) {
    return res.status(400).json({ error: "Project path must be under home directory" });
  }
  const projectDir = join(parentDir, safeName);

  // Create directory
  if (!existsSync(parentDir)) mkdirSync(parentDir, { recursive: true });
  if (!existsSync(projectDir)) mkdirSync(projectDir, { recursive: true });

  // Initialize git
  try {
    execFileSync("git", ["init"], { cwd: projectDir, timeout: 5000 });
  } catch {}

  // Save per-project env config if provided
  const projectEnvConfig: ProjectEnvConfig = {};
  if (envVars && typeof envVars === "object" && Object.keys(envVars).length > 0) {
    projectEnvConfig.env = envVars;
  }
  if (supabaseOverride && typeof supabaseOverride === "object") {
    projectEnvConfig.supabase = supabaseOverride;
  }
  if (awsProfile && typeof awsProfile === "string") {
    projectEnvConfig.aws = { profile: awsProfile };
  }
  if (Object.keys(projectEnvConfig).length > 0) {
    saveProjectEnv(projectDir, projectEnvConfig);
  }

  // Set as active project
  activeProject = projectDir;
  if (!userProjects.some((p) => p.path === projectDir)) {
    userProjects.push({ path: projectDir, name: safeName, addedAt: new Date().toISOString() });
  }

  // Launch Claude session to build the project
  try {
    const claudePath = execFileSync("which", ["claude"], { encoding: "utf-8" }).trim();

    // Write .env with connected integrations (Supabase, AWS) and get prompt context
    const integrationContext = writeProjectDotEnv(projectDir);

    const buildPrompt = `You are creating a new project called "${name}". Here is the user's idea:

${description}

${integrationContext ? integrationContext + "\n" : ""}## Your Process

1. **Plan the architecture** — Before writing code, decide on: framework, file structure, data model, key components. Use context7 plugin to fetch docs for any library you're unsure about.
2. **Set up the project** — Use bun as the package manager (bun init, bun add) for speed. Create all files, install dependencies.
3. **Implement the core functionality** — Not just scaffolding. Make features actually work with realistic data, proper state management, and clean UI.
4. **MUST have a working "dev" script** in package.json that starts a dev server (vite, next dev, bun serve).
5. **Verify your work:**
   - After writing code, re-read modified files to confirm correctness
   - Check for React hooks rules (no hooks in conditionals)
   - Run "bun run build" or type-check to catch errors
   - If errors found, FIX THEM before finishing
6. **Self-review** — Before marking done, check for: missing imports, broken routes, hardcoded values, unhandled errors.

## Quality Standards
- Use modern best practices: TypeScript, proper error handling, clean code
- No placeholder content (TODO, Lorem ipsum) — use realistic data
- Handle loading and error states for data fetching
- Mobile-responsive design
- Accessible (semantic HTML, proper labels)

## Available Tools
You have access to plugins (serena for code navigation, context7 for library docs, code-review for self-review). Use them to write better code.

IMPORTANT: Do NOT tell the user to run any commands. The app will automatically start the dev server and open it in a browser when you're done. Just focus on writing correct, working code.`;

    const id = randomUUID().slice(0, 12);
    const args = ["-p", buildPrompt, "--output-format", "stream-json", "--verbose", "--dangerously-skip-permissions"];
    const env = buildProjectEnv(projectDir);

    const child = spawn(claudePath, args, {
      env,
      cwd: projectDir,
      stdio: ["ignore", "pipe", "pipe"],
    });

    const session: ClaudeSession = {
      id,
      prompt: buildPrompt,
      status: "running",
      messages: [{ role: "user", content: buildPrompt, timestamp: new Date().toISOString() }],
      output: [],
      exitCode: null,
      startedAt: new Date().toISOString(),
      pid: child.pid,
      cwd: projectDir,
      process: child,
    };

    claudeSessions.set(id, session);
    wireStreamJson(child, session, id);

    child.on("close", (code) => {
      session.status = code === 0 ? "done" : "error";
      session.exitCode = code;
      session.endedAt = new Date().toISOString();
      session.messages.push({ role: "assistant", content: session.output.join(""), timestamp: new Date().toISOString() });
      delete session.process;
      if (code === 0) session.filesChanged = detectFileChanges(session.cwd);
      const clients = sseClients.get(id);
      if (clients) {
        for (const client of clients) {
          client.write(`data: ${JSON.stringify({ type: "done", exitCode: code, filesChanged: session.filesChanged })}\n\n`);
          client.end();
        }
        sseClients.delete(id);
      }
      persistSessions();
      // Keep in memory for 2h, persist handles disk storage
      setTimeout(() => { persistSessions(); claudeSessions.delete(id); }, 7200000);
    });

    const { process: _, ...safe } = session;
    res.status(201).json({ ok: true, projectDir, sessionId: id, session: safe });
  } catch {
    // Project created but no Claude session — still success
    res.status(201).json({ ok: true, projectDir, sessionId: null });
  }
});

// ============================================================
// INTEGRATIONS — GITHUB
// ============================================================

app.get("/api/integrations/github", (_req, res) => {
  const config = loadIntegrations();
  if (!config.github?.pat) {
    return res.json({ connected: false });
  }
  res.json({
    connected: true,
    username: config.github.username,
    pat: maskSecret(config.github.pat),
    connectedAt: config.github.connectedAt,
  });
});

app.put("/api/integrations/github", async (req, res) => {
  const { pat } = req.body;
  if (!pat || typeof pat !== "string") {
    return res.status(400).json({ error: "PAT is required" });
  }

  // Validate PAT by calling GitHub API
  try {
    const resp = await fetch("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${pat.trim()}`, "User-Agent": "claude-auto-setup" },
    });
    if (!resp.ok) return res.status(401).json({ error: "Invalid PAT — GitHub returned " + resp.status });

    const user = (await resp.json()) as { login: string };
    const config = loadIntegrations();
    config.github = { pat: pat.trim(), username: user.login, connectedAt: new Date().toISOString() };
    saveIntegrations(config);

    res.json({ connected: true, username: user.login });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Connection failed";
    res.status(500).json({ error: msg });
  }
});

app.delete("/api/integrations/github", (_req, res) => {
  const config = loadIntegrations();
  delete config.github;
  saveIntegrations(config);
  res.json({ ok: true });
});

app.post("/api/integrations/github/verify", async (_req, res) => {
  const config = loadIntegrations();
  if (!config.github?.pat) return res.json({ ok: false, error: "Not connected" });

  try {
    const resp = await fetch("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${config.github.pat}`, "User-Agent": "claude-auto-setup" },
    });
    if (!resp.ok) return res.json({ ok: false, error: `GitHub API returned ${resp.status}` });

    const user = (await resp.json()) as { login: string; name: string | null; public_repos: number; created_at: string };
    // Also check rate limit
    const rateResp = await fetch("https://api.github.com/rate_limit", {
      headers: { Authorization: `Bearer ${config.github.pat}`, "User-Agent": "claude-auto-setup" },
    });
    const rate = rateResp.ok ? (await rateResp.json()) as { rate: { limit: number; remaining: number; reset: number } } : null;

    res.json({
      ok: true,
      user: { login: user.login, name: user.name, repos: user.public_repos, since: user.created_at },
      rateLimit: rate ? { limit: rate.rate.limit, remaining: rate.rate.remaining, resetsAt: new Date(rate.rate.reset * 1000).toISOString() } : null,
      scopes: resp.headers.get("x-oauth-scopes") || "unknown",
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Verification failed";
    res.json({ ok: false, error: msg });
  }
});

app.get("/api/integrations/github/repos", async (_req, res) => {
  const config = loadIntegrations();
  if (!config.github?.pat) return res.status(401).json({ error: "GitHub not connected" });

  try {
    const resp = await fetch("https://api.github.com/user/repos?sort=updated&per_page=30", {
      headers: { Authorization: `Bearer ${config.github.pat}`, "User-Agent": "claude-auto-setup" },
    });
    if (!resp.ok) return res.status(resp.status).json({ error: "GitHub API error" });

    const repos = (await resp.json()) as Array<{ name: string; full_name: string; html_url: string; clone_url: string; description: string | null; private: boolean; language: string | null; updated_at: string }>;
    res.json(repos.map(r => ({
      name: r.name,
      fullName: r.full_name,
      url: r.html_url,
      cloneUrl: r.clone_url,
      description: r.description,
      private: r.private,
      language: r.language,
      updatedAt: r.updated_at,
    })));
  } catch {
    res.status(500).json({ error: "Failed to fetch repos" });
  }
});

app.post("/api/integrations/github/clone", (req, res) => {
  const { repoUrl, targetPath } = req.body;
  const config = loadIntegrations();
  if (!config.github?.pat) return res.status(401).json({ error: "GitHub not connected" });
  if (!repoUrl) return res.status(400).json({ error: "repoUrl is required" });

  // Validate URL format — only allow github.com HTTPS URLs
  const ghUrlPattern = /^https:\/\/github\.com\/[\w.-]+\/[\w.-]+(?:\.git)?$/;
  if (!ghUrlPattern.test(repoUrl)) {
    return res.status(400).json({ error: "Invalid GitHub repository URL. Only https://github.com/ URLs are allowed." });
  }

  const rawDest = targetPath || join(HOME, "projects", repoUrl.split("/").pop()?.replace(".git", "") || "repo");
  const dest = resolve(rawDest);
  // Prevent path traversal — must be under home or /tmp
  if (!dest.startsWith(HOME) && !dest.startsWith("/tmp")) {
    return res.status(400).json({ error: "Target path must be under home directory" });
  }

  try {
    // Use git credential helper via env to avoid embedding PAT in the URL
    const cloneEnv = {
      ...process.env,
      GIT_ASKPASS: "echo",
      GIT_TERMINAL_PROMPT: "0",
      GIT_CONFIG_COUNT: "1",
      GIT_CONFIG_KEY_0: "http.https://github.com/.extraheader",
      GIT_CONFIG_VALUE_0: `Authorization: Bearer ${config.github.pat}`,
    };
    execFileSync("git", ["clone", repoUrl, dest], { encoding: "utf-8", timeout: 120000, env: cloneEnv });

    // Add as project
    activeProject = dest;
    if (!userProjects.some((p) => p.path === dest)) {
      userProjects.push({ path: dest, name: dest.split("/").pop() || "repo", addedAt: new Date().toISOString() });
    }

    res.json({ ok: true, path: dest });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Clone failed";
    res.status(500).json({ error: msg });
  }
});

// ============================================================
// INTEGRATIONS — SUPABASE
// ============================================================

// Status — returns connected state + project info
app.get("/api/integrations/supabase", (_req, res) => {
  const config = loadIntegrations();
  if (!config.supabase?.accessToken) return res.json({ connected: false });

  res.json({
    connected: true,
    url: config.supabase.url,
    anonKey: maskSecret(config.supabase.anonKey),
    projectRef: config.supabase.projectRef,
    projectName: config.supabase.projectName,
    orgName: config.supabase.orgName,
    connectedAt: config.supabase.connectedAt,
  });
});

// Sign in with access token — validates and fetches projects
app.put("/api/integrations/supabase", async (req, res) => {
  const { accessToken } = req.body;
  if (!accessToken || typeof accessToken !== "string") {
    return res.status(400).json({ error: "Access token is required" });
  }

  const sbApi = "https://api.supabase.com";
  const headers = { Authorization: `Bearer ${accessToken.trim()}`, "Content-Type": "application/json" };

  try {
    // Validate token by listing projects
    const resp = await fetch(`${sbApi}/v1/projects`, { headers });
    if (!resp.ok) return res.status(401).json({ error: `Invalid token — Supabase returned ${resp.status}` });

    const projects = (await resp.json()) as Array<{
      id: string; name: string; organization_id: string;
      region: string; status: string; created_at: string;
    }>;

    // Save token, return project list for user to pick
    const config = loadIntegrations();
    config.supabase = {
      accessToken: accessToken.trim(),
      url: "", anonKey: "",
      connectedAt: new Date().toISOString(),
    };
    saveIntegrations(config);

    res.json({ connected: true, projects });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Connection failed";
    res.status(500).json({ error: msg });
  }
});

// Select a project — fetches API keys and stores them
app.post("/api/integrations/supabase/select-project", async (req, res) => {
  const { projectRef } = req.body;
  if (!projectRef) return res.status(400).json({ error: "projectRef is required" });

  const config = loadIntegrations();
  if (!config.supabase?.accessToken) return res.status(401).json({ error: "Not authenticated" });

  const sbApi = "https://api.supabase.com";
  const headers = { Authorization: `Bearer ${config.supabase.accessToken}`, "Content-Type": "application/json" };

  try {
    // Fetch API keys for this project
    const keysResp = await fetch(`${sbApi}/v1/projects/${projectRef}/api-keys`, { headers });
    if (!keysResp.ok) return res.status(keysResp.status).json({ error: `Failed to fetch keys: ${keysResp.status}` });

    const keys = (await keysResp.json()) as Array<{ name: string; api_key: string }>;
    const anonKey = keys.find(k => k.name === "anon")?.api_key || "";
    const serviceKey = keys.find(k => k.name === "service_role")?.api_key || "";

    // Fetch project details for the URL
    const projResp = await fetch(`${sbApi}/v1/projects/${projectRef}`, { headers });
    const proj = projResp.ok ? (await projResp.json()) as { name: string; region: string; organization_id: string } : null;

    // Fetch org name
    let orgName = "";
    if (proj?.organization_id) {
      try {
        const orgResp = await fetch(`${sbApi}/v1/organizations`, { headers });
        if (orgResp.ok) {
          const orgs = (await orgResp.json()) as Array<{ id: string; name: string }>;
          orgName = orgs.find(o => o.id === proj.organization_id)?.name || "";
        }
      } catch {}
    }

    const url = `https://${projectRef}.supabase.co`;

    config.supabase = {
      ...config.supabase,
      url,
      anonKey,
      serviceRoleKey: serviceKey,
      projectRef,
      projectName: proj?.name || projectRef,
      orgName,
    };
    saveIntegrations(config);

    res.json({ ok: true, url, projectName: proj?.name, orgName, hasAnonKey: !!anonKey, hasServiceKey: !!serviceKey });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to select project";
    res.status(500).json({ error: msg });
  }
});

// List projects (for authenticated users)
app.get("/api/integrations/supabase/projects", async (_req, res) => {
  const config = loadIntegrations();
  if (!config.supabase?.accessToken) return res.status(401).json({ error: "Not authenticated" });

  const headers = { Authorization: `Bearer ${config.supabase.accessToken}`, "Content-Type": "application/json" };
  try {
    const resp = await fetch("https://api.supabase.com/v1/projects", { headers });
    if (!resp.ok) return res.status(resp.status).json({ error: "Failed to fetch projects" });
    const projects = await resp.json();
    res.json(projects);
  } catch {
    res.status(500).json({ error: "Failed to list projects" });
  }
});

app.delete("/api/integrations/supabase", (_req, res) => {
  const config = loadIntegrations();
  delete config.supabase;
  saveIntegrations(config);
  res.json({ ok: true });
});

// Test connection to the selected project
app.post("/api/integrations/supabase/test", async (_req, res) => {
  const config = loadIntegrations();
  if (!config.supabase?.url || !config.supabase?.anonKey) return res.status(400).json({ error: "No project selected" });

  try {
    const resp = await fetch(`${config.supabase.url.replace(/\/$/, "")}/rest/v1/`, {
      headers: { apikey: config.supabase.anonKey, Authorization: `Bearer ${config.supabase.anonKey}` },
    });
    res.json({ ok: resp.ok, status: resp.status });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Connection test failed";
    res.json({ ok: false, error: msg });
  }
});

// ============================================================
// INTEGRATIONS — AWS
// ============================================================

app.get("/api/integrations/aws", (_req, res) => {
  const config = loadIntegrations();
  const profiles: string[] = [];

  // Parse ~/.aws/credentials for profile names
  const credsPath = join(HOME, ".aws/credentials");
  const configPath = join(HOME, ".aws/config");

  try {
    if (existsSync(credsPath)) {
      const content = readFileSync(credsPath, "utf-8");
      const matches = content.match(/\[([^\]]+)\]/g);
      if (matches) profiles.push(...matches.map(m => m.replace(/[[\]]/g, "")));
    }
    if (existsSync(configPath)) {
      const content = readFileSync(configPath, "utf-8");
      const matches = content.match(/\[profile ([^\]]+)\]/g);
      if (matches) profiles.push(...matches.map(m => m.replace(/\[profile |\]/g, "")));
    }
  } catch {}

  // Deduplicate
  const uniqueProfiles = [...new Set(profiles)];

  // Check for ada CLI
  let hasAda = false;
  try { execFileSync("which", ["ada"], { encoding: "utf-8" }); hasAda = true; } catch {}

  // Check for aws CLI
  let hasAwsCli = false;
  try { execFileSync("which", ["aws"], { encoding: "utf-8" }); hasAwsCli = true; } catch {}

  res.json({
    profiles: uniqueProfiles,
    activeProfile: config.aws?.activeProfile || "default",
    adaAccount: config.aws?.adaAccount,
    adaRole: config.aws?.adaRole,
    hasAda,
    hasAwsCli,
  });
});

app.put("/api/integrations/aws/profile", (req, res) => {
  const { profile, adaAccount, adaRole } = req.body;
  const config = loadIntegrations();
  config.aws = {
    activeProfile: profile || config.aws?.activeProfile,
    adaAccount: adaAccount || config.aws?.adaAccount,
    adaRole: adaRole || config.aws?.adaRole,
  };
  saveIntegrations(config);
  res.json({ ok: true, ...config.aws });
});

app.post("/api/integrations/aws/refresh-credentials", (req, res) => {
  const config = loadIntegrations();
  const { account, role, profile } = req.body;

  const adaAccount = account || config.aws?.adaAccount;
  const adaRole = role || config.aws?.adaRole || "Admin";
  const adaProfile = profile || config.aws?.activeProfile || "default";

  if (!adaAccount) return res.status(400).json({ error: "AWS account ID is required" });

  try {
    const output = execFileSync("ada", [
      "credentials", "update",
      "--account", adaAccount,
      "--role", adaRole,
      "--once",
      "--profile", adaProfile,
    ], { encoding: "utf-8", timeout: 30000 });

    // Save the account/role for future refreshes
    config.aws = { ...config.aws, activeProfile: adaProfile, adaAccount, adaRole };
    saveIntegrations(config);

    res.json({ ok: true, output: output.trim(), profile: adaProfile });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "ada credentials update failed";
    res.status(500).json({ error: msg });
  }
});

app.post("/api/integrations/aws/verify", (_req, res) => {
  const config = loadIntegrations();
  const profile = config.aws?.activeProfile || "default";

  try {
    // Check if aws CLI exists
    execFileSync("which", ["aws"], { encoding: "utf-8" });
  } catch {
    return res.json({ ok: false, error: "AWS CLI not installed" });
  }

  try {
    const output = execFileSync("aws", ["sts", "get-caller-identity", "--profile", profile, "--output", "json"], {
      encoding: "utf-8",
      timeout: 15000,
      env: { ...process.env, AWS_PROFILE: profile },
    });
    const identity = JSON.parse(output) as { Account: string; Arn: string; UserId: string };

    // Also check what region is configured
    let region = "unknown";
    try {
      region = execFileSync("aws", ["configure", "get", "region", "--profile", profile], {
        encoding: "utf-8", timeout: 5000,
      }).trim() || "unknown";
    } catch {}

    res.json({
      ok: true,
      account: identity.Account,
      arn: identity.Arn,
      userId: identity.UserId,
      profile,
      region,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "AWS verification failed";
    // Check for common errors
    if (msg.includes("ExpiredToken") || msg.includes("expired")) {
      return res.json({ ok: false, error: "Credentials expired — refresh with ada", expired: true });
    }
    if (msg.includes("could not be found") || msg.includes("NoCredentialProviders")) {
      return res.json({ ok: false, error: `No credentials for profile "${profile}"` });
    }
    res.json({ ok: false, error: msg.slice(0, 300) });
  }
});

app.post("/api/integrations/aws/exec", (req, res) => {
  const { command, args: cmdArgs = [] } = req.body;
  if (!command) return res.status(400).json({ error: "command is required" });

  const config = loadIntegrations();
  const profile = config.aws?.activeProfile || "default";

  // Only allow aws CLI commands for safety
  if (command !== "aws") return res.status(400).json({ error: "Only 'aws' commands are allowed" });

  // Validate args - no shell injection
  // Strict arg validation — only allow safe characters (alphanumeric, hyphens, dots, slashes, colons, equals, underscores)
  const SAFE_ARG = /^[a-zA-Z0-9_\-.:=/,@*\s]+$/;
  const safeArgs = (cmdArgs as string[]).filter(a => typeof a === "string" && SAFE_ARG.test(a));

  try {
    const output = execFileSync("aws", [...safeArgs, "--profile", profile, "--output", "json"], {
      encoding: "utf-8",
      timeout: 30000,
      env: { ...process.env, AWS_PROFILE: profile },
    });
    res.json({ ok: true, output: output.trim() });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "AWS command failed";
    res.status(500).json({ error: msg });
  }
});

// ============================================================
// OPS PANEL — Shell execution with streaming
// ============================================================

const opsProcesses = new Map<string, { process: ReturnType<typeof spawn>; output: string[]; status: string; exitCode: number | null }>();

app.post("/api/ops/run", (req, res) => {
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

app.get("/api/ops/stream/:id", (req, res) => {
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

app.post("/api/ops/stop/:id", (req, res) => {
  const entry = opsProcesses.get(req.params.id);
  if (!entry) return res.status(404).json({ error: "Process not found" });
  try { entry.process.kill("SIGTERM"); } catch {}
  res.json({ ok: true });
});

// ============================================================
// ============================================================
// PER-PROJECT ENVIRONMENT CONFIGURATION
// ============================================================

interface ProjectEnvConfig {
  env?: Record<string, string>;
  supabase?: { projectRef?: string; url?: string; anonKey?: string };
  aws?: { profile?: string };
}

function getProjectEnvPath(projectCwd: string): string {
  return join(projectCwd, ".claude", "project-env.json");
}

function loadProjectEnv(projectCwd: string): ProjectEnvConfig {
  try {
    const p = getProjectEnvPath(projectCwd);
    if (existsSync(p)) return JSON.parse(readFileSync(p, "utf-8"));
  } catch {}
  return {};
}

function saveProjectEnv(projectCwd: string, config: ProjectEnvConfig): void {
  const dir = join(projectCwd, ".claude");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(getProjectEnvPath(projectCwd), JSON.stringify(config, null, 2), { mode: 0o600 });
}

/** Build the merged env for a project: process.env → global integrations → project-specific */
// Ensure PATH includes common tool locations (Electrobun bundles have limited PATH)
const EXTRA_PATH_DIRS = [
  join(HOME, ".local/share/mise/shims"),
  join(HOME, ".local/bin"),
  join(HOME, ".bun/bin"),
  "/opt/homebrew/bin",
  "/usr/local/bin",
  join(HOME, ".nvm/versions/node", "*/bin"), // nvm
].join(":");

function buildProjectEnv(projectCwd: string): Record<string, string> {
  const env = { ...process.env } as Record<string, string>;
  // Augment PATH for Electrobun bundles
  env.PATH = `${EXTRA_PATH_DIRS}:${env.PATH || "/usr/bin:/bin"}`;
  const globalConfig = loadIntegrations();
  const projectConfig = loadProjectEnv(projectCwd);

  // Global Supabase (fallback)
  if (globalConfig.supabase?.url) {
    env.SUPABASE_URL = globalConfig.supabase.url;
    env.SUPABASE_ANON_KEY = globalConfig.supabase.anonKey;
  }

  // Global AWS profile (fallback)
  if (globalConfig.aws?.activeProfile) {
    env.AWS_PROFILE = globalConfig.aws.activeProfile;
  }

  // Project-level Supabase overrides global
  if (projectConfig.supabase?.url) {
    env.SUPABASE_URL = projectConfig.supabase.url;
    env.SUPABASE_ANON_KEY = projectConfig.supabase.anonKey || "";
  }

  // Project-level AWS profile overrides global
  if (projectConfig.aws?.profile) {
    env.AWS_PROFILE = projectConfig.aws.profile;
  }

  // Project-level custom env vars (highest priority)
  if (projectConfig.env) {
    for (const [key, val] of Object.entries(projectConfig.env)) {
      env[key] = val;
    }
  }

  // Inject LLM API keys from AI Models settings into the environment
  // This bridges AI Models credentials → CLI agents (Claude Code, Kiro, etc.)
  const llmKeys = getLLMKeys();

  // Anthropic: direct API key → Claude Code uses it instead of subscription
  if (llmKeys.anthropicApiKey) {
    env.ANTHROPIC_API_KEY = llmKeys.anthropicApiKey;
  }

  // AWS Bedrock: configure Claude Code to use Bedrock
  if (llmKeys.bedrockApiKey) {
    if (llmKeys.bedrockApiKey.startsWith("profile:")) {
      const profile = llmKeys.bedrockApiKey.slice(8);
      env.AWS_PROFILE = profile;
      env.AWS_REGION = env.AWS_REGION || "us-east-1";
    }
    // Enable Bedrock mode for Claude Code if no direct Anthropic key
    if (!llmKeys.anthropicApiKey) {
      env.CLAUDE_CODE_USE_BEDROCK = "1";
      env.AWS_REGION = env.AWS_REGION || "us-east-1";
    }
  }

  // OpenAI
  if (llmKeys.openaiApiKey) {
    env.OPENAI_API_KEY = llmKeys.openaiApiKey;
  }

  // Google
  if (llmKeys.googleApiKey) {
    env.GOOGLE_GENERATIVE_AI_API_KEY = llmKeys.googleApiKey;
  }

  // Mistral
  if (llmKeys.mistralApiKey) {
    env.MISTRAL_API_KEY = llmKeys.mistralApiKey;
  }

  // Groq
  if (llmKeys.groqApiKey) {
    env.GROQ_API_KEY = llmKeys.groqApiKey;
  }

  // OpenRouter
  if (llmKeys.openrouterApiKey) {
    env.OPENROUTER_API_KEY = llmKeys.openrouterApiKey;
  }

  // Always clear these for nested Claude sessions
  env.CLAUDECODE = "";
  env.CLAUDE_CODE_ENTRYPOINT = "";

  return env;
}

// GET project env config
app.get("/api/projects/env", (req, res) => {
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
app.put("/api/projects/env", (req, res) => {
  const { cwd, config } = req.body;
  if (!cwd || !config) return res.status(400).json({ error: "cwd and config required" });
  saveProjectEnv(cwd, config);
  res.json({ ok: true });
});

// PATCH project env (merge specific fields)
app.patch("/api/projects/env", (req, res) => {
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
app.delete("/api/projects/env/var", (req, res) => {
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
// PROJECT TYPE DETECTION
// ============================================================

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

app.get("/api/projects/type", (req, res) => {
  const cwd = req.query.cwd as string;
  if (!cwd) return res.status(400).json({ error: "cwd is required" });
  res.json({ type: detectProjectType(cwd) });
});

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

app.get("/api/runtime/detect", (_req, res) => {
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

const devServers = new Map<string, DevServerEntry>();

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

app.post("/api/dev-server/start", (req, res) => {
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

app.get("/api/dev-server/status", (req, res) => {
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
app.get("/api/dev-server/logs", (req, res) => {
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

app.post("/api/dev-server/stop", (req, res) => {
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

// ============================================================
// EMBEDDED BROWSER — full rewriting proxy for iframe embedding
// ============================================================

// Proxy all requests: /api/browser/proxy?url=<encoded-url>
// Strips X-Frame-Options, CSP frame-ancestors, rewrites links to go through proxy
app.get("/api/browser/proxy", async (req, res) => {
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
app.get("/api/browser/local", (req, res) => {
  const port = parseInt(req.query.port as string, 10);
  if (!port || port < 1000 || port > 65535) return res.status(400).json({ error: "Invalid port" });
  // Redirect to the local server — this works because same-origin iframes are allowed
  res.redirect(`http://localhost:${port}${req.query.path || "/"}`);
});

// ============================================================
// HEALTH
// ============================================================

// Open URL in system default browser (macOS: `open`)
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

// ============================================================
// LLM PROVIDER INTEGRATION (Vercel AI SDK)
// ============================================================

interface LLMProviderConfig {
  id: string;
  name: string;
  apiKeyField: string; // key in integrations.json
  models: Array<{ id: string; name: string; context?: number }>;
  createProvider: (apiKey: string) => unknown;
}

// Provider registry — all supported LLM providers
const LLM_PROVIDERS: LLMProviderConfig[] = [
  {
    id: "anthropic", name: "Anthropic", apiKeyField: "anthropicApiKey",
    models: [
      { id: "claude-opus-4-6-20260315", name: "Claude Opus 4.6", context: 200000 },
      { id: "claude-sonnet-4-6-20260315", name: "Claude Sonnet 4.6", context: 200000 },
      { id: "claude-haiku-4-5-20251001", name: "Claude Haiku 4.5", context: 200000 },
    ],
    createProvider: (apiKey) => createAnthropic({ apiKey }),
  },
  {
    id: "openai", name: "OpenAI", apiKeyField: "openaiApiKey",
    models: [
      { id: "gpt-4o", name: "GPT-4o", context: 128000 },
      { id: "gpt-4o-mini", name: "GPT-4o Mini", context: 128000 },
      { id: "o3-mini", name: "o3-mini (reasoning)", context: 200000 },
    ],
    createProvider: (apiKey) => createOpenAI({ apiKey }),
  },
  {
    id: "bedrock", name: "AWS Bedrock", apiKeyField: "bedrockApiKey",
    models: [
      { id: "us.anthropic.claude-sonnet-4-6", name: "Claude Sonnet 4.6 (Bedrock)", context: 200000 },
      { id: "global.anthropic.claude-haiku-4-5-20251001-v1:0", name: "Claude Haiku 4.5 (Bedrock)", context: 200000 },
      { id: "us.anthropic.claude-sonnet-4-20250514-v1:0", name: "Claude Sonnet 4 (Bedrock)", context: 200000 },
      { id: "global.anthropic.claude-opus-4-5-20251101-v1:0", name: "Claude Opus 4.5 (Bedrock)", context: 200000 },
    ],
    createProvider: (config) => {
      // Config can be: empty (auto-detect), "profile:name", or an API key
      if (!config) {
        return createAmazonBedrock({ region: "us-east-1" });
      }
      if (config.startsWith("profile:")) {
        const profile = config.slice(8);
        // Set AWS_PROFILE so the credential chain picks it up
        process.env.AWS_PROFILE = profile;
        return createAmazonBedrock({ region: "us-east-1" });
      }
      // Otherwise treat as Bedrock API key
      return createAmazonBedrock({ apiKey: config, region: "us-east-1" });
    },
  },
  {
    id: "google", name: "Google", apiKeyField: "googleApiKey",
    models: [
      { id: "gemini-2.5-pro-latest", name: "Gemini 2.5 Pro", context: 1000000 },
      { id: "gemini-2.5-flash-latest", name: "Gemini 2.5 Flash", context: 1000000 },
    ],
    createProvider: (apiKey) => createGoogleGenerativeAI({ apiKey }),
  },
  {
    id: "mistral", name: "Mistral", apiKeyField: "mistralApiKey",
    models: [
      { id: "mistral-large-latest", name: "Mistral Large", context: 128000 },
      { id: "mistral-small-latest", name: "Mistral Small", context: 128000 },
    ],
    createProvider: (apiKey) => createMistral({ apiKey }),
  },
  {
    id: "xai", name: "xAI Grok", apiKeyField: "xaiApiKey",
    models: [
      { id: "grok-3", name: "Grok-3", context: 131072 },
      { id: "grok-3-mini", name: "Grok-3 Mini", context: 131072 },
    ],
    createProvider: (apiKey) => createXai({ apiKey }),
  },
  {
    id: "groq", name: "Groq", apiKeyField: "groqApiKey",
    models: [
      { id: "llama-3.3-70b-versatile", name: "Llama 3.3 70B (Groq)", context: 128000 },
      { id: "deepseek-r1-distill-llama-70b", name: "DeepSeek R1 70B (Groq)", context: 128000 },
    ],
    createProvider: (apiKey) => createGroq({ apiKey }),
  },
  {
    id: "deepseek", name: "DeepSeek", apiKeyField: "deepseekApiKey",
    models: [
      { id: "deepseek-chat", name: "DeepSeek Chat", context: 64000 },
      { id: "deepseek-reasoner", name: "DeepSeek Reasoner", context: 64000 },
    ],
    createProvider: (apiKey) => createDeepSeek({ apiKey }),
  },
  {
    id: "cohere", name: "Cohere", apiKeyField: "cohereApiKey",
    models: [
      { id: "command-r-plus", name: "Command R+", context: 128000 },
      { id: "command-r", name: "Command R", context: 128000 },
    ],
    createProvider: (apiKey) => createCohere({ apiKey }),
  },
  {
    id: "togetherai", name: "Together AI", apiKeyField: "togetheraiApiKey",
    models: [
      { id: "meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo", name: "Llama 3.1 405B", context: 130000 },
      { id: "Qwen/Qwen2.5-72B-Instruct-Turbo", name: "Qwen 2.5 72B", context: 32768 },
    ],
    createProvider: (apiKey) => createTogetherAI({ apiKey }),
  },
  {
    id: "openrouter", name: "OpenRouter", apiKeyField: "openrouterApiKey",
    models: [
      { id: "anthropic/claude-sonnet-4.6", name: "Claude Sonnet 4.6 (OR)", context: 200000 },
      { id: "openai/gpt-4o", name: "GPT-4o (OR)", context: 128000 },
      { id: "google/gemini-2.5-pro", name: "Gemini 2.5 Pro (OR)", context: 1000000 },
      { id: "meta-llama/llama-3.3-70b-instruct", name: "Llama 3.3 70B (OR)", context: 128000 },
      { id: "deepseek/deepseek-r1", name: "DeepSeek R1 (OR)", context: 64000 },
    ],
    createProvider: (apiKey) => createOpenAI({ apiKey, baseURL: "https://openrouter.ai/api/v1" }),
  },
];

// Get configured LLM API keys from integrations
function getLLMKeys(): Record<string, string> {
  const config = loadIntegrations();
  return (config as Record<string, unknown>).llm as Record<string, string> || {};
}

function saveLLMKeys(keys: Record<string, string>) {
  const config = loadIntegrations();
  (config as Record<string, unknown>).llm = keys;
  saveIntegrations(config);
}

// GET /api/llm/providers — list all providers with configuration status
app.get("/api/llm/providers", (_req, res) => {
  const keys = getLLMKeys();
  const providers = LLM_PROVIDERS.map((p) => ({
    id: p.id,
    name: p.name,
    configured: p.id === "bedrock"
      ? !!(keys[p.apiKeyField] || existsSync(join(HOME, ".aws/credentials")))
      : !!keys[p.apiKeyField],
    models: p.models,
    apiKeyField: p.apiKeyField,
  }));
  res.json(providers);
});

// GET /api/llm/models — all models from configured providers
app.get("/api/llm/models", (_req, res) => {
  const keys = getLLMKeys();
  const models: Array<{ provider: string; providerName: string; id: string; name: string; context?: number }> = [];
  for (const p of LLM_PROVIDERS) {
    const configured = p.id === "bedrock"
      ? !!(keys[p.apiKeyField] || existsSync(join(HOME, ".aws/credentials")))
      : !!keys[p.apiKeyField];
    if (configured) {
      for (const m of p.models) {
        models.push({ provider: p.id, providerName: p.name, ...m });
      }
    }
  }
  res.json(models);
});

// PUT /api/llm/keys — save API keys for providers
app.put("/api/llm/keys", (req, res) => {
  const { keys } = req.body;
  if (!keys || typeof keys !== "object") return res.status(400).json({ error: "keys object required" });
  const existing = getLLMKeys();
  saveLLMKeys({ ...existing, ...keys });
  res.json({ ok: true });
});

// GET /api/llm/keys — get configured keys (masked)
app.get("/api/llm/keys", (_req, res) => {
  const keys = getLLMKeys();
  const masked: Record<string, string> = {};
  for (const [k, v] of Object.entries(keys)) {
    masked[k] = v ? maskSecret(v) : "";
  }
  res.json(masked);
});

// POST /api/llm/chat — streaming chat with any configured provider/model
app.post("/api/llm/chat", async (req, res) => {
  const { provider: providerId, model: modelId, messages, system } = req.body;
  if (!providerId || !modelId || !messages) {
    return res.status(400).json({ error: "provider, model, and messages are required" });
  }

  const providerConfig = LLM_PROVIDERS.find((p) => p.id === providerId);
  if (!providerConfig) return res.status(404).json({ error: `Unknown provider: ${providerId}` });

  const keys = getLLMKeys();
  // Bedrock: use saved API key, or fall back to AWS credential chain (empty string triggers auto-detect)
  const apiKey = keys[providerConfig.apiKeyField] || (providerId === "bedrock" ? "" : "");
  if (!apiKey) {
    return res.status(401).json({ error: `No API key configured for ${providerConfig.name}. Add it in Settings → AI Providers.` });
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const provider = providerConfig.createProvider(apiKey) as any;
    const model = provider(modelId);

    // Set up SSE streaming
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const result = streamText({
      model,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant" | "system",
        content: m.content,
      })),
      system: system || undefined,
    });

    // Stream text chunks as SSE
    for await (const chunk of result.textStream) {
      res.write(`data: ${JSON.stringify({ type: "chunk", content: chunk })}\n\n`);
    }

    // Send done event with usage stats
    res.write(`data: ${JSON.stringify({ type: "done", usage: await result.usage })}\n\n`);
    res.end();
  } catch (err: unknown) {
    console.error("LLM chat error:", err);
    const msg = err instanceof Error ? `${err.name}: ${err.message}` : "LLM request failed";
    if (!res.headersSent) {
      res.status(500).json({ error: msg });
    } else {
      res.write(`data: ${JSON.stringify({ type: "error", error: msg })}\n\n`);
      res.end();
    }
  }
});

// POST /api/llm/test — test a provider connection
app.post("/api/llm/test", async (req, res) => {
  const { provider: providerId, apiKey } = req.body;
  if (!providerId || !apiKey) return res.status(400).json({ error: "provider and apiKey required" });

  const providerConfig = LLM_PROVIDERS.find((p) => p.id === providerId);
  if (!providerConfig) return res.status(404).json({ error: `Unknown provider: ${providerId}` });

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const provider = providerConfig.createProvider(apiKey) as any;
    const model = provider(providerConfig.models[0].id);

    // Use generateText (not stream) — it fails immediately on auth errors
    const { text } = await generateText({
      model,
      messages: [{ role: "user" as const, content: "Say hi in one word." }],
      maxOutputTokens: 10,
    });

    res.json({ ok: true, response: text.trim() || "Connected" });
  } catch (err: unknown) {
    console.error("LLM test error:", err);
    // Extract useful error message
    const e = err as { message?: string; name?: string; statusCode?: number; responseBody?: string };
    let msg = e.message || "Connection failed";
    // Clean up AI SDK error prefixes
    msg = msg.replace(/^[A-Z_]+\s*\[AI_\w+\]:\s*/, "");
    if (msg.length > 120) msg = msg.slice(0, 120) + "...";
    res.status(400).json({ ok: false, error: msg });
  }
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

app.get("/api/memory/status", async (_req, res) => {
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

app.get("/api/memory/search", async (req, res) => {
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

app.get("/api/memory/observations", async (req, res) => {
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

// ============================================================
// HEALTH
// ============================================================

app.get("/api/health", async (_req, res) => {
  const llmKeys = getLLMKeys();
  const bridgedCredentials: string[] = [];
  if (llmKeys.anthropicApiKey) bridgedCredentials.push("anthropic→ANTHROPIC_API_KEY");
  if (llmKeys.bedrockApiKey) bridgedCredentials.push("bedrock→CLAUDE_CODE_USE_BEDROCK");
  if (llmKeys.openaiApiKey) bridgedCredentials.push("openai→OPENAI_API_KEY");
  if (llmKeys.googleApiKey) bridgedCredentials.push("google→GOOGLE_GENERATIVE_AI_API_KEY");
  if (llmKeys.groqApiKey) bridgedCredentials.push("groq→GROQ_API_KEY");
  if (llmKeys.openrouterApiKey) bridgedCredentials.push("openrouter→OPENROUTER_API_KEY");

  // Check claude-mem worker health (non-blocking, fast timeout)
  const memRes = await fetchClaudeMemWorker("/health", 1500);
  const memoryWorkerHealthy = memRes?.ok ?? false;

  res.json({
    ok: true,
    sessions: sessions.size,
    activity: activity.length,
    defaultRuntime: defaultContainerRuntime || "native",
    devServers: devServers.size,
    bridgedCredentials,
    memory: {
      workerHealthy: memoryWorkerHealthy,
      port: 37777,
    },
    projectRoot: PROJECT_ROOT,
    claudeDir: CLAUDE_DIR,
  });
});

// SPA fallback — serve index.html for all non-API routes
if (distPath) {
  app.get("*", (_req, res) => {
    res.sendFile(join(distPath, "index.html"));
  });
}

app.listen(PORT, "127.0.0.1", () => {
  console.log(`API server running on http://127.0.0.1:${PORT}`);
});

// --- Graceful shutdown: kill child processes ---
function cleanupChildProcesses() {
  console.log("Cleaning up child processes...");
  for (const sess of claudeSessions.values()) {
    if (sess.process) {
      try { sess.process.kill("SIGTERM"); } catch {}
    }
  }
  for (const entry of opsProcesses.values()) {
    if (entry.process) {
      try { entry.process.kill("SIGTERM"); } catch {}
    }
  }
  for (const entry of devServers.values()) {
    if (entry.containerId && entry.runtime !== "native") {
      try { execFileSync(entry.runtime, ["rm", "-f", entry.containerId], { encoding: "utf-8", timeout: 5000 }); } catch {}
    }
    if (entry.process) {
      try { entry.process.kill("SIGTERM"); } catch {}
    }
  }
  persistSessions();
}

process.on("SIGTERM", () => { cleanupChildProcesses(); process.exit(0); });
process.on("SIGINT", () => { cleanupChildProcesses(); process.exit(0); });

// --- SSE heartbeat: detect dead clients every 30s ---
setInterval(() => {
  for (const [id, clients] of sseClients.entries()) {
    for (const client of clients) {
      try { client.write(":heartbeat\n\n"); }
      catch { clients.delete(client); }
    }
    if (clients.size === 0) sseClients.delete(id);
  }
}, 30_000);

export { app };
