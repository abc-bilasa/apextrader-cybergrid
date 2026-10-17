# F-017 — Refresh after trade

```yaml
id: F-017
status: done
depends: [F-016]
estimate: 15m
```

## Outcome

After trade, dashboard reloads account + trades; header capital/level update.

## Acceptance criteria

- [x] `onTradeLogged` callback from TradeLogger to Dashboard
- [x] T6: refresh shows new values

## Files allowed

- `src/components/Dashboard.jsx`, `src/components/TradeLogger.jsx`

## Out of scope

- Confetti (F-018)
