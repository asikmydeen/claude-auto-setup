#!/usr/bin/env python3
"""Subconscious — always-on session intelligence for Claude Code.

Runs as a UserPromptSubmit hook on EVERY user message. Two-tier output:

TIER 1 (always, ~3 lines): Session state injection
  - Git branch, modified files, checkpoint status, recent commits
  - Gives Claude instant awareness of working state on every message
  - Critical for compaction recovery (Claude loses context, subconscious restores it)

TIER 2 (conditional): Prompt enhancement
  - Only fires when prompt is vague/emotional at session start
  - Silent mid-session when conversation context exists
  - Same logic as the original prompt-enhancer but layered on top of Tier 1

Performance budget: < 100ms total (git commands are fast, no file reads).
"""
import sys
import json
import re
import subprocess
import os

# --- Constants ---

CONFIRMATIONS = {
    "yes", "no", "y", "n", "ok", "sure", "go ahead", "approved", "lgtm",
    "looks good", "ship it", "do it", "proceed", "continue", "agreed",
    "sounds good", "perfect", "great", "fine", "yep", "nope", "yeah",
    "correct", "right", "exactly", "b", "a", "1", "2", "3",
}

CONTEXT_REFERENTS = [
    "that", "those", "these", "the same", "like before", "as we discussed",
    "the ones we", "what we just", "the files", "those files", "that file",
    "that bug", "that error", "the fix", "that feature", "this module",
    "same thing", "like earlier", "what i said", "we were working on",
    "the changes", "those changes", "that component", "the function",
    "that endpoint", "the page", "the test", "the issue",
]

EMOTIONAL_PHRASES = [
    "make it work", "make it count", "make it perfect", "make it happen",
    "make it good", "make it great", "make it right",
    "be thorough", "be very thorough", "be comprehensive", "be perfect",
    "and so on", "etc etc", "and so forth", "and stuff", "and whatnot",
    "dont just", "don't just", "not just random", "not random",
    "one shot", "this is our chance", "we need to make",
    "figure it out", "you know what i mean", "just make it",
    "i want this to be", "this needs to be", "it should be amazing",
    "no mistakes", "no errors", "zero tolerance",
]

VAGUE_SCOPE = [
    "everything", "comprehensive", "all the things", "the whole thing",
    "and more", "whatever else", "anything missing", "anything else",
    "end to end", "soup to nuts", "the works", "full analysis",
    "deep dive into everything",
]

CAPABILITIES = {
    "build": {
        "triggers": ["build", "implement", "create", "add feature", "new feature"],
        "desc": "/build — multi-agent implementation (vagueness gate, deslop, rebuttal)",
    },
    "deep-interview": {
        "triggers": ["vague", "unclear", "not sure", "idea", "concept", "think about"],
        "desc": "/deep-interview — Socratic Q&A with ambiguity scoring",
    },
    "consensus-planning": {
        "triggers": ["plan", "architect", "design", "approach", "strategy"],
        "desc": "/consensus-planning — Planner/Architect/Critic loop",
    },
    "deep-research": {
        "triggers": ["analyze", "research", "understand", "explore", "investigate codebase"],
        "desc": "/deep-research — 7 parallel agents for codebase analysis",
    },
    "review": {
        "triggers": ["review", "check", "audit", "quality"],
        "desc": "/review — multi-agent review (pattern conformance, evidence hierarchy)",
    },
    "debug": {
        "triggers": ["debug", "fix", "broken", "error", "failing", "crash", "bug"],
        "desc": "/debug — debugging with trace escalation + PUA",
    },
    "trace": {
        "triggers": ["complex bug", "intermittent", "race condition", "hard to reproduce"],
        "desc": "/trace — multi-hypothesis evidence-ranked debugging",
    },
    "deslop": {
        "triggers": ["cleanup", "clean up", "refactor", "slop", "bloat", "messy"],
        "desc": "/deslop — regression-safe AI code cleanup",
    },
    "learn": {
        "triggers": ["learned", "remember", "pattern", "save this"],
        "desc": "/learn — extract session patterns with quality gates",
    },
}

