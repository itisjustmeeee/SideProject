document.addEventListener('DOMContentLoaded', () => {
  const KEY = 'theme';
  const btn = document.querySelector('.theme-toggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  function applyTheme(isDark) {
    console.log('Applying theme:', isDark ? 'dark' : 'light');
    if (isDark) {
      document.body.classList.add('theme-dark');
    } else {
      document.body.classList.remove('theme-dark');
    }
    if (btn) {
      btn.setAttribute('aria-pressed', String(isDark));
      console.log('Button aria-pressed updated to:', String(isDark));
    }
  }

  const savedTheme = localStorage.getItem(KEY);
  console.log('Saved theme from localStorage:', savedTheme);
  if (savedTheme === 'dark') {
    applyTheme(true);
  } else if (savedTheme === 'light') {
    applyTheme(false);
  } else if (!savedTheme && prefersDark) {
    applyTheme(true);
  } else {
    applyTheme(false);
  }

  if (btn) {
    btn.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('theme-dark');
      btn.setAttribute('aria-pressed', String(isDark));
      localStorage.setItem(KEY, isDark ? 'dark' : 'light');
      console.log('Theme toggled to:', isDark ? 'dark' : 'light');
    });
  } else {
    console.log('Theme toggle button not found, theme applied without interaction');
  }
});