---
description: Execute a small ad-hoc task with GSD guarantees (atomic commits, state tracking)
---

# GSD Quick — Ad-Hoc Task with Guarantees

Execute small, self-contained tasks with GSD's atomic commit and state tracking guarantees without full phase ceremony.

> **🛡️ ANTI-HALLUCINATION PROTOCOL — ACTIVE IN THIS WORKFLOW**
> Quick tasks skip research and deep planning — but they do NOT skip verification. Every change must be verified with actual commands. Do not assume "it works" — prove it.

## Arguments

The user should provide a description, e.g., `/gsd-quick Add dark mode toggle to settings page`

If no description provided, ask: "What do you want to do?"

## Multi-Model Safeguard: Quick Task Integrity

**MANDATORY — regardless of which AI model is running:**

```
QUICK TASK RULES:
1. Re-read STATE.md and ROADMAP.md before starting — know where the project is
2. Verify each task after completion — run the actual verify command
3. Read command output — do NOT assume success
4. If the task touches existing code, READ the existing files first
5. Do NOT modify files outside the task scope without asking

⚠️ Quick tasks are the highest hallucination risk because
   they skip research. Be EXTRA careful with technical claims.
```

## Steps

### 1. Validate Project

**Actually read** `.planning/ROADMAP.md` and `.planning/STATE.md` to understand current project state.

**If no `.planning/`:** "No GSD project found. Quick mode needs an active project. Run /gsd-new-project first."

### 2. Create Quick Task Directory

```bash
mkdir -p .planning/quick
```

Determine the next task number by counting existing directories in `.planning/quick/`. Create a slug from the description (lowercase, hyphens, max 40 chars).

```bash
mkdir -p .planning/quick/[NNN]-[slug]
```

### 3. Create Quick Plan

> **🛡️ Before writing the plan:**
> - If modifying existing files, READ them first to understand current state
> - Do NOT reference library APIs from training data without verification
> - Keep scope tight — 1-3 tasks maximum

Create `.planning/quick/[NNN]-[slug]/[NNN]-PLAN.md` with a focused plan:

```markdown
---
task: [NNN]
name: [Task Name]
description: [User's description]
---

# Quick Task [NNN]: [Name]

## Objective
[What this achieves — 1-2 sentences]

## Tasks

<task type="auto">
  <name>[Task Name]</name>
  <files>[files]</files>
  <action>[What to do]</action>
  <verify>[How to verify — MUST be an executable command]</verify>
  <done>[Definition of done]</done>
</task>

---
*Created: [date]*
```

Constraints:
- **1-3 tasks maximum** — quick tasks should be atomic
- No research phase
- Self-contained (doesn't depend on other plans)

### 4. Execute Tasks

For each task in the plan:

1. **Read existing files** before modifying them (if they exist)
2. Execute the action
3. **Run** the verify command and **read** the output
4. **Confirm success** from actual output (not assumption)
5. Commit atomically:
   ```bash
   git add [files]
   git commit -m "feat(quick-[NNN]): [task name]"
   ```

> **🛡️ VERIFICATION GATE — After each task:**
> - Did you RUN the verify command? (not just write it in the plan)
> - Did you READ the output? (not assume it passed)
> - Does the output actually confirm success?

### 5. Create Summary

Create `.planning/quick/[NNN]-[slug]/[NNN]-SUMMARY.md`:

```markdown
# Quick Task [NNN]: [Name] — Summary

**Executed:** [date]
**Status:** Complete

## What Was Done
[Description of ACTUAL changes made — based on what you did, not plan intent]

## Files Modified
| File | Action | Description |
|------|--------|-------------|
| [path] | [Created/Modified] | [what] |

## Verification
[What was verified and how — include actual command output summary]

---
*Completed: [date]*
```

### 6. Update STATE.md

**Read and then update** `.planning/STATE.md`:

Add to Quick Tasks Completed table in STATE.md:

```markdown
### Quick Tasks Completed

| # | Description | Date | Commit | Directory |
|---|-------------|------|--------|-----------|
| [NNN] | [Description] | [date] | [hash] | [NNN]-[slug] |
```

Update last activity line.

### 7. Git Commit Docs

```bash
git add .planning/quick/[NNN]-[slug]/ .planning/STATE.md
git commit -m "docs(quick-[NNN]): [description]"
```

### 8. Completion

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 GSD ► QUICK TASK COMPLETE ✓
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Quick Task [NNN]: [Description]
Summary: .planning/quick/[NNN]-[slug]/[NNN]-SUMMARY.md
Commit: [hash]

Ready for next task: /gsd-quick
```
