#!/usr/bin/env bash
# Shared utilities for claude-code-setup scripts
# Source this file: source "${SCRIPT_DIR}/lib/common.sh"

# Colors (safe for Bash 3.2+, no-op when not a terminal)
if [ -t 1 ] && command -v tput &>/dev/null && [ "$(tput colors 2>/dev/null || echo 0)" -ge 8 ]; then
  RED=$(tput setaf 1); GREEN=$(tput setaf 2); YELLOW=$(tput setaf 3)
  BLUE=$(tput setaf 4); CYAN=$(tput setaf 6); DIM=$(tput dim)
  BOLD=$(tput bold); RESET=$(tput sgr0)
else
  RED=""; GREEN=""; YELLOW=""; BLUE=""; CYAN=""; DIM=""; BOLD=""; RESET=""
fi

info()  { echo "${BLUE}[INFO]${RESET}  $*"; }
ok()    { echo "${GREEN}[OK]${RESET}    $*"; }
warn()  { echo "${YELLOW}[WARN]${RESET}  $*"; }
error() { echo "${RED}[ERROR]${RESET} $*" >&2; }
step()  { echo ""; echo "${BOLD}${CYAN}==> $*${RESET}"; }

# Check if a command is available
has_cmd() { command -v "$1" &>/dev/null; }
