#!/usr/bin/env bash
# ============================================================================
# Pipeline Enforcement Engine
#
# Called by Claude Code hooks to enforce orchestration patterns automatically.
# Hooks inject this script's stdout back into Claude's context as reminders.
#
# Actions:
#   session-start       Resume from checkpoint, output orchestration context
#   track-edit <file>   Record file change, conditionally remind about review
#   session-stop        End-of-task enforcement report
#   checkpoint [desc]   Write auto-checkpoint for compaction survival
#   phase <name>        Set current pipeline phase
#   reset               Clear state for a fresh task
#   suggest-delegate    Check if delegation is warranted and output suggestion
#
# State: ~/.claude/scratch/enforce-state.json
# Checkpoint: ~/.claude/scratch/task-state.md
# ============================================================================
set -euo pipefail

SCRATCH_DIR="${HOME}/.claude/scratch"
STATE_FILE="${SCRATCH_DIR}/enforce-state.json"
CHECKPOINT_FILE="${SCRATCH_DIR}/task-state.md"
CHANGES_LOG="${SCRATCH_DIR}/changed-files.log"

# Thresholds
SOFT_REMIND_EDITS=8
HARD_REMIND_EDITS=16
AUTO_CHECKPOINT_EDITS=6

# Delegation thresholds
DELEGATE_FILE_THRESHOLD=5       # 5+ files across 2+ dirs → suggest delegation
DELEGATE_DIR_THRESHOLD=2
DELEGATE_EDIT_THRESHOLD=10      # 10+ edits without any agent use → nag
FORCE_DELEGATE_EDITS=15         # 15+ edits → strong delegation message
KIRO_KEYWORDS="aws|amazon|brazil|cdk|lambda|dynamodb|pipeline|hydra|coral|isengard|cr|integration.test|sam|cloudformation|s3|sqs|sns|iam|ec2"

mkdir -p "$SCRATCH_DIR"

# ── State helpers (python3 for JSON) ─────────────────────────────────────────

ensure_state() {
  [ -f "$STATE_FILE" ] && return
  python3 -c "
import json, time
json.dump({
  'edit_count': 0,
  'files_changed': [],
  'last_remind_edit': 0,
  'tests_run': False,
  'review_run': False,
  'intel_updated': False,
  'checkpoint_at_edit': 0,
  'phase': 'idle',
  'task_summary': '',
  'session_start': int(time.time()),
  'agents_spawned': 0,
  'delegation_reminded': 0,
  'kiro_delegated': False
}, open('${STATE_FILE}', 'w'), indent=2)
"
}

read_state() {
  python3 -c "
import json
s = json.load(open('${STATE_FILE}'))
print(json.dumps(s))
" 2>/dev/null || echo '{}'
}

update_state() {
  local py_updates="$1"
  python3 -c "
import json
s = json.load(open('${STATE_FILE}'))
${py_updates}
json.dump(s, open('${STATE_FILE}', 'w'), indent=2)
" 2>/dev/null
}

# ── Actions ──────────────────────────────────────────────────────────────────

