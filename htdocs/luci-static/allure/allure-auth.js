/* Allure login view: client-side appearance and accessibility only.
   Credential submission is handled by LuCI's original form endpoint. */
(function () {
  'use strict';
  var labels = {
    en: { product:'OpenWrt · Router Control', welcome:'Welcome back',description:'Sign in to manage your router',
      username:'Username',password:'Password',signIn:'Sign in',secure:'Router management',
      light:'Light',dark:'Dark',auto:'Auto',madeFor:'Made for OpenWrt',
      showPassword:'Show password',hidePassword:'Hide password' },
    ru: { product:'OpenWrt · Управление роутером',welcome:'С возвращением!',description:'Войдите для управления маршрутизатором',
      username:'Имя пользователя',password:'Пароль',signIn:'Войти',secure:'Управление роутером',
      light:'Светлая',dark:'Тёмная',auto:'Система',madeFor:'Создано для OpenWrt',
      showPassword:'Показать пароль',hidePassword:'Скрыть пароль' }
  };
  var lang = (/^ru(?:-|$)/i.test(document.documentElement.lang) ? 'ru' : 'en');
  var tr = labels[lang];
  document.querySelectorAll('[data-auth-i18n]').forEach(function(el) { el.textContent = tr[el.dataset.authI18n] || el.textContent; });
  var pass = document.getElementById('luci_password');
  var toggle = document.getElementById('allure-password-toggle');
  if (pass && toggle) {
    var setToggle = function(shown) {
      pass.type = shown ? 'text' : 'password';
      toggle.setAttribute('aria-pressed', String(shown));
      toggle.setAttribute('aria-label', shown ? tr.hidePassword : tr.showPassword);
      toggle.title = shown ? tr.hidePassword : tr.showPassword;
    };
    toggle.addEventListener('click',function() { setToggle(pass.type === 'password'); });
    setToggle(false);
  }
})();
