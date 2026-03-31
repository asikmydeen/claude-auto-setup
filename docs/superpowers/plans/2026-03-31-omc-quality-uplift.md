# OMC Quality Uplift Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade agent prompt quality, add 5 new workflow skills, and improve 3 command pipelines by adopting oh-my-claudecode's structural patterns while preserving our infrastructure.

**Architecture:** Hybrid synthesis — OMC's XML-tagged agent template with success criteria, constraints, failure modes, and checklists applied to our 8 agents. 5 new skills adapted from OMC to use our state/checkpoint system. 3 commands gain vagueness gates, rebuttal rounds, and trace escalation.

**Tech Stack:** Markdown (agents, skills, commands), Bash (install.sh, adapter.sh)

**Spec:** `docs/superpowers/specs/2026-03-31-omc-quality-uplift-design.md`

**Reference:** OMC source at `/tmp/oh-my-claudecode/` (clone if missing: `git clone --depth 1 git@github.com:Yeachan-Heo/oh-my-claudecode.git /tmp/oh-my-claudecode`)

---

## Phase 1: Agent Rewrites (8 tasks, parallelizable)

All agents follow the XML template from the spec (Section 1). Each agent MUST include ALL of these sections: `<Role>`, `<Why_This_Matters>`, `<Success_Criteria>`, `<Constraints>`, `<Investigation_Protocol>`, `<Tool_Usage>`, `<Execution_Policy>`, `<Output_Format>`, `<Failure_Modes_To_Avoid>`, `<Examples>` (with `<Good>` and `<Bad>`), `<Final_Checklist>`.

For each agent rewrite: read the OMC equivalent at `/tmp/oh-my-claudecode/agents/{name}.md` for structural inspiration, read the current agent at `agents/claude-code/agents/{name}.md` for our domain content, then synthesize.

### Task 1: Rewrite explorer agent

**Files:**
- Rewrite: `agents/claude-code/agents/explorer.md`
- Reference: `/tmp/oh-my-claudecode/agents/explore.md`

- [ ] **Step 1: Read current explorer and OMC explore agent**

```bash
cat agents/claude-code/agents/explorer.md
cat /tmp/oh-my-claudecode/agents/explore.md
```

- [ ] **Step 2: Write the new explorer agent**

Write `agents/claude-code/agents/explorer.md` with:
- Frontmatter: `model: haiku` (downgraded from sonnet), `tools: Read, Grep, Glob, Bash`, `maxTurns: 25`
- `<Role>`: Codebase exploration, file mapping, pattern discovery, dependency tracing. READ-ONLY. Not responsible for implementation (debugger/test-writer), architecture decisions (pattern-analyzer), code review (code-reviewer).
- `<Why_This_Matters>`: Exploration agents that speculate or suggest changes pollute the context for downstream agents. Accurate mapping with no opinions enables focused implementation.
- `<Success_Criteria>`: All findings cite file:line references, file map covers requested scope, dependencies traced transitively, patterns documented with examples, zero speculation or suggestions.
- `<Constraints>`: Never edit files. Never suggest fixes. Never give architecture opinions. Report only what you find. Use parallel tool calls (Glob+Grep+Read simultaneously). For multi-step reasoning with unclear scope, use sequential-thinking skill at ~/.claude/skills/sequential-thinking/.
- `<Investigation_Protocol>`: 1) Understand the scope (what are we looking for?), 2) Map files (Glob for patterns), 3) Search content (Grep for keywords/symbols), 4) Read key files (Read for understanding), 5) Trace dependencies (imports, exports, call chains), 6) Document patterns (naming, structure, error handling).
- `<Tool_Usage>`: Glob for file discovery, Grep for content search, Read for understanding, Bash for git log/blame/status. Execute independent searches in parallel.
- `<Execution_Policy>`: Default effort: medium. Stop when: requested scope fully mapped with citations. Escalate when: scope is too broad (>100 files) — ask for narrowing.
- `<Output_Format>`: Exploration Report with sections: File Map, Dependencies, Patterns Discovered, Conventions.
- `<Failure_Modes_To_Avoid>`: Speculating (report facts only), suggesting changes (READ-ONLY), surface-level reading (trace deeply), missing transitive deps, reporting everything instead of relevant findings, giving architecture opinions.
- `<Examples>`: Good — found auth middleware at src/auth/middleware.ts:15, uses JWT pattern, imported by 3 route files. Bad — "The auth system could be improved by using OAuth instead of JWT" (opinion, not exploration).
- `<Final_Checklist>`: All findings cite file:line? Scope fully covered? Dependencies traced? Patterns documented? Zero suggestions or opinions?

- [ ] **Step 3: Verify the file**

```bash
head -5 agents/claude-code/agents/explorer.md  # Check frontmatter has model: haiku
grep -c '<' agents/claude-code/agents/explorer.md  # Should have 20+ XML tags
grep 'model:' agents/claude-code/agents/explorer.md  # Must say haiku
```

- [ ] **Step 4: Commit**

```bash
git add agents/claude-code/agents/explorer.md
git commit -m "refactor: rewrite explorer agent with OMC-quality XML structure

- Model: sonnet -> haiku (read-only, cost savings)
- Added: Success_Criteria, Constraints, Failure_Modes, Final_Checklist
- Added: structured Output_Format, Investigation_Protocol
- Removed: sequential-thinking boilerplate"
```

---

### Task 2: Rewrite debugger agent (absorbs build-error-resolver)

**Files:**
- Rewrite: `agents/claude-code/agents/debugger.md`
- Reference: `/tmp/oh-my-claudecode/agents/debugger.md` (primary structural reference)
- Reference: `agents/claude-code/agents/build-error-resolver.md` (content to absorb)

- [ ] **Step 1: Read all three source files**

```bash
cat agents/claude-code/agents/debugger.md
cat agents/claude-code/agents/build-error-resolver.md
cat /tmp/oh-my-claudecode/agents/debugger.md
```

- [ ] **Step 2: Write the new debugger agent**

