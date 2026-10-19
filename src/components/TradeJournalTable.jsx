import { useMemo, useState } from 'react';
import { Download, Pencil, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { formatINR } from '../lib/formulas';
import { localDateKey } from '../lib/tradeDay';
import { exportTradesCsv } from '../lib/tradeCsvExport';
import TradeJournalEditDialog from './TradeJournalEditDialog';

const PAGE_SIZE = 10;

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'profit', label: 'Profit' },
  { id: 'loss', label: 'Loss' },
];

function formatWhen(iso) {
  try {
    return new Date(iso).toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

function matchesFilter(trade, filterId) {
  if (filterId === 'profit') return Number(trade.pnl) > 0;
  if (filterId === 'loss') return Number(trade.pnl) < 0;
  return true;
}

export default function TradeJournalTable({ trades = [], onJournalChange }) {
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(0);
  const [editingTrade, setEditingTrade] = useState(null);
  const [actionError, setActionError] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  const filtered = useMemo(() => {
    const rows = [...trades]
      .filter((t) => matchesFilter(t, filter))
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    return rows;
  }, [trades, filter]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const slice = filtered.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);

  const goPage = (next) => {
    setPage(Math.max(0, Math.min(pageCount - 1, next)));
  };

  const onFilterChange = (id) => {
    setFilter(id);
    setPage(0);
  };

  const handleDelete = async (trade) => {
    if (
      !window.confirm(
        `Delete this trade (${formatINR(Number(trade.pnl))})? Level and capital will be recalculated.`,
      )
    ) {
      return;
    }
    setActionError('');
    setDeletingId(trade.id);
    try {
      const { data, error } = await supabase.rpc('delete_trade', { p_trade_id: trade.id });
      if (error) {
        const missing = error.code === 'PGRST202' || error.message?.includes('delete_trade');
        setActionError(
          missing
            ? 'Apply migration 005_trade_journal_crud.sql in Supabase to delete trades.'
            : error.message,
        );
        return;
      }
      if (onJournalChange) await onJournalChange(data);
    } catch {
      setActionError('Could not delete trade.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="cyber-card p-5 rounded-xl border border-cyan-500/10">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="cyber-section-title">Trade journal</h2>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            disabled={filtered.length === 0}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] uppercase tracking-wider border border-cyan-500/30 text-cyan-300 hover:bg-cyan-950/40 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label={`Export ${filtered.length} trades as CSV`}
            onClick={() => exportTradesCsv(filtered, filter)}
          >
            <Download className="w-3.5 h-3.5" aria-hidden />
            Export CSV
          </button>
          <div className="flex gap-1.5" role="tablist" aria-label="Filter trades">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={filter === f.id}
              className={`px-2.5 py-1 rounded text-[10px] uppercase tracking-wider border transition-colors ${
                filter === f.id
                  ? 'border-cyan-500/50 bg-cyan-950/50 text-cyan-300'
                  : 'border-slate-600 text-slate-400 hover:border-cyan-500/30'
              }`}
              onClick={() => onFilterChange(f.id)}
            >
              {f.label}
            </button>
          ))}
          </div>
        </div>
      </div>

      {actionError ? (
        <div className="cyber-alert-error mb-3 text-xs" role="alert">{actionError}</div>
      ) : null}

      <p className="text-[10px] text-slate-500 mb-3">
        <strong className="text-slate-400">Add</strong> via Log trade. Edit/delete need SQL{' '}
        <code className="text-cyan-600/80">005_trade_journal_crud.sql</code> (after 004).
      </p>

      {filtered.length === 0 ? (
        <p className="text-xs text-slate-500" role="status">No trades match this filter.</p>
      ) : (
        <>
          <div className="overflow-x-auto -mx-1 px-1">
            <table className="w-full text-xs min-w-[32rem]">
              <thead>
                <tr className="text-left text-slate-500 border-b border-cyan-500/15">
                  <th className="py-2 pr-3 font-medium">When</th>
                  <th className="py-2 pr-3 font-medium">Lv</th>
                  <th className="py-2 pr-3 font-medium">P&amp;L</th>
                  <th className="py-2 pr-3 font-medium">After</th>
                  <th className="py-2 pr-3 font-medium">Notes</th>
                  <th className="py-2 font-medium w-20">Actions</th>
                </tr>
              </thead>
              <tbody>
                {slice.map((trade) => {
                  const pnl = Number(trade.pnl);
                  const pnlClass =
                    pnl > 0 ? 'text-emerald-400' : pnl < 0 ? 'text-rose-400' : 'text-slate-300';
                  return (
                    <tr
                      key={trade.id}
                      className="border-b border-slate-800/80 hover:bg-slate-900/40"
                    >
                      <td className="py-2.5 pr-3 font-mono text-slate-400 whitespace-nowrap">
                        <time dateTime={trade.created_at}>{formatWhen(trade.created_at)}</time>
                        <span className="block text-[10px] text-slate-600">
                          {localDateKey(trade.created_at)}
                        </span>
                      </td>
                      <td className="py-2.5 pr-3 font-mono text-cyan-300/90">{trade.level}</td>
                      <td className={`py-2.5 pr-3 font-mono tabular-nums ${pnlClass}`}>
                        {formatINR(pnl)}
                      </td>
                      <td className="py-2.5 pr-3 font-mono tabular-nums text-slate-300">
                        {formatINR(Number(trade.ending_capital))}
                      </td>
                      <td className="py-2.5 pr-3 text-slate-400 max-w-[10rem] truncate" title={trade.notes ?? ''}>
                        {trade.notes?.trim() ? trade.notes : '—'}
                      </td>
                      <td className="py-2.5">
                        <div className="flex gap-1">
                          <button
                            type="button"
                            className="p-1.5 rounded border border-slate-600 text-slate-400 hover:border-cyan-500/40 hover:text-cyan-300"
                            aria-label="Edit trade"
                            onClick={() => setEditingTrade(trade)}
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={deletingId === trade.id}
                            className="p-1.5 rounded border border-slate-600 text-slate-400 hover:border-rose-500/40 hover:text-rose-300 disabled:opacity-40"
                            aria-label="Delete trade"
                            onClick={() => handleDelete(trade)}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 mt-4 text-xs text-slate-400">
            <span>
              {filtered.length} trade{filtered.length === 1 ? '' : 's'} · page {safePage + 1} /{' '}
              {pageCount}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={safePage <= 0}
                className="cyber-btn-ghost px-3 py-1 disabled:opacity-40"
                onClick={() => goPage(safePage - 1)}
              >
                Prev
              </button>
              <button
                type="button"
                disabled={safePage >= pageCount - 1}
                className="cyber-btn-ghost px-3 py-1 disabled:opacity-40"
                onClick={() => goPage(safePage + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}

      <TradeJournalEditDialog
        trade={editingTrade}
        open={Boolean(editingTrade)}
        onClose={() => setEditingTrade(null)}
        onSaved={onJournalChange}
      />
    </section>
  );
}
