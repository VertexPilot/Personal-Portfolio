(() => {
  'use strict';
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const contactForm = document.getElementById('contact-form');
  const formNote = document.getElementById('form-note');
  const copyEmailButton = document.getElementById('copy-email');
  const emailAddress = 'lakshanpasindu0908@gmail.com';

  // Theme choice persists between visits where localStorage is available.
  let savedTheme = 'dark-mode';
  try { savedTheme = localStorage.getItem('theme') || 'dark-mode'; } catch (_) { /* Private browsing may restrict storage. */ }
  root.classList.remove('dark-mode', 'light-mode');
  root.classList.add(savedTheme === 'light-mode' ? 'light-mode' : 'dark-mode');
  const updateThemeButton = () => {
    if (!themeToggle) return;
    const isLight = root.classList.contains('light-mode');
    themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
    themeToggle.setAttribute('aria-pressed', String(isLight));
    themeToggle.title = isLight ? 'Switch to dark theme' : 'Switch to light theme';
    themeToggle.innerHTML = isLight
      ? '<svg viewBox="0 0 24 24" width="19" height="19" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.8"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>'
      : '<svg viewBox="0 0 24 24" width="19" height="19" fill="none" aria-hidden="true"><path d="M20.5 15.4A8.4 8.4 0 0 1 8.6 3.5 8.5 8.5 0 1 0 20.5 15.4Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  };
  updateThemeButton();
  themeToggle?.addEventListener('click', () => {
    const next = root.classList.contains('light-mode') ? 'dark-mode' : 'light-mode';
    root.classList.remove('dark-mode', 'light-mode');
    root.classList.add(next);
    try { localStorage.setItem('theme', next); } catch (_) { /* Theme still works for this page. */ }
    updateThemeButton();
  });

  // Mobile navigation: accessible toggle and automatic close after selection.
  hamburger?.addEventListener('click', () => {
    const open = !navMenu.classList.contains('open');
    navMenu.classList.toggle('open', open);
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    hamburger.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  navMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    hamburger?.classList.remove('open');
    hamburger?.setAttribute('aria-expanded', 'false');
    hamburger?.setAttribute('aria-label', 'Open navigation');
  }));

  // Highlight current section while scrolling.
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  const navLinks = Array.from(document.querySelectorAll('.main-nav a'));
  if ('IntersectionObserver' in window && sections.length && navLinks.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          const active = link.getAttribute('href') === `#${entry.target.id}`;
          link.classList.toggle('active', active);
          if (active) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-28% 0px -58% 0px', threshold: 0 });
    sections.forEach((section) => observer.observe(section));
  }

  // Static-host-friendly contact form: validates fields, then composes an email.
  // No backend endpoint is assumed. The visitor still presses Send in their mail app.
  contactForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;
    const name = document.getElementById('sender-name').value.trim();
    const sender = document.getElementById('sender-email').value.trim();
    const message = document.getElementById('sender-message').value.trim();
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`Hi Pasindu,\n\n${message}\n\n---\nFrom: ${name}\nReply email: ${sender}`);
    if (formNote) formNote.textContent = 'Your email app should open with the message prepared. Review it and press Send to deliver it.';
    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
  });

  // Copy email where the Clipboard API is available, with graceful fallback.
  copyEmailButton?.addEventListener('click', async () => {
    const note = formNote;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(emailAddress);
        copyEmailButton.textContent = '✓';
        if (note) note.textContent = 'Email address copied to clipboard.';
      } else {
        window.location.href = `mailto:${emailAddress}`;
        if (note) note.textContent = 'Your email app should open with Pasindu’s email address.';
      }
    } catch (_) {
      window.location.href = `mailto:${emailAddress}`;
      if (note) note.textContent = 'Your email app should open with Pasindu’s email address.';
    }
    window.setTimeout(() => { copyEmailButton.textContent = '⧉'; }, 1800);
  });

  const year = document.getElementById('year-now');
  if (year) year.textContent = String(new Date().getFullYear());
})();
