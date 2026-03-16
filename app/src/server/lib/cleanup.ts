/**
 * Centralized cleanup for graceful shutdown.
 * Each route module registers its cleanup function here.
 */
import { logCleanupError } from "./logger";

const cleanupFns: Array<() => void> = [];

export function registerCleanup(fn: () => void) {
  cleanupFns.push(fn);
}

export function cleanupAll() {
  console.log("Cleaning up child processes...");
  for (const fn of cleanupFns) {
    try { fn(); } catch (err) { logCleanupError("shutdown", err); }
  }
}
