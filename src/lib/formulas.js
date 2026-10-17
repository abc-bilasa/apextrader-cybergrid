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

export function formatINR(val) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val || 0);
}
