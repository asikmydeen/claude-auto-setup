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

const app = express();
const PORT = 3201;
const HOME = homedir();
const CLAUDE_DIR = join(HOME, ".claude");
const AGENTS_DIR = join(CLAUDE_DIR, "agents");
const SCRATCH_DIR = join(CLAUDE_DIR, "scratch");
const SETTINGS_PATH = join(CLAUDE_DIR, "settings.json");
const INTEGRATIONS_PATH = join(CLAUDE_DIR, "integrations.json");

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
      .filter(s => s.status !== "running") // Only persist completed sessions
      .map(({ process, ...s }) => s)
      .slice(-50); // Keep last 50 sessions
    writeFileSync(SESSIONS_FILE, JSON.stringify(toSave), { mode: 0o600 });
  } catch {}
}

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
  const { prompt, cwd } = req.body;
  if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const claudePath = execFileSync("which", ["claude"], {
      encoding: "utf-8",
    }).trim();
    if (!claudePath) return res.status(404).json({ error: "Claude CLI not found" });

    const id = randomUUID().slice(0, 12);
    const args = ["-p", prompt.trim(), "--output-format", "stream-json", "--verbose"];
    const env = { ...process.env };
    const envR = env as Record<string, string>;
    envR.CLAUDECODE = "";
    envR.CLAUDE_CODE_ENTRYPOINT = "";

    const sessionCwd = cwd || activeProject;
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
      setTimeout(() => claudeSessions.delete(id), 3600000);
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

  const { prompt } = req.body;
  if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const claudePath = execFileSync("which", ["claude"], {
      encoding: "utf-8",
    }).trim();
    if (!claudePath) return res.status(404).json({ error: "Claude CLI not found" });

    const args = ["-p", prompt.trim(), "--output-format", "stream-json", "--verbose", "--continue"];
    const env = { ...process.env };
    const envR = env as Record<string, string>;
    envR.CLAUDECODE = "";
    envR.CLAUDE_CODE_ENTRYPOINT = "";

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

