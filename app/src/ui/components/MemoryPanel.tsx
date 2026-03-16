import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Brain, Search, Database, Activity, RefreshCw, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fetchMemoryStatus, searchMemory, type MemoryStatus, type MemorySearchResult } from "@/api/config";

export function MemoryPanel() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<MemorySearchResult[] | null>(null);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const { data: status, isLoading, refetch } = useQuery({
    queryKey: ["memory-status"],
    queryFn: fetchMemoryStatus,
    staleTime: 30_000,
    retry: 1,
  });

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setSearching(true);
    setSearchError(null);
    try {
      const results = await searchMemory(searchQuery.trim());
      setSearchResults(results);
    } catch (err) {
      setSearchError(err instanceof Error ? err.message : "Search failed");
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const workerUp = status?.workerHealthy ?? false;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Memory</h1>
          <p className="text-muted-foreground">
            Persistent cross-session memory (claude-mem)
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={workerUp ? "default" : "secondary"} className={cn(
            workerUp ? "bg-green-500/10 text-green-500 border-green-500/30" : ""
          )}>
            {workerUp ? "Worker Running" : "Worker Offline"}
          </Badge>
          <Button variant="ghost" size="icon-sm" onClick={() => refetch()}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="rounded-lg bg-blue-500/10 p-2">
              <Brain className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{status?.observations ?? "—"}</p>
              <p className="text-xs text-muted-foreground">Observations</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="rounded-lg bg-purple-500/10 p-2">
              <Activity className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{status?.sessions ?? "—"}</p>
              <p className="text-xs text-muted-foreground">Sessions Recorded</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="rounded-lg bg-amber-500/10 p-2">
              <Database className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{status?.dbSize ?? "—"}</p>
              <p className="text-xs text-muted-foreground">Database Size</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Memory
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search past observations, decisions, patterns..."
              className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              disabled={!workerUp}
            />
            <Button
              onClick={handleSearch}
              disabled={!workerUp || searching || !searchQuery.trim()}
              size="sm"
            >
              {searching ? <RefreshCw className="h-4 w-4 animate-spin" /> : "Search"}
            </Button>
          </div>

          {!workerUp && (
            <div className="flex items-center gap-2 rounded-md bg-amber-500/10 p-3 text-sm text-amber-500">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>Memory worker is offline. Start a Claude session to activate it.</span>
            </div>
          )}

          {searchError && (
            <div className="flex items-center gap-2 rounded-md bg-red-500/10 p-3 text-sm text-red-500">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{searchError}</span>
            </div>
          )}

          {/* Results */}
          {searchResults !== null && !searchError && (
            <div className="space-y-2">
              {searchResults.length === 0 ? (
                <p className="text-sm text-muted-foreground py-4 text-center">
                  No memories found for "{searchQuery}"
                </p>
              ) : (
                searchResults.map((result) => (
                  <div
                    key={result.id}
                    className="rounded-lg border border-border bg-card p-3 space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{result.title}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {result.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {result.date}
                        </span>
                      </div>
                    </div>
                    {result.subtitle && (
                      <p className="text-xs text-muted-foreground">{result.subtitle}</p>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Info */}
      <Card>
        <CardContent className="p-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            claude-mem automatically captures observations during Claude sessions —
            bugs fixed, features built, decisions made. Relevant memories are injected
            into new sessions for context. Use <code className="text-xs">/user:mem-search</code> in
            Claude to search memory directly. The worker service runs on port 37777.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
