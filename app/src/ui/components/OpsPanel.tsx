import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Terminal,
  Play,
  Square,
  Cloud,
  FileText,
  Rocket,
  Loader2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { runOpsCommand, stopOpsProcess } from "@/api/config";
import { cn } from "@/lib/utils";

interface OpsPanelProps {
  cwd: string;
  open: boolean;
  onClose: () => void;
}

interface OpsProcess {
  id: string;
  command: string;
  output: string;
  status: "running" | "done" | "error";
  exitCode: number | null;
}

const QUICK_ACTIONS = [
  { id: "deploy", label: "Deploy", icon: Rocket, command: "npm", args: ["run", "deploy"], color: "text-green-600" },
  { id: "build", label: "Build", icon: Terminal, command: "npm", args: ["run", "build"], color: "text-blue-600" },
  { id: "test", label: "Test", icon: Play, command: "npm", args: ["test"], color: "text-purple-600" },
  { id: "logs", label: "CloudWatch Logs", icon: FileText, command: "aws", args: ["logs", "describe-log-groups"], color: "text-orange-600" },
  { id: "stacks", label: "CF Stacks", icon: Cloud, command: "aws", args: ["cloudformation", "list-stacks", "--stack-status-filter", "CREATE_COMPLETE", "UPDATE_COMPLETE"], color: "text-cyan-600" },
];

