# Super Mode — Reference Guide

## Overview

Super Mode (`/gsd-super`) is GSD Antigravity's fully autonomous execution mode. This reference documents the algorithms, protocols, and safety mechanisms that make autonomous operation reliable.

> **This is a 🆕 GSD Antigravity invention.** Not found in the original GSD or any other AI coding tool.

---

## Hallucination Loop Detection Algorithm

Super mode runs autonomously for extended periods. Without loop detection, the AI could get stuck retrying the same broken approach forever. This algorithm prevents that.

### The Algorithm

```
STATE:
  error_history = []       # All errors encountered
  approach_history = []    # Approaches tried for current blocker
  circular_buffer = []     # Last 10 code changes for pattern detection

ON_ERROR(error, approach):
  error_history.append({
    error_message: error.message,
    error_type: classify(error),    # SYNTAX/TYPE/LOGIC/RUNTIME/ENV/INT
    file: error.file,
    line: error.line,
    approach: approach.description,
    result: approach.outcome,
    timestamp: now()
  })
  
  # Count identical errors (same error message + same file)
  same_errors = filter(error_history, 
    e => e.error_message == error.message AND e.file == error.file)
  
  IF len(same_errors) >= 3:
    # ESCALATION LEVEL 1: Same approach failing
    trigger_approach_switch()
    
  IF len(approach_history) >= 5:
    # ESCALATION LEVEL 2: Multiple approaches failing
    trigger_user_notification()

ON_CODE_CHANGE(change):
  circular_buffer.append({
    file: change.file,
    added: change.added_lines,
    removed: change.removed_lines,
    timestamp: now()
  })
  
  # Detect circular patterns
  IF detect_circular_pattern(circular_buffer):
    trigger_fresh_start()


FUNCTION trigger_approach_switch():
  """3+ identical errors → current approach is fundamentally wrong"""
  
  current = approach_history[-1]
  
  # Generate alternative approaches based on failure type
  alternatives = generate_alternatives(current)
  # Examples:
  #   If using library X → try library Y
  #   If complex pattern → try simpler pattern
  #   If custom implementation → try established library
  #   If one architecture → try different architecture
  
  approach_history.append(current)
  execute(alternatives[0])


FUNCTION trigger_user_notification():
  """5+ approaches all failed → need human input"""
  
  report = format_stuck_report(
    problem: current_error,
    approaches: approach_history,
    files: affected_files,
    hypothesis: best_guess_cause
  )
  
  notify_user(report)
  wait_for_response()
  resume_with_guidance()


FUNCTION detect_circular_pattern(buffer):
  """Detect A→B→A→B or undo-redo patterns"""
  
  IF len(buffer) < 4:
    return false
    
  # Check if recent changes reverse earlier changes
  FOR i in range(len(buffer) - 1):
    FOR j in range(i + 1, len(buffer)):
      IF buffer[i].added == buffer[j].removed AND
         buffer[i].removed == buffer[j].added:
        return true  # Detected: adding then removing same code
  
  return false


FUNCTION trigger_fresh_start():
  """Circular pattern detected → re-read everything from disk"""
  
  1. STOP current task
  2. Re-read ALL relevant files from disk (not memory)
  3. Re-read the PLAN.md
  4. Re-read error_history
  5. Clear circular_buffer
  6. Attempt task with completely fresh context
  
  IF still_stuck_after_fresh_start():
    trigger_user_notification()
```

### What Counts as "Same Error"

| Same Error | Not Same Error |
|-----------|---------------|
| Same error message + same file | Same file, different error message |
| Same assertion failure + same test | Same test, different assertion |
| Same type error + same property | Same type, different property |
| Same build error + same module | Same build step, different module |

### What Counts as "Different Approach"

| Current Approach | Alternative Approaches |
|-----------------|----------------------|
| Complex regex validation | Simple string checks, validation library (Zod, Yup) |
| Custom auth system | Auth library (NextAuth, Lucia, Clerk) |
| REST API design | GraphQL, tRPC, or restructured REST |
| CSS Grid layout | Flexbox layout, or CSS framework component |
| Client-side rendering | Server-side rendering, static generation |
| Direct database queries | ORM (Prisma, Drizzle), query builder |
| Manual state management | State library (Zustand, Jotai) |
| Fetch API | Axios, or built-in framework data fetching |
| Custom form handling | Form library (React Hook Form, Formik) |
| Manual file upload | Upload library (UploadThing, S3 SDK) |

