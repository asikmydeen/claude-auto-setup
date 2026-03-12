#!/usr/bin/env bash
# Orchestration Intelligence CLI
# Provides easy access to error pattern learning and performance tracking

set -euo pipefail

VERSION="1.0.0"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Shared colors and logging
source "${SCRIPT_DIR}/lib/common.sh"

# Source libraries
source "${SCRIPT_DIR}/../.claude/lib/error-patterns.sh"
source "${SCRIPT_DIR}/../.claude/lib/performance-tracker.sh"

# Show usage
show_usage() {
  cat <<EOF
${BOLD}Orchestration Intelligence CLI v${VERSION}${RESET}

Commands for learning from past performance and errors:

${BOLD}Error Patterns:${RESET}
  log-error <type> <fix> <outcome>    Log an error and its fix for learning
  suggest-fix <error_type>            Get best fix suggestion for an error
  error-stats <error_type>             Show statistics for an error type
  list-errors                          List all error types in database

${BOLD}Performance Tracking:${RESET}
  track-outcome <agent> <task> <result> [duration]
                                       Track agent performance
  best-agent <task_type> [agents]      Find best agent for a task type
  agent-stats <agent>                  Show performance stats for an agent
  compare-agents <task_type> [agents]  Compare agents for a task type

${BOLD}Maintenance:${RESET}
  cleanup                              Clean up old database entries
  init                                 Initialize intelligence databases

${BOLD}Examples:${RESET}
  # After fixing a build error
  orchestration-intel.sh log-error build_failure "npm install" success

  # Find best fix for type errors
  orchestration-intel.sh suggest-fix type_error

  # Track that Codex did well on tests
  orchestration-intel.sh track-outcome codex test-writing success 45

  # Find best agent for code review
  orchestration-intel.sh best-agent code-review

  # Compare all agents for test writing
  orchestration-intel.sh compare-agents test-writing

EOF
}

# Main command dispatcher
case "${1:-}" in
  log-error)
    if [ $# -lt 4 ]; then
      error "Usage: $0 log-error <error_type> <fix> <outcome> [context_json]"
      exit 1
    fi
    log_failure_pattern "$2" "$3" "$4" "${5:-{}}"
    ;;

  suggest-fix)
    if [ $# -lt 2 ]; then
      error "Usage: $0 suggest-fix <error_type>"
      exit 1
    fi
    suggest_fix_for_error "$2"
    ;;

  error-stats)
    if [ $# -lt 2 ]; then
      error "Usage: $0 error-stats <error_type>"
      exit 1
    fi
    if ! command -v jq &>/dev/null; then
      error "jq required for stats display"
      exit 1
    fi
    get_error_stats "$2" | jq '.'
    ;;

  list-errors)
    list_errors
    ;;

  track-outcome)
    if [ $# -lt 4 ]; then
      error "Usage: $0 track-outcome <agent> <task_type> <outcome> [duration]"
      exit 1
    fi
    track_agent_outcome "$2" "$3" "$4" "${5:-0}"
    ok "Tracked: $2 on $3 -> $4"
    ;;

  best-agent)
    if [ $# -lt 2 ]; then
      error "Usage: $0 best-agent <task_type> [available_agents]"
      exit 1
    fi
    get_best_agent_for_task "$2" "${3:-claude,codex,gemini,amp}"
    ;;

  agent-stats)
    if [ $# -lt 2 ]; then
      error "Usage: $0 agent-stats <agent>"
      exit 1
    fi
    if ! command -v jq &>/dev/null; then
      error "jq required for stats display"
      exit 1
    fi
    get_agent_stats "$2" | jq '.'
    ;;

  compare-agents)
    if [ $# -lt 2 ]; then
      error "Usage: $0 compare-agents <task_type> [agents]"
      exit 1
    fi
    compare_agents "$2" "${3:-claude,codex,gemini,amp}"
    ;;

  cleanup)
    info "Cleaning up old database entries..."
    cleanup_error_patterns
    cleanup_performance_db
    ok "Cleanup complete"
    ;;

  init)
    info "Initializing intelligence databases..."
    init_error_patterns
    init_performance_db
    ok "Initialization complete"
    ;;

  help|--help|-h)
    show_usage
    exit 0
    ;;

  *)
    if [ -z "${1:-}" ]; then
      show_usage
    else
      error "Unknown command: $1"
      echo "Run '$0 help' for usage"
      exit 1
    fi
    ;;
esac
