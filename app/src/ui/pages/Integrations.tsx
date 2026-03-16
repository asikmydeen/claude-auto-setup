import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/Toast";
import {
  Database,
  Cloud,
  Check,
  Loader2,
  ExternalLink,
  Lock,
  Unplug,
  RefreshCw,
  GitBranch,
  Eye,
  EyeOff,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  fetchGitHubStatus,
  connectGitHub,
  disconnectGitHub,
  fetchGitHubRepos,
  cloneGitHubRepo,
  verifyGitHub,
  fetchSupabaseStatus,
  connectSupabase,
  selectSupabaseProject,
  fetchSupabaseProjects,
  disconnectSupabase,
  testSupabaseConnection,
  type SupabaseProject,
  fetchAwsStatus,
  setAwsProfile,
  refreshAwsCredentials,
  verifyAws,
  type GitHubRepo,
} from "@/api/config";

function validateGitHubPat(value: string): string | null {
  if (!value || value.includes("****")) return null;
  if (!value.startsWith("ghp_") && !value.startsWith("github_pat_")) {
    return "This doesn't look like a GitHub token (expected ghp_... or github_pat_...)";
  }
  return null;
}

function validateSupabaseToken(value: string): string | null {
  if (!value || value.includes("****")) return null;
  if (!value.startsWith("sbp_")) {
    return "This doesn't look like a Supabase access token (expected sbp_...)";
  }
  return null;
}

