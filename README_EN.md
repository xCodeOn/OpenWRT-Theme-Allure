# Allure 1.8.0 — refined interface

This version consolidates LuCI styling into `allure-refined.css` and adds cautious mobile table cards and horizontally scrollable third-party tabs. Existing LuCI handlers, field names, and router settings remain untouched. Embedded third-party web applications may need specialized styles.

**Install:** copy `Allure_Router_OpenWrt25` to `/tmp` on your router, run `cd /tmp/Allure_Router_OpenWrt25 && sh install.sh` as root, then hard-refresh your browser.

**Rollback over SSH:** `uci set luci.main.mediaurlbase='/luci-static/bootstrap'; uci commit luci; rm -f /tmp/luci-indexcache; /etc/init.d/uhttpd reload`.

Inspired by Aurora's visual hierarchy, but no Aurora code/assets are included. Screenshots use simulated data. Not yet validated on a physical Cudy TR3000.

---

**Legacy notes follow.** In 1.8, `allure-luci-polish.css`, `allure-mobile-fixes.css`, `allure-mobile.js`, and `allure-adaptive.css` were removed; use `allure-refined.css` and `allure-refined.js` instead.

## Allure 1.7.1 — animated sign-in

Enhanced subtle night-sky aurora ribbons, floating particles, lake reflections, a glass-panel edge glint and a restrained shimmer on the sign-in button. CSS only: no video, external dependencies, network calls, or credential processing. All effects respect `prefers-reduced-motion`. Preview with `preview/login-preview.html?theme=dark&lang=en`. No changes to the LuCI authentication mechanism.

# Allure Router UI v1.7 — automatic styling for new LuCI packages

**New:** a progressive visual compatibility layer for standard and third-party LuCI views. Common LuCI/HTML controls are styled by CSS; asynchronously inserted tabs, action bars and tables are recognized by a small MutationObserver-based script. The module does not change form values, HTTP calls, application listeners, or router configuration.

**Files:** `htdocs/luci-static/allure/allure-adaptive.css` and `allure-adaptive.js`, included from `ucode/template/themes/allure/header.ut`. More built-in icons have been added for services such as AdGuard Home, Docker and VPN-related packages.

**Try without a router:** open `preview/interface-new-plugin.html`. The page simulates installed packages and a dynamically loaded panel. All displayed data are fake; no real package is installed or controlled. Screenshots are in `preview/screenshots/Allure_v1.7_*`.

**Limits:** iframe apps, closed Shadow DOM, canvas, terminal emulators, and heavily custom third-party layouts may still need per-plugin adjustments. Complex tables remain scrollable when stacking would be unsafe. Third-party translations require their own i18n packages. **Not yet tested on a physical Cudy TR3000.**

Install: unpack, copy the `Allure_Router_OpenWrt25` folder to the router, run `sh install.sh` and hard refresh LuCI. Back up your OpenWrt configuration first. For details see `COMPATIBILITY_EN.md`.

---

# Allure Router UI 1.6.1 — mobile layout fixes

Adds scoped responsive styles and progressive enhancement for plain LuCI tables: mobile cards for simple 2–6-column tables with labels, horizontal scrolling for complex tables; one-row scrollable tabs; compact toolbar and iOS Safari bottom-safe spacing. See `preview/interface-forkop-mobile.html` for a **synthetic** preview, not an actual router screenshot. Vendor-specific custom app DOM and Shadow DOM are not guaranteed. Install using the existing `sh install.sh`, then hard-refresh.

# What's new in Allure 1.4

## New in v1.6 — consistent styling across standard LuCI pages

Added `htdocs/luci-static/allure/allure-luci-polish.css`, loaded after LuCI's own view styles. It normalizes cards, spacing, native and LuCI dropdowns, text inputs, buttons, segmented tabs, tables, alerts, page actions and common dialogs. Primary buttons are purple; destructive and positive actions receive semantic accents. Mobile forms adapt to narrow screens.

Interactive offline demos (synthetic data; no router calls): `preview/interface-system.html`, `interface-packages.html`, `interface-network.html`, and `interface-firewall.html`. The four pages and both color schemes have been browser checked, but **this release has not been installed on a real TR3000**. Independently styled plugins, Shadow DOM and canvas-drawn widgets may need additional specific adaptations. Theme styling never modifies UCI, firewall or networking logic.

## Fixed in 1.5.1 — vertically centered sidebar arrows

The chevrons on section headings and nested sidebar entries now align vertically to their own rows, including when labels wrap or submenu content is expanded. Update with `sh install.sh`, then hard-refresh (`Cmd+Shift+R` / `Ctrl+Shift+R`).

