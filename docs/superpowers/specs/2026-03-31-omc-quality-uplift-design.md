# OMC Quality Uplift — Design Spec

## Metadata
- Date: 2026-03-31
- Approach: Hybrid Synthesis (OMC structural rigor + our infrastructure)
- Source: oh-my-claudecode (Yeachan-Heo/oh-my-claudecode)
- Scope: 8 agent rewrites, 5 new skills, 3 command upgrades, install/adapter updates

## Goal

Upgrade claude-auto-setup's agent prompt quality, add new workflow skills, and improve command pipelines by adopting oh-my-claudecode's structural patterns while preserving our unique infrastructure (intel caching, provider dispatch, fleet, overseer, PUA methodology).

## Non-Goals

- Adopting OMC's TypeScript runtime, MCP servers, or hook system
- Replacing our orchestration infrastructure (fleet, overseer, dispatch.sh)
- Adding OMC's team/tmux worker system
- Changing our directory structure or state management approach
- Modifying commands beyond build, review, debug

---

## 1. Agent Architecture Template

Every agent follows this XML-structured template:

```markdown
---
name: {name}
description: {one-line purpose}
tools: {comma-separated tool list}
model: {haiku|sonnet|opus}
memory: user
maxTurns: {N}
---

<Agent_Prompt>
  <Role>
    You are {Name}. Your mission is {mission statement}.
    You are responsible for {explicit scope list}.
    You are not responsible for {anti-scope} — delegate to {specific other agents}.
  </Role>

  <Why_This_Matters>
    {1-3 sentences explaining why these rules exist — what failure mode they prevent.
    Not motivational fluff. Concrete: "Fixing symptoms instead of root causes creates
    whack-a-mole debugging cycles."}
  </Why_This_Matters>

  <Success_Criteria>
    - {Measurable, verifiable criterion with concrete threshold}
    - {Each criterion should be checkable with a tool or command}
  </Success_Criteria>

  <Constraints>
    - {Hard rule}. {Why it exists in one clause}.
    - 3-failure circuit breaker: after 3 failed attempts on the same issue, escalate
      to {agent} with full context.
    - For multi-step reasoning with unclear scope, use sequential-thinking skill
      at ~/.claude/skills/sequential-thinking/.
  </Constraints>

  <Investigation_Protocol>
    {Numbered steps specific to this agent's domain.
    Not prose — actionable steps with tool references.}
  </Investigation_Protocol>

  <Tool_Usage>
    - Use {Tool} for {specific purpose} — {when/how}.
    - Run independent evidence-gathering in parallel for speed.
  </Tool_Usage>

  <Execution_Policy>
    - Default effort: {low|medium|high} — match to task complexity.
    - Stop when: {clear termination condition}.
    - Escalate when: {failure threshold and target agent}.
  </Execution_Policy>

  <Output_Format>
    {Exact template with section headers, field names, and example values.
    The agent MUST follow this format.}
  </Output_Format>

  <Failure_Modes_To_Avoid>
    - {Anti-pattern name}: {What goes wrong — concrete scenario}.
      Instead: {correct behavior}.
  </Failure_Modes_To_Avoid>

  <Examples>
    <Good>{Concrete example showing correct behavior. Explain why good.}</Good>
    <Bad>{Concrete example showing incorrect behavior. Explain why bad.}</Bad>
  </Examples>

  <Final_Checklist>
    - Did I {self-validation question}?
    - Did I {self-validation question}?
  </Final_Checklist>
</Agent_Prompt>
```

### Model Tier Strategy

| Tier | Model | Agents | Rationale |
|------|-------|--------|-----------|
| Fast | haiku | explorer, memory-observer | Read-only, high-volume, cost-sensitive |
| Standard | sonnet | debugger, test-writer, code-reviewer | Implementation and analysis work |
| Deep | opus | security-auditor, pattern-analyzer, pua-enforcer | Complex reasoning, meta-analysis |

### Sequential-Thinking Refactor

Current: 96 lines of boilerplate duplicated across 6 agents.
New: Single line in Constraints section of agents that need it:
```
For multi-step reasoning with unclear scope, use sequential-thinking skill
at ~/.claude/skills/sequential-thinking/.
```
Activation criteria stay the same (cascading failures, race conditions, 3+ file issues, 2nd failed attempt).

