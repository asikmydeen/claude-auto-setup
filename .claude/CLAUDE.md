# Project: claude-auto-setup

## Stack
- Language: Bash 3.2+ (shell scripts) + TypeScript (desktop app)
- Desktop App: Electrobun + React 19 + Vite + Tailwind v4 + shadcn/ui + Express
- Build: `make test` (shell), `cd app && npx vite build` (app), `cd app && bunx electrobun dev` (native)
- Test: `make test` or `./tests/run.sh` (31 smoke tests)
- Lint: `make lint` (shellcheck, error-level)

## Architecture
Universal AI agent orchestration system with a native desktop app.

**Shell layer:** Adapter pattern — `universal/` is the single source of truth, `agents/*/adapter.sh` translates to agent-specific formats. Native agents defined in `agents/claude-code/agents/`.

**Desktop app (`app/`):** Electrobun native macOS app. Express server (25+ endpoints, 1500+ lines) embedded in the Bun main process. React 19 UI with SSE streaming, markdown rendering, multi-project support, tool/agent activity visibility.

## Key Directories
- Source: `install.sh`, `dispatch.sh`, `project-init.sh` (top-level entry points)
- Desktop app: `app/` (Electrobun, see app/package.json)
- Universal config: `universal/rules/`, `universal/commands/`
- Agent adapters: `agents/`
- Shared lib: `lib/common.sh`
- Tests: `tests/run.sh`

## Common Commands
- Install: `./install.sh` or `make install`
- Update: `./install.sh --update` or `make update`
- Test: `make test`
- Lint: `make lint`
- Dry run: `./install.sh --dry-run`
- Health check: `./install.sh --doctor` or `make doctor`
- Desktop app (native): `cd app && bunx electrobun dev`
- Desktop app (browser): `cd app && npm run dev`
- Version: `cat VERSION`

## Desktop App Notes
- Requires bun + node 24 (both via mise.toml in app/)
- Express API on port 3201 serves both API + built React files
- Claude CLI spawned with `--output-format stream-json --verbose` for streaming
- `stdio: ['ignore', 'pipe', 'pipe']` — Claude blocks if stdin is piped
- `CLAUDECODE=""` + `CLAUDE_CODE_ENTRYPOINT=""` must both be cleared for nested sessions
- Keep `CLAUDE_CODE_USE_BEDROCK` and other auth vars
- Static file serving uses `findDistDir()` to work in both dev and Electrobun bundle

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

Native agents: all set to `model: sonnet` (configurable in Settings → Agent Models)

Orchestration MCP tools: `pipeline_*`, `checkpoint_*`, `queue_*`, `analytics_*`, `agent_*`

Plugins: `serena`, `context7`, `code-review`, `security-guidance`

## Shell Script Rules
- Must work on macOS bash 3.2 (no `declare -A`, no bash 4+ features)
- All scripts must pass `shellcheck -S error`
- Use `command -v` not `which` for portability
- Source `lib/common.sh` for colors, logging, `has_cmd`
- Idempotent operations — safe to run multiple times
- Merge don't overwrite — settings merged intelligently
