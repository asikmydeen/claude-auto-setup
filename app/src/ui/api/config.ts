import { api } from "./client";

// --- Types ---

export interface AgentConfig {
  name: string;
  filename: string;
  model?: string;
  tools?: string;
  memory?: string;
  background?: string;
  maxTurns?: string;
  description?: string;
  content: string;
}

export interface Rule {
  filename: string;
  name: string;
  title: string;
  lines: number;
  preview: string;
}

export interface ProviderInfo {
  path: string;
  version: string;
}

export interface ProviderConfig {
  strengths?: string[];
  description?: string;
  [key: string]: unknown;
}

export interface ProvidersResponse {
  config: {
    providers: Record<string, ProviderConfig>;
    task_routing: Record<string, string[]>;
  };
  installed: Record<string, ProviderInfo>;
}

export interface EnforcementState {
  active: boolean;
  edit_count?: number;
  files_changed?: number;
  pua_level?: number;
  failure_count?: number;
  phase?: string;
  agents_spawned?: number;
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
  filesChanged?: string[];
  cwd?: string;
}

export interface FileChangesResponse {
  files: string[];
  cwd: string;
}

export interface ClaudeLaunchResponse {
  pid: number;
  status: string;
}

export interface ClaudeOutputResponse {
  output: string[];
  done: boolean;
  exitCode: number | null;
}

export interface InstallResponse {
  ok: boolean;
  output: string;
  error?: string;
}

export interface SettingsData {
  model?: string;
  enabledPlugins?: Record<string, boolean>;
  permissions?: {
    allow?: string[];
    deny?: string[];
  };
  env?: Record<string, string>;
  [key: string]: unknown;
}

// --- Settings ---

export const fetchSettings = () => api.get<SettingsData>("/settings");

export const saveSettings = (settings: SettingsData) =>
  api.put<{ ok: boolean; settings: SettingsData }>("/settings", settings);

// --- Agent Configs ---

export const fetchAgentConfigs = () => api.get<AgentConfig[]>("/agents/configs");

export const saveAgentConfig = (name: string, config: Record<string, unknown>) =>
  api.put<{ ok: boolean }>(`/agents/configs/${name}`, config);

// --- Providers ---

export const fetchProviders = () => api.get<ProvidersResponse>("/providers");

// --- Rules ---

export const fetchRules = () => api.get<Rule[]>("/rules");

export const fetchRule = (name: string) =>
  api.get<{ content: string }>(`/rules/${name}`);

// --- Enforcement ---

export const fetchEnforcement = () => api.get<EnforcementState>("/enforcement");

// --- Claude Sessions ---

export const fetchClaudeSessions = () =>
  api.get<ClaudeSession[]>("/claude/sessions");

export const fetchClaudeSession = (id: string) =>
  api.get<ClaudeSession>(`/claude/sessions/${id}`);

export const createClaudeSession = (prompt: string, cwd?: string) =>
  api.post<ClaudeSession>("/claude/sessions", { prompt, cwd });

export const stopClaudeSession = (id: string) =>
  api.post<{ ok: boolean }>(`/claude/stop/${id}`, {});

export const deleteClaudeSession = (id: string) =>
  api.get<{ ok: boolean }>(`/claude/sessions/${id}`); // DELETE via custom fetch below

export const deleteClaudeSessionFn = async (id: string) => {
  const res = await fetch(`/api/claude/sessions/${id}`, { method: "DELETE" });
  return res.json();
};

// --- Follow-up / File changes ---

export const sendFollowUp = (sessionId: string, prompt: string) =>
  api.post<ClaudeSession>(`/claude/sessions/${sessionId}/message`, { prompt });

export const fetchFileChanges = () =>
  api.get<FileChangesResponse>("/files/changes");

// Legacy compat
export const launchClaude = (prompt: string, flags?: string[]) =>
  api.post<ClaudeLaunchResponse>("/claude/launch", { prompt, flags });

export const getClaudeOutput = (pid: number) =>
  api.get<ClaudeOutputResponse>(`/claude/${pid}/output`);

// --- Install / Dispatch ---

export const runInstall = (flags: string[]) =>
  api.post<InstallResponse>("/install", { flags });

export const runDispatch = (task: string, type: string, provider?: string) =>
  api.post<{ ok: boolean; output: string }>("/dispatch", { task, type, provider });

// --- Projects ---
export interface ProjectInfo {
  path: string;
  name: string;
  source: string;
}

export const fetchProjects = () =>
  api.get<{ active: string; projects: ProjectInfo[] }>("/projects");

export const addProject = (path: string) =>
  api.post<{ ok: boolean }>("/projects", { path });

export const setActiveProject = (path: string) =>
  api.put<{ ok: boolean; active: string }>("/projects/active", { path });

// --- Filesystem Browsing ---
export interface BrowseResult {
  current: string;
  parent: string | null;
  name: string;
  dirs: Array<{
    name: string;
    path: string;
    isGitRepo: boolean;
    hasPackageJson: boolean;
  }>;
  isGitRepo: boolean;
  hasPackageJson: boolean;
}

export const browseDirectory = (path?: string) =>
  api.get<BrowseResult>(`/filesystem/browse${path ? `?path=${encodeURIComponent(path)}` : ""}`);

// --- Git ---
export interface GitStatus {
  branch: string;
  clean: boolean;
  staged: number;
  modified: number;
  files: Array<{ status: string; file: string }>;
  ahead: number;
  behind: number;
}

export interface GitCommit {
  hash: string;
  short: string;
  subject: string;
  author: string;
  relativeDate: string;
}

export const fetchGitStatus = () => api.get<GitStatus>("/git/status");
export const fetchGitLog = (limit?: number) =>
  api.get<GitCommit[]>(`/git/log${limit ? `?limit=${limit}` : ""}`);

// --- Smart Suggestions ---
export interface Suggestion {
  id: string;
  label: string;
  prompt: string;
  icon: string;
  priority: number;
  category: string;
}

export interface FollowUpSuggestion {
  id: string;
  label: string;
  prompt: string;
  icon: string;
}

export const fetchSuggestions = () => api.get<Suggestion[]>("/suggestions");
export const fetchFollowUpSuggestions = (sessionId: string) =>
  api.get<FollowUpSuggestion[]>(`/suggestions/followup/${sessionId}`);