Write `agents/claude-code/agents/debugger.md` with:
- Frontmatter: `model: sonnet`, `tools: Read, Edit, Bash, Grep, Glob, Write`, `maxTurns: 40`
- `<Role>`: Root cause analysis, stack trace interpretation, regression isolation, data flow tracing, build/compilation error resolution. Not responsible for architecture (pattern-analyzer), verification governance, test writing (test-writer), refactoring, feature implementation.
- `<Why_This_Matters>`: Adapted from OMC — "Fixing symptoms instead of root causes creates whack-a-mole debugging cycles. A red build blocks the entire team. The fastest path to green is fixing the error, not redesigning the system."
- `<Success_Criteria>`: Root cause identified (not symptom), reproduction steps documented, fix is minimal (<5% of affected file for build fixes), similar patterns checked elsewhere, all findings cite file:line, build exits 0 (for build errors), no new errors introduced.
- `<Constraints>`: Reproduce BEFORE investigating. Read error messages completely. One hypothesis at a time. 3-failure circuit breaker: escalate to pattern-analyzer. Fix with minimal diff. Detect language from manifest files. Track build errors: "X/Y errors fixed". For multi-step reasoning, use sequential-thinking skill.
- `<Investigation_Protocol>`: TWO protocols:
  - **Runtime Bug**: 1) REPRODUCE, 2) GATHER EVIDENCE (parallel: error+stack, git log/blame, working examples, actual code), 3) HYPOTHESIZE (compare broken vs working, trace data flow, document before investigating, identify proof/disproof test), 4) FIX (one change, predict test, check same pattern elsewhere), 5) CIRCUIT BREAKER (3 failures: question if bug is elsewhere, escalate).
  - **Build Error**: 1) Detect project type from manifests, 2) Collect ALL errors (full output), 3) Categorize: type inference, missing definitions, import/export, dependency, config, 4) Fix each with minimal change, 5) Verify after each fix, 6) Final full build verification, 7) Track "X/Y errors fixed".
- `<Tool_Usage>`: Grep for error messages/patterns, Read for suspected files, Bash with git blame/log, Edit for minimal fixes, Bash for builds. Execute evidence-gathering in parallel.
- `<Execution_Policy>`: Default effort: medium (systematic). Stop when: root cause identified with evidence and fix verified. For build errors: stop when build exits 0. Escalate after 3 failed hypotheses.
- `<Output_Format>`: Bug Report template (Symptom, Root Cause at file:line, Reproduction, Fix, Verification, Similar Issues, References) + Build Error Resolution template (Initial Errors, Errors Fixed, Build Status, per-error breakdown, Verification).
- `<Failure_Modes_To_Avoid>`: Symptom fixing (null checks instead of "why null?"), skipping reproduction, stack trace skimming, hypothesis stacking, infinite loop (same approach), speculation ("probably a race condition" without evidence), refactoring while fixing, architecture changes during bugfix, incomplete verification, over-fixing (extensive guards when one annotation suffices), wrong language tooling.
- PUA escalation in Constraints: 2nd failure: fundamentally different approach. 3rd: complete error search + source reading + 3 hypotheses. 4th: 7-point checklist.
- `<Examples>`: Good — OMC's example (TypeError trace to deleted user with session window). Bad — "There's a null pointer error somewhere. Try adding null checks." Good build fix — single type annotation, 1 line, PASSING. Bad build fix — refactored entire module, 150 lines.
- `<Final_Checklist>`: Reproduced before investigating? Full error message read? Root cause (not symptom)? Minimal fix? Same pattern elsewhere? file:line citations? Build exits 0 (build errors)? Minimum lines changed? No refactoring/renaming? All errors fixed?

- [ ] **Step 3: Verify**

```bash
head -5 agents/claude-code/agents/debugger.md  # model: sonnet
grep -c 'Failure_Modes' agents/claude-code/agents/debugger.md  # Should have the section
grep 'Build.*Error\|Build/Compilation' agents/claude-code/agents/debugger.md  # Should have build error protocol
wc -l agents/claude-code/agents/debugger.md  # Should be ~140-160 lines
```

- [ ] **Step 4: Commit**

```bash
git add agents/claude-code/agents/debugger.md
git commit -m "refactor: rewrite debugger agent with OMC structure, absorb build-error-resolver

- Dual investigation protocol: Runtime Bugs + Build/Compilation Errors
- Added: Success_Criteria, Constraints, Failure_Modes, Final_Checklist
- Formalized PUA escalation triggers (2nd/3rd/4th failure)
- Absorbed build-error-resolver capabilities (error categorization)
- Removed: sequential-thinking boilerplate (single-line reference)"
```

---

### Task 3: Rewrite code-reviewer agent

**Files:**
- Rewrite: `agents/claude-code/agents/code-reviewer.md`
- Reference: `/tmp/oh-my-claudecode/agents/code-reviewer.md`

- [ ] **Step 1: Read both source files**
- [ ] **Step 2: Write the new code-reviewer agent**

