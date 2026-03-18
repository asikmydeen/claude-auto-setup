#!/usr/bin/env bun
// GSD 2 ↔ cmux Bridge
// Watches .gsd/ directory for state changes and mirrors them to cmux sidebar,
// notifications, and browser. Run alongside GSD 2 for integrated experience.
//
// Usage:
//   bun overseer/gsd-bridge.ts [project-dir]       Watch and bridge
//   bun overseer/gsd-bridge.ts --once [project-dir] One-shot sync and exit
//
// Requires: cmux app running, .gsd/ directory exists

import { watch } from "fs";
import { existsSync, readFileSync, readdirSync } from "fs";
import { join } from "path";
import { spawnSync } from "child_process";

const CMUX_CLI = "/Applications/cmux.app/Contents/Resources/bin/cmux";
const POLL_MS = 2000;
const IS_MACOS = process.platform === "darwin";

// --- CLI ---
const args = process.argv.slice(2);
let projectDir = process.cwd();
let oneShot = false;

for (const arg of args) {
  if (arg === "--once") oneShot = true;
  else if (arg === "--help" || arg === "-h") {
    console.log(`
GSD 2 ↔ cmux Bridge

Usage:
  bun gsd-bridge.ts [project-dir]        Watch .gsd/ and sync to cmux
  bun gsd-bridge.ts --once [project-dir]  One-shot sync

Bridges:
  - GSD phase/progress → cmux sidebar status pill + progress bar
  - Task completions → cmux sidebar logs
  - Milestone completion → cmux desktop notification
  - HTML reports → auto-open in cmux browser split
`);
    process.exit(0);
  } else if (!arg.startsWith("-")) {
    projectDir = arg;
  }
}

const gsdDir = join(projectDir, ".gsd");

// --- cmux helpers ---
function cmux(cmdArgs: string[], timeout = 5000): string | null {
  if (!IS_MACOS || !existsSync(CMUX_CLI)) return null;
  try {
    const result = spawnSync(CMUX_CLI, cmdArgs, { encoding: "utf-8", timeout });
    return result.status === 0 ? (result.stdout?.trim() || "") : null;
  } catch { return null; }
}

function isCmuxRunning(): boolean {
  if (!IS_MACOS) return false;
  const result = cmux(["ping"]);
  return result !== null && result.includes("PONG");
}

function setStatus(label: string, icon: string, color: string): void {
  cmux(["set-status", "gsd", label, "--icon", icon, "--color", color]);
}

function setProgress(value: number, label: string): void {
  cmux(["set-progress", String(Math.min(1.0, Math.max(0.0, value))), "--label", label]);
}

function clearProgress(): void { cmux(["clear-progress"]); }

function sidebarLog(message: string, level: string = "info"): void {
  cmux(["log", "--level", level, "--source", "gsd", "--", message]);
}

function notify(title: string, body: string): void {
  cmux(["notify", "--title", title, "--body", body]);
}

function openBrowser(url: string): void {
  cmux(["new-pane", "--type", "browser", "--direction", "right", "--url", url]);
}

// --- GSD state parsing ---

interface GsdSnapshot {
  phase: string;
  milestoneId: string | null;
  milestoneTitle: string | null;
  currentSlice: string | null;
  currentTask: string | null;
  totalSlices: number;
  doneSlices: number;
  totalTasks: number;
  doneTasks: number;
  cost: string | null;
  hasReport: boolean;
  reportPath: string | null;
}

