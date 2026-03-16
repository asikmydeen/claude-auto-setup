import { useState, useRef, useEffect } from "react";
import {
  ArrowUp,
  X,
  Zap,
  Bug,
  Code2,
  TestTube2,
  Wrench,
  BookOpen,
  ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { Suggestion, LLMAvailableModel } from "@/api/config";
import type { AttachedImage } from "./types";
import { SuggestionPills } from "./WelcomeScreen";

// ---------------------------------------------------------------------------
// Platform detection
// ---------------------------------------------------------------------------

const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.userAgent);
const MOD = isMac ? "\u2318" : "Ctrl+";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

interface TemplatePrompt {
  label: string;
  icon: React.ReactNode;
  prompt: string;
  placeholder?: boolean;
}

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
// Prompt Input Bar
// ---------------------------------------------------------------------------

export interface PromptInputProps {
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

export function PromptInput({
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
// Streaming timer -- shows elapsed time during generation
// ---------------------------------------------------------------------------

export function StreamingTimer({ startedAt }: { startedAt: string }) {
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
