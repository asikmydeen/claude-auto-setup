# Quick Task (Skip Full Spec)

For small, well-defined tasks that don't need multi-agent orchestration. Skip the spec ceremony and just do it.

## Input
$ARGUMENTS

## When to Use Quick Mode
- Single file change (< 50 lines)
- Clear, unambiguous task (no design decisions needed)
- Examples: rename a variable, fix a typo, add a field, update a config value, add a simple test

## When NOT to Use Quick Mode (escalate to /build)
- Multiple files involved
- Architectural decisions needed
- New feature with unclear scope
- Changes to shared types or APIs that other code depends on

## Protocol

1. **Load intel** (if exists): Read `.claude/rules/project-intel.md` for patterns. No workspace intel needed for quick tasks.

2. **Do the work**: Read the relevant file, make the change, done. No spec, no plan, no approval wait.

3. **Auto-verify**:
   - If TypeScript/JavaScript: LSP will catch type errors automatically
   - If there's a relevant test file: run it (`npx jest <file> --no-coverage` or similar)
   - If the PostToolUse lint hook caught issues: fix them

4. **Report**: One-line summary of what you changed and where.

5. **Intel update**: Skip for quick tasks (< 3 files, not worth the overhead).

## Common Quick Tasks

### Add a field to a type/interface
- Find the type definition (use intel or grep)
- Add the field
- Find all places that construct this type → update them
- Run the type checker

### Fix a typo in UI text
- Find the string (grep for the text)
- Fix it
- No test needed for string-only changes

### Update a dependency version
- Edit package.json
- Run `npm install` / `brazil-build install`
- Run tests to verify nothing broke

### Add a simple test
- Read the existing test file for the module (match patterns)
- Add the test case following the same style
- Run the test file only

### Rename a variable/function
- Use serena's rename_symbol if available
- Otherwise: find all references (grep), rename all occurrences
- Run type checker + tests
