---
name: sdlc
description: Full SDLC Pipeline — Virtual Engineering Team
category: workflow
complexity: complex
triggers: [sdlc]
---

# Full SDLC Pipeline — Virtual Engineering Team

You are launching the complete Software Development Lifecycle pipeline. A virtual team of 12+ specialized agents will plan, implement, test, review, merge, and release the feature described by the user.

## Input
The user's epic: $ARGUMENTS

## How It Works

This command orchestrates a full engineering team:

```
User Epic → Product Manager → Project Manager → Tech Lead
  → Engineers (max 5 parallel, isolated worktrees)
  → QA + Security Audit → Merge Manager → Release Engineer
  → Guardian (monitoring throughout)
```

All agents share centralized knowledge (SQLite), respect git worktree isolation, and follow the project's `codebase-patterns.md`.

## Execution

### Step 1: Launch the Overseer

Run the overseer orchestrator:

```bash
bun overseer/overseer.ts --epic "$ARGUMENTS"
```

This starts the full pipeline:
1. Creates an epic in the database
2. Spawns Product Manager → breaks epic into stories
3. Spawns Project Manager → creates sprint tasks with dependencies
4. Spawns Tech Lead → designs architecture
5. Scheduler assigns tasks to engineers (max 5 concurrent)
6. Each engineer works in an isolated git worktree
7. Merge Manager merges completed work back to main
8. QA runs tests, Security runs audit
9. Release Engineer prepares the release
10. Guardian monitors everything throughout

### Step 2: Monitor Progress

While the pipeline runs, you can check status:

```bash
bun overseer/overseer.ts --status <epic-id>
```

Or read the dashboard files:
- `.overseer/sprint-plan.md` — task overview
- `.overseer/test-report.md` — test results
- `.overseer/security-report.md` — security findings
- `.overseer/guardian-status.md` — health monitoring
- `.overseer/merge-log.md` — merge history

### Step 3: Completion

When all tasks are done:
- All code is merged to main
- Tests pass
- Security audit clean
- Changelog generated
- Ready for the user to review and push

## Options

Pass to the overseer via environment or flags:
- `--max-concurrency 5` — max parallel agents (default: 5)
- `--cleanup` — remove all worktrees from a previous run

## For Non-Technical Users

You don't need to understand the technical details. Just describe what you want:
- "Build me a todo app with user accounts"
- "Add a dashboard with charts to my project"
- "Create an API for managing inventory"

The team will handle everything — architecture, implementation, testing, security, and deployment prep. You'll get a working feature on main when it's done.

## Troubleshooting

If the pipeline stalls:
1. Check status: `bun overseer/overseer.ts --status <epic-id>`
2. Check guardian warnings: `cat .overseer/guardian-warnings.md`
3. Check for blocked tasks: tasks depending on failed tasks get blocked
4. Cleanup and retry: `bun overseer/overseer.ts --cleanup` then re-run

$ARGUMENTS
