// Fleet — Interactive Account Setup
// Walks users through configuring their account pool with provider credentials.

import { existsSync, readFileSync, writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { createInterface } from "readline";
import type { Account, FleetConfig, FleetSettings } from "./types";

const FLEET_DIR = join(process.env.HOME || "~", ".claude", "fleet");
const ACCOUNTS_PATH = join(FLEET_DIR, "accounts.json");

// --- Colors ---
const BOLD = "\x1b[1m";
const DIM = "\x1b[2m";
const RESET = "\x1b[0m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const CYAN = "\x1b[36m";
const RED = "\x1b[31m";

// --- Provider definitions ---

interface ProviderDef {
  name: string;
  envVars: Array<{ key: string; label: string; hint: string; required: boolean }>;
  description: string;
}

const PROVIDERS: Record<string, ProviderDef> = {
  anthropic: {
    name: "Anthropic (Claude API)",
    description: "Direct Anthropic API access",
    envVars: [
      { key: "ANTHROPIC_API_KEY", label: "Anthropic API Key", hint: "sk-ant-...", required: true },
    ],
  },
  "bedrock-apikey": {
    name: "AWS Bedrock (API Key)",
    description: "Claude via Bedrock long-term API key (ABSK...)",
    envVars: [
      { key: "CLAUDE_CODE_USE_BEDROCK", label: "Use Bedrock", hint: "1 (auto-set)", required: false },
      { key: "AWS_BEARER_TOKEN_BEDROCK", label: "Bedrock API Key", hint: "ABSK...", required: true },
      { key: "AWS_REGION", label: "AWS Region", hint: "e.g. us-east-1", required: false },
    ],
  },
  "bedrock-iam": {
    name: "AWS Bedrock (IAM Credentials)",
    description: "Claude via Bedrock with AWS access keys",
    envVars: [
      { key: "CLAUDE_CODE_USE_BEDROCK", label: "Use Bedrock", hint: "1 (auto-set)", required: false },
      { key: "AWS_ACCESS_KEY_ID", label: "AWS Access Key ID", hint: "AKIA...", required: true },
      { key: "AWS_SECRET_ACCESS_KEY", label: "AWS Secret Access Key", hint: "...", required: true },
      { key: "AWS_SESSION_TOKEN", label: "AWS Session Token (optional)", hint: "leave blank for long-term keys", required: false },
      { key: "AWS_REGION", label: "AWS Region", hint: "e.g. us-east-1", required: false },
    ],
  },
  openai: {
    name: "OpenAI",
    description: "GPT-4o, Codex, o3-mini",
    envVars: [
      { key: "OPENAI_API_KEY", label: "OpenAI API Key", hint: "sk-...", required: true },
    ],
  },
  google: {
    name: "Google (Gemini)",
    description: "Gemini 2.5 Pro/Flash",
    envVars: [
      { key: "GOOGLE_GENERATIVE_AI_API_KEY", label: "Google AI API Key", hint: "AIza...", required: true },
    ],
  },
  groq: {
    name: "Groq",
    description: "Fast inference (Llama, DeepSeek)",
    envVars: [
      { key: "GROQ_API_KEY", label: "Groq API Key", hint: "gsk_...", required: true },
    ],
  },
  mistral: {
    name: "Mistral",
    description: "Mistral Large/Small",
    envVars: [
      { key: "MISTRAL_API_KEY", label: "Mistral API Key", hint: "...", required: true },
    ],
  },
  openrouter: {
    name: "OpenRouter",
    description: "100+ models via single key",
    envVars: [
      { key: "OPENROUTER_API_KEY", label: "OpenRouter API Key", hint: "sk-or-...", required: true },
    ],
  },
  xai: {
    name: "xAI (Grok)",
    description: "Grok-3, Grok-3 Mini",
    envVars: [
      { key: "XAI_API_KEY", label: "xAI API Key", hint: "xai-...", required: true },
    ],
  },
  deepseek: {
    name: "DeepSeek",
    description: "DeepSeek Chat/Reasoner",
    envVars: [
      { key: "DEEPSEEK_API_KEY", label: "DeepSeek API Key", hint: "sk-...", required: true },
    ],
  },
  cohere: {
    name: "Cohere",
    description: "Command R+, Command R",
    envVars: [
      { key: "COHERE_API_KEY", label: "Cohere API Key", hint: "...", required: true },
    ],
  },
  together: {
    name: "Together AI",
    description: "Llama, Qwen, open-source models",
    envVars: [
      { key: "TOGETHER_API_KEY", label: "Together API Key", hint: "...", required: true },
    ],
  },
};

const PROVIDER_IDS = Object.keys(PROVIDERS);

// --- Readline helpers ---

function createRl() {
  return createInterface({ input: process.stdin, output: process.stderr, terminal: true });
}

function ask(rl: ReturnType<typeof createInterface>, question: string, defaultVal?: string): Promise<string> {
  const suffix = defaultVal ? ` ${DIM}[${defaultVal}]${RESET}` : "";
  return new Promise((resolve) => {
    rl.question(`  ${question}${suffix}: `, (answer) => {
      resolve(answer.trim() || defaultVal || "");
    });
  });
}

function askYesNo(rl: ReturnType<typeof createInterface>, question: string, defaultYes = true): Promise<boolean> {
  const hint = defaultYes ? "Y/n" : "y/N";
  return new Promise((resolve) => {
    rl.question(`  ${question} [${hint}]: `, (answer) => {
      const a = answer.trim().toLowerCase();
      if (a === "") resolve(defaultYes);
      else resolve(a === "y" || a === "yes");
    });
  });
}

function maskKey(key: string): string {
  if (key.length <= 8) return "****";
  return `${key.slice(0, 4)}...${key.slice(-4)}`;
}

// --- Main setup flow ---

export async function runSetup(): Promise<void> {
  const rl = createRl();

  console.error("");
  console.error(`${BOLD}Fleet — Interactive Account Setup${RESET}`);
  console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.error("");

  // Load existing config if any
  let existingAccounts: Account[] = [];
  if (existsSync(ACCOUNTS_PATH)) {
    try {
      const raw = JSON.parse(readFileSync(ACCOUNTS_PATH, "utf-8"));
      existingAccounts = raw.accounts || [];
      if (existingAccounts.length > 0) {
        console.error(`  ${CYAN}Existing accounts found:${RESET}`);
        for (const acct of existingAccounts) {
          const creds = Object.keys(acct.credentials);
          console.error(`    ${GREEN}•${RESET} ${acct.id}: ${acct.label} (${creds.join(", ")})`);
        }
        console.error("");

        const keepExisting = await askYesNo(rl, "Keep existing accounts and add more?", true);
        if (!keepExisting) {
          const confirmWipe = await askYesNo(rl, `${RED}Delete all ${existingAccounts.length} existing accounts?${RESET}`, false);
          if (confirmWipe) {
            existingAccounts = [];
            console.error(`  ${YELLOW}Cleared existing accounts${RESET}`);
          }
        }
        console.error("");
      }
    } catch {
      // Corrupt config — start fresh
      existingAccounts = [];
    }
  }

  // How many new accounts?
  const countStr = await ask(rl, `How many ${BOLD}new${RESET} accounts to add?`, "2");
  const newCount = Math.max(0, Math.min(20, parseInt(countStr, 10) || 2));

  if (newCount === 0 && existingAccounts.length === 0) {
    console.error(`  ${RED}Need at least one account. Exiting.${RESET}`);
    rl.close();
    return;
  }

  const accounts: Account[] = [...existingAccounts];
  const startIdx = existingAccounts.length + 1;

  // Collect each account
  for (let i = 0; i < newCount; i++) {
    const acctNum = startIdx + i;
    console.error("");
    console.error(`${BOLD}━━━ Account ${acctNum} of ${startIdx + newCount - 1} ━━━${RESET}`);
    console.error("");

    const label = await ask(rl, "Account label (e.g. 'Personal', 'Work AWS')", `Account ${acctNum}`);
    const id = `acct-${acctNum}`;

    // Show provider menu
    console.error("");
    console.error(`  ${BOLD}Available providers:${RESET}`);
    for (let p = 0; p < PROVIDER_IDS.length; p++) {
      const pid = PROVIDER_IDS[p];
      const pdef = PROVIDERS[pid];
      console.error(`    ${BOLD}${p + 1}${RESET}) ${pdef.name} ${DIM}— ${pdef.description}${RESET}`);
    }
    console.error("");

    const selectedStr = await ask(
      rl,
      `Select providers (comma-separated numbers, e.g. ${BOLD}1,3${RESET} for Anthropic+OpenAI)`,
      "1",
    );

    // Parse selections
    const selectedNums = selectedStr.split(",").map((s) => parseInt(s.trim(), 10) - 1).filter((n) => n >= 0 && n < PROVIDER_IDS.length);
    if (selectedNums.length === 0) {
      console.error(`  ${YELLOW}No valid providers selected, defaulting to Anthropic${RESET}`);
      selectedNums.push(0);
    }

    const selectedProviders = selectedNums.map((n) => PROVIDER_IDS[n]);
    console.error(`  ${GREEN}Selected:${RESET} ${selectedProviders.map((p) => PROVIDERS[p].name).join(", ")}`);
    console.error("");

    // Collect credentials for each selected provider
    const credentials: Record<string, string> = {};

    for (const pid of selectedProviders) {
      const pdef = PROVIDERS[pid];
      console.error(`  ${CYAN}${pdef.name}:${RESET}`);

      for (const envVar of pdef.envVars) {
        if (!envVar.required && envVar.key === "CLAUDE_CODE_USE_BEDROCK") {
          credentials[envVar.key] = "1"; // Auto-set for all Bedrock variants
          continue;
        }

        const defaultVal = !envVar.required && envVar.key === "AWS_REGION" ? "us-east-1" : undefined;
        const value = await ask(rl, `  ${envVar.label} ${DIM}(${envVar.hint})${RESET}`, defaultVal);

        if (value) {
          credentials[envVar.key] = value;
        }
      }
    }

    // Validate we got at least one credential
    const credCount = Object.keys(credentials).filter((k) => !["CLAUDE_CODE_USE_BEDROCK", "AWS_REGION"].includes(k)).length;
    if (credCount === 0) {
      console.error(`  ${RED}No credentials entered — skipping this account${RESET}`);
      continue;
    }

    accounts.push({ id, label, credentials });
    console.error(`  ${GREEN}✓${RESET} Account "${label}" configured with ${Object.keys(credentials).length} credential(s)`);
  }

  if (accounts.length === 0) {
    console.error(`\n  ${RED}No accounts configured. Exiting.${RESET}`);
    rl.close();
    return;
  }

  // Settings
  console.error("");
  console.error(`${BOLD}━━━ Fleet Settings ━━━${RESET}`);
  console.error("");

  const maxConcurrent = parseInt(
    await ask(rl, "Max concurrent workers", String(Math.min(accounts.length, 4))),
    10,
  ) || 4;

  const runtimeChoice = await ask(rl, "Container runtime (docker/podman)", "docker");
  const runtime = runtimeChoice === "podman" ? "podman" : "docker";

  const memoryChoice = await ask(rl, "Container memory limit", "4g");
  const cpuChoice = await ask(rl, "Container CPU limit", "2");

  // Build config
  const config: FleetConfig = {
    accounts,
    settings: {
      maxConcurrent,
      cooldownMs: 60_000,
      containerImage: "claude-fleet:latest",
      runtime: runtime as "docker" | "podman",
      taskTimeoutMs: 600_000,
      containerMemory: memoryChoice,
      containerCpus: cpuChoice,
      maxTotalSpawns: 500,
    },
  };

  // Review
  console.error("");
  console.error(`${BOLD}━━━ Review ━━━${RESET}`);
  console.error("");
  console.error(`  ${BOLD}Accounts (${accounts.length}):${RESET}`);
  for (const acct of accounts) {
    const creds = Object.entries(acct.credentials)
      .map(([k, v]) => `${k}=${maskKey(v)}`)
      .join(", ");
    console.error(`    ${GREEN}•${RESET} ${acct.id}: ${acct.label}`);
    console.error(`      ${DIM}${creds}${RESET}`);
  }
  console.error("");
  console.error(`  ${BOLD}Settings:${RESET}`);
  console.error(`    Workers: ${maxConcurrent} | Runtime: ${runtime} | Memory: ${memoryChoice} | CPUs: ${cpuChoice}`);
  console.error("");

  const confirm = await askYesNo(rl, `${BOLD}Save this configuration?${RESET}`, true);

  if (!confirm) {
    console.error(`  ${YELLOW}Aborted — no changes made.${RESET}`);
    rl.close();
    return;
  }

  // Write config
  if (!existsSync(FLEET_DIR)) {
    mkdirSync(FLEET_DIR, { recursive: true, mode: 0o700 });
  }
  writeFileSync(ACCOUNTS_PATH, JSON.stringify(config, null, 2) + "\n", { mode: 0o600 });

  console.error("");
  console.error(`  ${GREEN}${BOLD}✓ Fleet configured!${RESET}`);
  console.error(`  ${DIM}Config saved to: ${ACCOUNTS_PATH}${RESET}`);
  console.error("");
  console.error(`  ${BOLD}Next steps:${RESET}`);
  console.error(`    1. Build the container image:  ${CYAN}bun fleet/fleet.ts --build-image${RESET}`);
  console.error(`    2. Run a task:                 ${CYAN}bun fleet/fleet.ts --pool tasks.json${RESET}`);
  console.error(`    3. Check status:               ${CYAN}bun fleet/fleet.ts --status${RESET}`);
  console.error(`    4. Edit config later:          ${CYAN}bun fleet/fleet.ts --setup${RESET}`);
  console.error("");

  rl.close();
}

/** Quick add a single account to existing config (non-interactive shortcut). */
export function addAccount(label: string, credentials: Record<string, string>): string {
  let config: FleetConfig;

  if (existsSync(ACCOUNTS_PATH)) {
    const raw = JSON.parse(readFileSync(ACCOUNTS_PATH, "utf-8"));
    config = raw as FleetConfig;
  } else {
    if (!existsSync(FLEET_DIR)) mkdirSync(FLEET_DIR, { recursive: true, mode: 0o700 });
    config = {
      accounts: [],
      settings: {
        maxConcurrent: 4,
        cooldownMs: 60_000,
        containerImage: "claude-fleet:latest",
        runtime: "docker",
        taskTimeoutMs: 600_000,
        containerMemory: "4g",
        containerCpus: "2",
        maxTotalSpawns: 500,
      },
    };
  }

  const id = `acct-${config.accounts.length + 1}`;
  config.accounts.push({ id, label, credentials });

  writeFileSync(ACCOUNTS_PATH, JSON.stringify(config, null, 2) + "\n", { mode: 0o600 });
  return `Added account "${label}" (${id}) with ${Object.keys(credentials).length} credential(s)`;
}

/**
 * Load accounts from a CSV file. Replaces all existing accounts.
 *
 * Supported CSV formats:
 *   1. One key per line:          ABSK_key1\nABSK_key2\nABSK_key3
 *   2. Comma-separated one line:  ABSK_key1,ABSK_key2,ABSK_key3
 *   3. Label + key:               Bedrock 1,ABSK_key1\nBedrock 2,ABSK_key2
 *   4. Header row auto-detected:  key\nABSK_key1\nABSK_key2
 *
 * All keys are treated as Bedrock API keys (AWS_BEARER_TOKEN_BEDROCK).
 * Region defaults to us-east-1 (override with --region flag).
 */
export function loadFromCsv(csvPath: string, region = "us-east-1"): string {
  if (!existsSync(csvPath)) {
    throw new Error(`CSV file not found: ${csvPath}`);
  }

  const raw = readFileSync(csvPath, "utf-8").trim();
  if (!raw) throw new Error("CSV file is empty");

  // Parse keys from CSV
  const keys: Array<{ label: string; key: string }> = [];

  const lines = raw.split("\n").map((l) => l.trim()).filter((l) => l && !l.startsWith("#"));

  // Detect format
  if (lines.length === 1 && lines[0].includes(",")) {
    // Single line, comma-separated keys
    const parts = lines[0].split(",").map((s) => s.trim()).filter(Boolean);
    for (const [i, part] of parts.entries()) {
      // Skip if it looks like a header
      if (part.toLowerCase() === "key" || part.toLowerCase() === "api_key") continue;
      keys.push({ label: `Bedrock ${i + 1}`, key: part });
    }
  } else {
    // Multi-line: either "key" per line or "label,key" per line
    for (const [i, line] of lines.entries()) {
      // Skip header row
      if (i === 0 && (line.toLowerCase().includes("key") && !line.startsWith("ABSK"))) continue;

      if (line.includes(",")) {
        // label,key format
        const commaIdx = line.lastIndexOf(",");
        const maybeLabelPart = line.slice(0, commaIdx).trim();
        const maybeKeyPart = line.slice(commaIdx + 1).trim();

        // Determine which side is the key (starts with ABSK or is longer)
        if (maybeKeyPart.startsWith("ABSK")) {
          keys.push({ label: maybeLabelPart || `Bedrock ${keys.length + 1}`, key: maybeKeyPart });
        } else if (maybeLabelPart.startsWith("ABSK")) {
          keys.push({ label: maybeKeyPart || `Bedrock ${keys.length + 1}`, key: maybeLabelPart });
        } else {
          // Assume second column is key
          keys.push({ label: maybeLabelPart || `Bedrock ${keys.length + 1}`, key: maybeKeyPart });
        }
      } else {
        // Just a key per line
        keys.push({ label: `Bedrock ${keys.length + 1}`, key: line });
      }
    }
  }

  if (keys.length === 0) {
    throw new Error("No keys found in CSV file");
  }

  // Build accounts
  const accounts: Account[] = keys.map((k, i) => ({
    id: `acct-${i + 1}`,
    label: k.label,
    credentials: {
      CLAUDE_CODE_USE_BEDROCK: "1",
      AWS_BEARER_TOKEN_BEDROCK: k.key,
      AWS_REGION: region,
    },
  }));

  // Build config (preserve existing settings if config exists)
  let settings = {
    maxConcurrent: Math.min(accounts.length, 10),
    cooldownMs: 60_000,
    containerImage: "claude-fleet:latest",
    runtime: "docker" as const,
    taskTimeoutMs: 600_000,
    containerMemory: "4g",
    containerCpus: "2",
    maxTotalSpawns: 500,
  };

  if (existsSync(ACCOUNTS_PATH)) {
    try {
      const existing = JSON.parse(readFileSync(ACCOUNTS_PATH, "utf-8"));
      if (existing.settings) settings = { ...settings, ...existing.settings };
    } catch { /* use defaults */ }
  }

  // Adjust maxConcurrent to match account count
  settings.maxConcurrent = Math.min(accounts.length, settings.maxConcurrent);

  const config: FleetConfig = { accounts, settings };

  if (!existsSync(FLEET_DIR)) {
    mkdirSync(FLEET_DIR, { recursive: true, mode: 0o700 });
  }
  writeFileSync(ACCOUNTS_PATH, JSON.stringify(config, null, 2) + "\n", { mode: 0o600 });

  // Summary
  const lines_out: string[] = [];
  lines_out.push(`Loaded ${accounts.length} Bedrock account(s) from ${csvPath}`);
  for (const acct of accounts) {
    const masked = acct.credentials.AWS_BEARER_TOKEN_BEDROCK;
    lines_out.push(`  ${acct.id}: ${acct.label} (${masked.slice(0, 4)}...${masked.slice(-4)}, ${region})`);
  }
  lines_out.push(`Config: ${ACCOUNTS_PATH}`);
  lines_out.push(`Workers: ${settings.maxConcurrent} (auto-set to account count)`);
  return lines_out.join("\n");
}
