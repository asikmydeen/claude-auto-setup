import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/context/SidebarContext";
import { useTheme } from "@/context/ThemeContext";
import {
  MessageSquare,
  Settings2,
  Boxes,
  Shield,
  Sun,
  Moon,
  PanelLeftClose,
  PanelLeft,
  Sparkles,
  Download,
  RefreshCw,
  Stethoscope,
  Eye,
  Loader2,
  ChevronDown,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { runInstall, type InstallResponse } from "@/api/config";

const navItems = [
  { to: "/", icon: MessageSquare, label: "Chat" },
  { to: "/settings", icon: Settings2, label: "Settings" },
  { to: "/providers", icon: Boxes, label: "Providers" },
  { to: "/rules", icon: Shield, label: "Rules" },
];

const quickActions = [
  { label: "Install", icon: Download, iconColor: "text-blue-500", flags: [] as string[] },
  { label: "Update", icon: RefreshCw, iconColor: "text-green-500", flags: ["--update"] },
  { label: "Health Check", icon: Stethoscope, iconColor: "text-purple-500", flags: ["--doctor"] },
  { label: "Dry Run", icon: Eye, iconColor: "text-amber-500", flags: ["--dry-run"] },
];

function QuickActionItem({
  label,
  icon: Icon,
  iconColor,
  flags,
  collapsed,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  flags: string[];
  collapsed: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation<InstallResponse, Error, string[]>({
    mutationFn: (f: string[]) => runInstall(f),
    onSuccess: (data) => {
      setOutput(data.output || "");
      if (data.error) setError(data.error);
      setExpanded(true);
    },
    onError: (err) => {
      setError(err.message);
      setExpanded(true);
    },
  });

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          if (output !== null) {
            setExpanded(!expanded);
          } else {
            mutation.mutate(flags);
          }
        }}
        disabled={mutation.isPending}
        title={collapsed ? label : undefined}
        className={cn(
          "flex w-full items-center gap-3 rounded-md px-2.5 py-2 text-sm font-medium transition-colors",
          "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          "text-sidebar-foreground/70 disabled:opacity-50",
          collapsed && "justify-center px-2"
        )}
      >
        {mutation.isPending ? (
          <Loader2 className="h-4 w-4 animate-spin flex-shrink-0" />
        ) : (
          <Icon className={cn("h-4 w-4 flex-shrink-0", iconColor)} />
        )}
        {!collapsed && (
          <>
            <span className="truncate flex-1 text-left">{label}</span>
            {output !== null && (
              expanded ? (
                <ChevronDown className="h-3 w-3 flex-shrink-0 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-3 w-3 flex-shrink-0 text-muted-foreground" />
              )
            )}
          </>
        )}
      </button>

      {!collapsed && expanded && (output !== null || error !== null) && (
        <div className="mx-2 mb-1 rounded-md border border-border bg-background p-2">
          {error && (
            <div className="mb-1.5 flex items-center gap-1.5 text-xs text-destructive">
              <AlertCircle className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">{error}</span>
            </div>
          )}
          {output !== null && (
            <pre className="max-h-[100px] overflow-auto rounded bg-[#0d1117] p-2 text-[10px] leading-relaxed text-gray-400">
              {output || "(no output)"}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}

export function Sidebar() {
  const { sidebarOpen, toggleSidebar, isMobile, setSidebarOpen } = useSidebar();
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        className={cn(
          "flex flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border",
          "transition-all duration-200 ease-in-out",
          isMobile
            ? cn("fixed inset-y-0 left-0 z-50 w-60", sidebarOpen ? "translate-x-0" : "-translate-x-full")
            : cn(sidebarOpen ? "w-60" : "w-14")
        )}
      >
        {/* Header */}
        <div className="flex items-center h-14 px-3 gap-2">
          {sidebarOpen && (
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <Sparkles className="h-5 w-5 text-sidebar-primary flex-shrink-0" />
              <span className="text-sm font-semibold truncate">Claude Auto Setup</span>
            </div>
          )}
          <Button variant="ghost" size="icon-sm" onClick={toggleSidebar} className="flex-shrink-0">
            {sidebarOpen ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeft className="h-4 w-4" />}
          </Button>
        </div>

        <Separator />

        {/* Navigation */}
        <nav className="py-2 px-2 space-y-0.5">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              onClick={() => isMobile && setSidebarOpen(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-md px-2.5 py-2 text-sm font-medium transition-colors",
                  "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70",
                  !sidebarOpen && "justify-center px-2"
                )
              }
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              {sidebarOpen && <span className="truncate">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <Separator />

        {/* Quick Actions */}
        <div className="flex-1 py-2 px-2 space-y-0.5 overflow-y-auto">
          {sidebarOpen && (
            <p className="px-2.5 pb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Quick Actions
            </p>
          )}
          {quickActions.map((action) => (
            <QuickActionItem
              key={action.label}
              {...action}
              collapsed={!sidebarOpen}
            />
          ))}
        </div>

        <Separator />

        {/* Footer */}
        <div className="p-2">
          <Button
            variant="ghost"
            size={sidebarOpen ? "sm" : "icon-sm"}
            onClick={toggleTheme}
            className={cn("w-full", sidebarOpen ? "justify-start gap-2" : "")}
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            {sidebarOpen && <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>}
          </Button>
        </div>
      </aside>
    </>
  );
}
