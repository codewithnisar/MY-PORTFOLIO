/**
 * Main Interactive Logic — Active Nav, Form UX, Mobile Navigation & Observers
 */
document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // Mobile Nav Drawer Toggle
  // ==========================================
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

  // ==========================================
  // Scroll Reveal Observer
  // ==========================================
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

  // ==========================================
  // Active Navigation Section Detection
  // ==========================================
  const navLinks = document.querySelectorAll('.nav-center a[data-section]');
  const sections = document.querySelectorAll('section[id]');

  if (navLinks.length > 0 && sections.length > 0) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('id');
            navLinks.forEach((link) => {
              link.classList.remove('active');
              if (link.getAttribute('data-section') === sectionId) {
                link.classList.add('active');
              }
            });
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
      }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }

  // ==========================================
  // Contact Form Submission with States
  // ==========================================
  const contactForm = document.getElementById('form');
  const toastNotification = document.getElementById('toast');
  const submitBtn = document.getElementById('submit-btn');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      // Validate
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      // Loading state
      if (submitBtn) {
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        if (btnText) btnText.style.display = 'none';
        if (btnLoading) btnLoading.style.display = 'inline';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
      }

      // Simulate submission (replace with real form handler)
      setTimeout(() => {
        // Success state
        if (formFeedback) {
          formFeedback.textContent = '✓ Thank you! Your message has been sent successfully.';
          formFeedback.className = 'form-feedback success';
        }

        if (toastNotification) {
          toastNotification.classList.add('show');
          setTimeout(() => {
            toastNotification.classList.remove('show');
          }, 3500);
        }

        // Reset form
        contactForm.reset();

        // Reset button
        if (submitBtn) {
          const btnText = submitBtn.querySelector('.btn-text');
          const btnLoading = submitBtn.querySelector('.btn-loading');
          if (btnText) btnText.style.display = 'inline';
          if (btnLoading) btnLoading.style.display = 'none';
          submitBtn.disabled = false;
          submitBtn.style.opacity = '1';
        }

        // Clear feedback after delay
        setTimeout(() => {
          if (formFeedback) {
            formFeedback.textContent = '';
            formFeedback.className = 'form-feedback';
          }
        }, 5000);
      }, 1200);
    });
  }

  // ==========================================
  // Smooth Scroll for Navigation Anchors
  // ==========================================
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

  // ==========================================
  // Project Card Click Handlers
  // ==========================================
  const projectData = {
    sufia: {
      title: 'Sufia Noorbakhshia',
      type: 'Concept Project',
      description: 'A modern digital experience designed around Islamic content, learning and daily tools. This purpose-driven educational platform combines Quran tracking, quizzes, community content and personalized progress into a thoughtful user experience.',
      challenge: 'Creating an engaging digital platform that respects Islamic educational traditions while providing modern UX patterns.',
      approach: 'Design-first approach with a focus on accessibility, content hierarchy and daily engagement features.',
      tech: 'React · Firebase · UI/UX Design'
    },
    elingo: {
      title: 'English Master / Elingo',
      type: 'Concept Project',
      description: 'An English learning application focused on speaking, listening, reading, writing, grammar and vocabulary with modern learning interactions.',
      challenge: 'Making language learning engaging through interactive exercises and progress tracking.',
      approach: 'Gamified learning experience with clear progress indicators and daily practice goals.',
      tech: 'JavaScript · AI · Firebase'
    },
    studypal: {
      title: 'StudyPal',
      type: 'Concept Project',
      description: 'An AI learning assistant concept for study planning, questions, notes and personalized learning workflows.',
      challenge: 'Integrating AI assistance into a study workflow without overwhelming the student.',
      approach: 'Minimal, focused interface that surfaces AI help contextually rather than constantly.',
      tech: 'AI · JavaScript'
    },
    stackaura: {
      title: 'StackAura Web',
      type: 'Concept Project',
      description: 'A modern developer tools and digital platform concept designed for scalable web applications.',
      challenge: 'Creating a clean, professional platform for developer-focused tools and resources.',
      approach: 'Performance-first architecture with modern component patterns and clean UI.',
      tech: 'React · JavaScript · CSS'
    },
    ecommerce: {
      title: 'Modern E-commerce',
      type: 'Concept Project',
      description: 'A clean online shopping experience focused on product discovery, responsive layouts and conversion-friendly interactions.',
      challenge: 'Building a fast, intuitive shopping experience that works beautifully on all devices.',
      approach: 'Mobile-first design with focus on product imagery, clear CTAs and minimal friction checkout flow.',
      tech: 'React · UI/UX'
    }
  };

  // Attach click handlers to project cards
  document.querySelectorAll('[data-project]').forEach((card) => {
    card.addEventListener('click', () => {
      const projectKey = card.getAttribute('data-project');
      const data = projectData[projectKey];
      if (data) {
        openProjectModal(data);
      }
    });

    // Keyboard accessibility
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  function openProjectModal(data) {
    const titleEl = document.getElementById('mt');
    const descEl = document.getElementById('md');
    const modalEl = document.getElementById('modal');
    const badgeEl = document.getElementById('modal-badge');
    const detailsEl = document.getElementById('modal-details');

    if (titleEl) titleEl.textContent = data.title;
    if (descEl) descEl.textContent = data.description;
    if (badgeEl) badgeEl.textContent = data.type || '';
    if (detailsEl) {
      detailsEl.innerHTML = `
        <div style="margin-top:16px;border-top:1px solid var(--line);padding-top:16px;">
          <div style="margin-bottom:14px;">
            <strong style="font:700 12px Syne,sans-serif;color:var(--accent);text-transform:uppercase;letter-spacing:1px;">Challenge</strong>
            <p style="margin-top:6px;">${data.challenge || ''}</p>
          </div>
          <div style="margin-bottom:14px;">
            <strong style="font:700 12px Syne,sans-serif;color:var(--accent);text-transform:uppercase;letter-spacing:1px;">Approach</strong>
            <p style="margin-top:6px;">${data.approach || ''}</p>
          </div>
          <div>
            <strong style="font:700 12px Syne,sans-serif;color:var(--accent);text-transform:uppercase;letter-spacing:1px;">Technology</strong>
            <p style="margin-top:6px;">${data.tech || ''}</p>
          </div>
        </div>
      `;
    }

    if (modalEl) {
      modalEl.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }
});
