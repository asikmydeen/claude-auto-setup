import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import {
  Folder,
  FolderOpen,
  FolderGit2,
  Package,
  ArrowLeft,
  ChevronRight,
  Search,
  X,
  Loader2,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { browseDirectory, type BrowseResult } from "@/api/config";

interface FolderBrowserProps {
  open: boolean;
  onClose: () => void;
  onSelect: (path: string) => void;
  initialPath?: string;
}

export function FolderBrowser({ open, onClose, onSelect, initialPath }: FolderBrowserProps) {
  const [data, setData] = useState<BrowseResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const listRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLInputElement>(null);

  const navigate = useCallback(async (path?: string) => {
    setLoading(true);
    setError(null);
    setFilter("");
    setSelectedIndex(-1);
    try {
      const result = await browseDirectory(path);
      setData(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to browse directory");
    } finally {
      setLoading(false);
    }
  }, []);

  // Load initial directory when opened
  useEffect(() => {
    if (open) {
      navigate(initialPath);
    } else {
      // Reset state when closed
      setData(null);
      setFilter("");
      setSelectedIndex(-1);
      setError(null);
    }
  }, [open, initialPath, navigate]);

  // Focus filter input when data loads
  useEffect(() => {
    if (data && filterRef.current) {
      filterRef.current.focus();
    }
  }, [data]);

  const filteredDirs = useMemo(() => {
    if (!data) return [];
    if (!filter) return data.dirs;
    const lower = filter.toLowerCase();
    return data.dirs.filter((d) => d.name.toLowerCase().includes(lower));
  }, [data, filter]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, filteredDirs.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, -1));
      }
      if (e.key === "Enter") {
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < filteredDirs.length) {
          navigate(filteredDirs[selectedIndex].path);
        } else if (data) {
          onSelect(data.current);
        }
      }
      if (e.key === "Backspace" && !filter && data?.parent) {
        navigate(data.parent);
      }
    },
    [filteredDirs, selectedIndex, data, filter, navigate, onClose, onSelect],
  );

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll("[data-dir-item]");
      items[selectedIndex]?.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  if (!open) return null;

  // Build breadcrumb segments from current path
  const breadcrumbs = data
    ? (() => {
        const home = data.current.split("/").slice(0, 3).join("/"); // e.g. /Users/name
        const isHome = data.current === home;
        const afterHome = isHome ? "" : data.current.slice(home.length);
        const segments: Array<{ label: string; path: string }> = [
          { label: "~", path: home },
        ];
        if (afterHome) {
          const parts = afterHome.split("/").filter(Boolean);
          let accumulated = home;
          for (const part of parts) {
            accumulated = `${accumulated}/${part}`;
            segments.push({ label: part, path: accumulated });
          }
        }
        return segments;
      })()
    : [];

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={handleKeyDown}
    >
      {/* Modal */}
      <div className="mx-4 flex max-h-[80vh] w-full max-w-lg flex-col overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <h2 className="text-sm font-semibold text-foreground">Select Project Folder</h2>
          <Button size="icon-xs" variant="ghost" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Breadcrumb */}
        {data && (
          <div className="flex items-center gap-1 overflow-x-auto border-b border-border px-4 py-2">
            {breadcrumbs.map((seg, i) => (
              <span key={seg.path} className="flex items-center gap-1">
                {i > 0 && <ChevronRight className="h-3 w-3 flex-shrink-0 text-muted-foreground" />}
                <button
                  type="button"
                  onClick={() => navigate(seg.path)}
                  className={cn(
                    "whitespace-nowrap rounded px-1.5 py-0.5 text-xs transition-colors hover:bg-accent",
                    i === breadcrumbs.length - 1
                      ? "font-medium text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {seg.label}
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Search / Back bar */}
        <div className="flex items-center gap-2 border-b border-border px-4 py-2">
          {data?.parent && (
            <Button
              size="icon-xs"
              variant="ghost"
              onClick={() => navigate(data.parent!)}
              title="Go to parent directory"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
            </Button>
          )}
          <div className="flex flex-1 items-center gap-2 rounded-md border border-border bg-background px-2 py-1">
            <Search className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground" />
            <input
              ref={filterRef}
              type="text"
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                setSelectedIndex(-1);
              }}
              placeholder="Filter directories..."
              className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            {filter && (
              <button
                type="button"
                onClick={() => {
                  setFilter("");
                  filterRef.current?.focus();
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
        </div>

        {/* Directory list */}
        <div ref={listRef} className="min-h-0 flex-1 overflow-y-auto">
          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          )}

          {error && (
            <div className="px-4 py-8 text-center">
              <p className="text-sm text-destructive">{error}</p>
              <Button size="xs" variant="outline" className="mt-3" onClick={() => navigate(initialPath)}>
                Retry
              </Button>
            </div>
          )}

          {!loading && !error && data && filteredDirs.length === 0 && (
            <div className="px-4 py-8 text-center">
              <Folder className="mx-auto h-8 w-8 text-muted-foreground/40" />
              <p className="mt-2 text-xs text-muted-foreground">
                {filter ? "No matching directories" : "No subdirectories"}
              </p>
            </div>
          )}

          {!loading && !error && data && filteredDirs.length > 0 && (
            <div className="py-1">
              {filteredDirs.map((dir, i) => (
                <div
                  key={dir.path}
                  data-dir-item
                  className={cn(
                    "group flex items-center gap-3 px-4 py-2 transition-colors",
                    i === selectedIndex ? "bg-accent" : "hover:bg-accent/50",
                  )}
                >
                  {/* Icon */}
                  {dir.isGitRepo ? (
                    <FolderGit2 className="h-4 w-4 flex-shrink-0 text-blue-500" />
                  ) : (
                    <Folder className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                  )}

                  {/* Name - click to navigate into */}
                  <button
                    type="button"
                    className={cn(
                      "flex-1 truncate text-left text-xs transition-colors",
                      dir.isGitRepo ? "font-medium text-blue-500" : "text-foreground",
                    )}
                    onClick={() => navigate(dir.path)}
                    onDoubleClick={() => navigate(dir.path)}
                  >
                    {dir.name}
                  </button>

                  {/* Badges */}
                  <div className="flex items-center gap-1.5">
                    {dir.isGitRepo && (
                      <Badge variant="secondary" className="px-1.5 py-0 text-[10px]">
                        git
                      </Badge>
                    )}
                    {dir.hasPackageJson && (
                      <span title="Has package.json">
                        <Package className="h-3 w-3 text-orange-500/70" />
                      </span>
                    )}
                  </div>

                  {/* Select button */}
                  <Button
                    size="icon-xs"
                    variant="ghost"
                    className="opacity-0 transition-opacity group-hover:opacity-100"
                    onClick={() => onSelect(dir.path)}
                    title={`Select ${dir.name}`}
                  >
                    <Check className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {data && (
          <div className="flex items-center justify-between border-t border-border px-4 py-3">
            <div className="flex items-center gap-2 overflow-hidden">
              <FolderOpen className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground" />
              <span className="truncate text-[10px] text-muted-foreground">{data.current}</span>
              {data.isGitRepo && (
                <Badge variant="secondary" className="px-1.5 py-0 text-[10px]">
                  git
                </Badge>
              )}
            </div>
            <Button size="xs" onClick={() => onSelect(data.current)}>
              Select This Folder
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
