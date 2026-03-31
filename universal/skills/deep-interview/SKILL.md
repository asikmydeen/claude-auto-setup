---
name: deep-interview
description: Socratic deep interview with mathematical ambiguity gating before implementation
---

<Purpose>
Deep Interview implements Ouroboros-inspired Socratic questioning with mathematical ambiguity scoring. It replaces vague ideas with crystal-clear specifications by asking targeted questions that expose hidden assumptions, measuring clarity across weighted dimensions, and refusing to proceed until ambiguity drops below a configurable threshold (default: 20%). The output is a spec file that feeds into execution workflows (`/build`, `/consensus-planning`, or direct implementation).
</Purpose>

<Use_When>
- User has a vague idea and wants thorough requirements gathering before execution
- User says "deep interview", "interview me", "ask me everything", "don't assume", "make sure you understand"
- User says "socratic", "I have a vague idea", "not sure exactly what I want"
- User wants to avoid "that's not what I meant" outcomes from autonomous execution
- Task is complex enough that jumping to code would waste cycles on scope discovery
- User wants mathematically-validated clarity before committing to execution
</Use_When>

<Do_Not_Use_When>
- User has a detailed, specific request with file paths, function names, or acceptance criteria -- execute directly
- User wants to explore options or brainstorm -- use `/consensus-planning` instead
- User wants a quick fix or single change -- execute directly or use `/quick`
- User says "just do it" or "skip the questions" -- respect their intent
- User already has a PRD or spec file -- use `/build` with that spec
</Do_Not_Use_When>

<Why_This_Exists>
AI can build anything. The hard part is knowing what to build. Single-pass spec expansion struggles with genuinely vague inputs -- it asks "what do you want?" instead of "what are you assuming?" Deep Interview applies Socratic methodology to iteratively expose assumptions and mathematically gate readiness, ensuring the AI has genuine clarity before spending execution cycles.

