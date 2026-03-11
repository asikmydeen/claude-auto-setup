import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';

const SCRATCH_DIR = join(homedir(), '.claude', 'scratch');
const STATE_FILE = join(SCRATCH_DIR, 'enforce-state.json');
const CHECKPOINT_FILE = join(SCRATCH_DIR, 'task-state.md');
const QUEUE_FILE = join(SCRATCH_DIR, 'task-queue.json');
const CHANGES_LOG = join(SCRATCH_DIR, 'changed-files.log');

export function ensureDir() {
  mkdirSync(SCRATCH_DIR, { recursive: true });
}

const DEFAULT_STATE = {
  edit_count: 0,
  files_changed: [],
  last_remind_edit: 0,
  tests_run: false,
  review_run: false,
  intel_updated: false,
  checkpoint_at_edit: 0,
  phase: 'idle',
  task_summary: '',
  session_start: 0,
};

export function readState() {
  try {
    return JSON.parse(readFileSync(STATE_FILE, 'utf8'));
  } catch {
    return { ...DEFAULT_STATE };
  }
}

export function writeState(state) {
  ensureDir();
  writeFileSync(STATE_FILE, JSON.stringify(state, null, 2) + '\n');
}

export function updateState(updates) {
  const state = readState();
  Object.assign(state, updates);
  writeState(state);
  return state;
}

export function readCheckpoint() {
  try {
    return readFileSync(CHECKPOINT_FILE, 'utf8');
  } catch {
    return null;
  }
}

export function writeCheckpoint(content) {
  ensureDir();
  writeFileSync(CHECKPOINT_FILE, content);
}

export function readQueue() {
  try {
    return JSON.parse(readFileSync(QUEUE_FILE, 'utf8'));
  } catch {
    return { tasks: [] };
  }
}

export function writeQueue(queue) {
  ensureDir();
  writeFileSync(QUEUE_FILE, JSON.stringify(queue, null, 2) + '\n');
}

export function readChangesLog() {
  try {
    return readFileSync(CHANGES_LOG, 'utf8').trim().split('\n').filter(Boolean);
  } catch {
    return [];
  }
}

export { SCRATCH_DIR, STATE_FILE, CHECKPOINT_FILE, QUEUE_FILE };
