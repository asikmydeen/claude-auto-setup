import Database from 'better-sqlite3';
import { join } from 'path';
import { mkdirSync } from 'fs';
import { homedir } from 'os';

const DATA_DIR = join(homedir(), '.claude', 'orchestration');
const DB_PATH = join(DATA_DIR, 'analytics.db');

let _db = null;

export function getDb() {
  if (_db) return _db;

  mkdirSync(DATA_DIR, { recursive: true });
  _db = new Database(DB_PATH);
  _db.pragma('journal_mode = WAL');
  _db.pragma('busy_timeout = 3000');

  _db.exec(`
    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      started_at INTEGER NOT NULL,
      ended_at INTEGER,
      project TEXT,
      cwd TEXT,
      edit_count INTEGER DEFAULT 0,
      files_changed INTEGER DEFAULT 0,
      tests_run INTEGER DEFAULT 0,
      review_run INTEGER DEFAULT 0,
      intel_updated INTEGER DEFAULT 0,
      outcome TEXT
    );

    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id TEXT,
      timestamp INTEGER NOT NULL,
      type TEXT NOT NULL,
      detail TEXT,
      FOREIGN KEY (session_id) REFERENCES sessions(id)
    );

    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      session_id TEXT,
      created_at INTEGER NOT NULL,
      started_at INTEGER,
      completed_at INTEGER,
      status TEXT DEFAULT 'pending',
      provider TEXT,
      task_type TEXT,
      prompt TEXT,
      output_file TEXT,
      result TEXT,
      FOREIGN KEY (session_id) REFERENCES sessions(id)
    );

    CREATE INDEX IF NOT EXISTS idx_events_session ON events(session_id);
    CREATE INDEX IF NOT EXISTS idx_events_type ON events(type);
    CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
  `);

  return _db;
}

export function getDataDir() {
  return DATA_DIR;
}
