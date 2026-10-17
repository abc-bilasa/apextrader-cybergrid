# F-014 — Load account + trades

```yaml
id: F-014
status: pending
depends: [F-013, F-002]
estimate: 15m
```

## Outcome

Dashboard loads `trading_accounts` + `trades` for session user; header shows real level/capital.

## Acceptance criteria

- [ ] `select` on `trading_accounts` single row
- [ ] `trades` ordered by `created_at`
- [ ] Loading state `.cyber-loading` while fetching

## Files allowed

- `src/components/Dashboard.jsx`

## Out of scope

- Trade submit (F-016), metrics cards (F-019)
