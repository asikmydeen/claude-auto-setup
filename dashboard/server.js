#!/usr/bin/env node
"use strict";

const express = require("express");
const path = require("path");
const fs = require("fs");
const { execFileSync } = require("child_process");

// --- Config ---
const PORT = parseInt(process.env.DASHBOARD_PORT || "3200", 10);
const DASHBOARD_DIR =
  process.env.DASHBOARD_DIR || path.join(process.env.HOME, ".claude-dashboard");
const SESSIONS_DIR = path.join(DASHBOARD_DIR, "sessions");
const POLL_INTERVAL = 2000; // ms — process detection interval

// Ensure dirs exist
fs.mkdirSync(SESSIONS_DIR, { recursive: true });

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// --- SSE clients ---
const sseClients = new Set();

function broadcast(event, data) {
  const msg = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
  for (const res of sseClients) {
    res.write(msg);
  }
}

// --- Session & Agent State ---

function readJsonSafe(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch {
    return null;
  }
}

function getAllSessions() {
  const sessions = [];
  if (!fs.existsSync(SESSIONS_DIR)) return sessions;

  for (const dir of fs.readdirSync(SESSIONS_DIR)) {
    const sessionPath = path.join(SESSIONS_DIR, dir);
    if (!fs.statSync(sessionPath).isDirectory()) continue;

    const sessionFile = path.join(sessionPath, "session.json");
    const session = readJsonSafe(sessionFile) || {
      id: dir,
      status: "unknown",
    };
    session.id = dir;

    // Read agents
    const agentsDir = path.join(sessionPath, "agents");
    session.agents = [];
    if (fs.existsSync(agentsDir)) {
      for (const af of fs.readdirSync(agentsDir)) {
        if (!af.endsWith(".json")) continue;
        const agent = readJsonSafe(path.join(agentsDir, af));
        if (agent) session.agents.push(agent);
      }
    }

    // Read checkpoint if exists
    const checkpointFile = path.join(sessionPath, "checkpoint.json");
    session.checkpoint = readJsonSafe(checkpointFile);

    sessions.push(session);
  }

  // Sort: active first, then by last_update desc
  sessions.sort((a, b) => {
    if (a.status === "active" && b.status !== "active") return -1;
    if (b.status === "active" && a.status !== "active") return 1;
    return (b.last_update || 0) - (a.last_update || 0);
  });

  return sessions;
}

// --- Process detection ---
function detectClaudeSessions() {
  try {
    const output = execFileSync("pgrep", ["-af", "claude"], {
      encoding: "utf-8",
      timeout: 5000,
    }).trim();

    const pids = new Set();
    for (const line of output.split("\n")) {
      if (!line) continue;
      // Skip dashboard process itself
      if (line.includes("dashboard") || line.includes("server.js")) continue;
      const pid = line.trim().split(/\s+/)[0];
      if (pid) pids.add(pid);
    }
    return pids;
  } catch {
    return new Set();
  }
}

// Periodic process scan to detect sessions that didn't register via hook
let lastKnownPids = new Set();
setInterval(() => {
  const currentPids = detectClaudeSessions();

  // Detect new PIDs
  for (const pid of currentPids) {
    if (!lastKnownPids.has(pid)) {
      // Check if this PID already has a session
      const sessions = getAllSessions();
      const hasSession = sessions.some((s) => String(s.pid) === String(pid));
      if (!hasSession) {
        // Auto-create a session for unregistered Claude process
        const sessionId = `auto-${pid}-${Date.now()}`;
        const sessionDir = path.join(SESSIONS_DIR, sessionId);
        fs.mkdirSync(path.join(sessionDir, "agents"), { recursive: true });
        const sessionData = {
          id: sessionId,
          pid: pid,
          status: "active",
          started_at: new Date().toISOString(),
          last_update: Date.now(),
          source: "auto-detected",
          cwd: getProcessCwd(pid),
        };
        fs.writeFileSync(
          path.join(sessionDir, "session.json"),
          JSON.stringify(sessionData, null, 2)
        );
        broadcast("session:new", sessionData);
      }
    }
  }

  // Mark gone PIDs as completed
  for (const pid of lastKnownPids) {
    if (!currentPids.has(pid)) {
      markSessionCompleted(pid);
    }
  }

  lastKnownPids = currentPids;
}, POLL_INTERVAL);

