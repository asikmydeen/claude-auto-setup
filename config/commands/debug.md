# Multi-Agent Debugger

You are diagnosing and fixing an issue using multi-agent investigation. The user's problem:

$ARGUMENTS

## Phase 1: Investigate (parallel agents)

### Agent 1: Error Analysis
- Parse the error message/stack trace
- Identify the exact file, line, and function
- Trace the call chain

### Agent 2: Context Gathering
- Read the failing code and its dependencies
- Check recent git changes (`git log --oneline -10`, `git diff HEAD~3`)
- Look for related test failures

### Agent 3: Documentation Check
- If the error involves a library/SDK, use context7 to fetch current docs
- Check if the API usage matches the expected signature
- Look for known issues or breaking changes

## Phase 2: Diagnose
Synthesize findings:
- Root cause identification
- Contributing factors
- Why it worked before (if regression)

## Phase 3: Fix
- Implement the fix with minimal changes
- Add or update tests to cover the failure case
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
