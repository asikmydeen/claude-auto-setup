# claude-auto-setup - Project Intelligence

> **Last updated**: 2025-03-10
> **Purpose**: Universal AI agent orchestration and configuration system
> **Auto-generated**: Via deep-research workflow (6 parallel agents)

---

## Stack

**Languages:**
- **Bash 3.2+** (primary) - Shell scripts for installation and orchestration
- **Node.js 18+** (dashboard only) - Express server for real-time monitoring
- **JSON/YAML** - Configuration and agent definitions

**Core Technologies:**
- **MCP (Model Context Protocol)** - Plugin integration
- **Server-Sent Events (SSE)** - Real-time dashboard updates
- **Agent orchestration** - Multi-agent workflow management
- **Git-based distribution** - Self-updating via `git pull`

**No build tools** - Pure shell script execution (no compilation step)

---

## Entry Points

### Primary Entry Points

1. **`install.sh`** (569 lines)
   - Main installer that auto-detects and configures 6 AI coding agents
   - Modes: `--update`, `--self-update`, `--agents=<list>`, `--force`, `--dry-run`, `--uninstall`
   - Location: `/Users/ammydeen/claude-auto-setup/install.sh`

2. **`project-init.sh`** (239 lines)
   - Per-project initializer for `.ai/` shared directory
   - Creates symlinks/copies based on detected agents
   - Location: `/Users/ammydeen/claude-auto-setup/project-init.sh`

3. **`dispatch.sh`** (241 lines)
   - Cross-provider task dispatcher
   - Routes tasks to best available AI agent based on task type
   - Location: `/Users/ammydeen/claude-auto-setup/dispatch.sh`

### Secondary Entry Points

4. **`dashboard/server.js`**
   - Express server on port 3200 for real-time agent monitoring
   - SSE-based agent state broadcasting
   - Location: `/Users/ammydeen/claude-auto-setup/dashboard/server.js`

5. **Agent adapters**
   - `agents/*/adapter.sh` - Translates universal config to agent-specific format
   - One adapter per supported agent

---

## Build/Test/Lint Commands

### Build
- **No build process** - This is a shell script project with no compilation
- Dashboard: `cd dashboard && npm install` (only if running dashboard)

### Test
- **No automated tests** - Manual testing only
- Test modes: `./install.sh --dry-run`

### Lint
- **No linter configured** - Could add `shellcheck` for bash scripts
- Manual review process

### Run
- Installation: `./install.sh`
- Project init: `./project-init.sh`
- Dispatch: `./dispatch.sh --task "prompt" --type <task-type>`
- Dashboard: `cd dashboard && npm start`

---

## Architecture Overview

### Design Pattern: **Adapter + Single Source of Truth**

```
universal/                      # Single source of truth (agent-agnostic)
├── rules/                      # 7 shared global rules
├── commands/                   # 50+ command definitions
├── intel-template.md          # Template for cached codebase intelligence
└── providers.json             # Cross-provider routing config

agents/                         # Agent-specific adapters
├── claude-code/               # Translates universal → Claude format
├── gemini-cli/                # Translates universal → Gemini format
├── kiro-cli/                  # Translates universal → Kiro format
├── codex-cli/                 # Translates universal → Codex format
├── cursor/                    # Translates universal → Cursor format
└── ampcode/                   # Translates universal → Amp format
```

### Key Architectural Principles

1. **Single source of truth** - `universal/` directory is authoritative
2. **Adapter pattern** - Each agent has an adapter script that translates universal config to agent-specific format
3. **Auto-detection** - Agents detected via `command -v <agent>`
4. **Merge don't overwrite** - Settings merged intelligently (requires python3)
5. **Graceful degradation** - Works when optional tools (python3, chokidar) unavailable
6. **Idempotent operations** - Safe to run multiple times

### Data Flow

**Installation Flow:**
```
install.sh → detect_agents() → backup() → For each agent: adapter.sh → summary()
```

**Orchestration Flow:**
```
User: /build "feature" → Classify task → Select agent team → Explore (parallel) → Plan → Implement (parallel) → Review (parallel) → Verify → Update intel
```

**Dashboard Flow:**
```
Agent work → agent-tracker.sh → report.sh → server.js → SSE → Dashboard UI
```

---

## Directory Map

