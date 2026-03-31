---
name: build
description: End-to-End Feature Builder
category: workflow
complexity: complex
triggers: [build]
---

# End-to-End Feature Builder

You are executing a full end-to-end feature implementation using multi-agent orchestration. Follow the orchestration protocol from the rules exactly.

## Input
The user's request: $ARGUMENTS

## Context Preservation

Before starting, check for an existing checkpoint: `cat .claude/scratch/task-state.md 2>/dev/null`
- **If it exists**: You may be resuming after compaction. Read it to recover your state. Say "Resuming from checkpoint — [phase], [next action]" and continue from where you left off.
- **If not**: Fresh start. Create the checkpoint directory: `mkdir -p .claude/scratch`

**Checkpoint at every phase transition** by writing to `.claude/scratch/task-state.md`. This file survives compaction.
**Commit after every logical unit** during implementation — persists work to git even if session crashes.
**Delete the checkpoint** when the task is fully delivered: `rm -f .claude/scratch/task-state.md`

## Execution Protocol

### 0. Load Hierarchical Intel + Pattern Spec (FIRST — auto-generate if missing)

**Package-level intel:**
Check if `.claude/rules/project-intel.md` exists:
- **YES and fresh (< 30 days)**: Read it. Use as primary context — skip redundant exploration.
- **YES but stale (> 30 days)**: Print "Intel is stale. Auto-refreshing in background..." Launch a background agent to re-run deep-research while you proceed with available intel.
- **NO**: Print "No cached intel. Generating now (7 parallel agents)..." Auto-run deep-research FIRST. Do NOT ask.

**Pattern conformance spec:**
Check if `.claude/rules/codebase-patterns.md` exists:
- **YES**: Read it. This is your implementation guide — every new file, function, component, and test must match these patterns.
- **NO**: Run the pattern-analyzer agent to generate it. Print "No pattern spec. Extracting codebase patterns..." Do NOT skip this.
- Include relevant pattern sections when prompting subagents and external providers during implementation.

**Language rules:**
Check if `.claude/rules/lang-*.md` files exist in the project:
- **YES**: Language rules are active. Include relevant language standards when prompting implementation subagents.
- **NO**: Check `~/.claude/lang-staging/` for available rules. If project languages detected but rules not activated, copy them now.

**Internal project detection:**
Check: `[ -f packageInfo ] || [ -f .brazil.json ] || [[ "$PWD" == */workplace/* ]]`
- **If internal**: Activate Kiro consultation per `internal-routing.md` rule. Before architecture/API/infra decisions, query: `kiro-cli -p "question" --allow-tool='shell(read)'`. Use `brazil-build release` (not npm), CRs (not PRs), pipeline deployment (not direct).
- **If external**: Standard mode, no Kiro needed.

**Workspace-level intel (auto-discover):**
Walk up from the current directory to find a parent workspace:
- Look for `workspace-intel.md` in parent `.claude/rules/` directories
- If found, read it — it tells you about sibling packages, shared contracts, cross-package dependencies
- If the task touches cross-package boundaries (shared types, API calls, imports from siblings), also read the relevant sibling's `project-intel.md`
- If a workspace exists but `workspace-intel.md` doesn't, auto-generate it (see `/init` Phase 4b)
- If standalone (no workspace), skip this — proceed with package intel only

### 0.5. Vagueness Gate (auto — skip if anchored)

Before planning, check if the request has concrete anchors. Scan `$ARGUMENTS` for ANY of:
- File paths (e.g., `src/auth/middleware.ts`)
- Function/class names in camelCase, PascalCase, or snake_case
- Issue/PR numbers (e.g., `#42`, `issue 42`)
- Error messages or stack traces
- Numbered steps (e.g., `1. Add X 2. Test Y`)
- Code blocks
- Acceptance criteria or test specifications

**If ANY anchor found**: Gate passes. Continue to Phase 1.

**If NO anchors found AND prompt has 15 or fewer effective words**:
- Print: "Your request needs more specificity before I can build effectively."
- Show which anchor types would help (file paths, function names, acceptance criteria, etc.)
- Redirect to `/deep-interview` (extremely vague — no code-related nouns) or `/consensus-planning` (moderately vague — has concept but no specifics)
- User can bypass with `force:` prefix at the start of their request

**If `$ARGUMENTS` starts with `force:`**: Strip the prefix and skip this gate entirely.

### 1. Explore Phase
Launch parallel exploration agents (scope down based on cached intel):
- **Agent 1 (Codebase Explorer)**: If cached intel exists, only explore areas directly related to the task that aren't covered in the intel. If no intel, do full exploration — find all relevant files, understand existing patterns, identify where changes need to go.
- **Agent 2 (Docs Fetcher)**: If the task involves any library/SDK/framework, use context7 MCP to fetch up-to-date documentation for the specific APIs needed.
- **Agent 3 (Dependency Mapper)**: If touching existing code, use serena or Grep to map dependencies — what calls this code, what does it import, what tests cover it. Check cached intel for critical paths first.

