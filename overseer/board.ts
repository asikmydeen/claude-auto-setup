// SDLC Overseer — Obsidian-Compatible Sprint Board Generator
// Writes markdown files that Obsidian Kanban plugin can render as boards.

import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";
import { getEpic, getStoriesByEpic, getTasksByEpic, getEpicStats, getSprintLog } from "./db";
import type { Task, Story } from "./types";

/**
 * Generate all board files for an epic.
 * Call after each pipeline phase to keep the board current.
 */
export function generateBoard(epicId: string, projectRoot: string): void {
  const overseerDir = join(projectRoot, ".overseer");
  const storiesDir = join(overseerDir, "stories");
  if (!existsSync(storiesDir)) mkdirSync(storiesDir, { recursive: true });

  const epic = getEpic(epicId);
  if (!epic) return;

  const stories = getStoriesByEpic(epicId);
  const tasks = getTasksByEpic(epicId);
  const stats = getEpicStats(epicId);

  // 1. Kanban board (Obsidian Kanban plugin format)
  writeFileSync(join(overseerDir, "board.md"), generateKanban(epic, tasks));

  // 2. Epic overview
  writeFileSync(join(overseerDir, "epic.md"), generateEpicOverview(epic, stories, stats));

  // 3. Per-story files
  for (const story of stories) {
    const storyTasks = tasks.filter(t => t.story_id === story.id);
    writeFileSync(join(storiesDir, `${slugify(story.title)}.md`), generateStoryFile(story, storyTasks));
  }

  // 4. Timeline
  const events = getSprintLog(epicId, 50);
  writeFileSync(join(overseerDir, "timeline.md"), generateTimeline(epic, events));

  // 5. Vault directories (Obsidian-compatible layout)
  const vaultDirs = ["Daily", "Stories", "Notes", "References", "Templates"];
  for (const dir of vaultDirs) {
    const dirPath = join(overseerDir, dir);
    if (!existsSync(dirPath)) mkdirSync(dirPath, { recursive: true });
  }

  // 6. Individual story files in Stories/
  for (const story of stories) {
    const storyTasks = tasks.filter(t => t.story_id === story.id);
    writeFileSync(join(overseerDir, "Stories", `${slugify(story.title)}.md`), generateStoryFile(story, storyTasks));
  }

  // 7. Templates
  writeFileSync(join(overseerDir, "Templates", "story-template.md"), generateStoryTemplate());
  writeFileSync(join(overseerDir, "Templates", "task-template.md"), generateTaskTemplate());

  // 8. Sprint log entries as daily files in Daily/
  const dailyEvents = getSprintLog(epicId, 200);
  const eventsByDate = new Map<string, typeof dailyEvents>();
  for (const ev of dailyEvents) {
    const date = ev.timestamp.slice(0, 10); // YYYY-MM-DD
    const existing = eventsByDate.get(date) || [];
    existing.push(ev);
    eventsByDate.set(date, existing);
  }
  for (const [date, evts] of eventsByDate) {
    writeFileSync(join(overseerDir, "Daily", `${date}.md`), generateDailyFile(date, epic.title, evts));
  }
}

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 50);
}

function statusEmoji(status: string): string {
  switch (status) {
    case "done": case "merged": return "✅";
    case "in_progress": case "assigned": return "🔄";
    case "failed": case "blocked": return "❌";
    case "review": return "👀";
    case "queued": return "⏳";
    default: return "⬜";
  }
}

function pctBar(done: number, total: number): string {
  if (total === 0) return "░░░░░░░░░░ 0%";
  const pct = Math.round((done / total) * 100);
  const filled = Math.floor(pct / 10);
  return "█".repeat(filled) + "░".repeat(10 - filled) + ` ${pct}%`;
}

// --- Kanban Board (Obsidian Kanban Plugin format) ---

function generateKanban(epic: { title: string; status: string }, tasks: Task[]): string {
  const columns: Record<string, Task[]> = {
    "Queued": tasks.filter(t => t.status === "queued"),
    "In Progress": tasks.filter(t => ["assigned", "in_progress"].includes(t.status)),
    "Review": tasks.filter(t => t.status === "review"),
    "Done": tasks.filter(t => ["merged", "done"].includes(t.status)),
    "Failed": tasks.filter(t => ["failed", "blocked"].includes(t.status)),
  };

  const lines = [
    "---",
    "",
    "kanban-plugin: basic",
    "",
    "---",
    "",
    `# ${epic.title}`,
    "",
  ];

  for (const [col, items] of Object.entries(columns)) {
    lines.push(`## ${col}`);
    lines.push("");
    for (const task of items) {
      const role = task.assigned_role ? ` @${task.assigned_role}` : "";
      const branch = task.branch_name ? ` \`${task.branch_name}\`` : "";
      lines.push(`- [ ] **${task.title}**${role}${branch}`);
      if (task.description) {
        lines.push(`  ${task.description.split("\n")[0].slice(0, 80)}`);
      }
    }
    lines.push("");
  }

  return lines.join("\n");
}

// --- Epic Overview ---

