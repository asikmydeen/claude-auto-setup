# Perl Standards

> Auto-activated when `Makefile.PL`, `cpanfile`, `dist.ini`, or `*.pm` source files detected in project.

## Coding Standards
- Start every file with `use strict;` and `use warnings;` — no exceptions
- Use Modern Perl: Moo (lightweight) or Moose (full OO) for object-oriented code
- Use `use v5.20;` or higher to enable modern features (postfix dereferencing, subroutine signatures)
- Use subroutine signatures (`use feature 'signatures'`) over manual `@_` unpacking
- Use `Path::Tiny` for file operations — not raw `open`/`close` or `File::Spec`
- Use `Try::Tiny` for exception handling — not `eval`/`$@` (which has gotchas)
- Run `perltidy` on all code — commit a `.perltidyrc` to the project
- Run `perlcritic` at severity 4 or higher in CI
- Keep subroutines under 40 lines — extract helpers when longer
- Use lexical filehandles (`open my $fh, '<', $file`) — never bareword filehandles

## Naming
- Packages/classes: `PascalCase` (`My::App::UserService`)
- Subroutines and methods: `snake_case` (`get_user_by_id`, `is_valid`)
- Variables: `snake_case` (`$user_name`, `@active_items`, `%config_map`)
- Constants: `UPPER_SNAKE_CASE` via `use constant` or `Const::Fast` (`MAX_RETRIES`)
- Private methods: leading underscore (`_validate_input`, `_build_query`)
- Boolean subroutines: `is_`, `has_`, `can_` prefix (`is_active`, `has_permission`)
- Accessors: same name as attribute (`$obj->name`, `$obj->email`)

## Error Handling
- Use `Try::Tiny` for try/catch — `eval { ... }; if ($@) { ... }` loses errors in edge cases
- Die with objects, not strings: `die My::Exception->new(message => "...", code => 404)`
- Use `Carp` for library code: `croak` (caller's perspective), `confess` (full stack trace)
- Validate input at subroutine entry — return early or die on bad data
- Never ignore return values of I/O operations: `open(...) or die "Cannot open: $!"`
- Use `autodie` pragma for automatic exception-on-failure for built-in I/O functions
- Log errors with context: module, operation, relevant variables

## Testing
- Use `Test2::V0` (modern) or `Test::More` for test assertions
- Name test files `t/{feature}.t` — one test file per module or feature
- Use `subtest` blocks to group related assertions: `subtest 'user creation' => sub { ... }`
- Use `Test::Exception` or `Test2::Tools::Exception` for testing dies/lives
- Use `Test::MockModule` or `Test::MockObject` for mocking dependencies
- Use `prove -lr t/` to run the test suite
- Use `Test::Deep` for complex data structure comparisons
- Write test descriptions that explain the expected behavior, not the assertion

## Object-Oriented Patterns (Moo/Moose)
- Use `has` declarations with types: `has name => (is => 'ro', isa => Str, required => 1)`
- Prefer `ro` (read-only) attributes — use `rw` only when mutation is needed
- Use `BUILD` for post-construction validation, `BUILDARGS` for constructor arg transformation
- Use roles (`Moo::Role`) for shared behavior — not deep inheritance
- Use type constraints from `Types::Standard`: `Str`, `Int`, `ArrayRef[Str]`, `Maybe[Int]`
- Use `lazy` + `builder` for expensive or dependent attributes

## Anti-Patterns
- Missing `use strict` or `use warnings` — must be in every file
- Bareword filehandles (`open FH, ...`) — use lexical filehandles
- Two-argument `open` (`open FH, ">$file"`) — use three-argument form
- Global variables (`our $config`) — use dependency injection or Moo attributes
- `eval`/`$@` for error handling — use `Try::Tiny` or `Syntax::Keyword::Try`
- Overuse of regular expressions for parsing structured data — use a proper parser
- `no strict 'refs'` for dynamic dispatch — use method references or dispatch tables
- Manual `@ISA` manipulation — use Moo/Moose inheritance (`extends`)
