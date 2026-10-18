import { formatINR, getHeadroomMetrics } from '../lib/formulas';

const TIER_STYLES = {
  safe: { bar: 'bg-emerald-500', text: 'text-emerald-400', label: 'Safe' },
  caution: { bar: 'bg-amber-400', text: 'text-amber-400', label: 'Caution · 50%' },
  warning: { bar: 'bg-orange-500', text: 'text-orange-400', label: 'Warning · 75%' },
  critical: { bar: 'bg-rose-500', text: 'text-rose-400', label: 'Critical · 90%' },
  breached: { bar: 'bg-rose-600', text: 'text-rose-300', label: 'At demotion floor' },
};

function ProgressRow({ label, valueLabel, pct, tier }) {
  const style = TIER_STYLES[tier] ?? TIER_STYLES.safe;
  const width = Math.min(100, Math.max(0, pct * 100));

  return (
    <div>
      <div className="flex justify-between items-baseline gap-2 text-xs mb-1">
        <span className="text-slate-400">{label}</span>
        <span className={`font-mono tabular-nums ${style.text}`}>{valueLabel}</span>
      </div>
      <div
        className="h-2 rounded-full bg-slate-800/80 overflow-hidden border border-cyan-500/10"
        role="progressbar"
        aria-valuenow={Math.round(width)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div
          className={`h-full rounded-full transition-all duration-300 ${style.bar}`}
          style={{ width: `${width}%` }}
        />
      </div>
      <p className={`text-[10px] uppercase tracking-wider mt-1 ${style.text}`}>{style.label}</p>
    </div>
  );
}

export default function HeadroomPanel({ level, currentCapital }) {
  const h = getHeadroomMetrics(level, currentCapital);

  return (
    <section className="cyber-card p-5 rounded-xl border border-cyan-500/10">
      <h2 className="cyber-section-title mb-4">Risk headroom</h2>
      <div className="space-y-4 text-sm">
        <ProgressRow
          label="Daily drawdown used (−30% rule)"
          valueLabel={`${formatINR(h.drawdownFromBase)} / ${formatINR(h.dailyDrawdownLimit)}`}
          pct={h.dailyDrawdownUsedPct}
          tier={h.dailyDrawdownTier}
        />
        <dl className="space-y-2 text-xs">
          <div className="flex justify-between gap-4">
            <dt className="text-slate-400">DD buffer remaining</dt>
            <dd className="font-mono cyber-metric cyber-text-risk tabular-nums">
              {formatINR(h.dailyDrawdownRemaining)}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-slate-400">Demotion floor (capital)</dt>
            <dd className="font-mono cyber-metric text-slate-200 tabular-nums">
              {formatINR(h.demotionFloorCapital)}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-slate-400">Max loss before demotion</dt>
            <dd className="font-mono cyber-metric cyber-text-risk tabular-nums">
              {formatINR(h.maxLossBeforeDemotion)}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-slate-400">Max DD advisory (−60%)</dt>
            <dd className="font-mono cyber-metric text-slate-400 tabular-nums">
              {formatINR(h.maxDrawdownRemaining)} left
            </dd>
          </div>
        </dl>

        {h.canPromote ? (
          <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/30 px-3 py-2 text-xs">
            <p className="text-emerald-400 font-semibold uppercase tracking-wider">
              Promotion threshold met
            </p>
            <p className="text-slate-300 mt-1">
              Next qualifying profit logs a level-up (LV {h.level} → {Math.min(42, h.level + 1)}).
            </p>
          </div>
        ) : h.level < 42 ? (
          <div>
            <div className="flex justify-between items-baseline gap-2 text-xs mb-1">
              <span className="text-slate-400">Progress to promotion (+50%)</span>
              <span className="font-mono tabular-nums text-cyan-300">
                {formatINR(h.promotionGapCapital)} to go
              </span>
            </div>
            <div
              className="h-2 rounded-full bg-slate-800/80 overflow-hidden border border-cyan-500/10"
              role="progressbar"
              aria-valuenow={Math.round(h.promotionProgressPct * 100)}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full rounded-full bg-cyan-500 transition-all duration-300"
                style={{ width: `${Math.min(100, h.promotionProgressPct * 100)}%` }}
              />
            </div>
          </div>
        ) : (
          <p className="text-xs text-slate-400">Max level — promotion N/A.</p>
        )}
      </div>
    </section>
  );
}
