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
This looks like a feature-level request. I recommend running the full SDLC pipeline:

  /sdlc "your feature description"

This will spin up a virtual engineering team (PM, engineers, testers, security) to:
1. Break it into stories and tasks
2. Implement in parallel git worktrees (max 5 concurrent)
3. Test, review, merge, and prepare for release

Alternatively, I can handle it as a regular task if you prefer.
```

If the user has previously said "always use /sdlc for features" → route automatically without asking.

## Integration with Orchestration

This rule extends the existing task classification in `orchestration.md` Step 1.5:

| Classification | Handler | When |
|---------------|---------|------|
| Trivial | Solo (no agents) | Single file, < 30 lines |
| Small | Quick task | 1-2 files, single concern |
| Medium | Multi-agent /build | 2-5 files, single concern |
| Large | Multi-agent /build | 6+ files, cross-cutting |
| **Feature/Epic** | **/sdlc pipeline** | **New feature, multi-story, involves multiple roles/layers** |

The /sdlc classification is NEW — it sits above "Large" because it involves planning (stories, tasks, architecture) before implementation.
