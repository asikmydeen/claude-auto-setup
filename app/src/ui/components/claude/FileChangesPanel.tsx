import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  PanelRightClose,
  PanelRightOpen,
  FilePlus2,
  FileMinus2,
  FileEdit,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { classifyFileChange, cleanFilePath } from "./types";

// ---------------------------------------------------------------------------
// File Changes Panel
// ---------------------------------------------------------------------------

export interface FileChangesPanelProps {
  sessionFiles: string[];
  uncommittedFiles: string[];
  cwd: string;
  isOpen: boolean;
  onToggle: () => void;
}

export function FileChangesPanel({
  sessionFiles,
  uncommittedFiles,
  cwd,
  isOpen,
  onToggle,
}: FileChangesPanelProps) {
  const [sessionExpanded, setSessionExpanded] = useState(true);
  const [uncommittedExpanded, setUncommittedExpanded] = useState(true);

  const hasSessionFiles = sessionFiles.length > 0;
  const hasUncommittedFiles = uncommittedFiles.length > 0;

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={onToggle}
        className="absolute right-2 top-2 z-10 rounded-lg border border-border bg-card p-1.5 shadow-sm hover:bg-accent transition-colors"
        title="Show file changes"
      >
        <PanelRightOpen className="h-4 w-4 text-muted-foreground" />
        {(hasSessionFiles || hasUncommittedFiles) && (
          <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary text-[8px] font-bold text-primary-foreground">
            {sessionFiles.length + uncommittedFiles.length}
          </span>
        )}
      </button>
    );
  }

  return (
    <div className="flex w-64 flex-shrink-0 flex-col border-l border-border bg-card/50">
      <div className="flex items-center justify-between border-b border-border px-3 py-2.5">
        <span className="text-xs font-semibold text-foreground">File Changes</span>
        <Button size="icon-xs" variant="ghost" onClick={onToggle} title="Close panel">
          <PanelRightClose className="h-3.5 w-3.5" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {!hasSessionFiles && !hasUncommittedFiles && (
          <p className="px-3 py-6 text-center text-xs text-muted-foreground">
            No file changes detected
          </p>
        )}

        {/* Session files */}
        {hasSessionFiles && (
          <div>
            <button
              type="button"
              onClick={() => setSessionExpanded(!sessionExpanded)}
              className="flex w-full items-center gap-1.5 px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              {sessionExpanded ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
              Session Changes
              <Badge variant="outline" className="ml-auto text-[9px] px-1 py-0">
                {sessionFiles.length}
              </Badge>
            </button>
            {sessionExpanded && (
              <div className="px-2 pb-2 space-y-0.5">
                {sessionFiles.map((file) => (
                  <FileChangeItem key={file} filepath={file} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Uncommitted files */}
        {hasUncommittedFiles && (
          <div>
            <button
              type="button"
              onClick={() => setUncommittedExpanded(!uncommittedExpanded)}
              className="flex w-full items-center gap-1.5 px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              {uncommittedExpanded ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
              Uncommitted
              <Badge variant="outline" className="ml-auto text-[9px] px-1 py-0">
                {uncommittedFiles.length}
              </Badge>
            </button>
            {uncommittedExpanded && (
              <div className="px-2 pb-2 space-y-0.5">
                {uncommittedFiles.map((file) => (
                  <FileChangeItem key={file} filepath={file} isGitStatus />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {cwd && (
        <div className="border-t border-border px-3 py-2">
          <p className="truncate text-[9px] text-muted-foreground" title={cwd}>
            {cwd}
          </p>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// File Change Item
// ---------------------------------------------------------------------------

export function FileChangeItem({
  filepath,
  isGitStatus,
}: {
  filepath: string;
  isGitStatus?: boolean;
}) {
  const changeType = isGitStatus ? classifyFileChange(filepath) : "modified";
  const displayPath = isGitStatus ? cleanFilePath(filepath) : filepath;
  const filename = displayPath.split("/").pop() || displayPath;
  const dir = displayPath.includes("/")
    ? displayPath.slice(0, displayPath.lastIndexOf("/"))
    : "";

  const iconMap = {
    added: <FilePlus2 className="h-3 w-3 text-green-500" />,
    modified: <FileEdit className="h-3 w-3 text-yellow-500" />,
    deleted: <FileMinus2 className="h-3 w-3 text-red-500" />,
  };

  const colorMap = {
    added: "text-green-600 dark:text-green-400",
    modified: "text-yellow-600 dark:text-yellow-400",
    deleted: "text-red-600 dark:text-red-400",
  };

  return (
    <div
      className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs hover:bg-accent/50 transition-colors cursor-default"
      title={displayPath}
    >
      {iconMap[changeType]}
      <span className={cn("truncate", colorMap[changeType])}>
        {filename}
      </span>
      {dir && (
        <span className="ml-auto truncate text-[9px] text-muted-foreground max-w-[80px]">
          {dir}
        </span>
      )}
    </div>
  );
}
