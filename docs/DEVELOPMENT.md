# Development guide

## Daily workflow

```powershell
cd apextrader-cybergrid
git pull
npm install   # if package.json changed
npm run dev
```

1. Pick a task from [ROADMAP.md](./ROADMAP.md).
2. Implement in small commits (when you choose to commit).
3. Update [SESSION_HANDOFF.md](./SESSION_HANDOFF.md) and [IMPLEMENTATION_LOG.md](./IMPLEMENTATION_LOG.md) before stopping.

## Branching (suggested)

| Branch | Use |
|--------|-----|
| `main` | Deployable; triggers GitHub Pages |
| `feat/*` | Optional feature branches → PR to `main` |

Solo dev may commit directly to `main` once CI is green.

## File map (implementation status)

| File | PRD reference | Status |
|------|---------------|--------|
| `src/components/Auth.jsx` | §5.2 | Sign-up/in + errors (F-009–F-010) |
| `src/components/Dashboard.jsx` | §5.2 | Dashboard F-012–F-025 + F-028 level history load |
| `src/components/LevelHistory.jsx` | ROADMAP optional | F-028 level transition list |
| `src/components/HeadroomPanel.jsx` | F-029 | DD/promotion headroom vs `log_trade` rules |
| `src/lib/formulas.js` | §5.1 | `getLevelMetrics`, `getHeadroomMetrics`, `formatINR` |
| `src/components/TradeLogger.jsx` | §5.2 | F-015/016 form + `log_trade` RPC |
| `src/components/EquityChart.jsx` | §5.2 | F-021 Recharts area chart |
| `src/components/DailyPnlChart.jsx` | §5.2 | F-022 daily P&L bars |
| `src/components/LevelGrid.jsx` | §5.2 | F-023 42-level matrix |
| `src/lib/supabase.js` | §5.1 | Implemented |
| `src/lib/chartTheme.js` | UI_STYLE_GUIDE | Implemented |
| `src/index.css` | UI_STYLE_GUIDE | Global `.cyber-*` theme |
| `src/App.jsx` | §5.2 | Session shell done |
| `supabase/migrations/001_*.sql` | §3 | **Applied** (immutable per D13; use `002_` for changes) |
| `supabase/APPLY.md` | F-002 | Dashboard apply + verify steps |
| `supabase/AUTH_URLS.md` | F-011 | Supabase redirect URLs |
| `docs/GITHUB_PAGES_SETUP.md` | F-006/007 | Pages deploy checklist |

Update this table as features land.

## Conventions

- **Currency:** INR via `formatINR()`; inputs are numbers (rupees, not paise).
- **Components:** Functional React; one component per file under `src/components/`.
- **Styling:** Follow [UI_STYLE_GUIDE.md](./UI_STYLE_GUIDE.md). Use `.cyber-*` from `index.css`; charts use `src/lib/chartTheme.js`.
- **Icons:** `lucide-react` per PRD.
- **Charts:** `recharts`; keep chart data derived from `trades` prop.
- **Side effects:** Confetti (`canvas-confetti`) and Web Audio only from Dashboard after RPC result.

## Supabase usage

```javascript
// Read account
const { data, error } = await supabase.from('trading_accounts').select('*').single();

// Log trade (only way to mutate progression)
const { data, error } = await supabase.rpc('log_trade', {
  p_pnl: 1500,
  p_notes: 'Optional journal text',
});
```

Do not `update` `current_level` / `current_capital` from the client.

## Vite base path

Local dev: `base` is `/` (default).

Production GitHub Pages project site: set `VITE_BASE_PATH` — see [DEPLOYMENT.md](./DEPLOYMENT.md).

## Adding dependencies

```powershell
npm install <package>
```

Document non-obvious deps in [DECISIONS.md](./DECISIONS.md).

## Code quality (future)

Not required for MVP; when added:

- ESLint + Prettier
- Vitest for `formulas.js`
- Optional Playwright for auth smoke

See [TESTING.md](./TESTING.md).

## PRD sync

Feature specs: **[`../PRD.txt`](../PRD.txt)**. If PRD and code disagree, fix code or update PRD + [DECISIONS.md](./DECISIONS.md).
