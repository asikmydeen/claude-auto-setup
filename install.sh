#!/usr/bin/env bash
set -euo pipefail

# ============================================================================
# Claude Code Smart Setup Installer
# Platform-agnostic installer for optimized Claude Code configuration
#
# What it installs:
#   - 49 commands (7 roles + 37 subagents + 5 orchestration workflows)
#   - 6 global rules (code quality, AWS, testing, security, git, orchestration)
#   - 14 plugins (LSP, context7, serena, code-review, security, git workflow)
#   - Optimized settings (permissions, hooks, deny rules)
#   - Global CLAUDE.md with auto-orchestration protocol
#
# Usage:
#   ./install.sh              # Interactive install
#   ./install.sh --force      # Overwrite existing config
#   ./install.sh --dry-run    # Show what would be done
#   ./install.sh --uninstall  # Remove installed config
# ============================================================================

VERSION="1.0.0"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_DIR="$SCRIPT_DIR/config"
CLAUDE_DIR="$HOME/.claude"
DRY_RUN=false
FORCE=false
UNINSTALL=false
BACKUP_DIR=""

# --- Colors (with fallback for non-color terminals) ---
if [ -t 1 ] && command -v tput &>/dev/null && [ "$(tput colors 2>/dev/null || echo 0)" -ge 8 ]; then
  RED=$(tput setaf 1); GREEN=$(tput setaf 2); YELLOW=$(tput setaf 3)
  BLUE=$(tput setaf 4); CYAN=$(tput setaf 6); BOLD=$(tput bold); RESET=$(tput sgr0)
else
  RED=""; GREEN=""; YELLOW=""; BLUE=""; CYAN=""; BOLD=""; RESET=""
fi

# --- Helpers ---
info()  { echo "${BLUE}[INFO]${RESET}  $*"; }
ok()    { echo "${GREEN}[OK]${RESET}    $*"; }
warn()  { echo "${YELLOW}[WARN]${RESET}  $*"; }
error() { echo "${RED}[ERROR]${RESET} $*" >&2; }
step()  { echo ""; echo "${BOLD}${CYAN}==> $*${RESET}"; }

# --- Parse arguments ---
for arg in "$@"; do
  case "$arg" in
    --force)     FORCE=true ;;
    --dry-run)   DRY_RUN=true ;;
    --uninstall) UNINSTALL=true ;;
    --help|-h)
      echo "Usage: $0 [--force] [--dry-run] [--uninstall] [--help]"
      echo ""
      echo "Options:"
      echo "  --force      Overwrite existing config (backs up first)"
      echo "  --dry-run    Show what would be done without making changes"
      echo "  --uninstall  Remove all installed config (restores backup if exists)"
      echo "  --help       Show this help"
      exit 0
      ;;
    *) error "Unknown argument: $arg"; exit 1 ;;
  esac
done

# --- Preflight checks ---
preflight() {
  step "Preflight checks"

  # Check OS
  OS="unknown"
  case "$(uname -s)" in
    Linux*)  OS="linux" ;;
    Darwin*) OS="macos" ;;
    MINGW*|MSYS*|CYGWIN*) OS="windows" ;;
  esac
  info "Platform: $OS ($(uname -m))"

  # Check if config directory exists
  if [ ! -d "$CONFIG_DIR" ]; then
    error "Config directory not found: $CONFIG_DIR"
    error "Make sure you're running this from the claude-code-setup directory"
    exit 1
  fi

  # Check for Claude Code CLI
  if command -v claude &>/dev/null; then
    CLAUDE_VERSION=$(claude --version 2>/dev/null || echo "unknown")
    ok "Claude Code CLI found: $CLAUDE_VERSION"
  else
    warn "Claude Code CLI not found"
    echo ""
    echo "  Install Claude Code first:"
    echo "    npm install -g @anthropic-ai/claude-code"
    echo "    # or"
    echo "    brew install claude-code  (macOS)"
    echo ""
    echo "  See: https://code.claude.com/docs/en/overview"
    echo ""
    read -rp "  Continue without CLI? (plugins won't install) [y/N] " answer
    if [[ ! "$answer" =~ ^[Yy] ]]; then
      exit 1
    fi
  fi

  # Check for Node.js (needed for LSP)
  if command -v node &>/dev/null; then
    ok "Node.js found: $(node --version)"
  else
    warn "Node.js not found — LSP plugins (typescript-lsp, pyright-lsp) need it"
  fi

  # Check for npm
  if command -v npm &>/dev/null; then
    ok "npm found: $(npm --version)"
  else
    warn "npm not found — LSP binaries won't install"
  fi
}

