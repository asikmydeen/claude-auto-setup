# claude-code-setup - Project Intelligence

> **Last updated**: 2026-03-16. Last incremental update: 2026-03-18 (Fleet multi-account orchestration)
> **Purpose**: Universal AI agent orchestration and configuration system + Electrobun desktop app (Sidekick)
> **Auto-generated**: Via intel refresh

---

## Stack

**Languages:**
- **Bash 3.2+** (primary) - Shell scripts for installation and orchestration
- **TypeScript** (desktop app) - React 19 + Elysia server for desktop UI
- **JSON/Markdown** - Configuration, agent definitions, and command specs

**Core Technologies:**
- **Electrobun** - Native desktop app framework (Bun + system WebView)
- **React 19 + Vite + Tailwind v4 + shadcn/ui** - Desktop app UI
- **Elysia** - Bun-native API server (90+ endpoints, 12 route modules, ~18x faster than Express)
- **bun:sqlite** - Persistent storage for sessions, messages, projects (WAL mode, zero deps)
- **Vercel AI SDK v6** - Multi-provider LLM integration (11 providers, 29+ models)
- **claude-mem** - Persistent cross-session memory (SQLite + Chroma, worker on port 37777)
- **Podman/Docker** - Default container runtime for dev server isolation (with HMR polling)
- **SSE (Server-Sent Events)** - Real-time Claude output + dev server logs streaming
- **stream-json** - Claude CLI streaming format for progressive tool/agent visibility
- **Template system** - 22 curated, verified design templates across 6 styles
- **Auto-pick engine** - Keyword-based template selection from user description
- **Port manager** - Auto-assign unique ports (4100+), no conflicts
- **Container reuse** - Detect and reattach to existing Podman containers
- **MCP (Model Context Protocol)** - Plugin integration (serena, context7, claude-mem-search)
- **Native agent system** - Claude Code agents with model selection, tool restrictions, persistent memory
- **Pattern conformance system** - Auto-extracted codebase patterns, enforcement rule, deviation protocol
- **SDLC Overseer** - Full virtual engineering team: 13 role-based agents, DAG scheduler, git worktree isolation, SQLite task management, centralized knowledge store
- **Fleet** - Multi-account container orchestration: 4 modes (pool, scatter, decompose, pipeline), Docker/Podman, hybrid dispatch (container for API-key CLIs, local for browser-auth CLIs)
- **Git-based distribution** - Self-updating via `git pull`

---

## Desktop App (`app/`)

### Architecture

```
app/
├── src/
│   ├── server/index.ts          # Elysia API (90+ endpoints, 12 route modules)
│   ├── bun/index.ts             # Electrobun bootstrap, starts Elysia + WKWebView
│   └── ui/
│       ├── pages/
│       │   ├── Claude.tsx       # Main chat UI (3200+ lines)
│       │   ├── Settings.tsx     # Settings, plugins, agent models
│       │   ├── Providers.tsx    # CLI provider install/auth instructions
│       │   └── Integrations.tsx # GitHub + Supabase + AWS config
│       ├── components/
│       │   ├── ProjectCreator.tsx    # Create project (template auto-pick + from scratch)
│       │   ├── AIProviders.tsx       # LLM provider API key management (11 providers)
│       │   ├── DevServerLogs.tsx     # Real-time container/dev server log viewer
│       │   ├── BrowserPanel.tsx      # Embedded browser with port detection
│       │   ├── TerminalPanel.tsx     # Integrated terminal
│       │   ├── SettingsDrawer.tsx    # Settings drawer (6 tabs)
│       │   ├── MemoryPanel.tsx       # claude-mem status, search, observation count
│       │   ├── ProjectIntel.tsx      # Intel panel
│       │   ├── OpsPanel.tsx          # Terminal-like ops
│       │   ├── FolderBrowser.tsx     # Project folder picker
│       │   └── Toast.tsx             # Toast notification system
│       ├── api/
│       │   └── config.ts            # All API client functions + types
│       └── context/
│           └── LinkContext.tsx       # External link interception for WKWebView
├── electrobun.config.ts         # Electrobun build config (copies dist → views/ui)
├── scripts/postbuild.ts         # Vite build + copy to views/ui
└── install.sh                   # Build & install to /Applications
```

