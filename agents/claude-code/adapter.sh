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
# Merge hooks: for each hook event, append new hook entries that don't already exist
existing.setdefault('hooks', {})
for event, entries in new.get('hooks', {}).items():
    existing['hooks'].setdefault(event, [])
    for new_entry in entries:
        # Check if this matcher+hooks combo already exists
        new_cmds = set()
        for h in new_entry.get('hooks', []):
            new_cmds.add(h.get('command', ''))
        already = False
        for ex_entry in existing['hooks'][event]:
            for h in ex_entry.get('hooks', []):
                if h.get('command', '') in new_cmds:
                    already = True
                    break
            if already:
                break
        if not already:
            existing['hooks'][event].append(new_entry)
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

  # Install skills
  local skill_count=0
  for skill_dir in "$UNIVERSAL_DIR/skills/"*/; do
    [ -d "$skill_dir" ] || continue
    local skill_name
    skill_name="$(basename "$skill_dir")"
    mkdir -p "$CLAUDE_HOME/skills/$skill_name"
    # Copy all files preserving directory structure
    (cd "$skill_dir" && find . -type f | while read -r f; do
      mkdir -p "$CLAUDE_HOME/skills/$skill_name/$(dirname "$f")"
      \cp -f "$f" "$CLAUDE_HOME/skills/$skill_name/$(dirname "$f")/"
    done)
    skill_count=$((skill_count + 1))
  done
  echo "    Skills: $skill_count installed ($(ls -1 "$UNIVERSAL_DIR/skills/" 2>/dev/null | tr '\n' ', ' | sed 's/, $//'))"

  # Install native agents
  if [ -d "$AGENT_DIR/agents" ]; then
    mkdir -p "$CLAUDE_HOME/agents"
    local agent_count=0
    for f in "$AGENT_DIR/agents/"*.md; do
      [ -f "$f" ] || continue
      \cp -f "$f" "$CLAUDE_HOME/agents/"
      agent_count=$((agent_count + 1))
    done
    echo "    Native agents: $agent_count installed"
  fi

  # Install enforcement scripts
  if [ -d "$AGENT_DIR/scripts" ]; then
    mkdir -p "$CLAUDE_HOME/scripts"
    local script_count=0
    for f in "$AGENT_DIR/scripts/"*.sh; do
      [ -f "$f" ] || continue
      \cp -f "$f" "$CLAUDE_HOME/scripts/"
      chmod +x "$CLAUDE_HOME/scripts/$(basename "$f")"
      script_count=$((script_count + 1))
    done
    echo "    Enforcement scripts: $script_count installed"
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

  # Install claude-mem persistent memory plugin
  if command -v claude &>/dev/null; then
    local mem_plugin_dir="$HOME/.claude/plugins/marketplaces/thedotmack/plugin"
    if [ -d "$mem_plugin_dir" ]; then
      echo "    claude-mem: already installed"
    else
      echo "    Installing claude-mem memory system..."
      if claude plugin marketplace add thedotmack/claude-mem 2>/dev/null; then
        echo "    claude-mem: installed via marketplace"
        # Run smart-install to provision Bun, uv, dependencies
        if [ -f "$mem_plugin_dir/scripts/smart-install.js" ]; then
          node "$mem_plugin_dir/scripts/smart-install.js" 2>/dev/null || true
        fi
      else
        echo "    claude-mem: marketplace install failed (install manually later)"
      fi
    fi

    # Register claude-mem MCP server for mem-search tools
    local mcp_script="$mem_plugin_dir/scripts/mcp-server.cjs"
    if [ -f "$mcp_script" ]; then
      claude mcp remove -s user claude-mem-search 2>/dev/null || true
      claude mcp add -s user claude-mem-search -- node "$mcp_script" 2>/dev/null \
        && echo "    claude-mem MCP: registered (search, timeline, get_observations)" \
        || echo "    claude-mem MCP: registration failed"
    fi
  fi

  # Register OpenViking MCP server (if installed)
  if command -v claude &>/dev/null && command -v ov &>/dev/null; then
    # Prefer HTTP mode for multi-agent safety (avoids stdio contention)
    local ov_url="http://localhost:1933"
    if curl -s --connect-timeout 1 "$ov_url/status" &>/dev/null; then
      claude mcp remove -s user openviking 2>/dev/null || true
      claude mcp add -s user --transport http openviking "$ov_url" 2>/dev/null \
        && echo "    OpenViking MCP: registered (HTTP mode)" \
        || echo "    OpenViking MCP: registration failed"
    else
      echo "    OpenViking: detected but server not running (start with: openviking-server)"
      echo "    Tip: openviking-server --config ~/.openviking/config.yaml"
    fi
  elif command -v ov &>/dev/null; then
    echo "    OpenViking: installed (register MCP after claude CLI is available)"
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
