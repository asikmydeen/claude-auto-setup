import { createContext, useContext, useEffect, useCallback } from "react";

interface LinkContextValue {
  openLink: (url: string) => void;
}

const LinkContext = createContext<LinkContextValue>({ openLink: () => {} });

export function useLinkHandler() {
  return useContext(LinkContext);
}

interface LinkProviderProps {
  children: React.ReactNode;
  onOpenInBrowser?: (url: string) => void;
}

function isLocalUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return u.hostname === "localhost" || u.hostname === "127.0.0.1";
  } catch { return false; }
}

function openExternal(url: string) {
  fetch("/api/browser/open-external", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  }).catch(() => {
    window.open(url, "_blank");
  });
}

export function LinkProvider({ children, onOpenInBrowser }: LinkProviderProps) {
  const openLink = useCallback((url: string) => {
    if (isLocalUrl(url)) {
      // Local URLs → open in built-in browser panel
      onOpenInBrowser?.(url);
    } else {
      // External URLs → always open in system browser (proxy is unreliable for SPAs)
      openExternal(url);
    }
  }, [onOpenInBrowser]);

  // Intercept ALL <a> clicks with external/local URLs
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Skip in-app navigation
      if (href.startsWith("#") || href.startsWith("javascript:") || href.startsWith("/")) return;

      if (href.startsWith("http://") || href.startsWith("https://")) {
        e.preventDefault();
        e.stopPropagation();
        openLink(href);
      }
    }
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [openLink]);

  return (
    <LinkContext.Provider value={{ openLink }}>
      {children}
    </LinkContext.Provider>
  );
}