# Intent classification keywords
INTENTS = {
    "implementation": ["build", "implement", "create", "add", "write", "make", "develop"],
    "debugging": ["fix", "debug", "broken", "error", "crash", "failing", "bug", "issue"],
    "review": ["review", "check", "audit", "look at", "examine"],
    "research": ["analyze", "research", "understand", "explore", "investigate", "how does"],
    "cleanup": ["cleanup", "clean", "refactor", "simplify", "deslop", "tidy"],
    "testing": ["test", "coverage", "spec", "assert"],
    "continuation": [],  # Detected by checkpoint, not keywords
}


def main():
    try:
        data = json.load(sys.stdin)
    except (json.JSONDecodeError, ValueError):
        return

    prompt = extract_prompt(data)
    if not prompt:
        return

    # Ultra-fast skip for tiny confirmations
    stripped = prompt.strip().lower()
    if len(stripped) < 5 or stripped in CONFIRMATIONS:
        return

    # Gather session context (Tier 1 — always needed)
    ctx = get_session_context(data)

    output_parts = []

    # === TIER 1: Session State (always, unless trivial confirmation) ===
    state_line = format_session_state(ctx, prompt)
    if state_line:
        output_parts.append(state_line)

    # === TIER 2: Prompt Enhancement (conditional) ===
    enhancement = get_enhancement(prompt, ctx)
    if enhancement:
        output_parts.append(enhancement)

    if output_parts:
        print("\n".join(output_parts))


# ============================================================
# Prompt extraction
# ============================================================

def extract_prompt(data):
    """Extract the user's latest message from hook input."""
    messages = data.get("messages", [])
    if not messages:
        return data.get("prompt", "")
    for msg in reversed(messages):
        if msg.get("role") == "user":
            content = msg.get("content", "")
            if isinstance(content, list):
                parts = []
                for p in content:
                    if isinstance(p, dict) and p.get("type") == "text":
                        parts.append(p.get("text", ""))
                    elif isinstance(p, str):
                        parts.append(p)
                return " ".join(parts)
            return str(content)
    return ""


# ============================================================
# Session context gathering
# ============================================================

def _run_git(args, timeout=2):
    """Run a git command, return stdout or empty string."""
    try:
        r = subprocess.run(
            ["git"] + args, capture_output=True, text=True, timeout=timeout
        )
        return r.stdout.strip() if r.returncode == 0 else ""
    except (subprocess.TimeoutExpired, FileNotFoundError, OSError):
        return ""


def get_session_context(data):
    """Gather full session context — git state, checkpoints, intel."""
    messages = data.get("messages", [])
    user_msg_count = sum(1 for m in messages if m.get("role") == "user")

    # Git state (parallel-safe, fast)
    branch = _run_git(["rev-parse", "--abbrev-ref", "HEAD"]) or "unknown"

    # Modified files (unstaged + staged + untracked)
    modified = set()
    for diff_out in [
        _run_git(["diff", "--name-only"]),
        _run_git(["diff", "--name-only", "--staged"]),
    ]:
        if diff_out:
            modified.update(diff_out.split("\n"))

    status_out = _run_git(["status", "--short"])
    if status_out:
        for line in status_out.split("\n"):
            if line.startswith("??"):
                modified.add(line[3:].strip())

    modified_files = sorted(modified)

    # Recent commits (last 3, one-line)
    recent_commits = []
    log_out = _run_git(["log", "--oneline", "-3"])
    if log_out:
        recent_commits = log_out.split("\n")

    # Checkpoint
    checkpoint_phase = None
    checkpoint_path = ".claude/scratch/task-state.md"
    if os.path.exists(checkpoint_path):
        try:
            with open(checkpoint_path, "r") as f:
                for line in f:
                    if line.startswith("## Phase") or line.startswith("## Current"):
                        checkpoint_phase = line.strip().lstrip("#").strip()
                        break
                    if "Phase" in line and any(
                        p in line.lower()
                        for p in ["explore", "plan", "implement", "review", "verify"]
                    ):
                        checkpoint_phase = line.strip().lstrip("#- ").strip()
                        break
        except OSError:
            pass

    # Project intel/patterns existence
    has_intel = os.path.exists(".claude/rules/project-intel.md")
    has_patterns = os.path.exists(".claude/rules/codebase-patterns.md")

    return {
        "user_msg_count": user_msg_count,
        "branch": branch,
        "modified_files": modified_files,
        "modified_file_count": len(modified_files),
        "recent_commits": recent_commits,
        "checkpoint_phase": checkpoint_phase,
        "has_checkpoint": checkpoint_phase is not None,
        "has_intel": has_intel,
        "has_patterns": has_patterns,
        "is_mid_session": user_msg_count > 2,
        "is_deep_session": user_msg_count > 8,
        "has_working_changes": len(modified_files) > 0,
    }


