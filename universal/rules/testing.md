# Testing Standards

## The Iron Law: Test-Driven Development

```
NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST
```

Write the test. Watch it fail. Write minimal code to pass. Commit.

**Wrote code before the test? Delete it. Start over.**
- Don't keep it as "reference"
- Don't "adapt" it while writing tests
- Don't look at it
- Delete means delete. Implement fresh from tests.

<HARD-GATE>
Do NOT write implementation code until you have a failing test that covers the behavior you're about to implement. This applies to EVERY feature, bugfix, and behavior change regardless of perceived simplicity.
</HARD-GATE>

## Red-Green-Refactor Cycle

1. **RED** — Write a failing test for the next behavior
2. **Verify RED** — Run the test, confirm it fails for the right reason
3. **GREEN** — Write the minimum code to make the test pass
4. **Verify GREEN** — Run the test, confirm it passes (and nothing else broke)
5. **REFACTOR** — Clean up, remove duplication, improve naming
6. **COMMIT** — Small, focused commit for this cycle

## Red Flags — STOP and Start Over

If you catch yourself thinking any of these, you're rationalizing:

| Thought | Reality |
|---------|---------|
| "This is too simple to test" | Simple code breaks. The test takes 30 seconds. |
| "I'll write the test after" | Tests passing immediately prove nothing. You must see RED first. |
| "I already know the code works" | You don't. Run the test. |
| "It's just a refactor" | Refactors break things. Tests catch that. |
| "The test would be trivial" | Then it'll be fast to write. Do it. |
| "Let me just scaffold first" | Scaffold = code. Test first. |

**All of these mean: Delete the code. Write the test. Start over.**

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
- Run full test suite (detected build command)
- Run linting (detected lint command)
- Run type checking: `npx tsc --noEmit`
- Verify build succeeds (detected build command)

## Exceptions (ask the user first)
- Throwaway prototypes
- Generated/scaffolded code
- Configuration files
- One-off scripts

When in doubt: **write the test first**.