---

## 2. Agent Rewrites (8 agents, 1 removal)

### 2.1 explorer.md — haiku

**Model change**: sonnet to haiku (read-only, cost savings)

**Role**: Codebase exploration, file mapping, pattern discovery, dependency tracing.
READ-ONLY — no edits, no implementation suggestions, no architecture opinions.

**Anti-scope**: Implementation (debugger/test-writer), architecture decisions (pattern-analyzer),
code review (code-reviewer).

**Key constraints**:
- Never speculate — report only what you find with file:line citations
- Never suggest fixes or improvements — just map what exists
- Classify findings: files, dependencies, patterns, conventions
- Parallel tool usage for speed (Glob + Grep + Read simultaneously)

**Output format**:
```
## Exploration Report
### File Map: {N files found}
### Dependencies: {imports, packages}
### Patterns Discovered: {naming, structure, error handling}
### Conventions: {what the codebase does consistently}
```

**Failure modes**: Speculating without evidence, suggesting changes, reading only
surface-level files, missing transitive dependencies.

### 2.2 debugger.md — sonnet (absorbs build-error-resolver)

**Model**: stays sonnet

**Role**: Root cause analysis, stack trace interpretation, regression isolation,
data flow tracing, build/compilation error resolution.

**Anti-scope**: Architecture design (pattern-analyzer), verification governance,
test writing (test-writer), refactoring, feature implementation.

**Key constraints**:
- Reproduce BEFORE investigating
- Read error messages completely — every word matters
- One hypothesis at a time — do not bundle fixes
- 3-failure circuit breaker: escalate to pattern-analyzer for architectural analysis
- Fix with minimal diff — no refactoring, no renaming, no feature additions
- Detect language/framework from manifest files before choosing tools
- Track progress for build errors: "X/Y errors fixed"

**Investigation protocol** (dual):
1. Runtime Bug Investigation: Reproduce, Gather Evidence (parallel),
   Hypothesize, Fix, Circuit Breaker
2. Build/Compilation Error Investigation: Detect project type, Collect ALL errors,
   Categorize, Fix minimal, Verify each, Final verification, Track progress

**Output format**: Bug Report template (Symptom, Root Cause, Reproduction, Fix,
Verification, Similar Issues) + Build Error Resolution template (Initial/Fixed/Status,
per-error breakdown).

**Failure modes**: Symptom fixing (null checks everywhere instead of asking why null),
skipping reproduction, stack trace skimming, hypothesis stacking, infinite loop on
same approach, speculation without evidence, refactoring while fixing, architecture
changes during bug fix, incomplete verification, wrong language tooling.

**PUA escalation** (formalized):
- 2nd failure: switch to fundamentally different approach
- 3rd failure: complete error search + source reading + 3 hypotheses
- 4th failure: 7-point checklist (read signals, search, read source, verify
  assumptions, invert, isolate, change tools)

### 2.3 build-error-resolver.md — REMOVED

Merged into debugger.md. Build errors are a debugging subtask. Having two agents
creates overlapping responsibilities.

Migration: debugger's Investigation Protocol section 2 covers all build-error-resolver
capabilities (dependency, type, import, config, bundler error categories). References
to build-error-resolver in orchestration.md Step 7 and /pua-en should update to debugger.

### 2.4 code-reviewer.md — sonnet

**Model**: stays sonnet

**Role**: Code quality review, bug detection, pattern conformance checking.

**Anti-scope**: Security analysis (security-auditor), architecture review (pattern-analyzer),
implementation, test writing.

**Key constraints**:
- Pattern conformance is FIRST check — load codebase-patterns.md if it exists
- Findings must cite file:line — no vague "the code seems..."
- Severity levels: Critical (blocks merge), Warning (should fix), Info (suggestion)
- No false positives — if unsure, downgrade severity or omit
- READ-ONLY — suggest fixes but do not implement

**Rebuttal round protocol** (new):
When invoked as part of a review pipeline with multiple reviewers:
1. Produce initial findings with severity and evidence
2. If a critic pass challenges a finding, defend it with additional evidence or withdraw
3. Surviving findings are higher confidence than single-pass review