Frontmatter: `model: sonnet`, `tools: Read, Grep, Glob, Bash`, `maxTurns: 30`. Key additions: pattern conformance as FIRST check (load codebase-patterns.md), severity levels (Critical/Warning/Info), rebuttal round protocol (when invoked in review pipeline: produce findings, defend against critic challenges, surviving findings are higher confidence), READ-ONLY (suggest but don't implement). Output format: Pattern Conformance section + Findings by severity with file:line + Evidence. Failure modes: style nitpicking unrelated code, false positive security findings (leave to security-auditor), suggesting rewrites not targeted fixes, reviewing unread code, missing pattern violations.

- [ ] **Step 3: Verify** — Check model:sonnet, XML tags present, rebuttal protocol mentioned
- [ ] **Step 4: Commit** — `refactor: rewrite code-reviewer agent with OMC structure, add rebuttal rounds`

---

### Task 4: Rewrite security-auditor agent

**Files:**
- Rewrite: `agents/claude-code/agents/security-auditor.md`
- Reference: `/tmp/oh-my-claudecode/agents/security-reviewer.md`

- [ ] **Step 1: Read both source files**
- [ ] **Step 2: Write the new security-auditor agent**

Frontmatter: `model: opus` (upgraded from sonnet), `tools: Read, Grep, Glob, Bash`, `maxTurns: 30`. Key additions: evidence hierarchy (confirmed > likely > suspicious > informational), 5-step investigation protocol (dependency audit, secret scan, input validation tracing, auth/authz verification, data exposure check), OWASP top 10 as minimum checklist. Output format: Confirmed Vulnerabilities (SEV-CRITICAL with attack vector), Likely (SEV-HIGH with code path), Suspicious (SEV-MEDIUM with heuristic), Dependency CVEs, Secret Scan result. Failure modes: false positive flood, missing real vulns because focused on style, not checking dependencies, reporting without attack vectors.

- [ ] **Step 3: Verify** — Check model:opus, evidence hierarchy in output format
- [ ] **Step 4: Commit** — `refactor: rewrite security-auditor agent with OMC structure, upgrade to opus`

---

### Task 5: Rewrite test-writer agent

**Files:**
- Rewrite: `agents/claude-code/agents/test-writer.md`
- Reference: `/tmp/oh-my-claudecode/agents/test-engineer.md`

- [ ] **Step 1: Read both source files**
- [ ] **Step 2: Write the new test-writer agent**

Frontmatter: `model: sonnet`, `tools: Read, Write, Edit, Bash, Grep, Glob`, `maxTurns: 30`. Key additions: test strategy classification (unit/integration/e2e), framework auto-detection from manifests, TDD protocol (write test FIRST, watch fail, hand off to implementation), Arrange-Act-Assert, descriptive names (should [expected] when [condition]), coverage gap analysis. Output format: Tests Written (Strategy, Framework, Files with test counts, Coverage Gaps, Verification). Failure modes: testing implementation details, tests that pass immediately (never red), testing obvious getters, one-time test utilities, modifying production code to make tests easier.

- [ ] **Step 3: Verify** — Check model:sonnet, TDD protocol present, framework detection
- [ ] **Step 4: Commit** — `refactor: rewrite test-writer agent with OMC structure, add TDD protocol`

---

### Task 6: Wrap pattern-analyzer in XML template

**Files:**
- Modify: `agents/claude-code/agents/pattern-analyzer.md`

- [ ] **Step 1: Read current pattern-analyzer**

This agent is already well-structured at 153 lines. Only needs XML wrapping + model upgrade + a few additions.

- [ ] **Step 2: Modify pattern-analyzer**

Changes:
- Frontmatter: `model: opus` (upgraded from sonnet)
- Wrap existing content in `<Agent_Prompt>` with XML sections
- Add `<Role>`, `<Why_This_Matters>`, `<Success_Criteria>`, `<Failure_Modes_To_Avoid>`, `<Final_Checklist>`, `<Examples>`
- Keep ALL existing extraction methodology, 12 pattern categories, deviation protocol, freshness rules — just reorganize into XML sections
- Remove sequential-thinking boilerplate, add single-line reference in Constraints

- [ ] **Step 3: Verify** — Check model:opus, XML tags present, all 12 pattern categories preserved
- [ ] **Step 4: Commit** — `refactor: wrap pattern-analyzer in OMC XML template, upgrade to opus`

---

### Task 7: Rewrite pua-enforcer agent

**Files:**
- Rewrite: `agents/claude-code/agents/pua-enforcer.md`

- [ ] **Step 1: Read current pua-enforcer**
- [ ] **Step 2: Write the new pua-enforcer agent**

Frontmatter: `model: opus` (upgraded from sonnet), `tools: Read, Grep, Glob, Bash`, `maxTurns: 20`. Key additions:
- Proactivity detection table (Passive 3.25 vs Proactive 3.75 behaviors): waits vs investigates, reports problems vs reports with solutions, 1-2 approaches vs exhausts all, asks what to do vs proposes 3 options, claims done without evidence vs provides verification, blames environment vs verifies with tools.
- Failure mode auto-selection: spinning wheels -> force different approach, giving up -> 7-point checklist, passive waiting -> autonomous investigation mandate, garbage quality -> reset + slower approach, guessing -> evidence requirement.
- Keep: PUA methodology (our differentiator), 7-point checklist, 5-step methodology, anti-rationalization table from existing agent.

- [ ] **Step 3: Verify** — Check model:opus, proactivity table present, failure mode auto-selection
- [ ] **Step 4: Commit** — `refactor: rewrite pua-enforcer with OMC structure, upgrade to opus, add proactivity detection`

---

### Task 8: Rewrite memory-observer agent

**Files:**
- Rewrite: `agents/claude-code/agents/memory-observer.md`

- [ ] **Step 1: Read current memory-observer**
- [ ] **Step 2: Write the new memory-observer agent**

Frontmatter: `model: haiku` (downgraded from sonnet), `tools: Read, Grep, Glob, Bash`, `maxTurns: 15`. Key additions: 3-layer search protocol (search 50-100 tokens/result -> timeline for chronological context -> get_observations for full details only on relevant IDs), structured output (Relevant Memories table: Source, Topic, Relevance, Key Point + Recommendations). Failure modes: returning everything (noise), deciding based on stale memory, blocking on unavailable memory systems (graceful degradation required).

- [ ] **Step 3: Verify** — Check model:haiku, 3-layer search protocol, graceful degradation
- [ ] **Step 4: Commit** — `refactor: rewrite memory-observer with OMC structure, downgrade to haiku`

---

## Phase 2: Remove build-error-resolver (1 task)

### Task 9: Delete build-error-resolver and update references

**Files:**
- Delete: `agents/claude-code/agents/build-error-resolver.md`
- Modify: `universal/rules/orchestration.md` (line ~267)
- Modify: `universal/commands/pua-en.md` (line ~58)
- Modify: `.claude/CLAUDE.md` (line ~144)
- Modify: `.claude/rules/project-intel.md` (lines ~29, ~196)

- [ ] **Step 1: Delete build-error-resolver**

```bash
rm agents/claude-code/agents/build-error-resolver.md
```

- [ ] **Step 2: Update orchestration.md**

Change line ~267 from:
```
1. Spawn `build-error-resolver` agent first
```
To:
```
1. Spawn `debugger` agent first (handles both runtime bugs and build errors)
```

- [ ] **Step 3: Update pua-en.md**

Change line ~58 from:
```
| **build-error-resolver** | Build/compile failures | Spawn agent: categorizes and resolves systematically |
```
To:
```
| **debugger** | Build/compile failures | Spawn agent: dual protocol for runtime bugs + build errors |
```

- [ ] **Step 4: Update .claude/CLAUDE.md**

Change the build-error-resolver line (~144) to:
```
- **Build-Error-Resolver** (merged into `debugger` agent) — build error categorization now handled by debugger's dual investigation protocol.
```

- [ ] **Step 5: Update .claude/rules/project-intel.md**

Update line ~29 to remove "build-error-resolver" from the community plugins line.
Update line ~196 to note the merge:
```
- **Build-Error-Resolver** (merged into debugger agent): Build error categorization (dependency/type/import/config/bundler) now handled by debugger's dual investigation protocol.
```

- [ ] **Step 6: Verify no remaining references**

```bash
grep -r "build-error-resolver" agents/ universal/ .claude/ --include="*.md" --include="*.sh" | grep -v "docs/superpowers" | grep -v "node_modules"
```
Expected: No matches outside of docs/superpowers/ (historical specs/plans).

- [ ] **Step 7: Commit**

```bash
git add -A agents/claude-code/agents/build-error-resolver.md universal/rules/orchestration.md universal/commands/pua-en.md .claude/CLAUDE.md .claude/rules/project-intel.md
git commit -m "refactor: remove build-error-resolver, merge into debugger

Build error resolution is now handled by debugger's dual investigation
protocol (Runtime Bugs + Build/Compilation Errors). Updated all
references in orchestration.md, pua-en.md, CLAUDE.md, project-intel.md."
```

---

## Phase 3: New Skills (5 tasks, parallelizable)

All skills go in `universal/skills/{name}/SKILL.md`. The adapter.sh skill install loop (line 93-107) already handles copying `universal/skills/*/` to `~/.claude/skills/` — no install.sh changes needed for skills.

Each skill MUST be adapted from the OMC source to use our infrastructure:
- State files: `.claude/scratch/` (not `.omc/`)
- Agent references: our agent names (explorer, debugger, code-reviewer, etc.)
- Execution bridges: our commands (/build, /review, /debug) not OMC modes
- No OMC MCP tools (state_write, state_read) — use Write tool + .claude/scratch/

### Task 10: Create deep-interview skill

**Files:**
- Create: `universal/skills/deep-interview/SKILL.md`
- Reference: `/tmp/oh-my-claudecode/skills/deep-interview/SKILL.md`

- [ ] **Step 1: Read OMC deep-interview**

```bash
cat /tmp/oh-my-claudecode/skills/deep-interview/SKILL.md
```

- [ ] **Step 2: Write our deep-interview skill**

Create `universal/skills/deep-interview/SKILL.md`. Adapt from OMC's 650-line version (~400 lines target):

Frontmatter: `name: deep-interview`, `description: Socratic deep interview with mathematical ambiguity gating before implementation`

Keep from OMC:
- `<Purpose>`, `<Use_When>`, `<Do_Not_Use_When>`, `<Why_This_Exists>`
- `<Execution_Policy>`: one question at a time, target weakest dimension, gather codebase facts via explorer agent BEFORE asking user, score after every answer, threshold gate (default 0.2)
- Phase 1 (Initialize): Parse idea, detect brownfield/greenfield, explore with our `explorer` agent (haiku), initialize state, announce interview
- Phase 2 (Interview Loop): Generate question targeting weakest dimension, ask via text, score ambiguity with weighted dimensions (Goal 40%, Constraints 30%, Criteria 30% for greenfield; Goal 35%, Constraints 25%, Criteria 25%, Context 15% for brownfield), calculate ontology stability, report progress, update state, check soft limits
- Phase 3 (Challenge Agents): Contrarian (round 4+), Simplifier (round 6+), Ontologist (round 8+ if ambiguity > 0.3)
- Phase 4 (Crystallize Spec): Generate spec with clarity breakdown, goal, constraints, non-goals, acceptance criteria, assumptions table, ontology, transcript
- `<Examples>` (good and bad)
- `<Escalation_And_Stop_Conditions>`
- `<Final_Checklist>`
- `<Advanced>` section with configuration, resume, ambiguity interpretation table

Change from OMC:
- State: `.claude/scratch/deep-interview-state.json` (not `.omc/state/`)
- Spec output: `docs/specs/deep-interview-{slug}.md` (not `.omc/specs/`)
- Explorer agent: our explorer (haiku) not OMC's explore
- Scoring model: opus if available, sonnet as fallback
- Phase 5 (Execution Bridge): Options are `/build` (recommended), `/consensus-planning`, direct implementation (not OMC autopilot/ralph/team)
- Remove: Autoresearch mode, OMC state_write/state_read, OMC pipeline references

- [ ] **Step 3: Verify**

```bash
wc -l universal/skills/deep-interview/SKILL.md  # ~350-450 lines
grep 'ambiguity' universal/skills/deep-interview/SKILL.md | head -5  # Should reference scoring
grep -c 'omc\|\.omc\|ralph\|autopilot' universal/skills/deep-interview/SKILL.md  # Should be 0
grep 'claude/scratch' universal/skills/deep-interview/SKILL.md  # Should reference our state dir
```

- [ ] **Step 4: Commit**

```bash
git add universal/skills/deep-interview/
git commit -m "feat: add deep-interview skill — Socratic requirements with ambiguity scoring

Adapted from oh-my-claudecode. Mathematical ambiguity gating (default 20%),
weighted dimension scoring, challenge agents (Contrarian/Simplifier/Ontologist),
ontology convergence tracking. Uses our explorer agent and .claude/scratch/ state."
```

---

### Task 11: Create ai-slop-cleaner skill

**Files:**
- Create: `universal/skills/ai-slop-cleaner/SKILL.md`
- Reference: `/tmp/oh-my-claudecode/skills/ai-slop-cleaner/SKILL.md`

- [ ] **Step 1: Read OMC ai-slop-cleaner**
- [ ] **Step 2: Write our ai-slop-cleaner skill**

Create `universal/skills/ai-slop-cleaner/SKILL.md` (~150 lines). This skill is mostly self-contained — minimal adaptation needed.

Frontmatter: `name: ai-slop-cleaner`, `description: Regression-safe cleanup of AI-generated code with deletion-first workflow`

Keep from OMC (nearly verbatim): Execution posture, 5-smell classification (duplication, dead code, needless abstraction, boundary violations, missing tests), 4-pass workflow (dead code deletion, duplicate removal, naming/error cleanup, test reinforcement), scoped file-list usage, writer/reviewer separation (--review flag), evidence-dense close report, When to Use / When Not to Use.

Change: Remove Ralph integration references. Add: "Use our `code-reviewer` agent for the reviewer pass" and "Use our `test-writer` agent for regression test generation". Add: "Check `codebase-patterns.md` for existing patterns before consolidating."

- [ ] **Step 3: Verify** — Check no OMC references, ~150 lines, 5 smell types listed
- [ ] **Step 4: Commit** — `feat: add ai-slop-cleaner skill — regression-safe code cleanup`

---

### Task 12: Create consensus-planning skill

**Files:**
- Create: `universal/skills/consensus-planning/SKILL.md`
- Reference: `/tmp/oh-my-claudecode/skills/ralplan/SKILL.md`

- [ ] **Step 1: Read OMC ralplan**
- [ ] **Step 2: Write our consensus-planning skill**

Create `universal/skills/consensus-planning/SKILL.md` (~200 lines).

Frontmatter: `name: consensus-planning`, `description: Multi-perspective plan validation via Planner/Architect/Critic consensus loop`

Structure:
- Purpose, Use When, Do Not Use When
- Consensus workflow: 1) Planner (explorer agent gathers context + creates plan with RALPLAN-DR summary: Principles, Decision Drivers, Viable Options), 2) Architect (pattern-analyzer agent reviews for soundness, provides steelman antithesis), 3) Critic (code-reviewer in critic mode evaluates quality/testability), 4) Re-review loop (max 5 iterations on non-APPROVE), 5) Output final plan with ADR
- IMPORTANT: Architect MUST complete before Critic starts (sequential, not parallel)
- Vagueness gate: check for concrete anchors (file paths, function names, issue numbers, acceptance criteria, numbered steps, code blocks, error references). No anchors + <=15 words = redirect here from /build. Bypass with `force:` prefix.
- Concrete signal detection table (from OMC ralplan)
- Deliberate mode for high-risk work (auth/security, migrations, destructive changes, production incidents): adds pre-mortem (3 scenarios) + expanded test planning
- State: `.claude/scratch/consensus-plan.json`
- Output: `docs/specs/consensus-plan-{slug}.md` with ADR
- Execution bridge: `/build` command
- Good vs Bad prompts examples (from OMC)

