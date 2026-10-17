# Decisions log

Record **product and technical choices** here so future sessions (and agents) do not re-debate them. Change a decision by editing this file with date + rationale.

**Implementation audit:** every lock or change to a decision also gets a row in [IMPLEMENTATION_LOG.md](./IMPLEMENTATION_LOG.md) (type `DECISION`).

## Status key

- **LOCKED** — implement as written  
- **DEFAULT** — implement unless Amit changes before that work starts  
- **OPEN** — must confirm before implementing

---

## D1 — Currency and locale

| | |
|---|---|
| **Status** | LOCKED |
| **Decision** | INR only; `en-IN` formatting via `formatINR`. |
| **Source** | PRD |

---

## D2 — Progression authority

| | |
|---|---|
| **Status** | LOCKED |
| **Decision** | All level/capital changes via `log_trade` RPC only. |
| **Source** | PRD |

---

## D3 — Promotion rule

| | |
|---|---|
| **Status** | LOCKED |
| **Decision** | Promote +1 level when `(current_capital_after_trade - Cap_N) >= 0.5 × Cap_N`, max level 42. |
| **Source** | PRD RPC |

---

## D4 — Demotion rule (30% vs 60%)

| | |
|---|---|
| **Status** | **LOCKED** (D4-A, F-001, 2026-10-17) |
| **Decision** | **RPC demotion** only when drawdown from level baseline ≥ **30%** (−2 levels). **−60%** is **UI-only** (“max account drawdown” warning); not enforced in RPC unless a future `002_*.sql` is added after a new DECISIONS lock. |
| **Rationale** | Matches `001_initial_schema.sql` / PRD RPC; PRD prose 60% is display-only. |
| **Rejected** | D4-B (60% RPC demotion) — not selected at sign-off. |

---

## D5 — Capital after level change

| | |
|---|---|
| **Status** | LOCKED |
| **Decision** | Keep **actual ending capital** after trade; do **not** auto-reset to new level baseline on promote/demote. |
| **Source** | PRD RPC behavior |

---

## D6 — Email confirmation

| | |
|---|---|
| **Status** | DEFAULT |
| **Decision** | **Off** for early dev; **On** before sharing production URL widely. |
| **Amit** | Note final choice in [ENVIRONMENT.md](./ENVIRONMENT.md). |

---

## D7 — Public sign-up

| | |
|---|---|
| **Status** | DEFAULT |
| **Decision** | Open registration until disabled in Supabase Auth settings. |

---

## D8 — PWA (manifest + service worker)

| | |
|---|---|
| **Status** | DEFAULT |
| **Decision** | **Defer** to Week 3 (optional). Ship web SPA first. |

---

## D9 — Git root

| | |
|---|---|
| **Status** | DEFAULT |
| **Decision** | Git repository root = `apextrader-cybergrid/` (includes `PRD.txt`). |

---

## D10 — Hosting

| | |
|---|---|
| **Status** | LOCKED |
| **Decision** | GitHub Pages via GitHub Actions; no Vercel/Netlify unless this doc is updated. |
| **Source** | PRD |

---

## D11 — Daily P&L bar chart

| | |
|---|---|
| **Status** | DEFAULT |
| **Decision** | Implement bar chart grouped by calendar day from `trades.created_at` when building Session E; one bar per day sum of `pnl`. |

---

## D12 — Same trade: promotion vs demotion

| | |
|---|---|
| **Status** | LOCKED |
| **Decision** | If both +50% target and −30% drawdown could apply on one `log_trade` call, **promotion wins** (`IF` / `ELSIF` order in RPC). |
| **Source** | `001_initial_schema.sql` |

---

## D13 — Migration immutability

| | |
|---|---|
| **Status** | LOCKED |
| **Decision** | After `001_initial_schema.sql` is applied to any shared Supabase project, **do not edit** `001`; add `002_*.sql` for schema/rule changes. |
| **Source** | [PRE_BUILD_SIGNOFF.md](./PRE_BUILD_SIGNOFF.md) |

---

## Gate: lock before Supabase apply

These must be **LOCKED** or explicitly accepted in [PRE_BUILD_SIGNOFF.md](./PRE_BUILD_SIGNOFF.md) before running `001`:

| ID | Topic |
|----|--------|
| **D4** | 30% demotion vs 60% enforce |
| D6 | Email confirmation |
| D7 | Public sign-up |

---

## Change log

| Date | ID | Change |
|------|-----|--------|
| 2026-10-17 | — | Initial decisions from PRD + planning chat |
| 2026-10-17 | D12, D13 | RPC tie-break + migration immutability |
| 2026-10-17 | — | See IMP-004, IMP-007, IMP-012 in [IMPLEMENTATION_LOG.md](./IMPLEMENTATION_LOG.md) |
| 2026-10-17 | D4 | LOCKED D4-A via feature F-001 (IMP-019) |
