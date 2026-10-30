/* Allure 1.8: lightweight, non-destructive integrations for asynchronously rendered LuCI views.
 * Only classifies presentational DOM elements. No click handlers or change events on app forms.
 */
(function () {
  'use strict';
  function adaptTable(table) {
    if (table.matches('[data-allure-no-cards], [data-allure-ignore]') ||
        table.closest('.allure-dashboard,.terminal,.xterm,.CodeMirror,.ace_editor,.monaco-editor,[data-allure-ignore]')) return;
    const isNative = table.tagName === 'TABLE';
    const directRows = isNative
      ? [...table.querySelectorAll(':scope > tbody > tr,:scope > tr')]
      : [...table.querySelectorAll(':scope > .tr')];
    if (!directRows.length || directRows.length > 81) return;
    const head = isNative
      ? table.querySelector(':scope > thead > tr') || directRows.find(r => r.querySelector(':scope > th'))
      : directRows.find(r=>r.classList.contains('table-titles') || r.classList.contains('cbi-section-table-titles'));
    if (!head) return;
    const cols = [...head.querySelectorAll(isNative ? ':scope > th,:scope > td' : ':scope > .th')];
    if (cols.length < 2 || cols.length > 6) return;
    const labels = cols.map(c => (c.textContent || '').replace(/\\s+/g, ' ').trim().slice(0,45));
    if (labels.some(s=>!s)) return;
    const rows = directRows.filter(r=>r!==head && !r.classList.contains('table-titles'));
    if (!rows.length || rows.some(row => {
      const cells = [...row.querySelectorAll(isNative ? ':scope > td' : ':scope > .td')];
      return cells.length !== cols.length || cells.some(c => c.hasAttribute('colspan') || c.hasAttribute('rowspan'));
    })) return;
    rows.forEach(row => [...row.querySelectorAll(isNative ? ':scope > td' : ':scope > .td')]
      .forEach((c,i) => c.dataset.allureLabel = labels[i]));
    if (isNative && head.parentElement.tagName !== 'THEAD') head.classList.add('allure-mobile-head');
    table.classList.add('allure-mobile-cards');
  }
  function ready() {
    const root = document.getElementById('maincontent');
    if (!root || !document.body.classList.contains('allure')) return;
    const ignored = '.xterm,.CodeMirror,.ace_editor,.monaco-editor,.terminal,pre,[data-allure-ignore],iframe';
    const selector = '.cbi-page-actions,.form-actions,.nav-tabs,.tab-list,.tab-bar,.forkop-app-tabs,[role="tablist"],table,.table';
    function decorate(scope) {
      if (!(scope instanceof Element)) return;
      const nodes = scope.matches(selector) ? [scope] : [];
      scope.querySelectorAll(selector).forEach(el => nodes.push(el));
      for (const node of nodes) {
        if (node.closest(ignored)) continue;
        if (node.matches('.cbi-page-actions,.form-actions')) node.classList.add('allure-auto-actions');
        else if (node.matches('.nav-tabs,.tab-list,.tab-bar,.forkop-app-tabs,[role="tablist"]')) node.classList.add('allure-auto-tabs');
        else {node.classList.add('allure-auto-table'); adaptTable(node);}
      }
    }
    decorate(root);
    let pending = new Set(), request = false;
    const observer = new MutationObserver(records => {
      for (const record of records)
        for (const node of record.addedNodes)
          if (node.nodeType === 1 && node !== root) pending.add(node);
      if (pending.size && !request) {
        request = true;
        requestAnimationFrame(() => {
          request = false;
          const queue = pending; pending = new Set();
          queue.forEach(node => {if (node.isConnected && root.contains(node)) decorate(node);});
        });
      }
    });
    observer.observe(root, {childList:true,subtree:true});
    window.AllureRefined = {version:'1.8.0',refresh:()=>decorate(root)};
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',ready);
  else ready();
})();
