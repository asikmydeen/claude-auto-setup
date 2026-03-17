---
name: deep-research
description: Deep Codebase Research & Intelligence Generator
category: workflow
complexity: complex
triggers: [deep-research]
---

# Deep Codebase Research & Intelligence Generator

You are performing a comprehensive multi-agent codebase analysis to produce a compact, high-density project intelligence file. This file acts as "cached context" — loaded every session so Claude never needs to re-explore the codebase from scratch.

## Target
$ARGUMENTS

If no target specified, analyze the current working directory.

## Phase 1: Parallel Deep Scan (Launch ALL agents simultaneously)

Launch 7 parallel exploration agents. Each agent focuses on one dimension. Instruct each to be THOROUGH but OUTPUT CONCISE — bullet points, not essays.

### Agent 1: Architecture & Structure Map
Explore subagent task:
- Map the complete directory tree (max depth 4)
- Identify the architectural pattern (MVC, layered, hexagonal, microservices, monolith)
- Identify entry points (main files, handlers, index files, app bootstrap)
- Map the dependency graph between modules/packages (what imports what)
- Identify shared utilities, common patterns, base classes
- Note any monorepo structure, workspaces, or package boundaries
- **Workspace detection**: Walk up to find parent workspace. If found, identify sibling packages, scan for cross-package imports (this package importing from siblings or vice versa), note shared types/contracts that span package boundaries. Record: what this package exports to siblings, what it consumes from siblings.
- Output: structured directory map with annotations + workspace context if applicable

### Agent 2: API Surface & Data Models
Explore subagent task:
- Find all API endpoints/routes (REST, GraphQL, Lambda handlers, API Gateway)
- Document request/response shapes for key endpoints
- Find all data models, types, interfaces, schemas (TypeScript interfaces, DB schemas, Zod/Yup schemas)
- Map data flow: where data enters → transforms → persists
- Identify DTOs, serialization patterns, validation layers
- Output: endpoint catalog + type/model inventory

### Agent 3: Dependencies & External Integrations
Explore subagent task:
- Read package.json / requirements.txt / Cargo.toml — list ALL dependencies with versions
- Categorize: framework, UI library, state management, testing, AWS SDK, utilities, dev tools
- Find all external service integrations (AWS services, third-party APIs, databases)
- Identify environment variables and config files (what config does the app need)
- Map AWS service usage: which Lambda calls which DynamoDB table, S3 bucket, SQS queue, etc.
- Check for CDK/SAM/CloudFormation templates and extract resource definitions
- Output: dependency map + external integration catalog + AWS resource inventory

### Agent 4: Test Infrastructure & Quality
Explore subagent task:
- Identify test framework(s) and configuration
- Map test directory structure and naming conventions
- Calculate approximate test coverage by module (count test files vs source files)
- Identify test utilities, fixtures, factories, mocks
- Find CI/CD config (buildspec.yml, .github/workflows, Jenkinsfile, brazil-build config)
- Identify linting config (eslint, prettier, tslint)
- Output: test infrastructure summary + coverage gaps + CI pipeline description

### Agent 5: Code Patterns & Conventions
Explore subagent task:
- Sample 10-15 representative files across the codebase
- Identify naming conventions (camelCase, snake_case, PascalCase for what)
- Document import patterns (absolute vs relative, barrel files, path aliases)
- Identify error handling patterns (try/catch, Result types, error boundaries)
- Document state management approach (Redux, Zustand, Context, custom)
- Identify component patterns (atomic design, feature-based, page-based)
- Document logging approach (structured, console, custom logger)
- Note any custom decorators, hooks, HOCs, utility patterns
- Output: conventions reference + pattern catalog

### Agent 6: Business Logic & Domain Map
Explore subagent task:
- Read README, CLAUDE.md, and any documentation files
- Identify the core domain concepts (what does this app do?)
- Map key business workflows (user flows, data processing pipelines, event chains)
- Identify critical business rules and where they live in code
- Note any feature flags, A/B tests, or conditional logic
- Identify scheduled tasks, background jobs, event handlers
- Output: domain glossary + workflow map + business rule locations

### Agent 7: Pattern Analyzer (produces codebase-patterns.md)
Use the `pattern-analyzer` agent (or run its process inline):
- Sample 3-5 representative files per layer (server, UI, data, test, config, utility)
- For each layer, extract the CONCRETE pattern with a real code example — not prose
- Cover all 12 categories: file organization, module structure, function signatures, component patterns, route/handler patterns, type definitions, import conventions, error handling, testing patterns, logging, configuration, naming conventions
- Identify anti-patterns: check linter configs, tsconfig strictness, eslint-disable patterns
- Use the template at `universal/patterns-template.md` as the output structure
- Output: `.claude/rules/codebase-patterns.md` — dense, example-heavy, under 250 lines
- This file is SEPARATE from project-intel.md — it's the actionable conformance spec, not the architecture map