### Key Features

**Project Creation Flow:**
1. User enters name + description
2. Server auto-picks best template from 22 curated designs (keyword matching)
3. `.env` auto-written with Supabase/AWS credentials (if connected in Integrations)
4. Enhanced build prompt: explore-first → install → customize → verify → self-review
5. Template copied → Claude customizes using the design as base (with quality standards)
6. SSE streams Claude's progress in chat (direct EventSource, immune to React hook race)
7. On completion: dev server auto-starts in Podman container (with HMR polling env vars)
8. BrowserPanel shows "Starting..." animation → auto-navigates when ready
9. DevServerLogs panel shows real-time container output

**Chat Experience:**
- Rich markdown rendering (headings, lists, bold, links — not monospace code blocks)
- Image input: attach png/jpg/gif/webp via file picker, uploaded as base64, passed via `--image` flag
- Continue button: always visible after "Done", sends resume prompt
- Regenerate button: resends last user message (shows as "Retry" on errors)
- Context-aware follow-up suggestions: analyzes response content (errors→"Fix errors", UI→"Polish design", API→"Add error handling")
- Follow-up resilience: `--continue` auto-retries as new session if it crashes, Reconnect button for manual recovery
- Message deduplication: pendingMessages filtered against session.messages to prevent doubles
- Toast notifications: useToast() hook from Toast.tsx (success/error/info/loading), wired into AIProviders, ProjectCreator, Integrations
- Accessibility: 30+ aria-labels on icon buttons, role="dialog" on modals, focus trap + ESC key in ProjectCreator
- Input validation: project name format (/^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/), API key prefix hints, soft format warnings
- Session sidebar skeleton loader when sessionsQuery.isLoading
- Session search & filters: SessionSearch.tsx component with search input (⌘K), status pills (All/Running/Done/Error), time pills (All time/Today/Week/Month), filtered count
- SessionItem enhanced: shows duration, file count, message count on metadata line
- matchesFilters() in Claude.tsx combines search + status + time range (client-side, no backend needed)

**Template System:**
- 22 verified templates (all pass npm install + build)
- 6 design styles: Clean/Classic, Material, Dark, Soft/Glass, Modern, Landing
- Frameworks: React, Next.js, Vue, Angular, Nuxt, HTML
- Auto-pick by keywords: "dark" → Black Dashboard, "material" → Material Tailwind, "landing" → Astro Launch UI
- Templates stored in `extracted_templates/`, curated manifest at `extracted_templates/curated.json`

**Dev Server Management:**
- Default runtime: Podman (auto-detected at startup: Podman > Docker > Finch)
- Auto-assign unique ports starting from 4100 (no conflicts)
- Container reuse: detects existing running containers via `podman inspect`
- HMR polling: `CHOKIDAR_USEPOLLING=true` + `WATCHPACK_POLLING=true` + `FAST_REFRESH=true` (macOS volume mounts)
- Project `.env` vars injected into container via `-e` flags
- Async dep install: `npm install` runs in background, server returns "installing" immediately
- Container cleanup on stop + graceful shutdown handler
- PATH augmented with mise shims, homebrew, .local/bin for Electrobun bundles

**Persistent Memory (claude-mem):**
- Plugin: `thedotmack/claude-mem` — installed via marketplace, auto-provisioned
- Worker service on port 37777 (auto-started via SessionStart hook)
- MCP server: `claude-mem-search` — provides search, timeline, get_observations tools
- 5 lifecycle hooks: SessionStart (install+worker+context), UserPromptSubmit (session-init), PostToolUse (observation), Stop (summarize), SessionEnd (session-complete)
- 3-layer search: search (50-100 tokens) → timeline (context) → get_observations (500-1000 tokens)
- Observation types: bugfix, feature, refactor, change, discovery, decision
- Memory tab in Settings drawer: status cards, search UI, observation count, DB size
- Server proxy: `/api/memory/status`, `/api/memory/search`, `/api/memory/observations`
- Health endpoint includes `memory.workerHealthy`
- Path allowlist on worker proxy for SSRF prevention

