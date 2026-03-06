#!/usr/bin/env bash
set -euo pipefail

# ============================================================================
# Cross-Provider Agent Dispatcher
#
# Routes tasks to the best available AI agent based on task type.
# Used by the orchestrator to delegate work across providers.
#
# Usage:
#   ./dispatch.sh --task "write unit tests for src/api/users.ts" --type test-writing
#   ./dispatch.sh --task "review this diff for security issues" --type code-review-security
#   ./dispatch.sh --task "generate API documentation" --type documentation
#   ./dispatch.sh --task "implement pagination" --type backend-implementation --provider claude
#   ./dispatch.sh --list-providers
#   ./dispatch.sh --list-routes
#
# The dispatcher:
#   1. Reads providers.json for task routing preferences
#   2. Checks which providers are installed
#   3. Picks the best available provider
#   4. Invokes it in non-interactive mode
#   5. Returns the output
# ============================================================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROVIDERS_FILE="$SCRIPT_DIR/universal/providers.json"

TASK=""
TASK_TYPE=""
FORCE_PROVIDER=""
CONTEXT_FILES=""
OUTPUT_FILE=""

# Colors
if [ -t 1 ] && command -v tput &>/dev/null && [ "$(tput colors 2>/dev/null || echo 0)" -ge 8 ]; then
  RED=$(tput setaf 1); GREEN=$(tput setaf 2); YELLOW=$(tput setaf 3)
  CYAN=$(tput setaf 6); DIM=$(tput dim); BOLD=$(tput bold); RESET=$(tput sgr0)
else
  RED=""; GREEN=""; YELLOW=""; CYAN=""; DIM=""; BOLD=""; RESET=""
fi

info()  { echo "${DIM}[dispatch]${RESET} $*" >&2; }
ok()    { echo "${GREEN}[dispatch]${RESET} $*" >&2; }
warn()  { echo "${YELLOW}[dispatch]${RESET} $*" >&2; }
error() { echo "${RED}[dispatch]${RESET} $*" >&2; }

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --task)          TASK="$2"; shift 2 ;;
    --type)          TASK_TYPE="$2"; shift 2 ;;
    --provider)      FORCE_PROVIDER="$2"; shift 2 ;;
    --context)       CONTEXT_FILES="$2"; shift 2 ;;
    --output)        OUTPUT_FILE="$2"; shift 2 ;;
    --list-providers)
      echo "Available providers:"
      for cmd in claude codex gemini amp kiro; do
        if command -v "$cmd" &>/dev/null; then
          echo "  ${GREEN}*${RESET} $cmd (installed)"
        else
          echo "  ${DIM}- $cmd (not installed)${RESET}"
        fi
      done
      exit 0
      ;;
    --list-routes)
      if command -v python3 &>/dev/null; then
        python3 -c "
import json
with open('$PROVIDERS_FILE') as f:
    data = json.load(f)
print('Task routing:')
for task, providers in sorted(data['task_routing'].items()):
    if task.startswith('_'): continue
    available = [p for p in providers if __import__('shutil').which(p)]
    print(f'  {task}: {\" > \".join(providers)}', end='')
    if available:
        print(f'  (will use: {available[0]})')
    else:
        print(f'  (no provider available)')
"
      else
        echo "python3 required for --list-routes"
      fi
      exit 0
      ;;
    --help|-h)
      echo "Usage: dispatch.sh --task \"prompt\" --type task-type [--provider name] [--context files] [--output file]"
      echo ""
      echo "Task types: planning, architecture-design, complex-reasoning, debugging,"
      echo "  code-review-quality, code-review-security, code-review-performance,"
      echo "  backend-implementation, frontend-implementation, api-implementation,"
      echo "  test-writing, boilerplate-generation, documentation, large-file-analysis,"
      echo "  dependency-analysis, infrastructure-aws, cdk-cloudformation,"
      echo "  simple-edit, refactoring, migration"
      echo ""
      echo "Options:"
      echo "  --provider NAME    Force a specific provider"
      echo "  --context FILES    Comma-separated files to include as context"
      echo "  --output FILE      Write output to file instead of stdout"
      echo "  --list-providers   Show installed providers"
      echo "  --list-routes      Show task routing table"
      exit 0
      ;;
    *) error "Unknown argument: $1"; exit 1 ;;
  esac
