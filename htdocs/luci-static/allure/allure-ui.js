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

  /* Crossing into the drawer breakpoint closes an open drawer; rotating or
     resizing back to desktop leaves it closed as well. */
  var bp = window.matchMedia ? window.matchMedia('(max-width: 820px)') : null;
  if (bp) {
    var onBreakpoint = function(e){ if (e.matches) document.body.classList.remove('allure-drawer-open'); };
    if (bp.addEventListener) bp.addEventListener('change', onBreakpoint);
    else if (bp.addListener) bp.addListener(onBreakpoint);
  }

  /* Some app views render every tab section flat inside .cbi-map-tabbed and
     only hide the inner content, leaving empty bordered shells stacked above
     the active tab. Hide each inactive data-tab section outright; the active
     one stays exactly as the app rendered it.
     Bootstrap's cascade.css collapses every [data-tab-title] panel
     (height:0;opacity:0;overflow:hidden) and only re-opens the one carrying
     [data-tab-active="true"]. Tab switching on these flat maps moves the
     li classes but never moves that attribute, so every tab after the first
     stays invisible. Mirror the attribute onto the active section here. */
  /* The themed scroll indicator is inserted right after overflowing .cbi-tabmenu
     strips (allure-tab-icons.js). LuCI's switchTab() locates the pane group via
     menu.nextElementSibling, so on narrow screens it would land on the indicator
     div instead of the real pane container and data-tab-active would never move —
     tabs highlight but content stays on the first tab. Mirror the active li's
     data-tab onto the panes here, skipping the indicator element. */
  function syncTabMenus() {
    document.querySelectorAll('.cbi-tabmenu').forEach(function(menu) {
      var active = menu.querySelector('li.cbi-tab[data-tab]');
      if (!active) return;
      var name = active.getAttribute('data-tab');
      var group = menu.nextElementSibling;
      while (group && group.classList && group.classList.contains('allure-scrollbar'))
        group = group.nextElementSibling;
      if (!group || !group.childNodes) return;
      Array.prototype.forEach.call(group.childNodes, function(pane) {
        if (pane.nodeType !== 1 || !pane.matches || !pane.matches('[data-tab]')) return;
        var on = pane.getAttribute('data-tab') === name ? 'true' : 'false';
        if (pane.getAttribute('data-tab-active') !== on)
          pane.setAttribute('data-tab-active', on);
      });
    });
  }
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
        var isActive = !!name && sec.getAttribute('data-tab') === name;
        sec.hidden = !!name && !isActive;
        if (!sec.hasAttribute('data-tab-title')) return;
        /* No named active tab keeps the old show-everything behavior, so the
           attribute has to go on every section or bootstrap would collapse them. */
        if (isActive || !name) sec.setAttribute('data-tab-active', 'true');
        else sec.removeAttribute('data-tab-active');
      });
    });
  }
  var syncPending = false;
  function scheduleSync() {
    if (syncPending) return;
    syncPending = true;
    requestAnimationFrame(function(){ syncPending = false; syncTabMenus(); syncTabbedSections(); });
  }
  function watchTabbedSections() {
    /* Watch the whole body so tab strips inside LuCI modals (#modal_overlay)
       are covered too; only class mutations are observed. */
    if (typeof MutationObserver === 'undefined') return;
    new MutationObserver(scheduleSync).observe(document.body, {
      childList: true, subtree: true, attributes: true, attributeFilter: ['class']
    });
    scheduleSync();
  }

  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', function(){ apply(getMode()); if (window.AllureI18n) window.AllureI18n.translate(document.body); watchTabbedSections(); });
  else { apply(getMode()); if (window.AllureI18n) window.AllureI18n.translate(document.body); watchTabbedSections(); }
})();
