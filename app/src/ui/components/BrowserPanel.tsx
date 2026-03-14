import { useState, useRef, useEffect, useCallback } from "react";
import {
  Globe,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  X,
  ExternalLink,
  Loader2,
  GripVertical,
  Smartphone,
  Monitor,
  Tablet,
  Wifi,
  WifiOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BrowserPanelProps {
  open: boolean;
  onClose: () => void;
  cwd: string;
  initialUrl?: string | null;
  building?: boolean;
}

const MIN_WIDTH = 320;
const MAX_WIDTH = 1200;
const DEFAULT_WIDTH = 520;
const COMMON_PORTS = [3000, 3001, 4200, 5173, 5174, 8000, 8080, 8888, 4321, 3201];

const DEVICE_PRESETS = [
  { label: "Desktop", icon: Monitor, width: 0 },
  { label: "Tablet", icon: Tablet, width: 768 },
  { label: "Mobile", icon: Smartphone, width: 375 },
];

function isLocalUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return u.hostname === "localhost" || u.hostname === "127.0.0.1";
  } catch { return false; }
}

export function BrowserPanel({ open, onClose, cwd, initialUrl, building }: BrowserPanelProps) {
  const [currentUrl, setCurrentUrl] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [panelWidth, setPanelWidth] = useState(() => {
    try { return parseInt(localStorage.getItem("browserPanelWidth") || "", 10) || DEFAULT_WIDTH; }
    catch { return DEFAULT_WIDTH; }
  });
  const [deviceWidth, setDeviceWidth] = useState(0);
  const [detectedPorts, setDetectedPorts] = useState<number[]>([]);
  const [scanning, setScanning] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const resizeRef = useRef<{ startX: number; startWidth: number } | null>(null);

  // Scan for running local servers
  const scanPorts = useCallback(async () => {
    setScanning(true);
    const alive: number[] = [];
    await Promise.all(
      COMMON_PORTS.map(async (port) => {
        try {
          const resp = await fetch(`http://localhost:${port}/`, {
            method: "HEAD",
            signal: AbortSignal.timeout(800),
          });
          if (resp.ok || resp.status === 304 || resp.status === 404) {
            alive.push(port);
          }
        } catch {}
      })
    );
    alive.sort((a, b) => a - b);
    setDetectedPorts(alive);
    setScanning(false);

    // Auto-navigate to first found port if nothing loaded yet
    if (alive.length > 0 && !currentUrl) {
      navigateTo(`http://localhost:${alive[0]}`);
    }
  }, [currentUrl]);

  // Scan on mount and cwd change
  useEffect(() => {
    scanPorts();
  }, [cwd]); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle initialUrl
  useEffect(() => {
    if (initialUrl) {
      if (isLocalUrl(initialUrl)) {
        navigateTo(initialUrl);
      } else {
        // External URL — open in system browser
        fetch("/api/browser/open-external", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: initialUrl }),
        }).catch(() => window.open(initialUrl, "_blank"));
      }
    }
  }, [initialUrl]);

  // Persist width
  useEffect(() => {
    localStorage.setItem("browserPanelWidth", String(panelWidth));
  }, [panelWidth]);

  function navigateTo(url: string) {
    setCurrentUrl(url);
    setUrlInput(url);
    setIsLoading(true);
    setHistory(prev => [...prev.slice(0, historyIdx + 1), url]);
    setHistoryIdx(prev => prev + 1);
  }

  function handleUrlSubmit() {
    let url = urlInput.trim();
    if (!url) return;

    // Port number shorthand
    if (/^\d{2,5}$/.test(url)) {
      navigateTo(`http://localhost:${url}`);
      return;
    }
    // localhost shorthand
    if (/^localhost(:\d+)?/.test(url)) {
      navigateTo(`http://${url}`);
      return;
    }
    if (/^127\.0\.0\.1(:\d+)?/.test(url)) {
      navigateTo(`http://${url}`);
      return;
    }
    // Full URL — check if local
    if (url.startsWith("http://") || url.startsWith("https://")) {
      if (isLocalUrl(url)) {
        navigateTo(url);
      } else {
        // External — open in system browser
        fetch("/api/browser/open-external", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        }).catch(() => window.open(url, "_blank"));
      }
      return;
    }
    // Assume it's a search or external URL
    const fullUrl = url.includes(".") ? `https://${url}` : `https://www.google.com/search?q=${encodeURIComponent(url)}`;
    fetch("/api/browser/open-external", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: fullUrl }),
    }).catch(() => window.open(fullUrl, "_blank"));
  }

  const goBack = () => {
    if (historyIdx > 0) {
      const idx = historyIdx - 1;
      setHistoryIdx(idx);
      setCurrentUrl(history[idx]);
      setUrlInput(history[idx]);
      setIsLoading(true);
    }
  };

  const goForward = () => {
    if (historyIdx < history.length - 1) {
      const idx = historyIdx + 1;
      setHistoryIdx(idx);
      setCurrentUrl(history[idx]);
      setUrlInput(history[idx]);
      setIsLoading(true);
    }
  };

  // Resize
  const handleResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    resizeRef.current = { startX: e.clientX, startWidth: panelWidth };
    const handleMove = (ev: MouseEvent) => {
      if (!resizeRef.current) return;
      const diff = resizeRef.current.startX - ev.clientX;
      setPanelWidth(Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, resizeRef.current.startWidth + diff)));
    };
    const handleUp = () => {
      resizeRef.current = null;
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleUp);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  }, [panelWidth]);

  if (!open) return null;

  const hasUrl = !!currentUrl;

  return (
    <div className="flex h-full shrink-0" style={{ width: panelWidth }}>
      {/* Resize handle */}
      <div
        className="w-1 cursor-col-resize hover:bg-primary/30 active:bg-primary/50 transition-colors flex items-center justify-center group"
        onMouseDown={handleResizeStart}
      >
        <GripVertical className="h-4 w-4 text-muted-foreground/30 group-hover:text-muted-foreground transition-colors" />
      </div>

      <div className="flex flex-1 flex-col border-l border-border bg-background overflow-hidden">
        {/* Nav bar */}
        <div className="flex items-center gap-0.5 border-b border-border px-1.5 py-1">
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={goBack} disabled={historyIdx <= 0}>
            <ArrowLeft className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={goForward} disabled={historyIdx >= history.length - 1}>
            <ArrowRight className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => { if (currentUrl) { setIsLoading(true); iframeRef.current?.contentWindow?.location.reload(); } }}>
            {isLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <RotateCcw className="h-3 w-3" />}
          </Button>

          {/* URL bar */}
          <div className="flex flex-1 items-center gap-1 rounded border border-input bg-muted/30 px-2 py-0.5 mx-0.5">
            <Globe className="h-2.5 w-2.5 text-muted-foreground shrink-0" />
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleUrlSubmit()}
              onFocus={(e) => e.target.select()}
              className="flex-1 bg-transparent text-[10px] font-mono outline-none placeholder:text-muted-foreground min-w-0"
              placeholder="localhost:3000 or port number..."
            />
          </div>

          {/* Device presets */}
          {DEVICE_PRESETS.map((d) => (
            <Button
              key={d.label}
              variant="ghost"
              size="sm"
              className={cn("h-6 w-6 p-0", deviceWidth === d.width && "bg-accent")}
              onClick={() => setDeviceWidth(d.width)}
              title={d.label}
            >
              <d.icon className="h-3 w-3" />
            </Button>
          ))}

          {currentUrl && (
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => window.open(currentUrl, "_blank")} title="Open in system browser">
              <ExternalLink className="h-3 w-3" />
            </Button>
          )}
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={onClose}>
            <X className="h-3 w-3" />
          </Button>
        </div>

        {/* Port bar — detected local servers */}
        <div className="flex items-center gap-1 border-b border-border px-2 py-1 overflow-x-auto">
          <span className="text-[9px] text-muted-foreground shrink-0">Servers:</span>
          {scanning && <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />}
          {detectedPorts.map((port) => (
            <button
              key={port}
              type="button"
              onClick={() => navigateTo(`http://localhost:${port}`)}
              className={cn(
                "flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-mono whitespace-nowrap transition-colors",
                currentUrl === `http://localhost:${port}`
                  ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              )}
            >
              <Wifi className="h-2.5 w-2.5 text-green-500" />
              :{port}
            </button>
          ))}
          {detectedPorts.length === 0 && !scanning && (
            <span className="text-[9px] text-muted-foreground/60 flex items-center gap-1">
              <WifiOff className="h-2.5 w-2.5" /> No local servers detected
            </span>
          )}
          <Button variant="ghost" size="sm" className="h-5 px-1 ml-auto shrink-0" onClick={scanPorts} disabled={scanning} title="Rescan ports">
            <RotateCcw className={cn("h-2.5 w-2.5", scanning && "animate-spin")} />
          </Button>
        </div>

        {/* Loading indicator */}
        {isLoading && (
          <div className="h-0.5 bg-primary/20 relative overflow-hidden shrink-0">
            <div className="h-full w-1/3 bg-primary absolute animate-pulse" />
          </div>
        )}

        {/* Content area */}
        <div className="flex-1 relative overflow-hidden flex items-start justify-center bg-zinc-100 dark:bg-zinc-900">
          {hasUrl ? (
            <iframe
              ref={iframeRef}
              key={currentUrl}
              src={currentUrl}
              onLoad={() => setIsLoading(false)}
              onError={() => setIsLoading(false)}
              className="border-0 h-full bg-white"
              style={{
                width: deviceWidth > 0 ? deviceWidth : "100%",
                maxWidth: "100%",
                ...(deviceWidth > 0 ? { boxShadow: "0 0 0 1px rgba(0,0,0,0.1)", borderRadius: 4 } : {}),
              }}
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-downloads allow-modals"
              title="App Preview"
            />
          ) : building ? (
            /* Building animation */
            <div className="flex flex-col items-center justify-center h-full text-center px-6 gap-5">
              <div className="relative">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Loader2 className="h-8 w-8 text-primary animate-spin" />
                </div>
                <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-yellow-500 flex items-center justify-center animate-bounce">
                  <span className="text-[10px]">🔨</span>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold">Building your project...</p>
                <p className="text-xs text-muted-foreground max-w-[260px]">
                  Claude is creating files, installing dependencies, and setting up your app. The preview will appear automatically when ready.
                </p>
              </div>
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-1.5 w-6 rounded-full bg-primary/20 overflow-hidden"
                  >
                    <div
                      className="h-full bg-primary rounded-full animate-pulse"
                      style={{ animationDelay: `${i * 200}ms`, width: "60%" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Empty state — no URL loaded */
            <div className="flex flex-col items-center justify-center h-full text-center px-6 gap-4">
              <Globe className="h-12 w-12 text-muted-foreground/30" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">App Preview</p>
                <p className="text-xs text-muted-foreground/70 max-w-[240px]">
                  {detectedPorts.length > 0
                    ? "Click a port above to preview your running app"
                    : "Start a dev server (npm run dev) then click rescan to detect it"}
                </p>
              </div>
              {detectedPorts.length === 0 && (
                <div className="space-y-1.5 text-[10px] text-muted-foreground/60">
                  <p>Or enter a port / URL directly:</p>
                  <div className="flex gap-1 justify-center">
                    {[3000, 5173, 8080].map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => navigateTo(`http://localhost:${p}`)}
                        className="rounded border border-border px-2 py-0.5 font-mono hover:bg-accent transition-colors"
                      >
                        :{p}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between border-t border-border px-2 py-0.5 text-[9px] text-muted-foreground">
          <span className="truncate max-w-[70%] font-mono">{currentUrl || "No URL"}</span>
          <span>{panelWidth}px{deviceWidth > 0 ? ` · ${deviceWidth}px` : ""}</span>
        </div>
      </div>
    </div>
  );
}
