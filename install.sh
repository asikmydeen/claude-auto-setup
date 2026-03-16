#!/usr/bin/env bash
# shellcheck disable=SC2034  # AGENT_* and FORCE are used via eval/export
set -euo pipefail

# ============================================================================
# Universal AI Agent Setup Installer
#
# Detects installed AI coding agents and configures ALL of them with:
#   - Shared rules (code quality, security, testing, git workflow)
#   - Agent-specific instructions and settings
#   - Multi-agent orchestration workflows
#   - Cached codebase intelligence system
#
# Supported agents:
#   - Claude Code (Anthropic)
#   - Gemini CLI (Google)
#   - Kiro CLI (AWS/Amazon)
#   - Codex CLI (OpenAI)
#   - Cursor (Anysphere)
#   - Amp Code (Sourcegraph)
#
# Usage:
#   ./install.sh                    # Fresh install (auto-detect agents)
#   ./install.sh --update           # Update commands/rules only (preserves settings)
#   ./install.sh --self-update      # Git pull latest + update
#   ./install.sh --agents=claude    # Install only Claude Code
#   ./install.sh --agents=all       # Install all adapters regardless of detection
#   ./install.sh --force            # Overwrite ALL config including settings
#   ./install.sh --dry-run          # Preview changes
#   ./install.sh --uninstall        # Remove all config
#
# Compatible with Bash 3.2+ (macOS default) and all modern shells.
# ============================================================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VERSION="$(cat "$SCRIPT_DIR/VERSION" 2>/dev/null || echo '0.0.0')"
DRY_RUN=false
FORCE=false
UNINSTALL=false
UPDATE=false
SELF_UPDATE=false
DOCTOR=false
AGENTS_FILTER=""

# Shared colors and logging
source "${SCRIPT_DIR}/lib/common.sh"

# Parse arguments
for arg in "$@"; do
  case "$arg" in
    --force)       FORCE=true ;;
    --dry-run)     DRY_RUN=true ;;
    --uninstall)   UNINSTALL=true ;;
    --update)      UPDATE=true ;;
    --self-update) SELF_UPDATE=true; UPDATE=true ;;
    --agents=*)    AGENTS_FILTER="${arg#--agents=}" ;;
    --doctor)      DOCTOR=true ;;
    --version|-V) echo "claude-code-setup v${VERSION}"; exit 0 ;;
    --help|-h)
      echo "Usage: $0 [OPTIONS]"
      echo ""
      echo "Modes:"
      echo "  (no flag)          Fresh install — full setup with backup"
      echo "  --update           Update commands, rules, and adapters only"
      echo "                     Preserves: settings.json, CLAUDE.md, project intel"
      echo "  --self-update      Git pull latest version, then --update"
      echo "  --force            Full install, overwrite everything (backs up first)"
      echo "  --doctor           Check installation health and report issues"
      echo "  --uninstall        Remove all installed config"
      echo ""
      echo "Options:"
      echo "  --dry-run          Preview changes without making them"
      echo "  --agents=NAMES     Comma-separated: claude,gemini,kiro,codex,cursor,ampcode,all"
      echo "  --help             Show this help"
      echo ""
      echo "Examples:"
      echo "  ./install.sh                         # First time setup"
      echo "  ./install.sh --update                # Pull new commands/rules"
      echo "  ./install.sh --self-update            # Git pull + update"
      echo "  ./install.sh --agents=claude,gemini   # Only these agents"
      echo "  ./install.sh --force                  # Full reinstall"
      exit 0
      ;;
    *) error "Unknown argument: $arg. Use --help for usage."; exit 1 ;;
  esac
done

# Agent detection using simple variables (Bash 3.2 compatible — used via eval)
AGENT_claude=false; AGENT_gemini=false; AGENT_kiro=false; AGENT_codex=false; AGENT_cursor=false; AGENT_ampcode=false
ALL_AGENTS="claude gemini kiro codex cursor ampcode"

agent_is_enabled() {
  local name="$1"
  eval echo "\$AGENT_${name}"
}

agent_enable() {
  local name="$1"
  eval "AGENT_${name}=true"
}

