---
description: Execute a small ad-hoc task with GSD guarantees (atomic commits, state tracking)
---

# GSD Quick — Ad-Hoc Task with Guarantees

Execute small, self-contained tasks with GSD's atomic commit and state tracking guarantees without full phase ceremony.

## Arguments

The user should provide a description, e.g., `/gsd-quick Add dark mode toggle to settings page`

If no description provided, ask: "What do you want to do?"

## Steps

### 1. Validate Project

Check `.planning/ROADMAP.md` exists.

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
  <verify>[How to verify]</verify>
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

1. Execute the action
2. Verify the result
3. Commit atomically:
   ```bash
   git add [files]
   git commit -m "feat(quick-[NNN]): [task name]"
   ```

### 5. Create Summary

Create `.planning/quick/[NNN]-[slug]/[NNN]-SUMMARY.md`:

```markdown
# Quick Task [NNN]: [Name] — Summary

**Executed:** [date]
**Status:** Complete

## What Was Done
[Description of changes]

## Files Modified
| File | Action | Description |
|------|--------|-------------|
| [path] | [Created/Modified] | [what] |

---
*Completed: [date]*
```

### 6. Update STATE.md

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
