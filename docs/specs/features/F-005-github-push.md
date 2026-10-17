# F-005 — GitHub push

```yaml
id: F-005
title: GitHub remote + push main
estimate: 15m
status: pending
depends: [F-004]
completed: null
```

## Outcome

Code on GitHub `main`; remote URL in ENVIRONMENT registry.

## Acceptance criteria

- [ ] Repo `apextrader-cybergrid` (or chosen name) on GitHub
- [ ] `git push -u origin main` succeeds

## Files allowed to touch

- `docs/ENVIRONMENT.md`

## Out of scope

- Actions secrets (F-006)
