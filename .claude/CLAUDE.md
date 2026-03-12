# Project: claude-auto-setup

## Stack
- Language: Bash 3.2+ (macOS compatible)
- Framework: None (pure shell scripts)
- Build: No build step
- Test: `make test` or `./tests/run.sh` (29 smoke tests)
- Lint: `make lint` (shellcheck, error-level)

## Architecture
Universal AI agent orchestration system. Adapter pattern: `universal/` is the single source of truth, `agents/*/adapter.sh` translates to agent-specific formats. Native agents defined in `agents/claude-code/agents/`. Dashboard is Node.js/Express on port 3200.

## Key Directories
- Source: `install.sh`, `dispatch.sh`, `project-init.sh` (top-level entry points)
- Universal config: `universal/rules/`, `universal/commands/`
- Agent adapters: `agents/`
- Dashboard: `dashboard/`
- Shared lib: `lib/common.sh`
- Tests: `tests/run.sh`

## Common Commands
- Install: `./install.sh` or `make install`
- Update: `./install.sh --update` or `make update`
- Test: `make test`
- Lint: `make lint`
- Dry run: `./install.sh --dry-run`
- Health check: `./install.sh --doctor` or `make doctor`
- Version: `cat VERSION`

## Multi-Agent Workflow (DEFAULT)
Multi-agent is the default for this project. See `~/.claude/rules/multi-agent.md` for full protocol.

Dispatch chain (priority order):
1. **Agent tool** — primary: subagents for research, review, focused work
2. **Agent tool + `isolation: "worktree"`** — parallel writes to different files
3. **orchestration MCP `agent_spawn`** — full Claude sessions via cmux worktrees
4. **orchestration MCP `queue_add`** — cross-provider dispatch via dispatch.sh
5. **dispatch.sh direct** — CLI cross-provider routing (claude, kiro-cli)

Available providers: claude, kiro-cli
- AWS/Amazon tasks auto-route to kiro-cli
- All other tasks route to claude
- dispatch.sh unsets CLAUDECODE for nested session support

Native agents: explorer (haiku), code-reviewer (sonnet), test-writer (sonnet), debugger (opus), security-auditor (opus)

Orchestration MCP tools: `pipeline_*`, `checkpoint_*`, `queue_*`, `analytics_*`, `agent_*`

Plugins: `serena`, `context7`, `code-review`, `security-guidance`

## Shell Script Rules
- Must work on macOS bash 3.2 (no `declare -A`, no bash 4+ features)
- All scripts must pass `shellcheck -S error`
- Use `command -v` not `which` for portability
- Source `lib/common.sh` for colors, logging, `has_cmd`
- Idempotent operations — safe to run multiple times
- Merge don't overwrite — settings merged intelligently