detect_agents() {
  step "Detecting installed AI agents"

  if [ "$AGENTS_FILTER" = "all" ]; then
    for key in $ALL_AGENTS; do
      agent_enable "$key"
    done
    ok "Forced: all agents selected"
    return
  fi

  if [ -n "$AGENTS_FILTER" ]; then
    IFS=',' read -ra requested <<< "$AGENTS_FILTER"
    for agent in "${requested[@]}"; do
      agent_enable "$agent"
    done
    ok "Manual selection: ${AGENTS_FILTER}"
    return
  fi

  # Auto-detect
  if command -v claude &>/dev/null; then
    agent_enable claude
    ok "Claude Code: $(claude --version 2>/dev/null || echo 'found')"
  else
    info "Claude Code: not found"
  fi

  if command -v gemini &>/dev/null; then
    agent_enable gemini
    ok "Gemini CLI: found"
  else
    info "Gemini CLI: not found"
  fi

  if command -v kiro &>/dev/null || command -v kiro-cli &>/dev/null; then
    agent_enable kiro
    ok "Kiro CLI: found"
  else
    info "Kiro CLI: not found"
  fi

  if command -v codex &>/dev/null; then
    agent_enable codex
    ok "Codex CLI: found"
  else
    info "Codex CLI: not found"
  fi

  if command -v cursor &>/dev/null || [ -d "$HOME/.cursor" ]; then
    agent_enable cursor
    ok "Cursor: found"
  else
    info "Cursor: not found"
  fi

  if command -v amp &>/dev/null; then
    agent_enable ampcode
    ok "Amp Code: found"
  else
    info "Amp Code: not found"
  fi

  # Count detected
  local count=0
  for key in $ALL_AGENTS; do
    if [ "$(agent_is_enabled "$key")" = "true" ]; then
      count=$((count + 1))
    fi
  done

  if [ $count -eq 0 ]; then
    warn "No AI agents detected. Install at least one:"
    echo "  Claude Code: npm install -g @anthropic-ai/claude-code"
    echo "  Gemini CLI:  npm install -g @google/gemini-cli"
    echo "  Kiro CLI:    See https://kiro.dev/cli/"
    echo "  Codex CLI:   npm install -g @openai/codex"
    echo "  Amp Code:    See https://ampcode.com/"
    echo ""
    echo "  Or use --agents=all to install config for all agents anyway."
    exit 1
  fi

  ok "Detected: $count agent(s)"
}

# Self-update: git pull latest
self_update() {
  step "Self-updating from git"

  if [ ! -d "$SCRIPT_DIR/.git" ]; then
    warn "Not a git repository. Cannot self-update."
    warn "Re-clone from: git@github.com:asikmydeen/claude-auto-setup.git"
    return 1
  fi

  if $DRY_RUN; then
    info "[DRY RUN] Would run: git -C $SCRIPT_DIR pull origin main"
    return
  fi

  local before_hash
  before_hash=$(git -C "$SCRIPT_DIR" rev-parse HEAD 2>/dev/null || echo "unknown")

  git -C "$SCRIPT_DIR" pull origin main --ff-only 2>&1 || {
    warn "Fast-forward pull failed. Trying rebase..."
    git -C "$SCRIPT_DIR" pull origin main --rebase 2>&1 || {
      error "Git pull failed. Manual intervention needed."
      error "Try: cd $SCRIPT_DIR && git stash && git pull origin main"
      return 1
    }
  }

  local after_hash
  after_hash=$(git -C "$SCRIPT_DIR" rev-parse HEAD 2>/dev/null || echo "unknown")

  if [ "$before_hash" = "$after_hash" ]; then
    ok "Already up to date ($before_hash)"
  else
    ok "Updated: ${before_hash:0:7} -> ${after_hash:0:7}"
    # Show what changed
    echo ""
    info "Changes pulled:"
    git -C "$SCRIPT_DIR" log --oneline "${before_hash}..${after_hash}" 2>/dev/null | head -20 | while read -r line; do
      echo "    $line"
    done
  fi
}

