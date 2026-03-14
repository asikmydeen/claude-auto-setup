import { useState, useCallback } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/context/ThemeContext";
import { LinkProvider } from "@/context/LinkContext";
import { ToastProvider } from "@/components/Toast";
import { Claude } from "@/pages/Claude";
import { SettingsDrawer } from "@/components/SettingsDrawer";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      refetchOnWindowFocus: true,
    },
  },
});

export function App() {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleOpenInBrowser = useCallback((url: string) => {
    window.dispatchEvent(new CustomEvent("open-in-browser", { detail: { url } }));
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ToastProvider>
          <LinkProvider onOpenInBrowser={handleOpenInBrowser}>
            <div className="h-screen overflow-hidden">
              <Claude onOpenSettings={() => setSettingsOpen(true)} />
              <SettingsDrawer open={settingsOpen} onClose={() => setSettingsOpen(false)} />
            </div>
          </LinkProvider>
        </ToastProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
