# Efficient development & deployment

How to build and ship **with minimum rework, wall-clock time, and AI token use**.  
This is the recommended execution model; [ROADMAP.md](./ROADMAP.md) remains the detailed checklist.

---

## Executive summary

| Do | Don’t |
|----|--------|
| **Vertical slices** (DB → auth → one RPC → UI that uses it) | Build all UI stubs then wire Supabase at the end |
| **One Supabase project** for dev + MVP prod (email confirm off) | Two projects + CLI until you need staging |
| **Deploy CI early** (after first push + secrets) | Wait until Week 3 to discover `VITE_BASE_PATH` bugs |
| **One Cursor task per session** (see prompts below) | “Implement whole app from PRD” in one chat |
| **Reuse** `UI_STYLE_GUIDE`, `chartTheme`, `.cyber-*` | Custom Tailwind per component |
| **Lock D4 once** then apply `001` SQL | Re-debate 30% vs 60% each session |

**Fast path:** 5 sessions (~8–12 h total) instead of 9 micro-sessions — see §4.

---

## 1. Critical path (dependency order)

Nothing else should start until the prior step is verified.

```text
PRE_BUILD_SIGNOFF (D4 lock)
    → Supabase project + run 001_initial_schema.sql
    → .env.local + sign-up creates trading_accounts
    → Auth.jsx (login works locally)
    → Dashboard shell + load account row
    → TradeLogger + log_trade RPC
    → Left metrics (formulas.js display)
    → LevelGrid + EquityChart (read-only; no new backend)
    → Polish + confetti/audio
    → GitHub push + Actions secrets + Pages smoke
```

**Why:** Charts and 42-level grid never block trading logic. RPC + auth block everything.

---

## 2. Deployment strategy (save the most pain)

### 2.1 Repo layout

- **Git root = `apextrader-cybergrid/`** (already decided D9).
- GitHub repo name **should match** folder name, e.g. `apextrader-cybergrid`, so docs and `VITE_BASE_PATH` stay obvious.

### 2.2 Base path (decide once in Session A)

| Hosting URL | `VITE_BASE_PATH` |
|-------------|------------------|
| `https://<user>.github.io/apextrader-cybergrid/` | `/apextrader-cybergrid/` |
| `https://<user>.github.io/` (user site root) | `/` |

Set GitHub Actions variable **before first production build**. Wrong base path = blank site = long debug loop.

### 2.3 Deploy pipeline timing

| When | Action |
|------|--------|
| **Session A** (same day as GitHub repo) | Add secrets, push `main`, confirm Actions green (app can be stub) |
| **Session C** | Add production URL to Supabase Auth redirects; smoke login on Pages |
| **Later** | Only `git push` to deploy — no manual uploads |

No Vercel/Netlify parallel path (D10) — one pipeline only.

### 2.4 Supabase environments

| Phase | Setup |
|-------|--------|
| **MVP** | **Single** Supabase project; localhost + Pages URLs in Auth config |
| **Later** | Optional second project for staging; duplicate `001` + env |

Skip **Supabase CLI** until you have 2+ migrations or team members.

---

## 3. Development loop (local)

```powershell
cd apextrader-cybergrid
# .env.local once
npm run dev
```

| Check | Command | When |
|-------|---------|------|
| Math unchanged | `npm run verify:formulas` | After `formulas.js` or SQL math change |
| Ship bundle | `npm run build` | Before push to `main` |
| Trade rules | [TESTING.md](./TESTING.md) T1/T4 | After RPC wired |

**Hot reload:** Vite only — no custom server.

---

## 4. Fast path: 5 sessions (token-friendly)

Each session = **one Cursor chat** with a **single goal**. Attach only the files listed.

| # | Goal | Files to @mention | Done when |
|---|------|-------------------|-----------|
| **1** | Infra | `PRE_BUILD_SIGNOFF`, `ENVIRONMENT`, `001_initial_schema.sql` | D4 locked, SQL applied, `.env.local`, sign-up creates account |
| **2** | Auth + deploy smoke | `Auth.jsx`, `UI_STYLE_GUIDE`, `DEPLOYMENT` | Login local + GitHub Actions build green + Pages loads assets |
| **3** | Trading core | `TradeLogger`, `Dashboard`, `TESTING` T1/T4 | `log_trade` works; capital/level update |
| **4** | Dashboard UI | `Dashboard`, `LevelGrid`, `formulas.js`, `UI_STYLE_GUIDE` | Metrics + grid + left column |
| **5** | Charts + polish | `EquityChart`, `chartTheme.js`, PRD confetti | Charts + release checklist |

