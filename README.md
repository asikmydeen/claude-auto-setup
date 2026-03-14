# Universal AI Agent Setup

One-command setup for **all** your AI coding agents. Shared rules, shared codebase intelligence, agent-specific adapters. Includes a **native desktop app** for managing and chatting with Claude Code agents.

## Quick Start

```bash
git clone git@github.com:asikmydeen/claude-auto-setup.git
cd claude-auto-setup
./install.sh            # auto-detects installed agents and configures them
```

### Desktop App (Electrobun)

A native macOS app for interacting with Claude Code — like Lovable but for your codebase:

```bash
cd app
bun install             # first time only
bunx electrobun dev     # opens native macOS window
```

Features:
- **Chat with Claude** — multi-turn conversations with real-time streaming
- **Multi-project** — open multiple projects, sessions grouped by project
- **Agent visibility** — see tool use and sub-agent activity as it happens
- **Smart suggestions** — context-aware prompts based on git status and project files
- **Settings UI** — configure models, plugins, permissions, agent definitions
- **Markdown rendering** — responses with tables, code blocks, headers, links

## Supported Agents

| Agent | Status | Config Location |
|---|---|---|
| **Claude Code** (Anthropic) | Full support | `~/.claude/` |
| **Gemini CLI** (Google) | Full support | `~/.gemini/` |
| **Kiro CLI** (AWS) | Full support | `~/.kiro/` |
| **Codex CLI** (OpenAI) | Full support | `~/.codex/` |
| **Cursor** (Anysphere) | Rules only | `~/.cursor/` |
| **Amp Code** (Sourcegraph) | Full support | `~/.config/agents/` |

## What It Does

### Global Setup (`install.sh`)
Configures each detected agent with:
- **55 commands** — 7 roles + 37 specialist subagents + 6 orchestration workflows + PUA
- **9 global rules** — code quality, AWS dev, testing, security, git workflow, orchestration, multi-agent, PUA, context management
- **14 plugins** — LSP, context7, serena, code-review, security (Claude Code)
- **6 native agents** — code-reviewer, debugger, test-writer, explorer, security-auditor, pua-enforcer
- **Optimized settings** — permissions, hooks, deny rules, model config

### Desktop App (`app/`)

A Lovable-style native desktop application built with Electrobun:

```
┌─────────────────┬──────────────────────────────────┐
│ Projects        │  Chat with Claude Code           │
│                 │                                  │
│ ▼ my-project    │  [User] Build a login page       │
│   ├─ Session 1  │                                  │
│   └─ Session 2  │  [Claude] I'll create a login    │
│                 │  component with...               │
│ ▼ other-project │  ┌─ 3 tools used ──────────┐    │
│   └─ Session 3  │  │ ✓ Read  src/App.tsx      │    │
│                 │  │ ✓ Write src/Login.tsx     │    │
│ [+ Open Project]│  │ ✓ Bash  npm test         │    │
│                 │  └──────────────────────────┘    │
│ ⚙ Settings      │                                  │
│ 🌙 Theme        │  [Follow-up suggestions...]      │
├─────────────────┼──────────────────────────────────┤
│                 │  Ask Claude anything...  [Send]   │
└─────────────────┴──────────────────────────────────┘
```

**Tech stack:** Electrobun + React 19 + Vite + Tailwind v4 + shadcn/ui + Express

**Key features:**
- **Real-time streaming** via SSE (stream-json format) — see responses as they're generated
- **Tool activity** — collapsible accordions showing Read, Edit, Bash, Grep operations
- **Agent activity** — see sub-agents (explorer, code-reviewer, test-writer) working
- **Multi-turn** — follow-up messages use `--continue` for full conversation context
- **Multi-project** — sessions grouped by project directory, open projects persisted
- **Smart suggestions** — based on git status, package.json, project structure
- **Follow-up suggestions** — "Write tests", "Commit changes", "Review what you did"
- **File change tracking** — see what files Claude modified per session
- **Folder browser** — native-feeling directory navigator for adding projects
- **Settings drawer** — model selection, 15 plugin toggles, permissions, env vars, agent model config
- **Git integration** — branch, status, change count per project

