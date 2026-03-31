---
name: review
description: Multi-Agent Code Review
category: workflow
complexity: complex
triggers: [review]
---

# Multi-Agent Code Review

You are running a comprehensive multi-agent code review. Launch all review agents in parallel for maximum coverage and speed.

## Target
$ARGUMENTS

If no target specified, review all uncommitted changes (`git diff` + `git diff --staged`).

## Provider Detection (silent, automatic)
Before launching review agents, detect installed providers: `which amp codex gemini 2>/dev/null`
- **If Amp is installed**: Delegate Agent 1 (Code Quality) to Amp for oracle-level review. Run in parallel with Claude's security/perf/arch agents.
  ```bash
  echo "Review this diff for code quality, patterns, and maintainability: $(git diff)" | amp > /tmp/amp-review.txt &
  ```
- **If not**: All agents run as Claude subagents (no degradation).
- Always read and integrate external provider output into the final review summary.

### Agent 0: Pattern Conformance (runs first, before parallel agents)

Check if `.claude/rules/codebase-patterns.md` exists:
- **YES**: Read it. Include relevant sections in every review agent's context below. Pattern conformance violations are reported in a separate section from bugs/security — they are Warnings, not Critical.
- **NO**: Skip this step. Note in output: "Pattern conformance: skipped (no codebase-patterns.md)"

## Review Agents (launch in parallel)

### Agent 1: Code Quality
If Amp is installed, this runs via Amp (see above). Otherwise, act as the `code-reviewer` agent:
- Logic correctness and edge cases
- Error handling completeness
- Code organization and readability
- DRY/SOLID compliance
- Naming conventions
- Unnecessary complexity
- If **superpowers code-review** skill is available, use it for structured review methodology

### Agent 2: Security
Act as the `security-auditor` agent:
- Input validation at boundaries
- Injection vulnerabilities (SQL, XSS, command)
- Authentication/authorization gaps
- Secrets exposure
- OWASP Top 10 compliance
- Dependency vulnerabilities

### Agent 3: Performance
Act as the `performance-engineer` agent:
- Algorithm efficiency
- Unnecessary re-renders (React)
- N+1 queries
- Memory leaks
- Bundle size impact
- Caching opportunities

### Agent 4: Architecture
Act as the `architect-reviewer` agent:
- Consistency with existing patterns
- Coupling and cohesion
- Abstraction appropriateness
- Scalability concerns
- Breaking change detection
- For UI/frontend changes, check **ui-ux-pro-max** design system compliance if available (accessibility, responsive patterns, component conventions)

## Synthesis Phase

After all parallel agents complete, use **superpowers verification** if available to confirm critical findings with evidence, then use the **sequential-thinking skill** to integrate findings from all 4 review dimensions:

```bash
cd ~/.claude/skills/sequential-thinking && bun scripts/think.ts --reset
# Thought 1: Cross-reference — which issues appear in multiple agent reports?
# Thought 2: Prioritize — Critical (blocks merge) vs Warning vs Suggestion
# Thought 3: Resolve conflicts — do agents disagree? (e.g., perf wants caching, security flags cache risk)
# Thought 4: Pattern detection — systemic issues across multiple files?
# Thought 5: Verdict — overall quality assessment, safe to merge?
```

- **Branch** if agents disagree on a finding (e.g., `--branchId "keep-cache"` vs `--branchId "remove-cache"`)
- **Revise** priority if later analysis changes severity assessment
- Terminate with a clear verdict and structured findings

Activate for: reviews with 4+ files changed, conflicting agent recommendations, or architecturally significant changes. For small reviews (< 3 files), skip and go directly to output.

**Rebuttal protocol** (after synthesis, mandatory for reviews with 4+ Critical findings):
- For each Critical finding in the synthesized list:
  - Generate: "Why might this NOT be a problem?" with evidence
  - The original finding survives only if the reviewer can defend it with additional evidence
  - Withdrawn findings are logged: "Withdrawn after rebuttal: {finding} — Reason: {counter-evidence}"
- Skip this step for reviews with fewer than 4 Critical findings.

**Evidence hierarchy tags** — tag each surviving finding:
- **Confirmed**: Reproduced or demonstrated with a test/command
- **Analysis**: Code path analysis shows the issue exists
- **Pattern**: Heuristic pattern match (common vulnerability/bug pattern)
- **Informational**: Suggestion based on best practices, not concrete evidence

## Output Format

```
## Review Summary

### Critical Issues (must fix)
- [file:line] Description — Impact — Fix — Evidence: {confirmed|analysis|pattern|informational}

### Warnings (should fix)
- [file:line] Description — Impact — Fix — Evidence: {confirmed|analysis|pattern|informational}

### Suggestions (nice to have)
- [file:line] Description — Benefit — Evidence: {confirmed|analysis|pattern|informational}

### Positive Notes
- What was done well

### Pattern Conformance
- {PASS|FAIL}: {N deviations found}
- [file:line] Deviation from {pattern section} — {description}

### Verdict: APPROVE / REQUEST CHANGES / NEEDS DISCUSSION
```

## Post-Review: Update Cached Intel (only if code was changed during review)

If this review resulted in code changes (fixes applied, not just feedback):

1. Run `git diff --name-only` to see what changed.
2. Map changed files to intel sections (same routing table as /build).
3. Patch only affected sections in `.claude/rules/project-intel.md`.
4. Update the date line.
5. Append to `.claude/rules/.intel-changelog`:
   ```
   [timestamp] | review | [review summary] | Sections updated: [list] | Files changed: [count]
   ```
6. If review was read-only (no code changes), skip this phase entirely.
