# Allure Router UI — LuCI theme for OpenWrt 25.x

**Allure** is a full LuCI theme inspired by modern macOS desktop aesthetics: soft panels, a translucent top bar, sidebar navigation, accent charts, and light / dark / auto modes. Built for the current `ucode`-based LuCI on OpenWrt 25.12+.

![Dark](preview/screenshots/Allure_Dark_Screenshot.png)
![Light](preview/screenshots/Allure_Light_Screenshot.png)
![Mobile](preview/screenshots/Allure_Mobile_Screenshot.png)

## Features

- Native LuCI navigation (forms, network, wireless, firewall and every installed app) — no router configuration is replaced.
- Dashboard at **Status → Allure Dashboard**; the Allure logo links to it.
- Real download/upload graphs (polled every 3 s): native `luci.getRealtimeStats`, fallback to `network.device status`.
- WAN selection via `network.interface dump`, auto-detected device, IPv4 address and link state.
- RAM usage, load average, uptime, traffic since last reboot.
- Temperatures only from real sensors in `/sys/class/thermal` and `/sys/class/hwmon`; missing sensors are never faked. Wi-Fi temperature depends on kernel support.
- Light / Dark / Auto switching (stored in browser `localStorage`).
- Adaptive mobile sidebar.
- No CDN, third-party fonts, external libraries, trackers or background daemons.

## Compatibility

Target: **OpenWrt 25.12+** with the modern `ucode` LuCI, including the Cudy TR3000 v1 line (Filogic MT7981). What matters is the installed OpenWrt/LuCI version — not device RAM. Not intended for factory CudyOS or legacy Lua `.htm` themes. This is **not a firmware** — it installs on top of OpenWrt.

Dependencies: `luci-base`, `luci-mod-status`, `luci-theme-bootstrap`, `rpcd-mod-ucode`. Bootstrap is required as the base stylesheet for complex LuCI forms; Allure restyles everything with its own CSS.

## Installation

### From a release (prebuilt `.ipk`, opkg/OpenWrt ≤ 23.05)

```sh
opkg update
opkg install luci-theme-allure_1.0.0_all.ipk
# enable the theme
uci set luci.main.mediaurlbase='/luci-static/allure'
uci commit luci
rm -f /tmp/luci-indexcache
/etc/init.d/uhttpd reload
```

### Manual install from source (OpenWrt 25.12+ / apk)

```sh
scp -r Allure_Router_OpenWrt25 root@192.168.1.1:/tmp/
# on the router
apk update
apk add luci-base luci-mod-status luci-theme-bootstrap rpcd-mod-ucode
cd /tmp/Allure_Router_OpenWrt25
sh install.sh
```

Then reload the browser page without cache and open **Status → Allure Dashboard** (`/cgi-bin/luci/admin/status/allure` after login).

### Rollback

```sh
uci set luci.main.mediaurlbase='/luci-static/bootstrap'
uci commit luci
rm -f /tmp/luci-indexcache
/etc/init.d/uhttpd reload
```

Or, from the source folder: `sh uninstall.sh`.

## Building a package (OpenWrt buildroot)

```sh
cp -r Allure_Router_OpenWrt25 /path/to/openwrt/feeds/luci/themes/luci-theme-allure
# in the OpenWrt buildroot with the LuCI feed configured:
make menuconfig   # LuCI → Themes → luci-theme-allure
make package/feeds/luci/luci-theme-allure/compile V=s
```

Package format on OpenWrt 25.12 is **.apk** (built by the SDK; the prebuilt `.ipk` in releases targets opkg-based systems).

## Checks

```sh
ubus list luci.allure
ubus call luci.allure sensors
```

If `ubus list` does not show `luci.allure`, ensure `rpcd-mod-ucode` is installed and restart `/etc/init.d/rpcd`.

## Contents

- `ucode/template/themes/allure/` — LuCI header/footer templates.
- `htdocs/luci-static/allure/` — CSS, JS, SVG icon.
- `htdocs/luci-static/resources/menu-allure.js` — native sidebar navigation.
- `htdocs/luci-static/resources/view/status/allure.js` — LuCI dashboard view.
- `root/usr/share/rpcd/ucode/allure.uc` — read-only RPC service for sensors.
- `root/usr/share/rpcd/acl.d/` — read-only ACLs.
- `root/usr/share/luci/menu.d/` — menu registration.
- `preview/` — standalone HTML demo with **fake data** for screenshots.

## License

Apache-2.0. Allure source is original; Bootstrap is reused through the separately installed dependency.