The scenic login shown in the design reference is now animated and functional: slow backdrop movement, drifting aurora, subtle star twinkling and water shimmer, graceful modal entrance, and accessible dark/light/system switch. Self-contained WebP image and CSS; no external requests or video. Reduced-motion preferences are respected. Standard LuCI authentication is preserved. Open `preview/login-preview.html` to see a self-contained preview (no login action).


## What's new in 1.5 — complete Allure UI localization

All custom Allure labels on the dashboard, graphs, status panels, thermal sensors, tooltips, and login page now follow the selected LuCI language (Russian/English). Speed, storage and uptime units are localized. Third-party LuCI applications still require their own translation packages. Open `preview/preview.html?lang=ru` or `?lang=en` to compare. Refresh the browser cache after upgrading.

## Allure v1.5 additions

- Native LuCI `sysauth.ut` login view: centered translucent form, no sidebar/top header.
- Dim, smooth animated aurora / star field / landscape: pure CSS, no video, no CDN, honors reduced-motion settings.
- Integrated Light / Dark / Auto preference on the login card, shared with the dashboard.
- Russian/English login UI based on LuCI language; password visibility control.
- LuCI still handles all authentication, including optional challenge fields; scripts never store passwords.
- Expanded route/icon mappings for scheduler, LEDs, mounts, firmware, DNS, DHCP, logs, monitoring, etc.
- Offline demo: `preview/login-preview.html`; preview is not a real login. `preview/login-design-concept.jpg` is a conceptual reference.
- After updating, hard-refresh your browser. On real routers, login and sensor support must be verified separately.

# Allure Router UI v1.3 — OpenWrt 25.12+ / Cudy TR3000

Modern LuCI theme with automatic **English/Russian** based on the selected LuCI system language, light/dark/system appearance, a live dashboard, collapsed navigation groups and SVG icons for native and third-party pages.

## Requirements and installation

OpenWrt 25.12+ with ucode LuCI (not the factory CudyOS). Dependencies: `luci-base`, `luci-mod-status`, `luci-theme-bootstrap`, `rpcd-mod-ucode`.

Copy the extracted `Allure_Router_OpenWrt25` folder to `/tmp/` on the router, then:

```sh
apk update
apk add luci-base luci-mod-status luci-theme-bootstrap rpcd-mod-ucode
cd /tmp/Allure_Router_OpenWrt25
sh install.sh
```

To update Allure, run `sh install.sh` again. Hard refresh LuCI in your browser. Open `http://ROUTER-IP/cgi-bin/luci/admin/status/allure`.

To localize **standard LuCI settings pages**, install the official optional Russian language packs (if available in your build):

```sh
apk add luci-i18n-base-ru luci-i18n-mod-status-ru luci-i18n-mod-network-ru luci-i18n-mod-system-ru
```

Third-party packages need their own language packs. Allure's custom shell/dashboard are self-translated. Groups start closed, except your currently active section; their manual state is preserved per browser tab. LuCI tab icons are generated locally without external assets.

## Temperature diagnostics

The MT7981 has a hardware thermal subsystem, but your OpenWrt kernel/device-tree must provide actual values to userspace. The previous theme treated any RPC error as missing sensors and had an integer-conversion precision issue. The new backend enumerates multiple kernel sysfs paths, uses floating-point degrees, and returns `ok` / `no-kernel-sensors`; RPC errors are shown separately.

Run the included read-only diagnostic script on the router:

```sh
sh tools/allure-diagnostics.sh
```

Manual commands:

```sh
ubus -v list luci.allure
ubus call luci.allure sensors
ls /sys/class/thermal/thermal_zone*/temp /sys/class/hwmon/hwmon*/temp*_input
```

If the RPC object is absent, check `rpcd-mod-ucode` and restart `rpcd`. If RPC works but sysfs has no readings, your firmware lacks a readable temperature source and no UI change can make it available. Allure **never substitutes simulated temperatures** on real routers. The included HTML preview deliberately uses simulated data.

Rollback (without removal):

```sh
uci set luci.main.mediaurlbase='/luci-static/bootstrap'
uci commit luci
/etc/init.d/uhttpd reload
```

Full removal: `sh uninstall.sh`.

## Compatibility disclaimer

JavaScript syntax and archive integrity are checked. Real Cudy TR3000 device, kernel drivers, rpcd/ubus permissions and physical UI rendering cannot be verified without access to your device. The deliverable is source code and a direct installer, not an OpenWrt firmware image or prebuilt `.apk`.

Source: Apache-2.0. See `README_RU.md` for detailed instructions in Russian.
