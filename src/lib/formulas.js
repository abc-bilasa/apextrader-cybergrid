import { resolveRuleProfile } from './ruleProfiles.js';

/** @param {number} level Level 1–42 */
/** @param {string} [ruleProfileId] D15 profile key */
export function getLevelMetrics(level, ruleProfileId) {
  const l = Math.max(1, Math.min(42, parseInt(level, 10) || 1));
  const profile = resolveRuleProfile(ruleProfileId);
  const baseCapital = 10000 * Math.pow(1.5, l - 1);
  const dailyDrawdownLimit = baseCapital * profile.dailyDrawdownPct;
  const maxDrawdownLimit = baseCapital * profile.maxDrawdownPct;
  const targetPlanned = baseCapital * profile.promotionTargetPct;
  const targetFrac = profile.promotionTargetPct;

  return {
    level: l,
    ruleProfileId: profile.id,
    baseCapital,
    dailyDrawdownLimit,
    maxDrawdownLimit,
    targetPlanned,
    d1: baseCapital * targetFrac * 0.2,
    d2: baseCapital * targetFrac * 0.2,
    d3: baseCapital * targetFrac * 0.2,
    d4: baseCapital * targetFrac * 0.4,
    finalCapital: baseCapital + targetPlanned,
  };
}

/**
 * Headroom vs `log_trade` promotion/demotion (30% baseline DD, 50% promotion target).
 * Max DD (60%) is advisory only (DECISIONS — not enforced in RPC).
 * @param {number} level
 * @param {number} currentCapital
 */
/**
 * Intraday pacing vs D1–D4 cumulative targets (sum = 50% level target).
 * @param {number} level
 * @param {number} todayPnl Sum of today's trade P&L (local calendar day, D11)
 */
export function getIntradayPacingMetrics(level, todayPnl, ruleProfileId) {
  const { d1, d2, d3, d4, targetPlanned } = getLevelMetrics(level, ruleProfileId);
  const pnl = Number(todayPnl);
  const safePnl = Number.isFinite(pnl) ? pnl : 0;

  const milestones = [
    { id: 'D1', label: 'D1 · 10%', cumulative: d1, slice: d1 },
    { id: 'D2', label: 'D2 · 10%', cumulative: d1 + d2, slice: d2 },
    { id: 'D3', label: 'D3 · 10%', cumulative: d1 + d2 + d3, slice: d3 },
    { id: 'D4', label: 'D4 · 20%', cumulative: d1 + d2 + d3 + d4, slice: d4 },
  ];

  let completedCount = 0;
  for (const m of milestones) {
    if (safePnl >= m.cumulative) completedCount += 1;
  }

  const allComplete = completedCount >= 4;
  const nextMilestone = allComplete ? null : milestones[completedCount];
  const gapToNext = nextMilestone ? Math.max(0, nextMilestone.cumulative - safePnl) : 0;
  const progressInSegment =
    nextMilestone && nextMilestone.slice > 0
      ? Math.min(
          1,
          Math.max(
            0,
            (safePnl - (nextMilestone.cumulative - nextMilestone.slice)) / nextMilestone.slice,
          ),
        )
      : allComplete
        ? 1
        : 0;

  return {
    todayPnl: safePnl,
    milestones,
    completedCount,
    allComplete,
    nextMilestone,
    gapToNext,
    progressInSegment,
    targetPlanned,
  };
}

