// SDLC Overseer — claude-mem Integration
// Queries and writes to the persistent memory system for cross-session learning.
// claude-mem worker runs on port 37777 with MCP tools for search/timeline/observations.

import { spawnSync } from "child_process";

const WORKER_URL = "http://localhost:37777";
const TIMEOUT_MS = 5000;

/**
 * Check if claude-mem worker is running.
 */
export function isMemoryAvailable(): boolean {
  try {
    const result = spawnSync("curl", ["-s", "--connect-timeout", "2", `${WORKER_URL}/health`], {
      encoding: "utf-8",
      timeout: 3000,
    });
    return result.status === 0 && result.stdout?.includes("ok");
  } catch {
    return false;
  }
}

/**
 * Query memory for past observations relevant to a topic.
 * Returns formatted context string for injection into agent prompts.
 * Returns empty string if memory unavailable.
 */
export function queryMemory(topic: string, limit = 10): string {
  if (!isMemoryAvailable()) return "";

  try {
    const result = spawnSync("curl", [
      "-s", "--connect-timeout", "3",
      `${WORKER_URL}/api/search?q=${encodeURIComponent(topic)}&limit=${limit}`,
    ], {
      encoding: "utf-8",
      timeout: TIMEOUT_MS,
    });

    if (result.status !== 0 || !result.stdout) return "";

    const data = JSON.parse(result.stdout);
    if (!data.results || data.results.length === 0) return "";

    // Format as context for agent prompts
    const lines = ["## Past Knowledge (from memory)"];
    for (const obs of data.results.slice(0, 5)) {
      const type = obs.type || "observation";
      const content = obs.content || obs.text || "";
      if (content) {
        lines.push(`- **${type}**: ${content.slice(0, 300)}`);
      }
    }
    lines.push("");
    return lines.join("\n");
  } catch {
    return "";
  }
}

/**
 * Capture an observation to memory after an agent completes.
 * This persists discoveries, decisions, and patterns for future sessions.
 */
export function captureMemory(observation: {
  type: "bugfix" | "feature" | "refactor" | "change" | "discovery" | "decision";
  content: string;
  context?: string;
}): boolean {
  if (!isMemoryAvailable()) return false;

  try {
    const payload = JSON.stringify({
      type: observation.type,
      content: observation.content,
      context: observation.context || "",
      timestamp: new Date().toISOString(),
    });

    const result = spawnSync("curl", [
      "-s", "--connect-timeout", "3",
      "-X", "POST",
      "-H", "Content-Type: application/json",
      "-d", payload,
      `${WORKER_URL}/api/observations`,
    ], {
      encoding: "utf-8",
      timeout: TIMEOUT_MS,
    });

    return result.status === 0;
  } catch {
    return false;
  }
}

/**
 * Build a memory context string for a specific task/role.
 * Searches memory for relevant past observations based on role and task description.
 */
export function buildMemoryContext(role: string, taskTitle: string, _taskDescription: string): string {
  // Search for relevant observations using key terms
  const searchTerms = [
    role,
    ...taskTitle.split(/\s+/).filter(w => w.length > 4).slice(0, 3),
  ].join(" ");

  const memoryCtx = queryMemory(searchTerms, 5);
  if (!memoryCtx) return "";

  return memoryCtx;
}

/**
 * Capture agent completion as a memory observation.
 * Called after each agent finishes — persists what was done/learned.
 */
export function captureAgentCompletion(role: string, taskTitle: string, success: boolean, output: string): void {
  if (!isMemoryAvailable()) return;

  // Extract key information from output (last 500 chars usually has the summary)
  const summary = output.slice(-500).trim();

  captureMemory({
    type: success ? "feature" : "bugfix",
    content: `[${role}] ${taskTitle}: ${success ? "completed" : "failed"}. ${summary.slice(0, 200)}`,
    context: `SDLC overseer task. Role: ${role}. Task: ${taskTitle}.`,
  });
}

/**
 * Capture a discovery or decision for future reference.
 */
export function captureDiscovery(topic: string, detail: string, source: string): void {
  captureMemory({
    type: "discovery",
    content: `${topic}: ${detail}`,
    context: `Discovered by ${source} during SDLC pipeline.`,
  });
}

/**
 * Capture an architectural decision.
 */
export function captureDecision(decision: string, rationale: string, source: string): void {
  captureMemory({
    type: "decision",
    content: `${decision} — ${rationale}`,
    context: `Decision made by ${source} during SDLC pipeline.`,
  });
}
