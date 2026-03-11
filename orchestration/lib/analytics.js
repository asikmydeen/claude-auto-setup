import { getDb } from './db.js';

export function logEvent(sessionId, type, detail) {
  const db = getDb();
  db.prepare(
    'INSERT INTO events (session_id, timestamp, type, detail) VALUES (?, ?, ?, ?)'
  ).run(sessionId, Math.floor(Date.now() / 1000), type, detail || null);
  return { logged: true, type };
}

export function startSession(sessionId, project, cwd) {
  const db = getDb();
  db.prepare(
    'INSERT OR REPLACE INTO sessions (id, started_at, project, cwd) VALUES (?, ?, ?, ?)'
  ).run(sessionId, Math.floor(Date.now() / 1000), project || null, cwd || null);
  logEvent(sessionId, 'session_start', `Project: ${project || 'unknown'}`);
  return { session_id: sessionId, message: 'Session started' };
}

export function endSession(sessionId, state) {
  const db = getDb();
  db.prepare(`
    UPDATE sessions SET
      ended_at = ?,
      edit_count = ?,
      files_changed = ?,
      tests_run = ?,
      review_run = ?,
      intel_updated = ?,
      outcome = ?
    WHERE id = ?
  `).run(
    Math.floor(Date.now() / 1000),
    state.edit_count || 0,
    state.files_changed?.length || 0,
    state.tests_run ? 1 : 0,
    state.review_run ? 1 : 0,
    state.intel_updated ? 1 : 0,
    state.tests_run && state.review_run ? 'complete' : 'incomplete',
    sessionId,
  );
  logEvent(sessionId, 'session_end', `Edits: ${state.edit_count}, Phase: ${state.phase}`);
  return { message: 'Session ended' };
}

export function getSessionSummary(limit = 10) {
  const db = getDb();
  const sessions = db.prepare(`
    SELECT id, started_at, ended_at, project, edit_count, files_changed,
           tests_run, review_run, intel_updated, outcome
    FROM sessions ORDER BY started_at DESC LIMIT ?
  `).all(limit);

  const stats = db.prepare(`
    SELECT
      COUNT(*) as total_sessions,
      AVG(edit_count) as avg_edits,
      SUM(CASE WHEN tests_run = 1 THEN 1 ELSE 0 END) as sessions_with_tests,
      SUM(CASE WHEN review_run = 1 THEN 1 ELSE 0 END) as sessions_with_review,
      SUM(CASE WHEN intel_updated = 1 THEN 1 ELSE 0 END) as sessions_with_intel,
      SUM(CASE WHEN outcome = 'complete' THEN 1 ELSE 0 END) as complete_sessions
    FROM sessions WHERE ended_at IS NOT NULL
  `).get();

  return {
    recent_sessions: sessions,
    overall_stats: {
      total: stats.total_sessions,
      avg_edits: Math.round(stats.avg_edits || 0),
      test_compliance: stats.total_sessions > 0
        ? Math.round((stats.sessions_with_tests / stats.total_sessions) * 100) + '%'
        : 'N/A',
      review_compliance: stats.total_sessions > 0
        ? Math.round((stats.sessions_with_review / stats.total_sessions) * 100) + '%'
        : 'N/A',
      intel_compliance: stats.total_sessions > 0
        ? Math.round((stats.sessions_with_intel / stats.total_sessions) * 100) + '%'
        : 'N/A',
      completion_rate: stats.total_sessions > 0
        ? Math.round((stats.complete_sessions / stats.total_sessions) * 100) + '%'
        : 'N/A',
    },
  };
}

export function getPatterns() {
  const db = getDb();

  const eventCounts = db.prepare(`
    SELECT type, COUNT(*) as count
    FROM events
    WHERE timestamp > ?
    GROUP BY type
    ORDER BY count DESC
    LIMIT 20
  `).all(Math.floor(Date.now() / 1000) - 30 * 86400);

  const skippedSteps = db.prepare(`
    SELECT
      SUM(CASE WHEN tests_run = 0 THEN 1 ELSE 0 END) as tests_skipped,
      SUM(CASE WHEN review_run = 0 THEN 1 ELSE 0 END) as reviews_skipped,
      SUM(CASE WHEN intel_updated = 0 AND edit_count > 5 THEN 1 ELSE 0 END) as intel_skipped,
      COUNT(*) as total
    FROM sessions
    WHERE ended_at IS NOT NULL AND ended_at > ?
  `).get(Math.floor(Date.now() / 1000) - 30 * 86400);

  const busyHours = db.prepare(`
    SELECT (started_at / 3600 % 24) as hour, COUNT(*) as count
    FROM sessions
    WHERE started_at > ?
    GROUP BY hour
    ORDER BY count DESC
    LIMIT 5
  `).all(Math.floor(Date.now() / 1000) - 30 * 86400);

  return {
    period: 'last 30 days',
    event_frequency: eventCounts,
    skipped_steps: skippedSteps,
    most_active_hours: busyHours,
    insights: generateInsights(skippedSteps),
  };
}

function generateInsights(skipped) {
  if (!skipped || !skipped.total) return ['No data yet. Use the pipeline for a few sessions.'];

  const insights = [];
  const total = skipped.total;

  if (skipped.tests_skipped > total * 0.5) {
    insights.push(`Tests skipped in ${Math.round(skipped.tests_skipped/total*100)}% of sessions — consider enforcing test runs before commits.`);
  }
  if (skipped.reviews_skipped > total * 0.6) {
    insights.push(`Code review skipped in ${Math.round(skipped.reviews_skipped/total*100)}% of sessions — the review step may need stronger enforcement.`);
  }
  if (skipped.intel_skipped > total * 0.7) {
    insights.push(`Intel updates skipped frequently — consider auto-refreshing intel on git push.`);
  }
  if (insights.length === 0) {
    insights.push('Good compliance across test, review, and intel update steps.');
  }

  return insights;
}
