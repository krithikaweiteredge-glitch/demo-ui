import { useEffect, useRef, useState } from 'react';

/* ── Data ─────────────────────────────────────────────────────────────────── */
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

const VISITORS = [12400, 18700, 15200, 22800, 19600, 27300, 31500];
const REVENUE  = [8200,  13400, 11800, 17600, 15200, 21400, 24800];

const TOP_PAGES = [
  { page: '/home',        views: 18420, bounce: '32%', time: '3m 12s' },
  { page: '/pricing',     views: 12380, bounce: '41%', time: '2m 48s' },
  { page: '/features',    views: 9840,  bounce: '38%', time: '2m 05s' },
  { page: '/blog',        views: 7210,  bounce: '55%', time: '4m 30s' },
  { page: '/contact',     views: 4920,  bounce: '29%', time: '1m 52s' },
];

const DEVICES = [
  { label: 'Mobile',  pct: 54, color: '#a78bfa' },
  { label: 'Desktop', pct: 36, color: '#34d399' },
  { label: 'Tablet',  pct: 10, color: '#38bdf8' },
];

const GEO = [
  { country: '🇮🇳 India',          sessions: 12400, pct: 39 },
  { country: '🇺🇸 United States',  sessions: 8200,  pct: 26 },
  { country: '🇬🇧 United Kingdom', sessions: 4100,  pct: 13 },
  { country: '🇩🇪 Germany',        sessions: 2800,  pct: 9  },
  { country: '🇨🇦 Canada',         sessions: 2100,  pct: 7  },
  { country: '🇦🇺 Australia',      sessions: 1900,  pct: 6  },
];

const STAT_CARDS = [
  { label: 'Total Visitors',    value: 31500,  prefix: '',  suffix: '',  change: '+15.4%', positive: true,  accent: '#a78bfa', icon: '👁' },
  { label: 'Page Views',        value: 94200,  prefix: '',  suffix: '',  change: '+22.1%', positive: true,  accent: '#34d399', icon: '📄' },
  { label: 'Avg. Session',      value: '3:24', prefix: '',  suffix: '',  change: '+4.2%',  positive: true,  accent: '#38bdf8', icon: '⏱',  noAnim: true },
  { label: 'Bounce Rate',       value: 38,     prefix: '',  suffix: '%', change: '-3.1%',  positive: true,  accent: '#f472b6', icon: '↩' },
];

/* ── Animated counter ─────────────────────────────────────────────────────── */
function Counter({ target, prefix = '', suffix = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const duration = 1400;
    const start = performance.now();
    const update = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const cur = Math.floor(target * eased);
      el.textContent = prefix + cur.toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(update);
      else el.textContent = prefix + target.toLocaleString() + suffix;
    };
    requestAnimationFrame(update);
  }, [target, prefix, suffix]);
  return <span ref={ref}>{prefix}0{suffix}</span>;
}

/* ── SVG Line Chart ───────────────────────────────────────────────────────── */
function LineChart({ data1, data2, labels }) {
  const W = 560, H = 180, PAD = 20;
  const max = Math.max(...data1, ...data2) * 1.1;

  const pts = (data) =>
    data.map((v, i) => {
      const x = PAD + (i / (data.length - 1)) * (W - PAD * 2);
      const y = H - PAD - ((v / max) * (H - PAD * 2));
      return `${x},${y}`;
    }).join(' ');

  const area = (data) => {
    const p = data.map((v, i) => {
      const x = PAD + (i / (data.length - 1)) * (W - PAD * 2);
      const y = H - PAD - ((v / max) * (H - PAD * 2));
      return `${x},${y}`;
    });
    return `${PAD},${H - PAD} ${p.join(' ')} ${W - PAD},${H - PAD}`;
  };

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ width: '100%', height: '180px' }}>
      <defs>
        <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="grad2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Grid lines */}
      {[0.25, 0.5, 0.75, 1].map(t => (
        <line key={t} x1={PAD} x2={W - PAD}
          y1={H - PAD - t * (H - PAD * 2)}
          y2={H - PAD - t * (H - PAD * 2)}
          stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      ))}
      {/* Area fills */}
      <polygon points={area(data1)} fill="url(#grad1)" />
      <polygon points={area(data2)} fill="url(#grad2)" />
      {/* Lines */}
      <polyline points={pts(data1)} fill="none" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points={pts(data2)} fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Dots on latest */}
      {[data1, data2].map((d, di) =>
        d.map((v, i) => {
          const x = PAD + (i / (d.length - 1)) * (W - PAD * 2);
          const y = H - PAD - ((v / max) * (H - PAD * 2));
          return (
            <circle key={`${di}-${i}`} cx={x} cy={y} r="3.5"
              fill={di === 0 ? '#a78bfa' : '#34d399'}
              stroke={di === 0 ? 'rgba(167,139,250,0.3)' : 'rgba(52,211,153,0.3)'}
              strokeWidth="5" />
          );
        })
      )}
      {/* X-axis labels */}
      {labels.map((l, i) => {
        const x = PAD + (i / (labels.length - 1)) * (W - PAD * 2);
        return <text key={l} x={x} y={H - 2} textAnchor="middle" fill="#475569" fontSize="10" fontFamily="Outfit">{l}</text>;
      })}
    </svg>
  );
}

