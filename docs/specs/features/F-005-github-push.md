# F-005 — GitHub push

```yaml
id: F-005
title: GitHub remote + push main
estimate: 15m
status: done
depends: [F-004]
completed: 2026-10-17
```

## Outcome

Code on GitHub `main`; remote URL in ENVIRONMENT registry.

## Acceptance criteria

- [x] Repo `apextrader-cybergrid` on GitHub (`abc-bilasa`)
- [x] `git push -u origin main` succeeds

## Files allowed to touch

- `docs/ENVIRONMENT.md`

## Out of scope

- Actions secrets (F-006)
