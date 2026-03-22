# Community Integrations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate 4 community repos (ui-ux-pro-max-skill, everything-claude-code, awesome-claude-code, kepano-obsidian) into the claude-auto-setup system via hybrid approach — plugin where designed, vendored where selective.

**Architecture:** Plugin install for ui-ux-pro-max-skill. Vendored language rules + agent + commands from everything-claude-code. New `/discover` command for awesome-claude-code. Vault structure update for kepano-obsidian overseer boards. Fleet containers gain plugin + settings.json mounts.

**Tech Stack:** Bash 3.2+ (shell scripts), TypeScript (fleet/container.ts, overseer/*.ts), Markdown (agents, commands, rules)

**Spec:** `docs/superpowers/specs/2026-03-21-community-integrations-design.md`

---

## File Structure

### New files (14)
```
lib/lang-detect.sh                                    # Language detection library
universal/rules/lang/lang-typescript.md                # TypeScript coding standards
universal/rules/lang/lang-python.md                    # Python coding standards
universal/rules/lang/lang-go.md                        # Go coding standards
universal/rules/lang/lang-rust.md                      # Rust coding standards
universal/rules/lang/lang-swift.md                     # Swift coding standards
universal/rules/lang/lang-php.md                       # PHP coding standards
universal/rules/lang/lang-java.md                      # Java coding standards
universal/rules/lang/lang-kotlin.md                    # Kotlin coding standards
universal/rules/lang/lang-cpp.md                       # C++ coding standards
universal/rules/lang/lang-perl.md                      # Perl coding standards
agents/claude-code/agents/build-error-resolver.md      # Build error agent
universal/commands/security-scan.md                    # Security scan command
universal/commands/discover.md                         # Community tool discovery command
```

### Edited files (8)
```
agents/claude-code/adapter.sh                          # Plugin array + lang rules install
project-init.sh                                        # Language detection + rule symlinks
install.sh                                             # Community plugin install section
fleet/container.ts                                     # Plugin + settings.json mounts
overseer/board.ts                                      # Vault directory structure
overseer/knowledge.ts                                  # exportToVault()
overseer/overseer.ts                                   # Move research docs to References/
universal/rules/orchestration.md                       # Reference build-error-resolver
```

---

## Task 1: Language Detection Library

**Files:**
- Create: `lib/lang-detect.sh`

- [ ] **Step 1: Create lang-detect.sh**

```bash
#!/usr/bin/env bash
# Language detection for project-scoped rule activation
# Source this from project-init.sh or other scripts
# Compatible with Bash 3.2+ (no associative arrays)

detect_project_languages() {
  local dir="${1:-.}"
  local langs=""

  # TypeScript / JavaScript
  if [ -f "$dir/tsconfig.json" ] || [ -f "$dir/package.json" ]; then
    langs="$langs typescript"
  fi

  # Python
  if [ -f "$dir/requirements.txt" ] || [ -f "$dir/pyproject.toml" ] || [ -f "$dir/setup.py" ] || [ -f "$dir/Pipfile" ]; then
    langs="$langs python"
  fi

  # Go
  if [ -f "$dir/go.mod" ]; then
    langs="$langs go"
  fi

  # Rust
  if [ -f "$dir/Cargo.toml" ]; then
    langs="$langs rust"
  fi

  # Swift
  if [ -f "$dir/Package.swift" ] || [ -f "$dir/.swiftpm" ]; then
    langs="$langs swift"
  fi

  # PHP
  if [ -f "$dir/composer.json" ]; then
    langs="$langs php"
  fi

  # Java
  if [ -f "$dir/pom.xml" ] || [ -f "$dir/build.gradle" ]; then
    langs="$langs java"
  fi

  # Kotlin (check .kts or .kt files alongside Java markers)
  if [ -f "$dir/build.gradle.kts" ] || find "$dir/src" -maxdepth 3 -name "*.kt" -print -quit 2>/dev/null | grep -q .; then
    langs="$langs kotlin"
  fi

  # C++
  if [ -f "$dir/CMakeLists.txt" ] || [ -f "$dir/Makefile" ] && find "$dir" -maxdepth 2 -name "*.cpp" -o -name "*.hpp" -print -quit 2>/dev/null | grep -q .; then
    langs="$langs cpp"
  fi

  # Perl
  if [ -f "$dir/Makefile.PL" ] || [ -f "$dir/cpanfile" ] || find "$dir" -maxdepth 2 -name "*.pl" -o -name "*.pm" -print -quit 2>/dev/null | grep -q .; then
    langs="$langs perl"
  fi

  # Trim leading space
  echo "$langs" | sed 's/^ //'
}

# Activate language rules for a project directory
activate_language_rules() {
  local project_dir="${1:-.}"
  local rules_staging="$HOME/.claude/rules/lang"
  local detected
  detected=$(detect_project_languages "$project_dir")

  if [ -z "$detected" ]; then
    return 0
  fi

  mkdir -p "$project_dir/.claude/rules"
  local activated=0
  for lang in $detected; do
    local rule_file="$rules_staging/lang-${lang}.md"
    if [ -f "$rule_file" ]; then
      ln -sf "$rule_file" "$project_dir/.claude/rules/lang-${lang}.md" 2>/dev/null || \
        \cp -f "$rule_file" "$project_dir/.claude/rules/lang-${lang}.md"
      activated=$((activated + 1))
    fi
  done
  echo "$detected"
}
```

- [ ] **Step 2: Verify it passes shellcheck**

Run: `shellcheck -S error lib/lang-detect.sh`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add lib/lang-detect.sh
git commit -m "feat: add language detection library for project-scoped rules"
```

---

## Task 2: Language Rule Files (10 files)

**Files:**
- Create: `universal/rules/lang/lang-typescript.md`
- Create: `universal/rules/lang/lang-python.md`
- Create: `universal/rules/lang/lang-go.md`
- Create: `universal/rules/lang/lang-rust.md`
- Create: `universal/rules/lang/lang-swift.md`
- Create: `universal/rules/lang/lang-php.md`
- Create: `universal/rules/lang/lang-java.md`
- Create: `universal/rules/lang/lang-kotlin.md`
- Create: `universal/rules/lang/lang-cpp.md`
- Create: `universal/rules/lang/lang-perl.md`

Each file follows this structure (adapted from `affaan-m/everything-claude-code` language rules, formatted to match our `universal/rules/*.md` pattern — H1 title, H2 sections, bullet points, imperative mood):

- [ ] **Step 1: Create directory**

Run: `mkdir -p universal/rules/lang`

- [ ] **Step 2: Create lang-typescript.md**

Reference: Fetch `https://github.com/affaan-m/everything-claude-code` for their TypeScript rules. Adapt to our format:

```markdown
# TypeScript Standards

> Auto-activated when tsconfig.json or package.json detected in project.

## Coding Standards
- Use strict TypeScript — enable `strict: true` in tsconfig
- No `any` types without explicit justification comment
- Prefer `unknown` over `any` — use type guards for narrowing
- Use discriminated unions over type assertions
- Prefer `interface` for object shapes, `type` for unions/intersections
- Use `readonly` for immutable properties
- Exhaustive switch checks with `never` type

## Naming
- Interfaces: PascalCase, no `I` prefix (`UserProfile`, not `IUserProfile`)
- Types: PascalCase (`CreateUserInput`)
- Enums: PascalCase members (`Color.DarkBlue`)
- Constants: UPPER_SNAKE for true constants, camelCase for derived values
- Generics: Descriptive (`TItem`, `TResponse`), not single letters except simple cases

## Imports
- Prefer named imports over default imports
- Group: stdlib → external → internal → types
- Use `type` imports: `import type { User } from './types'`
- Use path aliases (`@/`) when configured

## Functions
- Prefer explicit return types on exported functions
- Use arrow functions for callbacks, function declarations for hoisting
- Max 3 parameters — use options object beyond that
- Default parameters over optional + fallback

## Error Handling
- Use typed errors extending Error class
- Never catch and ignore — at minimum log
- Use Result/Either pattern for expected failures
- Validate at system boundaries, trust internal types

## Testing
- Use describe/it blocks with descriptive names
- One assertion concept per test (multiple asserts OK if same behavior)
- Mock external boundaries (APIs, DB), not internal modules
- Use factory functions for test data, not raw objects
- Prefer `toEqual` for objects, `toBe` for primitives

## React (when applicable)
- Functional components with hooks, no class components
- Props interface co-located with component
- Custom hooks: `use{Name}` returning object
- Prefer `useCallback`/`useMemo` for referential stability
- Keys: stable IDs, never array index for dynamic lists

## Anti-Patterns
- `as` type assertions (prefer type guards)
- Non-null assertion `!` (check for null explicitly)
- `enum` with string values (use `const` objects with `as const`)
- Barrel files re-exporting everything (causes circular deps)
- `@ts-ignore` / `@ts-expect-error` (fix the type error)
```

- [ ] **Step 3: Create lang-python.md**

```markdown
# Python Standards

> Auto-activated when requirements.txt, pyproject.toml, setup.py, or Pipfile detected.

## Coding Standards
- Python 3.10+ unless project specifies otherwise
- Use type hints on all function signatures
- Use dataclasses or Pydantic models for structured data
- Prefer f-strings over .format() or % formatting
- Use pathlib over os.path for file operations
- Use `from __future__ import annotations` for forward refs

## Naming
- Functions/variables: snake_case
- Classes: PascalCase
- Constants: UPPER_SNAKE_CASE
- Private: single underscore prefix `_internal`
- Module-level dunder: `__all__` for public API

## Imports
- Group: stdlib → third-party → local
- One import per line for `from` imports with 3+ names
- Absolute imports preferred over relative
- Never `from module import *`

## Functions
- Max 5 parameters — use dataclass/TypedDict beyond that
- Use `*` to force keyword arguments: `def f(*, name: str)`
- Document with docstrings (Google or NumPy style, match project)
- Generator functions for large sequences (`yield` over list accumulation)

## Error Handling
- Catch specific exceptions, never bare `except:`
- Use `contextlib.suppress()` for expected-and-ignorable exceptions
- Custom exceptions inherit from project base exception
- Use `logging` module, not print statements

## Testing
- pytest over unittest
- Fixtures for shared setup, parametrize for variants
- Name: `test_{behavior}_when_{condition}`
- Use `tmp_path` fixture for file tests
- Mock external services at boundary (httpx, boto3)
- Use `freezegun` or `time_machine` for time-dependent tests

## Async
- Use `asyncio` with `async/await` (not threading for I/O)
- `asyncio.gather()` for concurrent operations
- Use `anyio` or `trio` if project prefers structured concurrency
- Never mix sync and async without `run_in_executor`

## Anti-Patterns
- Mutable default arguments (`def f(items=[]`)
- Global state mutation
- Catching `Exception` instead of specific types
- Using `type()` for type checking (use `isinstance()`)
- `import *` from any module
```

- [ ] **Step 4: Create lang-go.md**

```markdown
# Go Standards

> Auto-activated when go.mod detected.

## Coding Standards
- Follow Effective Go and Go Code Review Comments
- Use `gofmt` / `goimports` — non-negotiable
- Exported names have doc comments starting with the name
- Keep functions short — extract when > 30 lines
- Accept interfaces, return structs

## Naming
- Packages: short, lowercase, no underscores (`httputil`, not `http_util`)
- Interfaces: method name + "er" (`Reader`, `Stringer`)
- Acronyms: all caps (`HTTPServer`, `XMLParser`)
- Local variables: short names in small scopes (`i`, `n`, `err`)

## Error Handling
- Always check errors — no `_` for error returns
- Wrap errors with context: `fmt.Errorf("open config: %w", err)`
- Use sentinel errors (`var ErrNotFound = errors.New(...)`) for expected cases
- Use custom error types for errors needing metadata
- Errors are values — handle, don't panic

## Concurrency
- Don't communicate by sharing memory; share memory by communicating
- Use channels for coordination, mutexes for simple state protection
- Always use `context.Context` for cancellation/timeout
- `errgroup` for parallel operations with error collection
- Never start goroutines without a way to stop them

## Testing
- Table-driven tests with `t.Run()` subtests
- Test file: `foo_test.go` in same package
- Use `testify/assert` or stdlib `testing` — match project convention
- Benchmarks with `b.ResetTimer()` for setup exclusion
- Use `t.Helper()` in test helper functions
- `httptest` for HTTP handler tests

## Project Structure
- `cmd/` for entry points, `internal/` for private packages
- `pkg/` only if explicitly providing library API
- Flat package structure preferred over deep nesting
- One package per directory

## Anti-Patterns
- Returning concrete types from constructors when interface would work
- `init()` functions (explicit initialization preferred)
- Package-level variables (prefer dependency injection)
- Goroutine leaks (no lifecycle management)
- `interface{}` / `any` when specific types are known
```

- [ ] **Step 5: Create remaining 7 language rule files**

Create `lang-rust.md`, `lang-swift.md`, `lang-php.md`, `lang-java.md`, `lang-kotlin.md`, `lang-cpp.md`, `lang-perl.md` following the same pattern. Each should cover:
- Coding standards (language idioms, style)
- Naming conventions
- Error handling (Result vs exceptions, etc.)
- Testing patterns (framework, structure, mocking)
- Anti-patterns to avoid
- Import/module conventions

Reference: Fetch `https://github.com/affaan-m/everything-claude-code` for their language-specific rules content. Adapt to our markdown format (H1 title, H2 sections, bullet points).

Each file should:
- Start with `# {Language} Standards`
- Have auto-activation note: `> Auto-activated when {marker files} detected.`
- Be 50-80 lines (concise, not exhaustive)
- Focus on actionable rules, not tutorials

- [ ] **Step 6: Verify all files created**

Run: `ls -la universal/rules/lang/ | wc -l`
Expected: 11 (10 files + directory entry)

- [ ] **Step 7: Commit**

```bash
git add universal/rules/lang/
git commit -m "feat: add 10 language-specific rule sets (vendored from everything-claude-code)"
```

---

## Task 3: Build-Error-Resolver Agent

**Files:**
- Create: `agents/claude-code/agents/build-error-resolver.md`

- [ ] **Step 1: Create agent definition**

Follow the pattern from `agents/claude-code/agents/debugger.md` (YAML frontmatter + markdown body):

```markdown
---
name: build-error-resolver
description: Resolves build, compilation, and bundler errors. Use when builds fail and you need systematic resolution.
tools: Read, Edit, Bash, Grep, Glob, Write
model: sonnet
memory: user
maxTurns: 20
---

You are an expert build engineer specializing in resolving compilation errors, bundler failures, dependency issues, and configuration problems across all build systems.

Sequential thinking (for complex build failures):
When facing cascading errors or unclear root causes, use the sequential-thinking skill:
```bash
cd ~/.claude/skills/sequential-thinking && bun scripts/think.ts --reset
cd ~/.claude/skills/sequential-thinking && bun scripts/think.ts \
  --thought "Build failure category: ..." --thoughtNumber 1 --totalThoughts 4 --nextThoughtNeeded true
```
- Use `--isRevision` when a fix attempt doesn't resolve the error
- Use `--branchFromThought` to explore multiple potential causes

When invoked:
1. Read the FULL build output — not just the first error
2. Categorize the failure type
3. Fix root cause, verify with rebuild
4. Report what broke and why

Error categories and resolution strategies:

**Dependency errors** (missing module, version conflict):
- Run the project's install command (`npm install`, `pip install -r requirements.txt`, `cargo fetch`, `go mod tidy`)
- Check lock file consistency (package-lock.json, Cargo.lock, go.sum)
- If version conflict: check which dependency pulled the conflicting version (`npm ls <pkg>`, `pip show <pkg>`)

**Type errors** (TypeScript, Rust, Go):
- Read the exact file:line from error output
- Read 50 lines of context around the failure
- Check if it's a genuine bug or a missing type definition
- Fix the type, not the symptom (no `@ts-ignore`, no `as any`, no `unsafe`)

**Import/module errors** (cannot find module, unresolved import):
- Verify the file exists at the expected path
- Check for case sensitivity issues (macOS vs Linux)
- Check tsconfig paths, module resolution settings
- Verify the export exists in the source module

**Configuration errors** (webpack, vite, esbuild, cargo, cmake):
- Read the config file referenced in the error
- Check project-intel.md for build system details
- Compare against working config patterns for that build system

**Bundler errors** (chunk size, circular deps, loader issues):
- Identify the problematic import chain
- Check for circular dependencies (`madge --circular`)
- Verify loaders/plugins are configured for the file type

Resolution protocol:
- Fix ONE error at a time, rebuild, check if cascading errors resolve
- After 2nd failed fix: step back, re-read ALL errors, look for the root cause (often the last error, not the first)
- After 3rd failed fix: check git diff to see what changed recently, compare against last working build
- Never suppress errors (no `--force`, no `--legacy-peer-deps` unless explicitly justified)
- Always re-run the full build to verify the fix

After resolving, update agent memory with:
- Build system gotchas discovered
- Common error patterns for this project
- Resolution shortcuts that worked
```

- [ ] **Step 2: Verify YAML frontmatter parses correctly**

Run: `head -8 agents/claude-code/agents/build-error-resolver.md`
Expected: Valid YAML frontmatter with name, description, tools, model, memory, maxTurns

- [ ] **Step 3: Commit**

```bash
git add agents/claude-code/agents/build-error-resolver.md
git commit -m "feat: add build-error-resolver native agent"
```

---

## Task 4: Security-Scan Command

**Files:**
- Create: `universal/commands/security-scan.md`

- [ ] **Step 1: Create command definition**

Follow the pattern from existing commands (`build.md` structure — YAML frontmatter + phases):

```markdown
---
name: security-scan
description: Run comprehensive security audit on codebase
category: quality
complexity: medium
triggers: [security-scan, audit-security, owasp-check]
---

# Security Scan

Run a comprehensive security audit of the current project. Combines automated tooling with agent-driven code review.

## Input
Target scope: $ARGUMENTS (default: entire project)

## Execution

### Phase 1: Detect Project Stack

Detect project languages (source lib/lang-detect.sh logic) and identify:
- Package manager (npm, pip, cargo, go, composer, bundler)
- Dependency files (package-lock.json, requirements.txt, Cargo.lock, go.sum)
- Framework (Express, Django, Rails, Spring, etc.)

### Phase 2: Dependency Audit

Run the appropriate audit command for detected languages:
- **TypeScript/JS**: `npm audit --json` or `yarn audit --json`
- **Python**: `pip audit` or `safety check`
- **Rust**: `cargo audit`
- **Go**: `govulncheck ./...`
- **PHP**: `composer audit`
- **Java**: `mvn dependency-check:check` (if plugin configured)
- **Ruby**: `bundle audit`

Parse output and collect: CVE ID, severity, affected package, fix version.

### Phase 3: Secret Detection

Scan for hardcoded secrets using regex patterns:
- API keys: `(sk-|pk-|api[_-]?key|apikey)\s*[=:]\s*['"][A-Za-z0-9]{20,}`
- AWS credentials: `AKIA[0-9A-Z]{16}`
- Tokens: `(token|secret|password|passwd)\s*[=:]\s*['"][^\s'"]{8,}`
- Private keys: `-----BEGIN (RSA |EC |)PRIVATE KEY-----`
- Connection strings: `(mongodb|postgres|mysql|redis):\/\/[^\s]+`

Exclude: `.env.example`, test fixtures, docs, vendor/node_modules.

### Phase 4: Code Review (Agent)

Spawn security-auditor agent with focused scope:
```
Agent(subagent_type="security-auditor", prompt="Review {files} for OWASP Top 10:
1. Injection (SQL, NoSQL, command, LDAP)
2. Broken auth (session management, credential storage)
3. Sensitive data exposure (logging, error messages, headers)
4. XXE (XML parsing)
5. Broken access control (IDOR, privilege escalation)
6. Security misconfiguration (CORS, headers, defaults)
7. XSS (reflected, stored, DOM-based)
8. Insecure deserialization
9. Known vulnerable components (from Phase 2)
10. Insufficient logging/monitoring
Report findings with severity, file:line, and fix recommendation.")
```

### Phase 5: Report

Output structured report:

```
## Security Scan Report — {project_name}
Date: {date}

### Summary
- Critical: N | High: N | Medium: N | Low: N | Info: N

### Dependency Vulnerabilities
| Package | CVE | Severity | Fix Version |
|---------|-----|----------|-------------|

### Hardcoded Secrets
| File:Line | Type | Action Required |
|-----------|------|-----------------|

### Code Review Findings
| File:Line | Category | Severity | Description | Fix |
|-----------|----------|----------|-------------|-----|

### Recommendations
1. ...
```
```

- [ ] **Step 2: Commit**

```bash
git add universal/commands/security-scan.md
git commit -m "feat: add /security-scan command for comprehensive audits"
```

---

## Task 5: Discover Command

**Files:**
- Create: `universal/commands/discover.md`

- [ ] **Step 1: Create command definition**

```markdown
---
name: discover
description: Discover community Claude Code tools, skills, and plugins you haven't installed yet
category: meta
complexity: low
triggers: [discover, community-tools, whats-new]
---

# Discover Community Tools

Browse the awesome-claude-code catalog and find tools, skills, and plugins you haven't installed yet.

## Input
Filter (optional): $ARGUMENTS (e.g., "skills", "orchestrators", "hooks")

## Execution

### Phase 1: Fetch Catalog

Use WebFetch to retrieve the awesome-claude-code README:
```
WebFetch(url="https://github.com/hesreallyhim/awesome-claude-code",
  prompt="Extract ALL tools, skills, plugins, hooks, orchestrators, and slash commands listed. For each item return: name, one-line description, install command if given, and which section it's under. Format as a structured list grouped by section.")
```

### Phase 2: Detect Installed

Check what's already present on this system:
- `ls ~/.claude/plugins/cache/` — installed plugins
- `ls ~/.claude/plugins/marketplaces/` — marketplace plugins
- `ls ~/.claude/skills/` — installed skills
- `ls ~/.claude/commands/` — installed commands
- Check CLI tools: `command -v claude-squad auto-claude codex gemini kiro amp copilot`

### Phase 3: Diff and Display

For each catalog item:
- If installed → mark with checkmark
- If not installed → show with install command

Group by section. If $ARGUMENTS provided, filter to matching sections.

### Phase 4: Output

```
## Community Tools Discovery

### Already Installed (N)
  [check] superpowers — composable development skills
  [check] context7 — library documentation lookup
  ...

### Available — Not Installed (N)

  **Skills**
  - craft-code-skill — advanced code generation patterns
    Install: claude plugin install craft-code-skill@publisher

  **Orchestrators**
  - claude-squad — terminal multi-agent management
    Install: go install github.com/smtg/claude-squad@latest

  **Hooks**
  - ...

### Recommended for Your Setup
Based on your installed tools, these would add the most value:
1. {name} — {why it complements your setup}
2. ...
```

### Phase 5: Interactive

If the user asks to install something from the list, run the appropriate install command.
```

- [ ] **Step 2: Commit**

```bash
git add universal/commands/discover.md
git commit -m "feat: add /discover command for community tool catalog"
```

---

## Task 6: adapter.sh — Plugin + Language Rules + Settings

**Files:**
- Modify: `agents/claude-code/adapter.sh:137-141` (plugin array)
- Modify: `agents/claude-code/adapter.sh` (add lang rules install block after skills block, line ~107)

- [ ] **Step 1: Add ui-ux-pro-max to plugins array**

In `agents/claude-code/adapter.sh`, find the plugins array (line 137) and add the new plugin:

```bash
# Find this line:
      pr-review-toolkit security-guidance commit-commands feature-dev
      claude-md-management hookify skill-creator github

# Replace with:
      pr-review-toolkit security-guidance commit-commands feature-dev
      claude-md-management hookify skill-creator github
      ui-ux-pro-max
```

- [ ] **Step 2: Add marketplace plugin install after official plugins**

After the plugins loop (after line 148 `echo "    Plugins: $installed installed"`), add:

```bash
    # Install marketplace plugins (community)
    echo "    Installing marketplace plugins..."
    if claude plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill 2>/dev/null; then
      echo "    UI/UX Pro Max: installed"
    fi
```

- [ ] **Step 3: Add language rules install block**

After the skills install block (after line 107), add:

```bash
  # Install language-specific rules (staging area — activated per-project by project-init.sh)
  local lang_rules_src="$UNIVERSAL_DIR/rules/lang"
  if [ -d "$lang_rules_src" ]; then
    mkdir -p "$CLAUDE_HOME/rules/lang"
    local lang_count=0
    for f in "$lang_rules_src"/*.md; do
      [ -f "$f" ] || continue
      \cp -f "$f" "$CLAUDE_HOME/rules/lang/"
      lang_count=$((lang_count + 1))
    done
    echo "    Language rules: $lang_count languages staged (activate per-project via /init)"
  fi
```

- [ ] **Step 4: Verify shellcheck passes**

Run: `shellcheck -S error agents/claude-code/adapter.sh`
Expected: No errors

- [ ] **Step 5: Commit**

```bash
git add agents/claude-code/adapter.sh
git commit -m "feat: adapter — add ui-ux-pro-max plugin + language rules staging"
```

---

## Task 7: project-init.sh — Language Detection Integration

**Files:**
- Modify: `project-init.sh` (add language detection after Claude Code section, ~line 85)

- [ ] **Step 1: Add language detection block**

After the Claude Code CLAUDE.md creation block (after line 85 `fi`), add:

```bash
  # Detect and activate language-specific rules
  if [ -d "$HOME/.claude/rules/lang" ]; then
    source "${SCRIPT_DIR}/lib/lang-detect.sh"
    local detected
    detected=$(detect_project_languages "$PROJECT_DIR")
    if [ -n "$detected" ]; then
      for lang in $detected; do
        local rule_file="$HOME/.claude/rules/lang/lang-${lang}.md"
        if [ -f "$rule_file" ]; then
          ln -sf "$rule_file" "$PROJECT_DIR/.claude/rules/lang-${lang}.md" 2>/dev/null || \
            \cp -f "$rule_file" "$PROJECT_DIR/.claude/rules/lang-${lang}.md"
        fi
      done
      ok "Language rules: activated for$detected"
    fi
  fi
```

- [ ] **Step 2: Verify shellcheck passes**

Run: `shellcheck -S error project-init.sh`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add project-init.sh
git commit -m "feat: project-init — auto-detect and activate language rules"
```

---

## Task 8: install.sh — Community Plugin Section

**Files:**
- Modify: `install.sh` (add section after Fleet install, before summary)

- [ ] **Step 1: Add community integrations section**

After the Fleet section (after line ~1051 `fi`) and before `summary "install"` (line 1053), add:

```bash
  # Install community integrations
  echo ""
  step "Community Integrations"
  # ui-ux-pro-max installed via adapter.sh plugins
  local lang_count
  lang_count=$(ls "$SCRIPT_DIR/universal/rules/lang/"*.md 2>/dev/null | wc -l | tr -d ' ')
  if [ "$lang_count" -gt 0 ]; then
    ok "Language rules: $lang_count language-specific rule sets available"
    info "  Activated per-project via: ./project-init.sh (or /init in Claude Code)"
    info "  Languages: TypeScript, Python, Go, Rust, Swift, PHP, Java, Kotlin, C++, Perl"
  fi
```

- [ ] **Step 2: Verify shellcheck passes**

Run: `shellcheck -S error install.sh`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add install.sh
git commit -m "feat: install.sh — report community integrations and language rules"
```

---

## Task 9: Fleet Container Mounts

**Files:**
- Modify: `fleet/container.ts:632-646` (`getConfigMounts` method)

- [ ] **Step 1: Add plugins and settings.json mounts**

In `fleet/container.ts`, find the `getConfigMounts` method. After the superpowers skills mount (line 644), add:

```typescript
    // Mount plugins directory (all installed plugins available in containers)
    const pluginsDir = join(claudeDir, "plugins");
    if (existsSync(pluginsDir)) {
      mounts.push([pluginsDir, join(fleetUser, ".claude", "plugins")]);
    }
    // Mount settings.json (plugin activation, permissions carry into containers)
    const settingsPath = join(claudeDir, "settings.json");
    if (existsSync(settingsPath)) {
      mounts.push([settingsPath, join(fleetUser, ".claude", "settings.json")]);
    }
```

Add `existsSync` to the import if not already present:

```typescript
import { existsSync } from "fs";
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd fleet && npx tsc --noEmit container.ts 2>&1 | head -20`
Expected: No errors (or only pre-existing warnings)

- [ ] **Step 3: Commit**

```bash
git add fleet/container.ts
git commit -m "feat: fleet — mount plugins/ and settings.json into containers"
```

---

## Task 10: Overseer Board — Vault Structure

**Files:**
- Modify: `overseer/board.ts`

- [ ] **Step 1: Read current board.ts**

Read `overseer/board.ts` to understand the current `generateBoard()` function.

- [ ] **Step 2: Update generateBoard() to create vault directories**

Update the function to:
1. Create `Daily/`, `Stories/`, `Notes/`, `References/`, `Templates/` directories
2. Write sprint log entries as individual daily files in `Daily/`
3. Write individual story files in `Stories/`
4. Create `Templates/story-template.md` and `Templates/task-template.md`

The exact code depends on the current implementation — read it first, then modify to add vault directory creation after existing board.md generation.

Key additions:
```typescript
// Create vault directories
const overseerDir = join(projectRoot, ".overseer");
mkdirSync(join(overseerDir, "Daily"), { recursive: true });
mkdirSync(join(overseerDir, "Stories"), { recursive: true });
mkdirSync(join(overseerDir, "Notes"), { recursive: true });
mkdirSync(join(overseerDir, "References"), { recursive: true });
mkdirSync(join(overseerDir, "Templates"), { recursive: true });

// Write story files individually
for (const story of stories) {
  writeFileSync(join(overseerDir, "Stories", `story-${story.id}.md`), storyContent);
}

// Write templates
writeFileSync(join(overseerDir, "Templates", "story-template.md"), storyTemplate);
writeFileSync(join(overseerDir, "Templates", "task-template.md"), taskTemplate);
```

- [ ] **Step 3: Commit**

```bash
git add overseer/board.ts
git commit -m "feat: overseer board — vault-structured directory layout"
```

---

## Task 11: Overseer Knowledge — exportToVault()

**Files:**
- Modify: `overseer/knowledge.ts`

- [ ] **Step 1: Read current knowledge.ts**

Read `overseer/knowledge.ts` to understand the KnowledgeStore class.

- [ ] **Step 2: Add exportToVault method**

Add a new exported function that writes knowledge entries as separate markdown files:

```typescript
export function exportKnowledgeToVault(epicId: number, overseerDir: string): void {
  const entries = getKnowledge(epicId);
  const notesDir = join(overseerDir, "Notes");
  mkdirSync(notesDir, { recursive: true });

  // Group entries by category
  const byCategory: Record<string, KnowledgeEntry[]> = {};
  for (const entry of entries) {
    const cat = entry.category || "general";
    (byCategory[cat] ||= []).push(entry);
  }

  // Write one file per category
  for (const [category, items] of Object.entries(byCategory)) {
    const content = `# ${category}\n\n` +
      items.map(e => `## ${e.key}\n\n${e.value}\n\n*Added by ${e.source_agent} at ${e.created_at}*\n`).join("\n---\n\n");
    writeFileSync(join(notesDir, `${category}.md`), content);
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add overseer/knowledge.ts
git commit -m "feat: overseer knowledge — export to vault Notes/ directory"
```

---

## Task 12: Overseer — Move Research Docs to References/

**Files:**
- Modify: `overseer/overseer.ts`

- [ ] **Step 1: Read current overseer.ts**

Read `overseer/overseer.ts` to find where requirements phase outputs are written (RESEARCH.md, REQUIREMENTS.md).

- [ ] **Step 2: Add file moves after requirements phase**

After the requirements phase completes, move output files into the vault References/ directory:

```typescript
// After requirements phase — move research artifacts to vault
const refsDir = join(overseerDir, "References");
mkdirSync(refsDir, { recursive: true });
for (const fname of ["RESEARCH.md", "REQUIREMENTS.md", "PROJECT.md"]) {
  const src = join(overseerDir, fname);
  const dst = join(refsDir, fname);
  if (existsSync(src)) {
    renameSync(src, dst);
  }
}
```

- [ ] **Step 3: Call exportKnowledgeToVault after all tasks complete**

Before the final report, call:
```typescript
import { exportKnowledgeToVault } from "./knowledge";
exportKnowledgeToVault(epic.id, overseerDir);
```

- [ ] **Step 4: Commit**

```bash
git add overseer/overseer.ts
git commit -m "feat: overseer — vault References/ + knowledge export"
```

---

## Task 13: Update orchestration.md + init.md + build.md

**Files:**
- Modify: `universal/rules/orchestration.md` (Step 7, Build Failure section)
- Modify: `universal/commands/init.md` (add language detection phase)
- Modify: `universal/commands/build.md` (Phase 0, add language detection)

- [ ] **Step 1: Update orchestration.md Step 7**

Find the "Build Failure" section in Step 7. Add at the beginning:

```markdown
### Build Failure
1. **Spawn build-error-resolver agent** for systematic resolution:
   ```
   Agent(subagent_type="build-error-resolver", prompt="Build failed. Output: {error_output}. Project: {project_dir}. Fix the root cause and verify with a rebuild.")
   ```
   The build-error-resolver agent categorizes errors (dependency, type, import, config, bundler) and applies targeted fixes.
2. If the agent doesn't resolve it, fall back to manual investigation:
```

Then keep the existing manual steps as the fallback.

- [ ] **Step 2: Update init.md**

Find the exploration phase in `init.md`. Add a new phase for language detection:

```markdown
### Phase N: Language Rule Activation

Detect project languages and activate matching rule sets:
1. Check for language markers: tsconfig.json (TypeScript), pyproject.toml (Python), go.mod (Go), Cargo.toml (Rust), etc.
2. For each detected language, ensure `lang-{language}.md` is symlinked from `~/.claude/rules/lang/` into `.claude/rules/`
3. Report activated languages

This gives all subsequent agents language-specific coding standards, testing patterns, and security guidelines.
```

- [ ] **Step 3: Update build.md Phase 0**

In `build.md`, after loading pattern conformance spec (Phase 0), add:

```markdown
**Language rules:**
Check if `.claude/rules/lang-*.md` files exist in the project:
- **YES**: Language rules are active. Include relevant language standards when prompting implementation subagents.
- **NO**: Check `~/.claude/rules/lang/` for available rules. If project languages detected but rules not linked, activate them now.
```

- [ ] **Step 4: Commit**

```bash
git add universal/rules/orchestration.md universal/commands/init.md universal/commands/build.md
git commit -m "feat: wire build-error-resolver + language detection into orchestration"
```

---

## Task 14: Verification

- [ ] **Step 1: Run existing tests**

Run: `make test`
Expected: All 31 tests pass (no regressions)

- [ ] **Step 2: Run shellcheck on all modified shell files**

Run: `shellcheck -S error lib/lang-detect.sh project-init.sh install.sh agents/claude-code/adapter.sh`
Expected: No errors

- [ ] **Step 3: Verify lang-detect.sh works on this project**

Run: `source lib/lang-detect.sh && detect_project_languages .`
Expected: Output includes `typescript` (since this project has package.json)

- [ ] **Step 4: Verify new files exist in expected locations**

Run: `ls universal/rules/lang/*.md | wc -l && ls agents/claude-code/agents/build-error-resolver.md && ls universal/commands/security-scan.md universal/commands/discover.md`
Expected: 10 language rules, agent file exists, both command files exist

- [ ] **Step 5: Verify fleet container.ts compiles**

Run: `cd fleet && npx tsc --noEmit container.ts 2>&1 | head -5; cd ..`

- [ ] **Step 6: Dry run install**

Run: `./install.sh --dry-run 2>&1 | tail -30`
Expected: Shows language rules count, no errors

---

## Parallelism Map

Tasks that can run in parallel (no dependencies between them):

**Group A (all new files — fully independent):**
- Task 1: lib/lang-detect.sh
- Task 2: Language rule files (10)
- Task 3: Build-error-resolver agent
- Task 4: Security-scan command
- Task 5: Discover command

**Group B (edits — depend on Task 1 existing):**
- Task 6: project-init.sh
- Task 7: install.sh
- Task 8: adapter.sh (depends on Task 2 directory existing)

**Group C (fleet — independent of A/B):**
- Task 9: fleet/container.ts

**Group D (overseer — internal dependencies: 10→11→12):**
- Task 10: board.ts
- Task 11: knowledge.ts
- Task 12: overseer.ts

**Group E (markdown edits — depends on Task 3):**
- Task 13: orchestration.md + init.md + build.md

**Final:**
- Task 14: Verification (depends on all above)

**Recommended dispatch**: A + C + D in parallel → B + E → Verification
