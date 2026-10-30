/* Allure 1.6.1 mobile enhancement — presentation only.
 * Attaches data-labels to simple tables and tags a tab bar in third-party pages.
 * Does not replace nodes, mutate form values, handle clicks or intercept requests.
 */
(function() {
  'use strict';
  if (!document.body || !document.body.classList.contains('allure')) return;
  var root = document.querySelector('.allure-content');
  if (!root) return;
  function text(node) { return (node && node.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 56); }
  function enhanceTable(table) {
    if (table.dataset.allureNoCards === '1') return;
    if (table.closest('.allure-dashboard, .terminal, pre, .cbi-dropdown')) return;
    var nativeTable = table.tagName === 'TABLE';
    var allRows = nativeTable ? Array.from(table.querySelectorAll(':scope > tbody > tr, :scope > tr')) : Array.from(table.querySelectorAll(':scope > .tr'));
    if (!allRows.length) return;
    var head = nativeTable ? table.querySelector(':scope > thead > tr') : allRows.find(function(row) { return row.classList.contains('table-titles') || row.classList.contains('cbi-section-table-titles'); });
    if (!head && nativeTable && allRows[0].querySelector('th')) head = allRows[0];
    if (!head) return;
    var headerSelector = nativeTable ? ':scope > th, :scope > td' : ':scope > .th';
    var heads = Array.from(head.querySelectorAll(headerSelector));
    if (heads.length < 2 || heads.length > 6) return;
    var labels = heads.map(text);
    if (labels.filter(Boolean).length < 2) return;
    var dataRows = allRows.filter(function(row){ return row !== head && !row.classList.contains('table-titles') && !row.classList.contains('cbi-section-table-titles'); });
    if (!dataRows.length) return;
    var valid = dataRows.every(function(row) {
      var cells = Array.from(row.querySelectorAll(nativeTable ? ':scope > td' : ':scope > .td'));
      return cells.length === labels.length && !cells.some(function(cell) { return Number(cell.getAttribute('colspan') || 1) > 1 || Number(cell.getAttribute('rowspan') || 1) > 1; });
    });
    if (!valid) { table.classList.remove('allure-mobile-cardtable'); return; }
    if (nativeTable && head.parentElement && head.parentElement.tagName !== 'THEAD') head.classList.add('allure-mobile-head');
    dataRows.forEach(function(row) {
      Array.from(row.querySelectorAll(nativeTable ? ':scope > td' : ':scope > .td')).forEach(function(cell, idx) {
        cell.setAttribute('data-allure-label', labels[idx] || '—');
      });
    });
    table.classList.add('allure-mobile-cardtable');
  }
  function enhanceTabStrips() {
    // Forkop and similar packages may render a tab list without the LuCI tab class.
    root.querySelectorAll('nav, ul, div').forEach(function(node) {
      if (node.classList.contains('allure-mobile-tabstrip') || node.children.length < 4 || node.children.length > 16) return;
      var items = Array.from(node.children);
      var clicks = items.map(function(el) {
        if (el.matches('a,button,[role="tab"]')) return el;
        if (el.matches('li,.cbi-tab') && el.children.length === 1 && el.firstElementChild.matches('a,button,[role="tab"]')) return el.firstElementChild;
        return null;
      });
      if (clicks.some(function(el) { return !el; })) return;
      var labels = clicks.map(text).join(' ').toLowerCase();
      var hints = ['секции','vpn-сервер','настройки','статус','дашборд','мониторинг','логи','компоненты','sections','monitoring'];
      var matches = hints.filter(function(word) { return labels.indexOf(word) !== -1; }).length;
      if (matches >= 3) node.classList.add('allure-mobile-tabstrip');
    });
  }
  function scan() {
    root.querySelectorAll('table, .table').forEach(enhanceTable);
    enhanceTabStrips();
  }
  var pending = false;
  function scheduleScan() { if (pending) return; pending = true; requestAnimationFrame(function(){ pending=false; scan(); }); }
  scan();
  var observer = new MutationObserver(function(records) {
    if (records.some(function(m) { return m.addedNodes.length || m.removedNodes.length; })) scheduleScan();
  });
  observer.observe(root, {subtree:true,childList:true});
})();
