#!/usr/bin/env bash
# ============================================================================
# Cross-Agent MCP Server Manager
#
# Adds, removes, lists, and syncs MCP servers across Claude and Kiro CLI
# from a single command.
#
# Usage:
#   ./mcp-add.sh add --name my-server --command npx --args "-y" "some-pkg"
#   ./mcp-add.sh add --name remote-api --url https://api.example.com/mcp
#   ./mcp-add.sh add --name my-server --command ./bin/server --agents claude
#   ./mcp-add.sh remove --name my-server
#   ./mcp-add.sh list
#   ./mcp-add.sh sync --from claude --to kiro
#   ./mcp-add.sh sync --from kiro --to claude
#
# Flags:
#   --agents claude,kiro   Target specific agents (default: all installed)
#   --env KEY=VAL          Environment variables (repeatable)
#   --auto-approve Tool    Auto-approve tools in Kiro (repeatable)
#   --timeout 30000        Server timeout in ms
# ============================================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Config paths
CLAUDE_MCP_CONFIG="$HOME/.config/claude-code/mcp_config.json"
KIRO_MCP_CONFIG="$HOME/.kiro/settings/mcp.json"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

# ── Helpers ──────────────────────────────────────────────────────────────────

has_claude() { command -v claude &>/dev/null; }
has_kiro() { command -v kiro-cli &>/dev/null; }

log_ok()   { printf "${GREEN}✓${NC} %s\n" "$1"; }
log_fail() { printf "${RED}✗${NC} %s\n" "$1"; }
log_skip() { printf "${YELLOW}→${NC} %s\n" "$1"; }
log_info() { printf "${BLUE}ℹ${NC} %s\n" "$1"; }

detect_agents() {
  local agents=""
  if has_claude; then agents="claude"; fi
  if has_kiro; then
    if [ -n "$agents" ]; then agents="$agents,kiro"; else agents="kiro"; fi
  fi
  echo "$agents"
}

# Parse comma-separated agent list, filter to installed only
resolve_agents() {
  local requested="$1"
  local resolved=""
  local IFS=','
  for agent in $requested; do
    case "$agent" in
      claude)
        if has_claude; then
          resolved="${resolved:+$resolved,}claude"
        else
          log_skip "Claude not installed — skipping"
        fi
        ;;
      kiro)
        if has_kiro; then
          resolved="${resolved:+$resolved,}kiro"
        else
          log_skip "Kiro CLI not installed — skipping"
        fi
        ;;
      *)
        log_fail "Unknown agent: $agent (supported: claude, kiro)"
        ;;
    esac
  done
  echo "$resolved"
}

# Ensure config files exist with valid JSON
ensure_config() {
  local config_path="$1"
  local dir
  dir=$(dirname "$config_path")
  if [ ! -d "$dir" ]; then
    mkdir -p "$dir"
  fi
  if [ ! -f "$config_path" ]; then
    echo '{"mcpServers":{}}' > "$config_path"
  fi
}

# Read server names from a config file using python3
read_servers() {
  local config_path="$1"
  if [ ! -f "$config_path" ]; then
    return
  fi
  python3 -c "
import json, sys
try:
    with open('$config_path') as f:
        data = json.load(f)
    for name in sorted(data.get('mcpServers', {})):
        s = data['mcpServers'][name]
        transport = 'http' if 'url' in s else 'stdio'
        target = s.get('url', s.get('command', '?'))
        print(f'{name}|{transport}|{target}')
except Exception as e:
    print(f'ERROR|{e}', file=sys.stderr)
" 2>/dev/null || true
}

# Read a single server's full JSON from a config file
read_server_json() {
  local config_path="$1"
  local server_name="$2"
  if [ ! -f "$config_path" ]; then
    return 1
  fi
  python3 -c "
import json, sys
with open('$config_path') as f:
    data = json.load(f)
server = data.get('mcpServers', {}).get('$server_name')
if server:
    print(json.dumps(server))
else:
    sys.exit(1)
" 2>/dev/null
}

