---
name: learner
description: Extract reusable patterns from sessions with strict quality gates
---

# Learner

Extract patterns worth persisting to memory from a development session. Only saves what is genuinely valuable for future sessions. High bar, low volume.

## Use When

- `/learn` command (explicit invocation)
- Session end (suggested, never automatic)
- After resolving a complex bug that required deep investigation
- After discovering non-obvious codebase behavior
- After user corrections ("always do X", "never do Y", "that's wrong because...")

## Do Not Use When

- Nothing surprising happened during the session
- All work followed known, documented patterns
- Session was trivial (single file, obvious fix)
- Learnings are general programming knowledge

---

## Quality Gates

Every candidate must pass ALL five gates. If any gate fails, the learning is filtered out.

### Gate 1: Non-Googleable
Is this specific to this codebase/toolchain/setup? Could someone find this in 5 minutes of web search?
- PASS: "Electrobun PATH must be augmented with mise shims, homebrew, .local/bin"
- FAIL: "React components re-render when state changes"

### Gate 2: Context-Specific
Will this be useful in a FUTURE session on this project? Does it reference actual files, configs, or behaviors?
- PASS: "Fleet containers must unset CLAUDECODE and CLAUDE_CODE_ENTRYPOINT for nested sessions"
- FAIL: "Always handle errors in async functions"

### Gate 3: Hard-Won
Was this learned through failure, unexpected behavior, or significant debugging?
- PASS: "npm install blocks the Bun event loop — must use spawn (async), not execFileSync"
- FAIL: "The project uses TypeScript"

### Gate 4: Evidence-Based
Can you point to a specific commit, error message, failed test, or decision that triggered this?
- PASS: "Discovered via TypeError in dev-server.ts:142 when container name already existed"
- FAIL: "I think this might be important"

### Gate 5: Not Already Captured
Check before saving duplicates: `MEMORY.md`, `.claude/rules/project-intel.md`, `.claude/rules/codebase-patterns.md`, claude-mem observations. If already documented, skip. If it adds nuance, note the delta only.

---

## Extraction Categories

### Gotcha
Non-obvious thing that caused a failure or wasted time.
> "Podman container names persist after stop — must use `podman inspect` to detect and reuse"
Target: project-intel.md (Known Gotchas section)

### Pattern
Code convention or structural pattern not in codebase-patterns.md.
> "All Elysia route modules use closure-based dependency injection via init() + module-level let"
Target: codebase-patterns.md (appropriate section)

### Decision
Architectural choice with rationale that future sessions must respect.
> "Chose Elysia over Express because Bun-native performance and no adapter overhead"
Target: MEMORY.md (Decisions section)

### Preference
User preference about how work should be done, discovered through corrections.
> "User prefers bundled PRs with multiple related changes over many small atomic PRs"
Target: MEMORY.md + claude-mem observation (type: decision)

---

## Workflow

### Step 1: Scan the Session
Review the conversation for:
- Errors resolved (what broke, why, how fixed)
- Patterns discovered during exploration
- Architectural decisions and their rationale
- User corrections or explicit preferences
- Surprising undocumented behaviors

Collect each as a candidate with a one-line summary.

### Step 2: Run Quality Gates
For each candidate, evaluate all 5 gates. Be strict — filtering 80% of candidates is normal. A session with zero learnings worth saving is a valid outcome.

### Step 3: Route to Targets

| Category | Target | Action |
|----------|--------|--------|
| Gotcha | project-intel.md | Propose addition (do NOT auto-apply) |
| Pattern | codebase-patterns.md | Propose addition (do NOT auto-apply) |
| Decision | MEMORY.md | Write directly |
| Preference | MEMORY.md + claude-mem | Write directly + create observation |

Changes to project-intel.md and codebase-patterns.md are PROPOSALS only. Present for user approval. Only MEMORY.md and claude-mem writes happen directly.

### Step 4: Report Results
Present the full extraction report. Always show both saved and filtered items so the user can override.

---

## Output Format

```
## Session Learnings

### Worth Saving ({N} items passed quality gates)

1. **{category}**: {learning}
   Evidence: {specific commit, error, or decision that triggered it}
   Target: {memory|intel|patterns}

### Filtered ({M} items failed quality gates)

1. {learning} -- Failed: {gate name} — {why it failed}
```

If zero items pass: "No learnings met the quality bar this session. This is fine — not every session produces novel insights."

---

## Examples

### Good Extractions

**Gotcha**: "Electrobun PATH needs augmentation with mise shims — native process inherits minimal PATH"
Evidence: App failed to find `node` during build; traced to Electrobun stripping PATH. Target: intel

**Decision**: "Static file serving uses `Bun.file()` not `@elysiajs/static` — wildcard GET conflicts with SPA fallback"
Evidence: Route conflict discovered when adding static plugin; reverted to manual serving. Target: memory

**Preference**: "User wants multi-agent workflows for all non-trivial tasks, no exceptions"
Evidence: User correction when single-agent approach was used on a 3-file change. Target: memory + claude-mem

### Bad Extractions (correctly filtered)

- "Learned that TypeScript needs type annotations" -- Failed: Non-Googleable — basic TS knowledge
- "The codebase has a lot of files" -- Failed: Hard-Won — trivial observation
- "Should probably add more tests" -- Failed: Evidence-Based — no specific failure triggered this

---

## Final Checklist

Before delivering results, verify:
- All candidates evaluated against all 5 quality gates
- No duplicates of existing memories, intel, or patterns
- Evidence cited for every item that passed
- Targets correctly assigned per category
- Intel and pattern changes are proposals, not auto-applied
- Filtered items include which gate failed and why
