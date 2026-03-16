# claude-code-setup - Project Intelligence

> **Last updated**: 2026-03-16
> **Purpose**: Universal AI agent orchestration and configuration system + Electrobun desktop app (Sidekick)
> **Auto-generated**: Via intel refresh

---

## Stack

**Languages:**
- **Bash 3.2+** (primary) - Shell scripts for installation and orchestration
- **TypeScript** (desktop app) - React 19 + Express server for desktop UI
- **JSON/Markdown** - Configuration, agent definitions, and command specs

**Core Technologies:**
- **Electrobun** - Native desktop app framework (Bun + system WebView)
- **React 19 + Vite + Tailwind v4 + shadcn/ui** - Desktop app UI
- **Express** - API server (65+ endpoints, ~4,500+ lines, embedded in Electrobun main process)
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
- **Git-based distribution** - Self-updating via `git pull`

---

## Desktop App (`app/`)

### Architecture

```
app/
├── src/
│   ├── server/index.ts          # Express API (4500+ lines, 65+ endpoints)
│   ├── bun/index.ts             # Electrobun bootstrap, starts Express + WKWebView
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

Alternative: just add API keys in AI Models tab — credentials bridge into CLI agents automatically.

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

---

## Quick Reference

### File Counts
- **65+** API endpoints (~4,500 line server)
- **13+** UI components (AIProviders, DevServerLogs, BrowserPanel, MemoryPanel, etc.)
- **22** curated templates (6 design styles, all verified)
- **11** LLM providers (29+ models)
- **6** agent adapters + 8 native agents (including memory-observer)
- **10** universal rule files, 56 command definitions (including mem-search)
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
