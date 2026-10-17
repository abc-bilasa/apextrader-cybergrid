# F-007 — CI / Pages smoke

```yaml
id: F-007
title: CI green + Pages loads
estimate: 15m
status: pending
depends: [F-006]
completed: null
```

## Outcome

Latest `main` deploy succeeds; Pages URL loads JS/CSS (no 404).

## Acceptance criteria

- [ ] GitHub Actions job green
- [ ] Pages URL opens; no blank white screen from asset 404

## Verify

1. [TESTING.md](../../TESTING.md) P1 partial (load only).

## Out of scope

- Production auth (F-027)
