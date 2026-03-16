import { Elysia } from "elysia";
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { execFileSync } from "child_process";
import { ClaudeMessage, ClaudeSession } from "../lib/shared";

// ============================================================
// SMART SUGGESTIONS (context-aware)
// ============================================================

// Conversation topic detection for context-aware suggestions
type ConversationTopic = "testing" | "debugging" | "refactoring" | "api" | "ui" | "database";

const TOPIC_PATTERNS: Record<ConversationTopic, RegExp> = {
  testing: /\b(test|spec|coverage|jest|vitest|assert|mock|stub|fixture|expect)\b/i,
  debugging: /\b(debug|debugging|debugger|error|bug|crash|exception|stack.?trace|breakpoint|failure|failing|failed)\b|\bfix\s+(bug|error|issue|crash)/i,
  refactoring: /\b(refactor|clean|rename|extract|simplify|restructure|reorganize|deduplicate)\b/i,
  api: /\b(api|endpoint|route|request|response|REST|GraphQL|handler|middleware)\b/i,
  ui: /\b(ui|component|css|style|layout|render|display|button|modal|form|page)\b/i,
  database: /\b(database|db|sql|dynamo|postgres|mongo|collection|schema|migration)\b/i,
};

function detectTopics(messages: ClaudeMessage[]): ConversationTopic[] {
  const recent = messages.slice(-10);
  const text = recent.map((m) => m.content || "").filter(Boolean).join(" ");
  if (!text.trim()) return [];
  return (Object.entries(TOPIC_PATTERNS) as [ConversationTopic, RegExp][])
    .filter(([, pattern]) => pattern.test(text))
    .map(([topic]) => topic);
}

const TOPIC_SUGGESTIONS: Record<ConversationTopic, { id: string; label: string; prompt: string; icon: string }> = {
  testing: { id: "more-tests", label: "Add more test coverage", prompt: "Add more test coverage for the code we just worked on. Focus on edge cases and error paths.", icon: "test-tube" },
  debugging: { id: "continue-debug", label: "Continue debugging", prompt: "Continue investigating and fixing the issue we were debugging", icon: "bug" },
  refactoring: { id: "refactor-related", label: "Refactor related code", prompt: "Look for similar patterns in related files that could benefit from the same refactoring", icon: "sparkles" },
  api: { id: "doc-api", label: "Document API endpoints", prompt: "Document the API endpoints we just worked on with request/response examples", icon: "file-text" },
  ui: { id: "polish-ui", label: "Polish UI components", prompt: "Review and polish the UI components we worked on — accessibility, responsiveness, edge cases", icon: "layout" },
  database: { id: "optimize-db", label: "Optimize database queries", prompt: "Review the database queries we worked on for performance and add proper indexes if needed", icon: "database" },
};

// Suggestions cache (10s TTL) to avoid blocking git calls on every request
const suggestionsCache = new Map<string, { data: unknown; timestamp: number }>();
const SUGGESTIONS_TTL = 10_000;

/** Shared state injected from the main server module */
let _claudeSessions: Map<string, ClaudeSession>;
let _getActiveProject: () => string;

/**
 * Initialize with references to shared mutable state from the main server.
 * Must be called before the router handles any requests.
 */
export function initSuggestions(
  claudeSessions: Map<string, ClaudeSession>,
  getActiveProject: () => string,
) {
  _claudeSessions = claudeSessions;
  _getActiveProject = getActiveProject;
}