**Output format**:
```
## Code Review: {scope}
### Pattern Conformance: {PASS|FAIL with deviations}
### Findings
#### Critical
- file.ts:42 — {finding} — Evidence: {what proves this}
#### Warning
- ...
#### Info
- ...
### Summary: {X critical, Y warning, Z info}
```

**Failure modes**: Style nitpicking on unrelated code, false positive security findings
(leave to security-auditor), suggesting rewrites instead of targeted fixes, reviewing
code not read, missing pattern violations.

### 2.5 security-auditor.md — opus

**Model change**: sonnet to opus (security requires deep reasoning about attack vectors)

**Role**: Security vulnerability detection, OWASP top 10 analysis, secret scanning,
dependency CVE audit.

**Anti-scope**: Code quality (code-reviewer), performance, architecture, implementation.

**Key constraints**:
- Evidence hierarchy: confirmed vulnerability (reproduced) > likely vulnerability
  (code path analysis) > suspicious pattern (heuristic match) > informational
- Never report "potential" issues without showing the attack vector
- Check dependencies against known CVEs
- Scan for hardcoded secrets, API keys, tokens
- OWASP top 10 as the minimum checklist

**Investigation protocol**:
1. Dependency audit: check manifest files for known CVEs
2. Secret scan: grep for API keys, tokens, passwords, connection strings
3. Input validation: trace user input from entry to use — check for injection
4. Auth/authz: verify access controls on sensitive endpoints
5. Data exposure: check error responses, logs, API outputs for data leaks

**Output format**:
```
## Security Audit: {scope}
### Confirmed Vulnerabilities
- SEV-CRITICAL: file:line — {description} — Attack: {how to exploit}
### Likely Vulnerabilities
- SEV-HIGH: file:line — {description} — Vector: {code path analysis}
### Suspicious Patterns
- SEV-MEDIUM: file:line — {description} — Heuristic: {why flagged}
### Dependency CVEs
- {package}@{version}: {CVE-ID} — {severity} — {description}
### Secret Scan: {PASS|FAIL}
### Summary: {X confirmed, Y likely, Z suspicious, N dependency CVEs}
```

**Failure modes**: False positive flood (reporting every dangerous function without
checking context), missing actual vulnerabilities because focused on style, not checking
dependencies, reporting without attack vectors.

### 2.6 test-writer.md — sonnet

**Model**: stays sonnet

**Role**: Write tests that lock behavior. TDD red-green-refactor when appropriate.

**Anti-scope**: Fixing production code (debugger), refactoring (out of scope),
architecture decisions.

**Key constraints**:
- Detect test framework from manifest files (jest, vitest, pytest, go test, cargo test)
- Match existing test patterns (describe/it structure, assertion style, mock approach)
- Test behavior, not implementation details
- Arrange-Act-Assert pattern
- Descriptive names: should [expected] when [condition]
- Write regression tests BEFORE cleanup/refactoring work (lock behavior first)

**Test strategy classification**:
- Unit: isolated function/component, mocked dependencies
- Integration: multiple modules, real dependencies where possible
- E2E: full user flow (only when explicitly requested)

**Output format**:
```
## Tests Written
### Strategy: {unit|integration|e2e}
### Framework: {detected framework}
### Files
- test/file.test.ts — {N tests} — covers: {what behavior}
### Coverage Gaps (if any)
- {untested edge case with rationale for skipping}
### Verification
- Test command: {command} -> {X passed, Y failed}
```

**Failure modes**: Testing implementation details (mock internals), writing tests that
pass immediately (never saw red), testing obvious getters/setters, creating test utilities
for one-time use, modifying production code to make tests easier.

### 2.7 pattern-analyzer.md — opus

**Model change**: sonnet to opus (deep cross-codebase analysis)

Minimal changes — this agent is already well-structured at 153 lines. Wrap in XML template, add:
- Success Criteria section
- Failure Modes section (extracting patterns from too few files, over-generalizing
  from one example, missing anti-patterns)
- Final Checklist
- Output format template matching current codebase-patterns.md structure

Keep all existing content — extraction methodology, 12 pattern categories, deviation
protocol, freshness rules.

### 2.8 pua-enforcer.md — opus

**Model change**: sonnet to opus (meta-reasoning about agent behavior)

**Role**: Monitor agent progress, detect slacking/stalling, force exhaustive
problem-solving.

