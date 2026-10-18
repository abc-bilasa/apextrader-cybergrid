# F-038 — Loss-streak cool-down (advisory)

```yaml
id: F-038
status: done
depends: [F-034, F-016]
estimate: 30m
```

## Outcome

After **3** consecutive losses, show a **15-minute** cool-down from the last loss timestamp. Trade logger and CSV import are **blocked in the UI** until the timer ends or the user checks **override** (advisory only — no RPC gate).

## Acceptance criteria

- [x] `lossStreakCooldown.js` pure functions + `useLossStreakCooldown` hook
- [x] `CooldownPanel` shows streak, countdown, override toggle
- [x] `TradeLogger` + `CsvImportPanel` respect `tradeLoggingBlocked`
- [x] `verify-formulas` samples for cooldown math
- [x] D14 DEFAULT documented (advisory vs hard lock deferred)

## Files allowed

- `lossStreakCooldown.js`, `useLossStreakCooldown.js`, `CooldownPanel.jsx`
- `TradeLogger.jsx`, `CsvImportPanel.jsx`, `Dashboard.jsx`
- `DECISIONS.md` (D14), `verify-formulas.mjs`

## Out of scope

- Server-side `log_trade` rejection; per-user cooldown settings; emotion tags
