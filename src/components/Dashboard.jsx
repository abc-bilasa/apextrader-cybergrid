import { useCallback, useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { LogOut, Zap } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { formatINR, getLevelMetrics } from '../lib/formulas';
import TradeLogger from './TradeLogger';
import DailyPnlChart from './DailyPnlChart';
import EquityChart from './EquityChart';
import LevelGrid from './LevelGrid';
import LevelHistory from './LevelHistory';

const DEFAULT_LEVEL = 1;
const DEFAULT_CAPITAL = 10000;

function friendlyDataError(message) {
  if (!message) return 'Something went wrong loading your data.';
  if (message.includes('JSON object requested, multiple (or no) rows returned')) {
    return 'Trading account not found. Sign out and sign in again, or contact support.';
  }
  return message;
}

function playTradeTone(isHigh) {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = isHigh ? 587.33 : 220;
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.25);
  } catch {
    // AudioContext blocked or unavailable
  }
}

function celebrateTargetMet() {
  try {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#22d3ee', '#34d399', '#a78bfa'],
    });
  } catch {
    // canvas-confetti unavailable
  }
  playTradeTone(true);
}

function feedbackForTradeTrigger(trigger) {
  if (trigger === 'TARGET_MET') celebrateTargetMet();
  else if (trigger === 'DRAWDOWN_HIT') playTradeTone(false);
}

function RiskMetricsPanel({ level }) {
  const metrics = getLevelMetrics(level);

  return (
    <section className="cyber-card p-5 rounded-xl border border-cyan-500/10">
      <h2 className="cyber-section-title mb-4">Risk metrics</h2>
      <dl className="space-y-3 text-sm">
        <div className="flex justify-between items-baseline gap-4">
          <dt className="text-slate-400">Base capital</dt>
          <dd className="font-mono cyber-metric text-slate-100 tabular-nums">
            {formatINR(metrics.baseCapital)}
          </dd>
        </div>
        <div className="flex justify-between items-baseline gap-4">
          <dt className="text-slate-400">Target (+50%)</dt>
          <dd className="font-mono cyber-metric cyber-text-profit tabular-nums">
            {formatINR(metrics.targetPlanned)}
          </dd>
        </div>
        <div className="flex justify-between items-baseline gap-4">
          <dt className="text-slate-400">Daily DD (−30%)</dt>
          <dd className="font-mono cyber-metric cyber-text-risk tabular-nums">
            {formatINR(metrics.dailyDrawdownLimit)}
          </dd>
        </div>
        <div className="flex justify-between items-baseline gap-4">
          <dt className="text-slate-400">Max DD (−60%)</dt>
          <dd className="font-mono cyber-metric cyber-text-risk tabular-nums">
            {formatINR(metrics.maxDrawdownLimit)}
          </dd>
        </div>
      </dl>
    </section>
  );
}

function MilestonesPanel({ level }) {
  const { d1, d2, d3, d4 } = getLevelMetrics(level);
  const tiles = [
    { id: 'D1', label: 'D1 · 10%', amount: d1 },
    { id: 'D2', label: 'D2 · 10%', amount: d2 },
    { id: 'D3', label: 'D3 · 10%', amount: d3 },
    { id: 'D4', label: 'D4 · 20%', amount: d4 },
  ];

  return (
    <section className="cyber-card p-5 rounded-xl border border-cyan-500/10">
      <h2 className="cyber-section-title mb-4">Daily milestones</h2>
      <div className="grid grid-cols-2 gap-3">
        {tiles.map((tile) => (
          <div
            key={tile.id}
            className="rounded-lg border border-cyan-500/20 bg-slate-900/50 p-3 text-center"
          >
            <p className="text-xs uppercase tracking-wider text-slate-400">{tile.label}</p>
            <p className="font-mono cyber-metric cyber-text-profit text-sm mt-1 tabular-nums">
              {formatINR(tile.amount)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Dashboard({ session }) {
  const email = session?.user?.email ?? 'trader';
  const [account, setAccount] = useState(null);
  const [trades, setTrades] = useState([]);
  const [levelHistory, setLevelHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const loadDashboardData = useCallback(async ({ showLoader = true } = {}) => {
    if (showLoader) setLoading(true);
    else setRefreshing(true);
    setError('');

    try {
      const [accountRes, tradesRes, historyRes] = await Promise.all([
        supabase.from('trading_accounts').select('*').single(),
        supabase.from('trades').select('*').order('created_at', { ascending: true }),
        supabase
          .from('level_history')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(50),
      ]);

      if (accountRes.error) {
        setError(friendlyDataError(accountRes.error.message));
        setAccount(null);
      } else {
        setAccount(accountRes.data);
      }

      if (tradesRes.error) {
        setError((prev) => prev || friendlyDataError(tradesRes.error.message));
        setTrades([]);
      } else {
        setTrades(tradesRes.data ?? []);
      }

      if (historyRes.error) {
        setError((prev) => prev || friendlyDataError(historyRes.error.message));
        setLevelHistory([]);
      } else {
        setLevelHistory(historyRes.data ?? []);
      }
    } catch {
      setError('Could not load dashboard data. Check your connection and try again.');
      setTrades([]);
      setLevelHistory([]);
    } finally {
      if (showLoader) setLoading(false);
      else setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadDashboardData();
  }, [session?.user?.id, loadDashboardData]);

  const handleTradeLogged = useCallback(
    async (rpcResult) => {
      feedbackForTradeTrigger(rpcResult?.trigger);
      await loadDashboardData({ showLoader: false });
    },
    [loadDashboardData],
  );

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
    <div className="min-h-screen bg-cyber-dark text-slate-100 p-4 md:p-6 overflow-x-hidden min-w-0">
      <header
        className="cyber-card rounded-xl border border-cyan-500/20 p-4 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3 min-w-0 shrink-0">
          <Zap className="w-7 h-7 text-cyan-400 shrink-0" aria-hidden />
          <span className="text-lg font-black tracking-wider text-cyan-400 truncate">
            APEX TRADER
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm w-full sm:w-auto sm:justify-end">
          <span className="font-mono cyber-metric text-slate-100">
            LV <span className="text-cyan-400">{level}</span>/42
          </span>
          <span className="font-mono cyber-metric text-emerald-400">
            {formatINR(capital)}
          </span>
          <span className="text-slate-400 max-w-[12rem] truncate hidden sm:inline" title={email}>
            {email}
          </span>
          {refreshing ? (
            <span className="text-xs text-cyan-400/80 font-mono" role="status">Syncing…</span>
          ) : null}
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

      {!error && trades.length === 0 ? (
        <p
          className="mt-4 text-xs text-slate-400 border border-cyan-500/15 rounded-lg px-4 py-3 bg-slate-900/40"
          role="status"
        >
          No trades yet — log your first trade below. Equity and daily P&amp;L charts will update
          after you commit.
        </p>
      ) : null}

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 md:gap-6 mt-6 min-w-0">
        <div className="xl:col-span-4 flex flex-col gap-4 md:gap-6 min-w-0">
          <RiskMetricsPanel level={level} />
          <MilestonesPanel level={level} />
          <TradeLogger onTradeLogged={handleTradeLogged} />
          <LevelHistory entries={levelHistory} />
        </div>

        <div className="xl:col-span-5 flex flex-col gap-4 md:gap-6 min-w-0">
          <EquityChart trades={trades} initialCapital={chartBase} />
          <DailyPnlChart trades={trades} />
        </div>

        <div className="cyber-dashboard-level-panel xl:col-span-3 min-w-0 min-h-0">
          <LevelGrid activeLevel={level} />
        </div>
      </div>
    </div>
  );
}