**Frontend/UI tasks**: If the feature involves UI components, activate **ui-ux-pro-max** for design system intelligence — component patterns, accessibility rules, responsive design, industry-standard UI conventions.

**CHECKPOINT**: Write exploration results and key discoveries to `.claude/scratch/task-state.md` (Phase: explore, include discoveries and files identified).

### 2. Plan Phase

For complex features (3+ tasks, cross-cutting concerns, or architectural decisions), consider using the **superpowers brainstorming** skill for divergent exploration of approaches, then the **sequential-thinking skill** to converge on a design before writing the spec:

```bash
cd ~/.claude/skills/sequential-thinking && bun scripts/think.ts --reset
# Thought 1: What are the core requirements and constraints?
# Thought 2: What existing patterns/code must we integrate with?
# Thought 3: Architecture approach (branch alternatives if trade-offs exist)
# Thought 4: Task decomposition — what can parallelize?
# Thought 5: Risk assessment — what could go wrong?
# Final: Confidence-checked implementation plan
```

- **Branch** to compare architectural approaches (e.g., `--branchId "approach-a"` vs `--branchId "approach-b"`)
- **Revise** when exploration results change assumptions
- Terminate with a clear, justified plan

Then synthesize into a spec:
- Write the spec using the standard spec format with `@@@task` blocks
- Assign each task to the most appropriate agent (reference the orchestration rules agent selection table)
- Identify which tasks can run in parallel vs sequential
- **STOP and present the plan. Wait for user approval.**

**CHECKPOINT**: After approval, write the full approved plan to `.claude/scratch/task-state.md` (Phase: plan-approved, include all tasks with assignments).

### 2.5. Detect Providers (silent, automatic)
Run `which claude codex gemini amp copilot 2>/dev/null` to detect installed providers. Use this to decide dispatch targets in phases 3 and 4. Never mention this step to the user — just use the information.

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
- For test-driven tasks, use **superpowers TDD** skill if available: write failing test → implement → verify → commit. If unavailable, follow standard TDD (write test first, see red, implement, verify green).
- For frontend/UI tasks, activate **ui-ux-pro-max** if available for component patterns and accessibility guidance
- **Always validate external provider output** before integrating — read it, check quality, fix if needed
- If an external provider fails or returns poor quality, fall back to Claude subagent silently
- **CHECKPOINT after each task completes**: Update `.claude/scratch/task-state.md` — mark the task done, list files changed, move to next task
- **Commit after each logical unit**: `git add [specific files]` + commit with descriptive message — persists work to git

### 3.5. Deslop Pass (auto — skip for trivial changes)

After implementation, before review, run a bounded cleanup pass on changed files:

1. Get changed files: `git diff --name-only`
2. If fewer than 30 lines changed total: skip this phase (trivial change)
3. Run the `ai-slop-cleaner` skill scoped to ONLY the changed files:
   - Dead code deletion (unused imports, unreachable branches)
   - Duplicate removal (copy-paste from implementation)
   - Naming cleanup (AI-generated generic names)
4. Re-run build/test verification after cleanup
5. Report: "Deslop: {N} cleanups applied to {M} files" or "Deslop: skipped (trivial change)"

This phase is bounded — it ONLY touches files changed in this build, never expands scope.

### 4. Review Phase (auto-dispatch to best provider)
After implementation, launch review agents in parallel:
- **If Amp is installed**: Delegate primary code review to Amp (invoke: `echo "Review: $(git diff --staged)" | amp`)
- **Always**: Run security check with Claude subagent (security-auditor patterns) — never delegate security to external-only
- **Always**: Pattern conformance check — code-reviewer validates all changes against `.claude/rules/codebase-patterns.md`. Flag non-conformance as Warnings.
  - If a deviation is intentional: follow the Deviation Protocol from `pattern-conformance.md` (propose → get user confirmation → implement → update pattern spec → log in Deviation Log)
  - If a deviation is accidental: fix to match existing patterns before proceeding
- Code simplification pass (code-simplifier patterns) → Claude subagent
- Use **superpowers verification** skill if available to produce evidence that the implementation meets acceptance criteria

**Rebuttal round** (after review agents return):
- Collect all Critical and High-severity findings from all review agents
- For each Critical finding: generate the strongest counter-argument ("Why might this NOT be a problem?")
- Finding survives only if the original evidence withstands the counter-argument
- Report: "Rebuttal: {X}/{Y} critical findings survived challenge"
- This reduces false positives and increases confidence in real issues

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

8. **Update codebase-patterns.md if needed**: If any of these are true, patch `.claude/rules/codebase-patterns.md`:
   - A new module pattern was introduced (new route module, new component type, new test approach)
   - A deviation was approved during this task (add to Deviation Log)
   - New directories were created that establish new file organization patterns
   - If none of the above apply, skip — most changes follow existing patterns and don't need a spec update.

**IMPORTANT**: This phase is lightweight — it reads a diff and patches a few sections. It should take seconds, not minutes. Do NOT re-scan the entire codebase.

### 7. Deliver
Present the verification report and summary of all changes made. Include a line:
```
Intel updated: [sections that were patched]
```
