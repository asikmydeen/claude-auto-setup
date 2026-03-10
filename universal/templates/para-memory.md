# PARA Memory Structure

File-based memory using the PARA method for persistent knowledge across sessions.

## Directory Layout

```
~/.claude/projects/<project>/memory/
├── MEMORY.md                    # Index file (loaded into context, keep < 200 lines)
├── projects/                    # Active work with deadlines
│   ├── feature-auth.md          # Current feature being built
│   └── migration-v2.md          # Active migration project
├── areas/                       # Ongoing responsibilities (no deadline)
│   ├── code-quality.md          # Patterns, conventions, linting rules
│   ├── testing.md               # Test infrastructure knowledge
│   └── deployment.md            # CI/CD and deployment knowledge
├── resources/                   # Reference material
│   ├── api-patterns.md          # API design patterns used
│   ├── library-gotchas.md       # Known issues with dependencies
│   └── architecture.md          # Architecture decisions and rationale
└── archives/                    # Completed/inactive (searchable, not loaded)
    ├── feature-dashboard-v1.md  # Completed feature notes
    └── bug-memory-leak.md       # Resolved debugging notes
```

## MEMORY.md Format (Index File)

```markdown
# Project Memory Index

## Active Projects
- [feature-auth](projects/feature-auth.md) — OAuth2 integration, due Mar 15
- [migration-v2](projects/migration-v2.md) — Database migration to v2 schema

## Key Areas
- [code-quality](areas/code-quality.md) — TypeScript strict, no `any`, named exports
- [testing](areas/testing.md) — Jest + React Testing Library, AAA pattern
- [deployment](areas/deployment.md) — GitHub Actions, staging → prod

## Quick Reference
- Build: `pnpm build` | Test: `pnpm test` | Lint: `pnpm lint`
- DB: PostgreSQL 15, Prisma ORM
- Auth: NextAuth.js v5 with JWT strategy

## User Preferences
- Always use pnpm (not npm/yarn)
- Commit messages: conventional commits
- Never auto-commit without asking

## Known Gotchas
- React Query v5 uses `queryKey` arrays, not strings
- Prisma requires `npx prisma generate` after schema changes
- ESLint rule `no-unused-vars` has React exceptions configured
```

## Three Knowledge Layers

### 1. Knowledge Graph (Structured Facts)
Store in YAML frontmatter or structured sections:
```yaml
entities:
  - name: UserService
    type: service
    location: src/services/user.ts
    depends_on: [DatabaseService, AuthService]
    notes: Handles user CRUD + profile management
```

### 2. Daily Notes (Raw Timeline)
Capture session discoveries as they happen:
```markdown
## 2024-03-10
- Discovered: `useQuery` staleTime must be > 0 for SSR hydration
- Fixed: Memory leak in WebSocket provider (missing cleanup in useEffect)
- Decision: Switched from Zustand to React Query for server state
```

### 3. Tacit Knowledge (Learned Patterns)
Hard-won insights that prevent repeating mistakes:
```markdown
## Tacit Knowledge
- When tests fail with "act() warning", wrap in waitFor, don't add act()
- The CI build uses Node 18, local uses 20 — check engines field
- Production API rate limits at 100 req/min — add retry with backoff
```

## Rules

1. **MEMORY.md stays under 200 lines** — it's loaded every session
2. **Topic files can be any length** — they're only read on demand
3. **Move completed projects to archives/** — keeps active list clean
4. **Update on user corrections** — highest priority memory write
5. **Verify before writing** — check existing memories first, don't duplicate
6. **Organize by topic, not by date** — semantic grouping beats chronological
