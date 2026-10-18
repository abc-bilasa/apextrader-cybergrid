# Multi-session roadmap (2–3 weeks)

Rough plan for **multiple sittings**. Check off items in [SESSION_HANDOFF.md](./SESSION_HANDOFF.md) as you go.

**Faster option:** follow the **5-session critical path** in [EFFICIENT_WORKFLOW.md](./EFFICIENT_WORKFLOW.md) (same outcomes, less context switching).

## Week 1 — Foundation

### Session A: Accounts & repo (≈1–2 h)

- [ ] Create Supabase project (note region)
- [ ] Create GitHub repository `apextrader-cybergrid` (or chosen name)
- [ ] Push `apextrader-cybergrid/` code to `main`
- [ ] Local: Node 20 LTS, `npm install`, `.env.local`
- [ ] Fill [ENVIRONMENT.md](./ENVIRONMENT.md) **Project registry** table (no secrets in git)

### Session B: Database (≈1–2 h)

- [ ] Complete [PRE_BUILD_SIGNOFF.md](./PRE_BUILD_SIGNOFF.md) first (especially **D4**)
- [ ] Run `supabase/migrations/001_initial_schema.sql` in Supabase SQL Editor (file is complete—do not re-copy from PRD)
- [ ] Confirm trigger creates `trading_accounts` on signup
- [ ] Test `log_trade` via SQL or app (see [TESTING.md](./TESTING.md))
- [ ] Resolve open items in [DECISIONS.md](./DECISIONS.md) if not already

### Session C: Auth + shell (≈2–3 h)

- [ ] Implement `Auth.jsx` (email/password per PRD)
- [ ] Supabase Auth URL config for localhost + GitHub Pages URL
- [ ] `Dashboard.jsx` layout skeleton (header + 3 columns)
- [ ] Manual smoke: sign up, sign in, sign out

## Week 2 — Core product

### Session D: Trade engine UI (≈2–3 h)

- [ ] `TradeLogger.jsx` → `supabase.rpc('log_trade', …)`
- [ ] Load account + trades on dashboard
- [ ] Confetti + audio on `TARGET_MET` / drawdown (per PRD)
- [ ] Run promotion/demotion test cases ([TESTING.md](./TESTING.md))

### Session E: Charts & level grid (≈2–3 h)

- [ ] `EquityChart.jsx` (Recharts area/line)
- [ ] Daily P&L bar chart (PRD; can be same session or follow-up)
- [ ] `LevelGrid.jsx` — 42 levels, highlight active
- [ ] `formulas.js` metrics panel (left column)

### Session F: Polish & errors (≈1–2 h)

- [ ] Loading / empty states
- [ ] User-visible errors (auth, RPC failures)
- [ ] Mobile layout pass (responsive grid)
- [x] Optional: level history panel (read `level_history`) — **F-028**

## Week 3 — Production & PWA (optional)

### Session G: Deploy (≈1–2 h)

- [ ] GitHub Actions secrets + `VITE_BASE_PATH` variable
- [ ] Enable GitHub Pages from Actions
- [ ] Post-deploy smoke on production URL
- [ ] Document final URLs in [SESSION_HANDOFF.md](./SESSION_HANDOFF.md)

### Session H: PWA & hardening (optional, ≈2 h)

- [ ] Web app manifest + icons
- [ ] Service worker (vite-plugin-pwa or manual)—only if [DECISIONS.md](./DECISIONS.md) says yes
- [ ] Rate limiting awareness (Supabase dashboard)
- [ ] Disable public sign-up if desired (Supabase settings)

### Session I: Buffer / fixes

- [ ] Bug fixes from testing
- [ ] Performance (trade list pagination if needed)
- [ ] Future: Vitest for `formulas.js`, Playwright e2e (see [TESTING.md](./TESTING.md))

## Definition of “production-ready” (MVP)

- [ ] Auth works on **localhost** and **GitHub Pages**
- [ ] All progression rules enforced only via **`log_trade` RPC**
- [ ] RLS verified (user A cannot read user B data)
- [ ] Deploy on every push to `main` succeeds
- [ ] [TESTING.md](./TESTING.md) release checklist completed once

## Out of scope (unless PRD updated)

- Native mobile apps
- Live market data / broker integration
- Multi-currency (INR only per PRD)
- Admin dashboard for all users
