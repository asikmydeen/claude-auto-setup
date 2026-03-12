# Multi-Agent Auto-Trigger Protocol

This rule makes multi-agent workflows THE DEFAULT. Every task is evaluated for parallelization opportunities. Sequential single-agent work is the exception, not the norm.

## Decision Tree (evaluate EVERY task)

```
1. Does this task involve research/exploration?
   YES → Spawn explorer agent(s) immediately in background

2. Will this task touch 3+ files?
   YES → Decompose by concern, spawn parallel agents

3. Does this task span multiple layers (frontend/backend/infra/tests)?
   YES → Spawn one agent per layer, work in parallel

4. Does this task require understanding unfamiliar code?
   YES → Spawn explorer in background while you plan

5. Is this a simple single-file change (< 30 lines)?
   YES → Do it yourself, no agents needed
```

If ANY of conditions 1-4 are true, use multi-agent. The bias is TOWARD parallelization.

## Auto-Trigger Rules

### Rule 1: Always-Parallel Patterns

These ALWAYS spawn agents — no judgment call needed:

| Trigger | Agents to Spawn | How |
|---------|----------------|-----|
| Any task starts | Explorer (background) to gather context | `Agent(subagent_type=explorer, run_in_background=true)` |
| Implementation done | Code-reviewer + Security-auditor (parallel) | Two `Agent()` calls in same message |
| Implementation done | Test-writer (background) | `Agent(subagent_type=test-writer, run_in_background=true)` |
| Bug report | Debugger + Explorer (parallel) | Debugger investigates, Explorer finds related code |
| PR/review request | Code-reviewer + Security-auditor + Test-analyzer | Three parallel agents |

### Rule 2: Multi-File Decomposition

When a task touches 3+ files across different concerns:

1. **Identify independent units** — group files by concern:
   - Frontend files (components, styles, client logic)
   - Backend files (handlers, services, data layer)
   - Test files (unit, integration, e2e)
   - Config/infra files (CDK, CI, docker)
   - Documentation files

2. **Spawn one agent per concern** using `isolation: "worktree"`:
   ```
   Agent(prompt="Implement [frontend concern]...", isolation="worktree", run_in_background=true)
   Agent(prompt="Implement [backend concern]...", isolation="worktree", run_in_background=true)
   Agent(prompt="Write tests for [feature]...", subagent_type="test-writer", run_in_background=true)
   ```

3. **Merge results** — when agents complete, review their work and integrate.

### Rule 3: Research-First Pattern

For ANY non-trivial task, spawn research agents BEFORE planning:

```
# Launch in parallel (single message, multiple Agent calls):
Agent(subagent_type=explorer, prompt="Find all files related to [feature]. Map the data flow and dependencies.")
Agent(subagent_type=explorer, prompt="Find existing patterns for [similar feature]. How is [X] implemented?")
```

Use results to inform the plan. Never plan blind.

### Rule 4: Background Agents

These run continuously in background without blocking the main flow:

- **Test-writer**: After every implementation block, spawn to write/update tests
- **Code-reviewer**: After every significant change (3+ files), spawn for async review
- **Explorer**: When you need context about unfamiliar code, spawn and continue planning

## Dispatch Mechanisms (which to use when)

### Agent Tool (PRIMARY — use for most cases)
```
Agent(prompt="...", subagent_type="explorer")           # Read-only research
Agent(prompt="...", isolation="worktree")                # Write work, git-isolated
Agent(prompt="...", run_in_background=true)              # Non-blocking
Agent(prompt="...", model="haiku")                       # Fast/cheap for simple tasks
```

**Use when**: Task runs within this Claude session. Best for research, review, focused implementation.

### Orchestration MCP agent_spawn (SECONDARY — for heavy external agents)
```
mcp__orchestration__agent_spawn(branch="feat-tests", prompt="...", background=true)
```

**Use when**: Task needs a full independent Claude session (long-running, complex, needs its own tool permissions). Uses cmux worktrees. Check status via `agent_status`, merge via `agent_merge`.

### dispatch.sh / Queue (TERTIARY — for cross-provider routing)
```
mcp__orchestration__queue_add(prompt="...", task_type="test-writing")
mcp__orchestration__queue_dispatch()
```

**Use when**: Task should route to a specific provider (Kiro for AWS, Codex for tests, Gemini for docs). Runs dispatch.sh in background.

## Coordination Protocol

### Spawning
- Launch ALL independent agents in a SINGLE message (parallel execution)
- Give each agent a clear, scoped prompt with file paths and context
- Include relevant code snippets or intel in the prompt — agents don't share your context

### Collecting Results
- Foreground agents: results come back immediately, use them
- Background agents: you're notified on completion, incorporate results then
- Worktree agents: check `agent_status`, then `agent_merge` when satisfied

### Conflict Resolution
- If two agents modify the same file: review both diffs, manually integrate
- If an agent's work conflicts with another's: prefer the more correct change
- If worktree merge conflicts: resolve manually in main branch

## Examples

### Example: "Add pagination to the API"
```
Phase 1 (parallel):
  Explorer → "Find the current API endpoint pattern, data layer, and how responses are structured"
  Explorer → "Find how similar features (sorting, filtering) are implemented"

Phase 2 (after research):
  Plan the implementation, present spec

Phase 3 (parallel, after approval):
  Agent (worktree) → "Implement pagination in the data layer and API handler" [backend files]
  Agent (worktree) → "Add pagination UI controls and infinite scroll" [frontend files]
  Test-writer (background) → "Write pagination tests: edge cases, boundary conditions, empty results"

Phase 4 (parallel):
  Code-reviewer → Review all changes
  Security-auditor → Check for injection in pagination params
```

### Example: "Fix the login bug"
```
Phase 1 (parallel):
  Debugger → "Investigate the login failure: check auth flow, session handling, error logs"
  Explorer → "Map the full auth code path: login → session → middleware → protected routes"

Phase 2:
  Apply fix based on debugger findings

Phase 3 (parallel):
  Test-writer → "Write regression test for this login scenario"
  Code-reviewer → "Review the auth fix for correctness and security"
```

### Example: "Refactor the config system"
```
Phase 1 (parallel):
  Explorer → "Map ALL files that import/use the current config system"
  Explorer → "Find the config patterns: how config is loaded, validated, accessed"

Phase 2:
  Plan the refactor with full dependency map

Phase 3 (parallel agents in worktrees):
  Agent 1 → "Refactor core config loader and types" [config/]
  Agent 2 → "Update all consumers in src/api/" [src/api/]
  Agent 3 → "Update all consumers in src/services/" [src/services/]
  Test-writer → "Update config tests for new API"

Phase 4 (parallel):
  Code-reviewer + Security-auditor
```
