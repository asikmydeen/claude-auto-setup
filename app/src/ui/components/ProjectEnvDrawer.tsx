import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  X, Plus, Trash2, Save, Database, Cloud, Variable,
  Check, Loader2, Eye, EyeOff, Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  fetchProjectEnv,
  saveProjectEnv as saveProjectEnvApi,
  fetchSupabaseProjects,
  type ProjectEnvConfig,
  type SupabaseProject,
} from "@/api/config";

interface ProjectEnvDrawerProps {
  open: boolean;
  onClose: () => void;
  projectPath: string;
}

export function ProjectEnvDrawer({ open, onClose, projectPath }: ProjectEnvDrawerProps) {
  const qc = useQueryClient();
  const projectName = projectPath.split("/").pop() || "Project";

  const envQuery = useQuery({
    queryKey: ["project-env", projectPath],
    queryFn: () => fetchProjectEnv(projectPath),
    enabled: open && !!projectPath,
  });

  const sbProjectsQuery = useQuery({
    queryKey: ["supabase-projects"],
    queryFn: fetchSupabaseProjects,
    enabled: open && !!envQuery.data?.global.supabase,
  });

  // Local state for editing
  const [envVars, setEnvVars] = useState<Array<{ key: string; value: string }>>([]);
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");
  const [showValues, setShowValues] = useState(false);
  const [supabaseProjectRef, setSupabaseProjectRef] = useState<string | null>(null);
  const [awsProfile, setAwsProfile] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"env" | "supabase" | "aws">("env");

  // Sync from server data
  useEffect(() => {
    if (envQuery.data?.config) {
      const c = envQuery.data.config;
      setEnvVars(
        c.env ? Object.entries(c.env).map(([key, value]) => ({ key, value })) : []
      );
      setSupabaseProjectRef(c.supabase?.projectRef || null);
      setAwsProfile(c.aws?.profile || null);
    }
  }, [envQuery.data]);

  const saveMut = useMutation({
    mutationFn: () => {
      const config: ProjectEnvConfig = {};
      // Env vars
      const envObj: Record<string, string> = {};
      for (const { key, value } of envVars) {
        if (key.trim()) envObj[key.trim()] = value;
      }
      if (Object.keys(envObj).length > 0) config.env = envObj;

      // Supabase
      if (supabaseProjectRef) {
        config.supabase = {
          projectRef: supabaseProjectRef,
          url: `https://${supabaseProjectRef}.supabase.co`,
          anonKey: "", // Will be fetched from global config or set manually
        };
        // Try to get anonKey from global config if same project
        if (envQuery.data?.global.supabase?.projectRef === supabaseProjectRef) {
          // Same as global — no need to store separately
          config.supabase = undefined;
        }
      }

      // AWS
      if (awsProfile && awsProfile !== envQuery.data?.global.aws.activeProfile) {
        config.aws = { profile: awsProfile };
      }

      return saveProjectEnvApi(projectPath, config);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["project-env", projectPath] });
    },
  });

  const addEnvVar = () => {
    if (!newKey.trim()) return;
    setEnvVars(prev => [...prev, { key: newKey.trim(), value: newValue }]);
    setNewKey("");
    setNewValue("");
  };

  const removeEnvVar = (idx: number) => {
    setEnvVars(prev => prev.filter((_, i) => i !== idx));
  };

  const updateEnvVar = (idx: number, field: "key" | "value", val: string) => {
    setEnvVars(prev => prev.map((v, i) => i === idx ? { ...v, [field]: val } : v));
  };

  if (!open) return null;

  const tabs = [
    { id: "env" as const, label: "Environment", icon: Variable, count: envVars.length },
    { id: "supabase" as const, label: "Supabase", icon: Database, active: !!supabaseProjectRef },
    { id: "aws" as const, label: "AWS", icon: Cloud, active: !!awsProfile },
  ];

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className={cn(
        "fixed inset-y-0 right-0 z-50 flex w-full max-w-lg flex-col bg-background shadow-2xl transition-transform duration-300 ease-in-out translate-x-0"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <h2 className="text-base font-semibold">Project Environment</h2>
            <p className="text-xs text-muted-foreground font-mono mt-0.5">{projectName}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              disabled={saveMut.isPending}
              onClick={() => saveMut.mutate()}
            >
              {saveMut.isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" /> : <Save className="h-3.5 w-3.5 mr-1.5" />}
              Save
            </Button>
            <Button variant="ghost" size="icon-sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Save success */}
        {saveMut.isSuccess && (
          <div className="flex items-center gap-2 px-5 py-2 text-xs text-green-600 bg-green-50 dark:bg-green-950/20 border-b border-green-600/20">
            <Check className="h-3.5 w-3.5" /> Saved. Changes take effect on next session/server start.
          </div>
        )}

        {/* Tabs */}
        <div className="flex items-center gap-1 border-b border-border px-5 py-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                activeTab === tab.id
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              )}
            >
              <tab.icon className="h-3.5 w-3.5" />
              {tab.label}
              {"count" in tab && (tab.count ?? 0) > 0 && (
                <Badge variant="secondary" className="text-[9px] px-1 py-0 ml-0.5">{tab.count}</Badge>
              )}
              {"active" in tab && tab.active && (
                <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {envQuery.isLoading ? (
            <div className="flex items-center justify-center py-12 gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading...
            </div>
          ) : activeTab === "env" ? (
            /* Environment Variables */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Environment Variables</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    Injected into Claude sessions, dev server, and terminal for this project
                  </p>
                </div>
                <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => setShowValues(!showValues)}>
                  {showValues ? <EyeOff className="h-3 w-3 mr-1" /> : <Eye className="h-3 w-3 mr-1" />}
                  {showValues ? "Hide" : "Show"}
                </Button>
              </div>

              {/* Existing vars */}
              <div className="space-y-1.5">
                {envVars.map((v, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <input
                      type="text"
                      value={v.key}
                      onChange={(e) => updateEnvVar(idx, "key", e.target.value)}
                      placeholder="KEY"
                      className="w-[140px] rounded border border-input bg-background px-2 py-1 text-xs font-mono placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                    />
                    <span className="text-muted-foreground text-xs">=</span>
                    <input
                      type={showValues ? "text" : "password"}
                      value={v.value}
                      onChange={(e) => updateEnvVar(idx, "value", e.target.value)}
                      placeholder="value"
                      className="flex-1 rounded border border-input bg-background px-2 py-1 text-xs font-mono placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                    />
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive" onClick={() => removeEnvVar(idx)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>

              {/* Add new var */}
              <div className="flex items-center gap-1.5 pt-1 border-t border-border">
                <input
                  type="text"
                  value={newKey}
                  onChange={(e) => setNewKey(e.target.value.toUpperCase())}
                  onKeyDown={(e) => e.key === "Enter" && addEnvVar()}
                  placeholder="NEW_KEY"
                  className="w-[140px] rounded border border-input bg-background px-2 py-1 text-xs font-mono placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                />
                <span className="text-muted-foreground text-xs">=</span>
                <input
                  type="text"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addEnvVar()}
                  placeholder="value"
                  className="flex-1 rounded border border-input bg-background px-2 py-1 text-xs font-mono placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                />
                <Button variant="outline" size="sm" className="h-6 px-2" onClick={addEnvVar} disabled={!newKey.trim()}>
                  <Plus className="h-3 w-3" />
                </Button>
              </div>

              {/* Info */}
              <div className="rounded-md border border-border bg-muted/30 p-3 text-[10px] text-muted-foreground flex items-start gap-2">
                <Info className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                <div>
                  <p>Variables are stored in <code className="text-[9px] bg-muted px-1 rounded">{projectName}/.claude/project-env.json</code></p>
                  <p className="mt-1">They override global settings and are injected into all Claude sessions, dev servers, and terminal commands for this project.</p>
                </div>
              </div>
            </div>
          ) : activeTab === "supabase" ? (
            /* Supabase Project Selection */
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium">Supabase Project</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  Override the global Supabase project for this project
                </p>
              </div>

              {/* Current global setting */}
              {envQuery.data?.global.supabase && (
                <div className="rounded-md border border-border bg-muted/30 p-3 text-xs space-y-1">
                  <p className="text-muted-foreground">Global (default):</p>
                  <p className="font-medium">{envQuery.data.global.supabase.projectName || envQuery.data.global.supabase.projectRef}</p>
                  <p className="font-mono text-[10px] text-muted-foreground">{envQuery.data.global.supabase.url}</p>
                </div>
              )}

              {/* Use global or override */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setSupabaseProjectRef(null)}
                  className={cn(
                    "w-full flex items-center gap-3 rounded-lg border p-3 text-left transition-colors",
                    !supabaseProjectRef ? "border-primary bg-primary/5" : "border-border hover:bg-accent"
                  )}
                >
                  <Check className={cn("h-4 w-4", !supabaseProjectRef ? "text-primary" : "text-transparent")} />
                  <div>
                    <p className="text-xs font-medium">Use global Supabase project</p>
                    <p className="text-[10px] text-muted-foreground">Inherits from Integrations settings</p>
                  </div>
                </button>

                {/* Project list for override */}
                {sbProjectsQuery.data?.map((proj: SupabaseProject) => (
                  <button
                    key={proj.id}
                    type="button"
                    onClick={() => setSupabaseProjectRef(proj.id)}
                    className={cn(
                      "w-full flex items-center gap-3 rounded-lg border p-3 text-left transition-colors",
                      supabaseProjectRef === proj.id ? "border-primary bg-primary/5" : "border-border hover:bg-accent"
                    )}
                  >
                    <Check className={cn("h-4 w-4", supabaseProjectRef === proj.id ? "text-primary" : "text-transparent")} />
                    <div>
                      <p className="text-xs font-medium">{proj.name}</p>
                      <p className="text-[10px] text-muted-foreground">{proj.region} · {proj.id}</p>
                    </div>
                  </button>
                ))}

                {!envQuery.data?.global.supabase && (
                  <p className="text-xs text-muted-foreground">Connect Supabase in Integrations first to select a project.</p>
                )}
              </div>
            </div>
          ) : (
            /* AWS Profile Selection */
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium">AWS Profile</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  Override the global AWS profile for this project
                </p>
              </div>

              {/* Current global setting */}
              <div className="rounded-md border border-border bg-muted/30 p-3 text-xs space-y-1">
                <p className="text-muted-foreground">Global (default):</p>
                <p className="font-medium font-mono">{envQuery.data?.global.aws.activeProfile || "default"}</p>
              </div>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setAwsProfile(null)}
                  className={cn(
                    "w-full flex items-center gap-3 rounded-lg border p-3 text-left transition-colors",
                    !awsProfile ? "border-primary bg-primary/5" : "border-border hover:bg-accent"
                  )}
                >
                  <Check className={cn("h-4 w-4", !awsProfile ? "text-primary" : "text-transparent")} />
                  <div>
                    <p className="text-xs font-medium">Use global profile</p>
                    <p className="text-[10px] text-muted-foreground">Inherits from Integrations settings</p>
                  </div>
                </button>

                {envQuery.data?.global.aws.profiles.map((profile) => (
                  <button
                    key={profile}
                    type="button"
                    onClick={() => setAwsProfile(profile)}
                    className={cn(
                      "w-full flex items-center gap-3 rounded-lg border p-3 text-left transition-colors",
                      awsProfile === profile ? "border-primary bg-primary/5" : "border-border hover:bg-accent"
                    )}
                  >
                    <Check className={cn("h-4 w-4", awsProfile === profile ? "text-primary" : "text-transparent")} />
                    <p className="text-xs font-mono font-medium">{profile}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
