#!/usr/bin/env python3
"""Subconscious — always-on session intelligence for Claude Code.

Runs as a UserPromptSubmit hook on EVERY user message. Three-tier output:

TIER 1 (always, ~3 lines): Session state injection
  - Git branch, modified files, checkpoint status, intent classification
  - Critical for compaction recovery

TIER 1.5 (always for non-trivial, ~3 lines): Agent protocol prescription
  - Based on intent + complexity, prescribes exactly which agents to spawn
  - Enforces multi-agent workflow without relying on static CLAUDE.md rules

TIER 2 (conditional): Prompt enhancement
  - Only fires when prompt is vague/emotional at session start

Performance budget: < 100ms total.
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

INTENTS = {
    "implementation": ["build", "implement", "create", "add", "write", "make", "develop"],
    "debugging": ["fix", "debug", "broken", "error", "crash", "failing", "bug", "issue"],
    "review": ["review", "check", "audit", "look at", "examine"],
    "research": ["analyze", "research", "understand", "explore", "investigate", "how does"],
    "cleanup": ["cleanup", "clean", "refactor", "simplify", "deslop", "tidy"],
    "testing": ["test", "coverage", "spec", "assert"],
    "continuation": [],
}

# --- Agent protocol prescriptions per intent x complexity ---

AGENT_PROTOCOLS = {
    "implementation": {
        "trivial": {
            "complexity": "trivial",
            "note": "Solo OK — single file, small change",
            "agents": [],
        },
        "medium": {
            "complexity": "medium",
            "note": "Multi-agent required",
            "agents": [
                ("BEFORE first edit", 'Agent(subagent_type="explorer", model="haiku", run_in_background=true) — map relevant files + patterns'),
                ("AFTER implementation", 'Agent(subagent_type="code-reviewer") + Agent(subagent_type="security-auditor") — parallel review'),
                ("AFTER implementation", 'Agent(subagent_type="test-writer", run_in_background=true) — test coverage'),
            ],
        },
        "complex": {
            "complexity": "complex",
            "note": "Full pipeline: explore -> plan -> implement (parallel) -> review (parallel) -> verify",
            "agents": [
                ("BEFORE planning", 'Agent(subagent_type="explorer", model="haiku", run_in_background=true) x2-3 — parallel exploration'),
                ("BEFORE implementation", "Present plan and WAIT for user approval"),
                ("DURING implementation", "Launch independent agents in parallel (one per concern/layer)"),
                ("AFTER implementation", 'Agent(subagent_type="code-reviewer") + Agent(subagent_type="security-auditor") — parallel'),
                ("AFTER implementation", 'Agent(subagent_type="test-writer", run_in_background=true)'),
            ],
        },
    },
    "debugging": {
        "trivial": {
            "complexity": "trivial",
            "note": "Obvious fix — solo OK",
            "agents": [],
        },
        "medium": {
            "complexity": "medium",
            "note": "Multi-agent investigation",
            "agents": [
                ("BEFORE fixing", 'Agent(subagent_type="explorer", model="haiku", run_in_background=true) — gather error context'),
                ("IF 2 hypotheses fail", "Escalate to /trace skill — multi-hypothesis evidence-ranked"),
                ("AFTER fix", 'Agent(subagent_type="test-writer", run_in_background=true) — regression test'),
            ],
        },
        "complex": {
            "complexity": "complex",
            "note": "Full debug pipeline",
            "agents": [
                ("IMMEDIATELY", 'Agent(subagent_type="explorer", model="haiku", run_in_background=true) x3 — error context, git blame, dependency map'),
                ("AFTER initial analysis", "Use /trace skill — 3+ parallel hypotheses, evidence ranking, rebuttal rounds"),
                ("AFTER fix", 'Agent(subagent_type="code-reviewer") — verify fix quality'),
                ("AFTER fix", 'Agent(subagent_type="test-writer", run_in_background=true) — regression test'),
            ],
        },
    },
    "review": {
        "trivial": {
            "complexity": "trivial",
            "note": "Quick review — solo OK for < 3 files",
            "agents": [],
        },
        "medium": {
            "complexity": "medium",
            "note": "Multi-agent review",
            "agents": [
                ("LAUNCH parallel", 'Agent(subagent_type="code-reviewer") — quality, patterns, bugs'),
                ("LAUNCH parallel", 'Agent(subagent_type="security-auditor") — OWASP, secrets, CVEs'),
                ("AFTER reviews", "Synthesize findings + rebuttal round on Critical findings"),
            ],
        },
        "complex": {
            "complexity": "complex",
            "note": "Full review pipeline",
            "agents": [
                ("FIRST", "Check codebase-patterns.md for pattern conformance"),
                ("LAUNCH parallel", 'Agent(subagent_type="code-reviewer") — quality'),
                ("LAUNCH parallel", 'Agent(subagent_type="security-auditor") — security'),
                ("LAUNCH parallel", "Performance analysis agent"),
                ("LAUNCH parallel", "Architecture review agent"),
                ("AFTER all", "Synthesize + rebuttal round + evidence hierarchy tagging"),
            ],
        },
    },
    "research": {
        "trivial": {
            "complexity": "trivial",
            "note": "Quick lookup — solo",
            "agents": [],
        },
        "medium": {
            "complexity": "medium",
            "note": "Multi-agent research",
            "agents": [
                ("LAUNCH parallel", 'Agent(subagent_type="explorer", model="haiku") x3 — different areas of codebase'),
                ("AFTER exploration", "Synthesize findings into structured report"),
            ],
        },
        "complex": {
            "complexity": "complex",
            "note": "Deep research (7 parallel agents)",
            "agents": [
                ("USE", "/deep-research command — 7 parallel agents, generates project-intel.md + codebase-patterns.md"),
            ],
        },
    },
    "cleanup": {
        "trivial": {
            "complexity": "trivial",
            "note": "Quick cleanup — solo",
            "agents": [],
        },
        "medium": {
            "complexity": "medium",
            "note": "Regression-safe cleanup",
            "agents": [
                ("FIRST", 'Agent(subagent_type="test-writer", run_in_background=true) — lock behavior with tests BEFORE editing'),
                ("THEN", "Use /deslop skill — 4-pass cleanup (dead code, duplicates, naming, tests)"),
                ("AFTER cleanup", 'Agent(subagent_type="code-reviewer") — verify no behavior change'),
            ],
        },
        "complex": {
            "complexity": "complex",
            "note": "Large refactor — plan first",
            "agents": [
                ("FIRST", 'Agent(subagent_type="explorer", model="haiku") — map all affected files'),
                ("THEN", "Use /consensus-planning — Planner/Architect/Critic validation"),
                ("BEFORE editing", 'Agent(subagent_type="test-writer") — lock ALL behavior with tests'),
                ("DURING", "Implement incrementally, verify after each step"),
                ("AFTER", 'Agent(subagent_type="code-reviewer") + Agent(subagent_type="security-auditor")'),
            ],
        },
    },
    "testing": {
        "trivial": {
            "complexity": "trivial",
            "note": "Single test — solo",
            "agents": [],
        },
        "medium": {
            "complexity": "medium",
            "note": "Test suite work",
            "agents": [
                ("FIRST", 'Agent(subagent_type="explorer", model="haiku") — find existing test patterns'),
                ("THEN", "Match discovered patterns exactly (framework, assertion style, mock approach)"),
            ],
        },
        "complex": {
            "complexity": "complex",
            "note": "Test infrastructure",
            "agents": [
                ("FIRST", 'Agent(subagent_type="explorer", model="haiku") — map test infrastructure'),
                ("THEN", "Plan test strategy (unit/integration/e2e split)"),
                ("LAUNCH parallel", "One agent per test category"),
            ],
        },
    },
    "general": {
        "trivial": {"complexity": "trivial", "note": "Solo OK", "agents": []},
        "medium": {
            "complexity": "medium",
            "note": "Consider multi-agent",
            "agents": [
                ("BEFORE starting", 'Agent(subagent_type="explorer", model="haiku", run_in_background=true) — gather context'),
            ],
        },
        "complex": {
            "complexity": "complex",
            "note": "Multi-agent required",
            "agents": [
                ("BEFORE starting", 'Agent(subagent_type="explorer", model="haiku", run_in_background=true) — gather context'),
                ("AFTER work", 'Agent(subagent_type="code-reviewer") — review changes'),
            ],
        },
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

    stripped = prompt.strip().lower()
    if len(stripped) < 5 or stripped in CONFIRMATIONS:
        return

    ctx = get_session_context(data)
    intent = classify_intent(prompt)

    output_parts = []

    # === TIER 1: Session State (always) ===
    state_line = format_session_state(ctx, prompt, intent)
    if state_line:
        output_parts.append(state_line)

    # === TIER 1.5: Agent Protocol (always for non-trivial) ===
    protocol = get_agent_protocol(prompt, intent, ctx)
    if protocol:
        output_parts.append(protocol)

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
    """Gather full session context."""
    messages = data.get("messages", [])
    user_msg_count = sum(1 for m in messages if m.get("role") == "user")

    branch = _run_git(["rev-parse", "--abbrev-ref", "HEAD"]) or "unknown"

    # Only use diff (fast: ~30ms each). Skip `git status` (slow: 1s+ on large repos).
    # We miss untracked files but that's OK — modified/staged is what matters.
    modified = set()
    for diff_out in [
        _run_git(["diff", "--name-only"]),
        _run_git(["diff", "--name-only", "--staged"]),
    ]:
        if diff_out:
            modified.update(diff_out.split("\n"))

    modified_files = sorted(modified)

    recent_commits = []
    log_out = _run_git(["log", "--oneline", "-3"])
    if log_out:
        recent_commits = log_out.split("\n")

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
# Intent + complexity classification
# ============================================================

def classify_intent(prompt):
    """Classify the user's intent from keywords."""
    lower = prompt.lower()
    scores = {}
    for intent, keywords in INTENTS.items():
        scores[intent] = sum(1 for k in keywords if k in lower)
    best = max(scores, key=lambda k: scores[k])
    return best if scores[best] > 0 else "general"


