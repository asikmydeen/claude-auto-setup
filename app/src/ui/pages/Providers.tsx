import { useQuery } from "@tanstack/react-query";
import {
  CheckCircle2,
  XCircle,
  Cpu,
  Route,
  AlertCircle,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fetchProviders, type ProvidersResponse } from "@/api/config";
import { cn } from "@/lib/utils";

// --- Skeleton ---

function ProvidersSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-40 animate-pulse rounded-lg bg-muted" />
        ))}
      </div>
      <div className="h-64 animate-pulse rounded-lg bg-muted" />
    </div>
  );
}

// --- Provider Card ---

const PROVIDER_LABELS: Record<string, string> = {
  claude: "Claude",
  codex: "Codex CLI",
  gemini: "Gemini CLI",
  amp: "Amp Code",
  kiro: "Kiro CLI",
};

const PROVIDER_SETUP: Record<string, { install: string; auth: string; docs: string }> = {
  claude: {
    install: "npm install -g @anthropic-ai/claude-code",
    auth: "claude login",
    docs: "Or add Anthropic API key in AI Models tab to use without subscription",
  },
  codex: {
    install: "npm install -g @openai/codex",
    auth: "codex login",
    docs: "Or add OpenAI API key in AI Models tab",
  },
  gemini: {
    install: "npm install -g @anthropic-ai/gemini-cli",
    auth: "gemini auth",
    docs: "Or add Google API key in AI Models tab",
  },
  amp: {
    install: "npm install -g @anthropic-ai/amp",
    auth: "amp login",
    docs: "Multi-model routing agent — supports multiple providers",
  },
  kiro: {
    install: "npm install -g @anthropic-ai/kiro-cli",
    auth: "kiro auth (uses AWS credentials)",
    docs: "Or configure AWS Bedrock in AI Models tab",
  },
};

interface ProviderCardProps {
  name: string;
  installed: boolean;
  path?: string;
  version?: string;
  strengths?: string[];
}

function ProviderCard({
  name,
  installed,
  path,
  version,
  strengths,
}: ProviderCardProps) {
  return (
    <Card
      className={cn(
        "transition-colors",
        installed
          ? "border-green-500/20 dark:border-green-500/30"
          : "border-border opacity-60"
      )}
    >
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-base">
          <div className="flex items-center gap-2">
            <Cpu className="h-4 w-4" />
            {PROVIDER_LABELS[name] || name}
          </div>
          {installed ? (
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          ) : (
            <XCircle className="h-5 w-5 text-muted-foreground/40" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {installed && (
          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="font-mono text-xs truncate">{path}</span>
            </div>
            {version && (
              <div>
                <Badge variant="secondary" className="text-xs font-mono">
                  {version.length > 40 ? version.slice(0, 40) + "..." : version}
                </Badge>
              </div>
            )}
          </div>
        )}

        {!installed && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-medium">Not installed — set up:</p>
            {PROVIDER_SETUP[name] && (
              <div className="space-y-1.5">
                <div className="flex items-center gap-1">
                  <span className="text-[9px] text-muted-foreground shrink-0">Install:</span>
                  <code className="text-[10px] bg-muted px-1.5 py-0.5 rounded font-mono truncate">
                    {PROVIDER_SETUP[name].install}
                  </code>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[9px] text-muted-foreground shrink-0">Auth:</span>
                  <code className="text-[10px] bg-muted px-1.5 py-0.5 rounded font-mono truncate">
                    {PROVIDER_SETUP[name].auth}
                  </code>
                </div>
                <p className="text-[9px] text-muted-foreground/70">
                  {PROVIDER_SETUP[name].docs}
                </p>
              </div>
            )}
          </div>
        )}

        {strengths && strengths.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {strengths.map((s) => (
              <Badge key={s} variant="outline" className="text-xs">
                <Zap className="mr-1 h-3 w-3" />
                {s}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// --- Task Routing Table ---

interface TaskRoutingTableProps {
  routing: Record<string, string[]>;
  installed: Record<string, unknown>;
}

function TaskRoutingTable({ routing, installed }: TaskRoutingTableProps) {
  const entries = Object.entries(routing);

  if (entries.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No task routing configured</p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="py-3 pr-4 text-left font-semibold text-muted-foreground">
              Task Type
            </th>
            <th className="py-3 text-left font-semibold text-muted-foreground">
              Provider Preference
            </th>
          </tr>
        </thead>
        <tbody>
          {entries.map(([taskType, providers]) => (
            <tr
              key={taskType}
              className="border-b border-border/50 last:border-0"
            >
              <td className="py-3 pr-4">
                <code className="rounded bg-muted px-2 py-1 text-xs font-mono">
                  {taskType}
                </code>
              </td>
              <td className="py-3">
                <div className="flex flex-wrap gap-1.5">
                  {(Array.isArray(providers) ? providers : [providers]).map(
                    (provider, idx) => {
                      const isInstalled = provider in installed;
                      return (
                        <Badge
                          key={`${provider}-${idx}`}
                          variant={isInstalled ? "default" : "outline"}
                          className={cn(
                            "text-xs",
                            !isInstalled && "opacity-40"
                          )}
                        >
                          {isInstalled && (
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                          )}
                          {PROVIDER_LABELS[provider] || provider}
                        </Badge>
                      );
                    }
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// --- Main Providers Page ---

export function Providers() {
  const { data, isLoading, error, refetch } = useQuery<ProvidersResponse>({
    queryKey: ["providers"],
    queryFn: fetchProviders,
  });

  if (isLoading) return <ProvidersSkeleton />;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <AlertCircle className="h-10 w-10 text-destructive" />
        <p className="text-muted-foreground">Failed to load providers</p>
        <Button variant="outline" onClick={() => refetch()}>
          Retry
        </Button>
      </div>
    );
  }

  const providers = data?.config?.providers ?? {};
  const routing = data?.config?.task_routing ?? {};
  const installed = data?.installed ?? {};
  const allProviderNames = [
    ...new Set([...Object.keys(providers), ...Object.keys(installed)]),
  ];

  // Ensure the 5 standard providers are always shown
  for (const name of ["claude", "codex", "gemini", "amp", "kiro"]) {
    if (!allProviderNames.includes(name)) {
      allProviderNames.push(name);
    }
  }

  const installedCount = Object.keys(installed).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Providers</h1>
        <p className="text-muted-foreground">
          AI agent providers and task routing configuration
        </p>
      </div>

      {/* Installed Providers */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Cpu className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold">Installed Providers</h2>
          <Badge variant="secondary">{installedCount} installed</Badge>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {allProviderNames.map((name) => (
            <ProviderCard
              key={name}
              name={name}
              installed={name in installed}
              path={installed[name]?.path}
              version={installed[name]?.version}
              strengths={providers[name]?.strengths as string[] | undefined}
            />
          ))}
        </div>
      </div>

      {/* Task Routing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Route className="h-5 w-5" />
            Task Routing
            <Badge variant="secondary" className="ml-2">
              {Object.keys(routing).length} routes
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TaskRoutingTable routing={routing} installed={installed} />
        </CardContent>
      </Card>
    </div>
  );
}
