---
name: mem-search
description: Search persistent memory for past observations, decisions, and patterns
category: workflow
complexity: simple
triggers: [mem-search, memory, recall]
---

# Memory Search

You are searching the persistent memory system (claude-mem) to find relevant past work, decisions, patterns, and observations.

## Input

The user provides a search query: `$ARGUMENTS`

If no query provided, ask: "What would you like to search for in memory? (e.g., past decisions about auth, bugs we fixed in the API, patterns for testing)"

## Execution

Follow the 3-layer search pattern strictly. Never skip layers.

### Step 1: Search Index

Use the `search` MCP tool:
```
search({ query: "$ARGUMENTS", limit: 30 })
```

Present results as a compact table:
```
| # | ID | Type | Title | Date |
|---|---|---|---|---|
| 1 | 12345 | bugfix | Fixed auth middleware null pointer | 2026-03-15 |
| 2 | 12340 | decision | Chose WebSocket for real-time | 2026-03-14 |
```

If no results: "No memories found for this query. Try broadening the search terms."

### Step 2: Timeline Context (if results found)

Pick the most relevant result(s) and use the `timeline` MCP tool:
```
timeline({ anchor_id: <most_relevant_id>, before: 5, after: 5 })
```

This shows what happened around that observation — the sequence of work.

### Step 3: Fetch Details (for relevant items only)

Use `get_observations` to fetch full details for the observations that matter:
```
get_observations({ ids: [<relevant_ids>] })
```

Present the full context: narrative, facts, files affected.

## Output Format

```
## Memory Search: "$ARGUMENTS"

### Found [N] relevant observations

**Most Relevant:**
[Full details of top 1-3 observations with narrative, facts, files]

**Timeline Context:**
[Chronological sequence showing how this work unfolded]

**Related:**
[Brief list of other potentially relevant observations with IDs]
```

## Tips

- Search for **concepts** not just keywords: "authentication approach" > "auth"
- Filter by type: `search({ query: "...", type: "decision" })` for architectural decisions
- Filter by date: use `dateStart`/`dateEnd` for time-bounded searches
- Filter by project: `search({ query: "...", project: "my-app" })` for project-specific memories

$ARGUMENTS
