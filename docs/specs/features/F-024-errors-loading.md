# F-024 — Loading + errors

```yaml
id: F-024
status: done
depends: [F-017]
estimate: 15m
```

## Outcome

RPC/auth failures show user-visible messages; no silent failures.

## Acceptance criteria

- [x] `.cyber-alert-error` for auth and trade errors
- [x] Dashboard handles empty trades gracefully

## Files allowed

- `Auth.jsx`, `Dashboard.jsx`, `TradeLogger.jsx`

## Out of scope

- Responsive (F-025)
