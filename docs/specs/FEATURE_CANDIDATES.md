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
| 3 | **F-031** | **D1–D4 intraday pacing** | 4 | 2 | 6 | PRD milestones become a live session plan: today’s cumulative P&L vs D1→D4 for active level. Reduces early oversizing and “all-or-nothing” target thinking. |
| 4 | **F-032** | **Pre-submit outcome preview (`simulate_trade`)** | 5 | 3 | 7 | Demotion feels unfair if discovered only after submit; read-only RPC mirroring `log_trade` shows capital, level, `trigger` before commit. Reinforces server-side truth moat. |
| 5 | **F-033** | **Prop-style consistency rule tracker** | 4 | 3 | 5 | Single-day profit cap (% of period total) is a common payout failure mode; extends existing daily P&L grouping (D11). High value for challenge-minded users. |
| 6 | **F-034** | **Discipline & behavior analytics** | 4 | 3 | 5 | Loss streaks, trades/day, time-between-trades, demotion rate—no broker API. Positions app as discipline OS vs chart-only journals. |
| 7 | **F-035** | **Guided 5-minute session review** | 4 | 3 | 5 | Short end-of-day process score (plan followed, best/worst decision); avoids heavy “emotion builder” features that see zero usage when logging fails. |
| 8 | **F-036** | **Trade journal table (paginated history)** | 4 | 3 | 5 | ROADMAP gap: browse `trades` with notes, filters, export—complements charts; expected in any “journal” positioning. |
| 9 | **F-037** | **Broker CSV import → session P&L** | 5 | 4 | 6 | Indian F&O traders need Kite/Console path; aggregate fills to one `log_trade` per day/session. Large TAM; parsing + validation + UX cost. |
| 10 | **F-038** | **Loss-streak cool-down / optional trade lock** | 4 | 4 | 4 | Revenge trading after consecutive losses; soft UI timer or hard RPC gate. Requires DECISIONS on enforcement vs advisory. |
| 11 | **F-039** | **Multi-account / rule profiles** | 5 | 5 | 5 | Personal Cyber-Grid vs prop/sim presets (different DD/targets); `002_*.sql`, RPC parameterization, migration. Strategic but largest build. |

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