# --- Backup existing config ---
backup() {
  if [ -d "$CLAUDE_DIR" ]; then
    BACKUP_DIR="$CLAUDE_DIR/backups/pre-install-$(date +%Y%m%d-%H%M%S)"
    step "Backing up existing config to $BACKUP_DIR"

    if $DRY_RUN; then
      info "[DRY RUN] Would backup to $BACKUP_DIR"
      return
    fi

    mkdir -p "$BACKUP_DIR"

    # Backup existing files
    [ -f "$CLAUDE_DIR/settings.json" ] && cp "$CLAUDE_DIR/settings.json" "$BACKUP_DIR/" && ok "Backed up settings.json"
    [ -f "$CLAUDE_DIR/CLAUDE.md" ] && cp "$CLAUDE_DIR/CLAUDE.md" "$BACKUP_DIR/" && ok "Backed up CLAUDE.md"
    [ -d "$CLAUDE_DIR/commands" ] && cp -r "$CLAUDE_DIR/commands" "$BACKUP_DIR/" && ok "Backed up commands/"
    [ -d "$CLAUDE_DIR/rules" ] && cp -r "$CLAUDE_DIR/rules" "$BACKUP_DIR/" && ok "Backed up rules/"

    ok "Backup complete: $BACKUP_DIR"
  fi
}

# --- Uninstall ---
uninstall() {
  step "Uninstalling Claude Code Smart Setup"

  # Find most recent backup
  local latest_backup
  latest_backup=$(ls -td "$CLAUDE_DIR/backups/pre-install-"* 2>/dev/null | head -1)

  if [ -n "$latest_backup" ]; then
    info "Found backup: $latest_backup"
    read -rp "  Restore from this backup? [Y/n] " answer
    if [[ ! "$answer" =~ ^[Nn] ]]; then
      [ -f "$latest_backup/settings.json" ] && cp "$latest_backup/settings.json" "$CLAUDE_DIR/" && ok "Restored settings.json"
      [ -f "$latest_backup/CLAUDE.md" ] && cp "$latest_backup/CLAUDE.md" "$CLAUDE_DIR/" && ok "Restored CLAUDE.md"
      [ -d "$latest_backup/commands" ] && rm -rf "$CLAUDE_DIR/commands" && cp -r "$latest_backup/commands" "$CLAUDE_DIR/" && ok "Restored commands/"
      [ -d "$latest_backup/rules" ] && rm -rf "$CLAUDE_DIR/rules" && cp -r "$latest_backup/rules" "$CLAUDE_DIR/" && ok "Restored rules/"
      ok "Restored from backup"
    fi
  else
    warn "No backup found. Removing installed files..."
    # Remove only what we installed (safe removal)
    rm -rf "$CLAUDE_DIR/rules"
    ok "Removed rules/"
    # Don't remove commands/ entirely — user might have their own
    warn "Commands directory left intact (may contain your custom commands)"
  fi

  echo ""
  ok "Uninstall complete. Restart Claude Code to apply."
  exit 0
}

# --- Install commands ---
install_commands() {
  step "Installing commands (49 files)"

  if $DRY_RUN; then
    info "[DRY RUN] Would copy $(ls "$CONFIG_DIR/commands/"*.md | wc -l) commands to $CLAUDE_DIR/commands/"
    return
  fi

  mkdir -p "$CLAUDE_DIR/commands"

  local installed=0
  local skipped=0

  for file in "$CONFIG_DIR/commands/"*.md; do
    local name
    name=$(basename "$file")
    local target="$CLAUDE_DIR/commands/$name"

    if [ -f "$target" ] && ! $FORCE; then
      skipped=$((skipped + 1))
    else
      cp "$file" "$target"
      installed=$((installed + 1))
    fi
  done

  ok "Installed: $installed commands"
  [ $skipped -gt 0 ] && warn "Skipped: $skipped (already exist — use --force to overwrite)"
}

