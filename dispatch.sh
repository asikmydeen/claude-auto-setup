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

# Valid task types/providers (fallbacks if providers.json can't be read)
DEFAULT_TASK_TYPES="planning|architecture-design|complex-reasoning|debugging|code-review-quality|code-review-security|code-review-performance|backend-implementation|frontend-implementation|api-implementation|test-writing|boilerplate-generation|documentation|large-file-analysis|dependency-analysis|infrastructure-aws|cdk-cloudformation|amazon-internal|brazil-build|aws-debugging|aws-sdk|aws-lambda|aws-dynamodb|aws-s3|aws-api-gateway|aws-sqs-sns|aws-iam|internal-code-search|integration-test|internal-docs|cr-review|pipeline-debug|simple-edit|refactoring|migration|github-pr|github-issues|git-operations|ci-cd|general"
DEFAULT_PROVIDERS="claude|codex|gemini|amp|kiro|copilot"

PROVIDER_CLI_MAP=""

load_provider_cli_map() {
  if [ -n "$PROVIDER_CLI_MAP" ]; then
    return
  fi

  if command -v python3 &>/dev/null && [ -f "$PROVIDERS_FILE" ]; then
    PROVIDER_CLI_MAP=$(PROVIDERS_FILE="$PROVIDERS_FILE" python3 -c "
import json, os
with open(os.environ['PROVIDERS_FILE']) as f:
    data = json.load(f)
providers = data.get('providers', {})
pairs = []
for name, info in providers.items():
    cli = info.get('cli', name)
    pairs.append(f'{name}={cli}')
print(' '.join(pairs))
" 2>/dev/null) || true
  fi

  if [ -z "$PROVIDER_CLI_MAP" ]; then
    PROVIDER_CLI_MAP="claude=claude codex=codex gemini=gemini amp=amp kiro=kiro-cli copilot=copilot"
  fi
}

provider_cli() {
  local name="$1"
  load_provider_cli_map
  for pair in $PROVIDER_CLI_MAP; do
    local key="${pair%%=*}"
    local val="${pair#*=}"
    if [ "$key" = "$name" ]; then
      echo "$val"
      return
    fi
  done
  echo "$name"
}

provider_is_available() {
  local name="$1"
  local cli
  cli=$(provider_cli "$name")
  command -v "$cli" &>/dev/null
}

provider_list() {
  if command -v python3 &>/dev/null && [ -f "$PROVIDERS_FILE" ]; then
    local names=""
    names=$(PROVIDERS_FILE="$PROVIDERS_FILE" python3 -c "
import json, os
with open(os.environ['PROVIDERS_FILE']) as f:
    data = json.load(f)
print(' '.join(data.get('providers', {}).keys()))
" 2>/dev/null) || names=""
    if [ -n "$names" ]; then
      echo "$names"
      return
    fi
  fi
  echo "claude codex gemini amp kiro copilot"
}

get_valid_providers_pattern() {
  local names
  names=$(provider_list)
  if [ -n "$names" ]; then
    echo "${names// /|}"
    return
  fi
  echo "$DEFAULT_PROVIDERS"
}

get_valid_task_types_pattern() {
  local types=""
  if command -v python3 &>/dev/null && [ -f "$PROVIDERS_FILE" ]; then
    types=$(PROVIDERS_FILE="$PROVIDERS_FILE" python3 -c "
import json, os
with open(os.environ['PROVIDERS_FILE']) as f:
    data = json.load(f)
tasks = [k for k in data.get('task_routing', {}).keys() if not k.startswith('_')]
print('|'.join(tasks))
" 2>/dev/null) || types=""
  fi

  if [ -n "$types" ]; then
    case "|$types|" in
      *"|general|"*) echo "$types" ;;
      *) echo "${types}|general" ;;
    esac
    return
  fi

  echo "$DEFAULT_TASK_TYPES"
}

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
      for name in $(provider_list); do
        cli=$(provider_cli "$name")
        if provider_is_available "$name"; then
          echo "  ${GREEN}*${RESET} $name ($cli — installed)"
        else
          echo "  ${DIM}- $name ($cli — not installed)${RESET}"
        fi
      done
      exit 0
      ;;
    --list-routes)
      if command -v python3 &>/dev/null; then
        PROVIDERS_FILE="$PROVIDERS_FILE" python3 -c "
