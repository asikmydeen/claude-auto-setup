import { cn } from "@/lib/utils";
import { statusBadge, statusBadgeDefault, agentStatusDot, agentStatusDotDefault } from "@/lib/status-colors";

interface StatusBadgeProps {
  status: string;
  className?: string;
  showDot?: boolean;
}

export function StatusBadge({ status, className, showDot = true }: StatusBadgeProps) {
  const label = status.replace(/_/g, " ");
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium capitalize",
        statusBadge[status] ?? statusBadgeDefault,
        className
      )}
    >
      {showDot && (
        <span
          className={cn("h-1.5 w-1.5 rounded-full", agentStatusDot[status] ?? agentStatusDotDefault)}
        />
      )}
      {label}
    </span>
  );
}