# --- Install rules ---
install_rules() {
  step "Installing rules (6 files)"

  if $DRY_RUN; then
    info "[DRY RUN] Would copy $(ls "$CONFIG_DIR/rules/"*.md | wc -l) rules to $CLAUDE_DIR/rules/"
    return
  fi

  mkdir -p "$CLAUDE_DIR/rules"

  local installed=0
  for file in "$CONFIG_DIR/rules/"*.md; do
    local name
    name=$(basename "$file")
    cp "$file" "$CLAUDE_DIR/rules/$name"
    installed=$((installed + 1))
  done

  ok "Installed: $installed rules"
}

# --- Install CLAUDE.md ---
install_claude_md() {
  step "Installing global CLAUDE.md"

  local target="$CLAUDE_DIR/CLAUDE.md"

  if $DRY_RUN; then
    info "[DRY RUN] Would install CLAUDE.md to $target"
    return
  fi

  if [ -f "$target" ] && ! $FORCE; then
    warn "CLAUDE.md already exists — skipping (use --force to overwrite)"
  else
    cp "$CONFIG_DIR/CLAUDE.md" "$target"
    ok "Installed CLAUDE.md ($(wc -l < "$target") lines)"
  fi
}

# --- Install settings ---
install_settings() {
  step "Installing settings"

  local target="$CLAUDE_DIR/settings.json"

  if $DRY_RUN; then
    info "[DRY RUN] Would install settings.json to $target"
    return
  fi

  if [ -f "$target" ] && ! $FORCE; then
    warn "settings.json already exists — merging plugins and permissions only"

    # Use python3 or node to merge (platform-agnostic)
    if command -v python3 &>/dev/null; then
      python3 << 'PYEOF'
import json, sys

existing_path = sys.argv[1] if len(sys.argv) > 1 else ""
new_path = sys.argv[2] if len(sys.argv) > 2 else ""

with open("EXISTING_PATH", "r") as f:
    existing = json.load(f)
with open("NEW_PATH", "r") as f:
    new = json.load(f)

# Merge plugins (add missing ones)
existing.setdefault("enabledPlugins", {})
for plugin, enabled in new.get("enabledPlugins", {}).items():
    if plugin not in existing["enabledPlugins"]:
        existing["enabledPlugins"][plugin] = enabled

# Merge deny rules (add missing ones)
existing.setdefault("permissions", {}).setdefault("deny", [])
for rule in new.get("permissions", {}).get("deny", []):
    if rule not in existing["permissions"]["deny"]:
        existing["permissions"]["deny"].append(rule)

# Add showTurnDuration if not set
if "showTurnDuration" not in existing:
    existing["showTurnDuration"] = True

# Add hooks if not set
if "hooks" not in existing:
    existing["hooks"] = new.get("hooks", {})

with open("EXISTING_PATH", "w") as f:
    json.dump(existing, f, indent=2)
    f.write("\n")
PYEOF
      # Fix the placeholder paths
      python3 -c "
import json
existing_path = '$target'
new_path = '$CONFIG_DIR/settings.json'
with open(existing_path, 'r') as f:
    existing = json.load(f)
with open(new_path, 'r') as f:
    new = json.load(f)
existing.setdefault('enabledPlugins', {})
for plugin, enabled in new.get('enabledPlugins', {}).items():
    if plugin not in existing['enabledPlugins']:
        existing['enabledPlugins'][plugin] = enabled
existing.setdefault('permissions', {}).setdefault('deny', [])
for rule in new.get('permissions', {}).get('deny', []):
    if rule not in existing['permissions']['deny']:
        existing['permissions']['deny'].append(rule)
existing.setdefault('permissions', {}).setdefault('allow', [])
for rule in new.get('permissions', {}).get('allow', []):
    if rule not in existing['permissions']['allow']:
        existing['permissions']['allow'].append(rule)
if 'showTurnDuration' not in existing:
    existing['showTurnDuration'] = True
if 'hooks' not in existing:
    existing['hooks'] = new.get('hooks', {})
with open(existing_path, 'w') as f:
    json.dump(existing, f, indent=2)
    f.write('\n')
"
      ok "Merged plugins, permissions, and hooks into existing settings"
    else
      warn "python3 not found — cannot merge. Copy manually or use --force"
    fi
  else
    cp "$CONFIG_DIR/settings.json" "$target"
    ok "Installed settings.json"
  fi
}

