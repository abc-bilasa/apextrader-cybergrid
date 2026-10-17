import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { formatINR } from '../lib/formulas';
import { chartTheme, chartTooltipStyle } from '../lib/chartTheme';

const GRADIENT_ID = 'equityAreaGradient';

export default function EquityChart({ trades = [], initialCapital = 10000 }) {
  const start = Number(initialCapital) || 10000;

  const chartData = [
    { trade: 0, equity: start },
    ...trades.map((t, idx) => ({
      trade: idx + 1,
      equity: Number(t.ending_capital),
      pnl: Number(t.pnl),
    })),
  ];

  return (
    <section className="cyber-card p-5 rounded-xl border border-cyan-500/10">
      <h2 className="cyber-section-title mb-4">Equity growth curve</h2>
      <div className="cyber-chart-wrap h-64 w-full min-h-[16rem]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={GRADIENT_ID} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartTheme.areaGradientTop} stopOpacity={0.4} />
                <stop offset="95%" stopColor={chartTheme.areaGradientTop} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} />
            <XAxis dataKey="trade" stroke={chartTheme.axis} fontSize={10} tickLine={false} />
            <YAxis
              stroke={chartTheme.axis}
              fontSize={10}
              tickLine={false}
              width={48}
              tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={chartTooltipStyle}
              labelFormatter={(label) => `Trade ${label}`}
              formatter={(value) => [formatINR(value), 'Equity']}
            />
            <Area
              type="monotone"
              dataKey="equity"
              stroke={chartTheme.stroke}
              strokeWidth={2}
              fillOpacity={1}
              fill={`url(#${GRADIENT_ID})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
