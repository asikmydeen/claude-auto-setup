import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/context/SidebarContext";
import { useTheme } from "@/context/ThemeContext";
import {
  LayoutDashboard,
  Bot,
  Activity,
  Palette,
  FileText,
  Network,
  Sun,
  Moon,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/agents", icon: Bot, label: "Agents" },
  { to: "/sessions", icon: Network, label: "Sessions" },
  { to: "/activity", icon: Activity, label: "Activity" },
  { to: "/skills", icon: FileText, label: "Skills" },
  { to: "/design-guide", icon: Palette, label: "Design Guide" },
];

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
              <Bot className="h-5 w-5 text-sidebar-primary flex-shrink-0" />
              <span className="text-sm font-semibold truncate">Agent Dashboard</span>
            </div>
          )}
          <Button variant="ghost" size="icon-sm" onClick={toggleSidebar} className="flex-shrink-0">
            {sidebarOpen ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeft className="h-4 w-4" />}
          </Button>
        </div>

        <Separator />

        {/* Navigation */}
        <nav className="flex-1 py-2 px-2 space-y-0.5 overflow-y-auto">
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
