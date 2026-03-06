# Smart Orchestration Protocol

When the user asks for any implementation work (feature, bugfix, refactor, migration), follow this orchestration protocol automatically.

## Step 0: Context Gathering (ALWAYS)

Before planning, gather context using the right tools:
- **Check for cached intel FIRST**: Read `.claude/rules/project-intel.md` if it exists — this is a pre-computed codebase map with architecture, API surface, data models, patterns, and critical paths. Use it instead of re-exploring.
- If no cached intel exists, AUTO-GENERATE it by running the deep-research workflow (6 parallel agents). Do not ask — just do it. Print "No cached intel. Generating codebase intelligence..." and proceed.
- Use `context7` MCP to fetch up-to-date docs for any library/framework you're unsure about
- Use `serena` for semantic code navigation when exploring unfamiliar code
- Use LSP diagnostics (automatic) to catch type errors after every edit
- Read existing `.claude/CLAUDE.md` for project-specific orchestration profile

## Step 1: Detect Available Providers (AUTOMATIC)

On first task in any session, silently detect installed providers:
```bash
which claude codex gemini amp 2>/dev/null
```
Cache the result mentally for the session. This determines whether to use cross-provider dispatch.

**Provider strengths** (use for routing decisions):
| Provider | Best at | When to use |
|---|---|---|
| **Claude** (you) | Planning, architecture, complex reasoning, debugging, security | Always — you're the coordinator |
| **Codex** | Fast code gen, test writing, boilerplate, simple implementations | Tests, CRUD, repetitive code |
| **Gemini** | Documentation, large context analysis, frontend, search-grounded | Docs, large file analysis, dependency audit |
| **Amp** | Code review, oracle-level guidance, multi-model routing | Final review, security audit |

**Auto-dispatch rules** (apply silently — never ask the user):
- If task is test writing AND Codex is installed → delegate to Codex
- If task is documentation AND Gemini is installed → delegate to Gemini
- If task is code review AND Amp is installed → delegate to Amp
- If task is boilerplate/CRUD AND Codex is installed → delegate to Codex
- If task is large-file analysis AND Gemini is installed → delegate to Gemini
- For all complex reasoning, planning, architecture, debugging → always Claude (you)
- If only Claude is installed → do everything yourself, no degradation
- If a provider fails → fall back to Claude silently, log the failure

**How to dispatch** (via Bash tool):
```bash
# Test writing → Codex
codex -q "Write unit tests for [file]. Test all edge cases. Use [framework]." --full-auto

# Documentation → Gemini
echo "Generate API documentation for [files]. Include endpoints, schemas, examples." | gemini

# Code review → Amp
echo "Review this diff for security, performance, code quality: $(git diff --staged)" | amp

# Or use the dispatch script for automatic routing:
~/claude-code-setup/dispatch.sh --task "prompt" --type task-type
```

## Step 1.5: Classify the Task

Determine task complexity:
- **Small** (single file, < 50 lines changed): Do it directly. No subagents needed.
- **Medium** (2-5 files, single concern): Use 1-2 focused subagents in parallel.
- **Large** (6+ files, multiple concerns, cross-cutting): Full multi-agent orchestration.

## Step 2: Select Agent Team + Provider

Match agents to the work. For each task, also decide if an external provider is better:

| Work Type | Primary Agent | Support Agents |
|---|---|---|
| React UI component | `react-specialist` | `typescript-pro`, `test-automator` |
| API endpoint | `backend-developer` | `api-designer`, `database-optimizer` |
| Full feature (FE+BE) | `fullstack-developer` | `react-specialist`, `backend-developer` |
| Bug investigation | `debugger` | `error-detective` |
| Performance issue | `performance-engineer` | `database-optimizer` |
| AWS infrastructure | `cloud-architect` | `security-engineer`, `devops-engineer` |
| Refactoring | `refactoring-specialist` | `architect-reviewer` |
| Security fix | `security-engineer` | `security-auditor` |
| Database changes | `database-administrator` | `database-optimizer` |
| CI/CD pipeline | `devops-engineer` | `deployment-engineer` |
| Documentation | `documentation-engineer` | `technical-writer` |

**Cross-provider routing overlay** (when external providers are available):

| Task Type | Prefer External Provider | Fallback |
|---|---|---|
| Unit/integration tests | Codex (fast, cheap) | Claude subagent |
| Boilerplate / CRUD handlers | Codex | Claude subagent |
| API documentation | Gemini (huge context, cheap) | Claude subagent |
| Large file analysis / dependency audit | Gemini | Claude subagent |
| Final code review | Amp (oracle model) | Claude subagent |
| Security review | Amp or Claude | Claude subagent |
| Everything else | Claude (you) | — |