function generateEpicOverview(
  epic: { id: string; title: string; description: string; status: string; created_at: string },
  stories: Story[],
  stats: { total: number; queued: number; inProgress: number; done: number; failed: number },
): string {
  const lines = [
    `# Epic: ${epic.title}`,
    "",
    `**Status**: ${statusEmoji(epic.status)} ${epic.status.toUpperCase()}`,
    `**Progress**: ${pctBar(stats.done, stats.total)} (${stats.done}/${stats.total} tasks)`,
    `**Created**: ${epic.created_at.slice(0, 10)}`,
    `**ID**: \`${epic.id.slice(0, 8)}\``,
    "",
    "## Description",
    epic.description,
    "",
    "## Stories",
    "",
    "| Priority | Story | Points | Status |",
    "|----------|-------|--------|--------|",
  ];

  for (const story of stories) {
    const link = `[[stories/${slugify(story.title)}|${story.title}]]`;
    lines.push(`| ${story.priority} | ${link} | ${story.story_points} | ${statusEmoji(story.status)} ${story.status} |`);
  }

  lines.push("");
  lines.push("## Sprint Board");
  lines.push("See [[board|Kanban Board]] for live task status.");
  lines.push("");
  lines.push("## Timeline");
  lines.push("See [[timeline|Event Timeline]] for detailed event log.");

  return lines.join("\n");
}

// --- Per-Story File ---

function generateStoryFile(story: Story, tasks: Task[]): string {
  const lines = [
    `# ${story.title}`,
    "",
    `**Priority**: ${story.priority} | **Points**: ${story.story_points} | **Status**: ${statusEmoji(story.status)} ${story.status}`,
    "",
    "## Description",
    story.description || "(no description)",
    "",
    "## Acceptance Criteria",
    story.acceptance_criteria || "(none specified)",
    "",
    "## Tasks",
    "",
  ];

  for (const task of tasks) {
    const checked = ["done", "merged"].includes(task.status) ? "x" : " ";
    const role = task.assigned_role ? ` — *${task.assigned_role}*` : "";
    const status = `${statusEmoji(task.status)} ${task.status}`;
    lines.push(`- [${checked}] **${task.title}**${role} (${status})`);
    if (task.branch_name) {
      lines.push(`  - Branch: \`${task.branch_name}\``);
    }
  }

  return lines.join("\n");
}

// --- Story Template ---

function generateStoryTemplate(): string {
  return [
    "---",
    "title: ",
    "priority: P0",
    "status: backlog",
    "story_points: 1",
    "---",
    "",
    "# Story Title",
    "",
    "## Description",
    "What to build and why.",
    "",
    "## Acceptance Criteria",
    "- [ ] Criterion 1",
    "- [ ] Criterion 2",
    "",
    "## Tasks",
    "- [ ] Task 1",
    "- [ ] Task 2",
    "",
    "## Notes",
    "",
  ].join("\n");
}

// --- Task Template ---

function generateTaskTemplate(): string {
  return [
    "---",
    "title: ",
    "type: backend",
    "assigned_role: engineer",
    "status: queued",
    "dependencies: []",
    "---",
    "",
    "# Task Title",
    "",
    "## Description",
    "Specific instructions for the engineer.",
    "",
    "## Acceptance Criteria",
    "- [ ] Criterion 1",
    "",
    "## Implementation Notes",
    "",
    "## Branch",
    "`branch-name`",
    "",
  ].join("\n");
}

// --- Daily File ---

function generateDailyFile(
  date: string,
  epicTitle: string,
  events: Array<{ event_type: string; details: string; agent_role: string; timestamp: string }>,
): string {
  const lines = [
    `# ${date}`,
    "",
    `**Epic**: ${epicTitle}`,
    "",
    "## Events",
    "",
  ];

  for (const ev of events) {
    const time = ev.timestamp.slice(11, 19);
    const emoji = ev.event_type.includes("fail") || ev.event_type.includes("conflict") ? "🔴"
      : ev.event_type.includes("complete") || ev.event_type.includes("merged") ? "🟢"
      : ev.event_type.includes("start") ? "🟡"
      : "⚪";
    lines.push(`- **${time}** ${emoji} \`${ev.event_type}\` — ${ev.agent_role}: ${ev.details}`);
  }

  return lines.join("\n");
}

// --- Timeline ---

function generateTimeline(
  epic: { title: string },
  events: Array<{ event_type: string; details: string; agent_role: string; timestamp: string }>,
): string {
  const lines = [
    `# Timeline: ${epic.title}`,
    "",
    "| Time | Event | Agent | Details |",
    "|------|-------|-------|---------|",
  ];

  for (const ev of events.reverse()) {
    const time = ev.timestamp.slice(0, 19).replace("T", " ");
    const emoji = ev.event_type.includes("fail") || ev.event_type.includes("conflict") ? "🔴"
      : ev.event_type.includes("complete") || ev.event_type.includes("merged") ? "🟢"
      : ev.event_type.includes("start") ? "🟡"
      : "⚪";
    lines.push(`| ${time} | ${emoji} ${ev.event_type} | ${ev.agent_role} | ${ev.details.slice(0, 60)} |`);
  }

  return lines.join("\n");
}
