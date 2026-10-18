# F-028 — Level history panel

```yaml
id: F-028
title: Level history panel
spec: ../docs/specs/features/F-028-level-history-panel.md
imp: IMP-050
completed: 2026-10-18
built: yes
tested: yes
deployed: no
```

## Summary

Dashboard panel listing `level_history` transitions (promotion / drawdown) with capital and time.

## Built

- [x] `src/components/LevelHistory.jsx`
- [x] `Dashboard.jsx` load + refresh with trades

## Tested

| Check | Result |
|-------|--------|
| `npm run build` | pass |
