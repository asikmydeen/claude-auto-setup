import { useState, useCallback } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Eye,
  GitCommit,
  FlaskConical,
  FileText,
  Sparkles,
  Info,
  RefreshCw,
  Bug,
  Download,
  Play,
  Check,
  Hammer,
  Terminal,
  FilePlus2,
  Zap,
  Code2,
  Wrench,
  TestTube2,
  BookOpen,
  MessageSquare,
  Loader2,
  CheckCircle2,
  XCircle,
  Square,
  Copy,
  ClipboardCheck,
} from "lucide-react";
import type { ClaudeSession } from "@/api/config";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TemplatePrompt {
  label: string;
  icon: React.ReactNode;
  prompt: string;
  placeholder?: boolean;
}

/** A single message pair or standalone message in the conversation view */
export interface ConversationEntry {
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
}

export interface ToolActivity {
  id: string;
  tool: string;
  input: string;
  output?: string;
  status: "running" | "done";
}

export interface AgentActivity {
  id: string;
  name: string;
  prompt: string;
  output?: string;
  status: "running" | "done";
}

export interface AttachedImage {
  file: File;
  preview: string; // object URL for thumbnail
}

// ---------------------------------------------------------------------------
// Platform detection
// ---------------------------------------------------------------------------

export const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.userAgent);
export const MOD = isMac ? "\u2318" : "Ctrl+";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

export const TEMPLATES: TemplatePrompt[] = [
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

export const STATUS_CONFIG = {
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

export const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
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

export function SuggestionIcon({ name, className }: { name: string; className?: string }) {
  const Icon = iconMap[name] || MessageSquare;
  return <Icon className={className} />;
}

export const categoryColors: Record<string, string> = {
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
export function classifyFileChange(filepath: string): "added" | "modified" | "deleted" {
  // Git status prefixes like "A ", "M ", "D ", "?? "
  const trimmed = filepath.trim();
  if (trimmed.startsWith("A ") || trimmed.startsWith("?? ")) return "added";
  if (trimmed.startsWith("D ")) return "deleted";
  return "modified";
}

/** Strip git status prefix from file path */
export function cleanFilePath(filepath: string): string {
  return filepath.replace(/^[AMDRC?!]{1,2}\s+/, "").trim();
}

/** Count user messages in a session (original prompt + follow-ups) */
export function countMessages(session: ClaudeSession): number {
  return session.messages.filter((m) => m.role === "user").length || 1;
}

/** Truncate text at a word boundary */
export function truncateAtWord(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  const truncated = text.slice(0, maxLen);
  const lastSpace = truncated.lastIndexOf(" ");
  return (lastSpace > maxLen * 0.5 ? truncated.slice(0, lastSpace) : truncated) + "...";
}

/** Copy-to-clipboard button that shows a check icon after copying */
export function CopyButton({ text }: { text: string }) {
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
      aria-label="Copy to clipboard"
    >
      {copied ? (
        <ClipboardCheck className="h-3.5 w-3.5 text-green-400" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
    </button>
  );
}

/** Render message content as Markdown with syntax highlighting */
export function renderMessageContent(content: string): React.ReactNode {
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
