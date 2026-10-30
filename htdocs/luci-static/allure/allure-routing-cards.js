/* Allure 2.0 | opt-in rendering aid for short, simple routing-rule tables.
 * No event handlers, DOM reorder, table removal, data mutation or fetches.
 * Complex LuCI tables remain untouched and horizontally scrollable.
 */
(function () {
 'use strict';
 function maybeStack(table){
   if (table.dataset.allureRoutingScanned === 'yes') return;
   if (table.closest('.xterm,.CodeMirror,.ace_editor,.monaco-editor,[data-allure-ignore]')) return;
   const header=table.querySelector(':scope > thead > tr');
   const body=table.querySelector(':scope > tbody');
   if (!header || !body || table.querySelector('table')) return;
   const cols=Array.from(header.children);
   const rows=Array.from(body.children);
   if (cols.length<3 || cols.length>5 || rows.length<1 || rows.length>12) return;
   const names=cols.map(el=>(el.textContent||'').trim().replace(/\s+/g,' ').slice(0,35));
   const test=names.map(x=>x.toLowerCase());
   if (!test.some(x=>/^(имя|название|name)$/.test(x)) ||
       !test.some(x=>/^(включить|вкл|enabled|enable)$/.test(x)) ||
       !test.some(x=>/^(действие|action|маршрут|route)$/.test(x))) return;
   if (rows.some(row=>row.children.length!==cols.length || row.querySelector('[colspan],[rowspan],table'))) return;
   rows.forEach(row=>Array.from(row.children).forEach((cell,i)=>cell.setAttribute('data-allure-label',names[i])));
   table.dataset.allureRoutingScanned='yes';
   table.classList.add('allure-routing-cards');
 }
 function scan(root){
   if (root.matches && root.matches('table')) maybeStack(root);
   if (root.querySelectorAll) root.querySelectorAll('table').forEach(maybeStack);
 }
 function init(){
   const root=document.getElementById('maincontent');if(!root) return;
   scan(root);
   let pending=false;
   new MutationObserver(()=>{
      if (!pending){pending=true;requestAnimationFrame(()=>{pending=false;scan(root)});}
   }).observe(root,{childList:true,subtree:true});
 }
 if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init);
 else init();
})();
