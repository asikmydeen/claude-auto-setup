/**
 * Dashboard sessions, agents, and activity routes.
 *
 * These are the orchestration dashboard endpoints (NOT the same as Claude chat sessions).
 * They track agent states, steering commands, and activity logs for the multi-agent
 * orchestration dashboard UI.
 */
import { Router } from "express";
import { randomUUID } from "crypto";
import { sanitize } from "../lib/shared";

const router = Router();

// --- Dashboard-specific types (NOT the same as ClaudeSession) ---

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

// --- State ---

const sessions = new Map<string, Session>();
const activity: Array<Record<string, unknown>> = [];

// --- Field allowlists ---

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

// ============================================================
// SESSIONS
// ============================================================

router.get("/api/sessions", (_req, res) => {
  res.json([...sessions.values()]);
});

router.get("/api/sessions/:id", (req, res) => {
  const session = sessions.get(req.params.id);
  if (!session) return res.status(404).json({ error: "Session not found" });
  res.json(session);
});

router.post("/api/sessions", (req, res) => {
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

router.post("/api/sessions/:id/agents", (req, res) => {
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

router.post("/api/sessions/:id/steering", (req, res) => {
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

router.get("/api/sessions/:id/commands", (req, res) => {
  const session = sessions.get(req.params.id);
  if (!session) return res.json([]);
  const commands = session.steeringCommands || [];
  session.steeringCommands = [];
  res.json(commands);
});

// ============================================================
// ACTIVITY
// ============================================================

router.get("/api/activity", (_req, res) => {
  res.json(activity.slice().reverse());
});

router.post("/api/activity", (req, res) => {
  const entry = {
    id: randomUUID().slice(0, 12),
    timestamp: new Date().toISOString(),
    ...sanitize(req.body, ACTIVITY_FIELDS),
  };
  activity.push(entry);
  if (activity.length > 1000) activity.splice(0, activity.length - 1000);
  res.status(201).json(entry);
});

export default router;
