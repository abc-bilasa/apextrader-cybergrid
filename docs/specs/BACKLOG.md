# Feature backlog (spec-driven)

**Next feature to build:** `F-025`  
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
| F-025 | Mobile responsive pass | 15m | F-023 | pending | [F-025](./features/F-025-responsive.md) |
| F-026 | Manual tests T1/T4 sign-off | 15m | F-017 | pending | [F-026](./features/F-026-test-t1-t4.md) |
| F-027 | Production smoke P1–P4 | 15m | F-007, F-010 | pending | [F-027](./features/F-027-prod-smoke.md) |

## Progress

- **Done:** 14 / 27  
- **Session 0** (scaffold/docs) is outside this backlog — do not repeat.

## Updating “Next feature”

After marking a feature `done`, set **Next feature** at top to the first `pending` row whose deps are all `done`.
