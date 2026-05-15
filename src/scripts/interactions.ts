/**
 * Page micro-interactions for Diald In Barber Studio.
 *
 * Responsibilities:
 *   - Barber card selection + stagger entrance animation
 *   - Button ripple effect on click
 *   - Section scroll-reveal
 *
 * Styling is owned by main.css (keyframes, .selected, .shimmer-effect,
 * .ripple-effect). This module only toggles classes and positions elements.
 */

function enhanceBarberCards(): void {
  const barberItems = document.querySelectorAll<HTMLElement>('.booking__barber-item');
  if (!barberItems.length) return;

  barberItems.forEach((item, index) => {
    // Stagger entrance: start hidden, reveal on scroll
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = `opacity 0.6s var(--easing-standard) ${index * 100}ms, transform 0.6s var(--easing-standard) ${index * 100}ms`;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.opacity = '1';
          (entry.target as HTMLElement).style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(item);

    // Shimmer on hover
    item.addEventListener('mouseenter', () => {
      const shimmer = document.createElement('div');
      shimmer.className = 'shimmer-effect';
      item.appendChild(shimmer);
      setTimeout(() => shimmer.remove(), 1500);
    });

    // Barber selection
    item.addEventListener('click', () => {
      barberItems.forEach(other => other.classList.remove('selected'));
      item.classList.add('selected');

      const barberName = item.querySelector('.booking__barber-name')?.textContent ?? '';
      if (typeof gtag !== 'undefined') {
        gtag('event', 'barber_selected', {
          event_category: 'engagement',
          event_label: barberName,
        });
      }
    });
  });
}

function enhanceButtons(): void {
  const buttons = document.querySelectorAll<HTMLElement>('.booking__cta, .btn');

  buttons.forEach(button => {
    // Ensure button can clip the ripple
    button.style.position = 'relative';
    button.style.overflow = 'hidden';

    button.addEventListener('click', (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      ripple.style.left = `${e.clientX - rect.left - 10}px`;
      ripple.style.top  = `${e.clientY - rect.top  - 10}px`;
      button.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

function addScrollReveal(): void {
  const sections = document.querySelectorAll<HTMLElement>('section');
  if (!sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        (entry.target as HTMLElement).style.opacity = '1';
        (entry.target as HTMLElement).style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  sections.forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = `opacity 0.8s var(--easing-standard) ${index * 0.1}s, transform 0.8s var(--easing-standard) ${index * 0.1}s`;
    observer.observe(section);
  });
}

// gtag type declaration — present when Google Analytics is loaded
declare function gtag(command: string, action: string, params: Record<string, string>): void;

document.addEventListener('DOMContentLoaded', () => {
  enhanceBarberCards();
  enhanceButtons();
  addScrollReveal();
});
