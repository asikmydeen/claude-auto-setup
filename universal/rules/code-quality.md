# Code Quality Standards

## General Principles
- Match existing code patterns before introducing new ones
- Minimal changes only — don't refactor unrelated code
- No scope creep — if you find extra work, flag it, don't do it
- Prefer simple solutions over clever abstractions

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
