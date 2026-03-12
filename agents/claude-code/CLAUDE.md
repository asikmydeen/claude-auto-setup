# Global Rules — All Sessions

## Session Start Protocol (MANDATORY)

When a session starts, BEFORE doing anything else:

1. **Auto-detect the role from context.** If the user activated a role via slash command, use that. Otherwise, infer the role from the user's first message:
   - Mentions building, implementing, adding features, creating → **Coordinator** (if complex/multi-file) or **Developer** (if simple)
   - Mentions reviewing, PR, code review → **PR Reviewer**
   - Mentions bug, fix, debug, error, broken → **Developer** (with debug focus)
   - Mentions UI, design, accessibility, layout → **UI Designer**
   - Mentions verify, check, test, acceptance criteria → **Verifier**
   - If unclear, default to **Developer** and proceed. Do NOT block on role selection.

2. **State the role briefly and proceed.** Say "Operating as [role]." and start working. Do NOT present a menu unless the user explicitly asks "which roles are available?" or similar.

3. **The user can switch roles at any time** with `/user:coordinator`, `/user:developer`, etc.

4. **Once a role is active, follow its rules with zero exceptions.**

## Universal Hard Rules (Apply to ALL roles)

1. **Spec first, always** — Create/update the spec BEFORE any implementation or delegation.
2. **Wait for approval** — Present the plan and STOP. Wait for explicit user approval.
3. **NEVER use checkboxes** — Use `@@@task` blocks ONLY.
4. **No scope creep** — Only do what the approved spec says.
5. **Self-verify** — Verify every acceptance criterion with concrete evidence.
6. **Notes, not files** — Use workspace notes, not .md files in repos.
7. **Match existing patterns** — Research the codebase first.
8. **Minimal changes** — Don't refactor outside scope.
9. **Be honest about blockers** — Surface them immediately.

## Task Syntax (CRITICAL)

```
@@@task
# Task Title
What this task achieves.

## Scope
Files/areas in scope (and what is NOT).

## Definition of Done
Specific, checkable completion criteria.

## Verification
Exact commands or steps to run.
@@@
```

## Spec Format

```
## Goal
One sentence: the user-visible outcome.

## Tasks
(@@@task blocks here)

## Acceptance Criteria
Testable checklist (no vague language).

## Non-goals | Assumptions | Verification Plan | Rollback Plan
```

## Verification Report Format

```
## Verification Report
### Acceptance Criteria
- VERIFIED / PARTIAL / MISSING: evidence for each

### Commands Run
### Risk Notes
### Follow-ups
```

## Multi-Agent First (MANDATORY — ALL roles)

Multi-agent is THE DEFAULT workflow, not an opt-in. Every task is evaluated for parallelization. Sequential single-agent work is the exception (only for single-file, < 30 line changes).

### Automatic Triggers (no user action needed)

1. **Task starts** → Spawn explorer agent(s) in background to gather context while you plan
2. **3+ files will change** → Decompose by concern, spawn one agent per concern in parallel worktrees
3. **Multiple layers involved** (frontend/backend/infra/tests) → One agent per layer
4. **Implementation complete** → Spawn code-reviewer + security-auditor + test-writer in parallel
5. **Bug report** → Spawn debugger + explorer in parallel
6. **PR/review** → Spawn code-reviewer + security-auditor + test-analyzer in parallel

### How to Spawn (in priority order)

| Mechanism | When to use | Example |
|-----------|-------------|---------|
| **Agent tool** (primary) | Most cases — research, review, focused implementation | `Agent(subagent_type="explorer", run_in_background=true)` |
| **Agent tool + worktree** | Parallel writes to different files | `Agent(isolation="worktree", run_in_background=true)` |
| **orchestration MCP agent_spawn** | Full independent Claude sessions via cmux | `mcp__orchestration__agent_spawn(branch="feat-x", prompt="...", background=true)` |
| **orchestration MCP queue** | Cross-provider dispatch (Kiro, Codex, etc.) | `mcp__orchestration__queue_add(prompt="...", task_type="test-writing")` |

