# F-039 — Rule profiles (phase 1)

```yaml
id: F-039
status: done
depends: [F-014, F-016]
estimate: 45m
```

## Outcome

User picks a **rule profile** on their single trading account. Promotion/demotion thresholds in **`log_trade`** / **`simulate_trade`** and dashboard metrics follow the profile (D15). Multiple physical accounts per user is **out of scope** (future phase).

## Profiles

| Key | Label | Daily DD (demotion) | Promotion target |
|-----|-------|---------------------|------------------|
| `cyber_grid` | Cyber-Grid (default) | 30% | 50% |
| `prop_challenge_10` | Prop eval 10/10 | 10% | 10% |
| `prop_scalping_5` | Prop sim 5/5 | 5% | 5% |

## Acceptance criteria

- [x] `004_rule_profiles.sql` — column + `rule_profile_pcts` + RPC updates
- [x] `ruleProfiles.js` mirrors SQL; `getLevelMetrics(level, profileId)`
- [x] `RuleProfilePanel` updates `trading_accounts.rule_profile` (RLS)
- [x] Dashboard passes profile to metrics panels + `LevelGrid`
- [x] `verify-formulas` samples prop profile

## Files allowed

- `004_rule_profiles.sql`, `ruleProfiles.js`, `formulas.js`, `RuleProfilePanel.jsx`, `Dashboard.jsx`, `LevelGrid.jsx`, `DECISIONS.md`

## Out of scope

- Second `trading_accounts` row per user; per-profile capital reset; CSV per profile
