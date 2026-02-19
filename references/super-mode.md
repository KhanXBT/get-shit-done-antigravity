# Super Mode — Reference Guide

## Hallucination Loop Detection Algorithm

Super mode runs autonomously for extended periods. Without loop detection, the AI could get stuck retrying the same broken approach forever.

### The Algorithm

```
STATE:
  error_history = []     # Last N errors encountered
  approach_history = []  # Approaches tried for current blocker

ON_ERROR(error, approach):
  error_history.append({ error, approach, timestamp })
  
  # Count identical errors (same error message)
  same_count = count(error_history where error matches current)
  
  IF same_count >= 3:
    # SAME ERROR 3+ TIMES → Current approach is wrong
    SWITCH_APPROACH:
      - Try a fundamentally different solution
      - Different library, pattern, or architecture
      - Simpler implementation if possible
      - Log: "Approach [X] failed 3 times. Switching to [Y]."
    
    approach_history.append(current_approach)
    
    IF len(approach_history) >= 5:
      # 5 DIFFERENT APPROACHES ALL FAILED → Stuck
      STOP_AND_NOTIFY:
        - Halt autonomous execution
        - Present full error log to user
        - Show all 5 approaches tried
        - Ask for guidance
        - Resume after user input

ON_CIRCULAR_DETECTION:
  # Detects: applying fix, then reverting it, then re-applying
  IF current_change reverses a recent change:
    - STOP immediately
    - Re-read ALL relevant files fresh
    - Start task from scratch
    - If circular again after fresh start → STOP_AND_NOTIFY
```

### What Counts as "Same Error"

| Same Error | Not Same Error |
|-----------|---------------|
| Same error message text | Same file, different error |
| Same line, same type | Same type, different file |
| Same test failing same way | Same test, different failure mode |

### Approach Change Examples

| If failing approach is... | Try instead... |
|--------------------------|---------------|
| Complex regex validation | Simple string checks |
| Custom auth system | Auth library (NextAuth, Lucia) |
| REST API | GraphQL, or vice versa |
| CSS Grid layout | Flexbox layout |
| Client-side rendering | Server-side rendering |
| Direct database queries | ORM with abstractions |

## Autonomy Modes

### Mode A — Full Autonomy
- Zero pauses after interview
- AI runs all phases continuously
- User checks result at the end
- Auto-debug on failures (with loop detection)
- Best for: small-medium projects, trusted AI output

### Mode B — Milestone Pauses  
- Pauses after each phase completes
- Shows: what was built, screenshots, test results
- User can: approve and continue, request changes, stop
- Best for: larger projects, wanting oversight without micromanagement

### Mode C — Custom Checkpoints
- User defines specific pause points during interview
- Examples: "Pause after database schema", "Ask before payment flow"
- AI checks pause conditions before each task
- Best for: projects with critical sections needing human review

## Branch Management

### Existing Projects
```
git checkout -b gsd-super/[feature-name-from-prd]
# All work happens on this branch
# Main branch is NEVER touched
# No existing files are deleted

# After super completes:
# User can review the branch and merge when ready:
git checkout main
git merge gsd-super/[feature-name]
```

### New Projects
```
# Work directly on main (nothing to protect)
git init  # if needed
# All commits go to main
```

## Safety Guarantees

1. **Reversibility** — Every commit is atomic. Any point can be reverted.
2. **Branch isolation** — Existing code is never at risk.
3. **No file deletion** — Existing files are never deleted without explicit instruction.
4. **No credential exposure** — Never hardcodes secrets, always uses env vars.
5. **Graceful failure** — If stuck, stops and asks rather than breaking things.
6. **Full transparency** — Final report lists every file created/modified.
