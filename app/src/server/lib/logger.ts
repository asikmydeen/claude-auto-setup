/**
 * Lightweight structured logger for the Sidekick server.
 * Adds timestamps, severity tags, and context to console output.
 * No external dependencies — suitable for a localhost desktop app.
 */

function ts(): string {
  return new Date().toISOString();
}

function formatErr(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  return String(err);
}

export function logError(context: string, err: unknown): void {
  console.error(`[ERROR] ${ts()} [${context}]`, err instanceof Error ? err : formatErr(err));
}

export function logWarn(context: string, msg: string): void {
  console.warn(`[WARN] ${ts()} [${context}] ${msg}`);
}

export function logInfo(context: string, msg: string): void {
  console.log(`[INFO] ${ts()} [${context}] ${msg}`);
}

export function logCleanupError(context: string, err: unknown): void {
  console.error(`[CLEANUP] ${ts()} [${context}] ${formatErr(err)}`);
}

export function logFatal(context: string, err: unknown): void {
  console.error(`[FATAL] ${ts()} [${context}]`, err instanceof Error ? err : formatErr(err));
}
