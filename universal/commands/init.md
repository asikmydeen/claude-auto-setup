# Smart Project Initializer

You are initializing a project for optimal Claude Code orchestration. Scan the project thoroughly and generate a complete project profile.

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

## Phase 4: Deep Research (AUTO-TRIGGER)

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

**IMPORTANT**: Never ask the user whether to run deep-research. The system makes smart decisions — if intel is missing or stale, generate it. The user should never need to think about this.

## Phase 5: Output Summary

Print a clean summary:
```
## Project Initialized: [name]
Stack: [language] / [framework] / [build system]
AWS: [services detected]
Agent team: [list]
Plugins: [list]
Providers: [installed providers] → Tests: [codex/claude] | Docs: [gemini/claude] | Review: [amp/claude]
Build: `[command]` | Test: `[command]` | Dev: `[command]`
Intel: [generated / refreshed / loaded (date)]
```

Then say: "Project fully initialized with cached intelligence. I know this codebase. Cross-provider dispatch is [active (N providers) / single-provider mode]. Ask me to build anything."

$ARGUMENTS
