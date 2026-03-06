# Universal AI Agent Setup — Analysis & Implementation Plan

## Executive Summary

Our current setup only works for Claude Code. But the core ideas — cached codebase intelligence, multi-agent orchestration, incremental intel updates, smart plugin selection — are universal. Every AI coding agent benefits from the same patterns. This document lays out a plan to make `claude-auto-setup` a **universal installer** for any AI coding agent.

---

## Part 1: Cross-Agent Compatibility Matrix

### Configuration Surfaces Compared

| Feature | Claude Code | Gemini CLI | Kiro CLI | OpenAI Codex | Cursor | Windsurf |
|---|---|---|---|---|---|---|
| **Instructions file** | `CLAUDE.md` | `GEMINI.md` | Steering files | `AGENTS.md` / `codex.md` | `.cursorrules` / `.cursor/rules/` | `.windsurfrules` |
| **Global instructions** | `~/.claude/CLAUDE.md` | `~/.gemini/GEMINI.md` | `~/.kiro/steering/` | `~/.codex/instructions.md` | Cursor Settings > Rules | Windsurf Settings |
| **Project instructions** | `.claude/CLAUDE.md` | `GEMINI.md` (root) | `.kiro/steering/` | `AGENTS.md` (root) | `.cursor/rules/*.mdc` | `.windsurfrules` |
| **Rules directory** | `.claude/rules/` | N/A | `.kiro/steering/` | `.codex/` | `.cursor/rules/` | N/A |
| **Custom commands** | `.claude/commands/` | Extensions | Custom agents | `.codex/skills/` | N/A | N/A |
| **MCP support** | Native | Native | Native | Native | Native | Native |
| **Hooks** | Pre/PostToolUse, SessionStart, Stop | Pre/post hooks | Pre/post hooks | Sandbox hooks | N/A | N/A |
| **Memory** | Auto-memory + MEMORY.md | N/A | N/A | N/A | N/A | N/A |
| **Settings** | `~/.claude/settings.json` | `~/.gemini/settings.json` | `~/.kiro/config.json` | `~/.codex/config.toml` | `.cursor/settings.json` | Settings UI |
| **Plugins** | Plugin marketplace | Extensions | N/A | N/A | Extensions | Extensions |
| **Non-interactive** | `claude -p "..."` | `gemini -p "..."` | N/A | `codex -q "..."` | N/A | N/A |

### Key Insight

**Every agent reads a markdown file for instructions.** The file name and location differ, but the content pattern is identical:
- Project context (stack, architecture, patterns)
- Behavioral rules (what to do, what not to do)
- Commands and workflows
- Quality standards

This means we can generate a **universal instruction set** and translate it per-agent.

---

## Part 2: What We Have vs What's Possible

### Current State (Claude Code Only)

```
claude-auto-setup/
  config/
    CLAUDE.md           ← Claude-specific
    commands/           ← Claude-specific
    rules/              ← Claude-specific
    settings.json       ← Claude-specific
  install.sh            ← Claude-specific installer
```

### Target State (Universal)

```
claude-auto-setup/
  universal/
    instructions.md        ← Agent-agnostic master instructions
    rules/                 ← Agent-agnostic rules (quality, security, testing, git)
    orchestration.md       ← Multi-agent workflow protocol
    commands/              ← Agent-agnostic command definitions (YAML)
    intel-template.md      ← Template for project intelligence
  agents/
    claude-code/
      adapter.sh           ← Translates universal → Claude Code format
      settings.json        ← Claude-specific settings
      plugins.list         ← Plugin install list
    gemini-cli/
      adapter.sh           ← Translates universal → Gemini CLI format
      settings.json        ← Gemini-specific settings
      extensions.list      ← Extension install list
    kiro-cli/
      adapter.sh           ← Translates universal → Kiro CLI format
      config.json          ← Kiro-specific config
    codex-cli/
      adapter.sh           ← Translates universal → Codex format
      config.toml          ← Codex-specific config
    cursor/
      adapter.sh           ← Translates universal → Cursor format
    windsurf/
      adapter.sh           ← Translates universal → Windsurf format
  install.sh               ← Universal installer (detects installed agents)
  sync.sh                  ← Keeps all agents in sync after changes
  README.md
```

