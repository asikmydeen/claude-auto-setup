/** Adapter type contracts — shared interfaces for all agent adapters */

export type AdapterType =
  | "claude_local"
  | "gemini_local"
  | "kiro_local"
  | "codex_local"
  | "cursor_local"
  | "ampcode_local"
  | "http"
  | "process";

export type AgentStatus =
  | "active"
  | "paused"
  | "idle"
  | "running"
  | "error"
  | "exploring"
  | "implementing"
  | "reviewing"
  | "done"
  | "archived";

export type AgentRole =
  | "coordinator"
  | "developer"
  | "reviewer"
  | "debugger"
  | "explorer"
  | "test-writer"
  | "security-auditor"
  | "general";

export interface AdapterCapabilities {
  canEdit: boolean;
  canExecuteBash: boolean;
  canBrowseWeb: boolean;
  canUseMcp: boolean;
  hasMemory: boolean;
  supportsBackgroundExecution: boolean;
  maxTurns?: number;
}

export interface AdapterConfig {
  type: AdapterType;
  name: string;
  cli: string;
  configLocation: string;
  capabilities: AdapterCapabilities;
  modelDefault?: string;
  modelOptions?: string[];
}

export interface ProviderInfo {
  name: string;
  installed: boolean;
  cli: string;
  version?: string;
  strengths: string[];
  taskRoutes: DispatchRoute[];
}

export interface DispatchRoute {
  taskType: string;
  provider: string;
  fallback: string;
  description: string;
}

export interface AgentState {
  id: string;
  role: AgentRole;
  status: AgentStatus;
  task: string;
  adapter?: AdapterType;
  progress?: { done: number; total: number };
  startedAt?: string;
  updatedAt?: string;
}

export interface Session {
  id: string;
  startedAt: string;
  agents: AgentState[];
  project?: string;
  phase?: string;
}

export interface ActivityEntry {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  entity: string;
  details: string;
  sessionId?: string;
}

export interface SkillMetadata {
  name: string;
  description: string;
  category: string;
  complexity: "simple" | "medium" | "complex";
  triggers: string[];
  filename: string;
}
