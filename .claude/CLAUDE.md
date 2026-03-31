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
- Language rules: `universal/rules/lang/` (10 language-specific rule sets)
- Agent adapters: `agents/`
- Shared lib: `lib/common.sh`, `lib/lang-detect.sh`
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
Multi-agent is the default for this project. See `~/.claude/rules/orchestration.md` for full protocol.

Dispatch chain (priority order):
1. **Agent tool** — primary: subagents for research, review, focused work
2. **Agent tool + `isolation: "worktree"`** — parallel writes to different files
3. **orchestration MCP `agent_spawn`** — full Claude sessions via cmux worktrees
4. **orchestration MCP `queue_add`** — cross-provider dispatch via dispatch.sh
5. **dispatch.sh direct** — CLI cross-provider routing (claude, kiro-cli)

Available providers: claude, kiro-cli, copilot
- AWS/Amazon tasks auto-route to kiro-cli
- GitHub PR/issue/CI tasks auto-route to copilot
- All other tasks route to claude
- dispatch.sh unsets CLAUDECODE for nested session support

Native agents: all set to `model: sonnet` (configurable in Settings → Agent Models)

Orchestration MCP tools: `pipeline_*`, `checkpoint_*`, `queue_*`, `analytics_*`, `agent_*`

Plugins: `serena`, `context7`, `code-review`, `security-guidance`, `claude-mem`, `ui-ux-pro-max`, `superpowers`

Skills: `pua` (persistence engine), `pua-en` (enhanced PUA with full plugin integration), `sequential-thinking` (structured reasoning)

## GSD 2 (Get Shit Done v2)
Standalone coding agent with fresh-session-per-task architecture. Solves context rot at the engine level.
- Install: `mise exec node@24 -- npm install -g gsd-pi`
- Interactive: `gsd` then `/gsd auto` (autonomous) or `/gsd` (step mode)
- Headless: `gsd headless` (CI/scripts), `gsd headless query` (instant JSON state)
- Use for: greenfield external projects, cost-conscious builds, crash recovery
- Config: `~/.gsd/preferences.md` (global), `.gsd/preferences.md` (project)
- See `~/.claude/rules/task-routing.md` for when to use GSD 2 vs Overseer

## Fleet — Multi-Account Container Orchestration (`fleet/`)
Run tasks across multiple API accounts in isolated Docker/Podman containers.
- Config: `~/.claude/fleet/accounts.json` (credential sets, chmod 600)
- Image: `claude-fleet:latest` (node:22-slim + claude-code + bun + git, ~1.8GB)
- Run: `fleet --pool tasks.json` | `--scatter "prompt"` | `--decompose "task"` | `--pipeline "task" --stages r,i,t` | `--superpowers "feature"` | `--superpowers "feature" --decompose`
- Options: `--workers N` | `--max-tasks N` (task budget, default: workers×5)
- Status: `fleet --status` | `--live` | `--accounts` | `--stop`
- 6 modes: pool, scatter, decompose, pipeline, superpowers, superpowers+decompose
- **Warm container pool**: pre-starts containers with `sleep infinity`, tasks via `docker exec` (saves ~2-3s/task)
- **Event-driven dispatch**: completion notification queue replaces 3s polling (zero delay)
- **Task budget**: auto-computed `workers×5`, injected into planning prompts, prevents over-decomposition
- **Intel + patterns injection**: project-intel.md + codebase-patterns.md injected into superpowers planning prompts
- **Fleet-specific settings**: `prepareFleetConfig()` strips hooks/MCP/model from settings.json for containers
- Account pool: round-robin, rate-limit cooldown (429 detection), event-driven waitForAvailable
- Credentials: env-file injection (temp file, deleted after spawn), never baked into images
- Database: `~/.claude/data/fleet.db` (fleet_runs, fleet_tasks, fleet_containers)
- cmux bridge: sidebar progress, desktop notifications (all no-ops without cmux)
- Docker + Podman support (auto-detect, configurable)
- **Full parity**: containers mount plugins/, skills/ (pua, sequential-thinking), scripts/, fleet-settings.json

