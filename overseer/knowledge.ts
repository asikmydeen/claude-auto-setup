// SDLC Overseer — Centralized Knowledge Store
// Shared brain for all agents — architecture decisions, API contracts, patterns, gotchas

import { randomUUID } from "crypto";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";
import { getDb } from "./db";
import type { Knowledge, KnowledgeCategory } from "./types";

/**
 * Add a knowledge entry.
 * Called by agents when they make decisions or discover patterns.
 */
export function addKnowledge(
  epicId: string,
  category: KnowledgeCategory,
  key: string,
  value: string,
  sourceAgent: string,
): Knowledge {
  const entry: Knowledge = {
    id: randomUUID(),
    epic_id: epicId,
    category,
    key,
    value,
    source_agent: sourceAgent,
    created_at: new Date().toISOString(),
  };

  getDb().prepare(
    "INSERT INTO knowledge (id, epic_id, category, key, value, source_agent, created_at) VALUES ($id, $epic_id, $category, $key, $value, $source_agent, $created_at)"
  ).run({
    $id: entry.id,
    $epic_id: entry.epic_id,
    $category: entry.category,
    $key: entry.key,
    $value: entry.value,
    $source_agent: entry.source_agent,
    $created_at: entry.created_at,
  });

  return entry;
}

/**
 * Get all knowledge for an epic, optionally filtered by category.
 */
export function getKnowledge(epicId: string, category?: KnowledgeCategory): Knowledge[] {
  if (category) {
    return getDb().prepare(
      "SELECT * FROM knowledge WHERE epic_id = $epic_id AND category = $category ORDER BY created_at"
    ).all({ $epic_id: epicId, $category: category }) as Knowledge[];
  }
  return getDb().prepare(
    "SELECT * FROM knowledge WHERE epic_id = $epic_id ORDER BY created_at"
  ).all({ $epic_id: epicId }) as Knowledge[];
}

/**
 * Search knowledge by key (substring match).
 */
export function searchKnowledge(epicId: string, query: string): Knowledge[] {
  return getDb().prepare(
    "SELECT * FROM knowledge WHERE epic_id = $epic_id AND (key LIKE $query OR value LIKE $query) ORDER BY created_at"
  ).all({ $epic_id: epicId, $query: `%${query}%` }) as Knowledge[];
}

/**
 * Build a context string from knowledge for injecting into agent prompts.
 * This gives new agents awareness of decisions already made.
 */
export function buildKnowledgeContext(epicId: string): string {
  const entries = getKnowledge(epicId);
  if (entries.length === 0) return "";

  const sections: Record<string, string[]> = {};

  for (const entry of entries) {
    const cat = entry.category;
    if (!sections[cat]) sections[cat] = [];
    sections[cat].push(`- **${entry.key}**: ${entry.value} _(by ${entry.source_agent})_`);
  }

  const parts = ["## Shared Knowledge (decisions made by the team)"];
  for (const [category, items] of Object.entries(sections)) {
    parts.push(`### ${category}`);
    parts.push(...items);
    parts.push("");
  }

  return parts.join("\n");
}

/**
 * Check for conflicting decisions.
 * Two entries with the same key but different values = potential conflict.
 */
export function findConflicts(epicId: string): Array<{ key: string; entries: Knowledge[] }> {
  const entries = getKnowledge(epicId);
  const byKey = new Map<string, Knowledge[]>();

  for (const entry of entries) {
    const existing = byKey.get(entry.key) || [];
    existing.push(entry);
    byKey.set(entry.key, existing);
  }

  const conflicts: Array<{ key: string; entries: Knowledge[] }> = [];
  for (const [key, items] of byKey) {
    if (items.length > 1) {
      const uniqueValues = new Set(items.map(i => i.value));
      if (uniqueValues.size > 1) {
        conflicts.push({ key, entries: items });
      }
    }
  }

  return conflicts;
}

/**
 * Export all knowledge entries for an epic to the vault Notes/ directory.
 * Groups entries by category, one markdown file per category.
 */
export function exportKnowledgeToVault(epicId: string, overseerDir: string): void {
  const entries = getKnowledge(epicId);
  if (entries.length === 0) return;

  const notesDir = join(overseerDir, "Notes");
  if (!existsSync(notesDir)) mkdirSync(notesDir, { recursive: true });

  // Group by category
  const byCategory = new Map<KnowledgeCategory, Knowledge[]>();
  for (const entry of entries) {
    const existing = byCategory.get(entry.category) || [];
    existing.push(entry);
    byCategory.set(entry.category, existing);
  }

  // Write one file per category
  for (const [category, items] of byCategory) {
    const lines = [
      `# Knowledge: ${category}`,
      "",
    ];

    for (const item of items) {
      lines.push(`## ${item.key}`);
      lines.push("");
      lines.push(item.value);
      lines.push("");
      lines.push(`> Source: *${item.source_agent}* — ${item.created_at.slice(0, 19).replace("T", " ")}`);
      lines.push("");
    }

    writeFileSync(join(notesDir, `${category}.md`), lines.join("\n"));
  }
}
