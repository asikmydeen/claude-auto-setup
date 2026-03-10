import express from "express";
import cors from "cors";
import { randomUUID } from "crypto";
import { readFileSync, readdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3201;

app.use(cors());
app.use(express.json());

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

app.post("/api/sessions", (req, res) => {
  const session = {
    id: req.body.id || randomUUID().slice(0, 12),
    startedAt: new Date().toISOString(),
    agents: [],
    project: req.body.project || null,
    phase: req.body.phase || "idle",
    ...req.body,
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
  const agentData = { ...req.body, updatedAt: new Date().toISOString() };
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
    ...req.body,
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
    ...req.body,
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

app.listen(PORT, () => {
  console.log(`Dashboard API server running on http://localhost:${PORT}`);
});