export function getHeadroomMetrics(level, currentCapital, ruleProfileId) {
  const { level: l, baseCapital, dailyDrawdownLimit, maxDrawdownLimit, targetPlanned, finalCapital } =
    getLevelMetrics(level, ruleProfileId);
  const capital = Number(currentCapital);
  const safeCapital = Number.isFinite(capital) ? capital : baseCapital;

  const drawdownFromBase = Math.max(0, baseCapital - safeCapital);
  const profitAboveBase = safeCapital - baseCapital;

  const dailyDrawdownRemaining = Math.max(0, dailyDrawdownLimit - drawdownFromBase);
  const demotionFloorCapital = baseCapital - dailyDrawdownLimit;
  const maxLossBeforeDemotion = Math.max(0, safeCapital - demotionFloorCapital);

  const dailyDrawdownUsedPct =
    dailyDrawdownLimit > 0 ? Math.min(1.5, drawdownFromBase / dailyDrawdownLimit) : 0;

  let dailyDrawdownTier = 'safe';
  if (drawdownFromBase >= dailyDrawdownLimit) dailyDrawdownTier = 'breached';
  else if (dailyDrawdownUsedPct >= 0.9) dailyDrawdownTier = 'critical';
  else if (dailyDrawdownUsedPct >= 0.75) dailyDrawdownTier = 'warning';
  else if (dailyDrawdownUsedPct >= 0.5) dailyDrawdownTier = 'caution';

  const maxDrawdownRemaining = Math.max(0, maxDrawdownLimit - drawdownFromBase);

  const canPromote = l < 42 && profitAboveBase >= targetPlanned;
  const promotionGapCapital = l < 42 ? Math.max(0, targetPlanned - profitAboveBase) : 0;
  const promotionProgressPct =
    l < 42 && targetPlanned > 0
      ? Math.min(1, Math.max(0, profitAboveBase / targetPlanned))
      : l >= 42
        ? 1
        : 0;

  return {
    level: l,
    baseCapital,
    dailyDrawdownLimit,
    maxDrawdownLimit,
    targetPlanned,
    demotionFloorCapital,
    drawdownFromBase,
    dailyDrawdownRemaining,
    dailyDrawdownUsedPct,
    dailyDrawdownTier,
    maxDrawdownRemaining,
    maxLossBeforeDemotion,
    canPromote,
    promotionGapCapital,
    promotionProgressPct,
    finalCapital,
  };
}

/** Prop-style default: one day ≤ 40% of total profit (F-033). */
export const DEFAULT_CONSISTENCY_RATIO = 0.4;

/**
 * How much more P&L today can add before breaking single-day consistency vs total profit.
 * @param {number} totalProfit Sum of all trade P&L
 * @param {number} todayProfit Today's P&L (local day)
 * @param {number} maxDayShare e.g. 0.4 for 40%
 */
export function getConsistencyMetrics(totalProfit, todayProfit, maxDayShare = DEFAULT_CONSISTENCY_RATIO) {
  const total = Number(totalProfit);
  const today = Number(todayProfit);
  const r = Math.min(0.99, Math.max(0.01, Number(maxDayShare) || DEFAULT_CONSISTENCY_RATIO));
  const prior = total - today;

  if (!Number.isFinite(total) || !Number.isFinite(today)) {
    return { applicable: false, reason: 'invalid' };
  }

  if (total <= 0) {
    return {
      applicable: false,
      reason: 'no_positive_total',
      totalProfit: total,
      todayProfit: today,
      maxDayShare: r,
      maxDaySharePct: Math.round(r * 100),
    };
  }

  const maxTodayAllowed = prior > 0 ? (r * prior) / (1 - r) : r * total;
  const sharePct = (today / total) * 100;
  const capPct = r * 100;
  const headroomToday = Math.max(0, maxTodayAllowed - today);
  const breached = today > maxTodayAllowed + 0.005;

  let tier = 'safe';
  if (breached) tier = 'breached';
  else if (sharePct >= capPct * 0.9) tier = 'critical';
  else if (sharePct >= capPct * 0.75) tier = 'warning';

  return {
    applicable: true,
    totalProfit: total,
    todayProfit: today,
    priorProfit: prior,
    maxDayShare: r,
    maxDaySharePct: Math.round(r * 100),
    todaySharePct: sharePct,
    maxTodayAllowed,
    headroomToday,
    breached,
    tier,
  };
}

export function formatINR(val) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val || 0);
}
