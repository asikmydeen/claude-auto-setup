# Go Standards

> Auto-activated when `go.mod` detected in project.

## Coding Standards
- Run `gofmt` and `go vet` on all code — non-negotiable
- Accept interfaces, return structs — keeps dependencies narrow
- Pass `context.Context` as the first parameter to functions that do I/O or may be cancelled
- Use `errors.Is` and `errors.As` for error checking — not string comparison
- Wrap errors with `fmt.Errorf("context: %w", err)` to preserve the chain
- Keep functions under 40 lines — extract helpers when longer
- Use goroutines + channels for concurrency — not shared mutable state with mutexes unless necessary
- Use `sync.WaitGroup` for fan-out/fan-in patterns
- Prefer table-driven tests for multiple input/output scenarios
- Use `defer` for cleanup (close files, unlock mutexes) immediately after acquisition

## Naming
- Packages: short, lowercase, single word (`http`, `user`, `auth`) — no underscores or camelCase
- Exported names: `PascalCase` (`HandleRequest`, `UserService`)
- Unexported names: `camelCase` (`parseToken`, `dbConn`)
- Interfaces: verb or `-er` suffix (`Reader`, `Validator`, `Authenticator`)
- Receivers: one or two letter abbreviation of type (`func (u *User) Name()`)
- Acronyms: all caps (`ID`, `HTTP`, `URL`) — not `Id`, `Http`
- Test functions: `Test{Function}_{Scenario}` (`TestParse_EmptyInput`)

## Error Handling
- Always check returned errors — never use `_` to discard them
- Return errors as the last return value
- Wrap with context: `fmt.Errorf("failed to create user %s: %w", name, err)`
- Define sentinel errors with `var ErrNotFound = errors.New("not found")`
- Use custom error types implementing `error` interface for rich error information
- Log errors at the top of the call stack — not at every level
- Never panic in library code — reserve `panic` for truly unrecoverable programmer errors

## Testing
- Use table-driven tests with `[]struct{ name string; ... }` slices
- Name subtests descriptively: `t.Run("returns error when input is empty", ...)`
- Use `testify/assert` or `testify/require` for cleaner assertions — or stdlib `if got != want`
- Use `httptest.NewServer` for HTTP handler tests
- Use `t.Helper()` in test helper functions for correct line reporting
- Use `t.Parallel()` for independent tests to speed up the suite
- Use `t.Cleanup()` for teardown instead of `defer` when cleanup must survive subtests
- Mock interfaces — not concrete types

## Project Structure
- `cmd/{appname}/main.go` — entry points (thin, just wiring)
- `internal/` — private packages not importable by other modules
- `pkg/` — public reusable packages (use sparingly)
- One package per directory — package name matches directory name
- Keep `main.go` under 50 lines — delegate to internal packages

## Anti-Patterns
- Returning `interface{}` / `any` when a concrete type is known
- Using `init()` functions — prefer explicit initialization
- Ignoring errors with `_` — always handle or propagate
- Channel leaks — ensure goroutines can always exit
- Using `panic`/`recover` for control flow
- Package-level mutable variables — use constructor functions with options
- `sync.Mutex` when channels would be clearer
- Deep package nesting — keep the hierarchy flat
