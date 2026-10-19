import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';
import { formatINR } from '../lib/formulas';
import { todayLocalDateKey } from '../lib/tradeDay';
import {
  aggregateTradesByLocalDay,
  buildMonthGrid,
  formatCompactPnl,
  formatDayHeading,
  formatMonthTitle,
  shiftMonth,
} from '../lib/pnlCalendar';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function formatTradeTime(iso) {
  try {
    return new Date(iso).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  } catch {
    return '';
  }
}

export default function PnlCalendarPanel({ trades = [] }) {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [selectedKey, setSelectedKey] = useState(todayLocalDateKey());

  const byDay = useMemo(() => aggregateTradesByLocalDay(trades), [trades]);
  const cells = useMemo(() => buildMonthGrid(year, month), [year, month]);

  const monthPnl = useMemo(() => {
    const prefix = `${year}-${String(month).padStart(2, '0')}-`;
    let total = 0;
    let days = 0;
    for (const [key, row] of byDay.entries()) {
      if (key.startsWith(prefix)) {
        total += row.pnl;
        days += 1;
      }
    }
    return { total, days };
  }, [byDay, year, month]);

  const selected = selectedKey ? byDay.get(selectedKey) : null;

  const goMonth = (delta) => {
    const next = shiftMonth(year, month, delta);
    setYear(next.year);
    setMonth(next.month);
  };

  return (
    <section className="cyber-card p-5 rounded-xl border border-cyan-500/10">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="cyber-section-title flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-cyan-400 shrink-0" aria-hidden />
          P&amp;L calendar
        </h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="cyber-btn-ghost p-1.5"
            aria-label="Previous month"
            onClick={() => goMonth(-1)}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm font-medium text-slate-200 min-w-[10rem] text-center">
            {formatMonthTitle(year, month)}
          </span>
          <button
            type="button"
            className="cyber-btn-ghost p-1.5"
            aria-label="Next month"
            onClick={() => goMonth(1)}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-[10px] text-slate-500 mb-3">
        Local calendar days (D11). Month total{' '}
        <span
          className={`font-mono tabular-nums ${
            monthPnl.total > 0 ? 'text-emerald-400' : monthPnl.total < 0 ? 'text-rose-400' : 'text-slate-400'
          }`}
        >
          {formatINR(monthPnl.total)}
        </span>
        {monthPnl.days > 0 ? ` · ${monthPnl.days} active day${monthPnl.days === 1 ? '' : 's'}` : null}
      </p>

      <div className="grid grid-cols-7 gap-1 text-[10px] text-slate-500 mb-1">
        {WEEKDAYS.map((w) => (
          <div key={w} className="text-center py-1 font-medium uppercase tracking-wider">
            {w}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 mb-4" role="grid" aria-label="Monthly P and L calendar">
        {cells.map((cell, idx) => {
          if (!cell.inMonth || !cell.dateKey) {
            return <div key={`pad-${idx}`} className="min-h-[3.25rem] rounded-lg bg-slate-900/20" />;
          }
          const dayRow = byDay.get(cell.dateKey);
          const pnl = dayRow?.pnl ?? 0;
          const hasTrades = (dayRow?.count ?? 0) > 0;
          const selectedCell = selectedKey === cell.dateKey;
          const pnlClass =
            pnl > 0 ? 'text-emerald-400' : pnl < 0 ? 'text-rose-400' : 'text-slate-500';

          return (
            <button
              key={cell.dateKey}
              type="button"
              role="gridcell"
              aria-selected={selectedCell}
              aria-label={`${cell.dateKey}${hasTrades ? `, P and L ${formatINR(pnl)}` : ', no trades'}`}
              className={`min-h-[3.25rem] rounded-lg border text-left p-1.5 transition-colors ${
                selectedCell
                  ? 'border-cyan-500/60 bg-cyan-950/40'
                  : cell.isToday
                    ? 'border-cyan-500/30 bg-slate-900/50'
                    : 'border-slate-800/80 bg-slate-900/30 hover:border-cyan-500/25'
              }`}
              onClick={() => setSelectedKey(cell.dateKey)}
            >
              <span className="block text-xs font-mono text-slate-300">{cell.day}</span>
              {hasTrades ? (
                <span className={`block font-mono tabular-nums text-[10px] leading-tight mt-0.5 ${pnlClass}`}>
                  {formatCompactPnl(pnl)}
                </span>
              ) : (
                <span className="block text-[10px] text-slate-600 mt-0.5">—</span>
              )}
            </button>
          );
        })}
      </div>

      <div className="border-t border-cyan-500/10 pt-4">
        <h3 className="text-xs uppercase tracking-wider text-slate-400 mb-2">
          {selectedKey ? formatDayHeading(selectedKey) : 'Select a day'}
        </h3>
        {!selectedKey || !selected ? (
          <p className="text-xs text-slate-500" role="status">No trades logged this day.</p>
        ) : (
          <div className="space-y-2">
            <p className="text-sm font-mono cyber-metric tabular-nums">
              Day total{' '}
              <span className={selected.pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                {formatINR(selected.pnl)}
              </span>
              <span className="text-slate-500 text-xs font-normal ml-2">
                ({selected.count} trade{selected.count === 1 ? '' : 's'})
              </span>
            </p>
            <ul className="text-xs space-y-1.5 max-h-40 overflow-y-auto pr-1">
              {selected.trades.map((t) => {
                const pnl = Number(t.pnl);
                const cls = pnl > 0 ? 'text-emerald-400' : pnl < 0 ? 'text-rose-400' : 'text-slate-300';
                return (
                  <li
                    key={t.id}
                    className="flex justify-between gap-3 border border-slate-800/60 rounded-lg px-2 py-1.5"
                  >
                    <span className="text-slate-500 font-mono shrink-0">
                      {formatTradeTime(t.created_at)}
                    </span>
                    <span className={`font-mono tabular-nums ${cls}`}>{formatINR(pnl)}</span>
                    <span className="text-slate-500 truncate min-w-0 text-right" title={t.notes ?? ''}>
                      {t.notes?.trim() || t.trade_type}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