**Multi-Provider LLM Integration (Vercel AI SDK v6):**
- 11 providers: Anthropic, OpenAI, AWS Bedrock, Google, Mistral, xAI, Groq, DeepSeek, Cohere, Together AI, OpenRouter
- 29+ models total
- Bedrock: dual auth (AWS Profile with name input OR Bedrock API key)
- Streaming chat via SSE (textStream)
- API key validation via generateText() — proper error messages
- Settings → AI Models tab with per-provider config, test connection
- Model selector in chat input bar (grouped by provider)
- API keys stored in `~/.claude/integrations.json`

**Context-Aware Suggestions:**
- Pre-session: git-aware + topic-aware (testing, debugging, refactoring, API, UI, database)
- Post-session: analyzes actual response content for relevant suggestions
  - Errors detected → "Fix the remaining errors"
  - TODOs found → "Finish the TODOs"
  - UI/styling work → "Polish the design"
  - API/data work → "Add error handling"
  - Many files changed → "Fix navigation & routing"
- Cache with 10s TTL, keyed by cwd + sessionId

### Desktop App HTTP API (port 3201)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| **Claude Sessions** | | |
| POST | `/api/claude/sessions` | New session (--dangerously-skip-permissions, --image support) |
| POST | `/api/claude/sessions/:id/message` | Follow-up (--continue, auto-retry as new session on fail) |
| GET | `/api/claude/sessions/:id` | Get session |
| DELETE | `/api/claude/sessions/:id` | Delete session |
| POST | `/api/claude/sessions/:id/stop` | Stop session |
| GET | `/api/claude/stream/:id` | SSE stream |
| POST | `/api/images/upload` | Upload images (base64 → temp file, max 10) |
| **Memory** | | |
| GET | `/api/memory/status` | Worker health, observation/session count, DB size |
| GET | `/api/memory/search?q=...` | Search observations (proxied to worker, limit 1-100) |
| GET | `/api/memory/observations` | Recent observations |
| **Templates** | | |
| GET | `/api/templates` | Curated templates by design style |
| POST | `/api/projects/create-from-template` | Copy template + Claude customizes (enhanced prompt) |
| POST | `/api/projects/create` | From-scratch (enhanced prompt) |
| GET | `/api/projects/type` | Detect project type |
| **Dev Server** | | |
| POST | `/api/dev-server/start` | Start (Podman default, auto port, HMR polling, .env injection) |
| GET | `/api/dev-server/status` | Status + container info + output |
| POST | `/api/dev-server/stop` | Stop + release port |
| GET | `/api/dev-server/logs` | SSE stream of dev server output |
| **LLM Providers** | | |
| GET | `/api/llm/providers` | All providers + config status |
| GET | `/api/llm/models` | Configured models only |
| PUT | `/api/llm/keys` | Save API keys |
| GET | `/api/llm/keys` | Get masked keys |
| POST | `/api/llm/chat` | Streaming chat (any provider) |
| POST | `/api/llm/test` | Test provider connection |
| **Suggestions** | | |
| GET | `/api/suggestions` | Context-aware suggestions |
| GET | `/api/suggestions/followup/:id` | Content-aware post-session follow-ups |
| **Runtime** | | |
| GET | `/api/runtime/detect` | Container runtimes (Docker/Podman/Finch) |
| GET | `/api/health` | Server health + runtime + memory worker status |
| **Integrations** | | |
| GET/PUT/DELETE | `/api/integrations/github` | GitHub PAT |
| GET/PUT/DELETE | `/api/integrations/supabase` | Supabase config |
| GET/PUT/DELETE | `/api/integrations/aws` | AWS profile |

---

## Build/Test/Run

### Desktop App
- **Build**: `cd app && eval "$(mise activate zsh)" && bunx electrobun build`
- **Build (browser dev)**: `cd app && npm run dev` (Vite on 5173, Express on 3201)
- **Build (native dev)**: `cd app && bunx electrobun dev`
- **Install to /Applications**: `./app/install.sh`
- **IMPORTANT**: `mise exec --` prefix needed for node 24 (Vite build)

