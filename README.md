# Claude Code Smart Setup

A complete, portable Claude Code configuration for optimized multi-agent software development.

## What's Included

| Component | Count | Description |
|---|---|---|
| Commands | 49 | 7 roles + 37 subagents + 5 orchestration workflows |
| Rules | 6 | Code quality, AWS dev, testing, security, git, orchestration |
| Plugins | 14 | LSP, context7, serena, code-review, security, git workflow |
| Settings | 1 | Permissions, hooks, deny rules, model config |
| CLAUDE.md | 1 | Auto-orchestration protocol, role system |

## Quick Install

```bash
git clone <this-repo> claude-code-setup
cd claude-code-setup
chmod +x install.sh
./install.sh
```

## Options

```bash
./install.sh              # Interactive install (preserves existing config)
./install.sh --force      # Overwrite existing config (backs up first)
./install.sh --dry-run    # Preview what would be done
./install.sh --uninstall  # Remove and restore from backup
```

## Prerequisites

- **Claude Code CLI** — `npm install -g @anthropic-ai/claude-code`
- **Node.js 18+** — For LSP plugins
- **python3** — For settings merge (optional, only if merging with existing config)

## What It Does

### After Installation

```
~/.claude/
  CLAUDE.md              # Global instructions with auto-orchestration
  settings.json          # Permissions, hooks, plugins, model config
  commands/              # 49 slash commands
    init.md              # /init — project scanner + auto intel generation
    deep-research.md     # /deep-research — 6-agent codebase analysis
    build.md             # /build — end-to-end multi-agent implementation
    review.md            # /review — multi-agent code review
    debug.md             # /debug — multi-agent debugging
    coordinator.md       # /coordinator — role activation
    developer.md         # /developer — role activation
    typescript-pro.md    # subagent command
    react-specialist.md  # subagent command
    ...                  # (37 more subagents)
  rules/
    orchestration.md     # Auto-orchestration protocol
    code-quality.md      # Coding standards
    aws-development.md   # AWS patterns
    testing.md           # Test-first approach
    security.md          # OWASP, secrets, IAM
    git-workflow.md      # Commit style, PR conventions
```

### Workflow

```
/init                          # Run once per project
                               # Auto-scans stack, generates codebase intel
                               # Creates .claude/rules/project-intel.md

/build add user preferences    # Multi-agent implementation
                               # Reads cached intel, selects agents,
                               # implements, reviews, verifies

/review                        # Multi-agent code review
                               # Quality + security + performance + architecture

/debug API returns 500         # Multi-agent debugging
                               # 3 parallel investigation agents
```

### Smart Decisions (Automatic)

- Codebase intel auto-generated on first `/init`, auto-refreshed when stale
- Agent team auto-selected based on task type
- Plugins auto-invoked (context7 for docs, LSP for type checking, security-guidance for safety)
- Build + tests + lint auto-verified before delivery

## Customization

### Add Your Own Commands

Drop `.md` files in `config/commands/` before running `install.sh`, or directly in `~/.claude/commands/` after installation.

### Add Platform-Specific Permissions

Edit `config/settings.json` to add platform-specific allow/deny rules before installing.

### Add Project-Specific Rules

After installation, add project rules to `<project>/.claude/rules/` — they auto-load alongside global rules.

## Rollback

Every install creates a timestamped backup in `~/.claude/backups/`. To restore:

```bash
./install.sh --uninstall    # Restores from most recent backup
```

## Platform Support

Tested on:
- Linux (Amazon Linux, Ubuntu, Debian)
- macOS (Intel, Apple Silicon)
- Windows (WSL2, Git Bash, MSYS2)
