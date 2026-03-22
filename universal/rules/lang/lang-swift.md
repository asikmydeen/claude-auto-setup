# Swift Standards

> Auto-activated when `Package.swift`, `*.xcodeproj`, or `*.xcworkspace` detected in project.

## Coding Standards
- Follow the Swift API Design Guidelines — clarity at the point of use
- Use `guard let` for early exits, `if let` for conditional binding in the middle of a function
- Prefer value types (`struct`, `enum`) over reference types (`class`) unless identity semantics are needed
- Use `async`/`await` for asynchronous operations — not completion handlers in new code
- Use `Codable` (`Encodable` + `Decodable`) for JSON serialization — not manual parsing
- Use `Result<Success, Failure>` for operations that can fail in a typed way
- Prefer protocol extensions for default implementations over base classes
- Use `@MainActor` for UI-bound code, `Sendable` for thread-safe types
- Keep functions under 30 lines — extract helpers when longer
- Use access control deliberately: `private` by default, `internal` for module, `public` for API

## Naming
- Types, protocols, enums: `PascalCase` (`UserProfile`, `Fetchable`)
- Variables, functions, parameters: `camelCase` (`userName`, `fetchData(for:)`)
- Constants: `camelCase` (not `UPPER_SNAKE` — Swift convention)
- Boolean properties: read as assertions (`isEnabled`, `hasContent`, `canDelete`)
- Protocols describing capability: `-able`/`-ible` suffix (`Equatable`, `Codable`)
- Protocols describing role: noun (`Collection`, `Delegate`)
- Enum cases: `camelCase` (`case loading`, `case completed(Data)`)
- Factory methods: `make` prefix (`makeViewController()`)

## Error Handling
- Define domain errors as `enum` conforming to `Error` and `LocalizedError`
- Use `throws` and `try` for synchronous error propagation
- Use `Result` when errors need to be stored or passed asynchronously without async/await
- Provide `errorDescription` in `LocalizedError` for user-facing messages
- Use `do`/`catch` with pattern matching on specific error cases
- Never use `try!` in production code — only in tests or provably safe contexts
- Use `try?` only when the error is genuinely ignorable

## Testing
- Use `XCTest` framework — `XCTestCase` subclasses with `test` prefix
- Name tests: `test_{behavior}_when_{condition}` (`test_fetchUser_whenNetworkFails_returnsError`)
- Use `XCTAssertEqual`, `XCTAssertThrowsError`, `XCTAssertNil` with descriptive messages
- Use `async` test methods for testing async code (Swift 5.5+)
- Create test helpers as extensions on `XCTestCase` — call `continueAfterFailure = false` for critical assertions
- Use protocol-based dependency injection for testable architecture
- Mock dependencies by conforming to protocols — not subclassing concrete types

## Concurrency
- Use structured concurrency (`async let`, `TaskGroup`) over unstructured `Task { }`
- Mark shared mutable state with `actor` isolation
- Use `@Sendable` closures for work crossing concurrency boundaries
- Avoid `nonisolated(unsafe)` unless interfacing with legacy code
- Use `AsyncSequence` and `AsyncStream` for streaming data

## Anti-Patterns
- Force unwrapping (`!`) without proof of non-nil — use `guard let` or `if let`
- `try!` and `as!` in production paths — always handle failure
- Massive view controllers — extract logic into view models or services
- Retain cycles in closures — use `[weak self]` or `[unowned self]` appropriately
- Stringly-typed APIs — use enums, protocols, or type-safe wrappers
- God protocols with 10+ requirements — break into focused protocols with composition
- Singleton abuse — prefer dependency injection
- Using `class` when `struct` would suffice — default to value semantics
