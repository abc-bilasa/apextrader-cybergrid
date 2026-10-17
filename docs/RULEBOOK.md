# Rule book — ApexTrader Cyber-Grid

**Master rules** for humans and AI. Cursor enforces a subset via `.cursor/rules/apextrader-cybergrid.mdc`.  
Detail lives in linked docs—this file is the **single checklist** to follow.

---

## 1. Authority (conflicts)

| Priority | Source |
|----------|--------|
| 1 | [DECISIONS.md](./DECISIONS.md) **LOCKED** |
| 2 | [DECISIONS.md](./DECISIONS.md) **DEFAULT** |
| 3 | [PRD.txt](../PRD.txt) |
| 4 | [DATABASE.md](./DATABASE.md) / [ARCHITECTURE.md](./ARCHITECTURE.md) |
| 5 | Chat (must be written into DECISIONS or IMPLEMENTATION_LOG) |

---

## 2. Efficient build & deploy (mandatory process)

Full guide: [EFFICIENT_WORKFLOW.md](./EFFICIENT_WORKFLOW.md).

### Do

- **Vertical slices:** sign-off → SQL `001` → auth → dashboard load → `log_trade` → metrics/grid → charts → polish.
- **One Supabase project** for MVP (localhost + GitHub Pages URLs in Auth).
- **Deploy CI early** (Session A/B): GitHub secrets, `VITE_BASE_PATH`, green Actions while UI can still be stub.
- **One Cursor task = one slice** (auth OR trades OR charts—not full app).
- **Lock D4 once** in [PRE_BUILD_SIGNOFF.md](./PRE_BUILD_SIGNOFF.md) before applying SQL.
- Reuse [UI_STYLE_GUIDE.md](./UI_STYLE_GUIDE.md) + `.cyber-*` + `chartTheme.js`.

### Don’t

- Wire all UI first, Supabase last.
- Wait until “Week 3” for first Pages deploy.
- Re-read entire PRD each session if DECISIONS + UI_STYLE_GUIDE + handoff suffice.
- Edit applied `001_initial_schema.sql` (use `002_*.sql`, D13).
- Add Vercel/Netlify (D10) or second deploy path without updating DECISIONS.

### Critical path (order)

```text
PRE_BUILD_SIGNOFF → 001 SQL → .env.local → Auth → Dashboard + account fetch
→ TradeLogger + log_trade → left metrics → LevelGrid + charts → confetti/audio
→ push main → Pages smoke
```

### Fast path

**5 sessions** (~8–12 h) — table in [EFFICIENT_WORKFLOW.md](./EFFICIENT_WORKFLOW.md) §4.

### Deploy (once)

| Item | Rule |
|------|------|
| Git root | `apextrader-cybergrid/` (D9) |
| Repo name | Match folder, e.g. `apextrader-cybergrid` |
| `VITE_BASE_PATH` | `/apextrader-cybergrid/` for project Pages (set before first prod build) |
| Pipeline | GitHub Actions → `gh-pages` only ([DEPLOYMENT.md](./DEPLOYMENT.md)) |
| Secrets | `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` — never service_role in client |

---

## 3. Architecture & data

- Level/capital changes **only** via `supabase.rpc('log_trade', …)` (D2).
- RLS on all user tables; no client-side trust of progression math.
- `formulas.js` mirrors SQL; run `npm run verify:formulas` after math changes.
- Promotion before demotion on same trade (D12).

---

## 4. UI & theme

- All screens: [UI_STYLE_GUIDE.md](./UI_STYLE_GUIDE.md).
- No ad-hoc hex/fonts in components.
- Dashboard layout: PRD 3-column grid (4 / 5 / 3 on `lg`).

---

## 5. Session rituals

| When | Doc |
|------|-----|
| Start | [SESSION_HANDOFF.md](./SESSION_HANDOFF.md) START ritual |
| End | SESSION_HANDOFF END + [IMPLEMENTATION_LOG.md](./IMPLEMENTATION_LOG.md) row + [DEFINITION_OF_DONE.md](./DEFINITION_OF_DONE.md) |

---

## 6. Gates (hard stops)

| Gate | Doc |
|------|-----|
| Before SQL apply | [PRE_BUILD_SIGNOFF.md](./PRE_BUILD_SIGNOFF.md) |
| Progress / conflicts | [PROGRESS_AND_CONFLICTS.md](./PROGRESS_AND_CONFLICTS.md) |
| UI feature ship | UI_STYLE_GUIDE compliance checklist |

---

## 7. MVP defer list

PWA (D8), Supabase CLI, automated e2e, staging project, 60% RPC demotion unless D4-B locked.

---

## 8. Doc index

| Topic | File |
|-------|------|
| Rule book (this) | RULEBOOK.md |
| Efficient execution | EFFICIENT_WORKFLOW.md |
| Roadmap detail | ROADMAP.md |
| Handoff | SESSION_HANDOFF.md |
| Audit log | IMPLEMENTATION_LOG.md |
| Product decisions | DECISIONS.md |
| UI | UI_STYLE_GUIDE.md |
| Deploy steps | DEPLOYMENT.md |
| Tests | TESTING.md |
| AI brief | AI_CONTEXT.md |

---

## 9. Spec-driven features (15 min)

Full guide: [SPEC_DRIVEN.md](./SPEC_DRIVEN.md). Backlog: [specs/BACKLOG.md](./specs/BACKLOG.md).

- One sitting = **one feature** (F-001 … F-027).
- Build with skill `apextrader-feature-build` or explicit `Build F-0XX`.
- **Ship record:** `app-features/` (built / tested / deployed) — update on every feature done.

## 10. Cursor skills (session bookends)

| Skill | When |
|-------|------|
| `apextrader-session-open` | **Start** of every sitting — read handoff, confirm slice |
| `apextrader-session-close` | **End** of every sitting — update handoff + IMP log |

Location: `.cursor/skills/<name>/SKILL.md`

| `apextrader-feature-build` | Implement **one** backlog feature |

## 11. Cursor session prompt template

```text
/open → apextrader-session-open
… work …
/close → apextrader-session-close
```

Or: `Goal: Efficient Workflow Session N — <one slice>.` after open skill.

---

*Last consolidated: 2026-10-17 (includes EFFICIENT_WORKFLOW strategy).*
