#!/usr/bin/env bash
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
#   ./install.sh                    # Auto-detect and install all
#   ./install.sh --agents claude    # Install only Claude Code
#   ./install.sh --agents all       # Install all adapters regardless of detection
#   ./install.sh --force            # Overwrite existing config
#   ./install.sh --dry-run          # Preview changes
#   ./install.sh --uninstall        # Remove all config
# ============================================================================

VERSION="2.0.0"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DRY_RUN=false
FORCE=false
UNINSTALL=false
AGENTS_FILTER=""

# Colors
if [ -t 1 ] && command -v tput &>/dev/null && [ "$(tput colors 2>/dev/null || echo 0)" -ge 8 ]; then
  RED=$(tput setaf 1); GREEN=$(tput setaf 2); YELLOW=$(tput setaf 3)
  BLUE=$(tput setaf 4); CYAN=$(tput setaf 6); BOLD=$(tput bold); RESET=$(tput sgr0)
else
  RED=""; GREEN=""; YELLOW=""; BLUE=""; CYAN=""; BOLD=""; RESET=""
fi

info()  { echo "${BLUE}[INFO]${RESET}  $*"; }
ok()    { echo "${GREEN}[OK]${RESET}    $*"; }
warn()  { echo "${YELLOW}[WARN]${RESET}  $*"; }
error() { echo "${RED}[ERROR]${RESET} $*" >&2; }
step()  { echo ""; echo "${BOLD}${CYAN}==> $*${RESET}"; }

# Parse arguments
for arg in "$@"; do
  case "$arg" in
    --force)     FORCE=true ;;
    --dry-run)   DRY_RUN=true ;;
    --uninstall) UNINSTALL=true ;;
    --agents=*)  AGENTS_FILTER="${arg#--agents=}" ;;
    --help|-h)
      echo "Usage: $0 [OPTIONS]"
      echo ""
      echo "Options:"
      echo "  --force            Overwrite existing config (backs up first)"
      echo "  --dry-run          Preview changes without making them"
      echo "  --uninstall        Remove all installed config"
      echo "  --agents=NAMES     Comma-separated: claude,gemini,kiro,codex,cursor,all"
      echo "  --help             Show this help"
      echo ""
      echo "Examples:"
      echo "  ./install.sh                        # Auto-detect and install"
      echo "  ./install.sh --agents=claude,gemini  # Only these agents"
      echo "  ./install.sh --agents=all            # All agents regardless"
      echo "  ./install.sh --force                 # Overwrite existing"
      exit 0
      ;;
    *) error "Unknown argument: $arg. Use --help for usage."; exit 1 ;;
  esac
done

# Agent detection
declare -A AGENTS
detect_agents() {
  step "Detecting installed AI agents"

  AGENTS[claude]=false
  AGENTS[gemini]=false
  AGENTS[kiro]=false
  AGENTS[codex]=false
  AGENTS[cursor]=false
  AGENTS[ampcode]=false

  if [ "$AGENTS_FILTER" = "all" ]; then
    for key in claude gemini kiro codex cursor ampcode; do
      AGENTS[$key]=true
    done
    ok "Forced: all agents selected"
    return
  fi

  if [ -n "$AGENTS_FILTER" ]; then
    IFS=',' read -ra requested <<< "$AGENTS_FILTER"
    for agent in "${requested[@]}"; do
      AGENTS[$agent]=true
    done
    ok "Manual selection: ${AGENTS_FILTER}"
    return
  fi

  # Auto-detect
  if command -v claude &>/dev/null; then
    AGENTS[claude]=true
    ok "Claude Code: $(claude --version 2>/dev/null || echo 'found')"
  else
    info "Claude Code: not found"
  fi

  if command -v gemini &>/dev/null; then
    AGENTS[gemini]=true
    ok "Gemini CLI: found"
  else
    info "Gemini CLI: not found"
  fi

  if command -v kiro &>/dev/null; then
    AGENTS[kiro]=true
    ok "Kiro CLI: found"
  else
    info "Kiro CLI: not found"
  fi

  if command -v codex &>/dev/null; then
    AGENTS[codex]=true
    ok "Codex CLI: found"
  else
    info "Codex CLI: not found"
  fi

  if command -v cursor &>/dev/null || [ -d "$HOME/.cursor" ]; then
    AGENTS[cursor]=true
    ok "Cursor: found"
  else
    info "Cursor: not found"
  fi

  if command -v amp &>/dev/null; then
    AGENTS[ampcode]=true
    ok "Amp Code: found"
  else
    info "Amp Code: not found"
  fi

  # Count detected
  local count=0
  for key in "${!AGENTS[@]}"; do
    if ${AGENTS[$key]}; then count=$((count + 1)); fi
  done

  if [ $count -eq 0 ]; then
    warn "No AI agents detected. Install at least one:"
    echo "  Claude Code: npm install -g @anthropic-ai/claude-code"
    echo "  Gemini CLI:  npm install -g @anthropic-ai/gemini-cli  (or brew install gemini)"
    echo "  Kiro CLI:    See https://kiro.dev/cli/"
    echo "  Codex CLI:   npm install -g @openai/codex"
    echo ""
    echo "  Or use --agents=all to install config for all agents anyway."
    exit 1
  fi

  ok "Detected: $count agent(s)"
}

