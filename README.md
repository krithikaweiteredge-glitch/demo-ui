# NovaSpark — Premium Dashboard UI (React + Vite)

A stunning, fully-responsive dark dashboard built with **React 19** and **Vite** — no CSS framework, just beautiful Vanilla CSS.

## ✨ Features

- ⚡ React 19 + Vite (lightning fast HMR)
- 🎨 Glassmorphism dark theme with animated gradient orbs
- 📊 Animated bar chart & SVG donut chart (pure CSS + JS)
- 🔢 Number counter animations on page load
- 🔔 Notification panel with click-outside dismiss
- ✅ Interactive sprint task checklist (React state)
- 📱 Fully responsive — mobile sidebar drawer
- 🌊 Scroll-reveal card entrance animations
- 🗂 Multi-page navigation (Dashboard, Analytics, Projects, Team, Settings)

## 📁 Project Structure

```
src/
├── App.jsx                    # Root — routing & layout shell
├── index.css                  # All global styles
├── main.jsx                   # React entry point
├── components/
│   ├── Sidebar.jsx            # Navigation sidebar
│   ├── Topbar.jsx             # Header + notifications
│   ├── StatCard.jsx           # Animated KPI card
│   ├── BarChart.jsx           # Weekly revenue bar chart
│   ├── DonutChart.jsx         # Traffic sources donut chart
│   ├── ActivityFeed.jsx       # Recent activity list
│   └── SprintTasks.jsx        # Interactive sprint checklist
└── pages/
    ├── DashboardPage.jsx      # Main dashboard view
    └── PlaceholderPage.jsx    # Placeholder for other pages
```

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🏗 Build for Production

```bash
npm run build
npm run preview
```

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| React 19 | UI components & state |
| Vite | Build tool & dev server |
| Vanilla CSS | Glassmorphism, animations, responsive |
| Google Fonts (Outfit) | Typography |

---

Made with ❤️ — NovaSpark Demo UI
