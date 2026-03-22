# Smart Orchestration Protocol

When the user asks for any implementation work (feature, bugfix, refactor, migration), follow this orchestration protocol automatically.

## Context Preservation (CRITICAL — prevents losing progress)

Context compaction can happen at any time during a long task. To survive it:

### Checkpoint System
Use `.claude/scratch/task-state.md` as a persistent checkpoint file. This file lives on disk and survives compaction.

**When to write checkpoints** (write BEFORE moving to the next phase):
- After exploration completes → checkpoint discoveries
- After plan is approved → checkpoint the approved spec
- After each task/file is implemented → checkpoint what's done vs remaining
- After review findings → checkpoint issues found
- After any significant decision or discovery

**Checkpoint format** (overwrite the file each time — it's current state, not a log):
```markdown
# Task State Checkpoint
> Last updated: [timestamp]

## Current Task
[One-line description of what we're building]

## Phase
[Current phase: explore / plan / implement / review / verify]

## Approved Plan
[The spec that was approved — or "pending approval"]

## Progress
- [x] task-1: description [files changed: a.ts, b.ts]
- [x] task-2: description [files changed: c.ts]
- [ ] task-3: description [CURRENT — in progress]
- [ ] task-4: description
- [ ] task-5: description

## Key Discoveries
[Non-obvious things learned during exploration that affect implementation]

## Decisions Made
[Architecture choices, pattern selections, approach decisions with rationale]

## Files Modified So Far
[List of all files changed with one-line description of each change]

## Blocked / Issues
[Any blockers or open questions]
```

**When to read the checkpoint**:
- At the START of every response, check if `.claude/scratch/task-state.md` exists
- If it exists and you don't remember the context, READ IT — you've been compacted
- The checkpoint tells you exactly where you were and what to do next

**Checkpoint rules**:
- Create `.claude/scratch/` directory on first checkpoint
- Keep the file under 100 lines — it's a state snapshot, not documentation
- Delete the checkpoint file when the task is fully complete
- If resuming after compaction, say: "Resuming from checkpoint — [phase], [next action]"

### What Already Survives Compaction (no action needed)
- `CLAUDE.md` files — re-read from disk automatically
- `.claude/rules/` files (including project-intel.md) — re-loaded
- Auto memory (`MEMORY.md`) — re-loaded (first 200 lines)
- Git state — all committed/staged work is safe
- Native agent memory — persisted to their own dirs

### What DOESN'T Survive Compaction (must checkpoint)
- The approved plan/spec
- Which tasks are done vs remaining
- Exploration results and discoveries
- Intermediate decisions and rationale
- Uncommitted work-in-progress state

### Additional Context Protection
- **Prefer native agents** for exploration and review — their work stays in their own context, not yours
- **Commit frequently** during implementation — `git add -p` + commit after each logical unit, so work is persisted even if the session crashes
- **Delegate verbose operations** (running full test suites, fetching large docs) to subagents — keeps your main context clean
- **Use `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=80`** in env to trigger compaction earlier, giving more room to work after compaction instead of hitting the wall at 95%

## Step 0: Context Gathering (ALWAYS)

Before planning, gather context using the right tools:

### 0a: Load Hierarchical Intel
- **Check for package-level intel FIRST**: Read `.claude/rules/project-intel.md` if it exists — this is a pre-computed codebase map.
- **Check for workspace-level intel**: Walk up from the current directory looking for `workspace-intel.md` in parent `.claude/rules/` directories. If found, read it — it contains cross-package dependencies, shared contracts, and sibling package context.
- **Check for relevant sibling intel**: If workspace-intel.md lists sibling packages, and the current task touches cross-package boundaries (imports, shared types, API calls between packages), read the relevant sibling's `project-intel.md` too. Do NOT load all siblings — only those relevant to the task.
- If no package-level intel exists, AUTO-GENERATE it by running the deep-research workflow (6 parallel agents). Do not ask — just do it. Print "No cached intel. Generating codebase intelligence..." and proceed.
- If no workspace-level intel exists but sibling packages are detected, auto-generate workspace-intel.md too.

### 0b: Memory Context (claude-mem — when available)
- Use `search` MCP tool to query past observations about this codebase/feature area
- Look for: past decisions, known gotchas, established patterns, prior bug fixes
- Follow the 3-layer pattern: search (index) → timeline (context) → get_observations (details)
- If claude-mem is not available, fall back to MEMORY.md
- See `memory-system.md` rule for the full 3-layer search protocol

### 0c: Standard Context
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
# Use dispatch.sh for cross-provider routing
~/claude-code-setup/dispatch.sh --task "prompt" --type task-type
```

## Step 1.5: Classify the Task

Determine task complexity:
- **Small** (single file, < 50 lines changed): Do it directly. No subagents needed.
- **Medium** (2-5 files, single concern): Use 1-2 focused native agents in parallel.
- **Large** (6+ files, multiple concerns, cross-cutting): Full multi-agent orchestration. Consider agent teams for truly independent parallel work.

### Agent Selection Priority
1. **Native agents** (`~/.claude/agents/`) — use these first. They have model selection, tool restrictions, persistent memory, and background execution.
   - Key native agents: `code-reviewer`, `debugger`, `test-writer`, `explorer`, `security-auditor`
2. **Command-based agents** (`~/.claude/commands/`) — use these for role-specific workflows and orchestration commands.
3. **Agent teams** (experimental) — use for large tasks where multiple agents need to communicate and coordinate in parallel.

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

<HARD-GATE>
Do NOT proceed to implementation until the user has reviewed and approved the spec.
Present it in sections short enough to read. Wait for explicit approval.
This applies to EVERY task regardless of perceived simplicity.
"This is too simple to need a spec" = the project where unexamined assumptions waste the most work.
</HARD-GATE>

- Synthesize exploration results into a spec
- Present spec with `@@@task` blocks
- STOP and wait for user approval
- After approval: break into bite-sized tasks (2-5 min each, TDD-first)

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

## Step 7: Error Recovery (when things go wrong)

When a build, test, or lint fails during any phase, follow this structured recovery:

### Build Failure
1. **Spawn build-error-resolver agent** for systematic resolution:
   ```
   Agent(subagent_type="build-error-resolver", prompt="Build failed. Output: {error_output}. Fix root cause and verify with rebuild.")
   ```
   The build-error-resolver categorizes errors (dependency, type, import, config, bundler) and applies targeted fixes.
2. If the agent doesn't resolve it, fall back to manual investigation:
3. Read the FULL error output — don't guess from the first line
4. Check if it's a dependency issue (`npm install` / `brazil-build install` first)
5. Check if it's a type error (read the file + line referenced in the error)
6. Fix the root cause, not the symptom. Don't add `// @ts-ignore` or `any` types.
7. Re-run build. If it fails again with a DIFFERENT error, you made progress — continue.
6. If it fails with the SAME error, re-read your change and the error carefully.
7. After 2 failed attempts at the same error, step back: read surrounding code, check intel for patterns, use `context7` to verify API usage.

### Test Failure
1. Read the test output to understand WHAT failed, not just THAT it failed
2. Distinguish: did the test break because of your change (expected) or was it pre-existing?
3. If your change broke it: fix your implementation, not the test (unless the test was wrong)
4. If the test expectation changed (new behavior): update the test assertion
5. Never delete or skip failing tests without understanding why they fail

### Lint Failure
1. Auto-fix what you can: `npx eslint --fix <file>` or `npx prettier --write <file>`
2. For remaining issues: fix manually (don't disable rules)
3. If a rule conflicts with the codebase pattern, check if there's an existing eslint-disable comment pattern

### Cascading Failures
If fixing one error creates new errors (> 3 cascading failures):
1. STOP. Don't keep patching.
2. `git diff` to review all your changes
3. Consider whether the approach is wrong (not just the implementation)
4. If the approach is wrong: `git stash`, rethink, start the implementation phase over
5. Surface the blocker to the user with: what you tried, why it failed, what you'd do differently

### Learning from Failures
After recovering from any failure, check if it reveals a pattern worth remembering in intel:
- If you hit an API gotcha → add to intel's "Known Gotchas" section
- If a test pattern was unexpected → note in intel's "Test Infrastructure"
- If a build config was non-obvious → note in intel's "Quick Reference"

## Anti-Patterns (NEVER do these)

- Don't use ALL agents on a small task — overkill wastes context
- Don't use context7 for things you already know — only for uncertain APIs
- Don't skip the review phase on medium/large tasks
- Don't implement without exploring first on unfamiliar code
- Don't run agents sequentially when they can run in parallel
- Don't skip intel updates — stale cache is worse than no cache
- Don't do full re-scans when incremental updates suffice
- Don't brute-force past errors — 3 attempts at the same fix means rethink the approach
- Don't suppress errors (ts-ignore, eslint-disable, test.skip) — fix the root cause

---