### Shell Scripts
- `make test` or `./tests/run.sh` — 31 smoke tests
- `make lint` — shellcheck (error-level)
- `./install.sh --dry-run` — preview install
- `./install.sh --doctor` — health check (includes claude-mem status)

---

## Credential Bridging (AI Models → CLI Agents)

API keys configured in Settings → AI Models automatically flow into CLI agent environments
via `buildProjectEnv()`. This is the core integration that makes everything work together.

| AI Models Credential | Environment Variable | Effect |
|---|---|---|
| Anthropic API key | `ANTHROPIC_API_KEY` | Claude Code works without subscription |
| Bedrock (no Anthropic) | `CLAUDE_CODE_USE_BEDROCK=1` + `AWS_PROFILE` | Claude Code via Bedrock |
| OpenAI key | `OPENAI_API_KEY` | Available to dispatch/tools/Codex |
| Google key | `GOOGLE_GENERATIVE_AI_API_KEY` | Gemini CLI + tools |
| Groq key | `GROQ_API_KEY` | Fast inference tools |
| OpenRouter key | `OPENROUTER_API_KEY` | Multi-model routing |

**Key scenario**: User with only Bedrock credentials → configures Bedrock profile in AI Models →
Claude Code gets `CLAUDE_CODE_USE_BEDROCK=1` → full multi-agent system works via Bedrock.

Health endpoint shows `bridgedCredentials` array for visibility.

## Supabase Auto-Integration

When Supabase is connected in Integrations, new projects automatically get:
- `.env` file with all credential variants: `SUPABASE_URL`, `REACT_APP_*`, `VITE_*`, `NEXT_PUBLIC_*`
- Build prompt tells Claude "SUPABASE IS ALREADY CONFIGURED" — no manual .env setup
- Container dev servers get all `.env` vars via `-e` flags
- `writeProjectDotEnv()` merges with existing .env (no duplicates)

## CLI Agent Setup Instructions (Providers Tab)

Each uninstalled provider shows install + auth commands:
- Claude: `npm install -g @anthropic-ai/claude-code` → `claude login`
- Codex: `npm install -g @openai/codex` → `codex login`
- Gemini: `npm install -g @anthropic-ai/gemini-cli` → `gemini auth`
- Amp: `npm install -g @anthropic-ai/amp` → `amp login`
- Kiro: `npm install -g @anthropic-ai/kiro-cli` → `kiro auth`
- Copilot: `brew install copilot-cli` → `copilot` then `/login` (requires GitHub Copilot subscription)

Alternative: just add API keys in AI Models tab — credentials bridge into CLI agents automatically.

## CLI Dispatch Routing (`dispatch.sh` + `providers.json`)

7 CLI providers with task-based routing. First available provider in chain is used.

| Task Type | Provider Chain |
|-----------|---------------|
| Planning, architecture, debugging | claude > amp |
| Test writing | codex > claude > gemini |
| Documentation | gemini > claude > amp |
| Code review | amp > claude |
| AWS/Amazon infrastructure | kiro > claude |
| GitHub PR/issue management | copilot > claude |
| Git operations | copilot > codex > claude |
| CI/CD / GitHub Actions | copilot > claude > kiro |
| Simple edits | codex > copilot > claude > gemini |
| Boilerplate | codex > gemini > claude |
| Frontend implementation | codex > claude > gemini |

Provider strengths: Claude (reasoning, planning, security), Codex (fast code gen, tests), Gemini (docs, large context), Amp (review, oracle), Kiro (AWS, internal tools), Copilot (GitHub-native workflows, PR/issues, CI/CD, git ops).

---

## SDLC Overseer (`overseer/`)

Full virtual engineering team system. User describes an epic → pipeline of 15 role-based agents gather requirements, plan, implement, test, merge, and release the feature.

