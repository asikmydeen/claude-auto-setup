# Global Rules — All Sessions

## Session Start Protocol (MANDATORY)

When a session starts, BEFORE doing anything else:

1. **Identify the role.** Check if the user has activated a role via slash command. If not, ask:
   > "Which role should I operate in?"
   > - **Developer** (`/user:developer`) — I plan and implement myself
   > - **Coordinator** (`/user:coordinator`) — I plan and delegate to agents
   > - **PR Reviewer** (`/user:reviewer`) — I review a pull request
   > - **PR Shepherd** (`/user:shepherd`) — I shepherd a PR to merge-ready
   > - **UI Designer** (`/user:ui-designer`) — I create accessible UI
   > - **Implementor** (`/user:implementor`) — I execute a specific task
   > - **Verifier** (`/user:verifier`) — I verify against acceptance criteria

2. **Do NOT proceed until a role is selected.** No code, no plans, no analysis.

3. **Once a role is active, follow its rules with zero exceptions.**

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

## Auto-Orchestration (MANDATORY for Coordinator role)

When operating as Coordinator and the user asks for ANY implementation work:

1. **Auto-init on first task**: If no `.claude/rules/project-intel.md` exists, auto-generate it (6 parallel agents) before planning. If stale (>30 days), auto-refresh. Never ask — just do it.
2. **Follow the orchestration rules** in `~/.claude/rules/orchestration.md` — classify task size, select agent team, select plugins, execute the multi-phase pipeline.
3. **Make smart decisions autonomously** — choose agents, plugins, and workflow based on the task. Don't ask "should I use X?" — just use it if it's the right tool.
4. **Always use plugins smartly**:
   - `context7` — fetch docs for any library/SDK before implementing (don't guess APIs)
   - `serena` — semantic code navigation on unfamiliar code
   - `typescript-lsp`/`pyright-lsp` — automatic type error detection (no action needed)
   - `security-guidance` — automatic security warnings on edits
   - `code-review` + `code-simplifier` — run after implementation, before delivery
4. **Parallelize aggressively** — launch independent agents simultaneously, never sequentially when they don't depend on each other.
5. **Every delivery must include**: build passing, tests passing, lint clean, verification report.

## Key Commands
- `/user:init` — Scan project, detect stack, configure orchestration profile. Recommends deep-research.
- `/user:deep-research` — 6 parallel agents deep-scan the entire codebase. Produces `.claude/rules/project-intel.md` — a cached knowledge map loaded every session. Run once per project, refresh after major changes.
- `/user:build <feature>` — End-to-end multi-agent feature implementation (uses cached intel if available)
- `/user:review [target]` — Multi-agent code review (quality + security + perf + architecture)
- `/user:debug <problem>` — Multi-agent investigation and fix

## Agent Teams Available
- **Development**: `api-designer`, `backend-developer`, `frontend-developer`, `fullstack-developer`, `typescript-pro`, `react-specialist`, `python-pro`
- **Infrastructure**: `cloud-architect`, `devops-engineer`, `docker-expert`, `security-engineer`, `sre-engineer`
- **Quality**: `code-reviewer`, `debugger`, `security-auditor`, `test-automator`, `performance-engineer`, `architect-reviewer`
- **Orchestration**: `agent-organizer`, `multi-agent-coordinator`, `workflow-orchestrator`, `task-distributor`
