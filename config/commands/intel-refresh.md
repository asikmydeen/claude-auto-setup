# Targeted Intel Refresh

Refresh specific sections of the cached project intelligence without a full re-scan.

## Target
$ARGUMENTS

If no target specified, auto-detect which sections are stale by comparing git changes since the last update.

## How It Works

### 1. Detect What's Stale

**If the user specified sections** (e.g., `/intel-refresh api-surface data-models`):
- Refresh only those sections.

**If no sections specified** (auto-detect mode):
1. Read the date from `.claude/rules/project-intel.md` line 2 (the "Last incremental update" date).
2. Run `git log --since="[that date]" --name-only --pretty=format:""` to get all files changed since last update.
3. Map changed files to affected sections using this routing:

| Changed files match | Section to refresh |
|---|---|
| `src/api/*`, `src/handlers/*`, `src/routes/*`, `*Controller*`, `*handler*` | API Surface |
| `src/models/*`, `src/types/*`, `*schema*`, `*.interface.*`, `*dto*` | Data Models |
| `package.json`, `requirements.txt`, `Cargo.toml`, `packageInfo` | Dependencies |
| `cdk/*`, `infra/*`, `template.yaml`, `serverless.yml`, `*stack*` | AWS Services |
| `src/components/*`, `src/pages/*`, `src/views/*` | Architecture |
| New directories, major restructuring | Architecture + Directory Map |
| `*.test.*`, `*.spec.*`, `jest.config.*` | Test Infrastructure |
| `README*`, `docs/*` | Domain Map |
| Critical path files (from intel) | Critical Paths |

4. If no files changed since last update: Print "Intel is current. No refresh needed." and exit.

### 2. Refresh Affected Sections

For EACH affected section, launch a focused exploration agent:
- Read the current section content from project-intel.md
- Read the changed source files relevant to that section
- Generate an updated section that reflects the current state
- The agent ONLY outputs the new section content — nothing else

**Parallelize**: If multiple sections need refreshing, launch agents for each in parallel.

### 3. Patch the Intel File

1. Read the full project-intel.md
2. Replace only the affected sections with new content
3. Update the date: `Last incremental update: [today]`
4. Verify total file stays under 300 lines. If it exceeds, trim less critical details.
5. Write the patched file.

### 4. Log the Refresh

Append to `.claude/rules/.intel-changelog`:
```
[timestamp] | intel-refresh | [auto-detect / manual: sections] | Sections updated: [list] | Files analyzed: [count]
```

### 5. Report

```
## Intel Refresh Complete
- Sections updated: [list]
- Files analyzed: [count]
- Intel file: [line count] lines
- Changelog entries: [total count]
```

## Valid Section Names (for manual targeting)

- `quick-reference`
- `architecture`
- `directory-map`
- `api-surface`
- `data-models`
- `aws-services`
- `dependencies`
- `patterns` (Code Patterns & Conventions)
- `test-infra` (Test Infrastructure)
- `domain-map`
- `critical-paths`
- `gotchas` (Known Gotchas)
- `all` (full re-scan — equivalent to `/deep-research`)