import json, os, shutil
with open(os.environ['PROVIDERS_FILE']) as f:
    data = json.load(f)
providers_map = data.get('providers', {})
cli_map = {name: info.get('cli', name) for name, info in providers_map.items()}
print('Task routing:')
for task, providers in sorted(data['task_routing'].items()):
    if task.startswith('_'): continue
    available = [p for p in providers if shutil.which(cli_map.get(p, p))]
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
      echo "Task types: see universal/providers.json (task_routing) or use --list-routes"
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

# Load validation patterns from providers.json (fallback to defaults)
VALID_TASK_TYPES=$(get_valid_task_types_pattern)
VALID_PROVIDERS=$(get_valid_providers_pattern)

# Validate task type if provided
if [ -n "$TASK_TYPE" ] && [[ ! "$TASK_TYPE" =~ ^($VALID_TASK_TYPES)$ ]]; then
  error "Invalid task type: $TASK_TYPE"
  error "Valid types: ${VALID_TASK_TYPES//|/, }"
  exit 1
fi

# Validate provider if provided
if [ -n "$FORCE_PROVIDER" ] && [[ ! "$FORCE_PROVIDER" =~ ^($VALID_PROVIDERS)$ ]]; then
  error "Invalid provider: $FORCE_PROVIDER"
  error "Valid providers: ${VALID_PROVIDERS//|/, }"
  exit 1
fi

# --- Auto-detect Amazon/AWS tasks → route to Kiro ---
if [ -z "$TASK_TYPE" ] || [ -z "$FORCE_PROVIDER" ]; then
  TASK_LOWER=$(echo "$TASK" | tr '[:upper:]' '[:lower:]')
  AMAZON_PATTERNS="aws |aws-|amazon|brazil|cdk |cloudformation|lambda|dynamodb|s3 bucket|api gateway|sqs|sns|iam |isengard|pipelines|hydra|coral|brazil-build|packageinfo|internal|cr review|code review.*amazon|integration.test|fleet|sev2|sev1|ticket|sim |i.t\.|oncall|pager"
  if echo "$TASK_LOWER" | grep -qEi "$AMAZON_PATTERNS"; then
    if provider_is_available "kiro"; then
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
    local cli
    cli=$(provider_cli "$FORCE_PROVIDER")
    if provider_is_available "$FORCE_PROVIDER"; then
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
    for name in $(provider_list); do
      if provider_is_available "$name"; then
        [ -n "$available_providers" ] && available_providers="${available_providers},"
        available_providers="${available_providers}${name}"
      fi
    done

    if [ -n "$available_providers" ]; then
      local best_provider
      best_provider=$(get_best_agent_for_task "$TASK_TYPE" "$available_providers")
      if [ -n "$best_provider" ] && provider_is_available "$best_provider"; then
        info "Using performance-based routing"
        echo "$best_provider"
        return
      fi
    fi
  fi

  # Fallback: use routing table from providers.json
  if [ -n "$TASK_TYPE" ] && command -v python3 &>/dev/null; then
    local provider
    provider=$(PROVIDERS_FILE="$PROVIDERS_FILE" TASK_TYPE="$TASK_TYPE" python3 -c "
import json, shutil, os
with open(os.environ['PROVIDERS_FILE']) as f:
    data = json.load(f)
providers = data.get('providers', {})
cli_map = {name: info.get('cli', name) for name, info in providers.items()}
routes = data.get('task_routing', {})
chain = routes.get(os.environ.get('TASK_TYPE', ''), ['claude', 'codex', 'gemini', 'amp'])
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
  for name in claude codex gemini amp kiro copilot; do
    if provider_is_available "$name"; then
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

  # Add specified context files (with path validation)
  if [ -n "$CONTEXT_FILES" ]; then
    local project_root
    project_root="$(pwd)"
    IFS=',' read -ra files <<< "$CONTEXT_FILES"
    for f in "${files[@]}"; do
      # File must exist
      if [ ! -f "$f" ]; then
        warn "Context file not found: $f"
        continue
      fi
      # Resolve to absolute path following symlinks (macOS-compatible)
      local abs_path
      abs_path=$(cd "$(dirname "$f")" && pwd)/$(basename "$f")
      # Resolve symlinks if possible (prevent symlink bypass)
      if command -v realpath &>/dev/null; then
        abs_path=$(realpath "$abs_path" 2>/dev/null) || abs_path=$(cd "$(dirname "$f")" && pwd)/$(basename "$f")
      fi
      # Restrict to project root — prevent reading /etc/passwd, ~/.ssh/*, etc.
      if [[ "$abs_path" != "$project_root"* ]]; then
        warn "Context file outside project root, skipping: $f"
        continue
      fi
      # Size limit: skip files > 1MB to prevent hangs
      local file_size
      file_size=$(wc -c < "$abs_path" 2>/dev/null || echo 0)
      if [ "$file_size" -gt 1048576 ]; then
        warn "Context file too large (>1MB), skipping: $f"
        continue
      fi
      ctx="$ctx\n--- File: $f ---\n$(cat "$abs_path")\n"
    done
  fi

  echo -e "$ctx"
}

