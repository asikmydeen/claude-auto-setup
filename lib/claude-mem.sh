#!/usr/bin/env bash
# claude-mem integration — persistent memory system for AI agents
# Sources: lib/common.sh for colors/logging

# Check if claude-mem plugin is installed
has_claude_mem() {
  local plugin_dir="$HOME/.claude/plugins/marketplaces/thedotmack/plugin"
  [ -d "$plugin_dir" ] && [ -f "$plugin_dir/scripts/worker-service.cjs" ]
}

# Check if claude-mem worker is running (port 37777)
claude_mem_worker_healthy() {
  curl -s --connect-timeout 2 "http://localhost:37777/health" &>/dev/null
}

# Install claude-mem plugin via Claude CLI marketplace
install_claude_mem() {
  local dry_run="${1:-false}"

  if has_claude_mem; then
    ok "claude-mem: already installed"
    return 0
  fi

  if ! command -v claude &>/dev/null; then
    info "claude-mem: skipped (claude CLI not found)"
    return 1
  fi

  if [ "$dry_run" = "true" ]; then
    info "[DRY RUN] Would install claude-mem plugin"
    return 0
  fi

  step "Installing claude-mem persistent memory system"

  # Install via marketplace
  if claude plugin marketplace add thedotmack/claude-mem 2>/dev/null; then
    ok "claude-mem: plugin installed via marketplace"
  else
    warn "claude-mem: marketplace install failed"
    info "Install manually: claude plugin marketplace add thedotmack/claude-mem"
    return 1
  fi

  # Run smart-install to provision dependencies (Bun, uv, etc.)
  local plugin_root="$HOME/.claude/plugins/marketplaces/thedotmack/plugin"
  if [ -f "$plugin_root/scripts/smart-install.js" ]; then
    info "Provisioning claude-mem dependencies..."
    node "$plugin_root/scripts/smart-install.js" 2>/dev/null || true
  fi

  ok "claude-mem: installation complete"
}

# Register claude-mem MCP server with Claude Code
register_claude_mem_mcp() {
  local dry_run="${1:-false}"

  if ! command -v claude &>/dev/null; then
    return 1
  fi

  local plugin_root="$HOME/.claude/plugins/marketplaces/thedotmack/plugin"
  local mcp_script="$plugin_root/scripts/mcp-server.cjs"

  if [ ! -f "$mcp_script" ]; then
    info "claude-mem MCP: script not found (plugin not installed?)"
    return 1
  fi

  if [ "$dry_run" = "true" ]; then
    info "[DRY RUN] Would register claude-mem MCP server"
    return 0
  fi

  # Remove existing registration to avoid conflicts
  claude mcp remove -s user claude-mem-search 2>/dev/null || true

  # Register stdio MCP server
  if claude mcp add -s user claude-mem-search -- node "$mcp_script" 2>/dev/null; then
    ok "claude-mem MCP: registered (mem-search tools available)"
  else
    warn "claude-mem MCP: registration failed"
    return 1
  fi
}

# Start the worker service if not running
start_claude_mem_worker() {
  if claude_mem_worker_healthy; then
    return 0
  fi

  local plugin_root="$HOME/.claude/plugins/marketplaces/thedotmack/plugin"
  local bun_runner="$plugin_root/scripts/bun-runner.js"
  local worker="$plugin_root/scripts/worker-service.cjs"

  if [ -f "$bun_runner" ] && [ -f "$worker" ]; then
    node "$bun_runner" "$worker" start 2>/dev/null &
    # Wait briefly for startup
    local attempts=0
    while [ $attempts -lt 5 ]; do
      sleep 1
      if claude_mem_worker_healthy; then
        return 0
      fi
      attempts=$((attempts + 1))
    done
  fi
  return 1
}

# Doctor check for claude-mem
doctor_claude_mem() {
  local issues=0

  if has_claude_mem; then
    ok "claude-mem plugin: installed"
  else
    warn "claude-mem plugin: not installed"
    info "  Fix: claude plugin marketplace add thedotmack/claude-mem"
    issues=$((issues + 1))
  fi

  if claude_mem_worker_healthy; then
    ok "claude-mem worker: running (port 37777)"
  else
    warn "claude-mem worker: not running"
    info "  Worker starts automatically on session start via hooks"
    issues=$((issues + 1))
  fi

  # Check database exists
  local db_path="$HOME/.claude-mem/claude-mem.db"
  if [ -f "$db_path" ]; then
    local db_size
    db_size=$(du -sh "$db_path" 2>/dev/null | cut -f1)
    ok "claude-mem database: $db_size"
  else
    info "claude-mem database: not yet created (will initialize on first session)"
  fi

  return $issues
}
