/**
 * Main Interactive Logic, Mobile Navigation & Observers
 */
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Drawer Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      menuToggle.classList.toggle('active');
      mobileNav.classList.toggle('active');
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
      });
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileNav.contains(e.target) && !menuToggle.contains(e.target)) {
        menuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
      }
    });
  }

  // Scroll Reveal Observer
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          }
        });
      },
      { threshold: 0.1 }
    );

    revealElements.forEach((element) => revealObserver.observe(element));
  }

  // Contact Form Submission & Toast Notification
  const contactForm = document.getElementById('form');
  const toastNotification = document.getElementById('toast');

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      if (toastNotification) {
        toastNotification.classList.add('show');
        setTimeout(() => {
          toastNotification.classList.remove('show');
        }, 3500);
      }

      contactForm.reset();
    });
  }

  // Smooth Scroll Behavior for Navigation Anchors
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
});
