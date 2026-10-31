/* Inline SVG accents on LuCI tabs; supports tabs added asynchronously. */
(function () {
  'use strict';
  const art = {
    network:'<rect x="9" y="2" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="16" y="16" width="6" height="6" rx="1"/><path d="M12 8v4M5 16v-4h14v4"/>',
    wifi:'<path d="M2 8.8a16 16 0 0 1 20 0M5 12a11 11 0 0 1 14 0M8.5 15.5a6 6 0 0 1 7 0M12 19h.01"/>',
    shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
    cpu:'<rect x="5" y="5" width="14" height="14" rx="2"/><path d="M9 9h6v6H9zM9 1v4M15 1v4M9 19v4M15 19v4M1 9h4M1 15h4M19 9h4M19 15h4"/>',
    chart:'<path d="M3 3v18h18M7 16l4-4 3 2 6-7"/>',
    settings:'<circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.9 4.9l2.8 2.8m8.6 8.6 2.8 2.8m0-14.2-2.8 2.8M7.7 16.3l-2.8 2.8"/>',
    lock:'<rect x="4" y="11" width="16" height="11" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    file:'<path d="M5 2h9l5 5v15H5V2Z"/><path d="M14 2v6h5M8 12h8M8 16h8"/>',
    globe:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2c-6 6-6 14 0 20M12 2c6 6 6 14 0 20"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l4 2"/>',
    arrows:'<path d="M4 7h16m-4-4 4 4-4 4M20 17H4m4-4-4 4 4 4"/>',
    box:'<path d="m12 2 9 5v10l-9 5-9-5V7l9-5Z"/><path d="m3 7 9 5 9-5M12 12v10"/>'
  };
  const rules = [
    [/wireless|wi-?fi|радио|беспровод/i,'wifi'],[/firewall|межсетев|брандмауэр|правила|rules/i,'shield'],
    [/vpn|security|password|ключ|безопас|парол/i,'lock'],[/graph|traffic|график|трафик|statistic|статистик/i,'chart'],
    [/log|журнал/i,'file'],[/time|врем|schedule|расписан/i,'clock'],
    [/network|wan|lan|interface|интерфейс|сетев|сеть/i,'network'],
    [/system|cpu|процессор|систем/i,'cpu'],[/settings|advanced|настройк|дополнительно/i,'settings'],
    [/route|маршрут|transfer|port|порт/i,'arrows'],[/dns|internet|интернет/i,'globe']
  ];
  function makeIcon(kind) {
    const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
    svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('fill','none');svg.setAttribute('stroke','currentColor');
    svg.setAttribute('stroke-width','1.8');svg.setAttribute('stroke-linecap','round');svg.setAttribute('stroke-linejoin','round');
    svg.setAttribute('aria-hidden','true');svg.classList.add('allure-tab-icon');
    svg.innerHTML=art[kind]||art.box;return svg;
  }
  function decorate() {
    const main=document.getElementById('maincontent');if(!main)return;
    main.querySelectorAll('#tabmenu a, .cbi-tabmenu a, .tabs a').forEach(function(link){
      if (link.dataset.allureIconDone==='1')return;
      link.dataset.allureIconDone='1';
      const label=link.textContent.trim();
      let kind='box';for(const [regex,name] of rules){if(regex.test(label)){kind=name;break;}}
      link.prepend(makeIcon(kind));
    });
  }
  /* Mobile: map table-button labels to compact icons (CSS renders them icon-only). */
  const BTN_ICONS = [
    [/^(edit|изменить|редактировать)$/i,'edit'],
    [/^(delete|удалить|remove)$/i,'trash'],
    [/^(restart|перезапустить|reboot|перезагрузить)$/i,'rotate'],
    [/^(reload|перечитать)$/i,'reload'],
    [/^(start|запустить)$/i,'play'],
    [/^(stop|terminate|остановить|прервать)$/i,'stop'],
    [/^(kill|disconnect|отключить)$/i,'x'],
    [/^hang ?up$/i,'hangup'],
    [/^(enabled|enable|disable|включено|включить|отключить)$/i,'power'],
    [/^(save|сохранить|ok|apply|применить|confirm|подтвердить|dismiss)$/i,'check'],
    [/^(install|установить|update lists|обновить списки|generate archive|download backup|скачать)$/i,'download'],
    [/^(upload package|upload archive|restore|восстановить)$/i,'upload'],
    [/^(configure apk|настроить)$/i,'gear'],
    [/^(scan|поиск)$/i,'search'],
    [/^(add|добавить)$/i,'plus'],
    [/^reserve ip$/i,'pin'],
    [/^(reset|perform reset|сбросить|сброс)$/i,'rotate'],
    [/^(update)$/i,'rotate']
  ];
  function decorateButtons(root){
    if(!root.querySelectorAll)return;
    root.querySelectorAll('td button, td .cbi-button, th button, th .cbi-button').forEach(function(b){
      if (b.dataset.allureIconDone==='1')return;
      b.dataset.allureIconDone='1';
      if (b.closest('.cbi-page-actions, .controls'))return;
      const label=(b.textContent||'').trim();
      for (const [re,name] of BTN_ICONS){ if(re.test(label)){ b.dataset.allureIcon=name; return; } }
    });
  }
  /* Themed horizontal-scroll indicator for tables and tab strips that overflow on mobile. */
  function updateScrollbar(el, inline){
    const fits = el.scrollWidth <= el.clientWidth + 6;
    if (fits) {
      el.classList.remove('allure-hscroll');
      const old = el.nextElementSibling;
      if (old && old.classList && old.classList.contains('allure-scrollbar')) old.remove();
      return;
    }
    el.classList.add('allure-hscroll');
    let ind = el.nextElementSibling;
    if (!ind || !ind.classList || !ind.classList.contains('allure-scrollbar')) {
      ind = document.createElement('div');
      ind.className = 'allure-scrollbar' + (inline ? ' allure-scrollbar-inline' : '');
      ind.setAttribute('aria-hidden', 'true');
      ind.appendChild(document.createElement('span'));
      el.after(ind);
    } else {
      ind.classList.toggle('allure-scrollbar-inline', !!inline);
    }
    const span = ind.firstChild;
    const w = Math.max(14, Math.round((el.clientWidth / el.scrollWidth) * 100));
    const travel = 100 - w;
    const pos = el.scrollWidth > el.clientWidth ? (el.scrollLeft / (el.scrollWidth - el.clientWidth)) * travel : 0;
    span.style.width = w + '%';
    span.style.left = pos + '%';
  }
  function scanScrollbars(root){
    const mobile = window.innerWidth <= 820;
    root.querySelectorAll('.allure-hscroll').forEach(function(t){
      if (!mobile) {
        t.classList.remove('allure-hscroll');
        const old = t.nextElementSibling;
        if (old && old.classList && old.classList.contains('allure-scrollbar')) old.remove();
      }
    });
    if (!mobile) return;
    root.querySelectorAll('table.table, .table, .cbi-tabmenu, .tabs, #tabmenu').forEach(function(el){
      if (el.dataset.allureScrollInit !== '1') {
        el.dataset.allureScrollInit = '1';
        el.addEventListener('scroll', function(){ updateScrollbar(el); }, { passive: true });
      }
      updateScrollbar(el, el.matches('.cbi-tabmenu, .tabs, #tabmenu'));
      if (el.matches('.cbi-tabmenu, .tabs, #tabmenu')) el.classList.toggle('allure-tabs-centered', el.scrollWidth <= el.clientWidth + 6);
    });
  }

  function ready(){
    const main=document.getElementById('maincontent');if(!main)return;
    /* Scan the whole body so LuCI modals (#modal_overlay) get indicators too. */
    const scanRoot=document.body;
    decorate();
    decorateButtons(main);
    scanScrollbars(scanRoot);
    let pending=false;
    const observer=new MutationObserver(function(){
      if(!pending){pending=true;requestAnimationFrame(function(){pending=false;decorate();decorateButtons(main);scanScrollbars(scanRoot);});}
    });
    observer.observe(scanRoot,{subtree:true,childList:true});
    let rzPending=false;
    window.addEventListener('resize', function(){
      if(!rzPending){rzPending=true;requestAnimationFrame(function(){rzPending=false;scanScrollbars(scanRoot);});}
    }, { passive: true });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready);
  else ready();
})();
