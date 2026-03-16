# Context Management

## Memory System Hierarchy

Context and memory are provided by multiple systems, in priority order:

| Priority | System | Scope | How it works |
|---|---|---|---|
| 1 | **claude-mem** | Cross-session, semantic | Auto-captures observations via hooks. 3-layer search via MCP. Worker on port 37777. |
| 2 | **MEMORY.md** | Per-project, lightweight | Auto-loaded (first 200 lines). Quick notes. Manual writes. |
| 3 | **project-intel.md** | Per-project, structural | Codebase map. Architecture. Not session-specific. |
| 4 | **OpenViking** | Cross-project, resources | Optional. Broader resource management. Tiered loading. |

All coexist. Use claude-mem for deep memory. MEMORY.md for quick notes. project-intel.md for structure.

## claude-mem (Primary Memory System)

claude-mem provides automatic persistent memory across coding sessions via 5 lifecycle hooks:

| Hook | When | What it does |
|---|---|---|
| SessionStart | New session begins | Installs deps, starts worker, injects context from past sessions |
| UserPromptSubmit | User sends a message | Initializes session tracking |
| PostToolUse | After any tool execution | Captures observations (bugfix, feature, refactor, change, discovery, decision) |
| Stop | Session pausing/ending | AI-generated summary (investigated, learned, completed, next steps) |
| SessionEnd | Session fully ends | Marks session complete |

### When to Actively Query Memory

Memory works passively most of the time. Actively use it when:
- Starting work on an area you've touched before
- Hitting a bug you might have seen
- Making architectural decisions (search for past decisions + rationale)
- Onboarding to a project

### 3-Layer Search Pattern

Always follow this pattern — never skip to full details:

1. **Search** (50-100 tokens/result): `search({ query: "...", limit: 20 })` — compact index with IDs
2. **Timeline** (contextual view): `timeline({ anchor_id: ID, before: 5, after: 5 })` — chronological context
3. **Fetch Details** (500-1000 tokens each): `get_observations({ ids: [...] })` — full content, only for relevant IDs

This achieves ~10x token savings vs loading everything.

### Observation Types

- `bugfix` — something was broken, now fixed
- `feature` — new capability added
- `refactor` — code restructured, behavior unchanged
- `change` — generic modification (docs, config)
- `discovery` — learning about existing system
- `decision` — architectural/design choice with rationale

### Knowledge Concepts

- `how-it-works`, `why-it-exists`, `what-changed`, `problem-solution`, `gotcha`, `pattern`, `trade-off`

## Tiered Context Loading (L0/L1/L2)

Apply this pattern to ALL context delivery:

- **L0 (Abstract)**: ~100 tokens. One-sentence summary. Quick relevance filtering.
- **L1 (Overview)**: ~1-2k tokens. Core information for planning decisions.
- **L2 (Detail)**: Full content. Loaded only when confirmed necessary.

**Access pattern**: Always start with L1. Only load L2 when you need implementation details.

### Apply to Project Intel

When loading `project-intel.md`:
1. Read the Quick Reference section first (L0/L1)
2. Read Architecture + Directory Map if exploring (L1)
3. Read specific sections (API Surface, Data Models, etc.) only when relevant (L2)

Do NOT load the entire intel file into context unless the task is a full-project refactor.

## OpenViking (Optional Enhancement)

When installed, OpenViking provides additional capabilities:

| Tool | Purpose | When to use |
|---|---|---|
| `search` | Semantic search across resources | Finding project docs, API references |
| `add_memory` | Store persistent knowledge | After discovering patterns, preferences |
| `add_resource` | Ingest external docs/repos | Project setup, adding references |

URI scheme: `viking://resources/`, `viking://user/memories/`, `viking://agent/memories/`

## Integration with Orchestration Pipeline

### During Exploration (Step 0)
```
0b: Memory Context (claude-mem)
- Search memory for past observations about this codebase/feature
- Look for: decisions, gotchas, patterns, prior fixes

0b-alt: OpenViking (if no claude-mem)
- Search viking://agent/memories/ for past learnings
- Search viking://resources/ for project docs
```

### After Implementation
- claude-mem captures automatically via PostToolUse hook — no manual action needed
- Store significant discoveries in MEMORY.md if they're quick-reference worthy
- OpenViking: store broader resources via `add_resource`

## Graceful Degradation

All memory systems are OPTIONAL. When unavailable:
- claude-mem offline → fall back to MEMORY.md + project-intel.md
- OpenViking offline → fall back to `context7` for library docs
- MEMORY.md missing → still works, just less context
- Never block a workflow because a memory system is unavailable
