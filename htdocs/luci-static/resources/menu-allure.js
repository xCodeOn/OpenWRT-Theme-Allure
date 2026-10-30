'use strict';
'require baseclass';
'require ui';

const symbols = {status:'◫', system:'⚙', network:'◇', services:'▤', vpn:'◉', nas:'▣', overview:'◫', realtime:'⌁', wireless:'◉', interfaces:'⇄', firewall:'⬡', diagnostics:'⌕', administration:'⚙', software:'▦', startup:'↻'};

return baseclass.extend({
  __init__() {
    ui.menu.load().then((tree) => this.render(tree)).catch((e) => console.error('Allure menu:', e));
  },
  render(tree) {
    const nav = document.getElementById('allure-nav');
    if (!nav) return;
    const admin = ui.menu.getChildren(tree).find((node) => node.name === 'admin');
    if (!admin) return;
    const current = L.env.requestpath || [];
    const title = document.getElementById('allure-breadcrumb-title');
    const onDashboard = current[1] === 'status' && current[2] === 'allure';
    const home = document.querySelector('.allure-home');
    if (home) home.classList.toggle('is-current', onDashboard);
    let lastTitle = onDashboard ? 'Control Center' : '';
    const appendItem = (group, node, path, depth) => {
      if (node.name === 'allure') return;
      const route = path.concat(node.name);
      const isCurrent = route.every((seg, index) => current[index] === seg) && current.length === route.length;
      if (isCurrent) lastTitle = _(node.title);
      const link = E('a', {
        'class': 'allure-nav-link depth-' + depth + (isCurrent ? ' active' : ''),
        'href': L.url.apply(L, route)
      }, [E('span', { 'class': depth === 2 ? 'allure-sub-glyph' : 'allure-menu-symbol' }, [depth === 2 ? '·' : (symbols[node.name] || '▫')]), E('span', {}, _(node.title))]);
      group.appendChild(link);
    };
    ui.menu.getChildren(admin).forEach((section) => {
      const group = E('div', { 'class':'allure-nav-group' });
      group.appendChild(E('div', {'class':'allure-nav-heading'}, [_(section.title)]));
      const first = ['admin',section.name];
      const children = ui.menu.getChildren(section);
      if (!children.length) appendItem(group, section, ['admin'], 1);
      children.forEach((node) => {
        appendItem(group, node, first, 1);
        const nested = ui.menu.getChildren(node);
        if (nested.length && current[2] === node.name && current[1] === section.name) {
          nested.forEach((sub) => appendItem(group, sub, first.concat(node.name), 2));
        }
      });
      nav.appendChild(group);
    });
    if (title && lastTitle) title.textContent = lastTitle;
  }
});
