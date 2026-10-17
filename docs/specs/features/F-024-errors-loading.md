# F-024 — Loading + errors

```yaml
id: F-024
status: pending
depends: [F-017]
estimate: 15m
```

## Outcome

RPC/auth failures show user-visible messages; no silent failures.

## Acceptance criteria

- [ ] `.cyber-alert-error` for auth and trade errors
- [ ] Dashboard handles empty trades gracefully

## Files allowed

- `Auth.jsx`, `Dashboard.jsx`, `TradeLogger.jsx`

## Out of scope

- Responsive (F-025)
