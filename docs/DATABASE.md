# Database (Supabase / PostgreSQL)

## Where the SQL lives

Canonical migration file (to be executed in Supabase SQL Editor or CLI):

`supabase/migrations/001_initial_schema.sql`

The file is **complete** and authoritative (includes `GRANT EXECUTE`, `search_path`, D12 promotion-first). PRD §3 is historical only—if PRD differs, follow [DECISIONS.md](./DECISIONS.md) + this migration.

## Apply migration

1. Supabase Dashboard → **SQL Editor** → New query.
2. Paste entire contents of `001_initial_schema.sql`.
3. Run once on a fresh project (or use idempotent patterns if re-running).
4. Confirm in **Table Editor**: `trading_accounts`, `trades`, `level_history`.

## Objects created

| Object | Type | Purpose |
|--------|------|---------|
| `trading_accounts` | Table | User state |
| `trades` | Table | Journal |
| `level_history` | Table | Level change audit |
| `handle_new_user` | Trigger function | Seed account on `auth.users` insert |
| `on_auth_user_created` | Trigger | Calls handler |
| `log_trade(p_pnl, p_notes)` | RPC `SECURITY DEFINER` | Atomic trade + rules |

Extensions: `uuid-ossp` (or `gen_random_uuid()` on newer Postgres—align with Supabase default).

## Business rules (RPC)

For level `N`, baseline `Cap_N = 10000 × 1.5^(N-1)`.

| Rule | Condition | Effect |
|------|-----------|--------|
| Promotion | `(new_capital - Cap_N) >= 0.5 × Cap_N` and level &lt; 42 | Level +1, `TARGET_MET` |
| Demotion (daily DD) | `(Cap_N - new_capital) >= 0.3 × Cap_N` | Level −2 (min 1), `DRAWDOWN_HIT` |

**Note:** PRD text also mentions **−60% max drawdown** in the UI. The stock PRD RPC only demotes on **−30%** from baseline. See [DECISIONS.md](./DECISIONS.md) before changing RPC.

Capital after level change: RPC keeps **`new_capital`** from the trade (does not auto-reset to new level baseline).

## RLS summary

- All three tables: RLS **on**.
- SELECT/INSERT (and UPDATE on accounts) scoped to `auth.uid() = user_id`.
- Clients must **not** insert into `trading_accounts` manually except via trigger; updates to level/capital should go through `log_trade` only.

## RPC permissions

Ensure authenticated users can execute:

```sql
GRANT EXECUTE ON FUNCTION public.log_trade(NUMERIC, TEXT) TO authenticated;
```

(Add to migration if not present.)

## Verification queries

Run in SQL Editor **as a test user** (or use Table Editor after app sign-up).

### Account exists after sign-up

```sql
select * from public.trading_accounts where user_id = auth.uid();
```

### Manual RPC test (logged-in user context)

Use the app’s Trade Logger, or Supabase client with user JWT—not the service role from SQL Editor unless impersonating.

### Level 1 promotion math

- Base: ₹10,000  
- Target profit: +₹5,000 → ending ≥ ₹15,000 from start of level  
- If `current_capital` is 10,000, PnL **+5000** should trigger promotion to level 2.

### Level 1 demotion math

- Daily DD limit: ₹3,000 below baseline  
- If `current_capital` is 10,000, PnL **−3000** or worse (ending ≤ 7,000) triggers demotion by 2 levels (to level 1 floor).

Document actual results in [SESSION_HANDOFF.md](./SESSION_HANDOFF.md) after first test.

## Backups & migrations

- Supabase Free: use dashboard backups; export schema periodically.
- For schema changes: add `002_*.sql`, never edit production history without a plan.
- Optional later: [Supabase CLI](https://supabase.com/docs/guides/cli) linked to this repo.

## Troubleshooting

See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) (RLS, “account not found”, trigger missing).