# Backup
backup() {
  step "Backing up existing config"
  local backup_dir
  backup_dir="$HOME/.ai-setup-backups/$(date +%Y%m%d-%H%M%S)"

  if $DRY_RUN; then
    info "[DRY RUN] Would backup to $backup_dir"
    return
  fi

  mkdir -p "$backup_dir"

  [ -d "$HOME/.claude/commands" ] && cp -r "$HOME/.claude/commands" "$backup_dir/claude-commands" 2>/dev/null || true
  [ -d "$HOME/.claude/rules" ] && cp -r "$HOME/.claude/rules" "$backup_dir/claude-rules" 2>/dev/null || true
  [ -f "$HOME/.claude/settings.json" ] && cp "$HOME/.claude/settings.json" "$backup_dir/" 2>/dev/null || true
  [ -f "$HOME/.claude/CLAUDE.md" ] && cp "$HOME/.claude/CLAUDE.md" "$backup_dir/" 2>/dev/null || true
  [ -f "$HOME/.gemini/GEMINI.md" ] && cp "$HOME/.gemini/GEMINI.md" "$backup_dir/" 2>/dev/null || true
  [ -f "$HOME/.cursorrules" ] && cp "$HOME/.cursorrules" "$backup_dir/" 2>/dev/null || true

  ok "Backup: $backup_dir"
}

