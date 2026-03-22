# Python Standards

> Auto-activated when `requirements.txt`, `pyproject.toml`, `setup.py`, or `Pipfile` detected in project.

## Coding Standards
- Target Python 3.10+ unless project specifies otherwise
- Add type hints to all function signatures and return types
- Use `dataclasses` for plain data containers, `Pydantic` for validated input/config
- Use f-strings for string formatting — not `%` or `.format()`
- Use `pathlib.Path` for all file system operations — not `os.path`
- Use `async`/`await` for I/O-bound operations (network, file, database)
- Keep functions under 30 lines — extract helpers when longer
- Use list/dict/set comprehensions over `map`/`filter` when readable
- Use `from __future__ import annotations` for forward references
- Prefer `Enum` for fixed sets of values over string constants

## Naming
- Variables, functions, methods: `snake_case`
- Classes: `PascalCase`
- Constants: `UPPER_SNAKE_CASE`
- Private attributes: single underscore prefix `_internal`
- Module-level dunder names: `__all__`, `__version__`
- Boolean variables: prefix with `is_`, `has_`, `can_`, `should_`
- Type aliases: `PascalCase` (`UserId = int`)

## Error Handling
- Never use bare `except:` — always catch specific exceptions
- Use custom exception classes inheriting from a project base exception
- Use `raise ... from err` to preserve exception chains
- Handle errors at boundaries — let internal errors propagate
- Use context managers (`with`) for resource cleanup (files, connections, locks)
- Log exceptions with `logger.exception()` to capture tracebacks
- Return early on validation failures — avoid deep nesting

## Testing
- Use `pytest` with fixtures — not `unittest.TestCase`
- Name test files `test_{module}.py`, test functions `test_{behavior}_when_{condition}`
- Use `@pytest.fixture` for setup/teardown, scope appropriately (`function`, `module`, `session`)
- Use `pytest.raises` for exception assertions with `match=` for message validation
- Use `pytest.mark.parametrize` for data-driven tests
- Mock external services with `unittest.mock.patch` at the boundary
- Use `conftest.py` for shared fixtures — do not import fixtures across test directories
- Use `tmp_path` fixture for filesystem tests

## Project Structure
- Use `src/` layout for installable packages
- One class per file for large classes, related small classes can share a file
- Group by feature, not by type (not `models/`, `views/`, `controllers/`)
- Use `__init__.py` to define public API — keep it minimal
- Pin dependencies in `requirements.txt` or `pyproject.toml` lock file

## Anti-Patterns
- Bare `except:` or `except Exception:` without re-raising
- Mutable default arguments (`def foo(items=[])`) — use `None` + conditional
- Global mutable state — use dependency injection or module-level constants
- `os.path` when `pathlib` is available
- String concatenation in loops — use `join()` or f-strings
- `import *` — always import specific names
- Type: ignore comments without explanation — fix the type error
- Nested functions more than 2 levels deep — extract to module level
