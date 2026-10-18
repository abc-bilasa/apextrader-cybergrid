# F-034 — Discipline & behavior analytics

```yaml
id: F-034
status: done
depends: [F-014, F-028]
estimate: 30m
```

## Outcome

Dashboard panel: loss streak, trades today, avg time between trades, revenge-window re-entries, promotion/demotion counts from `level_history`.

## Acceptance criteria

- [x] `disciplineStats.js` pure functions
- [x] `DisciplinePanel` wired with `trades` + `levelHistory`
- [x] Revenge window = 15 minutes after a loss

## Files allowed

- `src/lib/disciplineStats.js`, `DisciplinePanel.jsx`, `Dashboard.jsx`

## Out of scope

- Cool-down lock (F-038); session review (F-035)
