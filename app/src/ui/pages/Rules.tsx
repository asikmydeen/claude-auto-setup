import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ScrollText,
  FileText,
  ShieldAlert,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Hash,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  fetchRules,
  fetchRule,
  fetchEnforcement,
  type Rule,
  type EnforcementState,
} from "@/api/config";
import { cn } from "@/lib/utils";

// --- Skeleton ---

function RulesSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-24 animate-pulse rounded-lg bg-muted" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-28 animate-pulse rounded-lg bg-muted" />
        ))}
      </div>
    </div>
  );
}

// --- PUA Level Badge ---

function PuaLevelBadge({ level }: { level: number }) {
  const config: Record<number, { label: string; variant: string; className: string }> = {
    0: { label: "L0 - Normal", variant: "secondary", className: "" },
    1: { label: "L1 - Retry", variant: "outline", className: "border-yellow-500 text-yellow-600 dark:text-yellow-400" },
    2: { label: "L2 - Investigate", variant: "outline", className: "border-orange-500 text-orange-600 dark:text-orange-400" },
    3: { label: "L3 - Escalated", variant: "outline", className: "border-red-500 text-red-600 dark:text-red-400" },
    4: { label: "L4 - Desperation", variant: "destructive", className: "" },
  };

  const cfg = config[level] ?? config[0];
  return (
    <Badge
      variant={cfg.variant as "default" | "secondary" | "destructive" | "outline"}
      className={cfg.className}
    >
      <ShieldAlert className="mr-1 h-3 w-3" />
      {cfg.label}
    </Badge>
  );
}

// --- Enforcement Panel ---

function EnforcementPanel({ state }: { state: EnforcementState }) {
  if (!state.active) {
    return (
      <Card>
        <CardContent className="flex items-center gap-3 py-4">
          <ShieldAlert className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            No active enforcement session
          </span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-primary/20">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <ShieldAlert className="h-5 w-5" />
          Enforcement State
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Edits
            </p>
            <p className="text-2xl font-bold">{state.edit_count ?? 0}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Files Changed
            </p>
            <p className="text-2xl font-bold">{state.files_changed ?? 0}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Agents Spawned
            </p>
            <p className="text-2xl font-bold">{state.agents_spawned ?? 0}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              PUA Level
            </p>
            <PuaLevelBadge level={state.pua_level ?? 0} />
          </div>
        </div>
        {state.phase && (
          <div className="mt-3 pt-3 border-t border-border">
            <span className="text-xs text-muted-foreground">Phase: </span>
            <Badge variant="outline" className="text-xs">
              {state.phase}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// --- Rule Content Viewer ---

function RuleContent({ name }: { name: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["rule", name],
    queryFn: () => fetchRule(name),
  });

  if (isLoading) {
    return (
      <div className="h-40 animate-pulse rounded-lg bg-muted" />
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
        Failed to load rule content
      </div>
    );
  }

  return (
    <pre className="overflow-x-auto rounded-lg bg-[#1a1a2e] p-4 text-sm leading-relaxed text-gray-300 dark:bg-[#0d0d1a]">
      <code>{data?.content ?? ""}</code>
    </pre>
  );
}

// --- Rule Card ---

interface RuleCardProps {
  rule: Rule;
  isSelected: boolean;
  onSelect: (name: string | null) => void;
}

function RuleCard({ rule, isSelected, onSelect }: RuleCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(isSelected ? null : rule.name)}
      className={cn(
        "w-full text-left rounded-lg border p-4 transition-colors",
        isSelected
          ? "border-primary bg-primary/5 ring-1 ring-primary/20"
          : "border-border bg-card hover:bg-accent"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span className="font-medium truncate">{rule.title}</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground font-mono">
            {rule.filename}
          </p>
        </div>
        <div className="flex items-center gap-2 ml-2 shrink-0">
          <Badge variant="secondary" className="text-xs">
            <Hash className="mr-0.5 h-3 w-3" />
            {rule.lines}
          </Badge>
          {isSelected ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </div>
    </button>
  );
}

// --- Main Rules Page ---

export function Rules() {
  const [selectedRule, setSelectedRule] = useState<string | null>(null);

  const {
    data: rules,
    isLoading: rulesLoading,
    error: rulesError,
    refetch,
  } = useQuery<Rule[]>({
    queryKey: ["rules"],
    queryFn: fetchRules,
  });

  const { data: enforcement } = useQuery<EnforcementState>({
    queryKey: ["enforcement"],
    queryFn: fetchEnforcement,
    refetchInterval: 5000,
  });

  if (rulesLoading) return <RulesSkeleton />;

  if (rulesError) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <AlertCircle className="h-10 w-10 text-destructive" />
        <p className="text-muted-foreground">Failed to load rules</p>
        <Button variant="outline" onClick={() => refetch()}>
          Retry
        </Button>
      </div>
    );
  }

  const rulesList = rules ?? [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Rules</h1>
        <p className="text-muted-foreground">
          Universal rules governing agent behavior
        </p>
      </div>

      {/* Enforcement State */}
      {enforcement && <EnforcementPanel state={enforcement} />}

      {/* Rules Grid */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <ScrollText className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold">Rule Files</h2>
          <Badge variant="secondary">{rulesList.length}</Badge>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {rulesList.map((rule) => (
            <RuleCard
              key={rule.name}
              rule={rule}
              isSelected={selectedRule === rule.name}
              onSelect={setSelectedRule}
            />
          ))}
        </div>

        {rulesList.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-2 py-12">
            <ScrollText className="h-8 w-8 text-muted-foreground" />
            <p className="text-muted-foreground">No rules found</p>
          </div>
        )}
      </div>

      {/* Rule Content Viewer */}
      {selectedRule && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <FileText className="h-5 w-5" />
              {selectedRule}.md
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RuleContent name={selectedRule} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
