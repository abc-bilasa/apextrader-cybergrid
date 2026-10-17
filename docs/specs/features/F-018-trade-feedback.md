# F-018 — Confetti + audio

```yaml
id: F-018
status: pending
depends: [F-016]
estimate: 15m
```

## Outcome

`TARGET_MET` → confetti + high tone; drawdown → low tone per PRD.

## Acceptance criteria

- [ ] Uses RPC result `trigger` field
- [ ] Audio fail-safe (no crash if AudioContext blocked)

## Files allowed

- `src/components/Dashboard.jsx`

## Out of scope

- New chart work