# Add server to config file directly (fallback when CLI unavailable)
add_server_json() {
  local config_path="$1"
  local server_name="$2"
  local server_json="$3"
  ensure_config "$config_path"
  python3 -c "
import json
with open('$config_path') as f:
    data = json.load(f)
data.setdefault('mcpServers', {})
data['mcpServers']['$server_name'] = json.loads('$server_json')
with open('$config_path', 'w') as f:
    json.dump(data, f, indent=2)
    f.write('\n')
"
}

# Remove server from config file directly
remove_server_json() {
  local config_path="$1"
  local server_name="$2"
  if [ ! -f "$config_path" ]; then
    return 1
  fi
  python3 -c "
import json, sys
with open('$config_path') as f:
    data = json.load(f)
if '$server_name' not in data.get('mcpServers', {}):
    sys.exit(1)
del data['mcpServers']['$server_name']
with open('$config_path', 'w') as f:
    json.dump(data, f, indent=2)
    f.write('\n')
"
}

# Build server JSON from parsed arguments
build_server_json() {
  local command="$1"
  local url="$2"
  local timeout="$3"
  shift 3
  # Remaining: args_array, env_array, approve_array passed via globals

  python3 -c "
import json, sys

server = {}

command = '$command'
url = '$url'
timeout = '$timeout'

if url:
    server['type'] = 'http'
    server['url'] = url
elif command:
    server['command'] = command
else:
    print('ERROR: need --command or --url', file=sys.stderr)
    sys.exit(1)

# Args
args_str = '''$ARGS_STR'''
if args_str:
    server['args'] = [a for a in args_str.split('\x1f') if a]

# Env
env_str = '''$ENV_STR'''
if env_str:
    env = {}
    for pair in env_str.split('\x1f'):
        if '=' in pair:
            k, v = pair.split('=', 1)
            env[k] = v
    if env:
        server['env'] = env

# Auto-approve (Kiro-specific, harmless in Claude)
approve_str = '''$APPROVE_STR'''
if approve_str:
    server['autoApprove'] = [a for a in approve_str.split('\x1f') if a]

if timeout:
    server['timeout'] = int(timeout)

print(json.dumps(server))
"
}

# ── Commands ─────────────────────────────────────────────────────────────────

