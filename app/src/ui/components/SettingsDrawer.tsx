import { useState } from "react";
import { Settings2, Boxes, Shield, Plug, Brain, Database, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Settings } from "@/pages/Settings";
import { Providers } from "@/pages/Providers";
import { Rules } from "@/pages/Rules";
import { Integrations } from "@/pages/Integrations";
import { AIProviders } from "@/components/AIProviders";
import { MemoryPanel } from "@/components/MemoryPanel";

interface SettingsDrawerProps {
  open: boolean;
  onClose: () => void;
}

const tabs = [
  { id: "settings", label: "Settings", icon: Settings2 },
  { id: "ai-models", label: "AI Models", icon: Brain },
  { id: "providers", label: "Providers", icon: Boxes },
  { id: "memory", label: "Memory", icon: Database },
  { id: "rules", label: "Rules", icon: Shield },
  { id: "integrations", label: "Integrations", icon: Plug },
] as const;

type TabId = typeof tabs[number]["id"];

export function SettingsDrawer({ open, onClose }: SettingsDrawerProps) {
  const [activeTab, setActiveTab] = useState<TabId>("settings");

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-full max-w-2xl flex-col bg-background shadow-2xl transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header with tabs */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  activeTab === tab.id
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                )}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
          <Button variant="ghost" size="icon-sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content — scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === "settings" && <Settings />}
          {activeTab === "ai-models" && <AIProviders />}
          {activeTab === "providers" && <Providers />}
          {activeTab === "memory" && <MemoryPanel />}
          {activeTab === "rules" && <Rules />}
          {activeTab === "integrations" && <Integrations />}
        </div>
      </div>
    </>
  );
}
