---
name: fullstack-project-scaffold
description: Scaffold clean full-stack repositories (monorepo or polyrepo) with frontend, backend, database, env config, Docker, linting and CI from day one. Use this skill whenever the user starts a new project, asks for a folder structure, boilerplate, starter template, or monorepo setup.
---

# Full-Stack Project Scaffold

## Monorepo layout
```
my-app/
├── apps/
│   ├── web/          # Next.js
│   ├── api/          # FastAPI / NestJS
│   └── mobile/       # Flutter
├── packages/         # shared types, ui, config (pnpm/turbo)
├── infra/            # docker, terraform, k8s
├── docs/             # architecture, ADRs, runbooks
├── .github/workflows/
├── docker-compose.yml
├── .env.example
├── Makefile          # make dev | test | lint | build
└── README.md
```

## Day-one checklist
- [ ] `git init`, `.gitignore`, LICENSE, conventional commits
- [ ] Formatter + linter + type-check + pre-commit hooks
- [ ] `.env.example` with every variable documented; real `.env` ignored
- [ ] `docker compose up` starts app + db + cache with seed data
- [ ] CI: lint, test, build on every PR
- [ ] Health endpoint, structured logging, error tracking hook
- [ ] README: what, prerequisites, quick start, scripts, architecture, deploy

## Shared contract
Define API once with OpenAPI → generate TypeScript/Dart clients so frontend and mobile stay in sync.

## Config rules
Typed env loading that fails fast; separate dev/stage/prod; no secrets in repo; feature flags for risky releases.
