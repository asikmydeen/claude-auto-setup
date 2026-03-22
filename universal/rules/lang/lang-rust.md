# Rust Standards

> Auto-activated when `Cargo.toml` detected in project.

## Coding Standards
- Run `cargo clippy` with no warnings — treat clippy lints as errors in CI
- Use `Result<T, E>` for recoverable errors, `Option<T>` for optional values — never panic in library code
- Use `?` operator for error propagation — not manual `match` on every `Result`
- Use `derive` macros for common traits: `#[derive(Debug, Clone, PartialEq)]`
- Prefer trait-based abstractions for polymorphism over enum dispatch when extensibility is needed
- Use `impl Trait` in argument position for simple generics, named generics for complex bounds
- Annotate lifetimes explicitly when the compiler cannot elide them — prefer `'_` when unambiguous
- Use `match` exhaustively — avoid wildcard `_` catch-all when variants may be added
- Keep `unsafe` blocks as small as possible with a `// SAFETY:` comment explaining the invariant
- Use `#[must_use]` on functions returning values that should not be ignored

## Naming
- Types, traits, enums: `PascalCase` (`HttpClient`, `ParseError`)
- Functions, methods, variables: `snake_case` (`parse_input`, `user_count`)
- Constants and statics: `UPPER_SNAKE_CASE` (`MAX_RETRIES`, `DEFAULT_TIMEOUT`)
- Modules and crates: `snake_case` (`my_crate`, `error_handling`)
- Lifetime parameters: short lowercase (`'a`, `'ctx`)
- Type parameters: single uppercase or descriptive (`T`, `K`, `V`, `Item`)

## Error Handling
- Define a crate-level `Error` enum implementing `std::error::Error` and `Display`
- Use `thiserror` for library error types, `anyhow` for application-level errors
- Wrap underlying errors with `#[from]` attribute in thiserror enums
- Never use `.unwrap()` or `.expect()` in production code — only in tests and infallible cases
- Use `map_err` to add context when converting between error types
- Return `Result` from `main()` for clean error reporting

## Testing
- Place unit tests in `#[cfg(test)] mod tests` at the bottom of each module
- Integration tests go in `tests/` directory at crate root
- Name test functions descriptively: `fn parses_empty_input_as_none()`
- Use `assert_eq!`, `assert_ne!`, `assert!(condition, "message")` with context messages
- Use `#[should_panic(expected = "...")]` for panic-testing
- Use `proptest` or `quickcheck` for property-based testing on core logic
- Use `mockall` for trait mocking when dependency injection is needed

## Ownership Patterns
- Prefer borrowing (`&T`, `&mut T`) over ownership transfer when the caller needs the value after
- Use `Clone` only when shared ownership is genuinely needed — not as an escape hatch
- Use `Cow<'a, T>` when a function may or may not need to own its data
- Use `Arc<T>` for shared ownership across threads, `Rc<T>` for single-threaded sharing
- Prefer `Vec<T>` over `Box<[T]>` unless the size is truly fixed
- Pass `&str` not `&String`, `&[T]` not `&Vec<T>` in function parameters

## Anti-Patterns
- `.unwrap()` in non-test code without a `// SAFETY:` or infallibility proof
- `.clone()` to silence the borrow checker — restructure ownership instead
- Wildcard `_` in `match` when enum variants may grow — match explicitly
- `String` in struct fields when `&str` with a lifetime would suffice
- Nested `Result<Result<T, E1>, E2>` — flatten with a unified error type
- Large `unsafe` blocks — minimize scope, document invariants
- Using `Box<dyn Trait>` when generics or `impl Trait` would avoid allocation
- Ignoring compiler warnings — fix them or explicitly allow with justification
