---
name: prompt-engineering
description: Write and iterate effective prompts and system prompts for LLMs (clarity, examples, structure, reasoning, output formats, evals). Use this skill whenever the user asks to write, improve or debug a prompt, system prompt, agent instructions, or a SKILL.md/CLAUDE.md-style instruction file.
---

# Prompt Engineering

## Principles
1. **Be specific**: task, audience, constraints, success criteria. Explain *why* rules exist—models generalize from reasons.
2. **Structure**: sections or XML tags (`<context>`, `<instructions>`, `<examples>`, `<input>`); data separated from instructions.
3. **Examples**: 2–5 diverse input→output pairs (including an edge case) beat long descriptions.
4. **Output contract**: format, length, schema, what to do when information is missing.
5. **Reasoning**: allow thinking before the answer for hard tasks; for structured tasks put reasoning in a separate field.
6. **Positive instructions** ("write in plain prose") over long lists of don'ts.
7. **Decompose** complex jobs into chained steps.
8. **Iterate with evals**: change one thing, run the test set, compare.

## Template
```
You are <role> helping <user> to <goal>.
<context>…</context>
Rules: …
Output: …
<examples>…</examples>
<input>{{input}}</input>
```

## Debugging
Wrong format → add example + schema. Ignores rule → move it near the end/make it concrete. Hallucination → require quotes/citations, allow "unknown". Verbose → give a length target. Inconsistent → lower temperature, add examples.

## Security
Never put secrets in prompts; treat retrieved/user text as untrusted data.
