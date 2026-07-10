import { useEffect, useRef, useState } from 'react';

const WEEK_DATA = [
  { day: 'Mon', val: 6200 },
  { day: 'Tue', val: 9800 },
  { day: 'Wed', val: 7400 },
  { day: 'Thu', val: 11200 },
  { day: 'Fri', val: 15600 },
  { day: 'Sat', val: 8900 },
  { day: 'Sun', val: 5100 },
];

export default function BarChart() {
  const [mounted, setMounted] = useState(false);
  const max = Math.max(...WEEK_DATA.map(d => d.val));

  useEffect(() => {
    // Small delay so CSS transition fires after mount
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="glass-card chart-card reveal">
      <div className="card-header">
        <div className="card-title">Weekly Revenue</div>
        <div className="card-subtitle">Jul 2026</div>
      </div>
      <div className="bar-chart">
        {WEEK_DATA.map(({ day, val }) => {
          const heightPct = (val / max) * 100;
          return (
            <div className="bar-wrap" key={day}>
              <div className="bar-val">${(val / 1000).toFixed(1)}k</div>
              <div
                className={`bar${day === 'Fri' ? ' highlight' : ''}`}
                style={{ height: mounted ? `${heightPct}%` : '0%' }}
                title={`${day}: $${val.toLocaleString()}`}
              />
            </div>
          );
        })}
      </div>
      <div className="bar-labels">
        {WEEK_DATA.map(({ day }) => (
          <div className="bar-label" key={day}>{day}</div>
        ))}
      </div>
    </div>
  );
}
