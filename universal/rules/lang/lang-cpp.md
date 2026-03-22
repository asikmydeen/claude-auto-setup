# C++ Standards

> Auto-activated when `CMakeLists.txt`, `*.cpp`, or `*.hpp` detected in project.

## Coding Standards
- Target C++17 minimum, prefer C++20 features (concepts, ranges, coroutines) when available
- Use RAII for all resource management — acquire in constructor, release in destructor
- Use smart pointers (`std::unique_ptr`, `std::shared_ptr`) — never raw `new`/`delete`
- Use `const` everywhere: parameters, member functions, local variables, return types
- Use `auto` for local variables when the type is obvious or long
- Compile with `-Wall -Wextra -Werror` (GCC/Clang) or `/W4 /WX` (MSVC)
- Use `std::string_view` for non-owning string references — not `const char*` or `const std::string&`
- Use `std::optional<T>` for values that may be absent — not sentinel values or raw pointers
- Use `std::variant` over `union` for type-safe tagged unions
- Use `[[nodiscard]]` on functions whose return values must not be ignored
- Keep headers minimal — forward declare when possible, include only in `.cpp` files

## Naming
- Types, classes, structs, enums: `PascalCase` (`UserManager`, `ConnectionState`)
- Functions, methods: `camelCase` or `snake_case` — match the project convention, be consistent
- Variables, parameters: `camelCase` or `snake_case` — match functions
- Constants and enum values: `kPascalCase` or `UPPER_SNAKE_CASE` (match project)
- Private members: trailing underscore (`count_`, `name_`) or `m_` prefix (match project)
- Namespaces: `lowercase` (`network`, `utils`)
- Template parameters: `PascalCase` (`typename Container`, `typename T`)
- Macros (avoid if possible): `UPPER_SNAKE_CASE` (`MAX_BUFFER_SIZE`)

## Error Handling
- Use exceptions for truly exceptional conditions — not for control flow
- Use `std::expected` (C++23) or a `Result<T, E>` type for expected failures
- Use `noexcept` on functions that must not throw (move constructors, destructors, swap)
- Catch exceptions by `const` reference: `catch (const std::exception& e)`
- Never throw from destructors — use `noexcept` on destructors (implicit in C++11+)
- Use RAII to guarantee cleanup — never rely on manual `try`/`catch` for resource release
- Validate preconditions with assertions in debug builds: `assert(ptr != nullptr)`

## Testing
- Use Google Test (`gtest`) or Catch2 as the test framework
- Name tests: `TEST(SuiteName, DescriptiveBehavior)` or `TEST_F` for fixture-based tests
- Use `EXPECT_EQ`, `EXPECT_TRUE`, `EXPECT_THROW` — use `ASSERT_*` only when continuation is meaningless
- Use test fixtures (`::testing::Test`) for shared setup/teardown
- Use parameterized tests (`INSTANTIATE_TEST_SUITE_P`) for data-driven testing
- Use Google Mock or custom fakes for dependency injection
- Keep test binaries separate from production binaries in CMake

## Move Semantics
- Implement move constructor and move assignment for resource-owning types
- Use `std::move` when transferring ownership — never use a moved-from object afterward
- Mark moved-from state as valid but unspecified — document it
- Use `= default` for move operations when the compiler-generated version is correct
- Follow the Rule of Five: if you define any of destructor/copy/move, define all five

## Anti-Patterns
- Raw `new`/`delete` — use smart pointers or containers
- `const_cast` to remove constness — redesign the interface instead
- `reinterpret_cast` without a documented safety justification
- Raw C arrays — use `std::array` (fixed) or `std::vector` (dynamic)
- `#define` for constants — use `constexpr` variables
- Macros for functions — use `inline` functions or templates
- `using namespace std;` in headers — pollutes the global namespace
- Deep inheritance hierarchies — prefer composition and templates
- `void*` for type erasure — use `std::any`, `std::variant`, or templates
