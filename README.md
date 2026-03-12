# Universal AI Agent Setup

One-command setup for **all** your AI coding agents. Shared rules, shared codebase intelligence, agent-specific adapters.

## Quick Start

```bash
git clone git@github.com:asikmydeen/claude-auto-setup.git
cd claude-auto-setup
./install.sh            # auto-detects installed agents and configures them
./install.sh --version  # check installed version
```

That's it. The installer finds which agents you have and configures all of them with shared rules, commands, and optimized settings.

## Supported Agents

| Agent | Status | Instructions File | Config Location |
|---|---|---|---|
| **Claude Code** (Anthropic) | Full support | `CLAUDE.md` | `~/.claude/` |
| **Gemini CLI** (Google) | Full support | `GEMINI.md` | `~/.gemini/` |
| **Kiro CLI** (AWS) | Full support | Steering files | `~/.kiro/` |
| **Codex CLI** (OpenAI) | Full support | `AGENTS.md` | `~/.codex/` |
| **Cursor** (Anysphere) | Rules only | `.cursorrules` | `~/.cursor/` |
| **Amp Code** (Sourcegraph) | Full support | `AGENTS.md` + `.agents/` | `~/.config/agents/` |

## What It Does

### Global Setup (`install.sh`)
Configures each detected agent with:
- **52 commands** — 7 roles + 37 specialist subagents + 6 orchestration workflows
- **6 global rules** — code quality, AWS dev, testing, security, git workflow, orchestration
- **14 plugins** — LSP, context7, serena, code-review, security (Claude Code)
- **5 native agents** — code-reviewer, debugger, test-writer, explorer, security-auditor
- **Optimized settings** — permissions, hooks, deny rules, model config

### Per-Project Setup (`project-init.sh`)
Run in any project to create shared AI config:
```bash
cd /path/to/your/project
/path/to/claude-auto-setup/project-init.sh
```

Creates:
```
.ai/                          # Shared across ALL agents
  rules/                      # Code quality, security, testing, git
  project-intel.md            # Codebase intelligence (after /init)
  .intel-changelog            # Change tracking

.claude/CLAUDE.md             # Claude-specific (references .ai/)
GEMINI.md                     # Gemini-specific (references .ai/)
AGENTS.md                     # Codex-specific (references .ai/)
.kiro/steering/               # Kiro-specific (symlinks to .ai/rules/)
.cursor/rules/                # Cursor-specific (copies from .ai/rules/)
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
  universal/                    # Agent-agnostic (single source of truth)
    rules/                      # 6 shared rule files
    commands/                   # 52 command definitions
    providers.json              # Cross-provider routing config
    intel-template.md           # Template for project intelligence
  agents/                       # Agent-specific adapters
    claude-code/                # Translates universal -> Claude format
    gemini-cli/                 # Translates universal -> Gemini format
    kiro-cli/                   # Translates universal -> Kiro format
    codex-cli/                  # Translates universal -> Codex format
    cursor/                     # Translates universal -> Cursor format
    ampcode/                    # Translates universal -> Amp format
  lib/                          # Shared shell utilities
    common.sh                   # Colors, logging, helpers
  tests/                        # Smoke tests
    run.sh                      # Test runner (24 tests)
  dashboard/                    # Real-time agent monitoring (optional)
    server.js                   # Express + SSE on port 3200
    public/index.html           # Dashboard UI
  install.sh                    # Global installer
  project-init.sh               # Per-project initializer
  dispatch.sh                   # Cross-provider task dispatcher
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

## Codebase Intelligence System

The killer feature: **cached codebase knowledge that auto-updates**.

```
/init (first time)
  -> 6 parallel agents deep-scan your codebase
  -> Generates .ai/project-intel.md (< 300 lines, dense reference)
  -> Loads automatically every session

/build "add pagination"
  -> Reads cached intel (knows architecture already)
  -> Implements with parallel agents
  -> After completion: auto-patches intel with changes
  -> Next session has fresh knowledge

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
./install.sh --version               # Show version
```

## Testing

```bash
./tests/run.sh                       # Run smoke tests (24 tests)
shellcheck install.sh dispatch.sh    # Lint shell scripts
```

## Platform Support

- Linux (Amazon Linux, Ubuntu, Debian, Fedora)
- macOS (Intel, Apple Silicon) — Bash 3.2+ compatible
- Windows (WSL2, Git Bash)

## Roadmap

See [ANALYSIS.md](ANALYSIS.md) for the full analysis including:
- Cross-agent orchestration (use multiple AI agents on one task)
- Additional workflows (/migrate, /onboard, /audit, /estimate)
- CI/CD integration
- Team collaboration features
