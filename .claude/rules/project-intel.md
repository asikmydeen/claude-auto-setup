# claude-code-setup - Project Intelligence

> **Last updated**: 2026-03-16. Last incremental update: 2026-03-23 (fleet parity: settings-fleet.json, skills/scripts mounts, patterns injection, run→getConfigMounts dedup)
> **Purpose**: Universal AI agent orchestration and configuration system + Electrobun desktop app (Sidekick)
> **Auto-generated**: Via intel refresh

---

## Stack

**Languages:** Bash 3.2+ (primary), TypeScript (desktop app), JSON/Markdown (config)

**Core Technologies:**
- **Electrobun** — Native desktop app (Bun + system WebView)
- **React 19 + Vite + Tailwind v4 + shadcn/ui** — Desktop app UI
- **Elysia** — Bun-native API server (90+ endpoints, 12 route modules)
- **bun:sqlite** — Sessions, messages, projects (WAL mode)
- **Vercel AI SDK v6** — 11 providers, 29+ models
- **claude-mem** — Cross-session memory (SQLite + Chroma, worker port 37777)
- **Podman/Docker** — Container runtime for dev servers + fleet
- **SSE** — Real-time Claude output + dev server logs streaming
- **MCP** — Plugin integration (serena, context7, claude-mem-search)
- **Native agent system** — Model selection, tool restrictions, persistent memory
- **Pattern conformance** — Auto-extracted patterns, enforcement rule, deviation protocol
- **SDLC Overseer** — 15 role-based agents, DAG scheduler, git worktrees, knowledge store
- **Fleet** — Multi-account container orchestration (6 modes, warm pools, event-driven dispatch, task budgets)
- **Language rules** — 10 language-specific rule sets, auto-detected per project
- **Superpowers** — 14 composable skills plugin (TDD, debugging, brainstorming, etc.)
- **Community plugins** — UI/UX Pro Max, /security-scan, /discover, build-error-resolver

---

## Desktop App (`app/`)

### Architecture

```
app/src/
├── server/index.ts          # Elysia API (90+ endpoints, 12 route modules)
├── bun/index.ts             # Electrobun bootstrap
└── ui/
    ├── pages/               # Claude.tsx, Settings.tsx, Providers.tsx, Integrations.tsx
    ├── components/          # ProjectCreator, AIProviders, DevServerLogs, BrowserPanel,
    │                        # TerminalPanel, SettingsDrawer, MemoryPanel, Toast, etc.
    ├── api/config.ts        # API client functions + types
    └── context/LinkContext.tsx
```

### Key Features

**Project Creation:** Name+description → auto-pick template (22 curated, 6 styles) → .env with Supabase/AWS creds → Claude customizes via SSE → dev server auto-starts in container → BrowserPanel shows result.

**Chat:** Rich markdown, image input (base64 --image), continue/regenerate buttons, context-aware follow-up suggestions, --continue auto-retry, message dedup, session search/filters, toast notifications.

**Templates:** 22 verified (React, Next.js, Vue, Angular, Nuxt, HTML). 6 styles (Clean, Material, Dark, Soft/Glass, Modern, Landing). Auto-pick by keywords. Stored in `extracted_templates/`.

**Dev Server:** Podman default (auto-detect: Podman > Docker > Finch). Auto-assign ports (4100+). Container reuse via inspect. HMR polling for macOS. `.env` injection. Async npm install.

**claude-mem:** Plugin on port 37777. 5 lifecycle hooks. 3-layer search (search→timeline→get_observations). Memory tab in Settings. Server proxy endpoints.

**LLM Integration:** 11 providers (Anthropic, OpenAI, Bedrock, Google, Mistral, xAI, Groq, DeepSeek, Cohere, Together, OpenRouter). Bedrock dual auth. Streaming via SSE. Keys in `~/.claude/integrations.json`.

---

## Build/Test/Run

### Desktop App
- **Native dev**: `cd app && bunx electrobun dev`
- **Browser dev**: `cd app && npm run dev` (Vite 5173, Elysia 3201)
- **Build**: `cd app && eval "$(mise activate zsh)" && bunx electrobun build`
- **Install**: `./app/install.sh`
- **IMPORTANT**: `mise exec --` prefix needed for node 24

### Shell Scripts
- `make test` — 31 smoke tests
- `make lint` — shellcheck (error-level)
- `./install.sh --dry-run` / `--doctor`

---

## Credential Bridging (AI Models → CLI Agents)

API keys from Settings → AI Models flow into CLI agents via `buildProjectEnv()`:

| Credential | Env Var | Effect |
|---|---|---|
| Anthropic key | `ANTHROPIC_API_KEY` | Claude Code without subscription |
| Bedrock | `CLAUDE_CODE_USE_BEDROCK=1` + `AWS_PROFILE` | Claude via Bedrock |
| OpenAI | `OPENAI_API_KEY` | Codex + tools |
| Google | `GOOGLE_GENERATIVE_AI_API_KEY` | Gemini CLI |

