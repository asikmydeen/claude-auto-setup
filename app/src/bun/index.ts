import { BrowserWindow, Tray } from "electrobun/bun";

// Start the Express API server
import "../../src/server/index.js";

const isDev = process.env.NODE_ENV !== "production";
const UI_URL = isDev ? "http://localhost:5173" : "http://localhost:3201";

// Main application window
const win = new BrowserWindow({
  title: "Claude Auto Setup",
  url: UI_URL,
  frame: {
    width: 1400,
    height: 900,
    x: 100,
    y: 100,
  },
});

// System tray
const tray = new Tray({
  title: "Claude Auto Setup",
  image: "views://assets/icon-template.png",
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

tray.on("tray-clicked", (e: { data: { action: string } }) => {
  const { action } = e.data;
  switch (action) {
    case "open":
      // Focus the window
      break;
    case "launch-claude":
      // Could trigger a Claude session via the API
      fetch("http://localhost:3201/api/claude/launch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: "" }),
      }).catch(() => {});
      break;
    case "settings":
      // Navigate to settings page
      break;
    case "quit":
      process.exit(0);
  }
});

console.log(`Claude Auto Setup running — UI at ${UI_URL}`);
