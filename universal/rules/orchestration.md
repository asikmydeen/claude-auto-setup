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

## Step 1: Classify the Task

Determine task complexity:
- **Small** (single file, < 50 lines changed): Do it directly. No subagents needed.
- **Medium** (2-5 files, single concern): Use 1-2 focused subagents in parallel.
- **Large** (6+ files, multiple concerns, cross-cutting): Full multi-agent orchestration.

## Step 2: Select Agent Team

Match agents to the work:

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

### Phase C: Implement (parallel agents by concern)
- Split implementation by concern (not by file):
  - Frontend agent: UI components, styling, client logic
  - Backend agent: API handlers, business logic, data layer
  - Test agent: Unit tests, integration tests
  - Infra agent: CDK/SAM/config changes (if needed)
- Each agent works in isolation, receives only its scope
- Use `context7` for any library API lookups during implementation

### Phase D: Review (parallel agents)
- `code-reviewer`: Code quality, patterns, maintainability
- `security-auditor`: Security vulnerabilities, OWASP checks
- `code-simplifier`: Simplify and refine

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
