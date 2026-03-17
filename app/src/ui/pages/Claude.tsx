import { useState, useEffect, useCallback, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Terminal,
  Loader2,
  RefreshCw,
  Square,
  AlertCircle,
  MessageSquare,
  Menu,
  X,
  FileText,
  FolderOpen,
  Sparkles,
  RotateCcw,
  FolderPlus,
  Settings2,
  Plug,
  Globe,
  TerminalSquare,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SessionSearch } from "@/components/claude/SessionSearch";
import {
  fetchClaudeSessions,
  createClaudeSession,
  stopClaudeSession,
  deleteClaudeSessionFn,
  sendFollowUp,
  fetchFileChanges,
  fetchProjects,
  addProject,
  fetchSuggestions,
  fetchFollowUpSuggestions,
  startDevServer,
  fetchDevServerStatus,
  fetchProjectType,
  fetchLLMModels,
  type ClaudeSession,
  type FileChangesResponse,
  type Suggestion,
  type FollowUpSuggestion,
} from "@/api/config";
import { cn } from "@/lib/utils";
import { FolderBrowser } from "@/components/FolderBrowser";
import { Integrations } from "@/pages/Integrations";
import { ProjectIntelPanel } from "@/components/ProjectIntel";
import { ProjectCreator } from "@/components/ProjectCreator";
import { OpsPanel } from "@/components/OpsPanel";
import { BrowserPanel } from "@/components/BrowserPanel";
import { TerminalPanel } from "@/components/TerminalPanel";
import { DevServerLogs } from "@/components/DevServerLogs";
import { ProjectEnvDrawer } from "@/components/ProjectEnvDrawer";

// Extracted components
import { ConversationEntry, AttachedImage, MOD, STATUS_CONFIG } from "@/components/claude/types";
import { useDocumentVisible, useSSE, ThemeToggle } from "@/components/claude/hooks";
import { StreamingTimer } from "@/components/claude/InputBar";
import { ProjectGroup } from "@/components/claude/Sidebar";
import { ChatArea } from "@/components/claude/ChatArea";
import { PromptInput } from "@/components/claude/InputBar";
import { WelcomeScreen } from "@/components/claude/WelcomeScreen";
import { FileChangesPanel } from "@/components/claude/FileChangesPanel";
import { ErrorBanner } from "@/components/claude/StatusBars";


// ---------------------------------------------------------------------------
// Main Claude Page
// ---------------------------------------------------------------------------

interface ClaudeProps {
  onOpenSettings?: () => void;
}

