# Java Standards

> Auto-activated when `pom.xml` or `build.gradle` detected in project.

## Coding Standards
- Target Java 17+ — use records, sealed classes, pattern matching, text blocks
- Use `record` types for DTOs and value objects — not mutable POJOs with getters/setters
- Mark classes and methods `final` by default — open only when extension is intended
- Use `Optional<T>` for return types that may be absent — never return `null` from public methods
- Use the Streams API for collection transformations — not manual loops for map/filter/reduce
- Use `var` for local variables when the type is obvious from the right-hand side
- Keep methods under 30 lines — extract helpers when longer
- Use `sealed` interfaces/classes to restrict type hierarchies
- Use `switch` expressions with pattern matching (Java 21+) for type-safe branching
- Prefer composition over inheritance — favor small interfaces and delegation

## Naming
- Classes, interfaces, enums, records: `PascalCase` (`UserService`, `OrderStatus`)
- Methods, variables, parameters: `camelCase` (`getUserById`, `isActive`)
- Constants: `UPPER_SNAKE_CASE` (`MAX_RETRY_COUNT`, `DEFAULT_TIMEOUT`)
- Packages: all lowercase, reversed domain (`com.example.auth`)
- Generic type parameters: single letter or descriptive (`T`, `K`, `V`, `E`)
- Boolean methods: `is`/`has`/`can` prefix (`isValid()`, `hasPermission()`)
- Factory methods: `of`, `from`, `create` (`List.of()`, `Instant.from()`)
- Test classes: `{ClassUnderTest}Test` (`UserServiceTest`)

## Error Handling
- Use unchecked exceptions (`RuntimeException` subclasses) for programming errors
- Use checked exceptions only for recoverable conditions the caller must handle
- Define domain exception hierarchy extending a project base exception
- Never catch `Exception` or `Throwable` broadly — catch specific types
- Include context in exception messages: `throw new UserNotFoundException("User not found: id=" + id)`
- Use try-with-resources for all `AutoCloseable` resources (streams, connections, files)
- Log exceptions with the full stack trace: `logger.error("Failed to process order", e)`
- Never use exceptions for control flow — check preconditions first

## Testing
- Use JUnit 5 (`@Test`, `@ParameterizedTest`, `@Nested`, `@DisplayName`)
- Name tests with `@DisplayName("should [behavior] when [condition]")`
- Use `@Nested` classes to group related test scenarios
- Use `@ParameterizedTest` with `@CsvSource` or `@MethodSource` for data-driven tests
- Use Mockito for mocking — `@Mock` + `@InjectMocks` with `@ExtendWith(MockitoExtension.class)`
- Use AssertJ for fluent assertions: `assertThat(result).isEqualTo(expected)`
- Separate unit tests from integration tests (`src/test/` vs `src/integrationTest/`)
- Test behavior, not implementation — avoid verifying internal method calls

## Spring Patterns (when applicable)
- Use constructor injection — not field injection with `@Autowired`
- Define beans in `@Configuration` classes — not XML
- Use `@RestController` + `@RequestMapping` for REST endpoints
- Validate request bodies with `@Valid` + Bean Validation annotations
- Use `@Transactional` at the service layer — not the repository layer
- Externalize config with `@ConfigurationProperties` — not hardcoded values

## Anti-Patterns
- Returning `null` from public methods — use `Optional<T>`
- Mutable DTOs with public fields — use `record` types
- `instanceof` chains — use sealed interfaces + pattern matching
- Catching `Exception` broadly — catch specific exception types
- Using raw types (`List` instead of `List<String>`) — always parameterize generics
- Static utility classes with mutable state — use proper service classes with DI
- Checked exceptions for non-recoverable errors — use unchecked
- Deep inheritance hierarchies — prefer composition and interfaces
