import { useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SessionSearchProps {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  timeFilter: string;
  onTimeFilterChange: (time: string) => void;
  filteredCount: number;
  totalCount: number;
}

const STATUS_OPTIONS = ["all", "running", "done", "error"] as const;
const STATUS_LABELS: Record<string, string> = { all: "All", running: "Running", done: "Done", error: "Error" };
const TIME_OPTIONS = ["all", "today", "week", "month"] as const;
const TIME_LABELS: Record<string, string> = { all: "All time", today: "Today", week: "This week", month: "This month" };

function Pill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-2 py-0.5 text-[10px] font-medium transition-colors",
        active ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
      )}
    >
      {label}
    </button>
  );
}

export function SessionSearch({
  search, onSearchChange, statusFilter, onStatusFilterChange,
  timeFilter, onTimeFilterChange, filteredCount, totalCount,
}: SessionSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const isFiltering = search !== "" || statusFilter !== "all" || timeFilter !== "all";

  useEffect(() => {
    if (search && inputRef.current) inputRef.current.focus();
  }, []);

  return (
    <div className="space-y-1.5 px-2 py-2">
      {/* Search input */}
      <div className="relative flex items-center">
        <Search className="absolute left-2 h-3 w-3 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search sessions..."
          data-session-search
          className="h-7 w-full rounded-md border border-border bg-background pl-7 pr-8 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        />
        {search ? (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="absolute right-2 rounded p-0.5 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Clear search"
          >
            <X className="h-3 w-3" />
          </button>
        ) : (
          <kbd className="absolute right-2 rounded border border-border bg-muted px-1 py-0.5 text-[9px] leading-none text-muted-foreground">
            {"\u2318"}K
          </kbd>
        )}
      </div>
      {/* Status filter pills */}
      <div className="flex flex-wrap gap-0.5">
        {STATUS_OPTIONS.map((v) => (
          <Pill key={v} label={STATUS_LABELS[v]} active={statusFilter === v} onClick={() => onStatusFilterChange(v)} />
        ))}
      </div>
      {/* Time filter pills */}
      <div className="flex flex-wrap gap-0.5">
        {TIME_OPTIONS.map((v) => (
          <Pill key={v} label={TIME_LABELS[v]} active={timeFilter === v} onClick={() => onTimeFilterChange(v)} />
        ))}
      </div>
      {/* Results count (only when filtering) */}
      {isFiltering && (
        <p className="text-[10px] text-muted-foreground">
          {filteredCount} of {totalCount} sessions
        </p>
      )}
    </div>
  );
}
