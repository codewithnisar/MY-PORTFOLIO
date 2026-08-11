/**
 * Theme Switching & Persistence Management
 */
document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const themeBtn = document.getElementById('theme');

  if (!themeBtn) return;

  // Restore saved theme preference from LocalStorage
  const savedTheme = localStorage.getItem('nisar-theme-2');
  if (savedTheme === 'dark') {
    body.classList.add('dark');
    themeBtn.textContent = '☀';
  } else {
    themeBtn.textContent = '◐';
  }

  // Toggle Theme on Button Click
  themeBtn.addEventListener('click', () => {
    body.classList.toggle('dark');
    const isDark = body.classList.contains('dark');
    localStorage.setItem('nisar-theme-2', isDark ? 'dark' : 'light');
    themeBtn.textContent = isDark ? '☀' : '◐';
  });
});
