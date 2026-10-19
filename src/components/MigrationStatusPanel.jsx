import { useCallback, useEffect, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { probeSupabaseMigrations } from '../lib/migrationProbe';

export default function MigrationStatusPanel() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const runProbe = useCallback(async () => {
    setLoading(true);
    try {
      const results = await probeSupabaseMigrations();
      setRows(results);
    } catch {
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    runProbe();
  }, [runProbe]);

  return (
    <div>
      <div className="flex items-center justify-between gap-2 mb-3">
        <p className="text-xs text-slate-400">
          Run SQL files in Supabase when a row shows <span className="text-rose-300">Pending</span>.
        </p>
        <button
          type="button"
          className="cyber-btn-ghost inline-flex items-center gap-1 text-[10px] px-2 py-1"
          disabled={loading}
          onClick={runProbe}
        >
          <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} aria-hidden />
          Refresh
        </button>
      </div>
      <ul className="space-y-2 text-xs">
        {rows.map((row) => (
          <li
            key={row.id}
            className={`flex justify-between items-center gap-3 rounded-lg border px-3 py-2 ${
              row.ok ? 'border-emerald-500/25 bg-emerald-950/20' : 'border-amber-500/25 bg-amber-950/15'
            }`}
          >
            <span className="text-slate-300">
              <span className="font-mono text-cyan-500/80 mr-2">{row.id}</span>
              {row.label}
            </span>
            <span
              className={`font-mono text-[10px] uppercase tracking-wider ${
                row.ok ? 'text-emerald-400' : 'text-amber-300'
              }`}
            >
              {loading ? '…' : row.ok ? 'Ready' : 'Pending'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