```
claude-auto-setup/
├── universal/                      # Agent-agnostic shared content
│   ├── rules/                      # 7 global rule files (524 lines)
│   │   ├── code-quality.md         # TypeScript/React standards
│   │   ├── git-workflow.md         # Commit format, branch naming
│   │   ├── security.md             # OWASP Top 10, secrets
│   │   ├── testing.md              # Test-first approach
│   │   ├── aws-development.md      # AWS-specific patterns
│   │   └── orchestration.md        # Multi-agent protocol (368 lines)
│   ├── commands/                   # 50+ command definitions
│   │   ├── init.md                 # Smart project initializer (245 lines)
│   │   ├── deep-research.md        # 6-agent parallel analysis (185 lines)
│   │   ├── build.md                # Multi-agent feature implementation
│   │   ├── coordinator.md          # Coordinator role
│   │   ├── [7 role commands]
│   │   └── [37 specialist commands]
│   ├── intel-template.md           # Template for project-intel.md
│   └── providers.json              # Cross-provider routing config
│
├── agents/                         # Agent-specific adapters
│   ├── claude-code/
│   │   ├── adapter.sh              # Install/uninstall logic
│   │   ├── CLAUDE.md               # Global rules + auto-role
│   │   ├── settings.json           # Plugins, permissions, hooks
│   │   └── agents/                 # 5 native agent definitions
│   ├── gemini-cli/
│   │   ├── adapter.sh
│   │   └── GEMINI.md
│   ├── kiro-cli/
│   │   ├── adapter.sh
│   │   └── KIRO.md
│   ├── codex-cli/
│   │   ├── adapter.sh
│   │   └── AGENTS.md
│   ├── cursor/
│   │   ├── adapter.sh
│   │   └── .cursorrules
│   └── ampcode/
│       ├── adapter.sh
│       └── SKILLS.md
│
├── dashboard/                      # Real-time monitoring dashboard
│   ├── server.js                   # Express server + SSE
│   ├── package.json                # express, chokidar
│   ├── public/index.html           # Dashboard UI (vanilla JS)
│   ├── install-service.sh          # System service installer
│   └── report.sh                   # Agent state reporter (68 lines)
│
├── config/                         # Legacy/config backup (duplicate of universal/)
│   ├── commands/                   # 50+ command files
│   └── CLAUDE.md
│
├── install.sh                      # Main installer (569 lines)
├── project-init.sh                 # Per-project initializer (239 lines)
├── dispatch.sh                     # Cross-provider dispatcher (241 lines)
├── README.md                       # Project overview
├── ANALYSIS.md                     # Architecture and roadmap (286 lines)
└── firebase-debug.log              # Firebase debug output
```

---

## API Surface

### Shell Script APIs

**install.sh:**
```bash
./install.sh                    # Fresh install (auto-detect)
./install.sh --update           # Update commands/rules only
./install.sh --self-update      # Git pull + update
./install.sh --agents=claude,gemini  # Specific agents
./install.sh --force            # Full overwrite
./install.sh --dry-run          # Preview changes
./install.sh --uninstall        # Remove all config
```

**project-init.sh:**
```bash
./project-init.sh               # Create .ai/ directory with shared config
```

**dispatch.sh:**
```bash
./dispatch.sh --task "prompt" --type test-writing
./dispatch.sh --list-providers
./dispatch.sh --list-routes
```

### Dashboard HTTP API