# ============================================================
# TIER 1: Session State (always output)
# ============================================================

def classify_intent(prompt):
    """Classify the user's intent from keywords."""
    lower = prompt.lower()
    scores = {}
    for intent, keywords in INTENTS.items():
        scores[intent] = sum(1 for k in keywords if k in lower)
    best = max(scores, key=lambda k: scores[k])
    return best if scores[best] > 0 else "general"


def format_session_state(ctx, prompt):
    """Format lean session state block (~3-5 lines)."""
    lines = []

    # Line 1: Branch + modified files + checkpoint
    parts = [f"Branch: {ctx['branch']}"]
    if ctx["modified_file_count"] > 0:
        parts.append(f"Modified: {ctx['modified_file_count']} files")
    else:
        parts.append("Modified: none")
    if ctx["has_checkpoint"]:
        parts.append(f"Checkpoint: {ctx['checkpoint_phase']}")
    lines.append("## Session State")
    lines.append(" | ".join(parts))

    # Line 2: Recently modified files (if any, max 5)
    if ctx["modified_files"]:
        preview = ", ".join(ctx["modified_files"][:5])
        if ctx["modified_file_count"] > 5:
            preview += f" (+{ctx['modified_file_count'] - 5} more)"
        lines.append(f"Files: {preview}")

    # Line 3: Recent commits (if session start — helps after compaction)
    if not ctx["is_mid_session"] and ctx["recent_commits"]:
        lines.append(f"Recent: {ctx['recent_commits'][0]}")

    # Line 4: Intent classification
    intent = classify_intent(prompt)
    if intent != "general":
        lines.append(f"Intent: {intent}")

    # Line 5: Checkpoint recovery hint (critical after compaction)
    if ctx["has_checkpoint"] and not ctx["is_mid_session"]:
        lines.append(
            "**Checkpoint detected** — you may be resuming after compaction. "
            "Read `.claude/scratch/task-state.md` to recover full task state."
        )

    # Line 6: Project context indicators
    ctx_flags = []
    if ctx["has_intel"]:
        ctx_flags.append("intel")
    if ctx["has_patterns"]:
        ctx_flags.append("patterns")
    if ctx_flags:
        lines.append(f"Project: {', '.join(ctx_flags)} available")

    return "\n".join(lines)


# ============================================================
# TIER 2: Prompt Enhancement (conditional)
# ============================================================

def get_enhancement(prompt, ctx):
    """Return enhancement guidance if needed, or None."""
    stripped = prompt.strip().lower()

    # Skip conditions (no enhancement)
    if stripped.startswith("/"):
        return None
    if stripped.startswith("force:") or stripped.startswith("force :"):
        return None

    # Well-anchored prompts don't need enhancement
    has_file = bool(re.search(r"[\w./]+\.\w{1,5}", prompt))
    has_func = bool(re.search(r"[a-z][a-zA-Z]{2,}\(|[a-z_]{3,}\(", prompt))
    has_issue = bool(re.search(r"#\d+|CR-\d+|issue\s+\d+", prompt, re.I))
    has_code = "```" in prompt
    if sum([has_file, has_func, has_issue, has_code]) >= 2:
        return None

    # Questions don't need enhancement
    if re.match(
        r"^(what|how|why|where|when|which|can|could|should|is|are|do|does|did)\b",
        stripped,
    ):
        return None

    # Mid-session with referents — trust context
    if ctx["is_mid_session"]:
        if any(ref in stripped for ref in CONTEXT_REFERENTS):
            return None

    # Deep session — only trigger on heavy emotional rants (3+)
    if ctx["is_deep_session"]:
        emotional_count = sum(1 for e in EMOTIONAL_PHRASES if e in stripped)
        if emotional_count < 3:
            return None

    # Score the prompt
    analysis = _analyze(prompt, ctx)
    threshold = _get_threshold(ctx)
    if analysis["score"] < threshold:
        return None

    return _format_enhancement(analysis, ctx)


