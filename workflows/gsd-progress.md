---
description: Show current project status and next steps
---

# GSD Progress — Where Am I?

Show the user their current project status and what to do next.

> **🛡️ ANTI-HALLUCINATION PROTOCOL — ACTIVE IN THIS WORKFLOW**
> Progress report must reflect ACTUAL file contents, not memory of what was done. Read every file referenced in this workflow — do not summarize from context or recall.

## Multi-Model Safeguard: State Integrity

**MANDATORY — regardless of which AI model is running:**

```
PROGRESS RULES:
1. READ every file before reporting its contents
2. Do NOT report project state from memory — read STATE.md
3. Do NOT report phase status from memory — read ROADMAP.md
4. If a file is missing, report it as missing — do NOT reconstruct from memory
5. Verify file existence before claiming artifacts exist

⚠️ Progress reports are READ-ONLY — do NOT modify state during this workflow.
⚠️ A wrong progress report can send the user down the wrong path entirely.
```

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

**Actually read** these files (do NOT work from memory):
- `.planning/STATE.md` — current position, decisions, blockers
- `.planning/ROADMAP.md` — phases and progress

If STATE.md doesn't exist, report "Project exists but STATE.md is missing. Run /gsd-new-project to reinitialize."

### 3. Verify Artifacts Exist

**Check which artifacts actually exist on disk** — do not assume:

```bash
# Check for each phase directory
ls .planning/phases/

# For each phase, check which artifacts exist
ls .planning/phases/[NN]-*/
```

Build a real picture of:
- Which CONTEXT.md files exist (phases with captured decisions)
- Which PLAN.md files exist (phases with plans)
- Which SUMMARY.md files exist (phases executed)
- Which UAT.md files exist (phases verified)
- Which quick tasks exist

### 4. Display Progress

Present a summary showing:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 GSD ► PROJECT STATUS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Include:
- **Project name** from PROJECT.md (read the file)
- **Current phase** from STATE.md (read the file)
- **Overall progress** — how many phases complete vs total (from ROADMAP.md)
- **Phase progress table** extracted from ROADMAP.md showing each phase, its status (planned/in-progress/complete), and artifacts present
- **Recent decisions** from STATE.md
- **Blockers** if any exist in STATE.md
- **Quick tasks completed** if any exist in STATE.md

### 5. Suggest Next Steps

Based on **actual artifact existence** (not assumed state), recommend the next action:

| Current State | Suggestion |
|---------------|------------|
| Phase has no CONTEXT.md | `/gsd-discuss N` to capture preferences |
| Phase has context but no plans | `/gsd-plan N` to create plans |
| Phase has plans but not executed | `/gsd-execute N` to execute |
| Phase executed but not verified | `/gsd-verify N` to test |
| Phase verified and passed | `/gsd-discuss N+1` or `/gsd-plan N+1` for next phase |
| All phases complete | `/gsd-new-project` for next milestone |

```
Recommended: Start each workflow step in a NEW CONVERSATION
for optimal context freshness.
```
