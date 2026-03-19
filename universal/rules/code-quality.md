# Code Quality Standards

## General Principles
- Match existing code patterns before introducing new ones
- Minimal changes only — don't refactor unrelated code
- No scope creep — if you find extra work, flag it, don't do it
- Prefer simple solutions over clever abstractions

## Red Flags — STOP and Reconsider

If you catch yourself thinking any of these, pause:

| Thought | Reality |
|---------|---------|
| "Let me add this helper for later" | YAGNI. Only build what's needed now. |
| "I'll refactor this while I'm here" | Out of scope. Flag it, don't do it. |
| "This needs a proper abstraction" | Does it? Three similar lines > premature abstraction. |
| "Let me add error handling for this edge case" | Is it reachable? Only validate at system boundaries. |
| "The types aren't perfect but `any` will do" | No. Fix the types or use `unknown` + guard. |
| "I'll clean up the surrounding code too" | You weren't asked to. Ship what was requested. |

## TypeScript/React Standards
- Use strict TypeScript — no `any` types without justification
- Functional components with hooks, no class components
- Named exports over default exports
- Use existing design tokens and component library patterns
- Keep components under 200 lines; extract if larger

## Code Structure
- One responsibility per file/function
- Early returns over deep nesting
- Descriptive names — no abbreviations except well-known ones (e.g., `id`, `url`)
- Constants over magic numbers/strings

## Error Handling
- Handle errors at system boundaries (API calls, user input)
- Use typed errors where the framework supports it
- Log errors with context (what failed, what was the input)
- Never swallow errors silently

## Verification Before Completion

<HARD-GATE>
Do NOT declare a task complete until you have verified it works with evidence.
"I think it works" is not evidence. Run the tests. Check the output. Verify the behavior.
</HARD-GATE>

- Run the code / test suite — don't just read it
- Check for similar issues in the same file/module
- Verify upstream/downstream dependencies still work
- If you made a fix, reproduce the original bug to confirm it's gone
