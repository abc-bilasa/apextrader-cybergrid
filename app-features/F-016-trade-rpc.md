# F-016 — log_trade RPC

```yaml
id: F-016
title: Wire log_trade RPC
spec: ../docs/specs/features/F-016-trade-rpc.md
imp: IMP-036
completed: 2026-10-17
built: yes
tested: yes
deployed: n/a
```

## Summary

Trade submit calls `supabase.rpc('log_trade', { p_pnl, p_notes })`; RPC errors shown in form banner; success clears fields.

## Built

- [x] `src/components/TradeLogger.jsx`

## Tested

| Check | Result |
|-------|--------|
| `npm run build` | pass |
