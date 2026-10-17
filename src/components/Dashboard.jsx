import { LogOut, Zap } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { formatINR } from '../lib/formulas';
import TradeLogger from './TradeLogger';
import EquityChart from './EquityChart';
import LevelGrid from './LevelGrid';

/** Placeholders until F-014 loads `trading_accounts`. */
const PLACEHOLDER_LEVEL = 1;
const PLACEHOLDER_CAPITAL = 10000;

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

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

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
            LV <span className="text-cyan-400">{PLACEHOLDER_LEVEL}</span>/42
          </span>
          <span className="font-mono cyber-metric text-emerald-400">
            {formatINR(PLACEHOLDER_CAPITAL)}
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        <div className="lg:col-span-4 flex flex-col gap-6">
          <PanelPlaceholder title="Risk & milestones" />
          <TradeLogger />
        </div>

        <div className="lg:col-span-5 flex flex-col gap-6">
          <EquityChart trades={[]} initialCapital={PLACEHOLDER_CAPITAL} />
          <PanelPlaceholder title="Daily P&L" />
        </div>

        <div className="lg:col-span-3">
          <LevelGrid activeLevel={PLACEHOLDER_LEVEL} />
        </div>
      </div>
    </div>
  );
}
