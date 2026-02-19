# Model Resilience — Maintaining Code Quality Across Model Switches

Antigravity rotates between AI models (Claude, Gemini, GPT, open-source) based on quota, availability, and task type. **Code quality MUST remain consistent regardless of which model is active.**

## The Problem

When Claude's quota is exceeded, Antigravity switches to Gemini or GPT. Different models have different coding strengths:

| Model | Coding Strength | Weakness |
|-------|----------------|----------|
| **Claude** | Complex architecture, nuanced refactoring, long-range context | — |
| **Gemini** | Good at following patterns, fast | May simplify complex logic, less precise naming |
| **GPT** | Strong boilerplate, common patterns | May over-engineer simple tasks |
| **Open-source** | Basic implementations | May miss edge cases, weaker error handling |

**Without safeguards**, a model switch mid-phase can produce:
- Inconsistent code style within the same feature
- Simplified logic that misses edge cases from the plan
- Different naming conventions across files
- Missing error handling or validation
- Weaker TypeScript types or incomplete interfaces

## Solution: Make Plans Do the Heavy Lifting

The key insight: **if the plan is detailed enough, even a weaker model produces good code.**

### Principle: Plan-Driven Quality

```
RULE: The PLAN is the quality guarantee, not the model.
Plans must be so detailed that ANY model can execute them correctly.
```

Instead of:
```xml
<action>Create a login endpoint that validates credentials</action>
```

Write:
```xml
<action>
Create POST /api/auth/login endpoint in src/api/auth/login.ts

1. Import: bcrypt, jwt, prisma client
2. Validate request body: { email: string, password: string }
   - Return 400 if fields missing, with { error: "Email and password required" }
3. Find user by email using prisma.user.findUnique({ where: { email } })
   - Return 401 if not found, with { error: "Invalid credentials" }
4. Compare password with bcrypt.compare(password, user.passwordHash)
   - Return 401 if mismatch (same error as user not found — prevents enumeration)
5. Generate JWT with jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' })
6. Set httpOnly cookie: res.cookie('token', jwt, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 7*24*60*60*1000 })
7. Return 200 with { user: { id, email, name, role } } (never return passwordHash)

Error handling: wrap in try/catch, return 500 with { error: "Internal server error" } (no stack trace in production)
</action>
```

**Any model can follow the second version correctly.**

## Code Quality Anchoring Strategies

### 1. Style Anchoring — Read Before Write

```
RULE: Before writing ANY code, read 2-3 existing files in the same area.
Match their EXACT patterns for:
- Import ordering
- Naming conventions (camelCase vs PascalCase vs kebab-case)
- Error handling patterns
- Comment style
- Type definition patterns
- Export style (named vs default)
```

This works because you're giving the model concrete examples to follow, not relying on its training data for style.

### 2. Pattern Specification in Plans

When creating plans in `/gsd-plan`, include a **Code Patterns** section:

```markdown
## Code Patterns to Follow

Reference these existing files for style:
- `src/api/users/get-user.ts` — endpoint structure
- `src/types/user.ts` — type definition pattern
- `src/utils/validate.ts` — validation helper pattern

Naming: kebab-case files, camelCase variables, PascalCase types
Errors: Always use AppError class from src/utils/errors.ts
Types: Define interfaces in src/types/, import them — no inline types
Tests: Co-locate as [name].test.ts, use describe/it pattern
```

### 3. Verification-Driven Quality

```
RULE: After EVERY task, run ALL applicable checks:
1. TypeScript: tsc --noEmit (catches type errors)
2. Lint: eslint/biome (catches style violations)  
3. Tests: test runner (catches logic errors)
4. Build: build command (catches import/export errors)

If ANY check fails → FIX before committing.
This catches quality issues regardless of which model wrote the code.
```

### 4. Atomic Task Sizing

```
RULE: Keep tasks SMALL — one function, one component, one endpoint.
Smaller tasks = less room for model quality differences to compound.
```

A weaker model writing one function is much less risky than a weaker model writing an entire module.

### 5. Code Review Checkpoints

For complex tasks, add a checkpoint BEFORE committing:

```xml
<task type="auto">
  <name>Implement payment processing</name>
  <action>[detailed instructions]</action>
  <verify>
    1. tsc --noEmit → no errors
    2. npm test -- --filter=payment → all pass
    3. checkpoint:human-verify → Show the user the implementation for review
       (complex financial logic — worth a human eye regardless of model)
  </verify>
</task>
```

### 6. Existing Code as Context

```
RULE: When modifying an existing file, ALWAYS include the current 
file contents in context before making changes.

read file → understand patterns → apply changes matching style

NEVER write changes "from memory" of what the file looks like.
```

## Implementation in GSD Workflows

### In /gsd-plan (Plan Creation)

Plans must include:
1. **Detailed action steps** — specific enough for any model
2. **Code patterns section** — reference files to match
3. **Explicit error handling** — don't leave it to model judgment
4. **Type definitions** — spell out interfaces, don't let models infer them
5. **Verification commands** — exact commands, not "run tests"

### In /gsd-execute (Task Execution)

Before each task:
1. Read existing code in the same area (style anchoring)
2. Re-read the exact plan (not from memory)
3. Check for code patterns section in the plan

After each task:
1. Run ALL verification commands (lint, type-check, test, build)
2. If any fail → fix immediately before committing
3. Read the committed files once more to verify consistency

### In /gsd-quick (Quick Tasks)

Quick tasks skip planning depth, making them the highest risk for quality drops:
1. ALWAYS read surrounding code before writing
2. Run full verification suite even for small changes
3. If the quick task is complex, suggest using `/gsd-plan` instead

## Model Switch Detection

If you notice quality indicators suggesting a model switch:
- Style suddenly inconsistent with existing code
- Error handling becomes sparser
- Type annotations become less precise
- Comments become generic instead of specific

**Response**: Re-read existing files for style anchoring and apply the code patterns more strictly.

## Summary

| Strategy | What It Does | When Applied |
|----------|-------------|-------------|
| **Detailed Plans** | Make plans executable by any model | `/gsd-plan` |
| **Style Anchoring** | Read existing code before writing new code | `/gsd-execute`, `/gsd-quick` |
| **Pattern Specs** | Include reference files in every plan | `/gsd-plan` |
| **Verification Suite** | Run lint+types+tests+build after every task | `/gsd-execute`, `/gsd-quick` |
| **Atomic Tasks** | Small tasks = less quality risk | `/gsd-plan` |
| **Code Review Gates** | Human review for complex logic | `/gsd-execute` |
| **File Re-reads** | Never modify from memory | All workflows |
