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
| `src/components/Dashboard.jsx` | §5.2 | Dashboard F-012–F-039 panels + data load |
| `src/components/LevelHistory.jsx` | ROADMAP optional | F-028 level transition list |
| `src/components/HeadroomPanel.jsx` | F-029 | DD/promotion headroom vs `log_trade` rules |
| `src/lib/formulas.js` | §5.1 | Level metrics + headroom/pacing/consistency; optional `ruleProfileId` (D15) |
| `src/lib/ruleProfiles.js` | F-039 | Profile keys aligned with `004_rule_profiles.sql` |
| `src/lib/lossStreakCooldown.js` | F-038 | Advisory cool-down math (D14) |
| `src/hooks/useLossStreakCooldown.js` | F-038 | Live countdown for cool-down UI |
| `src/components/CooldownPanel.jsx` | F-038 | Timer + override; blocks log/CSV when active |
| `src/components/RuleProfilePanel.jsx` | F-039 | Switch `trading_accounts.rule_profile` |
| `src/lib/tradeDay.js` | D11 | Local day keys + sum today P&L |
| `src/components/DailyPacingPanel.jsx` | F-031 | Today vs D1–D4 cumulative |
| `src/components/ConsistencyPanel.jsx` | F-033 | 40% single-day vs total profit |
| `src/lib/disciplineStats.js` | F-034 | Streaks, revenge window, level events |
| `src/components/DisciplinePanel.jsx` | F-034 | Behavior stats panel |
| `src/components/SessionReviewPanel.jsx` | F-035 | End-of-day review form |
| `supabase/migrations/003_session_reviews.sql` | F-035 | Apply after `001` |
| `src/components/TradeJournalTable.jsx` | F-036, F-040 | Paginated trade list, filters, CSV export |
| `src/lib/tradeCsvExport.js` | F-040 | Build/download journal CSV |
| `src/lib/csvTradeImport.js` | F-037 | CSV P&L column detect + sum |
| `src/components/CsvImportPanel.jsx` | F-037 | File upload → one `log_trade` |
| `src/components/TradeLogger.jsx` | §5.2 | F-015/016/030/032 log + simulate preview |
| `src/components/TradeSimPreview.jsx` | F-032 | Pre-commit RPC outcome card |
| `supabase/migrations/002_simulate_trade.sql` | F-032 | Apply in Supabase after `001` |
| `supabase/migrations/004_rule_profiles.sql` | F-039 | Column + profile-aware `log_trade` / `simulate_trade` |
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