**Run**: `bun overseer/overseer.ts --epic "description"` | `--status <id>` | `--list` | `--cleanup`
**Internal**: `bun overseer/overseer.ts --internal --epic "description"` (Kiro-assisted, Amazon patterns)
**Dashboard**: `bun overseer/dashboard.ts --latest` (live terminal TUI)

**Architecture**: 5-layer pipeline (Requirements → Planning → Execution → Integration → Release) with continuous Guardian oversight.

| Layer | Agents | What They Do |
|-------|--------|--------------|
| Requirements (GSD) | requirements-analyst, domain-researcher | Deep questioning → PROJECT.md, REQUIREMENTS.md, RESEARCH.md |
| Planning | product-manager, project-manager, tech-lead | Stories (traced to REQ-xxx) → tasks (DAG) → architecture |
| Execution | senior-engineer, engineer, frontend-engineer, backend-engineer | Implement in isolated git worktrees (max 5 concurrent) |
| Quality | qa-engineer, security-engineer | Tests + OWASP audit on merged code |
| Integration | merge-manager, devops-engineer, release-engineer | Merge branches, CI/CD, versioning |
| Oversight | guardian | Continuous: build health, scope creep, dangerous ops, non-tech user safety |

**Core modules** (`overseer/*.ts`):
- `db.ts` — SQLite schema: epics, stories, tasks, agent_sessions, knowledge, merge_queue, sprint_log
- `scheduler.ts` — DAG-based scheduling, max concurrency, blocked task detection
- `worktree.ts` — git worktree create/merge/cleanup (`.worktrees/task-{id}`)
- `spawner.ts` — spawn Claude/Codex/Copilot/Gemini/Kiro with `CLAUDECODE=''` in worktrees; internal-mode aware
- `knowledge.ts` — centralized shared brain (architecture decisions, API contracts, patterns)
- `kiro.ts` — Kiro consultation module: consultKiro(), detectInternalProject(), buildInternalContext()
- `board.ts` — Obsidian-compatible markdown board generator (board.md, epic.md, stories/, timeline.md)
- `dashboard.ts` — Live terminal TUI (readonly DB, safe concurrent access): progress bar, Kanban board, agent cards, event timeline
- `cmux.ts` — cmux app integration: sidebar status/progress, split dashboard, browser automation, notifications. All no-ops on non-macOS/SSH.
- `browser-verify.ts` — Automated UI verification: detect web project → start dev server → cmux browser split → run checks → screenshot → report
- `overseer.ts` — main orchestrator: requirements → planning → execution → merge → browser verify → done

**Database**: `~/.claude/data/overseer.db` (separate from sidekick.db)

**cmux integration** (`/Applications/cmux.app`): Sidebar shows status pill + progress bar (0%→100%) + agent logs. Dashboard opens in right split pane. Browser automation for UI verification (new-pane --type browser → get/is/click/screenshot). All functions are no-ops on Linux/SSH — platform-safe, tested across 5 scenarios.

**Browser verification**: After all tasks merged, auto-detects web projects (index.html or package.json), starts dev server, opens cmux browser, runs element checks (visible, text, title, count), takes screenshot, writes `.overseer/ui-verification.md`. Skipped gracefully without cmux.

**Internal mode**: Auto-detects packageInfo/.brazil.json/workplace paths. Kiro becomes sidecar consultant — Claude queries `kiro-cli -p` for internal code search, docs, tickets, CDK patterns, pipelines. Routing shifts to prefer kiro-cli for backend/api/infra/devops tasks.

**Kiro everywhere**: `internal-routing.md` rule loads in EVERY Claude session (not just overseer). Any Claude session in an internal project automatically consults Kiro.

**Live views**: Terminal dashboard (`dashboard.ts --latest`), Obsidian board (`.overseer/board.md`), SSE endpoint (`/api/sdlc/epics/:id/stream`), cmux sidebar (status pill + progress bar)

**Tested**: 12/12 tasks (external), 18/18 tasks (internal+Kiro), browser verification 5/5 checks passed.

---

## GSD 2 (`gsd-pi`)

Standalone coding agent (v2.28.0) on Pi SDK. Complements the Overseer — better for external greenfield projects with cost tracking and crash recovery.

