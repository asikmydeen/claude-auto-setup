# Context Management with OpenViking

## Overview

OpenViking is an optional context database for AI agents that provides persistent memory, semantic search, and tiered context loading. When installed, it enhances the orchestration workflow with:

- **Tiered loading (L0/L1/L2)** — reduces token consumption by loading abstracts first
- **Persistent cross-session memory** — agents remember patterns, user preferences, and project knowledge
- **Semantic search** — find relevant context by meaning, not just keywords
- **Resource management** — ingest and organize project docs, API references, repos

## When to Use OpenViking

| Scenario | Use OpenViking? | Alternative |
|---|---|---|
| Need project docs/API references | Yes — `ov find "query"` | `context7` (library docs only) |
| Agent needs to remember patterns | Yes — auto-extracted memories | `MEMORY.md` (manual, 200-line limit) |
| Searching unfamiliar codebase | Maybe — complements `serena` | `serena` + `Grep` for code-level search |
| Cross-agent knowledge sharing | Yes — `viking://agent/memories/` | None (agents are isolated without this) |
| Session context too large | Yes — L0/L1 tiered loading | Checkpoint system (manual) |

## Tiered Context Loading (L0/L1/L2)

Apply this pattern to ALL context delivery, not just OpenViking resources:

- **L0 (Abstract)**: ~100 tokens. One-sentence summary. Used for quick relevance filtering.
- **L1 (Overview)**: ~1-2k tokens. Core information for planning decisions.
- **L2 (Detail)**: Full content. Loaded only when confirmed necessary.

**Access pattern**: Always start with L1. Only load L2 when you need implementation details.

### Apply to Project Intel

When loading `project-intel.md`:
1. Read the Quick Reference section first (L0/L1)
2. Read Architecture + Directory Map if exploring (L1)
3. Read specific sections (API Surface, Data Models, etc.) only when relevant (L2)

Do NOT load the entire intel file into context unless the task is a full-project refactor.

## OpenViking MCP Tools (when available)

| Tool | Purpose | When to use |
|---|---|---|
| `search` | Semantic search across all context | Finding relevant docs, memories, skills |
| `add_memory` | Store persistent knowledge | After discovering patterns, preferences, gotchas |
| `add_resource` | Ingest external docs/repos | Project setup, adding API references |
| `get_status` | Check OpenViking server health | Troubleshooting |
| `list_memories` | Browse stored memories | Understanding what the agent "knows" |
| `list_resources` | Browse stored resources | Checking available documentation |

## URI Scheme

```
viking://resources/     — project docs, repos, web pages
viking://user/memories/ — user preferences, habits, profile
viking://agent/memories/ — learned patterns, task cases, errors
viking://agent/skills/  — callable capabilities
```

## Memory Categories (auto-extracted from sessions)

1. **Profile** — user info (role, team, preferred tools)
2. **Preferences** — coding style, workflow choices
3. **Entities** — projects, services, APIs the user works with
4. **Events** — recent deployments, incidents, decisions
5. **Cases** — debugging patterns, solution approaches
6. **Patterns** — recurring code patterns, architecture decisions

## Integration with Orchestration Pipeline

### During Exploration (Step 0)
```
0c: OpenViking Context (when available)
- Search viking://resources/ for project-relevant docs
- Search viking://agent/memories/ for past learnings about this codebase
- Search viking://user/memories/ for user preferences
```

### After Implementation (Step 6+)
```
- Store discovered patterns → viking://agent/memories/
- Store error resolutions → viking://agent/memories/cases/
- Store user corrections → viking://user/memories/preferences/
```

## Graceful Degradation

OpenViking is OPTIONAL. When not installed:
- Memory falls back to `MEMORY.md` (manual, per-project)
- Context loading falls back to reading full `project-intel.md`
- Semantic search falls back to `Grep` + `serena`
- Resource management falls back to `context7` for library docs

Never block a workflow because OpenViking is unavailable.