---

## Autonomy Modes — Detailed Specification

### Mode A — Full Autonomy

```
BEHAVIOR:
  - Zero pauses after interview is locked
  - AI runs ALL phases continuously without stopping
  - All debug events handled autonomously
  - Only stops if: stuck (5 approaches fail) or emergency
  
PROGRESS TRACKING:
  - Updates .planning/SUPER-PROGRESS.md after each task
  - Full progress report in final notification
  
USER INTERACTION:
  - None during execution
  - Single notification when 100% complete
  - Or notification if stuck (with full diagnostic)
  
BEST FOR:
  - Small-medium projects (1-3 phases)
  - High confidence in PRD clarity
  - User trusts the AI's technical judgment
  - "I'll check it when it's done" mindset

RISK LEVEL: Medium
  - Higher risk of building something slightly different from vision
  - But: faster completion, no waiting for approvals
```

### Mode B — Milestone Pauses

```
BEHAVIOR:
  - Pauses after each PHASE completes
  - Shows progress report + phase summary
  - Waits for user response:
    "Phase [N] complete. [summary]
     
     → Reply 'continue' to proceed to Phase [N+1]
     → Reply with feedback to adjust before continuing
     → Reply 'stop' to halt autonomous execution"
  
PROGRESS TRACKING:
  - Same as Mode A, plus phase-end reports
  
USER INTERACTION:
  - One interaction per phase (brief unless issues found)
  - User can redirect, adjust priorities, or stop
  
BEST FOR:
  - Medium-large projects (3-8 phases)
  - When user wants oversight without micromanagement
  - Projects with some ambiguity in requirements
  - "Show me checkpoints but don't ask me every 5 minutes"

RISK LEVEL: Low
  - Catches direction issues early
  - Each phase is a natural review point
```

### Mode C — Custom Checkpoints

```
BEHAVIOR:
  - User defines specific pause points during interview
  - Examples of valid pause points:
    • "Pause after the database schema is set up"
    • "Ask me before building the payment flow"
    • "Show me the UI before adding the API"
    • "Pause when authentication is ready to test"
  
  MATCHING LOGIC:
    Before each task, check if task matches any pause condition:
    - Keyword matching: task name/description contains pause keyword
    - Phase matching: pause at end of specific phase
    - Feature matching: pause when specific feature area is complete
    
    IF match found:
      → Complete current task
      → Show progress + what's been built
      → Show what's coming next
      → Wait for user approval
  
PROGRESS TRACKING:
  - Same as Mode A, plus checkpoint reports
  
USER INTERACTION:
  - Only at user-defined points
  - Fully autonomous between checkpoints
  
BEST FOR:
  - Projects with known critical sections
  - When certain features need human review (payments, auth, data migration)
  - Experienced users who know exactly where risks are
  - "I trust you with everything except [X]"

RISK LEVEL: Custom (depends on checkpoint density)
  - More checkpoints = lower risk, slower
  - Fewer checkpoints = higher risk, faster
```

---

## Branch Management — Detailed Rules

### Existing Projects

```
DETECTION:
  IF any of these exist → EXISTING PROJECT:
    - package.json with dependencies
    - src/ or app/ directory with source files
    - .git with >1 commit
    - Any language-specific project files (go.mod, Cargo.toml, etc.)
    
  IF only these exist → still NEW PROJECT:
    - .git (bare init)
    - .gitignore
    - README.md (empty or template)
    - LICENSE

BRANCH RULES:
  1. Create branch: gsd-super/[feature-name-from-prd]
     - Name derived from PRD: "Add user dashboard" → gsd-super/user-dashboard
     - Sanitize: lowercase, hyphens, no special chars
     
  2. All commits go to this branch
  
  3. PROTECTED ACTIONS (never do on existing project):
     - Delete any existing file
     - Modify any file not in the PRD scope
     - Change package.json major versions without research
     - Alter database schema without migration
     - Remove any existing test
     
  4. After completion:
     - Provide merge instructions
     - List potential conflicts
     - Suggest review points

CONFLICT PREVENTION:
  - Before modifying shared files (layouts, configs, globals):
    → Read current content
    → Make ADDITIVE changes only
    → Never restructure existing code
  - If conflict unavoidable:
    → Document in SUMMARY.md
    → Provide manual merge guidance
```

