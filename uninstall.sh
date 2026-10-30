#!/bin/sh
# Safe rollback and removal of only Allure-owned files.
set -eu
if [ "$(id -u)" != 0 ]; then echo "Run as root" >&2; exit 1; fi
uci set luci.main.mediaurlbase='/luci-static/bootstrap'
uci -q delete luci.themes.Allure || true
uci commit luci
rm -rf /www/luci-static/allure
rm -f /www/luci-static/resources/menu-allure.js
rm -f /www/luci-static/resources/view/status/allure.js
rm -rf /usr/share/ucode/luci/template/themes/allure
rm -f /usr/share/luci/menu.d/luci-theme-allure.json
rm -f /usr/share/rpcd/acl.d/luci-theme-allure.json
rm -f /usr/share/rpcd/ucode/allure.uc
rm -f /etc/uci-defaults/99_allure
rm -f /tmp/luci-indexcache
/etc/init.d/rpcd restart
/etc/init.d/uhttpd reload 2>/dev/null || true
echo 'Allure removed; Bootstrap restored.'