// --- GitHub Section ---
function GitHubIntegration() {
  const qc = useQueryClient();
  const { toast } = useToast();
  const [pat, setPat] = useState("");
  const [showPat, setShowPat] = useState(false);
  const [patWarning, setPatWarning] = useState<string | null>(null);
  const [cloning, setCloning] = useState<string | null>(null);

  const status = useQuery({ queryKey: ["github-status"], queryFn: fetchGitHubStatus });
  const repos = useQuery({
    queryKey: ["github-repos"],
    queryFn: fetchGitHubRepos,
    enabled: !!status.data?.connected,
  });

  const connectMut = useMutation({
    mutationFn: (token: string) => connectGitHub(token),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["github-status"] }); setPat(""); toast("Connected to GitHub", "success"); },
  });

  const disconnectMut = useMutation({
    mutationFn: disconnectGitHub,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["github-status"] }); toast("GitHub disconnected", "info"); },
  });

  const cloneMut = useMutation({
    mutationFn: (repo: GitHubRepo) => cloneGitHubRepo(repo.cloneUrl),
    onSuccess: () => { setCloning(null); qc.invalidateQueries({ queryKey: ["projects"] }); },
    onError: () => setCloning(null),
  });

  const verifyMut = useMutation({ mutationFn: verifyGitHub });

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <GitBranch className="h-4 w-4" />
            GitHub
          </CardTitle>
          {status.data?.connected ? (
            <Badge variant="outline" className="text-green-600 border-green-600/30">
              <Check className="h-3 w-3 mr-1" /> Connected
            </Badge>
          ) : (
            <Badge variant="outline" className="text-muted-foreground">
              Not connected
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {status.data?.connected ? (
          <>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Signed in as</span>
              <span className="font-medium">{status.data.username}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Token</span>
              <span className="font-mono text-xs">{status.data.pat}</span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => verifyMut.mutate()}
                disabled={verifyMut.isPending}
                aria-label="Test connection"
              >
                {verifyMut.isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" /> : <ShieldCheck className="h-3.5 w-3.5 mr-1.5" />}
                Test Connection
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-destructive hover:text-destructive"
                onClick={() => disconnectMut.mutate()}
                disabled={disconnectMut.isPending}
                aria-label="Disconnect"
              >
                <Unplug className="h-3.5 w-3.5 mr-1.5" /> Disconnect
              </Button>
            </div>

            {/* Verify result */}
            {verifyMut.data && (
              <div className={cn(
                "rounded-md border p-3 text-xs space-y-1.5",
                verifyMut.data.ok
                  ? "border-green-600/30 bg-green-50 dark:bg-green-950/20"
                  : "border-red-600/30 bg-red-50 dark:bg-red-950/20"
              )}>
                <div className="flex items-center gap-1.5 font-medium">
                  {verifyMut.data.ok ? (
                    <><Check className="h-3.5 w-3.5 text-green-600" /> Connection verified</>
                  ) : (
                    <><XCircle className="h-3.5 w-3.5 text-red-600" /> {verifyMut.data.error}</>
                  )}
                </div>
                {verifyMut.data.ok && verifyMut.data.user && (
                  <>
                    <div className="flex justify-between text-muted-foreground">
                      <span>User</span>
                      <span className="font-medium text-foreground">{verifyMut.data.user.login}{verifyMut.data.user.name ? ` (${verifyMut.data.user.name})` : ""}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Public repos</span>
                      <span className="font-medium text-foreground">{verifyMut.data.user.repos}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Scopes</span>
                      <span className="font-mono text-foreground">{verifyMut.data.scopes}</span>
                    </div>
                    {verifyMut.data.rateLimit && (
                      <div className="flex justify-between text-muted-foreground">
                        <span>API rate limit</span>
                        <span className="font-medium text-foreground">{verifyMut.data.rateLimit.remaining}/{verifyMut.data.rateLimit.limit}</span>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Repos */}
            {repos.data && repos.data.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-border">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Recent Repositories</p>
                <div className="max-h-64 overflow-y-auto space-y-1">
                  {repos.data.slice(0, 15).map((repo) => (
                    <div
                      key={repo.fullName}
                      className="flex items-center justify-between rounded-md border border-border px-3 py-2 text-sm"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <GitBranch className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                        <span className="truncate font-medium">{repo.name}</span>
                        {repo.private && <Lock className="h-3 w-3 text-muted-foreground" />}
                        {repo.language && (
                          <Badge variant="secondary" className="text-[10px] px-1.5 py-0">{repo.language}</Badge>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-xs shrink-0"
                        disabled={cloning === repo.fullName || cloneMut.isPending}
                        onClick={() => { setCloning(repo.fullName); cloneMut.mutate(repo); }}
                      >
                        {cloning === repo.fullName ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          "Clone"
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Connect your GitHub account with a Personal Access Token to clone repos and manage projects.
            </p>

            {/* Help links */}
            <div className="rounded-md border border-border bg-muted/30 p-3 space-y-1.5">
              <p className="text-xs font-medium text-muted-foreground">How to get a token:</p>
              <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
                <li>
                  Go to{" "}
                  <a href="https://github.com/settings/tokens/new?scopes=repo,read:user&description=Claude+Auto+Setup" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-0.5">
                    GitHub Token Settings <ExternalLink className="h-2.5 w-2.5" />
                  </a>
                </li>
                <li>Select scopes: <code className="text-[10px] bg-muted px-1 py-0.5 rounded">repo</code> and <code className="text-[10px] bg-muted px-1 py-0.5 rounded">read:user</code></li>
                <li>Click &quot;Generate token&quot; and paste it below</li>
              </ol>
              <div className="flex gap-2 pt-1">
                <a
                  href="https://github.com/settings/tokens/new?scopes=repo,read:user&description=Claude+Auto+Setup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline flex items-center gap-1"
                >
                  Create classic token <ExternalLink className="h-3 w-3" />
                </a>
                <span className="text-xs text-muted-foreground">or</span>
                <a
                  href="https://github.com/settings/personal-access-tokens/new"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline flex items-center gap-1"
                >
                  Create fine-grained token <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>

            <div className="relative">
              <input
                type={showPat ? "text" : "password"}
                value={pat}
                onChange={(e) => setPat(e.target.value)}
                onBlur={(e) => setPatWarning(validateGitHubPat(e.target.value))}
                placeholder="ghp_... or github_pat_..."
                className="w-full rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm font-mono placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => setShowPat(!showPat)}
                aria-label={showPat ? "Hide token" : "Show token"}
              >
                {showPat ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {patWarning && (
              <p className="text-xs text-yellow-600 dark:text-yellow-500 mt-1">
                {patWarning}
              </p>
            )}
            <Button
              size="sm"
              className="w-full"
              disabled={!pat.trim() || connectMut.isPending}
              onClick={() => { setPatWarning(validateGitHubPat(pat.trim())); connectMut.mutate(pat.trim()); }}
            >
              {connectMut.isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" /> : <GitBranch className="h-3.5 w-3.5 mr-1.5" />}
              Connect
            </Button>
            {connectMut.isError && (
              <p className="text-xs text-destructive">
                {(connectMut.error as Error)?.message || "Failed to connect"}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// --- Supabase Section ---
function SupabaseIntegration() {
  const qc = useQueryClient();
  const { toast } = useToast();
  const [token, setToken] = useState("");
  const [projects, setProjects] = useState<SupabaseProject[]>([]);
  const [showToken, setShowToken] = useState(false);
  const [tokenWarning, setTokenWarning] = useState<string | null>(null);

  const status = useQuery({ queryKey: ["supabase-status"], queryFn: fetchSupabaseStatus });

  const connectMut = useMutation({
    mutationFn: (accessToken: string) => connectSupabase(accessToken),
    onSuccess: (data) => {
      setProjects(data.projects || []);
      setToken("");
      qc.invalidateQueries({ queryKey: ["supabase-status"] });
      toast("Supabase projects loaded", "success");
    },
  });

  const selectMut = useMutation({
    mutationFn: (projectRef: string) => selectSupabaseProject(projectRef),
    onSuccess: () => {
      setProjects([]);
      qc.invalidateQueries({ queryKey: ["supabase-status"] });
      toast("Supabase project selected", "success");
    },
  });

  const disconnectMut = useMutation({
    mutationFn: disconnectSupabase,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["supabase-status"] }); setProjects([]); toast("Supabase disconnected", "info"); },
  });

  const testMut = useMutation({ mutationFn: testSupabaseConnection });

  // Auto-fetch projects when authenticated but no project selected (e.g. after reload)
  const needsProjectSelection = status.data?.connected && !status.data?.url;
  const projectsQuery = useQuery({
    queryKey: ["supabase-projects"],
    queryFn: fetchSupabaseProjects,
    enabled: !!needsProjectSelection && projects.length === 0,
  });

  // Merge fetched projects into local state
  const allProjects = projects.length > 0 ? projects : (projectsQuery.data || []);
  const showProjectPicker = allProjects.length > 0 || needsProjectSelection;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <Database className="h-4 w-4" />
            Supabase
          </CardTitle>
          {status.data?.connected && status.data?.url ? (
            <Badge variant="outline" className="text-green-600 border-green-600/30">
              <Check className="h-3 w-3 mr-1" /> Connected
            </Badge>
          ) : status.data?.connected ? (
            <Badge variant="outline" className="text-yellow-600 border-yellow-600/30">
              Select project
            </Badge>
          ) : (
            <Badge variant="outline" className="text-muted-foreground">
              Not connected
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Connected with project selected */}
        {status.data?.connected && status.data?.url ? (
          <>
            {status.data.projectName && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Project</span>
                <span className="font-medium">{status.data.projectName}{status.data.orgName ? ` (${status.data.orgName})` : ""}</span>
              </div>
            )}
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">URL</span>
              <span className="font-mono text-xs truncate max-w-[250px]">{status.data.url}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Anon Key</span>
              <span className="font-mono text-xs">{status.data.anonKey}</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1" onClick={() => testMut.mutate()} disabled={testMut.isPending} aria-label="Test connection">
                {testMut.isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin mr-1" /> : <ShieldCheck className="h-3.5 w-3.5 mr-1" />}
                Test Connection
              </Button>
              <Button variant="outline" size="sm" className="flex-1 text-destructive hover:text-destructive" onClick={() => disconnectMut.mutate()} disabled={disconnectMut.isPending} aria-label="Disconnect">
                <Unplug className="h-3.5 w-3.5 mr-1" /> Disconnect
              </Button>
            </div>
            {testMut.data && (
              <div className={cn(
                "rounded-md border p-3 text-xs space-y-1",
                testMut.data.ok ? "border-green-600/30 bg-green-50 dark:bg-green-950/20" : "border-red-600/30 bg-red-50 dark:bg-red-950/20"
              )}>
                <div className="flex items-center gap-1.5 font-medium">
                  {testMut.data.ok
                    ? <><Check className="h-3.5 w-3.5 text-green-600" /> REST API reachable (HTTP {testMut.data.status})</>
                    : <><XCircle className="h-3.5 w-3.5 text-red-600" /> {testMut.data.error || `HTTP ${testMut.data.status}`}</>}
                </div>
              </div>
            )}
          </>
        ) : showProjectPicker ? (
          /* Project picker after authentication */
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Select a project to connect:</p>

            {projectsQuery.isLoading ? (
              <div className="flex items-center justify-center py-6 gap-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">Loading projects...</span>
              </div>
            ) : allProjects.length > 0 ? (
              <div className="max-h-48 overflow-y-auto space-y-1">
                {allProjects.map((proj) => (
                  <button
                    key={proj.id}
                    type="button"
                    onClick={() => selectMut.mutate(proj.id)}
                    disabled={selectMut.isPending}
                    className="w-full flex items-center justify-between rounded-md border border-border px-3 py-2 text-sm hover:bg-accent transition-colors text-left"
                  >
                    <div>
                      <span className="font-medium">{proj.name}</span>
                      <span className="text-[10px] text-muted-foreground ml-2">{proj.region} · {proj.status}</span>
                    </div>
                    {selectMut.isPending ? <Loader2 className="h-3 w-3 animate-spin" /> : <Check className="h-3 w-3 text-muted-foreground" />}
                  </button>
                ))}
              </div>
            ) : (
              /* No projects — prompt to create one */
              <div className="rounded-md border border-dashed border-border bg-muted/20 p-4 text-center space-y-2">
                <Database className="h-8 w-8 text-muted-foreground/40 mx-auto" />
                <p className="text-sm text-muted-foreground">No projects found</p>
                <p className="text-xs text-muted-foreground/70">Create a project in the Supabase dashboard first</p>
                <a
                  href="https://supabase.com/dashboard/new/_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Create New Project <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            )}

            {selectMut.isError && (
              <p className="text-xs text-destructive">{(selectMut.error as Error)?.message || "Failed to select project"}</p>
            )}

            {/* Refresh + disconnect */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => {
                  qc.invalidateQueries({ queryKey: ["supabase-projects"] });
                  setProjects([]);
                }}
                disabled={projectsQuery.isLoading}
              >
                {projectsQuery.isLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" /> : <RefreshCw className="h-3.5 w-3.5 mr-1.5" />}
                Refresh Projects
              </Button>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full text-destructive hover:text-destructive"
              onClick={() => disconnectMut.mutate()}
              disabled={disconnectMut.isPending}
              aria-label="Disconnect"
            >
              <Unplug className="h-3.5 w-3.5 mr-1.5" /> Sign Out
            </Button>
          </div>
        ) : (
          /* Sign in flow */
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Sign in with your Supabase account to auto-configure projects.
            </p>

            <div className="rounded-md border border-border bg-muted/30 p-3 space-y-1.5">
              <p className="text-xs font-medium text-muted-foreground">How to connect:</p>
              <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
                <li>
                  Go to{" "}
                  <a href="https://supabase.com/dashboard/account/tokens" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-0.5">
                    Account → Access Tokens <ExternalLink className="h-2.5 w-2.5" />
                  </a>
                </li>
                <li>Click &quot;Generate new token&quot; and give it a name</li>
                <li>Copy the token and paste it below</li>
              </ol>
              <a
                href="https://supabase.com/dashboard/account/tokens"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline pt-1"
              >
                Create access token <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            <div className="relative">
              <input
                type={showToken ? "text" : "password"}
                value={token}
                onChange={(e) => setToken(e.target.value)}
                onBlur={(e) => setTokenWarning(validateSupabaseToken(e.target.value))}
                placeholder="sbp_..."
                className="w-full rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm font-mono placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => setShowToken(!showToken)}
                aria-label={showToken ? "Hide token" : "Show token"}
              >
                {showToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {tokenWarning && (
              <p className="text-xs text-yellow-600 dark:text-yellow-500 mt-1">
                {tokenWarning}
              </p>
            )}
            <Button
              size="sm"
              className="w-full"
              disabled={!token.trim() || connectMut.isPending}
              onClick={() => { setTokenWarning(validateSupabaseToken(token.trim())); connectMut.mutate(token.trim()); }}
            >
              {connectMut.isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" /> : <Database className="h-3.5 w-3.5 mr-1.5" />}
              Sign In & List Projects
            </Button>
            {connectMut.isError && (
              <p className="text-xs text-destructive">
                {(connectMut.error as Error)?.message || "Authentication failed"}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// --- AWS Section ---
function AwsIntegration() {
  const qc = useQueryClient();
  const [adaAccount, setAdaAccount] = useState("");
  const [adaRole, setAdaRole] = useState("Admin");
  const [adaProfile, setAdaProfile] = useState("");

  const status = useQuery({ queryKey: ["aws-status"], queryFn: fetchAwsStatus });

  const profileMut = useMutation({
    mutationFn: (profile: string) => setAwsProfile(profile),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["aws-status"] }),
  });

  const refreshMut = useMutation({
    mutationFn: () => refreshAwsCredentials(
      adaAccount.trim() || undefined,
      adaRole.trim() || undefined,
      adaProfile.trim() || undefined,
    ),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["aws-status"] }),
  });

  const verifyMut = useMutation({ mutationFn: verifyAws });

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <Cloud className="h-4 w-4" />
            AWS
          </CardTitle>
          <div className="flex items-center gap-2">
            {status.data?.hasAwsCli && (
              <Badge variant="outline" className="text-green-600 border-green-600/30 text-[10px]">
                CLI
              </Badge>
            )}
            {status.data?.hasAda && (
              <Badge variant="outline" className="text-blue-600 border-blue-600/30 text-[10px]">
                ada
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Profile selector */}
        {status.data?.profiles && status.data.profiles.length > 0 && (
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Active Profile</label>
            <div className="flex flex-wrap gap-1.5">
              {status.data.profiles.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => profileMut.mutate(p)}
                  className={cn(
                    "rounded-md border px-3 py-1.5 text-xs font-medium transition-colors",
                    p === status.data?.activeProfile
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ada credential refresh */}
        {status.data?.hasAda && (
          <div className="space-y-2 pt-2 border-t border-border">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Refresh Credentials (ada)</label>
            <div className="grid grid-cols-3 gap-2">
              <input
                type="text"
                value={adaAccount}
                onChange={(e) => setAdaAccount(e.target.value)}
                placeholder="Account ID"
                className="rounded-md border border-input bg-background px-2 py-1.5 text-xs font-mono placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
              <input
                type="text"
                value={adaRole}
                onChange={(e) => setAdaRole(e.target.value)}
                placeholder="Role"
                className="rounded-md border border-input bg-background px-2 py-1.5 text-xs font-mono placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
              <input
                type="text"
                value={adaProfile}
                onChange={(e) => setAdaProfile(e.target.value)}
                placeholder="Profile"
                className="rounded-md border border-input bg-background px-2 py-1.5 text-xs font-mono placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              disabled={refreshMut.isPending}
              onClick={() => refreshMut.mutate()}
            >
              {refreshMut.isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" /> : <RefreshCw className="h-3.5 w-3.5 mr-1.5" />}
              Refresh Credentials
            </Button>
            {refreshMut.isSuccess && (
              <p className="text-xs text-green-600">Credentials refreshed for profile: {refreshMut.data.profile}</p>
            )}
            {refreshMut.isError && (
              <p className="text-xs text-destructive">{(refreshMut.error as Error)?.message || "Failed"}</p>
            )}
          </div>
        )}

        {/* Test Connection */}
        {status.data?.hasAwsCli && (
          <div className="space-y-2 pt-2 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              disabled={verifyMut.isPending}
              onClick={() => verifyMut.mutate()}
              aria-label="Test connection"
            >
              {verifyMut.isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" /> : <ShieldCheck className="h-3.5 w-3.5 mr-1.5" />}
              Test Connection
            </Button>

            {verifyMut.data && (
              <div className={cn(
                "rounded-md border p-3 text-xs space-y-1.5",
                verifyMut.data.ok
                  ? "border-green-600/30 bg-green-50 dark:bg-green-950/20"
                  : "border-red-600/30 bg-red-50 dark:bg-red-950/20"
              )}>
                <div className="flex items-center gap-1.5 font-medium">
                  {verifyMut.data.ok ? (
                    <><Check className="h-3.5 w-3.5 text-green-600" /> Credentials verified</>
                  ) : (
                    <><XCircle className="h-3.5 w-3.5 text-red-600" /> {verifyMut.data.error}</>
                  )}
                  {verifyMut.data.expired && (
                    <Badge variant="outline" className="text-[10px] text-orange-600 border-orange-600/30 ml-1">expired</Badge>
                  )}
                </div>
                {verifyMut.data.ok && (
                  <>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Account</span>
                      <span className="font-mono text-foreground">{verifyMut.data.account}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Profile</span>
                      <span className="font-medium text-foreground">{verifyMut.data.profile}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Region</span>
                      <span className="font-medium text-foreground">{verifyMut.data.region}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>ARN</span>
                      <span className="font-mono text-foreground truncate max-w-[250px]">{verifyMut.data.arn}</span>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {!status.data?.hasAwsCli && !status.data?.hasAda && (
          <p className="text-sm text-muted-foreground">
            No AWS CLI or ada found. Install the AWS CLI to enable cloud operations.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

// --- Main Export ---
export function Integrations() {
  return (
    <div className="space-y-4">
      <GitHubIntegration />
      <SupabaseIntegration />
      <AwsIntegration />
    </div>
  );
}