# --- Install plugins via Claude CLI ---
install_plugins() {
  step "Installing plugins (14 plugins)"

  if ! command -v claude &>/dev/null; then
    warn "Claude CLI not found — skipping plugin installation"
    info "Install manually later: claude plugin install <name>@claude-plugins-official --scope user"
    return
  fi

  if $DRY_RUN; then
    info "[DRY RUN] Would install 14 plugins via claude CLI"
    return
  fi

  local plugins=(
    "typescript-lsp"
    "pyright-lsp"
    "context7"
    "serena"
    "code-review"
    "code-simplifier"
    "pr-review-toolkit"
    "security-guidance"
    "commit-commands"
    "feature-dev"
    "claude-md-management"
    "hookify"
    "skill-creator"
    "github"
  )

  local installed=0
  local failed=0

  for plugin in "${plugins[@]}"; do
    if claude plugin install "${plugin}@claude-plugins-official" --scope user 2>/dev/null; then
      installed=$((installed + 1))
    else
      failed=$((failed + 1))
      warn "Failed to install: $plugin"
    fi
  done

  ok "Installed: $installed plugins"
  [ $failed -gt 0 ] && warn "Failed: $failed (install manually with: claude plugin install <name>@claude-plugins-official --scope user)"
}

# --- Install LSP binaries ---
install_lsp() {
  step "Installing LSP language servers"

  if ! command -v npm &>/dev/null; then
    warn "npm not found — skipping LSP binary installation"
    info "Install manually: npm install -g typescript-language-server typescript pyright"
    return
  fi

  if $DRY_RUN; then
    info "[DRY RUN] Would install typescript-language-server, typescript, pyright"
    return
  fi

  if command -v typescript-language-server &>/dev/null; then
    ok "typescript-language-server already installed"
  else
    npm install -g typescript-language-server typescript 2>/dev/null && ok "Installed typescript-language-server" || warn "Failed to install typescript-language-server"
  fi

  if command -v pyright-langserver &>/dev/null; then
    ok "pyright already installed"
  else
    npm install -g pyright 2>/dev/null && ok "Installed pyright" || warn "Failed to install pyright"
  fi
}

# --- Summary ---
summary() {
  step "Installation Complete!"
  echo ""
  echo "  ${BOLD}What was installed:${RESET}"
  echo "    Commands:  $(ls "$CLAUDE_DIR/commands/"*.md 2>/dev/null | wc -l) files"
  echo "    Rules:     $(ls "$CLAUDE_DIR/rules/"*.md 2>/dev/null | wc -l) files"
  echo "    CLAUDE.md: $(wc -l < "$CLAUDE_DIR/CLAUDE.md" 2>/dev/null || echo 0) lines"
  echo "    Plugins:   14 (via settings.json)"
  echo ""
  echo "  ${BOLD}Key commands:${RESET}"
  echo "    /init              Scan project + auto-generate codebase intel"
  echo "    /build <feature>   Multi-agent end-to-end implementation"
  echo "    /review            Multi-agent code review"
  echo "    /debug <problem>   Multi-agent debugging"
  echo "    /deep-research     Deep codebase analysis (6 parallel agents)"
  echo ""
  echo "  ${BOLD}Next steps:${RESET}"
  echo "    1. Restart Claude Code to load everything"
  echo "    2. cd into a project directory"
  echo "    3. Run /init to initialize the project"
  echo ""
  if [ -n "$BACKUP_DIR" ]; then
    echo "  ${BOLD}Backup:${RESET} $BACKUP_DIR"
    echo "  ${BOLD}Rollback:${RESET} ./install.sh --uninstall"
    echo ""
  fi
}

# ============================================================================
# Main
# ============================================================================

echo ""
echo "${BOLD}Claude Code Smart Setup Installer v${VERSION}${RESET}"
echo "================================================"

if $DRY_RUN; then
  echo "${YELLOW}[DRY RUN MODE — no changes will be made]${RESET}"
fi

if $UNINSTALL; then
  uninstall
fi

preflight
backup
install_commands
install_rules
install_claude_md
install_settings
install_plugins
install_lsp
summary