## Pattern Conformance
All new code must follow patterns documented in `.claude/rules/codebase-patterns.md`.
- Generated automatically during `/init` or `/deep-research` (7th parallel agent: `pattern-analyzer`)
- Covers 3 layers: shell scripts, TypeScript app (Elysia + React), agent/command/rule definitions
- Enforcement rule: `universal/rules/pattern-conformance.md` — loaded every session
- Deviation protocol: propose change → explain why → get user confirmation → update spec → log
- Code-reviewer validates conformance as FIRST review step (references `§ Section`)
- Template for new projects: `universal/patterns-template.md`
- Build command: loads patterns in Phase 0, checks in Phase 4, patches in Phase 6

## SDLC Overseer (`overseer/`)
Full virtual engineering team. User describes an epic → 15 agents gather requirements, plan, implement, test, verify UI, merge, release.
- Run: `bun overseer/overseer.ts --epic "Build a todo app"` | `--status <id>` | `--list` | `--cleanup`
- Internal: `bun overseer/overseer.ts --internal --epic "Build service"` (Kiro-assisted)
- Dashboard: `bun overseer/dashboard.ts --latest` (auto-opens in cmux split on macOS)
- Agents: requirements-analyst, domain-researcher, product-manager, project-manager, tech-lead, senior-engineer, engineer, frontend-engineer, backend-engineer, qa-engineer, security-engineer, merge-manager, devops-engineer, release-engineer, guardian
- Pipeline: Requirements (GSD) → Planning → Execution (max 5 concurrent) → Merge → Browser Verify → Release
- Database: `~/.claude/data/overseer.db` (7 tables: epics, stories, tasks, agent_sessions, knowledge, merge_queue, sprint_log)
- Worktrees: `.worktrees/task-{id}` (gitignored, one per active task, auto-cleanup)
- Knowledge store: centralized decisions shared across all agents (prevents conflicting choices) + `exportKnowledgeToVault()` for Obsidian Notes/
- Vault structure: `.overseer/` uses Obsidian-compatible layout (Daily/, Stories/, Notes/, References/, Templates/)
- Guardian: continuous monitoring — build health, scope creep, dangerous ops, non-technical user safety
- Command: `/sdlc` (invokes overseer pipeline)
- Planning agents work in project root (not worktrees); execution agents get isolated worktrees
- Nested sessions: `CLAUDECODE='' CLAUDE_CODE_ENTRYPOINT=''` must both be unset

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

## Community Integrations
4 community repos integrated via hybrid approach (plugin where designed, vendor where selective). All plugins unified into commands, orchestration, fleet, and overseer.
- **UI/UX Pro Max** (`nextlevelbuilder/ui-ux-pro-max-skill`): Marketplace plugin — design system intelligence (161 industry rules, 67 UI styles). In `enabledPlugins`, adapter.sh, fleet containers. Referenced by `/build` (frontend tasks), `/review` (UI compliance), fleet superpowers (frontend detection), overseer (frontend-engineer role).
- **Superpowers** (`obra/superpowers`): Official plugin — 14 composable skills (TDD, verification, debugging, brainstorming, code-review, worktrees). In `enabledPlugins`, adapter.sh, fleet containers. Referenced by `/build` (TDD + verification), `/review` (code-review + verification), `/debug` (systematic debugging + TDD), `/deep-research` (brainstorming + verification), `/pua-en` (all skills as recovery tools), fleet superpowers mode (plugin hints in planning prompts), overseer (role-specific hints via `buildPluginHints()`).
- **Language Rules** (`affaan-m/everything-claude-code`): 10 language rule sets in `universal/rules/lang/`. Staged to `~/.claude/lang-staging/` (NOT in `rules/` — avoids 36KB auto-load). Activated per-project by `project-init.sh` or `/init` (copies to `.claude/rules/`).
- **Build-Error-Resolver** (merged into `debugger` agent): build error categorization now handled by debugger's dual investigation protocol.
- **/security-scan** (`affaan-m/everything-claude-code`): `universal/commands/security-scan.md` — dep audit + secret detection + OWASP code review + structured severity report.
- **/discover** (`hesreallyhim/awesome-claude-code`): `universal/commands/discover.md` — fetches community tool catalog, diffs against installed, shows what's available.
- **Overseer Vault** (`kepano/kepano-obsidian`): `.overseer/` now uses Obsidian-compatible vault structure (Daily/, Stories/, Notes/, References/, Templates/).

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