### Per-Project Setup (`project-init.sh`)
Run in any project to create shared AI config:
```bash
cd /path/to/your/project
/path/to/claude-auto-setup/project-init.sh
```

### Cross-Provider Dispatch (`dispatch.sh`)
Routes tasks to the best available AI agent:
```bash
./dispatch.sh --task "write unit tests for src/api/users.ts" --type test-writing
./dispatch.sh --task "review this diff for security" --type code-review-security
./dispatch.sh --list-providers   # show installed providers
./dispatch.sh --list-routes      # show task routing table
```

## Architecture

```
claude-auto-setup/
  app/                            # Desktop app (Electrobun)
    src/
      bun/index.ts                # Main process: BrowserWindow + server
      server/index.ts             # Express API (25+ endpoints, 1500+ lines)
      ui/                         # React 19 + Vite + Tailwind v4
        pages/Claude.tsx          # Chat interface (2400+ lines)
        pages/Settings.tsx        # Settings editor
        pages/Providers.tsx       # Provider status
        pages/Rules.tsx           # Rule viewer
        components/               # Shared components
    electrobun.config.ts          # Electrobun build config
  universal/                      # Agent-agnostic (single source of truth)
    rules/                        # 9 shared rule files
    commands/                     # 55 command definitions
    providers.json                # Cross-provider routing config
    intel-template.md             # Template for project intelligence
  agents/                         # Agent-specific adapters
    claude-code/                  # Claude format + native agents
    gemini-cli/                   # Gemini format
    kiro-cli/                     # Kiro format
    codex-cli/                    # Codex format
    cursor/                       # Cursor format
    ampcode/                      # Amp format
  lib/common.sh                   # Shared shell utilities
  tests/run.sh                    # Smoke tests (31 tests)
  install.sh                      # Global installer
  project-init.sh                 # Per-project initializer
  dispatch.sh                     # Cross-provider task dispatcher
```

## Key Workflows (Claude Code)

| Command | Description |
|---|---|
| `/init` | Scan project + auto-generate codebase intelligence |
| `/deep-research` | 6-agent deep codebase analysis |
| `/build <feature>` | Multi-agent end-to-end implementation |
| `/review` | Multi-agent code review (quality + security + perf + architecture) |
| `/debug <problem>` | Multi-agent investigation and fix |
| `/quick <task>` | Fast single-file changes (skip full spec) |
| `/intel-refresh` | Targeted refresh of stale intel sections |
| `/pua` | Activate PUA persistence engine when stuck |

## Codebase Intelligence System

Cached codebase knowledge that auto-updates:

```
/init (first time)
  -> 6 parallel agents deep-scan your codebase
  -> Generates .ai/project-intel.md (< 300 lines, dense reference)
  -> Loads automatically every session

/build "add pagination"
  -> Reads cached intel (knows architecture already)
  -> Implements with parallel agents
  -> After completion: auto-patches intel with changes

/intel-refresh (manual)
  -> Detects which sections are stale
  -> Refreshes only affected sections
```

## Install Options

```bash
./install.sh                         # Auto-detect and install all agents
./install.sh --update                # Update commands/rules only (preserves settings)
./install.sh --self-update           # Git pull latest + update
./install.sh --agents=claude,gemini  # Only specific agents
./install.sh --agents=all            # All agents regardless of detection
./install.sh --force                 # Overwrite existing config (backs up first)
./install.sh --dry-run               # Preview changes
./install.sh --uninstall             # Remove and restore from backup
./install.sh --doctor                # Health check
./install.sh --version               # Show version
```

## Testing

```bash
make test                            # Run smoke tests (31 tests)
make lint                            # Shellcheck (error-level)
make lint-warn                       # Shellcheck (warning-level)
```

## Platform Support

- **macOS** (Intel, Apple Silicon) — desktop app + CLI
- **Linux** (Amazon Linux, Ubuntu, Debian, Fedora) — CLI only
- **Windows** (WSL2, Git Bash) — CLI only

## License

MIT
