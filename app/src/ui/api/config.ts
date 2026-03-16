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

export const createClaudeSession = (prompt: string, cwd?: string, imagePaths?: string[]) =>
  api.post<ClaudeSession>("/claude/sessions", { prompt, cwd, imagePaths });

export const stopClaudeSession = (id: string) =>
  api.post<{ ok: boolean }>(`/claude/stop/${id}`, {});

export const deleteClaudeSession = (id: string) =>
  api.get<{ ok: boolean }>(`/claude/sessions/${id}`); // DELETE via custom fetch below

export const deleteClaudeSessionFn = async (id: string) => {
  const res = await fetch(`/api/claude/sessions/${id}`, { method: "DELETE" });
  return res.json();
};

// --- Follow-up / File changes ---

export const sendFollowUp = (sessionId: string, prompt: string, imagePaths?: string[]) =>
  api.post<ClaudeSession>(`/claude/sessions/${sessionId}/message`, { prompt, imagePaths });

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
export const deleteProject = (path: string, deleteFiles = false) =>
  api.del<{ ok: boolean; deleted: boolean }>(`/projects?path=${encodeURIComponent(path)}&deleteFiles=${deleteFiles}`);
export const revealProject = (path: string) =>
  api.post<{ ok: boolean }>("/projects/reveal", { path });

// --- Per-Project Environment ---
export interface ProjectEnvConfig {
  env?: Record<string, string>;
  supabase?: { projectRef?: string; url?: string; anonKey?: string };
  aws?: { profile?: string };
}

export interface ProjectEnvResponse {
  config: ProjectEnvConfig;
  global: {
    supabase: { projectRef?: string; projectName?: string; url?: string } | null;
    aws: { activeProfile: string; profiles: string[] };
  };
  hasProjectEnvFile: boolean;
}

export const fetchProjectEnv = (cwd: string) =>
  api.get<ProjectEnvResponse>(`/projects/env?cwd=${encodeURIComponent(cwd)}`);
export const saveProjectEnv = (cwd: string, config: ProjectEnvConfig) =>
  api.put<{ ok: boolean }>("/projects/env", { cwd, config });
export const patchProjectEnv = (cwd: string, patch: Partial<{ env: Record<string, string>; supabase: ProjectEnvConfig["supabase"]; aws: ProjectEnvConfig["aws"] }>) =>
  api.patch<{ ok: boolean; config: ProjectEnvConfig }>("/projects/env", { cwd, ...patch });

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

export const fetchSuggestions = (cwd?: string, sessionId?: string) => {
  const params = new URLSearchParams();
  if (cwd) params.set("cwd", cwd);
  if (sessionId) params.set("sessionId", sessionId);
  const qs = params.toString();
  return api.get<Suggestion[]>(`/suggestions${qs ? `?${qs}` : ""}`);
};
export const fetchFollowUpSuggestions = (sessionId: string) =>
  api.get<FollowUpSuggestion[]>(`/suggestions/followup/${sessionId}`);

// --- Project Intelligence ---
export interface ProjectIntel {
  hasIntel: boolean;
  hasClaude: boolean;
  intel?: string;
  claudeMd?: string;
  summary?: {
    stack?: string;
    commands?: string[];
    lastUpdated?: string;
  };
}

export const fetchProjectIntel = (cwd?: string) =>
  api.get<ProjectIntel>(`/projects/intel${cwd ? `?cwd=${encodeURIComponent(cwd)}` : ""}`);

export const initProject = (cwd?: string) =>
  api.post<{ ok: boolean; output: string }>("/projects/init", { cwd });

// --- Templates (curated design references) ---
export interface TemplateInfo {
  id: string;
  category: string;
  style: string;
  label: string;
  desc: string;
  framework: string;
  uiLib: string;
  tags: string[];
  path: string;
  scripts: string[];
}

export interface TemplateStyleGroup {
  id: string;
  label: string;
  desc: string;
  icon: string;
  templates: TemplateInfo[];
}

