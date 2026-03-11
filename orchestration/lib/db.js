import initSqlJs from 'sql.js';
import { join } from 'path';
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'fs';
import { homedir } from 'os';

const DATA_DIR = join(homedir(), '.claude', 'orchestration');
const DB_PATH = join(DATA_DIR, 'analytics.db');

let _db = null;

export async function getDb() {
  if (_db) return _db;

  mkdirSync(DATA_DIR, { recursive: true });

  const SQL = await initSqlJs();

  if (existsSync(DB_PATH)) {
    const buffer = readFileSync(DB_PATH);
    _db = new SQL.Database(buffer);
  } else {
    _db = new SQL.Database();
  }

  _db.run(`
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
      detail TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_events_session ON events(session_id);
    CREATE INDEX IF NOT EXISTS idx_events_type ON events(type);
  `);

  return _db;
}

export function persistDb() {
  if (!_db) return;
  mkdirSync(DATA_DIR, { recursive: true });
  const data = _db.export();
  writeFileSync(DB_PATH, Buffer.from(data));
}

export function getDataDir() {
  return DATA_DIR;
}