- [ ] **Step 3: Verify** — Check no OMC references, ~200 lines, vagueness gate present, sequential Architect->Critic
- [ ] **Step 4: Commit** — `feat: add consensus-planning skill — Planner/Architect/Critic loop`

---

### Task 13: Create trace skill

**Files:**
- Create: `universal/skills/trace/SKILL.md`
- Reference: `/tmp/oh-my-claudecode/agents/tracer.md`

- [ ] **Step 1: Read OMC tracer agent**

```bash
cat /tmp/oh-my-claudecode/agents/tracer.md
```

- [ ] **Step 2: Write our trace skill**

Create `universal/skills/trace/SKILL.md` (~250 lines).

Frontmatter: `name: trace`, `description: Multi-hypothesis evidence-ranked debugging for complex and ambiguous bugs`

Structure:
- Purpose: When standard debugging fails (2+ hypotheses failed), use structured multi-hypothesis approach with evidence ranking and rebuttal rounds.
- Use When: Complex/ambiguous bugs, auto-escalation from /debug after 2 failed hypotheses, PUA L2+ escalation, bugs spanning 3+ files, intermittent/race conditions.
- Do Not Use When: Obvious bugs (typo, missing import), build errors (debugger handles), simple test failures.
- Workflow:
  1) Generate 3+ hypotheses based on available evidence
  2) Rank by initial plausibility
  3) For each hypothesis: gather evidence, classify by strength tier
  4) Evidence strength hierarchy (6 tiers): Controlled reproduction (strongest), Direct observation (logs/debugger), Correlation (timing/pattern), Absence of alternatives (eliminated others), Expert heuristic (known pattern), Intuition/analogy (weakest, must verify)
  5) Rebuttal round: for leading hypothesis, generate strongest counter-argument. Hypothesis survives only if rebuttal addressed.
  6) Convergence detection: 3+ evidence items at tier 1-3 pointing same direction = convergence
  7) Falsification: actively try to DISPROVE leading hypothesis before accepting
  8) Result: confirmed root cause with full evidence chain + minimal fix recommendation