---

## Part 3: Improvement Opportunities

### A. Automation Gaps (Things We Should Automate)

| # | Gap | Impact | Effort |
|---|---|---|---|
| 1 | **Auto-detect installed agents** — installer should scan for claude, gemini, kiro, codex CLIs and install config for all found | High | Low |
| 2 | **Sync across agents** — when you update a rule in one agent, propagate to all others | High | Medium |
| 3 | **Auto-install agent CLIs** — if user wants an agent but doesn't have it, offer to install | Medium | Low |
| 4 | **Project-level multi-agent** — `/init` generates instructions for ALL installed agents, not just Claude | High | Medium |
| 5 | **CI/CD integration** — non-interactive mode for automated code review, testing, PR creation | High | Medium |
| 6 | **Pre-commit hooks** — run AI review before every commit (lightweight, fast model) | Medium | Low |
| 7 | **Post-deploy intel update** — after deployment, auto-update intel with deployment config | Medium | Low |
| 8 | **Scheduled intel refresh** — cron job to refresh stale intel weekly | Low | Low |
| 9 | **Team sync** — shared intel file via git, personal overrides via gitignored files | Medium | Medium |
| 10 | **Cost tracking** — log token usage per task, per agent, per day | Medium | Medium |

### B. Quality Improvements

| # | Improvement | Description |
|---|---|---|
| 1 | **Intel validation** — after update, verify intel references still-existing files |
| 2 | **Intel diffing** — show what changed in intel after each update |
| 3 | **Conflict resolution** — when two tasks update the same intel section, merge intelligently |
| 4 | **Intel compression** — if intel exceeds 300 lines, auto-summarize least-used sections |
| 5 | **Usage-weighted sections** — track which intel sections get referenced most, prioritize those |
| 6 | **Stale reference detection** — flag intel entries pointing to deleted/moved files |
| 7 | **Test coverage tracking** — intel should track test coverage % and flag regressions |

### C. New Workflows to Add

| # | Workflow | Description |
|---|---|---|
| 1 | **`/migrate`** — Multi-agent migration assistant (framework upgrades, API changes) |
| 2 | **`/onboard`** — Generate onboarding docs for new team members from intel |
| 3 | **`/audit`** — Full codebase audit (security + performance + architecture + deps) |
| 4 | **`/estimate`** — Analyze a feature request and estimate complexity/effort |
| 5 | **`/changelog`** — Generate changelog from git history since last release |
| 6 | **`/deploy-check`** — Pre-deployment verification (tests, security, breaking changes) |
| 7 | **`/tech-debt`** — Identify and prioritize technical debt from codebase |
| 8 | **`/perf-baseline`** — Establish performance baselines and track regressions |

### D. Cross-Agent Orchestration

The most powerful improvement: **use multiple AI agents together**.

```
User: "Add OAuth login"
  ↓
Claude Code (Coordinator): plans the work, splits into tasks
  ↓ parallel
  ├── Claude Code (Agent 1): implements backend API
  ├── Gemini CLI (Agent 2): generates UI components (Gemini excels at frontend)
  ├── Codex (Agent 3): writes test suite
  └── Kiro CLI (Agent 4): updates infrastructure
  ↓
Claude Code (Coordinator): merges, reviews, verifies
```

This requires:
- Shared project intel file (all agents read the same `.ai/project-intel.md`)
- Shared task queue (file-based, each agent picks tasks)
- Merge protocol (coordinator reviews all agent output)

---

## Part 4: Implementation Roadmap

### Phase 1: Universal Foundation (This Session)
- Restructure repo to universal format
- Create adapter scripts for Claude Code + Gemini CLI + Kiro CLI + Codex
- Universal installer that detects and configures all installed agents
- Shared instruction format that translates per-agent

