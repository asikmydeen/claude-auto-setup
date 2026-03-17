# Codebase Patterns: claude-auto-setup
> Auto-extracted by pattern-analyzer. Last updated: 2026-03-17.
> Regenerate: run /init or /deep-research. DO NOT edit manually — changes will be overwritten.

## How to Use This File
- Read this BEFORE implementing any changes in this codebase
- Follow every pattern EXACTLY unless you have a justified reason to deviate
- To deviate: propose the change, explain why, get user confirmation FIRST
- After confirmed deviation: update this file + log in Deviation Log below

This project has 3 layers: **Shell scripts**, **TypeScript desktop app**, **Agent/command/rule definitions**. Each has distinct patterns.

---

## File Organization

**Shell scripts:**
- Entry points: root (`install.sh`, `dispatch.sh`, `project-init.sh`)
- Shared lib: `lib/common.sh` (sourced by all scripts)
- Adapters: `agents/{provider}/adapter.sh` (one per AI provider)

**TypeScript app (`app/src/`):**
- Server routes: `server/routes/{domain}.ts` — one file per domain (claude, projects, templates, dev-server, ops, llm, settings, dashboard, integrations, suggestions)
- Server libs: `server/lib/{name}.ts` — shared utilities (shared, database, cleanup, logger)
- UI pages: `ui/pages/{Name}.tsx` — PascalCase (Claude, Settings, Providers, Integrations)
- UI feature components: `ui/components/claude/{Name}.tsx` — grouped by feature
- UI shared components: `ui/components/{Name}.tsx` — standalone (Toast, ProjectCreator, etc.)
- UI primitives: `ui/components/ui/{name}.tsx` — shadcn/ui (badge, button, dialog)
- Types: colocated in `components/{feature}/types.tsx`, shared in `server/lib/shared.ts`

**Agent/command/rule files:**
- Agents: `agents/claude-code/agents/{name}.md` — kebab-case
- Commands: `universal/commands/{name}.md` — kebab-case
- Rules: `universal/rules/{name}.md` — kebab-case
- Templates: `universal/{name}-template.md` — kebab-case with `-template` suffix

---

## Module Structure

**Elysia route modules** — dependency injection via closures:
```typescript
// Every route module follows this exact pattern:
let sharedState: SomeType;

export function initModuleName(deps: { db: Database; sessions: Map<string, Session> }) {
  sharedState = deps.db;
}

export const moduleRoutes = new Elysia()
  .get("/api/resource", ({ set }) => { /* use sharedState */ })
  .post("/api/resource", ({ body, set }) => { /* ... */ });
```
Wired in `index.ts` before `.listen()`:
```typescript
initClaude({ getActiveProject: () => getActiveProjectPath() });
const app = new Elysia().use(claudeRoutes).use(projectsRoutes);
```

**Shell scripts** — source common.sh after SCRIPT_DIR:
```bash
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "${SCRIPT_DIR}/lib/common.sh"
```

---

## Handler & Response Patterns (Elysia)

```typescript
// Destructure context — never req/res. Type body inline.
.get("/api/resource/:id", ({ params, set }) => {
  const item = store.get(params.id);
  if (!item) { set.status = 404; return { error: "Not found" }; }
  return item; // auto-JSON
})
.post("/api/resource", ({ body, set }) => {
  const { name } = body as { name: string; value?: string };
  if (!name) { set.status = 400; return { error: "name is required" }; }
  set.status = 201;
  return { id: newId, name };
})
```
- **JSON**: return object (auto-serialized). Errors: `set.status = 4xx; return { error: "msg" }`
- **SSE**: `new Response(new ReadableStream(...))` (see below)
- **Static**: `Bun.file(path)` for files, SPA fallback to `index.html`

---

## SSE/Streaming

```typescript
// Always ReadableStream + controller.enqueue(), never generators
const stream = new ReadableStream<Uint8Array>({
  start(controller) {
    controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
    sseClients.get(id)!.add(controller);
  },
  cancel() { sseClients.get(id)?.delete(controllerRef); },
});
return new Response(stream, {
  headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" },
});
```
- Format: `data: {JSON}\n\n`. Track clients: `Map<id, Set<Controller>>`. Broadcast: iterate/try/catch/delete.

---

## React Component Patterns

```typescript
interface ComponentProps {
  onAction?: () => void;
  value: string;
}

export function ComponentName({ onAction, value }: ComponentProps) {
  const [state, setState] = useState<string>("");
  const queryClient = useQueryClient();

  const dataQuery = useQuery({ queryKey: ["key"], queryFn: fetchData });

  const handleClick = useCallback(() => { /* ... */ }, [dep]);

  return <div>...</div>;
}
```
- Props: `interface {Name}Props` → destructure in params
- Hooks at top: `useState` → `useQuery/useMutation` → `useCallback/useMemo` → `useEffect`
- Data fetching: `@tanstack/react-query` (`useQuery`, `useMutation`)
- Custom hooks: `use{Name}()` returning object, defined in `hooks.tsx`

---

## Import Conventions

**UI files** — `@/*` alias (resolves to `src/ui/`):
```typescript
import { useState, useEffect } from "react";          // 1. React/stdlib
import { useQuery } from "@tanstack/react-query";      // 2. External libs
import { Badge } from "@/components/ui/badge";          // 3. UI primitives (@/)
import { fetchSessions, type Session } from "@/api/config"; // 4. API layer (@/)
import { useSSE } from "@/components/claude/hooks";     // 5. Feature components (@/)
```

