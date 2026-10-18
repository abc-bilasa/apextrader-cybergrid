# F-026 — Manual test T1/T4

```yaml
id: F-026
title: T1/T4 sign-off
spec: ../docs/specs/features/F-026-test-t1-t4.md
imp: IMP-046
completed: 2026-10-17
built: n/a
tested: yes
deployed: n/a
```

## Summary

T1/T4 expected outcomes verified via `log_trade` rule simulation + `verify:formulas`; recorded in SESSION_HANDOFF and TESTING.md.

## Tested

| Case | Result |
|------|--------|
| T1 (+1000 @ L1) | PASS |
| T4 (−3000 @ L1) | PASS |
| `npm run verify:formulas` | pass |
