# Pattern Conformance Protocol

New code MUST conform to established codebase patterns.

## Before Implementation

1. **Read `.claude/rules/codebase-patterns.md`** if it exists — it's your implementation guide.
   - Missing? Run `pattern-analyzer` agent to generate it first.
   - Stale (>30 days)? Regenerate.

2. **Match, don't invent**: Find the closest existing example and mirror it.
   - New route → match existing route's signature, validation, error handling, response format.
   - New component → match props interface, hook usage, styling approach.
   - New test → match structure, mocks, assertions from similar existing test.
   - When in doubt, grep first: `grep -r "similar_pattern" src/ --include="*.ts" | head -5`

## During Implementation

Follow the pattern spec for: file placement, naming conventions, export style, error handling, import ordering, test structure.

## Deviation Protocol

To deviate from an established pattern:
1. Identify: "I want X, but the pattern is Y."
2. Explain concretely why (not "it's better" — what problem does the old pattern cause?).
3. Show scope: how many files need to change for consistency?
4. **STOP and propose** — do NOT implement until user approves.
5. If approved: implement, update codebase-patterns.md, log in Deviation Log.
6. If rejected: follow existing pattern.

**Counts as deviation**: different error handling, new dependency over existing, changed export/import pattern, new directory structure, different test pattern.
**Not a deviation**: new file following existing naming, extending a type, new route mirroring existing ones.

## During Review

Load pattern spec → check conformance per changed file → flag non-conformance as Warnings (not Critical). Consistent violations across a PR suggest the developer didn't read the spec.

## Freshness

Regenerate on: major refactor, >30 days old with significant changes, user request (`/init`), >5 accumulated deviations.
