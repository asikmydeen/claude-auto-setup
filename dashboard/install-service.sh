#!/usr/bin/env bash
# Install claude-dashboard as a persistent background service
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DASHBOARD_DIR="$HOME/.claude-dashboard"
PORT="${DASHBOARD_PORT:-3200}"

GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
NC='\033[0m'

ok()   { echo -e "  ${GREEN}[OK]${NC} $1"; }
warn() { echo -e "  ${YELLOW}[!]${NC} $1"; }
err()  { echo -e "  ${RED}[ERR]${NC} $1"; }

echo ""
echo "Claude Agent Dashboard — Service Installer"
echo "============================================"
echo ""

# 1. Install npm dependencies
echo "Installing dependencies..."
cd "$SCRIPT_DIR"
if command -v npm &>/dev/null; then
  npm install --production 2>/dev/null
  ok "Dependencies installed"
else
  err "npm not found. Install Node.js 18+ first."
  exit 1
fi

# 2. Create state directory
mkdir -p "$DASHBOARD_DIR/sessions"
ok "State directory: $DASHBOARD_DIR"

# 3. Detect platform and install service
OS="$(uname -s)"

if [ "$OS" = "Linux" ]; then
  # --- systemd ---
  if command -v systemctl &>/dev/null; then
    SERVICE_FILE="$HOME/.config/systemd/user/claude-dashboard.service"
    mkdir -p "$(dirname "$SERVICE_FILE")"

    NODE_PATH="$(command -v node)"

    cat > "$SERVICE_FILE" << EOF
[Unit]
Description=Claude Agent Dashboard
After=network.target

[Service]
Type=simple
ExecStart=$NODE_PATH $SCRIPT_DIR/server.js
Environment=DASHBOARD_PORT=$PORT
Environment=DASHBOARD_DIR=$DASHBOARD_DIR
Environment=HOME=$HOME
Restart=on-failure
RestartSec=5

[Install]
WantedBy=default.target
EOF

    systemctl --user daemon-reload
    systemctl --user enable claude-dashboard.service
    systemctl --user start claude-dashboard.service
    ok "systemd user service installed and started"
    ok "Dashboard: http://localhost:$PORT"
    echo ""
    echo "  Manage with:"
    echo "    systemctl --user status claude-dashboard"
    echo "    systemctl --user restart claude-dashboard"
    echo "    systemctl --user stop claude-dashboard"
    echo "    journalctl --user -u claude-dashboard -f"
  else
    warn "systemd not available. Starting with nohup..."
    nohup "$NODE_PATH" "$SCRIPT_DIR/server.js" > "$DASHBOARD_DIR/server.log" 2>&1 &
    echo "$!" > "$DASHBOARD_DIR/server.pid"
    ok "Dashboard started (PID: $!)"
    ok "Dashboard: http://localhost:$PORT"
    echo "  Log: $DASHBOARD_DIR/server.log"
  fi

elif [ "$OS" = "Darwin" ]; then
  # --- launchd ---
  PLIST_FILE="$HOME/Library/LaunchAgents/com.claude.dashboard.plist"
  NODE_PATH="$(command -v node)"
  mkdir -p "$(dirname "$PLIST_FILE")"

  cat > "$PLIST_FILE" << EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>com.claude.dashboard</string>
  <key>ProgramArguments</key>
  <array>
    <string>$NODE_PATH</string>
    <string>$SCRIPT_DIR/server.js</string>
  </array>
  <key>EnvironmentVariables</key>
  <dict>
    <key>DASHBOARD_PORT</key>
    <string>$PORT</string>
    <key>DASHBOARD_DIR</key>
    <string>$DASHBOARD_DIR</string>
    <key>HOME</key>
    <string>$HOME</string>
  </dict>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>StandardOutPath</key>
  <string>$DASHBOARD_DIR/server.log</string>
  <key>StandardErrorPath</key>
  <string>$DASHBOARD_DIR/server.log</string>
</dict>
</plist>
EOF

  launchctl unload "$PLIST_FILE" 2>/dev/null || true
  launchctl load "$PLIST_FILE"
  ok "launchd service installed and started"
  ok "Dashboard: http://localhost:$PORT"
  echo ""
  echo "  Manage with:"
  echo "    launchctl list | grep claude"
  echo "    launchctl unload $PLIST_FILE"
  echo "    launchctl load $PLIST_FILE"

else
  warn "Unknown OS: $OS. Starting with nohup..."
  NODE_PATH="$(command -v node)"
  nohup "$NODE_PATH" "$SCRIPT_DIR/server.js" > "$DASHBOARD_DIR/server.log" 2>&1 &
  echo "$!" > "$DASHBOARD_DIR/server.pid"
  ok "Dashboard started (PID: $!)"
fi

echo ""
echo "Done! Dashboard is running at http://localhost:$PORT"
echo ""
