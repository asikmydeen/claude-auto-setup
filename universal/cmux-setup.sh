#!/usr/bin/env bash
# .cmux/setup — runs when cmux creates a new worktree for an agent
# Customise this for your project (install deps, symlink secrets, etc.)

set -euo pipefail

echo "[cmux-setup] Setting up agent worktree..."

# Symlink env files from main checkout (never copy secrets)
MAIN_DIR="$(git rev-parse --show-toplevel 2>/dev/null || echo '..')"
for envfile in .env .env.local .env.development; do
  if [ -f "$MAIN_DIR/$envfile" ] && [ ! -e "$envfile" ]; then
    ln -sf "$MAIN_DIR/$envfile" "$envfile"
    echo "[cmux-setup] Linked $envfile"
  fi
done

# Install dependencies if lockfile exists
if [ -f "package-lock.json" ] || [ -f "yarn.lock" ] || [ -f "pnpm-lock.yaml" ]; then
  if command -v pnpm &>/dev/null && [ -f "pnpm-lock.yaml" ]; then
    pnpm install --frozen-lockfile 2>/dev/null || pnpm install
  elif command -v npm &>/dev/null; then
    npm ci 2>/dev/null || npm install
  fi
  echo "[cmux-setup] Dependencies installed"
fi

# Copy Claude project config if it exists in main
if [ -d "$MAIN_DIR/.claude" ] && [ ! -d ".claude" ]; then
  cp -r "$MAIN_DIR/.claude" .claude
  echo "[cmux-setup] Copied .claude config"
fi

echo "[cmux-setup] Ready"
