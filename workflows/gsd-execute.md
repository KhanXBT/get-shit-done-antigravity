---
description: Execute all plans for a phase with atomic git commits
---

# GSD Execute — Run Plans with Atomic Commits

Execute all plans in a phase. Each task gets its own atomic git commit. The orchestrator reads plans, executes tasks in order, commits each one, and creates a summary.

## Arguments

The user should provide a phase number, e.g., `/gsd-execute 1`

If no phase number provided, read STATE.md for the current phase.

## Steps

### 1. Validate

Read `.planning/ROADMAP.md` and `.planning/STATE.md`.

**If no `.planning/` directory:** "No GSD project found. Run /gsd-new-project first."
**If phase not found:** "Phase [N] not found."

Find all PLAN.md files for this phase:
```bash
ls .planning/phases/[NN]-*/[NN]-*-PLAN.md
```

**If no plans found:** "No plans found for Phase [N]. Run /gsd-plan [N] first."

Check for existing SUMMARY.md files (indicates previously completed plans) and skip those.

### 2. Load Plans

Read all PLAN.md files for this phase. Parse:
- Plan number and name
- Wave assignments (for ordering)
- Dependencies between plans
- Task list within each plan
- Files to be modified

Group plans by wave:
- Wave 1 plans execute first
- Wave 2 plans execute after Wave 1 completes
- And so on...

### 3. Execute Plans

For each wave, in order:

Display:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 GSD ► EXECUTING PHASE [N] — WAVE [W]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Plan [N]-[P]: [Plan Name]
[2-3 sentences: what this builds, technical approach, why it matters]
```

For each plan in the wave, execute each task:

**For each task:**

1. **Read the task** — understand files, action, verify, done criteria
2. **Execute the action** — write code, create files, modify existing files as specified
3. **Verify the task** — run the verify step (tests, checks, manual inspection)
4. **Commit atomically:**
   ```bash
   git add [files]
   git commit -m "feat([NN]-[PP]): [task name]"
   ```
5. **Report completion:**
   ```
   ✓ Task [T]: [Task Name] — committed [hash]
   ```

**If a task fails:**
- Report the error clearly
- Ask the user: "Retry this task, skip it, or stop execution?"
- If retry: attempt the task again
- If skip: continue to next task, note the skip
- If stop: create partial summary and exit

### 4. Create Summary

After all tasks in a plan complete, create `.planning/phases/[NN]-[slug]/[NN]-[PP]-SUMMARY.md`:

```markdown
# Plan [N]-[P]: [Plan Name] — Summary

**Executed:** [date]
**Status:** Complete | Partial
**Commits:** [count]

## What Was Built
[Description of what was implemented]

## Files Created/Modified
| File | Action | Description |
|------|--------|-------------|
| [path] | Created | [what it does] |
| [path] | Modified | [what changed] |

## Verification Results
- [x] [Verification 1] — passed
- [x] [Verification 2] — passed

## Notable Decisions
[Any deviations from the plan or decisions made during execution]

## Issues Encountered
[Any problems and how they were resolved, or "None"]

---
*Executed: [date]*
```

### 5. Report Wave Completion

After each wave:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 Wave [W] Complete ✓

 Plan [N]-[P]: [Name] — [What was built]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 6. Verify Phase Goal

After all waves complete, verify the phase achieved its goal:

Read the phase goal from ROADMAP.md. Check the must-haves from each plan against what was actually built. Verify that requirement IDs assigned to this phase are addressed.

Write `.planning/phases/[NN]-[slug]/[NN]-VERIFICATION.md`:

```markdown
# Phase [N]: [Name] — Verification

**Verified:** [date]
**Status:** passed | gaps_found

## Must-Haves Check
| Condition | Status | Evidence |
|-----------|--------|----------|
| [Must-have 1] | ✓ Met | [how verified] |
| [Must-have 2] | ✓ Met | [how verified] |

## Requirements Coverage
| Req ID | Requirement | Addressed By | Status |
|--------|-------------|-------------|--------|
| R1 | [Requirement] | Plan [N]-01 | ✓ |
| R2 | [Requirement] | Plan [N]-02 | ✓ |

## Gaps
[List of any gaps found, or "None — all must-haves met"]

---
*Verified: [date]*
```

### 7. Update Roadmap and State

Update `.planning/ROADMAP.md`:
- Mark the phase as "Complete" in the progress table
- Add completion date
- Check the phase checkbox `[x]`

Update `.planning/STATE.md`:
- Advance current position to next phase
- Record last activity
- Note any blockers or decisions from execution

Git commit:
```bash
git add .planning/ROADMAP.md .planning/STATE.md .planning/phases/[NN]-[slug]/
git commit -m "docs([NN]): complete phase execution"
```

### 8. Completion

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 GSD ► PHASE [N] COMPLETE ✓
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Phase [N]: [Name]
Plans: [M] executed | Commits: [K] total
Verification: Passed

## ▶ Next Up

/gsd-verify [N]      → Manual acceptance testing
/gsd-discuss [N+1]   → Start next phase
/gsd-plan [N+1]      → Skip to planning next phase
```
