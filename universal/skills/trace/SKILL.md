---
name: trace
description: Multi-hypothesis evidence-ranked debugging for complex and ambiguous bugs
---

# Trace — Multi-Hypothesis Evidence-Ranked Debugging

A structured debugging skill for when standard approaches fail. Generates competing hypotheses, ranks them by evidence strength across 6 tiers, runs rebuttal rounds to stress-test leading candidates, and converges on a confirmed root cause with a full evidence chain.

## Purpose

Standard debugging works linearly: reproduce, inspect, fix. That breaks down when:
- The bug has multiple plausible causes and you keep chasing the wrong one
- Two or more hypotheses have already been disproven
- Evidence is ambiguous, contradictory, or spans multiple subsystems

Trace replaces guesswork with a disciplined evidence-ranking system. Every hypothesis is tracked, every piece of evidence is classified by strength, and the leading explanation must survive active rebuttal before being accepted.

## Use When

- Complex or ambiguous bugs where 2+ hypotheses have already been disproven
- Auto-escalation from `/debug` after 2 failed fix attempts
- PUA L2+ escalation (methodology requires structured multi-hypothesis approach)
- Bugs spanning 3+ files or crossing subsystem boundaries
- Intermittent failures, race conditions, or timing-dependent bugs
- Situations where the same symptom could have fundamentally different root causes

## Do Not Use When

- Obvious bugs: typo, missing import, wrong variable name — just fix them
- Build errors: the `build-error-resolver` agent handles these directly
- Simple test failures with clear assertion messages
- First-attempt debugging — try standard `/debug` first

## Evidence Strength Hierarchy

All evidence gathered during a trace is classified into one of 6 tiers. Higher tiers outweigh lower tiers. If a higher-tier finding contradicts a lower-tier one, the lower-tier support is discarded.

| Tier | Name | Description | Example |
|------|------|-------------|---------|
| **1** | Controlled reproduction | Can trigger the bug reliably with a specific input or sequence | Minimal repro script that fails 100% of the time |
| **2** | Direct observation | Logs, debugger output, stack traces, `git bisect` results | Error log with timestamp showing the exact failure point |
| **3** | Correlation | Timing coincidence, pattern match across occurrences | Bug appears only when feature flag X is enabled |
| **4** | Absence of alternatives | Other causes have been systematically eliminated | All 4 other hypotheses disproven, only this one remains |
| **5** | Expert heuristic | Known pattern from experience or documentation | "This looks like the classic N+1 query stall pattern" |
| **6** | Intuition / analogy | Weakest — gut feeling or resemblance to a past bug | "This reminds me of that race condition we had in module Y" |

**Critical rule:** Tier 6 evidence MUST be verified with Tier 1-3 evidence before any fix is attempted. Never act on intuition alone.

## Workflow

### Phase 1: Gather Initial Evidence

Collect all available information from the failed debugging session:
- Error messages, stack traces, log output (verbatim, not summarized)
- What was already tried and why it failed
- Conditions under which the bug appears (and does not appear)
- Files and subsystems involved

Write initial evidence to state file (`.claude/scratch/trace-state.json`).

### Phase 2: Generate Hypotheses

Produce 3 or more hypotheses. Use deliberately different frames:
- Code path hypothesis (logic error, wrong branch, missing check)
- Data/state hypothesis (corrupt state, stale cache, race condition)
- Environment/config hypothesis (wrong version, missing dependency, config mismatch)
- Integration hypothesis (upstream change, API contract violation, timing)

Each hypothesis must be falsifiable — there must exist an observation that would disprove it.

### Phase 3: Initial Ranking

Rank hypotheses by plausibility based on currently available evidence. Assign each an initial confidence: High / Medium / Low.

### Phase 4: Evidence Gathering

For each hypothesis, use the `debugger` agent or direct investigation to:
1. **Seek supporting evidence** — what observations would be true if this hypothesis is correct?
2. **Seek disconfirming evidence** — what observations would be hard to explain if this hypothesis is correct?
3. **Classify** every piece of evidence by tier (1-6)
4. **Update ranking** — re-rank after each round of evidence

Prefer probes that discriminate between the top two hypotheses over probes that merely add more support to the leader.

### Phase 5: Rebuttal Rounds

For the leading hypothesis after evidence gathering:
1. Generate the **strongest possible counter-argument** against it
2. The hypothesis survives only if the rebuttal is addressed with Tier 1-3 evidence
3. If the rebuttal stands, demote the hypothesis and promote the next candidate
4. Repeat for the new leader

A hypothesis that survives only because no one looked for disconfirming evidence stays at Low confidence.

### Phase 6: Convergence Detection

Declare convergence when: **3 or more evidence items at Tier 1-3 point in the same direction** toward a single root cause.

If multiple hypotheses reduce to the same underlying mechanism, merge them and note the convergence.

If hypotheses only sound similar but imply different root causes, keep them separate — do not fake convergence.

### Phase 7: Falsification

Before accepting the leading hypothesis as root cause:
1. Actively attempt to **disprove** it with a targeted experiment
2. Ask: "If this hypothesis is wrong, what should I observe instead?"
3. Run the experiment
4. If falsification succeeds: demote and return to Phase 5
5. If falsification fails (hypothesis withstands the test): proceed to confirmation

### Phase 8: Confirmation and Fix

