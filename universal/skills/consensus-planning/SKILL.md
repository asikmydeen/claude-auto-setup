---
name: consensus-planning
description: Multi-perspective plan validation via Planner/Architect/Critic consensus loop
---

# Consensus Planning

Multi-perspective plan validation before execution. Three agents — Planner, Architect, Critic — iterate until consensus, producing a structured decision record.

## Use When

- Complex tasks needing architectural validation before implementation
- Vagueness gate redirect from `/build` (underspecified prompts)
- User invokes `/consensus` or `/ralplan`
- Multi-file changes where the wrong approach is expensive to undo
- Cross-cutting concerns (auth, data model, API design) that benefit from adversarial review

## Do Not Use When

- Simple/trivial tasks (single file, < 30 lines)
- User has a detailed spec with file paths and acceptance criteria
- Quick fixes with obvious solutions
- The user explicitly says "skip planning" or "just do it"

## Vagueness Gate

Before executing any complex task, check for **concrete anchors** in the prompt. If none are found and the prompt is <=15 effective words, redirect to this skill.

### Concrete Signal Detection

| Signal Type | Example | Why It Passes |
|---|---|---|
| File path | `fix src/hooks/bridge.ts` | References a specific file |
| Issue/PR number | `implement #42` | Has a concrete work item |
| camelCase symbol | `fix processKeywordDetector` | Names a specific function |
| PascalCase symbol | `update UserModel` | Names a specific class |
| snake_case symbol | `fix user_model` | Names a specific identifier |
| Test runner | `npm test && fix failures` | Has an explicit test target |
| Numbered steps | `do:\n1. Add X\n2. Test Y` | Structured deliverables |
| Acceptance criteria | `add login - AC: user can sign in` | Explicit success definition |
| Error reference | `fix TypeError in auth` | Specific error to address |
| Code block | `add: \`\`\`ts ... \`\`\`` | Concrete code provided |
| Escape prefix | `force: do it` or `! do it` | Explicit user override |

**No anchors + <=15 words = redirect to consensus planning.** Bypass with `force:` prefix.

### Good vs Bad Prompts

**Passes the gate** (specific enough for direct execution):
- `fix the null check in src/hooks/bridge.ts:326`
- `implement issue #42`
- `add validation to function processKeywordDetector`
- `do:\n1. Add input validation\n2. Write tests\n3. Update README`

**Gated — redirected to consensus planning** (needs scoping first):
- `fix this`
- `build the app`
- `improve performance`
- `add authentication`
- `make it better`

## Consensus Workflow

### Step 1: Planner (Explorer Agent)

Spawn an explorer agent to gather codebase context, then create an initial plan with a **RALPLAN-DR summary**:

- **Principles** (3-5): Core values guiding the decision
- **Decision Drivers** (top 3): Concrete constraints and requirements
- **Viable Options** (>=2): Each with bounded pros/cons
  - If only one viable option remains, provide explicit invalidation rationale for all alternatives

The Planner researches the codebase, maps dependencies, and produces a structured plan before any review begins.

### Step 2: Architect (Pattern-Analyzer Agent)

Spawn a pattern-analyzer agent to review for architectural soundness. The Architect MUST provide:

- The strongest **steelman antithesis** — the best argument against the proposed approach
- At least one **real tradeoff tension** — not a strawman, a genuine design tension
- When possible, a **synthesis** that resolves or mitigates the tension

In deliberate mode, the Architect must explicitly flag any principle violations.

> **IMPORTANT**: The Architect MUST complete before the Critic starts. These steps are sequential, not parallel. Always await the Architect result before issuing the Critic task.

### Step 3: Critic (Code-Reviewer in Critic Mode)

Spawn a code-reviewer agent in critic mode. The Critic evaluates against:

- **Principle-option consistency**: Do the chosen options align with stated principles?
- **Fair alternatives**: Were alternatives genuinely considered or dismissed superficially?
- **Risk mitigation clarity**: Are risks identified with concrete mitigations?
- **Testable acceptance criteria**: Can each criterion be verified programmatically?
- **Concrete verification steps**: Does the plan specify how to prove it works?