Inspired by the [Ouroboros project](https://github.com/Q00/ouroboros) which demonstrated that specification quality is the primary bottleneck in AI-assisted development.
</Why_This_Exists>

<Execution_Policy>
- Ask ONE question at a time -- never batch multiple questions
- Target the WEAKEST clarity dimension with each question
- Make weakest-dimension targeting explicit every round: name the weakest dimension, state its score/gap, and explain why the next question is aimed there
- Gather codebase facts via `explorer` agent (haiku) BEFORE asking the user about them
- For brownfield confirmation questions, cite the repo evidence that triggered the question (file path, symbol, or pattern) instead of asking the user to rediscover it
- Score ambiguity after every answer -- display the score transparently
- Do not proceed to execution until ambiguity <= threshold (default 0.2)
- Allow early exit with a clear warning if ambiguity is still high
- Persist interview state for resume across session interruptions
- Challenge agents activate at specific round thresholds to shift perspective
</Execution_Policy>

<Steps>

## Phase 1: Initialize

1. **Parse the user's idea** from `{{ARGUMENTS}}`
2. **Detect brownfield vs greenfield**:
   - Spawn `explorer` agent (haiku, background): check if cwd has existing source code, package files, or git history
   - If source files exist AND the user's idea references modifying/extending something: **brownfield**
   - Otherwise: **greenfield**
3. **For brownfield**: Spawn `explorer` agent to map relevant codebase areas, store as `codebase_context`
4. **Initialize state** -- write to `.claude/scratch/deep-interview-state.json`:

```json
{
  "active": true,
  "interview_id": "<uuid>",
  "type": "greenfield|brownfield",
  "initial_idea": "<user input>",
  "rounds": [],
  "current_ambiguity": 1.0,
  "threshold": 0.2,
  "codebase_context": null,
  "challenge_modes_used": [],
  "ontology_snapshots": []
}
```

5. **Announce the interview** to the user:

> Starting deep interview. I'll ask targeted questions to understand your idea thoroughly before building anything. After each answer, I'll show your clarity score. We'll proceed to execution once ambiguity drops below 20%.
>
> **Your idea:** "{initial_idea}"
> **Project type:** {greenfield|brownfield}
> **Current ambiguity:** 100% (we haven't started yet)

## Phase 2: Interview Loop

Repeat until `ambiguity <= threshold` OR user exits early:

### Step 2a: Generate Next Question

Build the question generation prompt with:
- The user's original idea
- All prior Q&A rounds (conversation history)
- Current clarity scores per dimension (which is weakest?)
- Challenge agent mode (if activated -- see Phase 3)
- Brownfield codebase context (if applicable)

**Question targeting strategy:**
- Identify the dimension with the LOWEST clarity score
- Generate a question that specifically improves that dimension
- State, in one sentence before the question, why this dimension is now the bottleneck to reducing ambiguity
- Questions should expose ASSUMPTIONS, not gather feature lists
- If the scope is still conceptually fuzzy (entities keep shifting, the user is naming symptoms, or the core noun is unstable), switch to an ontology-style question that asks what the thing fundamentally IS before returning to feature/detail questions

**Question styles by dimension:**
| Dimension | Question Style | Example |
|-----------|---------------|---------|
| Goal Clarity | "What exactly happens when...?" | "When you say 'manage tasks', what specific action does a user take first?" |
| Constraint Clarity | "What are the boundaries?" | "Should this work offline, or is internet connectivity assumed?" |
| Success Criteria | "How do we know it works?" | "If I showed you the finished product, what would make you say 'yes, that's it'?" |
| Context Clarity (brownfield) | "How does this fit?" | "I found JWT auth middleware in `src/auth/` (pattern: passport + JWT). Should this feature extend that path or intentionally diverge from it?" |
| Scope-fuzzy / ontology stress | "What IS the core thing here?" | "You have named Tasks, Projects, and Workspaces across the last rounds. Which one is the core entity, and which are supporting views or containers?" |

### Step 2b: Ask the Question

Present each question clearly with the current ambiguity context:

```
Round {n} | Targeting: {weakest_dimension} | Why now: {one_sentence_targeting_rationale} | Ambiguity: {score}%

{question}
```

Options should include contextually relevant choices plus free-text.

### Step 2c: Score Ambiguity

After receiving the user's answer, score clarity across all dimensions.

**Scoring model**: opus if available, sonnet as fallback. Temperature 0.1 for consistency.

**Scoring prompt** (respond as JSON):

```
Given interview transcript for a {greenfield|brownfield} project, score clarity 0.0-1.0:

Original idea: {idea}
Transcript: {all rounds Q&A}

Dimensions (each with score, justification, gap if < 0.9):
1. Goal Clarity: Is the objective unambiguous? Key entities and relationships clear?
2. Constraint Clarity: Are boundaries, limitations, and non-goals clear?
3. Success Criteria: Could you write a test verifying success?
{4. Context Clarity [brownfield only]: Existing system understood enough to modify safely?}

Also: weakest_dimension + rationale (highest-leverage target for next question).

Ontology Extraction: key entities with name, type, fields[], relationships[].
{Round 2+: "Previous entities: {prior_entities_json}. REUSE names for same concepts."}
```

**Calculate ambiguity:**

Greenfield: `ambiguity = 1 - (goal * 0.40 + constraints * 0.30 + criteria * 0.30)`
Brownfield: `ambiguity = 1 - (goal * 0.35 + constraints * 0.25 + criteria * 0.25 + context * 0.15)`

**Calculate ontology stability:**

Round 1: all entities are "new", stability_ratio = N/A. Zero entities = N/A.

Rounds 2+: compare with previous round's entity list:
- `stable`: same name in both rounds. `changed`: different name but same type + >50% field overlap (renamed = convergence). `new`: unmatched in current. `removed`: unmatched from previous.
- `stability_ratio` = (stable + changed) / total_entities (1.0 = fully converged)

**Show your work:** list which entities were matched and which are new/removed. Store snapshot in `ontology_snapshots[]`.

### Step 2d: Report Progress

After scoring, show the user their progress:

```
Round {n} complete.

| Dimension | Score | Weight | Weighted | Gap |
|-----------|-------|--------|----------|-----|
| Goal | {s} | {w} | {s*w} | {gap or "Clear"} |
| Constraints | {s} | {w} | {s*w} | {gap or "Clear"} |
| Success Criteria | {s} | {w} | {s*w} | {gap or "Clear"} |
| Context (brownfield) | {s} | {w} | {s*w} | {gap or "Clear"} |
| **Ambiguity** | | | **{score}%** | |

**Ontology:** {entity_count} entities | Stability: {stability_ratio} | New: {new} | Changed: {changed} | Stable: {stable}

**Next target:** {weakest_dimension} -- {weakest_dimension_rationale}

{score <= threshold ? "Clarity threshold met! Ready to proceed." : "Focusing next question on: {weakest_dimension}"}
```

### Step 2e: Update State

Update interview state in `.claude/scratch/deep-interview-state.json` with the new round and scores.

### Step 2f: Check Soft Limits

- **Round 3+**: Allow early exit if user says "enough", "let's go", "build it"
- **Round 10**: Show soft warning: "We're at 10 rounds. Current ambiguity: {score}%. Continue or proceed with current clarity?"
- **Round 20**: Hard cap: "Maximum interview rounds reached. Proceeding with current clarity level ({score}%)."

## Phase 3: Challenge Agents

At specific round thresholds, shift the questioning perspective:

### Round 4+: Contrarian Mode
Inject into the question generation prompt:
> You are now in CONTRARIAN mode. Your next question should challenge the user's core assumption. Ask "What if the opposite were true?" or "What if this constraint doesn't actually exist?" The goal is to test whether the user's framing is correct or just habitual.

### Round 6+: Simplifier Mode
Inject into the question generation prompt:
> You are now in SIMPLIFIER mode. Your next question should probe whether complexity can be removed. Ask "What's the simplest version that would still be valuable?" or "Which of these constraints are actually necessary vs. assumed?" The goal is to find the minimal viable specification.

### Round 8+: Ontologist Mode (if ambiguity still > 0.3)
Inject into the question generation prompt:
> You are now in ONTOLOGIST mode. The ambiguity is still high after 8 rounds, suggesting we may be addressing symptoms rather than the core problem. The tracked entities so far are: {current_entities_summary from latest ontology snapshot}. Ask "What IS this, really?" or "Looking at these entities, which one is the CORE concept and which are just supporting?" The goal is to find the essence by examining the ontology.

Challenge modes are used ONCE each, then return to normal Socratic questioning. Track which modes have been used in state.

## Phase 4: Crystallize Spec

When ambiguity <= threshold (or hard cap / early exit):

1. **Generate the specification** using opus if available, sonnet as fallback, with the full interview transcript
2. **Write to file**: `docs/specs/deep-interview-{slug}.md`

Spec structure (all sections required):

```markdown
# Deep Interview Spec: {title}

## Metadata
Interview ID | Rounds | Final Ambiguity | Type | Generated | Threshold | Status (PASSED/BELOW_THRESHOLD_EARLY_EXIT)

## Clarity Breakdown
Table: Dimension | Score | Weight | Weighted. Include Total Clarity and Ambiguity rows.

## Goal
{crystal-clear goal statement derived from interview}

## Constraints
{bulleted list}

## Non-Goals
{explicitly excluded scope}

## Acceptance Criteria
{testable checkboxes}

## Assumptions Exposed & Resolved
Table: Assumption | Challenge | Resolution

## Technical Context
{brownfield: codebase findings from explorer agent | greenfield: technology choices}

## Ontology (Key Entities)
Table: Entity | Type | Fields | Relationships. Fill from the FINAL round's ontology extraction.

## Ontology Convergence
Table: Round | Entity Count | New | Changed | Stable | Stability Ratio. Shows entity stabilization across rounds.

## Interview Transcript
Collapsible detail block with full Q&A, per-round ambiguity scores.
```

## Phase 5: Execution Bridge

After the spec is written, present execution options:

**Prompt:** "Your spec is ready (ambiguity: {score}%). How would you like to proceed?"

**Options:**

1. **`/build` (Recommended)**
   - Description: "Multi-agent implementation pipeline with exploration, planning, parallel execution, review, and verification. Maximum quality."
   - Action: Invoke `/build` with the spec file path as context. The spec replaces the exploration/planning phases -- `/build` uses it as the approved plan.

2. **`/consensus-planning` then `/build`**
   - Description: "Refine the spec further through multi-perspective consensus (Planner/Architect/Critic loop), then execute with `/build`."
   - Action: Pass the spec to `/consensus-planning` for consensus refinement, then hand the refined plan to `/build` for execution.

3. **Direct implementation**
   - Description: "Implement directly without the full `/build` pipeline. Faster for small specs."
   - Action: Proceed with standard multi-agent implementation using the spec as the plan.

4. **Refine further**
   - Description: "Continue interviewing to improve clarity (current: {score}%)"
   - Action: Return to Phase 2 interview loop.

**IMPORTANT:** The deep-interview skill is a requirements agent, not an execution agent. On execution selection, hand off to the chosen execution path. Do NOT implement directly from within this skill.

</Steps>

<Tool_Usage>
- Use `explorer` agent (haiku, background) for brownfield codebase exploration -- run BEFORE asking user about codebase
- Use opus if available, sonnet as fallback (temperature 0.1) for ambiguity scoring -- consistency is critical
- Write interview state to `.claude/scratch/deep-interview-state.json` for persistence
- Write the final spec to `docs/specs/deep-interview-{slug}.md`
- Challenge agent modes are prompt injections into your own reasoning, not separate agent spawns
- Hand off to `/build` or other execution paths -- never implement directly from this skill
</Tool_Usage>

<Examples>
<Good>
Targeting weakest dimension:
```
Scores: Goal=0.9, Constraints=0.4, Criteria=0.7
Next question targets Constraints (lowest at 0.4):
"You mentioned this should 'work on mobile'. Does that mean a native app,
a responsive web app, or a PWA? And are there specific devices or OS versions
you need to support?"
```
Why good: Identifies weakest dimension, explains why it is the bottleneck, asks a specific question to improve it, and doesn't batch multiple topics.
</Good>

<Good>
Brownfield exploration before asking:
```
[spawns explorer agent: "find authentication implementation"]
[receives: "Auth is in src/auth/ using JWT with passport.js"]

Question: "I found JWT authentication with passport.js in `src/auth/`.
Should this feature extend the existing auth middleware or create a separate flow?"
```
Why good: Explored first, cited repo evidence, asked an informed confirmation question.
</Good>

<Good>
Early exit with warning:
```
User: "That's enough, just build it"
System: "Current ambiguity is 35% (threshold: 20%). Areas still unclear:
  - Success Criteria: 0.5 (How do we verify the search ranking algorithm works correctly?)
  - Constraints: 0.6 (No performance targets defined yet)
Proceeding may require rework. Continue anyway?"
  [Yes, proceed] [Ask 2-3 more questions] [Cancel]
```
Why good: Respects user's desire to stop but transparently shows the risk.
</Good>

<Bad>
Batching multiple questions:
```
"What's the target audience? And what tech stack? And how should auth work?
Also, what's the deployment target?"
```
Why bad: Four questions at once -- causes shallow answers and makes scoring inaccurate.
</Bad>

<Bad>
Asking about codebase facts the explorer could find:
```
"What database does your project use?"
```
Why bad: Should have spawned explorer agent first. Never ask the user what the code already reveals.
</Bad>
</Examples>

<Escalation_And_Stop_Conditions>
- **Hard cap at 20 rounds**: Proceed with whatever clarity exists, noting the risk
- **Soft warning at 10 rounds**: Offer to continue or proceed
- **Early exit (round 3+)**: Allow with warning if ambiguity > threshold
- **User says "stop", "cancel", "abort"**: Stop immediately, save state for resume
- **Ambiguity stalls** (same score +-0.05 for 3 rounds): Activate Ontologist mode to reframe
- **All dimensions at 0.9+**: Skip to spec generation even if not at round minimum
- **Codebase exploration fails**: Proceed as greenfield, note the limitation
</Escalation_And_Stop_Conditions>

<Final_Checklist>
- [ ] Interview completed (ambiguity <= threshold OR user chose early exit)
- [ ] Ambiguity score displayed after every round
- [ ] Every round explicitly names the weakest dimension and why it is the next target
- [ ] Challenge agents activated at correct thresholds (round 4, 6, 8)
- [ ] Spec file written to `docs/specs/deep-interview-{slug}.md`
- [ ] Spec includes: goal, constraints, acceptance criteria, clarity breakdown, transcript
- [ ] Execution bridge presented with options (`/build`, `/consensus-planning`, direct, refine)
- [ ] Selected execution mode handed off properly (never direct implementation from this skill)
- [ ] State cleaned up after execution handoff
- [ ] Brownfield confirmation questions cite repo evidence (file/path/pattern) before asking the user to decide
- [ ] Scope-fuzzy tasks trigger ontology-style questioning to stabilize the core entity before feature elaboration
- [ ] Per-round ambiguity report includes Ontology row with entity count and stability ratio
- [ ] Spec includes Ontology (Key Entities) table and Ontology Convergence section
</Final_Checklist>

<Advanced>
## Configuration

Optional overrides via `.claude/settings.json` or project CLAUDE.md:

```json
{
  "deepInterview": {
    "ambiguityThreshold": 0.2,
    "maxRounds": 20,
    "softWarningRounds": 10,
    "minRoundsBeforeExit": 3,
    "enableChallengeAgents": true,
    "scoringModel": "opus"
  }
}
```

## Resume

If interrupted, run `/deep-interview` again. The skill reads state from `.claude/scratch/deep-interview-state.json` and resumes from the last completed round.

## Ambiguity Score Interpretation

| Score Range | Meaning | Action |
|-------------|---------|--------|
| 0.0 - 0.1 | Crystal clear | Proceed immediately |
| 0.1 - 0.2 | Clear enough | Proceed (default threshold) |
| 0.2 - 0.4 | Some gaps | Continue interviewing |
| 0.4 - 0.6 | Significant gaps | Focus on weakest dimensions |
| 0.6 - 0.8 | Very unclear | May need reframing (Ontologist) |
| 0.8 - 1.0 | Almost nothing known | Early stages, keep going |
</Advanced>

Task: {{ARGUMENTS}}