### Phase 2: Cross-Agent Project Init
- `/init` generates instructions for ALL installed agents
- Shared `.ai/project-intel.md` readable by any agent
- Shared `.ai/rules/` directory with agent-agnostic rules
- Per-agent overrides in `.claude/`, `.gemini/`, `.kiro/`, `.codex/`

### Phase 3: New Workflows
- Add `/migrate`, `/onboard`, `/audit`, `/estimate`, `/changelog`
- CI/CD templates for automated review
- Pre-commit hook integration

### Phase 4: Cross-Agent Orchestration
- Shared task queue protocol
- Multi-agent coordinator
- Cost tracking and optimization
- Team collaboration features

---

## Part 5: Universal Instruction Format

### The Core Idea

Instead of maintaining separate CLAUDE.md, GEMINI.md, AGENTS.md files, maintain ONE source of truth:

```yaml
# universal/instructions.yaml
meta:
  project: "My Project"
  stack: ["typescript", "react", "aws-lambda", "dynamodb"]
  build: "brazil-build release"
  test: "brazil-build run test"
  lint: "npx eslint ."

rules:
  - id: spec-first
    text: "Create a spec before any implementation. Wait for approval."
    severity: mandatory

  - id: no-scope-creep
    text: "Only implement what the approved spec says."
    severity: mandatory

  - id: test-first
    text: "Write or update tests before implementing features."
    severity: recommended

roles:
  - name: coordinator
    description: "Plans and delegates to agents"
    file: commands/coordinator.md

  - name: developer
    description: "Plans and implements directly"
    file: commands/developer.md

workflows:
  - name: build
    description: "End-to-end feature implementation"
    phases: [explore, plan, implement, review, verify, update-intel]

  - name: debug
    description: "Multi-agent debugging"
    phases: [investigate, diagnose, fix, update-intel, report]
```

Each adapter reads this YAML and generates the agent-specific format:
- **Claude adapter** → `CLAUDE.md` + `.claude/commands/` + `.claude/rules/`
- **Gemini adapter** → `GEMINI.md` + `~/.gemini/settings.json`
- **Kiro adapter** → `.kiro/steering/` files
- **Codex adapter** → `AGENTS.md` + `.codex/skills/`
- **Cursor adapter** → `.cursor/rules/*.mdc` files

---

## Part 6: Shared Project Intelligence

### Current: Agent-Specific
```
.claude/rules/project-intel.md    ← Only Claude reads this
```

### Target: Universal
```
.ai/
  project-intel.md                ← All agents read this
  rules/
    code-quality.md               ← Shared rules
    security.md
    testing.md
  .intel-changelog                ← Shared changelog
```

Each agent's adapter adds a reference:
- Claude: `.claude/rules/` symlinks to `.ai/rules/`
- Gemini: `GEMINI.md` includes `@.ai/project-intel.md`
- Kiro: `.kiro/steering/` symlinks to `.ai/rules/`
- Codex: `AGENTS.md` includes reference to `.ai/`

---

## Part 7: Estimated Impact

| Metric | Current | After Universal Setup |
|---|---|---|
| Agents supported | 1 (Claude Code) | 6 (Claude, Gemini, Kiro, Codex, Cursor, Windsurf) |
| Setup time per machine | 2 min | 2 min (same — auto-detects all agents) |
| Setup time per project | 5 min (`/init`) | 5 min (generates for ALL agents) |
| Intel freshness | Incremental per-task | Incremental per-task, shared across agents |
| Rule consistency | Single agent | All agents follow same rules |
| Available workflows | 6 | 14 (+ migrate, onboard, audit, estimate, etc.) |
| CI/CD integration | None | Automated review, pre-commit, deploy-check |

---

## Recommendation

**Implement Phase 1 now** — restructure to universal format + add adapters for the 4 major CLI agents (Claude Code, Gemini CLI, Kiro CLI, Codex CLI). This gives you:

1. One install command sets up ALL your AI agents
2. Rules stay consistent across agents
3. Project intel is shared, not duplicated
4. Adding new agents in the future = just one adapter file
