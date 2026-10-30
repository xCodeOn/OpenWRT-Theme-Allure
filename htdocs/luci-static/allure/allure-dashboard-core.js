/* Pure browser DOM and chart renderer. Used by both LuCI and the included screenshot preview. */
(function(global) {
'use strict';
const html = `
<div class="allure-dashboard">
  <div class="allure-dash-heading">
    <div><div class="allure-eyebrow"><span class="allure-eyebrow-line"></span> YOUR NETWORK AT A GLANCE</div>
      <h1>Good to see you <span style="color:var(--v-accent)">✳</span></h1>
      <p class="allure-subheading">Your network, beautifully in control. <span id="v-today"></span></p></div>
    <div class="allure-live-badge"><span class="allure-pulse"></span> LIVE MONITORING <span style="color:var(--v-muted)">· 3 SEC</span></div>
  </div>
  <div class="allure-overview-cards">
    <div class="allure-metric-card"><div class="allure-metric-top"><span>Download speed</span><span class="allure-metric-icon blue">↓</span></div><div class="allure-metric-value" id="v-download">— <small>Mbps</small></div><div class="allure-metric-bottom"><span class="allure-trend-up">↗</span> WAN inbound · live</div></div>
    <div class="allure-metric-card"><div class="allure-metric-top"><span>Upload speed</span><span class="allure-metric-icon cyan">↑</span></div><div class="allure-metric-value" id="v-upload">— <small>Mbps</small></div><div class="allure-metric-bottom"><span class="allure-trend-up">↗</span> WAN outbound · live</div></div>
    <div class="allure-metric-card"><div class="allure-metric-top"><span>Memory usage</span><span class="allure-metric-icon pink">◉</span></div><div class="allure-metric-value" id="v-memory">— <small>%</small></div><div class="allure-metric-bottom">Available system RAM</div></div>
    <div class="allure-metric-card"><div class="allure-metric-top"><span>System uptime</span><span class="allure-metric-icon">◷</span></div><div class="allure-metric-value" id="v-uptime">—</div><div class="allure-metric-bottom"><span class="allure-trend-up">●</span> Since the last restart</div></div>
  </div>
  <div class="allure-panel-grid">
    <section class="allure-panel"><div class="allure-panel-heading"><div><h2>Network activity</h2><p class="allure-panel-caption">Realtime throughput · <span id="v-device">Detecting WAN…</span></p></div><span class="allure-pill">↗ &nbsp; LIVE TRAFFIC</span></div>
      <div class="allure-chart-values"><div class="allure-chart-value"><span class="dot"></span><span>Download <b id="v-rx">—</b></span></div><div class="allure-chart-value"><span class="dot upload"></span><span>Upload <b id="v-tx">—</b></span></div></div>
      <div class="allure-chart-wrap"><svg class="allure-chart-svg" viewBox="0 0 720 234" preserveAspectRatio="none" role="img" aria-label="Live download and upload rates">
        <defs><linearGradient id="allure-download-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#7793ff" stop-opacity=".25"/><stop offset="100%" stop-color="#7793ff" stop-opacity="0"/></linearGradient><linearGradient id="allure-upload-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#66ddc9" stop-opacity=".12"/><stop offset="100%" stop-color="#66ddc9" stop-opacity="0"/></linearGradient></defs>
        <path class="grid" d="M0 26H720 M0 72H720 M0 118H720 M0 164H720 M0 210H720" fill="none"/>
        <path id="v-rx-area" fill="url(#allure-download-area)" d=""/><path id="v-tx-area" fill="url(#allure-upload-area)" d=""/>
        <path id="v-rx-path" stroke="var(--v-blue)" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round" d=""/><path id="v-tx-path" stroke="var(--v-cyan)" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round" d=""/>
      </svg></div><div class="allure-chart-axis"><span>LAST 4 MIN</span><span>−3 MIN</span><span>−2 MIN</span><span>−1 MIN</span><span>NOW</span></div>
      <div class="allure-inline-error" id="v-chart-note">Collecting live traffic samples…</div>
    </section>
    <section class="allure-panel"><div class="allure-panel-heading"><div><h2>Thermal sensors</h2><p class="allure-panel-caption">Hardware temperatures · live</p></div><span class="allure-pill">℃ &nbsp; CELSIUS</span></div>
       <div class="allure-thermo-list" id="v-thermals"><div class="allure-inline-error">Reading available temperature sensors…</div></div>
       <div style="padding-top:10px;font-size:10px;color:var(--v-muted)">Only sensors exposed by your OpenWrt kernel are displayed.</div>
    </section>
  </div>
  <div class="allure-resource-grid">
    <div class="allure-resource-item"><div id="v-memory-ring" class="allure-resource-donut"><span id="v-memory-pct">—</span></div><div><div class="allure-resource-label">RAM utilization</div><div class="allure-resource-val" id="v-memory-amount">—</div><div class="allure-resource-desc">Available vs total</div></div></div>
    <div class="allure-resource-item"><div id="v-load-ring" class="allure-resource-donut"><span id="v-load-pct">—</span></div><div><div class="allure-resource-label">System load · 1m</div><div class="allure-resource-val" id="v-load">—</div><div class="allure-resource-desc">Load average (not CPU %)</div></div></div>
    <div class="allure-resource-item"><div id="v-traffic-ring" class="allure-resource-donut"><span>⇄</span></div><div><div class="allure-resource-label">WAN data since boot</div><div class="allure-resource-val" id="v-traffic-total">—</div><div class="allure-resource-desc">Received + transmitted</div></div></div>
  </div>
  <div class="allure-bottom-grid">
    <section class="allure-panel"><div class="allure-panel-heading"><div><h2>Connection details</h2><p class="allure-panel-caption">The essentials, all in one place</p></div><span class="allure-pill">WAN</span></div><div class="allure-status-rows">
      <div class="allure-status-row"><span>Internet connection</span><strong class="status-ok" id="v-wan-state">Checking…</strong></div>
      <div class="allure-status-row"><span>IPv4 address</span><strong id="v-wan-ip">—</strong></div>
      <div class="allure-status-row"><span>Network interface</span><strong id="v-wan-name">—</strong></div>
      <div class="allure-status-row"><span>Device model</span><strong id="v-model">—</strong></div>
      <div class="allure-status-row"><span>Firmware</span><strong id="v-firmware">—</strong></div>
    </div></section>
    <section class="allure-panel"><div class="allure-panel-heading"><div><h2>Quick access</h2><p class="allure-panel-caption">Your most used settings, one click away</p></div><span class="allure-pill">SHORTCUTS</span></div>
      <div class="allure-shortcuts">
        <a class="allure-shortcut" data-allure-link="admin/network/network" href="#"><span class="allure-shortcut-icon">◇</span> Interfaces <span class="allure-shortcut-arrow">↗</span></a>
        <a class="allure-shortcut" data-allure-link="admin/network/wireless" href="#"><span class="allure-shortcut-icon">◉</span> Wi-Fi <span class="allure-shortcut-arrow">↗</span></a>
        <a class="allure-shortcut" data-allure-link="admin/network/firewall" href="#"><span class="allure-shortcut-icon">⬡</span> Firewall <span class="allure-shortcut-arrow">↗</span></a>
        <a class="allure-shortcut" data-allure-link="admin/system/system" href="#"><span class="allure-shortcut-icon">⚙</span> Settings <span class="allure-shortcut-arrow">↗</span></a>
      </div><div style="margin-top:18px;color:var(--v-muted);font-size:10px">Allure is a visual layer over LuCI — your OpenWrt settings remain native.</div>
    </section>
  </div>
</div>`;
function put(root,id,val) {const n=root.querySelector('#'+id);if(n)n.textContent=val;}
function formatBytes(n) {if(!Number.isFinite(n)||n<0)return '—';const units=['B','KB','MB','GB','TB'];let i=0;while(n>=1024&&i<units.length-1){n/=1024;i++;}return n.toFixed(n>=100?0:n>=10?1:2)+' '+units[i];}
function speed(n) {if(!Number.isFinite(n))return '—';const bps=n*8;if(bps>=1e9)return (bps/1e9).toFixed(2)+' Gbps';if(bps>=1e6)return (bps/1e6).toFixed(2)+' Mbps';if(bps>=1e3)return (bps/1e3).toFixed(1)+' Kbps';return bps.toFixed(0)+' bps';}
function speedCard(n) {const s=speed(n).split(' ');return s[0]+' <small>'+s[1]+'</small>';}
function valueHTML(root,id,htmlValue){const el=root.querySelector('#'+id);if(el)el.innerHTML=htmlValue;}
function uptime(seconds){if(!Number.isFinite(seconds))return '—';let d=Math.floor(seconds/86400),h=Math.floor(seconds%86400/3600),m=Math.floor(seconds%3600/60);return d?d+'d '+h+'h':h?h+'h '+m+'m':m+'m';}
function ring(root,id,percent,color){const el=root.querySelector('#'+id);if(!el)return;percent=Math.min(100,Math.max(0,Number(percent)||0));el.style.background='conic-gradient('+color+' '+percent+'%,var(--v-surface) '+percent+'%)';}
function interpolate(data){const nums=data.slice(-90).map(v=>Math.max(0,Number(v)||0));while(nums.length<90)nums.unshift(0);return nums;}
function plotLine(data,max){const nums=interpolate(data), xstep=720/(nums.length-1);let d='';nums.forEach((y,i)=>{const x=i*xstep,yy=210-(y/max)*177;d+=(i?'L':'M')+x.toFixed(1)+' '+yy.toFixed(1)+' ';});return d;}
function plot(root,downloads,uploads){const max=Math.max(1024,...downloads.slice(-90),...uploads.slice(-90))*1.18;const r=plotLine(downloads,max),t=plotLine(uploads,max);const paths=[['v-rx-path',r],['v-tx-path',t],['v-rx-area',r+'L720 210 L0 210 Z'],['v-tx-area',t+'L720 210 L0 210 Z']];paths.forEach(([id,d])=>{const el=root.querySelector('#'+id);if(el)el.setAttribute('d',d);});}
function temperatureLabel(s){return String(s.label||s.id||'Temperature').replace(/[_-]/g,' ').replace(/\b\w/g,m=>m.toUpperCase());}
function thermals(root,sensors){const host=root.querySelector('#v-thermals');if(!host)return;host.replaceChildren();if(!Array.isArray(sensors)||!sensors.length){const note=document.createElement('p');note.className='allure-inline-error';note.textContent='No readable sensors on this firmware. Check /sys/class/thermal and /sys/class/hwmon.';host.appendChild(note);return;}
const accepted=[];sensors.forEach(s=>{if(!Number.isFinite(Number(s.celsius)))return;const same=accepted.some(a=>Math.abs(a.celsius-s.celsius)<.1 && a.source!==s.source);if(!same && accepted.length<4)accepted.push(s);});
accepted.forEach((s,i)=>{const row=document.createElement('div');row.className='allure-thermo-item';const icon=document.createElement('span');icon.className='allure-thermo-icon'+(i===1?' hot':i===2?' green':'');icon.textContent=i===0?'♨':i===1?'◈':'⌁';const content=document.createElement('div');content.className='allure-thermo-text';const name=document.createElement('div');name.className='allure-thermo-title';name.textContent=temperatureLabel(s);const src=document.createElement('div');src.className='allure-thermo-source';src.textContent=s.source==='hwmon'?'Hardware monitor':'Kernel thermal zone';content.append(name,src);const val=document.createElement('div');val.className='allure-thermo-value';val.textContent=Number(s.celsius).toFixed(1)+' °C';row.append(icon,content,val);host.appendChild(row);});}
function mount(root,urlBuilder){root.innerHTML=html;const date=root.querySelector('#v-today');if(date)date.textContent='· '+new Date().toLocaleDateString(undefined,{month:'long',day:'numeric',year:'numeric'});root.querySelectorAll('[data-allure-link]').forEach(a=>{const path=a.dataset.allureLink.split('/');a.href=urlBuilder?urlBuilder(path):'/cgi-bin/luci/'+path.join('/');});return root;}
function update(root,data){if(!root)return;const x=data||{};if(x.board){put(root,'v-model',x.board.model||'—');put(root,'v-firmware',x.board.release?.version||x.board.release?.description||'—');}
if(x.wan){put(root,'v-wan-state',x.wan.up?'Connected':'Disconnected');const status=root.querySelector('#v-wan-state');status.classList.toggle('allure-unstable',!x.wan.up);put(root,'v-wan-ip',x.wan.ip||'—');put(root,'v-wan-name',x.wan.device||'—');put(root,'v-device',x.wan.device||'No WAN device detected');}
if(x.system){const info=x.system,mem=info.memory||{};const total=Number(mem.total)||0,free=Number(mem.available??((mem.free||0)+(mem.cached||0)+(mem.buffered||0)))||0;const pct=total?Math.max(0,Math.min(100,Math.round((total-free)/total*100))):null;if(pct!=null){valueHTML(root,'v-memory',pct+' <small>%</small>');put(root,'v-memory-pct',pct+'%');put(root,'v-memory-amount',formatBytes(total-free));ring(root,'v-memory-ring',pct,'var(--v-accent)');}put(root,'v-uptime',uptime(Number(info.uptime)));if(info.load?.length){const load1=Number(info.load[0])/65535;put(root,'v-load',load1.toFixed(2));put(root,'v-load-pct',load1.toFixed(2));ring(root,'v-load-ring',Math.min(100,load1/2*100),'var(--v-cyan)');}} 
if(x.rx!=null){valueHTML(root,'v-download',speedCard(x.rx));put(root,'v-rx',speed(x.rx));}if(x.tx!=null){valueHTML(root,'v-upload',speedCard(x.tx));put(root,'v-tx',speed(x.tx));}
if(x.rxBytes!=null&&x.txBytes!=null)put(root,'v-traffic-total',formatBytes(x.rxBytes+x.txBytes));
if(x.downloads&&x.uploads){plot(root,x.downloads,x.uploads);put(root,'v-chart-note','Live samples · speeds are measured, not a speed test.');}
if(x.sensors)thermals(root,x.sensors);
if(x.error)put(root,'v-chart-note',x.error);
}
global.AllureDash={mount,update,plot,formatBytes,speed};
})(window);
