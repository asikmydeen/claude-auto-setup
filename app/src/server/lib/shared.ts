/**
 * Shared types, constants, and utility functions used across server route modules.
 */
import {
  readFileSync,
  writeFileSync,
  existsSync,
  mkdirSync,
} from "fs";
import { join, dirname, resolve } from "path";
import { homedir } from "os";
import { execFileSync } from "child_process";
import type { spawn } from "child_process";

// --- Constants ---
export const HOME = homedir();
export const CLAUDE_DIR = join(HOME, ".claude");
export const AGENTS_DIR = join(CLAUDE_DIR, "agents");
export const SCRATCH_DIR = join(CLAUDE_DIR, "scratch");
export const SETTINGS_PATH = join(CLAUDE_DIR, "settings.json");
export const INTEGRATIONS_PATH = join(CLAUDE_DIR, "integrations.json");
export const TMP_IMAGES_DIR = join(CLAUDE_DIR, "tmp-images");

export function findProjectRoot(): string {
  const candidates = [
    resolve(dirname(new URL(import.meta.url).pathname), "../../../.."),
    join(HOME, "projects/claude-auto-setup"),
    join(HOME, "claude-code-setup"),
  ];
  for (const c of candidates) {
    if (existsSync(join(c, "install.sh"))) return c;
  }
  return candidates[0];
}

export const PROJECT_ROOT = findProjectRoot();
export const UNIVERSAL_DIR = join(PROJECT_ROOT, "universal");

export const EXTRA_PATH_DIRS = [
  join(HOME, ".local/share/mise/shims"),
  join(HOME, ".local/bin"),
  join(HOME, ".bun/bin"),
  "/opt/homebrew/bin",
  "/usr/local/bin",
  join(HOME, ".nvm/versions/node", "*/bin"),
].join(":");

// --- Types ---
export interface IntegrationsConfig {
  github?: { pat: string; username?: string; connectedAt?: string };
  supabase?: {
    accessToken: string;
    url: string;
    anonKey: string;
    serviceRoleKey?: string;
    projectRef?: string;
    projectName?: string;
    orgName?: string;
    connectedAt?: string;
  };
  aws?: { activeProfile?: string; adaAccount?: string; adaRole?: string };
  [key: string]: unknown;
}

export interface ClaudeMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface ClaudeSession {
  id: string;
  prompt: string;
  status: "running" | "done" | "error" | "stopped";
  messages: ClaudeMessage[];
  output: string[];
  exitCode: number | null;
  startedAt: string;
  endedAt?: string;
  pid?: number;
  claudeSessionId?: string;
  filesChanged?: string[];
  cwd: string;
  process?: ReturnType<typeof spawn>;
}

export interface StreamEvent {
  type: "text" | "tool_use" | "tool_result" | "agent_start" | "agent_output" | "agent_done" | "result";
  content?: string;
  sessionId?: string;
  tool?: string;
  toolUseId?: string;
  agentName?: string;
  agentPrompt?: string;
  input?: string;
  resultText?: string;
}

export interface ProjectEnvConfig {
  env?: Record<string, string>;
  supabase?: { projectRef?: string; url?: string; anonKey?: string };
  aws?: { profile?: string };
}

// --- Integrations ---
export function loadIntegrations(): IntegrationsConfig {
  try {
    if (existsSync(INTEGRATIONS_PATH)) return JSON.parse(readFileSync(INTEGRATIONS_PATH, "utf-8"));
  } catch {}
  return {};
}

export function saveIntegrations(config: IntegrationsConfig): void {
  writeFileSync(INTEGRATIONS_PATH, JSON.stringify(config, null, 2), { mode: 0o600 });
}

export function maskSecret(s: string): string {
  if (s.length <= 8) return "****";
  return s.slice(0, 4) + "****" + s.slice(-4);
}

/** Write a .env file with connected integration credentials for a new project. */
export function writeProjectDotEnv(projectDir: string): string {
  const config = loadIntegrations();
  const lines: string[] = [];
  const promptParts: string[] = [];

  if (config.supabase?.url && config.supabase?.anonKey) {
    lines.push(`SUPABASE_URL=${config.supabase.url}`);
    lines.push(`SUPABASE_ANON_KEY=${config.supabase.anonKey}`);
    lines.push(`REACT_APP_SUPABASE_URL=${config.supabase.url}`);
    lines.push(`REACT_APP_SUPABASE_ANON_KEY=${config.supabase.anonKey}`);
    lines.push(`VITE_SUPABASE_URL=${config.supabase.url}`);
    lines.push(`VITE_SUPABASE_ANON_KEY=${config.supabase.anonKey}`);
    lines.push(`NEXT_PUBLIC_SUPABASE_URL=${config.supabase.url}`);
    lines.push(`NEXT_PUBLIC_SUPABASE_ANON_KEY=${config.supabase.anonKey}`);
    promptParts.push(
      `SUPABASE IS ALREADY CONFIGURED. A .env file has been created with all credentials.` +
      ` The Supabase project URL is: ${config.supabase.url}` +
      (config.supabase.projectName ? ` (project: ${config.supabase.projectName})` : "") +
      `. Do NOT tell the user to add credentials to .env — it's already done.`
    );
  }

  if (config.aws?.activeProfile) {
    lines.push(`AWS_PROFILE=${config.aws.activeProfile}`);
  }

  if (lines.length > 0) {
    const envPath = join(projectDir, ".env");
    if (existsSync(envPath)) {
      const existing = readFileSync(envPath, "utf-8");
      const existingKeys = new Set(existing.split("\n").map(l => l.split("=")[0]).filter(Boolean));
      const newLines = lines.filter(l => !existingKeys.has(l.split("=")[0]));
      if (newLines.length > 0) {
        writeFileSync(envPath, existing.trimEnd() + "\n" + newLines.join("\n") + "\n");
      }
    } else {
      writeFileSync(envPath, lines.join("\n") + "\n");
    }
  }

  return promptParts.join("\n");
}

