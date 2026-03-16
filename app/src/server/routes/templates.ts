/**
 * Template system + project creation routes — curated templates, auto-pick,
 * create-from-template, and create-from-scratch flows.
 */
import { Elysia } from "elysia";
import {
  readFileSync,
  writeFileSync,
  existsSync,
  mkdirSync,
} from "fs";
import { join, resolve } from "path";
import { execFileSync, spawn } from "child_process";
import { randomUUID } from "crypto";

import {
  HOME,
  PROJECT_ROOT,
  ClaudeSession,
  ProjectEnvConfig,
  buildProjectEnv,
  writeProjectDotEnv,
  saveProjectEnv,
} from "../lib/shared";

import {
  setActiveProject,
  userProjects,
  detectFileChanges,
} from "./projects";

// ---------------------------------------------------------------------------
// Shared state — injected from the main server via `initTemplatesRouter()`
// ---------------------------------------------------------------------------

let claudeSessions: Map<string, ClaudeSession>;
let sseClients: Map<string, Set<ReadableStreamDefaultController>>;
let wireStreamJson: (
  child: ReturnType<typeof spawn>,
  session: ClaudeSession,
  sessionId: string,
) => void;
let persistSessions: () => void;

// ---------------------------------------------------------------------------
// Template types + caching
// ---------------------------------------------------------------------------

interface CuratedTemplate {
  id: string;
  category: string;
  style: string;
  label: string;
  desc: string;
  framework: string;
  uiLib: string;
  tags: string[];
  path: string;
  scripts: string[];
}

interface CuratedManifest {
  styles: Record<string, { label: string; desc: string; icon: string }>;
  templates: CuratedTemplate[];
}

const TEMPLATES_DIR = join(PROJECT_ROOT, "extracted_templates");
let curatedCache: CuratedManifest | null = null;

function loadCurated(): CuratedManifest {
  if (curatedCache) return curatedCache;
  try {
    const p = join(TEMPLATES_DIR, "curated.json");
    if (existsSync(p)) curatedCache = JSON.parse(readFileSync(p, "utf-8"));
  } catch {}
  return curatedCache || { styles: {}, templates: [] };
}

// ---------------------------------------------------------------------------
// Auto-pick logic
// ---------------------------------------------------------------------------

/** Auto-pick the best template based on user description */
function autoPickTemplate(description: string): CuratedTemplate {
  const { templates } = loadCurated();
  const desc = description.toLowerCase();

  // Keyword -> style matching
  const isLanding = /landing|marketing|saas|homepage|portfolio|agency|pricing|hero/i.test(desc);
  const isDark = /dark|night|neon|gradient|cyber|gaming/i.test(desc);
  const isMaterial = /material|google|android|mui/i.test(desc);
  const isClean = /clean|classic|simple|minimal|corporate|professional/i.test(desc);

  // Framework preference from description (check specific before general)
  const wantsNuxt = /\bnuxt\b/i.test(desc);
  const wantsNext = /next\.?js|next\s|react.*ssr|server.*component/i.test(desc);
  const wantsVue = /\bvue\b|vuetify/i.test(desc);
  const wantsAngular = /angular|ng\b/i.test(desc);
  const wantsHtml = /\bhtml\b|static.*site|no.*framework|vanilla/i.test(desc);
  const wantsReact = /\breact\b/i.test(desc);

  // Step 1: Filter by framework preference (most specific signal)
  let candidates = templates;
  if (wantsNuxt) {
    const nuxtTemplates = candidates.filter((t) => t.framework === "Nuxt");
    if (nuxtTemplates.length > 0) candidates = nuxtTemplates;
  } else if (wantsNext) {
    const nextTemplates = candidates.filter((t) => t.framework === "Next.js");
    if (nextTemplates.length > 0) candidates = nextTemplates;
  } else if (wantsVue) {
    const vueTemplates = candidates.filter((t) => t.framework === "Vue");
    if (vueTemplates.length > 0) candidates = vueTemplates;
  } else if (wantsAngular) {
    const angTemplates = candidates.filter((t) => t.framework === "Angular");
    if (angTemplates.length > 0) candidates = angTemplates;
  } else if (wantsHtml) {
    const htmlTemplates = candidates.filter((t) => t.framework === "HTML");
    if (htmlTemplates.length > 0) candidates = htmlTemplates;
  } else if (wantsReact) {
    const reactTemplates = candidates.filter((t) => t.framework === "React");
    if (reactTemplates.length > 0) candidates = reactTemplates;
  }

  // Step 2: Filter by style within the framework candidates
  if (isLanding) {
    const landing = candidates.filter((t) => t.tags.includes("landing") || t.tags.includes("marketing"));
    if (landing.length > 0) candidates = landing;
  } else if (isDark) {
    const dark = candidates.filter((t) => t.style === "dark");
    if (dark.length > 0) candidates = dark;
  } else if (isMaterial) {
    const mat = candidates.filter((t) => t.style === "material");
    if (mat.length > 0) candidates = mat;
  } else if (isClean) {
    const clean = candidates.filter((t) => t.style === "clean");
    if (clean.length > 0) candidates = clean;
  }

  // Step 3: If no framework/style matched, default to dashboard (not landing page)
  if (candidates.length === templates.length) {
    // No filters applied — pick a good default dashboard
    // Prefer Material Tailwind (Next.js, modern) as the general-purpose default
    const dashboards = templates.filter((t) => t.tags.includes("dashboard") && !t.tags.includes("landing"));
    if (dashboards.length > 0) candidates = dashboards;
    // Within dashboards, prefer material style (most versatile)
    const materialDash = candidates.filter((t) => t.style === "material");
    if (materialDash.length > 0) candidates = materialDash;
  }

  // Return first match (they're already ordered by quality in curated.json)
  return candidates[0] || templates[0];
}

