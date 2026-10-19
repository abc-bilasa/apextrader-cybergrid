# F-042 — Edit & delete trades (journal CRUD)

```yaml
id: F-042
status: done
depends: [F-036, F-016]
estimate: 60m
```

## Outcome

Edit P&L, notes, and timestamp; delete a trade. **Add** remains `log_trade`. After change, RPC **replays** full journal so level/capital stay correct (D16).

## Acceptance criteria

- [x] `005_trade_journal_crud.sql` — `update_trade`, `delete_trade`, `rebuild_account_from_trades`
- [x] Journal edit dialog + delete with confirm
- [x] Dashboard refresh after change
- [x] `check:migrations` probes 005

## Apply order

`001` → **`004`** (uses `rule_profile_pcts`) → **`005`**

## Out of scope

- Bulk edit; undo stack; edit without replay