CONTEXT=$(build_context)

# --- Dispatch to a single provider (returns 0 on success, 1 on failure) ---
dispatch_to() {
  local provider="$1" full_prompt="$2"

  case "$provider" in
    claude)
      local tools="Read,Grep,Glob,Bash,Edit,Write"
      info "Invoking: claude -p (non-interactive)"
      # Unset CLAUDECODE + CLAUDE_CODE_ENTRYPOINT to allow dispatch from inside a Claude Code session
      # (mirrors orchestration/lib/agents.js which does the same for Node.js)
      CLAUDECODE= CLAUDE_CODE_ENTRYPOINT= claude -p "$full_prompt" --allowedTools "$tools" --output-format text 2>/dev/null
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
        local clean_output
        clean_output=$(echo "$kiro_output" | sed 's/\x1b\[[0-9;]*m//g' | sed 's/\x1b\[[?0-9]*[a-zA-Z]//g' | grep -v '^\s*$' | grep -v 'WARNING:' | grep -v 'having trouble' | grep -v 'Credits:' | grep -v 'tools are now trusted' | grep -v 'understand the risks' | grep -v 'Learn more at' | grep -v 'temporarily unavailable' | grep -v 'Request ID:' | grep -v 'relaunch with' | head -1)
        if [ -n "$clean_output" ]; then
          echo "$kiro_output"
          return 0
        fi
        warn "Model $model unavailable, trying next..."
      done
      return 1
      ;;
    copilot)
      info "Invoking: copilot -p (non-interactive)"
      copilot -p "$full_prompt" --allow-tool='shell' --allow-tool='write' 2>/dev/null
      ;;
    *)
      error "Unknown provider: $provider"
      return 1
      ;;
  esac
}

# --- Build fallback chain (providers to try after primary) ---
get_fallback_chain() {
  local primary="$1"
  local chain=""
  for name in claude kiro codex gemini amp copilot; do
    [ "$name" = "$primary" ] && continue
    if provider_is_available "$name"; then
      chain="$chain $name"
    fi
  done
  echo "$chain"
}

# --- Execute with fallback ---
dispatch() {
  local full_prompt="$TASK"
  if [ -n "$CONTEXT" ]; then
    full_prompt="Context:\n$CONTEXT\n\nTask:\n$TASK"
  fi

  # Try primary provider
  local result
  if result=$(dispatch_to "$PROVIDER" "$full_prompt"); then
    echo "$result"
    return 0
  fi

  # Primary failed — try fallback chain
  warn "$PROVIDER failed, trying fallback providers..."
  local fallbacks
  fallbacks=$(get_fallback_chain "$PROVIDER")
  for fallback in $fallbacks; do
    info "Falling back to: $fallback"
    if result=$(dispatch_to "$fallback" "$full_prompt"); then
      ok "Fallback to $fallback succeeded"
      PROVIDER="$fallback (fallback)"
      echo "$result"
      return 0
    fi
    warn "$fallback also failed"
  done

  error "All providers failed"
  return 1
}

# --- Execute ---
RESULT=$(dispatch) || { error "Dispatch failed for all providers"; exit 1; }

if [ -n "$OUTPUT_FILE" ]; then
  echo "$RESULT" > "$OUTPUT_FILE"
  ok "Output written to: $OUTPUT_FILE"
else
  echo "$RESULT"
fi

ok "Done. Provider: $PROVIDER | Task type: ${TASK_TYPE:-auto}"
