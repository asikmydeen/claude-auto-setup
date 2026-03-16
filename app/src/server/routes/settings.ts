import { Elysia } from "elysia";
import {
  readFileSync,
  writeFileSync,
  readdirSync,
  existsSync,
  mkdirSync,
} from "fs";
import { join } from "path";
import { execFileSync } from "child_process";
import {
  SETTINGS_PATH,
  AGENTS_DIR,
  UNIVERSAL_DIR,
  SCRATCH_DIR,
  parseFrontmatter,
} from "../lib/shared";

// ============================================================
// SETTINGS (read/write ~/.claude/settings.json)
// ============================================================

function parseAgentMd(filepath: string) {
  const raw = readFileSync(filepath, "utf-8");
  const fm = parseFrontmatter(raw);
  const bodyMatch = raw.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/);
  return {
    name: (fm.name as string) || "",
    filename: filepath.split("/").pop() || "",
    model: fm.model as string | undefined,
    tools: fm.tools as string | undefined,
    memory: fm.memory as string | undefined,
    background: fm.background as string | undefined,
    maxTurns: (fm.maxTurns || fm["max-turns"]) as string | undefined,
    description: fm.description as string | undefined,
    content: bodyMatch ? bodyMatch[1].trim() : raw,
  };
}

export const settingsRoutes = new Elysia()

  .get("/api/settings", ({ set }) => {
    try {
      if (!existsSync(SETTINGS_PATH)) return {};
      const raw = readFileSync(SETTINGS_PATH, "utf-8");
      return JSON.parse(raw);
    } catch {
      set.status = 500;
      return { error: "Failed to read settings" };
    }
  })

  .put("/api/settings", ({ body, set }) => {
    try {
      const current = existsSync(SETTINGS_PATH)
        ? JSON.parse(readFileSync(SETTINGS_PATH, "utf-8"))
        : {};
      const updated = { ...current, ...(body as Record<string, unknown>) };
      writeFileSync(SETTINGS_PATH, JSON.stringify(updated, null, 2) + "\n");
      return { ok: true, settings: updated };
    } catch {
      set.status = 500;
      return { error: "Failed to save settings" };
    }
  })

  // ============================================================
  // AGENT CONFIGS (read/write ~/.claude/agents/*.md)
  // ============================================================

  .get("/api/agents/configs", ({ set }) => {
    try {
      if (!existsSync(AGENTS_DIR)) return [];
      const agents = readdirSync(AGENTS_DIR)
        .filter((f) => f.endsWith(".md"))
        .map((f) => parseAgentMd(join(AGENTS_DIR, f)));
      return agents;
    } catch {
      set.status = 500;
      return { error: "Failed to read agent configs" };
    }
  })

  .put("/api/agents/configs/:name", ({ params, body, set }) => {
    try {
      // Sanitize filename to prevent path traversal
      const rawName = params.name.replace(/[^a-zA-Z0-9_-]/g, "");
      if (!rawName) {
        set.status = 400;
        return { error: "Invalid agent name" };
      }
      const filename = `${rawName}.md`;
      const filepath = join(AGENTS_DIR, filename);
      // Double-check resolved path is within AGENTS_DIR
      if (!filepath.startsWith(AGENTS_DIR)) {
        set.status = 400;
        return { error: "Invalid path" };
      }
      const { model, tools, memory, background, maxTurns, description, content, name: agentName } =
        body as {
          model?: string;
          tools?: string;
          memory?: string;
          background?: string;
          maxTurns?: string;
          description?: string;
          content?: string;
          name?: string;
        };

      const fmLines = ["---"];
      if (agentName) fmLines.push(`name: ${agentName}`);
      if (description) fmLines.push(`description: ${description}`);
      if (tools) fmLines.push(`tools: ${tools}`);
      if (model) fmLines.push(`model: ${model}`);
      if (background) fmLines.push(`background: ${background}`);
      if (memory) fmLines.push(`memory: ${memory}`);
      if (maxTurns) fmLines.push(`maxTurns: ${maxTurns}`);
      fmLines.push("---");

      const fullContent = fmLines.join("\n") + "\n\n" + (content || "");
      if (!existsSync(AGENTS_DIR)) mkdirSync(AGENTS_DIR, { recursive: true });
      writeFileSync(filepath, fullContent);
      return { ok: true };
    } catch {
      set.status = 500;
      return { error: "Failed to save agent config" };
    }
  })

  // ============================================================
  // PROVIDERS (detect installed + read providers.json)
  // ============================================================

  .get("/api/providers", ({ set }) => {
    const providersPath = join(UNIVERSAL_DIR, "providers.json");
    try {
      const config = existsSync(providersPath)
        ? JSON.parse(readFileSync(providersPath, "utf-8"))
        : { providers: {}, task_routing: {} };

      const installed: Record<string, { path: string; version: string }> = {};
      const cliNames: Record<string, string> = {
        claude: "claude",
        codex: "codex",
        gemini: "gemini",
        amp: "amp",
        kiro: "kiro-cli",
      };

      for (const [name, cli] of Object.entries(cliNames)) {
        try {
          const path = execFileSync("which", [cli], {
            encoding: "utf-8",
          }).trim();
          let version = "";
          try {
            version = execFileSync(cli, ["--version"], {
              encoding: "utf-8",
              timeout: 5000,
            }).trim();
          } catch {}
          if (path) installed[name] = { path, version };
        } catch {}
      }

      return { config, installed };
    } catch {
      set.status = 500;
      return { error: "Failed to read providers" };
    }
  })

  // ============================================================
  // RULES (read universal/rules/*.md)
  // ============================================================

  .get("/api/rules", () => {
    const rulesDir = join(UNIVERSAL_DIR, "rules");
    if (!existsSync(rulesDir)) return [];

    try {
      const rules = readdirSync(rulesDir)
        .filter((f) => f.endsWith(".md"))
        .map((f) => {
          const content = readFileSync(join(rulesDir, f), "utf-8");
          const firstLine =
            content
              .split("\n")
              .find((l) => l.startsWith("# "))
              ?.replace("# ", "") || f.replace(".md", "");
          return {
            filename: f,
            name: f.replace(".md", ""),
            title: firstLine,
            lines: content.split("\n").length,
            preview: content.slice(0, 500),
          };
        });
      return rules;
    } catch {
      return { error: "Failed to read rules" };
    }
  })

  .get("/api/rules/:name", ({ params, set }) => {
    const rulesDir = join(UNIVERSAL_DIR, "rules");
    // Sanitize to prevent path traversal
    const rawName = params.name.replace(/[^a-zA-Z0-9_-]/g, "");
    if (!rawName) {
      set.status = 400;
      return { error: "Invalid rule name" };
    }
    const filename = `${rawName}.md`;
    const filepath = join(rulesDir, filename);
    if (!filepath.startsWith(rulesDir) || !existsSync(filepath)) {
      set.status = 404;
      return { error: "Rule not found" };
    }
    try {
      return { content: readFileSync(filepath, "utf-8") };
    } catch {
      set.status = 500;
      return { error: "Failed to read rule" };
    }
  })

  // ============================================================
  // ENFORCEMENT STATE
  // ============================================================

  .get("/api/enforcement", () => {
    const statePath = join(SCRATCH_DIR, "enforce-state.json");
    try {
      if (!existsSync(statePath)) return { active: false };
      const raw = readFileSync(statePath, "utf-8");
      const state = JSON.parse(raw);
      // Normalize files_changed: array on disk -> count for UI
      if (Array.isArray(state.files_changed)) {
        state.files_changed = state.files_changed.length;
      }
      return { active: true, ...state };
    } catch {
      return { active: false };
    }
  })

  // ============================================================
  // SKILLS (commands from universal/commands/*.md)
  // ============================================================

  .get("/api/skills", () => {
    const commandsDir = join(UNIVERSAL_DIR, "commands");
    if (!existsSync(commandsDir)) return [];

    const skills: Array<Record<string, unknown>> = [];
    for (const file of readdirSync(commandsDir)) {
      if (!file.endsWith(".md")) continue;
      try {
        const content = readFileSync(join(commandsDir, file), "utf-8");
        const fm = parseFrontmatter(content);
        skills.push({
          name: fm.name || file.replace(".md", ""),
          description: fm.description || "",
          category: fm.category || "general",
          complexity: fm.complexity || "medium",
          triggers: fm.triggers || [file.replace(".md", "")],
          filename: file,
        });
      } catch {
        skills.push({
          name: file.replace(".md", ""),
          description: "",
          category: "general",
          complexity: "medium",
          triggers: [file.replace(".md", "")],
          filename: file,
        });
      }
    }
    return skills;
  });
