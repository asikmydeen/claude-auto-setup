# SDLC Auto-Routing

Detect when a user request is a full feature/epic (requires the SDLC pipeline) vs a quick task (handled inline).

## Detection Rules

Route to `/sdlc` (full SDLC pipeline) when the user's request matches ANY of:

**Explicit feature requests:**
- "Build me ...", "Create a ...", "Implement a ..."
- "I want a ... app/system/service/tool/page/dashboard"
- "Add a complete ... feature" (not "add a field" or "add a button")
- "Make me ...", "Set up a ... project"

**Scope indicators (multiple concerns):**
- Request mentions both frontend AND backend
- Request involves new database tables/models AND UI
- Request describes a user flow with 3+ steps
- Request mentions multiple roles (admin, user, etc.)
- Request is longer than 3 sentences describing what to build

**New project indicators:**
- "Start a new ..." / "Bootstrap ..." / "Scaffold ..."
- No existing source code in the current directory (only README, .gitignore)

## Do NOT Route to /sdlc

Keep as regular Claude task when:
- Single file change ("fix this bug", "update this function")
- Refactoring existing code ("rename X to Y", "extract this to a utility")
- Explanation requests ("how does X work?", "explain this code")
- Quick additions ("add a field to this model", "add an endpoint for X")
- Test writing for existing code
- Documentation updates
- Config changes

## How to Route

When you detect a feature-level request, suggest the SDLC pipeline:

```
This looks like a feature-level request. You have two options:

Option 1 — GSD 2 (recommended for external/greenfield):
  gsd          # then /gsd auto
  Better context management, cost tracking, crash recovery, verification.

Option 2 — SDLC Overseer (recommended for internal/Amazon):
  /sdlc "your feature description"
  Kiro integration, 15 role-based agents, cmux dashboard.

Option 3 — I'll handle it as a regular multi-agent task:
  /build "your feature description"
  Faster, but less structured than a full pipeline.
```

If the user has previously said "always use GSD" or "always use /sdlc" → route automatically without asking.

**Auto-selection heuristic:**
- Internal project (packageInfo, .brazil.json, /workplace/) → suggest Overseer (`--internal`)
- External + complex (multi-story, multi-layer) → suggest GSD 2 (`gsd auto`)
- External + medium complexity → suggest `/build`

## Integration with Orchestration

This rule extends the existing task classification in `orchestration.md` Step 1.5:

| Classification | Handler | When |
|---------------|---------|------|
| Trivial | Solo (no agents) | Single file, < 30 lines |
| Small | Quick task | 1-2 files, single concern |
| Medium | Multi-agent /build | 2-5 files, single concern |
| Large | Multi-agent /build | 6+ files, cross-cutting |
| **Feature/Epic (external)** | **GSD 2** (`gsd auto`) | **Greenfield, cost tracking, crash recovery** |
| **Feature/Epic (internal)** | **Overseer** (`/sdlc --internal`) | **Amazon services, Kiro, cmux** |

GSD 2 and Overseer are complementary — GSD 2 excels at context management and cost tracking, Overseer excels at internal integration and role-based orchestration.