**Server files** — relative paths:
```typescript
import { Elysia } from "elysia";                       // 1. External
import { spawn } from "child_process";                  // 2. Node stdlib
import { ClaudeSession, buildProjectEnv } from "../lib/shared"; // 3. Internal libs
import { registerCleanup } from "../lib/cleanup";       // 4. Internal libs
```

---

## Error Handling

**Server:** try/catch at handler level → `logError("tag:context", msg)` → `{ error: "user-friendly msg" }`:
```typescript
try {
  return await riskyOperation();
} catch (err) {
  logError("module:op", err instanceof Error ? err.message : String(err));
  set.status = 500;
  return { error: "Failed to perform operation" };
}
```
Global: `.onError()` in `index.ts` catches unhandled. Never expose stack traces.

**Shell:** `set -euo pipefail` at line 1 of every script.

---

## Database (bun:sqlite)

```typescript
// Prepared statements at module load, $param naming, COALESCE for partial updates
const stmts = {
  get: db.prepare("SELECT * FROM sessions WHERE id = $id"),
  insert: db.prepare("INSERT INTO sessions (id, prompt) VALUES ($id, $prompt)"),
  update: db.prepare("UPDATE sessions SET status = COALESCE($status, status) WHERE id = $id"),
};
stmts.insert.run({ $id: session.id, $prompt: session.prompt });
// Batch: db.transaction(() => { for (const item of items) stmts.insert.run({...}); })();
```
- Export `db{Action}{Entity}` functions (`dbInsertSession`, `dbGetSessions`)

---

## Shell Script Patterns

```bash
# Functions: snake_case, local vars, no function keyword
detect_agents() { local count=0; if has_cmd claude; then agent_enable claude; fi; }

# Logging: 5 functions from lib/common.sh
info() { echo "${BLUE}[INFO]${RESET}  $*"; }  # also: ok, warn, error (>&2), step

# Args: for+case, always include --help
for arg in "$@"; do case "$arg" in --force) FORCE=true ;; --help|-h) usage ;; esac; done
```
- `set -euo pipefail` line 1. `command -v` not `which`. Bash 3.2 (no `declare -A`).
- Idempotent ops, `$DRY_RUN` checks, `SCRIPT_DIR` + `source lib/common.sh` at top.

---

## Agent/Command/Rule Definitions

**Agents** (`agents/claude-code/agents/*.md`): YAML frontmatter (`name`, `description`, `tools`, `model: sonnet|haiku`, optional `background`, `memory`, `maxTurns`) → Role statement → Sequential thinking block → "When invoked" protocol → Checklist → Memory integration.

**Commands** (`universal/commands/*.md`): YAML frontmatter (`name`, `description`, `category`, `complexity`, `triggers`) → Input `$ARGUMENTS` → Context Preservation → Numbered phases → `**CHECKPOINT**` markers → Intel update → Deliver.

**Rules** (`universal/rules/*.md`): H1 title → H2 sections → Bullet points → Imperative mood → Code examples where helpful.

---

## Naming Conventions

| Context | Convention | Example |
|---------|-----------|---------|
| TS variables/functions | camelCase | `sessionId`, `getActiveProject()` |
| TS types/interfaces | PascalCase | `ClaudeSession`, `StreamEvent` |
| React components | PascalCase | `Claude`, `ToastProvider` |
| React hooks | camelCase + `use` | `useSSE()`, `useDocumentVisible()` |
| TS constants | UPPER_SNAKE | `CLAUDE_DIR`, `TMP_IMAGES_DIR` |
| TS files (server) | kebab-case.ts | `dev-server.ts`, `shared.ts` |
| TS files (components) | PascalCase.tsx | `Claude.tsx`, `Toast.tsx` |
| Shell functions | snake_case | `detect_agents`, `agent_enable` |
| Shell globals | UPPER_CASE | `SCRIPT_DIR`, `DRY_RUN` |
| Shell locals | lower_case | `local count=0`, `local name="$1"` |
| Agent/command/rule files | kebab-case.md | `code-reviewer.md`, `build.md` |
| DB functions | camelCase + db prefix | `dbInsertSession`, `dbGetSessions` |

---

## Anti-Patterns (DO NOT)

**TypeScript:**
- `any` types — use `unknown` + type guards or explicit interfaces
- `@ts-ignore` / `@ts-expect-error` — fix the type error
- Default exports — use named exports everywhere
- Global mutable state — use closures + `init()` dependency injection
- `@elysiajs/static` with wildcard `GET /*` — use `Bun.file()` for SPA fallback
- Generator functions for SSE — use `ReadableStream` + `controller.enqueue()`
- `req`/`res` Express patterns — use Elysia's `({ params, body, set })` destructuring
- Exposing stack traces in error responses — return `{ error: "user-friendly msg" }`

**Shell:**
- `declare -A` associative arrays — Bash 3.2 incompatible, use `eval`
- `which` for detection — use `command -v`
- Inline `$var` in Python heredocs — use `os.environ['VAR']` for injection safety
- `function` keyword — use `name() { }` form
- Missing `set -euo pipefail` — must be line 1 of every script

**Agent/Command definitions:**
- Checkboxes `- [ ]` — use `@@@task` blocks
- Paragraph-style rules — use bullet points
- CamelCase or PascalCase filenames — always kebab-case.md

---

## Deviation Log

| Date | Pattern | Change | Reason | Approved |
|------|---------|--------|--------|----------|
| | | | | |
