import {
  Zap,
  Grid3x3,
  Shield,
  LineChart,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import PricingSection from './PricingSection';

const FEATURES = [
  {
    icon: Grid3x3,
    title: '42-level Cyber-Grid',
    body: 'See promotion and drawdown paths before you size the next trade.',
  },
  {
    icon: LineChart,
    title: 'Equity & daily P&L',
    body: 'Charts and calendar views that stay in sync with every logged trade.',
  },
  {
    icon: Shield,
    title: 'Discipline guardrails',
    body: 'Cool-down after loss streaks, headroom meters, and prop-style rule profiles.',
  },
  {
    icon: BookOpen,
    title: 'Journal that scales',
    body: 'Quick log, CSV import/export, and replay-safe edits when you need to fix history.',
  },
  {
    icon: Sparkles,
    title: 'Session reflection',
    body: 'Two-minute end-of-day review — process over P&L.',
  },
  {
    icon: Zap,
    title: 'Simulate first',
    body: 'Preview level and capital impact before you commit via log_trade.',
  },
];

const FAQ = [
  {
    q: 'Is ApexTrader a broker?',
    a: 'No. It is a discipline journal and progression system. You log P&L manually or via CSV — no live order routing.',
  },
  {
    q: 'Can I stay on free Starter?',
    a: 'Yes. Starter stays free with a monthly trade cap. Upgrade only when you outgrow it.',
  },
  {
    q: 'When does billing go live?',
    a: 'Trials and plan selection are available at signup today. Payment collection will connect in a future release.',
  },
  {
    q: 'Is my data secure?',
    a: 'Accounts use Supabase Auth with row-level security on your trades. We never put service keys in the browser.',
  },
];

export default function LandingPage({ onSignIn, onChoosePlan }) {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-cyber-dark text-slate-100">
      <div className="landing-grid-bg pointer-events-none fixed inset-0 opacity-40" aria-hidden />

      <header className="relative z-10 border-b border-cyan-500/10 bg-cyber-dark/80 backdrop-blur-md sticky top-0">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-cyan-400" aria-hidden />
            <span className="font-black tracking-wider text-cyan-400">APEX TRADER</span>
          </div>
          <nav className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-widest text-slate-400">
            <button type="button" className="hover:text-cyan-300" onClick={() => scrollTo('features')}>
              Features
            </button>
            <button type="button" className="hover:text-cyan-300" onClick={() => scrollTo('pricing')}>
              Pricing
            </button>
            <button type="button" className="hover:text-cyan-300" onClick={() => scrollTo('faq')}>
              FAQ
            </button>
            <button type="button" className="cyber-btn-ghost text-xs py-2" onClick={onSignIn}>
              Sign in
            </button>
          </nav>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 pb-16">
        <section className="pt-16 md:pt-24 pb-20 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-500/80 mb-4">
            Trading journal SaaS
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-50 max-w-3xl mx-auto leading-tight">
            Climb the grid.
            <span className="block text-cyan-400 mt-2">Trade with discipline.</span>
          </h1>
          <p className="mt-6 text-slate-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            ApexTrader Cyber-Grid turns your journal into a progression game — levels, drawdown
            rules, and reflection tools in one neon-dark cockpit.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              className="cyber-btn-primary cyber-glow px-8"
              onClick={() => onChoosePlan('trader')}
            >
              Start free trial
            </button>
            <button
              type="button"
              className="cyber-btn-ghost px-8 border border-cyan-500/30"
              onClick={() => scrollTo('pricing')}
            >
              Compare plans
            </button>
          </div>
        </section>

        <section id="features" className="scroll-mt-24 py-16 border-t border-cyan-500/10">
          <h2 className="cyber-section-title text-center mb-10">Built for process, not hype</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="cyber-card rounded-xl border border-cyan-500/10 p-5 hover:border-cyan-500/25 transition-colors"
              >
                <Icon className="w-8 h-8 text-cyan-400 mb-3" aria-hidden />
                <h3 className="font-semibold text-slate-100">{title}</h3>
                <p className="text-sm text-slate-400 mt-2">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 border-t border-cyan-500/10">
          <PricingSection onChoosePlan={onChoosePlan} />
        </section>

        <section id="faq" className="scroll-mt-24 py-16 border-t border-cyan-500/10 max-w-2xl mx-auto">
          <h2 className="cyber-section-title text-center mb-8">FAQ</h2>
          <dl className="space-y-6">
            {FAQ.map(({ q, a }) => (
              <div key={q} className="cyber-card rounded-xl border border-cyan-500/10 p-5">
                <dt className="font-semibold text-slate-100">{q}</dt>
                <dd className="text-sm text-slate-400 mt-2">{a}</dd>
              </div>
            ))}
          </dl>
        </section>
      </main>

      <footer className="relative z-10 border-t border-cyan-500/10 py-8 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} ApexTrader Cyber-Grid · Journal software, not investment advice.
      </footer>
    </div>
  );
}
