# Community Integrations — Design Spec

> **Date**: 2026-03-21
> **Approach**: Hybrid — plugin where designed, vendor where selective
> **Status**: Approved

---

## Summary

Integrate 5 community GitHub repos into claude-auto-setup using a selective best-of approach. Each repo is integrated the way that fits its nature: marketplace plugin, vendored rules, new command, or code change.

| Repo | Integration Type | Key Value |
|------|-----------------|-----------|
| `nextlevelbuilder/ui-ux-pro-max-skill` | Marketplace plugin | Design system intelligence (161 rules, 67 UI styles) |
| `affaan-m/everything-claude-code` | Vendored (cherry-pick) | 10 language rule sets, build-error-resolver agent, security-scan command |
| `hesreallyhim/awesome-claude-code` | New `/discover` command | Community tool discovery catalog |
| `kepano/kepano-obsidian` | Code change | Vault structure for overseer board generation |
| `hkuds/lightrag` | Skipped | claude-mem + project-intel.md sufficient |

---

## 1. ui-ux-pro-max-skill (Plugin)

**Install**: `claude plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill`

**Integration points**:
- `adapter.sh`: Add to 16-plugin install loop
- `settings.json`: Add to `enabledPlugins` as `"ui-ux-pro-max@nextlevelbuilder": true`
- `fleet/container.ts`: Mount `~/.claude/plugins/` into containers (currently missing — fixes gap for ALL plugins)
- `fleet/container.ts`: Mount `~/.claude/settings.json` read-only (carries plugin activation into containers)
- Desktop app project creation: Enhanced build prompt references the skill for design system generation
- Native agents (`frontend-developer`, `react-specialist`): Updated to leverage skill when available

**Fleet mount additions** (in `getConfigMounts()`):
```typescript
[join(claudeDir, "plugins"), join(fleetUser, ".claude", "plugins")]
[join(claudeDir, "settings.json"), join(fleetUser, ".claude", "settings.json")]
```

---

## 2. Language-Specific Rules (Vendored)

**Source**: `affaan-m/everything-claude-code` language rule directories
**Target**: `universal/rules/lang/lang-{language}.md` (10 files)

### Languages
TypeScript, Python, Go, Rust, Swift, PHP, Java, Kotlin, C++, Perl

### Each file contains
- Coding standards for that language
- Testing patterns (framework conventions, assertion style)
- Security guidelines (language-specific OWASP patterns)
- Common anti-patterns to avoid
- Import/module conventions

### Auto-detection (`lib/lang-detect.sh`)
```bash
detect_project_languages() {
  local dir="${1:-.}"
  local langs=""
  [ -f "$dir/tsconfig.json" ] || [ -f "$dir/package.json" ] && langs="$langs typescript"
  [ -f "$dir/requirements.txt" ] || [ -f "$dir/pyproject.toml" ] && langs="$langs python"
  [ -f "$dir/go.mod" ] && langs="$langs go"
  [ -f "$dir/Cargo.toml" ] && langs="$langs rust"
  [ -f "$dir/Package.swift" ] && langs="$langs swift"
  [ -f "$dir/composer.json" ] && langs="$langs php"
  [ -f "$dir/pom.xml" ] || [ -f "$dir/build.gradle" ] && langs="$langs java"
  [ -f "$dir/build.gradle.kts" ] && langs="$langs kotlin"
  [ -f "$dir/CMakeLists.txt" ] && langs="$langs cpp"
  ls "$dir"/*.pl &>/dev/null 2>&1 && langs="$langs perl"
  echo "$langs"
}
```

### Activation flow (project-scoped, NOT global)
1. `install.sh` → all 10 files live in `universal/rules/lang/` (our repo)
2. `adapter.sh` → copies to `~/.claude/rules/lang/` (staging area)
3. `project-init.sh` / `/init` → detects languages, symlinks matching rules into `.claude/rules/`
4. Only symlinked rules load in that project's sessions

### Fleet containers
Language rules are in the project's `.claude/rules/` via symlinks. Fleet mounts the project directory read-write. Works automatically.

---

## 3. Build-Error-Resolver Agent

**File**: `agents/claude-code/agents/build-error-resolver.md`

```yaml
name: build-error-resolver
description: Resolves build, compilation, and bundler errors
tools: Read, Edit, Bash, Grep, Glob, Write
model: sonnet
memory: user
maxTurns: 20
```

**Behavior**:
1. Parse build output — extract error type, file, line, message
2. Categorize: dependency, type error, import, config, bundler
3. Read failing file + 50 lines of context
4. Check project-intel.md for build system details
5. Fix root cause (no `@ts-ignore`, no suppressions)
6. Re-run build to verify
7. If still failing: sequential-thinking for alternative hypotheses
8. Report: what broke, why, what was fixed

**Referenced in**: `orchestration.md` Step 7 (Build Failure) — spawn this agent instead of manual debugging.

---

## 4. Security-Scan Command

**File**: `universal/commands/security-scan.md`

```yaml
name: security-scan
description: Run comprehensive security audit on codebase
category: quality
complexity: medium
triggers: [security-scan, audit-security, owasp-check]
```

