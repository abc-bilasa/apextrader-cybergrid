# Apply migration 001 (F-002)

Run **once** on a **new** Supabase project. File: `migrations/001_initial_schema.sql`.

## Steps

1. [supabase.com/dashboard](https://supabase.com/dashboard) → **New project** (note name + region).
2. **Project Settings → API** — copy **Project URL** and **anon public** key (for F-003 `.env.local` only; do not commit).
3. **SQL Editor → New query** — paste **entire** `migrations/001_initial_schema.sql` → **Run**.
4. Confirm success (no red errors). If `uuid-ossp` fails, enable extension under Database → Extensions, then re-run from section 2 onward only if tables missing.

## Verify (Table Editor or SQL)

```sql
-- Tables exist
select table_name from information_schema.tables
where table_schema = 'public'
  and table_name in ('trading_accounts', 'trades', 'level_history');

-- RPC grant (should return one row)
select routine_name, grantee
from information_schema.routine_privileges
where routine_schema = 'public' and routine_name = 'log_trade';
```

Expected: 3 tables; `log_trade` executable by `authenticated`.

## After apply

1. Fill Supabase fields in `docs/ENVIRONMENT.md` (no API keys in git).
2. Check PRE_BUILD section C “Supabase project created”.
3. Tell Cursor: **`F-002 applied`** to close the feature record.

**D13:** Do not edit `001_initial_schema.sql` after this; use `002_*.sql` for changes.
