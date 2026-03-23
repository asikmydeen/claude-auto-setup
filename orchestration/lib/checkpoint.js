import { readState, writeCheckpoint } from './state.js';
import { join } from 'path';
import { homedir } from 'os';
import { execFileSync } from 'child_process';

// Fresh read every call using subprocess cat — the MCP server process intermittently
// fails to read files via readFileSync (suspected Claude Code MCP sandbox issue).
// Spawning cat as a child process bypasses whatever restriction affects the parent.
function readCheckpointFresh() {
  const path = join(homedir(), '.claude', 'scratch', 'task-state.md');
  try {
    return execFileSync('cat', [path], { timeout: 3000 }).toString() || null;
  } catch {
    return null;
  }
}

export function writeRichCheckpoint({ task, plan, decisions, progress, phase }) {
  const state = readState();
  const now = new Date().toISOString().replace('T', ' ').slice(0, 19);

  let gitStatus = '';
  try {
    const diff = execFileSync('git', ['diff', '--name-only'], { timeout: 5000 }).toString().trim();
    const staged = execFileSync('git', ['diff', '--staged', '--name-only'], { timeout: 5000 }).toString().trim();
    if (staged) gitStatus += `Staged:\n${staged}\n`;
    if (diff) gitStatus += `Unstaged:\n${diff}\n`;
  } catch { /* not in a git repo */ }

  const effectivePhase = phase || state.phase || 'unknown';
  const files = state.files_changed || [];

  let content = `# Task Checkpoint\n`;
  content += `> Last updated: ${now}\n\n`;

  content += `## Current Task\n${task || state.task_summary || 'Not specified'}\n\n`;
  content += `## Phase: ${effectivePhase}\n\n`;

  if (plan) {
    content += `## Approved Plan\n${plan}\n\n`;
  }

  if (decisions) {
    content += `## Key Decisions\n${decisions}\n\n`;
  }

  if (progress) {
    content += `## Progress\n${progress}\n\n`;
  }

  content += `## Edits: ${state.edit_count}\n\n`;

  if (files.length > 0 && !(files.length === 1 && files[0] === 'unknown')) {
    content += `## Files Changed (${files.length})\n`;
    for (const f of files) {
      content += `- ${f}\n`;
    }
    content += '\n';
  }

  if (gitStatus) {
    content += `## Git Status\n${gitStatus}\n`;
  }

  const missing = [];
  if (!state.tests_run) missing.push('Run tests');
  if (!state.review_run) missing.push('Run code review');
  if (!state.intel_updated && state.edit_count > 5) missing.push('Update intel if structural changes');

  if (missing.length > 0) {
    content += `## Remaining\n`;
    for (const m of missing) {
      content += `- [ ] ${m}\n`;
    }
    content += '\n';
  }

  writeCheckpoint(content);
  return {
    message: 'Rich checkpoint written',
    path: '~/.claude/scratch/task-state.md',
    phase: effectivePhase,
    edits: state.edit_count,
    files: files.length,
  };
}

export function getCurrentCheckpoint() {
  const content = readCheckpointFresh();
  if (!content) {
    return { exists: false, message: 'No checkpoint found' };
  }
  return { exists: true, content };
}

export function getResumeInstructions() {
  const content = readCheckpointFresh();
  if (!content) {
    return { exists: false, message: 'No checkpoint to resume from' };
  }

  const state = readState();
  const missing = [];
  if (!state.tests_run) missing.push('tests');
  if (!state.review_run) missing.push('code review');

  let instructions = `## Resuming from Checkpoint\n\n`;
  instructions += content;
  instructions += `\n---\n`;
  instructions += `**Resume actions:**\n`;
  instructions += `1. Read the checkpoint above to understand current progress\n`;
  instructions += `2. Continue from phase: ${state.phase}\n`;
  if (missing.length > 0) {
    instructions += `3. Still pending: ${missing.join(', ')}\n`;
  }

  return { exists: true, instructions };
}
