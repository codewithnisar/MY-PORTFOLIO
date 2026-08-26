/**
 * Modal Controller — Open/Close & Accessibility
 */

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

// Event Listeners for Modal
document.addEventListener('DOMContentLoaded', () => {
  const modalEl = document.getElementById('modal');

  if (modalEl) {
    // Close on backdrop click
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
});
