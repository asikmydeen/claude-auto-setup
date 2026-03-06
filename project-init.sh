#!/usr/bin/env bash
set -euo pipefail

# ============================================================================
# Project-Level AI Agent Initializer
#
# Run this in any project directory to set up shared AI configuration
# that works across ALL installed AI coding agents.
#
# Creates:
#   .ai/                    ← Shared AI config (agent-agnostic)
#     project-intel.md      ← Codebase intelligence (after deep-research)
#     rules/                ← Shared rules
#     .intel-changelog      ← Change tracking
#   .claude/CLAUDE.md       ← Claude-specific (references .ai/)
#   GEMINI.md               ← Gemini-specific (references .ai/)
#   AGENTS.md               ← Codex-specific (references .ai/)
#   .kiro/steering/         ← Kiro-specific (references .ai/)
#   .cursor/rules/          ← Cursor-specific (references .ai/)
#
# Usage:
#   curl -sL <repo>/project-init.sh | bash
#   # or
#   /path/to/claude-auto-setup/project-init.sh
# ============================================================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(pwd)"
PROJECT_NAME="$(basename "$PROJECT_DIR")"

# Colors
if [ -t 1 ] && command -v tput &>/dev/null && [ "$(tput colors 2>/dev/null || echo 0)" -ge 8 ]; then
  GREEN=$(tput setaf 2); CYAN=$(tput setaf 6); BOLD=$(tput bold); RESET=$(tput sgr0)
else
  GREEN=""; CYAN=""; BOLD=""; RESET=""
fi

ok()   { echo "${GREEN}[OK]${RESET}    $*"; }
step() { echo ""; echo "${BOLD}${CYAN}==> $*${RESET}"; }

step "Initializing AI configuration for: $PROJECT_NAME"

# --- Create shared .ai/ directory ---
step "Creating shared .ai/ directory"
mkdir -p "$PROJECT_DIR/.ai/rules"

# Copy universal rules if available
if [ -d "$SCRIPT_DIR/universal/rules" ]; then
  \cp -f "$SCRIPT_DIR/universal/rules/"*.md "$PROJECT_DIR/.ai/rules/" 2>/dev/null || true
  ok "Rules: $(ls "$PROJECT_DIR/.ai/rules/"*.md 2>/dev/null | wc -l) files"
fi

# Copy intel template
if [ -f "$SCRIPT_DIR/universal/intel-template.md" ]; then
  if [ ! -f "$PROJECT_DIR/.ai/project-intel.md" ]; then
    sed "s/{PROJECT_NAME}/$PROJECT_NAME/g; s/{DATE}/$(date +%Y-%m-%d)/g" \
      "$SCRIPT_DIR/universal/intel-template.md" > "$PROJECT_DIR/.ai/project-intel.md"
    ok "Intel template: created (run /init or /deep-research to populate)"
  else
    ok "Intel: already exists ($(wc -l < "$PROJECT_DIR/.ai/project-intel.md") lines)"
  fi
fi

# --- Generate agent-specific files ---

# Claude Code
if command -v claude &>/dev/null; then
  step "Configuring Claude Code"
  mkdir -p "$PROJECT_DIR/.claude/rules"
  # Symlink shared rules
  for f in "$PROJECT_DIR/.ai/rules/"*.md; do
    local_name=$(basename "$f")
    ln -sf "../../.ai/rules/$local_name" "$PROJECT_DIR/.claude/rules/$local_name" 2>/dev/null || \
    \cp -f "$f" "$PROJECT_DIR/.claude/rules/$local_name"
  done
  # Create CLAUDE.md referencing .ai/
  if [ ! -f "$PROJECT_DIR/.claude/CLAUDE.md" ]; then
    cat > "$PROJECT_DIR/.claude/CLAUDE.md" << EOF
# Project: $PROJECT_NAME

See @.ai/project-intel.md for complete codebase map.