When a task has both a subagent AND an external provider match, prefer the external provider for speed/cost. Use your subagents for tasks that need deep context about the current codebase (which external providers won't have unless you include it in the prompt).

## Step 3: Select Plugins

Always use these when relevant:
- **`context7`**: When implementing with any library/SDK — fetch current docs instead of guessing API
- **`serena`**: When navigating unfamiliar code — semantic jump-to-definition, find-references
- **`typescript-lsp` / `pyright-lsp`**: Automatic — catches type errors after every edit
- **`security-guidance`**: Automatic — warns about security issues on file edits
- **`code-review`**: After implementation — run multi-agent review before marking done
- **`code-simplifier`**: After implementation — simplify and refine the code

## Step 4: Execute with Multi-Agent Pattern

For **Medium** tasks:
1. Create spec, get approval
2. Launch 1-2 subagents in parallel (e.g., one for implementation, one for tests)
3. Merge results, run verification

For **Large** tasks, use the **Explore → Plan → Implement → Review → Verify** pipeline:

### Phase A: Explore (parallel agents)
- Agent 1: Explore codebase structure, find relevant files, understand patterns
- Agent 2: Use `context7` to fetch docs for libraries involved
- Agent 3: Use `serena` to map code relationships and dependencies

### Phase B: Plan
- Synthesize exploration results into a spec
- Present spec with `@@@task` blocks
- STOP and wait for user approval

### Phase C: Implement (parallel agents by concern, auto-dispatch to providers)
- Split implementation by concern (not by file):
  - Frontend agent: UI components, styling, client logic → **Claude subagent**
  - Backend agent: API handlers, business logic, data layer → **Claude subagent** (or Codex for CRUD)
  - Test agent: Unit tests, integration tests → **Codex if installed** (faster, cheaper), else Claude subagent
  - Infra agent: CDK/SAM/config changes → **Claude subagent**
  - Docs agent: API docs, README updates → **Gemini if installed**, else Claude subagent
- When dispatching to external providers, ALWAYS include relevant context in the prompt (file contents, patterns from intel)
- Each agent/provider works in isolation, receives only its scope
- Use `context7` for any library API lookups during implementation
- **Parallel dispatch**: Launch external providers and Claude subagents simultaneously via background Bash tasks:
  ```bash
  # Example: Codex writes tests while Claude implements business logic
  codex -q "Write tests for [context]..." --full-auto > /tmp/tests-output.txt &
  # Meanwhile, Claude subagent handles the complex implementation
  ```
- **Validate external output**: Always read and review output from external providers before integrating. Fix issues if needed.

### Phase D: Review (parallel agents, auto-dispatch to providers)
- If Amp is installed → delegate primary review to Amp: `echo "Review: $(git diff --staged)" | amp`
- `code-reviewer`: Code quality, patterns, maintainability → **Amp if installed**, else Claude subagent
- `security-auditor`: Security vulnerabilities, OWASP checks → **Claude subagent** (always, security is critical)
- `code-simplifier`: Simplify and refine → **Claude subagent**
- If Amp handles review, Claude still does security check independently (defense in depth)

### Phase E: Verify
- Run build: detected build command
- Run tests: detected test command
- Run lint: detected lint command
- Check LSP diagnostics: any type errors remaining?
- Produce verification report

## Step 5: Plugin Decision Tree

When implementing, ask yourself:

```
Need library/SDK docs?
  → YES → Use context7 to fetch version-specific docs
  → NO → Continue

Navigating unfamiliar codebase?
  → YES → Use serena for semantic code analysis
  → NO → Use Grep/Glob for known patterns

Creating a PR?
  → YES → Use commit-commands for commit + pr-review-toolkit for review
  → NO → Continue

Editing TypeScript files?
  → Automatic: typescript-lsp catches errors
  → Automatic: security-guidance checks for vulnerabilities

Done implementing?
  → Run code-simplifier to refine
  → Run code-review for multi-agent review
```

## Step 6: Incremental Intel Update (MANDATORY after every task)

After ANY task that changes code (build, debug, review with fixes), update the cached intel:

1. **When**: After verification passes, before delivering the final report. This is the LAST step.
2. **Who**: A single sequential agent. Never parallel — avoids write conflicts.
3. **What**: Read git diff → map to intel sections → patch only affected sections.
4. **How**: See the routing table in `/build` Phase 6 for file-to-section mapping.
5. **Log**: Always append to `.claude/rules/.intel-changelog`.
6. **Cost**: Lightweight — reads a diff and patches a few lines. Seconds, not minutes.

### Intel Freshness Rules
- **< 1 hour since last update**: Skip incremental update for small tasks (< 3 files changed). Not worth the overhead.
- **1 hour - 30 days**: Normal incremental updates after every task.
- **> 30 days since full scan**: Auto-trigger full deep-research on next `/init` or `/build`.
- **Intel file missing**: Auto-generate via deep-research before any task. Never proceed without intel.

### Concurrency Safety
- Intel updates are ALWAYS the last phase — all parallel agents are done.
- Only one agent writes to project-intel.md at a time.
- If a write fails (file locked, permission error), log the failure and continue — don't block the user.
- The next task will pick up the missed update.

## Anti-Patterns (NEVER do these)

- Don't use ALL agents on a small task — overkill wastes context
- Don't use context7 for things you already know — only for uncertain APIs
- Don't skip the review phase on medium/large tasks
- Don't implement without exploring first on unfamiliar code
- Don't run agents sequentially when they can run in parallel
- Don't skip intel updates — stale cache is worse than no cache
- Don't do full re-scans when incremental updates suffice