def classify_complexity(prompt, ctx):
    """Classify task complexity from prompt signals.

    trivial: very short (<8 words) with no action verbs, OR only touches config/docs
    medium: standard implementation/debug/review task (DEFAULT for non-trivial prompts)
    complex: 3+ files, cross-cutting, architectural, or explicit multi-step
    """
    lower = prompt.lower()
    words = lower.split()
    word_count = len(words)

    # Count complexity signals
    file_refs = len(re.findall(r"[\w./]+\.\w{1,5}", prompt))
    has_multi_step = bool(re.search(r"\b(and then|then|after that|also|plus)\b", lower))
    has_cross_cutting = bool(re.search(
        r"\b(frontend|backend|api|database|infra|test|deploy|ci|cd)\b.*\b(frontend|backend|api|database|infra|test|deploy|ci|cd)\b",
        lower,
    ))
    has_architectural = bool(re.search(
        r"\b(architect|design|refactor|restructure|migrate|overhaul|rewrite)\b", lower
    ))
    has_multiple_concerns = bool(re.search(
        r"\b(and|plus|also|with|including)\b", lower
    )) and word_count > 15
    has_action_verb = bool(re.search(
        r"\b(add|create|build|implement|fix|debug|update|change|modify|write|remove|delete|refactor|review|analyze|test)\b",
        lower,
    ))

    # Only truly trivial: very short, no action verb, or only docs/config
    is_docs_only = bool(re.search(r"\b(readme|changelog|doc|comment|typo|spelling)\b", lower))
    if (word_count < 8 and not has_action_verb) or (is_docs_only and word_count < 15):
        return "trivial"

    # Complex: multiple strong signals
    complexity_score = 0
    if file_refs >= 3:
        complexity_score += 2
    elif file_refs >= 1:
        complexity_score += 1
    if has_multi_step:
        complexity_score += 1
    if has_cross_cutting:
        complexity_score += 2
    if has_architectural:
        complexity_score += 2
    if has_multiple_concerns:
        complexity_score += 1
    if word_count > 50:
        complexity_score += 1

    if complexity_score >= 3:
        return "complex"

    # Default: medium (most prompts with action verbs are at least medium)
    return "medium"