# Update mode: only update commands, rules, and adapters — preserve user config
update_agents() {
  step "Updating shared commands and rules"

  local commands_src="$SCRIPT_DIR/universal/commands"
  local rules_src="$SCRIPT_DIR/universal/rules"
  local updated=0
  local skipped=0

  # --- Claude Code ---
  if [ "$(agent_is_enabled claude)" = "true" ]; then
    step "Updating Claude Code"

    # Always update commands (these are ours, not user-modified)
    local cmd_dest="$HOME/.claude/commands"
    if [ -d "$commands_src" ]; then
      mkdir -p "$cmd_dest"
      for f in "$commands_src"/*.md; do
        local fname
        fname=$(basename "$f")
        if $DRY_RUN; then
          if [ -f "$cmd_dest/$fname" ]; then
            if ! diff -q "$f" "$cmd_dest/$fname" &>/dev/null; then
              info "[DRY RUN] Would update: commands/$fname"
              updated=$((updated + 1))
            fi
          else
            info "[DRY RUN] Would add: commands/$fname"
            updated=$((updated + 1))
          fi
        else
          cp "$f" "$cmd_dest/$fname"
          updated=$((updated + 1))
        fi
      done
      ok "Commands: $updated files synced"
    fi

    # Always update rules (these are ours, not user-modified)
    local rules_dest="$HOME/.claude/rules"
    if [ -d "$rules_src" ]; then
      mkdir -p "$rules_dest"
      local rules_updated=0
      for f in "$rules_src"/*.md; do
        local fname
        fname=$(basename "$f")
        # Skip project-intel.md and workspace-intel.md — those are generated per-project
        if [ "$fname" = "project-intel.md" ] || [ "$fname" = "workspace-intel.md" ]; then
          continue
        fi
        if $DRY_RUN; then
          info "[DRY RUN] Would update: rules/$fname"
        else
          cp "$f" "$rules_dest/$fname"
        fi
        rules_updated=$((rules_updated + 1))
      done
      ok "Rules: $rules_updated files synced"
    fi

    # Always update native agents (these are ours, not user-modified)
    local native_agents_src="$SCRIPT_DIR/agents/claude-code/agents"
    if [ -d "$native_agents_src" ]; then
      mkdir -p "$HOME/.claude/agents"
      local agents_updated=0
      for f in "$native_agents_src"/*.md; do
        [ -f "$f" ] || continue
        local fname
        fname=$(basename "$f")
        if $DRY_RUN; then
          info "[DRY RUN] Would update: agents/$fname"
        else
          cp "$f" "$HOME/.claude/agents/$fname"
        fi
        agents_updated=$((agents_updated + 1))
      done
      ok "Native agents: $agents_updated files synced"
    fi

    # PRESERVE these user-modified files (never overwrite in update mode):
    local preserved_files="settings.json CLAUDE.md"
    for pf in $preserved_files; do
      if [ -f "$HOME/.claude/$pf" ]; then
        info "Preserved (not touched): ~/.claude/$pf"
        skipped=$((skipped + 1))
      fi
    done

    # CLAUDE.md and settings.json: only install if missing
    local claude_agent_dir="$SCRIPT_DIR/agents/claude-code"
    if [ ! -f "$HOME/.claude/CLAUDE.md" ] && [ -f "$claude_agent_dir/CLAUDE.md" ]; then
      if $DRY_RUN; then
        info "[DRY RUN] Would create: ~/.claude/CLAUDE.md (missing)"
      else
        cp "$claude_agent_dir/CLAUDE.md" "$HOME/.claude/CLAUDE.md"
        ok "Created missing: ~/.claude/CLAUDE.md"
      fi
    fi
    if [ ! -f "$HOME/.claude/settings.json" ] && [ -f "$claude_agent_dir/settings.json" ]; then
      if $DRY_RUN; then
        info "[DRY RUN] Would create: ~/.claude/settings.json (missing)"
      else
        cp "$claude_agent_dir/settings.json" "$HOME/.claude/settings.json"
        ok "Created missing: ~/.claude/settings.json"
      fi
    fi
  fi

  # --- Other agents: run adapters in update mode ---
  for agent in gemini kiro codex cursor ampcode; do
    if [ "$(agent_is_enabled "$agent")" = "true" ]; then
      local adapter="$SCRIPT_DIR/agents"
      case $agent in
        gemini)  adapter="$adapter/gemini-cli/adapter.sh" ;;
        kiro)    adapter="$adapter/kiro-cli/adapter.sh" ;;
        codex)   adapter="$adapter/codex-cli/adapter.sh" ;;
        cursor)  adapter="$adapter/cursor/adapter.sh" ;;
        ampcode) adapter="$adapter/ampcode/adapter.sh" ;;
      esac

      if [ -f "$adapter" ]; then
        step "Updating: $(echo "$agent" | sed 's/^./\U&/')"
        if $DRY_RUN; then
          info "[DRY RUN] Would run $adapter install"
        else
          chmod +x "$adapter"
          bash "$adapter" install
        fi
      fi
    fi
  done

  # --- Update dispatch script ---
  if [ -f "$SCRIPT_DIR/dispatch.sh" ]; then
    local dispatch_dest="$HOME/claude-code-setup"
    if [ -d "$dispatch_dest" ] || [ "$SCRIPT_DIR" = "$dispatch_dest" ]; then
      ok "dispatch.sh: up to date (in-place)"
    else
      mkdir -p "$dispatch_dest"
      if $DRY_RUN; then
        info "[DRY RUN] Would copy dispatch.sh to $dispatch_dest/"
      else
        cp "$SCRIPT_DIR/dispatch.sh" "$dispatch_dest/dispatch.sh"
        chmod +x "$dispatch_dest/dispatch.sh"
        ok "dispatch.sh: updated"
      fi
    fi
  fi

  # --- Update orchestration server ---
  if [ -f "$SCRIPT_DIR/orchestration/server.js" ]; then
    local orch_dest="$HOME/.claude/orchestration"
    if [ -d "$orch_dest" ]; then
      if $DRY_RUN; then
        info "[DRY RUN] Would update orchestration server"
      else
        \cp -f "$SCRIPT_DIR/orchestration/server.js" "$orch_dest/"
        \cp -f "$SCRIPT_DIR/orchestration/lib/"*.js "$orch_dest/lib/"
        \cp -f "$SCRIPT_DIR/orchestration/hooks/"* "$orch_dest/hooks/" 2>/dev/null || true
        chmod +x "$orch_dest/hooks/"* 2>/dev/null || true
        ok "Orchestration server: updated"
      fi
    else
      info "Orchestration server: not installed yet (run without --update first)"
    fi
  fi
}

# Full install per agent (used for fresh install and --force)
install_agents() {
  for agent in $ALL_AGENTS; do
    if [ "$(agent_is_enabled "$agent")" = "true" ]; then
      local adapter="$SCRIPT_DIR/agents"

      case $agent in
        claude)  adapter="$adapter/claude-code/adapter.sh" ;;
        gemini)  adapter="$adapter/gemini-cli/adapter.sh" ;;
        kiro)    adapter="$adapter/kiro-cli/adapter.sh" ;;
        codex)   adapter="$adapter/codex-cli/adapter.sh" ;;
        cursor)  adapter="$adapter/cursor/adapter.sh" ;;
        ampcode) adapter="$adapter/ampcode/adapter.sh" ;;
      esac

      if [ -f "$adapter" ]; then
        step "Installing: $(echo "$agent" | sed 's/^./\U&/')"
        if $DRY_RUN; then
          info "[DRY RUN] Would run $adapter install"
        else
          chmod +x "$adapter"
          bash "$adapter" install
        fi
      else
        warn "Adapter not found: $adapter"
      fi
    fi
  done
}

# Uninstall
uninstall_agents() {
  step "Uninstalling all agent configurations"
  for agent in $ALL_AGENTS; do
    local adapter="$SCRIPT_DIR/agents"
    case $agent in
      claude)  adapter="$adapter/claude-code/adapter.sh" ;;
      gemini)  adapter="$adapter/gemini-cli/adapter.sh" ;;
      kiro)    adapter="$adapter/kiro-cli/adapter.sh" ;;
      codex)   adapter="$adapter/codex-cli/adapter.sh" ;;
      cursor)  adapter="$adapter/cursor/adapter.sh" ;;
      ampcode) adapter="$adapter/ampcode/adapter.sh" ;;
    esac
    if [ -f "$adapter" ]; then
      chmod +x "$adapter"
      bash "$adapter" uninstall
    fi
  done
  ok "Uninstall complete"
  exit 0
}

# Summary
summary() {
  local mode="$1"

  if [ "$mode" = "update" ]; then
    step "Update Complete!"
  else
    step "Installation Complete!"
  fi

  echo ""
  echo "  ${BOLD}Agents configured:${RESET}"
  for agent in $ALL_AGENTS; do
    if [ "$(agent_is_enabled "$agent")" = "true" ]; then
      echo "    ${GREEN}*${RESET} $(echo "$agent" | sed 's/^./\U&/')"
    fi
  done
  echo ""
  echo "  ${BOLD}Shared components:${RESET}"
  echo "    Rules:    $(ls "$SCRIPT_DIR/universal/rules/"*.md 2>/dev/null | wc -l) files"
  echo "    Commands: $(ls "$SCRIPT_DIR/universal/commands/"*.md 2>/dev/null | wc -l) files"
  echo ""

  if [ "$mode" = "update" ]; then
    echo "  ${BOLD}What was updated:${RESET}"
    echo "    ${GREEN}*${RESET} Commands (roles, subagents, workflows)"
    echo "    ${GREEN}*${RESET} Rules (orchestration, code quality, security, testing, git, AWS)"
    echo "    ${GREEN}*${RESET} Agent adapters"
    echo ""
    echo "  ${BOLD}What was preserved:${RESET}"
    echo "    ${CYAN}*${RESET} ~/.claude/settings.json (your permissions, hooks, plugins)"
    echo "    ${CYAN}*${RESET} ~/.claude/CLAUDE.md (your global instructions)"
    echo "    ${CYAN}*${RESET} Project-level intel files (project-intel.md, workspace-intel.md)"
    echo "    ${CYAN}*${RESET} Memory files"
    echo ""
  fi

  echo "  ${BOLD}Key commands (Claude Code):${RESET}"
  echo "    /init              Scan project + auto-generate intel"
  echo "    /build <feature>   Multi-agent implementation"
  echo "    /review            Multi-agent code review"
  echo "    /debug <problem>   Multi-agent debugging"
  echo "    /deep-research     Full codebase analysis"
  echo "    /mem-search <q>    Search persistent memory"
  echo ""

  if [ "$mode" = "update" ]; then
    echo "  ${BOLD}Tip:${RESET} Restart your AI agent(s) to pick up the changes."
  else
    echo "  ${BOLD}Next steps:${RESET}"
    echo "    1. Restart your AI agent(s)"
    echo "    2. cd into a project"
    echo "    3. Run ./project-init.sh (or /init in Claude Code)"
  fi
  echo ""
  echo "  ${BOLD}Dashboard:${RESET} cd dashboard && pnpm dev (http://localhost:3200)"
  echo "  ${BOLD}Backup:${RESET}    ~/.ai-setup-backups/"
  echo "  ${BOLD}Rollback:${RESET}  ./install.sh --uninstall"
  echo "  ${BOLD}Update:${RESET}    ./install.sh --update  (or --self-update to pull latest first)"
}

# ============================================================================
# Doctor — health check
# ============================================================================
doctor() {
  echo ""
  echo "${BOLD}Universal AI Agent Setup v${VERSION} — Health Check${RESET}"
  echo "=================================================="
  local issues=0 checks=0 warnings=0

  check_pass() { checks=$((checks + 1)); echo "  ${GREEN}OK${RESET}    $*"; }
  check_fail() { checks=$((checks + 1)); issues=$((issues + 1)); echo "  ${RED}FAIL${RESET}  $*"; }
  check_warn() { checks=$((checks + 1)); warnings=$((warnings + 1)); echo "  ${YELLOW}WARN${RESET}  $*"; }

  # --- Repository ---
  step "Repository"
  [ -d "$SCRIPT_DIR/.git" ] && check_pass "Git repo intact" || check_fail "Not a git repo"
  [ -d "$SCRIPT_DIR/universal" ] && check_pass "universal/ directory" || check_fail "universal/ missing"
  [ -d "$SCRIPT_DIR/agents" ] && check_pass "agents/ directory" || check_fail "agents/ missing"
  [ -f "$SCRIPT_DIR/lib/common.sh" ] && check_pass "lib/common.sh" || check_fail "lib/common.sh missing"

  # --- Agent CLIs ---
  step "Agent CLIs"
  local agent_count=0
  if command -v claude &>/dev/null; then
    check_pass "Claude Code: $(claude --version 2>/dev/null || echo 'found')"
    agent_count=$((agent_count + 1))
  else
    check_warn "Claude Code: not installed"
  fi
  if command -v kiro-cli &>/dev/null || command -v kiro &>/dev/null; then
    check_pass "Kiro CLI: found"
    agent_count=$((agent_count + 1))
  else
    check_warn "Kiro CLI: not installed"
  fi
  for cli in gemini codex cursor amp; do
    if command -v "$cli" &>/dev/null; then
      check_pass "$cli: found"
      agent_count=$((agent_count + 1))
    fi
  done
  [ $agent_count -gt 0 ] || check_fail "No AI agent CLIs detected"

  # --- Claude Code Installation ---
  if command -v claude &>/dev/null; then
    step "Claude Code Config"
    [ -f "$HOME/.claude/CLAUDE.md" ] && check_pass "CLAUDE.md installed" || check_fail "CLAUDE.md missing — run ./install.sh"
    [ -f "$HOME/.claude/settings.json" ] && check_pass "settings.json exists" || check_fail "settings.json missing"
    if [ -d "$HOME/.claude/commands" ]; then
      local cmd_count
      cmd_count=$(find "$HOME/.claude/commands" -name '*.md' 2>/dev/null | wc -l)
      [ "$cmd_count" -gt 0 ] && check_pass "Commands: $cmd_count installed" || check_warn "Commands directory empty"
    else
      check_fail "Commands directory missing"
    fi
    if [ -d "$HOME/.claude/rules" ]; then
      local rule_count
      rule_count=$(find "$HOME/.claude/rules" -name '*.md' 2>/dev/null | wc -l)
      [ "$rule_count" -gt 0 ] && check_pass "Rules: $rule_count installed" || check_warn "Rules directory empty"
    else
      check_fail "Rules directory missing"
    fi
    if [ -d "$HOME/.claude/agents" ]; then
      local na_count
      na_count=$(find "$HOME/.claude/agents" -name '*.md' 2>/dev/null | wc -l)
      [ "$na_count" -gt 0 ] && check_pass "Native agents: $na_count installed" || check_warn "No native agents"
    else
      check_warn "Native agents directory missing"
    fi
  fi

  # --- Orchestration MCP ---
  step "Orchestration"
  if [ -f "$HOME/.claude/orchestration/server.js" ]; then
    check_pass "MCP server: installed"
    [ -f "$HOME/.claude/orchestration/package.json" ] && check_pass "MCP package.json" || check_fail "MCP package.json missing"
    [ -d "$HOME/.claude/orchestration/node_modules" ] && check_pass "MCP dependencies installed" || check_fail "MCP node_modules missing — run: cd ~/.claude/orchestration && npm install"
  else
    check_warn "Orchestration MCP server not installed"
  fi

  # --- cmux ---
  step "cmux (worktree management)"
  if [ -x "$HOME/.local/bin/cmux" ]; then
    check_pass "cmux wrapper: ~/.local/bin/cmux"
    if "$HOME/.local/bin/cmux" version &>/dev/null; then
      check_pass "cmux wrapper functional"
    else
      check_fail "cmux wrapper exists but fails to run"
    fi
  else
    check_warn "cmux wrapper not installed — run ./install.sh"
  fi

  # --- claude-mem (persistent memory) ---
  step "claude-mem (persistent memory)"
  local mem_plugin_dir="$HOME/.claude/plugins/marketplaces/thedotmack/plugin"
  if [ -d "$mem_plugin_dir" ] && [ -f "$mem_plugin_dir/scripts/worker-service.cjs" ]; then
    check_pass "claude-mem plugin: installed"
    if curl -s --connect-timeout 2 http://localhost:37777/health &>/dev/null; then
      check_pass "claude-mem worker: running (port 37777)"
    else
      check_warn "claude-mem worker: not running (starts on session start via hooks)"
    fi
    local mem_db="$HOME/.claude-mem/claude-mem.db"
    if [ -f "$mem_db" ]; then
      local db_size
      db_size=$(du -sh "$mem_db" 2>/dev/null | cut -f1)
      check_pass "claude-mem database: $db_size"
    else
      check_warn "claude-mem database: not yet created (initializes on first session)"
    fi
  else
    check_warn "claude-mem: not installed (install: claude plugin marketplace add thedotmack/claude-mem)"
  fi

  # --- OpenViking ---
  step "OpenViking (context database)"
  if command -v ov &>/dev/null; then
    check_pass "OpenViking CLI: installed"
    if curl -s --connect-timeout 1 http://localhost:1933/status &>/dev/null; then
      check_pass "OpenViking server: running (port 1933)"
    else
      check_warn "OpenViking server: not running (start with: openviking-server)"
    fi
  else
    check_warn "OpenViking: not installed (optional — pip install openviking)"
  fi

  # --- Dependencies ---
  step "Dependencies"
  command -v git &>/dev/null && check_pass "git: $(git --version 2>/dev/null | head -1)" || check_fail "git not found"
  command -v node &>/dev/null && check_pass "node: $(node --version 2>/dev/null)" || check_warn "node not found (needed for dashboard + MCP)"
  command -v python3 &>/dev/null && check_pass "python3: found (used for settings merge)" || check_warn "python3 not found (settings merge will be skipped)"

  # --- Summary ---
  echo ""
  echo "=================================================="
  if [ $issues -eq 0 ] && [ $warnings -eq 0 ]; then
    echo "  ${GREEN}${BOLD}All $checks checks passed.${RESET}"
  elif [ $issues -eq 0 ]; then
    echo "  ${GREEN}${BOLD}$((checks - warnings)) passed${RESET}, ${YELLOW}${BOLD}$warnings warnings${RESET}"
  else
    echo "  ${GREEN}${BOLD}$((checks - issues - warnings)) passed${RESET}, ${RED}${BOLD}$issues failed${RESET}, ${YELLOW}${BOLD}$warnings warnings${RESET}"
    echo "  Run ${BOLD}./install.sh${RESET} to fix failed checks."
  fi
  echo ""
  exit $issues
}

# ============================================================================
# Main
# ============================================================================

# Handle doctor before main flow (no install/detect needed)
$DOCTOR && doctor

echo ""
echo "${BOLD}Universal AI Agent Setup v${VERSION}${RESET}"
echo "===================================="
$DRY_RUN && echo "${YELLOW}[DRY RUN MODE]${RESET}"
$UPDATE && ! $SELF_UPDATE && echo "${CYAN}[UPDATE MODE]${RESET} — commands/rules only, preserving your config"
$SELF_UPDATE && echo "${CYAN}[SELF-UPDATE MODE]${RESET} — pulling latest from git, then updating"

# Handle uninstall
$UNINSTALL && { backup; uninstall_agents; }

# Handle self-update (git pull first)
$SELF_UPDATE && self_update

# Detect agents
detect_agents

# Backup before any changes
backup

# Choose mode
if $UPDATE; then
  update_agents
  summary "update"
else
  install_agents

  # Install dashboard dependencies
  if [ -f "$SCRIPT_DIR/dashboard/package.json" ]; then
    echo ""
    step "Installing Agent Dashboard"
    if $DRY_RUN; then
      info "[DRY RUN] Would install dashboard dependencies"
    else
      if command -v pnpm &>/dev/null; then
        (cd "$SCRIPT_DIR/dashboard" && pnpm install --frozen-lockfile 2>/dev/null || pnpm install)
        ok "Dashboard ready: cd dashboard && pnpm dev"
      elif command -v npm &>/dev/null; then
        (cd "$SCRIPT_DIR/dashboard" && npm install)
        ok "Dashboard ready: cd dashboard && npm start"
      else
        warn "Dashboard skipped: install pnpm or npm first, then run: cd dashboard && npm install"
      fi
    fi
  fi

  # Install orchestration MCP server
  if [ -f "$SCRIPT_DIR/orchestration/package.json" ]; then
    echo ""
    step "Installing Orchestration MCP Server"
    if $DRY_RUN; then
      info "[DRY RUN] Would install orchestration server"
    else
      orch_dest="$HOME/.claude/orchestration"
      mkdir -p "$orch_dest/lib" "$orch_dest/hooks"
      \cp -f "$SCRIPT_DIR/orchestration/package.json" "$orch_dest/"
      \cp -f "$SCRIPT_DIR/orchestration/server.js" "$orch_dest/"
      \cp -f "$SCRIPT_DIR/orchestration/lib/"*.js "$orch_dest/lib/"
      \cp -f "$SCRIPT_DIR/orchestration/hooks/"* "$orch_dest/hooks/" 2>/dev/null || true
      chmod +x "$orch_dest/hooks/"* 2>/dev/null || true

      # Install npm dependencies
      if command -v npm &>/dev/null; then
        (cd "$orch_dest" && npm install --production 2>&1 | tail -3)
        ok "Orchestration server installed"
      else
        warn "Orchestration: npm not found, run: cd $orch_dest && npm install"
      fi

      # Register MCP server with Claude (remove first to handle re-installs)
      if command -v claude &>/dev/null; then
        claude mcp remove -s user orchestration 2>/dev/null || true
        claude mcp add -s user orchestration -- node "$orch_dest/server.js" 2>/dev/null \
          && ok "Registered MCP: orchestration (Claude)" \
          || warn "Could not register orchestration MCP with Claude CLI"
      fi

      # Register MCP server with Kiro
      kiro_mcp="$HOME/.kiro/settings/mcp.json"
      if [ -f "$kiro_mcp" ] && command -v python3 &>/dev/null; then
        python3 -c "
import json
mcp_path = '$kiro_mcp'
with open(mcp_path) as f:
    data = json.load(f)
data.setdefault('mcpServers', {})
data['mcpServers']['orchestration'] = {
    'command': 'node',
    'args': ['$orch_dest/server.js']
}
with open(mcp_path, 'w') as f:
    json.dump(data, f, indent=2)
    f.write('\n')
"
        ok "Registered MCP: orchestration (Kiro)"
      fi

      # Install git post-commit hook template
      if [ -f "$orch_dest/hooks/post-commit" ]; then
        git_hooks_dir="$HOME/.claude/git-hooks"
        mkdir -p "$git_hooks_dir"
        \cp -f "$orch_dest/hooks/post-commit" "$git_hooks_dir/post-commit"
        chmod +x "$git_hooks_dir/post-commit"
        ok "Git post-commit hook template: $git_hooks_dir/post-commit"
        info "To activate in a project: cp $git_hooks_dir/post-commit .git/hooks/post-commit"
      fi
    fi
  fi

  # Install cmux (parallel agent worktrees)
  echo ""
  step "Installing cmux (parallel agent worktrees)"
  if $DRY_RUN; then
    info "[DRY RUN] Would install cmux"
  else
    if command -v cmux &>/dev/null; then
      ok "cmux already installed: $(cmux version 2>/dev/null || echo 'found')"
    else
      # Install cmux
      if command -v curl &>/dev/null; then
        curl -fsSL https://github.com/craigsc/cmux/releases/latest/download/install.sh 2>/dev/null | sh 2>/dev/null \
          && ok "cmux installed" \
          || warn "cmux install failed — install manually: https://github.com/craigsc/cmux"
      else
        warn "cmux: curl not found. Install manually: https://github.com/craigsc/cmux"
      fi
    fi

    # Install cmux non-interactive wrapper (needed for Node.js/MCP orchestration)
    # Installed regardless of shell function — wrapper works standalone with git worktrees
    mkdir -p "$HOME/.local/bin"
    \cp -f "$SCRIPT_DIR/universal/cmux-wrapper.sh" "$HOME/.local/bin/cmux"
    chmod +x "$HOME/.local/bin/cmux"
    ok "cmux wrapper: ~/.local/bin/cmux (callable from Node.js/MCP)"

    # Install cmux setup template
    if [ -f "$SCRIPT_DIR/universal/cmux-setup.sh" ]; then
      mkdir -p "$HOME/.claude/templates"
      \cp -f "$SCRIPT_DIR/universal/cmux-setup.sh" "$HOME/.claude/templates/cmux-setup.sh"
      chmod +x "$HOME/.claude/templates/cmux-setup.sh"
      ok "cmux setup template: ~/.claude/templates/cmux-setup.sh"
      info "To use in a project: mkdir -p .cmux && cp ~/.claude/templates/cmux-setup.sh .cmux/setup"
    fi
  fi

  summary "install"
fi
