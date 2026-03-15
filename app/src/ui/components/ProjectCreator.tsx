import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Plus,
  X,
  Loader2,
  FolderOpen,
  Sparkles,
  Lightbulb,
  Database,
  Cloud,
  GitBranch,
  Check,
  CircleOff,
  Container,
  Monitor,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  createProject,
  createFromTemplate,
  fetchGitHubStatus,
  fetchSupabaseStatus,
  fetchSupabaseProjects,
  fetchAwsStatus,
  fetchRuntimes,
} from "@/api/config";
import { cn } from "@/lib/utils";

interface ProjectCreatorProps {
  open: boolean;
  onClose: () => void;
  onProjectCreated?: (projectDir: string, sessionId: string | null) => void;
  onRuntimeSelected?: (runtime: string) => void;
  defaultBasePath?: string;
}

type BackendChoice = "none" | "supabase" | "aws";
type RepoChoice = "none" | "new" | "existing";

export function ProjectCreator({ open, onClose, onProjectCreated, onRuntimeSelected, defaultBasePath }: ProjectCreatorProps) {
  const qc = useQueryClient();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [basePath, setBasePath] = useState(defaultBasePath || "");
  const [selectedRuntime, setSelectedRuntime] = useState("native");

  // Backend & repo choices
  const [backend, setBackend] = useState<BackendChoice>("none");
  const [selectedSupabaseProject, setSelectedSupabaseProject] = useState<string | null>(null);
  const [newSupabaseName, setNewSupabaseName] = useState("");
  const [supabaseMode, setSupabaseMode] = useState<"select" | "new">("select");

  const [repoChoice, setRepoChoice] = useState<RepoChoice>("none");
  const [repoPrivate, setRepoPrivate] = useState(true);

  // Environment variables
  const [envVars, setEnvVars] = useState<Array<{ key: string; value: string }>>([]);
  const [newEnvKey, setNewEnvKey] = useState("");
  const [newEnvValue, setNewEnvValue] = useState("");

  // Fetch integration statuses, available runtimes
  const github = useQuery({ queryKey: ["github-status"], queryFn: fetchGitHubStatus, enabled: open });
  const supabase = useQuery({ queryKey: ["supabase-status"], queryFn: fetchSupabaseStatus, enabled: open });
  const aws = useQuery({ queryKey: ["aws-status"], queryFn: fetchAwsStatus, enabled: open });
  const runtimes = useQuery({ queryKey: ["runtimes"], queryFn: fetchRuntimes, enabled: open });
  const sbProjects = useQuery({
    queryKey: ["supabase-projects"],
    queryFn: fetchSupabaseProjects,
    enabled: open && backend === "supabase" && supabase.data?.connected === true,
  });

  // Reset supabase project name when switching to new
  useEffect(() => {
    if (name && !newSupabaseName) setNewSupabaseName(name.replace(/[^a-zA-Z0-9-]/g, "-"));
  }, [name, newSupabaseName]);

  // Template-based creation (auto-picks best template, Claude customizes)
  const templateMut = useMutation({
    mutationFn: () =>
      createFromTemplate(
        name.trim(),
        description.trim(),
        undefined, // auto-pick template
        basePath.trim() || undefined,
      ),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["projects"] });
      onRuntimeSelected?.(selectedRuntime);
      onProjectCreated?.(data.projectDir, data.sessionId);
      onClose();
      resetForm();
    },
  });

  // From-scratch creation (Claude-powered, no template)
  const createMut = useMutation({
    mutationFn: () => {
      const envObj: Record<string, string> = {};
      for (const { key, value } of envVars) { if (key.trim()) envObj[key.trim()] = value; }

      const sbOverride = backend === "supabase" && selectedSupabaseProject
        ? { projectRef: selectedSupabaseProject, url: `https://${selectedSupabaseProject}.supabase.co` }
        : undefined;

      const awsProf = backend === "aws" && aws.data?.activeProfile ? aws.data.activeProfile : undefined;

      return createProject(
        name.trim(),
        buildPrompt(),
        basePath.trim() || undefined,
        Object.keys(envObj).length > 0 ? envObj : undefined,
        sbOverride,
        awsProf,
      );
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["projects"] });
      onRuntimeSelected?.(selectedRuntime);
      onProjectCreated?.(data.projectDir, data.sessionId);
      onClose();
      resetForm();
    },
  });

  function buildPrompt(): string {
    const parts: string[] = [];
    parts.push(description);

    if (backend === "supabase") {
      if (supabaseMode === "select" && selectedSupabaseProject) {
        const proj = sbProjects.data?.find((p: { id: string }) => p.id === selectedSupabaseProject);
        parts.push(`\n\nUse Supabase as the backend. The Supabase project "${proj?.name || selectedSupabaseProject}" is already configured.`);
      } else if (supabaseMode === "new") {
        parts.push(`\n\nUse Supabase as the backend. Set up .env with SUPABASE_URL and SUPABASE_ANON_KEY placeholders.`);
      }
    } else if (backend === "aws") {
      parts.push(`\n\nUse AWS as the backend with the active CLI profile.`);
    }

    if (envVars.length > 0) {
      const varList = envVars.filter(v => v.key.trim()).map(v => `${v.key.trim()}="${v.value}"`).join("\n");
      parts.push(`\n\nEnvironment variables available:\n\`\`\`\n${varList}\n\`\`\``);
    }

    if (repoChoice === "new") {
      parts.push(`\n\nCreate a GitHub repo "${name}" (${repoPrivate ? "private" : "public"}) and push.`);
    }

    return parts.join("\n");
  }

  const isPending = templateMut.isPending || createMut.isPending;
  const isError = templateMut.isError || createMut.isError;
  const errorMessage = (templateMut.error as Error)?.message || (createMut.error as Error)?.message || "Failed to create project";

  // Smart create: use template (auto-picked) by default, scratch only if explicitly chosen
  function handleCreate() {
    templateMut.mutate();
  }

  function resetForm() {
    setName("");
    setDescription("");
    setBackend("none");
    setSelectedSupabaseProject(null);
    setNewSupabaseName("");
    setSupabaseMode("select");
    setRepoChoice("none");
    setSelectedRuntime("native");
    setEnvVars([]);
    setNewEnvKey("");
    setNewEnvValue("");
  }

  if (!open) return null;

  const ghConnected = github.data?.connected;
  const sbConnected = supabase.data?.connected;
  const awsAvailable = aws.data?.hasAwsCli;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="w-full max-w-lg max-h-[90vh] rounded-xl border border-border bg-background shadow-2xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-6 py-4 shrink-0">
            <div className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Create New Project</h2>
            </div>
            <Button variant="ghost" size="icon-sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Scrollable body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {/* Project name */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Project Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="my-awesome-app"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                autoFocus
              />
            </div>

            {/* Describe your app — this drives everything */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium flex items-center gap-1.5">
                <Lightbulb className="h-3.5 w-3.5" /> Describe your app
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A task management app with kanban boards, user auth, and a clean dark dashboard..."
                rows={3}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
              <p className="text-[10px] text-muted-foreground">
                Claude will auto-pick the best design template and customize it to match your idea.
              </p>
            </div>

            {/* Backend selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Backend</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setBackend("none")}
                  className={cn(
                    "flex flex-col items-center gap-1.5 rounded-lg border p-3 transition-colors",
                    backend === "none" ? "border-primary bg-primary/5" : "border-border hover:bg-accent"
                  )}
                >
                  <CircleOff className="h-4 w-4" />
                  <span className="text-[10px] font-medium">None</span>
                </button>
                <button
                  type="button"
                  onClick={() => setBackend("supabase")}
                  disabled={!sbConnected}
                  className={cn(
                    "flex flex-col items-center gap-1.5 rounded-lg border p-3 transition-colors relative",
                    backend === "supabase" ? "border-primary bg-primary/5" : "border-border hover:bg-accent",
                    !sbConnected && "opacity-40 cursor-not-allowed"
                  )}
                >
                  <Database className="h-4 w-4" />
                  <span className="text-[10px] font-medium">Supabase</span>
                  {!sbConnected && <span className="text-[8px] text-muted-foreground absolute bottom-1">Not connected</span>}
                </button>
                <button
                  type="button"
                  onClick={() => setBackend("aws")}
                  disabled={!awsAvailable}
                  className={cn(
                    "flex flex-col items-center gap-1.5 rounded-lg border p-3 transition-colors relative",
                    backend === "aws" ? "border-primary bg-primary/5" : "border-border hover:bg-accent",
                    !awsAvailable && "opacity-40 cursor-not-allowed"
                  )}
                >
                  <Cloud className="h-4 w-4" />
                  <span className="text-[10px] font-medium">AWS</span>
                  {!awsAvailable && <span className="text-[8px] text-muted-foreground absolute bottom-1">No CLI</span>}
                </button>
              </div>

              {/* Supabase project picker */}
              {backend === "supabase" && (
                <div className="rounded-md border border-border bg-muted/20 p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSupabaseMode("select")}
                      className={cn("text-xs font-medium px-2 py-1 rounded transition-colors", supabaseMode === "select" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground")}
                    >
                      Select existing
                    </button>
                    <button
                      type="button"
                      onClick={() => setSupabaseMode("new")}
                      className={cn("text-xs font-medium px-2 py-1 rounded transition-colors", supabaseMode === "new" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground")}
                    >
                      Use new project
                    </button>
                  </div>

                  {supabaseMode === "select" ? (
                    <div className="space-y-1">
                      {sbProjects.isLoading && (
                        <div className="flex items-center gap-2 py-2 text-xs text-muted-foreground">
                          <Loader2 className="h-3 w-3 animate-spin" /> Loading projects...
                        </div>
                      )}
                      {sbProjects.data?.map((proj) => (
                        <button
                          key={proj.id}
                          type="button"
                          onClick={() => setSelectedSupabaseProject(proj.id)}
                          className={cn(
                            "w-full flex items-center justify-between rounded-md border px-3 py-1.5 text-xs text-left transition-colors",
                            selectedSupabaseProject === proj.id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:bg-accent"
                          )}
                        >
                          <span className="font-medium">{proj.name}</span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-muted-foreground">{proj.region}</span>
                            {selectedSupabaseProject === proj.id && <Check className="h-3 w-3 text-primary" />}
                          </div>
                        </button>
                      ))}
                      {sbProjects.data?.length === 0 && !sbProjects.isLoading && (
                        <p className="text-xs text-muted-foreground py-1">No projects found. Switch to &quot;Use new project&quot;.</p>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <p className="text-[10px] text-muted-foreground">Claude will set up Supabase client with .env placeholders. Configure the project in Integrations after creation.</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* GitHub repo */}
            {/* Environment Variables */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-1.5">
                Environment Variables
                <span className="text-xs text-muted-foreground font-normal">(optional)</span>
              </label>

              {envVars.length > 0 && (
                <div className="space-y-1">
                  {envVars.map((v, idx) => (
                    <div key={idx} className="flex items-center gap-1">
                      <input
                        type="text"
                        value={v.key}
                        onChange={(e) => setEnvVars(prev => prev.map((ev, i) => i === idx ? { ...ev, key: e.target.value.toUpperCase() } : ev))}
                        className="w-[110px] rounded border border-input bg-background px-2 py-1 text-[10px] font-mono placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                      />
                      <span className="text-[10px] text-muted-foreground">=</span>
                      <input
                        type="text"
                        value={v.value}
                        onChange={(e) => setEnvVars(prev => prev.map((ev, i) => i === idx ? { ...ev, value: e.target.value } : ev))}
                        className="flex-1 rounded border border-input bg-background px-2 py-1 text-[10px] font-mono placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                      />
                      <button type="button" onClick={() => setEnvVars(prev => prev.filter((_, i) => i !== idx))}
                        className="text-muted-foreground hover:text-destructive p-0.5">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-1">
                <input
                  type="text"
                  value={newEnvKey}
                  onChange={(e) => setNewEnvKey(e.target.value.toUpperCase())}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && newEnvKey.trim()) {
                      setEnvVars(prev => [...prev, { key: newEnvKey.trim(), value: newEnvValue }]);
                      setNewEnvKey(""); setNewEnvValue("");
                    }
                  }}
                  placeholder="API_KEY"
                  className="w-[110px] rounded border border-input bg-background px-2 py-1 text-[10px] font-mono placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                />
                <span className="text-[10px] text-muted-foreground">=</span>
                <input
                  type="text"
                  value={newEnvValue}
                  onChange={(e) => setNewEnvValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && newEnvKey.trim()) {
                      setEnvVars(prev => [...prev, { key: newEnvKey.trim(), value: newEnvValue }]);
                      setNewEnvKey(""); setNewEnvValue("");
                    }
                  }}
                  placeholder="value"
                  className="flex-1 rounded border border-input bg-background px-2 py-1 text-[10px] font-mono placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                />
                <Button variant="outline" size="sm" className="h-6 px-1.5"
                  disabled={!newEnvKey.trim()}
                  onClick={() => { setEnvVars(prev => [...prev, { key: newEnvKey.trim(), value: newEnvValue }]); setNewEnvKey(""); setNewEnvValue(""); }}>
                  <Plus className="h-3 w-3" />
                </Button>
              </div>

              {envVars.length > 0 && (
                <p className="text-[9px] text-muted-foreground">
                  Claude will use these as process.env variables. Saved to project config.
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">GitHub Repository</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setRepoChoice("none")}
                  className={cn(
                    "flex flex-col items-center gap-1.5 rounded-lg border p-3 transition-colors",
                    repoChoice === "none" ? "border-primary bg-primary/5" : "border-border hover:bg-accent"
                  )}
                >
                  <CircleOff className="h-4 w-4" />
                  <span className="text-[10px] font-medium">Skip</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRepoChoice("new")}
                  disabled={!ghConnected}
                  className={cn(
                    "flex flex-col items-center gap-1.5 rounded-lg border p-3 transition-colors relative",
                    repoChoice === "new" ? "border-primary bg-primary/5" : "border-border hover:bg-accent",
                    !ghConnected && "opacity-40 cursor-not-allowed"
                  )}
                >
                  <Plus className="h-4 w-4" />
                  <span className="text-[10px] font-medium">Create new</span>
                  {!ghConnected && <span className="text-[8px] text-muted-foreground absolute bottom-1">Not connected</span>}
                </button>
                <button
                  type="button"
                  onClick={() => setRepoChoice("none")}
                  disabled
                  className="flex flex-col items-center gap-1.5 rounded-lg border p-3 opacity-40 cursor-not-allowed relative"
                >
                  <GitBranch className="h-4 w-4" />
                  <span className="text-[10px] font-medium">Clone existing</span>
                  <span className="text-[8px] text-muted-foreground absolute bottom-1">Use sidebar</span>
                </button>
              </div>

              {repoChoice === "new" && (
                <div className="rounded-md border border-border bg-muted/20 p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Will create <span className="font-mono font-medium text-foreground">{github.data?.username}/{name || "..."}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setRepoPrivate(!repoPrivate)}
                      className={cn(
                        "text-[10px] px-2 py-0.5 rounded border transition-colors",
                        repoPrivate
                          ? "border-yellow-600/30 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400"
                          : "border-green-600/30 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                      )}
                    >
                      {repoPrivate ? "Private" : "Public"}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Runtime — only show if container runtimes detected */}
            {runtimes.data && runtimes.data.available.length > 0 && (
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-1.5">
                  <Container className="h-3.5 w-3.5" /> Runtime
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedRuntime("native")}
                    className={cn(
                      "flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs transition-colors",
                      selectedRuntime === "native" ? "border-primary bg-primary/5" : "border-border hover:bg-accent"
                    )}
                  >
                    <Monitor className="h-3.5 w-3.5" />
                    Native
                  </button>
                  {runtimes.data.available.map((rt) => (
                    <button
                      key={rt.name}
                      type="button"
                      onClick={() => setSelectedRuntime(rt.name)}
                      className={cn(
                        "flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs transition-colors",
                        selectedRuntime === rt.name ? "border-primary bg-primary/5" : "border-border hover:bg-accent"
                      )}
                    >
                      <Container className="h-3.5 w-3.5" />
                      {rt.name}
                      <span className="text-[9px] text-muted-foreground">{rt.version}</span>
                    </button>
                  ))}
                </div>
                {selectedRuntime !== "native" && (
                  <p className="text-[9px] text-muted-foreground">
                    Dev server will run in a {selectedRuntime} container with hot reload via volume mount.
                  </p>
                )}
              </div>
            )}

            {/* Location */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium flex items-center gap-1.5">
                <FolderOpen className="h-3.5 w-3.5" /> Location
                <span className="text-xs text-muted-foreground font-normal">(optional)</span>
              </label>
              <input
                type="text"
                value={basePath}
                onChange={(e) => setBasePath(e.target.value)}
                placeholder="~/projects"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-border px-6 py-4 shrink-0">
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              {selectedRuntime !== "native" && <Badge variant="secondary" className="text-[9px] px-1.5 py-0">{selectedRuntime}</Badge>}
              {backend !== "none" && <Badge variant="secondary" className="text-[9px] px-1.5 py-0">{backend}</Badge>}
              {repoChoice === "new" && <Badge variant="secondary" className="text-[9px] px-1.5 py-0">github</Badge>}
              {envVars.length > 0 && <Badge variant="secondary" className="text-[9px] px-1.5 py-0">{envVars.length} env</Badge>}
              <span>Best design template auto-selected</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={onClose}>Cancel</Button>
              <Button
                size="sm"
                disabled={!name.trim() || !description.trim() || isPending}
                onClick={handleCreate}
              >
                {isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" /> : <Sparkles className="h-3.5 w-3.5 mr-1.5" />}
                Create & Build
              </Button>
            </div>
          </div>

          {isError && (
            <div className="px-6 pb-4">
              <p className="text-xs text-destructive">{errorMessage}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
