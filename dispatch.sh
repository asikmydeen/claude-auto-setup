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

# Shared colors and logging
source "${SCRIPT_DIR}/lib/common.sh"

# Override logging for dispatch (prefixed, stderr)
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
      for name in claude codex gemini amp kiro; do
        cli="$name"; [ "$name" = "kiro" ] && cli="kiro-cli"
        if command -v "$cli" &>/dev/null; then
          echo "  ${GREEN}*${RESET} $name ($cli — installed)"
        else
          echo "  ${DIM}- $name ($cli — not installed)${RESET}"
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

# --- Auto-detect Amazon/AWS tasks → route to Kiro ---
if [ -z "$TASK_TYPE" ] || [ -z "$FORCE_PROVIDER" ]; then
  TASK_LOWER=$(echo "$TASK" | tr '[:upper:]' '[:lower:]')
  AMAZON_PATTERNS="aws |aws-|amazon|brazil|cdk |cloudformation|lambda|dynamodb|s3 bucket|api gateway|sqs|sns|iam |isengard|pipelines|hydra|coral|brazil-build|packageinfo|internal|cr review|code review.*amazon|integration.test|fleet|sev2|sev1|ticket|sim |i.t\.|oncall|pager"
  if echo "$TASK_LOWER" | grep -qEi "$AMAZON_PATTERNS"; then
    if command -v kiro-cli &>/dev/null; then
      if [ -z "$FORCE_PROVIDER" ]; then
        FORCE_PROVIDER="kiro"
        info "Amazon/AWS task detected → routing to Kiro (builder-mcp)"
      fi
      if [ -z "$TASK_TYPE" ]; then
        TASK_TYPE="amazon-internal"
      fi
    fi
  fi
fi

# --- Resolve provider ---
resolve_provider() {
  # If forced, use that
  if [ -n "$FORCE_PROVIDER" ]; then
    local cli="$FORCE_PROVIDER"; [ "$FORCE_PROVIDER" = "kiro" ] && cli="kiro-cli"
    if command -v "$cli" &>/dev/null; then
      echo "$FORCE_PROVIDER"
      return
    else
      error "Forced provider '$FORCE_PROVIDER' ($cli) not installed"
      exit 1
    fi
  fi

  # Try performance-based routing first (if available and task type given)
  if [ -n "$TASK_TYPE" ] && [ -f "${HOME}/.claude/lib/performance-tracker.sh" ]; then
    source "${HOME}/.claude/lib/performance-tracker.sh"

    # Detect available providers
    local available_providers=""
    for name in claude codex gemini amp kiro; do
      local cli="$name"; [ "$name" = "kiro" ] && cli="kiro-cli"
      if command -v "$cli" &>/dev/null; then
        [ -n "$available_providers" ] && available_providers="${available_providers},"
        available_providers="${available_providers}${name}"
      fi
    done

    if [ -n "$available_providers" ]; then
      local best_provider
      best_provider=$(get_best_agent_for_task "$TASK_TYPE" "$available_providers")
      if [ -n "$best_provider" ] && command -v "$best_provider" &>/dev/null; then
        info "Using performance-based routing"
        echo "$best_provider"
        return
      fi
    fi
  fi

  # Fallback: use routing table from providers.json
  if [ -n "$TASK_TYPE" ] && command -v python3 &>/dev/null; then
    local provider
    provider=$(python3 -c "
import json, shutil
with open('$PROVIDERS_FILE') as f:
    data = json.load(f)
providers = data.get('providers', {})
cli_map = {name: info.get('cli', name) for name, info in providers.items()}
routes = data.get('task_routing', {})
chain = routes.get('$TASK_TYPE', ['claude', 'codex', 'gemini', 'amp'])
for p in chain:
    cli = cli_map.get(p, p)
    if shutil.which(cli):
        print(p)
        break
else:
    for p, cli in cli_map.items():
        if shutil.which(cli):
            print(p)
            break
")
    if [ -n "$provider" ]; then
      echo "$provider"
      return
    fi
  fi

  # Default fallback chain
  for name in claude codex gemini amp kiro; do
    local cli="$name"; [ "$name" = "kiro" ] && cli="kiro-cli"
    if command -v "$cli" &>/dev/null; then
      echo "$name"
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
      local kiro_tools="@builder-mcp/ReadRemoteTestRun,@builder-mcp/InternalCodeSearch,@builder-mcp/ReadInternalWebsites"
      local kiro_models="${KIRO_MODEL:-claude-sonnet-4.5 claude-sonnet-4 claude-haiku-4.5}"
      local kiro_output=""
      for model in $kiro_models; do
        info "Trying: kiro-cli --model=$model (trusted: builder-mcp)"
        kiro_output=$(kiro-cli chat --no-interactive --model="$model" --trust-tools="$kiro_tools" "$full_prompt" 2>&1) || true
        # Strip ANSI codes and check if there's real content (not just warnings/errors)
        local clean_output
        clean_output=$(echo "$kiro_output" | sed 's/\x1b\[[0-9;]*m//g' | sed 's/\x1b\[[?0-9]*[a-zA-Z]//g' | grep -v '^\s*$' | grep -v 'WARNING:' | grep -v 'having trouble' | grep -v 'Credits:' | grep -v 'tools are now trusted' | grep -v 'understand the risks' | grep -v 'Learn more at' | grep -v 'temporarily unavailable' | grep -v 'Request ID:' | grep -v 'relaunch with' | head -1)
        if [ -n "$clean_output" ]; then
          echo "$kiro_output"
          break
        fi
        warn "Model $model unavailable, trying next..."
      done
      if [ -z "$clean_output" ]; then
        error "All Kiro models failed. Raw output:"
        echo "$kiro_output"
      fi
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
