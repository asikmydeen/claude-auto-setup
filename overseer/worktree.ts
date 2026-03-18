// SDLC Overseer — Git Worktree Manager

import { execFileSync } from "child_process";
import { existsSync, mkdirSync, rmSync } from "fs";
import { join } from "path";

export interface WorktreeInfo {
  path: string;
  branch: string;
  head: string;
}

function git(args: string[], cwd: string, timeout = 30000): string {
  return execFileSync("git", args, { cwd, encoding: "utf-8", timeout, stdio: "pipe" });
}

/**
 * Create a git worktree for a task.
 * Branch: feat/epic-{epicId}/task-{taskId}
 * Path: {projectRoot}/.worktrees/task-{taskId}
 */
export function createWorktree(projectRoot: string, epicId: string, taskId: string): { path: string; branch: string } {
  const worktreeRoot = join(projectRoot, ".worktrees");
  if (!existsSync(worktreeRoot)) mkdirSync(worktreeRoot, { recursive: true });

  const branch = `feat/epic-${epicId.slice(0, 8)}/task-${taskId.slice(0, 8)}`;
  const worktreePath = join(worktreeRoot, `task-${taskId.slice(0, 8)}`);

  if (existsSync(worktreePath)) {
    return { path: worktreePath, branch };
  }
  try {
    git(["worktree", "add", worktreePath, "-b", branch], projectRoot);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes("already exists")) {
      git(["worktree", "add", worktreePath, branch], projectRoot);
    } else {
      throw err;
    }
  }

  return { path: worktreePath, branch };
}

/**
 * List all active worktrees.
 */
export function listWorktrees(projectRoot: string): WorktreeInfo[] {
  const output = git(["worktree", "list", "--porcelain"], projectRoot, 10000);

  const worktrees: WorktreeInfo[] = [];
  let current: Partial<WorktreeInfo> = {};

  for (const line of output.split("\n")) {
    if (line.startsWith("worktree ")) {
      if (current.path) worktrees.push(current as WorktreeInfo);
      current = { path: line.slice(9) };
    } else if (line.startsWith("HEAD ")) {
      current.head = line.slice(5);
    } else if (line.startsWith("branch ")) {
      current.branch = line.slice(7).replace("refs/heads/", "");
    }
  }
  if (current.path) worktrees.push(current as WorktreeInfo);

  return worktrees.filter(w => w.path.includes(".worktrees/"));
}

/**
 * Merge a worktree branch back into main.
 * Returns true on success, conflict file list on conflict.
 */
export function mergeWorktree(projectRoot: string, branch: string): { success: boolean; conflicts?: string[] } {
  try {
    git(["checkout", "main"], projectRoot, 10000);
    git(["merge", branch, "--no-ff", "-m", `merge: ${branch}`], projectRoot, 60000);
    return { success: true };
  } catch {
    try {
      const conflictOutput = git(["diff", "--name-only", "--diff-filter=U"], projectRoot, 5000);
      const conflicts = conflictOutput.trim().split("\n").filter(Boolean);
      if (conflicts.length > 0) {
        try { git(["merge", "--abort"], projectRoot, 5000); } catch { /* no merge in progress */ }
        return { success: false, conflicts };
      }
    } catch { /* no conflicts detectable */ }

    try { git(["merge", "--abort"], projectRoot, 5000); } catch { /* safe */ }
    throw new Error(`Merge failed for branch ${branch}`);
  }
}

/**
 * Remove a worktree and optionally delete its branch.
 */
export function removeWorktree(projectRoot: string, worktreePath: string, branch?: string): void {
  // Direct git
  try {
    git(["worktree", "remove", worktreePath, "--force"], projectRoot, 15000);
  } catch {
    if (existsSync(worktreePath)) {
      rmSync(worktreePath, { recursive: true, force: true });
      git(["worktree", "prune"], projectRoot, 5000);
    }
  }

  if (branch) {
    try { git(["branch", "-d", branch], projectRoot, 5000); } catch { /* branch not merged or doesn't exist */ }
  }
}

/**
 * Clean up all worktrees.
 */
export function cleanupAllWorktrees(projectRoot: string): void {
  for (const wt of listWorktrees(projectRoot)) {
    removeWorktree(projectRoot, wt.path, wt.branch);
  }
}

/**
 * Ensure .worktrees is in .gitignore.
 */
export function ensureWorktreeGitignore(projectRoot: string): void {
  const gitignorePath = join(projectRoot, ".gitignore");
  if (existsSync(gitignorePath)) {
    const content = execFileSync("cat", [gitignorePath], { encoding: "utf-8" });
    if (!content.includes(".worktrees")) {
      const { appendFileSync } = require("fs");
      appendFileSync(gitignorePath, "\n# SDLC Overseer worktrees\n.worktrees/\n");
    }
  }
}