// ---------------------------------------------------------------------------
// Helper: spawn Claude session and wire up close handler
// ---------------------------------------------------------------------------

function spawnClaudeSession(
  claudePath: string,
  buildPrompt: string,
  projectDir: string,
): { id: string; session: ClaudeSession } {
  const id = randomUUID().slice(0, 12);
  const args = ["-p", buildPrompt, "--output-format", "stream-json", "--verbose", "--dangerously-skip-permissions"];
  const env = buildProjectEnv(projectDir);

  const child = spawn(claudePath, args, {
    env,
    cwd: projectDir,
    stdio: ["ignore", "pipe", "pipe"],
  });

  const session: ClaudeSession = {
    id,
    prompt: buildPrompt,
    status: "running",
    messages: [{ role: "user", content: buildPrompt, timestamp: new Date().toISOString() }],
    output: [],
    exitCode: null,
    startedAt: new Date().toISOString(),
    pid: child.pid,
    cwd: projectDir,
    process: child,
  };

  claudeSessions.set(id, session);
  wireStreamJson(child, session, id);

  child.on("close", (code) => {
    session.status = code === 0 ? "done" : "error";
    session.exitCode = code;
    session.endedAt = new Date().toISOString();
    session.messages.push({ role: "assistant", content: session.output.join(""), timestamp: new Date().toISOString() });
    delete session.process;
    if (code === 0) session.filesChanged = detectFileChanges(session.cwd);
    const clients = sseClients.get(id);
    if (clients) {
      for (const client of clients) {
        client.enqueue(`data: ${JSON.stringify({ type: "done", exitCode: code, filesChanged: session.filesChanged })}\n\n`);
        try { client.close(); } catch {}
      }
      sseClients.delete(id);
    }
    persistSessions();
    // Keep in memory for 2h, persist handles disk storage
    setTimeout(() => { persistSessions(); claudeSessions.delete(id); }, 7200000);
  });

  return { id, session };
}

// ---------------------------------------------------------------------------
// Elysia plugin
// ---------------------------------------------------------------------------

