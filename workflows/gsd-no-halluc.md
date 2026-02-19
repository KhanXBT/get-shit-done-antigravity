---
description: Strict Anti-Hallucination Q&A Mode — verify every claim before answering
---

# /gsd-no-halluc — Anti-Hallucination Q&A Mode

Activate GSD's strict verification engine for general technical questions and discussions. This mode forces the AI to provide evidence for every claim, cite sources, and admit uncertainty instead of guessing.

> **🛡️ ANTI-HALLUCINATION ACTIVE**
> Every answer in this mode must be: Verified, Cited, and Scored.

---

## Usage

```bash
/gsd-no-halluc [Your technical question here]
/no-halluc [Your technical question here]
```

---

## 🛡️ Response Protocol (Mandatory)

The AI MUST follow these steps before responding:

### 1. Verification Step (Pre-Answer)
Before writing a single word of the answer, the AI MUST use tools to verify the claim:
- **Project Questions**: Use `grep_search`, `find_by_name`, or `read_file` to verify the state of the codebase.
- **External/General Questions**: Use `search_web` or `read_url_content` (e.g., official docs) to verify facts, versions, or syntax.
- **Pattern Questions**: Use `list_dir` to understand structure before explaining it.

### 2. Answer Structure
Every answer must follow this structure:

**[Summary]**
A direct, concise answer to the question.

**[Evidence]**
- **Citations**: List specific file paths, line numbers, or URLs used for verification.
- **Tools Run**: Mention which tools were used to verify (e.g., "Verified via `search_web` in documentation").

**[Confidence Score]**
Rate the answer:
- **HIGH**: Claim is directly verified by primary source (code/official docs).
- **MEDIUM**: Claim is supported by secondary sources or reasonable inference based on verified facts.
- **LOW**: Source is ambiguous or claim could not be fully verified (Explain why).

### 3. Uncertainty Protocol
If a claim cannot be verified:
- Do NOT guess or halluncinate a "plausible" answer.
- Explicitly state: **"I could not verify [Specific Part] because [Reason]."**
- Suggest a way for the user to verify it manually or provide more context.

---

## 🚫 Forbidden Actions

1. **NO "I believe" or "I think"**: Replace with "According to [Source]..." or "The code at [File] shows..."
2. **NO Assumed Knowledge**: Even if you "know" the answer, you MUST run a tool to confirm the latest status/documentation.
3. **NO Plausible Fiction**: Never generate code snippets that you haven't verified against the actual library version being used.

---

## Examples

**Input:** `/no-halluc How does the loop detection algorithm work here?`
**Step 1:** AI runs `view_file` on `references/super-mode.md`.
**Step 2:**
> **Summary**: The loop detection uses a circular buffer of the last 10 changes to identify A→B→A→B patterns.
> **Evidence**: Verified in `references/super-mode.md` (lines 45-80).
> **Confidence Score**: HIGH

**Input:** `/no-halluc What is the latest version of Next.js?`
**Step 1:** AI runs `search_web` for "latest next.js version".
**Step 2:**
> **Summary**: The latest stable version is 15.1.x.
> **Evidence**: Verified via official Next.js blog at nextjs.org.
> **Confidence Score**: HIGH
