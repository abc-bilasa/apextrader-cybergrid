# Testing

MVP relies on **manual testing** with a repeatable checklist. Automated tests are optional (Week 3+).

## Formula unit checks (`formulas.js`)

Run mentally or in browser console after `npm run dev`:

| Level | Base capital (₹) | Target +50% (₹) | Daily DD 30% (₹) |
|-------|------------------|-----------------|------------------|
| 1 | 10,000 | 5,000 | 3,000 |
| 2 | 15,000 | 7,500 | 4,500 |
| 3 | 22,500 | 11,250 | 6,750 |
| 4 | 33,750 | 16,875 | 10,125 |

Formula: `base = 10000 * 1.5^(level-1)`.

**Cross-check:** UI metrics must match RPC thresholds for the same level.

## Manual test matrix (auth)

| # | Steps | Expected |
|---|--------|----------|
| A1 | Sign up new email | User created; can sign in (or confirm email per settings) |
| A2 | After sign-up | `trading_accounts` row: level 1, capital 10000 |
| A3 | Sign out / sign in | Session restores dashboard |
| A4 | Wrong password | Error message, no crash |

## Manual test matrix (trades & RPC)

Assume fresh account: level 1, capital ₹10,000.

| # | PnL | Expected ending capital | Level | Trigger |
|---|-----|-------------------------|-------|---------|
| T1 | +1000 | 11000 | 1 | NONE |
| T2 | +4000 | 15000 (after T1: need cumulative from 10k) | 2 | TARGET_MET when `(cap - base) >= 5000` |
| T3 | 0 | unchanged | — | NEUTRAL trade type |
| T4 | −3000 from 10k start | 7000 | max(1, L−2) | DRAWDOWN_HIT |

**T2 note:** Run from a clean account or adjust numbers: promotion when equity ≥ base + 50% of **level baseline** (see [DECISIONS.md](./DECISIONS.md)).

| # | Steps | Expected |
|---|--------|----------|
| T5 | Submit empty PnL | Validation blocks submit |
| T6 | Refresh after trade | Charts and header show new capital |
| T7 | Promotion | Confetti + success tone (per PRD) |
| T8 | Drawdown demotion | Lower tone (per PRD) |

## RLS / security smoke

Use two test accounts (two emails).

| # | Steps | Expected |
|---|--------|----------|
| S1 | User A logged in | Sees only A’s trades |
| S2 | User B | Cannot see A’s data in UI |
| S3 | DevTools: direct REST with B’s token to A’s row id | Denied by RLS |

## UI / responsive

| # | Viewport | Check |
|---|----------|--------|
| U1 | Desktop ≥1280px | 3-column layout |
| U2 | Mobile | Stacked columns, scrollable level grid |
| U3 | Level grid | Active level highlighted |

## Build smoke

```powershell
npm run build
npm run preview
```

No console errors on load; auth still works against Supabase.

## Production smoke (after deploy)

| # | Check |
|---|--------|
| P1 | Site loads at GitHub Pages URL (no 404 on assets) |
| P2 | Sign in works (redirect URLs correct) |
| P3 | Log trade works |
| P4 | Hard refresh keeps session |

## Release checklist (copy per deploy)

- [ ] `npm run build` passes locally
- [ ] Env secrets set in GitHub Actions
- [ ] `VITE_BASE_PATH` matches repo name
- [ ] Supabase Site URL / Redirect URLs include production URL
- [ ] Manual tests T1, T4, A2 on production
- [ ] [SESSION_HANDOFF.md](./SESSION_HANDOFF.md) updated with deploy date + URL

## Future automation

| Layer | Tool | Target |
|-------|------|--------|
| Unit | Vitest | `getLevelMetrics`, `formatINR` |
| E2E | Playwright | Auth + one `log_trade` against staging Supabase |
| SQL | pgTAP or manual scripts | RPC edge cases |

Add `npm test` when Vitest is introduced; document in [DEVELOPMENT.md](./DEVELOPMENT.md).