// Backwards-compatible launch endpoint (creates a session, returns { pid, status })
app.post("/api/claude/launch", (req, res) => {
  const { prompt, flags = [] } = req.body;
  if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const claudePath = execFileSync("which", ["claude"], {
      encoding: "utf-8",
    }).trim();
    if (!claudePath) return res.status(404).json({ error: "Claude not found" });

    const id = randomUUID().slice(0, 12);
    const args = ["-p", prompt.trim(), "--output-format", "stream-json", "--verbose", ...flags];
    const env = { ...process.env };
    const envR = env as Record<string, string>;
    envR.CLAUDECODE = "";
    envR.CLAUDE_CODE_ENTRYPOINT = "";

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

      setTimeout(() => claudeSessions.delete(id), 3600000);
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

// Suggestions cache (10s TTL) to avoid blocking git calls on every request
const suggestionsCache = new Map<string, { data: unknown; timestamp: number }>();
const SUGGESTIONS_TTL = 10_000;

app.get("/api/suggestions", (req, res) => {
  const cwd = (req.query.cwd as string) || activeProject;

  // Check cache
  const cached = suggestionsCache.get(cwd);
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
  suggestionsCache.set(cwd, { data: suggestions, timestamp: Date.now() });
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
// PROJECT CREATOR
// ============================================================

app.post("/api/projects/create", (req, res) => {
  const { name, description, basePath } = req.body;
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

  // Set as active project
  activeProject = projectDir;
  if (!userProjects.some((p) => p.path === projectDir)) {
    userProjects.push({ path: projectDir, name: safeName, addedAt: new Date().toISOString() });
  }

  // Launch Claude session to build the project
  try {
    const claudePath = execFileSync("which", ["claude"], { encoding: "utf-8" }).trim();
    const buildPrompt = `You are creating a new project called "${name}". Here is the user's idea:\n\n${description}\n\nBuild this project from scratch following these requirements:\n1. Use bun as the package manager (bun init, bun add, bun run dev) for maximum speed\n2. Create all necessary files, set up project structure, install dependencies\n3. Implement the core functionality — not just scaffolding, make it actually work\n4. MUST have a working "dev" script in package.json that starts a dev server (e.g. vite, next dev, bun serve)\n5. After creating all files, run "bun install" to install dependencies\n6. Use modern best practices: TypeScript, proper error handling, clean code\n7. Create a brief README.md explaining what was built and how to run it`;

    const id = randomUUID().slice(0, 12);
    const args = ["-p", buildPrompt, "--output-format", "stream-json", "--verbose"];
    const env = { ...process.env };
    const envR = env as Record<string, string>;
    envR.CLAUDECODE = "";
    envR.CLAUDE_CODE_ENTRYPOINT = "";

    // Inject integrations context
    const integrations = loadIntegrations();
    if (integrations.supabase?.url) {
      envR.SUPABASE_URL = integrations.supabase.url;
      envR.SUPABASE_ANON_KEY = integrations.supabase.anonKey;
    }

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
      setTimeout(() => claudeSessions.delete(id), 3600000);
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

  const config = loadIntegrations();
  const env = { ...process.env };
  if (config.aws?.activeProfile) {
    (env as Record<string, string>).AWS_PROFILE = config.aws.activeProfile;
  }
  if (config.supabase?.url) {
    (env as Record<string, string>).SUPABASE_URL = config.supabase.url;
    (env as Record<string, string>).SUPABASE_ANON_KEY = config.supabase.anonKey;
  }

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
// DEV SERVER MANAGEMENT — start/stop/status for project dev servers
// ============================================================

const devServers = new Map<string, { process: ReturnType<typeof spawn>; port: number; cwd: string; status: string; output: string[] }>();

app.post("/api/dev-server/start", (req, res) => {
  const { cwd: projectCwd } = req.body;
  if (!projectCwd) return res.status(400).json({ error: "cwd is required" });

  // Check if already running for this project
  const existing = devServers.get(projectCwd);
  if (existing && existing.status === "running") {
    return res.json({ ok: true, port: existing.port, status: "already-running" });
  }

  // Detect package manager and dev command
  let cmd = "bun";
  let args = ["run", "dev"];
  let port = 5173;

  if (existsSync(join(projectCwd, "bun.lockb")) || existsSync(join(projectCwd, "bun.lock"))) {
    cmd = "bun"; args = ["run", "dev"];
  } else if (existsSync(join(projectCwd, "package-lock.json"))) {
    cmd = "npm"; args = ["run", "dev"];
  } else if (existsSync(join(projectCwd, "yarn.lock"))) {
    cmd = "npx"; args = ["yarn", "dev"];
  } else if (existsSync(join(projectCwd, "pnpm-lock.yaml"))) {
    cmd = "npx"; args = ["pnpm", "dev"];
  }

  // Check if package.json exists and has a dev script
  try {
    const pkg = JSON.parse(readFileSync(join(projectCwd, "package.json"), "utf-8"));
    if (!pkg.scripts?.dev) {
      // Try start instead
      if (pkg.scripts?.start) { args = ["run", "start"]; }
      else { return res.status(400).json({ error: "No dev or start script in package.json" }); }
    }
  } catch {
    return res.status(400).json({ error: "No package.json found. Build the project first." });
  }

  // First install deps if node_modules doesn't exist
  if (!existsSync(join(projectCwd, "node_modules"))) {
    try {
      const installCmd = cmd === "bun" ? "bun" : "npm";
      execFileSync(installCmd, ["install"], { cwd: projectCwd, encoding: "utf-8", timeout: 120_000 });
    } catch {}
  }

  try {
    const child = spawn(cmd, args, {
      cwd: projectCwd,
      stdio: ["ignore", "pipe", "pipe"],
      env: { ...process.env, PORT: String(port), BROWSER: "none" },
    });

    const entry = { process: child, port, cwd: projectCwd, status: "starting", output: [] as string[] };
    devServers.set(projectCwd, entry);

    // Capture output to detect port and ready state
    const onData = (data: Buffer) => {
      const text = data.toString();
      entry.output.push(text);
      // Detect port from common frameworks
      const portMatch = text.match(/(?:localhost|127\.0\.0\.1):(\d{4,5})/);
      if (portMatch) entry.port = parseInt(portMatch[1], 10);
      // Detect ready state
      if (text.includes("ready") || text.includes("Local:") || text.includes("listening") || text.includes("started") || portMatch) {
        entry.status = "running";
      }
    };
    child.stdout?.on("data", onData);
    child.stderr?.on("data", onData);

    child.on("close", (code) => {
      entry.status = code === 0 ? "stopped" : "error";
    });

    // Wait up to 8s for server to start
    let waited = 0;
    const checkReady = setInterval(() => {
      waited += 500;
      if (entry.status === "running" || waited >= 8000) {
        clearInterval(checkReady);
        if (entry.status !== "running") entry.status = "running"; // assume started
        res.json({ ok: true, port: entry.port, status: entry.status });
      }
    }, 500);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to start dev server";
    res.status(500).json({ error: msg });
  }
});

app.get("/api/dev-server/status", (req, res) => {
  const projectCwd = req.query.cwd as string;
  if (!projectCwd) return res.status(400).json({ error: "cwd required" });

  const entry = devServers.get(projectCwd);
  if (!entry) return res.json({ running: false });

  res.json({
    running: entry.status === "running" || entry.status === "starting",
    status: entry.status,
    port: entry.port,
    output: entry.output.slice(-20).join(""),
  });
});

app.post("/api/dev-server/stop", (req, res) => {
  const { cwd: projectCwd } = req.body;
  const entry = devServers.get(projectCwd);
  if (!entry) return res.json({ ok: true });
  try { entry.process.kill("SIGTERM"); } catch {}
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

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    sessions: sessions.size,
    activity: activity.length,
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