function getProcessCwd(pid) {
  try {
    return fs.readlinkSync(`/proc/${pid}/cwd`);
  } catch {
    return "unknown";
  }
}

function markSessionCompleted(pid) {
  if (!fs.existsSync(SESSIONS_DIR)) return;
  for (const dir of fs.readdirSync(SESSIONS_DIR)) {
    const sessionFile = path.join(SESSIONS_DIR, dir, "session.json");
    const session = readJsonSafe(sessionFile);
    if (session && String(session.pid) === String(pid) && session.status === "active") {
      session.status = "completed";
      session.completed_at = new Date().toISOString();
      session.last_update = Date.now();
      fs.writeFileSync(sessionFile, JSON.stringify(session, null, 2));
      broadcast("session:update", session);
    }
  }
}

// --- File watcher for agent state changes ---
let chokidar;
try {
  chokidar = require("chokidar");
} catch {
  console.log(
    "chokidar not installed — using polling for file changes. Run: npm install"
  );
}

if (chokidar) {
  const watcher = chokidar.watch(SESSIONS_DIR, {
    ignoreInitial: true,
    depth: 3,
    awaitWriteFinish: { stabilityThreshold: 300 },
  });

  watcher.on("change", (filePath) => {
    const data = readJsonSafe(filePath);
    if (!data) return;

    if (filePath.endsWith("session.json")) {
      broadcast("session:update", data);
    } else if (filePath.includes("/agents/")) {
      const sessionId = path.basename(path.dirname(path.dirname(filePath)));
      broadcast("agent:update", { sessionId, agent: data });
    }
  });

  watcher.on("add", (filePath) => {
    const data = readJsonSafe(filePath);
    if (!data) return;

    if (filePath.endsWith("session.json")) {
      broadcast("session:new", data);
    } else if (filePath.includes("/agents/")) {
      const sessionId = path.basename(path.dirname(path.dirname(filePath)));
      broadcast("agent:new", { sessionId, agent: data });
    }
  });

  watcher.on("unlink", (filePath) => {
    if (filePath.includes("/agents/")) {
      const agentId = path.basename(filePath, ".json");
      const sessionId = path.basename(path.dirname(path.dirname(filePath)));
      broadcast("agent:removed", { sessionId, agentId });
    }
  });
}

// --- API Routes ---

// SSE endpoint
app.get("/api/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.flushHeaders();

  sseClients.add(res);
  // Send current state
  res.write(
    `event: init\ndata: ${JSON.stringify(getAllSessions())}\n\n`
  );

  req.on("close", () => sseClients.delete(res));
});

// Register a new session (called by SessionStart hook)
app.post("/api/sessions", (req, res) => {
  const { id, pid, cwd, project, providers } = req.body;
  const sessionId = id || `session-${Date.now()}`;
  const sessionDir = path.join(SESSIONS_DIR, sessionId);

  fs.mkdirSync(path.join(sessionDir, "agents"), { recursive: true });

  const sessionData = {
    id: sessionId,
    pid: pid || null,
    status: "active",
    cwd: cwd || "unknown",
    project: project || path.basename(cwd || "unknown"),
    providers: providers || [],
    started_at: new Date().toISOString(),
    last_update: Date.now(),
    source: "hook",
  };

  fs.writeFileSync(
    path.join(sessionDir, "session.json"),
    JSON.stringify(sessionData, null, 2)
  );
  broadcast("session:new", sessionData);
  res.json({ ok: true, sessionId });
});

// Update session
app.patch("/api/sessions/:id", (req, res) => {
  const sessionId = req.params.id;
  const sessionDir = path.join(SESSIONS_DIR, sessionId);
  const sessionFile = path.join(sessionDir, "session.json");
  if (!fs.existsSync(sessionFile))
    return res.status(404).json({ error: "not found" });

  const session = readJsonSafe(sessionFile) || {};
  Object.assign(session, req.body, { last_update: Date.now() });
  fs.writeFileSync(sessionFile, JSON.stringify(session, null, 2));
  broadcast("session:update", session);
  res.json({ ok: true });
});