Once a hypothesis survives evidence gathering, rebuttal, and falsification:
1. Document the full evidence chain from symptom to root cause
2. Propose a **minimal fix** — the smallest change that addresses the confirmed cause
3. Verify the fix resolves the original symptom (Tier 1 evidence)
4. Check for similar issues in related code (Iron Rule Three from PUA)

## State Management

State is persisted to `.claude/scratch/trace-state.json` between rounds:

```json
{
  "round": 3,
  "observation": "API returns 500 intermittently under load",
  "hypotheses": [
    {
      "id": 1,
      "description": "Connection pool exhaustion under concurrent requests",
      "status": "investigating",
      "confidence": "high",
      "evidence": [
        { "tier": 2, "type": "supporting", "detail": "Pool size logged at max during failures" },
        { "tier": 3, "type": "supporting", "detail": "Failures correlate with request spikes" }
      ],
      "rebuttal": "Pool metrics show recovery within 100ms, but failures persist for 2s",
      "rebuttal_response": "Pending — need to check queue backpressure behavior"
    }
  ],
  "eliminated": ["hypothesis 2: timeout config", "hypothesis 3: DNS resolution"],
  "convergence": false,
  "files_investigated": ["src/server/pool.ts", "src/server/middleware.ts"]
}
```

Create `.claude/scratch/` on first use. Delete `trace-state.json` when trace completes successfully.

## Integration Points

### Debugger Agent

Use the project's `debugger` agent for investigation steps. Delegate focused probes:
- "Check if connection pool size reaches max during the failure window"
- "Run this minimal reproduction and capture the full stack trace"
- "Git bisect between commits X and Y to find when the behavior changed"

### PUA Integration

Trace activates at PUA L2+ (after 2+ failures in standard debugging). When triggered by PUA escalation:
- Import the failure context and eliminated approaches from the PUA session
- Start at Phase 2 (evidence from PUA attempts becomes Phase 1 input)
- PUA pressure levels remain active during the trace — no relaxation of standards

### Sequential Thinking

For particularly complex Phase 4 evidence analysis, use `sequential-thinking` to work through the evidence chain step by step. Useful when evidence is contradictory or when multiple subsystems interact.

## Output Format

```
## Trace Report

### Observation
[Precise description of the bug — what was observed, without interpretation]

### Hypotheses (ranked by evidence)
1. {hypothesis} — Evidence: Tier {N} — Status: {confirmed|investigating|eliminated}
   - Supporting: {evidence items with tier}
   - Rebuttal: {strongest counter-argument}
   - Rebuttal response: {how addressed, with evidence tier}

2. {hypothesis} — Evidence: Tier {N} — Status: {eliminated}
   - Supporting: {evidence items with tier}
   - Disconfirming: {what disproved it, with evidence tier}

3. {hypothesis} — Evidence: Tier {N} — Status: {eliminated}
   - Supporting: {evidence items with tier}
   - Disconfirming: {what disproved it, with evidence tier}

### Convergence: {YES at round N | NOT YET}
### Root Cause: {confirmed hypothesis with full evidence chain}
### Fix: {minimal recommendation}
### Remaining Unknowns: {anything still unexplained}
```

## Examples

### Good Trace

> **Observation:** API returns 500 intermittently under load (3% of requests).
>
> **Hypothesis 1:** Connection pool exhaustion — Tier 2 evidence (pool metrics at max during failures), Tier 3 (failures correlate with traffic spikes). Rebuttal: "Pool recovers in 100ms but failures last 2s." Rebuttal response: "Queue backpressure adds 1.8s delay after pool recovery — confirmed with Tier 2 log analysis."
>
> **Hypothesis 2:** DNS resolution timeout — Eliminated. Tier 2 evidence (DNS cache hit rate 99.7%, no DNS errors in failure window).
>
> **Hypothesis 3:** Upstream service degradation — Eliminated. Tier 2 evidence (upstream p99 stable at 45ms during failure window).
>
> **Convergence:** YES at round 3. Three Tier 2 items point to pool + backpressure interaction.
>
> **Fix:** Increase pool size from 10 to 25, add backpressure shedding at 80% capacity.

### Bad Trace

> "The API is probably failing because of a race condition. Try adding a mutex."
>
> Problems: single guess (no competing hypotheses), no evidence ranking, no rebuttal, no falsification, "probably" with no tier classification. This is standard debugging, not a trace.

## Escalation and Stop Conditions

- **Maximum 5 rounds** of the full evidence-gathering + rebuttal cycle
- If no convergence after 5 rounds, produce a structured report:
  1. Narrowed scope (what area of the codebase the bug lives in)
  2. Best hypothesis with current evidence and confidence level
  3. Eliminated hypotheses (value: prevents re-investigation)
  4. Remaining unknowns and recommended next probes
  5. Handoff information for the next debugging session
- This is a dignified exit, not a failure — narrowing from "bug somewhere" to "bug in this subsystem, probably this mechanism" is real progress

## Final Checklist

Before declaring a trace complete, verify:

- [ ] Observation stated precisely before any interpretation
- [ ] 3+ hypotheses generated with deliberately different frames
- [ ] All evidence classified by tier (1-6)
- [ ] Rebuttal round completed for the leading hypothesis
- [ ] Leading hypothesis survived with Tier 1-3 evidence
- [ ] Falsification attempted — actively tried to disprove the conclusion
- [ ] Convergence criteria met (3+ items at Tier 1-3, same direction)
- [ ] Fix is minimal and targets the confirmed root cause
- [ ] State file cleaned up (deleted on success, preserved on escalation)
- [ ] Similar issues checked in related code
