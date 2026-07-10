import { useEffect, useRef } from 'react';
import StatCard from '../components/StatCard';
import BarChart from '../components/BarChart';
import DonutChart from '../components/DonutChart';
import ActivityFeed from '../components/ActivityFeed';
import SprintTasks from '../components/SprintTasks';

const STATS = [
  {
    icon: '💰', label: 'Total Revenue', target: 128400, prefix: '$',
    change: '↑ 12.4% this month', positive: true, accent: '#a78bfa',
    sparkPoints: '0,25 15,18 30,22 45,10 60,14 80,4',
  },
  {
    icon: '👤', label: 'Active Users', target: 8320,
    change: '↑ 5.7% this month', positive: true, accent: '#34d399',
    sparkPoints: '0,28 15,22 30,25 45,15 60,18 80,10',
  },
  {
    icon: '📦', label: 'New Orders', target: 3241,
    change: '↓ 2.1% this month', positive: false, accent: '#f472b6',
    sparkPoints: '0,10 15,12 30,8 45,14 60,20 80,16',
  },
  {
    icon: '⭐', label: 'Satisfaction', target: 97, suffix: '%',
    change: '↑ 1.3% this month', positive: true, accent: '#38bdf8',
    sparkPoints: '0,20 15,15 30,18 45,10 60,8 80,5',
  },
];

export default function DashboardPage() {
  // Scroll-reveal
  const containerRef = useRef(null);

  useEffect(() => {
    const els = containerRef.current?.querySelectorAll('.reveal') ?? [];
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 70);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.05 });

    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="page-content" ref={containerRef}>
      {/* Stat Cards */}
      <div className="stats-grid">
        {STATS.map(s => <StatCard key={s.label} {...s} />)}
      </div>

      {/* Charts row */}
      <div className="mid-grid">
        <BarChart />
        <DonutChart />
      </div>

      {/* Bottom row */}
      <div className="bottom-grid">
        <ActivityFeed />
        <SprintTasks />
      </div>
    </div>
  );
}
