---
name: project-documentation
description: Write excellent READMEs, API docs, architecture docs, ADRs, changelogs and contributor guides so others can use and extend a project. Use this skill whenever the user asks for a README, documentation, project description for GitHub, how-to guide, or wants a repo to look professional.
---

# Project Documentation

## README structure
1. Name + one-line value proposition + badges  2. Screenshot/GIF/demo link  3. Features
4. Tech stack  5. **Quick start** (copy-paste commands that work)  6. Configuration (env table)
7. Project structure  8. Usage/examples  9. Testing  10. Deployment  11. Roadmap  12. Contributing  13. License.

## Principles
Write for a newcomer; test the quick start on a clean machine; show, don't tell (examples, screenshots); keep docs next to code and update in the same PR; prefer short sections with headings.

## Other docs
- **ARCHITECTURE.md**: diagram, components, data flow, key decisions.
- **ADRs** (`docs/adr/0001-title.md`): Context → Decision → Consequences.
- **API docs**: OpenAPI/Swagger UI, example requests/responses, error codes.
- **CHANGELOG.md**: Keep a Changelog format + SemVer.
- **CONTRIBUTING.md / CODE_OF_CONDUCT.md / SECURITY.md**, issue and PR templates.
- **Runbooks** for operations: alerts, rollbacks, restore.

## Mermaid diagram tip
Use fenced `mermaid` blocks in Markdown for flows/architecture; GitHub renders them.
