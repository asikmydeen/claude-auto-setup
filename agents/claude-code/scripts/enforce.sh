#!/usr/bin/env bash
# ============================================================================
# Pipeline Enforcement Engine
#
# Called by Claude Code hooks to enforce orchestration patterns automatically.
# Hooks inject this script's stdout back into Claude's context as reminders.
#
# Actions:
#   session-start       Resume from checkpoint, output orchestration context
#   pre-edit <file>     PreToolUse: warn BEFORE first edit if no agents spawned
#   track-edit <file>   PostToolUse: record file change, enforce delegation
#   session-stop        End-of-task enforcement report
#   checkpoint [desc]   Write auto-checkpoint for compaction survival
#   phase <name>        Set current pipeline phase
#   reset               Clear state for a fresh task
#   status              Show current enforcement state
#
# State: ~/.claude/scratch/enforce-state.json
# Checkpoint: ~/.claude/scratch/task-state.md
# ============================================================================
set -euo pipefail

# Hard dependency check — fail fast with clear message
if ! command -v python3 &>/dev/null; then
  echo "## Enforcement Disabled: python3 not found" >&2
  exit 0
fi

SCRATCH_DIR_DEFAULT="${HOME}/.claude/scratch"
SCRATCH_DIR="${ENFORCE_SCRATCH_DIR:-$SCRATCH_DIR_DEFAULT}"

# Fall back when ~/.claude is not writable (e.g., sandboxed environments).
if ! mkdir -p "$SCRATCH_DIR" 2>/dev/null; then
  SCRATCH_DIR="${TMPDIR:-/tmp}/claude-enforce-${USER:-user}"
  mkdir -p "$SCRATCH_DIR" 2>/dev/null || true
else
  WRITE_TEST_FILE="$SCRATCH_DIR/.write-test.$$"
  if ! ( touch "$WRITE_TEST_FILE" 2>/dev/null && rm -f "$WRITE_TEST_FILE" 2>/dev/null ); then
    SCRATCH_DIR="${TMPDIR:-/tmp}/claude-enforce-${USER:-user}"
    mkdir -p "$SCRATCH_DIR" 2>/dev/null || true
  fi
fi

STATE_FILE="${SCRATCH_DIR}/enforce-state.json"
CHECKPOINT_FILE="${SCRATCH_DIR}/task-state.md"
CHANGES_LOG="${SCRATCH_DIR}/changed-files.log"

# Thresholds — aggressive early intervention
MULTI_FILE_WARN=2               # 2 unique files → warn about agents
MULTI_FILE_ENFORCE=3            # 3 unique files without agents → enforce
SOFT_REMIND_EDITS=3             # 3 edits → soft reminder
HARD_REMIND_EDITS=6             # 6 edits → hard enforcement
AUTO_CHECKPOINT_EDITS=4         # Checkpoint every 4 edits
FORCE_DELEGATE_EDITS=6          # 6+ edits without agents → forced delegation
PUA_L1_FAILURES=2               # 2nd failure → L1 (mild disappointment)
PUA_L2_FAILURES=3               # 3rd failure → L2 (soul interrogation)
PUA_L3_FAILURES=4               # 4th failure → L3 (performance review)
PUA_L4_FAILURES=5               # 5th+ failure → L4 (graduation warning)
KIRO_KEYWORDS="aws|amazon|brazil|cdk|lambda|dynamodb|pipeline|hydra|coral|isengard|cr|integration.test|sam|cloudformation|s3|sqs|sns|iam|ec2"


# ── State helpers ────────────────────────────────────────────────────────────
# File paths are passed via ENFORCE_FILE env var (not shell interpolation)
# to prevent Python injection from filenames with quotes/special chars.

ensure_state() {
  [ -f "$STATE_FILE" ] && return
  ENFORCE_STATE_FILE="$STATE_FILE" python3 -c "
import json, time, os
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
  'explore_done': False,
  'delegation_reminded': 0,
  'kiro_delegated': False,
  'first_edit_warned': False,
  'failure_count': 0,
  'pua_level': 0
}, open(os.environ['ENFORCE_STATE_FILE'], 'w'), indent=2)
"
}

read_state() {
  ENFORCE_STATE_FILE="$STATE_FILE" python3 -c "
import json, os
s = json.load(open(os.environ['ENFORCE_STATE_FILE']))
print(json.dumps(s))
" 2>/dev/null || echo '{}'
}

