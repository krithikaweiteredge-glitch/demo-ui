/* =============================================
   NovaSpark — app.js
   ============================================= */

// ---- Navigation ----
function navigate(page, el) {
  // prevent default link behaviour
  event.preventDefault();

  // deactivate all nav items
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  // activate clicked
  el.classList.add('active');

  // hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  // show target page
  const target = document.getElementById('page-' + page);
  if (target) target.classList.add('active');

  // update page title
  document.getElementById('page-title').textContent =
    el.querySelector('.nav-label').textContent;

  // close sidebar on mobile after nav
  if (window.innerWidth < 768) {
    document.getElementById('sidebar').classList.remove('open');
  }
}

// ---- Sidebar toggle (mobile) ----
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

// ---- Notification panel ----
function toggleNotifications() {
  const panel = document.getElementById('notif-panel');
  panel.classList.toggle('visible');
}

// Close notif panel on outside click
document.addEventListener('click', (e) => {
  const btn = document.getElementById('notif-btn');
  const panel = document.getElementById('notif-panel');
  if (!btn.contains(e.target) && !panel.contains(e.target)) {
    panel.classList.remove('visible');
  }
});

// ---- Task toggle ----
function toggleTask(el) {
  el.classList.toggle('done');
  el.textContent = el.classList.contains('done') ? '✓' : '';
}

// ---- Animated counters ----
function animateCounter(el) {
  const raw = el.dataset.target;
  const isPercent = el.textContent.includes('%');
  const isCurrency = el.textContent.includes('$') || raw >= 1000;
  const target = parseFloat(raw);
  const duration = 1600;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(target * eased);

    if (target >= 1000) {
      el.textContent = (target >= 10000 ? '$' : '') + current.toLocaleString();
    } else {
      el.textContent = current + (isPercent ? '%' : '');
    }

    if (progress < 1) requestAnimationFrame(update);
    else {
      if (target >= 10000) el.textContent = '$' + target.toLocaleString();
      else if (isPercent) el.textContent = target + '%';
      else el.textContent = target.toLocaleString();
    }
  }
  requestAnimationFrame(update);
}

// Kick off counters when page loads
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.stat-value[data-target]').forEach(animateCounter);
  buildBarChart();
});

// ---- Bar Chart ----
const weekData = [
  { day: 'Mon', val: 6200 },
  { day: 'Tue', val: 9800 },
  { day: 'Wed', val: 7400 },
  { day: 'Thu', val: 11200 },
  { day: 'Fri', val: 15600 },
  { day: 'Sat', val: 8900 },
  { day: 'Sun', val: 5100 },
];

function buildBarChart() {
  const chart = document.getElementById('bar-chart');
  const labels = document.getElementById('bar-labels');
  if (!chart) return;

  const max = Math.max(...weekData.map(d => d.val));

  weekData.forEach(({ day, val }) => {
    const heightPct = (val / max) * 100;

    const wrap = document.createElement('div');
    wrap.className = 'bar-wrap';

    const valEl = document.createElement('div');
    valEl.className = 'bar-val';
    valEl.textContent = '$' + (val / 1000).toFixed(1) + 'k';

    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.height = '0%';
    bar.title = `${day}: $${val.toLocaleString()}`;

    // Highlight today (Friday)
    if (day === 'Fri') {
      bar.style.background = 'linear-gradient(180deg, #f472b6, rgba(244,114,182,0.3))';
    }

    wrap.appendChild(valEl);
    wrap.appendChild(bar);
    chart.appendChild(wrap);

    // animate bar height
    setTimeout(() => {
      bar.style.transition = 'height 0.8s cubic-bezier(.4,0,.2,1)';
      bar.style.height = heightPct + '%';
    }, 100);

    // labels row
    const labelEl = document.createElement('div');
    labelEl.className = 'bar-label';
    labelEl.textContent = day;
    labels.appendChild(labelEl);
  });
}

// ---- Scroll reveal ----
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

window.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.stat-card, .glass-card');
  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;
    observer.observe(card);
  });
});
