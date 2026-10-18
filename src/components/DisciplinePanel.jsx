import { useMemo } from 'react';
import { getDisciplineMetrics } from '../lib/disciplineStats';

function formatMinutes(min) {
  if (min == null || !Number.isFinite(min)) return '—';
  if (min < 1) return '<1 min';
  if (min < 60) return `${Math.round(min)} min`;
  const h = Math.floor(min / 60);
  const m = Math.round(min % 60);
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

function StatRow({ label, value, hint, tone = 'neutral' }) {
  const valueClass =
    tone === 'risk'
      ? 'text-rose-400'
      : tone === 'good'
        ? 'text-emerald-400'
        : 'text-slate-100';

  return (
    <div className="flex justify-between items-baseline gap-4 text-xs">
      <div>
        <dt className="text-slate-400">{label}</dt>
        {hint ? <p className="text-[10px] text-slate-500 mt-0.5">{hint}</p> : null}
      </div>
      <dd className={`font-mono cyber-metric tabular-nums ${valueClass}`}>{value}</dd>
    </div>
  );
}

export default function DisciplinePanel({ trades = [], levelHistory = [] }) {
  const stats = useMemo(
    () => getDisciplineMetrics(trades, levelHistory),
    [trades, levelHistory],
  );

  const streakTone = stats.lossStreak >= 3 ? 'risk' : stats.lossStreak >= 2 ? 'neutral' : 'good';
  const revengeTone = stats.revengeCount > 0 ? 'risk' : 'neutral';

  return (
    <section className="cyber-card p-5 rounded-xl border border-cyan-500/10">
      <h2 className="cyber-section-title mb-1">Discipline stats</h2>
      <p className="text-[10px] text-slate-500 mb-4">Behavior from journal timestamps (F-034)</p>

      {stats.totalTrades === 0 ? (
        <p className="text-xs text-slate-400" role="status">Log trades to see streaks and pacing.</p>
      ) : (
        <dl className="space-y-3">
          <StatRow
            label="Loss streak"
            value={stats.lossStreak}
            hint="Consecutive losses (latest first)"
            tone={streakTone}
          />
          <StatRow label="Trades today" value={stats.tradesToday} />
          <StatRow
            label="Avg gap between trades"
            value={formatMinutes(stats.avgGapMin)}
            hint={stats.tradesToday >= 2 ? 'Today' : 'All time (last gaps)'}
          />
          <StatRow
            label="Quick re-entries"
            value={stats.revengeCount}
            hint={`Within ${stats.revengeWindowMinutes}m after a loss`}
            tone={revengeTone}
          />
          <StatRow
            label="Level promotions"
            value={stats.promotions}
            tone={stats.promotions > 0 ? 'good' : 'neutral'}
          />
          <StatRow
            label="Level demotions"
            value={stats.demotions}
            tone={stats.demotions > 0 ? 'risk' : 'neutral'}
          />
        </dl>
      )}
    </section>
  );
}
