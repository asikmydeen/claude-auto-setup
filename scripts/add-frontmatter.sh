#!/usr/bin/env bash
# Add YAML frontmatter to all universal command files
set -euo pipefail

COMMANDS_DIR="$(dirname "$0")/../universal/commands"

# Category mapping
get_category() {
  case "$1" in
    coordinator|developer|reviewer|shepherd|ui-designer|implementor|verifier) echo "role" ;;
    build|debug|review|quick|init|deep-research|intel-refresh|multi-provider-build) echo "workflow" ;;
    agent-organizer|multi-agent-coordinator|workflow-orchestrator|task-distributor|context-manager|project-manager) echo "orchestration" ;;
    code-reviewer|debugger|error-detective|performance-engineer|security-auditor|test-automator|architect-reviewer) echo "review" ;;
    cloud-architect|devops-engineer|docker-expert|security-engineer|sre-engineer|deployment-engineer|build-engineer) echo "infrastructure" ;;
    *) echo "specialist" ;;
  esac
}

# Complexity mapping
get_complexity() {
  case "$1" in
    quick|init) echo "simple" ;;
    build|debug|review|deep-research|multi-provider-build|intel-refresh) echo "complex" ;;
    *) echo "medium" ;;
  esac
}

for file in "$COMMANDS_DIR"/*.md; do
  fname=$(basename "$file" .md)

  # Skip if already has frontmatter
  if head -1 "$file" | grep -q '^---$'; then
    echo "SKIP: $fname (already has frontmatter)"
    continue
  fi

  # Get first line as title (strip # prefix)
  title=$(head -1 "$file" | sed 's/^#\+ *//')
  category=$(get_category "$fname")
  complexity=$(get_complexity "$fname")

  # Build frontmatter
  frontmatter="---
name: $fname
description: $title
category: $category
complexity: $complexity
triggers: [$fname]
---
"

  # Prepend frontmatter
  tmpfile=$(mktemp)
  echo "$frontmatter" > "$tmpfile"
  cat "$file" >> "$tmpfile"
  mv "$tmpfile" "$file"

  echo "ADDED: $fname ($category/$complexity)"
done

echo ""
echo "Done! Added frontmatter to all command files."
