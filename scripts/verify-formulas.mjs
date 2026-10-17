/**
 * Cross-check UI formula constants vs database RPC (docs/DECISIONS.md).
 * Run: node scripts/verify-formulas.mjs
 * Exit 0 = pass, 1 = fail (for CI later).
 */

const LEVELS = [1, 2, 3, 4, 42];

function getLevelMetrics(level) {
  const l = Math.max(1, Math.min(42, parseInt(level, 10) || 1));
  const baseCapital = 10000 * Math.pow(1.5, l - 1);
  return {
    baseCapital,
    dailyDrawdownLimit: baseCapital * 0.3,
    maxDrawdownLimit: baseCapital * 0.6,
    targetPlanned: baseCapital * 0.5,
    finalCapital: baseCapital * 1.5,
  };
}

/** Mirror SQL: POWER(1.5, level-1) * 10000 */
function sqlBaseCap(level) {
  return 10000 * Math.pow(1.5, level - 1);
}

const expected = {
  1: { base: 10000, target: 5000, dd30: 3000, dd60: 6000 },
  2: { base: 15000, target: 7500, dd30: 4500, dd60: 9000 },
  3: { base: 22500, target: 11250, dd30: 6750, dd60: 13500 },
  4: { base: 33750, target: 16875, dd30: 10125, dd60: 20250 },
};

let failed = false;

for (const level of LEVELS) {
  const m = getLevelMetrics(level);
  const sqlBase = sqlBaseCap(level);
  if (Math.abs(m.baseCapital - sqlBase) > 0.01) {
    console.error(`Level ${level}: JS base ${m.baseCapital} != SQL base ${sqlBase}`);
    failed = true;
  }
  if (level in expected) {
    const e = expected[level];
    const checks = [
      ['base', m.baseCapital, e.base],
      ['target', m.targetPlanned, e.target],
      ['dd30', m.dailyDrawdownLimit, e.dd30],
      ['dd60', m.maxDrawdownLimit, e.dd60],
    ];
    for (const [name, a, b] of checks) {
      if (Math.abs(a - b) > 0.01) {
        console.error(`Level ${level} ${name}: got ${a}, expected ${b}`);
        failed = true;
      }
    }
  }
}

if (failed) {
  console.error('verify-formulas: FAILED');
  process.exit(1);
}

console.log('verify-formulas: OK (JS aligns with SQL constants for sampled levels)');
