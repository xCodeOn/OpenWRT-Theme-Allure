'use strict';
'require baseclass';
'require ui';

/* Self-contained Lucide-style SVG icon atlas. No CDN or icon font required.
 * Names resolve first by route, then by translated title; unknown apps
 * receive a generic package icon rather than an empty square. */
const ICONS = {
  layout:'<rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>',
  activity:'<path d="M3 12h4l3-8 4 16 3-8h4"/>',
  server:'<rect x="3" y="3" width="18" height="7" rx="2"/><rect x="3" y="14" width="18" height="7" rx="2"/><path d="M7 6.5h.01M7 17.5h.01"/>',
  network:'<rect x="9" y="2" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="16" y="16" width="6" height="6" rx="1"/><path d="M12 8v4M5 16v-4h14v4"/>',
  wifi:'<path d="M2 8.8a16 16 0 0 1 20 0M5 12a11 11 0 0 1 14 0M8.5 15.5a6 6 0 0 1 7 0M12 19h.01"/>',
  shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
  settings:'<path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"/><path d="M19.4 15.1 21 16l-2 3.5-1.8-.7a9 9 0 0 1-2.1 1.2L14.8 22h-4l-.3-2a9 9 0 0 1-2.1-1.2l-1.8.7-2-3.5 1.6-.9a8 8 0 0 1 0-2.4L4.6 11l2-3.5 1.8.7a9 9 0 0 1 2.1-1.2l.3-2h4l.3 2a9 9 0 0 1 2.1 1.2l1.8-.7 2 3.5-1.6.9a8 8 0 0 1 0 2.4Z" transform="translate(0 -2)"/>',
  box:'<path d="m12 2 9 5v10l-9 5-9-5V7l9-5Z"/><path d="m3 7 9 5 9-5M12 12v10"/>',
  terminal:'<rect x="2" y="3" width="20" height="18" rx="2"/><path d="m6 9 3 3-3 3M12 16h5"/>',
  file:'<path d="M5 2h9l5 5v15H5V2Z"/><path d="M14 2v6h5M8 12h8M8 16h8"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l4 2"/>',
  cpu:'<rect x="5" y="5" width="14" height="14" rx="2"/><path d="M9 9h6v6H9zM9 1v4M15 1v4M9 19v4M15 19v4M1 9h4M1 15h4M19 9h4M19 15h4"/>',
  arrows:'<path d="M4 7h16m-4-4 4 4-4 4M20 17H4m4-4-4 4 4 4"/>',
  globe:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2c-6 6-6 14 0 20M12 2c6 6 6 14 0 20"/>',
  thermometer:'<path d="M14 14.8V5a3 3 0 0 0-6 0v9.8a5 5 0 1 0 6 0Z"/><path d="M11 10v8"/>',
  harddrive:'<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 14h.01M10 14h.01M2 10h20"/>',
  refresh:'<path d="M20 7V3h-4M4 17v4h4M4 9a8 8 0 0 1 14-3l2 1M4 17l2 1a8 8 0 0 0 14-3"/>',
  download:'<path d="M12 3v12m-5-5 5 5 5-5M4 18v3h16v-3"/>',
  upload:'<path d="M12 17V5m-5 5 5-5 5 5M4 18v3h16v-3"/>',
  users:'<circle cx="9" cy="8" r="4"/><path d="M2 21v-2a7 7 0 0 1 14 0v2M16 4a4 4 0 0 1 0 8M19 14a6 6 0 0 1 3 5v2"/>',
  key:'<circle cx="8" cy="15" r="5"/><path d="m11.5 11.5 8-8L22 6l-3 3 2 2-3 3-2-2"/>',
  chart:'<path d="M3 3v18h18M7 16l4-4 3 2 6-7"/>',
  list:'<path d="M9 5h12M9 12h12M9 19h12M4 5h.01M4 12h.01M4 19h.01"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/>',
  calendar:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M7 2v4M17 2v4M3 10h18"/>',
  database:'<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 4 18 4 18 0V5M3 12c0 4 18 4 18 0"/>',
  plug:'<path d="M8 2v6m8-6v6M6 8h12v4a6 6 0 0 1-12 0V8ZM12 18v4"/>',
  bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
  link:'<path d="M10 13a5 5 0 0 0 7 .5l3-3a5 5 0 0 0-7-7l-2 2M14 11a5 5 0 0 0-7-.5l-3 3a5 5 0 0 0 7 7l2-2"/>',
  lock:'<rect x="4" y="11" width="16" height="11" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  route:'<circle cx="6" cy="18" r="3"/><circle cx="18" cy="6" r="3"/><path d="M9 18h5a4 4 0 0 0 0-8h-4a4 4 0 0 1 0-8"/>',
  power:'<path d="M12 2v10M6 5a9 9 0 1 0 12 0"/>',
  layers:'<path d="m12 2 9 6-9 6-9-6 9-6ZM3 12l9 6 9-6M3 16l9 6 9-6"/>',
  radio:'<circle cx="12" cy="12" r="2"/><path d="M7 7a7 7 0 0 0 0 10M17 7a7 7 0 0 1 0 10M4 4a11 11 0 0 0 0 16M20 4a11 11 0 0 1 0 16"/>'
};
const routes = {
  status:'activity',system:'settings',network:'network',services:'box',vpn:'shield',nas:'harddrive',
  allure:'layout',overview:'layout',realtime:'chart',realtime_graphs:'chart',syslog:'file',dmesg:'terminal',processes:'cpu',
  routes:'route',route:'route',network:'network',interfaces:'arrows',wireless:'wifi',firewall:'shield',
  diagnostics:'search',dhcp:'network',dhcpdns:'network',hosts:'server',hostnames:'server',
  administration:'users',admin:'key',system:'settings',software:'box',startup:'power',
  crontab:'calendar',flash:'upload',backup:'download',reboot:'refresh',leds:'bell',
  mounts:'harddrive',diskman:'harddrive',storage:'harddrive',logs:'file',statistics:'chart',
  sqm:'chart',qos:'chart',nlbw:'chart',bandwidth:'chart',adblock:'shield',
  wireguard:'shield',openvpn:'lock',openclash:'globe',passwall:'globe',
  ttyd:'terminal',terminal:'terminal',commands:'terminal',samba:'harddrive',
  usb:'plug',modem:'radio',ddns:'globe',upnp:'link',wol:'power',
  defaults:'settings',advanced:'settings',access:'key',status:'activity',
  overview:'layout',status_routes:'route',channel_analysis:'signal',channel:'signal',channels:'signal',
  sched:'calendar',scheduler:'calendar',crontab:'calendar',tasks:'calendar',
  mount:'harddrive',mounts:'harddrive',led:'bulb',leds:'bulb',
  flashops:'upload',sysupgrade:'refresh',upgrade:'refresh',backup:'download',
  restore:'upload',forkop:'box',ttyd:'terminal',shell:'terminal',
  dns:'globe',dhcp:'server',dhcpdns:'server',
  logout:'logout',login:'key',log:'file',systemlog:'file',kernel:'file',
  processes:'cpu',process:'cpu',monitor:'activity',realtime:'chart',
  iproutes:'route',routing:'route',mac80211:'radioTower',wireless:'wifi'
};
const titleIcons = [
  [/wi-?fi|wireless|беспровод/i,'wifi'],[/firewall|брандмауэр|межсетевой/i,'shield'],
  [/log|журнал/i,'file'],[/traffic|скорост|bandwidth|graph|график/i,'chart'],
  [/temperatur|thermal|температур/i,'thermometer'],[/backup|резерв|прошивк/i,'download'],
  [/software|пакет|plugin|приложени/i,'box'],[/vpn|tunnel|туннел/i,'shield'],
  [/user|администр|парол/i,'users'],[/storage|диск|mount|хранил/i,'harddrive'],
  [/dhcp|dns|имен|host|interface|интерфейс/i,'network'],
  [/service|сервис|служб/i,'layers'],[/settings|настройк/i,'settings'],
  [/system|систем/i,'cpu'],[/time|врем|scheduled|задач/i,'clock'],
  [/network|сет|маршрут/i,'network'],[/status|состояни/i,'activity'],
  [/modem|radio|радио/i,'radio'],[/reboot|перезагруз/i,'refresh'],
  [/диагност|diagnos/i,'search'],[/overview|обзор/i,'layout'],
  [/маршрутиз|routing|route/i,'route'],[/процесс|process/i,'cpu'],
  [/анализ канал|channel analysis/i,'signal'],[/монитор|monitor/i,'activity'],
  [/планиров|schedule|cron/i,'calendar'],[/монтирован|mount point/i,'harddrive'],
  [/индикатор|led|светодиод/i,'bulb'],[/обновлени систем|sysupgrade|firmware/i,'refresh'],
  [/восстановлен|restore/i,'upload'],[/перезагруз|reboot/i,'power'],
  [/терминал|terminal|ttyd/i,'terminal'],[/forkop/i,'box'],
  [/dns|днс/i,'globe'],[/dhcp/i,'server'],[/выход|logout|выйти/i,'logout']
];
function iconKey(node) {
  const name=String(node.name||'').toLowerCase().replace(/[^a-z0-9_]/g,'');
  if (routes[name]) return routes[name];
  const title=String(node.title||'');
  for (const pair of titleIcons) if (pair[0].test(title)) return pair[1];
  return 'box';
}
function svgFor(name) {
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
  svg.setAttribute('viewBox','0 0 24 24');
  svg.setAttribute('fill','none');svg.setAttribute('stroke','currentColor');
  svg.setAttribute('stroke-width','1.8');svg.setAttribute('stroke-linecap','round');
  svg.setAttribute('stroke-linejoin','round');svg.setAttribute('aria-hidden','true');
  svg.innerHTML=ICONS[name]||ICONS.box; // Strings are literals controlled by the theme.
  return svg;
}
function translated(text) {
  const loc=_(text||'');
  return window.AllureI18n ? window.AllureI18n.t(loc) : loc;
}
function activeUnder(path,current) {
  return path.every((part,i)=>current[i]===part);
}
return baseclass.extend({
  __init__() {
    ui.menu.load().then(tree=>this.render(tree)).catch(e=>console.error('Allure menu:',e));
  },
  render(tree) {
    const nav=document.getElementById('allure-nav'); if (!nav) return;
    nav.replaceChildren();
    const admin=ui.menu.getChildren(tree).find(node=>node.name==='admin');
    if (!admin) return;
    const current=L.env.requestpath||[];
    const title=document.getElementById('allure-breadcrumb-title');
    const onDash=current[1]==='status'&&current[2]==='allure';
    document.querySelector('.allure-home')?.classList.toggle('is-current',onDash);
    let pageTitle=onDash?translated('Control Center'):'';
    const appendItem=(parent,node,parentRoute,depth)=>{
      if (node.name==='allure') return;
      const route=parentRoute.concat(node.name), selected=current.length===route.length&&activeUnder(route,current);
      if(selected)pageTitle=translated(node.title);
      const nested=depth<3?ui.menu.getChildren(node).filter(n=>n.name!=='allure'):[];
      const holder=E('div',{'class':'allure-nav-entry'});
      const link=E('a',{'class':'allure-nav-link depth-'+depth+(selected?' active':''),'href':L.url.apply(L,route)});
      const glyph=E('span',{'class':'allure-menu-symbol'},[svgFor(iconKey(node))]);
      link.appendChild(glyph);link.appendChild(E('span',{'class':'allure-nav-text'},[translated(node.title)]));
      holder.appendChild(link);
      if(nested.length){
        const subs=E('div',{'class':'allure-nav-subitems'});
        const hasSelectedChild=activeUnder(route,current);
        const expander=E('button',{'type':'button','class':'allure-nav-expander','aria-label':translated('Show section'),'aria-expanded':hasSelectedChild?'true':'false'},['⌄']);
        const setSubOpen=(on)=>{subs.hidden=!on;expander.setAttribute('aria-expanded',String(on));holder.classList.toggle('sub-open',on);};
        expander.addEventListener('click',()=>setSubOpen(subs.hidden));
        link.after(expander);
        nested.forEach(sub=>appendItem(subs,sub,route,depth+1));
        holder.appendChild(subs);setSubOpen(hasSelectedChild);
      }
      parent.appendChild(holder);
    };
    ui.menu.getChildren(admin).forEach((section,i)=>{
      const group=E('section',{'class':'allure-nav-group'});
      const sectionRoute=['admin',section.name];
      const isActive=activeUnder(sectionRoute,current);
      const id='allure-group-'+i;
      const header=E('button',{'type':'button','class':'allure-nav-heading','aria-controls':id,'aria-expanded':'false'},[
        E('span',{'class':'allure-heading-icon'},[svgFor(iconKey(section))]),
        E('span',{'class':'allure-heading-label'},[translated(section.title)]),
        E('span',{'class':'allure-heading-chevron'},['⌄'])
      ]);
      const body=E('div',{'id':id,'class':'allure-nav-children'});
      const children=ui.menu.getChildren(section);
      if (children.length) children.forEach(node=>appendItem(body,node,sectionRoute,1));
      else appendItem(body,section,['admin'],1);
      const pref='allure:group:'+section.name;
      let saved=null;try{saved=sessionStorage.getItem(pref);}catch(e){}
      const expand=saved==='1'||(saved===null&&isActive);
      const setOpen=(open,store)=>{group.classList.toggle('expanded',open);body.hidden=!open;header.setAttribute('aria-expanded',String(open));header.setAttribute('aria-label',translated(open?'Hide section':'Show section')+' '+translated(section.title));if(store)try{sessionStorage.setItem(pref,open?'1':'0');}catch(e){}};
      header.addEventListener('click',()=>setOpen(body.hidden,true));
      group.append(header,body);nav.appendChild(group);setOpen(expand,false);
    });
    if(title&&pageTitle) title.textContent=pageTitle;
  }
});
