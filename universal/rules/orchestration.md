# Smart Orchestration Protocol

When the user asks for any implementation work (feature, bugfix, refactor, migration), follow this orchestration protocol automatically.

## Compaction Recovery (READ THIS FIRST)

If you have NO memory of the current conversation but are clearly mid-task:
1. Read `.claude/scratch/task-state.md` — it has your full state
2. Run `git status` + `git diff --stat` to see what's changed since last checkpoint
3. Say: "Resuming from checkpoint — [phase], [next action]"
4. Continue from where the checkpoint says you left off

If no checkpoint exists, start fresh from Step 0.

## Multi-Agent Enforcement (MANDATORY)

Multi-agent is THE DEFAULT for all non-trivial work. Not opt-in. Not role-dependent.

**Decision**: Single file, < 30 lines → solo. Everything else → multi-agent. Period.

**Before your FIRST edit**, spawn agents:
```
Agent(subagent_type="explorer", run_in_background=true, prompt="Find all files related to [task]. Map dependencies and patterns.")
```
If task touches 2+ files, decompose by concern and launch ALL independent agents in a SINGLE message.

**After implementation**, always spawn in parallel (one message):
```
Agent(subagent_type="code-reviewer", prompt="Review changes in [files]: quality, patterns, bugs...")
Agent(subagent_type="security-auditor", prompt="Security audit of [files]: OWASP, injection, auth...")
Agent(subagent_type="test-writer", run_in_background=true, prompt="Write tests for [files]...")
```

**Self-check**: If you're editing 3+ files without having spawned any agents, STOP and delegate.

**Agent parameters**:
- `run_in_background=true` — non-blocking
- `model="haiku"` — fast/cheap for exploration
- `model="sonnet"` — implementation and review
- `subagent_type="explorer"` — read-only research
- `isolation="worktree"` — git-isolated parallel writes

**Dispatch priority**: Agent tool → Agent+worktree → orchestration MCP agent_spawn → dispatch.sh

**Coordination**: Give each agent clear scope (file paths, context). Agents don't share your context — include relevant info. Review output before integrating. Two agents same file → manually merge.

## Context Preservation (CRITICAL)

Context compaction can happen at any time. To survive it:

### Checkpoint System
Use `.claude/scratch/task-state.md` as persistent state. Overwrite each time (current state, not log).

**Write BEFORE moving to the next phase**:
- After exploration → checkpoint discoveries
- After plan approved → checkpoint spec
- After each task implemented → checkpoint done vs remaining
- After review → checkpoint issues
- After any significant decision

```markdown
# Task State Checkpoint
> Last updated: [timestamp]

## Current Task
[One-line description]

## Phase
[explore / plan / implement / review / verify]

## Approved Plan
[The spec — or "pending approval"]

## Progress
- [x] task-1: description [files: a.ts, b.ts]
- [ ] task-2: description [CURRENT]
- [ ] task-3: description

## Key Discoveries
[Non-obvious things that affect implementation]

## Decisions Made
[Architecture choices with rationale]

## Files Modified
[All files changed with one-line description]
```

**Rules**: Create `.claude/scratch/` on first use. Keep under 100 lines. Delete when task complete. Resume: "Resuming from checkpoint — [phase], [next action]"

### What Survives Compaction (no action needed)
- `CLAUDE.md`, `.claude/rules/` — re-loaded automatically
- `MEMORY.md` — re-loaded (first 200 lines)
- Git state — committed/staged work is safe
- Native agent memory — persisted to their own dirs

### What DOESN'T Survive (must checkpoint)
- Approved plan/spec
- Task progress (done vs remaining)
- Exploration results and discoveries
- Intermediate decisions
- Uncommitted work

### Context Protection Habits
- **Prefer native agents** for exploration/review — stays in their context, not yours
- **Commit frequently** — `git add -p` + commit after each logical unit
- **Delegate verbose ops** (test suites, large docs) to subagents
- Env `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=80` triggers compaction earlier for more post-compaction room

## Step 0: Context Gathering (ALWAYS)

