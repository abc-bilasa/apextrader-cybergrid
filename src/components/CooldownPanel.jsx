import { formatCooldownRemaining } from '../lib/lossStreakCooldown';

export default function CooldownPanel({
  cooldown,
  overrideEnabled,
  onOverrideChange,
  embedded = false,
}) {
  const shell = embedded
    ? ''
    : 'cyber-card p-4 rounded-xl border border-cyan-500/10';
  const { streak, threshold, durationMinutes, active, remainingMs } = cooldown;

  if (streak < threshold) {
    return (
      <section className={shell}>
        {!embedded ? (
        <h2 className="cyber-section-title text-sm mb-1">Loss-streak cool-down</h2>
        ) : null}
        <p className="text-[10px] text-slate-500" role="status">
          {streak === 0
            ? 'No active loss streak.'
            : `${streak} loss${streak === 1 ? '' : 'es'} in a row — cool-down starts at ${threshold}.`}
        </p>
      </section>
    );
  }

  return (
    <section
      className={
        embedded
          ? active
            ? 'rounded-lg border border-rose-500/35 bg-rose-950/20 p-3'
            : ''
          : `cyber-card p-4 rounded-xl border ${
              active ? 'border-rose-500/35 bg-rose-950/20' : 'border-cyan-500/10'
            }`
      }
      aria-live="polite"
    >
      {!embedded ? (
      <h2 className="cyber-section-title text-sm mb-1">Loss-streak cool-down</h2>
      ) : null}
      <p className="text-[10px] text-slate-500 mb-3">
        Advisory pause after {threshold}+ losses ({durationMinutes}m from last loss). F-038 / D14.
      </p>

      {active ? (
        <div className="space-y-3">
          <p className="text-xs text-rose-200">
            <span className="text-slate-400">Streak:</span>{' '}
            <span className="font-mono tabular-nums">{streak}</span>
            <span className="mx-2 text-slate-600">·</span>
            <span className="text-slate-400">Resume in</span>{' '}
            <span className="font-mono cyber-metric text-rose-300 tabular-nums">
              {formatCooldownRemaining(remainingMs)}
            </span>
          </p>
          <p className="text-[10px] text-slate-500">
            Quick log and custom commit are paused. Step away or override if you are deliberate.
          </p>
          <label className="flex items-start gap-2 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              className="mt-0.5 rounded border-slate-600"
              checked={overrideEnabled}
              onChange={(e) => onOverrideChange(e.target.checked)}
            />
            <span>I accept the risk — allow logging during cool-down</span>
          </label>
        </div>
      ) : (
        <p className="text-xs text-emerald-300/90" role="status">
          Timer ended — you may log again. Streak still {streak}; another loss retriggers the pause.
        </p>
      )}
    </section>
  );
}
