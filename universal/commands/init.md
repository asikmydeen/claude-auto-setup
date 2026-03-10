---
name: init
description: Smart Project Initializer
category: workflow
complexity: simple
triggers: [init]
---

# Smart Project Initializer

You are initializing a project for optimal Claude Code orchestration. Scan the project thoroughly and generate a complete project profile.

## Phase 0: Workspace Hierarchy Detection (ALWAYS FIRST)

Before scanning this package, detect the workspace structure:

1. **Walk up** from the current directory to find parent workspaces:
   - Check each parent directory for workspace markers: `package.json` with `workspaces`, `pnpm-workspace.yaml`, `lerna.json`, `brazil-build/workspace`, `Cargo.toml` with `[workspace]`, monorepo root markers (`.git` at root level with multiple packages below)
   - Stop at the filesystem root or the first `.git` directory (repo boundary)

2. **Walk down** to discover sibling packages:
   - If a parent workspace is found, list its child packages/projects
   - Check each sibling for existing `.claude/rules/project-intel.md`

3. **Classify the workspace topology**:
   - **Standalone**: No parent workspace, no sibling packages. Standard single-package mode.
   - **Child package**: Has a parent workspace with sibling packages. Needs cross-package awareness.
   - **Workspace root**: This IS the top-level workspace containing child packages. Needs aggregated intel.
   - **Nested**: Multi-level nesting (workspace → package group → package). Map all levels.

4. **Record the hierarchy** (used in Phase 2 and Phase 4):
   ```
   Workspace root: /path/to/root (or "none — standalone")
   Current package: /path/to/current
   Sibling packages: [list with paths and whether each has intel]
   Parent intel: [exists at /path or "none"]
   Depth: [1 = standalone, 2 = workspace/package, 3+ = deeply nested]
   ```

## Phase 1: Project Scan

Read and analyze these signals (use parallel tool calls):

1. **Language & Framework Detection**
   - Check for: `package.json`, `tsconfig.json`, `pyproject.toml`, `Cargo.toml`, `go.mod`, `pom.xml`, `build.gradle`, `packageInfo`
   - Read the main config file to identify framework (React, Next.js, Express, Django, Flask, CDK, SAM, etc.)
   - Check `src/` structure for patterns (components/, pages/, api/, handlers/, lambda/)

2. **Build System Detection**
   - Check for: `packageInfo` (Brazil), `Makefile`, `Dockerfile`, `docker-compose.yml`, `buildspec.yml`, `samconfig.toml`, `cdk.json`
   - Identify build commands, test commands, lint commands

3. **Test Setup Detection**
   - Check for: `jest.config.*`, `vitest.config.*`, `pytest.ini`, `.mocharc.*`, `cypress.config.*`, `playwright.config.*`
   - Identify test runner and test directory

4. **AWS Service Detection**
   - Scan for: CDK constructs, SAM templates, CloudFormation, Lambda handlers, DynamoDB table definitions, S3 usage, API Gateway, SQS/SNS
   - Check `template.yaml`, `cdk.json`, `serverless.yml`

5. **Existing Config Detection**
   - Check for existing `.claude/CLAUDE.md`, `.claude/rules/`, `.claude/settings.json`
   - Don't overwrite existing config — augment it

6. **Available Provider Detection**
   - Run: `which claude codex gemini amp 2>/dev/null` to detect installed AI agents
   - For each installed provider, note its strengths:
     - `codex`: fast code gen, test writing, boilerplate
     - `gemini`: documentation, large context analysis, search-grounded answers
     - `amp`: code review, oracle-level guidance
   - Check if dispatch script exists: `ls ~/claude-code-setup/dispatch.sh 2>/dev/null`
   - This determines the cross-provider dispatch capabilities for this project

## Phase 2: Generate Project CLAUDE.md

If `.claude/CLAUDE.md` does not exist, create it. If it exists, suggest additions only.

Template:
```markdown
# Project: [name from package.json or directory]

## Stack
- Language: [detected]
- Framework: [detected]
- Build: [detected command]
- Test: [detected command]
- Lint: [detected command]

## Architecture
[Brief description of project structure based on scan]

## Key Directories
- Source: [path]
- Tests: [path]
- Config: [path]

## AWS Services Used
[List detected AWS services]

## Common Commands
- Build: `[command]`
- Test: `[command]`
- Dev server: `[command]`
- Deploy: `[command if found]`

## Orchestration Profile
Agent team: [recommended agent set based on project type — see Phase 3]
Plugins: [which plugins are most relevant]

## Cross-Provider Dispatch
Available providers: [list installed: claude, codex, gemini, amp]
Auto-routing:
- Tests → [codex if installed, else claude subagent]
- Docs → [gemini if installed, else claude subagent]
- Review → [amp if installed, else claude subagent]
- Complex logic → claude (always)
Dispatch script: [path if exists, else "not installed"]
```

## Phase 3: Recommend Agent Team

Based on project type, output the recommended orchestration profile:

**For React/TypeScript frontend:**
- Lead: `fullstack-developer` or `frontend-developer`
- Support: `typescript-pro`, `react-specialist`, `test-automator`
- Review: `code-reviewer`, `security-auditor`
- Plugins: `typescript-lsp`, `context7` (for React/library docs), `serena`

**For Lambda/API backend:**
- Lead: `backend-developer` or `api-designer`
- Support: `typescript-pro` or `python-pro`, `database-optimizer`
- Infra: `cloud-architect`, `security-engineer`
- Review: `code-reviewer`, `security-auditor`, `test-automator`
- Plugins: `typescript-lsp`/`pyright-lsp`, `context7` (for AWS SDK docs)

