# Pattern Conformance Protocol

Every codebase has established patterns. New code MUST conform to them unless there's a justified reason to change.

## Before Implementation (MANDATORY)

1. **Check for pattern spec**: Read `.claude/rules/codebase-patterns.md` if it exists.
   - If it exists: use it as your implementation guide. Every new file, function, component, route, and test must match the documented patterns.
   - If it doesn't exist: run the `pattern-analyzer` agent to generate it before starting work. Print: "No pattern spec found. Extracting codebase patterns first..."
   - If it's stale (>30 days or major refactor since last update): regenerate it.

2. **Match, don't invent**: When creating new code, find the closest existing example in the codebase and mirror its structure. Specifically:
   - New route/handler? Find an existing route file → match its signature, validation, error handling, response format.
   - New component? Find a similar existing component → match its props interface, hook usage, styling approach.
   - New test? Find an existing test for a similar module → match its structure, mocks, assertions.
   - New utility? Find an existing utility → match its export style, parameter patterns, error handling.
   - New type/model? Find existing types → match naming, structure, location.

3. **When in doubt, grep first**: Before writing any pattern, search the codebase:
   ```
   grep -r "similar_pattern" src/ --include="*.ts" | head -5
   ```
   Use whatever you find as your template. The codebase IS the style guide.

## During Implementation

Follow the pattern spec strictly for:

- **File placement**: Put files where the pattern spec says they go. Don't create new directories unless the feature is genuinely new.
- **Naming**: Match the casing, prefixes, suffixes used in existing files. If routes are `kebab-case.ts` and components are `PascalCase.tsx`, follow that.
- **Exports**: If the codebase uses named exports, don't use default exports. If it uses `export function init(deps)` for modules, use that pattern.
- **Error handling**: If the codebase catches errors at boundaries and logs with context, do that. Don't introduce a different error strategy.
- **Imports**: Match the ordering, grouping, and path style (relative vs absolute) used in existing files.
- **Testing**: Match the test structure, describe blocks, mock approach, and assertion library used in existing tests.

## Deviation Protocol

Sometimes patterns should change. The protocol:

1. **Identify the deviation**: "I want to do X, but the codebase pattern is Y."
2. **Explain why**: Provide a concrete reason — not "it's better" but "the existing pattern causes [problem] because [reason], and X solves it by [mechanism]."
3. **Show the scope**: How many files would need to change for consistency? Is this a one-off exception or a pattern migration?
4. **STOP and propose**: Present the deviation to the user. Do NOT implement it yet.
5. **Wait for confirmation**: Only proceed after explicit user approval.
6. **If approved**:
   - Implement the change
   - Update `.claude/rules/codebase-patterns.md` with the new pattern
   - Log the deviation in the Deviation Log section
   - If the old pattern exists in other files, note them for future migration (don't migrate without approval)
7. **If rejected**: Follow the existing pattern, even if you disagree.

### What counts as a deviation:
- Using a different error handling strategy than what exists
- Introducing a new library/dependency when an existing one covers the use case
- Changing the module export pattern (e.g., default → named)
- Creating a new directory structure that doesn't match existing conventions
- Using a different testing pattern (e.g., switching from jest to vitest patterns)
- Changing the import ordering or path resolution strategy

### What does NOT count as a deviation:
- Adding a new file in an established directory following the existing naming pattern
- Using an existing utility/helper in a new context
- Extending an existing type with new fields
- Adding a new route that mirrors existing route patterns
- Writing tests that follow the existing test structure

## During Review

When reviewing code (as code-reviewer or in review phase):

1. **Load the pattern spec**: Read `.claude/rules/codebase-patterns.md`
2. **Check conformance for each changed file**:
   - Does the file follow the documented file organization pattern?
   - Do exports match the module structure pattern?
   - Does error handling match the documented approach?
   - Do imports follow the ordering/style convention?
   - Do tests follow the documented test patterns?
3. **Flag non-conformance as "Warning"** in review output:
   ```
   **Warning**: Pattern non-conformance in `src/routes/new-route.ts`
   - Expected: handler exports via `export function initNewRoute(deps)` (see codebase-patterns.md § Module Structure)
   - Found: default export of router object
   - Fix: refactor to match the dependency injection pattern used by all other route modules
   ```
4. **Distinguish conformance issues from bugs**: Pattern violations are Warnings (should fix), not Critical (must fix). But consistent pattern violations across a PR suggest the developer didn't read the pattern spec — flag that.

## Pattern Spec Freshness

The pattern spec should be regenerated when:
- A major refactor changes fundamental patterns (new framework, new architecture)
- The spec is >30 days old and significant code has been added
- A user explicitly requests it (`/init` or `/deep-research`)
- Multiple approved deviations have accumulated (>5 in the Deviation Log)

Incremental updates happen automatically:
- After each `/build`, if the intel update phase detects pattern-relevant changes (new module patterns, new directories, new test approaches), it patches the pattern spec too.
