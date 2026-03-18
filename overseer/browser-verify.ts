// SDLC Overseer — Browser Verification Module
// Runs after code is merged. Starts a dev server, opens cmux browser,
// and verifies UI elements against acceptance criteria.

import { spawn, type ChildProcess } from "child_process";
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { canUseCmux, verifyUI, sidebarLog, notify, type UIVerificationResult } from "./cmux";

interface VerifyOptions {
  projectRoot: string;
  epicId: string;
  checks?: Array<{ name: string; type: "visible" | "text" | "title" | "count"; selector?: string; expected?: string }>;
}

/**
 * Detect if the project is a web project that can be served.
 */
function detectWebProject(projectRoot: string): { isWeb: boolean; startCmd: string[]; port: number } {
  // Check for index.html (static site — use python http.server)
  if (existsSync(join(projectRoot, "index.html"))) {
    return { isWeb: true, startCmd: ["python3", "-m", "http.server", "8765"], port: 8765 };
  }

  // Check package.json for start script
  const pkgPath = join(projectRoot, "package.json");
  if (existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
      if (pkg.scripts?.dev) return { isWeb: true, startCmd: ["npm", "run", "dev"], port: 3000 };
      if (pkg.scripts?.start) return { isWeb: true, startCmd: ["npm", "start"], port: 3000 };
    } catch { /* not valid JSON */ }
  }

  return { isWeb: false, startCmd: [], port: 0 };
}

/**
 * Extract UI checks from acceptance criteria in stories/tasks.
 */
function extractChecksFromRequirements(projectRoot: string): Array<{ name: string; type: "visible" | "text" | "title" | "count"; selector?: string; expected?: string }> {
  const checks: Array<{ name: string; type: "visible" | "text" | "title" | "count"; selector?: string; expected?: string }> = [];

  // Read REQUIREMENTS.md for UI-related requirements
  const reqPath = join(projectRoot, ".overseer", "REQUIREMENTS.md");
  if (existsSync(reqPath)) {
    const content = readFileSync(reqPath, "utf-8");

    // Look for element references in acceptance criteria
    if (content.includes("heading") || content.includes("<h1>") || content.includes("greeting")) {
      checks.push({ name: "Heading visible", type: "visible", selector: "h1" });
      checks.push({ name: "Heading has text", type: "text", selector: "h1" });
    }
    if (content.includes("button")) {
      checks.push({ name: "Button visible", type: "visible", selector: "button" });
      checks.push({ name: "Button has text", type: "text", selector: "button" });
    }
    if (content.includes("form") || content.includes("input")) {
      checks.push({ name: "Form inputs exist", type: "count", selector: "input" });
    }
    if (content.includes("link") || content.includes("navigation")) {
      checks.push({ name: "Links exist", type: "count", selector: "a" });
    }
  }

  // Always check: page has a title, no blank page
  checks.push({ name: "Page has title", type: "title" });

  return checks;
}

/**
 * Start a dev server, wait for it, then run UI verification.
 * Returns the verification result and cleans up the server.
 */
export async function runBrowserVerification(opts: VerifyOptions): Promise<UIVerificationResult | null> {
  if (!canUseCmux()) {
    return null; // cmux not available — skip browser verification
  }

  const webInfo = detectWebProject(opts.projectRoot);
  if (!webInfo.isWeb) {
    sidebarLog("Not a web project — skipping browser verification", "info");
    return null;
  }

  sidebarLog("Starting dev server for UI verification...", "progress");

  // Start the dev server
  let server: ChildProcess | null = null;
  try {
    server = spawn(webInfo.startCmd[0], webInfo.startCmd.slice(1), {
      cwd: opts.projectRoot,
      stdio: "ignore",
      detached: true,
    });

    // Wait for server to be ready (simple polling)
    const url = `http://localhost:${webInfo.port}`;
    let ready = false;
    for (let i = 0; i < 15; i++) {
      await new Promise(r => setTimeout(r, 1000));
      try {
        const resp = await fetch(url);
        if (resp.ok) { ready = true; break; }
      } catch { /* not ready yet */ }
    }

    if (!ready) {
      sidebarLog("Dev server failed to start — skipping browser verification", "warning");
      return null;
    }

    sidebarLog(`Dev server ready at ${url}`, "success");

    // Determine checks
    const checks = opts.checks || extractChecksFromRequirements(opts.projectRoot);

    // Create screenshot directory
    const ssDir = join(opts.projectRoot, ".overseer", "screenshots");
    if (!existsSync(ssDir)) mkdirSync(ssDir, { recursive: true });

    // Run verification
    const result = verifyUI(url, checks, ssDir);

    // Write report
    const report = formatReport(result);
    writeFileSync(join(opts.projectRoot, ".overseer", "ui-verification.md"), report);

    // Notify
    const passCount = result.checks.filter(c => c.passed).length;
    const totalCount = result.checks.length;
    const allPassed = passCount === totalCount;
    notify(
      allPassed ? "UI Verification Passed" : "UI Verification: Issues Found",
      `${passCount}/${totalCount} checks passed`,
    );

    return result;

  } finally {
    // Kill the dev server
    if (server?.pid) {
      try { process.kill(-server.pid, "SIGTERM"); } catch {
        try { server.kill("SIGTERM"); } catch { /* already dead */ }
      }
    }
  }
}

/**
 * Format the verification result as a markdown report.
 */
function formatReport(result: UIVerificationResult): string {
  const lines: string[] = [
    "# UI Verification Report",
    "",
    `**URL**: ${result.url}`,
    `**Page Title**: ${result.pageTitle || "N/A"}`,
    `**Screenshot**: ${result.screenshot || "N/A"}`,
    "",
    "## Checks",
    "",
    "| # | Check | Result | Detail |",
    "|---|-------|--------|--------|",
  ];

  result.checks.forEach((check, i) => {
    const icon = check.passed ? "PASS" : "FAIL";
    lines.push(`| ${i + 1} | ${check.name} | ${icon} | ${check.detail} |`);
  });

  if (result.errors) {
    lines.push("", "## Browser Errors", "", "```", result.errors, "```");
  }

  if (result.consoleLogs) {
    lines.push("", "## Console Logs", "", "```", result.consoleLogs, "```");
  }

  if (result.snapshot) {
    lines.push("", "## DOM Snapshot", "", "```", result.snapshot.slice(0, 5000), "```");
  }

  const passCount = result.checks.filter(c => c.passed).length;
  lines.push("", `---`, `**Result**: ${passCount}/${result.checks.length} checks passed`);

  return lines.join("\n");
}
