import { useState, useRef, useEffect, useCallback } from "react";
import { Terminal, X, Container, Wifi, WifiOff, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DevServerLogsProps {
  cwd: string;
  open: boolean;
  onClose: () => void;
}

export function DevServerLogs({ cwd, open, onClose }: DevServerLogsProps) {
  const [logs, setLogs] = useState("");
  const [status, setStatus] = useState<string>("connecting");
  const [port, setPort] = useState<number | null>(null);
  const [runtime, setRuntime] = useState<string | null>(null);
  const [containerId, setContainerId] = useState<string | null>(null);
  const outputRef = useRef<HTMLPreElement>(null);
  const esRef = useRef<EventSource | null>(null);

  // Auto-scroll
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [logs]);

  /** Connect (or reconnect) to the SSE logs stream */
  const connectSSE = useCallback(() => {
    if (!cwd) return;

    // Close existing connection
    if (esRef.current) {
      esRef.current.close();
      esRef.current = null;
    }

    setStatus("connecting");

    const es = new EventSource(`/api/dev-server/logs?cwd=${encodeURIComponent(cwd)}`);
    esRef.current = es;

    es.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "replay") {
          setLogs(data.content || "");
        } else if (data.type === "log") {
          setLogs((prev) => prev + data.content);
        } else if (data.type === "status") {
          setStatus(data.status || "unknown");
          if (data.port) setPort(data.port);
          if (data.runtime) setRuntime(data.runtime);
          if (data.containerId) setContainerId(data.containerId);
        }
      } catch {}
    };

    es.onerror = () => {
      setStatus("disconnected");
    };
  }, [cwd]);

  /** Reconnect after a disconnect */
  const reconnect = useCallback(() => {
    connectSSE();
  }, [connectSSE]);

  // Connect to SSE logs stream
  useEffect(() => {
    if (!open || !cwd) return;

    setLogs("");
    connectSSE();

    return () => {
      if (esRef.current) {
        esRef.current.close();
        esRef.current = null;
      }
    };
  }, [open, cwd, connectSSE]);

  if (!open) return null;

  const projectName = cwd.split("/").pop() || cwd;
  const isRunning = status === "running" || status === "starting" || status === "installing";

  return (
    <div className="flex h-full flex-col border-l border-border bg-zinc-950">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 px-3 py-1.5">
        <div className="flex items-center gap-2 text-[11px] font-mono">
          <Terminal className="h-3.5 w-3.5 text-green-400" />
          <span className="text-zinc-300 font-medium">Dev Server</span>
          {runtime && runtime !== "native" && (
            <span className="flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400">
              <Container className="h-2.5 w-2.5" />
              {runtime}
            </span>
          )}
          {port && (
            <span className="flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded bg-green-500/20 text-green-400">
              <Wifi className="h-2.5 w-2.5" />
              :{port}
            </span>
          )}
          <span className={cn(
            "text-[9px] px-1.5 py-0.5 rounded",
            status === "running" ? "bg-green-500/20 text-green-400" :
            status === "installing" ? "bg-yellow-500/20 text-yellow-400" :
            status === "starting" ? "bg-blue-500/20 text-blue-400" :
            status === "error" ? "bg-red-500/20 text-red-400" :
            "bg-zinc-700 text-zinc-400"
          )}>
            {status === "installing" ? "Installing deps..." :
             status === "starting" ? "Starting..." :
             status === "running" ? "Running" :
             status === "error" ? "Error" :
             status === "not-started" ? "Not started" :
             status}
          </span>
        </div>
        <Button variant="ghost" size="icon-sm" className="text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800" onClick={onClose} aria-label="Close dev server logs">
          <X className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Disconnected reconnect bar */}
      {status === "disconnected" && (
        <div className="flex items-center gap-2 px-3 py-2 text-xs text-yellow-600 dark:text-yellow-500">
          <WifiOff className="h-3.5 w-3.5" />
          <span>Connection lost</span>
          <button
            onClick={reconnect}
            className="ml-auto inline-flex items-center gap-1 rounded bg-yellow-600/10 px-2 py-0.5 text-xs font-medium hover:bg-yellow-600/20 transition-colors"
            aria-label="Reconnect to dev server logs"
          >
            <RefreshCw className="h-3 w-3" />
            Reconnect
          </button>
        </div>
      )}

      {/* Log output */}
      <pre
        ref={outputRef}
        className="flex-1 overflow-y-auto p-3 font-mono text-xs leading-relaxed text-zinc-300 whitespace-pre-wrap"
      >
        {/* Status header */}
        <span className="text-zinc-500">
          {`── ${projectName} `}
          {containerId ? `(${runtime}: ${containerId})` : "(native)"}
          {` ──\n\n`}
        </span>

        {logs || (
          <span className="text-zinc-500 flex items-center gap-2">
            {isRunning ? (
              <>
                <Loader2 className="h-3 w-3 animate-spin inline" />
                {status === "installing" ? "Installing dependencies..." : "Starting dev server..."}
              </>
            ) : status === "not-started" ? (
              <>
                <WifiOff className="h-3 w-3 inline" />
                Dev server not started for this project
              </>
            ) : (
              "Waiting for output..."
            )}
          </span>
        )}
      </pre>

      {/* Status bar */}
      <div className="flex items-center justify-between border-t border-zinc-800 px-3 py-1 text-[10px] text-zinc-600">
        <span className="font-mono truncate max-w-[250px]">{cwd}</span>
        {isRunning && (
          <div className="flex items-center gap-1 text-green-400">
            <div className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
            live
          </div>
        )}
      </div>
    </div>
  );
}