Health endpoint shows `bridgedCredentials` array.

## Supabase Auto-Integration

Connected Supabase → `.env` with all variants (`SUPABASE_URL`, `REACT_APP_*`, `VITE_*`, `NEXT_PUBLIC_*`). Build prompt says "SUPABASE IS ALREADY CONFIGURED". `writeProjectDotEnv()` merges without duplication.

## CLI Dispatch Routing (`dispatch.sh` + `providers.json`)

7 providers, task-based routing (first available wins):

| Task | Chain |
|------|-------|
| Planning/architecture/debugging | claude > amp |
| Tests | codex > claude > gemini |
| Docs | gemini > claude > amp |
| Review | amp > claude |
| AWS/Amazon | kiro > claude |
| GitHub PR/issues | copilot > claude |
| Git ops | copilot > codex > claude |
| Boilerplate/simple edits | codex > copilot > claude > gemini |

---

## SDLC Overseer (`overseer/`)

Full virtual engineering team. Epic → 15 agents → requirements, plan, implement, test, merge, release.

**Run**: `bun overseer/overseer.ts --epic "description"` | `--internal` (Kiro) | `--status` | `--list`
**Dashboard**: `bun overseer/dashboard.ts --latest`

**Pipeline**: Requirements (GSD) → Planning → Execution (max 5 concurrent, git worktrees) → Quality → Integration → Release. Guardian monitors continuously.

**Key modules**: `db.ts` (SQLite), `scheduler.ts` (DAG), `worktree.ts` (git isolation), `spawner.ts` (multi-provider, `CLAUDECODE=''`), `knowledge.ts` (shared brain + Obsidian vault export), `kiro.ts` (internal mode), `browser-verify.ts` (automated UI checks).

**Database**: `~/.claude/data/overseer.db`. Vault: `.overseer/` (Daily/, Stories/, Notes/, References/, Templates/).

**Internal mode**: Auto-detects packageInfo/.brazil.json. Kiro becomes sidecar consultant for internal code/docs/tickets/CDK.

---

## GSD 2 (`gsd-pi`)

Standalone agent (Pi SDK). Better for external greenfield — cost tracking, crash recovery, fresh-session-per-task.

**Run**: `gsd` → `/gsd auto` | `gsd -p "task"` | `gsd headless` (CI)
**Config**: `~/.gsd/preferences.md`
**cmux bridge**: `bun overseer/gsd-bridge.ts /project` (phase→status pill, tasks→progress bar)
**Routing**: internal → Overseer. External+complex → GSD 2. Medium → `/build`.

---

## Fleet — Multi-Account Container Orchestration (`fleet/`)

Run tasks across multiple API accounts in isolated containers. N× throughput via pooled accounts.

**Run**: `fleet --pool tasks.json` | `--scatter "prompt"` | `--decompose "task"` | `--pipeline "task" --stages r,i,t` | `--superpowers "feature"` | `--superpowers "feature" --decompose`
**Setup**: `fleet --from-csv keys.csv` (recommended) | `--setup` | `--add-account`
**Monitor**: `fleet --live` | `--status` | `--accounts`
**Options**: `--workers N` | `--max-tasks N` (budget, default: workers×5)

### 6 Modes

| Mode | How It Works |
|------|-------------|
| **Pool** | Worker queue — N tasks round-robin across M accounts |
| **Scatter** | Same task to N workers, results merged |
| **Decompose** | AI splits into subtasks → parallel pool |
| **Pipeline** | Sequential stages, fresh account per stage |
| **Superpowers** | Plan → TDD tasks → fleet execute → review |
| **Superpowers+Decompose** | Decompose → parallel plans → pool → review |

### Key Architecture

- **Hybrid dispatch**: API key providers (claude, codex, gemini, copilot) → containers. Browser OAuth (kiro, amp) → local.
- **Warm container pool**: Pre-started with `sleep infinity`, tasks via `docker exec` (~2-3s saved/task)
- **Event-driven dispatch**: Completion notification queue replaces polling (zero delay)
- **Task budget**: `workers × 5` default, prevents over-decomposition. Full TDD cycles as single tasks.
- **Intel injection**: `project-intel.md` (8KB) + `codebase-patterns.md` (4KB) into planning prompts
- **Account pool**: Round-robin, rate-limit cooldown (429 detection), event-driven waitForAvailable
- **Container mounts**: CLAUDE.md, rules/, commands/, agents/, plugins/, skills/, scripts/, settings-fleet.json, project dir (rw)
- **Fleet settings**: `prepareFleetConfig()` strips hooks/MCP/model from host settings.json

