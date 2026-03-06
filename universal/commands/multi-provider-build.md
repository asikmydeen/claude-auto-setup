# Cross-Provider Feature Builder

You are the **coordinator** executing a feature using multiple AI agents, each chosen for what it does best. You (Claude) orchestrate and delegate.

## Input
$ARGUMENTS

## Provider Strengths (use this to decide who does what)

| Provider | Best at | CLI |
|---|---|---|
| **Claude** (you) | Planning, architecture, complex reasoning, debugging, security review | `claude -p "..."` |
| **Codex** | Fast code generation, test writing, boilerplate, simple implementations | `codex -q "..."` |
| **Gemini** | Documentation, large context analysis, frontend generation, search-grounded answers | `gemini -p "..."` |
| **Amp** | Code review, oracle-level guidance, multi-model routing | `amp "..."` |

## How to delegate

Use Bash to invoke other agents in non-interactive mode:

```bash
# Delegate test writing to Codex (fast, good at tests)
codex -q "Write unit tests for src/api/users.ts. Test all CRUD operations and edge cases. Use jest. Output only the test file content." --full-auto

# Delegate documentation to Gemini (cheap, good at docs)
gemini -p "Generate API documentation for src/api/. Include endpoints, request/response schemas, and examples."

# Delegate code review to Amp (has oracle model)
amp "Review this diff for security vulnerabilities, performance issues, and code quality: $(git diff)"
```

Or use the dispatch script:
```bash
/path/to/claude-auto-setup/dispatch.sh --task "write tests for users API" --type test-writing
/path/to/claude-auto-setup/dispatch.sh --task "generate API docs" --type documentation
/path/to/claude-auto-setup/dispatch.sh --task "review for security" --type code-review-security
```

## Execution Protocol

### Phase 0: Check Available Providers
Run: `which claude codex gemini amp 2>/dev/null` to see what's installed.
If only Claude is available, fall back to single-provider mode (standard /build workflow).

### Phase 1: Plan (YOU — Claude)
You always do planning. You're the coordinator.
- Read cached intel (`.claude/rules/project-intel.md` or `.ai/project-intel.md`)
- Break the feature into tasks
- For EACH task, decide which provider handles it:

**Decision rules:**
- Task needs complex reasoning or architecture? → **You (Claude)**
- Task is writing tests or boilerplate? → **Codex** (faster, cheaper)
- Task is generating docs or analyzing large files? → **Gemini** (huge context, cheap)
- Task needs code review with oracle guidance? → **Amp**
- Task involves AWS infrastructure? → **You (Claude)** or **Kiro**
- Only 1-2 providers installed? → Use what's available, don't force it

Present the plan with provider assignments:
```
## Plan
1. [Claude] Design API schema and data models
2. [Codex] Generate CRUD handlers from schema
3. [Codex] Write unit tests for all handlers
4. [Claude] Implement business logic and validation
5. [Gemini] Generate API documentation
6. [Amp] Security + quality review
7. [Claude] Final integration and verification
```

**STOP and wait for approval.**

### Phase 2: Execute (Parallel where possible)

After approval, execute tasks. For tasks assigned to other providers:

1. **Prepare context**: Include relevant files and intel in the prompt
2. **Invoke via Bash**: Use the provider's non-interactive CLI
3. **Capture output**: Save to a temp file or variable
4. **Validate**: Read the output, check quality, fix if needed
5. **Integrate**: Apply the output (write files, merge code)

**Parallel execution**: If tasks are independent, launch multiple providers simultaneously using background Bash tasks:
```bash
# Launch Codex for tests and Gemini for docs in parallel
codex -q "Write tests for..." --full-auto > /tmp/tests-output.txt &
gemini -p "Generate docs for..." > /tmp/docs-output.txt &
wait  # Both finish
```

### Phase 3: Review (Amp or Claude)
If Amp is installed, delegate review to it (has oracle model):
```bash
amp "Review this implementation for security, quality, and performance: $(git diff --staged)"
```
If not, you do the review yourself.

### Phase 4: Verify (YOU — Claude)
You always do final verification:
- Run build, tests, lint
- Check all provider outputs integrated correctly
- Produce verification report

### Phase 5: Update Intel (YOU — Claude)
Standard incremental intel update (same as /build Phase 6).

### Phase 6: Deliver
```
## Multi-Provider Build Report

### Feature: [name]

### Provider Usage
| Provider | Tasks | Token estimate |
|---|---|---|
| Claude | Planning, business logic, verification | ~X tokens |
| Codex | Test generation, CRUD handlers | ~Y tokens |
| Gemini | API documentation | ~Z tokens |
| Amp | Security + quality review | ~W tokens |

### Verification
[Build/test/lint results]

### Intel Updated
[Sections patched]
```

## Fallback Behavior

- **Only Claude installed**: Run standard single-provider /build workflow. No degradation.
- **Claude + one other**: Use the other for its strength, Claude for everything else.
- **All providers**: Full multi-provider orchestration.
- **Provider fails**: Log the error, fall back to Claude for that task. Never block on a failed provider.
