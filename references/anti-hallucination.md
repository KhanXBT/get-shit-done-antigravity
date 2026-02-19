# Anti-Hallucination & Multi-Model Safeguards

GSD for Antigravity goes beyond the original GSD by adding **model-agnostic anti-hallucination patterns** that work across all AI models — Claude, Gemini, GPT, and open-source models.

## The Problem

Different AI models hallucinate differently:

| Model Family | Common Hallucination Patterns |
|-------------|------------------------------|
| **GPT** | Confident fabrication of APIs, packages, and URLs that don't exist |
| **Claude** | Agrees with user assumptions even when incorrect; polite hallucination |
| **Gemini** | Mixes real and fabricated information; plausible-sounding synthesis |
| **Open-source** | Higher baseline hallucination rate; less self-correction ability |

**Antigravity may switch models between conversations or even mid-task.** This means anti-hallucination strategies cannot rely on model-specific behavior — they must be structural.

## Core Principles

### 1. Trust Files, Not Memory

```
RULE: When in doubt, READ THE FILE — don't recall from context.
```

- Before referencing any planning document, **re-read it from disk**
- Never quote requirements, decisions, or roadmap items from memory
- If a workflow step says "check ROADMAP.md," literally `view_file` on ROADMAP.md
- Treat context as volatile — files as source of truth

### 2. Verify Before Asserting

```
RULE: Never state a technical fact without a source.
```

Source verification hierarchy for Antigravity:
1. **`read_url_content`** — Fetch official documentation directly
2. **`search_web`** — Search for current information
3. **Existing codebase** — Check what's actually in the project files
4. **Training data** — Use ONLY when verified by above sources

Confidence levels:
- **HIGH**: Verified via official docs or `read_url_content`
- **MEDIUM**: Found via `search_web` + cross-referenced
- **LOW**: From training data only — FLAG THIS to the user

### 3. Never Hallucinate Completion

```
RULE: WAIT for user confirmation — do NOT assume a step passed.
```

After any checkpoint or verification step:
- **STOP** executing further tasks
- **PRESENT** results to user via `notify_user`
- **WAIT** for explicit confirmation before continuing
- Never say "tests pass" without actually running them
- Never say "looks correct" without actually reading the output

### 4. Context Freshness

```
RULE: Start a new conversation for each major workflow phase.
```

The original GSD uses `/clear` to get a fresh context window. In Antigravity:
- **Between phases**: Recommend "start a new conversation, then run `/gsd-execute 2`"
- **Between plan and execute**: Each should ideally be a separate conversation
- **If context feels stale**: Re-read STATE.md and the relevant plan files from scratch
- **After errors**: Re-read the original plan before retrying — don't rely on your memory of it

### 5. Atomic Verification

```
RULE: Verify each task IMMEDIATELY after completion, not in batch.
```

- Run tests/build after each task, not after the whole phase
- If a verification fails, stop and report — don't continue hoping it resolves
- Write verification results to SUMMARY.md as you go

## Multi-Model Safeguards

### For All Models

Every workflow step should follow this pattern:

```
1. READ the relevant planning files (don't recall from memory)
2. EXECUTE the task using Antigravity tools
3. VERIFY the output by reading actual files/running actual commands
4. RECORD the result in the appropriate summary file
5. REPORT to user if human verification is needed
```

### Model-Specific Awareness

Since Antigravity rotates models, the workflow instructions use guardrails that work structurally:

| Guardrail | What It Prevents | How |
|-----------|-----------------|-----|
| **File-first context** | Stale/fabricated context | Always re-read files before acting |
| **Explicit verification commands** | False "it works" claims | Instructions specify exact commands to run |
| **Structured output formats** | Rambling/drifting responses | XML task plans and structured markdown |
| **STATE.md updates** | Lost progress/decisions | Written record of what happened |
| **Checkpoint gates** | Skipped human validation | Explicit stop-and-wait points |
| **Source citations** | Fabricated technical facts | Every claim needs a verifiable source |

### Antigravity-Specific Adaptations

Unlike the original GSD (Claude-only), Antigravity workflows:

1. **Don't rely on `/clear`** — Instead recommend new conversations
2. **Don't assume subagent spawning** — Use sequential task execution
3. **Don't reference Context7 MCP** — Use `read_url_content` and `search_web` instead
4. **Include explicit re-read instructions** — "Before starting, `view_file` on STATE.md"
5. **Use `notify_user` for ALL checkpoints** — Blocks until user confirms

## Quick Reference: Anti-Hallucination Checklist

Before ANY task execution:
- [ ] Re-read STATE.md for current position
- [ ] Re-read the specific plan file being executed
- [ ] Verify file paths exist before modifying them

During task execution:
- [ ] Run build/test after each task (not in batch)
- [ ] Read command output — don't assume success
- [ ] If something looks wrong, STOP and report

After task execution:
- [ ] Verify outputs by reading actual files
- [ ] Update STATE.md with what happened
- [ ] If human verification needed, use `notify_user` and WAIT

Research tasks:
- [ ] Use `read_url_content` for official docs
- [ ] Use `search_web` for current information
- [ ] Never state API details from training data alone
- [ ] Assign confidence levels to all findings
- [ ] Flag LOW confidence items explicitly to user
