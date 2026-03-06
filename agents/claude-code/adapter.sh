#!/usr/bin/env bash
# Claude Code Adapter — installs universal config into Claude Code format
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
UNIVERSAL_DIR="$REPO_DIR/universal"
AGENT_DIR="$SCRIPT_DIR"
CLAUDE_HOME="$HOME/.claude"

install() {
  echo "  Installing Claude Code configuration..."

  # Create directories
  mkdir -p "$CLAUDE_HOME/commands" "$CLAUDE_HOME/rules"

  # Install commands (universal + agent-specific)
  local count=0
  for f in "$UNIVERSAL_DIR/commands/"*.md; do
    \cp -f "$f" "$CLAUDE_HOME/commands/"
    count=$((count + 1))
  done
  echo "    Commands: $count installed"

  # Install rules (universal)
  count=0
  for f in "$UNIVERSAL_DIR/rules/"*.md; do
    \cp -f "$f" "$CLAUDE_HOME/rules/"
    count=$((count + 1))
  done
  echo "    Rules: $count installed"

  # Install CLAUDE.md
  if [ -f "$AGENT_DIR/CLAUDE.md" ]; then
    \cp -f "$AGENT_DIR/CLAUDE.md" "$CLAUDE_HOME/CLAUDE.md"
    echo "    CLAUDE.md: installed"
  fi

  # Merge settings (don't overwrite — merge plugins, permissions, hooks)
  if [ -f "$CLAUDE_HOME/settings.json" ] && command -v python3 &>/dev/null; then
    python3 -c "
import json
with open('$CLAUDE_HOME/settings.json', 'r') as f:
    existing = json.load(f)
with open('$AGENT_DIR/settings.json', 'r') as f:
    new = json.load(f)
for k in ['enabledPlugins']:
    existing.setdefault(k, {})
    for plugin, enabled in new.get(k, {}).items():
        if plugin not in existing[k]:
            existing[k][plugin] = enabled
for k in ['allow', 'deny']:
    existing.setdefault('permissions', {}).setdefault(k, [])
    for rule in new.get('permissions', {}).get(k, []):
        if rule not in existing['permissions'][k]:
            existing['permissions'][k].append(rule)
for k in ['showTurnDuration', 'model']:
    if k not in existing and k in new:
        existing[k] = new[k]
if 'hooks' not in existing:
    existing['hooks'] = new.get('hooks', {})
with open('$CLAUDE_HOME/settings.json', 'w') as f:
    json.dump(existing, f, indent=2)
    f.write('\n')
"
    echo "    Settings: merged"
  elif [ ! -f "$CLAUDE_HOME/settings.json" ]; then
    \cp -f "$AGENT_DIR/settings.json" "$CLAUDE_HOME/settings.json"
    echo "    Settings: installed (fresh)"
  else
    echo "    Settings: skipped (python3 needed for merge)"
  fi

  # Install plugins
  if command -v claude &>/dev/null; then
    echo "    Installing plugins..."
    local plugins=(
      typescript-lsp pyright-lsp context7 serena code-review code-simplifier
      pr-review-toolkit security-guidance commit-commands feature-dev
      claude-md-management hookify skill-creator github
    )
    local installed=0
    for p in "${plugins[@]}"; do
      if claude plugin install "${p}@claude-plugins-official" --scope user 2>/dev/null; then
        installed=$((installed + 1))
      fi
    done
    echo "    Plugins: $installed installed"
  else
    echo "    Plugins: skipped (claude CLI not found)"
  fi

  # Install LSP binaries
  if command -v npm &>/dev/null; then
    command -v typescript-language-server &>/dev/null || npm install -g typescript-language-server typescript 2>/dev/null
    command -v pyright-langserver &>/dev/null || npm install -g pyright 2>/dev/null
    echo "    LSP binaries: installed"
  fi
}

uninstall() {
  echo "  Uninstalling Claude Code configuration..."
  rm -rf "$CLAUDE_HOME/rules"
  echo "    Rules: removed"
  echo "    Commands: left intact (may contain user commands)"
  echo "    Settings: left intact (contains user preferences)"
}

"$@"
