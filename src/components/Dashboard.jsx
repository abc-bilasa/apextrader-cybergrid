import { useEffect, useState } from 'react';
import { LogOut, Zap } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { formatINR } from '../lib/formulas';
import TradeLogger from './TradeLogger';
import EquityChart from './EquityChart';
import LevelGrid from './LevelGrid';

const DEFAULT_LEVEL = 1;
const DEFAULT_CAPITAL = 10000;

function PanelPlaceholder({ title, children }) {
  return (
    <section className="cyber-card p-5 rounded-xl border border-cyan-500/10">
      <h2 className="cyber-section-title mb-3">{title}</h2>
      {children ?? <p className="text-xs text-slate-500">Coming in a later feature slice.</p>}
    </section>
  );
}

export default function Dashboard({ session }) {
  const email = session?.user?.email ?? 'trader';
  const [account, setAccount] = useState(null);
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function loadDashboardData() {
      setLoading(true);
      setError('');

      const [accountRes, tradesRes] = await Promise.all([
        supabase.from('trading_accounts').select('*').single(),
        supabase.from('trades').select('*').order('created_at', { ascending: true }),
      ]);

      if (cancelled) return;

      if (accountRes.error) {
        setError(accountRes.error.message);
        setAccount(null);
      } else {
        setAccount(accountRes.data);
      }

      if (tradesRes.error) {
        setError((prev) => prev || tradesRes.error.message);
        setTrades([]);
      } else {
        setTrades(tradesRes.data ?? []);
      }

      setLoading(false);
    }

    loadDashboardData();

    return () => {
      cancelled = true;
    };
  }, [session?.user?.id]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const level = account?.current_level ?? DEFAULT_LEVEL;
  const capital = Number(account?.current_capital ?? DEFAULT_CAPITAL);
  const chartBase =
    trades.length > 0 ? Number(trades[0].starting_capital) : capital;

  if (loading) {
    return <div className="cyber-loading min-h-screen">LOADING APEX MATRIX...</div>;
  }

  return (
    <div className="min-h-screen bg-cyber-dark text-slate-100 p-4 md:p-6">
      <header
        className="cyber-card rounded-xl border border-cyan-500/20 p-4 flex flex-wrap items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3 min-w-0">
          <Zap className="w-7 h-7 text-cyan-400 shrink-0" aria-hidden />
          <span className="text-lg font-black tracking-wider text-cyan-400 truncate">
            APEX TRADER
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm">
          <span className="font-mono cyber-metric text-slate-100">
            LV <span className="text-cyan-400">{level}</span>/42
          </span>
          <span className="font-mono cyber-metric text-emerald-400">
            {formatINR(capital)}
          </span>
          <span className="text-slate-400 max-w-[12rem] truncate hidden sm:inline" title={email}>
            {email}
          </span>
          <button
            type="button"
            onClick={handleSignOut}
            className="cyber-btn-ghost inline-flex items-center gap-2"
          >
            <LogOut className="w-5 h-5" aria-hidden />
            <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </header>

      {error ? (
        <div className="cyber-alert-error mt-4" role="alert">
          {error}
        </div>
      ) : null}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        <div className="lg:col-span-4 flex flex-col gap-6">
          <PanelPlaceholder title="Risk & milestones" />
          <TradeLogger />
        </div>

        <div className="lg:col-span-5 flex flex-col gap-6">
          <EquityChart trades={trades} initialCapital={chartBase} />
          <PanelPlaceholder title="Daily P&L" />
        </div>

        <div className="lg:col-span-3">
          <LevelGrid activeLevel={level} />
        </div>
      </div>
    </div>
  );
}
