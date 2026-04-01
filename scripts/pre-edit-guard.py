#!/usr/bin/env python3
"""Pre-Edit Guard — warns when editing without prior exploration.

Runs as a PreToolUse hook on Edit|Write. Checks if any explorer/research
agent was spawned in the current session before allowing edits.

Uses a simple signal file: .claude/scratch/.explored
- Created by the subconscious when it detects Agent tool use with explorer type
- Checked here before Edit/Write

If no exploration happened and the edit touches a non-trivial file,
outputs a warning that Claude should explore first.
"""
import sys
import json
import os

SIGNAL_FILE = ".claude/scratch/.explored"

# Files that don't need exploration (config, generated, docs)
SKIP_PATTERNS = [
    ".md", ".json", ".yaml", ".yml", ".toml", ".lock",
    ".gitignore", ".env", "CLAUDE.md", "package.json",
    ".claude/", "docs/", "node_modules/", ".git/",
]


def main():
    try:
        data = json.load(sys.stdin)
    except (json.JSONDecodeError, ValueError):
        return

    # Check if exploration signal exists
    if os.path.exists(SIGNAL_FILE):
        return  # Already explored this session

    # Extract the file being edited
    tool_input = data.get("tool_input", {})
    file_path = tool_input.get("file_path", "")
    if not file_path:
        return

    # Skip trivial files that don't need exploration
    if any(pat in file_path for pat in SKIP_PATTERNS):
        return

    # Skip if this is a new file creation (Write with no prior Read)
    # The subconscious handles this — we only warn for modifying existing code

    print(
        "Pre-edit warning: You are editing code without spawning an explorer agent first. "
        "Consider: Agent(subagent_type=\"explorer\", model=\"haiku\", run_in_background=true, "
        f'prompt="Map files related to {os.path.basename(file_path)} — dependencies, patterns, tests")'
    )


if __name__ == "__main__":
    main()