**Install**: `mise exec node@24 -- npm install -g gsd-pi` (requires Node >= 20)
**Run**: `gsd` → `/gsd auto` (autonomous) | `gsd -p "task"` (single-shot) | `gsd headless` (CI)
**Config**: `~/.gsd/preferences.md` (Bedrock model `us.anthropic.claude-sonnet-4-6`, budget ceiling, verification commands)

**GSD 2 ↔ cmux bridge** (`overseer/gsd-bridge.ts`): watches `.gsd/` directory → mirrors to cmux sidebar.
- Phase → status pill (hammer=executing, magnifyingglass=researching, checkmark=done)
- Tasks → progress bar + sidebar logs
- Milestone complete → desktop notification
- HTML reports → auto-open in cmux browser split
- Usage: `bun overseer/gsd-bridge.ts /project` (watch mode)

**Routing**: internal projects → Overseer (`--internal`, Kiro). External + complex → GSD 2 (`gsd auto`). Medium → `/build`.

**Tested**: Counter web page via `gsd -p` — 8.4KB index.html with animations, verified in cmux browser (title, buttons, click interaction, screenshot).

---

## Fleet — Multi-Account Container Orchestration (`fleet/`)

Run AI tasks across multiple API accounts in isolated Docker/Podman containers. Complements the Overseer (which uses a single credential set) — Fleet adds N× throughput via pooled accounts.

**Run**: `bun fleet/fleet.ts --pool tasks.json` | `--scatter "prompt"` | `--decompose "task"` | `--pipeline "task" --stages r,i,t`
**Setup**: `bun fleet/fleet.ts --setup` (interactive) | `--init` (template) | `--add-account "Label" KEY=val`
**Manage**: `--status` | `--accounts` | `--stop` | `--build-image`
**Config**: `~/.claude/fleet/accounts.json` (chmod 600, dir chmod 700)
**Image**: `claude-fleet:latest` (~1.8GB) — claude-code + codex + gemini + copilot + bun + git, non-root `fleet` user
**Database**: `~/.claude/data/fleet.db` (fleet_runs, fleet_tasks, fleet_containers)

### 4 Execution Modes

| Mode | Command | How It Works |
|------|---------|-------------|
| **Pool** | `--pool tasks.json` | Worker queue — N tasks round-robin across M accounts |
| **Scatter** | `--scatter "prompt"` | Same task to N workers, results merged (best/merge/all) |
| **Decompose** | `--decompose "task"` | AI splits into subtasks, parallel pool dispatch |
| **Pipeline** | `--pipeline "task" --stages r,i,t` | Sequential stages, fresh account per stage |

### Hybrid Dispatch (Container vs Local)

| Auth Type | Providers | Runs In | Why |
|-----------|-----------|---------|-----|
| API key | claude, codex, gemini, copilot | **Container** | Credentials via `--env-file` (temp, deleted after spawn) |
| Browser OAuth | kiro, amp | **Local** | Needs persistent `~/.kiro/`, `~/.amp/` auth tokens |

Provider selection: task type → routing table → first available from account's credentials. Example: account with `ANTHROPIC_API_KEY` + `OPENAI_API_KEY` gets test-writing → routes to `codex`.

### Core Modules (`fleet/*.ts`)

| File | Lines | Purpose |
|------|-------|---------|
| `types.ts` | 168 | Account, Container, FleetTask, FleetConfig, DB records |
| `pool.ts` | 283 | AccountPool: round-robin, cooldown, requeue history, spawn limit |
| `container.ts` | 514 | ContainerManager: Docker/Podman lifecycle, provider command building, local fallback, stale detection |
| `db.ts` | 223 | SQLite: fleet_runs, fleet_tasks, fleet_containers (cached prepared statements) |
| `fleet.ts` | 826 | CLI orchestrator: all 4 modes + management commands |
| `setup.ts` | 378 | Interactive account wizard: 11 providers, credential collection, review + save |
| `bridge.ts` | 128 | cmux sidebar: status pills, progress bar, notifications (no-ops without cmux) |
| `Dockerfile` | 40 | Non-root image: node:22-slim + claude/codex/gemini/copilot + bun |

