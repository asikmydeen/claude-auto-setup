#!/usr/bin/env bash
# ============================================================================
# Hook Handler — reads JSON from stdin and dispatches to enforce.sh
#
# Claude Code hooks pass JSON on stdin with tool_input and tool_response.
# This script reads it once, extracts what we need, and calls enforce.sh.
#
# Usage: hook-handler.sh <edit|bash|agent>
# ============================================================================
set -euo pipefail

ENFORCE="$HOME/.claude/scripts/enforce.sh"
ACTION="${1:-}"

# Read JSON from stdin (only available once)
INPUT=$(cat)

case "$ACTION" in
  edit)
    # Extract file path from tool_input
    FILE=""
    if command -v jq &>/dev/null; then
      FILE=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty' 2>/dev/null)
    fi
    # Fallback: try python3
    if [ -z "$FILE" ] && command -v python3 &>/dev/null; then
      FILE=$(python3 -c "
import json, sys
try:
    d = json.loads('''$INPUT''')
    print(d.get('tool_input', {}).get('file_path', ''))
except:
    print('')
" 2>/dev/null)
    fi

    # Run ESLint on JS/TS files
    if [ -n "$FILE" ]; then
      EXT="${FILE##*.}"
      if [ "$EXT" = "ts" ] || [ "$EXT" = "tsx" ] || [ "$EXT" = "js" ] || [ "$EXT" = "jsx" ]; then
        cd "$(dirname "$FILE")" 2>/dev/null && npx eslint --no-error-on-unmatched-pattern --max-warnings=50 --format compact "$FILE" 2>/dev/null | head -20 || true
      fi
    fi

    # Track edit in enforce.sh
    "$ENFORCE" track-edit "${FILE:-unknown}" 2>/dev/null || true
    ;;

  bash)
    # Extract command from tool_input
    CMD=""
    if command -v jq &>/dev/null; then
      CMD=$(echo "$INPUT" | jq -r '.tool_input.command // empty' 2>/dev/null)
    fi
    if [ -z "$CMD" ] && command -v python3 &>/dev/null; then
      CMD=$(python3 -c "
import json, sys
try:
    d = json.loads('''$INPUT''')
    print(d.get('tool_input', {}).get('command', ''))
except:
    print('')
" 2>/dev/null)
    fi

    if [ -n "$CMD" ]; then
      # Detect test runs
      if echo "$CMD" | grep -qE '(npm test|brazil-build run test|jest|vitest|pytest|cargo test)'; then
        "$ENFORCE" mark tests 2>/dev/null || true
      fi
      # Detect code review
      if echo "$CMD" | grep -qE '(code-review|security-audit)'; then
        "$ENFORCE" mark review 2>/dev/null || true
      fi
      # Detect intel refresh
      if echo "$CMD" | grep -qE 'intel-refresh'; then
        "$ENFORCE" mark intel 2>/dev/null || true
      fi
      # Detect Kiro delegation
      if echo "$CMD" | grep -qE '(dispatch.sh.*kiro|kiro-cli)'; then
        "$ENFORCE" mark kiro 2>/dev/null || true
      fi
      # Detect agent spawning
      if echo "$CMD" | grep -qE '(cmux new|agent_spawn)'; then
        "$ENFORCE" mark agent 2>/dev/null || true
      fi
    fi
    ;;

  agent)
    # Extract agent details from tool_input
    CONTEXT=""
    if command -v jq &>/dev/null; then
      DESC=$(echo "$INPUT" | jq -r '.tool_input.description // empty' 2>/dev/null)
      PROMPT=$(echo "$INPUT" | jq -r '.tool_input.prompt // empty' 2>/dev/null)
      TYPE=$(echo "$INPUT" | jq -r '.tool_input.subagent_type // empty' 2>/dev/null)
      CONTEXT="$TYPE $DESC $PROMPT"
    fi
    if [ -z "$CONTEXT" ] && command -v python3 &>/dev/null; then
      CONTEXT=$(python3 -c "
import json
try:
    d = json.loads('''$INPUT''')
    ti = d.get('tool_input', {})
    print(f\"{ti.get('subagent_type','')} {ti.get('description','')} {ti.get('prompt','')}\")
except:
    print('')
" 2>/dev/null)
    fi

    if [ -n "$CONTEXT" ]; then
      # Detect review agents
      if echo "$CONTEXT" | grep -qiE '(code-review|reviewer|review)'; then
        "$ENFORCE" mark review 2>/dev/null || true
      fi
      # Detect test agents
      if echo "$CONTEXT" | grep -qiE '(test-writer|test)'; then
        "$ENFORCE" mark tests 2>/dev/null || true
      fi
    fi

    # Always mark agent usage
    "$ENFORCE" mark agent 2>/dev/null || true
    ;;

  *)
    echo "Usage: hook-handler.sh <edit|bash|agent>" >&2
    exit 1
    ;;
esac
