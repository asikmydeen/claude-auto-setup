# TypeScript Standards

> Auto-activated when `tsconfig.json` or `package.json` detected in project.

## Coding Standards
- Enable `strict: true` in tsconfig — no exceptions
- Never use `any` — use `unknown` with type guards, generics, or explicit interfaces
- Prefer `interface` for object shapes, `type` for unions/intersections/mapped types
- Use `type` imports: `import type { Foo } from "./bar"`
- Use discriminated unions for state modeling (`type Result = { ok: true; data: T } | { ok: false; error: Error }`)
- Exhaustive switch statements — add `default: { const _: never = value; throw new Error("..."); }`
- Named exports only — no default exports
- Use `readonly` for properties that should not be mutated after construction
- Prefer `const` assertions for literal types: `as const`
- Use template literal types for string patterns where appropriate

## Naming
- Variables and functions: `camelCase`
- Types, interfaces, enums, classes: `PascalCase`
- Constants: `UPPER_SNAKE_CASE`
- Generic type parameters: single uppercase letter or descriptive PascalCase (`T`, `TResult`)
- Boolean variables: prefix with `is`, `has`, `should`, `can` (`isActive`, `hasPermission`)
- React components: `PascalCase` matching filename
- React hooks: `use` prefix (`useAuth`, `useDocumentTitle`)

## Error Handling
- Use typed error classes extending `Error` for domain errors
- Handle errors at system boundaries (API calls, user input, file I/O)
- Never swallow errors with empty catch blocks
- Return `Result` types or throw — pick one pattern per codebase and be consistent
- Use `instanceof` checks for typed error handling in catch blocks
- Log errors with context: what operation failed, what input caused it

## Testing
- Use `describe` / `it` blocks with descriptive names: `should [behavior] when [condition]`
- Arrange-Act-Assert pattern for each test
- Mock external dependencies at the boundary — not internal modules
- Use factory functions for test data, not raw object literals
- Type-check test files — do not exclude them from tsconfig
- Prefer `toEqual` for objects, `toBe` for primitives, `toThrow` for errors

## React Patterns
- Functional components with hooks — no class components
- Props interface defined above component: `interface FooProps { ... }`
- Hook ordering: `useState` > `useRef` > `useQuery` > `useCallback` > `useMemo` > `useEffect`
- Memoize callbacks passed to children with `useCallback`
- Extract custom hooks when logic is reused or component exceeds 200 lines
- Never call hooks conditionally or inside loops

## Anti-Patterns
- `any` type without explicit justification comment
- `@ts-ignore` or `@ts-expect-error` — fix the type error instead
- Default exports — use named exports everywhere
- Non-null assertion (`!`) as a shortcut — use proper null checks
- Enum with string values when a union type suffices
- Nested ternaries — use early returns or `if`/`else`
- `as` type assertions to bypass the type system — narrow with guards instead
- Barrel files (`index.ts` re-exporting everything) in large modules — causes bundle bloat