### Account Pool

- **Round-robin allocation** with `attemptedAccounts[]` tracking (avoids retrying same account on rate limit)
- **Rate limit detection**: scans output for 429/quota/overloaded → cooldown account → requeue task
- **Spawn safety limit**: `maxTotalSpawns` (default 500) prevents runaway container creation
- **Stale container detection**: warns on startup about orphaned `fleet-*` containers
- **Configurable**: memory, CPUs, timeout, cooldown duration, max concurrent workers

### install.sh Integration

- Fresh install: detects runtime → interactive setup prompt → builds image → creates config
- Update: rebuilds image if missing
- Doctor: 6 fleet health checks (config, perms, runtime, image, DB, stale containers)
- Dry run: all fleet operations preview without changes

### E2E Tested

| Mode | Tasks | Duration | Result |
|------|-------|----------|--------|
| Pool | 2/2 | 15s | `4`, `Paris` (parallel, Bedrock) |
| Scatter | 2/2 | 11s | Both `Python, JavaScript, Java` (merged) |
| Pipeline | 2/2 | 112s | implement → test → 11/11 tests pass |

---

## Known Gotchas

1. **Electrobun PATH limited** — augment with mise shims, homebrew, .local/bin
2. **Tailwind v4 arbitrary values** — `translate-x-[22px]` doesn't generate; use inline styles
3. **Podman container names persist** — use `podman inspect` to detect + reuse running containers
4. **npm install blocks event loop** — must use spawn (async), not execFileSync
5. **Double response crash** — never call `waitForReady(res)` after already sending `res.json()`
6. **Bedrock inference profiles** — use `us.anthropic.*` prefix, not raw model IDs
7. **AI SDK streamText swallows errors** — use `generateText()` for testing/validation
8. **BrowserPanel port scanning** — `initialUrl` must take priority over auto-scan
9. **SSE done event race** — useSSE resets `done=false` when sseSessionId changes; direct EventSource in onProjectCreated bypasses this
10. **Default to npm** — bun not globally available via mise in Electrobun bundles
11. **`--dangerously-skip-permissions`** — on all 4 Claude spawn locations
12. **Template `--openssl-legacy-provider`** — needed for older React/Vue templates
13. **findDistDir()** — check `../views/ui` first for Electrobun bundle path
14. **Container reuse** — `podman inspect` before create; reattach log follower if running
15. **Sidebar delete hang** — reset activeProjectPath + activeId when removing last project
16. **Clean Electrobun build** — `rm -rf dist/ build/` to avoid stale cache
17. **autoStartAndPreview on every click** — not just expand; handles "already running" gracefully
18. **macOS container HMR** — volume mounts don't propagate inotify; need CHOKIDAR_USEPOLLING=true
19. **--continue session mismatch** — fails if another session ran in same cwd; auto-retries as new session
20. **Base64 image upload** — chunked 8KB batches; `btoa(String.fromCharCode(...arr))` crashes on >16KB
21. **Pending message dedup** — filter pendingMessages against session.messages to prevent doubles
22. **claude-mem worker port 37777** — hardcoded in 6 locations; change requires coordinated update
23. **claude-mem hooks merge** — deep merge by command dedup; Stop hook was missing on first installs
24. **claude-mem stats nested** — worker returns `{ database: { observations, sessions, size } }`, not flat
25. **Toast system** — `useToast()` from `Toast.tsx`; provider wraps App in `ToastProvider`; auto-dismiss after 3s (loading toasts persist)
26. **Focus trap selector** — must exclude `:disabled` elements or focus gets stuck on disabled buttons
27. **DevServerLogs reconnect** — don't clear logs on reconnect; SSE replay event handles buffer replay
28. **Copilot CLI binary vs wrapper** — standalone `copilot` binary OR `gh copilot` wrapper (auto-downloads on first use); detect both in install.sh
29. **Copilot auth** — requires GitHub Copilot subscription; token precedence: `COPILOT_GITHUB_TOKEN` > `GH_TOKEN` > `GITHUB_TOKEN`
30. **Provider addition checklist** — 11 files across 3 layers: dispatch.sh, install.sh (4 locations), adapter, providers.json, Providers.tsx, settings.ts, init.md, build.md, orchestration.md, CLAUDE.md, project-intel.md
31. **Overseer planning agents must run in PROJECT_ROOT** — not worktrees; `.overseer/` artifacts need to be in project root for parsing
32. **Overseer spawner must call assignTask()** — without it, `branch_name` stays null and merge enqueue fails
33. **Overseer nested Claude sessions** — must unset both `CLAUDECODE=''` AND `CLAUDE_CODE_ENTRYPOINT=''` or child sessions block
34. **Overseer stories/tasks parsing** — PM/PjM may fail to write valid JSON; fallback story/task generation prevents pipeline stall
35. **Overseer merge order** — follows DAG dependencies; tasks with failed deps get marked blocked→failed automatically
36. **Fleet Docker volume mounts on macOS** — `/tmp` is `/private/tmp`, not accessible to Docker; use `~/` paths instead
37. **Fleet `--dangerously-skip-permissions` as root** — Claude Code blocks this flag when running as root; Dockerfile must use non-root `fleet` user
38. **Fleet container record uniqueness** — container DB IDs include timestamp to prevent UNIQUE constraint failures across runs
39. **Fleet Bedrock in containers** — `AWS_PROFILE` alone insufficient; extract temp credentials via `aws configure export-credentials --format env` and inject `AWS_ACCESS_KEY_ID` + `AWS_SECRET_ACCESS_KEY` + `AWS_SESSION_TOKEN`
40. **Fleet browser-auth CLIs** — Kiro (`kiro auth`) and Amp (`amp login`) use browser OAuth; cannot run in non-persistent containers; fleet dispatches these locally via `spawn()` instead
41. **Fleet env-file cleanup** — credentials written to temp file for `--env-file`, deleted 5s after container start; timeout handler doesn't explicitly clean up (OS cleans `/tmp` eventually)

