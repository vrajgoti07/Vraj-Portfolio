---
name: ci-cd-github-actions
description: Build CI/CD pipelines with GitHub Actions (lint, test, build, security scan, deploy, release). Use this skill whenever the user wants automated testing/deployment, mentions GitHub Actions, workflows, CI, CD, pipelines, or release automation.
---

# CI/CD with GitHub Actions

## Pipeline stages
`lint/format → type-check → unit tests → build → security scan → integration/e2e → publish artifact/image → deploy (staging → manual approval → prod)`.

## Template
```yaml
name: ci
on: { pull_request: {}, push: { branches: [main] } }
concurrency: { group: ci-${{ github.ref }}, cancel-in-progress: true }
permissions: { contents: read }
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: npm }
      - run: npm ci
      - run: npm run lint && npm run typecheck && npm test -- --coverage
```

## Best practices
- Least-privilege `permissions`; pin third-party actions to a version/SHA.
- Cache dependencies; matrix builds for versions/OS; reusable workflows for shared logic.
- Secrets in GitHub Secrets / OIDC federation to cloud (no long-lived keys).
- Environments with required reviewers for prod; protect `main` (required checks, PR reviews).
- Conventional commits + `release-please`/`semantic-release` for versioning & changelog.
- Dependabot/Renovate for updates; CodeQL for SAST.
- Deploy strategies: rolling, blue/green, canary; always have a rollback path.
