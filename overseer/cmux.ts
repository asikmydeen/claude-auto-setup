// SDLC Overseer — cmux Integration
//
// Uses the cmux app API (Unix socket + CLI) for workspace management,
// split panes, sidebar progress, and notifications.
//
// cmux is macOS-only. All functions are safe no-ops on other platforms.
// The pipeline never depends on cmux — it only enhances the UX.

import { spawnSync } from "child_process";
import { existsSync } from "fs";

const IS_MACOS = process.platform === "darwin";
const CMUX_APP_CLI = "/Applications/cmux.app/Contents/Resources/bin/cmux";
const CMUX_SOCKET = process.env.CMUX_SOCKET_PATH || "/tmp/cmux.sock";

/**
 * Check if the cmux app is installed and running.
 */
export function isCmuxAvailable(): boolean {
  if (!IS_MACOS) return false;
  if (!existsSync(CMUX_APP_CLI)) return false;
  // Check socket exists
  if (!existsSync(CMUX_SOCKET)) return false;
  // Ping to verify running
  try {
    const result = spawnSync(CMUX_APP_CLI, ["ping"], { encoding: "utf-8", timeout: 3000 });
    return result.stdout?.includes("PONG") || false;
  } catch {
    return false;
  }
}

/**
 * Check if running inside SSH (cmux won't work over SSH).
 */
function isSSH(): boolean {
  return !!(process.env.SSH_CLIENT || process.env.SSH_TTY || process.env.SSH_CONNECTION);
}

/**
 * Check if cmux can actually be used.
 */
export function canUseCmux(): boolean {
  return isCmuxAvailable() && !isSSH();
}

/**
 * Run a cmux CLI command. Returns stdout or null on failure.
 */
function cmux(args: string[], timeout = 5000): string | null {
  if (!canUseCmux()) return null;
  try {
    const result = spawnSync(CMUX_APP_CLI, args, { encoding: "utf-8", timeout });
    return result.status === 0 ? result.stdout?.trim() || "" : null;
  } catch {
    return null;
  }
}

// ============================================================
// WORKSPACE MANAGEMENT
// ============================================================

/**
 * Create a new cmux workspace and run the dashboard in it.
 * Returns the workspace ID or null.
 */
export function openDashboardWorkspace(overseerDir: string, epicId: string): string | null {
  if (!canUseCmux()) return null;

  // Create a new workspace
  const wsResult = cmux(["new-workspace"]);
  if (wsResult === null) return null;

  // Send the dashboard command to the new workspace
  const dashCmd = `bun ${overseerDir}/dashboard.ts --epic ${epicId}\n`;
  cmux(["send", dashCmd]);

  return wsResult;
}

/**
 * Open the dashboard in a split pane (right side of current workspace).
 * This is the preferred approach — dashboard beside the pipeline output.
 */
export function openDashboardSplit(overseerDir: string, epicId: string): string | null {
  if (!canUseCmux()) return null;

  // Create a right split
  const splitResult = cmux(["new-split", "right"]);
  if (splitResult === null) return null;

  // Send the dashboard command to the new split
  const dashCmd = `bun ${overseerDir}/dashboard.ts --epic ${epicId}\n`;
  cmux(["send", dashCmd]);

  return splitResult;
}

// ============================================================
// SIDEBAR STATUS & PROGRESS
// ============================================================

/**
 * Set the SDLC status pill in the sidebar.
 */
export function setStatus(label: string, icon = "hammer", color = "#4a90d9"): boolean {
  return cmux(["set-status", "sdlc", label, "--icon", icon, "--color", color]) !== null;
}

/**
 * Set the SDLC progress bar in the sidebar (0.0 to 1.0).
 */
export function setProgress(value: number, label?: string): boolean {
  const args = ["set-progress", String(Math.min(1.0, Math.max(0.0, value)))];
  if (label) args.push("--label", label);
  return cmux(args) !== null;
}

/**
 * Clear the SDLC progress bar.
 */
export function clearProgress(): boolean {
  return cmux(["clear-progress"]) !== null;
}

