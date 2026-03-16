import { useState, useRef, useEffect, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Loader2,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Plus,
  Trash2,
  FolderOpen,
  Check,
  Play as PlayIcon,
  MoreHorizontal,
  FolderSearch,
  Clipboard,
  X,
  Settings2,
  Globe,
  TerminalSquare,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  runInstall,
  fetchProjects,
  addProject,
  setActiveProject,
  deleteProject,
  revealProject,
  type ClaudeSession,
  type InstallResponse,
  type GitStatus,
} from "@/api/config";
import { cn, relativeTime } from "@/lib/utils";
import { api } from "@/api/client";
import { FolderBrowser } from "@/components/FolderBrowser";
import { STATUS_CONFIG, countMessages, truncateAtWord } from "./types";

// ---------------------------------------------------------------------------
// Quick Action (sidebar install actions)
// ---------------------------------------------------------------------------

export interface QuickActionProps {
  label: string;
  icon: React.ReactNode;
  flags: string[];
}

export function QuickAction({ label, icon, flags }: QuickActionProps) {
  const [expanded, setExpanded] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation<InstallResponse, Error, string[]>({
    mutationFn: (f: string[]) => runInstall(f),
    onSuccess: (data) => {
      setOutput(data.output || "");
      if (data.error) setError(data.error);
      setExpanded(true);
    },
    onError: (err) => {
      setError(err.message);
      setExpanded(true);
    },
  });

  return (
    <div className="rounded-lg border border-border bg-card/50">
      <button
        type="button"
        onClick={() => {
          if (output !== null) {
            setExpanded(!expanded);
          } else {
            setOutput(null);
            setError(null);
            mutation.mutate(flags);
          }
        }}
        disabled={mutation.isPending}
        className="flex w-full items-center gap-2 px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
      >
        {mutation.isPending ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin flex-shrink-0" />
        ) : (
          <span className="flex-shrink-0">{icon}</span>
        )}
        <span className="truncate flex-1 text-left">{label}</span>
        {output !== null && (
          expanded ? (
            <ChevronDown className="h-3 w-3 flex-shrink-0" />
          ) : (
            <ChevronRight className="h-3 w-3 flex-shrink-0" />
          )
        )}
      </button>

      {expanded && (output !== null || error !== null) && (
        <div className="border-t border-border px-3 py-2">
          {error && (
            <div className="mb-1.5 flex items-center gap-1.5 text-xs text-destructive">
              <AlertCircle className="h-3 w-3" />
              {error}
            </div>
          )}
          {output !== null && (
            <pre className="max-h-[120px] overflow-auto rounded bg-[#0d1117] p-2 text-[10px] leading-relaxed text-gray-400">
              {output || "(no output)"}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Project Selector
// ---------------------------------------------------------------------------

export interface ProjectSelectorProps {
  onProjectChange?: () => void;
}

export function ProjectSelector({ onProjectChange }: ProjectSelectorProps) {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [browserOpen, setBrowserOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const projectsQuery = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  const setActiveMutation = useMutation({
    mutationFn: (path: string) => setActiveProject(path),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["suggestions"] });
      queryClient.invalidateQueries({ queryKey: ["git-status"] });
      setIsOpen(false);
      onProjectChange?.();
    },
  });

  const addMutation = useMutation({
    mutationFn: (path: string) => addProject(path),
    onSuccess: (_data, path) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      setActiveMutation.mutate(path);
    },
  });

  const handleAddProject = useCallback(
    (path: string) => {
      setBrowserOpen(false);
      setIsOpen(false);
      addMutation.mutate(path);
    },
    [addMutation],
  );

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  const projects = projectsQuery.data?.projects ?? [];
  const activeProjectPath = projectsQuery.data?.active ?? "";
  const activeProject = projects.find((p) => p.path === activeProjectPath);
  const displayName = activeProject?.name ?? "No project";

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
      >
        <FolderOpen className="h-3.5 w-3.5 flex-shrink-0 text-primary" />
        <span className="flex-1 truncate text-left font-medium">{displayName}</span>
        <ChevronDown className={cn("h-3 w-3 flex-shrink-0 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 rounded-lg border border-border bg-card shadow-lg">
          <div className="max-h-48 overflow-y-auto py-1">
            {projects.map((p) => (
              <button
                key={p.path}
                type="button"
                onClick={() => setActiveMutation.mutate(p.path)}
                className={cn(
                  "flex w-full items-start gap-2 px-3 py-2 text-left text-xs transition-colors hover:bg-accent",
                  p.path === activeProjectPath && "bg-accent/50"
                )}
              >
                <FolderOpen className="mt-0.5 h-3 w-3 flex-shrink-0 text-muted-foreground" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-foreground">{p.name}</p>
                  <p className="truncate text-[10px] text-muted-foreground">{p.path}</p>
                </div>
                {p.path === activeProjectPath && (
                  <Check className="mt-0.5 h-3 w-3 flex-shrink-0 text-primary" />
                )}
              </button>
            ))}
            {projects.length === 0 && (
              <p className="px-3 py-2 text-center text-[10px] text-muted-foreground">
                No projects configured
              </p>
            )}
          </div>
          <div className="border-t border-border p-1.5">
            <button
              type="button"
              onClick={() => setBrowserOpen(true)}
              className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <Plus className="h-3 w-3" />
              Add Project Folder...
            </button>
          </div>
        </div>
      )}

      <FolderBrowser
        open={browserOpen}
        onClose={() => setBrowserOpen(false)}
        onSelect={handleAddProject}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Session List Item
// ---------------------------------------------------------------------------

export interface SessionItemProps {
  session: ClaudeSession;
  isActive: boolean;
  onClick: () => void;
  onDelete: (id: string) => void;
}

export function SessionItem({ session, isActive, onClick, onDelete }: SessionItemProps) {
  const status = STATUS_CONFIG[session.status];
  const msgCount = countMessages(session);
  const totalMessages = session.messages.length || 1;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group flex w-full items-start gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition-all duration-150",
        isActive
          ? "border-l-2 border-l-primary bg-accent text-accent-foreground"
          : "border-l-2 border-l-transparent text-muted-foreground hover:translate-x-0.5 hover:bg-accent/50 hover:text-foreground"
      )}
    >
      <div className={cn("mt-1.5 h-2 w-2 rounded-full flex-shrink-0", status.dot)} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium text-foreground">
          {truncateAtWord(session.prompt, 40)}
        </p>
        <div className="mt-0.5 flex items-center gap-2 text-[10px] text-muted-foreground">
          <span className={cn(
            // Recency coloring: green (<2h), yellow (2h-1w), gray (>1w)
            (() => {
              const age = Date.now() - new Date(session.startedAt).getTime();
              if (age < 2 * 60 * 60 * 1000) return "text-green-500";
              if (age < 7 * 24 * 60 * 60 * 1000) return "text-yellow-500";
              return "text-muted-foreground/60";
            })()
          )}>{relativeTime(session.startedAt)}</span>
          {totalMessages > 1 && (
            <Badge variant="outline" className="px-1 py-0 text-[9px] leading-none">
              {totalMessages} msgs
            </Badge>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(session.id);
        }}
        className="mt-0.5 flex-shrink-0 rounded p-0.5 opacity-0 transition-all hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
        title="Delete session"
      >
        <Trash2 className="h-3 w-3" />
      </button>
    </button>
  );
}