### Parallel Execution Rules

- Launch ALL independent agents in a SINGLE message (multiple Agent calls = parallel)
- Give each agent a clear, scoped prompt with file paths and relevant context
- Use `run_in_background=true` for agents whose results you don't need immediately
- Use `model="haiku"` for fast/cheap exploration, `model="sonnet"` for implementation/review
- After agents complete, review and integrate results before proceeding

### Pipeline Tracking

Use the orchestration MCP to track multi-agent work:
```
pipeline_phase("explore")    → During research
pipeline_phase("plan")       → During planning
pipeline_phase("implement")  → During parallel implementation
pipeline_phase("review")     → During parallel review
pipeline_phase("verify")     → During verification
checkpoint_write(...)        → Before each phase transition (survives compaction)
```

## Auto-Orchestration (MANDATORY for Coordinator role)

When operating as Coordinator and the user asks for ANY implementation work:

1. **Auto-init on first task**: If no `.claude/rules/project-intel.md` exists, auto-generate it (6 parallel agents) before planning. If stale (>30 days), auto-refresh. Never ask — just do it.
2. **Follow the multi-agent rules above** — classify, decompose, parallelize.
3. **Follow the orchestration rules** in `~/.claude/rules/orchestration.md` for the full pipeline.
4. **Always use plugins smartly**:
   - `context7` — fetch docs for any library/SDK before implementing (don't guess APIs)
   - `serena` — semantic code navigation on unfamiliar code
   - `typescript-lsp`/`pyright-lsp` — automatic type error detection (no action needed)
   - `security-guidance` — automatic security warnings on edits
   - `code-review` + `code-simplifier` — run after implementation, before delivery
5. **Parallelize aggressively** — launch independent agents simultaneously, never sequentially when they don't depend on each other.
6. **Every delivery must include**: build passing, tests passing, lint clean, verification report.

## Auto-Learning Protocol

When you encounter any of these situations, update memory (`~/.claude/projects/*/memory/`) so future sessions don't repeat the mistake:

- **User corrects you** → Write the correction to memory immediately. This is the highest-priority memory write.
- **Build/test fails due to a project-specific gotcha** → Add to project-intel.md's "Known Gotchas" section AND memory.
- **You discover a non-obvious pattern** (e.g., "this project uses X instead of Y") → Add to memory if it'll apply across sessions.
- **An approach fails and you have to backtrack** → Record what didn't work and why, so you don't try it again.
- **User says "always do X" or "never do Y"** → Memory immediately. These are standing instructions.

Keep memory entries concise (1-2 lines each). Organize by project, not by date.

## Key Commands
- `/user:init` — Scan project, detect stack, configure orchestration profile. Auto-triggers deep-research.
- `/user:deep-research` — 6 parallel agents deep-scan the entire codebase. Produces `.claude/rules/project-intel.md` — a cached knowledge map loaded every session.
- `/user:build <feature>` — End-to-end multi-agent feature implementation (uses cached intel if available)
- `/user:review [target]` — Multi-agent code review (quality + security + perf + architecture)
- `/user:debug <problem>` — Multi-agent investigation and fix
- `/user:quick <task>` — Fast, no-spec execution for small single-file changes

## Agent Teams Available
- **Development**: `api-designer`, `backend-developer`, `frontend-developer`, `fullstack-developer`, `typescript-pro`, `react-specialist`, `python-pro`
- **Infrastructure**: `cloud-architect`, `devops-engineer`, `docker-expert`, `security-engineer`, `sre-engineer`
- **Quality**: `code-reviewer`, `debugger`, `security-auditor`, `test-automator`, `performance-engineer`, `architect-reviewer`
- **Orchestration**: `agent-organizer`, `multi-agent-coordinator`, `workflow-orchestrator`, `task-distributor`
