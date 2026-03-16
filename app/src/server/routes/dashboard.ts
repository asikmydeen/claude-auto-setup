/**
 * Dashboard sessions, agents, and activity routes.
 *
 * These are the orchestration dashboard endpoints (NOT the same as Claude chat sessions).
 * They track agent states, steering commands, and activity logs for the multi-agent
 * orchestration dashboard UI.
 */
import { Elysia } from "elysia";
import { randomUUID } from "crypto";
import { sanitize } from "../lib/shared";

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

export const dashboardRoutes = new Elysia()

  .get("/api/sessions", () => {
    return [...sessions.values()];
  })

  .get("/api/sessions/:id", ({ params, set }) => {
    const session = sessions.get(params.id);
    if (!session) {
      set.status = 404;
      return { error: "Session not found" };
    }
    return session;
  })

  .post("/api/sessions", ({ body, set }) => {
    const data = sanitize(body as Record<string, unknown>, SESSION_FIELDS);
    const session: Session = {
      id: (data.id as string) || randomUUID().slice(0, 12),
      startedAt: new Date().toISOString(),
      agents: [],
      project: (data.project as string) || undefined,
      phase: (data.phase as string) || "idle",
      ...data,
    };
    sessions.set(session.id, session);
    set.status = 201;
    return session;
  })

  .post("/api/sessions/:id/agents", ({ params, body }) => {
    let session = sessions.get(params.id);
    if (!session) {
      session = {
        id: params.id,
        startedAt: new Date().toISOString(),
        agents: [],
        phase: "active",
      };
      sessions.set(params.id, session);
    }
    const agentData = {
      ...sanitize(body as Record<string, unknown>, AGENT_FIELDS),
      updatedAt: new Date().toISOString(),
    } as AgentState;
    const idx = session.agents.findIndex((a) => a.id === agentData.id);
    if (idx >= 0) {
      session.agents[idx] = agentData;
    } else {
      session.agents.push(agentData);
    }
    return agentData;
  })

  .post("/api/sessions/:id/steering", ({ params, body, set }) => {
    const session = sessions.get(params.id);
    if (!session) {
      set.status = 404;
      return { error: "Session not found" };
    }
    if (!session.steeringCommands) session.steeringCommands = [];
    session.steeringCommands.push({
      ...(sanitize(body as Record<string, unknown>, STEERING_FIELDS) as {
        command: string;
        target?: string;
        message?: string;
      }),
      id: randomUUID().slice(0, 8),
      timestamp: new Date().toISOString(),
    });
    return { ok: true };
  })

  .get("/api/sessions/:id/commands", ({ params }) => {
    const session = sessions.get(params.id);
    if (!session) return [];
    const commands = session.steeringCommands || [];
    session.steeringCommands = [];
    return commands;
  })

  // ============================================================
  // ACTIVITY
  // ============================================================

  .get("/api/activity", () => {
    return activity.slice().reverse();
  })

  .post("/api/activity", ({ body, set }) => {
    const entry = {
      id: randomUUID().slice(0, 12),
      timestamp: new Date().toISOString(),
      ...sanitize(body as Record<string, unknown>, ACTIVITY_FIELDS),
    };
    activity.push(entry);
    if (activity.length > 1000) activity.splice(0, activity.length - 1000);
    set.status = 201;
    return entry;
  });
