# Feature candidates (post–F-028 research)

Market-backed ideas from journal/risk/prop-firm research (2025–2026). **Not scheduled** until promoted into [BACKLOG.md](./BACKLOG.md) with a full `F-0XX` spec.

**Ordering rule:** Higher **user impact** first; when impact is similar, lower **implementation complexity** first.

---

## Scoring rubric

| Dimension | 1 (low) | 5 (high) |
|-----------|---------|----------|
| **Impact** | Nice-to-have polish | Core retention, differentiation, or addresses a top-3 trader pain (logging friction, drawdown surprise, discipline) |
| **Complexity** | UI-only, existing data | New tables, `002_*.sql`, RPC changes, DECISIONS lock, broker parsing |

**Priority score** (for sorting): `Impact × 2 − Complexity` (higher = build sooner).

---

## Ordered list (build priority)

| Rank | Proposed ID | Feature | Impact | Complexity | Score | Primary justification |
|------|-------------|---------|--------|------------|-------|------------------------|
| 1 | **F-029** | **Drawdown & promotion headroom meter** — **shipped** | 5 | 2 | 8 | See [F-029 spec](./features/F-029-headroom-meter.md). |
| 2 | **F-030** | **Quick-log / low-friction trade capture** — **shipped** | 5 | 2 | 8 | See [F-030 spec](./features/F-030-quick-log.md). |
| 3 | **F-031** | **D1–D4 intraday pacing** — **shipped** | 4 | 2 | 6 | See [F-031 spec](./features/F-031-intraday-pacing.md). |
| 4 | **F-032** | **Pre-submit outcome preview (`simulate_trade`)** — **shipped** | 5 | 3 | 7 | See [F-032 spec](./features/F-032-simulate-trade.md); apply `002` in Supabase. |
| 5 | **F-033** | **Prop-style consistency rule tracker** — **shipped** | 4 | 3 | 5 | See [F-033 spec](./features/F-033-consistency-rule.md). |
| 6 | **F-034** | **Discipline & behavior analytics** — **shipped** | 4 | 3 | 5 | See [F-034 spec](./features/F-034-discipline-analytics.md). |
| 7 | **F-035** | **Guided 5-minute session review** — **shipped** | 4 | 3 | 5 | See [F-035 spec](./features/F-035-session-review.md); apply `003`. |
| 8 | **F-036** | **Trade journal table (paginated history)** — **shipped** | 4 | 3 | 5 | See [F-036 spec](./features/F-036-trade-journal-table.md). |
| 9 | **F-037** | **Broker CSV import → session P&L** — **shipped** | 5 | 4 | 6 | See [F-037 spec](./features/F-037-csv-import.md). |
| 10 | **F-038** | **Loss-streak cool-down / optional trade lock** — **shipped** | 4 | 4 | 4 | See [F-038 spec](./features/F-038-loss-streak-cooldown.md); D14 advisory UI. |
| 11 | **F-039** | **Multi-account / rule profiles** — **shipped (phase 1)** | 5 | 5 | 5 | Rule profile switcher + `004_rule_profiles.sql`; multi-row accounts deferred. |
| 12 | **F-040** | **Export trade journal to CSV** — **shipped** | 4 | 2 | 6 | See [F-040 spec](./features/F-040-trade-export-csv.md); pairs with F-037 import. |

---

## Summary by tier

| Tier | IDs | When to pick |
|------|-----|----------------|
| **Quick wins** | F-029, F-030, F-031 | Next sprints; mostly dashboard + `formulas.js` |
| **Core product depth** | F-032, F-033, F-034, F-035, F-036 | After quick wins; mix of RPC and new tables |
| **Growth & platform** | F-037, F-038, F-039 | When targeting India broker users or multi-challenge workflows |

---

## Research sources (abbrev.)

- Journal abandonment & capture friction: [TraderJack](https://traderjack.ai/blog/why-traders-quit-their-journal/), [notetime journal comparison](https://www.notetimeapp.com/blog/best-trading-journal-app)
- Retention / first-trade failure: [r/mindtrajour autopsy](https://www.reddit.com/r/mindtrajour/comments/1l888dm/350_users_0_retention_a_datadriven_autopsy_of_our/)
- Risk enforcement demand: [ATAS safeguards](https://atas.featurebase.app/p/native-risk-enforcement-and-trade-safeguards), [LossGuardian (India)](https://lossguardian.com/blog/best-risk-management-app-for-indian-traders/)
- Prop / challenge journaling: [TJL Pro](https://tjlpro.in/blog/prop-firm-trading-journal), [LSG Club FTMO routine](https://lsgclub.trade/blog/ftmo-challenge-trading-journal-tips), [Quantrum Funded (India)](https://quantrumfunded.com/prop-firm-india)
- Import expectations: [TradeReveal](https://www.tradereveal.com/blog/how-to-choose-a-trading-journal), [Kalmat](https://tradeidhazh.com/)

---

## Promoting a candidate to BACKLOG

1. Copy a row into [BACKLOG.md](./BACKLOG.md) with `status: pending`.
2. Add `docs/specs/features/F-0XX-*.md` per [SPEC_DRIVEN.md](../SPEC_DRIVEN.md).
3. If RPC or schema changes: lock in [DECISIONS.md](../DECISIONS.md); use `002_*.sql` only (D13).

**Last updated:** 2026-10-18
