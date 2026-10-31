#!/bin/sh
# Allure direct source deployment for OpenWrt 25.12+ / LuCI ucode templates.
set -eu
if [ "$(id -u)" != 0 ]; then echo "ERROR: run as root on OpenWrt." >&2; exit 1; fi
cd "$(dirname "$0")"
for path in /usr/share/ucode/luci/template /www/luci-static/resources /etc/init.d/rpcd; do
  [ -e "$path" ] || { echo "Missing LuCI/rpcd path: $path" >&2; exit 1; }
done
if [ ! -f /www/luci-static/bootstrap/cascade.css ]; then
  echo "Please install luci-theme-bootstrap first: apk add luci-theme-bootstrap" >&2; exit 1
fi
if [ ! -d /usr/share/rpcd/ucode ]; then
  echo "Please install the rpcd-mod-ucode package: apk add rpcd-mod-ucode" >&2; exit 1
fi
# Copy only the files owned by this project. No firewall, WLAN, or network changes.
find htdocs root ucode -type f | while IFS= read -r src; do
  case "$src" in
    htdocs/*) dest="/www/${src#htdocs/}" ;;
    root/*) dest="/${src#root/}" ;;
    ucode/*) dest="/usr/share/ucode/luci/${src#ucode/}" ;;
    *) continue ;;
  esac
  mkdir -p "$(dirname "$dest")"
  cp "$src" "$dest"
done
chmod 755 /etc/uci-defaults/99_allure
/bin/sh /etc/uci-defaults/99_allure
uci set luci.main.mediaurlbase='/luci-static/allure'
uci commit luci
rm -f /tmp/luci-indexcache
/etc/init.d/rpcd restart
/etc/init.d/uhttpd reload 2>/dev/null || true
echo "Allure installed. Reload LuCI and open Status > Allure Dashboard."
echo "For rollback: uci set luci.main.mediaurlbase=/luci-static/bootstrap; uci commit luci"
