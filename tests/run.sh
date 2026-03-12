#!/usr/bin/env bash
set -euo pipefail

# Simple test runner for claude-code-setup
# Usage: ./tests/run.sh

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

PASS=0
FAIL=0
SKIP=0

green() { printf "\033[32m%s\033[0m" "$*"; }
red()   { printf "\033[31m%s\033[0m" "$*"; }
dim()   { printf "\033[2m%s\033[0m" "$*"; }

assert_eq() {
  local desc="$1" expected="$2" actual="$3"
  if [ "$expected" = "$actual" ]; then
    echo "  $(green PASS) $desc"
    PASS=$((PASS + 1))
  else
    echo "  $(red FAIL) $desc"
    echo "       expected: $expected"
    echo "       actual:   $actual"
    FAIL=$((FAIL + 1))
  fi
}

assert_contains() {
  local desc="$1" needle="$2" haystack="$3"
  if echo "$haystack" | grep -qF -- "$needle"; then
    echo "  $(green PASS) $desc"
    PASS=$((PASS + 1))
  else
    echo "  $(red FAIL) $desc"
    echo "       expected to contain: $needle"
    FAIL=$((FAIL + 1))
  fi
}

assert_exit_code() {
  local desc="$1" expected="$2" actual="$3"
  if [ "$expected" = "$actual" ]; then
    echo "  $(green PASS) $desc"
    PASS=$((PASS + 1))
  else
    echo "  $(red FAIL) $desc (exit code: $actual, expected: $expected)"
    FAIL=$((FAIL + 1))
  fi
}

assert_file_exists() {
  local desc="$1" path="$2"
  if [ -e "$path" ]; then
    echo "  $(green PASS) $desc"
    PASS=$((PASS + 1))
  else
    echo "  $(red FAIL) $desc — $path not found"
    FAIL=$((FAIL + 1))
  fi
}

# ============================================================================
echo "=== install.sh ==="

echo "  --- --help ---"
output=$(bash "$ROOT_DIR/install.sh" --help 2>&1) || true
assert_exit_code "install.sh --help exits 0" "0" "$?"
assert_contains "help shows usage" "Usage:" "$output"
assert_contains "help shows --dry-run" "--dry-run" "$output"
assert_contains "help shows --agents" "--agents" "$output"

echo "  --- --dry-run ---"
output=$(bash "$ROOT_DIR/install.sh" --dry-run 2>&1) || true
assert_exit_code "install.sh --dry-run exits 0" "0" "$?"
assert_contains "dry-run mentions DRY RUN" "DRY RUN" "$output"

# ============================================================================
echo ""
echo "=== dispatch.sh ==="

echo "  --- --list-providers ---"
output=$(bash "$ROOT_DIR/dispatch.sh" --list-providers 2>&1) || true
assert_exit_code "dispatch.sh --list-providers exits 0" "0" "$?"
assert_contains "lists available providers" "Available providers" "$output"

echo "  --- --list-routes ---"
output=$(bash "$ROOT_DIR/dispatch.sh" --list-routes 2>&1) || true
assert_exit_code "dispatch.sh --list-routes exits 0" "0" "$?"

echo "  --- missing --task ---"
rc=0
output=$(bash "$ROOT_DIR/dispatch.sh" 2>&1) || rc=$?
assert_eq "dispatch.sh with no args exits non-zero" "1" "$rc"
assert_contains "shows missing task error" "Missing --task" "$output"

# ============================================================================
echo ""
echo "=== lib/common.sh ==="

output=$(bash -c "SCRIPT_DIR='$ROOT_DIR' && source '$ROOT_DIR/lib/common.sh' && info 'test message'" 2>&1)
assert_contains "info() outputs message" "test message" "$output"

output=$(bash -c "SCRIPT_DIR='$ROOT_DIR' && source '$ROOT_DIR/lib/common.sh' && has_cmd bash && echo 'found'" 2>&1)
assert_contains "has_cmd finds bash" "found" "$output"

output=$(bash -c "SCRIPT_DIR='$ROOT_DIR' && source '$ROOT_DIR/lib/common.sh' && has_cmd nonexistent_cmd_xyz || echo 'not found'" 2>&1)
assert_contains "has_cmd returns false for missing cmd" "not found" "$output"

# ============================================================================
echo ""
echo "=== project structure ==="

assert_file_exists "universal/ directory exists" "$ROOT_DIR/universal"
assert_file_exists "universal/rules/ exists" "$ROOT_DIR/universal/rules"
assert_file_exists "universal/commands/ exists" "$ROOT_DIR/universal/commands"
assert_file_exists "universal/providers.json exists" "$ROOT_DIR/universal/providers.json"
assert_file_exists "agents/claude-code/adapter.sh exists" "$ROOT_DIR/agents/claude-code/adapter.sh"
assert_file_exists "lib/common.sh exists" "$ROOT_DIR/lib/common.sh"
if [ -d "$ROOT_DIR/config" ]; then
  echo "  $(red FAIL) legacy config/ directory still exists"
  FAIL=$((FAIL + 1))
else
  echo "  $(green PASS) no legacy config/ directory"
  PASS=$((PASS + 1))
fi

# ============================================================================
echo ""
echo "=== shellcheck ==="

if command -v shellcheck &>/dev/null; then
  sc_errors=0
  for script in install.sh dispatch.sh project-init.sh; do
    if shellcheck -S error "$ROOT_DIR/$script" 2>&1 | grep -q "SC"; then
      echo "  $(red FAIL) shellcheck errors in $script"
      FAIL=$((FAIL + 1))
      sc_errors=$((sc_errors + 1))
    else
      echo "  $(green PASS) $script — no shellcheck errors"
      PASS=$((PASS + 1))
    fi
  done
else
  echo "  $(dim SKIP) shellcheck not installed"
  SKIP=$((SKIP + 3))
fi

# ============================================================================
echo ""
echo "==========================================="
echo "Results: $(green "$PASS passed"), $(red "$FAIL failed"), $(dim "$SKIP skipped")"
echo "==========================================="

[ "$FAIL" -eq 0 ] && exit 0 || exit 1
