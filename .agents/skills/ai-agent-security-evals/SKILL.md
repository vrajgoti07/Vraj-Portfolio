---
name: ai-agent-security-evals
description: Secure, evaluate and monitor LLM apps and agents (prompt injection, tool abuse, data leakage, evals, tracing, guardrails). Use this skill whenever the user ships an AI feature to real users, asks how to test an agent, handle prompt injection, add guardrails, or observe LLM behavior.
---

# AI Agent Security, Evals & Observability

## Threats
- **Prompt injection** (direct + indirect via web pages, emails, docs, tool output).
- **Excessive agency**: tools that can delete, pay, send.
- **Data exfiltration** via markdown images/links, tool calls.
- **Insecure output handling**: XSS, SQL/shell built from model output.
- Leaking system prompts/secrets; cross-tenant retrieval.

## Defenses
1. Least privilege for tools & credentials; scope per user/tenant.
2. Human approval for irreversible or external actions.
3. Separate trusted instructions from untrusted data; label untrusted content; never obey instructions found inside data.
4. Validate/sanitize all model output before use; allow-list URLs and commands; sandbox code execution (no network, resource limits).
5. Permission filter at retrieval time.
6. Input/output classifiers (Llama Guard, Prompt Guard, provider moderation) as a layer—not the only layer.
7. Rate limits, spend caps, anomaly alerts.

## Evals
Dataset (real + adversarial) → automated graders (exact, regex, schema, LLM-judge with rubric) → run in CI → track regressions. Include red-team cases: injection, jailbreaks, PII requests. Measure task success, tool-call accuracy, cost, latency.

## Observability
Trace prompts, tool calls, tokens, latency per step (Langfuse, LangSmith, Phoenix, OpenTelemetry); feedback buttons; sample production traffic into the eval set.