export const suggestionsRoutes = new Elysia()

  .get("/api/suggestions", ({ query, set }) => {
    const activeProject = _getActiveProject();
    const cwd = (query.cwd as string) || activeProject;
    const sessionId = query.sessionId as string | undefined;

    // Cache key includes sessionId for conversation-aware caching
    const cacheKey = sessionId ? `${cwd}:${sessionId}` : cwd;
    const cached = suggestionsCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < SUGGESTIONS_TTL) {
      return cached.data;
    }
    const suggestions: Array<{
      id: string;
      label: string;
      prompt: string;
      icon: string;
      priority: number;
      category: "git" | "code" | "test" | "review" | "fix" | "general";
    }> = [];

    // Conversation-aware suggestions: analyze recent messages if sessionId provided
    if (sessionId) {
      const session = _claudeSessions.get(sessionId);
      if (session && session.messages.length > 0) {
        const topics = detectTopics(session.messages);
        for (const topic of topics) {
          const s = TOPIC_SUGGESTIONS[topic];
          if (!suggestions.some((existing) => existing.id === s.id)) {
            suggestions.push({ ...s, priority: 25, category: "general" });
          }
        }
      }
    }

    try {
      // Check git status
      const statusRaw = execFileSync("git", ["status", "--porcelain", "-u"], {
        cwd, encoding: "utf-8", timeout: 5000,
      }).trim();
      const gitFiles = statusRaw.split("\n").filter(Boolean);
      const hasChanges = gitFiles.length > 0;
      const hasUntracked = gitFiles.some((l) => l.startsWith("??"));
      const hasStagedChanges = gitFiles.some((l) => "ACDMR".includes(l[0] || ""));

      if (hasChanges) {
        suggestions.push({
          id: "review-changes",
          label: "Review changes",
          prompt: "Review my uncommitted changes, identify any issues, and suggest improvements",
          icon: "eye",
          priority: 10,
          category: "review",
        });
      }

      if (hasStagedChanges) {
        suggestions.push({
          id: "commit-staged",
          label: "Commit staged changes",
          prompt: "Look at the staged git changes and create a well-formatted commit with an appropriate message",
          icon: "git-commit",
          priority: 9,
          category: "git",
        });
      }

      if (hasChanges && !hasStagedChanges) {
        suggestions.push({
          id: "write-tests",
          label: "Write tests for changes",
          prompt: "Write comprehensive tests for the files I've recently modified",
          icon: "test-tube",
          priority: 8,
          category: "test",
        });
      }

      if (hasUntracked) {
        suggestions.push({
          id: "review-new-files",
          label: `Review ${gitFiles.filter((l) => l.startsWith("??")).length} new files`,
          prompt: "Review the newly created untracked files, check for issues and suggest improvements",
          icon: "file-plus",
          priority: 7,
          category: "review",
        });
      }

      // Check for common project files to suggest relevant actions
      if (existsSync(join(cwd, "package.json"))) {
        // Check if node_modules is missing
        if (!existsSync(join(cwd, "node_modules"))) {
          suggestions.push({
            id: "install-deps",
            label: "Install dependencies",
            prompt: "Run npm install or the appropriate package manager to install dependencies",
            icon: "download",
            priority: 15,
            category: "fix",
          });
        }

        // Check for test script
        try {
          const pkg = JSON.parse(readFileSync(join(cwd, "package.json"), "utf-8"));
          if (pkg.scripts?.test) {
            suggestions.push({
              id: "run-tests",
              label: "Run tests",
              prompt: "Run the test suite and fix any failing tests",
              icon: "play",
              priority: 5,
              category: "test",
            });
          }
          if (pkg.scripts?.lint) {
            suggestions.push({
              id: "run-lint",
              label: "Run linter",
              prompt: "Run the linter and fix any issues found",
              icon: "check",
              priority: 4,
              category: "code",
            });
          }
          if (pkg.scripts?.build) {
            suggestions.push({
              id: "build-project",
              label: "Build project",
              prompt: "Run the build command and fix any build errors",
              icon: "hammer",
              priority: 4,
              category: "code",
            });
          }
        } catch {}
      }

      // Check for Makefile
      if (existsSync(join(cwd, "Makefile"))) {
        suggestions.push({
          id: "run-make",
          label: "Run make",
          prompt: "Check the Makefile targets and run the appropriate build/test commands",
          icon: "terminal",
          priority: 3,
          category: "code",
        });
      }

      // Check for README
      if (!existsSync(join(cwd, "README.md")) && !existsSync(join(cwd, "readme.md"))) {
        suggestions.push({
          id: "create-readme",
          label: "Create README",
          prompt: "Analyze this project and create a comprehensive README.md",
          icon: "file-text",
          priority: 2,
          category: "general",
        });
      }

      // Project intelligence suggestions
      if (!existsSync(join(cwd, ".claude/rules/project-intel.md"))) {
        suggestions.push({
          id: "generate-intel",
          label: "Generate project intelligence",
          prompt: "Analyze this codebase and generate a comprehensive project-intel.md file at .claude/rules/project-intel.md. Include: stack, architecture, directory map, API surface, build/test commands, known gotchas.",
          icon: "brain",
          priority: 20,
          category: "general",
        });
      }

      if (!existsSync(join(cwd, ".claude/CLAUDE.md"))) {
        suggestions.push({
          id: "init-project",
          label: "Initialize AI config",
          prompt: "Set up this project for AI-assisted development. Create .claude/CLAUDE.md with project-specific instructions, key commands, and conventions.",
          icon: "sparkles",
          priority: 18,
          category: "general",
        });
      }

      // Always available
      suggestions.push({
        id: "explain-codebase",
        label: "Explain this codebase",
        prompt: "Give me a high-level overview of this codebase: what it does, how it's structured, key technologies used",
        icon: "info",
        priority: 1,
        category: "general",
      });

    } catch {
      // If git commands fail, provide generic suggestions
      suggestions.push(
        { id: "explain", label: "Explain this codebase", prompt: "Give me a high-level overview of this codebase", icon: "info", priority: 1, category: "general" },
        { id: "review", label: "Review code", prompt: "Review the code for bugs and improvements", icon: "eye", priority: 2, category: "review" },
      );
    }

    // Sort by priority descending
    suggestions.sort((a, b) => b.priority - a.priority);

    // Cache
    suggestionsCache.set(cacheKey, { data: suggestions, timestamp: Date.now() });
    return suggestions;
  })

  // Follow-up suggestions after a Claude session completes
  .get("/api/suggestions/followup/:sessionId", ({ params, set }) => {
    const session = _claudeSessions.get(params.sessionId);
    if (!session) return [];

    const suggestions: Array<{ id: string; label: string; prompt: string; icon: string }> = [];

    if (session.status === "done") {
      // Analyze the last response to generate context-aware suggestions
      const lastAssistant = session.messages.filter(m => m.role === "assistant").pop();
      const lastContent = (lastAssistant?.content || session.output.join("")).slice(-2000).toLowerCase();
      const lastUser = session.messages.filter(m => m.role === "user").pop();
      const lastUserContent = (lastUser?.content || "").toLowerCase();

      // Context-specific suggestions based on what Claude actually did
      if (lastContent.includes("error") || lastContent.includes("failed") || lastContent.includes("issue")) {
        suggestions.push({ id: "fix-errors", label: "Fix the remaining errors", prompt: "There are still errors. Fix all remaining issues and verify the app works.", icon: "bug" });
      }
      if (lastContent.includes("todo") || lastContent.includes("placeholder") || lastContent.includes("not yet implemented")) {
        suggestions.push({ id: "finish-todos", label: "Finish the TODOs", prompt: "Complete all remaining TODOs and placeholder implementations in the code.", icon: "sparkles" });
      }
      if (/styl|css|design|layout|theme|color|dark.?mode|light.?mode/.test(lastContent) || /styl|css|design|ui|ux/.test(lastUserContent)) {
        suggestions.push({ id: "polish-ui", label: "Polish the design", prompt: "Improve the visual design — fix spacing, colors, responsive layout, and overall polish.", icon: "eye" });
      }
      if (/api|fetch|supabase|database|query|endpoint/.test(lastContent)) {
        suggestions.push({ id: "add-error-handling", label: "Add error handling", prompt: "Add proper loading states, error handling, and edge case handling for all data fetching.", icon: "code" });
      }
      if (/component|page|route|nav/.test(lastContent) && session.filesChanged && session.filesChanged.length > 3) {
        suggestions.push({ id: "check-navigation", label: "Fix navigation & routing", prompt: "Verify all routes and navigation links work correctly. Fix any broken links or missing pages.", icon: "file-text" });
      }

      // File-based suggestions
      if (session.filesChanged && session.filesChanged.length > 0) {
        suggestions.push(
          { id: "test-changes", label: "Write tests", prompt: "Write comprehensive tests for the files you just modified", icon: "test-tube" },
          { id: "commit-work", label: "Commit changes", prompt: "Stage and commit the changes with an appropriate commit message", icon: "git-commit" },
        );
      }

      // Always add a concise "explain" option
      suggestions.push(
        { id: "explain", label: "What changed?", prompt: "Give me a concise summary of exactly what you changed and why", icon: "info" },
      );
    }

    if (session.status === "error") {
      suggestions.push(
        { id: "retry", label: "Try a different approach", prompt: "The previous attempt failed. Try a completely different approach to solve: " + session.prompt, icon: "refresh" },
        { id: "debug", label: "Debug the error", prompt: "Debug why the previous attempt failed and fix the issue", icon: "bug" },
      );
    }

    // Add topic-specific follow-ups based on conversation content
    const topics = detectTopics(session.messages);
    for (const topic of topics) {
      const s = TOPIC_SUGGESTIONS[topic];
      if (!suggestions.some((existing) => existing.id === s.id)) {
        suggestions.push(s);
      }
    }

    return suggestions;
  });

export default suggestionsRoutes;
