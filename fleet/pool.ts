// Fleet — Account Pool Manager
// Manages a pool of credential sets with round-robin allocation,
// cooldown on rate limits, and state tracking.

import { readFileSync, existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import type { AccountState, AccountStatus, FleetConfig, FleetSettings } from "./types";

const FLEET_DIR = join(process.env.HOME || "~", ".claude", "fleet");
const ACCOUNTS_PATH = join(FLEET_DIR, "accounts.json");

export class AccountPool {
  private statuses: Map<string, AccountStatus> = new Map();
  private roundRobinIndex = 0;
  private cooldownMs: number;
  private totalSpawned = 0;
  private maxTotalSpawns: number;
  private availableWaiters: Array<() => void> = [];

  constructor(config: FleetConfig) {
    this.cooldownMs = config.settings.cooldownMs;
    this.maxTotalSpawns = config.settings.maxTotalSpawns;
    for (const account of config.accounts) {
      this.statuses.set(account.id, {
        account,
        state: "idle",
        workerId: null,
        currentTaskId: null,
        cooldownUntil: null,
        tasksCompleted: 0,
        tasksFailed: 0,
        lastUsed: null,
      });
    }
  }

  /** Number of accounts in the pool. */
  get size(): number {
    return this.statuses.size;
  }

  /** Expire any cooldowns that have elapsed. */
  private expireCooldowns(): void {
    const now = Date.now();
    for (const status of this.statuses.values()) {
      if (status.state === "cooldown" && status.cooldownUntil) {
        if (new Date(status.cooldownUntil).getTime() <= now) {
          status.state = "idle";
          status.cooldownUntil = null;
        }
      }
    }
  }

  /** Allocate the next available account (round-robin). Skips accounts in excludeIds. */
  allocate(taskId: string, excludeIds: string[] = []): AccountStatus | null {
    if (this.totalSpawned >= this.maxTotalSpawns) {
      return null; // Safety limit reached
    }

    const accounts = Array.from(this.statuses.values());
    this.expireCooldowns();

    const excludeSet = new Set(excludeIds);

    // Round-robin through idle accounts, skipping excluded ones
    const startIdx = this.roundRobinIndex;
    for (let i = 0; i < accounts.length; i++) {
      const idx = (startIdx + i) % accounts.length;
      const status = accounts[idx];
      if (status.state === "idle" && !excludeSet.has(status.account.id)) {
        status.state = "busy";
        status.currentTaskId = taskId;
        status.lastUsed = new Date().toISOString();
        this.roundRobinIndex = (idx + 1) % accounts.length;
        this.totalSpawned++;
        return status;
      }
    }

    // If all idle accounts are excluded, fall back to any idle account (better than nothing)
    if (excludeIds.length > 0) {
      for (let i = 0; i < accounts.length; i++) {
        const idx = (startIdx + i) % accounts.length;
        const status = accounts[idx];
        if (status.state === "idle") {
          status.state = "busy";
          status.currentTaskId = taskId;
          status.lastUsed = new Date().toISOString();
          this.roundRobinIndex = (idx + 1) % accounts.length;
          this.totalSpawned++;
          return status;
        }
      }
    }

    return null; // No idle accounts
  }

  /** Check if spawn limit has been reached. */
  get spawnLimitReached(): boolean {
    return this.totalSpawned >= this.maxTotalSpawns;
  }

  /** Release an account back to idle. */
  release(accountId: string, success: boolean): void {
    const status = this.statuses.get(accountId);
    if (!status) return;

    if (success) {
      status.tasksCompleted++;
    } else {
      status.tasksFailed++;
    }
    status.state = "idle";
    status.currentTaskId = null;
    status.workerId = null;

    // Notify anyone waiting for an available account
    this.notifyAvailable();
  }

  /** Wake the first waiter when an account becomes available. */
  private notifyAvailable(): void {
    if (this.availableWaiters.length > 0) {
      const waiter = this.availableWaiters.shift()!;
      waiter();
    }
  }

  /** Put an account in cooldown (e.g. after rate limit 429). */
  cooldown(accountId: string): void {
    const status = this.statuses.get(accountId);
    if (!status) return;

    status.state = "cooldown";
    status.cooldownUntil = new Date(Date.now() + this.cooldownMs).toISOString();
    status.currentTaskId = null;
    status.workerId = null;
  }

  /** Mark an account as errored (manual intervention needed). */
  markError(accountId: string): void {
    const status = this.statuses.get(accountId);
    if (!status) return;
    status.state = "error";
    status.currentTaskId = null;
    status.workerId = null;
  }

  /** Get a specific account status. */
  get(accountId: string): AccountStatus | undefined {
    return this.statuses.get(accountId);
  }

  /** Get all account statuses. */
  all(): AccountStatus[] {
    return Array.from(this.statuses.values());
  }

  /** Count accounts by state. */
  counts(): Record<AccountState, number> {
    const result: Record<AccountState, number> = { idle: 0, busy: 0, cooldown: 0, error: 0, disabled: 0 };
    for (const status of this.statuses.values()) {
      result[status.state]++;
    }
    return result;
  }

  /** Number of currently idle accounts. */
  get availableCount(): number {
    return this.counts().idle;
  }

  /** Wait for at least one account to become available. Event-driven with cooldown fallback. */
  async waitForAvailable(timeoutMs = 120_000): Promise<AccountStatus | null> {
    // Check immediately
    this.expireCooldowns();
    for (const status of this.statuses.values()) {
      if (status.state === "idle") return status;
    }

    return new Promise((resolve) => {
      let resolved = false;

      const done = (result: AccountStatus | null) => {
        if (resolved) return;
        resolved = true;
        clearTimeout(timer);
        clearInterval(cooldownCheck);
        // Remove from waiters
        const idx = this.availableWaiters.indexOf(onRelease);
        if (idx >= 0) this.availableWaiters.splice(idx, 1);
        resolve(result);
      };

      // Timeout
      const timer = setTimeout(() => done(null), timeoutMs);

      // Woken by release()
      const onRelease = () => {
        this.expireCooldowns();
        for (const status of this.statuses.values()) {
          if (status.state === "idle") { done(status); return; }
        }
        // Account was re-allocated before we could grab it — re-queue
        if (!resolved) this.availableWaiters.push(onRelease);
      };

      this.availableWaiters.push(onRelease);

      // Periodic cooldown expiry check (only matters when all accounts are cooling down)
      const cooldownCheck = setInterval(() => {
        this.expireCooldowns();
        for (const status of this.statuses.values()) {
          if (status.state === "idle") { done(status); return; }
        }
      }, 1000);
    });
  }

  /** Set the container ID for a busy account. */
  setWorker(accountId: string, workerId: string): void {
    const status = this.statuses.get(accountId);
    if (status) status.workerId = workerId;
  }
}

// --- Config Loading ---

/** Load fleet config from disk. Creates default if missing. */
export function loadFleetConfig(configPath?: string): FleetConfig {
  const path = configPath || ACCOUNTS_PATH;

  if (!existsSync(path)) {
    throw new Error(
      `Fleet config not found at ${path}\n` +
      `Create it with: bun fleet/fleet.ts --init\n` +
      `Or manually create ${ACCOUNTS_PATH} with your account credentials.`
    );
  }

  const raw = JSON.parse(readFileSync(path, "utf-8"));

  // Validate accounts
  if (!Array.isArray(raw.accounts) || raw.accounts.length === 0) {
    throw new Error("Fleet config must have at least one account in 'accounts' array");
  }
  for (const acct of raw.accounts) {
    if (!acct.id || !acct.credentials || typeof acct.credentials !== "object") {
      throw new Error(`Invalid account: ${JSON.stringify(acct)}. Need 'id' and 'credentials'.`);
    }
  }

  // Merge with defaults
  const settings: FleetSettings = {
    maxConcurrent: raw.settings?.maxConcurrent ?? 4,
    cooldownMs: raw.settings?.cooldownMs ?? 60_000,
    taskTimeoutMs: raw.settings?.taskTimeoutMs ?? 600_000,
    worktreeDir: raw.settings?.worktreeDir ?? ".fleet/worktrees",
    maxTotalSpawns: raw.settings?.maxTotalSpawns ?? 500,
  };

  return { accounts: raw.accounts, settings };
}

/** Create a default fleet config with placeholder accounts. */
export function initFleetConfig(): string {
  if (!existsSync(FLEET_DIR)) {
    mkdirSync(FLEET_DIR, { recursive: true, mode: 0o700 });
  }

  if (existsSync(ACCOUNTS_PATH)) {
    return `Config already exists at ${ACCOUNTS_PATH}`;
  }

  const template: FleetConfig = {
    accounts: [
      {
        id: "acct-1",
        label: "Account 1 — edit credentials",
        credentials: {
          ANTHROPIC_API_KEY: "sk-ant-REPLACE_ME",
        },
      },
      {
        id: "acct-2",
        label: "Account 2 — edit credentials",
        credentials: {
          ANTHROPIC_API_KEY: "sk-ant-REPLACE_ME",
        },
      },
    ],
    settings: {
      maxConcurrent: 4,
      cooldownMs: 60_000,
      taskTimeoutMs: 600_000,
      worktreeDir: ".fleet/worktrees",
      maxTotalSpawns: 500,
    },
  };

  writeFileSync(ACCOUNTS_PATH, JSON.stringify(template, null, 2), { mode: 0o600 });
  return `Created fleet config at ${ACCOUNTS_PATH}\nEdit it to add your account credentials.`;
}

// Fleet v2 is containerless — no runtime detection needed
