# Allure 1.5.1 — вертикальное центрирование стрелок меню

- В подменю убран фиксированный `top: 5px`, вызывавший смещение стрелок при различной высоте строки. Теперь ссылка и кнопка раскрытия находятся в одной CSS Grid-строке, а вложенные пункты — в отдельной строке.
- Заголовки групп и вложенные пункты используют одинаковые SVG-шевроны со строгим центрированием по двум осям.
- Сохранены поворот стрелок, состояния раскрытия, клавиатурное управление и светлая/тёмная темы.
- Обновлена версия ресурсов для обхода кэша браузера. Добавлена проверка геометрии стрелок в Chromium.

# Allure 1.5.0 — исправление русской локализации

- Исправлен полный перевод собственного интерфейса Allure на главной странице: приветствие, состояние роутера, карточки скорости и памяти, подписи WAN, графики, датчики, информация о подключении, ярлыки, подписи единиц измерения и всплывающие подсказки.
- Русские единицы скорости (бит/с, Кбит/с, Мбит/с, Гбит/с), объёма (Б, КБ, МБ), длительности (д, ч, мин), локальный формат чисел и даты. Английская локаль сохранена.
- Язык определяется по языку LuCI в разметке, резервно — по настройке LuCI или браузера. Параметры темы сохраняются; другие страницы LuCI переводятся их собственными пакетами i18n.
- Обновлён параметр версии подключаемых ресурсов, чтобы браузер не использовал старую кешированную локализацию.
- Сохранены обе темы, вход с анимированным фоном, навигация, иконки, мониторинг и установка.
- Файлы `preview/preview.html?lang=ru` и `?lang=en` для самостоятельной проверки.

## 1.4.0 (2026-10-30)

- Recreated the illustrated Allure login: glass modal, dark lake/mountains with animated starfield and aurora, lake shimmer and logo glow.
- Removed the original screenshot's baked-in form from self-contained backdrop to avoid duplicate credential inputs.
- New compact Russian/English placeholders; light/dark/system mode controls below the form.
- Kept LuCI username/password and optional auth fields, unchanged POST submission, accessible controls, reduced-motion fallback.
- Added standalone HTML preview and v1.4 cache-busting.

# Allure Router UI

## v1.3.0 — 2026-10-30

- Native LuCI `sysauth.ut` login page with a centered glass dialog; no sidebar/top bar.
- Dim animated CSS aurora, stars and parallax landscape; no external image/video/CDN.
- Light / Dark / Auto switch inside login panel; same preference as the dashboard.
- RU/EN login labels from LuCI selected language, password visibility button.
- Compatible form fields for LuCI authenticator including optional challenge fields.
- Additional sidebar icon aliases for tabs shown in user screenshots.
- Offline login demo and design preview; code integrity checks.


## v1.2.0 — 2026-10-30

- RU/EN UI follows LuCI language setting and browser language when LuCI is Auto.
- Collapsible sidebar sections with accessible controls and per-tab session state.
- More than 30 bundled vector icon designs across sidebar nodes and horizontal LuCI tabs.
- Thermal RPC: glob-based lookup of thermal / hwmon devices, precise floating-point conversion.
- Different states for RPC failure vs no kernel sensors; SSH diagnostic script.
- Source, installer, README_RU, README_EN, offline preview.

No physical TR3000 runtime test has been performed.