**For CDK/Infrastructure:**
- Lead: `cloud-architect`
- Support: `devops-engineer`, `security-engineer`, `sre-engineer`
- Review: `architect-reviewer`, `security-auditor`
- Plugins: `typescript-lsp`, `context7` (for CDK construct docs)

**For full-stack (frontend + backend):**
- Lead: `fullstack-developer`
- Frontend: `react-specialist`, `frontend-developer`
- Backend: `backend-developer`, `api-designer`
- Quality: `code-reviewer`, `test-automator`, `security-auditor`
- Plugins: `typescript-lsp`, `context7`, `serena`

## Phase 4: Deep Research + Workspace Intel (AUTO-TRIGGER)

### 4a: Package-Level Intel

Check if `.claude/rules/project-intel.md` exists:

- **If it does NOT exist**: Automatically run the full deep-research workflow (DO NOT ask — just do it):
  1. Print: "No cached intel found. Running deep codebase research (6 parallel agents)..."
  2. Execute the ENTIRE deep-research workflow inline — launch all 6 parallel exploration agents as defined in `/user:deep-research`:
     - Agent 1: Architecture & Structure Map
     - Agent 2: API Surface & Data Models
     - Agent 3: Dependencies & External Integrations
     - Agent 4: Test Infrastructure & Quality
     - Agent 5: Code Patterns & Conventions
     - Agent 6: Business Logic & Domain Map
  3. Synthesize results into `.claude/rules/project-intel.md` (under 300 lines, dense reference format)
  4. Print: "Cached intel generated. This loads automatically every future session."

- **If it DOES exist**: Read the first line for the date.
  - **Older than 30 days**: Auto-refresh it. Print: "Intel is stale ([date]). Auto-refreshing..."  Then re-run the full deep-research.
  - **Fresh (under 30 days)**: Keep it. Print: "Cached intel loaded ([date]). Codebase knowledge is current."

### 4b: Workspace-Level Intel (only if workspace detected in Phase 0)

If the workspace topology is NOT "standalone":

1. **Check for workspace-level intel** at `{workspace_root}/.claude/rules/workspace-intel.md`

2. **If it does NOT exist**: Auto-generate it:
   - Print: "Workspace detected with [N] packages. Generating cross-package intelligence..."
   - Create `{workspace_root}/.claude/rules/workspace-intel.md` with this structure:
     ```markdown
     # Workspace Intelligence: [name]
     > Auto-generated. Last updated: [date]

     ## Workspace Topology
     - Root: [path]
     - Package manager: [npm workspaces / pnpm / lerna / brazil / cargo workspace]
     - Packages: [list with paths and one-line descriptions]

     ## Cross-Package Dependencies
     [Which packages import from which — internal dependency graph]
     - frontend → shared (imports types, utils)
     - backend → shared (imports types, validators)
     - infra → backend (references Lambda handler paths)

     ## Shared Contracts
     [Types, interfaces, APIs that span package boundaries]
     - Shared types: [path] — used by [packages]
     - API contracts: [frontend calls backend endpoints X, Y, Z]
     - Event schemas: [package A publishes, package B consumes]

     ## Package Intel Registry
     | Package | Path | Has Intel | Last Updated | Role |
     |---|---|---|---|---|
     | frontend | packages/frontend | yes | 2024-01-15 | React UI |
     | backend | packages/backend | yes | 2024-01-15 | API + Lambda |
     | shared | packages/shared | no | — | Shared types |

     ## Cross-Cutting Patterns
     [Patterns that are consistent across all packages]
     - Error handling: [approach]
     - Logging: [approach]
     - Auth: [how auth flows between packages]

     ## Workspace Commands
     - Build all: [command]
     - Test all: [command]
     - Build specific: [command pattern]
     ```
   - To populate the cross-package dependency graph, scan import statements across packages looking for cross-boundary imports.

3. **If it DOES exist**: Check freshness. Refresh if stale (>30 days) or if new packages have been added.

4. **Link from package intel**: Add a `## Workspace Context` section to the current package's intel referencing the workspace intel:
   ```markdown
   ## Workspace Context
   Part of: [workspace name] (see {workspace_root}/.claude/rules/workspace-intel.md)
   Sibling packages: [list]
   This package provides: [what it exports to siblings]
   This package consumes: [what it imports from siblings]
   ```

**IMPORTANT**: Never ask the user whether to run deep-research. The system makes smart decisions — if intel is missing or stale, generate it. The user should never need to think about this.

## Phase 5: Output Summary

Print a clean summary:
```
## Project Initialized: [name]
Stack: [language] / [framework] / [build system]
AWS: [services detected]
Workspace: [standalone / child of X with N siblings / workspace root with N packages]
Agent team: [list]
Plugins: [list]
Providers: [installed providers] → Tests: [codex/claude] | Docs: [gemini/claude] | Review: [amp/claude]
Build: `[command]` | Test: `[command]` | Dev: `[command]`
Intel: [generated / refreshed / loaded (date)]
Workspace Intel: [generated / refreshed / loaded (date) / N/A (standalone)]
Sibling Intel: [N of M siblings have intel]
```

Then say: "Project fully initialized with cached intelligence. I know this codebase [and its workspace context]. Cross-provider dispatch is [active (N providers) / single-provider mode]. Ask me to build anything."

$ARGUMENTS
