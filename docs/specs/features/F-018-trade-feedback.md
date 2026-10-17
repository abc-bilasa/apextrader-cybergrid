# F-018 — Confetti + audio

```yaml
id: F-018
status: done
depends: [F-016]
estimate: 15m
```

## Outcome

`TARGET_MET` → confetti + high tone; drawdown → low tone per PRD.

## Acceptance criteria

- [x] Uses RPC result `trigger` field
- [x] Audio fail-safe (no crash if AudioContext blocked)

## Files allowed

- `src/components/Dashboard.jsx`

## Out of scope

- New chart work