// ---------------------------------------------------------------------------
// Project Group (sidebar section per open project)
// ---------------------------------------------------------------------------

export interface ProjectGroupProps {
  projectPath: string;
  sessions: ClaudeSession[];
  activeSessionId: string | null;
  isCollapsed: boolean;
  onToggle: () => void;
  onNewChat: (projectPath: string) => void;
  onSelectSession: (id: string) => void;
  onDeleteSession: (id: string) => void;
  onClose: () => void;
  onStartDevServer?: (projectPath: string) => void;
  onOpenTerminal?: (projectPath: string) => void;
  onOpenBrowser?: (projectPath: string) => void;
  onConfigureEnv?: (projectPath: string) => void;
}

export function ProjectGroup({
  projectPath,
  sessions,
  activeSessionId,
  isCollapsed,
  onToggle,
  onNewChat,
  onSelectSession,
  onDeleteSession,
  onClose,
  onStartDevServer,
  onOpenTerminal,
  onOpenBrowser,
  onConfigureEnv,
}: ProjectGroupProps) {
  const projectName = projectPath.split("/").pop() || projectPath;
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const gitQuery = useQuery<GitStatus>({
    queryKey: ["git-status", projectPath],
    queryFn: () =>
      api.get<GitStatus>(`/git/status?cwd=${encodeURIComponent(projectPath)}`),
    refetchInterval: 30_000,
    retry: 1, // Don't keep retrying on invalid/deleted projects
    staleTime: 10_000,
  });

  const git = gitQuery.data;
  const changeCount = (git?.staged ?? 0) + (git?.modified ?? 0);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  const handleDeleteProject = async (deleteFiles: boolean) => {
    // Close menu/confirm first to prevent stale renders
    setConfirmDelete(false);
    setMenuOpen(false);
    onClose();
    try {
      await deleteProject(projectPath, deleteFiles);
    } catch {}
  };

  return (
    <div className="animate-fade-in-up border-b border-border/50 pb-2 mb-2 last:border-0 last:pb-0 last:mb-0">
      {/* Project header */}
      <div className="relative">
        <button
          type="button"
          onClick={onToggle}
          className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-sm font-medium hover:bg-accent transition-colors group"
        >
          {isCollapsed ? (
            <ChevronRight className="h-3 w-3 text-muted-foreground flex-shrink-0" />
          ) : (
            <ChevronDown className="h-3 w-3 text-muted-foreground flex-shrink-0" />
          )}
          <FolderOpen className="h-3.5 w-3.5 text-blue-500 flex-shrink-0" />
          <span className="flex-1 text-left truncate">{projectName}</span>
          {sessions.length > 0 && (
            <span className="text-[9px] text-muted-foreground tabular-nums">{sessions.length}</span>
          )}
          {sessions.some(s => s.status === "running") && (
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
          )}

          {/* New chat */}
          <Button
            size="icon-xs"
            variant="ghost"
            onClick={(e: React.MouseEvent) => { e.stopPropagation(); onNewChat(projectPath); }}
            title="New chat"
            aria-label="New chat in this project"
            className="h-5 w-5 flex-shrink-0"
          >
            <Plus className="h-3 w-3" />
          </Button>

          {/* Context menu trigger */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setMenuOpen((o) => !o); }}
            className="opacity-0 group-hover:opacity-100 rounded p-0.5 hover:bg-accent transition-opacity"
            title="Project options"
            aria-label="Project options menu"
          >
            <MoreHorizontal className="h-3 w-3" />
          </button>
        </button>

        {/* Context dropdown menu */}
        {menuOpen && (
          <div ref={menuRef} className="absolute right-1 top-full z-50 mt-1 w-48 rounded-lg border border-border bg-popover shadow-lg py-1 text-xs animate-in fade-in slide-in-from-top-1 duration-150">
            {!confirmDelete ? (
              <>
                <button type="button" onClick={() => { onNewChat(projectPath); setMenuOpen(false); }}
                  className="flex w-full items-center gap-2 px-3 py-1.5 hover:bg-accent transition-colors">
                  <Plus className="h-3 w-3" /> New conversation
                </button>
                <button type="button" onClick={() => { onStartDevServer?.(projectPath); setMenuOpen(false); }}
                  className="flex w-full items-center gap-2 px-3 py-1.5 hover:bg-accent transition-colors">
                  <PlayIcon className="h-3 w-3 text-green-500" /> Start dev server
                </button>
                <button type="button" onClick={() => { onOpenTerminal?.(projectPath); setMenuOpen(false); }}
                  className="flex w-full items-center gap-2 px-3 py-1.5 hover:bg-accent transition-colors">
                  <TerminalSquare className="h-3 w-3" /> Open terminal
                </button>
                <button type="button" onClick={() => { onOpenBrowser?.(projectPath); setMenuOpen(false); }}
                  className="flex w-full items-center gap-2 px-3 py-1.5 hover:bg-accent transition-colors">
                  <Globe className="h-3 w-3" /> Preview app
                </button>
                <button type="button" onClick={() => { onConfigureEnv?.(projectPath); setMenuOpen(false); }}
                  className="flex w-full items-center gap-2 px-3 py-1.5 hover:bg-accent transition-colors">
                  <Settings2 className="h-3 w-3 text-purple-500" /> Configure environment
                </button>
                <div className="my-1 border-t border-border" />
                <button type="button" onClick={() => { revealProject(projectPath); setMenuOpen(false); }}
                  className="flex w-full items-center gap-2 px-3 py-1.5 hover:bg-accent transition-colors">
                  <FolderSearch className="h-3 w-3" /> Reveal in Finder
                </button>
                <button type="button" onClick={() => { navigator.clipboard.writeText(projectPath); setMenuOpen(false); }}
                  className="flex w-full items-center gap-2 px-3 py-1.5 hover:bg-accent transition-colors">
                  <Clipboard className="h-3 w-3" /> Copy path
                </button>
                <div className="my-1 border-t border-border" />
                <button type="button" onClick={() => { onClose(); setMenuOpen(false); }}
                  className="flex w-full items-center gap-2 px-3 py-1.5 hover:bg-accent transition-colors">
                  <X className="h-3 w-3" /> Remove from sidebar
                </button>
                <button type="button" onClick={() => setConfirmDelete(true)}
                  className="flex w-full items-center gap-2 px-3 py-1.5 hover:bg-destructive/10 text-destructive transition-colors">
                  <Trash2 className="h-3 w-3" /> Delete project...
                </button>
              </>
            ) : (
              /* Delete confirmation inline */
              <div className="px-3 py-2 space-y-2">
                <p className="font-medium text-destructive">Delete &quot;{projectName}&quot;?</p>
                <button type="button" onClick={() => handleDeleteProject(false)}
                  className="flex w-full items-center gap-2 rounded px-2 py-1.5 hover:bg-accent transition-colors">
                  <X className="h-3 w-3" /> Remove from sidebar only
                </button>
                <button type="button" onClick={() => handleDeleteProject(true)}
                  className="flex w-full items-center gap-2 rounded px-2 py-1.5 hover:bg-destructive/10 text-destructive transition-colors">
                  <Trash2 className="h-3 w-3" /> Delete all files permanently
                </button>
                <button type="button" onClick={() => { setConfirmDelete(false); setMenuOpen(false); }}
                  className="flex w-full items-center justify-center rounded px-2 py-1 text-muted-foreground hover:text-foreground transition-colors">
                  Cancel
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Git status line */}
      {!isCollapsed && git && (
        <div className="flex items-center gap-2 px-7 pb-1 text-[10px] text-muted-foreground">
          <span className="font-mono">{git.branch}</span>
          <span>&middot;</span>
          {git.clean ? (
            <span className="text-green-500">clean</span>
          ) : (
            <span className="text-yellow-500">{changeCount} changes</span>
          )}
        </div>
      )}

      {/* Sessions in this project */}
      {!isCollapsed && (
        <div className="pl-4 pr-1 space-y-0.5">
          {sessions.length === 0 ? (
            <button
              type="button"
              onClick={() => onNewChat(projectPath)}
              className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-[11px] text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
            >
              <Plus className="h-3 w-3" />
              <span>Start a new conversation</span>
            </button>
          ) : (
            sessions.map((s) => (
              <SessionItem
                key={s.id}
                session={s}
                isActive={s.id === activeSessionId}
                onClick={() => onSelectSession(s.id)}
                onDelete={() => onDeleteSession(s.id)}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
