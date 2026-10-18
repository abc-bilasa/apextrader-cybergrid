# F-039 — Rule profiles

```yaml
id: F-039
title: Prop vs Cyber-Grid rule presets
spec: ../docs/specs/features/F-039-rule-profiles.md
imp: IMP-069
completed: 2026-10-18
built: yes
tested: yes
deployed: yes
```

## Tested

| Check | Result |
|-------|--------|
| `npm run verify:formulas` | pass |
| `npm run build` | pass |

## Manual

Apply `004_rule_profiles.sql` before switching profiles in prod.
