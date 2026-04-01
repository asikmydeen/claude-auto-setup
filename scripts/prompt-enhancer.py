#!/usr/bin/env python3
"""Prompt Enhancer Hook — context-aware prompt quality analysis.

Runs as a UserPromptSubmit hook. Reads conversation JSON from stdin,
analyzes the latest user message WITH session context awareness.

KEY DESIGN PRINCIPLE: Vagueness is relative to available context.
"Fix that" is vague at session start but perfectly clear mid-session
after debugging a specific bug. The hook considers:
- Conversation depth (how many messages deep are we?)
- Git working state (are there recently modified files?)
- Project intel (does project-intel.md exist?)
- Implicit referents ("those files", "that bug", "the thing we discussed")

Fast path: most prompts pass through with zero output (< 10ms).
Mid-session prompts almost always pass through — enhancement is primarily
for session-start prompts where there's no shared context yet.
"""
import sys
import json
import re
import subprocess
import os

# --- Skip patterns (no enhancement needed) ---

CONFIRMATIONS = {
    "yes", "no", "y", "n", "ok", "sure", "go ahead", "approved", "lgtm",
    "looks good", "ship it", "do it", "proceed", "continue", "agreed",
    "sounds good", "perfect", "great", "fine", "yep", "nope", "yeah",
    "correct", "right", "exactly", "b", "a", "1", "2", "3",
}

# Words that reference prior conversation context (not vague if mid-session)
CONTEXT_REFERENTS = [
    "that", "those", "these", "the same", "like before", "as we discussed",
    "the ones we", "what we just", "the files", "those files", "that file",
    "that bug", "that error", "the fix", "that feature", "this module",
    "same thing", "like earlier", "what i said", "we were working on",
    "the changes", "those changes", "that component", "the function",
    "that endpoint", "the page", "the test", "the issue",
]

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
        "desc": "/deep-interview — Socratic Q&A with ambiguity scoring (USE FOR VAGUE REQUESTS)",
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
        return

    prompt = extract_prompt(data)
    if not prompt:
        return

    # Gather session context
    ctx = get_session_context(data)

    # Fast-path skip
    if should_skip(prompt, ctx):
        return

    # Analyze with context awareness
    analysis = analyze(prompt, ctx)

    # Threshold depends on session depth
    threshold = get_threshold(ctx)
    if analysis["score"] < threshold:
        return

    guidance = format_guidance(prompt, analysis, ctx)
    if guidance:
        print(guidance)


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


def get_session_context(data):
    """Gather context about the current session state."""
    messages = data.get("messages", [])

    # Count conversation depth (user messages only)
    user_msg_count = sum(1 for m in messages if m.get("role") == "user")

    # Check git working state (recently modified files)
    modified_files = []
    try:
        result = subprocess.run(
            ["git", "diff", "--name-only", "HEAD"],
            capture_output=True, text=True, timeout=2
        )
        if result.returncode == 0 and result.stdout.strip():
            modified_files = result.stdout.strip().split("\n")
    except (subprocess.TimeoutExpired, FileNotFoundError, OSError):
        pass

    # Also check staged files
    try:
        result = subprocess.run(
            ["git", "diff", "--name-only", "--staged"],
            capture_output=True, text=True, timeout=2
        )
        if result.returncode == 0 and result.stdout.strip():
            modified_files.extend(result.stdout.strip().split("\n"))
    except (subprocess.TimeoutExpired, FileNotFoundError, OSError):
        pass

    # Check for untracked files too
    try:
        result = subprocess.run(
            ["git", "status", "--short"],
            capture_output=True, text=True, timeout=2
        )
        if result.returncode == 0 and result.stdout.strip():
            for line in result.stdout.strip().split("\n"):
                if line.startswith("??"):
                    modified_files.append(line[3:].strip())
    except (subprocess.TimeoutExpired, FileNotFoundError, OSError):
        pass

    modified_files = list(set(modified_files))

    # Check project intel existence
    has_intel = os.path.exists(".claude/rules/project-intel.md")
    has_patterns = os.path.exists(".claude/rules/codebase-patterns.md")

    # Check for task checkpoint (mid-task)
    has_checkpoint = os.path.exists(".claude/scratch/task-state.md")

    return {
        "user_msg_count": user_msg_count,
        "modified_files": modified_files,
        "modified_file_count": len(modified_files),
        "has_intel": has_intel,
        "has_patterns": has_patterns,
        "has_checkpoint": has_checkpoint,
        "is_mid_session": user_msg_count > 2,
        "is_deep_session": user_msg_count > 8,
        "has_working_changes": len(modified_files) > 0,
    }


def get_threshold(ctx):
    """Dynamic threshold based on session context.

    Session start (no context): threshold=3 (sensitive — catch vague prompts)
    Mid-session (some context): threshold=4 (lenient — trust implicit context)
    Deep session (lots of context): threshold=5 (very lenient — almost never trigger)

    Note: heavy emotional prompts (3+ phrases) bypass the deep-session skip
    in should_skip(), so they still get analyzed. The threshold here just needs
    to be reachable for genuinely bad prompts (emotional=2 + vague=1 + no-anchors=1 = 4).
    """
    threshold = 3  # Default: session start

    if ctx["is_deep_session"]:
        threshold = 4  # Deep session — trust context, but emotional rants (score 4+) still trigger
    elif ctx["is_mid_session"]:
        threshold = 4  # Mid session — mostly trust

    if ctx["has_checkpoint"]:
        threshold += 1  # Active task = clear context exists

    return threshold


