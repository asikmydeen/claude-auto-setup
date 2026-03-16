/**
 * Claude interaction routes — chat sessions with SSE streaming.
 *
 * Manages Claude CLI child processes, stream-json parsing, SSE broadcasting,
 * session persistence, image uploads, and follow-up messages.
 */
import { Elysia } from "elysia";
import { randomUUID } from "crypto";
import { spawn, execFileSync } from "child_process";
import { existsSync, writeFileSync, readFileSync, mkdirSync } from "fs";
import { join } from "path";
import {
  ClaudeSession,
  StreamEvent,
  SCRATCH_DIR,
  TMP_IMAGES_DIR,
  buildProjectEnv,
  findClaudeCLI,
} from "../lib/shared";
import { registerCleanup } from "../lib/cleanup";
import { logError, logWarn } from "../lib/logger";
import {
  dbInsertSession,
  dbUpdateSession,
  dbInsertMessage,
  dbGetMessages,
  dbGetSession,
  dbListRecentSessions,
  dbListSessionsByProject,
  dbDeleteSession,
  migrateFromJson,
  dbTouchProject,
} from "../lib/database";

// --- State ---

export const claudeSessions = new Map<string, ClaudeSession>();

/**
 * SSE clients — each session maps to a set of ReadableStreamDefaultControllers.
 * When we push data, we enqueue SSE-formatted strings into each controller.
 */
export const sseClients = new Map<string, Set<ReadableStreamDefaultController<Uint8Array>>>();

const encoder = new TextEncoder();

// --- Session persistence (SQLite) ---

const SESSIONS_FILE = join(SCRATCH_DIR, "sessions.json");

// Migrate from old JSON file on first run
const migrated = migrateFromJson(SESSIONS_FILE);
if (migrated > 0) {
  console.log(`Migrated ${migrated} sessions from sessions.json → SQLite`);
}

/** Persist session state to SQLite. Called on session events. */
export function persistSessions() {
  // With SQLite, individual writes happen inline. This is now a no-op kept
  // for API compatibility with modules that call it (templates, projects).
}

/** Load completed sessions from SQLite into the in-memory Map (for listing). */
function loadPersistedSessions() {
  try {
    const rows = dbListRecentSessions(100);
    for (const row of rows) {
      if (claudeSessions.has(row.id)) continue;
      const messages = dbGetMessages(row.id);
      claudeSessions.set(row.id, {
        id: row.id,
        prompt: row.prompt,
        status: row.status as ClaudeSession["status"],
        messages: messages.map((m) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
          timestamp: m.timestamp,
        })),
        output: [],
        exitCode: row.exit_code,
        startedAt: row.started_at,
        endedAt: row.ended_at ?? undefined,
        pid: row.pid ?? undefined,
        claudeSessionId: row.claude_session_id ?? undefined,
        filesChanged: row.files_changed ? JSON.parse(row.files_changed) : undefined,
        cwd: row.project_path,
      });
    }
  } catch (err) {
    console.error("Failed to load sessions from SQLite:", err);
  }
}

// Load persisted sessions on startup
loadPersistedSessions();

// --- Stream-json parsing ---

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

// --- SSE broadcasting ---

function broadcastSSE(sessionId: string, event: Record<string, unknown>) {
  const clients = sseClients.get(sessionId);
  if (!clients) return;
  const data = `data: ${JSON.stringify(event)}\n\n`;
  const bytes = encoder.encode(data);
  for (const controller of clients) {
    try {
      controller.enqueue(bytes);
    } catch (err) {
      logWarn("claude:sse:enqueue", err instanceof Error ? err.message : String(err));
      clients.delete(controller);
    }
  }
}

// --- Wire stream-json stdout parsing for a Claude child process ---