done

if [ -z "$TASK" ]; then
  error "Missing --task. Use --help for usage."
  exit 1
fi

# --- Resolve provider ---
resolve_provider() {
  # If forced, use that
  if [ -n "$FORCE_PROVIDER" ]; then
    if command -v "$FORCE_PROVIDER" &>/dev/null; then
      echo "$FORCE_PROVIDER"
      return
    else
      error "Forced provider '$FORCE_PROVIDER' not installed"
      exit 1
    fi
  fi

  # If task type given, use routing table
  if [ -n "$TASK_TYPE" ] && command -v python3 &>/dev/null; then
    local provider
    provider=$(python3 -c "
import json, shutil
with open('$PROVIDERS_FILE') as f:
    data = json.load(f)
routes = data.get('task_routing', {})
chain = routes.get('$TASK_TYPE', ['claude', 'codex', 'gemini', 'amp'])
for p in chain:
    if shutil.which(p):
        print(p)
        break
else:
    # Fallback: try any installed provider
    for p in ['claude', 'codex', 'gemini', 'amp', 'kiro']:
        if shutil.which(p):
            print(p)
            break
")
    if [ -n "$provider" ]; then
      echo "$provider"
      return
    fi
  fi

  # Default fallback chain
  for cmd in claude codex gemini amp; do
    if command -v "$cmd" &>/dev/null; then
      echo "$cmd"
      return
    fi
  done

  error "No AI agent installed"
  exit 1
}

PROVIDER=$(resolve_provider)
info "Task type: ${TASK_TYPE:-auto} → Provider: $PROVIDER"

# --- Build context ---
build_context() {
  local ctx=""

  # Add project intel if available
  if [ -f ".ai/project-intel.md" ]; then
    ctx="$ctx\n--- Project Intelligence ---\n$(cat .ai/project-intel.md)\n"
  elif [ -f ".claude/rules/project-intel.md" ]; then
    ctx="$ctx\n--- Project Intelligence ---\n$(cat .claude/rules/project-intel.md)\n"
  fi

  # Add specified context files
  if [ -n "$CONTEXT_FILES" ]; then
    IFS=',' read -ra files <<< "$CONTEXT_FILES"
    for f in "${files[@]}"; do
      if [ -f "$f" ]; then
        ctx="$ctx\n--- File: $f ---\n$(cat "$f")\n"
      fi
    done
  fi

  echo -e "$ctx"
}

CONTEXT=$(build_context)

# --- Dispatch to provider ---
dispatch() {
  local full_prompt="$TASK"
  if [ -n "$CONTEXT" ]; then
    full_prompt="Context:\n$CONTEXT\n\nTask:\n$TASK"
  fi

  case "$PROVIDER" in
    claude)
      local tools="Read,Grep,Glob,Bash,Edit,Write"
      info "Invoking: claude -p (non-interactive)"
      claude -p "$full_prompt" --allowedTools "$tools" --output-format text 2>/dev/null
      ;;
    codex)
      info "Invoking: codex -q (quiet mode)"
      codex -q "$full_prompt" 2>/dev/null
      ;;
    gemini)
      info "Invoking: gemini -p (non-interactive)"
      echo "$full_prompt" | gemini 2>/dev/null
      ;;
    amp)
      info "Invoking: amp (thread mode)"
      echo "$full_prompt" | amp 2>/dev/null
      ;;
    kiro)
      warn "Kiro CLI doesn't support non-interactive mode. Falling back to claude."
      claude -p "$full_prompt" --output-format text 2>/dev/null
      ;;
    *)
      error "Unknown provider: $PROVIDER"
      exit 1
      ;;
  esac
}

# --- Execute ---
RESULT=$(dispatch)

if [ -n "$OUTPUT_FILE" ]; then
  echo "$RESULT" > "$OUTPUT_FILE"
  ok "Output written to: $OUTPUT_FILE"
else
  echo "$RESULT"
fi

ok "Done. Provider: $PROVIDER | Task type: ${TASK_TYPE:-auto}"
