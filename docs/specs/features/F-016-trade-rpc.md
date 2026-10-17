# F-016 — log_trade RPC

```yaml
id: F-016
status: done
depends: [F-015, F-014]
estimate: 15m
```

## Outcome

Submit calls `supabase.rpc('log_trade', { p_pnl, p_notes })`; errors surfaced.

## Acceptance criteria

- [x] Only RPC mutates progression (D2)
- [x] Success clears form fields

## Files allowed

- `src/components/TradeLogger.jsx`

## Verify

[TESTING.md](../../TESTING.md) T1 on clean account

## Out of scope

- Parent refresh (F-017)