export function wireStreamJson(
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
          // Persist Claude's internal session ID to DB (enables --resume)
          dbUpdateSession(sessionId, { claudeSessionId: evt.sessionId });
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

// --- Git file change detection ---

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

// --- Active project accessor ---
// The active project path is owned by index.ts (project management routes).
// This getter is set via initClaude() so claude routes can resolve default cwd.
let getActiveProject: () => string = () => process.cwd();

/** Call once from index.ts to wire up the active project getter. */
export function initClaude(opts: { getActiveProject: () => string }) {
  getActiveProject = opts.getActiveProject;
}

// ============================================================
// ROUTES
// ============================================================

export const claudeRoutes = new Elysia()

  // ============================================================
  // IMAGE UPLOAD
  // ============================================================

  .post("/api/images/upload", ({ body, set }) => {
    const { images } = body as { images?: Array<{ name?: string; data?: string }> };
    if (!images || !Array.isArray(images) || images.length === 0) {
      set.status = 400;
      return { error: "No images provided" };
    }
    if (images.length > 10) {
      set.status = 400;
      return { error: "Maximum 10 images per upload" };
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

    return { paths };
  })

  // ============================================================
  // CLAUDE SESSIONS
  // ============================================================

  // List all sessions (in-memory running + DB history)
  .get("/api/claude/sessions", ({ query }) => {
    const projectPath = query.project as string | undefined;
    // Running sessions from memory
    const running = [...claudeSessions.values()]
      .filter((s) => s.status === "running")
      .filter((s) => !projectPath || s.cwd === projectPath)
      .map(({ process, ...s }) => s);
    // Completed sessions from DB
    const dbRows = projectPath
      ? dbListSessionsByProject(projectPath, 50)
      : dbListRecentSessions(100);
    const completed = dbRows
      .filter((row) => row.status !== "running")
      .filter((row) => !claudeSessions.has(row.id)) // avoid duplicates with running
      .map((row) => {
        const messages = dbGetMessages(row.id);
        return {
          id: row.id,
          prompt: row.prompt,
          status: row.status,
          messages: messages.map((m) => ({ role: m.role, content: m.content, timestamp: m.timestamp })),
          output: [] as string[],
          exitCode: row.exit_code,
          startedAt: row.started_at,
          endedAt: row.ended_at,
          claudeSessionId: row.claude_session_id,
          filesChanged: row.files_changed ? JSON.parse(row.files_changed) : [],
          cwd: row.project_path,
        };
      });
    // Merge: running first, then completed by date
    const inMemoryCompleted = [...claudeSessions.values()]
      .filter((s) => s.status !== "running")
      .filter((s) => !projectPath || s.cwd === projectPath)
      .map(({ process, ...s }) => s);
    return [...running, ...inMemoryCompleted, ...completed];
  })

  // Get single session (check memory first, then DB)
  .get("/api/claude/sessions/:id", ({ params, set }) => {
    const session = claudeSessions.get(params.id);
    if (session) {
      const { process, ...safe } = session;
      return safe;
    }
    // Check DB
    const dbRow = dbGetSession(params.id);
    if (!dbRow) {
      set.status = 404;
      return { error: "Session not found" };
    }
    const messages = dbGetMessages(params.id);
    return {
      id: dbRow.id,
      prompt: dbRow.prompt,
      status: dbRow.status,
      messages: messages.map((m) => ({ role: m.role, content: m.content, timestamp: m.timestamp })),
      output: [],
      exitCode: dbRow.exit_code,
      startedAt: dbRow.started_at,
      endedAt: dbRow.ended_at,
      claudeSessionId: dbRow.claude_session_id,
      filesChanged: dbRow.files_changed ? JSON.parse(dbRow.files_changed) : [],
      cwd: dbRow.project_path,
    };
  })

  // Launch new session
  .post("/api/claude/sessions", ({ body, set }) => {
    const { prompt, cwd, imagePaths } = body as {
      prompt?: string;
      cwd?: string;
      imagePaths?: string[];
    };
    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      set.status = 400;
      return { error: "Prompt is required" };
    }

    try {
      const claudePath = findClaudeCLI();
      if (!claudePath) {
        set.status = 404;
        return { error: "Claude CLI not found" };
      }

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
      const sessionCwd = cwd || getActiveProject();
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

      // Persist to SQLite immediately
      dbInsertSession({ id, projectPath: sessionCwd, prompt: prompt.trim(), startedAt: session.startedAt, pid: child.pid });
      dbInsertMessage(id, "user", prompt.trim(), session.messages[0].timestamp);
      dbTouchProject(sessionCwd);

      // On close
      child.on("close", (code) => {
        session.status = code === 0 ? "done" : "error";
        session.exitCode = code;
        session.endedAt = new Date().toISOString();
        const assistantContent = session.output.join("");
        session.messages.push({
          role: "assistant",
          content: assistantContent,
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
          const doneData = encoder.encode(
            `data: ${JSON.stringify({ type: "done", exitCode: code, filesChanged: session.filesChanged })}\n\n`
          );
          for (const controller of clients) {
            try {
              controller.enqueue(doneData);
              controller.close();
            } catch {}
          }
          sseClients.delete(id);
        }

        // Persist to SQLite
        dbUpdateSession(id, {
          status: session.status,
          exitCode: session.exitCode,
          endedAt: session.endedAt,
          claudeSessionId: session.claudeSessionId,
          filesChanged: session.filesChanged,
        });
        dbInsertMessage(id, "assistant", assistantContent, session.messages[session.messages.length - 1].timestamp);

        // Clean up from memory after 2 hours (stays in SQLite)
        setTimeout(() => { claudeSessions.delete(id); }, 7200000);
      });

      const { process: _, ...safe } = session;
      set.status = 201;
      return safe;
    } catch {
      set.status = 500;
      return { error: "Failed to launch Claude" };
    }
  })

  // SSE stream for a session
  .get("/api/claude/stream/:id", ({ params, set }) => {
    const session = claudeSessions.get(params.id);
    if (!session) {
      set.status = 404;
      return { error: "Session not found" };
    }

    const sessionId = params.id;

    let controllerRef: ReadableStreamDefaultController<Uint8Array> | null = null;

    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        controllerRef = controller;

        // Send existing output first
        if (session.output.length > 0) {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ type: "replay", content: session.output.join("") })}\n\n`)
          );
        }

        // If already done, send done event immediately
        if (session.status !== "running") {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ type: "done", exitCode: session.exitCode })}\n\n`)
          );
          controller.close();
          return;
        }

        // Register SSE client
        if (!sseClients.has(sessionId)) {
          sseClients.set(sessionId, new Set());
        }
        sseClients.get(sessionId)!.add(controller);
      },
      cancel() {
        if (controllerRef) {
          sseClients.get(sessionId)?.delete(controllerRef);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "X-Accel-Buffering": "no",
      },
    });
  })

  // Stop a running session
  .post("/api/claude/stop/:id", ({ params, set }) => {
    const session = claudeSessions.get(params.id);
    if (!session) {
      set.status = 404;
      return { error: "Session not found" };
    }
    if (session.process) {
      session.process.kill("SIGTERM");
      session.status = "stopped";
    }
    return { ok: true };
  })

  // Delete a session (from memory + DB)
  .delete("/api/claude/sessions/:id", ({ params }) => {
    const session = claudeSessions.get(params.id);
    if (session?.process) session.process.kill("SIGTERM");
    claudeSessions.delete(params.id);
    dbDeleteSession(params.id);
    return { ok: true };
  })

  // Send follow-up message to an existing session using --resume (by session ID)
  // Fallback chain: --resume <id> → --continue → new session (no flag)
  .post("/api/claude/sessions/:id/message", ({ params, body, set }) => {
    const session = claudeSessions.get(params.id);
    if (!session) {
      set.status = 404;
      return {
        error: "Session expired or not found. Use the Reconnect button to start a new session.",
        recoverable: true,
        cwd: null,
      };
    }
    if (session.status === "running") {
      set.status = 409;
      return { error: "Session is still running" };
    }

    const { prompt, imagePaths } = body as { prompt?: string; imagePaths?: string[] };
    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      set.status = 400;
      return { error: "Prompt is required" };
    }

    const claudePath = findClaudeCLI();
    if (!claudePath) {
      set.status = 503;
      return {
        error: "Claude CLI not found. Is it installed? Run: npm install -g @anthropic-ai/claude-code",
        recoverable: false,
      };
    }

    // Resume strategy: --resume <session-id> preserves full context.
    // Falls back to --continue (cwd-based) then to a new session.
    type ResumeMode = "resume" | "continue" | "new";

    function launchFollowUp(mode: ResumeMode): void {
      if (!session) return; // TS guard — already checked above
      const args = ["-p", prompt!.trim(), "--output-format", "stream-json", "--verbose", "--dangerously-skip-permissions"];

      if (mode === "resume" && session.claudeSessionId) {
        args.push("--resume", session.claudeSessionId);
      } else if (mode === "continue") {
        args.push("--continue");
      }
      // mode === "new" — no resume flag, starts fresh

      // Attach images if provided
      if (Array.isArray(imagePaths)) {
        for (const imgPath of imagePaths) {
          if (typeof imgPath === "string" && existsSync(imgPath)) {
            args.push("--image", imgPath);
          }
        }
      }

      const env = buildProjectEnv(session.cwd);

      const child = spawn(claudePath!, args, {
        env,
        cwd: session.cwd,
        stdio: ["ignore", "pipe", "pipe"],
      });

      // Add user message
      session.messages.push({
        role: "user",
        content: prompt!.trim(),
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

      // Detect early crash (within 3s) — likely resume/continue failed
      let earlyCrash = true;
      const earlyTimer = setTimeout(() => { earlyCrash = false; }, 3000);

      child.on("close", (code) => {
        clearTimeout(earlyTimer);

        // If resume/continue crashed immediately, try next fallback
        if (earlyCrash && code !== 0 && mode !== "new") {
          const nextMode: ResumeMode = mode === "resume" ? "continue" : "new";
          console.log(`[follow-up] --${mode} failed (exit ${code}), falling back to --${nextMode}`);
          // Remove the failed user message we just added
          session.messages.pop();
          session.status = "done"; // Reset to allow retry
          launchFollowUp(nextMode);
          return;
        }

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

        const clients = sseClients.get(session.id);
        if (clients) {
          const doneData = encoder.encode(
            `data: ${JSON.stringify({ type: "done", exitCode: code, filesChanged: session.filesChanged })}\n\n`
          );
          for (const controller of clients) {
            try {
              controller.enqueue(doneData);
              controller.close();
            } catch {}
          }
          sseClients.delete(session.id);
        }
        persistSessions();
      });

      child.on("error", (err) => {
        clearTimeout(earlyTimer);
        console.error(`[follow-up] spawn error:`, err.message);
        session.status = "error";
        session.exitCode = -1;
        session.endedAt = new Date().toISOString();
        session.messages.push({
          role: "assistant",
          content: `Error: Failed to start Claude CLI. ${err.message}`,
          timestamp: new Date().toISOString(),
        });
        delete session.process;
        persistSessions();
      });
    }

    try {
      // Try --resume first (preserves full conversation context by session ID)
      // Falls back: --resume → --continue → new session
      const startMode: ResumeMode = session.claudeSessionId ? "resume" : "continue";
      launchFollowUp(startMode);
      const { process: _, ...safe } = session;
      return safe;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      set.status = 500;
      return {
        error: `Failed to send follow-up: ${msg}`,
        recoverable: true,
        cwd: session.cwd,
      };
    }
  });

// ============================================================
// CLEANUP
// ============================================================

/** Kill all running Claude child processes and persist sessions to disk. */
export function cleanup() {
  for (const sess of claudeSessions.values()) {
    if (sess.process) {
      try { sess.process.kill("SIGTERM"); } catch (err) { logError("claude:cleanup:kill", err); }
    }
  }
  persistSessions();
}

// Register cleanup with the centralized shutdown handler
registerCleanup(cleanup);

/** SSE heartbeat — call from setInterval in index.ts to detect dead clients. */
export function heartbeat() {
  for (const [id, clients] of sseClients.entries()) {
    const heartbeatData = encoder.encode(":heartbeat\n\n");
    for (const controller of clients) {
      try { controller.enqueue(heartbeatData); }
      catch { clients.delete(controller); }
    }
    if (clients.size === 0) sseClients.delete(id);
  }
}
