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
// BROWSER AUTOMATION — UI Testing
// ============================================================

/**
 * Open a URL in a cmux browser split pane.
 * Returns the raw output (contains surface info) or null.
 */
export function browserOpen(url: string): string | null {
  return cmux(["browser", "open-split", url], 10000);
}

/**
 * Wait for a condition on a browser surface.
 */
export function browserWait(surface: string, opts: {
  loadState?: string; text?: string; selector?: string;
  urlContains?: string; jsCondition?: string; timeoutMs?: number;
} = {}): boolean {
  const args = ["browser", surface, "wait"];
  if (opts.loadState) args.push("--load-state", opts.loadState);
  if (opts.text) args.push("--text", opts.text);
  if (opts.selector) args.push("--selector", opts.selector);
  if (opts.urlContains) args.push("--url-contains", opts.urlContains);
  if (opts.jsCondition) args.push("--function", opts.jsCondition);
  args.push("--timeout-ms", String(opts.timeoutMs || 15000));
  return cmux(args, (opts.timeoutMs || 15000) + 2000) !== null;
}

/**
 * Take a DOM snapshot (structured text, good for LLM analysis).
 */
export function browserSnapshot(surface: string, opts: { selector?: string; compact?: boolean; interactive?: boolean } = {}): string | null {
  const args = ["browser", surface, "snapshot"];
  if (opts.selector) args.push("--selector", opts.selector);
  if (opts.compact) args.push("--compact");
  if (opts.interactive) args.push("--interactive");
  return cmux(args, 10000);
}

/**
 * Take a screenshot and save to file.
 */
export function browserScreenshot(surface: string, outPath: string): boolean {
  return cmux(["browser", surface, "screenshot", "--out", outPath]) !== null;
}

/**
 * Get a property from the page.
 */
export function browserGet(surface: string, prop: "title" | "url" | "text" | "html" | "value" | "count", selector?: string): string | null {
  const args = ["browser", surface, "get", prop];
  if (selector) args.push(selector);
  return cmux(args, 5000);
}

/**
 * Check element visibility/state.
 */
export function browserIs(surface: string, check: "visible" | "enabled" | "checked", selector: string): boolean {
  const result = cmux(["browser", surface, "is", check, selector], 5000);
  return result !== null && !result.toLowerCase().includes("false");
}

/**
 * Find elements by various strategies.
 */
export function browserFind(surface: string, strategy: "role" | "text" | "label" | "testid" | "first" | "last", value: string): string | null {
  return cmux(["browser", surface, "find", strategy, value], 5000);
}

/**
 * Click an element.
 */
export function browserClick(surface: string, selector: string, snapshotAfter = false): string | null {
  const args = ["browser", surface, "click", selector];
  if (snapshotAfter) args.push("--snapshot-after");
  return cmux(args, 5000);
}

/**
 * Fill a form input.
 */
export function browserFill(surface: string, selector: string, text: string): boolean {
  return cmux(["browser", surface, "fill", selector, "--text", text], 5000) !== null;
}

/**
 * Execute JavaScript in the browser.
 */
export function browserEval(surface: string, script: string): string | null {
  return cmux(["browser", surface, "eval", script], 10000);
}

/**
 * Get console logs from the browser.
 */
export function browserConsoleLogs(surface: string): string | null {
  return cmux(["browser", surface, "console", "list"], 5000);
}

/**
 * Get browser errors.
 */
export function browserErrors(surface: string): string | null {
  return cmux(["browser", surface, "errors", "list"], 5000);
}

/**
 * Identify the current browser surface (get surface ID, URL, title).
 */
export function browserIdentify(): string | null {
  return cmux(["browser", "identify", "--json"], 5000);
}

// ============================================================
// UI VERIFICATION WORKFLOW
// ============================================================

export interface UIVerificationResult {
  url: string;
  surface: string | null;
  pageTitle: string | null;
  screenshot: string | null;
  snapshot: string | null;
  errors: string | null;
  consoleLogs: string | null;
  checks: Array<{ name: string; passed: boolean; detail: string }>;
}

/**
 * Run a full UI verification against a URL.
 * Opens browser, waits for load, takes snapshot + screenshot,
 * checks for errors, and runs element checks.
 *
 * This is the main entry point for QA browser testing.
 */
export function verifyUI(
  url: string,
  checks: Array<{ name: string; type: "visible" | "text" | "title" | "count"; selector?: string; expected?: string }>,
  screenshotDir?: string,
): UIVerificationResult {
  const result: UIVerificationResult = {
    url,
    surface: null,
    pageTitle: null,
    screenshot: null,
    snapshot: null,
    errors: null,
    consoleLogs: null,
    checks: [],
  };

  if (!canUseCmux()) return result;

  // Open browser pane with URL — new-pane returns "OK surface:N pane:N workspace:N"
  const paneResult = cmux(["new-pane", "--type", "browser", "--direction", "right", "--url", url], 10000);
  let surface = "";

  if (paneResult) {
    // Parse surface ID from "OK surface:9 pane:7 workspace:1"
    const match = paneResult.match(/surface:\d+/);
    if (match) surface = match[0];
  }

  if (!surface) {
    sidebarLog("Could not open browser surface", "warning");
    return result;
  }
  result.surface = surface;

  // Wait for page load
  browserWait(surface, { loadState: "complete", timeoutMs: 15000 });

  // Get page title
  result.pageTitle = browserGet(surface, "title");

  // Take snapshot
  result.snapshot = browserSnapshot(surface, { compact: true, interactive: true });

  // Take screenshot
  if (screenshotDir) {
    const ssPath = `${screenshotDir}/ui-verification-${Date.now()}.png`;
    if (browserScreenshot(surface, ssPath)) {
      result.screenshot = ssPath;
    }
  }

  // Check for errors
  result.errors = browserErrors(surface);
  result.consoleLogs = browserConsoleLogs(surface);

  // Run element checks
  for (const check of checks) {
    let passed = false;
    let detail = "";

    switch (check.type) {
      case "visible":
        if (check.selector) {
          passed = browserIs(surface, "visible", check.selector);
          detail = passed ? `Element ${check.selector} is visible` : `Element ${check.selector} NOT visible`;
        }
        break;
      case "text":
        if (check.selector) {
          const text = browserGet(surface, "text", check.selector);
          passed = text !== null && (check.expected ? text.includes(check.expected) : text.length > 0);
          detail = `Text: "${text?.slice(0, 100) || "null"}"${check.expected ? ` (expected: "${check.expected}")` : ""}`;
        }
        break;
      case "title":
        passed = result.pageTitle !== null && (check.expected ? result.pageTitle.includes(check.expected) : true);
        detail = `Title: "${result.pageTitle || "null"}"`;
        break;
      case "count":
        if (check.selector) {
          const count = browserGet(surface, "count", check.selector);
          passed = count !== null && parseInt(count, 10) > 0;
          detail = `Count of ${check.selector}: ${count || "0"}`;
        }
        break;
    }

    result.checks.push({ name: check.name, passed, detail });
  }

  // Log results to sidebar
  const passCount = result.checks.filter(c => c.passed).length;
  const failCount = result.checks.filter(c => !c.passed).length;
  sidebarLog(
    `UI Verify: ${passCount} passed, ${failCount} failed`,
    failCount > 0 ? "warning" : "success",
  );

  return result;
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
