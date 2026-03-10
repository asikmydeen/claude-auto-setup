import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Network } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { EmptyState } from "@/components/EmptyState";
import { Card, CardContent } from "@/components/ui/card";
import { getSessions } from "@/api/sessions";
import { relativeTime } from "@/lib/utils";
import type { Session } from "@/types/adapters";

export function Sessions() {
  const { data: sessions = [] } = useQuery({ queryKey: ["sessions"], queryFn: getSessions, refetchInterval: 5000 });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold">Sessions</h1>
        <p className="text-sm text-muted-foreground mt-1">Active and recent orchestration sessions</p>
      </div>

      {sessions.length === 0 ? (
        <EmptyState
          icon={Network}
          title="No sessions"
          description="Sessions will appear when agents start working"
        />
      ) : (
        <div className="grid gap-3">
          {sessions.map((session: Session) => (
            <Link key={session.id} to={`/sessions/${session.id}`} className="block">
              <Card className="transition-colors hover:bg-accent/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium font-mono">{session.id}</span>
                        {session.phase && <StatusBadge status={session.phase} />}
                      </div>
                      {session.project && (
                        <p className="text-xs text-muted-foreground mt-1">Project: {session.project}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium">{session.agents.length} agent(s)</span>
                      <p className="text-xs text-muted-foreground">{relativeTime(session.startedAt)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
