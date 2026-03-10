import { useQuery } from "@tanstack/react-query";
import { Bot, Activity, Network, FileText, AlertCircle } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { StatusBadge } from "@/components/StatusBadge";
import { ActivityRow } from "@/components/ActivityRow";
import { EmptyState } from "@/components/EmptyState";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getSessions } from "@/api/sessions";
import { getActivity } from "@/api/activity";
import { getSkills } from "@/api/skills";
import type { AgentState, Session } from "@/types/adapters";

export function Dashboard() {
  const { data: sessions = [] } = useQuery({ queryKey: ["sessions"], queryFn: getSessions, refetchInterval: 5000 });
  const { data: activity = [] } = useQuery({ queryKey: ["activity"], queryFn: getActivity, refetchInterval: 5000 });
  const { data: skills = [] } = useQuery({ queryKey: ["skills"], queryFn: getSkills });

  const allAgents = sessions.flatMap((s: Session) => s.agents);
  const activeAgents = allAgents.filter((a: AgentState) => !["done", "error", "idle", "archived"].includes(a.status));
  const recentActivity = activity.slice(0, 15);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Agent orchestration overview</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Active Sessions" value={sessions.length} icon={Network} />
        <MetricCard title="Live Agents" value={activeAgents.length} icon={Bot} />
        <MetricCard title="Activity Events" value={activity.length} icon={Activity} />
        <MetricCard title="Skills Available" value={skills.length} icon={FileText} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Agents */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Live Agents</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {activeAgents.length === 0 ? (
              <EmptyState icon={Bot} title="No active agents" description="Agents will appear here when running" className="py-8" />
            ) : (
              <div className="divide-y divide-border">
                {activeAgents.map((agent: AgentState) => (
                  <div key={agent.id} className="flex items-center gap-3 px-6 py-3">
                    <Bot className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium truncate">{agent.id}</span>
                        <StatusBadge status={agent.status} />
                      </div>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">{agent.task}</p>
                    </div>
                    {agent.progress && (
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {agent.progress.done}/{agent.progress.total}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {recentActivity.length === 0 ? (
              <EmptyState icon={AlertCircle} title="No activity yet" description="Activity will appear as agents work" className="py-8" />
            ) : (
              <div className="max-h-[400px] overflow-y-auto">
                {recentActivity.map((entry) => (
                  <ActivityRow key={entry.id} entry={entry} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