- State: `.claude/scratch/trace-state.json`
- Uses our `debugger` agent for executing investigation steps
- PUA integration: trace activates at PUA L2+ (after 2+ failures)
- Output format: Trace Report with Hypotheses (ranked), Evidence tiers, Rebuttal/response, Convergence status, Root Cause, Fix recommendation
- Examples: Good (multi-hypothesis with evidence ranking, rebuttal survived), Bad (single guess without evidence)
- Final Checklist

- [ ] **Step 3: Verify** — Check 6-tier evidence hierarchy, rebuttal rounds, convergence detection, ~250 lines
- [ ] **Step 4: Commit** — `feat: add trace skill — multi-hypothesis evidence-ranked debugging`

---

### Task 14: Create learner skill

**Files:**
- Create: `universal/skills/learner/SKILL.md`
- Reference: `/tmp/oh-my-claudecode/skills/learner/SKILL.md`

- [ ] **Step 1: Read OMC learner**

```bash
cat /tmp/oh-my-claudecode/skills/learner/SKILL.md
```

- [ ] **Step 2: Write our learner skill**

Create `universal/skills/learner/SKILL.md` (~150 lines).

Frontmatter: `name: learner`, `description: Extract reusable patterns from sessions with strict quality gates`

Structure:
- Purpose: After a development session, extract patterns worth persisting to memory.
- Use When: /learn command, session end (suggested), after resolving a complex bug, after discovering non-obvious codebase behavior.
- Do Not Use When: Nothing surprising happened, all work followed known patterns.
- Quality gates (ALL must pass):
  1) Non-Googleable: specific to this codebase/setup, not general knowledge
  2) Context-specific: useful in a FUTURE session on this project
  3) Hard-won: learned through failure, not just observation
  4) Evidence-based: can point to specific commit/error/decision
  5) Not already captured: check existing memories before saving
