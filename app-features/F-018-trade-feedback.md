# F-018 — Confetti + audio

```yaml
id: F-018
title: Trade feedback
spec: ../docs/specs/features/F-018-trade-feedback.md
imp: IMP-038
completed: 2026-10-17
built: yes
tested: yes
deployed: n/a
```

## Summary

`onTradeLogged` reads RPC `trigger`: `TARGET_MET` → confetti + high tone; `DRAWDOWN_HIT` → low tone. Audio wrapped in try/catch.

## Built

- [x] `src/components/Dashboard.jsx`

## Tested

| Check | Result |
|-------|--------|
| `npm run build` | pass |
