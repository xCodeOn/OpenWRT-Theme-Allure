## Allure v1.3 additions

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
