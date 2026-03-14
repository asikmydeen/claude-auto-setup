import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Brain,
  RefreshCw,
  Loader2,
  Sparkles,
  Terminal,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  fetchProjectIntel,
  initProject,
  createClaudeSession,
} from "@/api/config";

interface ProjectIntelProps {
  cwd: string;
  onSessionCreated?: (sessionId: string) => void;
}

export function ProjectIntelPanel({ cwd, onSessionCreated }: ProjectIntelProps) {
  const qc = useQueryClient();
  const [expanded, setExpanded] = useState(false);

  const intel = useQuery({
    queryKey: ["project-intel", cwd],
    queryFn: () => fetchProjectIntel(cwd),
    staleTime: 60_000,
  });

  const initMut = useMutation({
    mutationFn: () => initProject(cwd),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["project-intel", cwd] }),
  });

  const refreshIntelMut = useMutation({
    mutationFn: async () => {
      const session = await createClaudeSession(
        "Analyze this codebase and generate/update the project-intel.md file at .claude/rules/project-intel.md. Include: stack, architecture, directory map, API surface, build/test commands, known gotchas.",
        cwd,
      );
      return session;
    },
    onSuccess: (session) => {
      onSessionCreated?.(session.id);
    },
  });

  if (intel.isLoading) {
    return (
      <div className="flex items-center gap-2 px-4 py-3 text-sm text-muted-foreground">
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
        Loading project intel...
      </div>
    );
  }

  const data = intel.data;
  if (!data) return null;

  // No intel — show setup CTAs
  if (!data.hasIntel && !data.hasClaude) {
    return (
      <div className="mx-3 mb-3 rounded-lg border border-dashed border-border bg-card/50 p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Brain className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">New project detected</span>
        </div>
        <p className="text-xs text-muted-foreground">
          This project hasn't been initialized for AI-assisted development yet.
        </p>
        <div className="flex gap-2">
          <Button
            variant="default"
            size="sm"
            className="flex-1"
            disabled={refreshIntelMut.isPending}
            onClick={() => refreshIntelMut.mutate()}
          >
            {refreshIntelMut.isPending ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" />
            ) : (
              <Brain className="h-3.5 w-3.5 mr-1.5" />
            )}
            Generate Intel
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            disabled={initMut.isPending}
            onClick={() => initMut.mutate()}
          >
            {initMut.isPending ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" />
            ) : (
              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
            )}
            Init Config
          </Button>
        </div>
        {initMut.isSuccess && (
          <p className="text-xs text-green-600">Project initialized successfully</p>
        )}
      </div>
    );
  }

  // Has intel — show summary
  if (data.hasIntel && data.summary) {
    return (
      <div className="mx-3 mb-3">
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="w-full rounded-lg border border-border bg-card/50 hover:bg-card transition-colors"
        >
          <div className="flex items-center justify-between px-4 py-2.5">
            <div className="flex items-center gap-2">
              <Brain className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium">Project Intelligence</span>
              {data.summary.lastUpdated && (
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                  {data.summary.lastUpdated}
                </Badge>
              )}
            </div>
            {expanded ? (
              <ChevronUp className="h-3.5 w-3.5 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            )}
          </div>
        </button>

        {expanded && (
          <div className="mt-1 rounded-lg border border-border bg-card/50 p-4 space-y-3">
            {/* Stack */}
            {data.summary.stack && (
              <div>
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-1">Stack</p>
                <p className="text-xs text-foreground whitespace-pre-line leading-relaxed">
                  {data.summary.stack.slice(0, 300)}
                </p>
              </div>
            )}

            {/* Commands */}
            {data.summary.commands && data.summary.commands.length > 0 && (
              <div>
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-1">Commands</p>
                <div className="space-y-1">
                  {data.summary.commands.slice(0, 6).map((cmd, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                      <Terminal className="h-3 w-3 shrink-0" />
                      <span className="truncate">{cmd}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2 pt-1 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs"
                disabled={refreshIntelMut.isPending}
                onClick={(e) => { e.stopPropagation(); refreshIntelMut.mutate(); }}
              >
                {refreshIntelMut.isPending ? (
                  <Loader2 className="h-3 w-3 animate-spin mr-1" />
                ) : (
                  <RefreshCw className="h-3 w-3 mr-1" />
                )}
                Refresh Intel
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Has CLAUDE.md but no intel
  return (
    <div className="mx-3 mb-3 rounded-lg border border-dashed border-border bg-card/50 p-4 space-y-2">
      <div className="flex items-center gap-2">
        <Brain className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">No project intelligence</span>
      </div>
      <p className="text-xs text-muted-foreground">
        CLAUDE.md found, but no cached intelligence. Generate intel for faster AI assistance.
      </p>
      <Button
        variant="default"
        size="sm"
        disabled={refreshIntelMut.isPending}
        onClick={() => refreshIntelMut.mutate()}
      >
        {refreshIntelMut.isPending ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" />
        ) : (
          <Brain className="h-3.5 w-3.5 mr-1.5" />
        )}
        Generate Intel
      </Button>
    </div>
  );
}
