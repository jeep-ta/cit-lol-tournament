// Shared API helper
const API = {
  token: null,
  getHeaders() {
    const headers = { 'Content-Type': 'application/json' };
    if (this.token) headers['Authorization'] = `Bearer ${this.token}`;
    return headers;
  },
  async get(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },
  async post(url, body) {
    const res = await fetch(url, { method: 'POST', headers: this.getHeaders(), body: JSON.stringify(body) });
    if (!res.ok) { const err = await res.json(); throw new Error(err.error || 'Request failed'); }
    return res.json();
  },
  async put(url, body) {
    const res = await fetch(url, { method: 'PUT', headers: this.getHeaders(), body: JSON.stringify(body) });
    if (!res.ok) { const err = await res.json(); throw new Error(err.error || 'Request failed'); }
    return res.json();
  },
  async delete(url) {
    const headers = {};
    if (this.token) headers['Authorization'] = `Bearer ${this.token}`;
    const res = await fetch(url, { method: 'DELETE', headers });
    if (!res.ok) throw new Error('Delete failed');
    return res.json();
  }
};

// Injects the nav bar into the page
function initNav(activePage) {
  const pages = [
    { id: 'schedule', label: 'Schedule', href: '/' },
    { id: 'bracket', label: 'Bracket', href: '/bracket.html' },
    { id: 'standings', label: 'Standings', href: '/standings.html' },
    { id: 'register', label: 'Register', href: '/register.html' },
    { id: 'eligibility', label: 'Eligibility', href: '/eligibility.html' },
    { id: 'admin', label: 'Admin', href: '/admin.html' },
  ];

  const navEl = document.getElementById('main-nav');
  if (!navEl) return;

  navEl.innerHTML = `
    <a class="nav-logo" href="/">
      <img src="/logo.png" class="logo-icon" alt="Tournament Logo" style="width: 48px; height: 48px; object-fit: contain;">
      <div>
        <span class="logo-text">CIT LoL eSports</span>
        <span class="logo-sub">Season 2027 · UNO-R</span>
      </div>
    </a>
    <div class="nav-tabs">
      ${pages.map(p => `<a class="nav-tab ${p.id === activePage ? 'active' : ''}" href="${p.href}">${p.label}</a>`).join('')}
    </div>
  `;
}

// Format date for display
function formatDate(dateStr) {
  if (!dateStr) return 'TBD';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatDateFull(dateStr) {
  if (!dateStr) return 'TBD';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

// Alert helper
function showAlert(containerId, msg, type = 'success') {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.className = `alert alert-${type}`;
  el.textContent = msg;
  el.style.display = 'block';
  setTimeout(() => { el.style.display = 'none'; }, 4000);
}
