# Project: claude-auto-setup

## Stack
- Language: Bash 3.2+ (shell scripts) + TypeScript (desktop app)
- Desktop App: Electrobun + React 19 + Vite + Tailwind v4 + shadcn/ui + Elysia + bun:sqlite
- Build: `make test` (shell), `cd app && npx vite build` (app), `cd app && bunx electrobun dev` (native)
- Test: `make test` or `./tests/run.sh` (31 smoke tests)
- Lint: `make lint` (shellcheck, error-level)

## Architecture
Universal AI agent orchestration system with a native desktop app.

**Shell layer:** Adapter pattern — `universal/` is the single source of truth, `agents/*/adapter.sh` translates to agent-specific formats. Native agents defined in `agents/claude-code/agents/`.

**Desktop app (`app/`):** Electrobun native macOS app. Elysia server (90+ endpoints, 12 route modules) embedded in the Bun main process. SQLite database (bun:sqlite) for persistent sessions/projects. React 19 UI (9 component modules) with SSE streaming, WebSocket terminal, markdown rendering, multi-project support.

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
- Elysia API on port 3201 serves both API + built React files (static via Bun.file(), NOT @elysiajs/static)
- SQLite DB at `~/.claude/data/sidekick.db` (sessions, messages, projects)
- Claude CLI spawned with `--output-format stream-json --verbose` for streaming
- Follow-ups use `--resume <claude_session_id>` (falls back: --continue → new session)
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

Plugins: `serena`, `context7`, `code-review`, `security-guidance`, `claude-mem`

Skills: `pua` (persistence engine), `sequential-thinking` (structured reasoning)

## Persistent Memory (claude-mem)
claude-mem provides automatic cross-session memory via 5 lifecycle hooks.
- Worker service on port 37777 (auto-started on session start)
- MCP server `claude-mem-search` provides: `search`, `timeline`, `get_observations`
- 3-layer search: search (index, 50-100 tokens) → timeline (context) → get_observations (details, 500-1000 tokens)
- Observations captured automatically on every tool use (bugfix, feature, refactor, change, discovery, decision)
- Session summaries generated at Stop hook (investigated, learned, completed, next steps)
- Plugin root: `$HOME/.claude/plugins/marketplaces/thedotmack/plugin`
- Database: `~/.claude-mem/claude-mem.db` (SQLite + Chroma vector DB)
- Desktop app: Settings → Memory tab shows status, search, observation count
- See `universal/rules/memory-system.md` for usage patterns

## Sequential Thinking Skill
Structured reasoning via `universal/skills/sequential-thinking/`. Installed to `~/.claude/skills/sequential-thinking/`.
- State machine: `scripts/think.ts` (bun) — numbered thoughts, revision, branching, adaptive depth
- Multi-agent safe: `--stateFile` flag isolates state per agent
- Integrated into: all native agents (debugger, security-auditor, code-reviewer, explorer, test-writer) + build/debug commands
- Activates on: complex problems, multi-step reasoning, hypothesis testing, unclear scope
- See SKILL.md for full parameter reference

## Shell Script Rules
- Must work on macOS bash 3.2 (no `declare -A`, no bash 4+ features)
- All scripts must pass `shellcheck -S error`
- Use `command -v` not `which` for portability
- Source `lib/common.sh` for colors, logging, `has_cmd`
- Idempotent operations — safe to run multiple times
- Merge don't overwrite — settings merged intelligently