export function Claude({ onOpenSettings }: ClaudeProps) {
  const queryClient = useQueryClient();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [attachedImages, setAttachedImages] = useState<AttachedImage[]>([]);
  /** Selected LLM model — "claude-cli" for CLI mode, or "provider:model" for API mode */
  const [selectedModel, setSelectedModel] = useState("claude-cli");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [filesPanelOpen, setFilesPanelOpen] = useState(false);
  /** Optimistic user messages added before the server responds */
  const [pendingMessages, setPendingMessages] = useState<ConversationEntry[]>([]);

  // -- Multi-project sidebar state --
  const [openProjects, setOpenProjects] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("openProjects");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [collapsedProjects, setCollapsedProjects] = useState<Set<string>>(
    new Set()
  );
  const [folderBrowserOpen, setFolderBrowserOpen] = useState(false);
  const [projectCreatorOpen, setProjectCreatorOpen] = useState(false);
  const [opsPanelOpen, setOpsPanelOpen] = useState(false);
  const [browserPanelOpen, setBrowserPanelOpen] = useState(false);
  const [terminalPanelOpen, setTerminalPanelOpen] = useState(false);
  // Active view: "chat" (default), "integrations"
  const [activeView, setActiveView] = useState<"chat" | "integrations">("chat");
  const [sessionSearch, setSessionSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [softDeletedIds, setSoftDeletedIds] = useState<Set<string>>(new Set());
  const [undoAction, setUndoAction] = useState<{ id: string; timer: ReturnType<typeof setTimeout> } | null>(null);
  /** Which project the user last interacted with — drives suggestions, intel, and new session cwd */
  const [activeProjectPath, setActiveProjectPath] = useState<string | null>(null);
  /** Project currently being built by Claude — triggers auto-start dev server when done */
  const [buildingProjectDir, setBuildingProjectDir] = useState<string | null>(null);
  /** Preferred runtime for new project dev servers (native, docker, podman, etc.) */
  const [preferredRuntime, setPreferredRuntime] = useState<string>("native");
  /** Project env drawer state */
  const [envDrawerProject, setEnvDrawerProject] = useState<string | null>(null);
  const [browserInitialUrl, setBrowserInitialUrl] = useState<string | null>(null);
  /** When the user clicks "+" on a specific project, store the cwd for the next new session */
  const [newChatProjectCwd, setNewChatProjectCwd] = useState<string | null>(
    null
  );

  // Persist openProjects to localStorage + clean up stale paths on mount
  useEffect(() => {
    localStorage.setItem("openProjects", JSON.stringify(openProjects));
  }, [openProjects]);

  // On mount: validate that saved project paths still exist
  useEffect(() => {
    if (openProjects.length === 0) return;
    (async () => {
      const valid: string[] = [];
      for (const p of openProjects) {
        try {
          const res = await fetch(`/api/projects/type?cwd=${encodeURIComponent(p)}`);
          if (res.ok) valid.push(p);
        } catch {}
      }
      if (valid.length !== openProjects.length) {
        setOpenProjects(valid);
        if (activeProjectPath && !valid.includes(activeProjectPath)) {
          setActiveProjectPath(valid[0] || null);
        }
      }
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Listen for "open in built-in browser" events from LinkProvider
  useEffect(() => {
    function handleOpenInBrowser(e: Event) {
      const url = (e as CustomEvent).detail?.url;
      if (url) {
        setBrowserInitialUrl(url);
        setBrowserPanelOpen(true);
      }
    }
    window.addEventListener("open-in-browser", handleOpenInBrowser);
    return () => window.removeEventListener("open-in-browser", handleOpenInBrowser);
  }, []);

  const isTabVisible = useDocumentVisible();

  // --------------- Keyboard shortcuts ---------------
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const meta = e.metaKey || e.ctrlKey;
      // Cmd+K — focus session search
      if (meta && e.key === "k") {
        e.preventDefault();
        setSessionSearch("");
        (document.querySelector("[data-session-search]") as HTMLInputElement)?.focus();
      }
      // Cmd+N — new chat in active project
      if (meta && e.key === "n" && !e.shiftKey) {
        e.preventDefault();
        if (currentProjectCwd) handleNewChatInProject(currentProjectCwd);
      }
      // Escape — clear search, close panels, deselect session
      if (e.key === "Escape") {
        if (sessionSearch) { setSessionSearch(""); return; }
        if (browserPanelOpen) { setBrowserPanelOpen(false); return; }
        if (terminalPanelOpen) { setTerminalPanelOpen(false); return; }
        if (opsPanelOpen) { setOpsPanelOpen(false); return; }
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openProjects, sessionSearch, browserPanelOpen, terminalPanelOpen, opsPanelOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  // --------------- Data fetching ---------------

  const projectsQuery = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  const sessionsQuery = useQuery<ClaudeSession[]>({
    queryKey: ["claude-sessions"],
    queryFn: fetchClaudeSessions,
    refetchInterval: isTabVisible ? 10_000 : false,
  });

  const sessions = sessionsQuery.data ?? [];
  const activeSession = sessions.find((s) => s.id === activeId) ?? null;

  // Auto-open the active project from the API on first load when no projects are open
  useEffect(() => {
    if (openProjects.length === 0 && projectsQuery.data?.active) {
      setOpenProjects([projectsQuery.data.active]);
    }
  }, [projectsQuery.data?.active]); // eslint-disable-line react-hooks/exhaustive-deps

  // Filter helper for sessions — combines search, status, and time filters
  const matchesFilters = useCallback((s: ClaudeSession) => {
    if (softDeletedIds.has(s.id)) return false;
    if (sessionSearch && !s.prompt.toLowerCase().includes(sessionSearch.toLowerCase())) return false;
    if (statusFilter !== "all" && s.status !== statusFilter) return false;
    if (timeFilter !== "all") {
      const started = new Date(s.startedAt).getTime();
      const now = Date.now();
      const day = 86_400_000;
      if (timeFilter === "today" && now - started > day) return false;
      if (timeFilter === "week" && now - started > 7 * day) return false;
      if (timeFilter === "month" && now - started > 30 * day) return false;
    }
    return true;
  }, [softDeletedIds, sessionSearch, statusFilter, timeFilter]);

  // Group sessions by their cwd, falling back to first open project
  const sessionsByProject = useMemo(() => {
    const grouped: Record<string, ClaudeSession[]> = {};
    for (const project of openProjects) {
      grouped[project] = [];
    }
    for (const session of sessions) {
      const key = session.cwd || openProjects[0] || "";
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(session);
    }
    return grouped;
  }, [sessions, openProjects]);

  // --------------- Fallback: auto-start if SSE done handler missed it ---------------
  useEffect(() => {
    if (!buildingProjectDir || !activeSession) return;
    if (activeSession.status === "done") {
      // Direct SSE listener (in onProjectCreated) should have already triggered autoStartAndPreview.
      // This is a last-resort fallback in case that listener was missed or didn't connect.
      const timer = setTimeout(() => {
        if (buildingProjectDir) {
          const projectDir = buildingProjectDir;
          setBuildingProjectDir(null);
          autoStartAndPreview(projectDir);
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [activeSession?.status, buildingProjectDir]); // eslint-disable-line react-hooks/exhaustive-deps

  // File changes
  const fileChangesQuery = useQuery<FileChangesResponse>({
    queryKey: ["file-changes"],
    queryFn: fetchFileChanges,
    refetchInterval: 15_000,
    enabled: filesPanelOpen,
  });

  // Available LLM models (from configured providers)
  const llmModelsQuery = useQuery({ queryKey: ["llm-models"], queryFn: fetchLLMModels });
  const llmModels = llmModelsQuery.data || [];

  // Smart suggestions -- refetch when project changes or session completes
  const suggestionsProjectCwd = activeProjectPath || activeSession?.cwd || openProjects[0] || "";
  const suggestionsSessionId = activeSession?.id;
  const suggestionsQuery = useQuery({
    queryKey: ["suggestions", suggestionsProjectCwd, suggestionsSessionId],
    queryFn: (): Promise<Suggestion[]> => fetchSuggestions(suggestionsProjectCwd, suggestionsSessionId),
  });

  const suggestions = suggestionsQuery.data ?? [];

  // Follow-up suggestions -- only fetch when session is done
  const followUpQuery = useQuery<FollowUpSuggestion[]>({
    queryKey: ["followup-suggestions", activeId],
    queryFn: () => fetchFollowUpSuggestions(activeId!),
    enabled: !!activeId && activeSession?.status === "done",
  });

  const followUpSuggestions = followUpQuery.data ?? [];

  const uncommittedFiles = fileChangesQuery.data?.files ?? [];
  const fileChangesCwd = fileChangesQuery.data?.cwd ?? "";
  const sessionFiles = activeSession?.filesChanged ?? [];

  // SSE streaming for the active session
  // Connect immediately when activeId is set (even before sessions query refreshes)
  // to avoid missing early streaming output during project creation
  const sseSessionId = activeSession?.status === "running"
    ? activeSession.id
    : (!activeSession && activeId ? activeId : null);
  const sse = useSSE(sseSessionId);

  // When SSE completes, clear pending messages, refresh data, and auto-start dev server
  useEffect(() => {
    if (sse.done && (activeSession?.status === "running" || (!activeSession && activeId))) {
      setPendingMessages([]);
      queryClient.invalidateQueries({ queryKey: ["claude-sessions"] });
      queryClient.invalidateQueries({ queryKey: ["suggestions"] });
      queryClient.invalidateQueries({ queryKey: ["followup-suggestions"] });
      queryClient.invalidateQueries({ queryKey: ["git-status"] });
      if (filesPanelOpen) {
        queryClient.invalidateQueries({ queryKey: ["file-changes"] });
      }

      // Auto-start dev server + open BrowserPanel when a build completes
      if (buildingProjectDir) {
        const projectDir = buildingProjectDir;
        setBuildingProjectDir(null);
        autoStartAndPreview(projectDir);
      }
    }
  }, [sse.done]); // eslint-disable-line react-hooks/exhaustive-deps

  // --------------- Mutations ---------------

  const createMutation = useMutation<
    ClaudeSession,
    Error,
    { prompt: string; cwd?: string; imagePaths?: string[] }
  >({
    mutationFn: ({ prompt: p, cwd, imagePaths: imgs }) => createClaudeSession(p, cwd, imgs),
    onSuccess: (session) => {
      queryClient.invalidateQueries({ queryKey: ["claude-sessions"] });
      setActiveId(session.id);
      setPrompt("");
      setPendingMessages([]);
      setNewChatProjectCwd(null);
      setMobileSidebarOpen(false);
    },
  });

  const followUpMutation = useMutation<
    ClaudeSession,
    Error,
    { sessionId: string; prompt: string; imagePaths?: string[] }
  >({
    mutationFn: ({ sessionId, prompt: p, imagePaths: imgs }) => sendFollowUp(sessionId, p, imgs),
    onSuccess: (session) => {
      queryClient.invalidateQueries({ queryKey: ["claude-sessions"] });
      setPrompt("");
      // Reconnect SSE to stream the new response
      sse.reconnect();
    },
  });

  const stopMutation = useMutation<unknown, Error, string>({
    mutationFn: (id: string) => stopClaudeSession(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["claude-sessions"] });
    },
  });

  const deleteMutation = useMutation<unknown, Error, string>({
    mutationFn: (id: string) => deleteClaudeSessionFn(id),
    onSuccess: (_data, deletedId) => {
      if (activeId === deletedId) {
        setActiveId(null);
        setPendingMessages([]);
      }
      queryClient.invalidateQueries({ queryKey: ["claude-sessions"] });
    },
  });

  // --------------- Handlers ---------------

  const isSessionRunning = activeSession?.status === "running";
  const isSessionDone = activeSession?.status === "done";
  const isSessionError = activeSession?.status === "error";
  const canFollowUp = activeSession && (isSessionDone || isSessionError);
  const isInputDisabled =
    createMutation.isPending || followUpMutation.isPending || isSessionRunning;

  /** The project the user is currently focused on */
  const currentProjectCwd = activeProjectPath || activeSession?.cwd || openProjects[0] || projectsQuery.data?.active || "";

  /** Resolve which project cwd to use for new sessions */
  const getActiveProjectCwd = useCallback((): string => {
    if (newChatProjectCwd) return newChatProjectCwd;
    return currentProjectCwd;
  }, [newChatProjectCwd, currentProjectCwd]);

  const handleSend = useCallback(async () => {
    const text = prompt.trim();
    const hasImages = attachedImages.length > 0;
    if ((!text && !hasImages) || isInputDisabled) return;

    // Upload images to server temp dir if any
    let imagePaths: string[] = [];
    if (hasImages) {
      try {
        const imageData = await Promise.all(
          attachedImages.map(async (img) => {
            const buf = await img.file.arrayBuffer();
            // Chunked base64 — btoa(String.fromCharCode(...arr)) crashes on large files
            const bytes = new Uint8Array(buf);
            let binary = "";
            for (let i = 0; i < bytes.length; i += 8192) {
              binary += String.fromCharCode(...bytes.slice(i, i + 8192));
            }
            return { name: img.file.name, data: btoa(binary) };
          }),
        );
        const res = await fetch("/api/images/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ images: imageData }),
        });
        const data = (await res.json()) as { paths?: string[] };
        imagePaths = data.paths || [];
      } catch {
        // Images failed to upload — send without them
      }
      // Clean up previews
      for (const img of attachedImages) URL.revokeObjectURL(img.preview);
      setAttachedImages([]);
    }

    const sendText = text || (hasImages ? "Describe and analyze the attached image(s)" : "");

    if (canFollowUp && activeSession) {
      // Follow-up in existing session
      setPendingMessages((prev) => [
        ...prev,
        { role: "user", content: sendText },
      ]);
      followUpMutation.mutate({ sessionId: activeSession.id, prompt: sendText, imagePaths });
    } else if (!activeSession) {
      // New session -- use the resolved project cwd
      const cwd = getActiveProjectCwd();
      createMutation.mutate({ prompt: sendText, cwd: cwd || undefined, imagePaths });
    }

    setPrompt("");
  }, [
    prompt,
    attachedImages,
    isInputDisabled,
    canFollowUp,
    activeSession,
    followUpMutation,
    createMutation,
    getActiveProjectCwd,
  ]);

  const handleTemplate = useCallback(
    (templatePrompt: string, placeholder?: boolean) => {
      if (placeholder) {
        setPrompt(templatePrompt);
        return;
      }
      if (templatePrompt) {
        const cwd = getActiveProjectCwd();
        createMutation.mutate({ prompt: templatePrompt, cwd: cwd || undefined });
      }
    },
    [createMutation, getActiveProjectCwd]
  );

  const handleSuggestion = useCallback(
    (suggestion: Suggestion) => {
      // If the prompt contains a placeholder-like pattern, fill the input
      const hasPlaceholder = /\.\.\.$|Describe|specify/i.test(suggestion.prompt);
      if (hasPlaceholder) {
        setPrompt(suggestion.prompt);
      } else {
        // Complete prompt -- send immediately
        if (canFollowUp && activeSession) {
          setPendingMessages((prev) => [
            ...prev,
            { role: "user", content: suggestion.prompt },
          ]);
          followUpMutation.mutate({ sessionId: activeSession.id, prompt: suggestion.prompt });
        } else if (!activeSession) {
          const cwd = getActiveProjectCwd();
          createMutation.mutate({ prompt: suggestion.prompt, cwd: cwd || undefined });
        }
      }
    },
    [canFollowUp, activeSession, followUpMutation, createMutation, getActiveProjectCwd]
  );

  const handleFollowUpSuggestion = useCallback(
    (suggestion: FollowUpSuggestion) => {
      if (!activeSession) return;
      setPendingMessages((prev) => [
        ...prev,
        { role: "user", content: suggestion.prompt },
      ]);
      followUpMutation.mutate({ sessionId: activeSession.id, prompt: suggestion.prompt });
    },
    [activeSession, followUpMutation]
  );

  /** Continue generating — sends "Continue" as a follow-up */
  const handleContinue = useCallback(() => {
    if (!activeSession) return;
    setPendingMessages((prev) => [...prev, { role: "user", content: "Continue" }]);
    followUpMutation.mutate({ sessionId: activeSession.id, prompt: "Continue where you left off. If you were in the middle of something, complete it. If you're done, verify your work and fix any remaining issues." });
  }, [activeSession, followUpMutation]);

  /** Regenerate — resend the last user message */
  const handleRegenerate = useCallback(() => {
    if (!activeSession) return;
    // Find the last user message
    const userMessages = activeSession.messages.filter((m) => m.role === "user");
    const lastUserMsg = userMessages[userMessages.length - 1];
    if (!lastUserMsg) return;
    setPendingMessages((prev) => [...prev, { role: "user", content: lastUserMsg.content }]);
    followUpMutation.mutate({ sessionId: activeSession.id, prompt: lastUserMsg.content });
  }, [activeSession, followUpMutation]);

  const handleNewChat = useCallback(() => {
    setActiveId(null);
    setPrompt("");
    setPendingMessages([]);
    setNewChatProjectCwd(null);
    setMobileSidebarOpen(false);
  }, []);

  /** Start a new chat pinned to a specific project */
  const handleNewChatInProject = useCallback(
    (projectPath: string) => {
      setActiveId(null);
      setPrompt("");
      setPendingMessages([]);
      setNewChatProjectCwd(projectPath);
      setMobileSidebarOpen(false);
      // Focus the input after state update
      setTimeout(() => {
        const textarea = document.querySelector<HTMLTextAreaElement>('textarea[placeholder]');
        textarea?.focus();
      }, 100);
    },
    []
  );

  /** Start dev server for a project and open browser + terminal panels */
  const autoStartAndPreview = useCallback(async (projectPath: string) => {
    // Open browser with "building" state — shows loading animation, not blank page
    setBuildingProjectDir(projectPath);
    setBrowserPanelOpen(true);
    setTerminalPanelOpen(true);

    try {
      // Check if already running
      const status = await fetchDevServerStatus(projectPath);
      if (status.running && status.port) {
        setBrowserInitialUrl(`http://localhost:${status.port}`);
        setBuildingProjectDir(null);
        return;
      }
      // Start dev server
      const result = await startDevServer(projectPath);
      if (result.ok) {
        // If already running, set URL immediately
        if (result.status === "running" && result.port) {
          setBrowserInitialUrl(`http://localhost:${result.port}`);
          setBuildingProjectDir(null);
          return;
        }
        // Poll until running — keep building animation visible
        const poll = setInterval(async () => {
          try {
            const s = await fetchDevServerStatus(projectPath);
            if (s.running && s.port) {
              clearInterval(poll);
              setBrowserInitialUrl(`http://localhost:${s.port}`);
              setBuildingProjectDir(null);
            }
          } catch {}
        }, 3000);
        setTimeout(() => { clearInterval(poll); setBuildingProjectDir(null); }, 300000);
      } else {
        setBuildingProjectDir(null);
      }
    } catch {
      setBuildingProjectDir(null);
    }
  }, []);

  /** Open a project folder and add it to the sidebar */
  const handleOpenProject = useCallback(
    (path: string) => {
      addProject(path);
      setOpenProjects((prev) =>
        prev.includes(path) ? prev : [...prev, path]
      );
      setActiveProjectPath(path);
      setFolderBrowserOpen(false);
      // Auto-start dev server and open browser preview
      autoStartAndPreview(path);
    },
    [autoStartAndPreview]
  );

  /** Toggle collapse state for a project group */
  const toggleProjectCollapse = useCallback((path: string) => {
    setCollapsedProjects((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  }, []);

  // Cmd+N keyboard shortcut for new chat
  useEffect(() => {
    function handleGlobalKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "n") {
        e.preventDefault();
        handleNewChat();
      }
    }
    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => document.removeEventListener("keydown", handleGlobalKeyDown);
  }, [handleNewChat]);

  // Compute input placeholder and status hint
  let inputPlaceholder = "Ask Claude anything...";
  let inputStatusHint: string | undefined;
  let inputDisabledMessage: string | undefined;

  if (isSessionRunning) {
    inputDisabledMessage = "Claude is working...";
    inputStatusHint = "Session running -- waiting for response";
  } else if (createMutation.isPending) {
    inputDisabledMessage = "Starting session...";
  } else if (followUpMutation.isPending) {
    inputDisabledMessage = "Sending follow-up...";
  } else if (canFollowUp) {
    inputPlaceholder = "Continue the conversation...";
    inputStatusHint = `${MOD}Enter to send follow-up`;
  }

  // --------------- Render ---------------

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* -------- Sidebar -------- */}
      <aside
        role="complementary"
        aria-label="Sidebar"
        className={cn(
          "flex w-60 flex-shrink-0 flex-col border-r border-border bg-card/50",
          "transition-transform duration-200 ease-in-out",
          "max-md:fixed max-md:inset-y-0 max-md:left-0 max-md:z-50 max-md:w-64 max-md:shadow-xl",
          mobileSidebarOpen ? "max-md:translate-x-0" : "max-md:-translate-x-full"
        )}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between border-b border-border px-3 py-2.5">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold">Sidekick</span>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={onOpenSettings}
              title="Settings"
              aria-label="Settings"
            >
              <Settings2 className="h-3.5 w-3.5" />
            </Button>
            {/* Theme toggle */}
            <ThemeToggle />
          </div>
        </div>

        {/* Open / Create Project buttons */}
        <div className="border-b border-border px-2 py-2 space-y-1.5">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start gap-2"
            onClick={() => setFolderBrowserOpen(true)}
          >
            <FolderPlus className="h-4 w-4" />
            Open Project
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start gap-2"
            onClick={() => setProjectCreatorOpen(true)}
          >
            <Sparkles className="h-4 w-4" />
            Create Project
          </Button>
        </div>

        {/* Session search + filters */}
        <div className="border-b border-border">
          <SessionSearch
            search={sessionSearch}
            onSearchChange={setSessionSearch}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            timeFilter={timeFilter}
            onTimeFilterChange={setTimeFilter}
            filteredCount={openProjects.reduce((sum, p) => sum + (sessionsByProject[p] || []).filter(s => matchesFilters(s)).length, 0)}
            totalCount={sessions.length}
          />
        </div>

        {/* Project groups */}
        <div className="flex-1 overflow-y-auto px-2 py-2 space-y-3">
          {openProjects.length === 0 && (
            <div className="flex flex-col items-center gap-2 px-3 py-8 text-center">
              <FolderOpen className="h-8 w-8 text-muted-foreground" />
              <p className="text-xs font-medium text-muted-foreground">No projects open</p>
              <p className="text-[10px] text-muted-foreground/70">
                Click &quot;Open Project&quot; to get started
              </p>
            </div>
          )}
          {openProjects.map((projectPath) => (
            <ProjectGroup
              key={projectPath}
              projectPath={projectPath}
              sessions={(sessionsByProject[projectPath] || []).filter(matchesFilters)}
              activeSessionId={activeId}
              isCollapsed={collapsedProjects.has(projectPath)}
              onToggle={() => {
                toggleProjectCollapse(projectPath);
                setActiveProjectPath(projectPath);
                // Always start dev server and show preview when clicking a project
                autoStartAndPreview(projectPath);
              }}
              onNewChat={(path) => { setActiveProjectPath(path); handleNewChatInProject(path); }}
              onSelectSession={(id) => {
                setActiveId(id);
                setPendingMessages([]);
                setMobileSidebarOpen(false);
                setActiveView("chat");
                setActiveProjectPath(projectPath);
              }}
              onDeleteSession={(id) => setDeleteConfirmId(id)}
              isLoading={sessionsQuery.isLoading}
              onClose={() => {
                setOpenProjects((prev) => {
                  const next = prev.filter((p) => p !== projectPath);
                  // Reset state when removing a project
                  if (activeProjectPath === projectPath) {
                    setActiveProjectPath(next[0] || null);
                  }
                  if (activeSession?.cwd === projectPath) {
                    setActiveId(null);
                    setPendingMessages([]);
                  }
                  return next;
                });
              }}
              onStartDevServer={async (path) => {
                try {
                  const result = await startDevServer(path);
                  if (result.ok && result.port) {
                    setBrowserInitialUrl(`http://localhost:${result.port}`);
                    setBrowserPanelOpen(true);
                  }
                } catch {}
              }}
              onOpenTerminal={(path) => {
                setActiveProjectPath(path);
                setTerminalPanelOpen(true);
              }}
              onOpenBrowser={(path) => {
                setActiveProjectPath(path);
                setBrowserPanelOpen(true);
              }}
              onConfigureEnv={(path) => setEnvDrawerProject(path)}
            />
          ))}
        </div>

        {/* Undo delete bar */}
        {undoAction && (
          <div className="border-t border-border px-2 py-2">
            <div className="flex items-center justify-between rounded-md border border-yellow-600/30 bg-yellow-50 dark:bg-yellow-950/20 px-3 py-1.5 text-xs">
              <span className="text-yellow-800 dark:text-yellow-200">Session deleted</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 text-[10px] text-yellow-700 dark:text-yellow-300"
                onClick={() => {
                  clearTimeout(undoAction.timer);
                  setSoftDeletedIds(prev => { const next = new Set(prev); next.delete(undoAction.id); return next; });
                  setUndoAction(null);
                }}
              >
                Undo
              </Button>
            </div>
          </div>
        )}

        {/* Tool dock — bottom of sidebar */}
        <div className="border-t border-border px-2 py-2">
          <Button
            variant={activeView === "integrations" ? "secondary" : "ghost"}
            size="sm"
            className="w-full justify-start gap-2 h-8"
            onClick={() => {
              setActiveView(activeView === "integrations" ? "chat" : "integrations");
              setActiveId(null);
            }}
          >
            <Plug className="h-3.5 w-3.5" />
            Integrations
          </Button>
        </div>

        {/* FolderBrowser dialog */}
        <FolderBrowser
          open={folderBrowserOpen}
          onClose={() => setFolderBrowserOpen(false)}
          onSelect={handleOpenProject}
        />

      </aside>

      {/* -------- Main chat area -------- */}
      <main role="main" className="relative flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-border bg-background px-4 py-2.5 sm:px-6">
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <Button
              variant="ghost"
              size="icon-sm"
              className="md:hidden"
              aria-label={mobileSidebarOpen ? "Close sidebar" : "Open sidebar"}
              onClick={() => setMobileSidebarOpen((o) => !o)}
            >
              {mobileSidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>

            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold">Claude Code</span>
              <div className="h-1.5 w-1.5 rounded-full bg-green-500" title="Server connected" />
            </div>

            {/* Breadcrumb: project > session */}
            {activeSession && (
              <div className="flex items-center gap-1.5">
                {activeSession.cwd && (
                  <>
                    <span className="text-[10px] text-muted-foreground truncate max-w-[100px]">{activeSession.cwd.split("/").pop()}</span>
                    <span className="text-[10px] text-muted-foreground">/</span>
                  </>
                )}
                <Badge
                  variant="outline"
                  className={cn("text-[10px]", STATUS_CONFIG[activeSession.status].color)}
                  aria-live="polite"
                >
                  {STATUS_CONFIG[activeSession.status].icon}
                  <span className="ml-1">{STATUS_CONFIG[activeSession.status].label}</span>
                </Badge>
                {activeSession.status === "running" && <StreamingTimer startedAt={activeSession.startedAt} />}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Terminal toggle (bottom panel) */}
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setTerminalPanelOpen((o) => !o)}
              title={terminalPanelOpen ? "Hide terminal" : "Show terminal"}
              aria-label={terminalPanelOpen ? "Hide terminal" : "Show terminal"}
              className={cn(
                terminalPanelOpen && "bg-accent text-accent-foreground"
              )}
            >
              <TerminalSquare className="h-4 w-4" />
            </Button>

            {/* Browser preview toggle (right panel) */}
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setBrowserPanelOpen((o) => !o)}
              title={browserPanelOpen ? "Hide browser" : "Preview app"}
              aria-label={browserPanelOpen ? "Hide browser" : "Preview app"}
              className={cn(
                browserPanelOpen && "bg-accent text-accent-foreground"
              )}
            >
              <Globe className="h-4 w-4" />
            </Button>

            {/* Ops panel toggle (side panel) */}
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setOpsPanelOpen((o) => !o)}
              title={opsPanelOpen ? "Hide ops panel" : "Show ops panel"}
              aria-label={opsPanelOpen ? "Hide ops panel" : "Show ops panel"}
              className={cn(
                opsPanelOpen && "bg-accent text-accent-foreground"
              )}
            >
              <Terminal className="h-4 w-4" />
            </Button>

            {/* Files panel toggle */}
            {activeSession && (
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setFilesPanelOpen((o) => !o)}
                title={filesPanelOpen ? "Hide file changes" : "Show file changes"}
                aria-label={filesPanelOpen ? "Hide file changes" : "Show file changes"}
                className={cn(
                  filesPanelOpen && "bg-accent text-accent-foreground"
                )}
              >
                <FileText className="h-4 w-4" />
              </Button>
            )}

            {isSessionRunning && (
              <Button
                variant="outline"
                size="xs"
                onClick={() => activeSession && stopMutation.mutate(activeSession.id)}
                disabled={stopMutation.isPending}
                className="text-destructive border-destructive/30 hover:bg-destructive/10"
                aria-label="Stop session"
              >
                {stopMutation.isPending ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <Square className="h-3 w-3" />
                )}
                <span className="ml-1">Stop</span>
              </Button>
            )}
          </div>
        </header>

        {/* Chat + Files panel row */}
        <div className="flex flex-1 overflow-hidden">
          {/* Main body — chat or integrations */}
          <div className="flex flex-1 flex-col overflow-hidden">
            {activeView === "integrations" ? (
              <div className="flex-1 overflow-y-auto p-6 max-w-2xl mx-auto w-full">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Plug className="h-5 w-5" /> Integrations
                </h2>
                <Integrations />
              </div>
            ) : activeSession ? (
              <ChatArea
                session={activeSession}
                streamContent={sse.content}
                isStreaming={activeSession.status === "running" && !sse.done}
                pendingMessages={pendingMessages}
                followUpSuggestions={followUpSuggestions}
                onFollowUp={handleFollowUpSuggestion}
                onContinue={handleContinue}
                onRegenerate={handleRegenerate}
                tools={sse.tools}
                agents={sse.agents}
              />
            ) : (
              <>
                {/* Project Intelligence panel */}
                {currentProjectCwd && (
                  <ProjectIntelPanel
                    cwd={currentProjectCwd}
                    onSessionCreated={(sessionId) => {
                      setActiveId(sessionId);
                      queryClient.invalidateQueries({ queryKey: ["claude-sessions"] });
                    }}
                  />
                )}
                <WelcomeScreen
                  onTemplate={handleTemplate}
                  suggestions={suggestions}
                  suggestionsLoading={suggestionsQuery.isLoading}
                  onSuggestion={handleSuggestion}
                />
              </>
            )}

            {/* Error from create */}
            {createMutation.isError && (
              <ErrorBanner
                message={
                  createMutation.error.message.includes("spawn")
                    ? "Failed to start Claude session. Is Claude CLI installed?"
                    : createMutation.error.message
                }
                onRetry={() => createMutation.reset()}
                onDismiss={() => createMutation.reset()}
              />
            )}

            {/* SSE connection error */}
            {sse.streamError && (
              <div className="mx-auto max-w-3xl px-6 py-2">
                <div className="flex items-center gap-2 rounded-lg border border-yellow-600/30 bg-yellow-50 dark:bg-yellow-950/20 px-3 py-2 text-xs text-yellow-800 dark:text-yellow-200">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  <span>{sse.streamError}</span>
                  <Button variant="ghost" size="sm" className="ml-auto h-6 text-[10px]" onClick={() => {
                    queryClient.invalidateQueries({ queryKey: ["claude-sessions"] });
                    sse.reconnect();
                  }}>
                    Retry
                  </Button>
                </div>
              </div>
            )}

            {/* Error from follow-up — with reconnect option */}
            {followUpMutation.isError && (
              <div className="mx-auto max-w-3xl px-6 py-2 animate-fade-in-up">
                <div className="flex flex-col gap-2 rounded-lg bg-destructive/10 px-4 py-3">
                  <div className="flex items-center gap-2 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span className="flex-1">{followUpMutation.error.message}</span>
                    <button
                      type="button"
                      onClick={() => followUpMutation.reset()}
                      className="rounded p-0.5 text-destructive/60 hover:text-destructive"
                      aria-label="Dismiss error"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        followUpMutation.reset();
                        handleRegenerate();
                      }}
                      className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      <RotateCcw className="h-3 w-3" />
                      Retry
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        followUpMutation.reset();
                        // Start a fresh session in the same project
                        if (activeSession?.cwd) {
                          const cwd = activeSession.cwd;
                          const lastUserMsg = activeSession.messages.filter(m => m.role === "user").pop();
                          setActiveId(null);
                          setPendingMessages([]);
                          if (lastUserMsg) {
                            createMutation.mutate({ prompt: lastUserMsg.content, cwd });
                          }
                        }
                      }}
                      className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    >
                      <RefreshCw className="h-3 w-3" />
                      Reconnect (new session)
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Creating session indicator */}
            {createMutation.isPending && (
              <div className="mx-auto flex max-w-3xl items-center justify-center gap-2 px-6 py-2 animate-fade-in-up">
                <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Creating session...</span>
              </div>
            )}

            {/* Input bar */}
            <PromptInput
              value={prompt}
              onChange={setPrompt}
              onSend={handleSend}
              disabled={!!isInputDisabled}
              placeholder={inputPlaceholder}
              disabledMessage={inputDisabledMessage}
              showTemplates={false}
              onTemplate={handleTemplate}
              statusHint={inputStatusHint}
              suggestions={suggestions}
              suggestionsLoading={suggestionsQuery.isLoading}
              onSuggestion={handleSuggestion}
              selectedModel={selectedModel}
              onModelChange={setSelectedModel}
              availableModels={llmModels}
              images={attachedImages}
              onImagesChange={setAttachedImages}
            />

            {/* Bottom panel — Dev Server Logs or Terminal */}
            {terminalPanelOpen && (
              <div className="h-[280px] shrink-0 border-t border-border">
                {buildingProjectDir || browserPanelOpen ? (
                  <DevServerLogs
                    cwd={currentProjectCwd}
                    open={terminalPanelOpen}
                    onClose={() => setTerminalPanelOpen(false)}
                  />
                ) : (
                  <TerminalPanel
                    cwd={currentProjectCwd}
                    open={terminalPanelOpen}
                    onClose={() => setTerminalPanelOpen(false)}
                  />
                )}
              </div>
            )}
          </div>

          {/* File changes panel */}
          {activeSession && filesPanelOpen && (
            <FileChangesPanel
              sessionFiles={sessionFiles}
              uncommittedFiles={uncommittedFiles}
              cwd={fileChangesCwd}
              isOpen={filesPanelOpen}
              onToggle={() => setFilesPanelOpen(false)}
            />
          )}

          {/* Ops Panel (side) */}
          {opsPanelOpen && (
            <div className="w-[420px] shrink-0">
              <OpsPanel
                cwd={currentProjectCwd}
                open={opsPanelOpen}
                onClose={() => setOpsPanelOpen(false)}
              />
            </div>
          )}

          {/* Browser Panel (right side, resizable, per-project) */}
          {browserPanelOpen && (
            <BrowserPanel
              open={browserPanelOpen}
              onClose={() => { setBrowserPanelOpen(false); setBrowserInitialUrl(null); setBuildingProjectDir(null); }}
              cwd={currentProjectCwd}
              initialUrl={browserInitialUrl}
              building={!!buildingProjectDir}
            />
          )}
        </div>
      </main>

      {/* Project Creator Modal */}
      <ProjectCreator
        open={projectCreatorOpen}
        onClose={() => setProjectCreatorOpen(false)}
        onProjectCreated={(projectDir, sessionId) => {
          setOpenProjects((prev) => [...new Set([...prev, projectDir])]);
          setActiveProjectPath(projectDir);
          setActiveView("chat");

          if (sessionId) {
            // From-scratch or template with customization: show building animation
            setBuildingProjectDir(projectDir);
            setBrowserPanelOpen(true);
            setActiveId(sessionId);
            // Aggressively refresh sessions so the new session appears in the chat
            queryClient.invalidateQueries({ queryKey: ["claude-sessions"] });
            setTimeout(() => queryClient.invalidateQueries({ queryKey: ["claude-sessions"] }), 500);
            setTimeout(() => queryClient.invalidateQueries({ queryKey: ["claude-sessions"] }), 1500);
            setTimeout(() => queryClient.invalidateQueries({ queryKey: ["claude-sessions"] }), 3000);

            // Direct SSE listener — bypasses React hook lifecycle race condition.
            // useSSE can reset done=false when sseSessionId changes to null (session
            // query loads with status "done" → sseSessionId becomes null → useSSE resets).
            // This standalone listener is immune to that race.
            const directSSE = new EventSource(`/api/claude/stream/${sessionId}`);
            directSSE.onmessage = (event) => {
              try {
                const data = JSON.parse(event.data);
                if (data.type === "done") {
                  directSSE.close();
                  autoStartAndPreview(projectDir);
                }
              } catch { /* ignore */ }
            };
            directSSE.onerror = () => {
              directSSE.close();
              // Session ended unexpectedly — still try to start dev server
              autoStartAndPreview(projectDir);
            };
            // Safety: clean up after 10 minutes (session should never take this long)
            setTimeout(() => directSSE.close(), 600000);
          } else {
            // Template-based (no Claude session): install deps + start dev server immediately
            setBrowserPanelOpen(true);
            (async () => {
              try {
                const { type } = await fetchProjectType(projectDir);
                if (type === "cli") {
                  setTerminalPanelOpen(true);
                  setBrowserPanelOpen(false);
                } else {
                  const runtime = preferredRuntime !== "native" ? preferredRuntime : undefined;
                  await startDevServer(projectDir, runtime);
                  if (type === "backend") setTerminalPanelOpen(true);
                  // Poll until running
                  const poll = setInterval(async () => {
                    try {
                      const status = await fetchDevServerStatus(projectDir);
                      if (status.running && status.port) {
                        clearInterval(poll);
                        setBrowserInitialUrl(`http://localhost:${status.port}`);
                      }
                    } catch { /* keep polling */ }
                  }, 3000);
                  // Stop after 5 min
                  setTimeout(() => clearInterval(poll), 300000);
                }
              } catch {}
            })();
          }
        }}
        onRuntimeSelected={setPreferredRuntime}
      />

      {/* Project Environment Drawer */}
      {envDrawerProject && (
        <ProjectEnvDrawer
          open={!!envDrawerProject}
          onClose={() => setEnvDrawerProject(null)}
          projectPath={envDrawerProject}
        />
      )}

      {/* Delete confirmation dialog */}
      {deleteConfirmId && (
        <>
          <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm" onClick={() => setDeleteConfirmId(null)} />
          <div className="fixed z-[100] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xs">
            <div className="rounded-xl border border-border bg-background shadow-2xl p-5 space-y-4">
              <div className="space-y-1">
                <p className="text-sm font-semibold">Delete session?</p>
                <p className="text-xs text-muted-foreground">This conversation will be permanently removed.</p>
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" size="sm" onClick={() => setDeleteConfirmId(null)}>Cancel</Button>
                <Button variant="destructive" size="sm" onClick={() => {
                  const idToDelete = deleteConfirmId;
                  if (activeId === idToDelete) setActiveId(null);
                  setDeleteConfirmId(null);
                  // Soft delete: hide from UI, delete after 3s (allows undo)
                  setSoftDeletedIds(prev => new Set([...prev, idToDelete]));
                  const undoTimer = setTimeout(() => {
                    deleteMutation.mutate(idToDelete);
                    setSoftDeletedIds(prev => { const next = new Set(prev); next.delete(idToDelete); return next; });
                  }, 3000);
                  // Show undo toast (inline at bottom of sidebar)
                  setUndoAction({ id: idToDelete, timer: undoTimer });
                  setTimeout(() => setUndoAction(null), 3500);
                }}>Delete</Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
