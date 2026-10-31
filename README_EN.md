# Allure Router UI 2.0 — OpenWrt 25.12+ redesign

Version 2.0 replaces conflicting global style sheets and DOM-mutating adapters with a single conservative, scoped CSS layer (`allure-system.css`). Native HTML tables and LuCI flex `.table/.tr/.td` structures are handled separately. Complex mobile tables scroll inside their containers; short, structurally verified routing rule tables may be rendered as cards, without altering event handlers or form values.

## Install

Back up your router configuration and maintain SSH access. Transfer `Allure_Router_OpenWrt25` into `/tmp` and run:

```sh
cd /tmp/Allure_Router_OpenWrt25
sh install.sh
```

Requires a compatible OpenWrt 25.12 LuCI install, bootstrap theme and `rpcd-mod-ucode`. No network settings are changed. To restore Bootstrap over SSH:

```sh
uci set luci.main.mediaurlbase='/luci-static/bootstrap'
uci commit luci
/etc/init.d/uhttpd reload
```

The theme is verified on a live Cudy TR3000 router (OpenWrt 25.12.5): dashboard, Forkop, network, wireless, processes, packages, startup, SSH keys, backups and system settings checked at 320, 390 and 1440 px. Custom third-party applications may need further adjustments.
