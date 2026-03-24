# Task & SDLC Routing

Route tasks to the right tool based on complexity and project type.

## Task Classification

| Size | Handler | When |
|------|---------|------|
| Trivial | Solo (no agents) | Single file, < 30 lines |
| Small | Quick task | 1-2 files, single concern |
| Medium | `/build` (multi-agent) | 2-5 files, single concern |
| Large | `/build` (multi-agent) | 6+ files, cross-cutting |
| Feature/Epic (external) | GSD 2 (`gsd auto`) | Greenfield, cost tracking, crash recovery |
| Feature/Epic (internal) | Overseer (`/sdlc --internal`) | Amazon services, Kiro, cmux |

## Feature Detection (route to SDLC)

Route to full pipeline when: "Build me...", "Create a...", "I want a... app/system", request spans FE+BE, describes 3+ step user flow, mentions multiple roles, or is a new project scaffold.

Do NOT route: single file changes, refactoring, explanations, quick additions, test writing, docs, config.

## Auto-Selection

- Internal project (packageInfo, .brazil.json, /workplace/) → Overseer (`--internal`)
- External + complex (multi-story, multi-layer) → GSD 2 (`gsd auto`)
- External + medium → `/build`
- If user previously said "always use GSD/sdlc" → route automatically

## GSD 2 (`gsd-pi`)

Standalone agent (Pi SDK). Fresh-session-per-task architecture solves context rot.

```bash
gsd                              # Interactive
/gsd auto                        # Autonomous
gsd -p "task"                    # Single-shot
gsd headless                     # CI/automation
gsd headless --timeout 600000    # With timeout
mise exec node@24 -- gsd headless --timeout 300000  # From Claude Code
```

**Config**: `~/.gsd/preferences.md` (global), `.gsd/preferences.md` (project)
**Key features**: fresh 200K context per task, state on disk (.gsd/), adaptive replanning, stuck detection, cost tracking, verification enforcement.

## SDLC Overseer

```bash
bun overseer/overseer.ts --epic "description"            # External
bun overseer/overseer.ts --internal --epic "description"  # Internal (Kiro)
bun overseer/dashboard.ts --latest                        # Live TUI
```

## Routing Heuristic

GSD 2 and Overseer are complementary:
- **Overseer** — internal projects (Kiro), custom agent roles, cmux dashboard
- **GSD 2** — greenfield external, cost-conscious, crash recovery
- Both read `codebase-patterns.md` and `project-intel.md`
