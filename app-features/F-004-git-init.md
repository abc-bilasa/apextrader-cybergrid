# F-004 — Git init (repo root only)

```yaml
id: F-004
title: Git init in apextrader-cybergrid
spec: ../docs/specs/features/F-004-git-init.md
imp: IMP-024
completed: 2026-10-17
built: yes
tested: yes
deployed: n/a
```

## Summary

Git repository initialized at `apextrader-cybergrid/` on branch `main`; first commit includes source, docs, specs, `package-lock.json`; `.env.local` excluded.

## Built (deliverables)

- [x] `git init` in app root only
- [x] `.gitignore` covers `node_modules`, `dist`, `.env.local`
- [x] First commit on `main`

**Not in scope:** GitHub remote (F-005)

## Tested (verification)

| Check | Result | Notes |
|-------|--------|-------|
| `git status` clean after commit | pass | Root commit `ded7238` |
| `.env.local` not staged | pass | gitignored |

## Notes

Avoid running `git` from `C:\Users\AMIT` — a stray repo may exist at user home; always `cd apextrader-cybergrid` first.
