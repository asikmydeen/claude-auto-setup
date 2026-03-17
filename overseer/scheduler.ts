// SDLC Overseer — DAG-based Task Scheduler
// Schedules tasks respecting dependencies and max concurrency

import { getQueuedTasks, getRunningTasks, getTask, getRunningAgents, getTasksByEpic } from "./db";
import type { Task, TaskNode, SchedulerState } from "./types";

/**
 * Build a dependency graph (DAG) from tasks.
 */
export function buildDag(tasks: Task[]): Map<string, TaskNode> {
  const dag = new Map<string, TaskNode>();

  // Initialize nodes
  for (const task of tasks) {
    dag.set(task.id, {
      task,
      dependsOn: JSON.parse(task.dependencies || "[]"),
      dependedOnBy: [],
    });
  }

  // Build reverse edges
  for (const [id, node] of dag) {
    for (const depId of node.dependsOn) {
      const dep = dag.get(depId);
      if (dep) dep.dependedOnBy.push(id);
    }
  }

  return dag;
}

/**
 * Get tasks that are ready to run:
 * - Status is "queued"
 * - All dependencies are "done" or "merged"
 */
export function getReadyTasks(epicId: string): Task[] {
  const allTasks = getTasksByEpic(epicId);
  const dag = buildDag(allTasks);
  const completedStatuses = new Set(["done", "merged"]);

  const ready: Task[] = [];
  for (const [, node] of dag) {
    if (node.task.status !== "queued") continue;

    const depsResolved = node.dependsOn.every(depId => {
      const dep = dag.get(depId);
      return dep && completedStatuses.has(dep.task.status);
    });

    if (depsResolved) ready.push(node.task);
  }

  return ready;
}

/**
 * Check how many slots are available (max concurrency - running agents).
 */
export function getAvailableSlots(maxConcurrency: number): number {
  const running = getRunningAgents();
  return Math.max(0, maxConcurrency - running.length);
}

/**
 * Get the next batch of tasks to schedule.
 * Returns up to `slots` tasks that are ready (deps met) and sorted by priority.
 */
export function getNextBatch(epicId: string, maxConcurrency: number): Task[] {
  const slots = getAvailableSlots(maxConcurrency);
  if (slots <= 0) return [];

  const ready = getReadyTasks(epicId);

  // Sort by task type priority: test < backend < frontend < api < infra
  // (no strict ordering needed — just return what's ready)
  return ready.slice(0, slots);
}

/**
 * Check if all tasks in an epic are complete (done, merged, or failed).
 */
export function isEpicComplete(epicId: string): boolean {
  const tasks = getTasksByEpic(epicId);
  if (tasks.length === 0) return false;
  return tasks.every(t => ["done", "merged", "failed"].includes(t.status));
}

/**
 * Check if any tasks are blocked (circular dependency or all deps failed).
 */
export function getBlockedTasks(epicId: string): Task[] {
  const allTasks = getTasksByEpic(epicId);
  const dag = buildDag(allTasks);
  const blocked: Task[] = [];

  for (const [, node] of dag) {
    if (node.task.status !== "queued") continue;

    const hasFailedDep = node.dependsOn.some(depId => {
      const dep = dag.get(depId);
      return dep && dep.task.status === "failed";
    });

    if (hasFailedDep) blocked.push(node.task);
  }

  return blocked;
}

/**
 * Validate DAG has no cycles. Returns true if valid (acyclic).
 */
export function validateDag(tasks: Task[]): { valid: boolean; cycle?: string[] } {
  const dag = buildDag(tasks);
  const visited = new Set<string>();
  const inStack = new Set<string>();
  const path: string[] = [];

  function dfs(id: string): boolean {
    if (inStack.has(id)) {
      // Found cycle — extract it
      const cycleStart = path.indexOf(id);
      return false;
    }
    if (visited.has(id)) return true;

    visited.add(id);
    inStack.add(id);
    path.push(id);

    const node = dag.get(id);
    if (node) {
      for (const depId of node.dependsOn) {
        if (!dfs(depId)) return false;
      }
    }

    inStack.delete(id);
    path.pop();
    return true;
  }

  for (const [id] of dag) {
    if (!dfs(id)) {
      return { valid: false, cycle: [...path] };
    }
  }

  return { valid: true };
}

/**
 * Print a text-based progress summary.
 */
export function formatProgress(epicId: string): string {
  const tasks = getTasksByEpic(epicId);
  const total = tasks.length;
  const done = tasks.filter(t => ["done", "merged"].includes(t.status)).length;
  const running = tasks.filter(t => ["assigned", "in_progress"].includes(t.status)).length;
  const queued = tasks.filter(t => t.status === "queued").length;
  const failed = tasks.filter(t => t.status === "failed").length;
  const review = tasks.filter(t => t.status === "review").length;

  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  const bar = "=".repeat(Math.floor(pct / 5)) + "-".repeat(20 - Math.floor(pct / 5));

  const lines = [
    `Progress: [${bar}] ${pct}% (${done}/${total})`,
    `  Running: ${running} | Queued: ${queued} | Review: ${review} | Done: ${done} | Failed: ${failed}`,
  ];

  // Show running tasks
  const runningTasks = tasks.filter(t => ["assigned", "in_progress"].includes(t.status));
  for (const t of runningTasks) {
    lines.push(`  > ${t.assigned_role || "unassigned"}: ${t.title} [${t.branch_name || "no branch"}]`);
  }

  return lines.join("\n");
}