# Backup
backup() {
  step "Backing up existing config"
  local backup_dir="$HOME/.ai-setup-backups/$(date +%Y%m%d-%H%M%S)"

  if $DRY_RUN; then
    info "[DRY RUN] Would backup to $backup_dir"
    return
  fi

  mkdir -p "$backup_dir"

  [ -d "$HOME/.claude" ] && cp -r "$HOME/.claude/commands" "$backup_dir/claude-commands" 2>/dev/null || true
  [ -d "$HOME/.claude/rules" ] && cp -r "$HOME/.claude/rules" "$backup_dir/claude-rules" 2>/dev/null || true
  [ -f "$HOME/.claude/settings.json" ] && cp "$HOME/.claude/settings.json" "$backup_dir/" 2>/dev/null || true
  [ -f "$HOME/.claude/CLAUDE.md" ] && cp "$HOME/.claude/CLAUDE.md" "$backup_dir/" 2>/dev/null || true
  [ -f "$HOME/.gemini/GEMINI.md" ] && cp "$HOME/.gemini/GEMINI.md" "$backup_dir/" 2>/dev/null || true
  [ -f "$HOME/.cursorrules" ] && cp "$HOME/.cursorrules" "$backup_dir/" 2>/dev/null || true

  ok "Backup: $backup_dir"
}

# Install per agent
install_agents() {
  for agent in claude gemini kiro codex cursor ampcode; do
    if ${AGENTS[$agent]}; then
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
        step "Installing: ${agent^}"
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
  for agent in claude gemini kiro codex cursor; do
    local adapter="$SCRIPT_DIR/agents"
    case $agent in
      claude) adapter="$adapter/claude-code/adapter.sh" ;;
      gemini) adapter="$adapter/gemini-cli/adapter.sh" ;;
      kiro)   adapter="$adapter/kiro-cli/adapter.sh" ;;
      codex)  adapter="$adapter/codex-cli/adapter.sh" ;;
      cursor) adapter="$adapter/cursor/adapter.sh" ;;
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
  step "Installation Complete!"
  echo ""
  echo "  ${BOLD}Agents configured:${RESET}"
  for agent in claude gemini kiro codex cursor; do
    if ${AGENTS[$agent]}; then
      echo "    ${GREEN}*${RESET} ${agent^}"
    fi
  done
  echo ""
  echo "  ${BOLD}Shared components:${RESET}"
  echo "    Rules:    $(ls "$SCRIPT_DIR/universal/rules/"*.md 2>/dev/null | wc -l) files (code quality, security, testing, git, AWS, orchestration)"
  echo "    Commands: $(ls "$SCRIPT_DIR/universal/commands/"*.md 2>/dev/null | wc -l) files (roles, subagents, workflows)"
  echo ""
  echo "  ${BOLD}Per-project setup:${RESET}"
  echo "    Run ${CYAN}./project-init.sh${RESET} in any project directory to create"
  echo "    shared .ai/ config for all agents."
  echo ""
  echo "  ${BOLD}Key commands (Claude Code):${RESET}"
  echo "    /init              Scan project + auto-generate intel"
  echo "    /build <feature>   Multi-agent implementation"
  echo "    /review            Multi-agent code review"
  echo "    /debug <problem>   Multi-agent debugging"
  echo "    /deep-research     Full codebase analysis"
  echo ""
  echo "  ${BOLD}Next steps:${RESET}"
  echo "    1. Restart your AI agent(s)"
  echo "    2. cd into a project"
  echo "    3. Run ./project-init.sh (or /init in Claude Code)"
  echo ""
  echo "  ${BOLD}Backup:${RESET} ~/.ai-setup-backups/"
  echo "  ${BOLD}Rollback:${RESET} ./install.sh --uninstall"
}

# ============================================================================
# Main
# ============================================================================
echo ""
echo "${BOLD}Universal AI Agent Setup v${VERSION}${RESET}"
echo "===================================="
$DRY_RUN && echo "${YELLOW}[DRY RUN MODE]${RESET}"
$UNINSTALL && { backup; uninstall_agents; }

detect_agents
backup
install_agents
summary
