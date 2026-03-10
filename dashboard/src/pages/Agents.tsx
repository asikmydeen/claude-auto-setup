import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Bot } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { EmptyState } from "@/components/EmptyState";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getSessions } from "@/api/sessions";
import { cn } from "@/lib/utils";
import { relativeTime } from "@/lib/utils";
import type { AgentState, Session } from "@/types/adapters";

const FILTERS = ["all", "active", "exploring", "implementing", "reviewing", "paused", "error", "done"] as const;
type Filter = (typeof FILTERS)[number];

export function Agents() {
  const [filter, setFilter] = useState<Filter>("all");
  const { data: sessions = [] } = useQuery({ queryKey: ["sessions"], queryFn: getSessions, refetchInterval: 5000 });

  const allAgents = sessions.flatMap((s: Session) =>
    s.agents.map((a: AgentState) => ({ ...a, sessionId: s.id, project: s.project }))
  );

  const filtered = filter === "all" ? allAgents : allAgents.filter((a) => a.status === filter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold">Agents</h1>
        <p className="text-sm text-muted-foreground mt-1">All agents across active sessions</p>
      </div>

      {/* Filter bar */}
      <div className="flex gap-1 flex-wrap">
        {FILTERS.map((f) => (
          <Button
            key={f}
            variant={filter === f ? "secondary" : "ghost"}
            size="xs"
            onClick={() => setFilter(f)}
            className="capitalize"
          >
            {f.replace(/_/g, " ")}
          </Button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Bot}
          title={`No ${filter === "all" ? "" : filter + " "}agents`}
          description="Agents will appear here when sessions are active"
        />
      ) : (
        <div className="grid gap-3">
          {filtered.map((agent) => (
            <Card key={`${agent.sessionId}-${agent.id}`}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Bot className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{agent.id}</span>
                      <StatusBadge status={agent.status} />
                      <span className={cn("text-xs capitalize px-1.5 py-0.5 rounded bg-accent text-accent-foreground")}>
                        {agent.role}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{agent.task}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      {agent.project && <span>Project: {agent.project}</span>}
                      {agent.adapter && <span>Adapter: {agent.adapter}</span>}
                      {agent.updatedAt && <span>{relativeTime(agent.updatedAt)}</span>}
                    </div>
                  </div>
                  {agent.progress && (
                    <div className="text-right flex-shrink-0">
                      <span className="text-sm font-medium">
                        {agent.progress.done}/{agent.progress.total}
                      </span>
                      <div className="w-20 h-1.5 bg-accent rounded-full mt-1">
                        <div
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${(agent.progress.done / agent.progress.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
