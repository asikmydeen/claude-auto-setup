import { useState, useRef, useEffect, useCallback } from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";
import type { ToolActivity, AgentActivity } from "./types";

// ---------------------------------------------------------------------------
// Document visibility hook — pause polling when tab hidden
// ---------------------------------------------------------------------------

export function useDocumentVisible() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const handler = () => setVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, []);
  return visible;
}

// ---------------------------------------------------------------------------
// useSSE hook -- connects to /api/claude/stream/:id
// ---------------------------------------------------------------------------

export function useSSE(sessionId: string | null) {
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
    setStreamError(null);
    setGeneration((g) => g + 1);
  }, []);

  useEffect(() => {
    // Reset on session change
    setContent("");
    setDone(false);
    setExitCode(null);
    setTools([]);
    setAgents([]);
    setStreamError(null);

    if (!sessionId) return;

    const es = new EventSource(`/api/claude/stream/${sessionId}`);
    sourceRef.current = es;

    es.onmessage = (event) => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = JSON.parse(event.data) as Record<string, any>;

        // Clear any previous stream error on successful data receipt
        if (streamError) setStreamError(null);

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
      // Connection lost — show error but don't mark done (session may still be running server-side).
      // The user can click Retry to reconnect, or the session query will eventually refresh status.
      setStreamError("Connection lost \u2014 click Retry to reconnect");
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

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button variant="ghost" size="icon-xs" onClick={toggleTheme} title={theme === "dark" ? "Light mode" : "Dark mode"}>
      {theme === "dark" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
    </Button>
  );
}
