/**
 * Case Study & Project Details Modal Controller
 */

/**
 * Open project details modal with title and description
 * @param {string} title - Project Title
 * @param {string} description - Detailed description of project
 */
function project(title, description) {
  const titleEl = document.getElementById('mt');
  const descEl = document.getElementById('md');
  const modalEl = document.getElementById('modal');

  if (titleEl) titleEl.textContent = title;
  if (descEl) descEl.textContent = description;
  if (modalEl) {
    modalEl.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

/**
 * Close the project modal
 */
function closeModal() {
  const modalEl = document.getElementById('modal');
  if (modalEl) {
    modalEl.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// Event Listeners for Modal Backdrop, Keyboard Esc key, and Card Keyboard Triggers
document.addEventListener('DOMContentLoaded', () => {
  const modalEl = document.getElementById('modal');

  if (modalEl) {
    modalEl.addEventListener('click', (e) => {
      if (e.target.id === 'modal') {
        closeModal();
      }
    });
  }

  // Escape Key to Close Modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });

  // Attach Keyboard Enter/Space listeners for accessible project cards
  document.querySelectorAll('.work[role="button"]').forEach((card) => {
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });
});
