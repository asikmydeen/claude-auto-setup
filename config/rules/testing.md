# Testing Standards

## Test-First Approach
- Write or update tests before implementing features
- Run tests after every change: `brazil-build run test`
- Fix failing tests immediately — never leave them broken

## Test Structure
- Arrange-Act-Assert pattern for unit tests
- One assertion per concept (multiple assertions OK if testing same behavior)
- Descriptive test names: `should [expected behavior] when [condition]`
- Group related tests with `describe` blocks

## Coverage Expectations
- New code must have tests for happy path + key error cases
- Don't test implementation details — test behavior and outcomes
- Mock external services (AWS SDK, APIs) at the boundary
- Use factories/builders for test data, not raw objects

## Integration Tests
- Test API endpoints end-to-end where possible
- Use local DynamoDB or mocked AWS services for integration tests
- Clean up test data in afterEach/afterAll hooks

## Verification After Implementation
- Run full test suite: `brazil-build run test`
- Run linting: `brazil-build run lint` or `npx eslint .`
- Run type checking: `npx tsc --noEmit`
- Verify build succeeds: `brazil-build release`