Defer: PWA (D8), daily bar chart if needed (can add as Session 5b), `npm audit fix`, Vitest, Playwright.

---

## 5. Saving AI tokens (Cursor)

### 5.1 What the agent should read (in order)

1. `docs/SESSION_HANDOFF.md` (short)
2. `docs/DECISIONS.md` (only if RPC/auth/rules)
3. `docs/UI_STYLE_GUIDE.md` (only if UI)
4. **Do not** re-ingest full `PRD.txt` if `DECISIONS` + `UI_STYLE_GUIDE` + `DATABASE` suffice

### 5.2 Copy-paste session prompts

**Session 3 example:**

```text
Goal: Session 3 — TradeLogger + Dashboard data load only.
Read: docs/SESSION_HANDOFF.md, docs/UI_STYLE_GUIDE.md, docs/TESTING.md (T1/T4).
Implement TradeLogger.jsx and Dashboard.jsx data fetch; use log_trade RPC only.
Do not implement charts or LevelGrid. Update SESSION_HANDOFF + IMPLEMENTATION_LOG END.
```

**Session 2 example:**

```text
Goal: Session 2 — Full Auth.jsx per UI_STYLE_GUIDE + Supabase email auth.
Do not change database SQL. Update SESSION_HANDOFF + IMPLEMENTATION_LOG.
```

### 5.3 Scope rules for agents

- Max **one feature area** per request (auth OR trades OR charts).
- No drive-by refactors, no new dependencies without DECISIONS note.
- End with IMP row + handoff (rules already require this).

### 5.4 Human (Amit) habits

- Open workspace folder: **`apextrader-cybergrid`** (not parent) when possible.
- Complete PRE_BUILD_SIGNOFF **once** in a 2-minute pass (circle D4-A).
- Paste **Supabase URL + anon key** into `.env.local` only — never into chat.

---

## 6. What we intentionally skip for MVP

| Item | Reason |
|------|--------|
| PWA / service worker | D8 deferred |
| Second Supabase project | Cost/complexity |
| Supabase CLI | SQL Editor + `001` enough |
| Automated e2e | Manual [TESTING.md](./TESTING.md) once |
| 60% RPC demotion | D4-A unless you lock D4-B |
| Feature branches | Solo: commit to `main` after local `npm run build` |

---

## 7. Risk register (time sinks)

| Risk | Prevention |
|------|------------|
| Blank GitHub Pages | Set `VITE_BASE_PATH` + rebuild |
| Auth redirect fails on Pages | Add Pages URL in Supabase before Session C prod test |
| Edit `001` after apply | D13 → use `002_*.sql` |
| UI drift | `UI_STYLE_GUIDE` checklist |
| Re-explaining math | `verify:formulas` + RPC only |

---

## 8. Definition of “efficiently shipped”

- [ ] PRE_BUILD_SIGNOFF done  
- [ ] Local: sign-up → log trade → level/capital change  
- [ ] `npm run build` passes  
- [ ] GitHub Actions deploy passes  
- [ ] Production smoke P1–P4 ([TESTING.md](./TESTING.md))  
- [ ] IMPLEMENTATION_LOG + SESSION_HANDOFF current  

---

## Related docs

| Doc | Use |
|-----|-----|
| [ROADMAP.md](./ROADMAP.md) | Detailed session A–I |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | GitHub steps |
| [PRE_BUILD_SIGNOFF.md](./PRE_BUILD_SIGNOFF.md) | Before SQL |
| [UI_STYLE_GUIDE.md](./UI_STYLE_GUIDE.md) | All UI work |
| [PROGRESS_AND_CONFLICTS.md](./PROGRESS_AND_CONFLICTS.md) | Gates & audit |
