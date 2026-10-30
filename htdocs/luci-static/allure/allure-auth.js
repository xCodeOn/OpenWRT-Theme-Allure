/* Allure login i18n & password-visibility only. The form POST stays LuCI-native. */
(function () {
  'use strict';
  var labels = {
    ru: { product:'Роутер · OpenWrt', username:'Имя пользователя',password:'Пароль',
      signIn:'Войти',or:'или',light:'Светлая',dark:'Тёмная',auto:'Системная',
      showPassword:'Показать пароль', hidePassword:'Скрыть пароль',
      themeLight:'Светлая тема',themeDark:'Тёмная тема',themeAuto:'Как в системе' },
    en: { product:'Router · OpenWrt', username:'Username',password:'Password',
      signIn:'Sign in',or:'or',light:'Light',dark:'Dark',auto:'System',
      showPassword:'Show password', hidePassword:'Hide password',
      themeLight:'Light theme',themeDark:'Dark theme',themeAuto:'Follow system' }
  };
  var lang = /^ru(?:-|$)/i.test(document.documentElement.lang) ? 'ru' : 'en';
  var tr=labels[lang];
  var landmark=document.querySelector('.allure-auth');
  if(landmark) landmark.setAttribute('aria-label',lang==='ru'?'Вход в панель управления роутером':'Router sign in');
  document.querySelectorAll('[data-auth-i18n]').forEach(function(el) {
    var v = tr[el.getAttribute('data-auth-i18n')]; if(v)el.textContent=v;
  });
  document.querySelectorAll('[data-auth-i18n-placeholder]').forEach(function(el) {
    var v=tr[el.getAttribute('data-auth-i18n-placeholder')];if(v)el.setAttribute('placeholder',v);
  });
  ['light','dark','auto'].forEach(function(mode) {
    var el=document.querySelector('.allure-auth-theme [data-allure-theme="'+mode+'"]');
    if(!el)return;
    var title=tr[mode==='auto'?'themeAuto':mode==='light'?'themeLight':'themeDark'];
    el.title=title;el.setAttribute('aria-label',title);
  });
  var input=document.getElementById('luci_password'),button=document.getElementById('allure-password-toggle');
  if(input && button){
    var update=function(){var visible=input.type==='text';
      var label=visible?tr.hidePassword:tr.showPassword;
      button.setAttribute('aria-label',label);button.title=label;
      button.setAttribute('aria-pressed',String(visible));
    };
    button.addEventListener('click',function(){input.type=input.type==='password'?'text':'password';update();});
    update();
  }
})();