Before planning, gather context:

### 0a: Load Intel
- `project-intel.md` is auto-loaded — skim Quick Reference section first
- If no intel exists, AUTO-GENERATE via deep-research (6 parallel agents)
- Check for workspace-level intel in parent directories if task crosses packages

### 0b: Memory Context
- Query claude-mem: `search({ query: "...", limit: 20 })` for past decisions, gotchas, patterns
- Follow 3-layer pattern: search → timeline → get_observations
- Fall back to MEMORY.md if claude-mem unavailable

### 0c: Plugin Context
- `context7` — fetch docs for any library/SDK you're unsure about
- `serena` — semantic code navigation for unfamiliar code
- LSP diagnostics — automatic type error detection

## Step 1: Detect Available Providers (AUTOMATIC)

On first task in session (re-detect after compaction):
```bash
command -v claude codex gemini amp kiro copilot 2>/dev/null
```

| Provider | Best at | When to use |
|---|---|---|
| **Claude** (you) | Planning, architecture, complex reasoning, debugging, security | Always — you're the coordinator |
| **Codex** | Fast code gen, test writing, boilerplate | Tests, CRUD, repetitive code |
| **Gemini** | Documentation, large context analysis | Docs, large file analysis |
| **Amp** | Code review, oracle-level guidance | Final review, security audit |
| **Kiro** | AWS/Amazon internal context | Internal projects |
| **Copilot** | GitHub-native workflows | PRs, issues, CI/CD |

**Auto-dispatch** (silently):
- Test writing + Codex installed → Codex
- Documentation + Gemini installed → Gemini
- Code review + Amp installed → Amp
- Complex reasoning/planning → always Claude
- Only Claude installed → do everything yourself
- Provider fails → fall back to Claude silently

**Dispatch**: `~/claude-code-setup/dispatch.sh --task "prompt" --type task-type`

## Step 1.5: Classify the Task

- **Small** (single file, < 30 lines): Do directly. No agents needed.
- **Medium** (2-5 files, single concern): 1-2 focused agents in parallel.
- **Large** (6+ files, cross-cutting): Full multi-agent orchestration.

### Agent Selection

| Work Type | Primary Agent | Support Agents |
|---|---|---|
| React UI | `react-specialist` | `typescript-pro`, `test-automator` |
| API endpoint | `backend-developer` | `api-designer`, `database-optimizer` |
| Full feature | `fullstack-developer` | `react-specialist`, `backend-developer` |
| Bug investigation | `debugger` | `error-detective` |
| Performance | `performance-engineer` | `database-optimizer` |
| AWS infrastructure | `cloud-architect` | `security-engineer`, `devops-engineer` |
| Refactoring | `refactoring-specialist` | `architect-reviewer` |
| Security fix | `security-engineer` | `security-auditor` |
| Database | `database-administrator` | `database-optimizer` |
| CI/CD | `devops-engineer` | `deployment-engineer` |
| Documentation | `documentation-engineer` | `technical-writer` |

**Cross-provider overlay** (when external providers installed):

| Task Type | Prefer External | Fallback |
|---|---|---|
| Tests | Codex | Claude subagent |
| Boilerplate/CRUD | Codex | Claude subagent |
| API documentation | Gemini | Claude subagent |
| Large file analysis | Gemini | Claude subagent |
| Final code review | Amp | Claude subagent |
| Security review | Amp or Claude | Claude subagent |

## Step 2: Select Plugins

Use when relevant:
- **`context7`** — library/SDK docs (uncertain APIs only)
- **`serena`** — semantic code nav (unfamiliar code only)
- **LSP** — automatic type error detection
- **`security-guidance`** — automatic security warnings
- **`code-review`** — after implementation
- **`code-simplifier`** — after implementation
- **`superpowers`** — composable skills (TDD, verification, debugging, brainstorming, code-review, worktree-parallel-development). Use TDD skill for test-driven implementation. Use verification skill to prove fixes work. Use debugging skill for systematic 4-phase debugging. Use brainstorming for complex architectural decisions.
- **`ui-ux-pro-max`** — design system intelligence (161 industry rules, 67 UI styles). Activate for frontend/UI tasks — provides component patterns, accessibility rules, responsive design guidance.

