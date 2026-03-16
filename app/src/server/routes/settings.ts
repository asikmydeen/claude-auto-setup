import { Router } from "express";
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

const router = Router();

// ============================================================
// SETTINGS (read/write ~/.claude/settings.json)
// ============================================================

router.get("/api/settings", (_req, res) => {
  try {
    if (!existsSync(SETTINGS_PATH)) return res.json({});
    const raw = readFileSync(SETTINGS_PATH, "utf-8");
    res.json(JSON.parse(raw));
  } catch {
    res.status(500).json({ error: "Failed to read settings" });
  }
});

router.put("/api/settings", (req, res) => {
  try {
    const current = existsSync(SETTINGS_PATH)
      ? JSON.parse(readFileSync(SETTINGS_PATH, "utf-8"))
      : {};
    const updated = { ...current, ...req.body };
    writeFileSync(SETTINGS_PATH, JSON.stringify(updated, null, 2) + "\n");
    res.json({ ok: true, settings: updated });
  } catch {
    res.status(500).json({ error: "Failed to save settings" });
  }
});

// ============================================================
// AGENT CONFIGS (read/write ~/.claude/agents/*.md)
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

router.get("/api/agents/configs", (_req, res) => {
  try {
    if (!existsSync(AGENTS_DIR)) return res.json([]);
    const agents = readdirSync(AGENTS_DIR)
      .filter((f) => f.endsWith(".md"))
      .map((f) => parseAgentMd(join(AGENTS_DIR, f)));
    res.json(agents);
  } catch {
    res.status(500).json({ error: "Failed to read agent configs" });
  }
});

router.put("/api/agents/configs/:name", (req, res) => {
  try {
    // Sanitize filename to prevent path traversal
    const rawName = req.params.name.replace(/[^a-zA-Z0-9_-]/g, "");
    if (!rawName) return res.status(400).json({ error: "Invalid agent name" });
    const filename = `${rawName}.md`;
    const filepath = join(AGENTS_DIR, filename);
    // Double-check resolved path is within AGENTS_DIR
    if (!filepath.startsWith(AGENTS_DIR)) {
      return res.status(400).json({ error: "Invalid path" });
    }
    const { model, tools, memory, background, maxTurns, description, content } =
      req.body;

    const fmLines = ["---"];
    if (req.body.name) fmLines.push(`name: ${req.body.name}`);
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
    res.json({ ok: true });
  } catch {
    res.status(500).json({ error: "Failed to save agent config" });
  }
});

// ============================================================
// PROVIDERS (detect installed + read providers.json)
// ============================================================

router.get("/api/providers", (_req, res) => {
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

    res.json({ config, installed });
  } catch {
    res.status(500).json({ error: "Failed to read providers" });
  }
});

// ============================================================
// RULES (read universal/rules/*.md)
// ============================================================

router.get("/api/rules", (_req, res) => {
  const rulesDir = join(UNIVERSAL_DIR, "rules");
  if (!existsSync(rulesDir)) return res.json([]);

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
    res.json(rules);
  } catch {
    res.status(500).json({ error: "Failed to read rules" });
  }
});

router.get("/api/rules/:name", (req, res) => {
  const rulesDir = join(UNIVERSAL_DIR, "rules");
  // Sanitize to prevent path traversal
  const rawName = req.params.name.replace(/[^a-zA-Z0-9_-]/g, "");
  if (!rawName) return res.status(400).json({ error: "Invalid rule name" });
  const filename = `${rawName}.md`;
  const filepath = join(rulesDir, filename);
  if (!filepath.startsWith(rulesDir) || !existsSync(filepath))
    return res.status(404).json({ error: "Rule not found" });
  try {
    res.json({ content: readFileSync(filepath, "utf-8") });
  } catch {
    res.status(500).json({ error: "Failed to read rule" });
  }
});

// ============================================================
// ENFORCEMENT STATE
// ============================================================

router.get("/api/enforcement", (_req, res) => {
  const statePath = join(SCRATCH_DIR, "enforce-state.json");
  try {
    if (!existsSync(statePath)) return res.json({ active: false });
    const raw = readFileSync(statePath, "utf-8");
    const state = JSON.parse(raw);
    // Normalize files_changed: array on disk -> count for UI
    if (Array.isArray(state.files_changed)) {
      state.files_changed = state.files_changed.length;
    }
    res.json({ active: true, ...state });
  } catch {
    res.json({ active: false });
  }
});

// ============================================================
// SKILLS (commands from universal/commands/*.md)
// ============================================================

router.get("/api/skills", (_req, res) => {
  const commandsDir = join(UNIVERSAL_DIR, "commands");
  if (!existsSync(commandsDir)) return res.json([]);

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
  res.json(skills);
});

export default router;