export const templatesRoutes = new Elysia()

  // ============================================================
  // TEMPLATE SYSTEM — curated, verified design references
  // ============================================================

  // GET /api/templates — returns curated templates grouped by design style
  .get("/api/templates", () => {
    const { styles, templates } = loadCurated();
    const grouped = Object.entries(styles).map(([id, meta]) => ({
      id,
      ...meta,
      templates: templates.filter((t) => {
        if (id === "landing") return t.tags.includes("landing") || t.tags.includes("marketing");
        if (id === "dashboard-modern") return t.style === "modern" && !t.tags.includes("landing");
        if (id === "dashboard-material") return t.style === "material" && !t.tags.includes("landing");
        if (id === "dashboard-dark") return t.style === "dark";
        if (id === "dashboard-soft") return t.style === "soft";
        return t.style === "clean" && !t.tags.includes("landing");
      }),
    })).filter((g) => g.templates.length > 0);
    return grouped;
  })

  // POST /api/projects/create-from-template — copy template + always spawn Claude to customize
  // templateId is optional — if omitted, auto-picks based on description
  .post("/api/projects/create-from-template", ({ body, set }) => {
    const { templateId, name, description, basePath } = body as {
      templateId?: string;
      name?: string;
      description?: string;
      basePath?: string;
    };
    if (!name || !description) {
      set.status = 400;
      return { error: "name and description are required" };
    }

    const { templates } = loadCurated();
    const template = templateId
      ? templates.find((t) => t.id === templateId)
      : autoPickTemplate(description);
    if (!template) {
      set.status = 404;
      return { error: "Template not found" };
    }

    const safeName = name.replace(/[^a-zA-Z0-9_-]/g, "-").toLowerCase();
    const base = basePath || join(HOME, "projects");
    const projectDir = join(base, safeName);

    if (!existsSync(base)) mkdirSync(base, { recursive: true });
    if (existsSync(projectDir)) {
      set.status = 409;
      return { error: `Directory already exists: ${projectDir}` };
    }

    try {
      // Copy template as starting point
      const templateSrc = join(TEMPLATES_DIR, template.path);
      if (!existsSync(templateSrc)) {
        set.status = 404;
        return { error: "Template source directory not found" };
      }
      execFileSync("cp", ["-R", templateSrc, projectDir], { timeout: 30000 });

      // Update package.json name
      const pkgPath = join(projectDir, "package.json");
      if (existsSync(pkgPath)) {
        try {
          const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
          pkg.name = safeName;
          writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
        } catch {}
      }

      // Init git
      try {
        execFileSync("git", ["init"], { cwd: projectDir, encoding: "utf-8", timeout: 5000 });
        execFileSync("git", ["add", "."], { cwd: projectDir, encoding: "utf-8", timeout: 10000 });
        execFileSync("git", ["commit", "-m", "Initial commit from template: " + template.label], { cwd: projectDir, encoding: "utf-8", timeout: 10000 });
      } catch {}

      // Set as active project
      setActiveProject(projectDir);
      if (!userProjects.some((p) => p.path === projectDir)) {
        userProjects.push({ path: projectDir, name: safeName, addedAt: new Date().toISOString() });
      }

      // Always spawn Claude to customize the template based on user's description
      const claudePath = execFileSync("which", ["claude"], { encoding: "utf-8" }).trim();
      // Write .env with connected integrations (Supabase, AWS) and get prompt context
      const integrationContext = writeProjectDotEnv(projectDir);

      const buildPrompt = `You are building a project called "${name}" for the user.

The user's idea:
${description}

You are working inside a "${template.label}" template (${template.framework} + ${template.uiLib}).
The template already has a working UI with components, layouts, routing, and styling.
${integrationContext ? `\n${integrationContext}\n` : ""}
## Your Process

1. **Explore first** — Use Read, Grep, Glob to study the template structure before editing anything. Understand the components, pages, routing, and design patterns.
2. **Install dependencies** — Run "npm install" plus any extra packages needed (e.g. @supabase/supabase-js if using Supabase).
3. **Customize systematically:**
   - Rename/restructure pages and navigation to fit the user's app
   - Update content, copy, and branding
   - Add new components or pages for features described
   - Wire up data fetching, forms, state management, and interactivity
   - Keep the design system and UI library — build ON the template, don't replace it
4. **Verify your work:**
   - After editing, re-read the files you changed to confirm correctness
   - Check for React hooks rules (no hooks in conditionals, no hooks in callbacks)
   - Check that all imports exist and are correct
   - Run "npm run build" or "npx tsc --noEmit" to catch type errors
   - If errors are found, FIX THEM before finishing
5. **Self-review** — Before marking done, review your changes: are there obvious bugs, missing imports, broken routes, or hardcoded values that should be dynamic?

## Quality Standards
- Match the template's existing code patterns and conventions
- No React hooks violations (hooks must be at top level of components, never conditional)
- All components must render valid JSX (no objects as React children)
- Use the template's existing design tokens, colors, and component library
- Handle loading states and errors for any data fetching
- Do NOT leave placeholder text like "TODO" or "Lorem ipsum" — use realistic data

## Available Tools
You have access to plugins (serena, context7, code-review) and can search codebases, fetch library docs, and review your own code. Use them.

IMPORTANT: Do NOT tell the user to "run npm run dev" or any other command. The app will automatically start the dev server and open it in a browser panel when you're done. Just focus on writing correct, working code.

Build on the template — don't start from scratch. The design is already beautiful.`;

      const { id, session } = spawnClaudeSession(claudePath, buildPrompt, projectDir);

      const { process: _, ...safe } = session;
      set.status = 201;
      return {
        ok: true,
        projectDir,
        sessionId: id,
        session: safe,
        template: { id: template.id, label: template.label, framework: template.framework },
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to create project from template";
      set.status = 500;
      return { error: msg };
    }
  })

  // ============================================================
  // PROJECT CREATOR (from scratch — original flow)
  // ============================================================

  .post("/api/projects/create", ({ body, set }) => {
    const { name, description, basePath, envVars, supabaseOverride, awsProfile } = body as {
      name?: string;
      description?: string;
      basePath?: string;
      envVars?: Record<string, string>;
      supabaseOverride?: Record<string, unknown>;
      awsProfile?: string;
    };
    if (!name || !description) {
      set.status = 400;
      return { error: "Name and description are required" };
    }

    const safeName = name.replace(/[^a-zA-Z0-9_-]/g, "-").toLowerCase();
    const parentDir = resolve(basePath || join(HOME, "projects"));
    // Ensure parent is under home directory
    if (!parentDir.startsWith(HOME) && !parentDir.startsWith("/tmp")) {
      set.status = 400;
      return { error: "Project path must be under home directory" };
    }
    const projectDir = join(parentDir, safeName);

    // Create directory
    if (!existsSync(parentDir)) mkdirSync(parentDir, { recursive: true });
    if (!existsSync(projectDir)) mkdirSync(projectDir, { recursive: true });

    // Initialize git
    try {
      execFileSync("git", ["init"], { cwd: projectDir, timeout: 5000 });
    } catch {}

    // Save per-project env config if provided
    const projectEnvConfig: ProjectEnvConfig = {};
    if (envVars && typeof envVars === "object" && Object.keys(envVars).length > 0) {
      projectEnvConfig.env = envVars;
    }
    if (supabaseOverride && typeof supabaseOverride === "object") {
      projectEnvConfig.supabase = supabaseOverride;
    }
    if (awsProfile && typeof awsProfile === "string") {
      projectEnvConfig.aws = { profile: awsProfile };
    }
    if (Object.keys(projectEnvConfig).length > 0) {
      saveProjectEnv(projectDir, projectEnvConfig);
    }

    // Set as active project
    setActiveProject(projectDir);
    if (!userProjects.some((p) => p.path === projectDir)) {
      userProjects.push({ path: projectDir, name: safeName, addedAt: new Date().toISOString() });
    }

    // Launch Claude session to build the project
    try {
      const claudePath = execFileSync("which", ["claude"], { encoding: "utf-8" }).trim();

      // Write .env with connected integrations (Supabase, AWS) and get prompt context
      const integrationContext = writeProjectDotEnv(projectDir);

      const buildPrompt = `You are creating a new project called "${name}". Here is the user's idea:

${description}

${integrationContext ? integrationContext + "\n" : ""}## Your Process

1. **Plan the architecture** — Before writing code, decide on: framework, file structure, data model, key components. Use context7 plugin to fetch docs for any library you're unsure about.
2. **Set up the project** — Use bun as the package manager (bun init, bun add) for speed. Create all files, install dependencies.
3. **Implement the core functionality** — Not just scaffolding. Make features actually work with realistic data, proper state management, and clean UI.
4. **MUST have a working "dev" script** in package.json that starts a dev server (vite, next dev, bun serve).
5. **Verify your work:**
   - After writing code, re-read modified files to confirm correctness
   - Check for React hooks rules (no hooks in conditionals)
   - Run "bun run build" or type-check to catch errors
   - If errors found, FIX THEM before finishing
6. **Self-review** — Before marking done, check for: missing imports, broken routes, hardcoded values, unhandled errors.

## Quality Standards
- Use modern best practices: TypeScript, proper error handling, clean code
- No placeholder content (TODO, Lorem ipsum) — use realistic data
- Handle loading and error states for data fetching
- Mobile-responsive design
- Accessible (semantic HTML, proper labels)

## Available Tools
You have access to plugins (serena for code navigation, context7 for library docs, code-review for self-review). Use them to write better code.

IMPORTANT: Do NOT tell the user to run any commands. The app will automatically start the dev server and open it in a browser when you're done. Just focus on writing correct, working code.`;

      const { id, session } = spawnClaudeSession(claudePath, buildPrompt, projectDir);

      const { process: _, ...safe } = session;
      set.status = 201;
      return { ok: true, projectDir, sessionId: id, session: safe };
    } catch {
      // Project created but no Claude session — still success
      set.status = 201;
      return { ok: true, projectDir, sessionId: null };
    }
  });

// ---------------------------------------------------------------------------
// Initialization — must be called from the main server to inject shared state
// ---------------------------------------------------------------------------

export interface TemplatesRouterDeps {
  claudeSessions: Map<string, ClaudeSession>;
  sseClients: Map<string, Set<ReadableStreamDefaultController>>;
  wireStreamJson: (
    child: ReturnType<typeof spawn>,
    session: ClaudeSession,
    sessionId: string,
  ) => void;
  persistSessions: () => void;
}

export function initTemplatesRouter(deps: TemplatesRouterDeps) {
  claudeSessions = deps.claudeSessions;
  sseClients = deps.sseClients;
  wireStreamJson = deps.wireStreamJson;
  persistSessions = deps.persistSessions;
}