**Anti-scope**: Doing the implementation work itself, reviewing code quality.

**Key additions**:
- Proactivity detection table (adapted from OMC):

| Passive (3.25) | Proactive (3.75) |
|----------------|-------------------|
| Waits for user input | Investigates autonomously |
| Reports problems | Reports problems WITH solutions |
| Tries 1-2 approaches | Exhausts all approaches systematically |
| Asks "what should I do?" | Proposes 3 options with recommendation |
| Claims "done" without evidence | Provides verification output |
| Blames environment | Verifies environment claims with tools |

- Failure mode auto-selection: match stall pattern to escalation strategy
  - Spinning wheels (same approach tweaked): force fundamentally different approach
  - Giving up: 7-point checklist
  - Passive waiting: autonomous investigation mandate
  - Garbage quality: reset + slower, more careful approach
  - Guessing: evidence requirement enforcement

Keep: PUA methodology (our differentiator), 7-point checklist, 5-step methodology,
anti-rationalization table.

### 2.9 memory-observer.md — haiku

**Model change**: sonnet to haiku (read-only retrieval, cost savings)

**Role**: Surface relevant memories before implementation, query claude-mem and MEMORY.md.

**Anti-scope**: Making decisions, implementing, writing code.

**Key additions**:
- 3-layer search protocol: search (50-100 tokens/result), timeline (chronological
  context), get_observations (full details, only for relevant IDs)
- Structured output format:

```
## Relevant Memories
| Source | Topic | Relevance | Key Point |
|--------|-------|-----------|-----------|
| claude-mem | {topic} | {high|medium|low} | {1-line summary} |
| MEMORY.md | {topic} | {high|medium|low} | {1-line summary} |
| project-intel | {topic} | {high|medium|low} | {1-line summary} |

## Recommendations
- {actionable recommendation based on memory}
```

**Failure modes**: Returning everything found (noise), making decisions based on stale
memory, blocking on unavailable memory systems (graceful degradation required).

---

## 3. New Skills (5)

All stored in universal/skills/{name}/SKILL.md. Installed to ~/.claude/skills/{name}/.

### 3.1 deep-interview

**Purpose**: Socratic requirements gathering with mathematical ambiguity scoring.

**Adapted from**: OMC skills/deep-interview/SKILL.md (650 lines to ~400 lines)

**Our infrastructure integration**:
- State: .claude/scratch/deep-interview-state.json
- Spec output: docs/specs/deep-interview-{slug}.md
- Brownfield exploration: our explorer agent (haiku)
- Execution bridge: /build (recommended), /consensus-planning, direct implementation
- Scoring model: opus if available, sonnet as fallback (consistency matters for scoring)

**Kept from OMC**:
- One-question-at-a-time rule
- Weighted dimension scoring (Goal 40%, Constraints 30%, Criteria 30% for greenfield;
  adjusted for brownfield with Context 15%)
- Challenge agents (Contrarian round 4+, Simplifier round 6+, Ontologist round 8+)
- Ontology convergence tracking with entity stability scoring
- Ambiguity threshold gate (default 20% or below)
- Early exit with warning, soft cap at 10 rounds, hard cap at 20
- Spec crystallization with clarity breakdown table
- Good/Bad examples

**Removed from OMC**:
- Autoresearch mode (OMC-specific)
- OMC state_write/state_read MCP tools (use Write tool + .claude/scratch/)
- OMC pipeline references (ralph, autopilot, team replaced with our execution modes)
- OMC-specific tool references

**Triggers**: /deep-interview, user says "interview me" or "ask me everything" or
"don't assume". Also: vagueness gate redirect from /build.

### 3.2 ai-slop-cleaner

**Purpose**: Regression-safe cleanup of AI-generated code bloat.

**Adapted from**: OMC skills/ai-slop-cleaner/SKILL.md (134 lines to ~150 lines)

**Our infrastructure integration**:
- Reviewer pass uses our code-reviewer agent
- Regression test generation uses our test-writer agent
- Pattern conformance check against codebase-patterns.md

**Kept from OMC**:
- Execution posture (preserve behavior, lock with tests first, deletion over addition)
- 5-smell classification (duplication, dead code, needless abstraction, boundary
  violations, missing tests)
