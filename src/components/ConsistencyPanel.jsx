import { useMemo } from 'react';
import { DEFAULT_CONSISTENCY_RATIO, formatINR, getConsistencyMetrics } from '../lib/formulas';
import { sumAllTradePnl, sumPnlForLocalDay, todayLocalDateKey } from '../lib/tradeDay';

const TIER_COPY = {
  safe: { label: 'Within rule', className: 'text-emerald-400' },
  warning: { label: 'Approaching cap', className: 'text-amber-400' },
  critical: { label: 'Near breach', className: 'text-orange-400' },
  breached: { label: 'Rule breached', className: 'text-rose-400' },
};

export default function ConsistencyPanel({ trades = [] }) {
  const todayKey = todayLocalDateKey();
  const metrics = useMemo(() => {
    const total = sumAllTradePnl(trades);
    const today = sumPnlForLocalDay(trades, todayKey);
    return getConsistencyMetrics(total, today, DEFAULT_CONSISTENCY_RATIO);
  }, [trades, todayKey]);

  const pct = DEFAULT_CONSISTENCY_RATIO * 100;

  return (
    <section className="cyber-card p-5 rounded-xl border border-cyan-500/10">
      <h2 className="cyber-section-title mb-1">Consistency rule</h2>
      <p className="text-[10px] text-slate-500 mb-3">
        Prop-style: today ≤ {pct}% of lifetime journal profit (F-033)
      </p>

      {!metrics.applicable ? (
        <p className="text-xs text-slate-400" role="status">
          {metrics.reason === 'no_positive_total'
            ? 'Not active until total journal P&L is positive.'
            : 'Log trades to track consistency.'}
        </p>
      ) : (
        <div className="space-y-3 text-sm">
          <dl className="space-y-2 text-xs">
            <div className="flex justify-between gap-4">
              <dt className="text-slate-400">Total journal P&amp;L</dt>
              <dd className="font-mono tabular-nums text-slate-100">
                {formatINR(metrics.totalProfit)}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-400">Today&apos;s share</dt>
              <dd
                className={`font-mono tabular-nums ${
                  TIER_COPY[metrics.tier]?.className ?? 'text-slate-200'
                }`}
              >
                {metrics.todaySharePct.toFixed(1)}% / {metrics.maxDaySharePct}%
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-400">Safe headroom today</dt>
              <dd className="font-mono tabular-nums text-cyan-300">
                {formatINR(metrics.headroomToday)}
              </dd>
            </div>
          </dl>

          <div
            className="h-2 rounded-full bg-slate-800/80 overflow-hidden border border-cyan-500/10"
            role="progressbar"
            aria-valuenow={Math.min(100, Math.round(metrics.todaySharePct))}
            aria-valuemin={0}
            aria-valuemax={metrics.maxDaySharePct}
            aria-label="Today share of total profit"
          >
            <div
              className={`h-full rounded-full transition-all ${
                metrics.breached ? 'bg-rose-500' : 'bg-cyan-500'
              }`}
              style={{
                width: `${Math.min(100, (metrics.todaySharePct / metrics.maxDaySharePct) * 100)}%`,
              }}
            />
          </div>

          <p className={`text-[10px] uppercase tracking-wider ${TIER_COPY[metrics.tier].className}`}>
            {TIER_COPY[metrics.tier].label}
            {metrics.breached
              ? ` — today exceeds ${metrics.maxDaySharePct}% of total profit`
              : null}
          </p>
        </div>
      )}
    </section>
  );
}