action_session_start() {
  ensure_state

  local output=""

  # Check for existing checkpoint (resuming after compaction or restart)
  if [ -f "$CHECKPOINT_FILE" ]; then
    local checkpoint_age
    checkpoint_age=$(python3 -c "
import os, time
age = time.time() - os.path.getmtime('${CHECKPOINT_FILE}')
print(int(age))
" 2>/dev/null || echo 99999)

    # Only resume if checkpoint is less than 2 hours old
    if [ "$checkpoint_age" -lt 7200 ]; then
      output="## Resuming from Checkpoint\n"
      output="${output}$(cat "$CHECKPOINT_FILE")\n"
      output="${output}\n**Action**: Read the checkpoint above. Continue from where you left off.\n"
    fi
  fi

  # Check intel freshness
  local cwd
  cwd=$(pwd)
  local intel_file="${cwd}/.claude/rules/project-intel.md"
  if [ -f "$intel_file" ]; then
    local intel_age_days
    intel_age_days=$(python3 -c "
import os, time
age_days = (time.time() - os.path.getmtime('${intel_file}')) / 86400
print(int(age_days))
" 2>/dev/null || echo 0)
    if [ "$intel_age_days" -gt 30 ]; then
      output="${output}\n## Intel Stale\nproject-intel.md is ${intel_age_days} days old. Run /intel-refresh."
    fi
  fi

  # Check for pending enforcement state from previous session
  if [ -f "$STATE_FILE" ]; then
    local pending
    pending=$(python3 -c "
import json
s = json.load(open('${STATE_FILE}'))
ec = s.get('edit_count', 0)
phase = s.get('phase', 'idle')
if ec > 0 and phase != 'idle':
    issues = []
    if not s.get('tests_run', False): issues.append('tests not run')
    if not s.get('review_run', False): issues.append('review not run')
    if not s.get('intel_updated', False) and ec > 5: issues.append('intel not updated')
    if issues:
        print(f'Previous session ended with {ec} edits: ' + ', '.join(issues))
    else:
        print('')
else:
    print('')
" 2>/dev/null || echo "")
    if [ -n "$pending" ]; then
      output="${output}\n## Previous Session\n${pending}"
    fi
  fi

  # Check for cmux availability
  if command -v cmux &>/dev/null; then
    output="${output}\n## Multi-Agent Ready\ncmux installed — use \`agent_spawn\` MCP tool or \`cmux new <branch>\` to run parallel agents in isolated worktrees."
  fi

  # Reset state for new session
  rm -f "$STATE_FILE"
  ensure_state

  if [ -n "$output" ]; then
    printf "%b" "$output"
  fi
}

action_track_edit() {
  local file="${1:-unknown}"
  ensure_state

  # Update state: increment edit count, add file
  update_state "
s['edit_count'] = s.get('edit_count', 0) + 1
files = s.get('files_changed', [])
if '$file' not in files:
    files.append('$file')
s['files_changed'] = files
s['phase'] = 'implement'
"

  # Append to changes log
  echo "$(date +%H:%M:%S) $file" >> "$CHANGES_LOG"

  # Read current state and produce formatted output directly from Python
  local reminder_output=""

  reminder_output=$(python3 -c "
import json, sys, os

state_file = '${STATE_FILE}'
s = json.load(open(state_file))
ec = s.get('edit_count', 0)
lr = s.get('last_remind_edit', 0)
files = s.get('files_changed', [])
tests = s.get('tests_run', False)
review = s.get('review_run', False)
ckpt = s.get('checkpoint_at_edit', 0)
agents_spawned = s.get('agents_spawned', 0)
delegation_reminded = s.get('delegation_reminded', 0)
kiro_delegated = s.get('kiro_delegated', False)

SOFT = ${SOFT_REMIND_EDITS}
HARD = ${HARD_REMIND_EDITS}
CKPT = ${AUTO_CHECKPOINT_EDITS}
DELEGATE_FILES = ${DELEGATE_FILE_THRESHOLD}
DELEGATE_DIRS = ${DELEGATE_DIR_THRESHOLD}
DELEGATE_EDITS = ${DELEGATE_EDIT_THRESHOLD}
FORCE_DELEGATE = ${FORCE_DELEGATE_EDITS}

need_checkpoint = ec - ckpt >= CKPT

flist = ', '.join(files[-8:])
if len(files) > 8:
    flist += f' (+{len(files)-8} more)'

# Count unique directories
dirs = set()
for f in files:
    d = os.path.dirname(f) or '.'
    dirs.add(d)
num_dirs = len(dirs)

# --- Delegation suggestions ---
delegation_msg = ''

# Check for Kiro keywords in task summary or changed files
task_summary = s.get('task_summary', '')
all_context = (task_summary + ' ' + ' '.join(files)).lower()
import re
kiro_pattern = '${KIRO_KEYWORDS}'
needs_kiro = not kiro_delegated and re.search(kiro_pattern, all_context)

if needs_kiro:
    delegation_msg += '## Delegate to Kiro\n'
    delegation_msg += 'This task involves Amazon/AWS systems. Kiro has internal tools (InternalCodeSearch, ReadRemoteTestRun, ReadInternalWebsites) that you lack.\n'
    delegation_msg += '**Action**: Run \`~/claude-code-setup/dispatch.sh --task \"<your prompt>\" --provider kiro\` for Amazon-specific work.\n\n'

# Multi-file delegation: many files across directories, no agents spawned
if len(files) >= DELEGATE_FILES and num_dirs >= DELEGATE_DIRS and agents_spawned == 0 and ec - delegation_reminded >= 5:
    delegation_msg += '## Delegate: Use Parallel Agents\n'
    delegation_msg += f'You have **{ec} edits** across **{len(files)} files** in **{num_dirs} directories** — all in the main context.\n'
    delegation_msg += 'Spawn parallel agents for independent work:\n'
    if not tests:
        delegation_msg += '- **Tests**: \`agent_spawn\` with branch \"test-<feature>\" and prompt to write tests\n'
    if not review:
        delegation_msg += '- **Review**: \`agent_spawn\` with branch \"review-<feature>\" and prompt to review changes\n'
    delegation_msg += '- **Implementation**: Split remaining work by concern into separate \`agent_spawn\` calls\n'
    delegation_msg += '\nEach agent gets its own git worktree — no conflicts with your work.\n\n'
    s['delegation_reminded'] = ec

# Force delegation at high edit count
if ec >= FORCE_DELEGATE and agents_spawned == 0 and not tests:
    delegation_msg += '## ENFORCEMENT: Delegate Now\n'
    delegation_msg += f'**{ec} edits** without spawning any parallel agents. You are doing all the work yourself.\n'
    delegation_msg += 'You MUST delegate at least one of these right now:\n'
    delegation_msg += '1. \`agent_spawn\` — tests for changed files\n'
    delegation_msg += '2. \`agent_spawn\` — code review of changes\n'
    delegation_msg += '3. Run tests directly if delegation is not possible\n\n'

if delegation_msg:
    print(delegation_msg.rstrip())

# --- Standard enforcement reminders ---
if ec >= HARD and ec - lr >= 8 and not tests:
    print('## ENFORCEMENT: Review Required')
    print(f'You have made **{ec} edits** across **{len(files)} files** without running tests or review.')
    print(f'Files: {flist}')
    print()
    print('**You MUST do these before continuing:**')
    print('1. Run tests for this project')
    print('2. Launch code-reviewer agent on changed files')
    print('3. Write a checkpoint (task progress, decisions, remaining work)')
    s['last_remind_edit'] = ec
elif ec >= SOFT and ec - lr >= SOFT and not tests:
    print('## Enforcement Reminder')
    print(f'{ec} edits across {len(files)} files. Consider running tests and review soon.')
    print(f'Changed: {flist}')
    s['last_remind_edit'] = ec

json.dump(s, open(state_file, 'w'), indent=2)

if need_checkpoint:
    print('__CHECKPOINT__', file=sys.stderr)
" 2>"${SCRATCH_DIR}/.enforce_stderr") || true

  # Handle auto-checkpoint signal
  if [ -f "${SCRATCH_DIR}/.enforce_stderr" ] && grep -q "__CHECKPOINT__" "${SCRATCH_DIR}/.enforce_stderr" 2>/dev/null; then
    action_auto_checkpoint
  fi
  rm -f "${SCRATCH_DIR}/.enforce_stderr"

  # Output reminder (if any)
  if [ -n "$reminder_output" ]; then
    echo "$reminder_output"
  fi
}

action_auto_checkpoint() {
  ensure_state

  local state_json
  state_json=$(read_state)

  python3 -c "
import json, time, subprocess

s = json.loads('''${state_json}''')

# Get git diff summary
try:
    diff = subprocess.check_output(['git', 'diff', '--name-only'], stderr=subprocess.DEVNULL, timeout=5).decode().strip()
    staged = subprocess.check_output(['git', 'diff', '--staged', '--name-only'], stderr=subprocess.DEVNULL, timeout=5).decode().strip()
except:
    diff = ''
    staged = ''

files = s.get('files_changed', [])
phase = s.get('phase', 'unknown')
ec = s.get('edit_count', 0)

with open('${CHECKPOINT_FILE}', 'w') as f:
    f.write(f'# Auto-Checkpoint\n')
    f.write(f'> Generated: {time.strftime(\"%Y-%m-%d %H:%M:%S\")}\n\n')
    f.write(f'## Phase: {phase}\n')
    f.write(f'## Edits: {ec}\n\n')
    f.write(f'## Files Changed ({len(files)})\n')
    for fpath in files:
        f.write(f'- {fpath}\n')
    if diff or staged:
        f.write(f'\n## Git Status\n')
        if staged:
            f.write(f'Staged: {staged}\n')
        if diff:
            f.write(f'Unstaged: {diff}\n')
    f.write(f'\n## TODO\n')
    f.write(f'- [ ] Run tests\n')
    f.write(f'- [ ] Run review\n')
    f.write(f'- [ ] Update intel if structural changes\n')
" 2>/dev/null

  update_state "s['checkpoint_at_edit'] = s['edit_count']"
}

action_checkpoint() {
  local desc="${1:-manual checkpoint}"
  ensure_state
  action_auto_checkpoint

  # If a description was provided, prepend it to the checkpoint
  if [ "$desc" != "manual checkpoint" ] && [ -f "$CHECKPOINT_FILE" ]; then
    local tmp
    tmp=$(mktemp)
    {
      echo "# Task Checkpoint"
      echo "> $desc"
      echo ""
      tail -n +2 "$CHECKPOINT_FILE"
    } > "$tmp"
    mv "$tmp" "$CHECKPOINT_FILE"
  fi

  echo "Checkpoint written to ${CHECKPOINT_FILE}"
}

action_session_stop() {
  ensure_state

  local state_json
  state_json=$(read_state)

  python3 -c "
import json
s = json.loads('''${state_json}''')
ec = s.get('edit_count', 0)
files = s.get('files_changed', [])
tests = s.get('tests_run', False)
review = s.get('review_run', False)
intel = s.get('intel_updated', False)
phase = s.get('phase', 'idle')
agents = s.get('agents_spawned', 0)

if ec == 0:
    # No edits made, nothing to report
    exit(0)

print('## Pipeline Enforcement Report')
print(f'Phase: {phase} | Edits: {ec} | Files: {len(files)} | Agents spawned: {agents}')
print()

issues = []
if not tests:
    issues.append('TESTS NOT RUN — run tests before considering this task complete')
if not review:
    issues.append('REVIEW NOT RUN — launch code-reviewer on changed files')
if not intel and ec > 5:
    issues.append('INTEL NOT UPDATED — run /intel-refresh if structural changes were made')
if agents == 0 and ec >= 10:
    issues.append('NO AGENTS USED — for tasks this size, delegate testing/review to parallel agents')

if issues:
    print('### Missing Steps')
    for i in issues:
        print(f'- {i}')
    print()
    print('**Recommendation**: Complete these before moving on.')
else:
    print('All enforcement checks passed.')
" 2>/dev/null
}

action_phase() {
  local phase="${1:-unknown}"
  ensure_state
  update_state "s['phase'] = '${phase}'"
}

action_mark() {
  local what="${1:-}"
  ensure_state
  case "$what" in
    tests)   update_state "s['tests_run'] = True" ;;
    review)  update_state "s['review_run'] = True" ;;
    intel)   update_state "s['intel_updated'] = True" ;;
    agent)   update_state "s['agents_spawned'] = s.get('agents_spawned', 0) + 1" ;;
    kiro)    update_state "s['kiro_delegated'] = True" ;;
    *)       echo "Usage: enforce.sh mark [tests|review|intel|agent|kiro]" >&2; exit 1 ;;
  esac
}

