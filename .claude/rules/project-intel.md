# claude-code-setup - Project Intelligence

> **Last updated**: 2026-03-10
> **Purpose**: Universal AI agent orchestration and configuration system
> **Auto-generated**: Via intel refresh (targeted scan of 13 commits since last update)

---

## Stack

**Languages:**
- **Bash 3.2+** (primary) - Shell scripts for installation and orchestration
- **Node.js 18+** (dashboard only) - Express server for real-time monitoring
- **JSON/Markdown** - Configuration, agent definitions, and command specs

**Core Technologies:**
- **MCP (Model Context Protocol)** - Plugin integration
- **Server-Sent Events (SSE)** - Real-time dashboard updates
- **Native agent system** - Claude Code agents with model selection, tool restrictions, persistent memory
- **Agent teams** (experimental) - Multi-session parallel agent coordination
- **Context preservation** - Checkpoint system surviving context compaction
- **Cross-provider dispatch** - Routes tasks to best available AI agent
- **Git-based distribution** - Self-updating via `git pull`

**No build tools** - Pure shell script execution (no compilation step)

---

## Entry Points

### Primary Entry Points

1. **`install.sh`** (569 lines)
   - Main installer that auto-detects and configures 6 AI coding agents
   - Modes: `--update`, `--self-update`, `--agents=<list>`, `--force`, `--dry-run`, `--uninstall`
   - Also installs native agents to `~/.claude/agents/` and dashboard service

2. **`project-init.sh`** (239 lines)
   - Per-project initializer for `.ai/` shared directory
   - Creates symlinks/copies based on detected agents

3. **`dispatch.sh`** (265 lines)
   - Cross-provider task dispatcher
   - Routes tasks to best available AI agent based on task type
   - Reads `universal/providers.json` for routing preferences

### Secondary Entry Points

4. **`dashboard/server.js`** (431 lines)
   - Express server on port 3200 for real-time agent monitoring
   - SSE-based agent state broadcasting, file watching via chokidar
   - Steering commands (pause, instruct) from UI to agents

5. **`orchestration-intel.sh`** (169 lines) - Orchestration intelligence demo/helper
6. **`demo-intelligence.sh`** (143 lines) - Intelligence system demonstration
7. **`dashboard/report.sh`** (68 lines) - Agent state reporter (curl-based)
8. **`dashboard/install-service.sh`** (146 lines) - systemd/launchd service installer

9. **Agent adapters** - `agents/*/adapter.sh` - Translates universal config to agent-specific format

---

## Build/Test/Lint Commands

### Build
- **No build process** - Shell script project, no compilation
- Dashboard: `cd dashboard && npm install` (only if running dashboard)

### Test
- `make test` or `./tests/run.sh` — 24 smoke tests (CLI flags, structure, shellcheck)
- `./install.sh --dry-run` — preview install without changes

### Lint
- `make lint` — shellcheck (error-level) on all main scripts
- `make lint-warn` — shellcheck (warning-level) for stricter check

### Run
- Installation: `./install.sh` (or `make install`)
- Update only: `./install.sh --update` (or `make update`)
- Self-update: `./install.sh --self-update` (or `make self-update`)
- Project init: `./project-init.sh`
- Dispatch: `./dispatch.sh --task "prompt" --type <task-type>`
- Dashboard: `cd dashboard && npm start`
- Health check: `./install.sh --doctor` (or `make doctor`)
- Version: `./install.sh --version` (or `make version` / `cat VERSION`)
- Clean worktrees: `make clean`

---

## Architecture Overview

### Design Pattern: **Adapter + Single Source of Truth + Native Agents**

```
universal/                      # Single source of truth (agent-agnostic)
├── rules/                      # 6 shared global rules
├── commands/                   # 52 command definitions (12,096 lines total)
├── intel-template.md          # Template for cached codebase intelligence
└── providers.json             # Cross-provider routing config (5 providers)

agents/                         # Agent-specific adapters
├── claude-code/               # Translates universal → Claude format
│   ├── agents/                # 5 native agent definitions
│   ├── settings.json          # 14 plugins, hooks, permissions, env vars
│   └── CLAUDE.md              # Global rules + auto-role
├── gemini-cli/                # → Gemini format
├── kiro-cli/                  # → Kiro format
├── codex-cli/                 # → Codex format
├── cursor/                    # → Cursor format
└── ampcode/                   # → Amp format
```

### Key Architectural Principles

1. **Single source of truth** - `universal/` directory is authoritative
2. **Adapter pattern** - Each agent has an adapter that translates universal → agent-specific
3. **Native agents** - Claude Code agents with model/tool/memory config (preferred over commands)
4. **Auto-detection** - Agents detected via `command -v <agent>`
5. **Merge don't overwrite** - Settings merged intelligently (requires python3)
6. **Graceful degradation** - Works when optional tools unavailable
7. **Context preservation** - Checkpoint system at `.claude/scratch/task-state.md`
8. **Idempotent operations** - Safe to run multiple times

