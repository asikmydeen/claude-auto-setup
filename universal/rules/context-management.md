# Context & Memory Management

## Memory Hierarchy

| Priority | System | Scope | How it works |
|---|---|---|---|
| 1 | **claude-mem** | Cross-session, semantic | Auto-captures observations via hooks. 3-layer search via MCP. Worker on port 37777. |
| 2 | **MEMORY.md** | Per-project, lightweight | Auto-loaded (first 200 lines). Quick notes. Manual writes. |
| 3 | **project-intel.md** | Per-project, structural | Codebase map. Architecture. Not session-specific. |

All coexist. Use claude-mem for deep memory. MEMORY.md for quick notes. project-intel.md for structure.

## claude-mem (Primary — Automatic)

claude-mem provides persistent memory across sessions via 5 lifecycle hooks:

| Hook | When | What it does |
|---|---|---|
| SessionStart | New session begins | Installs deps, starts worker, injects context from past sessions |
| UserPromptSubmit | User sends a message | Initializes session tracking |
| PostToolUse | After any tool execution | Captures observations (bugfix, feature, refactor, change, discovery, decision) |
| Stop | Session pausing/ending | AI-generated summary (investigated, learned, completed, next steps) |
| SessionEnd | Session fully ends | Marks session complete |

**You do NOT need to manually manage memory.** It works in the background.

### When to Actively Query

Memory works passively most of the time. Actively use it when:
- Starting work on an area you've touched before
- Hitting a bug you might have seen
- Making architectural decisions (search for past decisions + rationale)
- Onboarding to a project

### 3-Layer Search Pattern (Token-Efficient)

Always follow this pattern — never skip to full details:

1. **Search** (50-100 tokens/result): `search({ query: "...", limit: 20 })` — compact index with IDs
2. **Timeline** (contextual view): `timeline({ anchor_id: ID, before: 5, after: 5 })` — chronological context
3. **Fetch Details** (500-1000 tokens each): `get_observations({ ids: [...] })` — full content, only for relevant IDs

~10x token savings vs loading everything.

### Observation Types

- `bugfix` — something was broken, now fixed
- `feature` — new capability added
- `refactor` — code restructured, behavior unchanged
- `change` — generic modification (docs, config)
- `discovery` — learning about existing system
- `decision` — architectural/design choice with rationale

### Knowledge Concepts

`how-it-works`, `why-it-exists`, `what-changed`, `problem-solution`, `gotcha`, `pattern`, `trade-off`

### Privacy

Wrap sensitive content in `<private>` tags — it will be excluded from observations.

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

## Graceful Degradation

All memory systems are OPTIONAL. When unavailable:
- claude-mem offline → fall back to MEMORY.md + project-intel.md
- MEMORY.md missing → still works, just less context
- Never block a workflow because a memory system is unavailable
