import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/context/ThemeContext";
import { SidebarProvider } from "@/context/SidebarContext";
import { Layout } from "@/components/Layout";
import { Claude } from "@/pages/Claude";
import { Settings } from "@/pages/Settings";
import { Providers } from "@/pages/Providers";
import { Rules } from "@/pages/Rules";

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
                <Route index element={<Claude />} />
                <Route path="settings" element={<Settings />} />
                <Route path="providers" element={<Providers />} />
                <Route path="rules" element={<Rules />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </SidebarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
