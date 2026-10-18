# F-032 — simulate_trade preview

```yaml
id: F-032
title: Pre-submit trade simulation
spec: ../docs/specs/features/F-032-simulate-trade.md
imp: IMP-058
completed: 2026-10-18
built: yes
tested: partial
deployed: no
```

## Built

- [x] `002_simulate_trade.sql`
- [x] `TradeSimPreview.jsx` + TradeLogger debounced RPC

## Tested

| Check | Result | Notes |
|-------|--------|-------|
| `npm run build` | pass | |
| RPC on Supabase | pending | Apply `002` in dashboard |
