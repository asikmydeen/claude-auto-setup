import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Terminal,
  Plus,
  ArrowUp,
  Loader2,
  Download,
  Stethoscope,
  RefreshCw,
  Eye,
  Square,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Zap,
  Bug,
  Code2,
  TestTube2,
  Wrench,
  MessageSquare,
  ChevronDown,
  ChevronRight,
  Play,
  Trash2,
  Menu,
  X,
  FileText,
  FilePlus2,
  FileMinus2,
  FileEdit,
  PanelRightClose,
  PanelRightOpen,
  BookOpen,
  FolderOpen,
  GitBranch,
  ArrowUpRight,
  ArrowDownLeft,
  Check,
  Hammer,
  FlaskConical,
  GitCommit,
  Sparkles,
  Info,
  Copy,
  ClipboardCheck,
  RotateCcw,
  FolderPlus,
  Sun,
  Moon,
  Settings2,
  Plug,
  Globe,
  TerminalSquare,
  MoreHorizontal,
  FolderSearch,
  Clipboard,
  Play as PlayIcon,
  ImageIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  fetchClaudeSessions,
  createClaudeSession,
  stopClaudeSession,
  deleteClaudeSessionFn,
  sendFollowUp,
  fetchFileChanges,
  runInstall,
  fetchProjects,
  addProject,
  setActiveProject,
  fetchGitStatus,
  fetchSuggestions,
  fetchFollowUpSuggestions,
  startDevServer,
  fetchDevServerStatus,
  fetchProjectType,
  fetchLLMModels,
  type LLMAvailableModel,
  deleteProject,
  revealProject,
  type ClaudeSession,
  type InstallResponse,
  type FileChangesResponse,
  type GitStatus,
  type Suggestion,
  type FollowUpSuggestion,
  type ProjectType,
} from "@/api/config";
import { cn, relativeTime } from "@/lib/utils";
import { api } from "@/api/client";
import { FolderBrowser } from "@/components/FolderBrowser";
import { Integrations } from "@/pages/Integrations";
import { ProjectIntelPanel } from "@/components/ProjectIntel";
import { ProjectCreator } from "@/components/ProjectCreator";
import { OpsPanel } from "@/components/OpsPanel";
import { BrowserPanel } from "@/components/BrowserPanel";
import { TerminalPanel } from "@/components/TerminalPanel";
import { DevServerLogs } from "@/components/DevServerLogs";
import { ProjectEnvDrawer } from "@/components/ProjectEnvDrawer";
import { useTheme } from "@/context/ThemeContext";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TemplatePrompt {
  label: string;
  icon: React.ReactNode;
  prompt: string;
  placeholder?: boolean;
}

/** A single message pair or standalone message in the conversation view */
interface ConversationEntry {
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
}

interface ToolActivity {
  id: string;
  tool: string;
  input: string;
  output?: string;
  status: "running" | "done";
}

interface AgentActivity {
  id: string;
  name: string;
  prompt: string;
  output?: string;
  status: "running" | "done";
}

// ---------------------------------------------------------------------------
// Platform detection
// ---------------------------------------------------------------------------

const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.userAgent);
const MOD = isMac ? "⌘" : "Ctrl+";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const TEMPLATES: TemplatePrompt[] = [
  {
    label: "Build a feature",
    icon: <Zap className="h-4 w-4" />,
    prompt: "Describe what you want to build...",
    placeholder: true,
  },
  {
    label: "Fix a bug",
    icon: <Bug className="h-4 w-4" />,
    prompt: "Describe the bug or paste the error...",
    placeholder: true,
  },
  {
    label: "Write tests",
    icon: <TestTube2 className="h-4 w-4" />,
    prompt: "Write tests for the recently changed code",
  },
  {
    label: "Review code",
    icon: <Code2 className="h-4 w-4" />,
    prompt: "Review my recent changes and suggest improvements",
  },
  {
    label: "Refactor",
    icon: <Wrench className="h-4 w-4" />,
    prompt: "Refactor the code for better maintainability",
    placeholder: true,
  },
  {
    label: "Explain code",
    icon: <BookOpen className="h-4 w-4" />,
    prompt: "Explain how this codebase works",
  },
];

const STATUS_CONFIG = {
  running: {
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    icon: <Loader2 className="h-3 w-3 animate-spin" />,
    label: "Running",
    dot: "bg-blue-500 animate-pulse",
  },
  done: {
    color: "border-green-500 text-green-600 dark:text-green-400",
    icon: <CheckCircle2 className="h-3 w-3" />,
    label: "Done",
    dot: "bg-green-500",
  },
  error: {
    color: "border-destructive text-destructive",
    icon: <XCircle className="h-3 w-3" />,
    label: "Error",
    dot: "bg-red-500",
  },
  stopped: {
    color: "border-yellow-500 text-yellow-600 dark:text-yellow-400",
    icon: <Square className="h-3 w-3" />,
    label: "Stopped",
    dot: "bg-yellow-500",
  },
} as const;

// ---------------------------------------------------------------------------
// Icon Mapping + Category Colors
// ---------------------------------------------------------------------------

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  eye: Eye,
  "git-commit": GitCommit,
  "test-tube": FlaskConical,
  "file-text": FileText,
  sparkles: Sparkles,
  info: Info,
  refresh: RefreshCw,
  bug: Bug,
  download: Download,
  play: Play,
  check: Check,
  hammer: Hammer,
  terminal: Terminal,
  "file-plus": FilePlus2,
  zap: Zap,
  code: Code2,
  wrench: Wrench,
  "test-tube-2": TestTube2,
  "book-open": BookOpen,
};

