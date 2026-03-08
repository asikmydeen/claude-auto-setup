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

## Auto-Orchestration (MANDATORY for Coordinator role)

When operating as Coordinator and the user asks for ANY implementation work:

1. **Auto-init on first task**: If no `.claude/rules/project-intel.md` exists, auto-generate it (6 parallel agents) before planning. If stale (>30 days), auto-refresh. Never ask — just do it. Also detect workspace hierarchy — if this package has siblings (monorepo, workspace), auto-generate `workspace-intel.md` at the workspace root to map cross-package dependencies and shared contracts.
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
