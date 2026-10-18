/** Must match `rule_profile_pcts` in `004_rule_profiles.sql` (D15). */

export const DEFAULT_RULE_PROFILE = 'cyber_grid';

export const RULE_PROFILES = [
  {
    id: 'cyber_grid',
    label: 'Cyber-Grid',
    description: 'Default 30% daily DD, 50% level target (PRD).',
    dailyDrawdownPct: 0.3,
    promotionTargetPct: 0.5,
    maxDrawdownPct: 0.6,
  },
  {
    id: 'prop_challenge_10',
    label: 'Prop eval 10/10',
    description: '10% daily DD demotion, 10% profit to advance level.',
    dailyDrawdownPct: 0.1,
    promotionTargetPct: 0.1,
    maxDrawdownPct: 0.1,
  },
  {
    id: 'prop_scalping_5',
    label: 'Prop sim 5/5',
    description: 'Tight 5% daily DD and 5% promotion target.',
    dailyDrawdownPct: 0.05,
    promotionTargetPct: 0.05,
    maxDrawdownPct: 0.05,
  },
];

const byId = Object.fromEntries(RULE_PROFILES.map((p) => [p.id, p]));

export function resolveRuleProfile(profileId) {
  if (profileId && byId[profileId]) return byId[profileId];
  return byId[DEFAULT_RULE_PROFILE];
}

export function isKnownRuleProfile(profileId) {
  return Boolean(profileId && byId[profileId]);
}
