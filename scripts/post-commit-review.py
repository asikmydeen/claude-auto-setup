#!/usr/bin/env python3
"""Post-Commit Review Nudge — suggests review agents after git commits.

Runs as a PostToolUse hook on Bash. Detects when a git commit just happened
and suggests spawning code-reviewer + security-auditor agents.

Also creates the .explored signal file when it detects Agent tool usage
(used by pre-edit-guard.py to know exploration happened).
"""
import sys
import json
import os

EXPLORED_SIGNAL = ".claude/scratch/.explored"


def main():
    try:
        data = json.load(sys.stdin)
    except (json.JSONDecodeError, ValueError):
        return

    tool_name = data.get("tool_name", "")
    tool_input = data.get("tool_input", {})
    tool_output = data.get("tool_output", "")

    # Track Agent tool usage — set explored signal
    if tool_name == "Agent":
        prompt = str(tool_input.get("prompt", ""))
        subtype = str(tool_input.get("subagent_type", ""))
        if "explor" in prompt.lower() or "explor" in subtype.lower():
            os.makedirs(".claude/scratch", exist_ok=True)
            with open(EXPLORED_SIGNAL, "w") as f:
                f.write("1")
        return

    # Only process Bash tool
    if tool_name != "Bash":
        return

    command = str(tool_input.get("command", ""))
    output = str(tool_output) if tool_output else ""

    # Detect git commit (successful)
    is_commit = (
        "git commit" in command
        and "create mode" not in command  # Not just a file creation
    )
    commit_succeeded = any(
        marker in output
        for marker in ["[main ", "[master ", "[feat/", "[fix/", "[refactor/", "create mode"]
    )

    if is_commit and commit_succeeded:
        print(
            "Post-commit: Consider spawning review agents:\n"
            '  Agent(subagent_type="code-reviewer", prompt="Review recent commit: '
            'quality, patterns, bugs") + '
            'Agent(subagent_type="security-auditor", prompt="Security audit of '
            'recent commit: OWASP, secrets, CVEs")'
        )
        return

    # Detect git push
    if "git push" in command and ("main -> main" in output or "->" in output):
        print(
            "Post-push: Changes are live. Consider /learn to extract session patterns."
        )


if __name__ == "__main__":
    main()