### New Projects

```
DETECTION:
  Empty directory or directory with only boilerplate files.
  
RULES:
  1. Work directly on main branch
  2. Initialize git: git init (if needed)
  3. All commits go to main
  4. Standard commit history
  5. No special branch management needed
```

---

## Safety Guarantees — Comprehensive

### Tier 1: Data Safety
```
1. NEVER delete existing files (on existing projects)
2. NEVER use git reset --hard (always git revert)
3. NEVER overwrite .env with real credentials
4. ALL commits are atomic and independently revertable
5. Full attempt history preserved in git log
```

### Tier 2: Execution Safety
```
6.  STOP if stuck — never loop infinitely
7.  Max 5 approaches per problem before asking human
8.  Hallucination loop detection active at all times
9.  Emergency stop on safety violations
10. Graceful shutdown preserves all state
```

### Tier 3: Code Safety
```
11. No secrets hardcoded in source code
12. Input validation on all user inputs
13. No eval() or equivalent dynamic code execution
14. Dependencies verified against security advisories
15. HTTPS enforced on all external communications
```

### Tier 4: Process Safety
```
16. NEVER skip tests to make builds pass
17. NEVER auto-merge into main (on existing projects)
18. ALWAYS run full verification after every task
19. ALWAYS document decisions and trade-offs
20. ALWAYS notify user when blocked or stuck
```

---

## SUPER-CONFIG.md Template

This file is created during the interview and referenced throughout execution:

```markdown
# GSD Super Configuration

## Project
- **Name**: [from PRD/prompt]
- **Description**: [1-2 sentence summary]
- **Type**: [New project / Enhancement to existing]
- **Branch**: [main / gsd-super/feature-name]

## User Preferences
- **Autonomy Mode**: [A/B/C]
- **Custom Stops**: [if Mode C, list specific pause points]
- **Approval Mode**: [AI decides / Human approves roadmap]
- **Testing Mode**: [Visual / Automated / Both]
- **Quality Bar**: [MVP / Production]

## Tech Stack
- **Language**: [TypeScript / JavaScript / Python / etc.]
- **Framework**: [Next.js / React / etc.]
- **Database**: [PostgreSQL / SQLite / etc.]
- **Auth**: [NextAuth / Clerk / Custom / None]
- **UI/CSS**: [Tailwind / shadcn / MUI / Vanilla]
- **Package Manager**: [npm / yarn / pnpm / bun]

## Deployment
- **Target**: [Vercel / Netlify / Railway / Local only]
- **Domain**: [if specified]

## Integrations
- **External APIs**: [list with key status]
- **Third-party services**: [list]

## Locked Decisions
[Verbatim user decisions from interview — NEVER modify these]

## Interview Timestamp
[ISO timestamp of when interview was completed]
```

---

## SUPER-PROGRESS.md Template

Updated after every task during execution:

```markdown
# GSD Super Progress

## Overall
- **Status**: [IN PROGRESS / COMPLETE / STUCK]
- **Progress**: [X/Y phases complete]
- **Started**: [timestamp]
- **Elapsed**: [duration]

## Phase Breakdown
| Phase | Status | Tasks | Commits | Issues |
|-------|--------|-------|---------|--------|
| 1. [Name] | ✅ | 8/8 | 8 | 0 |
| 2. [Name] | 🔄 | 5/12 | 5 | 1 (resolved) |
| 3. [Name] | ⏳ | 0/10 | 0 | - |

## Current Activity
- **Phase**: [N]
- **Task**: [task name]
- **Action**: [what's happening right now]

## Debug Events
| # | Error | Approach | Result | Phase |
|---|-------|----------|--------|-------|
| 1 | [error] | [fix] | ✅ Resolved | 1 |
| 2 | [error] | [fix] | ✅ Resolved | 2 |

## Quality Gate Results
| Phase | Functional | Code Quality | Tests | Build | Security |
|-------|-----------|-------------|-------|-------|----------|
| 1 | ✅ | ✅ | ✅ | ✅ | ✅ |
| 2 | ✅ | ✅ | ⏳ | ⏳ | ⏳ |
```
