#!/usr/bin/env python3
"""Prompt Enhancer Hook — detects vague/emotional prompts and injects rewrite guidance.

Runs as a UserPromptSubmit hook. Reads conversation JSON from stdin,
analyzes the latest user message, outputs enhancement guidance to stdout.
Output becomes a <user-prompt-submit-hook> system reminder that Claude sees
before processing the prompt.

Fast path: most prompts pass through with zero output (< 5ms).
"""
import sys
import json
import re

# --- Skip patterns (no enhancement needed) ---

CONFIRMATIONS = {
    "yes", "no", "y", "n", "ok", "sure", "go ahead", "approved", "lgtm",
    "looks good", "ship it", "do it", "proceed", "continue", "agreed",
    "sounds good", "perfect", "great", "fine", "yep", "nope", "yeah",
    "correct", "right", "exactly", "b", "a", "1", "2", "3",
}

# --- Emotional / vague language patterns ---

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

# --- Available capabilities for matching ---

CAPABILITIES = {
    "build": {
        "triggers": ["build", "implement", "create", "add feature", "new feature"],
        "desc": "/build — multi-agent implementation (vagueness gate, deslop, rebuttal rounds)",
    },
    "deep-interview": {
        "triggers": ["vague", "unclear", "not sure", "idea", "concept", "think about"],
        "desc": "/deep-interview — Socratic Q&A with ambiguity scoring (USE THIS FOR VAGUE REQUESTS)",
    },
    "consensus-planning": {
        "triggers": ["plan", "architect", "design", "approach", "strategy"],
        "desc": "/consensus-planning — Planner/Architect/Critic validation loop",
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
        "desc": "/debug — debugging with trace escalation + formalized PUA",
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


def main():
    try:
        data = json.load(sys.stdin)
    except (json.JSONDecodeError, ValueError):
        return  # Silent exit — no valid input

    # Extract the latest user message
    prompt = extract_prompt(data)
    if not prompt:
        return

    # Fast-path: skip if no enhancement needed
    if should_skip(prompt):
        return

    # Analyze
    analysis = analyze(prompt)

    # Only enhance if score is high enough (3+ issues detected)
    if analysis["score"] < 3:
        return

    # Output guidance
    guidance = format_guidance(prompt, analysis)
    if guidance:
        print(guidance)


def extract_prompt(data):
    """Extract the user's latest message from hook input."""
    # Claude Code sends conversation as messages array
    messages = data.get("messages", [])
    if not messages:
        # Try direct prompt field
        return data.get("prompt", "")

    # Find last user message
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


def should_skip(prompt):
    """Fast check — skip prompts that don't need enhancement."""
    stripped = prompt.strip().lower()

    # Too short (follow-up or confirmation)
    if len(stripped) < 15:
        return True

    # Exact confirmations
    if stripped in CONFIRMATIONS:
        return True

    # Already a slash command
    if stripped.startswith("/"):
        return True

    # Already has concrete anchors (file paths + specific identifiers)
    has_file = bool(re.search(r"[\w./]+\.\w{1,5}", prompt))
    has_func = bool(re.search(r"[a-z][a-zA-Z]{2,}\(|[a-z_]{3,}\(", prompt))
    has_issue = bool(re.search(r"#\d+|CR-\d+|issue\s+\d+", prompt, re.I))
    has_code = "```" in prompt
    anchor_count = sum([has_file, has_func, has_issue, has_code])
    if anchor_count >= 2:
        return True  # Well-anchored prompt

    # Pure question (starts with question word)
    if re.match(r"^(what|how|why|where|when|which|can|could|should|is|are|do|does|did)\b", stripped):
        return True

    return False


def analyze(prompt):
    """Score the prompt for vagueness/emotion. Higher = needs more enhancement."""
    score = 0
    issues = []
    lower = prompt.lower()

    # Check for anchors
    has_file = bool(re.search(r"[\w./]+\.\w{1,5}", prompt))
    has_func = bool(re.search(r"[a-z][a-zA-Z]{2,}\(|[a-z_]{3,}\(", prompt))
    has_issue = bool(re.search(r"#\d+|CR-\d+|issue\s+\d+", prompt, re.I))
    has_code = "```" in prompt

    if not any([has_file, has_func, has_issue, has_code]):
        score += 2
        issues.append("no-anchors")

    # Emotional language
    found_emotional = [e for e in EMOTIONAL_PHRASES if e in lower]
    if found_emotional:
        score += 2
        issues.append("emotional")

    # Vague scope
    found_vague = [v for v in VAGUE_SCOPE if v in lower]
    if found_vague:
        score += 1
        issues.append("vague-scope")

    # No acceptance criteria
    has_criteria = bool(
        re.search(
            r"criteria|accept|verify|test|check that|confirm|should\s+\w+|must\s+\w+|expect",
            lower,
        )
    )
    if not has_criteria:
        score += 1
        issues.append("no-criteria")

    # Match capabilities
    matched = []
    for name, cap in CAPABILITIES.items():
        if any(t in lower for t in cap["triggers"]):
            matched.append(cap["desc"])

    return {
        "score": score,
        "issues": issues,
        "has_anchors": any([has_file, has_func, has_issue, has_code]),
        "emotional": found_emotional,
        "vague": found_vague,
        "matched_capabilities": matched,
    }


def format_guidance(prompt, analysis):
    """Format enhancement guidance as a system reminder."""
    lines = []
    lines.append("## Prompt Enhancement (auto-detected)")
    lines.append("")
    lines.append(
        "The user's prompt has been flagged for enhancement. "
        "Issues: **" + ", ".join(analysis["issues"]) + "**"
    )
    lines.append("")
    lines.append("**REQUIRED — before executing the user's request:**")
    lines.append("")
    lines.append("1. **Extract concrete intent** from the emotional/vague language")
    lines.append("2. **Map to available capabilities:**")

    if analysis["matched_capabilities"]:
        for cap in analysis["matched_capabilities"]:
            lines.append(f"   - {cap}")
    else:
        lines.append("   - `/build` — multi-agent implementation")
        lines.append(
            "   - `/deep-interview` — Socratic requirements gathering (BEST FOR VAGUE REQUESTS)"
        )
        lines.append("   - `/consensus-planning` — Planner/Architect/Critic loop")
        lines.append("   - `/deep-research` — codebase analysis (7 parallel agents)")
        lines.append("   - `/review` — multi-agent code review")
        lines.append("   - `/debug` — debugging with trace escalation")
        lines.append("   - `/deslop` — regression-safe code cleanup")

    lines.append("3. **Add concrete anchors**: file paths, function names, table names")
    lines.append("4. **Add acceptance criteria**: how do we know it's done?")
    lines.append(
        "5. **Present the enhanced prompt** to the user for approval before executing"
    )
    lines.append("")

    if "no-anchors" in analysis["issues"]:
        lines.append(
            "> **Missing anchors**: No file paths, function names, or issue numbers detected. "
            "Ask the user to specify targets, or explore to find them."
        )
        lines.append("")

    if "emotional" in analysis["issues"]:
        lines.append(
            "> **Emotional language**: "
            + ", ".join(f'"{e}"' for e in analysis["emotional"][:3])
            + ". Strip and replace with concrete requirements."
        )
        lines.append("")

    if "vague-scope" in analysis["issues"]:
        lines.append(
            "> **Vague scope**: "
            + ", ".join(f'"{v}"' for v in analysis["vague"][:3])
            + ". Define explicit IN/OUT scope boundaries."
        )
        lines.append("")

    if "no-criteria" in analysis["issues"]:
        lines.append(
            "> **No acceptance criteria**: Add verifiable done conditions "
            "(tests pass, build succeeds, specific output format)."
        )
        lines.append("")

    return "\n".join(lines)


if __name__ == "__main__":
    main()
