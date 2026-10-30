'use strict';
'require view';
'require rpc';
'require poll';

const callBoard = rpc.declare({object:'system',method:'board'});
const callInfo = rpc.declare({object:'system',method:'info'});
const callInterfaces = rpc.declare({object:'network.interface',method:'dump'});
const callSensors = rpc.declare({object:'luci.allure',method:'sensors'});
// Keep failures distinct from an actual kernel with no sensor files.
function thermalResult() {
  return callSensors().then(x => (x && Array.isArray(x.sensors)) ? x : {sensors:[],status:'rpc-invalid'},
    err => { console.warn('Allure thermal RPC unavailable:', err); return {sensors:[],status:'rpc-error'}; });
}
const callRealtime = rpc.declare({object:'luci',method:'getRealtimeStats',params:['mode','device'],expect:{result:[]}});
const callDevice = rpc.declare({object:'network.device',method:'status',params:['name']});

function safely(p, fallback) { return L.resolveDefault(p, fallback); }
function findWAN(dump) {
  const all = Array.isArray(dump?.interface) ? dump.interface : [];
  const wan = all.find(x=>x.interface==='wan' && x.up) || all.find(x=>x.interface==='wwan' && x.up) || all.find(x=>x.interface==='wan6' && x.up) || all.find(x=>x.interface==='wan') || null;
  const iface = wan || all.find(x=>x.up && x.interface!=='loopback' && x.interface!=='lan') || null;
  const ip4 = iface?.['ipv4-address'];
  return {up:!!iface?.up,device:iface?.l3_device||iface?.device||'',ip:ip4?.[0]?.address||'',name:iface?.interface||''};
}
function parseRows(rows,state) {
  if (!Array.isArray(rows)) return;
  for (const v of rows) {
    if (!Array.isArray(v) || v.length < 4) continue;
    const time=Number(v[0]),rx=Number(v[1]),tx=Number(v[3]);
    if (!Number.isFinite(time)||!Number.isFinite(rx)||!Number.isFinite(tx)) continue;
    if (state.last && time > state.last.time) {
      const dt=time-state.last.time;
      state.rx=Math.max(0,(rx-state.last.rx)/dt);
      state.tx=Math.max(0,(tx-state.last.tx)/dt);
      if(Number.isFinite(state.rx)&&Number.isFinite(state.tx)){
        state.downloads.push(state.rx);state.uploads.push(state.tx);
        if(state.downloads.length>90)state.downloads.shift();
        if(state.uploads.length>90)state.uploads.shift();
      }
    }
    if (!state.last || time>state.last.time) state.last={time,rx,tx};
    state.rxBytes=rx;state.txBytes=tx;
  }
}

return view.extend({
  load() {
    return Promise.all([safely(callBoard(),{}),safely(callInfo(),{}),safely(callInterfaces(),{}),thermalResult()]);
  },
  render(results) {
    const root = E('div',{'id':'allure-dashboard-root'});
    if (!window.AllureDash) return E('p',window.AllureI18n?.t('Dashboard renderer unavailable. Clear the browser cache and reload.') || 'Dashboard renderer unavailable. Clear the browser cache and reload.');
    window.AllureDash.mount(root,(path)=>L.url.apply(L,path));
    const state={downloads:[],uploads:[],last:null,rx:null,tx:null,rxBytes:null,txBytes:null,counter:null};
    let wan=findWAN(results[2]);
    window.AllureDash.update(root,{board:results[0],system:results[1],wan,sensors:results[3]});
    const refresh=()=> {
      const calls=[safely(callInfo(),{}),safely(callInterfaces(),{}),thermalResult()];
      return Promise.all(calls).then(async ([info,interfaces,thermal])=>{
        wan=findWAN(interfaces);
        const device=wan.device;
        if (device !== state.device) {state.device=device;state.last=null;state.counter=null;state.downloads=[];state.uploads=[];}
        if (device) {
          let rows=await safely(callRealtime('interface',device),[]);
          parseRows(rows,state);
          // Fallback to stock ubus byte counters on builds lacking realtime history.
          if (!Array.isArray(rows)||!rows.length) {
            const deviceInfo=await safely(callDevice(device),{});
            const stats=deviceInfo?.statistics||{};
            const rx=Number(stats.rx_bytes),tx=Number(stats.tx_bytes),now=Date.now()/1000;
            if(Number.isFinite(rx)&&Number.isFinite(tx)) {
              if(state.counter) {
                const dt=now-state.counter.time;
                if(dt>0){state.rx=Math.max(0,(rx-state.counter.rx)/dt);state.tx=Math.max(0,(tx-state.counter.tx)/dt);state.downloads.push(state.rx);state.uploads.push(state.tx);if(state.downloads.length>90)state.downloads.shift();if(state.uploads.length>90)state.uploads.shift();}
              }
              state.counter={rx,tx,time:now};state.rxBytes=rx;state.txBytes=tx;
            }
          }
        }
        window.AllureDash.update(root,{system:info,wan,sensors:thermal,rx:state.rx,tx:state.tx,rxBytes:state.rxBytes,txBytes:state.txBytes,downloads:state.downloads,uploads:state.uploads});
      }).catch(e=>{window.AllureDash.update(root,{error:'Telemetry is temporarily unavailable. Please check rpcd and browser console.'});console.error('Allure refresh:',e);});
    };
    // poll.add handles page lifecycle and prevents overlapping scheduled refreshes.
    poll.add(refresh,3);
    refresh();
    return root;
  },
  handleSaveApply:null,
  handleSave:null,
  handleReset:null
});