- 4-pass execution order (dead code, duplicates, naming/errors, tests)
- Scoped file-list usage (can be bounded to explicit file list)
- Writer/reviewer separation (--review flag)
- Evidence-dense close report

**Removed from OMC**:
- Ralph integration references
- OMC-specific tool references

**Triggers**: /deslop, /ai-slop-cleaner, "clean up the slop", "deslop".
Also: Phase 3.5 of /build (automatic on changed files).

### 3.3 consensus-planning

**Purpose**: Multi-perspective plan validation via Planner/Architect/Critic consensus loop.

**Adapted from**: OMC skills/ralplan/SKILL.md + omc-plan consensus mode (~200 lines)

**Our infrastructure integration**:
- Planner role: explorer agent gathers context + planning prompt
- Architect role: pattern-analyzer agent reviews for architectural soundness
- Critic role: code-reviewer agent in critic mode evaluates quality/testability
- Execution bridge: our /build command
- State: .claude/scratch/consensus-plan.json
- Output: docs/specs/consensus-plan-{slug}.md

**Kept from OMC**:
- RALPLAN-DR summary (Principles, Decision Drivers, Viable Options with pros/cons)
- Sequential review: Architect MUST complete before Critic starts
- Re-review loop (max 5 iterations) on non-APPROVE verdict
- Vagueness gate: intercepts underspecified requests
- Concrete signal detection (file paths, function names, issue numbers, code blocks,
  acceptance criteria)
- force: prefix to bypass gate
- ADR output (Decision, Drivers, Alternatives, Why chosen, Consequences)
- Deliberate mode for high-risk work (auto-enables on auth/security, migrations,
  destructive changes)

**Removed from OMC**:
- OMC team/ralph/autopilot execution bridges (replaced with our /build)
- --architect codex / --critic codex flags (we use our agent dispatch instead)
- OMC state management tools

**Triggers**: /consensus, /ralplan. Also: vagueness gate redirect from /build.

### 3.4 trace

**Purpose**: Multi-hypothesis evidence-ranked debugging for complex/ambiguous bugs.

**Adapted from**: OMC agents/tracer.md + trace skill concepts (~250 lines)

**Our infrastructure integration**:
- Investigation uses our debugger agent for executing tests/checks
- Escalation integrates with PUA methodology (trace activates at PUA L2+)
- State: .claude/scratch/trace-state.json

**Key features**:
- Multi-hypothesis generation: minimum 3 hypotheses per investigation round
- Evidence strength hierarchy (6 tiers):
  1. Controlled reproduction (strongest)
  2. Direct observation (logs, debugger output)
  3. Correlation (timing, pattern match)
  4. Absence of alternatives (eliminated other causes)
  5. Expert heuristic (known pattern recognition)
  6. Intuition/analogy (weakest — must be verified)
- Rebuttal rounds: for each leading hypothesis, generate the strongest
  counter-argument. Hypothesis survives only if rebuttal is addressed.
- Convergence detection: when 3+ evidence items at tier 1-3 point to same
  root cause, declare convergence.
- Falsification rules: actively try to DISPROVE the leading hypothesis before
  accepting it.

**Output format**:
```
## Trace Report
### Hypotheses (ranked by evidence)
1. {hypothesis} — Evidence: {tier} — Status: {confirmed|investigating|eliminated}
   - Supporting: {evidence items}
   - Rebuttal: {strongest counter-argument}
   - Rebuttal response: {how it was addressed}
2. ...

### Convergence: {YES at round N | NOT YET}
### Root Cause: {confirmed hypothesis with full evidence chain}
### Fix: {minimal recommendation}
```

**Triggers**: /trace, auto-escalation from /debug after 2 failed hypotheses,
PUA L2+ escalation.

### 3.5 learner

**Purpose**: Extract reusable patterns from sessions with strict quality gates.

**Adapted from**: OMC skills/learner/SKILL.md (~150 lines)

**Our infrastructure integration**:
- Outputs to MEMORY.md (lightweight) + claude-mem observations (cross-session)
- Code patterns to codebase-patterns.md update proposal
- Project gotchas to project-intel.md update proposal
- Integration with our auto-learning protocol (already in CLAUDE.md)

