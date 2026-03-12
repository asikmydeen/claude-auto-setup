#!/usr/bin/env bash
set -euo pipefail

# cmux wrapper — makes the shell function callable as a binary
# Required because cmux is a shell function (sourced from ~/.cmux/cmux.sh)
# which cannot be invoked via execFileSync/subprocess from Node.js.
#
# This wrapper re-implements the key commands using git directly,
# matching cmux's conventions (.worktrees/ path, branch naming).
# Interactive features (claude launch, init prompt) are skipped —
# callers handle those separately.

CMUX_VERSION="unknown"
[[ -f "$HOME/.cmux/VERSION" ]] && CMUX_VERSION="$(<"$HOME/.cmux/VERSION")"

# Get repo root (works inside worktrees too)
repo_root() {
  local git_common_dir
  git_common_dir="$(git rev-parse --git-common-dir 2>/dev/null)" || return 1
  (cd "$(dirname "$git_common_dir")" && pwd)
}

safe_name() {
  echo "${1//\//-}"
}

worktree_dir() {
  echo "$1/.worktrees/$(safe_name "$2")"
}

cmd_new() {
  if [[ -z "${1:-}" ]]; then
    echo "Usage: cmux new <branch>" >&2
    exit 1
  fi

  local branch="${*// /-}"
  local root
  root="$(repo_root)" || { echo "Not in a git repo" >&2; exit 1; }

  local wt_dir
  wt_dir="$(worktree_dir "$root" "$branch")"

  if [[ -d "$wt_dir" ]]; then
    echo "Worktree already exists: $wt_dir"
    exit 0
  fi

  mkdir -p "$root/.worktrees"
  git -C "$root" worktree add "$wt_dir" -b "$branch" || exit 1

  # Run setup hook if available (non-interactive)
  if [[ -x "$wt_dir/.cmux/setup" ]]; then
    echo "Running .cmux/setup..."
    (cd "$wt_dir" && ./.cmux/setup)
  elif [[ -x "$root/.cmux/setup" ]]; then
    echo "Running .cmux/setup from repo root..."
    (cd "$wt_dir" && "$root/.cmux/setup")
  fi

  echo "Worktree ready: $wt_dir"
}

cmd_ls() {
  local root
  root="$(repo_root)" || { echo "Not in a git repo" >&2; exit 1; }
  git -C "$root" worktree list | grep '\.worktrees/' || echo "No cmux worktrees"
}

cmd_merge() {
  if [[ -z "${1:-}" ]]; then
    echo "Usage: cmux merge <branch>" >&2
    exit 1
  fi

  local branch="$1"
  local root
  root="$(repo_root)" || { echo "Not in a git repo" >&2; exit 1; }

  local wt_dir
  wt_dir="$(worktree_dir "$root" "$branch")"

  if [[ ! -d "$wt_dir" ]]; then
    echo "Worktree not found: $wt_dir" >&2
    exit 1
  fi

  # Check for uncommitted changes
  if ! git -C "$wt_dir" diff --quiet 2>/dev/null || \
     ! git -C "$wt_dir" diff --cached --quiet 2>/dev/null; then
    echo "Worktree has uncommitted changes: $wt_dir" >&2
    exit 1
  fi

  local target_branch
  target_branch="$(git -C "$root" rev-parse --abbrev-ref HEAD 2>/dev/null)"

  echo "Merging '$branch' into '$target_branch'..."
  git -C "$root" merge "$branch" --no-edit || exit 1
  echo "Merged '$branch' into '$target_branch'."
}

cmd_rm() {
  local force=false
  local branch=""
  for arg in "$@"; do
    case "$arg" in
      --force|-f) force=true ;;
      *) branch="$arg" ;;
    esac
  done

  if [[ -z "$branch" ]]; then
    echo "Usage: cmux rm <branch> [-f]" >&2
    exit 1
  fi

  local root
  root="$(repo_root)" || { echo "Not in a git repo" >&2; exit 1; }

  local wt_dir
  wt_dir="$(worktree_dir "$root" "$branch")"

  if [[ ! -d "$wt_dir" ]]; then
    echo "Worktree not found: $wt_dir" >&2
    exit 1
  fi

  local remove_args=("$wt_dir")
  $force && remove_args=("--force" "${remove_args[@]}")

  git -C "$root" worktree remove "${remove_args[@]}" || exit 1
  git -C "$root" branch -d "$branch" 2>/dev/null || true
  echo "Removed worktree and branch: $branch"
}

cmd_version() {
  echo "cmux $CMUX_VERSION"
}

# --- Main dispatch ---
cmd="${1:-}"
shift 2>/dev/null || true

case "$cmd" in
  new)     cmd_new "$@" ;;
  ls)      cmd_ls ;;
  merge)   cmd_merge "$@" ;;
  rm)      cmd_rm "$@" ;;
  version) cmd_version ;;
  --help|-h|"")
    echo "Usage: cmux <new|ls|merge|rm|version> [args]"
    echo ""
    echo "  new <branch>     Create worktree + branch, run setup hook"
    echo "  ls               List worktrees"
    echo "  merge <branch>   Merge worktree branch into primary checkout"
    echo "  rm <branch> [-f] Remove worktree + branch"
    echo "  version          Show version"
    echo ""
    echo "Note: This is the non-interactive wrapper. For interactive use"
    echo "(start, cd, init), use the shell function: source ~/.cmux/cmux.sh"
    ;;
  # For commands that need interactive shell, delegate to the sourced function
  start|cd|init|update)
    echo "Command '$cmd' requires the interactive shell function." >&2
    echo "Use: source ~/.cmux/cmux.sh && cmux $cmd $*" >&2
    exit 1
    ;;
  *)
    echo "Unknown command: $cmd" >&2
    echo "Run 'cmux --help' for usage." >&2
    exit 1
    ;;
esac
