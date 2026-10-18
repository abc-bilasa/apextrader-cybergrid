import { useMemo } from 'react';
import { formatINR, getIntradayPacingMetrics } from '../lib/formulas';
import { sumPnlForLocalDay, todayLocalDateKey } from '../lib/tradeDay';

export default function DailyPacingPanel({ level, trades = [] }) {
  const todayKey = todayLocalDateKey();
  const todayPnl = useMemo(() => sumPnlForLocalDay(trades, todayKey), [trades, todayKey]);
  const pacing = getIntradayPacingMetrics(level, todayPnl);

  const pnlClass =
    pacing.todayPnl > 0 ? 'text-emerald-400' : pacing.todayPnl < 0 ? 'text-rose-400' : 'text-slate-300';

  return (
    <section className="cyber-card p-5 rounded-xl border border-cyan-500/10">
      <h2 className="cyber-section-title mb-1">Today&apos;s pacing</h2>
      <p className="text-[10px] text-slate-500 mb-3">
        Local day {todayKey} · D1→D4 vs level target (D11)
      </p>

      <div className="flex justify-between items-baseline gap-4 mb-4 text-sm">
        <span className="text-slate-400">Session P&amp;L</span>
        <span className={`font-mono cyber-metric tabular-nums ${pnlClass}`}>
          {formatINR(pacing.todayPnl)}
        </span>
      </div>

      <ul className="space-y-3">
        {pacing.milestones.map((m, index) => {
          const met = pacing.completedCount > index;
          const isNext = pacing.nextMilestone?.id === m.id;
          const segmentProgress =
            met ? 1 : isNext ? pacing.progressInSegment : 0;

          return (
            <li key={m.id}>
              <div className="flex justify-between items-baseline gap-2 text-xs mb-1">
                <span
                  className={
                    met ? 'text-emerald-400 font-semibold' : isNext ? 'text-cyan-300' : 'text-slate-500'
                  }
                >
                  {met ? '✓ ' : ''}
                  {m.label}
                </span>
                <span className="font-mono tabular-nums text-slate-400">
                  {formatINR(m.cumulative)}
                </span>
              </div>
              <div
                className="h-1.5 rounded-full bg-slate-800/80 overflow-hidden border border-cyan-500/10"
                role="progressbar"
                aria-valuenow={Math.round(segmentProgress * 100)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${m.label} progress`}
              >
                <div
                  className={`h-full rounded-full transition-all ${
                    met ? 'bg-emerald-500' : 'bg-cyan-500'
                  }`}
                  style={{ width: `${segmentProgress * 100}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>

      {pacing.allComplete ? (
        <p className="text-xs text-emerald-400 mt-4 border border-emerald-500/25 rounded-lg px-3 py-2 bg-emerald-950/30">
          D4 complete for today — full 50% daily slice logged. Consider stopping per your plan.
        </p>
      ) : pacing.nextMilestone ? (
        <p className="text-xs text-slate-400 mt-4">
          Next: <span className="text-cyan-300">{pacing.nextMilestone.label}</span> —{' '}
          <span className="font-mono tabular-nums">{formatINR(pacing.gapToNext)}</span> to unlock.
        </p>
      ) : null}

      {pacing.todayPnl < 0 ? (
        <p className="text-[10px] text-slate-500 mt-2">
          Red day — pacing milestones apply to cumulative profit toward each threshold.
        </p>
      ) : null}
    </section>
  );
}
