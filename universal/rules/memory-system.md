# Persistent Memory System (claude-mem)

## Overview

claude-mem provides automatic persistent memory across coding sessions. It captures observations (bugs fixed, features built, decisions made), summarizes sessions, and injects relevant context into new sessions — all automatically via hooks.

**You do NOT need to manually manage memory.** The system works in the background. This document describes how to leverage it.

## Memory Architecture

| Layer | What | How |
|---|---|---|
| **Automatic Capture** | Every tool use generates an observation (bugfix, feature, refactor, change, discovery, decision) | PostToolUse hook → worker service |
| **Session Summary** | AI-generated summary at session end (investigated, learned, completed, next steps) | Stop hook → summarizer |
| **Context Injection** | Relevant past observations auto-loaded into new sessions | SessionStart hook → context generator |
| **Semantic Search** | 3-layer search via MCP tools (search → timeline → get_observations) | mem-search MCP server |

## When to Actively Use Memory

Most of the time, memory works passively. Actively query it when:

1. **Starting work on an area you've touched before** — search for past observations before exploring code
2. **Hitting a bug you might have seen** — search for similar error patterns
3. **Making architectural decisions** — search for past decisions and their rationale
4. **Onboarding to a project** — search for discoveries and patterns

## 3-Layer Search Pattern (Token-Efficient)

Always follow this pattern — never skip to Layer 3:

### Layer 1: Search (50-100 tokens per result)
```
Use MCP tool: search
Parameters: { query: "authentication flow", limit: 20 }
Returns: Compact index with IDs, titles, types, timestamps
```
Scan results. Identify which IDs are relevant.

### Layer 2: Timeline (contextual view)
```
Use MCP tool: timeline
Parameters: { anchor_id: 12345, before: 5, after: 5 }
Returns: Chronological context around the anchor observation
```
Understand the sequence of work. Identify which observations need full details.

### Layer 3: Fetch Details (500-1000 tokens each)
```
Use MCP tool: get_observations
Parameters: { ids: [12345, 12350, 12355] }
Returns: Full observation content (narrative, facts, files)
```
Only fetch what you actually need. Batch requests — one call, multiple IDs.

**Token savings**: ~10x compared to loading everything upfront.

## Observation Types

| Type | When captured | Example |
|---|---|---|
| `bugfix` | Something was broken, now fixed | "Fixed null pointer in auth middleware" |
| `feature` | New capability added | "Authentication now supports OAuth2 PKCE" |
| `refactor` | Code restructured, behavior unchanged | "Extracted validation into shared utility" |
| `change` | Generic modification (docs, config) | "Updated API rate limits in config" |
| `discovery` | Learning about existing system | "DynamoDB uses single-table design with GSI1" |
| `decision` | Architectural/design choice | "Chose WebSocket over polling for real-time" |

## Knowledge Concepts

Observations are tagged with concepts for better retrieval:
- `how-it-works` — understanding mechanisms
- `why-it-exists` — purpose or rationale
- `what-changed` — modifications made
- `problem-solution` — issues and their fixes
- `gotcha` — traps or edge cases
- `pattern` — reusable approach
- `trade-off` — pros/cons of a decision

## Integration with Orchestration

### During Exploration (Step 0)
Before writing code, query memory:
```
Search memory for: "[feature/area being worked on]"
Check for: past decisions, known gotchas, related patterns
```
This replaces blind exploration with informed exploration.

### After Implementation
Memory capture happens automatically. No manual action needed.
The Stop hook triggers summarization — captures what was investigated, learned, completed, and planned.

### Error Recovery
When hitting errors, search memory for past fixes:
```
Search memory for: "[error message or pattern]"
Look for: problem-solution observations, gotcha observations
```

## Memory Hierarchy (Priority Order)

1. **claude-mem** (primary) — deep, semantic, automatic, cross-session
2. **MEMORY.md** (lightweight) — per-project quick notes, 200-line cap, always loaded
3. **project-intel.md** (structural) — codebase map, architecture, not session-specific
4. **OpenViking** (optional) — broader resource management, if installed

All coexist. claude-mem handles deep memory. MEMORY.md handles quick notes. They don't conflict.

## Privacy

Wrap sensitive content in `<private>` tags — it will be excluded from observations:
```
<private>API key: sk-abc123...</private>
```

## Graceful Degradation

claude-mem is NOT required. If unavailable:
- Memory falls back to MEMORY.md (manual, per-project)
- Context loading falls back to project-intel.md
- No observations are lost — they simply aren't captured
- Never block a workflow because claude-mem is unavailable