### Data Flow

**Installation:**
```
install.sh → detect_agents() → backup() → For each agent: adapter.sh install → install native agents → install dashboard service → summary()
```

**Orchestration:**
```
User request → Coordinator → Load intel → Classify task → Select team (native agents first) → Explore → Plan → Implement (parallel) → Review → Verify → Update intel
```

**Dashboard:**
```
Agent work → report.sh / curl POST → server.js → SSE → Dashboard UI → Steering commands → Agents
```

**Cross-Provider Dispatch:**
```
dispatch.sh → read providers.json → detect installed providers → select best match → invoke non-interactive → return output
```

---

## Directory Map

```
claude-code-setup/
├── universal/                      # Agent-agnostic shared content
│   ├── rules/                      # 6 global rule files
│   │   ├── code-quality.md         # TypeScript/React standards
│   │   ├── git-workflow.md         # Commit format, branch naming
│   │   ├── security.md             # OWASP Top 10, secrets
│   │   ├── testing.md              # Test-first approach
│   │   ├── aws-development.md      # AWS-specific patterns
│   │   └── orchestration.md        # Multi-agent protocol (expanded w/ checkpoints)
│   ├── commands/                   # 52 command definitions (12,096 lines)
│   │   ├── init.md                 # Smart project initializer
│   │   ├── deep-research.md        # 6-agent parallel analysis
│   │   ├── build.md                # Multi-agent feature implementation
│   │   ├── debug.md                # Multi-agent debugging
│   │   ├── review.md               # Multi-agent code review
│   │   ├── quick.md                # Fast single-file changes
│   │   ├── multi-provider-build.md # Cross-provider feature builder
│   │   ├── intel-refresh.md        # Targeted intel refresh
│   │   ├── coordinator.md          # Coordinator role
│   │   ├── [7 role commands]       # developer, reviewer, shepherd, etc.
│   │   └── [37 specialist commands]# api-designer, backend-developer, etc.
│   ├── intel-template.md           # Template for project-intel.md
│   └── providers.json              # 5 providers, 18 task routes
│
├── agents/                         # Agent-specific adapters
│   ├── claude-code/
│   │   ├── adapter.sh              # Install/uninstall + native agent install
│   │   ├── CLAUDE.md               # Global rules + auto-role
│   │   ├── settings.json           # 14 plugins, hooks, permissions, env
│   │   └── agents/                 # 5 native agent definitions
│   │       ├── code-reviewer.md    # Sonnet, read-only, persistent memory
│   │       ├── debugger.md         # Full tools, 40 turn limit
│   │       ├── test-writer.md      # Background execution
│   │       ├── explorer.md         # Haiku (fast/cheap), read-only, 20 turns
│   │       └── security-auditor.md # Persistent memory for patterns
│   ├── gemini-cli/
│   ├── kiro-cli/
│   ├── codex-cli/
│   ├── cursor/
│   └── ampcode/
│
├── dashboard/                      # Real-time monitoring dashboard
│   ├── server.js                   # Express + SSE (431 lines)
│   ├── package.json                # express ^4.21, chokidar ^4.0
│   ├── public/index.html           # Dashboard UI (vanilla JS, 699 lines)
│   ├── install-service.sh          # systemd/launchd service installer
│   └── report.sh                   # Agent state reporter
│
├── lib/                            # Shared shell utilities
│   └── common.sh                   # Colors, logging, has_cmd helper
│
├── tests/                          # Smoke tests
│   └── run.sh                      # 29 tests (CLI flags, doctor, version, structure, shellcheck)
│
├── Makefile                        # Task runner (install, test, lint, clean, etc.)
├── VERSION                         # Centralized version (single source of truth)
├── CHANGELOG.md                    # Release changelog
├── install.sh                      # Main installer (~770 lines, includes --doctor)
├── project-init.sh                 # Per-project initializer (238 lines)
├── dispatch.sh                     # Cross-provider dispatcher with fallback (340 lines)
├── orchestration-intel.sh          # Orchestration intelligence helper (155 lines)
├── demo-intelligence.sh            # Intelligence system demo (143 lines)
├── ORCHESTRATION-INTEL.md          # Orchestration intelligence docs
├── ANALYSIS.md                     # Architecture and roadmap
├── README.md                       # Project overview
└── .claude/rules/project-intel.md  # THIS FILE
```

---

## API Surface

### Shell Script APIs

**install.sh:**
```bash
./install.sh                    # Fresh install (auto-detect)
./install.sh --update           # Update commands/rules only (preserves settings)
./install.sh --self-update      # Git pull + update
./install.sh --agents=claude,gemini  # Specific agents only
./install.sh --agents=all       # All adapters regardless of detection
./install.sh --force            # Overwrite ALL config including settings
./install.sh --dry-run          # Preview changes
./install.sh --uninstall        # Remove all config
```

