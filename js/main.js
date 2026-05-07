// ─── SCROLL REVEAL ───────────────────────────
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -32px 0px' }
);
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// ─── STICKY NAV ──────────────────────────────
const nav = document.getElementById('nav');
if (nav) {
  // Interior pages (already scrolled class added in HTML) stay solid
  if (!nav.classList.contains('scrolled')) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }
}

// ─── MOBILE MENU ─────────────────────────────
const toggle  = document.getElementById('navToggle');
const navMenu = document.getElementById('navLinks');
if (toggle && navMenu) {
  toggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    document.body.style.overflow = open ? 'hidden' : '';
  });
  navMenu.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      navMenu.classList.remove('open');
      toggle.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ─── TABS ────────────────────────────────────
document.querySelectorAll('.tab-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;
    document.querySelectorAll('.tab-btn').forEach((b) =>
      b.classList.toggle('tab-btn--active', b === btn)
    );
    document.querySelectorAll('.tab-panel').forEach((p) =>
      p.classList.toggle('tab-panel--active', p.id === `tab-${tab}`)
    );
  });
});

// ─── ACCORDION ───────────────────────────────
document.querySelectorAll('.accordion__trigger').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const item    = trigger.closest('.accordion__item');
    const body    = item.querySelector('.accordion__body');
    const isOpen  = trigger.classList.contains('open');

    // Close all others in same accordion group
    const parent = trigger.closest('.accordion');
    if (parent) {
      parent.querySelectorAll('.accordion__trigger.open').forEach((t) => {
        if (t !== trigger) {
          t.classList.remove('open');
          t.setAttribute('aria-expanded', 'false');
          t.closest('.accordion__item').querySelector('.accordion__body').classList.remove('open');
        }
      });
    }

    trigger.classList.toggle('open', !isOpen);
    trigger.setAttribute('aria-expanded', String(!isOpen));
    body.classList.toggle('open', !isOpen);
  });
});

// ─── ACTIVE NAV LINK ON SCROLL ────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav__link:not(.nav__link--cta)');
if (sections.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((link) => {
            const href = link.getAttribute('href') || '';
            link.style.color = href.endsWith(`#${id}`) ? 'var(--gold)' : '';
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );
  sections.forEach((s) => sectionObserver.observe(s));
}