## Step 3: Execute with Multi-Agent Pattern

### Medium tasks:
1. Create spec, get approval
2. Launch 1-2 subagents in parallel
3. Merge results, run verification

### Large tasks: Explore → Plan → Implement → Review → Verify

**Phase A: Explore** (parallel agents)
- Agent 1: Codebase structure, relevant files, patterns
- Agent 2: `context7` docs for libraries involved
- Agent 3: `serena` code relationships and dependencies

**Phase B: Plan**

<HARD-GATE>
Do NOT proceed to implementation until the user has reviewed and approved the spec.
Present it in sections short enough to read. Wait for explicit approval.
This applies to EVERY task regardless of perceived simplicity.
</HARD-GATE>

- Synthesize exploration into spec with `@@@task` blocks
- STOP and wait for user approval
- **CHECKPOINT**: Write approved spec to task-state.md before implementing

**Phase C: Implement** (parallel by concern, auto-dispatch)
- Frontend agent → Claude subagent
- Backend agent → Claude (or Codex for CRUD)
- Test agent → Codex if installed (faster), else Claude
- Infra agent → Claude subagent
- Docs agent → Gemini if installed, else Claude
- Each agent works in isolation, receives only its scope
- Include relevant context in every agent prompt
- **CHECKPOINT after each task**: Update progress in task-state.md

**Phase D: Review** (parallel agents)
- `code-reviewer` → Amp if installed, else Claude
- `security-auditor` → Claude always (defense in depth)
- `code-simplifier` → Claude
- **CHECKPOINT**: Review findings in task-state.md

**Phase E: Verify**
- Run build, tests, lint
- Check LSP diagnostics
- Produce verification report
- **Delete checkpoint**: task-state.md (task complete)

## Step 4: Incremental Intel Update (MANDATORY after every task)

After ANY code-changing task, update cached intel:

1. **When**: After verification passes, before final report. LAST step.
2. **Who**: Single sequential agent (no write conflicts).
3. **What**: `git diff` → map to intel sections → patch affected sections.
4. **Log**: Append to `.claude/rules/.intel-changelog`.
5. **Skip**: If < 1 hour since last update AND < 3 files changed.

### Freshness Rules
- < 1 hour + small task → skip
- 1 hour–30 days → normal incremental update
- > 30 days → full deep-research on next `/init`
- Intel missing → auto-generate via deep-research

## Step 5: Error Recovery

### Build Failure
1. Spawn `build-error-resolver` agent first
2. If unresolved: read FULL error, check deps, check types, fix root cause
3. After 2 same-error failures: step back — read surrounding code, check intel, use `context7`

### Test Failure
1. Read WHAT failed, not just THAT it failed
2. Your change broke it → fix implementation (not the test)
3. Test expectation changed → update assertion
4. Never delete/skip failing tests

### Lint Failure
1. Auto-fix: `npx eslint --fix` / `npx prettier --write`
2. Remaining: fix manually (don't disable rules)

### Cascading Failures (> 3)
1. STOP. `git diff` to review all changes.
2. Consider if the approach is wrong.
3. If wrong: `git stash`, rethink, restart implementation phase.
4. Surface blocker to user: what tried, why failed, what'd do differently.

### Learning
- API gotcha → add to intel gotchas
- Unexpected test pattern → note in intel
- Non-obvious config → note in intel

## Anti-Patterns (NEVER)

- ALL agents on a small task — overkill
- `context7` for known APIs — only uncertain ones
- Skip review on medium/large tasks
- Implement without exploring unfamiliar code
- Agents sequentially when they can be parallel
- Skip intel updates — stale cache = future bugs
- Brute-force errors — 3 same attempts = rethink approach
- Suppress errors (ts-ignore, eslint-disable, test.skip)
- Edit 3+ files without spawning agents — STOP and delegate

---
