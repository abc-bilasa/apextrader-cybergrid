/** Marketing tiers — checkout not wired yet (F-044). */
export const ANNUAL_DISCOUNT_PCT = 17;

export const SUBSCRIPTION_PLANS = [
  {
    id: 'starter',
    name: 'Grid Starter',
    tagline: 'Learn the 42-level system',
    monthlyInr: 0,
    annualInr: 0,
    cta: 'Start free',
    highlight: false,
    features: [
      'Trade journal & equity charts',
      '42-level Cyber-Grid map',
      'Daily P&L & discipline stats',
      'Up to 30 logged trades / month',
    ],
  },
  {
    id: 'trader',
    name: 'Cyber Trader',
    tagline: 'For serious discretionary traders',
    monthlyInr: 499,
    annualInr: 4990,
    cta: 'Start 7-day trial',
    highlight: true,
    badge: 'Most popular',
    features: [
      'Everything in Starter, plus',
      'Unlimited trade logging',
      'CSV import & export',
      'Loss-streak cool-down guard',
      'Session reflection journal',
      'P&L calendar drill-down',
    ],
  },
  {
    id: 'pro',
    name: 'Apex Pro',
    tagline: 'Prop rules & full replay control',
    monthlyInr: 999,
    annualInr: 9990,
    cta: 'Start 7-day trial',
    highlight: false,
    features: [
      'Everything in Cyber Trader, plus',
      'Rule profiles (prop vs grid)',
      'Simulate before you commit',
      'Journal edit & delete (replay)',
      'Migration health dashboard',
      'Priority support (email)',
    ],
  },
];

export function formatPlanPrice(inr) {
  if (inr === 0) return '₹0';
  return `₹${inr.toLocaleString('en-IN')}`;
}

export function planPrice(plan, billingCycle) {
  return billingCycle === 'annual' ? plan.annualInr : plan.monthlyInr;
}

export function findPlan(planId) {
  return SUBSCRIPTION_PLANS.find((p) => p.id === planId) ?? SUBSCRIPTION_PLANS[0];
}