cmd_add() {
  local name="" command="" url="" timeout=""
  local agents_filter=""
  ARGS_STR=""
  ENV_STR=""
  APPROVE_STR=""

  while [ $# -gt 0 ]; do
    case "$1" in
      --name)       name="$2"; shift 2 ;;
      --command)    command="$2"; shift 2 ;;
      --url)        url="$2"; shift 2 ;;
      --args)       ARGS_STR="${ARGS_STR:+${ARGS_STR}$'\x1f'}$2"; shift 2 ;;
      --env)        ENV_STR="${ENV_STR:+${ENV_STR}$'\x1f'}$2"; shift 2 ;;
      --auto-approve) APPROVE_STR="${APPROVE_STR:+${APPROVE_STR}$'\x1f'}$2"; shift 2 ;;
      --timeout)    timeout="$2"; shift 2 ;;
      --agents)     agents_filter="$2"; shift 2 ;;
      *)            log_fail "Unknown flag: $1"; exit 1 ;;
    esac
  done

  if [ -z "$name" ]; then
    log_fail "Missing --name"; exit 1
  fi
  if [ -z "$command" ] && [ -z "$url" ]; then
    log_fail "Need --command or --url"; exit 1
  fi

  # Export for python
  export ARGS_STR ENV_STR APPROVE_STR

  local server_json
  server_json=$(build_server_json "$command" "$url" "$timeout")

  local agents
  if [ -n "$agents_filter" ]; then
    agents=$(resolve_agents "$agents_filter")
  else
    agents=$(detect_agents)
  fi

  if [ -z "$agents" ]; then
    log_fail "No agents available"; exit 1
  fi

  printf "\n${BOLD}Adding MCP server: ${CYAN}%s${NC}\n" "$name"
  echo "$server_json" | python3 -m json.tool 2>/dev/null || echo "$server_json"
  echo ""

  local IFS=','
  for agent in $agents; do
    case "$agent" in
      claude)
        printf "${BOLD}Claude:${NC} "
        if claude mcp add-json "$name" "$server_json" -s local 2>/dev/null; then
          log_ok "Added via CLI"
        else
          # Fallback to direct JSON edit
          if add_server_json "$CLAUDE_MCP_CONFIG" "$name" "$server_json" 2>/dev/null; then
            log_ok "Added via config file"
          else
            log_fail "Failed to add"
          fi
        fi
        ;;
      kiro)
        printf "${BOLD}Kiro:${NC}   "
        # Build kiro-cli mcp add command
        local kiro_cmd="kiro-cli mcp add --name $name"
        if [ -n "$url" ]; then
          kiro_cmd="$kiro_cmd --url $url"
        else
          kiro_cmd="$kiro_cmd --command $command"
          # Add args
          if [ -n "$ARGS_STR" ]; then
            local IFS_BAK="$IFS"
            IFS=$'\x1f'
            for arg in $ARGS_STR; do
              [ -n "$arg" ] && kiro_cmd="$kiro_cmd --args $arg"
            done
            IFS="$IFS_BAK"
          fi
        fi
        # Add env
        if [ -n "$ENV_STR" ]; then
          local IFS_BAK="$IFS"
          IFS=$'\x1f'
          for env_pair in $ENV_STR; do
            [ -n "$env_pair" ] && kiro_cmd="$kiro_cmd --env \"$env_pair\""
          done
          IFS="$IFS_BAK"
        fi
        # Add auto-approve
        if [ -n "$APPROVE_STR" ]; then
          local IFS_BAK="$IFS"
          IFS=$'\x1f'
          for tool in $APPROVE_STR; do
            [ -n "$tool" ] && kiro_cmd="$kiro_cmd --autoApprove \"$tool\""
          done
          IFS="$IFS_BAK"
        fi
        [ -n "$timeout" ] && kiro_cmd="$kiro_cmd --timeout $timeout"

        if eval "$kiro_cmd" 2>/dev/null; then
          log_ok "Added via CLI"
        else
          # Fallback to direct JSON edit
          if add_server_json "$KIRO_MCP_CONFIG" "$name" "$server_json" 2>/dev/null; then
            log_ok "Added via config file"
          else
            log_fail "Failed to add"
          fi
        fi
        ;;
    esac
  done
  echo ""
}

cmd_remove() {
  local name="" agents_filter=""

  while [ $# -gt 0 ]; do
    case "$1" in
      --name)    name="$2"; shift 2 ;;
      --agents)  agents_filter="$2"; shift 2 ;;
      *)         log_fail "Unknown flag: $1"; exit 1 ;;
    esac
  done

  if [ -z "$name" ]; then
    log_fail "Missing --name"; exit 1
  fi

  local agents
  if [ -n "$agents_filter" ]; then
    agents=$(resolve_agents "$agents_filter")
  else
    agents=$(detect_agents)
  fi

  printf "\n${BOLD}Removing MCP server: ${CYAN}%s${NC}\n\n" "$name"

  local IFS=','
  for agent in $agents; do
    case "$agent" in
      claude)
        printf "${BOLD}Claude:${NC} "
        if claude mcp remove "$name" -s local 2>/dev/null; then
          log_ok "Removed via CLI"
        elif remove_server_json "$CLAUDE_MCP_CONFIG" "$name" 2>/dev/null; then
          log_ok "Removed via config file"
        else
          log_skip "Not found"
        fi
        ;;
      kiro)
        printf "${BOLD}Kiro:${NC}   "
        if kiro-cli mcp remove --name "$name" 2>/dev/null; then
          log_ok "Removed via CLI"
        elif remove_server_json "$KIRO_MCP_CONFIG" "$name" 2>/dev/null; then
          log_ok "Removed via config file"
        else
          log_skip "Not found"
        fi
        ;;
    esac
  done
  echo ""
}

