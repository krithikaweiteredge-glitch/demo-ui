const ACTIVITIES = [
  {
    initials: 'AR',
    gradient: 'linear-gradient(135deg,#a78bfa,#7c3aed)',
    name: 'Arun R.',
    action: 'pushed to',
    tag: 'main',
    time: '3 minutes ago',
    badge: 'Merged',
    badgeClass: 'badge-green',
  },
  {
    initials: 'PM',
    gradient: 'linear-gradient(135deg,#34d399,#059669)',
    name: 'Priya M.',
    action: 'opened issue',
    tag: '#412',
    time: '27 minutes ago',
    badge: 'Open',
    badgeClass: 'badge-yellow',
  },
  {
    initials: 'SK',
    gradient: 'linear-gradient(135deg,#38bdf8,#0284c7)',
    name: 'Sam K.',
    action: 'deployed',
    tag: 'v2.4.1',
    time: '1 hour ago',
    badge: 'Done',
    badgeClass: 'badge-blue',
  },
  {
    initials: 'LN',
    gradient: 'linear-gradient(135deg,#f472b6,#db2777)',
    name: 'Lena N.',
    action: 'updated',
    tag: 'design system',
    time: '2 hours ago',
    badge: 'Updated',
    badgeClass: 'badge-purple',
  },
];

export default function ActivityFeed() {
  return (
    <div className="glass-card activity-card reveal">
      <div className="card-header">
        <div className="card-title">Recent Activity</div>
        <button className="view-all-btn">View All</button>
      </div>
      <ul className="activity-list">
        {ACTIVITIES.map((item) => (
          <li className="activity-item" key={item.name + item.time}>
            <div className="activity-avatar" style={{ background: item.gradient }}>
              {item.initials}
            </div>
            <div className="activity-body">
              <span className="activity-name">{item.name}</span>{' '}
              {item.action}{' '}
              <span className="activity-tag">{item.tag}</span>
              <div className="activity-time">{item.time}</div>
            </div>
            <span className={`activity-badge ${item.badgeClass}`}>{item.badge}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
