(function () {
  var STORAGE_KEY = 'elite-theme';

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    var btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.textContent = theme === 'light' ? '🌙' : '☀️';
      btn.setAttribute('aria-label', theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
    }
  }

  // Apply immediately to avoid flash of wrong theme
  var saved = '';
  try { saved = localStorage.getItem(STORAGE_KEY) || ''; } catch (e) {}
  applyTheme(saved === 'light' ? 'light' : 'dark');

  document.addEventListener('DOMContentLoaded', function () {
    // Re-apply to update button text once DOM is ready
    var current = document.documentElement.getAttribute('data-theme') || 'dark';
    applyTheme(current);

    var btn = document.getElementById('theme-toggle');
    if (!btn) return;

    btn.addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      try { localStorage.setItem(STORAGE_KEY, next); } catch (e) {}
      applyTheme(next);
    });
  });
}());
