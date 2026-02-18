---
description: Show current project status and next steps
---

# GSD Progress — Where Am I?

Show the user their current project status and what to do next.

## Steps

### 1. Validate Project Exists

Check if `.planning/` directory exists in the current project root.

If not found:
```
No GSD project found in this directory.
Run /gsd-new-project to initialize.
```
Stop here.

### 2. Read State and Roadmap

Read these files:
- `.planning/STATE.md` — current position, decisions, blockers
- `.planning/ROADMAP.md` — phases and progress

If STATE.md doesn't exist, report "Project exists but STATE.md is missing. Run /gsd-new-project to reinitialize."

### 3. Display Progress

Present a summary showing:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 GSD ► PROJECT STATUS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Include:
- **Project name** from PROJECT.md
- **Current phase** from STATE.md (which phase is in progress)
- **Overall progress** — how many phases complete vs total
- **Phase progress table** extracted from ROADMAP.md showing each phase, its status (planned/in-progress/complete), and a brief description
- **Recent decisions** from STATE.md
- **Blockers** if any exist in STATE.md
- **Quick tasks completed** if any exist in STATE.md

### 4. Suggest Next Steps

Based on current state, recommend the next action:

| Current State | Suggestion |
|---------------|------------|
| Phase has no CONTEXT.md | `/gsd-discuss N` to capture preferences |
| Phase has context but no plans | `/gsd-plan N` to create plans |
| Phase has plans but not executed | `/gsd-execute N` to execute |
| Phase executed but not verified | `/gsd-verify N` to test |
| Phase verified and passed | `/gsd-discuss N+1` or `/gsd-plan N+1` for next phase |
| All phases complete | `/gsd-new-project` for next milestone |
