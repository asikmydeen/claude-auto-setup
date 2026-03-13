# Multi-Agent Enforcement Protocol

Multi-agent is THE DEFAULT. Not opt-in. Not role-dependent. Enforced by hooks.

## Decision (evaluate EVERY task — no exceptions)

1. Single file, < 30 lines → Solo. This is the ONLY exception.
2. Everything else → Multi-agent. Period.

## Before First Edit

STOP. Before touching any file, spawn agents:

```
Agent(subagent_type="explorer", run_in_background=true, prompt="Find all files related to [task]. Map dependencies and patterns.")
```

If task touches 2+ files, also decompose by concern:
```
Agent(isolation="worktree", run_in_background=true, prompt="Implement [concern A] in [files]...")
Agent(isolation="worktree", run_in_background=true, prompt="Implement [concern B] in [files]...")
```

Launch ALL independent agents in a SINGLE message = parallel execution.

## After Implementation

Always spawn these in parallel (one message, multiple Agent calls):
```
Agent(subagent_type="code-reviewer", prompt="Review changes in [files]: quality, patterns, bugs...")
Agent(subagent_type="security-auditor", prompt="Security audit of [files]: OWASP, injection, auth...")
Agent(subagent_type="test-writer", run_in_background=true, prompt="Write tests for [files]...")
```

## Enforcement Hooks (automatic — no action needed)

The enforcement engine runs via PreToolUse and PostToolUse hooks:
- **Edit #1 with 0 agents**: Warning injected into your context
- **2+ files with 0 agents**: Escalating warning
- **3+ files with 0 agents**: Hard enforcement — you must spawn agents
- **6+ edits with 0 agents**: Forced delegation

The hooks track: edit count, unique files, agents spawned, tests run, review run.

## Dispatch Priority

1. **Agent tool** (primary) — subagents for research, review, focused work
2. **Agent + worktree** — parallel writes to different files (git-isolated)
3. **orchestration MCP agent_spawn** — full Claude sessions via cmux
4. **dispatch.sh** — cross-provider routing (Kiro for AWS, etc.)

## Agent Parameters

- `run_in_background=true` — non-blocking, get notified on completion
- `model="haiku"` — fast/cheap for exploration
- `model="sonnet"` — implementation and review
- `subagent_type="explorer"` — read-only research (preferred for context gathering)
- `isolation="worktree"` — isolated git worktree for parallel writes

## Coordination

- Give each agent clear scope: file paths, context snippets, what to do
- Agents don't share your context — include relevant info in the prompt
- Review agent output before integrating
- If two agents modify the same file: manually merge
