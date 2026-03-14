import { useState, useCallback, createContext, useContext } from "react";
import { Check, X, AlertCircle, Info, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "info" | "loading";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType, duration?: number) => string;
  dismiss: (id: string) => void;
  update: (id: string, message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue>({
  toast: () => "",
  dismiss: () => {},
  update: () => {},
});

export function useToast() {
  return useContext(ToastContext);
}

let nextId = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, type: ToastType = "info", duration = 3000): string => {
    const id = `toast-${nextId++}`;
    setToasts(prev => [...prev, { id, message, type, duration }]);
    if (type !== "loading" && duration > 0) {
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), duration);
    }
    return id;
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const update = useCallback((id: string, message: string, type?: ToastType) => {
    setToasts(prev => prev.map(t => t.id === id ? { ...t, message, type: type || t.type } : t));
    // Auto-dismiss after update if not loading
    if (type && type !== "loading") {
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
    }
  }, []);

  return (
    <ToastContext.Provider value={{ toast, dismiss, update }}>
      {children}
      {/* Toast container — bottom-right */}
      {toasts.length > 0 && (
        <div className="fixed bottom-4 right-4 z-[200] flex flex-col gap-2 max-w-sm">
          {toasts.map((t) => (
            <div
              key={t.id}
              className={cn(
                "flex items-center gap-2.5 rounded-lg border px-3.5 py-2.5 text-sm shadow-lg animate-in slide-in-from-right-5 fade-in duration-200",
                t.type === "success" && "border-green-600/30 bg-green-50 dark:bg-green-950/80 text-green-800 dark:text-green-200",
                t.type === "error" && "border-red-600/30 bg-red-50 dark:bg-red-950/80 text-red-800 dark:text-red-200",
                t.type === "info" && "border-border bg-background text-foreground",
                t.type === "loading" && "border-blue-600/30 bg-blue-50 dark:bg-blue-950/80 text-blue-800 dark:text-blue-200",
              )}
            >
              {t.type === "success" && <Check className="h-4 w-4 shrink-0" />}
              {t.type === "error" && <AlertCircle className="h-4 w-4 shrink-0" />}
              {t.type === "info" && <Info className="h-4 w-4 shrink-0" />}
              {t.type === "loading" && <Loader2 className="h-4 w-4 shrink-0 animate-spin" />}
              <span className="flex-1 text-xs">{t.message}</span>
              <button type="button" onClick={() => dismiss(t.id)} className="shrink-0 opacity-50 hover:opacity-100">
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </ToastContext.Provider>
  );
}
