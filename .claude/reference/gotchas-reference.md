# Known Gotchas — Full Reference

> Moved from project-intel.md to reduce context size. Top gotchas remain in intel.
> See project-intel.md § Known Gotchas for the most critical ones.

## Desktop App

1. **Electrobun PATH limited** — augment with mise shims, homebrew, .local/bin
2. **Tailwind v4 arbitrary values** — `translate-x-[22px]` doesn't generate; use inline styles
3. **Podman container names persist** — use `podman inspect` to detect + reuse running containers
4. **npm install blocks event loop** — must use spawn (async), not execFileSync
5. **Double response crash** — never call `waitForReady(res)` after already sending `res.json()`
6. **Bedrock inference profiles** — use `us.anthropic.*` prefix, not raw model IDs
7. **AI SDK streamText swallows errors** — use `generateText()` for testing/validation
8. **BrowserPanel port scanning** — `initialUrl` must take priority over auto-scan
9. **SSE done event race** — useSSE resets `done=false` when sseSessionId changes; direct EventSource in onProjectCreated bypasses this
10. **Default to npm** — bun not globally available via mise in Electrobun bundles
11. **`--dangerously-skip-permissions`** — on all 4 Claude spawn locations
12. **Template `--openssl-legacy-provider`** — needed for older React/Vue templates
13. **findDistDir()** — check `../views/ui` first for Electrobun bundle path
14. **Container reuse** — `podman inspect` before create; reattach log follower if running
15. **Sidebar delete hang** — reset activeProjectPath + activeId when removing last project
16. **Clean Electrobun build** — `rm -rf dist/ build/` to avoid stale cache
17. **autoStartAndPreview on every click** — not just expand; handles "already running" gracefully
18. **macOS container HMR** — volume mounts don't propagate inotify; need CHOKIDAR_USEPOLLING=true
19. **--continue session mismatch** — fails if another session ran in same cwd; auto-retries as new session
20. **Base64 image upload** — chunked 8KB batches; `btoa(String.fromCharCode(...arr))` crashes on >16KB
21. **Pending message dedup** — filter pendingMessages against session.messages to prevent doubles
22. **Focus trap selector** — must exclude `:disabled` elements or focus gets stuck on disabled buttons
23. **DevServerLogs reconnect** — don't clear logs on reconnect; SSE replay event handles buffer replay

## claude-mem

24. **claude-mem worker port 37777** — hardcoded in 6 locations; change requires coordinated update
25. **claude-mem hooks merge** — deep merge by command dedup; Stop hook was missing on first installs
26. **claude-mem stats nested** — worker returns `{ database: { observations, sessions, size } }`, not flat
27. **Toast system** — `useToast()` from `Toast.tsx`; provider wraps App in `ToastProvider`; auto-dismiss after 3s (loading toasts persist)

## CLI Providers

28. **Copilot CLI binary vs wrapper** — standalone `copilot` binary OR `gh copilot` wrapper (auto-downloads on first use); detect both in install.sh
29. **Copilot auth** — requires GitHub Copilot subscription; token precedence: `COPILOT_GITHUB_TOKEN` > `GH_TOKEN` > `GITHUB_TOKEN`
30. **Provider addition checklist** — 11 files across 3 layers: dispatch.sh, install.sh (4 locations), adapter, providers.json, Providers.tsx, settings.ts, init.md, build.md, orchestration.md, CLAUDE.md, project-intel.md

## Overseer

31. **Planning agents must run in PROJECT_ROOT** — not worktrees; `.overseer/` artifacts need to be in project root for parsing
32. **Spawner must call assignTask()** — without it, `branch_name` stays null and merge enqueue fails
33. **Nested Claude sessions** — must unset both `CLAUDECODE=''` AND `CLAUDE_CODE_ENTRYPOINT=''` or child sessions block
34. **Stories/tasks parsing** — PM/PjM may fail to write valid JSON; fallback story/task generation prevents pipeline stall
35. **Merge order** — follows DAG dependencies; tasks with failed deps get marked blocked→failed automatically
36. **Vault backward compatible** — old `.overseer/` directories still work. Vault structure only generated on new epics.

## Fleet

