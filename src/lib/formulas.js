/** @param {number} level Level 1–42 */
export function getLevelMetrics(level) {
  const l = Math.max(1, Math.min(42, parseInt(level, 10) || 1));
  const baseCapital = 10000 * Math.pow(1.5, l - 1);
  const dailyDrawdownLimit = baseCapital * 0.3;
  const maxDrawdownLimit = baseCapital * 0.6;
  const targetPlanned = baseCapital * 0.5;

  return {
    level: l,
    baseCapital,
    dailyDrawdownLimit,
    maxDrawdownLimit,
    targetPlanned,
    d1: baseCapital * 0.1,
    d2: baseCapital * 0.1,
    d3: baseCapital * 0.1,
    d4: baseCapital * 0.2,
    finalCapital: baseCapital * 1.5,
  };
}

/**
 * Headroom vs `log_trade` promotion/demotion (30% baseline DD, 50% promotion target).
 * Max DD (60%) is advisory only (DECISIONS — not enforced in RPC).
 * @param {number} level
 * @param {number} currentCapital
 */
export function getHeadroomMetrics(level, currentCapital) {
  const { level: l, baseCapital, dailyDrawdownLimit, maxDrawdownLimit, targetPlanned, finalCapital } =
    getLevelMetrics(level);
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

export function formatINR(val) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val || 0);
}