- Extraction categories: Gotcha (non-obvious failure cause), Pattern (code convention not in codebase-patterns.md), Decision (architectural choice with rationale), Preference (user preference about how to work)
- Workflow:
  1) Scan conversation for learnings (errors resolved, patterns discovered, decisions made, user corrections)
  2) For each candidate, run through 5 quality gates
  3) Route passing items: memory -> MEMORY.md + claude-mem, pattern -> codebase-patterns.md update proposal, gotcha -> project-intel.md update proposal
  4) Report: Worth Saving (passed gates, with target) + Filtered (failed gates, with reason)
- Output format: Session Learnings with Worth Saving and Filtered sections
- Final Checklist

- [ ] **Step 3: Verify** — Check 5 quality gates, 4 extraction categories, routing to our memory systems
- [ ] **Step 4: Commit** — `feat: add learner skill — pattern extraction with quality gates`

---

## Phase 4: Command Upgrades (3 tasks, parallelizable)

### Task 15: Upgrade build command

**Files:**
- Modify: `universal/commands/build.md`

- [ ] **Step 1: Read current build.md** (already read during planning)

- [ ] **Step 2: Add Phase 0.5 — Vagueness Gate**

Insert after Phase 0 (Load Intel) and before Phase 1 (Explore). Add:

```markdown
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
- Show which anchor types would help
- Redirect to `/deep-interview` (if extremely vague — no nouns related to code) or `/consensus-planning` (if moderately vague — has concept but no specifics)
- User can bypass with `force:` prefix at the start of their request

**If `$ARGUMENTS` starts with `force:`**: Strip the prefix and skip this gate entirely.
```

- [ ] **Step 3: Add Phase 3.5 — Deslop Pass**

Insert after Phase 3 (Implement) and before Phase 4 (Review). Add:

```markdown
### 3.5. Deslop Pass (auto — skip for trivial changes)

After implementation, before review, run a bounded cleanup pass on changed files:

1. Get changed files: `git diff --name-only`
2. If fewer than 30 lines changed total: skip this phase (trivial change, not worth the overhead)
3. Run the `ai-slop-cleaner` skill scoped to ONLY the changed files:
   - Dead code deletion (unused imports, unreachable branches)
   - Duplicate removal (copy-paste from implementation)
   - Naming cleanup (AI-generated generic names)
4. Re-run build/test verification after cleanup
5. Report: "Deslop: {N} cleanups applied to {M} files" or "Deslop: skipped (trivial change)"

This phase is bounded — it ONLY touches files changed in this build, never expands scope.
```

- [ ] **Step 4: Add Rebuttal Round to Phase 4**

In Phase 4 (Review), after the existing review agents paragraph, add:

```markdown
**Rebuttal round** (after review agents return):
- Collect all Critical and High-severity findings from all review agents
- For each Critical finding: generate the strongest counter-argument ("Why might this NOT be a problem?")
- Finding survives only if the original evidence withstands the counter-argument
- Report: "Rebuttal: {X}/{Y} critical findings survived challenge"
- This reduces false positives and increases confidence in real issues
```

- [ ] **Step 5: Verify**

```bash
grep -c 'Vagueness Gate\|Deslop Pass\|Rebuttal' universal/commands/build.md  # Should be 3+
grep 'force:' universal/commands/build.md  # Should reference bypass
grep 'ai-slop-cleaner' universal/commands/build.md  # Should reference the skill
```

- [ ] **Step 6: Commit**

```bash
git add universal/commands/build.md
git commit -m "feat: upgrade build command — vagueness gate, deslop pass, rebuttal rounds

- Phase 0.5: Vagueness gate redirects unanchored requests to /deep-interview or /consensus-planning
- Phase 3.5: Bounded ai-slop-cleaner pass on changed files
- Phase 4: Rebuttal round challenges Critical findings to reduce false positives"
```

---

### Task 16: Upgrade review command

**Files:**
- Modify: `universal/commands/review.md`

- [ ] **Step 1: Read current review.md** (already read during planning)

- [ ] **Step 2: Add Agent 0 — Pattern Conformance**

Insert before "## Review Agents (launch in parallel)":

```markdown
### Agent 0: Pattern Conformance (runs first, before parallel agents)

Check if `.claude/rules/codebase-patterns.md` exists:
- **YES**: Read it. Include relevant sections in every review agent's context below. Pattern conformance violations are reported in a separate section from bugs/security — they are Warnings, not Critical.
- **NO**: Skip this step. Note in output: "Pattern conformance: skipped (no codebase-patterns.md)"
```

- [ ] **Step 3: Add Rebuttal Protocol to Synthesis Phase**

