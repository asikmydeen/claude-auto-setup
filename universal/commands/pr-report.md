---
name: pr-report
description: Maintainer-grade PR review report with tutorial explanations
category: review
complexity: complex
triggers: [pr-report]
---

# PR Review Report Generator

Generate a maintainer-grade pull request review report with tutorial-style explanations, architectural analysis, and actionable recommendations.

## Target
$ARGUMENTS

If no target specified, review the current branch against the base branch.

## Methodology

Follow this 7-step review process (adapted from Paperclip's pr-report skill):

### Step 1: Acquire and Frame
- Work from local code (git diff against base branch)
- Gather repo docs (README, CLAUDE.md, CONTRIBUTING.md)
- Understand contributor intent from PR title, description, commit messages
- Identify: Is this a feature, fix, refactor, or infrastructure change?

### Step 2: Build Mental Model
- Reconstruct the design by tracing the lifecycle:
  - Install → Startup → Execution → UI rendering → Error/edge cases
- Map which files changed and why
- Identify the core abstraction being introduced or modified

### Step 3: Review Like a Maintainer
Order findings by severity (most impactful first):
1. **Behavioral regressions** — Does this break existing functionality?
2. **Trust/security gaps** — Are there unsafe assumptions?
3. **Misleading abstractions** — Do names/interfaces match behavior?
4. **Coupling concerns** — Does this create unwanted dependencies?
5. **Test coverage** — Are critical paths tested?
6. **Style/convention** — Does it match existing patterns?

### Step 4: Distinguish Objection Types
Separate clearly:
- **Product direction** — "Should we build this?" (defer to PM/user)
- **Architecture** — "Is this the right design?" (your domain)
- **Implementation** — "Is this code correct?" (your domain)

### Step 5: Compare to Precedents
- How do similar open-source systems handle this?
- What are the extension boundaries?
- How is context passed between components?
- What's the trust model?

### Step 6: Make Actionable Recommendation
One of:
- **Merge as-is** — No blocking issues
- **Merge after fixes** — List specific changes needed
- **Merge after redesign** — Fundamental approach needs rethinking
- **Salvage pieces** — Some parts are good, others need rewrite
- **Keep as research** — Good exploration, not ready for production

### Step 7: Build the Report Artifact

## Output Format

Generate a report in this structure:

```markdown
# PR Review Report: [PR Title]

## Executive Summary
One paragraph: what this PR does, overall quality assessment, recommendation.

## Tutorial: What This Change Does
Walk through the change as if explaining to a new team member.
Use numbered steps following the data/control flow.

## Strengths
- Bullet points of things done well
- Patterns followed correctly
- Good test coverage areas

## Findings

### Critical (Must Fix)
| # | File | Line | Issue | Suggestion |
|---|------|------|-------|------------|

### Important (Should Fix)
| # | File | Line | Issue | Suggestion |
|---|------|------|-------|------------|

### Minor (Consider)
| # | File | Line | Issue | Suggestion |
|---|------|------|-------|------------|

## Architectural Analysis
- Design pattern assessment
- Coupling/cohesion evaluation
- Extension point quality
- Consistency with existing codebase

## Test Coverage Assessment
- What's tested
- What's not tested (and should be)
- Edge cases missed

## Recommendation
**[Merge as-is | Merge after fixes | Merge after redesign | Salvage pieces | Keep as research]**

Rationale: [1-2 sentences]

### Required Changes (if applicable)
1. Numbered list of specific changes needed

### Suggested Improvements (non-blocking)
1. Numbered list of nice-to-have improvements
```

## Execution

1. Run `git log --oneline $(git merge-base HEAD main)..HEAD` to see all commits
2. Run `git diff $(git merge-base HEAD main)..HEAD --stat` for changed files overview
3. Run `git diff $(git merge-base HEAD main)..HEAD` for full diff
4. Read each changed file to understand the full context (not just the diff)
5. Generate the report following the format above
6. Save to `tmp/reports/pr-review-$(date +%Y%m%d-%H%M%S).md`

## Review Heuristics for Plugin/Platform Work
- Watch for docs claiming sandboxing while runtime executes trusted processes
- Detect module-global state hiding React context
- Check for hidden render-order dependencies
- Ensure plugins use explicit APIs, not internal host internals
- Verify capabilities are actual capabilities, not just policy labels
