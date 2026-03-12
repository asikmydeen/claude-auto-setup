# Changelog

## 3.1.0 (2026-03-12)

### Added
- `--doctor` flag for installation health checks (19 checks across repo, CLIs, config, MCP, cmux, deps)
- Centralized `VERSION` file — single source of truth for version string
- `CHANGELOG.md` for tracking releases

### Fixed
- All shellcheck warnings resolved across every script (SC2034 dynamic vars, SC2155 declare+assign)
- `require('fs')` crash in ESM orchestration module — use top-level import
- `--dangerously-skip-permissions` replaced with `--permission-mode bypassPermissions`
- cmux wrapper installed unconditionally (no longer gated on shell function existing)
- `.worktrees/` added to `.gitignore`

## 3.0.0 (2026-03-11)

### Added
- Shared `lib/common.sh` utility library (colors, logging, `has_cmd`)
- Test suite: `tests/run.sh` with 24 smoke tests
- `Makefile` with install, update, test, lint targets
- Dispatch fallback chain — retries next provider on failure
- cmux non-interactive wrapper (`universal/cmux-wrapper.sh`) for Node.js/MCP
- `--version` flag

### Changed
- README.md rewritten with quick-start, architecture, and full options
- `dispatch.sh` refactored: extracted `dispatch_to()`, `get_fallback_chain()`

### Removed
- Legacy `config/` directory (11,372 lines of duplication)

## 2.0.0 (2026-03-10)

### Added
- cmux integration with hook-based agent delegation
- Pipeline enforcement system (`enforce.sh`)
- MCP orchestration server (agent spawn/status/merge/remove)
- Cross-provider dispatch (`dispatch.sh`)
- Dashboard with React+Vite+Tailwind (SSE-based real-time monitoring)
- 6 agent adapters (Claude, Gemini, Kiro, Codex, Cursor, Amp)
- 52 command definitions with YAML frontmatter
- 5 native Claude Code agents (code-reviewer, debugger, test-writer, explorer, security-auditor)

## 1.0.0 (2026-03-09)

- Initial release — Claude Code only
