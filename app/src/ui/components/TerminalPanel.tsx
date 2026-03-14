import { useState, useRef, useEffect, useCallback } from "react";
import {
  Terminal,
  Plus,
  X,
  Loader2,
  FolderOpen,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TerminalPanelProps {
  cwd: string;
  open: boolean;
  onClose: () => void;
}

interface ShellSession {
  id: string;
  label: string;
  cwd: string;
  history: HistoryEntry[];
  inputValue: string;
}

interface HistoryEntry {
  command: string;
  output: string;
  exitCode: number | null;
  status: "running" | "done" | "error";
  timestamp: string;
}

let nextSessionId = 1;

function createSession(cwd: string): ShellSession {
  return {
    id: String(nextSessionId++),
    label: `Shell ${nextSessionId - 1}`,
    cwd,
    history: [],
    inputValue: "",
  };
}

export function TerminalPanel({ cwd, open, onClose }: TerminalPanelProps) {
  const [sessions, setSessions] = useState<ShellSession[]>(() => [createSession(cwd)]);
  const [activeSessionId, setActiveSessionId] = useState(sessions[0].id);
  const [commandHistoryList, setCommandHistoryList] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sseRef = useRef<Map<string, EventSource>>(new Map());

  const activeSession = sessions.find((s) => s.id === activeSessionId);

  // Auto-scroll
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [activeSession?.history]);

  // Focus input when panel opens or tab changes
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open, activeSessionId]);

  // Cleanup SSE on unmount
  useEffect(() => {
    const sources = sseRef.current;
    return () => {
      sources.forEach((es) => es.close());
      sources.clear();
    };
  }, []);

  const runCommand = useCallback(
    async (cmd: string) => {
      if (!cmd.trim() || !activeSession) return;

      // Parse command
      const parts = cmd.trim().split(/\s+/);
      const command = parts[0];
      const args = parts.slice(1);

      // Handle built-in cd
      if (command === "cd") {
        const target = args[0] || "~";
        const newCwd =
          target === "~"
            ? "/Users/" + (cwd.split("/")[2] || "user")
            : target.startsWith("/")
              ? target
              : `${activeSession.cwd}/${target}`;

        setSessions((prev) =>
          prev.map((s) =>
            s.id === activeSession.id ? { ...s, cwd: newCwd } : s
          )
        );

        const entry: HistoryEntry = {
          command: cmd,
          output: "",
          exitCode: 0,
          status: "done",
          timestamp: new Date().toISOString(),
        };
        setSessions((prev) =>
          prev.map((s) =>
            s.id === activeSession.id
              ? { ...s, history: [...s.history, entry], inputValue: "" }
              : s
          )
        );
        setCommandHistoryList((prev) => [cmd, ...prev]);
        setHistoryIdx(-1);
        return;
      }

      // Handle clear
      if (command === "clear") {
        setSessions((prev) =>
          prev.map((s) =>
            s.id === activeSession.id ? { ...s, history: [], inputValue: "" } : s
          )
        );
        return;
      }

      // Create history entry
      const entry: HistoryEntry = {
        command: cmd,
        output: "",
        exitCode: null,
        status: "running",
        timestamp: new Date().toISOString(),
      };

      setSessions((prev) =>
        prev.map((s) =>
          s.id === activeSession.id
            ? { ...s, history: [...s.history, entry], inputValue: "" }
            : s
        )
      );
      setCommandHistoryList((prev) => [cmd, ...prev]);
      setHistoryIdx(-1);

      // Call server
      try {
        const res = await fetch("/api/ops/run", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ command, args, cwd: activeSession.cwd }),
        });
        const data = await res.json();

        if (!res.ok) {
          setSessions((prev) =>
            prev.map((s) =>
              s.id === activeSession.id
                ? {
                    ...s,
                    history: s.history.map((h, i) =>
                      i === s.history.length - 1
                        ? { ...h, output: data.error || "Command failed", status: "error" as const, exitCode: 1 }
                        : h
                    ),
                  }
                : s
            )
          );
          return;
        }

        // SSE streaming
        const es = new EventSource(`/api/ops/stream/${data.id}`);
        sseRef.current.set(data.id, es);

        es.onmessage = (event) => {
          const msg = JSON.parse(event.data);
          if (msg.type === "output") {
            setSessions((prev) =>
              prev.map((s) =>
                s.id === activeSession.id
                  ? {
                      ...s,
                      history: s.history.map((h, i) =>
                        i === s.history.length - 1 ? { ...h, output: msg.content } : h
                      ),
                    }
                  : s
              )
            );
          }
          if (msg.type === "done") {
            setSessions((prev) =>
              prev.map((s) =>
                s.id === activeSession.id
                  ? {
                      ...s,
                      history: s.history.map((h, i) =>
                        i === s.history.length - 1
                          ? { ...h, status: msg.exitCode === 0 ? "done" as const : "error" as const, exitCode: msg.exitCode }
                          : h
                      ),
                    }
                  : s
              )
            );
            es.close();
            sseRef.current.delete(data.id);
          }
        };
        es.onerror = () => {
          es.close();
          sseRef.current.delete(data.id);
        };
      } catch {
        setSessions((prev) =>
          prev.map((s) =>
            s.id === activeSession.id
              ? {
                  ...s,
                  history: s.history.map((h, i) =>
                    i === s.history.length - 1
                      ? { ...h, output: "Failed to connect to server", status: "error" as const, exitCode: 1 }
                      : h
                  ),
                }
              : s
          )
        );
      }
    },
    [activeSession, cwd]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      runCommand(activeSession?.inputValue || "");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistoryList.length > 0 && historyIdx < commandHistoryList.length - 1) {
        const newIdx = historyIdx + 1;
        setHistoryIdx(newIdx);
        setSessions((prev) =>
          prev.map((s) =>
            s.id === activeSessionId ? { ...s, inputValue: commandHistoryList[newIdx] } : s
          )
        );
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx > 0) {
        const newIdx = historyIdx - 1;
        setHistoryIdx(newIdx);
        setSessions((prev) =>
          prev.map((s) =>
            s.id === activeSessionId ? { ...s, inputValue: commandHistoryList[newIdx] } : s
          )
        );
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setSessions((prev) =>
          prev.map((s) =>
            s.id === activeSessionId ? { ...s, inputValue: "" } : s
          )
        );
      }
    }
  };

  const addSession = () => {
    const s = createSession(cwd);
    setSessions((prev) => [...prev, s]);
    setActiveSessionId(s.id);
  };

  const closeSession = (id: string) => {
    if (sessions.length === 1) return;
    const remaining = sessions.filter((s) => s.id !== id);
    setSessions(remaining);
    if (activeSessionId === id) {
      setActiveSessionId(remaining[remaining.length - 1].id);
    }
  };

  if (!open) return null;

  const isRunning = activeSession?.history.some((h) => h.status === "running");

  return (
    <div className="flex h-full flex-col border-l border-border bg-zinc-950">
      {/* Tab bar */}
      <div className="flex items-center gap-0.5 border-b border-zinc-800 px-1 py-1 overflow-x-auto">
        {sessions.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActiveSessionId(s.id)}
            className={cn(
              "group flex items-center gap-1.5 rounded px-2.5 py-1 text-[11px] font-mono whitespace-nowrap transition-colors",
              s.id === activeSessionId
                ? "bg-zinc-800 text-zinc-200"
                : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50"
            )}
          >
            <Terminal className="h-3 w-3 shrink-0" />
            {s.label}
            {sessions.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  closeSession(s.id);
                }}
                className="ml-1 opacity-0 group-hover:opacity-100 hover:text-red-400"
              >
                <X className="h-2.5 w-2.5" />
              </button>
            )}
          </button>
        ))}
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800"
          onClick={addSession}
        >
          <Plus className="h-3 w-3" />
        </Button>
        <div className="flex-1" />
        <Button
          variant="ghost"
          size="icon-sm"
          className="text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 shrink-0"
          onClick={onClose}
        >
          <X className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Output area */}
      <div
        ref={outputRef}
        className="flex-1 overflow-y-auto p-3 font-mono text-xs leading-relaxed"
        onClick={() => inputRef.current?.focus()}
      >
        {activeSession?.history.map((entry, i) => (
          <div key={i} className="mb-2">
            {/* Command prompt */}
            <div className="flex items-center gap-1.5 text-zinc-400">
              <span className="text-green-400">{activeSession.cwd.split("/").pop() || "~"}</span>
              <ChevronRight className="h-2.5 w-2.5 text-zinc-600" />
              <span className="text-zinc-200">{entry.command}</span>
              {entry.status === "running" && (
                <Loader2 className="h-3 w-3 animate-spin text-blue-400 ml-1" />
              )}
            </div>
            {/* Output */}
            {entry.output && (
              <pre className="whitespace-pre-wrap text-zinc-300 mt-0.5 pl-0">
                {entry.output}
              </pre>
            )}
            {entry.status === "error" && entry.exitCode !== null && (
              <span className="text-red-400 text-[10px]">
                exit {entry.exitCode}
              </span>
            )}
          </div>
        ))}

        {/* Current prompt */}
        <div className="flex items-center gap-1.5 text-zinc-400">
          <span className="text-green-400">
            {activeSession?.cwd.split("/").pop() || "~"}
          </span>
          <ChevronRight className="h-2.5 w-2.5 text-zinc-600" />
          <input
            ref={inputRef}
            type="text"
            value={activeSession?.inputValue || ""}
            onChange={(e) =>
              setSessions((prev) =>
                prev.map((s) =>
                  s.id === activeSessionId ? { ...s, inputValue: e.target.value } : s
                )
              )
            }
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-zinc-200 outline-none caret-zinc-400"
            placeholder={isRunning ? "waiting..." : ""}
            disabled={isRunning}
            spellCheck={false}
            autoComplete="off"
          />
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between border-t border-zinc-800 px-3 py-1 text-[10px] text-zinc-600">
        <div className="flex items-center gap-1.5">
          <FolderOpen className="h-3 w-3" />
          <span className="font-mono truncate max-w-[250px]">{activeSession?.cwd}</span>
        </div>
        {isRunning && (
          <div className="flex items-center gap-1 text-blue-400">
            <Loader2 className="h-2.5 w-2.5 animate-spin" />
            running
          </div>
        )}
      </div>
    </div>
  );
}
