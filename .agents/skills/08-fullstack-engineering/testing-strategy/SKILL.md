---
name: testing-strategy
description: Plan and write effective automated tests across stack layers (unit, integration, API, E2E, load) with good coverage and no flakiness. Use this skill whenever the user asks to add tests, improve coverage, set up pytest/jest/vitest/Playwright, or fix flaky tests.
---

# Testing Strategy

## Pyramid
Many fast **unit** tests → fewer **integration** (real DB via Testcontainers) → few **E2E** (Playwright/Cypress/integration_test) for critical journeys → targeted **load** tests (k6/Locust) before launch.

## Good test habits
- Arrange–Act–Assert; one behavior per test; descriptive names (`rejects_expired_token`).
- Test behavior, not implementation; don't mock what you own—mock boundaries (network, clock, email).
- Deterministic: fixed seeds/time, isolated data, no order dependence.
- Fast feedback: run unit tests on save, full suite in CI, parallelize.
- Cover edge cases: empty, null, max size, unauthorized, concurrent, timeouts.
- Bug found → write a failing test first, then fix.

## What to test per layer
API: status codes, schema, auth/permissions, validation errors, pagination. DB: constraints, migrations up/down. UI: user-visible behavior with Testing Library; a11y checks. ML: data schema, metric floors, slice performance. LLM: eval suite.

## Flaky tests
Remove sleeps (wait on conditions), isolate state, stub time/network, retry only as a last resort and track.

## Targets
Meaningful coverage (~70–85% on core logic) beats 100% vanity; gate PRs on tests passing.
