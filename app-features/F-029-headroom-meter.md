# F-029 — Risk headroom meter

```yaml
id: F-029
title: Drawdown & promotion headroom
spec: ../docs/specs/features/F-029-headroom-meter.md
imp: IMP-053
completed: 2026-10-18
built: yes
tested: yes
deployed: yes
```

## Summary

Live DD buffer, demotion floor, max loss before demotion, 50/75/90% tiers, and promotion progress from `getHeadroomMetrics`.

## Built

- [x] `src/lib/formulas.js` — `getHeadroomMetrics`
- [x] `src/components/HeadroomPanel.jsx`
- [x] `Dashboard.jsx` wire (below risk metrics)

## Tested

| Check | Result |
|-------|--------|
| `npm run verify:formulas` | pass |
| `npm run build` | pass |