// Report agent state (called by agents via Bash)
app.post("/api/sessions/:sessionId/agents", (req, res) => {
  const { sessionId } = req.params;
  const sessionDir = path.join(SESSIONS_DIR, sessionId);
  const agentsDir = path.join(sessionDir, "agents");

  if (!fs.existsSync(sessionDir)) {
    fs.mkdirSync(agentsDir, { recursive: true });
  }

  const agentData = {
    ...req.body,
    last_update: new Date().toISOString(),
  };
  const agentId = agentData.id || `agent-${Date.now()}`;
  agentData.id = agentId;

  fs.writeFileSync(
    path.join(agentsDir, `${agentId}.json`),
    JSON.stringify(agentData, null, 2)
  );
  broadcast("agent:update", { sessionId, agent: agentData });
  res.json({ ok: true, agentId });
});

// Send steering command to an agent
app.post("/api/sessions/:sessionId/steer", (req, res) => {
  const { sessionId } = req.params;
  const { agentId, command, payload } = req.body;
  const sessionDir = path.join(SESSIONS_DIR, sessionId);
  const commandsDir = path.join(sessionDir, "commands");

  fs.mkdirSync(commandsDir, { recursive: true });

  const cmd = {
    id: `cmd-${Date.now()}`,
    agentId,
    command,
    payload,
    created_at: new Date().toISOString(),
    status: "pending",
  };

  fs.writeFileSync(
    path.join(commandsDir, `${cmd.id}.json`),
    JSON.stringify(cmd, null, 2)
  );
  broadcast("command:new", { sessionId, command: cmd });
  res.json({ ok: true, commandId: cmd.id });
});

// Read pending commands for an agent (polled by orchestrator)
app.get("/api/sessions/:sessionId/commands", (req, res) => {
  const commandsDir = path.join(
    SESSIONS_DIR,
    req.params.sessionId,
    "commands"
  );
  if (!fs.existsSync(commandsDir)) return res.json([]);

  const commands = [];
  for (const f of fs.readdirSync(commandsDir)) {
    if (!f.endsWith(".json")) continue;
    const cmd = readJsonSafe(path.join(commandsDir, f));
    if (cmd && cmd.status === "pending") commands.push(cmd);
  }
  res.json(commands);
});

// Acknowledge a command
app.patch("/api/sessions/:sessionId/commands/:cmdId", (req, res) => {
  const cmdFile = path.join(
    SESSIONS_DIR,
    req.params.sessionId,
    "commands",
    `${req.params.cmdId}.json`
  );
  if (!fs.existsSync(cmdFile))
    return res.status(404).json({ error: "not found" });

  const cmd = readJsonSafe(cmdFile) || {};
  Object.assign(cmd, req.body);
  fs.writeFileSync(cmdFile, JSON.stringify(cmd, null, 2));
  res.json({ ok: true });
});

// Get all sessions
app.get("/api/sessions", (_req, res) => {
  res.json(getAllSessions());
});

// Delete old sessions (cleanup)
app.delete("/api/sessions/:id", (req, res) => {
  const sessionDir = path.join(SESSIONS_DIR, req.params.id);
  if (fs.existsSync(sessionDir)) {
    fs.rmSync(sessionDir, { recursive: true });
    broadcast("session:removed", { id: req.params.id });
  }
  res.json({ ok: true });
});

// Health check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    sessions: getAllSessions().length,
    activeSessions: getAllSessions().filter((s) => s.status === "active").length,
  });
});

// --- Start ---
const server = app.listen(PORT, () => {
  console.log(`\nClaude Agent Dashboard running at http://localhost:${PORT}\n`);
  console.log(`   State dir: ${DASHBOARD_DIR}`);
  console.log(`   Watching for Claude Code sessions...\n`);

  // Auto-open browser if --open flag
  if (process.argv.includes("--open")) {
    const url = `http://localhost:${PORT}`;
    try {
      const { platform } = require("os");
      const openCmd =
        platform() === "darwin"
          ? "open"
          : platform() === "win32"
            ? "start"
            : "xdg-open";
      require("child_process").execFileSync(openCmd, [url], { stdio: "ignore" });
    } catch {
      // ignore — browser open is best-effort
    }
  }
});

// Graceful shutdown
process.on("SIGTERM", () => {
  server.close();
  process.exit(0);
});

process.on("SIGINT", () => {
  server.close();
  process.exit(0);
});
