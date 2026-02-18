---
description: Show all available GSD commands and usage guide
---

# GSD Help — Available Commands

Display the following help information to the user:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 GSD for Antigravity — Command Reference
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## Core Workflow

| Command              | What it does                                                |
|----------------------|-------------------------------------------------------------|
| /gsd-new-project     | Full initialization: questions → research → requirements → roadmap |
| /gsd-discuss [N]     | Capture implementation decisions before planning            |
| /gsd-plan [N]        | Research + plan + verify for a phase                        |
| /gsd-execute [N]     | Execute all plans for a phase with atomic git commits       |
| /gsd-verify [N]      | Verify built features through user acceptance testing       |

## Utilities

| Command              | What it does                                                |
|----------------------|-------------------------------------------------------------|
| /gsd-quick [desc]    | Execute small ad-hoc task with GSD guarantees               |
| /gsd-progress        | Where am I? What's next?                                    |
| /gsd-help            | Show this help message                                      |

## Typical Workflow

1. /gsd-new-project     → Set up project vision, requirements, roadmap
2. /gsd-discuss 1       → Capture your preferences for Phase 1
3. /gsd-plan 1          → Research and create task plans
4. /gsd-execute 1       → Execute plans with atomic commits
5. /gsd-verify 1        → Test and verify the work
6. Repeat for next phase

## File Structure

All planning files are stored in .planning/ at the project root:

.planning/
├── PROJECT.md          — Project vision and context
├── REQUIREMENTS.md     — Scoped v1/v2 requirements
├── ROADMAP.md          — Phases and progress tracking
├── STATE.md            — Current position, decisions, session info
├── config.json         — Workflow settings
├── research/           — Domain research (stack, features, architecture, pitfalls)
└── phases/
    ├── 01-phase-name/
    │   ├── 01-CONTEXT.md      — Implementation decisions
    │   ├── 01-RESEARCH.md     — Phase-specific research
    │   ├── 01-01-PLAN.md      — Task plan 1
    │   ├── 01-01-SUMMARY.md   — Execution summary
    │   └── 01-VERIFICATION.md — Verification results
    └── 02-phase-name/
        └── ...
```
