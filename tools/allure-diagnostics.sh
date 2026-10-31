#!/bin/sh
# Read-only diagnostic for temperature sensors, LuCI ACL and Allure RPC.
set -u
printf '\n=== ALLURE TEMPERATURE DIAGNOSTICS ===\n'
printf '\n[1] OpenWrt board\n'
[ -f /etc/openwrt_release ] && cat /etc/openwrt_release
ubus call system board 2>/dev/null || true
printf '\n[2] RPC registration\n'
ubus -v list luci.allure 2>&1 || true
printf '\n[3] RPC thermal result\n'
ubus call luci.allure sensors 2>&1 || true
printf '\n[4] Kernel thermal zones\n'
for file in /sys/class/thermal/thermal_zone*/temp; do
  [ -r "$file" ] || continue
  printf '%s = ' "$file"; cat "$file" 2>/dev/null || true
  t="${file%/temp}/type"; [ -r "$t" ] && { printf '    type = '; cat "$t"; }
done
printf '\n[5] Hardware monitor sensors\n'
for file in /sys/class/hwmon/hwmon*/temp*_input; do
  [ -r "$file" ] || continue
  printf '%s = ' "$file"; cat "$file" 2>/dev/null || true
done
printf '\n[6] Installed backend and ACL\n'
ls -l /usr/share/rpcd/ucode/allure.uc /usr/share/rpcd/acl.d/luci-theme-allure.json 2>&1 || true
printf '\n[7] Thermal driver info (if available)\n'
[ -r /proc/modules ] && grep -Ei 'thermal|hwmon|mtk' /proc/modules || true
[ -r /sys/kernel/debug/clk/clk_summary ] && echo 'Note: clk debugfs available (not needed for temperature)'
printf '\nAllure never invents temperature values. If sysfs is empty, check your firmware kernel/DT thermal driver.\n'
