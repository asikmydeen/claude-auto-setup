import express from "express";
import cors from "cors";
import { randomUUID } from "crypto";
import { readFileSync, readdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3201;

app.use(cors({
  origin: ["http://localhost:3200", "http://127.0.0.1:3200"],
  maxAge: 86400,
}));
app.use(express.json({ limit: "100kb" }));

// In-memory storage (file-based persistence could be added later)
const sessions = new Map();
const activity = [];

// --- Sessions API ---
app.get("/api/sessions", (_req, res) => {
  res.json([...sessions.values()]);
});

app.get("/api/sessions/:id", (req, res) => {
  const session = sessions.get(req.params.id);
  if (!session) return res.status(404).json({ error: "Session not found" });
  res.json(session);
});

// Sanitize input — pick only known fields, reject proto pollution keys
function sanitize(obj, allowed) {
  const clean = {};
  for (const key of allowed) {
    if (obj[key] !== undefined && key !== "__proto__" && key !== "constructor" && key !== "prototype") {
      clean[key] = typeof obj[key] === "string" ? obj[key].slice(0, 500) : obj[key];
    }
  }
  return clean;
}

const SESSION_FIELDS = ["id", "project", "phase", "description", "pid", "cwd"];
const AGENT_FIELDS = ["id", "role", "status", "task", "progress", "model"];
const ACTIVITY_FIELDS = ["actor", "action", "entity", "details"];
const STEERING_FIELDS = ["command", "target", "message"];

app.post("/api/sessions", (req, res) => {
  const data = sanitize(req.body, SESSION_FIELDS);
  const session = {
    id: data.id || randomUUID().slice(0, 12),
    startedAt: new Date().toISOString(),
    agents: [],
    project: data.project || null,
    phase: data.phase || "idle",
    ...data,
  };
  sessions.set(session.id, session);
  res.status(201).json(session);
});

app.post("/api/sessions/:id/agents", (req, res) => {
  const session = sessions.get(req.params.id);
  if (!session) {
    // Auto-create session if it doesn't exist
    const newSession = {
      id: req.params.id,
      startedAt: new Date().toISOString(),
      agents: [],
      phase: "active",
    };
    sessions.set(req.params.id, newSession);
  }
  const s = sessions.get(req.params.id);
  const agentData = { ...sanitize(req.body, AGENT_FIELDS), updatedAt: new Date().toISOString() };
  const idx = s.agents.findIndex((a) => a.id === agentData.id);
  if (idx >= 0) {
    s.agents[idx] = agentData;
  } else {
    s.agents.push(agentData);
  }
  res.json(agentData);
});

app.post("/api/sessions/:id/steering", (req, res) => {
  const session = sessions.get(req.params.id);
  if (!session) return res.status(404).json({ error: "Session not found" });
  if (!session.steeringCommands) session.steeringCommands = [];
  session.steeringCommands.push({
    ...sanitize(req.body, STEERING_FIELDS),
    id: randomUUID().slice(0, 8),
    timestamp: new Date().toISOString(),
  });
  res.json({ ok: true });
});

app.get("/api/sessions/:id/commands", (req, res) => {
  const session = sessions.get(req.params.id);
  if (!session) return res.json([]);
  const commands = session.steeringCommands || [];
  session.steeringCommands = []; // clear after reading
  res.json(commands);
});

// --- Activity API ---
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
  // Keep last 1000 entries
  if (activity.length > 1000) activity.splice(0, activity.length - 1000);
  res.status(201).json(entry);
});

// --- Skills API (reads from universal/commands/*.md) ---
app.get("/api/skills", (_req, res) => {
  const commandsDir = join(__dirname, "../../universal/commands");
  if (!existsSync(commandsDir)) return res.json([]);

  const skills = [];
  for (const file of readdirSync(commandsDir)) {
    if (!file.endsWith(".md")) continue;
    try {
      const content = readFileSync(join(commandsDir, file), "utf-8");
      const frontmatter = parseFrontmatter(content);
      skills.push({
        name: frontmatter.name || file.replace(".md", ""),
        description: frontmatter.description || "",
        category: frontmatter.category || "general",
        complexity: frontmatter.complexity || "medium",
        triggers: frontmatter.triggers || [file.replace(".md", "")],
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

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fm = {};
  for (const line of match[1].split("\n")) {
    const [key, ...rest] = line.split(":");
    if (key && rest.length) {
      let val = rest.join(":").trim();
      // Handle arrays like [a, b, c]
      if (val.startsWith("[") && val.endsWith("]")) {
        val = val.slice(1, -1).split(",").map((s) => s.trim().replace(/^["']|["']$/g, ""));
      }
      fm[key.trim()] = val;
    }
  }
  return fm;
}

// --- Health ---
app.get("/api/health", (_req, res) => {
  res.json({ ok: true, sessions: sessions.size, activity: activity.length });
});

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Dashboard API server running on http://127.0.0.1:${PORT}`);
});
