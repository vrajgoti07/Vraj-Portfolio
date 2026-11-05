---
name: project-orchestrator
description: Master skill that plans and builds complete projects end to end (web app, mobile app, API, ML product, AI agent) by routing to the other skills in this library. Use this skill whenever the user says "build me an app/project/website/agent", wants a full-stack product, asks where to start, or gives a broad idea without technical details.
---

# Project Orchestrator

## Step 1 — Clarify (max 5 questions, skip what's obvious)
Who are the users? Core problem? Platforms (web/Android/iOS)? Must-have features for v1? Deadline/budget/stack preferences?

## Step 2 — Write a one-page spec
Goal · Users · v1 features (MoSCoW) · Out of scope · Data entities · Screens/flows · Non-functional needs (security, scale, offline).

## Step 3 — Choose the stack and load skills
| Project type | Default stack | Skills to read |
|---|---|---|
| Web SaaS | Next.js + TypeScript + Postgres + Prisma | `react-nextjs`, `ui-ux-design-system`, `tailwind-css`, `postgresql-sql`, `orm-prisma-sqlalchemy`, `auth-security`, `rest-api-design` |
| Mobile app | Flutter + Firebase/Supabase or own API | `flutter-architecture`, `flutter-state-management`, `flutter-ui-design`, `flutter-backend-integration` |
| API backend | FastAPI or NestJS + Postgres + Redis | `python-fastapi`/`nodejs-nestjs-express`, `rest-api-design`, `redis-caching` |
| ML product | Python + sklearn/PyTorch + FastAPI | `ml-fundamentals-sklearn`, `pytorch-deep-learning`, `mlops-model-deployment` |
| AI assistant / agent | LLM API + RAG + tools | `llm-app-development`, `rag-systems`, `ai-agents-langgraph`, `ai-agent-security-evals` |
| Always | | `git-workflow-code-review`, `testing-strategy`, `docker-containers`, `ci-cd-github-actions`, `project-documentation` |

## Step 4 — Build in vertical slices
1. Scaffold repo + CI + lint (`fullstack-project-scaffold`).
2. Walking skeleton: one feature end-to-end (UI → API → DB → deploy).
3. Add features slice by slice, each with tests.
4. Polish UI states, errors, accessibility.
5. Harden security, performance, observability.
6. Deploy, document, hand off.

## Definition of done (every feature)
Works end-to-end · tests pass · errors handled · responsive + accessible · no secrets in code · documented · reviewed.

## Communication
Explain decisions briefly; show how to run; list next steps; flag assumptions and risks.