Replace the current Synthesis Phase with an upgraded version that adds:

```markdown
**Rebuttal protocol** (after sequential-thinking synthesis):
- For each Critical finding in the synthesized list:
  - Generate: "Why might this NOT be a problem?" with evidence
  - The original finding survives only if the reviewer can defend it with additional evidence
  - Withdrawn findings are logged: "Withdrawn: {finding} — Reason: {rebuttal}"
- This step is mandatory for reviews with 4+ Critical findings. Skip for reviews with fewer.

**Evidence hierarchy tags** — tag each surviving finding:
- **Confirmed**: Reproduced or demonstrated with a test/command
- **Analysis**: Code path analysis shows the issue
- **Pattern**: Heuristic pattern match (common vulnerability/bug pattern)
- **Informational**: Suggestion based on best practices, not concrete evidence
```

- [ ] **Step 4: Update Output Format**

Add to the output format after "### Critical Issues":
```
- [file:line] Description — Impact — Fix — Evidence: {confirmed|analysis|pattern|informational}
```

Add new section:
```
### Pattern Conformance
- {PASS|FAIL}: {N deviations found}
- [file:line] Deviation from {pattern section} — {description}
```

- [ ] **Step 5: Verify**

```bash
grep 'Pattern Conformance\|Rebuttal\|Evidence.*hierarchy\|confirmed|analysis|pattern|informational' universal/commands/review.md | wc -l  # Should be 4+
```

- [ ] **Step 6: Commit**

```bash
git add universal/commands/review.md
git commit -m "feat: upgrade review command — pattern conformance, rebuttal rounds, evidence hierarchy

- Agent 0: Pattern conformance check before parallel review agents
- Rebuttal protocol: Critical findings must survive counter-arguments
- Evidence hierarchy tags: confirmed > analysis > pattern > informational"
```

---

### Task 17: Upgrade debug command

**Files:**
- Modify: `universal/commands/debug.md`

- [ ] **Step 1: Read current debug.md** (already read during planning)

- [ ] **Step 2: Add trace escalation to Phase 2**

In Phase 2 (Diagnose), after the sequential-thinking block, add:

```markdown
**Auto-escalation to trace skill** (after 2 failed hypotheses):
If sequential-thinking produces 2 hypotheses that are disproven by evidence:
1. Print: "Standard debugging failed after 2 hypotheses. Escalating to multi-hypothesis trace."
2. Pass current investigation context (evidence gathered, hypotheses tried, what disproved them) to the `/trace` skill
3. The trace skill takes over with: 3+ parallel hypotheses, 6-tier evidence ranking, rebuttal rounds, convergence detection
4. Trace results feed back into Phase 3 (Fix) with a confirmed root cause

This replaces spinning on more sequential hypotheses — the trace skill is designed for ambiguous bugs.
```

- [ ] **Step 3: Formalize PUA escalation in Phase 3**

In Phase 3 (Fix), replace the vague PUA reference with explicit triggers:

```markdown
**PUA escalation triggers** (formalized):
- **2 failed fix attempts**: Invoke `/trace` skill if not already active (multi-hypothesis evidence-ranked debugging)
- **3 failed fix attempts**: Mandatory 7-point checklist (read signals word by word, search the core problem, read 50 lines of context, verify all assumptions with tools, try opposite hypothesis, isolate/reproduce in minimal scope, switch tools/methods/angles)
- **4 failed fix attempts**: Fundamentally different approach required — different tools, different angle, different abstraction level. If still stuck, provide structured failure report (verified facts, eliminated possibilities, narrowed scope, recommended next directions).
```

- [ ] **Step 4: Verify**

```bash
grep 'trace\|escalat' universal/commands/debug.md | head -5  # Should reference trace skill
grep '7-point\|checklist' universal/commands/debug.md  # Should have formalized PUA
```

- [ ] **Step 5: Commit**

```bash
git add universal/commands/debug.md
git commit -m "feat: upgrade debug command — trace escalation, formalized PUA triggers

- Auto-escalation to /trace skill after 2 failed hypotheses
- PUA triggers formalized: 2 failures -> trace, 3 -> 7-point checklist, 4 -> different approach"
```

---

## Phase 5: Install/Adapter + Project Docs (1 task)

### Task 18: Update install.sh, adapter.sh, and project documentation

**Files:**
- Modify: `install.sh` (~line 378-394, agent copy loop)
- Modify: `agents/claude-code/adapter.sh` (skill install loop already handles new skills)
- Modify: `.claude/CLAUDE.md` (add new skills to the list)
- Modify: `.claude/rules/project-intel.md` (add skills to Quick Reference)

- [ ] **Step 1: Update install.sh — add skills to the update_agents function**

In the `update_agents()` function, after the native agents copy loop (line ~394) and before the plugin sync (line ~396), add a skills copy loop:

```bash
    # Always update skills (these are ours, not user-modified)
    local skills_src="$SCRIPT_DIR/universal/skills"
    if [ -d "$skills_src" ]; then
      mkdir -p "$HOME/.claude/skills"
      local skills_updated=0
      for skill_dir in "$skills_src"/*/; do
        [ -d "$skill_dir" ] || continue
        local skill_name
        skill_name="$(basename "$skill_dir")"
        mkdir -p "$HOME/.claude/skills/$skill_name"
        for f in "$skill_dir"*.md "$skill_dir"scripts/*.ts; do
          [ -f "$f" ] || continue
          local rel_path="${f#$skill_dir}"
          mkdir -p "$HOME/.claude/skills/$skill_name/$(dirname "$rel_path")"
          if $DRY_RUN; then
            info "[DRY RUN] Would update: skills/$skill_name/$rel_path"
          else
            cp "$f" "$HOME/.claude/skills/$skill_name/$rel_path"
          fi
        done
        skills_updated=$((skills_updated + 1))
      done
      ok "Skills: $skills_updated installed"
    fi
```

- [ ] **Step 2: Verify install.sh still handles build-error-resolver removal**