# ============================================================
# TIER 1: Session State (always output)
# ============================================================

def format_session_state(ctx, prompt, intent):
    """Format lean session state block."""
    lines = []

    parts = [f"Branch: {ctx['branch']}"]
    if ctx["modified_file_count"] > 0:
        parts.append(f"Modified: {ctx['modified_file_count']} files")
    else:
        parts.append("Modified: none")
    if ctx["has_checkpoint"]:
        parts.append(f"Checkpoint: {ctx['checkpoint_phase']}")
    lines.append("## Session State")
    lines.append(" | ".join(parts))

    if ctx["modified_files"]:
        preview = ", ".join(ctx["modified_files"][:5])
        if ctx["modified_file_count"] > 5:
            preview += f" (+{ctx['modified_file_count'] - 5} more)"
        lines.append(f"Files: {preview}")

    if not ctx["is_mid_session"] and ctx["recent_commits"]:
        lines.append(f"Recent: {ctx['recent_commits'][0]}")

    if intent != "general":
        lines.append(f"Intent: {intent}")

    if ctx["has_checkpoint"] and not ctx["is_mid_session"]:
        lines.append(
            "**Checkpoint detected** — you may be resuming after compaction. "
            "Read `.claude/scratch/task-state.md` to recover full task state."
        )

    ctx_flags = []
    if ctx["has_intel"]:
        ctx_flags.append("intel")
    if ctx["has_patterns"]:
        ctx_flags.append("patterns")
    if ctx_flags:
        lines.append(f"Project: {', '.join(ctx_flags)} available")

    return "\n".join(lines)


