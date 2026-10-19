import { useState } from 'react';
import { Check } from 'lucide-react';
import {
  ANNUAL_DISCOUNT_PCT,
  SUBSCRIPTION_PLANS,
  formatPlanPrice,
  planPrice,
} from '../lib/subscriptionPlans';

export default function PricingSection({ onChoosePlan }) {
  const [billing, setBilling] = useState('monthly');

  return (
    <section id="pricing" className="scroll-mt-24">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-2xl md:text-3xl font-black tracking-wide text-slate-100">
          Simple, transparent pricing
        </h2>
        <p className="text-slate-400 mt-3 text-sm md:text-base">
          Start on Starter at ₹0. Upgrade when you need imports, cool-down, and prop-style
          profiles. No hidden fees — inspired by leading trading journals, built for Indian
          capital in rupees.
        </p>

        <div
          className="inline-flex items-center gap-2 mt-6 p-1 rounded-lg border border-cyan-500/20 bg-slate-900/60"
          role="group"
          aria-label="Billing period"
        >
          <button
            type="button"
            className={`px-4 py-2 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors ${
              billing === 'monthly'
                ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-cyan-300'
            }`}
            onClick={() => setBilling('monthly')}
          >
            Monthly
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors ${
              billing === 'annual'
                ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-cyan-300'
            }`}
            onClick={() => setBilling('annual')}
          >
            Annual
            <span className="ml-1 text-emerald-400 font-mono">−{ANNUAL_DISCOUNT_PCT}%</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-stretch">
        {SUBSCRIPTION_PLANS.map((plan) => {
          const price = planPrice(plan, billing);
          const period =
            plan.monthlyInr === 0
              ? 'forever'
              : billing === 'annual'
                ? '/ year'
                : '/ month';

          return (
            <article
              key={plan.id}
              className={`relative flex flex-col rounded-xl border p-6 ${
                plan.highlight
                  ? 'border-cyan-400/50 bg-cyan-950/20 shadow-[0_0_40px_-12px_rgba(6,182,212,0.45)]'
                  : 'border-cyan-500/15 cyber-card'
              }`}
            >
              {plan.badge ? (
                <span
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-cyan-500 text-slate-950"
                >
                  {plan.badge}
                </span>
              ) : null}

              <h3 className="cyber-section-title text-base">{plan.name}</h3>
              <p className="text-xs text-slate-500 mt-1">{plan.tagline}</p>

              <p className="mt-5 font-mono cyber-metric text-3xl text-cyan-300">
                {formatPlanPrice(price)}
                <span className="text-sm text-slate-500 font-sans font-normal">{period}</span>
              </p>

              {billing === 'annual' && plan.monthlyInr > 0 ? (
                <p className="text-[10px] text-emerald-400/90 mt-1">
                  vs {formatPlanPrice(plan.monthlyInr * 12)}/yr monthly
                </p>
              ) : null}

              <ul className="mt-6 space-y-2.5 flex-1 text-sm text-slate-300">
                {plan.features.map((line) => (
                  <li key={line} className="flex gap-2 items-start">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className={`mt-6 w-full ${
                  plan.highlight ? 'cyber-btn-primary cyber-glow' : 'cyber-btn-ghost border border-cyan-500/30'
                }`}
                onClick={() => onChoosePlan(plan.id)}
              >
                {plan.cta}
              </button>
            </article>
          );
        })}
      </div>

      <p className="text-center text-[11px] text-slate-500 mt-8 max-w-xl mx-auto">
        Paid plans: 7-day trial, no card required at signup. Billing integration (Razorpay /
        Stripe) ships in a later release — your account starts on the selected tier at launch.
      </p>
    </section>
  );
}
