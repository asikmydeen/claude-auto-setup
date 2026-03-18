#!/usr/bin/env bash
# Fleet CLI — global wrapper
# Installed to ~/.local/bin/fleet by install.sh
# Calls bun fleet/fleet.ts from the claude-auto-setup repo

set -euo pipefail

# Find the fleet.ts location (set during install)
FLEET_DIR="${FLEET_HOME:-$HOME/projects/claude-auto-setup/fleet}"

if [ ! -f "$FLEET_DIR/fleet.ts" ]; then
  # Try common locations
  for candidate in \
    "$HOME/projects/claude-auto-setup/fleet" \
    "$HOME/claude-auto-setup/fleet" \
    "$HOME/claude-code-setup/fleet" \
    "$(dirname "$(readlink -f "$0" 2>/dev/null || echo "$0")")/../fleet"; do
    if [ -f "$candidate/fleet.ts" ]; then
      FLEET_DIR="$candidate"
      break
    fi
  done
fi

if [ ! -f "$FLEET_DIR/fleet.ts" ]; then
  echo "Error: fleet.ts not found. Set FLEET_HOME to your claude-auto-setup/fleet directory." >&2
  exit 1
fi

# Ensure bun is available
if ! command -v bun &>/dev/null; then
  # Try common bun locations
  for bun_path in "$HOME/.bun/bin/bun" "$HOME/.local/bin/bun" "/usr/local/bin/bun"; do
    if [ -x "$bun_path" ]; then
      exec "$bun_path" "$FLEET_DIR/fleet.ts" "$@"
    fi
  done
  echo "Error: bun not found. Install: curl -fsSL https://bun.sh/install | bash" >&2
  exit 1
fi

exec bun "$FLEET_DIR/fleet.ts" "$@"
