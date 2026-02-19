---
description: Verify built features through user acceptance testing
---

# GSD Verify — User Acceptance Testing

Validate built features through conversational testing. Show expected behavior, ask if reality matches. One test at a time, plain text responses.

> **🛡️ ANTI-HALLUCINATION PROTOCOL — ACTIVE IN THIS WORKFLOW**
> Verification is the last line of defense. NEVER mark a test as "passed" without the user confirming it. NEVER infer test results — only the user or actual command output determines pass/fail.

## Arguments

The user should provide a phase number, e.g., `/gsd-verify 1`

## Multi-Model Safeguard: Verification Integrity

**MANDATORY — regardless of which AI model is running:**

```
VERIFICATION RULES:
1. NEVER auto-pass a test — WAIT for user's explicit response
2. NEVER assume command output — actually RUN commands and READ output
3. NEVER fabricate test results — if you can't verify, say so
4. Present ACTUAL behavior observed, not expected behavior as fact
5. If a user reports an issue, do NOT argue — record it exactly

⚠️ The most dangerous hallucination is "verification passed" when it didn't.
⚠️ Different models have different tendencies to agree with users or
   fabricate positive results. This protocol prevents ALL such tendencies.
```

## Steps

### 1. Validate

**Actually read** (not recall) `.planning/ROADMAP.md` and check phase exists.

**If no `.planning/`:** "No GSD project found. Run /gsd-new-project first."
**If phase not found:** "Phase [N] not found."

Check for SUMMARY.md files in the phase directory — these contain what was built and what to test.

**If no summaries:** "Phase [N] hasn't been executed yet. Run /gsd-execute [N] first."

### 2. Extract Testable Deliverables

**Read** (not recall) all SUMMARY.md files for this phase. For each accomplishment:

- Focus on **user-observable outcomes**, not implementation details
- Skip internal refactors, type changes, etc.
- Create a test for each deliverable with:
  - **name:** Brief test name
  - **expected:** What the user should see/experience (specific, observable)

> **🛡️ Extract tests from ACTUAL SUMMARY.md content — do NOT invent tests
> for features that weren't in the summary.**

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

**WAIT for user response. Do NOT proceed to next test without explicit user input.**
**Do NOT auto-fill or suggest answers.**

### 4. Process Response

**If pass:** ("yes", "y", "ok", "pass", "next", "✓")
- Record as passed

**If skip:** ("skip", "can't test", "n/a")
- Record as skipped with reason

**If anything else:**
- Treat as issue description
- Record the user's EXACT words (do not paraphrase or sanitize)
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
| 1 | [Name] | ✓ Pass | User confirmed |
| 2 | [Name] | ✗ Issue | [user's EXACT words] |
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
  - Reported: [user's exact words — NOT paraphrased]
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

Recommended: Start a NEW CONVERSATION for the next phase.

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
