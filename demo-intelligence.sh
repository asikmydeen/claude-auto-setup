#!/usr/bin/env bash
# Demo script for Orchestration Intelligence systems
# Shows how error pattern learning and performance tracking work

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Colors
GREEN="\033[0;32m"
BLUE="\033[0;34m"
YELLOW="\033[1;33m"
CYAN="\033[0;36m"
BOLD="\033[1m"
RESET="\033[0m"

echo -e "${BOLD}${CYAN}╔════════════════════════════════════════════════════════════╗${RESET}"
echo -e "${BOLD}${CYAN}║  Orchestration Intelligence Demo                              ║${RESET}"
echo -e "${BOLD}${CYAN}║  Error Pattern Learning + Performance-Based Selection        ║${RESET}"
echo -e "${BOLD}${CYAN}╚════════════════════════════════════════════════════════════╝${RESET}"
echo ""

# Source the libraries
echo -e "${BLUE}[1/6]${RESET} Loading intelligence libraries..."
source "${SCRIPT_DIR}/../.claude/lib/error-patterns.sh"
source "${SCRIPT_DIR}/../.claude/lib/performance-tracker.sh"
echo -e "${GREEN}✓${RESET} Libraries loaded"
echo ""

# Demo: Error Pattern Learning
echo -e "${BLUE}[2/6]${RESET} ${BOLD}Demo: Error Pattern Learning${RESET}"
echo "Simulating error recovery scenarios..."
echo ""

echo "  Scenario 1: Build failure due to dependency conflict"
log_failure_pattern "build_failure" "npm install --legacy-peer-deps" "success" '{"project":"my-app"}'
echo "    → Logged: npm install --legacy-peer-deps fixed the build"

echo "  Scenario 2: Same error occurs, different fix (failed)"
log_failure_pattern "build_failure" "rm -rf node_modules && npm install" "failure"
echo "    → Logged: clean install didn't work"

echo "  Scenario 3: Query for best fix"
echo -n "    → Best fix suggestion: "
SUGGESTION=$(suggest_fix_for_error "build_failure")
if [ -n "$SUGGESTION" ]; then
    echo -e "${GREEN}${SUGGESTION}${RESET} (100% success rate)"
else
    echo "none (yet)"
fi
echo ""

# Demo: Performance Tracking
echo -e "${BLUE}[3/6]${RESET} ${BOLD}Demo: Performance-Based Agent Selection${RESET}"
echo "Simulating agent performance tracking..."
echo ""

echo "  Scenario 1: Codex writes tests (fast, successful)"
track_agent_outcome "codex" "test-writing" "success" 30
echo "    → Logged: codex completed test-writing in 30s"

echo "  Scenario 2: Claude writes tests (slower, also successful)"
track_agent_outcome "claude" "test-writing" "success" 60
echo "    → Logged: claude completed test-writing in 60s"

echo "  Scenario 3: Codex fails at code review"
track_agent_outcome "codex" "code-review" "failure" 20
echo "    → Logged: codex failed at code-review"

echo "  Scenario 4: Amp succeeds at code review"
track_agent_outcome "amp" "code-review" "success" 45
echo "    → Logged: amp succeeded at code-review"
echo ""

# Demo: Smart Routing
echo -e "${BLUE}[4/6]${RESET} ${BOLD}Demo: Smart Agent Selection${RESET}"
echo "Finding best agent for each task type..."
echo ""

TASKS=("test-writing" "code-review" "documentation" "implementation")
for TASK in "${TASKS[@]}"; do
    echo -n "  Task: ${TASK} → Best agent: "
    BEST=$(get_best_agent_for_task "$TASK" "claude,codex,gemini,amp" 2>/dev/null || echo "claude")
    SCORE=$(get_agent_score "$BEST" "$TASK" 2>/dev/null || echo "50")
    echo -e "${GREEN}${BEST}${RESET} (score: ${SCORE}/100)"
done
echo ""

# Demo: Statistics
echo -e "${BLUE}[5/6]${RESET} ${BOLD}Demo: Performance Statistics${RESET}"
echo "Comparing agents for test-writing task..."
echo ""

if command -v jq &>/dev/null; then
    echo "  Agent comparison:"
    compare_agents "test-writing" "claude,codex,gemini,amp" | sed 's/^/    /'
else
    echo "    (jq required for detailed comparison)"
fi
echo ""

# Demo: Error Statistics
echo -e "${BLUE}[6/6]${RESET} ${BOLD}Demo: Error Pattern Statistics${RESET}"
echo "Statistics for build_failure error type..."
echo ""

if command -v jq &>/dev/null; then
    STATS=$(get_error_stats "build_failure")
    echo "  $(echo "$STATS" | jq -r '"
    Total attempts: \(.total_attempts)
    Successful fixes: \(.successful)
    Most common fix: \(.most_common_fix //"none yet")
    ')"
else
    echo "    (jq required for detailed stats)"
fi
echo ""

# Summary
echo -e "${BOLD}${GREEN}╔════════════════════════════════════════════════════════════╗${RESET}"
echo -e "${BOLD}${GREEN}║  Demo Complete!                                               ║${RESET}"
echo -e "${BOLD}${GREEN}╠════════════════════════════════════════════════════════════╣${RESET}"
echo -e "${BOLD}${GREEN}║  What just happened:                                         ║${RESET}"
echo -e "${BOLD}${GREEN}║  ✓ Logged 3 error patterns                                  ║${RESET}"
echo -e "${BOLD}${GREEN}║  ✓ Tracked 4 agent outcomes                                 ║${RESET}"
echo -e "${BOLD}${GREEN}║  ✓ Queried best agent for 4 task types                      ║${RESET}"
echo -e "${BOLD}${GREEN}║  ✓ System learned from the data                             ║${RESET}"
echo -e "${BOLD}${GREEN}║                                                                ║${RESET}"
echo -e "${BOLD}${GREEN}║  Next time you encounter these errors/tasks, the system      ║${RESET}"
echo -e "${BOLD}${GREEN}║  will automatically suggest the best fix and agent!         ║${RESET}"
echo -e "${BOLD}${GREEN}╚════════════════════════════════════════════════════════════╝${RESET}"
echo ""

echo -e "${CYAN}Database locations:${RESET}"
echo "  Error patterns: ~/.claude/perf/error-patterns.jsonl"
echo "  Performance:    ~/.claude/perf/agent-performance.jsonl"
echo ""

echo -e "${CYAN}CLI usage:${RESET}"
echo "  ${SCRIPT_DIR}/orchestration-intel.sh suggest-fix <error_type>"
echo "  ${SCRIPT_DIR}/orchestration-intel.sh best-agent <task_type>"
echo "  ${SCRIPT_DIR}/orchestration-intel.sh compare-agents <task_type>"
echo ""
