import { BrowserWindow, Tray, ApplicationMenu } from "electrobun/bun";

// Start the Express API server (serves both API + built React UI in production)
import "../server/index.js";

const API_PORT = 3201;
const UI_URL = `http://localhost:${API_PORT}`;

// Wait for server to be ready, then open window
async function waitForServer(url: string, maxWait = 10000): Promise<void> {
  const start = Date.now();
  while (Date.now() - start < maxWait) {
    try {
      const res = await fetch(`${url}/api/health`);
      if (res.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 200));
  }
  console.warn("Server did not start in time, opening window anyway");
}

async function main() {
  await waitForServer(UI_URL);

  // Set up native application menu with Edit menu (required for Cmd+C/V/X to work in WKWebView)
  ApplicationMenu.setApplicationMenu([
    {
      label: "Sidekick",
      submenu: [
        { role: "about" },
        { type: "divider" },
        { role: "hide" },
        { role: "hideOthers" },
        { role: "showAll" },
        { type: "divider" },
        { role: "quit" },
      ],
    },
    {
      label: "Edit",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "divider" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        { role: "pasteAndMatchStyle" },
        { role: "delete" },
        { role: "selectAll" },
      ],
    },
    {
      label: "View",
      submenu: [
        { role: "toggleFullScreen" },
      ],
    },
    {
      label: "Window",
      submenu: [
        { role: "minimize" },
        { role: "zoom" },
        { role: "close" },
        { type: "divider" },
        { role: "bringAllToFront" },
      ],
    },
  ]);

  // Main application window
  const win = new BrowserWindow({
    title: "Sidekick",
    url: UI_URL,
    frame: {
      width: 1400,
      height: 900,
      x: 100,
      y: 100,
    },
  });

  // System tray
  try {
    const tray = new Tray({
      title: "Sidekick",
      template: true,
      width: 22,
      height: 22,
    });

    tray.setMenu([
      { type: "normal", label: "Open Dashboard", action: "open" },
      { type: "normal", label: "Launch Claude Session", action: "launch-claude" },
      { type: "divider" },
      { type: "normal", label: "Settings", action: "settings" },
      { type: "normal", label: "Quit", action: "quit" },
    ]);

    tray.on("tray-clicked", (e: unknown) => {
      const { action } = (e as { data: { action: string } }).data;
      switch (action) {
        case "quit":
          process.exit(0);
      }
    });
  } catch {
    // Tray may not be available in all environments
    console.log("System tray not available");
  }

  console.log(`Sidekick running — ${UI_URL}`);
}

main();