**IMPORTANT**: Agent 7 runs in parallel with Agents 1-6 but produces a SEPARATE output file. Do not merge its output into project-intel.md.

## Phase 2: Synthesize into Project Intelligence File

Combine Agents 1-6 outputs into a single, optimized file. Agent 7's output (codebase-patterns.md) is saved separately — see Phase 3. Follow these rules:

**Format rules for maximum cache efficiency:**
- Use markdown headers for structure (Claude can scan headers fast)
- Use bullet points, not paragraphs
- Use `file:line` references so Claude can jump to source
- Use tables for catalogs (endpoints, models, dependencies)
- Keep total file under 300 lines — this is a DENSE reference, not documentation
- Prioritize information that changes INFREQUENTLY (architecture, patterns, conventions)
- Deprioritize information that changes FREQUENTLY (specific implementations, line numbers for volatile code)

**File structure:**

```markdown
# Project Intelligence: [name]
> Auto-generated by deep-research. Last updated: [date]
> Re-run `/user:deep-research` to refresh after major changes.

## Quick Reference
- Stack: [language / framework / build]
- Entry: [main entry point files]
- Build: `[command]` | Test: `[command]` | Dev: `[command]`
- Deploy: `[command or process]`

## Architecture
[Pattern name, layer diagram, module boundaries]

## Directory Map
[Annotated tree — what lives where, max depth 3]

## API Surface
[Endpoint table: method, path, handler file, auth required]

## Data Models
[Key types/interfaces with file locations]

## AWS Services
[Service → resource → purpose → config location]

## Dependencies
[Categorized table: name, version, purpose]

## Code Patterns & Conventions
[Naming, imports, error handling, state, components, logging]

## Test Infrastructure
[Framework, config, directory, coverage gaps, how to run]

## Domain Map
[Core concepts, key workflows, business rule locations]

## Critical Paths
[The 5-10 most important files/modules that everything depends on]

## Workspace Context (only if part of a multi-package workspace)
Part of: [workspace name] ([workspace_root path])
Sibling packages: [list with one-line descriptions]
This package provides: [what it exports — types, APIs, events — consumed by siblings]
This package consumes: [what it imports from siblings]
Cross-package contracts: [shared types/interfaces that span boundaries]
Workspace intel: [path to workspace-intel.md if it exists]

## Known Gotchas
[Things that are non-obvious, easy to break, or frequently cause bugs]
```

## Phase 3: Save & Wire Up

1. Create the directory if needed: `mkdir -p .claude/rules/`

2. Save the file as `.claude/rules/project-intel.md`
   - This auto-loads every session as a rules file
   - Acts as persistent cached context
   - No need to re-explore the codebase for routine tasks
   - **IMPORTANT**: The second line MUST contain the date in this exact format:
     ```
     > Auto-generated by deep-research. Last updated: YYYY-MM-DD. Last incremental update: YYYY-MM-DD
     ```
     This date is used by `/init` to check freshness and by incremental updates to track staleness.

3. Initialize the changelog at `.claude/rules/.intel-changelog`:
   ```
   # Intel Changelog
   # Format: [timestamp] | [command] | [summary] | Sections updated: [list] | Files changed: [count]
   [ISO-8601 timestamp] | deep-research | Full codebase scan (initial generation) | Sections updated: ALL | Files scanned: [count]
   ```

4. Save Agent 7's output as `.claude/rules/codebase-patterns.md`
   - This is the actionable pattern conformance spec — loaded every session alongside project-intel
   - Must stay under 250 lines — dense, example-heavy
   - Uses the structure from `universal/patterns-template.md`

5. If `.claude/CLAUDE.md` exists, check if it already references project-intel and codebase-patterns. If not, suggest adding:
   ```
   See @.claude/rules/project-intel.md for complete codebase map.
   See @.claude/rules/codebase-patterns.md for coding patterns and conventions.
   ```

6. Print summary:
```
## Deep Research Complete

Generated: .claude/rules/project-intel.md ([X] lines)
Generated: .claude/rules/codebase-patterns.md ([Y] lines)
Changelog: .claude/rules/.intel-changelog (initialized)
Scanned: [N] directories, [M] files sampled
Agents used: 7 parallel explorers (6 intel + 1 pattern analyzer)
Time: [duration]

These files now load automatically every session.
Claude will use project-intel as cached context and codebase-patterns as the conformance spec.
New code must follow documented patterns. Deviations require explicit approval.
Incremental updates happen automatically after every /build, /debug, and /review.

To force full refresh: /deep-research
```
