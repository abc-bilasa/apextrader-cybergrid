# F-004 — Git init (repo root only)

```yaml
id: F-004
title: Git init in apextrader-cybergrid
estimate: 15m
status: pending
depends: []
completed: null
```

## Outcome

Git repository rooted at `apextrader-cybergrid/` with first commit (no secrets).

## Acceptance criteria

- [ ] `git init` inside `apextrader-cybergrid/` only (not user home)
- [ ] `.gitignore` excludes `node_modules`, `dist`, `.env.local`
- [ ] First commit includes `package-lock.json`, source, docs, specs

## Files allowed to touch

- `.git/` (via commands)
- optional `README.md` status line

## Verify

1. `git status` clean after commit; no `.env.local` staged.

## Out of scope

- GitHub remote (F-005)
