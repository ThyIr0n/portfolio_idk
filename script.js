document.addEventListener('DOMContentLoaded', () => {

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const primaryNav = document.getElementById('primaryNav');
  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = primaryNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    primaryNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        primaryNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Mark sections/cards for reveal-on-scroll
  document.querySelectorAll(
    '.about-inner, .process-step, .work-card, .contact-inner'
  ).forEach(el => el.classList.add('reveal'));

  const revealTargets = document.querySelectorAll('.reveal, [data-stitch]');

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -60px 0px' });

    revealTargets.forEach(el => io.observe(el));
  } else {
    // Fallback: no IntersectionObserver support
    revealTargets.forEach(el => el.classList.add('in-view'));
  }

  // Commission form — client-side only demo submission
  const form = document.getElementById('commissionForm');
  const success = document.getElementById('formSuccess');

  if (form && success) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      form.querySelectorAll('input, select, textarea, button').forEach(field => {
        field.disabled = true;
      });

      success.hidden = false;
      success.querySelector('.success-check')?.classList.remove('draw');
      // restart the check-mark draw animation
      const check = document.getElementById('successCheck');
      if (check) {
        check.style.animation = 'none';
        void check.offsetWidth;
        check.style.animation = '';
      }

      success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

});
