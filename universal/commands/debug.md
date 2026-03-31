---
name: debug
description: Multi-Agent Debugger
category: workflow
complexity: complex
triggers: [debug]
---

# Multi-Agent Debugger

You are diagnosing and fixing an issue using multi-agent investigation. The user's problem:

$ARGUMENTS

## Context Preservation

Before starting, check for an existing checkpoint: `cat .claude/scratch/task-state.md 2>/dev/null`
- **If it exists**: You may be resuming after compaction. Read it to recover your state. Say "Resuming from checkpoint — [phase], [next action]" and continue from where you left off.
- **If not**: Fresh start. Create the checkpoint directory: `mkdir -p .claude/scratch`

**Checkpoint at every phase transition** by writing to `.claude/scratch/task-state.md`. This file survives compaction.
**Delete the checkpoint** when the task is fully delivered: `rm -f .claude/scratch/task-state.md`

## Phase 1: Investigate (parallel agents)

If the **superpowers systematic-debugging** skill is installed, activate it for structured 4-phase debugging methodology. Otherwise, proceed with the standard investigation below.

### Agent 1: Error Analysis
- Parse the error message/stack trace
- Identify the exact file, line, and function
- Trace the call chain
- Use **serena** for semantic code navigation if the call chain crosses unfamiliar modules

### Agent 2: Context Gathering
- Read the failing code and its dependencies
- Check recent git changes (`git log --oneline -10`, `git diff HEAD~3`)
- Look for related test failures

### Agent 3: Documentation Check
- If the error involves a library/SDK, use context7 to fetch current docs
- Check if the API usage matches the expected signature
- Look for known issues or breaking changes

## Phase 2: Diagnose

Use the **sequential-thinking skill** to structure root cause analysis — especially for complex bugs with multiple suspects:

```bash
cd ~/.claude/skills/sequential-thinking && bun scripts/think.ts --reset
# Thought 1: Synthesize investigation findings
# Thought 2: Form hypotheses (branch for competing theories)
# Thought 3+: Test each hypothesis against evidence, revise as needed
# Final thought: Confirmed root cause with evidence
```

- **Branch** to explore competing root causes (e.g., `--branchFromThought 2 --branchId "race-condition"` vs `--branchId "state-mutation"`)
- **Revise** when evidence disproves a hypothesis (`--isRevision --revisesThought N`)
- **Extend** when the bug goes deeper than expected (`--needsMoreThoughts`)
- Terminate only when root cause is confirmed with evidence — not speculation

**Auto-escalation to trace skill** (after 2 failed hypotheses):
If sequential-thinking produces 2 hypotheses that are disproven by evidence:
1. Print: "Standard debugging failed after 2 hypotheses. Escalating to multi-hypothesis trace."
2. Pass current investigation context (evidence gathered, hypotheses tried, what disproved them) to the `/trace` skill
3. The trace skill takes over with: 3+ parallel hypotheses, 6-tier evidence ranking, rebuttal rounds, convergence detection
4. Trace results feed back into Phase 3 (Fix) with a confirmed root cause

This replaces spinning on more sequential hypotheses — the trace skill is designed for ambiguous bugs where standard approaches fail.

Synthesize findings:
- Root cause identification
- Contributing factors
- Why it worked before (if regression)

## Phase 3: Fix
- Implement the fix with minimal changes
- Use **superpowers TDD** skill if available: write a failing test that reproduces the bug first, then fix, then verify green. If unavailable, follow standard TDD approach.
- Use **superpowers verification** if available to produce evidence the fix works
**PUA escalation triggers** (formalized):
- **2 failed fix attempts**: Invoke `/trace` skill if not already active — multi-hypothesis evidence-ranked debugging with 6-tier evidence hierarchy and rebuttal rounds
- **3 failed fix attempts**: Mandatory 7-point checklist — read signals word by word, search the core problem, read 50 lines of context around failure, verify all assumptions with tools, try the opposite hypothesis, isolate/reproduce in minimal scope, switch tools/methods/angles entirely
- **4 failed fix attempts**: Fundamentally different approach required — different tools, different abstraction level, different angle of attack. If still stuck after this, provide structured failure report: verified facts, eliminated possibilities, narrowed problem scope, recommended next directions for handoff
- Run build + tests to verify

## Phase 4: Update Cached Intel

If the fix changed any files that affect the project intel, update it incrementally:

1. Run `git diff --name-only` to see what changed.
2. Map changed files to intel sections:
   - API/handler files → **API Surface**
   - Model/type files → **Data Models**
   - Package files → **Dependencies**
   - Infra/CDK files → **AWS Services**
   - Test files → **Test Infrastructure**
   - Architecture changes → **Architecture** + **Directory Map**
3. Read only affected sections from `.claude/rules/project-intel.md` + changed source files.
4. Patch affected sections. Update the date line. Keep under 300 lines.
5. Append to `.claude/rules/.intel-changelog`:
   ```
   [timestamp] | debug | [bug summary] | Sections updated: [list] | Files changed: [count]
   ```
6. If no intel file exists, skip (debugging doesn't trigger full re-scan).

**This step is lightweight — only runs if files were actually changed by the fix.**

## Phase 5: Report
```
## Debug Report
### Problem
[One sentence description]

### Root Cause
[What actually went wrong and why]

### Fix Applied
[Files changed and what was done]

### Verification
[Build/test results]

### Intel Updated
[Which sections were patched, or "No intel changes needed"]

### Prevention
[How to prevent this class of bug in the future]
```
