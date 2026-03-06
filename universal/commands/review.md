# Multi-Agent Code Review

You are running a comprehensive multi-agent code review. Launch all review agents in parallel for maximum coverage and speed.

## Target
$ARGUMENTS

If no target specified, review all uncommitted changes (`git diff` + `git diff --staged`).

## Review Agents (launch in parallel)

### Agent 1: Code Quality
Act as the `code-reviewer` agent:
- Logic correctness and edge cases
- Error handling completeness
- Code organization and readability
- DRY/SOLID compliance
- Naming conventions
- Unnecessary complexity

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

## Output Format

```
## Review Summary

### Critical Issues (must fix)
- [file:line] Description — Impact — Fix

### Warnings (should fix)
- [file:line] Description — Impact — Fix

### Suggestions (nice to have)
- [file:line] Description — Benefit

### Positive Notes
- What was done well

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