function SuggestionIcon({ name, className }: { name: string; className?: string }) {
  const Icon = iconMap[name] || MessageSquare;
  return <Icon className={className} />;
}

const categoryColors: Record<string, string> = {
  git: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 hover:bg-blue-500/20",
  review: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20 hover:bg-purple-500/20",
  test: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20 hover:bg-green-500/20",
  fix: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20 hover:bg-orange-500/20",
  code: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20 hover:bg-cyan-500/20",
  general: "bg-muted text-muted-foreground border-border hover:bg-accent",
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Classify a git status file entry for color coding */
function classifyFileChange(filepath: string): "added" | "modified" | "deleted" {
  // Git status prefixes like "A ", "M ", "D ", "?? "
  const trimmed = filepath.trim();
  if (trimmed.startsWith("A ") || trimmed.startsWith("?? ")) return "added";
  if (trimmed.startsWith("D ")) return "deleted";
  return "modified";
}

/** Strip git status prefix from file path */
function cleanFilePath(filepath: string): string {
  return filepath.replace(/^[AMDRC?!]{1,2}\s+/, "").trim();
}

/** Count user messages in a session (original prompt + follow-ups) */
function countMessages(session: ClaudeSession): number {
  return session.messages.filter((m) => m.role === "user").length || 1;
}

/** Truncate text at a word boundary */
function truncateAtWord(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  const truncated = text.slice(0, maxLen);
  const lastSpace = truncated.lastIndexOf(" ");
  return (lastSpace > maxLen * 0.5 ? truncated.slice(0, lastSpace) : truncated) + "...";
}

/** Render message content as Markdown with syntax highlighting */
function renderMessageContent(content: string): React.ReactNode {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      components={{
        // Code blocks
        code({ className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          const isBlock = String(children).includes("\n");
          if (isBlock) {
            return (
              <div className="group/code relative my-2 overflow-x-auto rounded-lg bg-[#1a1a2e] p-3">
                <div className="flex items-center justify-between mb-1">
                  {match && (
                    <span className="text-[10px] uppercase tracking-wider text-gray-500">
                      {match[1]}
                    </span>
                  )}
                  <CopyButton text={String(children).replace(/\n$/, "")} />
                </div>
                <pre className="whitespace-pre font-mono text-[12px] leading-relaxed text-gray-300">
                  <code>{children}</code>
                </pre>
              </div>
            );
          }
          return (
            <code className="rounded bg-[#1a1a2e] px-1.5 py-0.5 text-[12px] font-mono text-gray-300" {...props}>
              {children}
            </code>
          );
        },
        // Links
        a({ href, children }) {
          return (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline decoration-blue-400/40 hover:decoration-blue-400 transition-colors"
            >
              {children}
            </a>
          );
        },
        // Headings
        h1: ({ children }) => <h1 className="text-lg font-bold mt-4 mb-2">{children}</h1>,
        h2: ({ children }) => <h2 className="text-base font-bold mt-3 mb-2">{children}</h2>,
        h3: ({ children }) => <h3 className="text-sm font-bold mt-3 mb-1">{children}</h3>,
        h4: ({ children }) => <h4 className="text-sm font-semibold mt-2 mb-1">{children}</h4>,
        // Tables
        table: ({ children }) => (
          <div className="my-2 overflow-x-auto">
            <table className="min-w-full text-xs border-collapse">{children}</table>
          </div>
        ),
        thead: ({ children }) => <thead className="border-b border-gray-600">{children}</thead>,
        th: ({ children }) => <th className="px-3 py-1.5 text-left font-semibold text-gray-300">{children}</th>,
        td: ({ children }) => <td className="px-3 py-1.5 border-t border-gray-700/50 text-gray-400">{children}</td>,
        // Lists
        ul: ({ children }) => <ul className="list-disc pl-5 my-1 space-y-0.5">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal pl-5 my-1 space-y-0.5">{children}</ol>,
        li: ({ children }) => <li className="text-gray-300">{children}</li>,
        // Paragraphs
        p: ({ children }) => <p className="my-1.5">{children}</p>,
        // Bold/italic
        strong: ({ children }) => <strong className="font-bold text-gray-200">{children}</strong>,
        em: ({ children }) => <em className="italic text-gray-300">{children}</em>,
        // Blockquotes
        blockquote: ({ children }) => (
          <blockquote className="border-l-2 border-gray-600 pl-3 my-2 text-gray-400 italic">{children}</blockquote>
        ),
        // Horizontal rule
        hr: () => <hr className="my-3 border-gray-700" />,
      }}
    >
      {content}
    </Markdown>
  );
}

/** Copy-to-clipboard button that shows a check icon after copying */
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    },
    [text]
  );

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="rounded-md p-1 text-gray-500 opacity-0 transition-all hover:bg-white/10 hover:text-gray-300 group-hover/code:opacity-100"
      title="Copy to clipboard"
    >
      {copied ? (
        <ClipboardCheck className="h-3.5 w-3.5 text-green-400" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Quick Action (sidebar install actions)
// ---------------------------------------------------------------------------

interface QuickActionProps {
  label: string;
  icon: React.ReactNode;
  flags: string[];
}

function QuickAction({ label, icon, flags }: QuickActionProps) {
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

interface ProjectSelectorProps {
  onProjectChange?: () => void;
}

function ProjectSelector({ onProjectChange }: ProjectSelectorProps) {
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
// Git Status Bar
// ---------------------------------------------------------------------------

function GitStatusBar() {
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
// Suggestion Pills
// ---------------------------------------------------------------------------

interface SuggestionPillsProps {
  suggestions: Suggestion[];
  isLoading: boolean;
  onSelect: (suggestion: Suggestion) => void;
}

function SuggestionPills({ suggestions, isLoading, onSelect }: SuggestionPillsProps) {
  if (isLoading) {
    return (
      <div className="flex gap-2 overflow-x-auto pb-1">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-7 w-28 flex-shrink-0 rounded-full" />
        ))}
      </div>
    );
  }

  if (suggestions.length === 0) return null;

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-border">
      {suggestions.map((s) => {
        const colorClass = categoryColors[s.category] ?? categoryColors.general;
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => onSelect(s)}
            className={cn(
              "inline-flex flex-shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all hover:scale-105 active:scale-95",
              colorClass
            )}
          >
            <SuggestionIcon name={s.icon} className="h-3 w-3" />
            {s.label}
          </button>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Follow-up Suggestion Pills
// ---------------------------------------------------------------------------

interface FollowUpPillsProps {
  suggestions: FollowUpSuggestion[];
  onSelect: (suggestion: FollowUpSuggestion) => void;
}

function FollowUpPills({ suggestions, onSelect }: FollowUpPillsProps) {
  if (suggestions.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 px-4 py-2">
      {suggestions.map((s) => (
        <button
          key={s.id}
          type="button"
          onClick={() => onSelect(s)}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground transition-all hover:bg-accent hover:text-foreground hover:scale-105 active:scale-95"
        >
          <SuggestionIcon name={s.icon} className="h-3 w-3" />
          {s.label}
        </button>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Session List Item
// ---------------------------------------------------------------------------

interface SessionItemProps {
  session: ClaudeSession;
  isActive: boolean;
  onClick: () => void;
  onDelete: (id: string) => void;
}

function SessionItem({ session, isActive, onClick, onDelete }: SessionItemProps) {
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

interface ProjectGroupProps {
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

function ProjectGroup({
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

// ---------------------------------------------------------------------------
// Welcome / Template Screen
// ---------------------------------------------------------------------------

interface WelcomeScreenProps {
  onTemplate: (prompt: string, placeholder?: boolean) => void;
  suggestions: Suggestion[];
  suggestionsLoading: boolean;
  onSuggestion: (suggestion: Suggestion) => void;
}

function WelcomeScreen({ onTemplate, suggestions, suggestionsLoading, onSuggestion }: WelcomeScreenProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 pb-12">
      {/* Hero */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
          <Terminal className="h-7 w-7 text-primary" />
        </div>
        <h2 className="text-lg font-semibold tracking-tight">
          What would you like to do?
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Each session is a full Claude Code agent with multi-agent support.
        </p>
      </div>

      {/* Suggestion pills — compact, centered */}
      <div className="w-full max-w-md">
        {suggestions.length > 0 || suggestionsLoading ? (
          <SuggestionPills
            suggestions={suggestions}
            isLoading={suggestionsLoading}
            onSelect={onSuggestion}
          />
        ) : (
          <div className="flex flex-wrap justify-center gap-2">
            {TEMPLATES.map((t) => (
              <button
                key={t.label}
                type="button"
                onClick={() => onTemplate(t.prompt, t.placeholder)}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:bg-accent hover:text-foreground hover:scale-105 active:scale-95"
              >
                {t.icon}
                {t.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Keyboard hints */}
      <div className="mt-6 flex items-center gap-4 text-[10px] text-muted-foreground/50">
        <span><kbd className="rounded border border-border px-1 py-0.5 text-[9px]">{MOD}N</kbd> New chat</span>
        <span><kbd className="rounded border border-border px-1 py-0.5 text-[9px]">{MOD}K</kbd> Search</span>
        <span><kbd className="rounded border border-border px-1 py-0.5 text-[9px]">{MOD}Enter</kbd> Send</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// File Changes Panel
// ---------------------------------------------------------------------------

interface FileChangesPanelProps {
  sessionFiles: string[];
  uncommittedFiles: string[];
  cwd: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FileChangesPanel({
  sessionFiles,
  uncommittedFiles,
  cwd,
  isOpen,
  onToggle,
}: FileChangesPanelProps) {
  const [sessionExpanded, setSessionExpanded] = useState(true);
  const [uncommittedExpanded, setUncommittedExpanded] = useState(true);

  const hasSessionFiles = sessionFiles.length > 0;
  const hasUncommittedFiles = uncommittedFiles.length > 0;

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={onToggle}
        className="absolute right-2 top-2 z-10 rounded-lg border border-border bg-card p-1.5 shadow-sm hover:bg-accent transition-colors"
        title="Show file changes"
      >
        <PanelRightOpen className="h-4 w-4 text-muted-foreground" />
        {(hasSessionFiles || hasUncommittedFiles) && (
          <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary text-[8px] font-bold text-primary-foreground">
            {sessionFiles.length + uncommittedFiles.length}
          </span>
        )}
      </button>
    );
  }

  return (
    <div className="flex w-64 flex-shrink-0 flex-col border-l border-border bg-card/50">
      <div className="flex items-center justify-between border-b border-border px-3 py-2.5">
        <span className="text-xs font-semibold text-foreground">File Changes</span>
        <Button size="icon-xs" variant="ghost" onClick={onToggle} title="Close panel">
          <PanelRightClose className="h-3.5 w-3.5" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {!hasSessionFiles && !hasUncommittedFiles && (
          <p className="px-3 py-6 text-center text-xs text-muted-foreground">
            No file changes detected
          </p>
        )}

        {/* Session files */}
        {hasSessionFiles && (
          <div>
            <button
              type="button"
              onClick={() => setSessionExpanded(!sessionExpanded)}
              className="flex w-full items-center gap-1.5 px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              {sessionExpanded ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
              Session Changes
              <Badge variant="outline" className="ml-auto text-[9px] px-1 py-0">
                {sessionFiles.length}
              </Badge>
            </button>
            {sessionExpanded && (
              <div className="px-2 pb-2 space-y-0.5">
                {sessionFiles.map((file) => (
                  <FileChangeItem key={file} filepath={file} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Uncommitted files */}
        {hasUncommittedFiles && (
          <div>
            <button
              type="button"
              onClick={() => setUncommittedExpanded(!uncommittedExpanded)}
              className="flex w-full items-center gap-1.5 px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              {uncommittedExpanded ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
              Uncommitted
              <Badge variant="outline" className="ml-auto text-[9px] px-1 py-0">
                {uncommittedFiles.length}
              </Badge>
            </button>
            {uncommittedExpanded && (
              <div className="px-2 pb-2 space-y-0.5">
                {uncommittedFiles.map((file) => (
                  <FileChangeItem key={file} filepath={file} isGitStatus />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {cwd && (
        <div className="border-t border-border px-3 py-2">
          <p className="truncate text-[9px] text-muted-foreground" title={cwd}>
            {cwd}
          </p>
        </div>
      )}
    </div>
  );
}

function FileChangeItem({
  filepath,
  isGitStatus,
}: {
  filepath: string;
  isGitStatus?: boolean;
}) {
  const changeType = isGitStatus ? classifyFileChange(filepath) : "modified";
  const displayPath = isGitStatus ? cleanFilePath(filepath) : filepath;
  const filename = displayPath.split("/").pop() || displayPath;
  const dir = displayPath.includes("/")
    ? displayPath.slice(0, displayPath.lastIndexOf("/"))
    : "";

  const iconMap = {
    added: <FilePlus2 className="h-3 w-3 text-green-500" />,
    modified: <FileEdit className="h-3 w-3 text-yellow-500" />,
    deleted: <FileMinus2 className="h-3 w-3 text-red-500" />,
  };

  const colorMap = {
    added: "text-green-600 dark:text-green-400",
    modified: "text-yellow-600 dark:text-yellow-400",
    deleted: "text-red-600 dark:text-red-400",
  };

  return (
    <div
      className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs hover:bg-accent/50 transition-colors cursor-default"
      title={displayPath}
    >
      {iconMap[changeType]}
      <span className={cn("truncate", colorMap[changeType])}>
        {filename}
      </span>
      {dir && (
        <span className="ml-auto truncate text-[9px] text-muted-foreground max-w-[80px]">
          {dir}
        </span>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Activity Timeline (tool use + sub-agent tracking)
// ---------------------------------------------------------------------------

const AGENT_COLORS: Record<string, string> = {
  explorer: "border-blue-500/30 bg-blue-500/5",
  "code-reviewer": "border-purple-500/30 bg-purple-500/5",
  "test-writer": "border-green-500/30 bg-green-500/5",
  "security-auditor": "border-red-500/30 bg-red-500/5",
  debugger: "border-orange-500/30 bg-orange-500/5",
};

const AGENT_NAME_COLORS: Record<string, string> = {
  explorer: "text-blue-400",
  "code-reviewer": "text-purple-400",
  "test-writer": "text-green-400",
  "security-auditor": "text-red-400",
  debugger: "text-orange-400",
};

function ToolsAccordion({ tools }: { tools: ToolActivity[] }) {
  const [open, setOpen] = useState(false);
  const [expandedResults, setExpandedResults] = useState<Set<string>>(new Set());

  const uniqueTools = useMemo(
    () => [...new Set(tools.map((t) => t.tool))],
    [tools]
  );

  const runningCount = tools.filter((t) => t.status === "running").length;
  const summary = `${tools.length} tool${tools.length !== 1 ? "s" : ""} used`;
  const toolNames = uniqueTools.join(", ");

  const toggleResult = useCallback((id: string) => {
    setExpandedResults((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  return (
    <div className="rounded-lg border border-border/60 bg-card/30 animate-fade-in-up">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-2 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        {open ? (
          <ChevronDown className="h-3 w-3 flex-shrink-0" />
        ) : (
          <ChevronRight className="h-3 w-3 flex-shrink-0" />
        )}
        <Wrench className="h-3 w-3 flex-shrink-0 text-muted-foreground/70" />
        <span className="font-medium">{summary}</span>
        <span className="text-[10px] text-muted-foreground/60 truncate">
          ({toolNames})
        </span>
        {runningCount > 0 && (
          <Loader2 className="ml-auto h-3 w-3 animate-spin text-blue-400 flex-shrink-0" />
        )}
      </button>

      {open && (
        <div className="border-t border-border/40 px-2 py-1 space-y-0">
          {tools.map((t) => (
            <div key={t.id} className="animate-fade-in-up">
              <div className="flex items-center gap-2 px-2 py-0.5 text-[11px] leading-6">
                {t.status === "done" ? (
                  <CheckCircle2 className="h-3 w-3 flex-shrink-0 text-green-500" />
                ) : (
                  <Loader2 className="h-3 w-3 flex-shrink-0 animate-spin text-blue-400" />
                )}
                <span className="font-mono font-medium text-muted-foreground w-12 flex-shrink-0 truncate">
                  {t.tool}
                </span>
                <span className="text-muted-foreground/60 truncate flex-1">
                  {t.input.length > 60 ? t.input.slice(0, 60) + "..." : t.input}
                </span>
                {t.output && (
                  <button
                    type="button"
                    onClick={() => toggleResult(t.id)}
                    className="flex-shrink-0 rounded px-1 py-0.5 text-[10px] text-muted-foreground/50 hover:text-muted-foreground hover:bg-accent/50 transition-colors"
                  >
                    {expandedResults.has(t.id) ? "Hide" : "Result"}
                  </button>
                )}
              </div>
              {expandedResults.has(t.id) && t.output && (
                <pre className="mx-2 mb-1 max-h-24 overflow-auto rounded bg-[#0d1117] px-2 py-1.5 text-[10px] leading-relaxed text-gray-400 font-mono">
                  {t.output.length > 500 ? t.output.slice(0, 500) + "..." : t.output}
                </pre>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AgentAccordion({ agent }: { agent: AgentActivity }) {
  const [open, setOpen] = useState(false);

  const borderColor = AGENT_COLORS[agent.name] ?? "border-border/60 bg-card/30";
  const nameColor = AGENT_NAME_COLORS[agent.name] ?? "text-muted-foreground";
  const truncatedPrompt =
    agent.prompt.length > 80 ? agent.prompt.slice(0, 80) + "..." : agent.prompt;

  return (
    <div className={cn("rounded-lg border ml-2 animate-fade-in-up", borderColor)}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-2 px-3 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        {open ? (
          <ChevronDown className="h-3 w-3 flex-shrink-0" />
        ) : (
          <ChevronRight className="h-3 w-3 flex-shrink-0" />
        )}
        <span className={cn("font-semibold flex-shrink-0", nameColor)}>
          {agent.name}
        </span>
        <span className="text-[10px] text-muted-foreground/50 truncate flex-1 text-left">
          &mdash; &ldquo;{truncatedPrompt}&rdquo;
        </span>
        {agent.status === "running" ? (
          <span className="inline-flex items-center gap-1 flex-shrink-0">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-[10px] text-blue-400">running</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 flex-shrink-0">
            <CheckCircle2 className="h-3 w-3 text-green-500" />
            <span className="text-[10px] text-green-500">done</span>
          </span>
        )}
      </button>

      {open && agent.output && (
        <div className="border-t border-border/30 px-3 py-2">
          <pre className="max-h-40 overflow-auto rounded bg-[#0d1117] px-3 py-2 text-[11px] leading-relaxed text-gray-400 font-mono whitespace-pre-wrap">
            {agent.output.length > 500 ? agent.output.slice(0, 500) + "..." : agent.output}
          </pre>
        </div>
      )}

      {open && !agent.output && (
        <div className="border-t border-border/30 px-3 py-2">
          <span className="text-[10px] text-muted-foreground/50 italic">
            {agent.status === "running" ? "Waiting for output..." : "No output captured"}
          </span>
        </div>
      )}
    </div>
  );
}

function ActivityTimeline({ tools, agents }: { tools: ToolActivity[]; agents: AgentActivity[] }) {
  if (tools.length === 0 && agents.length === 0) return null;

  return (
    <div className="my-3 space-y-2">
      {tools.length > 0 && <ToolsAccordion tools={tools} />}
      {agents.map((agent) => (
        <AgentAccordion key={agent.id} agent={agent} />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Chat Messages / Streaming Area (multi-turn)
// ---------------------------------------------------------------------------

interface ChatAreaProps {
  session: ClaudeSession;
  streamContent: string;
  isStreaming: boolean;
  /** Optimistically added follow-up messages not yet in session.messages */
  pendingMessages: ConversationEntry[];
  /** Follow-up suggestions to display after assistant finishes */
  followUpSuggestions: FollowUpSuggestion[];
  onFollowUp: (suggestion: FollowUpSuggestion) => void;
  tools: ToolActivity[];
  agents: AgentActivity[];
}

function ChatArea({ session, streamContent, isStreaming, pendingMessages, followUpSuggestions, onFollowUp, tools, agents }: ChatAreaProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [session.messages, streamContent, pendingMessages, tools, agents, scrollToBottom]);

  // Build conversation entries — memoized to avoid re-parsing markdown for unchanged messages
  const conversation = useMemo(() => {
    const result: ConversationEntry[] = [];
    if (session.messages.length > 0) {
      for (const msg of session.messages) {
        result.push({ role: msg.role, content: msg.content, timestamp: msg.timestamp });
      }
    } else {
      result.push({ role: "user", content: session.prompt });
      const outputText = session.output.join("\n");
      if (outputText) result.push({ role: "assistant", content: outputText });
    }
    // Only append pending messages not already in session.messages (avoids duplicates
    // when server adds user message before pendingMessages is cleared on sse.done)
    const existingContents = new Set(
      session.messages.filter((m) => m.role === "user").map((m) => m.content),
    );
    for (const pending of pendingMessages) {
      if (!existingContents.has(pending.content)) {
        result.push(pending);
      }
    }
    return result;
  }, [session.messages, session.output, session.prompt, pendingMessages]);

  // Determine if we should show streaming content
  // Stream content appends to the last assistant bubble or creates a new one
  const lastEntry = conversation[conversation.length - 1];
  const showStreamBubble =
    streamContent.length > 0 && lastEntry?.role !== "assistant";
  const appendToLastAssistant =
    streamContent.length > 0 &&
    lastEntry?.role === "assistant" &&
    isStreaming;

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-3xl space-y-4">
        {conversation.map((entry, idx) => {
          const isLast = idx === conversation.length - 1;
          const isStreamTarget = isLast && appendToLastAssistant;

          if (entry.role === "user") {
            return (
              <div key={idx} className="flex justify-end animate-fade-in-up">
                <div className="max-w-[80%] rounded-2xl rounded-tr-md bg-primary px-4 py-2.5 text-sm text-primary-foreground shadow-sm">
                  <p className="whitespace-pre-wrap">{entry.content}</p>
                </div>
              </div>
            );
          }

          // Assistant message
          const displayContent = isStreamTarget
            ? entry.content + streamContent
            : entry.content;

          return (
            <div
              key={idx}
              className="flex justify-start animate-fade-in-up"
            >
              <div className="group relative max-w-[90%] w-full">
                <CopyButton text={displayContent} />
                <div className="rounded-2xl rounded-tl-md bg-[#0d1117] px-4 py-3 shadow-sm">
                  <div className="whitespace-pre-wrap break-words font-mono text-[13px] leading-relaxed text-gray-300">
                    {renderMessageContent(displayContent)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Standalone stream bubble when last message is user (new assistant response) */}
        {showStreamBubble && (
          <div className="flex justify-start animate-fade-in-up">
            <div className="group relative max-w-[90%] w-full">
              <CopyButton text={streamContent} />
              <div className="rounded-2xl rounded-tl-md bg-[#0d1117] px-4 py-3 shadow-sm">
                <div className="whitespace-pre-wrap break-words font-mono text-[13px] leading-relaxed text-gray-300">
                  {renderMessageContent(streamContent)}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Thinking indicator when running with no content yet */}
        {isStreaming && streamContent.length === 0 && (
          <div className="flex justify-start animate-fade-in-up">
            <div className="max-w-[90%] w-full">
              <div className="flex items-center gap-2 rounded-2xl rounded-tl-md bg-[#0d1117] px-4 py-3 text-sm text-gray-400 shadow-sm">
                <span className="flex gap-1">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gray-400" style={{ animationDelay: "0ms" }} />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gray-400" style={{ animationDelay: "200ms" }} />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gray-400" style={{ animationDelay: "400ms" }} />
                </span>
                <span className="ml-1">Claude is working...</span>
              </div>
            </div>
          </div>
        )}

        {/* Tool use + sub-agent activity */}
        {(tools.length > 0 || agents.length > 0) && (
          <ActivityTimeline tools={tools} agents={agents} />
        )}

        {/* Session status indicator */}
        {!isStreaming && session.status === "done" && (
          <>
            <div className="flex justify-center py-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-3 py-1 text-[11px] font-medium text-green-600 dark:text-green-400">
                <CheckCircle2 className="h-3 w-3" />
                Session ready for follow-up
              </span>
            </div>
            {/* Follow-up suggestions */}
            {followUpSuggestions.length > 0 && (
              <FollowUpPills suggestions={followUpSuggestions} onSelect={onFollowUp} />
            )}
          </>
        )}

        {!isStreaming && session.status === "error" && (
          <div className="flex justify-center py-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-3 py-1 text-[11px] font-medium text-red-600 dark:text-red-400">
              <XCircle className="h-3 w-3" />
              Session ended with an error. Is Claude CLI installed?
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Error Banner (auto-dismiss after 10s)
// ---------------------------------------------------------------------------

function ErrorBanner({
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
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Prompt Input Bar
// ---------------------------------------------------------------------------

interface AttachedImage {
  file: File;
  preview: string; // object URL for thumbnail
}

interface PromptInputProps {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  disabled: boolean;
  placeholder?: string;
  disabledMessage?: string;
  showTemplates: boolean;
  onTemplate: (prompt: string, placeholder?: boolean) => void;
  statusHint?: string;
  suggestions: Suggestion[];
  suggestionsLoading: boolean;
  onSuggestion: (suggestion: Suggestion) => void;
  selectedModel: string;
  onModelChange: (model: string) => void;
  availableModels: LLMAvailableModel[];
  images?: AttachedImage[];
  onImagesChange?: (images: AttachedImage[]) => void;
}

function PromptInput({
  value,
  onChange,
  onSend,
  disabled,
  placeholder,
  disabledMessage,
  showTemplates,
  onTemplate,
  statusHint,
  suggestions,
  suggestionsLoading,
  onSuggestion,
  selectedModel,
  onModelChange,
  availableModels,
  images,
  onImagesChange,
}: PromptInputProps) {
  const [modelMenuOpen, setModelMenuOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const prevDisabledRef = useRef(disabled);

  // Auto-focus on mount
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  // Re-focus when session completes (disabled goes from true to false)
  useEffect(() => {
    if (prevDisabledRef.current && !disabled) {
      textareaRef.current?.focus();
    }
    prevDisabledRef.current = disabled;
  }, [disabled]);

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 168) + "px"; // max ~6 lines
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      onSend();
    }
  };

  const resolvedPlaceholder = disabled
    ? disabledMessage || "Claude is working..."
    : placeholder || "Ask Claude anything...";

  return (
    <div className="border-t border-border bg-background px-4 pb-4 pt-3 sm:px-6">
      <div className="mx-auto max-w-3xl">
        {/* Smart suggestion pills above input */}
        {showTemplates && (
          <div className="mb-3">
            {suggestions.length > 0 || suggestionsLoading ? (
              <SuggestionPills
                suggestions={suggestions}
                isLoading={suggestionsLoading}
                onSelect={onSuggestion}
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {TEMPLATES.slice(0, 4).map((t) => (
                  <button
                    key={t.label}
                    type="button"
                    onClick={() => onTemplate(t.prompt, t.placeholder)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground transition-all hover:bg-accent hover:text-foreground hover:scale-105 active:scale-95"
                  >
                    {t.icon}
                    {t.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="relative flex flex-col gap-2 rounded-xl border border-border bg-card p-2 shadow-sm transition-shadow focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/40 focus-within:shadow-[0_0_0_3px_rgba(var(--color-primary),0.08)]">
          {/* Image previews */}
          {images && images.length > 0 && (
            <div className="flex flex-wrap gap-2 px-1">
              {images.map((img, i) => (
                <div key={i} className="group relative">
                  <img
                    src={img.preview}
                    alt={img.file.name}
                    className="h-16 w-16 rounded-lg border border-border object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      URL.revokeObjectURL(img.preview);
                      onImagesChange?.(images.filter((_, idx) => idx !== i));
                    }}
                    className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-destructive-foreground opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <X className="h-2.5 w-2.5" />
                  </button>
                  <span className="absolute bottom-0.5 left-0.5 right-0.5 truncate rounded-b-md bg-black/60 px-1 text-[8px] text-white">
                    {img.file.name}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-end gap-2">
            {/* Image attach button */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/gif,image/webp"
              multiple
              className="hidden"
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                if (files.length === 0) return;
                const newImages: AttachedImage[] = files.map((f) => ({
                  file: f,
                  preview: URL.createObjectURL(f),
                }));
                onImagesChange?.([...(images || []), ...newImages]);
                e.target.value = ""; // reset so same file can be re-selected
              }}
            />
            <Button
              size="icon-xs"
              variant="ghost"
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled}
              className="flex-shrink-0 text-muted-foreground hover:text-foreground mb-0.5"
              title="Attach image"
            >
              <ImageIcon className="h-3.5 w-3.5" />
            </Button>

            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={resolvedPlaceholder}
              disabled={disabled}
              rows={1}
              className="max-h-[168px] min-h-[36px] flex-1 resize-none bg-transparent px-2 py-1.5 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />
            {/* Clear button */}
            {value.length > 0 && !disabled && (
              <Button
                size="icon-xs"
                variant="ghost"
                onClick={() => {
                  onChange("");
                  textareaRef.current?.focus();
                }}
                className="flex-shrink-0 text-muted-foreground hover:text-foreground"
                title="Clear input"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
            <Button
              size="icon-sm"
              disabled={(!value.trim() && (!images || images.length === 0)) || disabled}
              onClick={onSend}
              className="flex-shrink-0 rounded-lg"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="mt-1.5 flex items-center justify-between text-[10px] text-muted-foreground">
          <div className="flex items-center gap-2">
            {/* Model selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setModelMenuOpen((o) => !o)}
                className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 hover:bg-accent hover:text-foreground transition-colors font-medium"
              >
                <Zap className="h-2.5 w-2.5" />
                {selectedModel === "claude-cli" ? "Claude CLI" : (() => {
                  const m = availableModels.find((am) => `${am.provider}:${am.id}` === selectedModel);
                  return m ? m.name : selectedModel;
                })()}
              </button>
              {modelMenuOpen && (
                <div className="absolute bottom-full left-0 mb-1 w-64 max-h-80 overflow-y-auto rounded-lg border border-border bg-popover shadow-lg z-50">
                  <div className="p-1">
                    <button
                      type="button"
                      onClick={() => { onModelChange("claude-cli"); setModelMenuOpen(false); }}
                      className={cn(
                        "w-full text-left rounded-md px-2 py-1.5 text-xs transition-colors",
                        selectedModel === "claude-cli" ? "bg-accent text-accent-foreground font-medium" : "hover:bg-accent/50"
                      )}
                    >
                      <div className="font-medium">Claude CLI</div>
                      <div className="text-[9px] text-muted-foreground">Full coding agent with file editing, terminal</div>
                    </button>
                    {availableModels.length > 0 && <div className="my-1 border-t border-border" />}
                    {/* Group by provider */}
                    {[...new Set(availableModels.map((m) => m.provider))].map((providerId) => {
                      const providerModels = availableModels.filter((m) => m.provider === providerId);
                      return (
                        <div key={providerId}>
                          <div className="px-2 py-1 text-[9px] font-semibold text-muted-foreground uppercase tracking-wider">
                            {providerModels[0]?.providerName}
                          </div>
                          {providerModels.map((m) => {
                            const modelKey = `${m.provider}:${m.id}`;
                            return (
                              <button
                                key={modelKey}
                                type="button"
                                onClick={() => { onModelChange(modelKey); setModelMenuOpen(false); }}
                                className={cn(
                                  "w-full text-left rounded-md px-2 py-1 text-xs transition-colors",
                                  selectedModel === modelKey ? "bg-accent text-accent-foreground font-medium" : "hover:bg-accent/50"
                                )}
                              >
                                {m.name}
                                {m.context && <span className="text-[9px] text-muted-foreground ml-1">{Math.round(m.context / 1000)}K</span>}
                              </button>
                            );
                          })}
                        </div>
                      );
                    })}
                    {availableModels.length === 0 && (
                      <p className="px-2 py-2 text-[10px] text-muted-foreground">
                        Configure API keys in Settings &rarr; AI Models to unlock more models
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
            <span>
              {statusHint || (disabled ? "Session running" : `${MOD}Enter to send`)}
            </span>
          </div>
          {value.length > 500 && (
            <span className="tabular-nums">{value.length} chars</span>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Document visibility hook — pause polling when tab hidden
function useDocumentVisible() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const handler = () => setVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, []);
  return visible;
}

// Streaming timer — shows elapsed time during generation
function StreamingTimer({ startedAt }: { startedAt: string }) {
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    const start = new Date(startedAt).getTime();
    const tick = () => setElapsed(Math.floor((Date.now() - start) / 1000));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [startedAt]);
  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;
  return (
    <span className="text-[10px] font-mono text-muted-foreground tabular-nums">
      {mins > 0 ? `${mins}m ` : ""}{secs}s
    </span>
  );
}

// useSSE hook -- connects to /api/claude/stream/:id
// ---------------------------------------------------------------------------

function useSSE(sessionId: string | null) {
  const [content, setContent] = useState("");
  const [done, setDone] = useState(false);
  const [exitCode, setExitCode] = useState<number | null>(null);
  const [tools, setTools] = useState<ToolActivity[]>([]);
  const [agents, setAgents] = useState<AgentActivity[]>([]);
  const [streamError, setStreamError] = useState<string | null>(null);
  const sourceRef = useRef<EventSource | null>(null);
  // Track the generation so we can reconnect for follow-ups
  const [generation, setGeneration] = useState(0);

  const reconnect = useCallback(() => {
    setContent("");
    setDone(false);
    setExitCode(null);
    setTools([]);
    setAgents([]);
    setGeneration((g) => g + 1);
  }, []);

  useEffect(() => {
    // Reset on session change
    setContent("");
    setDone(false);
    setExitCode(null);
    setTools([]);
    setAgents([]);

    if (!sessionId) return;

    const es = new EventSource(`/api/claude/stream/${sessionId}`);
    sourceRef.current = es;

    es.onmessage = (event) => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = JSON.parse(event.data) as Record<string, any>;

        if (data.type === "replay" || data.type === "chunk") {
          setContent((prev) => prev + (data.content ?? ""));
        }
        if (data.type === "tool_use") {
          setTools((prev) => [
            ...prev,
            { id: data.toolUseId, tool: data.tool, input: data.input ?? "", status: "running" },
          ]);
        }
        if (data.type === "tool_result") {
          setTools((prev) =>
            prev.map((t) =>
              t.id === data.toolUseId
                ? { ...t, output: data.content ?? "", status: "done" as const }
                : t
            )
          );
        }
        if (data.type === "agent_start") {
          setAgents((prev) => [
            ...prev,
            { id: data.toolUseId, name: data.agentName ?? "agent", prompt: data.agentPrompt ?? "", status: "running" },
          ]);
        }
        if (data.type === "done") {
          setDone(true);
          setExitCode(data.exitCode ?? null);
          es.close();
        }
      } catch {
        // ignore parse errors
      }
    };

    es.onerror = () => {
      // Connection lost -- mark done with error message
      setStreamError("Connection lost — response may be incomplete");
      setDone(true);
      es.close();
    };

    return () => {
      es.close();
      sourceRef.current = null;
    };
  }, [sessionId, generation]);

  return { content, done, exitCode, tools, agents, reconnect, streamError };
}

// ---------------------------------------------------------------------------
// Theme Toggle (sidebar utility)
// ---------------------------------------------------------------------------

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button variant="ghost" size="icon-xs" onClick={toggleTheme} title={theme === "dark" ? "Light mode" : "Dark mode"}>
      {theme === "dark" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
    </Button>
  );
}

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

        {/* Session search + shortcuts */}
        <div className="border-b border-border px-2 py-1.5">
          <input
            type="text"
            value={sessionSearch}
            onChange={(e) => setSessionSearch(e.target.value)}
            placeholder={`Search sessions... (${MOD}K)`}
            data-session-search
            className="w-full rounded-md border border-input bg-background px-2.5 py-1 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <div className="flex items-center justify-between mt-1 px-1 text-[9px] text-muted-foreground/60">
            <span>{MOD}N new</span>
            <span>{MOD}K search</span>
            <span>Esc close</span>
          </div>
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
              sessions={(sessionsByProject[projectPath] || []).filter(s =>
                !softDeletedIds.has(s.id) && (!sessionSearch || s.prompt.toLowerCase().includes(sessionSearch.toLowerCase()))
              )}
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
      <div className="relative flex flex-1 flex-col overflow-hidden">
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
                  <Button variant="ghost" size="sm" className="ml-auto h-6 text-[10px]" onClick={() => sse.reconnect()}>
                    Retry
                  </Button>
                </div>
              </div>
            )}

            {/* Error from follow-up */}
            {followUpMutation.isError && (
              <ErrorBanner
                message={followUpMutation.error.message}
                onRetry={() => followUpMutation.reset()}
                onDismiss={() => followUpMutation.reset()}
              />
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
      </div>

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
