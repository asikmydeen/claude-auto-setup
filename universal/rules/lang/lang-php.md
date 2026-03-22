# PHP Standards

> Auto-activated when `composer.json` detected in project.

## Coding Standards
- Follow PSR-12 coding style — enforce with `php-cs-fixer` or `phpcs`
- Use strict types: `declare(strict_types=1);` at the top of every file
- Add type declarations to all function parameters, return types, and class properties
- Use PHP 8.1+ features: enums, readonly properties, fibers, intersection types, named arguments
- Use Composer autoloading (PSR-4) — never use `require`/`include` for class loading
- Use dependency injection — pass dependencies through constructors, not service locators
- Keep methods under 30 lines — extract helpers when longer
- Use null coalescing (`??`) and nullsafe operator (`?->`) instead of manual null checks
- Use `match` expressions over `switch` when returning values
- Use attributes (`#[Route]`, `#[ORM\Column]`) over annotations in docblocks

## Naming
- Classes, interfaces, traits, enums: `PascalCase` (`UserRepository`, `Cacheable`)
- Methods, functions, variables: `camelCase` (`getUserById`, `$isActive`)
- Constants: `UPPER_SNAKE_CASE` (`MAX_RETRIES`, `DB_HOST`)
- Namespaces: `PascalCase` matching directory structure (`App\Service\Auth`)
- Interfaces: no `I` prefix — use descriptive names (`Repository`, not `IRepository`)
- Abstract classes: `Abstract` prefix (`AbstractController`)
- Boolean variables: `is`, `has`, `can` prefix (`$isValid`, `$hasAccess`)

## Error Handling
- Use typed exceptions extending a project base exception
- Catch specific exceptions — never bare `catch (\Exception $e)` without re-throwing
- Use custom exception classes for domain errors (`UserNotFoundException`, `ValidationException`)
- Set HTTP status codes explicitly in API responses — never return 200 for errors
- Log exceptions with context: `$logger->error('Failed to create user', ['email' => $email, 'error' => $e->getMessage()])`
- Use `finally` blocks for cleanup (close connections, release locks)
- Validate input at controller level — throw before business logic

## Testing
- Use PHPUnit 10+ with attributes (`#[Test]`, `#[DataProvider]`)
- Name tests: `test_{behavior}_when_{condition}` or use `#[Test]` with descriptive method names
- Arrange-Act-Assert pattern for each test
- Use data providers for parameterized tests
- Mock dependencies with PHPUnit mocks or Mockery — mock interfaces, not concrete classes
- Use in-memory SQLite for database tests, or transactions with rollback
- Separate unit tests (`tests/Unit/`) from integration tests (`tests/Integration/`)
- Run `phpstan` or `psalm` at max level in CI

## Database
- Use prepared statements for ALL queries — never concatenate user input into SQL
- Use an ORM (Doctrine, Eloquent) or query builder — not raw PDO for application code
- Define entity/model types with proper type hints on all properties
- Use migrations for schema changes — never modify the database manually
- Use transactions for multi-step operations

## Anti-Patterns
- No `declare(strict_types=1)` — must be in every file
- Global functions or variables — use classes and dependency injection
- `@` error suppression operator — handle errors properly
- Mixed HTML and PHP logic — use templates (Blade, Twig)
- `extract()` or `compact()` — explicit variable handling is safer
- Static methods for testable logic — use instances with DI
- Dynamic code execution via string evaluation — security and readability hazard
- `require`/`include` for class loading — use Composer autoload
