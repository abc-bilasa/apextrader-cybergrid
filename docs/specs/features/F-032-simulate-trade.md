# F-032 — Pre-submit `simulate_trade` preview

```yaml
id: F-032
status: done
depends: [F-016]
estimate: 45m
```

## Outcome

Custom P&L field shows live RPC preview (capital, level, trigger) before commit; migration `002_simulate_trade.sql` mirrors `log_trade` without writes.

## Acceptance criteria

- [x] `002_simulate_trade.sql` + GRANT authenticated
- [x] Debounced `simulate_trade` in TradeLogger when custom P&L valid
- [x] Graceful message if RPC not applied yet

## Files allowed

- `supabase/migrations/002_*.sql`, `TradeLogger.jsx`, `TradeSimPreview.jsx`, `APPLY.md`, `DATABASE.md`

## Verify

1. Apply `002_simulate_trade.sql` in Supabase SQL Editor.
2. Enter custom P&L — preview updates without changing account until Commit.

## Out of scope

- Preview on quick-log one-tap (instant submit)
