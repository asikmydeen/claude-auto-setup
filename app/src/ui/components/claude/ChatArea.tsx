import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import {
  Loader2,
  CheckCircle2,
  XCircle,
  Wrench,
  ChevronDown,
  ChevronRight,
  Play,
  RotateCcw,
  Copy,
  ClipboardCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ToolActivity, AgentActivity, ConversationEntry } from "./types";
import { renderMessageContent } from "./types";
import { FollowUpPills } from "./WelcomeScreen";
import type { ClaudeSession, FollowUpSuggestion } from "@/api/config";

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

export function ToolsAccordion({ tools }: { tools: ToolActivity[] }) {
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

export function AgentAccordion({ agent }: { agent: AgentActivity }) {
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

export function ActivityTimeline({ tools, agents }: { tools: ToolActivity[]; agents: AgentActivity[] }) {
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
// Copy-to-clipboard button (used in chat message bubbles)
// ---------------------------------------------------------------------------

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
// Chat Messages / Streaming Area (multi-turn)
// ---------------------------------------------------------------------------

export interface ChatAreaProps {
  session: ClaudeSession;
  streamContent: string;
  isStreaming: boolean;
  /** Optimistically added follow-up messages not yet in session.messages */
  pendingMessages: ConversationEntry[];
  /** Follow-up suggestions to display after assistant finishes */
  followUpSuggestions: FollowUpSuggestion[];
  onFollowUp: (suggestion: FollowUpSuggestion) => void;
  onContinue: () => void;
  onRegenerate: () => void;
  tools: ToolActivity[];
  agents: AgentActivity[];
}

export function ChatArea({ session, streamContent, isStreaming, pendingMessages, followUpSuggestions, onFollowUp, onContinue, onRegenerate, tools, agents }: ChatAreaProps) {
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
                  <div className="prose-sm break-words text-[13px] leading-relaxed text-gray-300">
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

        {/* Session status + action buttons */}
        {!isStreaming && session.status === "done" && (
          <>
            <div className="flex items-center justify-center gap-2 py-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-3 py-1 text-[11px] font-medium text-green-600 dark:text-green-400">
                <CheckCircle2 className="h-3 w-3" />
                Done
              </span>
              <button
                type="button"
                onClick={onContinue}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-[11px] font-medium text-muted-foreground transition-all hover:bg-accent hover:text-foreground hover:scale-105 active:scale-95"
              >
                <Play className="h-3 w-3" />
                Continue
              </button>
              <button
                type="button"
                onClick={onRegenerate}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-[11px] font-medium text-muted-foreground transition-all hover:bg-accent hover:text-foreground hover:scale-105 active:scale-95"
              >
                <RotateCcw className="h-3 w-3" />
                Regenerate
              </button>
            </div>
            {/* Follow-up suggestions */}
            {followUpSuggestions.length > 0 && (
              <FollowUpPills suggestions={followUpSuggestions} onSelect={onFollowUp} />
            )}
          </>
        )}

        {!isStreaming && session.status === "error" && (
          <div className="flex items-center justify-center gap-2 py-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-3 py-1 text-[11px] font-medium text-red-600 dark:text-red-400">
              <XCircle className="h-3 w-3" />
              Session ended with error
            </span>
            <button
              type="button"
              onClick={onRegenerate}
              className="inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/5 px-3 py-1 text-[11px] font-medium text-red-500 transition-all hover:bg-red-500/10 hover:scale-105 active:scale-95"
            >
              <RotateCcw className="h-3 w-3" />
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
