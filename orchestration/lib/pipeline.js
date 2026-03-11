import { readState, updateState, writeState, readChangesLog } from './state.js';

const VALID_PHASES = ['idle', 'explore', 'plan', 'implement', 'review', 'verify', 'done'];
const VALID_MARKS = ['tests', 'review', 'intel'];

export function getStatus() {
  const state = readState();
  const changes = readChangesLog();

  return {
    phase: state.phase,
    edit_count: state.edit_count,
    files_changed: state.files_changed,
    files_changed_count: state.files_changed.length,
    tests_run: state.tests_run,
    review_run: state.review_run,
    intel_updated: state.intel_updated,
    task_summary: state.task_summary,
    session_start: state.session_start,
    recent_changes: changes.slice(-10),
    missing_steps: getMissingSteps(state),
  };
}

export function setPhase(phase) {
  if (!VALID_PHASES.includes(phase)) {
    return { error: `Invalid phase: ${phase}. Valid: ${VALID_PHASES.join(', ')}` };
  }
  const state = updateState({ phase });
  return { phase: state.phase, message: `Phase set to: ${phase}` };
}

export function markDone(what) {
  if (!VALID_MARKS.includes(what)) {
    return { error: `Invalid mark: ${what}. Valid: ${VALID_MARKS.join(', ')}` };
  }
  const key = what === 'tests' ? 'tests_run' : what === 'review' ? 'review_run' : 'intel_updated';
  const state = updateState({ [key]: true });
  return { marked: what, message: `Marked ${what} as done`, missing_steps: getMissingSteps(state) };
}

export function setTaskSummary(summary) {
  updateState({ task_summary: summary });
  return { message: `Task summary set: ${summary}` };
}

export function resetPipeline() {
  const fresh = {
    edit_count: 0,
    files_changed: [],
    last_remind_edit: 0,
    tests_run: false,
    review_run: false,
    intel_updated: false,
    checkpoint_at_edit: 0,
    phase: 'idle',
    task_summary: '',
    session_start: Math.floor(Date.now() / 1000),
  };
  writeState(fresh);
  return { message: 'Pipeline state reset for new task' };
}

function getMissingSteps(state) {
  const missing = [];
  if (!state.tests_run) missing.push('tests');
  if (!state.review_run) missing.push('review');
  if (!state.intel_updated && state.edit_count > 5) missing.push('intel update');
  return missing;
}
