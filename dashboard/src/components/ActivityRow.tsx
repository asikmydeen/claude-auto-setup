import { cn } from "@/lib/utils";
import { relativeTime } from "@/lib/utils";
import type { ActivityEntry } from "@/types/adapters";

interface ActivityRowProps {
  entry: ActivityEntry;
  isNew?: boolean;
}

export function ActivityRow({ entry, isNew }: ActivityRowProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 px-4 py-2.5 border-b border-border/50 text-sm",
        isNew && "activity-row-enter"
      )}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-foreground">{entry.actor}</span>
          <span className="text-muted-foreground">{entry.action}</span>
          <span className="font-medium text-foreground truncate">{entry.entity}</span>
        </div>
        {entry.details && (
          <p className="text-xs text-muted-foreground mt-0.5 truncate">{entry.details}</p>
        )}
      </div>
      <span className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">
        {relativeTime(entry.timestamp)}
      </span>
    </div>
  );
}