export function OpsPanel({ cwd, open, onClose }: OpsPanelProps) {
  const [processes, setProcesses] = useState<OpsProcess[]>([]);
  const [customCmd, setCustomCmd] = useState("");
  const outputRef = useRef<HTMLDivElement>(null);
  const [activeProcessId, setActiveProcessId] = useState<string | null>(null);
  const sseSourcesRef = useRef<Map<string, EventSource>>(new Map());

  // Cleanup SSE connections on unmount
  useEffect(() => {
    const sources = sseSourcesRef.current;
    return () => {
      sources.forEach(es => es.close());
      sources.clear();
    };
  }, []);

  const runMut = useMutation({
    mutationFn: (params: { command: string; args: string[] }) =>
      runOpsCommand(params.command, params.args, cwd),
    onSuccess: (data, variables) => {
      const proc: OpsProcess = {
        id: data.id,
        command: `${variables.command} ${variables.args.join(" ")}`,
        output: "",
        status: "running",
        exitCode: null,
      };
      setProcesses(prev => [proc, ...prev]);
      setActiveProcessId(data.id);

      // Connect SSE for streaming
      const es = new EventSource(`/api/ops/stream/${data.id}`);
      sseSourcesRef.current.set(data.id, es);

      // Batch SSE updates to avoid excessive re-renders
      let pendingOutput = "";
      let flushTimer: ReturnType<typeof setTimeout> | null = null;

      es.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.type === "output") {
          pendingOutput = msg.content;
          if (!flushTimer) {
            flushTimer = setTimeout(() => {
              const output = pendingOutput;
              setProcesses(prev => prev.map(p =>
                p.id === data.id ? { ...p, output } : p
              ));
              flushTimer = null;
            }, 50);
          }
        }
        if (msg.type === "done") {
          if (flushTimer) { clearTimeout(flushTimer); flushTimer = null; }
          setProcesses(prev => prev.map(p =>
            p.id === data.id ? { ...p, output: pendingOutput || p.output, status: msg.exitCode === 0 ? "done" : "error", exitCode: msg.exitCode } : p
          ));
          es.close();
          sseSourcesRef.current.delete(data.id);
        }
      };
      es.onerror = () => {
        es.close();
        sseSourcesRef.current.delete(data.id);
        setProcesses(prev => prev.map(p =>
          p.id === data.id && p.status === "running" ? { ...p, status: "error" } : p
        ));
      };
    },
  });

  const stopMut = useMutation({
    mutationFn: (id: string) => stopOpsProcess(id),
  });

  // Auto-scroll output
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [processes, activeProcessId]);

  function handleCustomRun() {
    if (!customCmd.trim()) return;
    const parts = customCmd.trim().split(/\s+/);
    const cmd = parts[0];
    const args = parts.slice(1);
    runMut.mutate({ command: cmd, args });
    setCustomCmd("");
  }

  const activeProcess = processes.find(p => p.id === activeProcessId);

  if (!open) return null;

  return (
    <div className="flex h-full flex-col border-l border-border bg-background">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4" />
          <span className="text-sm font-medium">Ops Panel</span>
          {processes.filter(p => p.status === "running").length > 0 && (
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
              {processes.filter(p => p.status === "running").length} running
            </Badge>
          )}
        </div>
        <Button variant="ghost" size="icon-sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Quick actions */}
      <div className="border-b border-border p-3">
        <div className="flex flex-wrap gap-1.5">
          {QUICK_ACTIONS.map((action) => (
            <Button
              key={action.id}
              variant="outline"
              size="sm"
              className="h-7 text-xs"
              disabled={runMut.isPending}
              onClick={() => runMut.mutate({ command: action.command, args: action.args })}
            >
              <action.icon className={cn("h-3 w-3 mr-1", action.color)} />
              {action.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Custom command input */}
      <div className="border-b border-border p-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={customCmd}
            onChange={(e) => setCustomCmd(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCustomRun()}
            placeholder="aws s3 ls / npm run build / make test"
            className="flex-1 rounded-md border border-input bg-background px-3 py-1.5 text-xs font-mono placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <Button
            variant="default"
            size="sm"
            className="h-7"
            disabled={!customCmd.trim() || runMut.isPending}
            onClick={handleCustomRun}
          >
            <Play className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Process tabs */}
      {processes.length > 0 && (
        <div className="flex items-center gap-1 border-b border-border px-3 py-1.5 overflow-x-auto">
          {processes.slice(0, 8).map((proc) => (
            <button
              key={proc.id}
              type="button"
              onClick={() => setActiveProcessId(proc.id)}
              className={cn(
                "flex items-center gap-1.5 rounded px-2 py-1 text-[10px] font-mono whitespace-nowrap transition-colors",
                proc.id === activeProcessId
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {proc.status === "running" && <Loader2 className="h-2.5 w-2.5 animate-spin text-blue-500" />}
              {proc.status === "done" && <div className="h-2 w-2 rounded-full bg-green-500" />}
              {proc.status === "error" && <div className="h-2 w-2 rounded-full bg-red-500" />}
              <span className="truncate max-w-[120px]">{proc.command}</span>
            </button>
          ))}
        </div>
      )}

      {/* Output */}
      <div ref={outputRef} className="flex-1 overflow-y-auto bg-zinc-950 p-3 font-mono text-xs">
        {activeProcess ? (
          <>
            <div className="flex items-center justify-between mb-2">
              <span className="text-zinc-400">$ {activeProcess.command}</span>
              {activeProcess.status === "running" && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-5 px-1.5 text-[10px] text-red-400 hover:text-red-300"
                  onClick={() => stopMut.mutate(activeProcess.id)}
                >
                  <Square className="h-2.5 w-2.5 mr-1" /> Stop
                </Button>
              )}
            </div>
            <pre className="whitespace-pre-wrap text-zinc-200 leading-relaxed">
              {activeProcess.output || (activeProcess.status === "running" ? "Running..." : "")}
            </pre>
            {activeProcess.status !== "running" && (
              <div className={cn(
                "mt-2 text-[10px]",
                activeProcess.exitCode === 0 ? "text-green-400" : "text-red-400"
              )}>
                Process exited with code {activeProcess.exitCode}
              </div>
            )}
          </>
        ) : (
          <div className="flex h-full items-center justify-center text-zinc-600">
            <div className="text-center space-y-2">
              <Terminal className="h-8 w-8 mx-auto opacity-50" />
              <p>Run a command or use quick actions above</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
