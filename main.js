// ParikshaAI — shared interactions
document.addEventListener('DOMContentLoaded', () => {

  // Mobile drawer
  const toggle = document.querySelector('.menu-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const drawerClose = document.querySelector('.mobile-drawer-close');
  if (toggle && drawer) {
    toggle.addEventListener('click', () => drawer.classList.add('open'));
    drawerClose?.addEventListener('click', () => drawer.classList.remove('open'));
    drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => drawer.classList.remove('open')));
  }

  // Search modal (client-side over a small static index)
  const searchIndex = [
    { title: 'ChatGPT for Study Notes', type: 'AI Tool', href: 'ai-tools.html' },
    { title: 'Notion AI for Revision Plans', type: 'AI Tool', href: 'ai-tools.html' },
    { title: 'Perplexity for Current Affairs Research', type: 'AI Tool', href: 'ai-tools.html' },
    { title: 'SSC CGL Tier 1 — Quant Notes', type: 'SSC Notes', href: 'notes.html' },
    { title: 'SSC CHSL — English Grammar Rules', type: 'SSC Notes', href: 'notes.html' },
    { title: 'Railway NTPC — General Awareness', type: 'SSC Notes', href: 'notes.html' },
    { title: 'IBPS PO — Reasoning Shortcuts', type: 'SSC Notes', href: 'notes.html' },
    { title: 'Daily Current Affairs — July 2026', type: 'Current Affairs', href: 'current-affairs.html' },
    { title: 'How AI Tools Can Cut Your Revision Time in Half', type: 'Blog', href: 'blog.html' },
    { title: 'UPSC Beginners Roadmap 2026', type: 'Blog', href: 'blog.html' },
    { title: 'About ParikshaAI', type: 'Page', href: 'about.html' },
    { title: 'Contact Us', type: 'Page', href: 'contact.html' },
  ];

  const modal = document.querySelector('.search-modal');
  const openers = document.querySelectorAll('[data-search-open]');
  const closeBtn = document.querySelector('.search-close');
  const input = document.querySelector('.search-box input');
  const results = document.querySelector('.search-results');

  function renderResults(query) {
    if (!results) return;
    const q = query.trim().toLowerCase();
    const matches = q ? searchIndex.filter(i => i.title.toLowerCase().includes(q)) : searchIndex.slice(0, 6);
    results.innerHTML = matches.map(m =>
      `<a class="sr-item" href="${m.href}" style="display:flex;justify-content:space-between;gap:10px;">
        <span>${m.title}</span>
        <span class="tag">${m.type}</span>
      </a>`
    ).join('') || `<div class="sr-item">Koi result nahi mila. Try a different keyword.</div>`;
  }

  openers.forEach(btn => btn.addEventListener('click', () => {
    modal?.classList.add('open');
    renderResults('');
    setTimeout(() => input?.focus(), 50);
  }));
  closeBtn?.addEventListener('click', () => modal?.classList.remove('open'));
  modal?.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('open'); });
  input?.addEventListener('input', (e) => renderResults(e.target.value));
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      modal?.classList.add('open');
      renderResults('');
      setTimeout(() => input?.focus(), 50);
    }
    if (e.key === 'Escape') modal?.classList.remove('open');
  });

  // Filter chips (AI tools / notes pages)
  document.querySelectorAll('.filter-bar').forEach(bar => {
    const chips = bar.querySelectorAll('.chip');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const filter = chip.dataset.filter;
        const targetGrid = document.querySelector(bar.dataset.target);
        if (!targetGrid) return;
        targetGrid.querySelectorAll('[data-cat]').forEach(item => {
          const show = filter === 'all' || item.dataset.cat === filter;
          item.style.display = show ? '' : 'none';
        });
      });
    });
  });

  // Contact form (static demo — no backend yet)
  const form = document.querySelector('.contact-form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Message Sent ✓';
    btn.style.background = '#16A34A';
    form.reset();
    setTimeout(() => { btn.textContent = original; btn.style.background = ''; }, 2600);
  });

});