def _analyze(prompt, ctx):
    """Score prompt for vagueness/emotion."""
    score = 0
    issues = []
    lower = prompt.lower()

    has_file = bool(re.search(r"[\w./]+\.\w{1,5}", prompt))
    has_func = bool(re.search(r"[a-z][a-zA-Z]{2,}\(|[a-z_]{3,}\(", prompt))
    has_issue = bool(re.search(r"#\d+|CR-\d+|issue\s+\d+", prompt, re.I))
    has_code = "```" in prompt

    if not any([has_file, has_func, has_issue, has_code]):
        if ctx["has_working_changes"]:
            score += 1
            issues.append("implicit-anchors-only")
        else:
            score += 2
            issues.append("no-anchors")

    found_emotional = [e for e in EMOTIONAL_PHRASES if e in lower]
    if found_emotional:
        score += 2
        issues.append("emotional")

    found_vague = [v for v in VAGUE_SCOPE if v in lower]
    if found_vague:
        score += 1
        issues.append("vague-scope")

    if not ctx["is_mid_session"]:
        has_criteria = bool(
            re.search(
                r"criteria|accept|verify|test|check that|confirm|should\s+\w+|must\s+\w+|expect",
                lower,
            )
        )
        if not has_criteria:
            score += 1
            issues.append("no-criteria")

    matched = []
    for _name, cap in CAPABILITIES.items():
        if any(t in lower for t in cap["triggers"]):
            matched.append(cap["desc"])

    return {
        "score": score,
        "issues": issues,
        "emotional": found_emotional,
        "vague": found_vague,
        "matched_capabilities": matched,
    }


def _get_threshold(ctx):
    """Dynamic threshold: session start=3, mid=4, deep=4, checkpoint=+1."""
    threshold = 3
    if ctx["is_deep_session"] or ctx["is_mid_session"]:
        threshold = 4
    if ctx["has_checkpoint"]:
        threshold += 1
    return threshold


def _format_enhancement(analysis, ctx):
    """Format Tier 2 enhancement guidance."""
    lines = []
    lines.append("")
    lines.append("## Prompt Enhancement")
    lines.append(f"Issues: **{', '.join(analysis['issues'])}**")
    lines.append("")

    if ctx["is_mid_session"]:
        lines.append(
            "Prompt could be more specific. You have conversation context — "
            "use it to fill gaps. Only ask for clarification if genuinely unclear."
        )
        if analysis["matched_capabilities"]:
            lines.append("Suggested: " + ", ".join(
                c.split(" — ")[0] for c in analysis["matched_capabilities"]
            ))
    else:
        lines.append("Before executing:")
        lines.append("1. Extract concrete intent from emotional language")
        lines.append("2. Map to capabilities:")
        if analysis["matched_capabilities"]:
            for cap in analysis["matched_capabilities"]:
                lines.append(f"   - {cap}")
        else:
            lines.append("   - /build, /deep-interview, /consensus-planning, /review, /debug, /deslop")
        lines.append("3. Add anchors (file paths, function names, table names)")
        lines.append("4. Add acceptance criteria")
        lines.append("5. Present enhanced prompt to user for approval")

    lines.append("")

    if "emotional" in analysis["issues"]:
        lines.append(
            "> Emotional: "
            + ", ".join(f'"{e}"' for e in analysis["emotional"][:3])
            + " — replace with concrete requirements"
        )
    if "vague-scope" in analysis["issues"]:
        lines.append(
            "> Vague: "
            + ", ".join(f'"{v}"' for v in analysis["vague"][:3])
            + " — define IN/OUT scope"
        )
    if "no-anchors" in analysis["issues"]:
        lines.append("> No anchors — ask for file paths/function names or explore to find them")
    if "no-criteria" in analysis["issues"]:
        lines.append("> No acceptance criteria — add verifiable done conditions")

    return "\n".join(lines)


if __name__ == "__main__":
    main()
