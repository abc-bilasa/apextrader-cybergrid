import { useEffect, useRef } from 'react';
import { formatINR, getLevelMetrics } from '../lib/formulas';

const LEVELS = Array.from({ length: 42 }, (_, i) => i + 1);

export default function LevelGrid({ activeLevel = 1 }) {
  const activeRef = useRef(null);

  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [activeLevel]);

  return (
    <section className="cyber-card p-5 rounded-xl border border-cyan-500/10 h-full flex flex-col">
      <h2 className="cyber-section-title mb-3">42-level matrix</h2>
      <div className="flex-1 overflow-y-auto space-y-2 pr-1 max-h-[600px]">
        {LEVELS.map((lvl) => {
          const metrics = getLevelMetrics(lvl);
          const isActive = lvl === activeLevel;

          return (
            <div
              key={lvl}
              ref={isActive ? activeRef : undefined}
              className={isActive ? 'cyber-level-active' : 'cyber-level-row'}
            >
              <div>
                <span className="block font-mono cyber-metric">LEVEL {lvl}</span>
                <span className="text-[10px] text-slate-400">
                  Target {formatINR(metrics.targetPlanned)}
                </span>
              </div>
              <div className="text-right">
                <span className="block font-mono cyber-metric text-cyan-300 tabular-nums">
                  {formatINR(metrics.baseCapital)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
