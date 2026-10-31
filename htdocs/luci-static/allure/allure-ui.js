/* Simple appearance manager — no third-party dependencies, no router writes. */
(function() {
  'use strict';
  var key = 'allure:appearance';
  var media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  function getMode() {
    try { return localStorage.getItem(key) || document.documentElement.dataset.allureMode || 'auto'; } catch(e) { return document.documentElement.dataset.allureMode || 'auto'; }
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

  /* Some app views render every tab section flat inside .cbi-map-tabbed and
     only hide the inner content, leaving empty bordered shells stacked above
     the active tab. Hide each inactive data-tab section outright; the active
     one stays exactly as the app rendered it. */
  function syncTabbedSections() {
    var root = document.getElementById('maincontent');
    if (!root) return;
    root.querySelectorAll('.cbi-map').forEach(function(map) {
      var menu = null;
      map.querySelectorAll('.cbi-tabmenu').forEach(function(m) {
        if (!menu && m.querySelector('li.cbi-tab[data-tab]')) menu = m;
      });
      var body = map.querySelector('.cbi-map-tabbed');
      if (!menu || !body) return;
      var active = menu.querySelector('li.cbi-tab[data-tab]');
      var name = active ? active.getAttribute('data-tab') : null;
      body.querySelectorAll(':scope > .cbi-section[data-tab]').forEach(function(sec) {
        sec.hidden = !!name && sec.getAttribute('data-tab') !== name;
      });
    });
  }
  var syncPending = false;
  function scheduleSync() {
    if (syncPending) return;
    syncPending = true;
    requestAnimationFrame(function(){ syncPending = false; syncTabbedSections(); });
  }
  function watchTabbedSections() {
    var root = document.getElementById('maincontent');
    if (!root || typeof MutationObserver === 'undefined') return;
    new MutationObserver(scheduleSync).observe(root, {
      childList: true, subtree: true, attributes: true, attributeFilter: ['class']
    });
    scheduleSync();
  }

  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', function(){ apply(getMode()); if (window.AllureI18n) window.AllureI18n.translate(document.body); watchTabbedSections(); });
  else { apply(getMode()); if (window.AllureI18n) window.AllureI18n.translate(document.body); watchTabbedSections(); }
})();
