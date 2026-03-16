import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  GitBranch,
  ArrowUpRight,
  ArrowDownLeft,
  ChevronDown,
  ChevronRight,
  AlertCircle,
  RotateCcw,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { fetchGitStatus, type GitStatus } from "@/api/config";

// ---------------------------------------------------------------------------
// Git Status Bar
// ---------------------------------------------------------------------------

export function GitStatusBar() {
  const [expanded, setExpanded] = useState(false);

  const gitQuery = useQuery<GitStatus>({
    queryKey: ["git-status"],
    queryFn: fetchGitStatus,
    refetchInterval: 15_000,
  });

  const git = gitQuery.data;

  if (!git) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 text-[10px] text-muted-foreground">
        <GitBranch className="h-3 w-3" />
        <span className="animate-pulse">Loading...</span>
      </div>
    );
  }

  const totalChanges = git.staged + git.modified;

  return (
    <div>
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-2 px-3 py-1.5 text-[10px] text-muted-foreground transition-colors hover:bg-accent/50"
      >
        <GitBranch className="h-3 w-3 flex-shrink-0" />
        <span className="truncate font-medium">{git.branch}</span>

        {/* Clean / dirty indicator */}
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full flex-shrink-0",
            git.clean ? "bg-green-500" : "bg-yellow-500"
          )}
          title={git.clean ? "Working tree clean" : "Uncommitted changes"}
        />

        {/* Change count badge */}
        {totalChanges > 0 && (
          <Badge
            variant="outline"
            className="ml-auto px-1 py-0 text-[9px] border-yellow-500/30 text-yellow-600 dark:text-yellow-400"
          >
            {totalChanges} changed
          </Badge>
        )}

        {/* Ahead / behind */}
        {git.ahead > 0 && (
          <span className="inline-flex items-center gap-0.5 text-green-600 dark:text-green-400">
            <ArrowUpRight className="h-2.5 w-2.5" />
            {git.ahead}
          </span>
        )}
        {git.behind > 0 && (
          <span className="inline-flex items-center gap-0.5 text-red-600 dark:text-red-400">
            <ArrowDownLeft className="h-2.5 w-2.5" />
            {git.behind}
          </span>
        )}

        {totalChanges > 0 && (
          expanded
            ? <ChevronDown className="h-2.5 w-2.5 flex-shrink-0" />
            : <ChevronRight className="h-2.5 w-2.5 flex-shrink-0" />
        )}
      </button>

      {/* Expanded file list */}
      {expanded && git.files.length > 0 && (
        <div className="border-t border-border/50 px-2 py-1 space-y-0.5">
          {git.files.slice(0, 20).map((f) => (
            <div
              key={f.file}
              className="flex items-center gap-1.5 rounded px-2 py-0.5 text-[10px]"
              title={f.file}
            >
              <span
                className={cn(
                  "w-3 text-center font-mono font-bold",
                  f.status === "A" || f.status === "??" ? "text-green-500" :
                  f.status === "D" ? "text-red-500" :
                  "text-yellow-500"
                )}
              >
                {f.status === "??" ? "+" : f.status}
              </span>
              <span className="truncate text-muted-foreground">{f.file}</span>
            </div>
          ))}
          {git.files.length > 20 && (
            <p className="px-2 py-0.5 text-[9px] text-muted-foreground">
              ...and {git.files.length - 20} more
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Error Banner (auto-dismiss after 10s)
// ---------------------------------------------------------------------------

export function ErrorBanner({
  message,
  onRetry,
  onDismiss,
}: {
  message: string;
  onRetry: () => void;
  onDismiss: () => void;
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onDismiss();
    }, 10_000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  if (!visible) return null;

  return (
    <div className="mx-auto flex max-w-3xl items-center gap-2 px-6 py-2 animate-fade-in-up">
      <div className="flex flex-1 items-center gap-2 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
        <AlertCircle className="h-4 w-4 flex-shrink-0" />
        <span className="flex-1">{message}</span>
        <Button
          size="xs"
          variant="ghost"
          onClick={onRetry}
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <RotateCcw className="mr-1 h-3 w-3" />
          Retry
        </Button>
        <button
          type="button"
          onClick={() => {
            setVisible(false);
            onDismiss();
          }}
          className="rounded p-0.5 text-destructive/60 hover:text-destructive"
          aria-label="Dismiss error"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
