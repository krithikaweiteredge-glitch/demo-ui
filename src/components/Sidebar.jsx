const NAV_ITEMS = [
  { id: 'dashboard', icon: '🏠', label: 'Dashboard'  },
  { id: 'analytics', icon: '📊', label: 'Analytics'  },
  { id: 'projects',  icon: '🗂',  label: 'Projects'   },
  { id: 'team',      icon: '👥', label: 'Team'        },
  { id: 'settings',  icon: '⚙️', label: 'Settings'   },
];

export default function Sidebar({ activePage, onNavigate, mobileOpen }) {
  return (
    <aside className={`sidebar${mobileOpen ? ' mobile-open' : ''}`}>
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-icon">⚡</div>
        <span className="logo-text">NovaSpark</span>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            className={`nav-item${activePage === item.id ? ' active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* User */}
      <div className="sidebar-user">
        <div className="user-avatar">KW</div>
        <div className="user-info">
          <div className="user-name">Krithika W.</div>
          <div className="user-role">Admin</div>
        </div>
        <div className="user-status" />
      </div>
    </aside>
  );
}
