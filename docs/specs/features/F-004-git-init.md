# F-004 — Git init (repo root only)

```yaml
id: F-004
title: Git init in apextrader-cybergrid
estimate: 15m
status: done
depends: []
completed: 2026-10-17
```

## Outcome

Git repository rooted at `apextrader-cybergrid/` with first commit (no secrets).

## Acceptance criteria

- [x] `git init` inside `apextrader-cybergrid/` only (not user home)
- [x] `.gitignore` excludes `node_modules`, `dist`, `.env.local`
- [x] First commit includes `package-lock.json`, source, docs, specs

## Files allowed to touch

- `.git/` (via commands)
- optional `README.md` status line

## Verify

1. `git status` clean after commit; no `.env.local` staged.

## Out of scope

- GitHub remote (F-005)