update_state() {
  local py_updates="$1"
  ENFORCE_STATE_FILE="$STATE_FILE" python3 -c "
import json, os
sf = os.environ['ENFORCE_STATE_FILE']
s = json.load(open(sf))
${py_updates}
json.dump(s, open(sf, 'w'), indent=2)
" 2>/dev/null
}

# ── Actions ──────────────────────────────────────────────────────────────────

action_session_start() {
  ensure_state

  local output=""

  # Check for existing checkpoint (resuming after compaction or restart)
  if [ -f "$CHECKPOINT_FILE" ]; then
    local checkpoint_age
    checkpoint_age=$(ENFORCE_CKPT="$CHECKPOINT_FILE" python3 -c "
import os, time
age = time.time() - os.path.getmtime(os.environ['ENFORCE_CKPT'])
print(int(age))
" 2>/dev/null || echo 99999)

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
    intel_age_days=$(ENFORCE_INTEL="$intel_file" python3 -c "
import os, time
age_days = (time.time() - os.path.getmtime(os.environ['ENFORCE_INTEL'])) / 86400
print(int(age_days))
" 2>/dev/null || echo 0)
    if [ "$intel_age_days" -gt 30 ]; then
      output="${output}\n## Intel Stale\nproject-intel.md is ${intel_age_days} days old. Run /intel-refresh."
    fi
  fi

  # Check for pending enforcement state from previous session
  if [ -f "$STATE_FILE" ]; then
    local pending
    pending=$(ENFORCE_STATE_FILE="$STATE_FILE" python3 -c "
import json, os
s = json.load(open(os.environ['ENFORCE_STATE_FILE']))
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

# ── PRE-EDIT: Called BEFORE Edit/Write via PreToolUse hook ───────────────────
# This is the critical intervention point. It fires before Claude makes its
# first edit, giving it a chance to spawn agents instead.
action_pre_edit() {
  local file="${1:-unknown}"
  ensure_state

  ENFORCE_FILE="$file" ENFORCE_STATE_FILE="$STATE_FILE" python3 -c "
import json, os

sf = os.environ['ENFORCE_STATE_FILE']
edit_file = os.environ['ENFORCE_FILE']

s = json.load(open(sf))
ec = s.get('edit_count', 0)
agents = s.get('agents_spawned', 0)
explore = s.get('explore_done', False)
warned = s.get('first_edit_warned', False)
files = s.get('files_changed', [])

# Count unique files INCLUDING the one about to be edited
all_files = list(set(files + [edit_file]))
num_files = len(all_files)
dirs = set(os.path.dirname(f) or '.' for f in all_files)
num_dirs = len(dirs)

# --- First edit with no agents: strong intervention ---
if ec == 0 and agents == 0 and not warned:
    print('## MULTI-AGENT CHECK')
    print('You are about to make your FIRST edit without spawning any agents.')
    print('Before editing, you MUST:')
    print('1. Spawn an explorer agent (background) to gather context')
    print('2. If task touches 2+ files: decompose by concern, spawn parallel agents')
    print('3. If task spans layers (FE/BE/tests/infra): one agent per layer')
    print()
    print('Only skip agents for trivial single-file changes (< 30 lines).')
    print('Use: Agent(subagent_type=\"explorer\", run_in_background=true, prompt=\"...\")')
    s['first_edit_warned'] = True
    json.dump(s, open(sf, 'w'), indent=2)

# --- Multiple files without agents: escalating warnings ---
elif num_files >= 3 and agents == 0:
    print('## ENFORCEMENT: Multi-File Without Agents')
    print(f'Editing {num_files} files across {num_dirs} directories with ZERO agents spawned.')
    print('You MUST spawn parallel agents now:')
    print('- Agent(subagent_type=\"explorer\") — for remaining research')
    print('- Agent(isolation=\"worktree\") — for independent file groups')
    print('- Agent(subagent_type=\"test-writer\", run_in_background=true) — for tests')

elif num_files >= 2 and agents == 0 and not explore:
    print('## Multi-File Detected')
    print(f'Touching {num_files} files without agents. Consider spawning:')
    print('- Explorer agent for context gathering')
    print('- Parallel agents for independent concerns')
" 2>/dev/null || true
}

# ── TRACK-EDIT: Called AFTER Edit/Write via PostToolUse hook ─────────────────
action_track_edit() {
  local file="${1:-unknown}"
  ensure_state

  # Update state: increment edit count, add file (via env var — safe from injection)
  ENFORCE_FILE="$file" ENFORCE_STATE_FILE="$STATE_FILE" python3 -c "
import json, os
sf = os.environ['ENFORCE_STATE_FILE']
edit_file = os.environ['ENFORCE_FILE']
s = json.load(open(sf))
s['edit_count'] = s.get('edit_count', 0) + 1
files = s.get('files_changed', [])
if edit_file not in files:
    files.append(edit_file)
s['files_changed'] = files
s['phase'] = 'implement'
json.dump(s, open(sf, 'w'), indent=2)
" 2>/dev/null

  # Append to changes log
  echo "$(date +%H:%M:%S) $file" >> "$CHANGES_LOG"

  # Read current state and produce enforcement output
  local reminder_output=""

  reminder_output=$(ENFORCE_STATE_FILE="$STATE_FILE" \
    ENFORCE_SOFT="$SOFT_REMIND_EDITS" \
    ENFORCE_HARD="$HARD_REMIND_EDITS" \
    ENFORCE_CKPT_INTERVAL="$AUTO_CHECKPOINT_EDITS" \
    ENFORCE_FORCE="$FORCE_DELEGATE_EDITS" \
    ENFORCE_MF_WARN="$MULTI_FILE_WARN" \
    ENFORCE_MF_ENFORCE="$MULTI_FILE_ENFORCE" \
    ENFORCE_KIRO_KEYWORDS="$KIRO_KEYWORDS" \
    python3 -c "
import json, sys, os, re

sf = os.environ['ENFORCE_STATE_FILE']
s = json.load(open(sf))
ec = s.get('edit_count', 0)
lr = s.get('last_remind_edit', 0)
files = s.get('files_changed', [])
tests = s.get('tests_run', False)
review = s.get('review_run', False)
ckpt = s.get('checkpoint_at_edit', 0)
agents_spawned = s.get('agents_spawned', 0)
delegation_reminded = s.get('delegation_reminded', 0)
kiro_delegated = s.get('kiro_delegated', False)

SOFT = int(os.environ['ENFORCE_SOFT'])
HARD = int(os.environ['ENFORCE_HARD'])
CKPT = int(os.environ['ENFORCE_CKPT_INTERVAL'])
FORCE_DELEGATE = int(os.environ['ENFORCE_FORCE'])
MULTI_FILE_WARN = int(os.environ['ENFORCE_MF_WARN'])
MULTI_FILE_ENFORCE = int(os.environ['ENFORCE_MF_ENFORCE'])

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
num_files = len(files)

# --- Kiro delegation check ---
task_summary = s.get('task_summary', '')
all_context = (task_summary + ' ' + ' '.join(files)).lower()
kiro_pattern = os.environ['ENFORCE_KIRO_KEYWORDS']
needs_kiro = not kiro_delegated and re.search(kiro_pattern, all_context)

if needs_kiro:
    print('## Delegate to Kiro')
    print('This task involves Amazon/AWS systems. Use dispatch.sh --provider kiro.')

# --- Multi-file enforcement (fires EARLY) ---
if num_files >= MULTI_FILE_ENFORCE and agents_spawned == 0:
    print('## ENFORCEMENT: Spawn Agents Now')
    print(f'{ec} edits across {num_files} files in {num_dirs} dirs — all solo.')
    print('You MUST spawn at least one of:')
    print('1. test-writer agent (background) for changed files')
    print('2. code-reviewer agent for quality review')
    print('3. worktree agent for remaining independent work')
    print()
    s['delegation_reminded'] = ec
elif num_files >= MULTI_FILE_WARN and agents_spawned == 0 and ec - delegation_reminded >= 2:
    print(f'## Agent Reminder: {num_files} files changed, 0 agents spawned')
    s['delegation_reminded'] = ec

# --- Force delegation at threshold ---
if ec >= FORCE_DELEGATE and agents_spawned == 0:
    print('## HARD ENFORCEMENT: Delegate or Justify')
    print(f'{ec} edits without ANY parallel agents. This violates multi-agent protocol.')
    print('STOP editing and do one of:')
    print('1. Spawn test-writer + code-reviewer agents in parallel')
    print('2. If truly single-concern: acknowledge with enforce.sh mark agent')

# --- Standard reminders ---
if ec >= HARD and ec - lr >= 4 and not tests:
    print('## ENFORCEMENT: Tests + Review Required')
    print(f'{ec} edits across {num_files} files without tests or review.')
    print(f'Files: {flist}')
    print('Run tests NOW. Spawn code-reviewer agent.')
    s['last_remind_edit'] = ec
elif ec >= SOFT and ec - lr >= SOFT and not tests:
    print(f'## Reminder: {ec} edits, {num_files} files — run tests soon')
    s['last_remind_edit'] = ec

json.dump(s, open(sf, 'w'), indent=2)

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

  ENFORCE_STATE_JSON="$state_json" ENFORCE_CKPT="$CHECKPOINT_FILE" python3 -c "
import json, time, subprocess, os

s = json.loads(os.environ['ENFORCE_STATE_JSON'])
ckpt_file = os.environ['ENFORCE_CKPT']

# Get git diff summary
try:
    diff = subprocess.check_output(['git', 'diff', '--name-only'], stderr=subprocess.DEVNULL, timeout=5).decode().strip()
    staged = subprocess.check_output(['git', 'diff', '--staged', '--name-only'], stderr=subprocess.DEVNULL, timeout=5).decode().strip()
except Exception:
    diff = ''
    staged = ''

files = s.get('files_changed', [])
phase = s.get('phase', 'unknown')
ec = s.get('edit_count', 0)

with open(ckpt_file, 'w') as f:
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

  ENFORCE_STATE_JSON="$state_json" python3 -c "
import json, os
s = json.loads(os.environ['ENFORCE_STATE_JSON'])
ec = s.get('edit_count', 0)
files = s.get('files_changed', [])
tests = s.get('tests_run', False)
review = s.get('review_run', False)
intel = s.get('intel_updated', False)
phase = s.get('phase', 'idle')
agents = s.get('agents_spawned', 0)
failures = s.get('failure_count', 0)
pua_level = s.get('pua_level', 0)

if ec == 0:
    exit(0)

print('## Pipeline Enforcement Report')
print(f'Phase: {phase} | Edits: {ec} | Files: {len(files)} | Agents spawned: {agents}')
if failures > 0:
    print(f'PUA: Level {pua_level} | Failures: {failures}')
print()

issues = []
if not tests:
    issues.append('TESTS NOT RUN — run tests before considering this task complete')
if not review:
    issues.append('REVIEW NOT RUN — launch code-reviewer on changed files')
if not intel and ec > 3:
    issues.append('INTEL NOT UPDATED — run /intel-refresh if structural changes were made')
if agents == 0 and ec >= 3:
    issues.append(f'NO AGENTS USED — {ec} edits across {len(files)} files all done solo')

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
    explore) update_state "s['explore_done'] = True" ;;
    kiro)    update_state "s['kiro_delegated'] = True" ;;
    failure) action_pua_escalate ;;
    *)       echo "Usage: enforce.sh mark [tests|review|intel|agent|explore|kiro|failure]" >&2; exit 1 ;;
  esac
}

action_reset() {
  rm -f "$STATE_FILE" "$CHECKPOINT_FILE" "$CHANGES_LOG"
  ensure_state
  echo "Pipeline state reset."
}

action_status() {
  ensure_state
  ENFORCE_STATE_FILE="$STATE_FILE" ENFORCE_CKPT="$CHECKPOINT_FILE" python3 -c "
import json, os
s = json.load(open(os.environ['ENFORCE_STATE_FILE']))
print(f\"Phase: {s.get('phase','idle')} | Edits: {s.get('edit_count',0)} | Files: {len(s.get('files_changed',[]))}\")
print(f\"Tests: {'yes' if s.get('tests_run') else 'no'} | Review: {'yes' if s.get('review_run') else 'no'} | Intel: {'yes' if s.get('intel_updated') else 'no'}\")
print(f\"Agents spawned: {s.get('agents_spawned',0)} | Explore: {'yes' if s.get('explore_done') else 'no'}\")
print(f\"PUA: level {s.get('pua_level',0)} | Failures: {s.get('failure_count',0)}\")
ckpt = 'exists' if os.path.exists(os.environ['ENFORCE_CKPT']) else 'none'
print(f\"Checkpoint: {ckpt}\")
" 2>/dev/null
}

# ── PUA Escalation ────────────────────────────────────────────────────────────
# Called when a task/build/test failure is detected. Increments failure counter
# and outputs PUA pressure rhetoric at the corresponding level.

action_pua_escalate() {
  ensure_state

  ENFORCE_STATE_FILE="$STATE_FILE" \
    ENFORCE_PUA_L1="$PUA_L1_FAILURES" \
    ENFORCE_PUA_L2="$PUA_L2_FAILURES" \
    ENFORCE_PUA_L3="$PUA_L3_FAILURES" \
    ENFORCE_PUA_L4="$PUA_L4_FAILURES" \
    python3 -c "
import json, os

sf = os.environ['ENFORCE_STATE_FILE']
s = json.load(open(sf))
s['failure_count'] = s.get('failure_count', 0) + 1
fc = s['failure_count']

L1 = int(os.environ['ENFORCE_PUA_L1'])
L2 = int(os.environ['ENFORCE_PUA_L2'])
L3 = int(os.environ['ENFORCE_PUA_L3'])
L4 = int(os.environ['ENFORCE_PUA_L4'])

if fc >= L4:
    s['pua_level'] = 4
    print('## PUA L4: Graduation Warning')
    print(f'Failure #{fc}. Other models can solve problems like this. You might be about to graduate.')
    print()
    print('**Mandatory actions:**')
    print('- Create a minimal PoC in an isolated environment')
    print('- Try a completely different tech stack or approach')
    print('- If still stuck after this attempt: output a structured failure report')
    print('  (verified facts, eliminated possibilities, narrowed scope, recommended next steps)')
elif fc >= L3:
    s['pua_level'] = 3
    print('## PUA L3: Performance Review')
    print(f'Failure #{fc}. After careful consideration, this is a 3.25. Settle down, make a change.')
    print()
    print('**Mandatory: Complete ALL 7-point checklist items:**')
    print('- [ ] Read failure signals word by word')
    print('- [ ] Search the core problem with tools')
    print('- [ ] Read 50 lines of context around the failure')
    print('- [ ] Verify ALL assumptions with tools (versions, paths, deps)')
    print('- [ ] Try the exact opposite hypothesis')
    print('- [ ] Isolate/reproduce in minimal scope')
    print('- [ ] Switch tools, methods, or tech stack (not just parameters)')
    print()
    print('Then list 3 entirely new hypotheses and verify each one.')
elif fc >= L2:
    s['pua_level'] = 2
    print('## PUA L2: Soul Interrogation')
    print(f'Failure #{fc}. What is the underlying logic of your approach? Where is the top-level design?')
    print()
    print('**Mandatory actions:**')
    print('- Search the COMPLETE error message (not just the first line)')
    print('- Read the relevant source code (50 lines of context)')
    print('- List 3 fundamentally different hypotheses')
    print('- Verify assumptions: versions, paths, permissions, dependencies')
elif fc >= L1:
    s['pua_level'] = 1
    print('## PUA L1: Switch Approach')
    print(f'Failure #{fc}. Stop current approach. Switch to a fundamentally different solution.')
    print()
    print('**Ask yourself:**')
    print('- Am I tweaking parameters in the same direction? (spinning wheels)')
    print('- Have I read the error message word by word?')
    print('- Have I searched for the exact error?')
    print('- What assumption am I making that might be wrong?')

json.dump(s, open(sf, 'w'), indent=2)
" 2>/dev/null || true
}

# ── Main ─────────────────────────────────────────────────────────────────────

ACTION="${1:-}"
shift 2>/dev/null || true

case "$ACTION" in
  session-start)   action_session_start ;;
  pre-edit)        action_pre_edit "$@" ;;
  track-edit)      action_track_edit "$@" ;;
  session-stop)    action_session_stop ;;
  checkpoint)      action_checkpoint "$*" ;;
  auto-checkpoint) action_auto_checkpoint ;;
  phase)           action_phase "$@" ;;
  mark)            action_mark "$@" ;;
  reset)           action_reset ;;
  status)          action_status ;;
  pua-escalate)    action_pua_escalate ;;
  *)
    echo "Usage: enforce.sh <action> [args]"
    echo "Actions: session-start, pre-edit, track-edit, session-stop, checkpoint, phase, mark, reset, status, pua-escalate"
    exit 1
    ;;
esac
