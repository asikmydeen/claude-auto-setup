// SDLC Overseer — cmux Integration (macOS-safe, cross-platform graceful)
//
// cmux is macOS-only (uses AppleScript for Terminal.app tab management).
// On non-macOS platforms, all functions are no-ops that return silently.
// The overseer pipeline never depends on cmux — it only enhances the UX.

import { execFileSync, spawn } from "child_process";
import { existsSync } from "fs";
import { join } from "path";

const IS_MACOS = process.platform === "darwin";
const CMUX_PATH = join(process.env.HOME || "~", ".local", "bin", "cmux");

/**
 * Check if cmux is available. Returns false on non-macOS or if not installed.
 */
export function isCmuxAvailable(): boolean {
  if (!IS_MACOS) return false;
  return existsSync(CMUX_PATH);
}

/**
 * Check if running inside SSH (cmux won't work over SSH even on macOS).
 */
function isSSH(): boolean {
  return !!(process.env.SSH_CLIENT || process.env.SSH_TTY || process.env.SSH_CONNECTION);
}

/**
 * Check if cmux can actually be used (macOS + installed + not SSH).
 */
export function canUseCmux(): boolean {
  return isCmuxAvailable() && !isSSH();
}

/**
 * Open a new Terminal.app tab and run a command in it.
 * Uses AppleScript for tab management (macOS only).
 * Returns true on success, false on failure (never throws).
 */
function openTerminalTab(_title: string, command: string): boolean {
  if (!canUseCmux()) return false;

  try {
    // Ensure bun/node are in PATH via mise or homebrew shims
    const pathPrefix = 'eval "$(~/.local/bin/mise activate bash 2>/dev/null)" 2>/dev/null; export PATH="$HOME/.local/bin:$HOME/.bun/bin:/opt/homebrew/bin:$PATH";';
    const fullCmd = `${pathPrefix} ${command}`;

    // Use AppleScript to open a new tab and run the command
    const script = `
      tell application "Terminal"
        activate
        do script "${fullCmd.replace(/"/g, '\\"')}"
      end tell
    `;
    execFileSync("osascript", ["-e", script], { timeout: 5000, stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

/**
 * Open the SDLC dashboard in a new terminal tab.
 * No-op on non-macOS or if cmux not available.
 */
export function openDashboardTab(overseerDir: string, epicId?: string): boolean {
  const flag = epicId ? `--epic ${epicId}` : "--latest";
  return openTerminalTab(
    "SDLC Dashboard",
    `bun ${join(overseerDir, "dashboard.ts")} ${flag}`,
  );
}

/**
 * Create a cmux worktree for a branch. Uses cmux CLI directly.
 * Falls back to git worktree if cmux not available.
 * Returns the worktree path.
 */
export function cmuxNew(branch: string, projectRoot: string): string | null {
  if (!canUseCmux()) return null; // Caller uses its own worktree creation

  try {
    const output = execFileSync(CMUX_PATH, ["new", branch], {
      cwd: projectRoot,
      encoding: "utf-8",
      timeout: 15000,
    });
    // Parse "Worktree ready: /path" from output
    const match = output.match(/Worktree (?:ready|already exists): (.+)/);
    return match ? match[1].trim() : null;
  } catch {
    return null;
  }
}

/**
 * List cmux worktrees.
 */
export function cmuxList(projectRoot: string): string[] {
  if (!isCmuxAvailable()) return [];

  try {
    const output = execFileSync(CMUX_PATH, ["ls"], {
      cwd: projectRoot,
      encoding: "utf-8",
      timeout: 5000,
    });
    if (output.includes("No cmux worktrees")) return [];
    return output.trim().split("\n").filter(Boolean);
  } catch {
    return [];
  }
}

/**
 * Merge a cmux worktree branch. Uses cmux merge for clean merge.
 * Returns true on success.
 */
export function cmuxMerge(branch: string, projectRoot: string): boolean {
  if (!isCmuxAvailable()) return false;

  try {
    execFileSync(CMUX_PATH, ["merge", branch], {
      cwd: projectRoot,
      encoding: "utf-8",
      timeout: 30000,
    });
    return true;
  } catch {
    return false;
  }
}

/**
 * Remove a cmux worktree.
 */
export function cmuxRemove(branch: string, projectRoot: string, force = false): boolean {
  if (!isCmuxAvailable()) return false;

  try {
    const args = ["rm", branch];
    if (force) args.push("-f");
    execFileSync(CMUX_PATH, args, {
      cwd: projectRoot,
      encoding: "utf-8",
      timeout: 10000,
    });
    return true;
  } catch {
    return false;
  }
}

/**
 * Open a browser URL. Platform-safe.
 */
export function openBrowser(url: string): boolean {
  try {
    if (IS_MACOS) {
      execFileSync("open", [url], { timeout: 5000, stdio: "ignore" });
    } else if (process.platform === "linux") {
      spawn("xdg-open", [url], { detached: true, stdio: "ignore" }).unref();
    } else {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

/**
 * Get platform info for logging.
 */
export function getPlatformInfo(): { platform: string; cmux: boolean; ssh: boolean } {
  return {
    platform: process.platform,
    cmux: isCmuxAvailable(),
    ssh: isSSH(),
  };
}
