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
  const chosen = (document.documentElement.lang || 'en').toLowerCase();
  const lang = chosen === 'ru' || chosen.startsWith('ru-') ? 'ru' : 'en';
  function t(s) { return lang === 'ru' ? (ru[s] || s) : s; }
  function translate(root) {
    if (lang !== 'ru' || !root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (node.parentElement && /^(SCRIPT|STYLE|TEXTAREA|CODE|PRE)$/.test(node.parentElement.tagName)) continue;
      const original=node.nodeValue, key=original.trim();
      if (ru[key]) node.nodeValue=original.replace(key,ru[key]);
    }
    if (root.querySelectorAll) root.querySelectorAll('[title],[aria-label],[placeholder]').forEach(function(el){
      for (const attr of ['title','aria-label','placeholder']) {
        let val=el.getAttribute(attr); if (val && ru[val]) el.setAttribute(attr,ru[val]);
      }
    });
  }
  global.AllureI18n={lang:lang,t:t,translate:translate};
})(window);
