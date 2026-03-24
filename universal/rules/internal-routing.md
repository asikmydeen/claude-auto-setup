# Internal Project Routing (Kiro Integration)

Auto-activates when internal project markers detected. Enables Kiro CLI consultation.

## Detection

```bash
[ -f packageInfo ] || [ -f .brazil.json ] || [ -d Config ] || [ -f brazil-build ] || [[ "$PWD" == */workplace/* ]]
```

Any marker found → internal mode. None found → standard mode (npm/bun, GitHub PRs).

## When Internal Mode is Active

### Consult Kiro Before Key Decisions

```bash
kiro-cli -p "Search internal code for [pattern]" --allow-tool='shell(read)' 2>/dev/null | head -100
kiro-cli -p "Search internal docs for [topic]" --allow-tool='shell(read)' 2>/dev/null | head -100
kiro-cli -p "Read ticket [SIM-xxx] and summarize" --allow-tool='shell(read)' 2>/dev/null | head -100
```

**When to consult**: choosing dependencies (internal preferred), designing APIs (org conventions), writing CDK/infra (org patterns), setting up auth, configuring pipelines, referencing internal services, before deployment.

### Internal Build System

- Build: `brazil-build release` (NOT npm run build)
- Test: `brazil-build run test` (NOT npm test)
- Start: `brazil-build run start` (NOT npm start)
- Code Review: `cr create` (NOT PR)
- Deploy: always through pipelines, never direct

### Kiro's Exclusive Tools

InternalCodeSearch, InternalSearch, ReadInternalWebsites, TicketingReadActions, WorkspaceSearch, aws-documentation-mcp. Without Kiro, you're blind to internal context.

## Fallback

```bash
command -v kiro-cli &>/dev/null || command -v kiro &>/dev/null
```
Not installed? Warn: "Internal project but kiro-cli not installed. Install: `npm install -g @anthropic-ai/kiro-cli && kiro auth`"
