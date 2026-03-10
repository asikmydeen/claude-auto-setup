import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/context/ThemeContext";
import { SidebarProvider } from "@/context/SidebarContext";
import { Layout } from "@/components/Layout";
import { Dashboard } from "@/pages/Dashboard";
import { Agents } from "@/pages/Agents";
import { Sessions } from "@/pages/Sessions";
import { ActivityPage } from "@/pages/ActivityPage";
import { Skills } from "@/pages/Skills";
import { DesignGuide } from "@/pages/DesignGuide";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      refetchOnWindowFocus: true,
    },
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <SidebarProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="agents" element={<Agents />} />
                <Route path="sessions" element={<Sessions />} />
                <Route path="activity" element={<ActivityPage />} />
                <Route path="skills" element={<Skills />} />
                <Route path="design-guide" element={<DesignGuide />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </SidebarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
