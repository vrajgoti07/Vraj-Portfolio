---
name: llm-app-development
description: Build reliable LLM-powered applications (API usage, structured output, streaming, tool calling, caching, cost and latency control, guardrails). Use this skill whenever the user builds a chatbot, AI feature, or app calling an LLM API (Anthropic Claude, OpenAI, Gemini, open models), or asks about prompts in production.
---

# LLM App Development

## Architecture
`UI → backend (never expose API keys client-side) → LLM gateway/wrapper → provider`. Wrap the provider behind one interface so models are swappable.

## Core practices
1. **Structured output**: ask for JSON matching a schema; validate with Pydantic/Zod; retry once with the validation error.
2. **Streaming** for chat UX (SSE); show partial tokens; handle cancel.
3. **System prompt** = role, rules, format, examples; keep user content separated and clearly delimited (XML-style tags).
4. **Tool calling** for actions/data: small clear tool schemas, validate args, return concise results, cap loop iterations.
5. **Context management**: summarize/trim history; retrieve instead of stuffing; use prompt caching for large static prefixes.
6. **Reliability**: timeouts, exponential-backoff retries on 429/5xx, fallback model, idempotent tool actions.
7. **Cost/latency**: smallest model that passes evals; cache identical requests; batch offline work; limit `max_tokens`.
8. **Safety**: treat model output as untrusted (escape HTML, don't exec), defend against prompt injection (see ai-agent-security), log with PII redaction, per-user rate limits.

## Evals first
Build a 30–100 case eval set from real examples; run on every prompt/model change; track pass rate, cost, latency. Use LLM-as-judge only with a rubric and spot-checks.

## Check current docs
Model names, limits and pricing change often — verify against the provider's documentation before hard-coding.