The native agents copy loop copies ALL .md files from `agents/claude-code/agents/`. Since build-error-resolver.md was deleted in Task 9, it won't be copied. But we need to clean up the installed copy:

Add to the agent copy loop (after copying all agents), similar to the rules cleanup:
```bash
      # Clean up agents removed from source
      for installed in "$HOME/.claude/agents"/*.md; do
        [ -f "$installed" ] || continue
        local iname
        iname=$(basename "$installed")
        if [ ! -f "$native_agents_src/$iname" ]; then
          if $DRY_RUN; then
            info "[DRY RUN] Would remove obsolete agent: $iname"
          else
            rm -f "$installed"
            info "Removed obsolete agent: $iname"
          fi
        fi
      done
```

- [ ] **Step 3: Update .claude/CLAUDE.md — add new skills**

In the Skills section of CLAUDE.md, update to include all 7 skills:
```
Skills: `pua` (persistence engine), `sequential-thinking` (structured reasoning), `deep-interview` (Socratic requirements with ambiguity scoring), `ai-slop-cleaner` (regression-safe code cleanup), `consensus-planning` (Planner/Architect/Critic loop), `trace` (multi-hypothesis evidence-ranked debugging), `learner` (pattern extraction with quality gates)
```

- [ ] **Step 4: Update .claude/rules/project-intel.md — add to Quick Reference**

In the Quick Reference section, update the counts and add skills:
```
- **7** skills (pua, sequential-thinking, deep-interview, ai-slop-cleaner, consensus-planning, trace, learner)
```

- [ ] **Step 5: Run tests**

```bash
make test
make lint
```
Expected: All tests pass, no shellcheck errors.

- [ ] **Step 6: Commit**

```bash
git add install.sh .claude/CLAUDE.md .claude/rules/project-intel.md
git commit -m "chore: update install.sh for new skills, clean up removed agents, update docs

- install.sh: add skills copy loop to update_agents(), add obsolete agent cleanup
- CLAUDE.md: add 5 new skills to project description
- project-intel.md: update Quick Reference skill count"
```

---

## Phase 6: Final Verification (1 task)

### Task 19: End-to-end verification

- [ ] **Step 1: Verify all agents have XML structure**

```bash
for f in agents/claude-code/agents/*.md; do
  name=$(basename "$f" .md)
  tags=$(grep -c '<Agent_Prompt>\|<Role>\|<Success_Criteria>\|<Constraints>\|<Failure_Modes>' "$f")
  model=$(grep 'model:' "$f" | head -1 | awk '{print $2}')
  echo "$name: $tags XML tags, model=$model"
done
```

Expected: All 8 agents have 5+ XML tags. Models: explorer=haiku, memory-observer=haiku, debugger=sonnet, test-writer=sonnet, code-reviewer=sonnet, security-auditor=opus, pattern-analyzer=opus, pua-enforcer=opus.

- [ ] **Step 2: Verify build-error-resolver is gone**

```bash
ls agents/claude-code/agents/build-error-resolver.md 2>&1  # Should not exist
grep -r "build-error-resolver" agents/ universal/ .claude/ --include="*.md" --include="*.sh" | grep -v docs/superpowers | wc -l  # Should be 0
```

- [ ] **Step 3: Verify all 7 skills exist**

```bash
for s in pua sequential-thinking deep-interview ai-slop-cleaner consensus-planning trace learner; do
  if [ -f "universal/skills/$s/SKILL.md" ]; then
    echo "$s: OK ($(wc -l < "universal/skills/$s/SKILL.md") lines)"
  else
    echo "$s: MISSING"
  fi
done
```

Expected: All 7 skills present.

- [ ] **Step 4: Verify command upgrades**

```bash
grep 'Vagueness Gate' universal/commands/build.md && echo "build: vagueness gate OK"
grep 'Deslop' universal/commands/build.md && echo "build: deslop OK"
grep 'Rebuttal' universal/commands/build.md && echo "build: rebuttal OK"
grep 'Pattern Conformance' universal/commands/review.md && echo "review: pattern conformance OK"
grep 'Rebuttal' universal/commands/review.md && echo "review: rebuttal OK"
grep 'trace' universal/commands/debug.md && echo "debug: trace escalation OK"
```

- [ ] **Step 5: Verify no OMC artifacts leaked**

```bash
grep -r '\.omc\|state_write\|state_read\|oh-my-claude\|ralph\b\|autopilot\b' universal/skills/ agents/claude-code/agents/ --include="*.md" | grep -v 'docs/superpowers' | wc -l  # Should be 0
```

- [ ] **Step 6: Run project tests**

```bash
make test && echo "TESTS PASS" || echo "TESTS FAIL"
make lint && echo "LINT PASS" || echo "LINT FAIL"
```

- [ ] **Step 7: Final commit if any fixes needed**

If any verification steps found issues and fixes were applied:
```bash
git add -A
git commit -m "fix: verification fixes for OMC quality uplift"
```

- [ ] **Step 8: Summary report**

Print:
```
## OMC Quality Uplift Complete

### Agents (8 rewritten, 1 removed)
- explorer (haiku), debugger (sonnet), code-reviewer (sonnet)
- security-auditor (opus), test-writer (sonnet), pattern-analyzer (opus)
- pua-enforcer (opus), memory-observer (haiku)
- build-error-resolver: REMOVED (merged into debugger)

### Skills (5 new)
- deep-interview, ai-slop-cleaner, consensus-planning, trace, learner

### Commands (3 upgraded)
- /build: vagueness gate + deslop pass + rebuttal rounds
- /review: pattern conformance + rebuttal protocol + evidence hierarchy
- /debug: trace escalation + formalized PUA triggers

### Quality Improvements
- All agents: XML structure, success criteria, failure modes, final checklists
- Model tiers: haiku (read-only) / sonnet (implementation) / opus (deep reasoning)
- Sequential-thinking boilerplate eliminated (96 lines across 6 agents -> single-line reference)
```