/* ── Device donut ─────────────────────────────────────────────────────────── */
function DeviceDonut() {
  let offset = -90;
  const R = 46, CX = 60, CY = 60;
  const circ = 2 * Math.PI * R;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      <svg viewBox="0 0 120 120" style={{ width: 120, height: 120, flexShrink: 0 }}>
        <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="18" />
        {DEVICES.map((d) => {
          const dash = (d.pct / 100) * circ;
          const gap  = circ - dash;
          const seg  = (
            <circle key={d.label} cx={CX} cy={CY} r={R}
              fill="none" stroke={d.color} strokeWidth="18"
              strokeDasharray={`${dash} ${gap}`}
              strokeDashoffset={-((offset / 360) * circ)}
              strokeLinecap="round"
            />
          );
          offset += (d.pct / 100) * 360;
          return seg;
        })}
        <text x={CX} y={CY - 5} textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="Outfit">Devices</text>
        <text x={CX} y={CY + 8} textAnchor="middle" fill="#f1f5f9" fontSize="13" fontWeight="700" fontFamily="Outfit">3 types</text>
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {DEVICES.map(d => (
          <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.82rem', color: '#94a3b8' }}>
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: d.color, flexShrink: 0, display: 'inline-block' }} />
            {d.label}
            <strong style={{ marginLeft: 'auto', color: '#f1f5f9' }}>{d.pct}%</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main Analytics Page ──────────────────────────────────────────────────── */
export default function AnalyticsPage() {
  const [range, setRange] = useState('7d');
  const containerRef = useRef(null);

  /* Scroll-reveal */
  useEffect(() => {
    const els = containerRef.current?.querySelectorAll('.reveal') ?? [];
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 60);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.05 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="page-content" ref={containerRef}>

      {/* ── Header row ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.02em' }}>Analytics</h1>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 4 }}>Track your app's performance and user behaviour</p>
        </div>
        {/* Date range pills */}
        <div style={{ display: 'flex', gap: 6, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 40, padding: '4px 6px' }}>
          {['24h', '7d', '30d', '90d'].map(r => (
            <button key={r} onClick={() => setRange(r)}
              style={{
                padding: '5px 14px', borderRadius: 30, border: 'none', fontFamily: 'inherit',
                fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer',
                background: range === r ? 'linear-gradient(135deg,#7c3aed,#a78bfa)' : 'transparent',
                color: range === r ? '#fff' : 'var(--text-muted)',
                transition: '0.2s ease',
              }}>{r}</button>
          ))}
        </div>
      </div>

      {/* ── Stat cards ── */}
      <div className="stats-grid">
        {STAT_CARDS.map(s => (
          <div key={s.label} className="stat-card reveal" style={{ '--accent': s.accent }}>
            <div className="stat-icon">{s.icon}</div>
            <div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-value" style={{ color: 'var(--text-primary)' }}>
                {s.noAnim ? s.value : <Counter target={s.value} prefix={s.prefix} suffix={s.suffix} />}
              </div>
              <div className={`stat-change ${s.positive ? 'positive' : 'negative'}`}>{s.change} vs last period</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Line chart ── */}
      <div className="glass-card reveal">
        <div className="card-header">
          <div>
            <div className="card-title">Visitors &amp; Revenue</div>
            <div className="card-subtitle">Jan – Jul 2026</div>
          </div>
          <div style={{ display: 'flex', gap: 16, fontSize: '0.78rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)' }}>
              <span style={{ width: 28, height: 3, background: '#a78bfa', borderRadius: 2, display: 'inline-block' }} />
              Visitors
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)' }}>
              <span style={{ width: 28, height: 3, background: '#34d399', borderRadius: 2, display: 'inline-block' }} />
              Revenue ($)
            </span>
          </div>
        </div>
        <LineChart data1={VISITORS} data2={REVENUE} labels={MONTHS} />
      </div>

      {/* ── Middle row: Top Pages + Geo ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }} className="analytics-mid">

        {/* Top pages table */}
        <div className="glass-card reveal">
          <div className="card-header">
            <div className="card-title">Top Pages</div>
            <button className="view-all-btn">Export CSV</button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ color: 'var(--text-muted)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ textAlign: 'left',  paddingBottom: 10, fontWeight: 600 }}>Page</th>
                <th style={{ textAlign: 'right', paddingBottom: 10, fontWeight: 600 }}>Views</th>
                <th style={{ textAlign: 'right', paddingBottom: 10, fontWeight: 600 }}>Bounce</th>
                <th style={{ textAlign: 'right', paddingBottom: 10, fontWeight: 600 }}>Avg. Time</th>
              </tr>
            </thead>
            <tbody>
              {TOP_PAGES.map((row, i) => (
                <tr key={row.page}
                  style={{
                    borderTop: '1px solid var(--border)',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-hover)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '10px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{
                      width: 20, height: 20, borderRadius: 6,
                      background: `rgba(167,139,250,${0.15 + (5 - i) * 0.06})`,
                      color: 'var(--purple)', fontSize: '0.65rem', fontWeight: 700,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                    }}>{i + 1}</span>
                    <code style={{ color: 'var(--text-secondary)', fontFamily: 'monospace', fontSize: '0.8rem' }}>{row.page}</code>
                  </td>
                  <td style={{ textAlign: 'right', color: 'var(--text-primary)', fontWeight: 600, padding: '10px 0' }}>
                    {row.views.toLocaleString()}
                  </td>
                  <td style={{ textAlign: 'right', padding: '10px 0' }}>
                    <span style={{
                      background: parseFloat(row.bounce) < 40 ? 'rgba(52,211,153,0.12)' : 'rgba(244,114,182,0.12)',
                      color: parseFloat(row.bounce) < 40 ? 'var(--teal)' : 'var(--pink)',
                      padding: '2px 8px', borderRadius: 20, fontSize: '0.72rem', fontWeight: 600
                    }}>{row.bounce}</span>
                  </td>
                  <td style={{ textAlign: 'right', color: 'var(--text-muted)', padding: '10px 0' }}>{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Geography */}
        <div className="glass-card reveal">
          <div className="card-header">
            <div className="card-title">Sessions by Country</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {GEO.map(g => (
              <div key={g.country} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ flex: 1, fontSize: '0.82rem', color: 'var(--text-secondary)', minWidth: 0 }}>{g.country}</div>
                <div style={{ flex: 2, background: 'rgba(255,255,255,0.06)', borderRadius: 99, height: 6, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', borderRadius: 99, width: `${g.pct}%`,
                    background: 'linear-gradient(90deg,#7c3aed,#a78bfa)',
                    transition: 'width 1s ease'
                  }} />
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', width: 44, textAlign: 'right' }}>
                  {g.sessions.toLocaleString()}
                </div>
                <div style={{
                  width: 36, textAlign: 'right', fontSize: '0.72rem', fontWeight: 700,
                  color: 'var(--purple)'
                }}>{g.pct}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom row: Device split + Funnel ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>

        {/* Device breakdown */}
        <div className="glass-card reveal">
          <div className="card-header">
            <div className="card-title">Device Breakdown</div>
          </div>
          <DeviceDonut />
          <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
            {DEVICES.map(d => (
              <div key={d.label} style={{
                background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10,
                padding: '12px', textAlign: 'center'
              }}>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: d.color }}>{d.pct}%</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 4 }}>{d.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Conversion funnel */}
        <div className="glass-card reveal">
          <div className="card-header">
            <div className="card-title">Conversion Funnel</div>
            <div className="card-subtitle">Jul 2026</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { label: 'Landing',   count: 31500, pct: 100, color: '#a78bfa' },
              { label: 'Signup',    count: 8820,  pct: 28,  color: '#38bdf8' },
              { label: 'Activated', count: 4410,  pct: 14,  color: '#34d399' },
              { label: 'Paid',      count: 1575,  pct: 5,   color: '#f472b6' },
            ].map((step, i) => (
              <div key={step.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: '0.82rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{
                      width: 22, height: 22, borderRadius: 6,
                      background: `rgba(167,139,250,0.15)`, color: 'var(--purple)',
                      fontSize: '0.65rem', fontWeight: 700,
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>{i + 1}</span>
                    <span style={{ color: 'var(--text-secondary)' }}>{step.label}</span>
                  </span>
                  <span>
                    <strong style={{ color: 'var(--text-primary)' }}>{step.count.toLocaleString()}</strong>
                    <span style={{ color: 'var(--text-muted)', marginLeft: 6, fontSize: '0.72rem' }}>{step.pct}%</span>
                  </span>
                </div>
                <div style={{ height: 8, background: 'rgba(255,255,255,0.06)', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${step.pct}%`, background: step.color, borderRadius: 99, transition: 'width 1s ease' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
