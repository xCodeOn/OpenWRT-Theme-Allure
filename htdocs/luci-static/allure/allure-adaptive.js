/* Allure 1.7 — progressive visual enhancements for LuCI and third-party applications.
 * Does not replace elements, alter form values, bind application actions or dispatch clicks.
 * Efficiently reacts to async changes, and can be opted out with data-allure-ignore.
 */
(function () {
  'use strict';
  const root = document.getElementById('maincontent');
  if (!root || !document.body.classList.contains('allure')) return;
  const selector = [
    '[role="tablist"]', '.nav-tabs', '.tab-bar', '.tab-list', '.forkop-app-tabs',
    '.luci-app-tabs', '[data-allure-role="tabs"]',
    '.cbi-page-actions', '.cbi-title-buttons', '.cbi-section-actions', '.form-actions',
    '.btn-toolbar', '[data-allure-role="actions"]',
    'table', '.table', '[data-allure-role="table"]',
    '[data-allure-role="card"]', '.cbi-section', '.panel', '.card', '.well'
  ].join(',');
  const excluded = '[data-allure-ignore], .xterm, .monaco-editor, .ace_editor, .CodeMirror, .terminal, .allure-dashboard, .allure-raw';
  const icons = {
    grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>',
    wifi: '<path d="M2 9a16 16 0 0 1 20 0M5 13a11 11 0 0 1 14 0M8 17a6 6 0 0 1 8 0M12 21h.01"/>',
    chart: '<path d="M3 3v18h18M7 16l4-4 3 2 6-7"/>',
    sliders: '<path d="M4 7h8M16 7h4M4 17h3M11 17h9"/><circle cx="14" cy="7" r="2"/><circle cx="9" cy="17" r="2"/>',
    link: '<path d="M10 13a5 5 0 0 0 7 .5l3-3a5 5 0 0 0-7-7l-2 2M14 11a5 5 0 0 0-7-.5l-3 3a5 5 0 0 0 7 7l2-2"/>',
    file: '<path d="M5 2h9l5 5v15H5V2Z"/><path d="M14 2v6h5M8 12h8M8 16h8"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.9 4.9l2.8 2.8m8.6 8.6 2.8 2.8m0-14.2-2.8 2.8M7.7 16.3l-2.8 2.8"/>',
    box: '<path d="m12 2 9 5v10l-9 5-9-5V7l9-5Z"/><path d="m3 7 9 5 9-5M12 12v10"/>',
    code: '<rect x="2" y="3" width="20" height="18" rx="2"/><path d="m6 9 3 3-3 3M12 16h5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l4 2"/>',
    network: '<rect x="9" y="2" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="16" y="16" width="6" height="6" rx="1"/><path d="M12 8v4M5 16v-4h14v4"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
    download: '<path d="M12 3v12m-5-5 5 5 5-5M4 18v3h16v-3"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/>',
    activity: '<path d="M3 12h4l3-8 4 16 3-8h4"/>',
    disk: '<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 14h.01M10 14h.01M2 10h20"/>',
    power: '<path d="M12 2v10M6 5a9 9 0 1 0 12 0"/>'
  };
  const matches = [
    [/firewall|безопас|правил|security|rule|adblock/i,'shield'],
    [/vpn|proxy|tunnel|туннел|wireguard|openvpn|tailscale|zerotier/i,'link'],
    [/wi-?fi|wireless|беспровод|радио/i,'wifi'],
    [/traffic|трафик|монитор|график|dashboard|дашборд|statistics|статистик/i,'chart'],
    [/setting|настрой|конфигурац|config|advanced|параметр/i,'settings'],
    [/dns|dhcp|lan|wan|network|сетев|интерфейс|маршрут/i,'network'],
    [/logs?|журнал|логи|истори|history/i,'file'],
    [/terminal|терминал|command|console|команд/i,'code'],
    [/package|компонент|пакет|plugin|extension|секци|section/i,'box'],
    [/status|статус|состояни|health|сводка/i,'activity'],
    [/schedule|crontab|планиров|время/i,'clock'],
    [/disk|storage|mount|хранилищ|диск|монтирован/i,'disk'],
    [/search|поиск|диагност/i,'search'],
    [/download|export|скачать|выгруз/i,'download'],
    [/startup|запуск|service|служб/i,'power']
  ];
  function eligible(el) {
    return el instanceof HTMLElement && !el.closest(excluded);
  }
  function glyph(name) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
    svg.setAttribute('viewBox','0 0 24 24');
    svg.setAttribute('fill','none'); svg.setAttribute('stroke','currentColor');
    svg.setAttribute('stroke-width','1.75');svg.setAttribute('stroke-linecap','round');
    svg.setAttribute('stroke-linejoin','round');svg.setAttribute('aria-hidden','true');
    svg.classList.add('allure-adaptive-icon');
    svg.innerHTML = icons[name] || icons.box; // only literals from this built-in atlas
    return svg;
  }
  function addTabIcon(link) {
    if (link.dataset.allureAutoIcon || link.dataset.allureIconDone === '1') return;
    if (link.querySelector('svg, img, picture, .icon, .allure-tab-icon, .allure-adaptive-icon')) return;
    const label = (link.textContent || '').replace(/\s+/g,' ').trim().slice(0,100);
    if (!label || link.closest('.dropdown-menu')) return;
    let kind = 'grid';
    for (const pair of matches) if (pair[0].test(label)) { kind=pair[1];break; }
    link.insertBefore(glyph(kind),link.firstChild);
    link.dataset.allureAutoIcon = '1';
  }
  function enhance(el) {
    if (!eligible(el)) return;
    const force = el.dataset.allureRole;
    if (force==='tabs' || el.matches('[role="tablist"], .nav-tabs, .tab-bar, .tab-list, .forkop-app-tabs, .luci-app-tabs')) {
      el.classList.add('allure-auto-tabs');
      const links = el.querySelectorAll(':scope > a, :scope > button, :scope > li > a, :scope > li > button, :scope > [role="tab"]');
      // Only add accents to nav items, never attach click handlers or modify routes.
      links.forEach(addTabIcon);
    } else if (force==='actions' || el.matches('.cbi-page-actions, .cbi-title-buttons, .cbi-section-actions, .form-actions, .btn-toolbar')) {
      el.classList.add('allure-auto-actions');
    } else if (force==='table' || el.matches('table, .table')) {
      if (!el.closest('table, .table') || el.closest('table, .table')===el) {
        el.classList.add('allure-auto-table');
        // Existing 1.6.1 table adapter remains responsible for optional mobile cards.
        // All other tables retain their natural DOM and are scrollable on phones.
      }
    } else if (force==='card' || el.matches('.cbi-section, .panel, .card, .well')) {
      // Scope decorative cards without restyling terminal output, dialogs or nested inputs.
      if (!el.closest('.allure-auto-card')) el.classList.add('allure-auto-card');
    }
  }
  function scan(scope) {
    if (!scope) return;
    if (scope !== root && scope.matches && scope.matches(selector)) enhance(scope);
    const list = scope.querySelectorAll ? scope.querySelectorAll(selector) : [];
    list.forEach(enhance);
  }
  scan(root);
  let queue = new Set(), scheduled = false;
  function flush() {
    scheduled=false;
    const current=queue;queue=new Set();
    current.forEach(node=>{ if(node.isConnected && root.contains(node)) scan(node); });
  }
  const watcher = new MutationObserver(records=>{
    for (const record of records) {
      for (const node of record.addedNodes) {
        if (node.nodeType !== 1) continue;
        // Avoid recursing on our own injected SVGs.
        if (node.matches && node.matches('.allure-adaptive-icon, .allure-tab-icon')) continue;
        queue.add(node);
      }
    }
    if (queue.size && !scheduled) {
      scheduled=true;
      window.requestAnimationFrame(flush);
    }
  });
  watcher.observe(root, { childList:true, subtree:true });
  window.AllureAdaptive = { rescan:()=>scan(root), version:'1.7.0' };
})();
