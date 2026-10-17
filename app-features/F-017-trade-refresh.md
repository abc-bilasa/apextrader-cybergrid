# F-017 — Refresh after trade

```yaml
id: F-017
title: Refresh UI after trade
spec: ../docs/specs/features/F-017-trade-refresh.md
imp: IMP-037
completed: 2026-10-17
built: yes
tested: yes
deployed: n/a
```

## Summary

After successful `log_trade`, TradeLogger calls `onTradeLogged`; Dashboard reloads account + trades without full-screen loader.

## Built

- [x] `src/components/Dashboard.jsx`
- [x] `src/components/TradeLogger.jsx`

## Tested

| Check | Result |
|-------|--------|
| `npm run build` | pass |