**GET /** - Dashboard UI

**GET /events** - SSE endpoint for real-time updates

**POST /report** - Agent state reporting
- Body: `{ sessionId, agentId, status, message, progress, totalProgress, logs }`

**GET /api/sessions** - List all sessions

**GET /api/sessions/:sessionId** - Get session details

**POST /api/sessions/:sessionId/steering** - Inject steering command

### Adapter Script API

Each `adapter.sh` must support:
```bash
bash adapter.sh install          # Install config
bash adapter.sh uninstall        # Remove config
```

---

## Data Models

### Provider Configuration (providers.json)
```json
{
  "providers": {
    "claude": {
      "cli": "claude",
      "non_interactive": "claude -p \"{prompt}\" --output-format text --allowedTools \"{tools}\"",
      "strengths": ["complex-reasoning", "planning", "debugging", "security"],
      "context_window": "200k",
      "cost": "high",
      "speed": "medium"
    }
  },
  "task_routing": {
    "planning": ["claude", "gemini", "amp"],
    "test-writing": ["codex", "claude", "gemini"],
    "code-review": ["amp", "claude"]
  }
}
```

### Agent State (Dashboard)
```json
{
  "sessionId": "string",
  "agents": {
    "agentId": {
      "id": "string",
      "role": "string",
      "task": "string",
      "status": "exploring|implementing|reviewing|done|error|idle",
      "progress": 1,
      "totalProgress": 5,
      "logs": ["log entries"]
    }
  }
}
```

### Settings Structure (Claude)
```json
{
  "enabledPlugins": {
    "typescript-lsp": true,
    "context7": true,
    "serena": true
  },
  "permissions": {
    "allow": ["Read", "Write", "Edit", "Bash"],
    "deny": ["Read:.env", "Read:.aws/credentials"]
  },
  "hooks": {
    "tool_use": {
      "command": "npm run lint",
      "run_on": ["Write", "Edit"]
    }
  }
}
```

---

## AWS Services

**None** - This project does not use AWS services directly.

Note: Firebase integration exists (`firebase-debug.log`), possibly for dashboard authentication or monitoring, but not core functionality.

---

## Dependencies

### External Dependencies (Minimal)

**Node.js** (dashboard only):
- `express` ^4.21.0 - Web server
- `chokidar` ^4.0.0 - File watcher

**Python 3** (optional):
- JSON manipulation in adapter scripts
- Fallback logic when unavailable

**Bash 3.2+**:
- Primary runtime for all scripts
- POSIX-compliant for macOS compatibility

### AI Provider Dependencies (Optional)

The project integrates with but does NOT depend on:
- **Claude Code** (Anthropic) - `claude` CLI
- **Gemini CLI** (Google) - `gemini` CLI
- **Codex CLI** (OpenAI) - `codex` CLI
- **Cursor** (Anysphere) - `cursor` CLI or directory check
- **Kiro CLI** (AWS) - `kiro` CLI
- **Amp Code** (Sourcegraph) - `amp` CLI

All are optional - installer detects and configures only what's available.

### Internal Module Structure

**Core modules:**
- 7 universal rules (524 lines)
- 50+ command definitions
- 6 agent adapters
- Dashboard (server + UI)
- Dispatch system

---

## Code Patterns

### Shell Script Patterns

**Strict Mode:**
```bash
#!/usr/bin/env bash
set -euo pipefail
```

**Directory Resolution:**
```bash
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
```

**Colored Logging (Conditional):**
```bash
if [ -t 1 ] && command -v tput &>/dev/null; then
  RED=$(tput setaf 1); GREEN=$(tput setaf 2); YELLOW=$(tput setaf 3)
  CYAN=$(tput setaf 6); DIM=$(tput dim); BOLD=$(tput bold); RESET=$(tput sgr0)
fi

info()  { echo "${BLUE}[INFO]${RESET}  $*"; }
ok()    { echo "${GREEN}[OK]${RESET}    $*"; }
warn()  { echo "${YELLOW}[WARN]${RESET}  $*"; }
error() { echo "${RED}[ERROR]${RESET} $*" >&2; }
step()  { echo ""; echo "${BOLD}${CYAN}==> $*${RESET}"; }
```

**Adapter Pattern:**
```bash
install() {
  echo "  Installing [Agent Name] configuration..."
  # Create directories
  # Install commands/rules
  # Merge settings (don't overwrite)
  # Install plugins
}

uninstall() {
  echo "  Uninstalling [Agent Name] configuration..."
  # Remove config
}

"$@"  # Execute function passed as argument
```

**Error Handling:**
```bash
command -v claude &>/dev/null && echo "found" || echo "not found"
[ -f "$FILE" ] && rm "$FILE" && echo "removed" || true
```

**Settings Merging (Python fallback):**
```bash
if command -v python3 &>/dev/null; then
  python3 -c "import json; ..."
fi
```

### Node.js Patterns

**Express Server:**
```javascript
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
```

**Safe JSON Reading:**
```javascript
function readJsonSafe(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch {
    return null;
  }
}
```

**Graceful Shutdown:**
```javascript
process.on("SIGTERM", () => {
  server.close();
  process.exit(0);
});
```

### Naming Conventions

- **Shell variables**: UPPERCASE for constants, lowercase for locals
- **Functions**: snake_case in bash, camelCase in JavaScript
- **Files**: kebab-case for scripts
- **Directories**: lowercase with hyphens

---

## Test Infrastructure

**Current State: No automated tests**

- No test files found
- No test framework configured
- Manual testing via `--dry-run` mode

**Testing Approach:**
1. Manual testing of installer on different OS platforms
2. Live testing with actual AI agents
3. Dashboard testing by running server.js

**Recommendation:**
- Add `shellcheck` for bash script linting
- Add unit tests for adapter scripts
- Add integration tests for full installation flow

---

## Domain Map

### Core Domains

1. **Agent Configuration**
   - Universal rules shared across all agents
   - Agent-specific adapters
   - Settings merging and preservation

2. **Multi-Agent Orchestration**
   - Task classification (small/medium/large)
   - Agent team selection
   - Cross-provider dispatch
   - Workflow phases (explore, plan, implement, review, verify)

3. **Codebase Intelligence**
   - Cached project knowledge (project-intel.md)
   - Incremental updates
   - Context preservation (checkpoint system)
   - Workspace detection (monorepo support)

4. **Monitoring & Observability**
   - Real-time dashboard (SSE-based)
   - Agent state tracking
   - Progress reporting
   - Steering command injection

5. **Command & Rule Management**
   - 50+ slash commands
   - 7 global rules
   - Role-based access
   - Plugin system

### Key Concepts

- **Universal format**: Agent-agnostic rules/commands in `universal/`
- **Adapter pattern**: Translation layer to agent-specific formats
- **Single source of truth**: `universal/` directory
- **Auto-detection**: No manual configuration required
- **Graceful degradation**: Works with partial dependencies
- **Cross-provider routing**: Tasks routed to best available AI

---

## Critical Paths

### Installation Path
```
install.sh → detect_agents() → backup() → agent adapters → summary()
```

### Project Init Path
```
project-init.sh → create .ai/ → copy rules → create symlinks → run /init
```

### Orchestration Path
```
User request → Coordinator → Classify task → Select team → Explore → Plan → Implement (parallel) → Review (parallel) → Verify → Update intel
```

### Dashboard Reporting Path
```
Agent work → agent-tracker.sh → report.sh → server.js → SSE → UI
```

### Cross-Provider Dispatch Path
```
dispatch.sh → read providers.json → detect providers → select best → invoke → return output
```

---

## Known Gotchas

### Installation

1. **Python 3 required for settings merge** - Falls back silently if missing, but settings won't be merged properly
2. **Plugin installation may fail** - Relies on external `claude plugin install` command
3. **Backup directory creation** - Creates `~/.ai-setup-backups/` with timestamp
4. **Symlink vs copy** - Some agents require copies (Cursor), others use symlinks (Claude)

### Orchestration

5. **Context compaction** - Can happen anytime; use checkpoint system to survive
6. **Provider auto-dispatch** - Assumes providers are installed; falls back to Claude if not
7. **Intel freshness** - Auto-refreshes after 30 days; stale intel may mislead
8. **Dashboard dependency** - Optional; agents work without it (file-based fallback)

### Platform-Specific

9. **macOS bash 3.2** - Scripts compatible with old bash for macOS default shell
10. **Windows support** - Only via WSL2 or Git Bash; no native Windows support
11. **File watching** - chokidar optional; falls back to polling if unavailable

### Configuration

12. **config/ directory** - Appears duplicate of universal/; unclear purpose (legacy?)
13. **Settings merge complexity** - Python JSON merge logic is complex; hard to debug
14. **Hook execution** - Commands in hooks run after tool use; can slow down workflow

### Debugging

15. **No test coverage** - Hard to catch regressions
16. **Silent failures** - Some failures fall back silently (python3 missing)
17. **Debug logging** - Minimal logging; hard to troubleshoot issues

---

## Quick Reference

### Supported Agents

| Agent | CLI | Config Location |
|-------|-----|-----------------|
| Claude Code | `claude` | `~/.claude/` |
| Gemini CLI | `gemini` | `~/.gemini/` |
| Codex CLI | `codex` | `~/.codex/` |
| Cursor | `cursor` | `~/.cursor/` |
| Kiro CLI | `kiro` | `~/.kiro/` |
| Amp Code | `amp` | `~/.config/agents/` |

### Key Workflows

| Command | Purpose |
|---------|---------|
| `/init` | Smart project initializer |
| `/deep-research` | 6-agent parallel codebase analysis |
| `/build <feature>` | End-to-end feature implementation |
| `/review [target]` | Multi-agent code review |
| `/debug <problem>` | Multi-agent debugging |

### File Count

- **7** universal rule files (524 lines)
- **50+** command definitions
- **6** agent adapters
- **5** native agents (Claude)
- **3** main shell scripts (1,049 lines total)

### External Providers Detected

- ✅ Claude (always available - this is me)
- ✅ Codex (installed)
- ✅ Gemini (installed)
- ✅ Amp (installed)
