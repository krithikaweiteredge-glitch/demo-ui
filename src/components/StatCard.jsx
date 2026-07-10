import { useEffect, useRef } from 'react';

export default function StatCard({ icon, label, target, prefix = '', suffix = '', change, positive, accent, sparkPoints }) {
  const valueRef = useRef(null);

  useEffect(() => {
    const el = valueRef.current;
    if (!el) return;
    const duration = 1600;
    const start = performance.now();

    const update = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(target * eased);
      el.textContent = prefix + current.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = prefix + target.toLocaleString() + suffix;
    };
    requestAnimationFrame(update);
  }, [target, prefix, suffix]);

  return (
    <div className="stat-card reveal" style={{ '--accent': accent }}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-body">
        <div className="stat-label">{label}</div>
        <div className="stat-value" ref={valueRef}>{prefix}0{suffix}</div>
        <div className={`stat-change ${positive ? 'positive' : 'negative'}`}>{change}</div>
      </div>
      <div className="stat-sparkline">
        <svg viewBox="0 0 80 30" preserveAspectRatio="none">
          <polyline
            points={sparkPoints}
            fill="none"
            stroke={accent}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
