import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Settings2,
  Puzzle,
  Shield,
  Variable,
  Save,
  Plus,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Bot,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  fetchSettings,
  saveSettings,
  fetchAgentConfigs,
  saveAgentConfig,
  type SettingsData,
  type AgentConfig,
} from "@/api/config";
import { cn } from "@/lib/utils";

// --- Status message component ---

interface StatusMessageProps {
  status: "idle" | "saving" | "success" | "error";
  error?: string;
}

function StatusMessage({ status, error }: StatusMessageProps) {
  if (status === "idle") return null;
  return (
    <div
      className={cn(
        "flex items-center gap-2 text-sm transition-opacity",
        status === "saving" && "text-muted-foreground",
        status === "success" && "text-green-600 dark:text-green-400",
        status === "error" && "text-destructive"
      )}
    >
      {status === "saving" && <Loader2 className="h-4 w-4 animate-spin" />}
      {status === "success" && <CheckCircle2 className="h-4 w-4" />}
      {status === "error" && <AlertCircle className="h-4 w-4" />}
      <span>
        {status === "saving" && "Saving..."}
        {status === "success" && "Saved"}
        {status === "error" && (error || "Failed to save")}
      </span>
    </div>
  );
}

// --- Skeleton loader ---

function SettingsSkeleton() {
  return (
    <div className="space-y-6">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="h-48 animate-pulse rounded-lg bg-muted"
        />
      ))}
    </div>
  );
}

// --- Plugin toggle switch ---

interface PluginToggleProps {
  name: string;
  enabled: boolean;
  onToggle: (name: string, enabled: boolean) => void;
}

function PluginToggle({ name, enabled, onToggle }: PluginToggleProps) {
  return (
    <button
      type="button"
      onClick={() => onToggle(name, !enabled)}
      className={cn(
        "flex items-center justify-between rounded-lg border px-4 py-3 text-sm transition-colors",
        enabled
          ? "border-primary/20 bg-primary/5"
          : "border-border bg-card hover:bg-accent"
      )}
    >
      <span className="font-medium">{name}</span>
      <div
        className={cn(
          "relative h-5 w-9 rounded-full transition-colors",
          enabled ? "bg-primary" : "bg-muted-foreground/30"
        )}
      >
        <div
          className={cn(
            "absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform",
            enabled ? "translate-x-4" : "translate-x-0.5"
          )}
        />
      </div>
    </button>
  );
}

// --- Agent Models Section ---

const MODEL_OPTIONS = [
  { value: "sonnet", label: "Sonnet 4.6 (recommended)" },
  { value: "opus", label: "Opus 4.6" },
  { value: "haiku", label: "Haiku 4.5" },
];

