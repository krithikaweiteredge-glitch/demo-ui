const SEGMENTS = [
  { color: '#a78bfa', label: 'Organic',  pct: '42%', dashArray: '90 212',  dashOffset: '-53'  },
  { color: '#34d399', label: 'Social',   pct: '28%', dashArray: '60 212',  dashOffset: '-143' },
  { color: '#f472b6', label: 'Referral', pct: '20%', dashArray: '42 212',  dashOffset: '-203' },
  { color: '#38bdf8', label: 'Direct',   pct: '10%', dashArray: '20 212',  dashOffset: '-245' },
];

export default function DonutChart() {
  return (
    <div className="glass-card donut-card reveal">
      <div className="card-header">
        <div className="card-title">Traffic Sources</div>
      </div>
      <div className="donut-wrapper">
        <svg className="donut-svg" viewBox="0 0 120 120">
          <circle className="donut-bg" cx="60" cy="60" r="48" />
          {SEGMENTS.map((seg) => (
            <circle
              key={seg.label}
              className="donut-seg"
              cx="60" cy="60" r="48"
              stroke={seg.color}
              strokeDasharray={seg.dashArray}
              strokeDashoffset={seg.dashOffset}
            />
          ))}
          <text x="60" y="55" textAnchor="middle" className="donut-center-label">Sources</text>
          <text x="60" y="70" textAnchor="middle" className="donut-center-value">100%</text>
        </svg>
        <div className="donut-legend">
          {SEGMENTS.map((seg) => (
            <div className="legend-item" key={seg.label}>
              <span className="legend-dot" style={{ background: seg.color }} />
              {seg.label}
              <strong>{seg.pct}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
