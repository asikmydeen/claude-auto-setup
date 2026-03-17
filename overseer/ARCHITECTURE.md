# SDLC Overseer — Architecture & Flow

## System Flow

```mermaid
graph TD
    User["User: Epic Description"] --> Overseer["Overseer (Orchestrator)"]

    subgraph "Phase 1: PLANNING"
        Overseer --> PM["Product Manager"]
        PM -->|"stories.json"| PjM["Project Manager"]
        PjM -->|"tasks.json + DAG"| TL["Tech Lead"]
        TL -->|"architecture.md + contracts"| Queue["Task Queue (SQLite)"]
    end

    subgraph "Phase 2: EXECUTION (max 5 concurrent)"
        Queue --> Sched["DAG Scheduler"]
        Sched --> SrE["Sr Engineer"]
        Sched --> Eng["Engineer"]
        Sched --> FE["Frontend Engineer"]
        Sched --> BE["Backend Engineer"]
        Sched --> QA2["QA Engineer"]
    end

    subgraph "Phase 3: INTEGRATION"
        SrE & Eng & FE & BE -->|"completed branches"| MM["Merge Manager"]
        MM -->|"conflict?"| CR["Conflict Resolver"]
        CR --> MM
        MM -->|"merged to main"| QA["QA Engineer"]
        QA2 --> QA
    end

    subgraph "Phase 4: RELEASE"
        QA -->|"tests pass"| Sec["Security Engineer"]
        Sec -->|"audit clean"| DevOps["DevOps Engineer"]
        DevOps -->|"build verified"| Rel["Release Engineer"]
        Rel -->|"versioned"| Done["Done"]
    end

    subgraph "OVERSIGHT (continuous)"
        Guard["Guardian Agent"]
        KS[("Knowledge Store")]
    end

    Guard -.->|"monitors"| SrE & Eng & FE & BE & MM & QA
    SrE & Eng & FE & BE & TL -.->|"read/write"| KS
    Overseer -.->|"tracks"| KS
```

## Git Worktree Strategy

```mermaid
gitGraph
    commit id: "main (initial)"
    branch "feat/epic-abc/task-001"
    branch "feat/epic-abc/task-002"
    branch "feat/epic-abc/task-003"
    checkout "feat/epic-abc/task-001"
    commit id: "FE: setup components"
    commit id: "FE: implement UI"
    checkout "feat/epic-abc/task-002"
    commit id: "BE: setup routes"
    commit id: "BE: implement API"
    checkout "feat/epic-abc/task-003"
    commit id: "SR: data model"
    checkout main
    merge "feat/epic-abc/task-003" id: "merge: task-003"
    merge "feat/epic-abc/task-002" id: "merge: task-002"
    merge "feat/epic-abc/task-001" id: "merge: task-001"
    commit id: "test: all passing"
    commit id: "chore: release v1.0.0"
```

## Data Flow

```mermaid
flowchart LR
    subgraph "Centralized State"
        DB[(overseer.db)]
        KS[Knowledge Store]
        FS[.overseer/ files]
    end

    subgraph "Planning Output"
        PRD[prd.md]
        Stories[stories.json]
        Tasks[tasks.json]
        Arch[architecture.md]
        API[api-contracts.json]
        DM[data-models.json]
    end

    subgraph "Execution Output"
        Code[Code in worktrees]
        Commits[Git commits]
    end

    subgraph "Quality Output"
        TR[test-report.md]
        SR[security-report.md]
        ML[merge-log.md]
        GS[guardian-status.md]
    end

    PM --> PRD & Stories
    PjM --> Tasks
    TL --> Arch & API & DM
    Engineers --> Code & Commits
    QA --> TR
    Sec --> SR
    MM --> ML
    Guard --> GS

    All -->|"read/write"| DB & KS & FS
```

## Task State Machine

```mermaid
stateDiagram-v2
    [*] --> queued: task created
    queued --> assigned: scheduler picks task
    assigned --> in_progress: agent spawned
    in_progress --> review: agent completed
    in_progress --> failed: agent errored
    review --> merged: merge successful
    review --> failed: merge conflict unresolvable
    merged --> done: tests pass
    failed --> queued: retry (manual)
    done --> [*]

    queued --> blocked: dependency failed
    blocked --> failed: cannot recover
```

## Agent Concurrency Model

```
Time →
Slot 1: [PM      ] [Sr Eng: task-1    ] [QA: tests     ] [Release  ]
Slot 2: [PjM     ] [Eng: task-2       ] [Sec: audit    ]
Slot 3: [Tech Ld ] [FE: task-3        ] [DevOps: CI    ]
Slot 4:            [BE: task-4        ] [Merge Mgr     ]
Slot 5:            [Eng: task-5       ]
Guard:  [================ continuous monitoring ================]
```

Max 5 slots active at any time. Guardian runs in background (doesn't count against limit).

## Directory Structure

```
project-root/
├── .overseer/                    # Sprint artifacts (gitignored)
│   ├── prd.md                    # Product requirements
│   ├── stories.json              # User stories
│   ├── tasks.json                # Sprint tasks with DAG
│   ├── sprint-plan.md            # Sprint overview
│   ├── architecture.md           # Technical architecture
│   ├── api-contracts.json        # API endpoint contracts
│   ├── data-models.json          # Data model definitions
│   ├── test-report.md            # Test results
│   ├── security-report.md        # Security audit
│   ├── merge-log.md              # Merge history
│   ├── guardian-status.md        # Health monitoring
│   ├── guardian-warnings.md      # Low/medium issues
│   ├── guardian-alerts.md        # High severity issues
│   └── knowledge/                # Shared knowledge entries
│       ├── pm-decisions.json
│       ├── architecture-decisions.json
│       ├── security-findings.json
│       └── guardian-findings.json
├── .worktrees/                   # Git worktrees (gitignored)
│   ├── task-abc12345/            # One per active task
│   └── task-def67890/
├── overseer/                     # Orchestrator source
│   ├── overseer.ts               # Main entry point
│   ├── db.ts                     # SQLite schema + CRUD
│   ├── worktree.ts               # Git worktree manager
│   ├── spawner.ts                # Agent spawner
│   ├── scheduler.ts              # DAG scheduler
│   ├── knowledge.ts              # Knowledge store
│   └── types.ts                  # Shared types
└── agents/sdlc/                  # Agent definitions
    ├── product-manager.md
    ├── project-manager.md
    ├── tech-lead.md
    ├── senior-engineer.md
    ├── engineer.md
    ├── frontend-engineer.md
    ├── backend-engineer.md
    ├── qa-engineer.md
    ├── security-engineer.md
    ├── merge-manager.md
    ├── devops-engineer.md
    ├── release-engineer.md
    └── guardian.md
```

## Database Schema

```
~/.claude/data/overseer.db

epics           → id, title, description, status, timestamps
stories         → id, epic_id, title, description, AC, priority, points
tasks           → id, story_id, title, type, role, status, worktree, branch, deps[]
agent_sessions  → id, task_id, role, pid, status, output, error
knowledge       → id, epic_id, category, key, value, source_agent
merge_queue     → id, task_id, branch, status, conflict_files
sprint_log      → id, epic_id, event_type, details, agent_role, timestamp
```
