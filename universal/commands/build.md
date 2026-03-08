# End-to-End Feature Builder

You are executing a full end-to-end feature implementation using multi-agent orchestration. Follow the orchestration protocol from the rules exactly.

## Input
The user's request: $ARGUMENTS

## Execution Protocol

### 0. Load Hierarchical Intel (FIRST — auto-generate if missing)

**Package-level intel:**
Check if `.claude/rules/project-intel.md` exists:
- **YES and fresh (< 30 days)**: Read it. Use as primary context — skip redundant exploration.
- **YES but stale (> 30 days)**: Print "Intel is stale. Auto-refreshing in background..." Launch a background agent to re-run deep-research while you proceed with available intel.
- **NO**: Print "No cached intel. Generating now (6 parallel agents)..." Auto-run deep-research FIRST. Do NOT ask.

**Workspace-level intel (auto-discover):**
Walk up from the current directory to find a parent workspace:
- Look for `workspace-intel.md` in parent `.claude/rules/` directories
- If found, read it — it tells you about sibling packages, shared contracts, cross-package dependencies
- If the task touches cross-package boundaries (shared types, API calls, imports from siblings), also read the relevant sibling's `project-intel.md`
- If a workspace exists but `workspace-intel.md` doesn't, auto-generate it (see `/init` Phase 4b)
- If standalone (no workspace), skip this — proceed with package intel only

### 1. Explore Phase
Launch parallel exploration agents (scope down based on cached intel):
- **Agent 1 (Codebase Explorer)**: If cached intel exists, only explore areas directly related to the task that aren't covered in the intel. If no intel, do full exploration — find all relevant files, understand existing patterns, identify where changes need to go.
- **Agent 2 (Docs Fetcher)**: If the task involves any library/SDK/framework, use context7 MCP to fetch up-to-date documentation for the specific APIs needed.
- **Agent 3 (Dependency Mapper)**: If touching existing code, use serena or Grep to map dependencies — what calls this code, what does it import, what tests cover it. Check cached intel for critical paths first.

### 2. Plan Phase
Synthesize exploration into a spec:
- Write the spec using the standard spec format with `@@@task` blocks
- Assign each task to the most appropriate agent (reference the orchestration rules agent selection table)
- Identify which tasks can run in parallel vs sequential
- **STOP and present the plan. Wait for user approval.**

### 2.5. Detect Providers (silent, automatic)
Run `which claude codex gemini amp 2>/dev/null` to detect installed providers. Use this to decide dispatch targets in phases 3 and 4. Never mention this step to the user — just use the information.

### 3. Implement Phase (auto-dispatch to best provider)
After approval, execute tasks using parallel agents AND external providers where possible:

**Provider auto-routing** (apply silently based on what's installed):
- **Test writing tasks** → Codex if installed (invoke: `codex -q "Write tests for [context]..." --full-auto`), else Claude subagent
- **Boilerplate / CRUD tasks** → Codex if installed, else Claude subagent
- **Documentation tasks** → Gemini if installed (invoke: `echo "Generate docs for [context]..." | gemini`), else Claude subagent
- **Complex logic, architecture, business rules** → Always Claude subagent (you)
- **All other tasks** → Claude subagent

**Execution**:
- Launch external providers and Claude subagents in parallel for independent tasks
- When dispatching to external providers, include relevant file contents and patterns in the prompt
- Each agent/provider gets a focused scope: only the files and context it needs
- Use context7 for any API lookups during implementation
- LSP will automatically catch type errors after edits
- **Always validate external provider output** before integrating — read it, check quality, fix if needed
- If an external provider fails or returns poor quality, fall back to Claude subagent silently

### 4. Review Phase (auto-dispatch to best provider)
After implementation, launch review agents in parallel:
- **If Amp is installed**: Delegate primary code review to Amp (invoke: `echo "Review: $(git diff --staged)" | amp`)
- **Always**: Run security check with Claude subagent (security-auditor patterns) — never delegate security to external-only
- Code simplification pass (code-simplifier patterns) → Claude subagent
- Fix any issues found before proceeding

### 5. Verify Phase
Run all verification commands:
- Build command (brazil-build release / npm run build)
- Test command (brazil-build run test / npm test)
- Lint command (npx eslint . / npm run lint)
- Type check (npx tsc --noEmit)
- Produce verification report

### 6. Update Cached Intel (MANDATORY — runs after all agents complete)

This phase keeps the project intelligence file in sync with your changes. It runs as a SINGLE sequential step after all parallel work is done — no concurrency issues.

**Steps:**

1. **Get the diff**: Run `git diff HEAD~1 --name-only` (or `git diff --name-only` if uncommitted) to list all changed files.

2. **Map changes to intel sections** using this routing table:

| Changed files match | Intel section to update |
|---|---|
| `src/api/*`, `src/handlers/*`, `src/routes/*`, `*Controller*`, `*handler*` | **API Surface** |
| `src/models/*`, `src/types/*`, `*schema*`, `*.interface.*`, `*dto*` | **Data Models** |
| `package.json`, `requirements.txt`, `Cargo.toml`, `packageInfo` | **Dependencies** |
| `cdk/*`, `infra/*`, `template.yaml`, `serverless.yml`, `*stack*` | **AWS Services** |
| `src/components/*`, `src/pages/*`, `src/views/*` | **Architecture** (UI layer) |
| New directories created, major file moves | **Architecture** + **Directory Map** |
| `*.test.*`, `*.spec.*`, `jest.config.*`, `vitest.config.*` | **Test Infrastructure** |
| `README*`, `CLAUDE.md`, `docs/*` | **Domain Map** |
| `*.config.*`, `.env.example`, CI/CD files | **Quick Reference** |
| Critical path files (from intel's Critical Paths section) | **Critical Paths** |

3. **Read ONLY the affected sections** from `.claude/rules/project-intel.md` and the changed source files.

4. **Patch the affected sections** in project-intel.md:
   - Preserve all unaffected sections exactly as-is
   - Update affected sections with new information from the changed files
   - Update the date on line 2: `> Auto-generated by deep-research. Last updated: [today's date]. Last incremental update: [now]`
   - Keep the file under 300 lines

5. **Append to changelog** at `.claude/rules/.intel-changelog` (create if missing):
   ```
   [ISO-8601 timestamp] | build | [summary of task] | Sections updated: [list] | Files changed: [count]
   ```

6. **If no intel file exists** (edge case — someone deleted it): Print "Intel file missing. Regenerating..." and run the full deep-research workflow.

7. **Update workspace intel if needed**: If a `workspace-intel.md` exists in a parent directory AND any of these conditions are true, patch it too:
   - New exports were added/changed that sibling packages might consume (shared types, API endpoints, event schemas)
   - `package.json` dependencies changed (affects the cross-package dependency graph)
   - New files were added to directories that represent package boundaries
   - The package's role or architecture fundamentally changed

   When patching workspace-intel.md, only update:
   - The **Package Intel Registry** table (update "Last Updated" date for this package)
   - The **Cross-Package Dependencies** section (if imports changed)
   - The **Shared Contracts** section (if exported types/APIs changed)

   If none of the above conditions apply, skip workspace intel update — most changes are internal to the package.

**IMPORTANT**: This phase is lightweight — it reads a diff and patches a few sections. It should take seconds, not minutes. Do NOT re-scan the entire codebase.

### 7. Deliver
Present the verification report and summary of all changes made. Include a line:
```
Intel updated: [sections that were patched]
```
