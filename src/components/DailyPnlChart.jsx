import { useMemo } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { formatINR } from '../lib/formulas';
import { chartTheme, chartTooltipStyle } from '../lib/chartTheme';

/** D11: calendar day from `created_at` in the user's local timezone. */
function localDateKey(iso) {
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function formatDayLabel(dateKey) {
  const [y, m, d] = dateKey.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
  });
}

function aggregatePnlByDay(trades) {
  const totals = new Map();
  for (const trade of trades) {
    if (!trade?.created_at) continue;
    const key = localDateKey(trade.created_at);
    totals.set(key, (totals.get(key) ?? 0) + Number(trade.pnl));
  }
  return [...totals.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, pnl]) => ({
      date,
      label: formatDayLabel(date),
      pnl,
    }));
}

export default function DailyPnlChart({ trades = [] }) {
  const chartData = useMemo(() => aggregatePnlByDay(trades), [trades]);
  const hasData = chartData.length > 0;

  return (
    <section className="cyber-card p-5 rounded-xl border border-cyan-500/10">
      <h2 className="cyber-section-title mb-4">Daily P&amp;L</h2>
      {hasData ? (
        <div className="cyber-chart-wrap h-64 w-full min-h-[16rem]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} vertical={false} />
              <XAxis dataKey="label" stroke={chartTheme.axis} fontSize={10} tickLine={false} />
              <YAxis
                stroke={chartTheme.axis}
                fontSize={10}
                tickLine={false}
                width={48}
                tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={chartTooltipStyle}
                labelFormatter={(_, payload) => {
                  const row = payload?.[0]?.payload;
                  return row?.date ?? '';
                }}
                formatter={(value) => [formatINR(value), 'P&L']}
              />
              <Bar dataKey="pnl" radius={[4, 4, 0, 0]}>
                {chartData.map((entry) => (
                  <Cell
                    key={entry.date}
                    fill={entry.pnl >= 0 ? chartTheme.profit : chartTheme.loss}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="text-xs text-slate-500">Log trades to see daily P&amp;L bars.</p>
      )}
    </section>
  );
}