**dispatch.sh:**
```bash
./dispatch.sh --task "prompt" --type test-writing
./dispatch.sh --task "prompt" --type code-review-security --provider claude
./dispatch.sh --task "prompt" --context src/file.ts  # Include file context
./dispatch.sh --list-providers
./dispatch.sh --list-routes
```

### Dashboard HTTP API (port 3200)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/` | Dashboard UI |
| GET | `/events` | SSE real-time updates |
| POST | `/api/sessions` | Register new session |
| GET | `/api/sessions` | List all sessions |
| GET | `/api/sessions/:id` | Get session details |
| POST | `/api/sessions/:id/agents` | Report agent state |
| POST | `/api/sessions/:id/steering` | Inject steering command |
| GET | `/api/sessions/:id/commands` | Get pending steering commands |

---

## Settings Structure (Claude Code)

```json
{
  "permissions": { "allow": ["Bash(git *)", "Bash(npm *)..."], "deny": ["Read(.env*)..."] },
  "model": "claude-opus-4-6",
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1",
    "CLAUDE_AUTOCOMPACT_PCT_OVERRIDE": "80"
  },
  "hooks": {
    "SessionStart": [{ "command": "register with dashboard + output context" }],
    "PostToolUse": [{ "matcher": "Edit|Write", "command": "eslint on JS/TS files" }]
  },
  "enabledPlugins": {
    "typescript-lsp": true, "pyright-lsp": true, "context7": true,
    "serena": true, "code-review": true, "code-simplifier": true,
    "pr-review-toolkit": true, "security-guidance": true,
    "commit-commands": true, "feature-dev": true,
    "claude-md-management": true, "hookify": true,
    "skill-creator": true, "github": true
  }
}
```

---

## Native Agents (Claude Code)

| Agent | Model | Tools | Memory | Special |
|-------|-------|-------|--------|---------|
| code-reviewer | Sonnet | Read-only | Persistent | — |
| debugger | Opus | Full access | Persistent | 40 turn limit |
| test-writer | Opus | Full access | Persistent | Background exec |
| explorer | Haiku | Read-only | — | 20 turn limit, fast/cheap |
| security-auditor | Opus | Full access | Persistent | Learns patterns |

**Priority**: Native agents > Command agents > Agent teams

---

## Known Gotchas

1. **Python 3 for settings merge** - Falls back silently if missing
2. **Plugin installation** - Relies on external `claude plugin install` command
3. **Symlink vs copy** - Cursor requires copies, Claude uses symlinks
4. **Context compaction** - Use checkpoint system (`.claude/scratch/task-state.md`)
5. **CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=80** - Triggers compaction earlier for more working room
6. **Agent teams experimental** - Requires `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`
7. **Dashboard optional** - File-based fallback if server not running; `--connect-timeout 1` prevents blocking
8. **macOS bash 3.2** - All scripts compatible (no `declare -A`, no bash 4+ features)
10. **Hook ESLint** - PostToolUse hook runs eslint on JS/TS files after Edit/Write; may slow workflow

---

## Quick Reference

### Supported Agents

| Agent | CLI | Config Location |
|-------|-----|-----------------|
| Claude Code | `claude` | `~/.claude/` |
| Gemini CLI | `gemini` | `~/.gemini/` |
| Codex CLI | `codex` | `~/.codex/` |
| Cursor | `cursor` | `~/.cursor/` |
| Kiro CLI | `kiro` | `~/.kiro/` |
| Amp Code | `amp` | `~/.config/agents/` |

### Key Workflows

| Command | Purpose |
|---------|---------|
| `/init` | Smart project initializer + auto deep-research |
| `/deep-research` | 6-agent parallel codebase analysis |
| `/build <feature>` | End-to-end multi-agent feature implementation |
| `/review [target]` | Multi-agent code review |
| `/debug <problem>` | Multi-agent debugging |
| `/quick <task>` | Fast no-spec single-file changes |
| `/intel-refresh` | Targeted intel update |
| `/multi-provider-build` | Cross-provider feature builder |

### File Counts

- **7** universal rule files
- **52** command definitions (12,096 lines)
- **6** agent adapters
- **5** native agents (Claude Code)
- **5** main shell scripts (1,883 lines total)
- **14** enabled plugins

### Providers on This Machine

- Claude: installed (`~/.local/bin/claude`)
- Kiro CLI: installed (`~/.local/bin/kiro-cli` v1.27.1) — binary is `kiro-cli` not `kiro`
  - MCP tools: `@builder-mcp/ReadRemoteTestRun`, `InternalCodeSearch`, `ReadInternalWebsites`
  - Models: claude-sonnet-4.5, claude-sonnet-4, claude-haiku-4.5, deepseek-3.2, minimax-m2.1, qwen3-coder-next
- Codex: not installed
- Gemini: not installed
- Amp: not installed
- Dispatch script: available at `~/claude-code-setup/dispatch.sh`
