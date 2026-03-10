/**
 * Canonical status & priority color definitions.
 * Every component that renders a status indicator imports from here.
 */

export const statusBadge: Record<string, string> = {
  // Agent statuses
  active: "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300",
  running: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-300",
  paused: "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300",
  idle: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300",
  archived: "bg-muted text-muted-foreground",

  // Orchestration statuses
  exploring: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
  implementing: "bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300",
  reviewing: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300",
  done: "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300",
  error: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300",
  failed: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300",
  pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300",
};

export const statusBadgeDefault = "bg-muted text-muted-foreground";

export const agentStatusDot: Record<string, string> = {
  running: "bg-cyan-400 animate-pulse",
  active: "bg-green-400",
  exploring: "bg-blue-400 animate-pulse",
  implementing: "bg-violet-400 animate-pulse",
  reviewing: "bg-indigo-400 animate-pulse",
  paused: "bg-yellow-400",
  idle: "bg-yellow-400",
  error: "bg-red-400",
  done: "bg-green-400",
  archived: "bg-neutral-400",
};

export const agentStatusDotDefault = "bg-neutral-400";

export const priorityColor: Record<string, string> = {
  critical: "text-red-600 dark:text-red-400",
  high: "text-orange-600 dark:text-orange-400",
  medium: "text-yellow-600 dark:text-yellow-400",
  low: "text-blue-600 dark:text-blue-400",
};

export const priorityColorDefault = "text-yellow-600 dark:text-yellow-400";
