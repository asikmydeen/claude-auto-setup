#!/usr/bin/env bash
# ============================================================================
# Sidekick — Desktop App Installer
#
# Installs the native macOS Electrobun desktop app.
#
# Prerequisites:
#   - bun (https://bun.sh)
#   - node 20+ (for Vite build)
#
# Usage:
#   ./app/install.sh              # Build & install to /Applications
#   ./app/install.sh --dev        # Run in dev mode (no install)
#   ./app/install.sh --build      # Build only (no install)
#   ./app/install.sh --uninstall  # Remove from /Applications
# ============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
APP_DIR="$SCRIPT_DIR"
APP_NAME="Sidekick"
BUNDLE_ID="dev.sidekick.app"
BUILD_DIR="$APP_DIR/build"
INSTALL_DIR="/Applications"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

log()   { echo -e "${BLUE}[app]${NC} $*"; }
ok()    { echo -e "${GREEN}[app]${NC} $*"; }
warn()  { echo -e "${YELLOW}[app]${NC} $*"; }
err()   { echo -e "${RED}[app]${NC} $*" >&2; }

# ---------------------------------------------------------------------------
# Dependency checks
# ---------------------------------------------------------------------------

check_deps() {
  local missing=0

  if ! command -v bun >/dev/null 2>&1; then
    err "bun is required but not installed."
    err "  Install: curl -fsSL https://bun.sh/install | bash"
    missing=1
  else
    log "bun $(bun --version)"
  fi

  if ! command -v node >/dev/null 2>&1; then
    err "node is required but not installed."
    err "  Install: brew install node  OR  mise install node"
    missing=1
  else
    local node_major
    node_major=$(node -v | sed 's/v\([0-9]*\).*/\1/')
    if [ "$node_major" -lt 20 ]; then
      err "node $node_major found, but node 20+ is required for Vite."
      err "  Upgrade: brew upgrade node  OR  mise install node@24"
      missing=1
    else
      log "node $(node -v)"
    fi
  fi

  if [ "$missing" -eq 1 ]; then
    err ""
    err "Missing dependencies. Install them and try again."
    exit 1
  fi
}

# ---------------------------------------------------------------------------
# Install dependencies
# ---------------------------------------------------------------------------

install_deps() {
  log "Installing dependencies..."
  cd "$APP_DIR"

  if [ -f "bun.lockb" ] || [ -f "bun.lock" ]; then
    bun install --frozen-lockfile 2>/dev/null || bun install
  else
    bun install
  fi

  ok "Dependencies installed"
}

# ---------------------------------------------------------------------------
# Build
# ---------------------------------------------------------------------------

build_app() {
  log "Building React UI..."
  cd "$APP_DIR"
  npx vite build

  log "Building Electrobun app..."
  bunx electrobun build

  ok "Build complete"

  # Find the .app bundle
  local app_path
  app_path=$(find "$BUILD_DIR" -name "*.app" -maxdepth 2 -type d 2>/dev/null | head -1)
  if [ -z "$app_path" ]; then
    err "Could not find built .app bundle in $BUILD_DIR"
    exit 1
  fi

  echo "$app_path"
}

# ---------------------------------------------------------------------------
# Install to /Applications
# ---------------------------------------------------------------------------

install_app() {
  local app_path="$1"
  local dest="$INSTALL_DIR/$APP_NAME.app"

  log "Installing to $dest..."

  # Remove old version if exists
  if [ -d "$dest" ]; then
    warn "Removing existing installation..."
    rm -rf "$dest"
  fi

  # Copy
  cp -R "$app_path" "$dest"

  ok "Installed to $dest"
  ok ""
  ok "  ${BOLD}$APP_NAME${NC} is ready!"
  ok ""
  ok "  Open: ${CYAN}open '$dest'${NC}"
  ok "  Or find it in Launchpad / Applications"
  ok ""
}

# ---------------------------------------------------------------------------
# Uninstall
# ---------------------------------------------------------------------------

uninstall_app() {
  local dest="$INSTALL_DIR/$APP_NAME.app"

  if [ -d "$dest" ]; then
    log "Removing $dest..."
    rm -rf "$dest"
    ok "Uninstalled $APP_NAME from Applications"
  else
    warn "$APP_NAME not found in Applications"
  fi

  # Clean build artifacts
  if [ -d "$BUILD_DIR" ]; then
    log "Cleaning build directory..."
    rm -rf "$BUILD_DIR"
    ok "Build directory cleaned"
  fi
}

# ---------------------------------------------------------------------------
# Dev mode
# ---------------------------------------------------------------------------

dev_mode() {
  log "Starting in dev mode..."
  cd "$APP_DIR"

  # Install deps if needed
  if [ ! -d "node_modules" ]; then
    install_deps
  fi

  bunx electrobun dev
}

# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

main() {
  echo -e "${BOLD}${CYAN}"
  echo "  ╔═══════════════════════════════╗"
  echo "  ║     Sidekick — Installer     ║"
  echo "  ╚═══════════════════════════════╝"
  echo -e "${NC}"

  local mode="install"

  for arg in "$@"; do
    case "$arg" in
      --dev)       mode="dev" ;;
      --build)     mode="build" ;;
      --uninstall) mode="uninstall" ;;
      --help|-h)
        echo "Usage: $0 [--dev|--build|--uninstall]"
        echo ""
        echo "  (default)     Build and install to /Applications"
        echo "  --dev         Run in development mode"
        echo "  --build       Build only (no install)"
        echo "  --uninstall   Remove from /Applications"
        exit 0
        ;;
      *)
        err "Unknown option: $arg"
        exit 1
        ;;
    esac
  done

  case "$mode" in
    dev)
      check_deps
      dev_mode
      ;;
    build)
      check_deps
      install_deps
      build_app
      ;;
    install)
      check_deps
      install_deps
      local app_path
      app_path=$(build_app)
      install_app "$app_path"
      ;;
    uninstall)
      uninstall_app
      ;;
  esac
}

main "$@"