function AgentModelsSection() {
  const queryClient = useQueryClient();
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");

  const { data: agents, isLoading } = useQuery({
    queryKey: ["agent-configs"],
    queryFn: fetchAgentConfigs,
  });

  const updateAgent = useMutation({
    mutationFn: ({ name, config }: { name: string; config: Record<string, unknown> }) =>
      saveAgentConfig(name, config),
    onMutate: () => setSaveStatus("saving"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["agent-configs"] });
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 2000);
    },
    onError: () => {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 4000);
    },
  });

  const setAllModels = (model: string) => {
    if (!agents) return;
    for (const agent of agents) {
      updateAgent.mutate({
        name: agent.filename,
        config: { ...agent, model },
      });
    }
  };

  if (isLoading) {
    return <div className="h-48 animate-pulse rounded-lg bg-muted" />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          Agent Models
          <Badge variant="secondary" className="ml-2">
            {agents?.length ?? 0} agents
          </Badge>
          {saveStatus === "saving" && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
          {saveStatus === "success" && <CheckCircle2 className="h-4 w-4 text-green-500" />}
          {saveStatus === "error" && <AlertCircle className="h-4 w-4 text-destructive" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Bulk set all */}
        <div className="flex items-center gap-3 rounded-lg border border-dashed border-border p-3">
          <span className="text-sm text-muted-foreground">Set all agents to:</span>
          <div className="flex gap-2">
            {MODEL_OPTIONS.map((opt) => (
              <Button
                key={opt.value}
                variant="outline"
                size="sm"
                onClick={() => setAllModels(opt.value)}
                disabled={updateAgent.isPending}
              >
                {opt.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Per-agent model selection */}
        <div className="space-y-2">
          {(agents ?? []).map((agent) => (
            <div
              key={agent.filename}
              className="flex items-center justify-between rounded-lg border border-border px-4 py-3"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{agent.name || agent.filename.replace(".md", "")}</span>
                  {agent.background === "true" && (
                    <Badge variant="outline" className="text-[10px]">background</Badge>
                  )}
                  {agent.memory === "user" && (
                    <Badge variant="outline" className="text-[10px]">memory</Badge>
                  )}
                </div>
                {agent.description && (
                  <p className="text-xs text-muted-foreground mt-0.5 truncate max-w-md">
                    {agent.description}
                  </p>
                )}
              </div>
              <select
                value={agent.model || "sonnet"}
                onChange={(e) => {
                  updateAgent.mutate({
                    name: agent.filename,
                    config: { ...agent, model: e.target.value },
                  });
                }}
                className="rounded-md border border-input bg-background px-3 py-1.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {MODEL_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
                {/* Show current value if it's not in the predefined list */}
                {agent.model && !MODEL_OPTIONS.some((o) => o.value === agent.model) && (
                  <option value={agent.model}>{agent.model} (custom)</option>
                )}
              </select>
            </div>
          ))}
        </div>

        {(agents?.length ?? 0) === 0 && (
          <p className="text-sm text-muted-foreground">
            No agent definitions found in ~/.claude/agents/
          </p>
        )}
      </CardContent>
    </Card>
  );
}

// --- Main Settings Page ---

export function Settings() {
  const queryClient = useQueryClient();
  const [saveStatus, setSaveStatus] = useState<StatusMessageProps>({
    status: "idle",
  });
  const [newAllowRule, setNewAllowRule] = useState("");
  const [newDenyRule, setNewDenyRule] = useState("");
  const [newEnvKey, setNewEnvKey] = useState("");
  const [newEnvValue, setNewEnvValue] = useState("");

  const { data: settings, isLoading, error } = useQuery({
    queryKey: ["settings"],
    queryFn: fetchSettings,
  });

  const mutation = useMutation({
    mutationFn: saveSettings,
    onMutate: () => setSaveStatus({ status: "saving" }),
    onSuccess: (data) => {
      queryClient.setQueryData(["settings"], data.settings ?? data);
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      setSaveStatus({ status: "success" });
      setTimeout(() => setSaveStatus({ status: "idle" }), 2000);
    },
    onError: (err: Error) => {
      setSaveStatus({ status: "error", error: err.message });
      setTimeout(() => setSaveStatus({ status: "idle" }), 4000);
    },
  });

  function updateSettings(patch: Partial<SettingsData>) {
    const updated = { ...settings, ...patch };
    mutation.mutate(updated as SettingsData);
  }

  if (isLoading) return <SettingsSkeleton />;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <AlertCircle className="h-10 w-10 text-destructive" />
        <p className="text-muted-foreground">Failed to load settings</p>
        <Button
          variant="outline"
          onClick={() => queryClient.invalidateQueries({ queryKey: ["settings"] })}
        >
          Retry
        </Button>
      </div>
    );
  }

  const model = settings?.model ?? "";
  const plugins = settings?.enabledPlugins ?? {};
  const allowRules = settings?.permissions?.allow ?? [];
  const denyRules = settings?.permissions?.deny ?? [];
  const envVars = settings?.env ?? {};

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage Claude Code configuration
          </p>
        </div>
        <StatusMessage status={saveStatus.status} error={saveStatus.error} />
      </div>

      {/* Model Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings2 className="h-5 w-5" />
            Model
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={model}
              onChange={(e) => updateSettings({ model: e.target.value })}
              placeholder="e.g. claude-opus-4-6"
              className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <Badge variant="secondary">{model || "default"}</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Plugins Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Puzzle className="h-5 w-5" />
            Plugins
            <Badge variant="secondary" className="ml-2">
              {Object.values(plugins).filter(Boolean).length} active
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(plugins).map(([name, enabled]) => (
              <PluginToggle
                key={name}
                name={name}
                enabled={enabled}
                onToggle={(pluginName, newState) => {
                  updateSettings({
                    enabledPlugins: { ...plugins, [pluginName]: newState },
                  });
                }}
              />
            ))}
          </div>
          {Object.keys(plugins).length === 0 && (
            <p className="text-sm text-muted-foreground">No plugins configured</p>
          )}
        </CardContent>
      </Card>

      {/* Permissions Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Permissions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Allow Rules */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Allow Rules
            </h3>
            <div className="mb-3 flex flex-wrap gap-2">
              {allowRules.map((rule, idx) => (
                <Badge
                  key={`${rule}-${idx}`}
                  variant="secondary"
                  className="gap-1 pr-1"
                >
                  <span className="max-w-[200px] truncate">{rule}</span>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = allowRules.filter((_, i) => i !== idx);
                      updateSettings({
                        permissions: { ...settings?.permissions, allow: updated },
                      });
                    }}
                    className="ml-1 rounded-full p-0.5 hover:bg-muted-foreground/20"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {allowRules.length === 0 && (
                <span className="text-sm text-muted-foreground">No allow rules</span>
              )}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newAllowRule}
                onChange={(e) => setNewAllowRule(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newAllowRule.trim()) {
                    updateSettings({
                      permissions: {
                        ...settings?.permissions,
                        allow: [...allowRules, newAllowRule.trim()],
                      },
                    });
                    setNewAllowRule("");
                  }
                }}
                placeholder='e.g. Bash(git *)'
                className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <Button
                variant="outline"
                size="sm"
                disabled={!newAllowRule.trim()}
                onClick={() => {
                  if (newAllowRule.trim()) {
                    updateSettings({
                      permissions: {
                        ...settings?.permissions,
                        allow: [...allowRules, newAllowRule.trim()],
                      },
                    });
                    setNewAllowRule("");
                  }
                }}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Deny Rules */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Deny Rules
            </h3>
            <div className="mb-3 flex flex-wrap gap-2">
              {denyRules.map((rule, idx) => (
                <Badge
                  key={`${rule}-${idx}`}
                  variant="destructive"
                  className="gap-1 pr-1"
                >
                  <span className="max-w-[200px] truncate">{rule}</span>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = denyRules.filter((_, i) => i !== idx);
                      updateSettings({
                        permissions: { ...settings?.permissions, deny: updated },
                      });
                    }}
                    className="ml-1 rounded-full p-0.5 hover:bg-destructive-foreground/20"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {denyRules.length === 0 && (
                <span className="text-sm text-muted-foreground">No deny rules</span>
              )}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newDenyRule}
                onChange={(e) => setNewDenyRule(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newDenyRule.trim()) {
                    updateSettings({
                      permissions: {
                        ...settings?.permissions,
                        deny: [...denyRules, newDenyRule.trim()],
                      },
                    });
                    setNewDenyRule("");
                  }
                }}
                placeholder='e.g. Read(.env*)'
                className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <Button
                variant="outline"
                size="sm"
                disabled={!newDenyRule.trim()}
                onClick={() => {
                  if (newDenyRule.trim()) {
                    updateSettings({
                      permissions: {
                        ...settings?.permissions,
                        deny: [...denyRules, newDenyRule.trim()],
                      },
                    });
                    setNewDenyRule("");
                  }
                }}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Environment Variables Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Variable className="h-5 w-5" />
            Environment Variables
            <Badge variant="secondary" className="ml-2">
              {Object.keys(envVars).length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(envVars).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              <code className="min-w-[200px] rounded bg-muted px-2 py-1.5 text-sm font-mono">
                {key}
              </code>
              <input
                type="text"
                value={value}
                onChange={(e) => {
                  updateSettings({
                    env: { ...envVars, [key]: e.target.value },
                  });
                }}
                className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <button
                type="button"
                onClick={() => {
                  const updated = { ...envVars };
                  delete updated[key];
                  updateSettings({ env: updated });
                }}
                className="rounded-md p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}

          {Object.keys(envVars).length === 0 && (
            <p className="text-sm text-muted-foreground">
              No environment variables configured
            </p>
          )}

          <div className="flex items-center gap-2 border-t border-border pt-4">
            <input
              type="text"
              value={newEnvKey}
              onChange={(e) => setNewEnvKey(e.target.value)}
              placeholder="KEY"
              className="w-[200px] rounded-md border border-input bg-background px-3 py-2 text-sm font-mono placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <input
              type="text"
              value={newEnvValue}
              onChange={(e) => setNewEnvValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && newEnvKey.trim()) {
                  updateSettings({
                    env: { ...envVars, [newEnvKey.trim()]: newEnvValue },
                  });
                  setNewEnvKey("");
                  setNewEnvValue("");
                }
              }}
              placeholder="value"
              className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm font-mono placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <Button
              variant="outline"
              size="sm"
              disabled={!newEnvKey.trim()}
              onClick={() => {
                if (newEnvKey.trim()) {
                  updateSettings({
                    env: { ...envVars, [newEnvKey.trim()]: newEnvValue },
                  });
                  setNewEnvKey("");
                  setNewEnvValue("");
                }
              }}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Agent Models Section */}
      <AgentModelsSection />

      {/* Manual save button at bottom */}
      <div className="flex justify-end">
        <Button
          onClick={() => {
            if (settings) mutation.mutate(settings);
          }}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          Save All Settings
        </Button>
      </div>
    </div>
  );
}