// --- Sanitization ---
export function sanitize(
  obj: Record<string, unknown>,
  allowed: string[],
): Record<string, unknown> {
  const clean: Record<string, unknown> = {};
  for (const key of allowed) {
    if (
      obj[key] !== undefined &&
      key !== "__proto__" &&
      key !== "constructor" &&
      key !== "prototype"
    ) {
      clean[key] =
        typeof obj[key] === "string"
          ? (obj[key] as string).slice(0, 500)
          : obj[key];
    }
  }
  return clean;
}

// --- Frontmatter parser ---
export function parseFrontmatter(content: string): Record<string, unknown> {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fm: Record<string, unknown> = {};
  for (const line of match[1].split("\n")) {
    const [key, ...rest] = line.split(":");
    if (key && rest.length) {
      let val: unknown = rest.join(":").trim();
      if (typeof val === "string" && val.startsWith("[") && val.endsWith("]")) {
        val = val.slice(1, -1).split(",").map((s: string) => s.trim().replace(/^["']|["']$/g, ""));
      }
      fm[key.trim()] = val;
    }
  }
  return fm;
}

// --- Project Environment ---
export function getProjectEnvPath(projectCwd: string): string {
  return join(projectCwd, ".claude", "project-env.json");
}

export function loadProjectEnv(projectCwd: string): ProjectEnvConfig {
  try {
    const p = getProjectEnvPath(projectCwd);
    if (existsSync(p)) return JSON.parse(readFileSync(p, "utf-8"));
  } catch {}
  return {};
}

export function saveProjectEnv(projectCwd: string, config: ProjectEnvConfig): void {
  const dir = join(projectCwd, ".claude");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(getProjectEnvPath(projectCwd), JSON.stringify(config, null, 2), { mode: 0o600 });
}

// --- LLM Keys ---
export function getLLMKeys(): Record<string, string> {
  const config = loadIntegrations();
  return (config as Record<string, unknown>).llm as Record<string, string> || {};
}

export function saveLLMKeys(keys: Record<string, string>) {
  const config = loadIntegrations();
  (config as Record<string, unknown>).llm = keys;
  saveIntegrations(config);
}

/** Build the merged env for a project: process.env -> global integrations -> project-specific */
export function buildProjectEnv(projectCwd: string): Record<string, string> {
  const env = { ...process.env } as Record<string, string>;
  env.PATH = `${EXTRA_PATH_DIRS}:${env.PATH || "/usr/bin:/bin"}`;
  const globalConfig = loadIntegrations();
  const projectConfig = loadProjectEnv(projectCwd);

  if (globalConfig.supabase?.url) {
    env.SUPABASE_URL = globalConfig.supabase.url;
    env.SUPABASE_ANON_KEY = globalConfig.supabase.anonKey;
  }
  if (globalConfig.aws?.activeProfile) {
    env.AWS_PROFILE = globalConfig.aws.activeProfile;
  }
  if (projectConfig.supabase?.url) {
    env.SUPABASE_URL = projectConfig.supabase.url;
    env.SUPABASE_ANON_KEY = projectConfig.supabase.anonKey || "";
  }
  if (projectConfig.aws?.profile) {
    env.AWS_PROFILE = projectConfig.aws.profile;
  }
  if (projectConfig.env) {
    for (const [key, val] of Object.entries(projectConfig.env)) {
      env[key] = val;
    }
  }

  // Bridge LLM API keys from AI Models settings into CLI agent env vars
  const llmKeys = getLLMKeys();
  if (llmKeys.anthropicApiKey) env.ANTHROPIC_API_KEY = llmKeys.anthropicApiKey;
  if (llmKeys.bedrockApiKey) {
    if (llmKeys.bedrockApiKey.startsWith("profile:")) {
      env.AWS_PROFILE = llmKeys.bedrockApiKey.slice(8);
      env.AWS_REGION = env.AWS_REGION || "us-east-1";
    }
    if (!llmKeys.anthropicApiKey) {
      env.CLAUDE_CODE_USE_BEDROCK = "1";
      env.AWS_REGION = env.AWS_REGION || "us-east-1";
    }
  }
  if (llmKeys.openaiApiKey) env.OPENAI_API_KEY = llmKeys.openaiApiKey;
  if (llmKeys.googleApiKey) env.GOOGLE_GENERATIVE_AI_API_KEY = llmKeys.googleApiKey;
  if (llmKeys.mistralApiKey) env.MISTRAL_API_KEY = llmKeys.mistralApiKey;
  if (llmKeys.groqApiKey) env.GROQ_API_KEY = llmKeys.groqApiKey;
  if (llmKeys.openRouterApiKey) env.OPENROUTER_API_KEY = llmKeys.openRouterApiKey;

  // Clear nested session markers so dispatched Claude sessions work
  env.CLAUDECODE = "";
  env.CLAUDE_CODE_ENTRYPOINT = "";
  // Keep CLAUDE_CODE_USE_BEDROCK and other auth-related vars

  return env;
}

// --- Claude CLI detection ---
export function findClaudeCLI(): string | null {
  try {
    return execFileSync("which", ["claude"], { encoding: "utf-8", timeout: 5000 }).trim() || null;
  } catch {
    return null;
  }
}