/**
 * Log to the cmux sidebar.
 */
export function sidebarLog(message: string, level: "info" | "progress" | "success" | "warning" | "error" = "info"): boolean {
  return cmux(["log", "--level", level, "--source", "sdlc", "--", message]) !== null;
}

// ============================================================
// NOTIFICATIONS
// ============================================================

/**
 * Send a desktop notification via cmux.
 */
export function notify(title: string, body: string): boolean {
  return cmux(["notify", "--title", title, "--body", body]) !== null;
}

// ============================================================
// BROWSER AUTOMATION
// ============================================================

/**
 * Open a URL in a cmux browser surface (split pane).
 */
export function openBrowserSplit(url: string): string | null {
  return cmux(["browser", "open-split", url]);
}

/**
 * Wait for a page to load in a browser surface.
 */
export function browserWait(surfaceId: string, opts: { loadState?: string; text?: string; timeoutMs?: number } = {}): boolean {
  const args = ["browser", surfaceId, "wait"];
  if (opts.loadState) args.push("--load-state", opts.loadState);
  if (opts.text) args.push("--text", opts.text);
  if (opts.timeoutMs) args.push("--timeout-ms", String(opts.timeoutMs));
  return cmux(args, opts.timeoutMs || 15000) !== null;
}

/**
 * Take a screenshot of a browser surface.
 */
export function browserScreenshot(surfaceId: string, outPath: string): boolean {
  return cmux(["browser", surfaceId, "screenshot", "--out", outPath]) !== null;
}

// ============================================================
// PLATFORM INFO
// ============================================================

/**
 * Get platform info for logging.
 */
export function getPlatformInfo(): { platform: string; cmuxApp: boolean; cmuxRunning: boolean; ssh: boolean } {
  return {
    platform: process.platform,
    cmuxApp: IS_MACOS && existsSync(CMUX_APP_CLI),
    cmuxRunning: isCmuxAvailable(),
    ssh: isSSH(),
  };
}

// ============================================================
// OVERSEER LIFECYCLE HOOKS
// ============================================================

/**
 * Called when the overseer starts an epic.
 * Opens dashboard split + sets sidebar status.
 */
export function onEpicStart(overseerDir: string, epicId: string, epicTitle: string): void {
  if (!canUseCmux()) return;

  // Set sidebar status
  setStatus("Planning...", "magnifyingglass", "#f5a623");
  setProgress(0, "SDLC: Starting");
  sidebarLog(`Epic: ${epicTitle}`, "info");

  // Open dashboard in right split
  openDashboardSplit(overseerDir, epicId);

  // Desktop notification
  notify("SDLC Started", epicTitle);
}

/**
 * Called when pipeline progress changes.
 */
export function onProgress(done: number, total: number, phase: string): void {
  if (!canUseCmux()) return;
  const pct = total > 0 ? done / total : 0;
  setProgress(pct, `SDLC: ${phase} (${done}/${total})`);
}

/**
 * Called when the epic completes.
 */
export function onEpicComplete(epicTitle: string, stats: { done: number; failed: number; total: number }): void {
  if (!canUseCmux()) return;
  const success = stats.failed === 0;
  setStatus(success ? "Done" : "Done (with failures)", success ? "checkmark" : "exclamationmark.triangle", success ? "#4cd964" : "#ff3b30");
  setProgress(1.0, `SDLC: ${stats.done}/${stats.total} tasks`);
  sidebarLog(`Completed: ${stats.done} done, ${stats.failed} failed`, success ? "success" : "warning");
  notify(success ? "SDLC Complete" : "SDLC Complete (with issues)", `${epicTitle} — ${stats.done}/${stats.total} tasks`);
}

/**
 * Called when an agent starts.
 */
export function onAgentStart(role: string, taskTitle: string): void {
  if (!canUseCmux()) return;
  sidebarLog(`${role}: ${taskTitle}`, "progress");
}

/**
 * Called when a merge completes.
 */
export function onMergeComplete(branch: string): void {
  if (!canUseCmux()) return;
  sidebarLog(`Merged: ${branch}`, "success");
}
