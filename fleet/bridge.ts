// Fleet — cmux Bridge
// Mirrors fleet state to cmux sidebar (status pills, progress bar, notifications).
// All functions are no-ops on non-macOS / when cmux is not available.
// Same pattern as overseer/gsd-bridge.ts.

import { execFileSync } from "child_process";
import { existsSync } from "fs";

const CMUX_SOCK = "/tmp/cmux.sock";
const CMUX_BIN = "/Applications/cmux.app/Contents/Resources/bin/cmux";

function cmuxAvailable(): boolean {
  return process.platform === "darwin" && existsSync(CMUX_SOCK) && existsSync(CMUX_BIN);
}

function cmux(args: string[]): string | null {
  if (!cmuxAvailable()) return null;
  try {
    return execFileSync(CMUX_BIN, args, {
      encoding: "utf-8",
      timeout: 5000,
      env: { ...process.env, CMUX_SOCKET: CMUX_SOCK },
      stdio: ["ignore", "pipe", "ignore"], // suppress stderr noise
    }).trim();
  } catch {
    return null;
  }
}

// --- Status pill ---

export function setStatus(label: string, icon: string, color: string): boolean {
  const result = cmux(["sidebar", "set-status", "--label", label, "--icon", icon, "--color", color]);
  return result !== null;
}

export function clearStatus(): boolean {
  return setStatus("", "", "") ;
}

// --- Progress bar ---

export function setProgress(value: number, label?: string): boolean {
  const args = ["sidebar", "set-progress", "--value", String(Math.max(0, Math.min(1, value)))];
  if (label) args.push("--label", label);
  return cmux(args) !== null;
}

export function clearProgress(): boolean {
  return cmux(["sidebar", "clear-progress"]) !== null;
}

// --- Sidebar log ---

export function sidebarLog(
  message: string,
  level: "info" | "progress" | "success" | "warning" | "error" = "info",
): boolean {
  return cmux(["sidebar", "log", "--level", level, "--message", message]) !== null;
}

// --- Notifications ---

export function notify(title: string, body: string): boolean {
  return cmux(["notify", "--title", title, "--body", body]) !== null;
}

// --- Fleet lifecycle hooks ---

const modeIcons: Record<string, string> = {
  pool: "tray.2",
  scatter: "arrow.triangle.branch",
  decompose: "scissors",
  pipeline: "arrow.right.arrow.left",
};

const modeColors: Record<string, string> = {
  pool: "#4a9eff",
  scatter: "#f5a623",
  decompose: "#a855f7",
  pipeline: "#22c55e",
};

export function onFleetStart(mode: string, taskCount: number, workerCount: number): void {
  setStatus(
    `Fleet: ${mode}`,
    modeIcons[mode] || "gearshape.2",
    modeColors[mode] || "#4a9eff",
  );
  setProgress(0, `Fleet: ${mode} (0/${taskCount})`);
  sidebarLog(`Fleet started: ${mode} — ${taskCount} tasks, ${workerCount} workers`, "info");
  notify("Fleet Started", `${mode} mode — ${taskCount} tasks, ${workerCount} workers`);
}

export function onTaskComplete(
  taskId: string,
  done: number,
  total: number,
  mode: string,
  success: boolean,
): void {
  setProgress(done / total, `Fleet: ${mode} (${done}/${total})`);
  sidebarLog(
    `${taskId}: ${success ? "completed" : "failed"}`,
    success ? "success" : "error",
  );
}

export function onAccountCooldown(accountLabel: string): void {
  sidebarLog(`${accountLabel}: rate limited — cooling down`, "warning");
}

export function onFleetComplete(mode: string, completed: number, failed: number, total: number): void {
  const allGood = failed === 0;
  setStatus(
    `Fleet: ${allGood ? "done" : "done (errors)"}`,
    allGood ? "checkmark.circle" : "exclamationmark.triangle",
    allGood ? "#22c55e" : "#f59e0b",
  );
  clearProgress();
  sidebarLog(
    `Fleet complete: ${completed}/${total} done, ${failed} failed`,
    allGood ? "success" : "warning",
  );
  notify(
    "Fleet Complete",
    `${mode}: ${completed}/${total} tasks done${failed > 0 ? `, ${failed} failed` : ""}`,
  );
}
