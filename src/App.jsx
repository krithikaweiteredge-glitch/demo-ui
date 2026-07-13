import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import DashboardPage from './pages/DashboardPage';
import AnalyticsPage from './pages/AnalyticsPage';
import PlaceholderPage from './pages/PlaceholderPage';

const PAGE_META = {
  dashboard: { title: 'Dashboard' },
  analytics: { title: 'Analytics',  icon: '📊', desc: 'Detailed analytics & reporting coming soon.' },
  projects:  { title: 'Projects',   icon: '🗂',  desc: 'Project management view coming soon.'        },
  team:      { title: 'Team',       icon: '👥', desc: 'Team collaboration hub coming soon.'          },
  settings:  { title: 'Settings',   icon: '⚙️', desc: 'Preferences & configuration coming soon.'    },
};

function AppContent() {
  const [activePage, setActivePage] = useState('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = (page) => {
    setActivePage(page);
    setMobileOpen(false);
  };

  const renderPage = () => {
    if (activePage === 'dashboard') return <DashboardPage />;
    if (activePage === 'analytics') return <AnalyticsPage />;
    const meta = PAGE_META[activePage];
    return <PlaceholderPage icon={meta.icon} title={meta.title} description={meta.desc} />;
  };

  return (
    <>
      {/* Animated background orbs */}
      <div className="bg-orbs">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      <div className="app-shell">
        <Sidebar
          activePage={activePage}
          onNavigate={navigate}
          mobileOpen={mobileOpen}
        />
        <main className="main-content">
          <Topbar
            pageTitle={PAGE_META[activePage].title}
            onMenuToggle={() => setMobileOpen(o => !o)}
          />
          {renderPage()}
        </main>
      </div>
    </>
  );
}

export default function App() {
  return <AppContent />;
}
