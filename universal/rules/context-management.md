# Context & Memory Management

## Memory Hierarchy

| Priority | System | Scope | How it works |
|---|---|---|---|
| 1 | **claude-mem** | Cross-session, semantic | Auto-captures via hooks. 3-layer search via MCP. Worker port 37777. |
| 2 | **MEMORY.md** | Per-project, lightweight | Auto-loaded (first 200 lines). Quick notes. Manual writes. |
| 3 | **project-intel.md** | Per-project, structural | Codebase map. Architecture. Auto-loaded. |

All coexist. claude-mem for deep memory. MEMORY.md for quick notes. project-intel.md for structure.

## claude-mem (Primary — Automatic)

5 lifecycle hooks: SessionStart (install+worker+context), UserPromptSubmit (session-init), PostToolUse (observation), Stop (summarize), SessionEnd (complete).

**You do NOT need to manually manage memory.** It works in the background.

### When to Actively Query
- Starting work on a previously-touched area
- Hitting a familiar-looking bug
- Making architectural decisions (search past decisions + rationale)

### 3-Layer Search (Token-Efficient)
1. **Search** (50-100 tokens/result): `search({ query: "...", limit: 20 })` — compact index
2. **Timeline**: `timeline({ anchor_id: ID, before: 5, after: 5 })` — chronological context
3. **Details** (500-1000 tokens): `get_observations({ ids: [...] })` — only for relevant IDs

### Observation Types
`bugfix`, `feature`, `refactor`, `change`, `discovery`, `decision`

### Privacy
Wrap sensitive content in `<private>` tags — excluded from observations.

## Graceful Degradation

All memory systems are OPTIONAL:
- claude-mem offline → fall back to MEMORY.md + project-intel.md
- MEMORY.md missing → still works
- Never block a workflow because a memory system is unavailable