export const fetchTemplates = () => api.get<TemplateStyleGroup[]>("/templates");

export interface CreateFromTemplateResponse {
  ok: boolean;
  projectDir: string;
  sessionId: string;
  session: ClaudeSession;
  template: { id: string; label: string; framework: string };
}

export const createFromTemplate = (
  name: string,
  description: string,
  templateId?: string,
  basePath?: string,
) =>
  api.post<CreateFromTemplateResponse>("/projects/create-from-template", { templateId, name, description, basePath });

// --- Project Creator (from scratch) ---
export interface CreateProjectResponse {
  ok: boolean;
  projectDir: string;
  sessionId: string | null;
  session?: ClaudeSession;
}

export const createProject = (
  name: string,
  description: string,
  basePath?: string,
  envVars?: Record<string, string>,
  supabaseOverride?: { projectRef?: string; url?: string; anonKey?: string },
  awsProfile?: string,
) =>
  api.post<CreateProjectResponse>("/projects/create", { name, description, basePath, envVars, supabaseOverride, awsProfile });

// --- GitHub Integration ---
export interface GitHubStatus {
  connected: boolean;
  username?: string;
  pat?: string;
  connectedAt?: string;
}

export interface GitHubRepo {
  name: string;
  fullName: string;
  url: string;
  cloneUrl: string;
  description: string | null;
  private: boolean;
  language: string | null;
  updatedAt: string;
}

export const fetchGitHubStatus = () => api.get<GitHubStatus>("/integrations/github");
export const connectGitHub = (pat: string) => api.put<{ connected: boolean; username: string }>("/integrations/github", { pat });
export const disconnectGitHub = () => api.del<{ ok: boolean }>("/integrations/github");
export interface GitHubVerifyResult {
  ok: boolean;
  error?: string;
  user?: { login: string; name: string | null; repos: number; since: string };
  rateLimit?: { limit: number; remaining: number; resetsAt: string } | null;
  scopes?: string;
}

export const verifyGitHub = () => api.post<GitHubVerifyResult>("/integrations/github/verify", {});
export const fetchGitHubRepos = () => api.get<GitHubRepo[]>("/integrations/github/repos");
export const cloneGitHubRepo = (repoUrl: string, targetPath?: string) =>
  api.post<{ ok: boolean; path: string }>("/integrations/github/clone", { repoUrl, targetPath });

// --- Supabase Integration ---
export interface SupabaseStatus {
  connected: boolean;
  url?: string;
  anonKey?: string;
  projectRef?: string;
  projectName?: string;
  orgName?: string;
  connectedAt?: string;
}

export interface SupabaseProject {
  id: string;
  name: string;
  organization_id: string;
  region: string;
  status: string;
  created_at: string;
}

export const fetchSupabaseStatus = () => api.get<SupabaseStatus>("/integrations/supabase");
export const connectSupabase = (accessToken: string) =>
  api.put<{ connected: boolean; projects: SupabaseProject[] }>("/integrations/supabase", { accessToken });
export const selectSupabaseProject = (projectRef: string) =>
  api.post<{ ok: boolean; url: string; projectName: string; orgName: string; hasAnonKey: boolean; hasServiceKey: boolean }>("/integrations/supabase/select-project", { projectRef });
export const fetchSupabaseProjects = () => api.get<SupabaseProject[]>("/integrations/supabase/projects");
export const disconnectSupabase = () => api.del<{ ok: boolean }>("/integrations/supabase");
export const testSupabaseConnection = () => api.post<{ ok: boolean; status: number; error?: string }>("/integrations/supabase/test", {});

// --- AWS Integration ---
export interface AwsStatus {
  profiles: string[];
  activeProfile: string;
  adaAccount?: string;
  adaRole?: string;
  hasAda: boolean;
  hasAwsCli: boolean;
}

export const fetchAwsStatus = () => api.get<AwsStatus>("/integrations/aws");
export const setAwsProfile = (profile: string, adaAccount?: string, adaRole?: string) =>
  api.put<{ ok: boolean }>("/integrations/aws/profile", { profile, adaAccount, adaRole });
