---
description: Execute all plans for a phase with atomic git commits
---

# GSD Execute — Run Plans with Atomic Commits

Execute all plans in a phase. Each task gets its own atomic git commit. The orchestrator reads plans, executes tasks in order, commits each one, and creates a summary.

> **🛡️ ANTI-HALLUCINATION PROTOCOL — ACTIVE IN THIS WORKFLOW**
> This workflow executes code changes. Every step MUST be verified against real file contents and real command output. Do NOT assume, recall, or fabricate any results. READ files, RUN commands, CHECK outputs.

## Arguments

The user should provide a phase number, e.g., `/gsd-execute 1`

If no phase number provided, read STATE.md for the current phase.

## Multi-Model Safeguard: Pre-Execution Context Load

**MANDATORY before ANY execution begins — regardless of which AI model is running:**

```
CONTEXT FRESHNESS CHECK:
1. view_file → .planning/STATE.md          (current position, decisions)
2. view_file → .planning/ROADMAP.md        (phase goal, requirements)
3. view_file → each PLAN.md for this phase (actual task instructions)

⚠️ Do NOT rely on memory of these files from earlier in conversation.
⚠️ Do NOT paraphrase plan contents — read the ACTUAL file each time.
⚠️ If this is a new conversation, re-read ALL planning files from scratch.
```

## Steps

### 1. Validate

**Actually read** (not recall) `.planning/ROADMAP.md` and `.planning/STATE.md`.

**If no `.planning/` directory:** "No GSD project found. Run /gsd-new-project first."
**If phase not found:** "Phase [N] not found."

Find all PLAN.md files for this phase:
```bash
ls .planning/phases/[NN]-*/[NN]-*-PLAN.md
```

**If no plans found:** "No plans found for Phase [N]. Run /gsd-plan [N] first."

Check for existing SUMMARY.md files (indicates previously completed plans) and skip those.

### 2. Load Plans

**Read each PLAN.md file individually** — do NOT summarize from memory. Parse:
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

> **🔄 MODEL RESILIENCE — Style Anchoring Protocol:**
> Before writing ANY code, anchor to existing project style:
> 1. Check the plan for **Code Patterns** section — read those reference files
> 2. If no Code Patterns section — read 2-3 existing files in the same directory
> 3. Note: import ordering, naming conventions, error handling, types, exports
> 4. Match these patterns EXACTLY in new code — don't use model defaults
>
> This ensures consistent code quality regardless of which model is active.

**For each task:**

1. **Re-read the task** — literally view the PLAN.md file again to get exact instructions. Do NOT work from memory.
2. **Style anchor** — read existing files referenced in Code Patterns (or 2-3 nearby files). Match their patterns.
3. **Execute the action** — write code following the step-by-step instructions from the plan. Follow referenced patterns.
4. **Run FULL verification suite** — not just the plan's verify step:
   ```
   VERIFICATION SUITE (run ALL applicable):
   ✓ Type check:  tsc --noEmit (if TypeScript project)
   ✓ Lint:        eslint/biome/prettier (if configured)
   ✓ Tests:       test runner for affected area
   ✓ Build:       build command (catches import/export errors)
   ✓ Plan verify: the specific verify step from the plan
   ```
5. **Read the verification output** — do NOT assume it passed. Read the actual terminal output or file contents.
6. **If any check fails** — fix the code BEFORE committing. Re-run the full suite.
7. **Commit atomically:**
   ```bash
   git add [files]
   git commit -m "feat([NN]-[PP]): [task name]"
   ```
8. **Report completion:**
   ```
   ✓ Task [T]: [Task Name] — committed [hash]
   ```

> **🛡️ HALLUCINATION GATE — After each task:**
> - Did you actually RUN the verify command? (not just plan to)
> - Did you READ the output? (not assume success)
> - Does the output actually show success? (not just "no errors visible")
> - If ANY doubt → re-run verification before proceeding
> - NEVER say "tests pass" without actual test output proving it

**If a task fails:**
- Report the error clearly — include the ACTUAL error output
- Ask the user: "Retry this task, skip it, or stop execution?"
- If retry: **re-read the PLAN.md** before attempting again
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
[Description of what was implemented — based on ACTUAL changes made, not plan intent]

## Files Created/Modified
| File | Action | Description |
|------|--------|-------------|
| [path] | Created | [what it does] |
| [path] | Modified | [what changed] |

## Verification Results
- [x] [Verification 1] — passed (actual output: [brief])
- [x] [Verification 2] — passed (actual output: [brief])

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

> **🛡️ CRITICAL — Do not hallucinate phase completion.**
> Read the ACTUAL built files and test outputs. Compare against ROADMAP.md must-haves.

After all waves complete, verify the phase achieved its goal:

**Re-read** the phase goal from ROADMAP.md (don't recall — read the file). Check the must-haves from each plan against what was actually built. Verify that requirement IDs assigned to this phase are addressed.

Write `.planning/phases/[NN]-[slug]/[NN]-VERIFICATION.md`:

```markdown
# Phase [N]: [Name] — Verification

**Verified:** [date]
**Status:** passed | gaps_found

## Must-Haves Check
| Condition | Status | Evidence |
|-----------|--------|----------|
| [Must-have 1] | ✓ Met | [how verified — cite actual file/output] |
| [Must-have 2] | ✓ Met | [how verified — cite actual file/output] |

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

Recommended: Start a NEW CONVERSATION for the next workflow step.
This prevents context contamination from this execution session.

/gsd-verify [N]      → Manual acceptance testing
/gsd-discuss [N+1]   → Start next phase
/gsd-plan [N+1]      → Skip to planning next phase
```