function parseGsdState(): GsdSnapshot | null {
  if (!existsSync(gsdDir)) return null;

  const snapshot: GsdSnapshot = {
    phase: "unknown",
    milestoneId: null,
    milestoneTitle: null,
    currentSlice: null,
    currentTask: null,
    totalSlices: 0,
    doneSlices: 0,
    totalTasks: 0,
    doneTasks: 0,
    cost: null,
    hasReport: false,
    reportPath: null,
  };

  // Parse STATE.md if it exists
  const statePath = join(gsdDir, "STATE.md");
  if (existsSync(statePath)) {
    const content = readFileSync(statePath, "utf-8");
    // Extract phase from frontmatter
    const phaseMatch = content.match(/phase:\s*(\S+)/);
    if (phaseMatch) snapshot.phase = phaseMatch[1];

    const milestoneMatch = content.match(/milestone:\s*(\S+)/);
    if (milestoneMatch) snapshot.milestoneId = milestoneMatch[1];

    const sliceMatch = content.match(/slice:\s*(\S+)/);
    if (sliceMatch) snapshot.currentSlice = sliceMatch[1];

    const taskMatch = content.match(/task:\s*(\S+)/);
    if (taskMatch) snapshot.currentTask = taskMatch[1];
  }

  // Find milestone directories and count slices/tasks
  const entries = readdirSync(gsdDir, { withFileTypes: true });

  // Look for milestone directories (M001, M002, etc.)
  for (const entry of entries) {
    if (entry.isDirectory() && /^M\d{3}/.test(entry.name)) {
      snapshot.milestoneId = snapshot.milestoneId || entry.name;

      // Read roadmap for slice count
      const roadmapPath = join(gsdDir, entry.name, `${entry.name}-ROADMAP.md`);
      if (existsSync(roadmapPath)) {
        const roadmap = readFileSync(roadmapPath, "utf-8");
        snapshot.milestoneTitle = roadmap.match(/^#\s+(.+)/m)?.[1] || entry.name;

        // Count slices: [x] = done, [ ] = todo
        const doneSlices = (roadmap.match(/\[x\]/gi) || []).length;
        const todoSlices = (roadmap.match(/\[ \]/g) || []).length;
        snapshot.totalSlices = doneSlices + todoSlices;
        snapshot.doneSlices = doneSlices;
      }

      // Count tasks across slice directories
      const milestoneDir = join(gsdDir, entry.name);
      const sliceDirs = readdirSync(milestoneDir, { withFileTypes: true })
        .filter(e => e.isDirectory() && /^S\d{2}/.test(e.name));

      for (const sliceDir of sliceDirs) {
        const slicePath = join(milestoneDir, sliceDir.name);
        const planPath = join(slicePath, `${sliceDir.name}-PLAN.md`);
        if (existsSync(planPath)) {
          const plan = readFileSync(planPath, "utf-8");
          const doneTasks = (plan.match(/\[x\]/gi) || []).length;
          const todoTasks = (plan.match(/\[ \]/g) || []).length;
          snapshot.totalTasks += doneTasks + todoTasks;
          snapshot.doneTasks += doneTasks;
        }

        // Check for task summaries (completed tasks)
        const taskFiles = readdirSync(slicePath).filter(f => /T\d{2}-SUMMARY\.md/.test(f));
        // Task summaries imply completion even without [x]
        if (taskFiles.length > snapshot.doneTasks) {
          snapshot.doneTasks = Math.max(snapshot.doneTasks, taskFiles.length);
        }
      }
    }
  }

  // Check for HTML reports
  const reportsDir = join(gsdDir, "reports");
  if (existsSync(reportsDir)) {
    const reports = readdirSync(reportsDir).filter(f => f.endsWith(".html"));
    if (reports.length > 0) {
      snapshot.hasReport = true;
      snapshot.reportPath = join(reportsDir, reports[reports.length - 1]);
    }
  }

  // Check for metrics (cost)
  const metricsPath = join(gsdDir, "metrics.json");
  if (existsSync(metricsPath)) {
    try {
      const metrics = JSON.parse(readFileSync(metricsPath, "utf-8"));
      if (metrics.totalCost) snapshot.cost = `$${metrics.totalCost.toFixed(2)}`;
    } catch { /* ignore */ }
  }

  return snapshot;
}

// --- Phase to display mapping ---

function phaseIcon(phase: string): { icon: string; color: string; label: string } {
  switch (phase) {
    case "pre-planning":
    case "needs-discussion":
    case "discussing":
      return { icon: "bubble.left", color: "#f5a623", label: "Discussing" };
    case "researching":
      return { icon: "magnifyingglass", color: "#4a90d9", label: "Researching" };
    case "planning":
      return { icon: "list.bullet", color: "#9b59b6", label: "Planning" };
    case "executing":
      return { icon: "hammer", color: "#e67e22", label: "Executing" };
    case "verifying":
      return { icon: "checkmark.shield", color: "#3498db", label: "Verifying" };
    case "summarizing":
    case "advancing":
      return { icon: "arrow.forward", color: "#2ecc71", label: "Advancing" };
    case "validating-milestone":
      return { icon: "checkmark.circle", color: "#27ae60", label: "Validating" };
    case "completing-milestone":
      return { icon: "flag.checkered", color: "#27ae60", label: "Completing" };
    case "complete":
      return { icon: "checkmark", color: "#4cd964", label: "Done" };
    case "paused":
      return { icon: "pause", color: "#95a5a6", label: "Paused" };
    case "blocked":
      return { icon: "exclamationmark.triangle", color: "#ff3b30", label: "Blocked" };
    default:
      return { icon: "questionmark", color: "#95a5a6", label: phase || "Unknown" };
  }
}

// --- Sync state to cmux ---

let lastPhase = "";
let lastDoneTasks = 0;
let lastReportPath: string | null = null;

function syncToCmux(): void {
  const state = parseGsdState();
  if (!state) return;

  const display = phaseIcon(state.phase);

  // Update status pill
  const sliceInfo = state.currentSlice ? ` ${state.currentSlice}` : "";
  const taskInfo = state.currentTask ? `/${state.currentTask}` : "";
  setStatus(`${display.label}${sliceInfo}${taskInfo}`, display.icon, display.color);

  // Update progress bar
  const total = state.totalTasks || state.totalSlices || 1;
  const done = state.totalTasks ? state.doneTasks : state.doneSlices;
  const pct = total > 0 ? done / total : 0;
  const costSuffix = state.cost ? ` | ${state.cost}` : "";
  setProgress(pct, `GSD: ${done}/${total} tasks${costSuffix}`);

  // Log phase changes
  if (state.phase !== lastPhase) {
    sidebarLog(`Phase: ${display.label}${sliceInfo}`, state.phase === "complete" ? "success" : "progress");
    lastPhase = state.phase;
  }

  // Log new task completions
  if (state.doneTasks > lastDoneTasks) {
    const newDone = state.doneTasks - lastDoneTasks;
    sidebarLog(`+${newDone} task${newDone > 1 ? "s" : ""} completed (${state.doneTasks}/${state.totalTasks})`, "success");
    lastDoneTasks = state.doneTasks;
  }

  // Notify + open report on milestone completion
  if (state.phase === "complete" && state.milestoneTitle) {
    notify("GSD Milestone Complete", `${state.milestoneTitle} — ${state.doneTasks} tasks`);
    clearProgress();
  }

  // Auto-open HTML report in cmux browser
  if (state.hasReport && state.reportPath && state.reportPath !== lastReportPath) {
    lastReportPath = state.reportPath;
    openBrowser(`file://${state.reportPath}`);
    sidebarLog(`Report: ${state.reportPath.split("/").pop()}`, "info");
  }
}

// --- Main ---

if (!existsSync(gsdDir)) {
  console.error(`No .gsd/ directory found in ${projectDir}`);
  process.exit(1);
}

if (!isCmuxRunning()) {
  console.error("cmux is not running. Start cmux first.");
  process.exit(1);
}

console.log(`[gsd-bridge] Watching ${gsdDir}`);
console.log(`[gsd-bridge] Bridging GSD 2 → cmux sidebar + notifications + browser`);

// Initial sync
syncToCmux();

if (oneShot) {
  console.log("[gsd-bridge] One-shot sync complete");
  process.exit(0);
}

// Watch for changes
const watcher = watch(gsdDir, { recursive: true }, () => {
  // Debounce: wait 500ms after last change before syncing
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(syncToCmux, 500);
});

let debounceTimer: ReturnType<typeof setTimeout>;

// Also poll periodically (watch doesn't catch everything on all platforms)
const pollTimer = setInterval(syncToCmux, POLL_MS);

// Graceful shutdown
process.on("SIGINT", () => {
  watcher.close();
  clearInterval(pollTimer);
  cmux(["clear-status", "gsd"]);
  cmux(["clear-progress"]);
  console.log("\n[gsd-bridge] Stopped");
  process.exit(0);
});

process.on("SIGTERM", () => {
  watcher.close();
  clearInterval(pollTimer);
  process.exit(0);
});

console.log("[gsd-bridge] Running. Press Ctrl+C to stop.");

