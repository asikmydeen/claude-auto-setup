# Internal Project Routing

When a user asks to build something, determine if it's an INTERNAL or EXTERNAL project.

## Auto-Detection

The system auto-detects internal projects based on markers:
- `packageInfo` file (Brazil workspace)
- `.brazil.json` configuration
- `Config` directory (Brazil convention)
- `cdk.json` or `template.yaml` (AWS CDK/SAM)
- Project path contains `/workplace/` or `/brazil-pkg-cache/`

If auto-detection is inconclusive, ask the user:
```
Is this an internal or external project?
- Internal: I'll activate Kiro CLI for internal code search, documentation, AWS patterns, and deployment
- External: Standard development mode
```

## Internal Mode Behavior

When `--internal` is active (or auto-detected):

1. **Kiro as sidecar consultant** — Claude remains the primary executor, but queries Kiro for internal context before key decisions
2. **Provider routing shifts** — Backend, API, infra, devops, and security tasks prefer `kiro-cli` as provider
3. **Internal context injected** — Every agent prompt includes Kiro consultation instructions
4. **Build system** — `brazil-build release` instead of `npm run build`
5. **Code review** — CR (not PR) workflow
6. **Deployment** — CloudFormation/CDK through pipelines (never direct)

## When to Consult Kiro (agents must do this)

| Decision Point | Kiro Query |
|---------------|------------|
| Choosing an internal API | "What internal service handles X?" |
| CDK infrastructure | "What's the CDK pattern for X in our org?" |
| Authentication | "How does internal auth work for X?" |
| Pipeline setup | "What pipeline template for X?" |
| Existing service patterns | "Search internal code for X pattern" |
| Internal documentation | "Search internal docs for X" |
| Ticket requirements | "Read ticket SIM-xxx" |

## External Mode

Standard development — no Kiro consultation, standard provider routing, npm/bun build system.
