---
name: git-workflow-code-review
description: Use Git and GitHub professionally (branching, commits, PRs, reviews, releases) and push projects to GitHub. Use this skill whenever the user asks how to commit, branch, push to GitHub, resolve merge conflicts, write PRs, review code, or manage releases.
---

# Git Workflow & Code Review

## Push a new project to GitHub
```bash
git init -b main
git add . && git commit -m "feat: initial commit"
git remote add origin https://github.com/<user>/<repo>.git
git push -u origin main
```
Authentication: GitHub CLI (`gh auth login`) or a personal access token / SSH key. Never commit tokens.

## Branching (trunk-based)
`main` always deployable → short-lived `feat/…`, `fix/…` branches → PR → squash merge. Protect `main` (required checks + review).

## Commits (Conventional Commits)
`feat: add login`, `fix: handle null user`, `docs:`, `refactor:`, `test:`, `chore:`, `perf:`, `ci:`; `!` or `BREAKING CHANGE:` for majors.

## Pull requests
Small (<400 lines), clear title, what/why/how-tested, screenshots for UI, linked issue, self-review first.

## Reviewing
Check: correctness, tests, security, naming, complexity, performance, docs. Comment on the code not the person; distinguish blocking vs nit; suggest concrete fixes.

## Useful commands
`git switch -c feat/x` · `git rebase -i` (clean history before PR) · `git stash` · `git bisect` · `git reflog` (recover) · `git restore -p` · `git revert <sha>` (undo on shared branches).

## Conflicts
Pull/rebase often; resolve by understanding both sides; run tests after.