**Config**: `~/.claude/fleet/accounts.json` (chmod 600). **Image**: `claude-fleet:latest` (~1.8GB). **DB**: `~/.claude/data/fleet.db`.

---

## Superpowers (obra/superpowers)

14 composable skills via marketplace plugin. Categories: workflow (brainstorming, plans, subagent-dev), quality (TDD, verification), debugging (systematic 4-phase), collaboration (code review), git (worktrees, branch finish), parallel dispatch.

**Install**: `claude plugin install superpowers@claude-plugins-official`
**Fleet**: `fleet --superpowers` — autonomous pipeline: plan → extract tasks → execute → two-stage review. With `--decompose`: decompose → parallel plans → pool → review. Brainstorming skill skipped in fleet (HARD-GATE).

---

## Community Integrations

4 repos, hybrid approach (plugin where designed, vendor where selective):

- **UI/UX Pro Max** (`nextlevelbuilder/ui-ux-pro-max-skill`): Marketplace plugin — 161 industry rules, 67 UI styles. Wired into adapter.sh + fleet.
- **Language Rules** (`affaan-m/everything-claude-code`): 10 lang rule sets in `universal/rules/lang/`. Staged to `~/.claude/lang-staging/` (not in rules/ — avoids 36KB auto-load). Project-scoped via `lib/lang-detect.sh`.
- **Build-Error-Resolver** (`affaan-m/everything-claude-code`): `agents/claude-code/agents/build-error-resolver.md`. Categorizes dependency/type/import/config/bundler errors. Referenced in orchestration.md Step 7.
- **/security-scan** + **/discover** (`affaan-m/everything-claude-code` + `hesreallyhim/awesome-claude-code`): Security audit command + community tool catalog.
- **Overseer Vault** (`kepano/kepano-obsidian`): `.overseer/` uses Obsidian-compatible layout (backward compatible).

---

## Known Gotchas

> Top 20 most impactful. Full list (68 items): `.claude/reference/gotchas-reference.md`

1. **Electrobun PATH** — augment with mise shims, homebrew, .local/bin
2. **Podman container names persist** — use `podman inspect` to detect + reuse
3. **npm install blocks event loop** — use spawn (async), not execFileSync
4. **Bedrock inference profiles** — use `us.anthropic.*` prefix, not raw model IDs
5. **`--dangerously-skip-permissions`** — on all 4 Claude spawn locations
6. **findDistDir()** — check `../views/ui` first for Electrobun bundle path
7. **macOS container HMR** — need CHOKIDAR_USEPOLLING=true (volume mounts don't propagate inotify)
8. **--continue session mismatch** — auto-retries as new session on fail
9. **claude-mem worker port 37777** — hardcoded in 6 locations
10. **Provider addition checklist** — 11 files across 3 layers
11. **Overseer nested sessions** — unset both `CLAUDECODE=''` AND `CLAUDE_CODE_ENTRYPOINT=''`
12. **Overseer planning agents** — must run in PROJECT_ROOT, not worktrees
13. **Fleet Bedrock in containers** — extract temp credentials, inject as env vars (not AWS_PROFILE)
14. **Fleet Bedrock API keys** — use `AWS_BEARER_TOKEN_BEDROCK=ABSK...` (not ANTHROPIC_API_KEY)
15. **Fleet browser-auth CLIs** — kiro/amp use browser OAuth → dispatch locally
16. **Fleet --superpowers brainstorming skip** — HARD-GATE blocks; use direct planning prompt
17. **Language rules COPIED not symlinked** — symlinks break in fleet containers
18. **Language rules project-scoped** — staged in `~/.claude/lang-staging/`, activated per-project only
19. **MCP readFileSync blocked** — use `execFileSync('cat', [path])` to bypass sandbox
20. **Duplicate superpowers plugin** — keep only `superpowers@claude-plugins-official`

---

## Quick Reference

### File Counts
- **90+** API endpoints, **13+** UI components, **22** templates, **11** LLM providers
- **7** agent adapters + 9 native agents + 15 SDLC agents
- **12** server route modules, **14** rule files + 10 language rules, **59** commands
- **14** overseer modules, **9** fleet modules, **14** superpowers skills
- **2** skills (pua, sequential-thinking), **3** container runtimes (Podman, Docker, Finch)

### Runtimes on This Machine
Podman 5.7.1 (preferred), Docker 5.7.1, Finch 1.15.1

### LLM Providers
Anthropic (Opus/Sonnet 4.6, Haiku 4.5), OpenAI (GPT-4o, o3-mini), Bedrock (Claude Sonnet/Haiku 4.5-4.6, Opus 4.5), Google (Gemini 2.5 Pro/Flash), Mistral, xAI (Grok-3), Groq, DeepSeek, Cohere, Together AI, OpenRouter (100+ models)
