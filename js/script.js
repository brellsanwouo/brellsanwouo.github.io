document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('toggle-contrast');
  const themeKey = 'site-theme';

  const applyTheme = (isDarkMode) => {
    document.body.classList.toggle('dark-mode', isDarkMode);
    if (toggleButton) {
      toggleButton.textContent = isDarkMode ? '☀️' : '🌙';
    }
  };

  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem(themeKey);
  } catch (error) {
    savedTheme = null;
  }

  applyTheme(savedTheme === 'dark');

  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      const isDarkMode = !document.body.classList.contains('dark-mode');
      applyTheme(isDarkMode);

      try {
        localStorage.setItem(themeKey, isDarkMode ? 'dark' : 'light');
      } catch (error) {
        // Local storage can be unavailable in some browser contexts.
      }
    });
  }
});
