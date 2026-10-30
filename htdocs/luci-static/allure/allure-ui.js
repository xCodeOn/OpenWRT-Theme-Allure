/* Simple appearance manager — no third-party dependencies, no router writes. */
(function() {
  'use strict';
  var key = 'allure:appearance';
  var media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  function getMode() {
    try { return localStorage.getItem(key) || 'auto'; } catch(e) { return 'auto'; }
  }
  function apply(mode) {
    var dark = mode === 'dark' || (mode === 'auto' && media && media.matches);
    document.documentElement.dataset.darkmode = String(!!dark);
    document.documentElement.dataset.allureMode = mode;
    document.querySelectorAll('[data-allure-theme]').forEach(function(button) {
      button.classList.toggle('selected', button.dataset.allureTheme === mode);
      button.setAttribute('aria-pressed', button.dataset.allureTheme === mode ? 'true' : 'false');
    });
  }
  document.addEventListener('click', function(event) {
    var b = event.target.closest('[data-allure-theme]');
    if (b) {
      var mode = b.dataset.allureTheme;
      if (!['dark','light','auto'].includes(mode)) return;
      try { localStorage.setItem(key, mode); } catch(e) {}
      apply(mode);
    }
    if (event.target.closest('#allure-menu-button'))
      document.body.classList.toggle('allure-drawer-open');
    if (event.target.closest('#allure-overlay') || event.target.closest('.allure-nav-link'))
      document.body.classList.remove('allure-drawer-open');
  });
  if (media) {
    var changed = function(){ if (getMode() === 'auto') apply('auto'); };
    if (media.addEventListener) media.addEventListener('change', changed);
    else if (media.addListener) media.addListener(changed);
  }
  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', function(){ apply(getMode()); });
  else apply(getMode());
})();
