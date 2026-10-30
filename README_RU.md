# Allure Router UI — OpenWrt 25.x / Cudy TR3000

**Полноценная тема LuCI**, вдохновлённая современной настольной эстетикой macOS: мягкие панели, полупрозрачный верхний бар, боковая навигация, акцентные графики, светлый, тёмный и автоматический режимы.

## Что работает

- Нативная LuCI-навигация (формы, сеть, беспроводная сеть, брандмауэр и остальные установленные приложения), без подмены конфигурации роутера.
- Главная страница **Status → Allure Dashboard**; логотип Allure ведёт на неё.
- Реальные графики download/upload (опрашиваются каждые 3 секунды): штатный `luci.getRealtimeStats`, fallback — `network.device status`.
- Выбор WAN по `network.interface dump`, автоопределение устройства, адрес IPv4 и состояние подключения.
- Использование оперативной памяти, load average (не выдаётся за % CPU), время работы, объём трафика с последней перезагрузки.
- Температуры **только с реальных датчиков**, доступных в `/sys/class/thermal` и `/sys/class/hwmon`; отсутствующие датчики не подменяются фиктивными значениями. Отдельная температура Wi-Fi зависит от поддержки ядра.
- Переключение Light / Dark / Auto (по системе). Выбор хранится локально в браузере (`localStorage`).
- Адаптивная мобильная боковая панель.
- Никаких CDN, сторонних шрифтов, внешних библиотек, трекеров, фоновых демонов.

## Совместимость

Целевая версия: **OpenWrt 25.12+** с современной LuCI на `ucode`, включая линейку Cudy TR3000 v1 (Filogic MT7981). Важна установленная версия OpenWrt/LuCI, а не объём памяти устройства. Не предназначено для заводской CudyOS и старой LuCI с Lua `.htm`-темами. **Не прошивка роутера**, устанавливается поверх OpenWrt.

Зависимости: `luci-base`, `luci-mod-status`, `luci-theme-bootstrap`, `rpcd-mod-ucode`. Bootstrap нужен как базовая таблица стилей для сложных LuCI-форм; Allure меняет оформление собственным CSS.

## Установка по SSH (из ZIP)

1. Распакуйте архив на компьютере.
2. Скопируйте папку проекта на роутер (пример адреса замените своим):

```sh
scp -r Allure_Router_OpenWrt25 root@192.168.1.1:/tmp/
```

3. На роутере проверьте зависимости; если пакеты отсутствуют, установите их:

```sh
apk update
apk add luci-base luci-mod-status luci-theme-bootstrap rpcd-mod-ucode
```

4. Выполните на роутере:

```sh
cd /tmp/Allure_Router_OpenWrt25
sh install.sh
```

5. Обновите страницу браузера без кэша и откройте **Status → Allure Dashboard**. При входе из обычной LuCI можно открыть адрес `/cgi-bin/luci/admin/status/allure` после авторизации.

**Откат**: из папки установки `sh uninstall.sh`. Или, если что-то отображается неправильно:

```sh
uci set luci.main.mediaurlbase='/luci-static/bootstrap'
uci commit luci
rm -f /tmp/luci-indexcache
/etc/init.d/uhttpd reload
```

Рекомендуем перед установкой сделать резервную копию настроек в LuCI. Сам инсталлятор не меняет сетевые настройки, Wi-Fi, firewall или прошивку.

## Сборка APK-пакета через официальный OpenWrt buildroot

```sh
cp -r Allure_Router_OpenWrt25 /path/to/openwrt/feeds/luci/themes/luci-theme-allure
# затем в корне сборки OpenWrt с правильно подключённым LuCI feed:
make menuconfig   # LuCI → Themes → luci-theme-allure
make package/feeds/luci/luci-theme-allure/compile V=s
```

Для сборки из исходников через `luci.mk` используется структура директорий LuCI, а при быстрой установке — `install.sh`. Формат пакета OpenWrt 25.12: **.apk** (не `.ipk`). Пакет отдельно не скомпилирован в данном архиве.

## Проверка датчиков и доступа

```sh
ubus list luci.allure
ubus call luci.allure sensors
ls /sys/class/thermal/thermal_zone*/temp
ls /sys/class/hwmon/hwmon*/temp*_input
```

Если `ubus list` не показывает `luci.allure`, проверьте наличие `rpcd-mod-ucode` и перезапустите `/etc/init.d/rpcd restart`. Для реальных графиков должен работать встроенный метод `luci.getRealtimeStats`; предусмотрена запасная загрузка из `network.device status`.

Если интерфейс открылся со старой темой, сбросьте кэш страницы браузера и убедитесь, что `uci get luci.main.mediaurlbase` возвращает `/luci-static/allure`.

## Состав

- `ucode/template/themes/allure/` — LuCI header/footer.
- `htdocs/luci-static/allure/` — CSS, JS для темы и графиков, SVG-иконка.
- `htdocs/luci-static/resources/menu-allure.js` — нативная боковая навигация.
- `htdocs/luci-static/resources/view/status/allure.js` — LuCI dashboard view.
- `root/usr/share/rpcd/ucode/allure.uc` — ограниченная read-only RPC-служба датчиков.
- `root/usr/share/rpcd/acl.d/` — ACL только на чтение температур.
- `root/usr/share/luci/menu.d/` — регистрация пункта меню.
- `preview/` — автономная HTML-демонстрация с **искусственными данными** для скриншотов.

## Важные ограничения

Тема проверена статическими проверками исходников и рендером HTML-превью в Chromium. **Реальная установка, производительность и телеметрия на физическом Cudy TR3000 не проверялись**, поскольку нет доступа к вашему устройству. При изменениях LuCI между релизами может потребоваться адаптация меню/шаблонов.

Лицензия: Apache-2.0. Авторские исходники темы Allure, переиспользование Bootstrap через отдельную установленную зависимость.
