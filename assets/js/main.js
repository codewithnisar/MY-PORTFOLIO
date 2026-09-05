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
  // Contact Form Submission with WhatsApp & Email Integration
  // ==========================================
  const contactForm = document.getElementById('form');
  const toastNotification = document.getElementById('toast');
  const submitBtn = document.getElementById('submit-btn');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      // Validate Form
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      // Extract Form Field Values
      const name = document.getElementById('name')?.value.trim() || '';
      const email = document.getElementById('email')?.value.trim() || '';
      const projectType = document.getElementById('project-type')?.value || '';
      const budget = document.getElementById('budget')?.value || '';
      const message = document.getElementById('message')?.value.trim() || '';

      // UI Loading state
      if (submitBtn) {
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        if (btnText) btnText.style.display = 'none';
        if (btnLoading) btnLoading.style.display = 'inline';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
      }

      // Format WhatsApp Pre-filled Chat Message
      const waText = 
        `*New Inquiry from Portfolio Website*%0A%0A` +
        `*Name:* ${encodeURIComponent(name)}%0A` +
        `*Email:* ${encodeURIComponent(email)}%0A` +
        `*Project Type:* ${encodeURIComponent(projectType || 'General Inquiry')}%0A` +
        `*Budget:* ${encodeURIComponent(budget || 'To discuss')}%0A%0A` +
        `*Message:*%0A${encodeURIComponent(message)}`;

      const waUrl = `https://wa.me/923350991548?text=${waText}`;

      // Dispatch Email directly to nissarralee11255@gmail.com via FormSubmit AJAX API
      fetch('https://formsubmit.co/ajax/nissarralee11255@gmail.com', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json' 
        },
        body: JSON.stringify({
          _subject: `✦ New Portfolio Inquiry from ${name}`,
          Name: name,
          Email: email,
          ProjectType: projectType || 'General Inquiry',
          Budget: budget || 'To discuss',
          Message: message
        })
      }).catch((err) => console.log('Email dispatch fallback:', err));

      setTimeout(() => {
        // Show Success Feedback & Toast
        if (formFeedback) {
          formFeedback.textContent = '✓ Message sent to Email & opening WhatsApp chat...';
          formFeedback.className = 'form-feedback success';
        }

        if (toastNotification) {
          toastNotification.textContent = '✓ Sent to Email! Opening WhatsApp chat... ✦';
          toastNotification.classList.add('show');
          setTimeout(() => {
            toastNotification.classList.remove('show');
          }, 4000);
        }

        // Open WhatsApp Redirect in New Tab
        window.open(waUrl, '_blank', 'noopener,noreferrer');

        // Reset form & restore button state
        contactForm.reset();
        if (submitBtn) {
          const btnText = submitBtn.querySelector('.btn-text');
          const btnLoading = submitBtn.querySelector('.btn-loading');
          if (btnText) btnText.style.display = 'inline';
          if (btnLoading) btnLoading.style.display = 'none';
          submitBtn.disabled = false;
          submitBtn.style.opacity = '1';
        }

        // Clear feedback message after 6 seconds
        setTimeout(() => {
          if (formFeedback) {
            formFeedback.textContent = '';
            formFeedback.className = 'form-feedback';
          }
        }, 6000);
      }, 900);
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
      type: 'Featured Production Platform',
      description: 'A modern digital experience designed around Islamic content, learning and daily tools. This purpose-driven educational platform combines Quran tracking, quizzes, community content and personalized progress into a thoughtful user experience.',
      challenge: 'Creating an engaging digital platform that respects Islamic educational traditions while providing modern UX patterns.',
      approach: 'Design-first approach with a focus on accessibility, content hierarchy and daily engagement features.',
      tech: 'React · Firebase · UI/UX Design'
    },
    elingo: {
      title: 'English Master / Elingo',
      type: 'Live Web Application',
      description: 'An English learning application focused on speaking, listening, reading, writing, grammar and vocabulary with modern learning interactions.',
      challenge: 'Making language learning engaging through interactive exercises and progress tracking.',
      approach: 'Gamified learning experience with clear progress indicators and daily practice goals.',
      tech: 'JavaScript · AI · Firebase'
    },
    studypal: {
      title: 'StudyPal AI',
      type: 'AI SaaS Web Application',
      description: 'An AI learning assistant platform for study planning, smart Q&A summaries, notes and personalized learning workflows.',
      challenge: 'Integrating AI assistance into a study workflow without overwhelming the student.',
      approach: 'Minimal, focused interface that surfaces AI help contextually rather than constantly.',
      tech: 'AI · JavaScript · Web APIs'
    },
    stackaura: {
      title: 'StackAura Web',
      type: 'Developer Console & Platform',
      description: 'A modern developer tools and digital platform console designed for scalable web applications.',
      challenge: 'Creating a clean, professional platform for developer-focused tools and resources.',
      approach: 'Performance-first architecture with modern component patterns and clean UI.',
      tech: 'React · JavaScript · CSS'
    },
    ecommerce: {
      title: 'Modern E-commerce Platform',
      type: 'Full-Stack Commerce Store',
      description: 'A clean online shopping experience focused on product discovery, responsive layouts and conversion-friendly interactions.',
      challenge: 'Building a fast, intuitive shopping experience that works beautifully on all devices.',
      approach: 'Mobile-first design with focus on product imagery, clear CTAs and minimal friction checkout flow.',
      tech: 'React · UI/UX · State Management'
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

  // ==========================================
  // Hero Stacked ID Cards Interactive Rotation
  // ==========================================
  const cardStackContainer = document.getElementById('hero-card-stack');
  if (cardStackContainer) {
    let isAnimating = false;

    function rotateHeroCards() {
      if (isAnimating) return;
      isAnimating = true;

      const topCard = cardStackContainer.querySelector('.stack-card.card-top');
      const midCard = cardStackContainer.querySelector('.stack-card.card-mid');
      const botCard = cardStackContainer.querySelector('.stack-card.card-bot');

      if (!topCard || !midCard || !botCard) {
        isAnimating = false;
        return;
      }

      // Add shuffle keyframe class to top card
      topCard.classList.add('shuffling');

      // Halfway through animation (300ms), rotate positions
      setTimeout(() => {
        topCard.classList.remove('card-top', 'shuffling');
        topCard.classList.add('card-bot');

        midCard.classList.remove('card-mid');
        midCard.classList.add('card-top');

        botCard.classList.remove('card-bot');
        botCard.classList.add('card-mid');

        setTimeout(() => {
          isAnimating = false;
        }, 150);
      }, 280);
    }

    cardStackContainer.addEventListener('click', (e) => {
      // If user clicks a link (like .card-cta-btn), allow default anchor navigation
      if (e.target.closest('a')) return;
      rotateHeroCards();
    });

    const cards = cardStackContainer.querySelectorAll('.stack-card');
    cards.forEach((card) => {
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          if (e.target.closest('a')) return;
          e.preventDefault();
          rotateHeroCards();
        }
      });
    });
  }
});