---

## Quick Reference

### File Counts
- **65+** API endpoints (~4,500 line server)
- **13+** UI components (AIProviders, DevServerLogs, BrowserPanel, MemoryPanel, etc.)
- **22** curated templates (6 design styles, all verified)
- **11** LLM providers (29+ models)
- **7** agent adapters (claude-code, gemini-cli, kiro-cli, codex-cli, cursor, ampcode, copilot) + 9 native agents + 15 SDLC agents
- **2** skills: `pua` (persistence engine), `sequential-thinking` (structured reasoning)
- **12** server route modules (Elysia) + 4 lib modules (shared, database, cleanup, logger)
- **14** universal rule files (including gsd-integration, internal-routing), 57 command definitions (including sdlc, mem-search)
- **1** pattern template (`patterns-template.md`) + per-project `codebase-patterns.md`
- **14** overseer modules (`overseer/*.ts` including gsd-bridge) + architecture docs
- **8** fleet modules (`fleet/*.ts` + Dockerfile) — multi-account container orchestration
- **2** WebSocket endpoints (ops, terminal)
- **3** container runtimes supported (Podman, Docker, Finch)

### Container Runtimes on This Machine
- Podman 5.7.1 (preferred)
- Docker 5.7.1
- Finch 1.15.1

### LLM Providers
- Anthropic: Claude Opus/Sonnet 4.6, Haiku 4.5
- OpenAI: GPT-4o, GPT-4o-mini, o3-mini
- AWS Bedrock: Claude Sonnet 4.6, Haiku 4.5, Sonnet 4, Opus 4.5 (inference profiles)
- Google: Gemini 2.5 Pro/Flash
- Mistral: Large, Small
- xAI: Grok-3, Grok-3 Mini
- Groq: Llama 3.3, DeepSeek R1 (fast inference)
- DeepSeek: Chat, Reasoner
- Cohere: Command R+, Command R
- Together AI: Llama 405B, Qwen 72B
- OpenRouter: 100+ models (single key, @ai-sdk/openai with custom baseURL)
