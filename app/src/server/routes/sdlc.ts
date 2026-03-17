// SDLC Overseer API Routes — provides endpoints for the desktop app
// to display epic progress, task board, agent status, and event timeline.

import { Elysia } from "elysia";
import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { Database } from "bun:sqlite";

const HOME = process.env.HOME || process.env.USERPROFILE || "~";
const DB_PATH = join(HOME, ".claude", "data", "overseer.db");

function getOverseerDb(): Database | null {
  if (!existsSync(DB_PATH)) return null;
  try {
    return new Database(DB_PATH, { readonly: true });
  } catch {
    return null;
  }
}

export const sdlcRoutes = new Elysia()

  // --- Epics ---
  .get("/api/sdlc/epics", ({ set }) => {
    const db = getOverseerDb();
    if (!db) { set.status = 503; return { error: "Overseer database not found" }; }
    try {
      const epics = db.prepare("SELECT * FROM epics ORDER BY created_at DESC").all();
      return epics;
    } finally { db.close(); }
  })

  .get("/api/sdlc/epics/:id", ({ params, set }) => {
    const db = getOverseerDb();
    if (!db) { set.status = 503; return { error: "Overseer database not found" }; }
    try {
      const epic = db.prepare("SELECT * FROM epics WHERE id = $id").get({ $id: params.id });
      if (!epic) { set.status = 404; return { error: "Epic not found" }; }

      const stories = db.prepare("SELECT * FROM stories WHERE epic_id = $id ORDER BY priority, created_at").all({ $id: params.id });
      const tasks = db.prepare("SELECT * FROM tasks t JOIN stories s ON t.story_id = s.id WHERE s.epic_id = $id ORDER BY t.created_at").all({ $id: params.id });
      const agents = db.prepare("SELECT * FROM agent_sessions WHERE task_id IN (SELECT t.id FROM tasks t JOIN stories s ON t.story_id = s.id WHERE s.epic_id = $id) ORDER BY started_at DESC").all({ $id: params.id });

      const stats = {
        total: tasks.length,
        queued: tasks.filter((t: any) => t.status === "queued").length,
        inProgress: tasks.filter((t: any) => ["assigned", "in_progress"].includes(t.status)).length,
        done: tasks.filter((t: any) => ["merged", "done"].includes(t.status)).length,
        failed: tasks.filter((t: any) => t.status === "failed").length,
      };

      return { epic, stories, tasks, agents, stats };
    } finally { db.close(); }
  })

  // --- Tasks ---
  .get("/api/sdlc/epics/:id/tasks", ({ params, set }) => {
    const db = getOverseerDb();
    if (!db) { set.status = 503; return { error: "Overseer database not found" }; }
    try {
      return db.prepare(
        "SELECT t.* FROM tasks t JOIN stories s ON t.story_id = s.id WHERE s.epic_id = $id ORDER BY t.created_at"
      ).all({ $id: params.id });
    } finally { db.close(); }
  })

  // --- Agents ---
  .get("/api/sdlc/agents/running", ({ set }) => {
    const db = getOverseerDb();
    if (!db) { set.status = 503; return { error: "Overseer database not found" }; }
    try {
      return db.prepare("SELECT * FROM agent_sessions WHERE status = 'running' ORDER BY started_at").all();
    } finally { db.close(); }
  })

  // --- Knowledge ---
  .get("/api/sdlc/epics/:id/knowledge", ({ params, set }) => {
    const db = getOverseerDb();
    if (!db) { set.status = 503; return { error: "Overseer database not found" }; }
    try {
      return db.prepare("SELECT * FROM knowledge WHERE epic_id = $id ORDER BY created_at").all({ $id: params.id });
    } finally { db.close(); }
  })

  // --- Merge Queue ---
  .get("/api/sdlc/merges", ({ set }) => {
    const db = getOverseerDb();
    if (!db) { set.status = 503; return { error: "Overseer database not found" }; }
    try {
      return db.prepare("SELECT * FROM merge_queue ORDER BY rowid DESC LIMIT 20").all();
    } finally { db.close(); }
  })

  // --- Sprint Log ---
  .get("/api/sdlc/epics/:id/events", ({ params, set }) => {
    const db = getOverseerDb();
    if (!db) { set.status = 503; return { error: "Overseer database not found" }; }
    try {
      return db.prepare(
        "SELECT * FROM sprint_log WHERE epic_id = $id ORDER BY timestamp DESC LIMIT 100"
      ).all({ $id: params.id });
    } finally { db.close(); }
  })

  // --- SSE: Real-time Events Stream ---
  .get("/api/sdlc/epics/:id/stream", ({ params }) => {
    const epicId = params.id;
    const encoder = new TextEncoder();
    let lastEventCount = 0;

    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        // Send initial state
        const db = getOverseerDb();
        if (db) {
          try {
            const events = db.prepare(
              "SELECT * FROM sprint_log WHERE epic_id = $id ORDER BY timestamp DESC LIMIT 20"
            ).all({ $id: epicId }) as Array<{ id: string; event_type: string; details: string; agent_role: string; timestamp: string }>;

            lastEventCount = db.prepare(
              "SELECT COUNT(*) as cnt FROM sprint_log WHERE epic_id = $id"
            ).get({ $id: epicId }) as { cnt: number } | null ? (db.prepare(
              "SELECT COUNT(*) as cnt FROM sprint_log WHERE epic_id = $id"
            ).get({ $id: epicId }) as any).cnt : 0;

            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "init", events: events.reverse() })}\n\n`));
          } finally { db.close(); }
        }

        // Poll for new events every 2s
        const interval = setInterval(() => {
          const pollDb = getOverseerDb();
          if (!pollDb) return;
          try {
            const countResult = pollDb.prepare(
              "SELECT COUNT(*) as cnt FROM sprint_log WHERE epic_id = $id"
            ).get({ $id: epicId }) as { cnt: number } | null;
            const currentCount = countResult?.cnt || 0;

            if (currentCount > lastEventCount) {
              const newEvents = pollDb.prepare(
                "SELECT * FROM sprint_log WHERE epic_id = $id ORDER BY timestamp DESC LIMIT $limit"
              ).all({ $id: epicId, $limit: currentCount - lastEventCount }) as Array<any>;

              const tasks = pollDb.prepare(
                "SELECT t.* FROM tasks t JOIN stories s ON t.story_id = s.id WHERE s.epic_id = $id"
              ).all({ $id: epicId });

              const stats = {
                total: tasks.length,
                queued: tasks.filter((t: any) => t.status === "queued").length,
                inProgress: tasks.filter((t: any) => ["assigned", "in_progress"].includes(t.status)).length,
                done: tasks.filter((t: any) => ["merged", "done"].includes(t.status)).length,
                failed: tasks.filter((t: any) => t.status === "failed").length,
              };

              controller.enqueue(encoder.encode(
                `data: ${JSON.stringify({ type: "update", events: newEvents.reverse(), stats })}\n\n`
              ));
              lastEventCount = currentCount;
            }

            // Check if epic is done
            const epic = pollDb.prepare("SELECT status FROM epics WHERE id = $id").get({ $id: epicId }) as { status: string } | null;
            if (epic?.status === "done" || epic?.status === "cancelled") {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "done", status: epic.status })}\n\n`));
              clearInterval(interval);
              controller.close();
            }
          } catch {
            // DB might be locked by overseer — skip this poll
          } finally { pollDb.close(); }
        }, 2000);

        // Cleanup on disconnect
        controller.enqueue(encoder.encode(": heartbeat\n\n"));
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  })

  // --- Board markdown (for preview) ---
  .get("/api/sdlc/epics/:id/board", ({ params, set }) => {
    const db = getOverseerDb();
    if (!db) { set.status = 503; return { error: "Overseer database not found" }; }
    try {
      const epic = db.prepare("SELECT * FROM epics WHERE id = $id").get({ $id: params.id }) as any;
      if (!epic) { set.status = 404; return { error: "Epic not found" }; }

      const tasks = db.prepare(
        "SELECT t.* FROM tasks t JOIN stories s ON t.story_id = s.id WHERE s.epic_id = $id ORDER BY t.created_at"
      ).all({ $id: params.id }) as any[];

      // Group into columns
      const board = {
        queued: tasks.filter(t => t.status === "queued"),
        running: tasks.filter(t => ["assigned", "in_progress"].includes(t.status)),
        review: tasks.filter(t => t.status === "review"),
        done: tasks.filter(t => ["merged", "done"].includes(t.status)),
        failed: tasks.filter(t => ["failed", "blocked"].includes(t.status)),
      };

      return { epic, board };
    } finally { db.close(); }
  });