def should_skip(prompt, ctx):
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
        return True

    # Pure question (starts with question word)
    if re.match(
        r"^(what|how|why|where|when|which|can|could|should|is|are|do|does|did)\b",
        stripped,
    ):
        return True

    # Mid-session with context referents ("fix that", "clean up those files")
    # These are NOT vague — they reference prior conversation context
    if ctx["is_mid_session"]:
        has_referent = any(ref in stripped for ref in CONTEXT_REFERENTS)
        if has_referent:
            return True

    # Deep session — almost everything has implicit context, skip unless
    # it's heavily emotional (3+ emotional phrases = session-start-style rant)
    if ctx["is_deep_session"]:
        emotional_count = sum(1 for e in EMOTIONAL_PHRASES if e in stripped)
        if emotional_count < 3:
            return True  # Normal mid-session prompt, trust context

    return False


def analyze(prompt, ctx):
    """Score the prompt for vagueness/emotion, adjusted for session context."""
    score = 0
    issues = []
    lower = prompt.lower()

    # Check for anchors
    has_file = bool(re.search(r"[\w./]+\.\w{1,5}", prompt))
    has_func = bool(re.search(r"[a-z][a-zA-Z]{2,}\(|[a-z_]{3,}\(", prompt))
    has_issue = bool(re.search(r"#\d+|CR-\d+|issue\s+\d+", prompt, re.I))
    has_code = "```" in prompt

    if not any([has_file, has_func, has_issue, has_code]):
        # Mid-session: modified files ARE implicit anchors
        if ctx["has_working_changes"]:
            score += 1  # Minor concern, not major
            issues.append("implicit-anchors-only")
        else:
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

    # No acceptance criteria (less important mid-session)
    has_criteria = bool(
        re.search(
            r"criteria|accept|verify|test|check that|confirm|should\s+\w+|must\s+\w+|expect",
            lower,
        )
    )
    if not has_criteria:
        if ctx["is_mid_session"]:
            score += 0  # Criteria less important mid-session
        else:
            score += 1
            issues.append("no-criteria")

    # Match capabilities
    matched = []
    for _name, cap in CAPABILITIES.items():
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


def format_guidance(prompt, analysis, ctx):
    """Format enhancement guidance as a system reminder."""
    lines = []
    lines.append("## Prompt Enhancement (auto-detected)")
    lines.append("")

    # Show context awareness
    ctx_desc = []
    if ctx["is_deep_session"]:
        ctx_desc.append(f"deep session ({ctx['user_msg_count']} messages)")
    elif ctx["is_mid_session"]:
        ctx_desc.append(f"mid-session ({ctx['user_msg_count']} messages)")
    else:
        ctx_desc.append("session start")
    if ctx["has_working_changes"]:
        ctx_desc.append(f"{ctx['modified_file_count']} modified files")
    if ctx["has_checkpoint"]:
        ctx_desc.append("active task checkpoint")

    lines.append(
        f"**Context**: {', '.join(ctx_desc)} | "
        f"Issues: **{', '.join(analysis['issues'])}**"
    )
    lines.append("")

    # If mid-session, softer guidance — don't demand rewrites
    if ctx["is_mid_session"]:
        lines.append(
            "The user's prompt could benefit from more specificity. "
            "Since this is mid-session, you likely have context from the conversation. "
            "Use that context to fill gaps — only ask the user to clarify if you "
            "genuinely don't know what they're referring to."
        )
        lines.append("")
        if ctx["has_working_changes"]:
            files_preview = ", ".join(ctx["modified_files"][:5])
            if len(ctx["modified_files"]) > 5:
                files_preview += f" (+{len(ctx['modified_files'])-5} more)"
            lines.append(
                f"> **Recently modified files** (likely targets): {files_preview}"
            )
            lines.append("")
        if analysis["matched_capabilities"]:
            lines.append("**Suggested capabilities:**")
            for cap in analysis["matched_capabilities"]:
                lines.append(f"   - {cap}")
            lines.append("")
    else:
        # Session start — full rewrite guidance
        lines.append("**REQUIRED — before executing the user's request:**")
        lines.append("")
        lines.append(
            "1. **Extract concrete intent** from the emotional/vague language"
        )
        lines.append("2. **Map to available capabilities:**")

        if analysis["matched_capabilities"]:
            for cap in analysis["matched_capabilities"]:
                lines.append(f"   - {cap}")
        else:
            lines.append("   - `/build` — multi-agent implementation")
            lines.append(
                "   - `/deep-interview` — Socratic requirements (BEST FOR VAGUE)"
            )
            lines.append(
                "   - `/consensus-planning` — Planner/Architect/Critic loop"
            )
            lines.append(
                "   - `/deep-research` — codebase analysis (7 parallel agents)"
            )
            lines.append("   - `/review` — multi-agent code review")
            lines.append("   - `/debug` — debugging with trace escalation")
            lines.append("   - `/deslop` — regression-safe code cleanup")

        lines.append(
            "3. **Add concrete anchors**: file paths, function names, table names"
        )
        lines.append("4. **Add acceptance criteria**: how do we know it's done?")
        lines.append(
            "5. **Present the enhanced prompt** to the user for approval "
            "before executing"
        )
        lines.append("")

    if "no-anchors" in analysis["issues"]:
        lines.append(
            "> **Missing anchors**: No file paths, function names, or issue "
            "numbers detected. Ask the user to specify targets, or explore "
            "to find them."
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
