# AI / agent context (short)

Use this when continuing work in Cursor or another coding agent across sessions.

## Project

**ApexTrader Cyber-Grid** — React (Vite) SPA, Tailwind, Supabase Auth + Postgres + `log_trade` RPC. Static deploy on GitHub Pages.

## Paths

| What | Path |
|------|------|
| App root | `apextrader-cybergrid/` |
| PRD | `../PRD.txt` |
| Docs index | `docs/README.md` |
| Handoff state | `docs/SESSION_HANDOFF.md` |
| Change audit log | `docs/IMPLEMENTATION_LOG.md` |
| Decisions | `docs/DECISIONS.md` |

## Rules for agents

1. **START:** SESSION_HANDOFF START ritual; check PRE_BUILD gate if DB/RPC work.  
2. **Do not** put service role keys in code or docs.  
3. **Do not** update level/capital from client except `supabase.rpc('log_trade', …)`.  
4. Follow **DECISIONS.md**; PRD loses to LOCKED decisions.  
5. **END:** SESSION_HANDOFF END ritual + IMPLEMENTATION_LOG row(s) + DEFINITION_OF_DONE for the feature.  
6. Never edit applied `001_*.sql`—add `002_*.sql` (D13).  
7. After `formulas.js` or RPC math changes: `npm run verify:formulas`.  
8. Cursor rule: `.cursor/rules/apextrader-cybergrid.mdc` (open this repo as workspace root).  

## Rule book

Follow [RULEBOOK.md](./RULEBOOK.md) first; details in [EFFICIENT_WORKFLOW.md](./EFFICIENT_WORKFLOW.md).

## Typical next implementation tasks

1. Fill `001_initial_schema.sql` from PRD §3 + `GRANT EXECUTE` on `log_trade`.  
2. Implement PRD component code in `src/components/*.jsx`.  
3. Configure GitHub secrets + `VITE_BASE_PATH`; verify deploy.  

## Commands

```powershell
npm install
npm run dev
npm run build
```

## User

Amit — prefers working in code directly; multi-week part-time build.