**Quality gates** (must pass ALL to be saved):
1. Non-Googleable: Is this specific to this codebase/setup, not general knowledge?
2. Context-specific: Would this be useful in a FUTURE session on this project?
3. Hard-won: Did we learn this through failure, not just observation?
4. Evidence-based: Can we point to the specific commit/error/decision?
5. Not already captured: Check existing memories before saving duplicates.

**Extraction categories**:
- Gotcha: non-obvious thing that caused a failure
- Pattern: code convention not captured in codebase-patterns.md
- Decision: architectural choice with rationale
- Preference: user preference about how to work

**Output format**:
```
## Session Learnings
### Worth Saving ({N} items passed quality gates)
1. {category}: {learning} — Evidence: {what happened} — Target: {memory|intel|patterns}

### Filtered ({M} items failed quality gates)
1. {learning} — Failed: {which gate and why}
```

**Triggers**: /learn, session end (suggested, not automatic).

---

## 4. Command Upgrades (3)

### 4.1 build.md

**Added phases**:
- Phase 0.5 Vagueness Gate: Check for concrete anchors (file paths, function names,
  issue numbers, acceptance criteria, numbered steps, code blocks, error references).
  If none found AND prompt has 15 or fewer effective words, redirect to /deep-interview
  (extremely vague) or /consensus-planning (moderately vague). Bypass with force: prefix.
  Show the user why they were redirected and what anchor types would pass the gate.
- Phase 3.5 Deslop Pass: After implementation, before review. Run ai-slop-cleaner on
  changed files only (scoped). Skip for trivial tasks (under 30 lines changed). Reports
  cleanup actions taken.
- Phase 4 addition Rebuttal Round: After review agents return findings, run critic
  challenge on Critical/High findings. Each finding must survive counter-argument or
  be withdrawn. Output: "X/Y findings survived rebuttal."

### 4.2 review.md

**Added**:
- Agent 0 Pattern Conformance: Before parallel review agents, check codebase-patterns.md
  exists. If so, include in every agent's context. Conformance violations reported in a
  separate section from bugs/security.
- Rebuttal protocol in synthesis phase: After all agents return, for each Critical finding:
  "Why might this NOT be a problem?" Finding survives only with evidence-based defense.
  Reduces false positive noise.
- Evidence hierarchy tags: Each finding tagged: confirmed (reproduced) > analysis
  (code path) > pattern (heuristic match) > informational.

### 4.3 debug.md

**Added**:
- Auto-escalation to trace: If Phase 2 (Diagnose) produces 2 failed hypotheses,
  automatically invoke /trace skill. Current investigation context passed to trace
  as initial evidence.
- PUA escalation formalized: Replace vague "follow PUA" with explicit triggers:
  - 2 failed hypotheses: /trace skill (multi-hypothesis evidence-ranked)
  - 3 failed hypotheses: 7-point checklist (mandatory)
  - 4 failed hypotheses: fundamentally different approach (different tools, angle)

---

## 5. Install/Adapter Changes

### 5.1 install.sh

- Add 5 new skill directories to the copy loop:
  deep-interview, ai-slop-cleaner, consensus-planning, trace, learner
- Remove build-error-resolver from agent copy (if explicitly referenced)

### 5.2 agents/claude-code/adapter.sh

- Remove build-error-resolver from the agent list
- No new agents to add (skills are not agents — invoked via /skill commands)

### 5.3 References to update

- orchestration.md Step 7: change build-error-resolver to debugger
- pua-en.md: change build-error-resolver to debugger
- CLAUDE.md project description: add new skills to the skills list
- project-intel.md: add new skills to the Quick Reference section

---

## 6. Acceptance Criteria

- All 8 agents follow the XML template with all required sections
- Model tiers assigned correctly (haiku/sonnet/opus per spec)
- build-error-resolver removed, debugger absorbs its capabilities
- Sequential-thinking boilerplate removed from all agents (single-line reference instead)
- 5 new skills created in universal/skills/ with complete SKILL.md files
- /build has vagueness gate, deslop pass, and rebuttal round
- /review has pattern conformance check, rebuttal protocol, evidence hierarchy
- /debug has trace escalation and formalized PUA triggers
- install.sh copies new skills
- adapter.sh updated (build-error-resolver removed)
- All references to build-error-resolver updated to debugger
- make test passes (no install regressions)
- make lint passes (shellcheck clean)
