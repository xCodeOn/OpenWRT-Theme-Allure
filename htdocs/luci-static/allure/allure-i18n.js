/* Allure UI translations: defaults to LuCI's selected language (html[lang]).
   The browser's preferred language is used only by the standalone preview. */
(function (global) {
  'use strict';
  const ru = {
    'ROUTER CONTROL':'УПРАВЛЕНИЕ РОУТЕРОМ','WORKSPACE':'РАБОЧАЯ ОБЛАСТЬ',
    'Dashboard':'Панель управления','Control Center':'Центр управления',
    'Router navigation':'Навигация роутера','Open menu':'Открыть меню','Close menu':'Закрыть меню',
    'ROUTER':'РОУТЕР','SYSTEM ONLINE':'СИСТЕМА РАБОТАЕТ','Appearance':'Оформление',
    'Light mode':'Светлая тема','Dark mode':'Тёмная тема','System appearance':'Системная тема',
    'Follow system':'Как в системе','Administrator':'Администратор',
    'JavaScript is required to use LuCI.':'Для работы LuCI необходимо включить JavaScript.',
    'YOUR NETWORK AT A GLANCE':'ВАША СЕТЬ С ОДНОГО ВЗГЛЯДА',
    'Good to see you':'Рады вас видеть',
    'Your network, beautifully in control.':'Ваша сеть под полным контролем.',
    'LIVE MONITORING':'МОНИТОРИНГ В РЕАЛЬНОМ ВРЕМЕНИ','3 SEC':'3 СЕК','· 3 SEC':'· 3 СЕК',
    'Download speed':'Скорость загрузки','Upload speed':'Скорость отдачи',
    'Memory usage':'Использование памяти','System uptime':'Время работы',
    'WAN inbound · live':'Входящий WAN · онлайн','WAN outbound · live':'Исходящий WAN · онлайн',
    'Available system RAM':'Доступная оперативная память','Since the last restart':'С последней перезагрузки',
    'Network activity':'Сетевая активность','Realtime throughput':'Скорость передачи · онлайн','Realtime throughput ·':'Скорость передачи ·',
    'Detecting WAN…':'Поиск WAN…','No WAN device detected':'WAN-интерфейс не найден',
    'LIVE TRAFFIC':'ТРАФИК ОНЛАЙН','Download':'Загрузка','Upload':'Отдача',
    'LAST 4 MIN':'ПОСЛЕДНИЕ 4 МИН','−3 MIN':'−3 МИН','−2 MIN':'−2 МИН','−1 MIN':'−1 МИН','NOW':'СЕЙЧАС',
    'Collecting live traffic samples…':'Сбор данных о трафике…',
    'Live samples · speeds are measured, not a speed test.':'Текущая скорость трафика, не тест скорости интернета.',
    'Thermal sensors':'Температурные датчики','Hardware temperatures · live':'Температуры оборудования · онлайн',
    'CELSIUS':'ЦЕЛЬСИЙ','Reading available temperature sensors…':'Чтение температурных датчиков…',
    'Only sensors exposed by your OpenWrt kernel are displayed.':'Показываются только датчики, доступные через ядро OpenWrt.',
    'No readable sensors on this firmware.':'Прошивка не предоставляет читаемых температурных датчиков.',
    'Temperature RPC is unavailable.':'Служба температурных датчиков недоступна.',
    'See diagnostics below.':'Проверьте диагностику ниже.',
    'Check sensor support in the OpenWrt kernel.':'Проверьте поддержку датчиков в ядре OpenWrt.',
    'Sensor status':'Состояние датчиков','Available sensor files':'Доступные файлы датчиков',
    'Hardware monitor':'Аппаратный монитор','Kernel thermal zone':'Термозона ядра',
    'Platform sensor':'Датчик платформы','Temperature':'Температура',
    'CPU / SoC':'Процессор / SoC','Wi-Fi Radio':'Радиомодуль Wi-Fi','Board Sensor':'Датчик платы',
    'RAM utilization':'Использование ОЗУ','Available vs total':'Использовано / всего',
    'System load · 1m':'Нагрузка · 1 мин','Load average (not CPU %)':'Средняя нагрузка (не % CPU)',
    'WAN data since boot':'WAN-трафик с загрузки','Received + transmitted':'Получено + отправлено',
    'Connection details':'Сведения о подключении','The essentials, all in one place':'Всё главное в одном месте',
    'Internet connection':'Подключение к интернету','IPv4 address':'IPv4-адрес',
    'Network interface':'Сетевой интерфейс','Device model':'Модель устройства','Firmware':'Прошивка',
    'Checking…':'Проверка…','Connected':'Подключено','Disconnected':'Нет подключения',
    'Quick access':'Быстрый доступ','Your most used settings, one click away':'Основные настройки в один клик',
    'SHORTCUTS':'ЯРЛЫКИ','Interfaces':'Интерфейсы','Wi-Fi':'Wi-Fi','Firewall':'Межсетевой экран',
    'Settings':'Настройки','Allure is a visual layer over LuCI — your OpenWrt settings remain native.':'Allure меняет оформление LuCI. Настройки OpenWrt остаются стандартными.',
    'Telemetry is temporarily unavailable. Please check rpcd and browser console.':'Данные временно недоступны. Проверьте rpcd и консоль браузера.',
    'Dashboard renderer unavailable. Clear the browser cache and reload.':'Модуль панели не загружен. Очистите кэш и обновите страницу.',
    'Status':'Состояние','System':'Система','Network':'Сеть','Services':'Сервисы','VPN':'VPN',
    'NAS':'Хранилище','Logout':'Выйти','Log out':'Выйти',
    'Overview':'Обзор','Realtime Graphs':'Графики в реальном времени','Realtime':'В реальном времени',
    'System Log':'Системный журнал','Kernel Log':'Журнал ядра','Processes':'Процессы',
    'Routing':'Маршрутизация','Routes':'Маршруты','Wireless':'Беспроводная сеть',
    'Diagnostics':'Диагностика','Administration':'Администрирование','Software':'Пакеты',
    'Startup':'Автозагрузка','Scheduled Tasks':'Запланированные задания',
    'Backup / Flash Firmware':'Резервная копия / Прошивка','Backup / Restore':'Резервное копирование / Восстановление',
    'Mount Points':'Точки монтирования','LED Configuration':'Настройка светодиодов',
    'Reboot':'Перезагрузка','Password':'Пароль','Time Synchronization':'Синхронизация времени',
    'DHCP and DNS':'DHCP и DNS','DHCP/DNS':'DHCP/DNS','Hostnames':'Имена хостов',
    'Static Routes':'Статические маршруты','Traffic Rules':'Правила трафика',
    'Port Forwards':'Проброс портов','Traffic Monitor':'Мониторинг трафика',
    'Wake on LAN':'Пробуждение по сети','Dynamic DNS':'Динамический DNS',
    'OpenVPN':'OpenVPN','WireGuard':'WireGuard','Adblock':'Блокировка рекламы',
    'Statistics':'Статистика','Bandwidth Monitor':'Монитор пропускной способности',
    'OpenClash':'OpenClash','Passwall':'Passwall','Transmission':'Transmission',
    'File Sharing':'Общий доступ к файлам','Samba':'Samba','USB':'USB',
    'Modem':'Модем','ModemManager':'Управление модемом','TTYD Terminal':'Терминал TTYD',
    'Terminal':'Терминал','Storage':'Хранилище','Advanced Settings':'Дополнительные настройки',
    'Connections':'Подключения','Network Shares':'Сетевые ресурсы',
    'Collapse':'Свернуть','Expand':'Развернуть','Hide section':'Скрыть раздел','Show section':'Открыть раздел',
    'Wi Fi Radio':'Радиомодуль Wi-Fi','Dynamic DNS':'Динамический DNS',
    'Thermal status: OK':'Датчики: работают','Thermal status: unavailable':'Датчики: недоступны',
    'Read the diagnostics guide in README_RU.md.':'Смотрите диагностику в README_RU.md.'
  };
  // Extra visible strings used by the auth UI, embedded previews, and diagnostic states.
  Object.assign(ru, {
    'ROUTER CONTROL':'УПРАВЛЕНИЕ РОУТЕРОМ',
    'ROUTER':'РОУТЕР',
    'Router':'Роутер',
    'OpenWrt Router':'Роутер OpenWrt',
    'SYSTEM ONLINE':'РОУТЕР В СЕТИ',
    'SYSTEM OFFLINE':'РОУТЕР НЕ В СЕТИ',
    'Control Center':'Центр управления',
    'Dashboard':'Панель управления',
    'YOUR NETWORK AT A GLANCE':'ВАША СЕТЬ КАК НА ЛАДОНИ',
    'Good to see you':'Рады вас видеть',
    'Your network, beautifully in control.':'Ваша сеть под полным контролем.',
    'LIVE MONITORING':'МОНИТОРИНГ В РЕАЛЬНОМ ВРЕМЕНИ',
    '· 3 SEC':'· КАЖДЫЕ 3 С',
    '3 SEC':'3 С',
    'LIVE TRAFFIC':'ТРАФИК В РЕАЛЬНОМ ВРЕМЕНИ',
    'WAN inbound · live':'Входящий трафик WAN · сейчас',
    'WAN outbound · live':'Исходящий трафик WAN · сейчас',
    'Download speed':'Скорость загрузки',
    'Upload speed':'Скорость отдачи',
    'Memory usage':'Использование памяти',
    'System uptime':'Время работы системы',
    'Available system RAM':'Свободная оперативная память',
    'Since the last restart':'С последней перезагрузки',
    'Network activity':'Сетевая активность',
    'Realtime throughput ·':'Скорость передачи ·',
    'Detecting WAN…':'Определяем интерфейс WAN…',
    'No WAN device detected':'Интерфейс WAN не найден',
    'Live download and upload rates':'График скорости загрузки и отдачи',
    'LAST 4 MIN':'ЗА 4 МИНУТЫ',
    '−3 MIN':'−3 МИН',
    '−2 MIN':'−2 МИН',
    '−1 MIN':'−1 МИН',
    'NOW':'СЕЙЧАС',
    'RAM utilization':'Использование ОЗУ',
    'Available vs total':'Занято из общего объёма',
    'System load · 1m':'Нагрузка системы · 1 мин',
    'Load average (not CPU %)':'Средняя нагрузка (не % ЦП)',
    'WAN data since boot':'Трафик WAN с момента запуска',
    'Received + transmitted':'Принято + отправлено',
    'Connection details':'Сведения о подключении',
    'The essentials, all in one place':'Вся важная информация в одном месте',
    'Internet connection':'Подключение к интернету',
    'Network interface':'Сетевой интерфейс',
    'Quick access':'Быстрый доступ',
    'Your most used settings, one click away':'Основные настройки в один клик',
    'SHORTCUTS':'БЫСТРЫЕ ССЫЛКИ',
    'Settings':'Настройки',
    'Allure is a visual layer over LuCI — your OpenWrt settings remain native.':'Allure изменяет только оформление LuCI — все настройки OpenWrt остаются стандартными.',
    'Thermal sensors':'Температурные датчики',
    'Hardware temperatures · live':'Температура оборудования · сейчас',
    'CELSIUS':'ГРАДУСЫ ЦЕЛЬСИЯ',
    'Wi-Fi Radio':'Радиомодуль Wi-Fi',
    'Board Sensor':'Датчик платы',
    'CPU / SoC':'Процессор / SoC',
    'Hardware monitor':'Аппаратный датчик',
    'Kernel thermal zone':'Датчик ядра системы',
    'No readable sensors on this firmware.':'На этой прошивке нет доступных температурных датчиков.',
    'Temperature RPC is unavailable.':'Служба температурных датчиков недоступна.',
    'See diagnostics below.':'Проверьте диагностику ниже.',
    'Check sensor support in the OpenWrt kernel.':'Проверьте поддержку датчиков в ядре OpenWrt.',
    'Only sensors exposed by your OpenWrt kernel are displayed.':'Отображаются только датчики, доступные ядру OpenWrt.',
    'Reading available temperature sensors…':'Чтение температурных датчиков…',
    'Collecting live traffic samples…':'Собираем данные о трафике…',
    'Live samples · speeds are measured, not a speed test.':'Текущая скорость передачи данных. Это не тест скорости интернета.',
    'Telemetry is temporarily unavailable. Please check rpcd and browser console.':'Мониторинг временно недоступен. Проверьте rpcd и консоль браузера.',
    'Dashboard renderer unavailable. Clear the browser cache and reload.':'Панель не загрузилась. Очистите кэш браузера и обновите страницу.',
    'Router sign in':'Вход в панель управления роутером',
    'Router · OpenWrt':'Роутер · OpenWrt',
    'Username':'Имя пользователя',
    'Password':'Пароль',
    'Sign in':'Войти',
    'Show password':'Показать пароль',
    'Hide password':'Скрыть пароль',
    'Light':'Светлая',
    'Dark':'Тёмная',
    'System theme':'Системная тема',
    'System':'Система',
    'THEME PREVIEW · SAMPLE DATA':'ПРЕДПРОСМОТР ТЕМЫ · ПРИМЕР ДАННЫХ',
    'LOCAL PREVIEW · NO AUTH':'ЛОКАЛЬНОЕ ДЕМО · БЕЗ АВТОРИЗАЦИИ',
    'Status':'Состояние',
    'Network':'Сеть',
    'Services':'Службы',
    'Storage':'Хранилище',
    'Administrator':'Администратор',
    'Wireless':'Беспроводная сеть',
    'Firewall':'Межсетевой экран',
    'Diagnostics':'Диагностика',
    'Overview':'Обзор',
    'System Log':'Системный журнал',
    'Kernel Log':'Журнал ядра',
    'Realtime Graphs':'Графики в реальном времени',
    'DHCP and DNS':'DHCP и DNS',
    'Scheduled Tasks':'Планировщик',
    'LED Configuration':'Настройка индикаторов',
    'Mount Points':'Точки монтирования',
    'Backup / Flash Firmware':'Восстановление / Обновление прошивки',
    'Backup / Restore':'Резервное копирование / Восстановление',
    'Reboot':'Перезагрузка',
    'Logout':'Выйти',
    'Log out':'Выйти'
  });
  function language() {
    // LuCI sets <html lang="ru"> based on its language selection. An explicit
    // LuCI language always wins over the browser language.
    const markup = (document.documentElement.getAttribute('lang') || '').replace('_','-');
    if (/^(ru|en)(?:-|$)/i.test(markup)) return /^ru/i.test(markup)?'ru':'en';
    const bodyClass = document.body?.className || '';
    const bodyLocale = bodyClass.match(/(?:^|\s)lang_(ru|en)(?:\s|$)/i);
    if (bodyLocale) return bodyLocale[1].toLowerCase();
    const fromLuci = String(global.L?.env?.lang || '').replace('_','-');
    if (/^(ru|en)(?:-|$)/i.test(fromLuci)) return /^ru/i.test(fromLuci)?'ru':'en';
    const browser = (global.navigator?.languages?.[0] || global.navigator?.language || 'en');
    return /^ru(?:-|_|$)/i.test(browser)?'ru':'en';
  }
  const lang = language();
  function t(s) { return lang === 'ru' ? (Object.prototype.hasOwnProperty.call(ru,s) ? ru[s] : s) : s; }
  function translate(root) {
    if (lang !== 'ru' || !root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (node.parentElement && /^(SCRIPT|STYLE|TEXTAREA|CODE|PRE|OPTION)$/.test(node.parentElement.tagName)) continue;
      const original=node.nodeValue, key=original.trim();
      if (Object.prototype.hasOwnProperty.call(ru,key)) node.nodeValue=original.replace(key,ru[key]);
    }
    if (root.querySelectorAll) root.querySelectorAll('[title],[aria-label],[placeholder]').forEach(function(el){
      for (const attr of ['title','aria-label','placeholder']) {
        const val=el.getAttribute(attr);
        if (val && Object.prototype.hasOwnProperty.call(ru,val)) el.setAttribute(attr,ru[val]);
      }
    });
  }
  global.AllureI18n={lang:lang,t:t,translate:translate};
})(window);
