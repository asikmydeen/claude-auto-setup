---
name: discover
description: Discover community Claude Code tools, skills, and plugins you haven't installed yet
category: meta
complexity: low
triggers: [discover, community-tools, whats-new]
---

# Discover Community Tools

Browse the awesome-claude-code catalog and find tools, skills, and plugins you haven't installed yet.

## Input
Filter (optional): $ARGUMENTS (e.g., "skills", "orchestrators", "hooks")

## Execution

### Phase 1: Fetch Catalog

Use WebFetch to retrieve the awesome-claude-code README:
```
WebFetch(url="https://github.com/hesreallyhim/awesome-claude-code",
  prompt="Extract ALL tools, skills, plugins, hooks, orchestrators, and slash commands listed. For each item return: name, one-line description, install command if given, and which section it's under. Format as a structured list grouped by section.")
```

### Phase 2: Detect Installed

Check what's already present on this system:
- `ls ~/.claude/plugins/cache/` — installed plugins
- `ls ~/.claude/plugins/marketplaces/` — marketplace plugins
- `ls ~/.claude/skills/` — installed skills
- `ls ~/.claude/commands/` — installed commands
- Check CLI tools: `command -v claude-squad auto-claude codex gemini kiro amp copilot`

### Phase 3: Diff and Display

For each catalog item:
- If installed: mark with checkmark
- If not installed: show with install command

Group by section. If $ARGUMENTS provided, filter to matching sections only.

### Phase 4: Output

```
## Community Tools Discovery

### Already Installed (N)
  * superpowers — composable development skills
  * context7 — library documentation lookup
  ...

### Available — Not Installed (N)

  **Skills**
  - craft-code-skill — advanced code generation patterns
    Install: claude plugin install craft-code-skill@publisher

  **Orchestrators**
  - claude-squad — terminal multi-agent management
    Install: go install github.com/smtg/claude-squad@latest

  **Hooks**
  - ...

### Recommended for Your Setup
Based on your installed tools, these would add the most value:
1. {name} — {why it complements your setup}
2. ...
```

### Phase 5: Interactive

If the user asks to install something from the list, run the appropriate install command.