The Critic returns one of three verdicts: `APPROVE`, `ITERATE`, or `REJECT`.

In deliberate mode, the Critic must reject plans with missing or weak pre-mortem analysis or inadequate test coverage plans.

### Step 4: Re-Review Loop (Max 5 Iterations)

Any non-`APPROVE` verdict triggers a closed loop:

1. Collect Architect + Critic feedback
2. Revise the plan with Planner (address every concern)
3. Architect reviews the revised plan
4. Critic evaluates the revision
5. Repeat until `APPROVE` or 5 iterations reached

If 5 iterations are reached without `APPROVE`, present the best version to the user with a summary of unresolved concerns.

### Step 5: Output

Final approved plan includes an **ADR (Architecture Decision Record)**:

- **Decision**: What was decided
- **Drivers**: What constraints shaped the decision
- **Alternatives considered**: Other viable options and why they were not chosen
- **Why chosen**: The reasoning that led to this option
- **Consequences**: Known tradeoffs and follow-up work

## Deliberate Mode

Activates automatically for high-risk work, or manually via `--deliberate` flag.

### Auto-Triggers

- Auth/security changes
- Database migrations or schema changes
- Destructive operations (data deletion, irreversible state changes)
- Production incident response
- Compliance/PII handling
- Public API breaking changes

### Additional Requirements

When deliberate mode is active, the Planner adds:

- **Pre-mortem** (3 scenarios): "Assume this plan failed. What went wrong?"
  1. Technical failure scenario
  2. Integration/compatibility failure scenario
  3. User-facing/business impact scenario
- **Expanded test plan**: Unit, integration, e2e, and observability coverage for each scenario

The Architect flags principle violations explicitly. The Critic rejects plans with missing or weak pre-mortem or expanded test plan.

## State Management

Persist consensus state to `.claude/scratch/consensus-plan.json`:

```json
{
  "task": "description",
  "phase": "planner|architect|critic|revision",
  "iteration": 1,
  "deliberateMode": false,
  "plannerOutput": {},
  "architectFeedback": {},
  "criticVerdict": "APPROVE|ITERATE|REJECT",
  "criticFeedback": {},
  "bestVersion": {}
}
```

Overwrite on each phase transition. Delete on completion.

## Output Artifact

Write the final approved plan to `docs/specs/consensus-plan-{slug}.md` where `{slug}` is a kebab-case summary of the task (e.g., `consensus-plan-add-user-auth.md`).

The artifact includes:
- Task description
- RALPLAN-DR summary (Principles, Drivers, Options)
- ADR (Decision, Drivers, Alternatives, Why chosen, Consequences)
- Implementation plan with file paths and acceptance criteria
- Test plan (expanded in deliberate mode)
- Iteration history (how many rounds, key revisions)

## Execution Bridge

After consensus approval, hand off to `/build` for implementation. The approved plan becomes the spec that `/build` executes against — no re-planning needed.

## Flags

- `--interactive`: Enables user prompts at draft review (after Planner) and final approval (after consensus). Without this flag, the workflow runs fully automated.
- `--deliberate`: Forces deliberate mode. Without this flag, deliberate mode auto-enables on high-risk signals.

## Final Checklist

Before declaring consensus reached:

- [ ] Plan has 3-5 principles and top 3 decision drivers
- [ ] At least 2 viable options were evaluated with pros/cons
- [ ] Architect provided steelman antithesis and real tradeoff tension
- [ ] Critic verified testable acceptance criteria and concrete verification steps
- [ ] ADR is complete (Decision, Drivers, Alternatives, Why chosen, Consequences)
- [ ] State file cleaned up (`.claude/scratch/consensus-plan.json` deleted)
- [ ] Output artifact written to `docs/specs/consensus-plan-{slug}.md`
- [ ] In deliberate mode: pre-mortem (3 scenarios) and expanded test plan included
