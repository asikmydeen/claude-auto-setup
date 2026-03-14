import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/context/ThemeContext";
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

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <div className="h-screen overflow-hidden">
          <Claude onOpenSettings={() => setSettingsOpen(true)} />
          <SettingsDrawer open={settingsOpen} onClose={() => setSettingsOpen(false)} />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
