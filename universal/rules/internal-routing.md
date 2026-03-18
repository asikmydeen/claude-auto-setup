# Internal Project Routing (Kiro Integration)

This rule activates automatically in every Claude Code session. It detects internal projects and enables Kiro CLI consultation.

## Auto-Detection (run this check at session start)

Check these markers in the current working directory:

```bash
# Quick internal detection — run silently at session start
[ -f packageInfo ] || [ -f .brazil.json ] || [ -d Config ] || [ -f brazil-build ] || [[ "$PWD" == */workplace/* ]] || [[ "$PWD" == */brazil-pkg-cache/* ]]
```

If ANY marker is found → this is an **internal project**. Activate internal mode silently.
If NONE found AND the user says "internal" or mentions internal services → activate internal mode.

## When Internal Mode is Active

### 1. Consult Kiro Before Key Decisions (MANDATORY)

Before making any of these decisions, query Kiro via Bash:

```bash
# Search internal code for patterns/examples
kiro-cli -p "Search internal code for [pattern or service name]" --allow-tool='shell(read)' 2>/dev/null | head -100

# Search internal documentation
kiro-cli -p "Search internal docs for [topic]" --allow-tool='shell(read)' 2>/dev/null | head -100

# Look up internal API/service
kiro-cli -p "What internal service handles [capability]? Show me the API." --allow-tool='shell(read)' 2>/dev/null | head -100

# Get CDK/infra pattern
kiro-cli -p "What CDK pattern should I use for [resource type] in this org?" --allow-tool='shell(read)' 2>/dev/null | head -100

# Read internal website/wiki
kiro-cli -p "Read [internal URL or wiki page] and summarize" --allow-tool='shell(read)' 2>/dev/null | head -100

# Check ticket requirements
kiro-cli -p "Read ticket [SIM-xxx or TT-xxx] and summarize requirements" --allow-tool='shell(read)' 2>/dev/null | head -100
```

### 2. When to Consult (decision points)

| Situation | Kiro Query | Why |
|-----------|------------|-----|
| Choosing a dependency | "Is there an internal version of [X]?" | Internal packages preferred over external |
| Designing an API | "Search internal code for similar API patterns" | Follow org conventions |
| Writing CDK/infra | "What CDK pattern for [X] in our org?" | Use org-standard constructs |
| Setting up auth | "How does internal auth/authz work for [service type]?" | Internal auth is different |
| Configuring pipelines | "What pipeline template for [service type]?" | Use org pipeline templates |
| Referencing a service | "What's the API for [internal service]?" | Get correct endpoints/contracts |
| Before any deployment | "What's the deployment checklist for [service type]?" | Internal deployment has extra steps |
| Unclear requirements | "Read ticket [ID] and summarize" | Get full context from ticketing |

### 3. Internal Build System

```bash
# Build
brazil-build release                    # NOT npm run build

# Test
brazil-build run test                   # NOT npm test

# Start local server
brazil-build run start                  # NOT npm start

# Install dependencies (handled by brazil-build)
brazil-build install                    # NOT npm install
```

### 4. Internal Code Review

- Use **CR** (Code Review) workflow, not PR (Pull Request)
- CRs go through the internal review system
- Run `cr create` or equivalent — consult Kiro if unsure: `kiro-cli -p "How to create a CR for this package?"`

### 5. Internal Deployment

- NEVER deploy directly — always through pipelines
- CDK through CloudFormation via pipeline stages
- Consult Kiro for pipeline setup: `kiro-cli -p "Set up deployment pipeline for [service type]"`

## Kiro's Internal Tools (why it matters)

Kiro CLI has access to tools you (Claude) don't have:
- **InternalCodeSearch** — search across all internal codebases
- **InternalSearch** — search internal wikis, documentation, design docs
- **ReadInternalWebsites** — read internal dashboards, wikis, runbooks
- **TicketingReadActions** — read SIM tickets, TT tickets
- **WorkspaceSearch** — search Brazil workspace packages
- **aws-documentation-mcp** — official AWS documentation

Without Kiro, you're blind to internal context. With Kiro, you can make informed decisions.

## External Projects

If NO internal markers detected → standard mode. No Kiro consultation needed.
Use npm/bun, GitHub PRs, standard deployment.

## Fallback

If `kiro-cli` is not installed:
```bash
command -v kiro-cli &>/dev/null || command -v kiro &>/dev/null
```
If not available, warn the user: "This is an internal project but kiro-cli is not installed. Install it for internal context: npm install -g @anthropic-ai/kiro-cli && kiro auth"

Continue without Kiro but flag that internal context is missing.