cmd_list() {
  local agents_filter=""
  while [ $# -gt 0 ]; do
    case "$1" in
      --agents)  agents_filter="$2"; shift 2 ;;
      *)         shift ;;
    esac
  done

  local agents
  if [ -n "$agents_filter" ]; then
    agents=$(resolve_agents "$agents_filter")
  else
    agents=$(detect_agents)
  fi

  local IFS=','
  for agent in $agents; do
    local config_path=""
    case "$agent" in
      claude) config_path="$CLAUDE_MCP_CONFIG" ;;
      kiro)   config_path="$KIRO_MCP_CONFIG" ;;
    esac

    printf "\n${BOLD}${CYAN}%s${NC} MCP Servers" "$(echo "$agent" | tr '[:lower:]' '[:upper:]')"
    printf " ${YELLOW}(%s)${NC}\n" "$config_path"
    printf "%-30s %-8s %s\n" "NAME" "TYPE" "TARGET"
    printf "%-30s %-8s %s\n" "----" "----" "------"

    local found=0
    while IFS='|' read -r sname stype starget; do
      [ -z "$sname" ] && continue
      printf "%-30s %-8s %s\n" "$sname" "$stype" "$starget"
      found=1
    done <<< "$(read_servers "$config_path")"

    if [ "$found" -eq 0 ]; then
      echo "  (none configured)"
    fi
  done
  echo ""

  # Show diff
  if has_claude && has_kiro; then
    local claude_servers kiro_servers
    claude_servers=$(read_servers "$CLAUDE_MCP_CONFIG" | cut -d'|' -f1 | sort)
    kiro_servers=$(read_servers "$KIRO_MCP_CONFIG" | cut -d'|' -f1 | sort)

    local claude_only kiro_only
    claude_only=$(comm -23 <(echo "$claude_servers") <(echo "$kiro_servers") | grep -v '^$' || true)
    kiro_only=$(comm -13 <(echo "$claude_servers") <(echo "$kiro_servers") | grep -v '^$' || true)

    if [ -n "$claude_only" ] || [ -n "$kiro_only" ]; then
      printf "${BOLD}Sync Status:${NC}\n"
      if [ -n "$claude_only" ]; then
        printf "  ${YELLOW}Claude only:${NC} %s\n" "$(echo "$claude_only" | tr '\n' ', ' | sed 's/,$//')"
      fi
      if [ -n "$kiro_only" ]; then
        printf "  ${YELLOW}Kiro only:${NC}   %s\n" "$(echo "$kiro_only" | tr '\n' ', ' | sed 's/,$//')"
      fi
      echo "  Run: ./mcp-add.sh sync --from <agent> --to <agent>  to sync"
      echo ""
    fi
  fi
}

