import { useState, useRef, useEffect } from 'react';

const NOTIFICATIONS = [
  { id: 1, title: 'New comment on Sprint 14', time: '2 mins ago',  unread: true  },
  { id: 2, title: 'Deployment succeeded ✅',  time: '15 mins ago', unread: true  },
  { id: 3, title: 'Team standup at 10am',     time: '1 hour ago',  unread: false },
];

export default function Topbar({ pageTitle, onMenuToggle }) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const btnRef   = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (
        panelRef.current && !panelRef.current.contains(e.target) &&
        btnRef.current   && !btnRef.current.contains(e.target)
      ) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header className="top-bar">
      <div className="top-bar-left">
        <button className="menu-toggle" onClick={onMenuToggle} aria-label="Toggle sidebar">☰</button>
        <div className="page-title">{pageTitle}</div>
      </div>
      <div className="top-bar-right">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="Search anything…" id="topbar-search" />
        </div>

        <button
          className="notif-btn"
          ref={btnRef}
          onClick={() => setOpen(o => !o)}
          aria-label="Notifications"
        >
          🔔
          <span className="notif-badge">3</span>
        </button>

        {open && (
          <div className="notif-panel" ref={panelRef}>
            <div className="notif-header">Notifications</div>
            {NOTIFICATIONS.map(n => (
              <div className={`notif-item${n.unread ? ' unread' : ''}`} key={n.id}>
                <div className={`notif-dot${n.unread ? '' : ' inactive'}`} />
                <div>
                  <div className="notif-title">{n.title}</div>
                  <div className="notif-time">{n.time}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