**Behavior**:
1. Detect project type (from linked language rules)
2. Run language-specific checks: `npm audit`, `pip audit`, `cargo audit`, etc.
3. Spawn security-auditor agent for OWASP code review
4. Check for hardcoded secrets (regex: API keys, tokens, passwords)
5. Review IAM/permissions if AWS project
6. Output structured report with severity levels (Critical/High/Medium/Low)

---

## 5. `/discover` Command

**File**: `universal/commands/discover.md`

```yaml
name: discover
description: Discover community Claude Code tools, skills, and plugins
category: meta
complexity: low
triggers: [discover, community-tools, whats-new]
```

**Behavior**:
1. Fetch awesome-claude-code README via WebFetch
2. Parse entries by section (Skills, Tools, Hooks, Plugins, Orchestrators)
3. Detect what's already installed (`~/.claude/plugins/`, `~/.claude/skills/`, `command -v`)
4. Show categorized table of available-but-not-installed items
5. Highlight top 5 recommendations
6. Optional: install on user request

---

## 6. Overseer Vault Structure

**Source**: `kepano/kepano-obsidian` vault layout

**New `.overseer/` structure**:
```
.overseer/
├── board.md              # Kanban board
├── epic.md               # Epic overview
├── Daily/                # Sprint logs (one per day)
├── Stories/              # One file per story
├── Notes/                # Knowledge decisions (from knowledge.ts)
│   ├── architecture.md
│   ├── api-contracts.md
│   └── patterns.md
├── References/           # Research docs from requirements phase
│   ├── RESEARCH.md
│   └── REQUIREMENTS.md
└── Templates/            # Story/task templates
    ├── story-template.md
    └── task-template.md
```

**Changes**:
- `overseer/board.ts`: `generateBoard()` creates vault directories, Daily/ files from timeline
- `overseer/knowledge.ts`: New `exportToVault()` — writes knowledge categories to Notes/
- `overseer/overseer.ts`: Moves RESEARCH.md and REQUIREMENTS.md into References/

**Backward compatible**: Old `.overseer/` directories still work. New structure only for new epics.

---

## 7. Installation Pipeline Changes

### install.sh
New section after existing plugin installation:
- Install ui-ux-pro-max-skill via marketplace
- Report language rule count

### adapter.sh
- Add `ui-ux-pro-max` to plugin array
- Add `enabledPlugins` entry in settings template
- New block: copy `universal/rules/lang/*.md` to `~/.claude/rules/lang/`

### project-init.sh
- Source `lib/lang-detect.sh`
- Call `detect_project_languages`
- Symlink matching rules into `.claude/rules/`

### fleet/container.ts
- Add plugins/ mount to `getConfigMounts()`
- Add settings.json mount to `getConfigMounts()`

### init.md + build.md commands
- Call language detection at start

### orchestration.md rule
- Reference build-error-resolver agent in Step 7

---

## File Manifest

### New files (7)
| File | Type | Lines (est.) |
|------|------|-------------|
| `universal/rules/lang/lang-typescript.md` | Rule | ~80 |
| `universal/rules/lang/lang-python.md` | Rule | ~80 |
| `universal/rules/lang/lang-go.md` | Rule | ~70 |
| `universal/rules/lang/lang-rust.md` | Rule | ~70 |
| `universal/rules/lang/lang-swift.md` | Rule | ~60 |
| `universal/rules/lang/lang-php.md` | Rule | ~60 |
| `universal/rules/lang/lang-java.md` | Rule | ~70 |
| `universal/rules/lang/lang-kotlin.md` | Rule | ~60 |
| `universal/rules/lang/lang-cpp.md` | Rule | ~70 |
| `universal/rules/lang/lang-perl.md` | Rule | ~50 |
| `lib/lang-detect.sh` | Shell lib | ~40 |
| `agents/claude-code/agents/build-error-resolver.md` | Agent def | ~60 |
| `universal/commands/security-scan.md` | Command | ~80 |
| `universal/commands/discover.md` | Command | ~70 |

### Edited files (8)
| File | Change |
|------|--------|
| `install.sh` | Add community plugin install section |
| `agents/claude-code/adapter.sh` | Plugin array + lang rules + settings |
| `project-init.sh` | Language detection + symlinks |
| `fleet/container.ts` | plugins/ + settings.json mounts |
| `overseer/board.ts` | Vault directory structure |
| `overseer/knowledge.ts` | `exportToVault()` |
| `overseer/overseer.ts` | Move research docs to References/ |
| `universal/rules/orchestration.md` | Reference build-error-resolver |

**Total: 14 new files, 8 edited files. Zero breaking changes.**

---

## Acceptance Criteria

1. `./install.sh` installs ui-ux-pro-max-skill plugin and reports language rule count
2. `./install.sh --doctor` shows ui-ux-pro-max plugin status and language rules status
3. Running `/init` in a TypeScript project symlinks `lang-typescript.md` into `.claude/rules/`
4. Running `/init` in a Python+Go project symlinks both `lang-python.md` and `lang-go.md`
5. `/discover` fetches awesome-claude-code and shows uninstalled tools
6. `/security-scan` produces a structured severity report
7. Build-error-resolver agent can be spawned and resolves a deliberate build error
8. Fleet containers have plugins/ and settings.json mounted
9. New overseer epic generates vault-structured `.overseer/` directory
10. All existing tests pass (`make test`)
