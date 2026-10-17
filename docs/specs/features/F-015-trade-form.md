# F-015 — TradeLogger form

```yaml
id: F-015
status: pending
depends: [F-013]
estimate: 15m
```

## Outcome

P&L + notes form UI with validation (non-empty numeric PnL).

## Acceptance criteria

- [ ] `.cyber-input`, submit button `.cyber-btn-primary`
- [ ] Client-side block on invalid PnL

## Files allowed

- `src/components/TradeLogger.jsx`

## Out of scope

- RPC (F-016)
