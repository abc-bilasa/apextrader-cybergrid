# F-028 — Level history panel

```yaml
id: F-028
status: done
depends: [F-014, F-017]
estimate: 30m
```

## Outcome

Read-only list of `level_history` rows for the signed-in user (newest first), refreshed after each trade.

## Acceptance criteria

- [x] `SELECT` via Supabase client (RLS); no service role
- [x] Shows old → new level, trigger reason, capital at transition, timestamp
- [x] Empty state when no transitions yet
- [x] Scrollable list per UI_STYLE_GUIDE max-height pattern

## Files allowed

- `src/components/LevelHistory.jsx`, `Dashboard.jsx` wire

## Out of scope

- `MANUAL_RESET` admin UI; trade journal table (separate slice)