cmd_sync() {
  local from="" to=""

  while [ $# -gt 0 ]; do
    case "$1" in
      --from) from="$2"; shift 2 ;;
      --to)   to="$2"; shift 2 ;;
      *)      log_fail "Unknown flag: $1"; exit 1 ;;
    esac
  done

  if [ -z "$from" ] || [ -z "$to" ]; then
    log_fail "Need --from and --to (claude or kiro)"; exit 1
  fi
  if [ "$from" = "$to" ]; then
    log_fail "Source and target must differ"; exit 1
  fi

  local from_config="" to_config=""
  case "$from" in
    claude) from_config="$CLAUDE_MCP_CONFIG" ;;
    kiro)   from_config="$KIRO_MCP_CONFIG" ;;
    *)      log_fail "Unknown agent: $from"; exit 1 ;;
  esac
  case "$to" in
    claude) to_config="$CLAUDE_MCP_CONFIG" ;;
    kiro)   to_config="$KIRO_MCP_CONFIG" ;;
    *)      log_fail "Unknown agent: $to"; exit 1 ;;
  esac

  if [ ! -f "$from_config" ]; then
    log_fail "Source config not found: $from_config"; exit 1
  fi

  ensure_config "$to_config"

  printf "\n${BOLD}Syncing MCP servers: %s → %s${NC}\n\n" "$from" "$to"

  # Get servers only in source
  local from_servers to_servers
  from_servers=$(read_servers "$from_config" | cut -d'|' -f1 | sort)
  to_servers=$(read_servers "$to_config" | cut -d'|' -f1 | sort)

  local missing
  missing=$(comm -23 <(echo "$from_servers") <(echo "$to_servers") | grep -v '^$' || true)

  if [ -z "$missing" ]; then
    log_ok "Already in sync — no servers to copy"
    echo ""
    return
  fi

  while IFS= read -r server_name; do
    [ -z "$server_name" ] && continue
    local server_json
    server_json=$(read_server_json "$from_config" "$server_name")
    if [ -z "$server_json" ]; then
      log_fail "Could not read $server_name from $from"
      continue
    fi

    printf "  %-30s " "$server_name"
    if add_server_json "$to_config" "$server_name" "$server_json" 2>/dev/null; then
      log_ok "Copied"
    else
      log_fail "Failed"
    fi
  done <<< "$missing"
  echo ""
}

# ── Usage ────────────────────────────────────────────────────────────────────

usage() {
  cat <<'EOF'
Cross-Agent MCP Server Manager

USAGE:
  ./mcp-add.sh <command> [options]

COMMANDS:
  add       Add an MCP server to Claude and/or Kiro
  remove    Remove an MCP server from Claude and/or Kiro
  list      List MCP servers across agents (shows sync status)
  sync      Copy missing servers from one agent to another

ADD OPTIONS:
  --name <name>           Server name (required)
  --command <cmd>         Command to run (stdio transport)
  --url <url>             URL for HTTP transport
  --args <arg>            Command argument (repeatable)
  --env KEY=VAL           Environment variable (repeatable)
  --auto-approve <tool>   Auto-approve tool in Kiro (repeatable)
  --timeout <ms>          Server timeout in milliseconds
  --agents claude,kiro    Target specific agents (default: all installed)

REMOVE OPTIONS:
  --name <name>           Server name (required)
  --agents claude,kiro    Target specific agents

SYNC OPTIONS:
  --from <agent>          Source agent (claude or kiro)
  --to <agent>            Target agent (claude or kiro)

EXAMPLES:
  # Add a filesystem server to both agents
  ./mcp-add.sh add --name filesystem --command npx \
    --args "-y" --args "@modelcontextprotocol/server-filesystem" --args "/home"

  # Add an HTTP server to Claude only
  ./mcp-add.sh add --name remote-api --url https://api.example.com/mcp --agents claude

  # Add with env vars and auto-approve
  ./mcp-add.sh add --name my-tool --command ./server \
    --env "API_KEY=abc123" --auto-approve "readFile" --auto-approve "search"

  # List all servers and sync status
  ./mcp-add.sh list

  # Sync Kiro servers → Claude
  ./mcp-add.sh sync --from kiro --to claude

  # Remove from both
  ./mcp-add.sh remove --name my-tool
EOF
}

# ── Main ─────────────────────────────────────────────────────────────────────

if [ $# -eq 0 ]; then
  usage
  exit 0
fi

# Check python3 (needed for JSON manipulation)
if ! command -v python3 &>/dev/null; then
  log_fail "python3 is required for JSON handling"
  exit 1
fi

COMMAND="$1"
shift

case "$COMMAND" in
  add)    cmd_add "$@" ;;
  remove) cmd_remove "$@" ;;
  list)   cmd_list "$@" ;;
  sync)   cmd_sync "$@" ;;
  -h|--help|help) usage ;;
  *)
    log_fail "Unknown command: $COMMAND"
    usage
    exit 1
    ;;
esac
