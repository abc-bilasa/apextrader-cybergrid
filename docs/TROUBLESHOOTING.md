# Troubleshooting

## Local dev

### `npm` is not recognized (Windows)

Install [Node.js 20 LTS](https://nodejs.org/), restart terminal, run `node -v`.

### Blank page after `npm run dev`

- Check browser console for errors  
- Missing Supabase env: add `.env.local` (app may still load Auth with empty client—fix env)  
- Import path typos in `src/`

### Supabase client errors / 401

- Wrong `VITE_SUPABASE_URL` or anon key  
- Restart dev server after changing `.env.local`  
- User not logged in when calling protected tables  

## Auth

### Sign-up works but no account row

- Trigger `on_auth_user_created` missing or failed—re-run migration  
- Check Supabase **Database** → **Triggers**  
- Inspect **Logs** for trigger errors  

### Email link redirects to wrong URL

Update **Authentication → URL configuration** — [ENVIRONMENT.md](./ENVIRONMENT.md).

### “Invalid login credentials”

- Typo in password  
- Email confirmation required but inbox not confirmed  

## Trades / RPC

### `Not authenticated`

User session expired; sign in again.

### `Account not found`

`trading_accounts` row missing for user—insert manually once or fix signup trigger.

### Level did not change when expected

- Recompute with [TESTING.md](./TESTING.md) tables  
- Promotion uses **level baseline** `Cap_N`, not arbitrary starting equity  
- Read [DECISIONS.md](./DECISIONS.md) D3–D5  

### RPC permission denied

Grant execute on `log_trade` to `authenticated` — [DATABASE.md](./DATABASE.md).

## GitHub Pages

### 404 on refresh or assets 404

- Wrong `VITE_BASE_PATH` — must match `/repo-name/`  
- Rebuild and redeploy  

### White screen only in production

- Open DevTools → Network: JS bundle 404 → base path issue  
- Supabase URL blocked: check browser console CORS (rare with official Supabase)  

### Actions build fails

- `npm ci` without `package-lock.json` → run `npm install` locally and commit lockfile  
- Missing secrets → add `VITE_SUPABASE_*` in repo settings  

## Data / RLS

### User sees empty trades but account exists

- No trades yet, or wrong `user_id`  
- RLS blocking: ensure queries use logged-in client, not service key in browser  

## Getting help

1. Note exact error message (Supabase JSON or browser console)  
2. Check [SESSION_HANDOFF.md](./SESSION_HANDOFF.md) for known blockers  
3. Supabase status: [status.supabase.com](https://status.supabase.com)  