# ============================================================
# TIER 1.5: Agent Protocol (prescriptive multi-agent guidance)
# ============================================================

def get_agent_protocol(prompt, intent, ctx):
    """Prescribe agent protocol based on intent + complexity."""
    stripped = prompt.strip().lower()

    # Skip for slash commands (they handle their own agents)
    if stripped.startswith("/"):
        return None

    # Skip for confirmations and questions
    if stripped.startswith("force:") or stripped.startswith("force "):
        return None
    if re.match(
        r"^(what|how|why|where|when|which|can|could|should|is|are|do|does|did)\b",
        stripped,
    ):
        return None

    complexity = classify_complexity(prompt, ctx)

    # Get protocol for this intent + complexity
    intent_protocols = AGENT_PROTOCOLS.get(intent, AGENT_PROTOCOLS["general"])
    protocol = intent_protocols.get(complexity, intent_protocols.get("medium"))

    if not protocol or not protocol["agents"]:
        return None  # Trivial — no agents needed

    lines = []
    lines.append("")
    lines.append(f"## Agent Protocol — {complexity} {intent}")
    lines.append(f"{protocol['note']}")

    for phase, instruction in protocol["agents"]:
        lines.append(f"- **{phase}**: {instruction}")

    # Add context-specific reminders
    if ctx["has_patterns"] and intent in ("implementation", "cleanup"):
        lines.append("- **PATTERN CHECK**: codebase-patterns.md exists — match existing conventions")
    if ctx["has_checkpoint"]:
        lines.append("- **RESUME**: Active checkpoint — continue from where you left off, don't restart")

    # Semi-formal reasoning reminder for review/debug/security tasks
    if intent in ("review", "debugging"):
        lines.append("- **SEMI-FORMAL REASONING**: For each finding/hypothesis, fill the logical certificate — PREMISE (cite file:line) → TRACE (follow execution path step by step) → CONCLUSION (derived from trace only). Do not guess from function names.")
    if complexity == "complex" and intent == "implementation":
        lines.append("- **TRACE BEFORE CLAIMING**: When verifying your implementation works, trace the execution path through the code — don't assume correctness from passing a single test")

    return "\n".join(lines)


# ============================================================
# TIER 2: Prompt Enhancement (conditional)
# ============================================================

def get_enhancement(prompt, ctx):
    """Return enhancement guidance if needed, or None."""
    stripped = prompt.strip().lower()

    if stripped.startswith("/"):
        return None
    if stripped.startswith("force:") or stripped.startswith("force :"):
        return None

    has_file = bool(re.search(r"[\w./]+\.\w{1,5}", prompt))
    has_func = bool(re.search(r"[a-z][a-zA-Z]{2,}\(|[a-z_]{3,}\(", prompt))
    has_issue = bool(re.search(r"#\d+|CR-\d+|issue\s+\d+", prompt, re.I))
    has_code = "```" in prompt
    if sum([has_file, has_func, has_issue, has_code]) >= 2:
        return None

    if re.match(
        r"^(what|how|why|where|when|which|can|could|should|is|are|do|does|did)\b",
        stripped,
    ):
        return None

    if ctx["is_mid_session"]:
        if any(ref in stripped for ref in CONTEXT_REFERENTS):
            return None

    if ctx["is_deep_session"]:
        emotional_count = sum(1 for e in EMOTIONAL_PHRASES if e in stripped)
        if emotional_count < 3:
            return None

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
    """Dynamic threshold."""
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
