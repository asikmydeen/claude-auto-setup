# GSD 2 Integration

GSD 2 (`gsd-pi`) is a standalone coding agent built on the Pi SDK. It manages its own context windows, git worktrees, cost tracking, and verification — solving context rot at the engine level.

## When to Use GSD 2 vs Overseer

| Scenario | Use | Why |
|----------|-----|-----|
| **Full feature from scratch** | GSD 2 (`gsd auto`) | Better context management, cost tracking, crash recovery |
| **Internal Amazon service** | Overseer (`--internal`) | Kiro integration for internal context |
| **Quick task (< 30 lines)** | Regular Claude | No orchestration needed |
| **Multi-file change (2-5 files)** | Claude `/build` | Faster than full pipeline |
| **Complex cross-cutting refactor** | GSD 2 or Overseer | Both handle multi-task orchestration |

## How to Use GSD 2

### Interactive mode
```bash
gsd                    # Opens agent session
/gsd                   # Step mode — one unit at a time
/gsd auto              # Autonomous — walk away, come back to built software
/gsd discuss           # Discuss architecture decisions
/gsd status            # Progress dashboard
```

### Headless mode (for automation)
```bash
gsd headless                        # Run auto mode without TUI
gsd headless --timeout 600000       # With timeout
gsd headless new-milestone --auto   # Create + execute milestone
gsd headless query                  # Instant JSON state snapshot (no LLM)
```

### From Claude Code (invoke GSD as a tool)
```bash
# Run GSD on a feature from within Claude
mise exec node@24 -- gsd headless --timeout 300000
```

## How GSD 2 Solves Context Rot

1. **Fresh session per task** — every task gets a clean 200K context window
2. **Context pre-loading** — dispatch prompt includes exactly the files needed (no tool calls wasted)
3. **State on disk** — `.gsd/` directory is sole source of truth, survives crashes
4. **Adaptive replanning** — roadmap reassessed after each slice based on new information
5. **Stuck detection** — retries once with diagnostics, then stops
6. **Cost tracking** — per-unit token/cost ledger, budget ceilings
7. **Verification enforcement** — lint/test commands auto-run after each task

## GSD 2 Configuration

Global preferences: `~/.gsd/preferences.md`
Project preferences: `.gsd/preferences.md`

Key settings:
```yaml
models:
  research: claude-sonnet-4-6
  planning: claude-opus-4-6
  execution: claude-sonnet-4-6
verification_commands:
  - npm run lint
  - npm run test
budget_ceiling: 50.00
auto_report: true
```

## Integration with Our System

GSD 2 runs alongside (not replacing) our overseer:
- **Overseer** — best for internal projects (Kiro), custom agent roles, cmux dashboard
- **GSD 2** — best for greenfield external projects, cost-conscious builds, crash recovery
- **Both read** `.claude/rules/codebase-patterns.md` and `project-intel.md`
- **GSD 2** uses its own `.gsd/` directory (separate from `.overseer/`)
- The SDLC routing rule (`sdlc-routing.md`) suggests the right tool based on project type

## Detection

```bash
# Check if GSD 2 is available
mise exec node@24 -- gsd --version 2>/dev/null || echo "GSD 2 not installed"
```

Install: `mise exec node@24 -- npm install -g gsd-pi`
