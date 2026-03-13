# Global Rules — All Sessions

## MULTI-AGENT IS MANDATORY (Rule #0 — overrides everything)

You MUST use multi-agent workflows for ALL tasks except trivial single-file changes (< 30 lines).
This is not optional. This is not role-dependent. This applies to EVERY role: Developer, Coordinator, Reviewer, all of them.

**Before your FIRST edit, you MUST:**
1. Spawn at least one explorer agent (background) to gather context
2. Assess if the task touches 2+ files — if yes, decompose and spawn parallel agents
3. If task spans layers (FE/BE/tests/infra) — one agent per layer

**After implementation, you MUST:**
1. Spawn code-reviewer + security-auditor agents in parallel
2. Spawn test-writer agent (background)
3. Run tests and verification

**How to spawn (in priority order):**
- `Agent(subagent_type="explorer", run_in_background=true, prompt="...")` — research
- `Agent(isolation="worktree", run_in_background=true, prompt="...")` — parallel writes
- `Agent(subagent_type="code-reviewer", prompt="...")` — review
- `Agent(subagent_type="test-writer", run_in_background=true, prompt="...")` — tests

**The enforcement engine tracks your edits.** If you make edits without agents, you WILL receive escalating warnings via hooks. At 3+ files with 0 agents, you'll be blocked.

**Only exception:** Single-file changes under 30 lines. Everything else = multi-agent.

---

## Session Start Protocol

1. **Auto-detect role from context** — Developer (default), Coordinator (complex/multi-file), PR Reviewer, etc.
2. State role briefly and proceed. Don't present menus.
3. Roles switchable via `/user:coordinator`, `/user:developer`, etc.

## Universal Hard Rules

1. **Spec first** — Create spec BEFORE implementation or delegation.
2. **Wait for approval** — Present plan and STOP.
3. **Use `@@@task` blocks** — Never checkboxes.
4. **No scope creep** — Only approved spec.
5. **Self-verify** — Evidence for every acceptance criterion.
6. **Match existing patterns** — Research codebase first (via explorer agent).
7. **Minimal changes** — Don't refactor outside scope.

## Auto-Orchestration (ALL roles — not just Coordinator)

For ANY implementation work:

1. **Auto-init**: If no `.claude/rules/project-intel.md` exists, generate it (6 parallel agents). If stale (>30 days), auto-refresh.
2. **Classify task**: Small (<30 lines, 1 file) → solo. Everything else → multi-agent.
3. **Execute pipeline**: Explore → Plan → Implement (parallel) → Review (parallel) → Verify
4. **Use plugins**: `context7` for docs, `serena` for code nav, LSP for types, `security-guidance` auto.
5. **Parallelize aggressively** — independent agents in a SINGLE message.
6. **Every delivery**: build passing, tests passing, lint clean, verification report.

## Auto-Learning Protocol

- **User corrects you** → Write to memory immediately.
- **Build/test fails from gotcha** → Add to intel + memory.
- **Non-obvious pattern discovered** → Memory if cross-session.
- **User says "always/never"** → Memory immediately.

## Key Commands
- `/user:init` — Scan + deep-research (6 parallel agents)
- `/user:build <feature>` — Multi-agent feature implementation
- `/user:review [target]` — Multi-agent code review
- `/user:debug <problem>` — Multi-agent debugging
- `/user:quick <task>` — Single-file, no-spec (the ONLY solo workflow)

## Agent Teams
- **Development**: `api-designer`, `backend-developer`, `frontend-developer`, `fullstack-developer`, `typescript-pro`, `react-specialist`, `python-pro`
- **Infrastructure**: `cloud-architect`, `devops-engineer`, `docker-expert`, `security-engineer`, `sre-engineer`
- **Quality**: `code-reviewer`, `debugger`, `security-auditor`, `test-automator`, `performance-engineer`, `architect-reviewer`
