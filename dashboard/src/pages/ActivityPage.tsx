import { useQuery } from "@tanstack/react-query";
import { Activity } from "lucide-react";
import { ActivityRow } from "@/components/ActivityRow";
import { EmptyState } from "@/components/EmptyState";
import { getActivity } from "@/api/activity";

export function ActivityPage() {
  const { data: activity = [] } = useQuery({ queryKey: ["activity"], queryFn: getActivity, refetchInterval: 5000 });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold">Activity Log</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Audit trail of all agent actions ({activity.length} entries)
        </p>
      </div>

      {activity.length === 0 ? (
        <EmptyState
          icon={Activity}
          title="No activity recorded"
          description="Agent actions, decisions, and state changes will appear here"
        />
      ) : (
        <div className="rounded-xl border bg-card overflow-hidden">
          {activity.map((entry, i) => (
            <ActivityRow key={entry.id} entry={entry} isNew={i === 0} />
          ))}
        </div>
      )}
    </div>
  );
}
