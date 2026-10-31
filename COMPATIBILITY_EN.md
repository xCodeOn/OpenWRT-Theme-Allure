# Allure v1.7 compatibility for third-party LuCI apps

Common LuCI buttons, forms, selects, tabs, action bars and tables are styled automatically. The lightweight adapter watches added DOM nodes and recognizes common semantic tab lists, panels and action groups without overriding application event handlers, form values or requests.

For nonstandard component markup, optionally add `data-allure-role="tabs"`, `"actions"`, `"table"`, or `"card"` to the respective container. To opt out of adaptive decoration (e.g. a terminal or editor), mark a widget root with `data-allure-ignore`.

Some complex wide tables stay horizontally scrollable rather than becoming stacked cards. Iframes, closed Shadow DOM, canvas UIs, custom terminal emulators and app-specific `!important` styling may require individual fixes. Third-party text translations are handled by each app's language package, not by the theme.

Open `preview/interface-new-plugin.html` to test dynamic components with fake data. Nothing in this preview controls your router.