action_reset() {
  rm -f "$STATE_FILE" "$CHECKPOINT_FILE" "$CHANGES_LOG"
  ensure_state
  echo "Pipeline state reset."
}

action_status() {
  ensure_state
  python3 -c "
import json
s = json.load(open('${STATE_FILE}'))
print(f\"Phase: {s.get('phase','idle')} | Edits: {s.get('edit_count',0)} | Files: {len(s.get('files_changed',[]))}\")
print(f\"Tests: {'yes' if s.get('tests_run') else 'no'} | Review: {'yes' if s.get('review_run') else 'no'} | Intel: {'yes' if s.get('intel_updated') else 'no'}\")
print(f\"Agents spawned: {s.get('agents_spawned',0)} | Kiro delegated: {'yes' if s.get('kiro_delegated') else 'no'}\")
ckpt = 'exists' if __import__('os').path.exists('${CHECKPOINT_FILE}') else 'none'
print(f\"Checkpoint: {ckpt}\")
" 2>/dev/null
}

# ── Main ─────────────────────────────────────────────────────────────────────

ACTION="${1:-}"
shift 2>/dev/null || true

case "$ACTION" in
  session-start)  action_session_start ;;
  track-edit)     action_track_edit "$@" ;;
  session-stop)   action_session_stop ;;
  checkpoint)     action_checkpoint "$*" ;;
  auto-checkpoint) action_auto_checkpoint ;;
  phase)          action_phase "$@" ;;
  mark)           action_mark "$@" ;;
  reset)          action_reset ;;
  status)         action_status ;;
  *)
    echo "Usage: enforce.sh <action> [args]"
    echo "Actions: session-start, track-edit, session-stop, checkpoint, phase, mark, reset, status"
    exit 1
    ;;
esac
