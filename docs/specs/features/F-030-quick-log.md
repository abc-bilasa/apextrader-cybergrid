# F-030 — Quick-log trade capture

```yaml
id: F-030
status: done
depends: [F-016]
estimate: 30m
```

## Outcome

One-tap preset P&L logging (−1k/−500/+500/+1k) plus custom amount; notes collapsed by default to reduce friction after sessions.

## Acceptance criteria

- [x] Preset buttons call `log_trade` directly (no notes)
- [x] Custom P&L field + optional note in collapsible `<details>`
- [x] Shared validation and error handling with F-015/016
- [x] Touch-friendly preset grid on mobile

## Files allowed

- `src/components/TradeLogger.jsx`

## Out of scope

- Voice log; broker import (F-037)
