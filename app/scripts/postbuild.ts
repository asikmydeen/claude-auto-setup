/**
 * Post-build script for Electrobun packaging.
 * Runs after electrobun build to bundle the Vite-built React UI.
 */
import { execFileSync } from "child_process";
import { cpSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";

const ROOT = dirname(new URL(import.meta.url).pathname).replace("/scripts", "");
const DIST = join(ROOT, "dist");
const VIEWS_UI = join(ROOT, "build", "views", "ui");

console.log("Post-build: Building React UI with Vite...");

// Build the React app
execFileSync("npx", ["vite", "build"], {
  cwd: ROOT,
  stdio: "inherit",
});

// Copy built files to Electrobun views directory
if (existsSync(DIST)) {
  console.log("Post-build: Copying UI to views/ui/...");
  mkdirSync(VIEWS_UI, { recursive: true });
  cpSync(DIST, VIEWS_UI, { recursive: true });
  console.log("Post-build: Done.");
} else {
  console.error("Post-build: dist/ not found after vite build!");
  process.exit(1);
}
