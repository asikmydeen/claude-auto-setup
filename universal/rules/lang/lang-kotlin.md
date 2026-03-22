# Kotlin Standards

> Auto-activated when `build.gradle.kts` or `*.kt` source files detected in project.

## Coding Standards
- Use Kotlin idioms — write Kotlin, not Java-in-Kotlin
- Use `data class` for DTOs and value objects — auto-generates `equals`, `hashCode`, `copy`, `toString`
- Use `sealed class`/`sealed interface` for restricted type hierarchies with exhaustive `when`
- Use coroutines (`suspend`, `async`, `launch`) for async — not callbacks or RxJava in new code
- Use `when` expressions exhaustively — compiler enforces all branches for sealed types
- Use extension functions to add behavior without inheritance
- Prefer immutable collections (`listOf`, `mapOf`) — use mutable variants only when building
- Use `val` by default — `var` only when mutation is genuinely needed
- Use scope functions appropriately: `let` (null check), `apply` (configure), `also` (side effect), `run` (transform)
- Use `object` declarations for singletons — not manual getInstance patterns

## Naming
- Classes, interfaces, objects, enums: `PascalCase` (`UserRepository`, `OrderStatus`)
- Functions, properties, variables: `camelCase` (`getUserById`, `isActive`)
- Constants: `UPPER_SNAKE_CASE` in companion objects (`const val MAX_RETRIES = 3`)
- Packages: all lowercase (`com.example.auth`)
- Backing properties: underscore prefix (`private val _items = MutableStateFlow(...)`, `val items = _items.asStateFlow()`)
- Test functions: backtick-quoted descriptive names (`` `should return error when input is empty` ``)

## Null Safety
- Leverage the type system — `String` vs `String?` is your first line of defense
- Use `?.` safe call operator for chained access on nullable types
- Use `?:` Elvis operator for defaults: `val name = input ?: "unknown"`
- Never use `!!` (non-null assertion) unless you can prove non-null — prefer `requireNotNull` with message
- Use `let` for null-conditional blocks: `value?.let { process(it) }`
- Platform types from Java: annotate or assign to typed variable immediately

## Error Handling
- Use sealed class hierarchies for domain results: `sealed class Result<out T>`
- Use `runCatching` for operations that may throw — converts to `Result<T>`
- Use `require` and `check` for preconditions (throw `IllegalArgumentException`/`IllegalStateException`)
- Handle coroutine exceptions with `CoroutineExceptionHandler` or `supervisorScope`
- Catch specific exceptions — never bare `catch (e: Exception)` without re-throwing
- Use `use` extension for `Closeable` resources (Kotlin equivalent of try-with-resources)

## Testing
- Use JUnit 5 or Kotest as the test framework
- Backtick-quoted test names for readability: `` @Test fun `parses valid input correctly`() ``
- Use `@Nested` classes (JUnit 5) or Kotest specs for grouping
- Use MockK for Kotlin-native mocking: `mockk<UserRepository>()`, `every { ... } returns ...`
- Use `coEvery`/`coVerify` from MockK for coroutine-based mocks
- Use `runTest` from `kotlinx-coroutines-test` for testing suspend functions
- Use Kotest matchers for readable assertions: `result shouldBe expected`

## Coroutines
- Use structured concurrency — launch coroutines in a `CoroutineScope`, never `GlobalScope`
- Use `withContext(Dispatchers.IO)` for blocking I/O, `Dispatchers.Default` for CPU work
- Use `Flow<T>` for reactive streams — prefer over `Channel` for most cases
- Use `StateFlow` and `SharedFlow` for state management in ViewModels
- Cancel coroutines properly — respect `isActive` in long-running loops
- Use `supervisorScope` when child failure should not cancel siblings

## Anti-Patterns
- `!!` operator without proof of non-null — use `requireNotNull` or safe alternatives
- Java-style getters/setters — use Kotlin properties
- `companion object` as a dumping ground — keep it focused on factory methods and constants
- `var` for properties that should be `val` — default to immutability
- Ignoring coroutine cancellation — always check `isActive` or use cancellable functions
- `when` without exhaustive branches on sealed types — let the compiler enforce completeness
- Nested `let`/`apply`/`run` chains — extract to named variables for readability
- Using Java collections API when Kotlin stdlib equivalents exist