37. **Docker volume mounts on macOS** — `/tmp` is `/private/tmp`, not accessible to Docker; use `~/` paths instead
38. **`--dangerously-skip-permissions` as root** — Claude Code blocks this flag when running as root; Dockerfile must use non-root `fleet` user
39. **Container record uniqueness** — container DB IDs include timestamp to prevent UNIQUE constraint failures across runs
40. **Bedrock in containers** — `AWS_PROFILE` alone insufficient; extract temp credentials via `aws configure export-credentials --format env` and inject `AWS_ACCESS_KEY_ID` + `AWS_SECRET_ACCESS_KEY` + `AWS_SESSION_TOKEN`
41. **Browser-auth CLIs** — Kiro (`kiro auth`) and Amp (`amp login`) use browser OAuth; cannot run in non-persistent containers; fleet dispatches these locally via `spawn()` instead
42. **Env-file cleanup** — credentials written to temp file for `--env-file`, deleted 5s after container start
43. **Container home dir** — `--user` flag matches host UID/GID for project writes; temp home dir created per container; macOS Docker doesn't support tmpfs uid option
44. **Bedrock API keys** — use `AWS_BEARER_TOKEN_BEDROCK=ABSK...` env var (not `ANTHROPIC_API_KEY`); Claude Code uses this to skip IAM credential resolution
45. **--superpowers brainstorming skip** — brainstorming skill has HARD-GATE that blocks without user approval; fleet uses direct planning prompt
46. **--from-csv replaces all accounts** — CSV is source of truth; workers auto-set to key count
47. **Project-scoped status** — `fleet --live` and `--status` filter by cwd; `--all` flag for global view
48. **cmux stderr suppression** — cmux binary writes `Error: Unknown command` to stderr; bridge.ts uses `stdio: ["ignore", "pipe", "ignore"]`
49. **Warm container liveness** — `hasWarmContainer()` runs `docker inspect` before each `execInWarm()`. Falls back to cold `run()` if dead.
50. **Warm container SIGINT** — `stopAll()` matches `name=fleet-` which catches both cold and warm containers
51. **Task budget vs micro-steps** — Old micro-step plans use legacy batch detection (grouped by 5). New full-cycle plans get 1:1 batching.
52. **--decompose with --superpowers** — `--decompose` flag is only consumed when `--superpowers` is present
53. **Completion queue ordering** — Single-threaded JS event loop guarantees no race in `waitForAnyCompletion()`
54. **Intel truncation** — truncated at last `\n## ` boundary before 8KB. Falls back to hard 8KB if no section boundary found after 2KB.
55. **`settings-fleet.json` generated per-run** — `prepareFleetConfig()` writes to the run's output dir. Cold + warm containers share same settings via `getConfigMounts()`.
56. **Skills mount priority** — `~/.claude/skills/` takes priority over superpowers from plugin cache
57. **`run()` uses `getConfigMounts()`** — cold container config mounts deduplicated into shared function
58. **Codebase-patterns.md injection** — truncated at 4KB, injected into superpowers planning prompts only (not pool/pipeline/scatter)

## System / MCP

59. **Orchestration MCP must be in settings.json** — Server at `~/.claude/orchestration/server.js` only works if `mcpServers.orchestration` exists in `settings.json`
60. **Fleet full plugin parity** — containers mount `~/.claude/plugins/` + `settings.json`
61. **Language rules must be COPIED not symlinked** — symlinks use absolute host paths that break inside fleet containers. `lib/lang-detect.sh` uses `\cp -f` always.
62. **`local` keyword in install.sh** — only works inside bash functions, not top-level if/else blocks
63. **Language rules are project-scoped** — staged in `~/.claude/lang-staging/`, activated per-project via `project-init.sh`
64. **UI/UX Pro Max install** — marketplace plugin via `claude plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill`
65. **MCP server readFileSync blocked** — Claude Code sandboxes MCP processes; use `execFileSync('cat', [path])` to bypass
66. **Duplicate superpowers plugin** — keep only `superpowers@claude-plugins-official`, not both
67. **Plugin cache temp_git dirs** — safe to clean with `rm -rf ~/.claude/plugins/cache/temp_git_*`
68. **Agent filename typos** — files must be `{name}.md` exactly; typos propagate on update