## Commands
- \`/init\` — scan project + auto-generate intel
- \`/build <feature>\` — multi-agent implementation
- \`/review\` — multi-agent code review
- \`/debug <problem>\` — multi-agent debugging
EOF
    ok "CLAUDE.md: created"
  else
    ok "CLAUDE.md: already exists"
  fi
fi

# Gemini CLI
if command -v gemini &>/dev/null; then
  step "Configuring Gemini CLI"
  if [ ! -f "$PROJECT_DIR/GEMINI.md" ]; then
    cat > "$PROJECT_DIR/GEMINI.md" << EOF
# Project: $PROJECT_NAME

Read .ai/project-intel.md first — it contains a cached codebase map.

## Rules
Follow the rules in .ai/rules/ for code quality, security, testing, and git workflow.

## Workflow
1. Read .ai/project-intel.md for context
2. Explore only areas not covered by the intel
3. Plan changes and confirm before implementing
4. Run build + tests + lint to verify
EOF
    ok "GEMINI.md: created"
  else
    ok "GEMINI.md: already exists"
  fi
fi

# Kiro CLI
if command -v kiro &>/dev/null; then
  step "Configuring Kiro CLI"
  mkdir -p "$PROJECT_DIR/.kiro/steering"
  for f in "$PROJECT_DIR/.ai/rules/"*.md; do
    local_name=$(basename "$f")
    ln -sf "../../.ai/rules/$local_name" "$PROJECT_DIR/.kiro/steering/$local_name" 2>/dev/null || \
    \cp -f "$f" "$PROJECT_DIR/.kiro/steering/$local_name"
  done
  ok "Kiro steering: $(ls "$PROJECT_DIR/.kiro/steering/"*.md 2>/dev/null | wc -l) files linked"
fi

# Codex CLI
if command -v codex &>/dev/null; then
  step "Configuring Codex CLI"
  if [ ! -f "$PROJECT_DIR/AGENTS.md" ]; then
    cat > "$PROJECT_DIR/AGENTS.md" << EOF
# Project: $PROJECT_NAME

Read .ai/project-intel.md first — it contains a cached codebase map.

## Rules
Follow the rules in .ai/rules/ for code quality, security, testing, and git workflow.

## Workflow
1. Read .ai/project-intel.md for context
2. Explore only areas not covered by the intel
3. Plan changes and confirm before implementing
4. Run build + tests + lint to verify
EOF
    ok "AGENTS.md: created"
  else
    ok "AGENTS.md: already exists"
  fi
fi

# Cursor
if command -v cursor &>/dev/null || [ -d "$HOME/.cursor" ]; then
  step "Configuring Cursor"
  mkdir -p "$PROJECT_DIR/.cursor/rules"
  for f in "$PROJECT_DIR/.ai/rules/"*.md; do
    local_name=$(basename "$f" .md)
    \cp -f "$f" "$PROJECT_DIR/.cursor/rules/${local_name}.mdc"
  done
  ok "Cursor rules: $(ls "$PROJECT_DIR/.cursor/rules/"*.mdc 2>/dev/null | wc -l) files"
fi

# --- Update .gitignore ---
step "Updating .gitignore"
if [ -f "$PROJECT_DIR/.gitignore" ]; then
  for pattern in ".ai/project-intel.md" ".ai/.intel-changelog" ".claude/settings.local.json"; do
    if ! grep -qF "$pattern" "$PROJECT_DIR/.gitignore"; then
      echo "$pattern" >> "$PROJECT_DIR/.gitignore"
    fi
  done
  ok ".gitignore: updated"
else
  cat > "$PROJECT_DIR/.gitignore" << 'EOF'
# AI agent local files (not shared)
.ai/project-intel.md
.ai/.intel-changelog
.claude/settings.local.json
EOF
  ok ".gitignore: created"
fi

# --- Summary ---
step "Project AI Configuration Complete"
echo ""
echo "  ${BOLD}Shared config:${RESET}"
echo "    .ai/rules/          — shared rules (all agents)"
echo "    .ai/project-intel.md — codebase intelligence (after /init)"
echo ""
echo "  ${BOLD}Agent-specific:${RESET}"
command -v claude &>/dev/null && echo "    .claude/CLAUDE.md    — Claude Code"
command -v gemini &>/dev/null && echo "    GEMINI.md            — Gemini CLI"
command -v kiro &>/dev/null   && echo "    .kiro/steering/      — Kiro CLI"
command -v codex &>/dev/null  && echo "    AGENTS.md            — Codex CLI"
(command -v cursor &>/dev/null || [ -d "$HOME/.cursor" ]) && echo "    .cursor/rules/       — Cursor"
echo ""
echo "  ${BOLD}Next:${RESET} Run /init in Claude Code (or equivalent) to generate codebase intelligence."
