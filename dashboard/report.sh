#!/usr/bin/env bash
# Lightweight agent state reporter for Claude Agent Dashboard
# Usage: report.sh <session-id> <agent-id> <role> <status> [task] [progress_done] [progress_total]
# Or:    report.sh --file <session-id> <agent-id>  (writes state via JSON file, no server needed)
#
# Examples:
#   report.sh ses-123 explorer-1 explorer exploring "Scanning codebase"
#   report.sh ses-123 backend-1 backend-developer implementing "Auth endpoint" 2 5
#   report.sh ses-123 backend-1 backend-developer done "" 5 5

set -euo pipefail

PORT="${DASHBOARD_PORT:-3200}"
DASHBOARD_DIR="${DASHBOARD_DIR:-$HOME/.claude-dashboard}"
BASE_URL="http://localhost:$PORT"

# Quick mode: just write a JSON file (works even if server is down)
if [ "${1:-}" = "--file" ]; then
  SESSION_ID="${2:?session-id required}"
  AGENT_ID="${3:?agent-id required}"
  shift 3
  # Read JSON from stdin
  AGENTS_DIR="$DASHBOARD_DIR/sessions/$SESSION_ID/agents"
  mkdir -p "$AGENTS_DIR"
  cat > "$AGENTS_DIR/$AGENT_ID.json"
  exit 0
fi

SESSION_ID="${1:?session-id required}"
AGENT_ID="${2:?agent-id required}"
ROLE="${3:?role required}"
STATUS="${4:?status required}"
TASK="${5:-}"
PROGRESS_DONE="${6:-0}"
PROGRESS_TOTAL="${7:-0}"

# Build JSON payload
JSON=$(cat <<EOF
{
  "id": "$AGENT_ID",
  "role": "$ROLE",
  "status": "$STATUS",
  "task": "$TASK",
  "progress": {"done": $PROGRESS_DONE, "total": $PROGRESS_TOTAL}
}
EOF
)

# Try HTTP first, fall back to file
if command -v curl &>/dev/null; then
  curl -s -X POST "$BASE_URL/api/sessions/$SESSION_ID/agents" \
    -H 'Content-Type: application/json' \
    -d "$JSON" \
    --connect-timeout 1 \
    --max-time 2 \
    -o /dev/null 2>/dev/null || {
    # Server not reachable — write to file
    AGENTS_DIR="$DASHBOARD_DIR/sessions/$SESSION_ID/agents"
    mkdir -p "$AGENTS_DIR"
    echo "$JSON" > "$AGENTS_DIR/$AGENT_ID.json"
  }
else
  # No curl — write to file
  AGENTS_DIR="$DASHBOARD_DIR/sessions/$SESSION_ID/agents"
  mkdir -p "$AGENTS_DIR"
  echo "$JSON" > "$AGENTS_DIR/$AGENT_ID.json"
fi