export const refreshAwsCredentials = (account?: string, role?: string, profile?: string) =>
  api.post<{ ok: boolean; output: string; profile: string }>("/integrations/aws/refresh-credentials", { account, role, profile });
export const runAwsCommand = (args: string[]) =>
  api.post<{ ok: boolean; output: string }>("/integrations/aws/exec", { command: "aws", args });

export interface AwsVerifyResult {
  ok: boolean;
  error?: string;
  expired?: boolean;
  account?: string;
  arn?: string;
  userId?: string;
  profile?: string;
  region?: string;
}

export const verifyAws = () => api.post<AwsVerifyResult>("/integrations/aws/verify", {});

// --- Ops Panel ---
export interface OpsRunResponse {
  ok: boolean;
  id: string;
  pid: number;
}

export const runOpsCommand = (command: string, args: string[], cwd?: string) =>
  api.post<OpsRunResponse>("/ops/run", { command, args, cwd });

// --- Dev Server ---
export interface DevServerStatus {
  running: boolean;
  status?: string;
  port?: number;
  runtime?: string;
  containerId?: string | null;
  output?: string;
}

export const startDevServer = (cwd: string, runtime?: string) =>
  api.post<{ ok: boolean; port: number; status: string; runtime: string }>("/dev-server/start", { cwd, runtime });
export const fetchDevServerStatus = (cwd: string) =>
  api.get<DevServerStatus>(`/dev-server/status?cwd=${encodeURIComponent(cwd)}`);
export const stopDevServer = (cwd: string) =>
  api.post<{ ok: boolean }>("/dev-server/stop", { cwd });

// --- Project Type Detection ---
export type ProjectType = "frontend" | "backend" | "fullstack" | "cli" | "static" | "unknown";

export const fetchProjectType = (cwd: string) =>
  api.get<{ type: ProjectType }>(`/projects/type?cwd=${encodeURIComponent(cwd)}`);

// --- Container Runtime Detection ---
export interface RuntimeInfo {
  available: Array<{ name: string; version: string }>;
  preferred: string | null;
  native: true;
}

export const fetchRuntimes = () => api.get<RuntimeInfo>("/runtime/detect");
export const stopOpsProcess = (id: string) =>
  api.post<{ ok: boolean }>(`/ops/stop/${id}`, {});

// --- Memory System (claude-mem) ---
export interface MemoryStatus {
  workerHealthy: boolean;
  observations: number | null;
  sessions: number | null;
  dbSize: string | null;
}

export interface MemorySearchResult {
  id: number;
  title: string;
  subtitle?: string;
  type: string;
  date: string;
}

export const fetchMemoryStatus = () => api.get<MemoryStatus>("/memory/status");
export const searchMemory = async (query: string): Promise<MemorySearchResult[]> => {
  const res = await api.get<{ results: MemorySearchResult[] }>(`/memory/search?q=${encodeURIComponent(query)}`);
  return res.results;
};

// --- LLM Providers ---
export interface LLMModel {
  id: string;
  name: string;
  context?: number;
}

export interface LLMProvider {
  id: string;
  name: string;
  configured: boolean;
  models: LLMModel[];
  apiKeyField: string;
}

export interface LLMAvailableModel extends LLMModel {
  provider: string;
  providerName: string;
}

export const fetchLLMProviders = () => api.get<LLMProvider[]>("/llm/providers");
export const fetchLLMModels = () => api.get<LLMAvailableModel[]>("/llm/models");
export const fetchLLMKeys = () => api.get<Record<string, string>>("/llm/keys");
export const saveLLMKeys = (keys: Record<string, string>) => api.put<{ ok: boolean }>("/llm/keys", { keys });
export const testLLMProvider = (provider: string, apiKey: string) =>
  api.post<{ ok: boolean; response?: string; error?: string }>("/llm/test", { provider, apiKey });
