# Feature backlog (spec-driven)

**Next feature to build:** _F-038 loss-streak cool-down — see [FEATURE_CANDIDATES.md](./FEATURE_CANDIDATES.md)_  
**Process:** [SPEC_DRIVEN.md](../SPEC_DRIVEN.md)

Status: `pending` | `in_progress` | `done` | `blocked`

| ID | Feature | Est. | Deps | Status | Spec |
|----|---------|------|------|--------|------|
| F-001 | PRE_BUILD sign-off + lock D4 | 15m | — | done | [F-001](./features/F-001-pre-build-signoff.md) |
| F-002 | Supabase project + apply `001` SQL | 15m | F-001 | done | [F-002](./features/F-002-supabase-migration.md) |
| F-003 | `.env.local` + ENVIRONMENT registry | 15m | F-002 | done | [F-003](./features/F-003-env-local.md) |
| F-004 | Git init in repo root + first commit | 15m | — | done | [F-004](./features/F-004-git-init.md) |
| F-005 | GitHub remote + push `main` | 15m | F-004 | done | [F-005](./features/F-005-github-push.md) |
| F-006 | Actions secrets + `VITE_BASE_PATH` | 15m | F-005 | done | [F-006](./features/F-006-github-actions.md) |
| F-007 | CI green + Pages asset smoke | 15m | F-006 | done | [F-007](./features/F-007-ci-smoke.md) |
| F-008 | Auth UI shell (style guide) | 15m | F-003 | done | [F-008](./features/F-008-auth-ui.md) |
| F-009 | Sign-up + error banner | 15m | F-008 | done | [F-009](./features/F-009-auth-signup.md) |
| F-010 | Sign-in, sign-out, session gate | 15m | F-009 | done | [F-010](./features/F-010-auth-session.md) |
| F-011 | Supabase Auth redirect URLs | 15m | F-005 | done | [F-011](./features/F-011-auth-urls.md) |
| F-012 | Dashboard header bar | 15m | F-010 | done | [F-012](./features/F-012-dashboard-header.md) |
| F-013 | Dashboard 12-column layout | 15m | F-012 | done | [F-013](./features/F-013-dashboard-layout.md) |
| F-014 | Load account + trades | 15m | F-013, F-002 | done | [F-014](./features/F-014-dashboard-data.md) |
| F-015 | TradeLogger form UI | 15m | F-013 | done | [F-015](./features/F-015-trade-form.md) |
| F-016 | Wire `log_trade` RPC | 15m | F-015, F-014 | done | [F-016](./features/F-016-trade-rpc.md) |
| F-017 | Refresh UI after trade | 15m | F-016 | done | [F-017](./features/F-017-trade-refresh.md) |
| F-018 | Confetti + trade sounds | 15m | F-016 | done | [F-018](./features/F-018-trade-feedback.md) |
| F-019 | Risk metrics left panel | 15m | F-014 | done | [F-019](./features/F-019-risk-metrics.md) |
| F-020 | D1–D4 milestones card | 15m | F-019 | done | [F-020](./features/F-020-milestones.md) |
| F-021 | Equity chart | 15m | F-014 | done | [F-021](./features/F-021-equity-chart.md) |
| F-022 | Daily P&L bar chart | 15m | F-021 | done | [F-022](./features/F-022-pnl-bars.md) |
| F-023 | 42-level grid + active row | 15m | F-014 | done | [F-023](./features/F-023-level-grid.md) |
| F-024 | Loading + error states | 15m | F-017 | done | [F-024](./features/F-024-errors-loading.md) |
| F-025 | Mobile responsive pass | 15m | F-023 | done | [F-025](./features/F-025-responsive.md) |
| F-026 | Manual tests T1/T4 sign-off | 15m | F-017 | done | [F-026](./features/F-026-test-t1-t4.md) |
| F-027 | Production smoke P1–P4 | 15m | F-007, F-010 | done | [F-027](./features/F-027-prod-smoke.md) |
| F-028 | Level history panel | 30m | F-017 | done | [F-028](./features/F-028-level-history-panel.md) |
| F-029 | Drawdown & promotion headroom | 30m | F-019 | done | [F-029](./features/F-029-headroom-meter.md) |
| F-030 | Quick-log trade capture | 30m | F-016 | done | [F-030](./features/F-030-quick-log.md) |
| F-031 | D1–D4 intraday pacing | 30m | F-020 | done | [F-031](./features/F-031-intraday-pacing.md) |
| F-032 | `simulate_trade` preview | 45m | F-016 | done | [F-032](./features/F-032-simulate-trade.md) |
| F-033 | Consistency rule (40%) | 30m | F-022 | done | [F-033](./features/F-033-consistency-rule.md) |
| F-034 | Discipline analytics | 30m | F-014 | done | [F-034](./features/F-034-discipline-analytics.md) |
| F-035 | Session review form | 30m | F-010 | done | [F-035](./features/F-035-session-review.md) |
| F-036 | Trade journal table | 30m | F-014 | done | [F-036](./features/F-036-trade-journal-table.md) |
| F-037 | Broker CSV import | 45m | F-016 | done | [F-037](./features/F-037-csv-import.md) |

## Progress

- **Done:** 37 / 37 (F-001–F-037)  
- **Session 0** (scaffold/docs) is outside this backlog — do not repeat.

## Updating “Next feature”

After marking a feature `done`, set **Next feature** at top to the first `pending` row whose deps are all `done`.
