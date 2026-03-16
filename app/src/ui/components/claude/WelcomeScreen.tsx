import { useState } from "react";
import {
  Terminal,
  Zap,
  Bug,
  TestTube2,
  Code2,
  Wrench,
  BookOpen,
  MessageSquare,
  Eye,
  GitCommit,
  FlaskConical,
  FileText,
  Sparkles,
  Info,
  RefreshCw,
  Download,
  Play,
  Check,
  Hammer,
  FilePlus2,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { Suggestion, FollowUpSuggestion } from "@/api/config";
import type { TemplatePrompt } from "./types";

// ---------------------------------------------------------------------------
// Icon Mapping + Category Colors (needed by SuggestionPills)
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
// Platform detection
// ---------------------------------------------------------------------------

const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.userAgent);
const MOD = isMac ? "\u2318" : "Ctrl+";

// ---------------------------------------------------------------------------
// Templates
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

// ---------------------------------------------------------------------------
// Suggestion Pills
// ---------------------------------------------------------------------------

export interface SuggestionPillsProps {
  suggestions: Suggestion[];
  isLoading: boolean;
  onSelect: (suggestion: Suggestion) => void;
}

export function SuggestionPills({ suggestions, isLoading, onSelect }: SuggestionPillsProps) {
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

export interface FollowUpPillsProps {
  suggestions: FollowUpSuggestion[];
  onSelect: (suggestion: FollowUpSuggestion) => void;
}

export function FollowUpPills({ suggestions, onSelect }: FollowUpPillsProps) {
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
// Welcome / Template Screen
// ---------------------------------------------------------------------------

export interface WelcomeScreenProps {
  onTemplate: (prompt: string, placeholder?: boolean) => void;
  suggestions: Suggestion[];
  suggestionsLoading: boolean;
  onSuggestion: (suggestion: Suggestion) => void;
}

export function WelcomeScreen({ onTemplate, suggestions, suggestionsLoading, onSuggestion }: WelcomeScreenProps) {
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
