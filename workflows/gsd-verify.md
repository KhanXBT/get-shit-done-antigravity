---
description: Verify built features through user acceptance testing
---

# GSD Verify — User Acceptance Testing

Validate built features through conversational testing. Show expected behavior, ask if reality matches. One test at a time, plain text responses.

## Arguments

The user should provide a phase number, e.g., `/gsd-verify 1`

## Steps

### 1. Validate

Read `.planning/ROADMAP.md` and check phase exists.

**If no `.planning/`:** "No GSD project found. Run /gsd-new-project first."
**If phase not found:** "Phase [N] not found."

Check for SUMMARY.md files in the phase directory — these contain what was built and what to test.

**If no summaries:** "Phase [N] hasn't been executed yet. Run /gsd-execute [N] first."

### 2. Extract Testable Deliverables

Read all SUMMARY.md files for this phase. For each accomplishment:

- Focus on **user-observable outcomes**, not implementation details
- Skip internal refactors, type changes, etc.
- Create a test for each deliverable with:
  - **name:** Brief test name
  - **expected:** What the user should see/experience (specific, observable)

Example:
- Accomplishment: "Added comment threading with infinite nesting"
  → Test: "Reply to a Comment"
  → Expected: "Clicking Reply opens inline composer. Submitting shows reply nested under parent."

### 3. Present Tests One at a Time

For each test, present to the user:

```
╔══════════════════════════════════════════════════════════════╗
║  TEST [N]/[Total]: [Test Name]                               ║
╚══════════════════════════════════════════════════════════════╝

Expected behavior:
[What should happen]

──────────────────────────────────────────────────────────────
→ Type "pass" if correct, "skip" to skip, or describe what's wrong
──────────────────────────────────────────────────────────────
```

Wait for user response.

### 4. Process Response

**If pass:** ("yes", "y", "ok", "pass", "next", "✓")
- Record as passed

**If skip:** ("skip", "can't test", "n/a")
- Record as skipped with reason

**If anything else:**
- Treat as issue description
- Infer severity from language:
  | User says | Severity |
  |-----------|----------|
  | crash, error, fails completely | blocker |
  | doesn't work, nothing happens, wrong | major |
  | works but..., slow, weird | minor |
  | color, spacing, alignment | cosmetic |
  | unclear | default to major |

**Never ask "how severe is this?"** — just infer and move on.

- Record the issue and move to next test

### 5. After All Tests

Create/update `.planning/phases/[NN]-[slug]/[NN]-UAT.md`:

```markdown
# Phase [N]: [Name] — User Acceptance Testing

**Started:** [date]
**Status:** complete
**Updated:** [date]

## Results

| # | Test | Result | Details |
|---|------|--------|---------|
| 1 | [Name] | ✓ Pass | — |
| 2 | [Name] | ✗ Issue | [user's description] |
| 3 | [Name] | ○ Skip | [reason] |

## Summary

- **Total:** [N]
- **Passed:** [N]
- **Issues:** [N]
- **Skipped:** [N]

## Gaps

[For each issue, structured for gap-closure planning:]

- **Test [N]: [Name]**
  - Expected: [what should happen]
  - Reported: [user's exact words]
  - Severity: [inferred]

---
*Tested: [date]*
```

### 6. Git Commit

```bash
git add .planning/phases/[NN]-[slug]/[NN]-UAT.md
git commit -m "test([NN]): UAT complete — [passed] passed, [issues] issues"
```

### 7. Completion

**If all passed:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 GSD ► UAT COMPLETE ✓
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

All [N] tests passed!

## ▶ Next Up

/gsd-discuss [N+1]   → Start next phase
/gsd-plan [N+1]      → Plan next phase
```

**If issues found:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 GSD ► UAT COMPLETE — [Issues] ISSUES FOUND
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Passed]/[Total] tests passed. [Issues] issues need attention:

[List each issue with severity]

## ▶ Next Up

/gsd-plan [N]        → Re-plan to fix gaps
```
