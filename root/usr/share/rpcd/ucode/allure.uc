'use strict';

/* Allure read-only thermal RPC service for OpenWrt / MediaTek Filogic.
 * All paths are fixed patterns below; requests accept no filesystem paths.
 * Never invent temperatures or execute commands as the web client. */
import * as fs from 'fs';

function number_at(path) {
    let raw = fs.readfile(path);
    if (raw == null) return null;
    let value = +raw;
    if (!(value >= -20000 && value <= 200000)) return null;
    // Linux hwmon and thermal drivers normally report millidegrees Celsius.
    if (value > 1000 || value < -1000) value = value / 1000.0;
    if (!(value >= -20 && value <= 125)) return null;
    return +sprintf('%.1f', value);
}

function clean_text(path, fallback) {
    let raw = fs.readfile(path);
    if (raw == null) return fallback;
    let clean = trim(replace(raw, /[^a-zA-Z0-9 _.,:()\/-]/g, ''));
    return length(clean) ? substr(clean, 0, 60) : fallback;
}

function uniq_push(values, seen, item) {
    // hwmon symlinks and nested platform paths can refer to the same hardware.
    let id = `${item.label}:${item.celsius}`;
    if (seen[id]) return;
    seen[id] = true;
    push(values, item);
}

function collect() {
    let values = [];
    let seen = {};
    let checked = 0;
    let readable = 0;
    let patterns = [
        // The standard in-kernel MediaTek thermal-zone interface:
        '/sys/class/thermal/thermal_zone*/temp',
        '/sys/devices/virtual/thermal/thermal_zone*/temp',
        // Physical hwmon devices, including the ethernet and Wi-Fi PHY:
        '/sys/class/hwmon/hwmon*/temp*_input',
        '/sys/class/ieee80211/phy*/device/hwmon/hwmon*/temp*_input',
        '/sys/devices/platform/*/hwmon/hwmon*/temp*_input',
        '/sys/bus/mdio_bus/devices/*/hwmon/hwmon*/temp*_input'
    ];
    for (let pattern in patterns) {
        let matches = fs.glob(pattern) ?? [];
        for (let path in matches) {
            if (checked >= 128 || length(values) >= 20) break;
            checked++;
            let temp = number_at(path);
            if (temp == null) continue;
            readable++;
            let is_thermal = match(path, /thermal_zone[0-9]+\/temp$/) != null;
            let label = '';
            let origin = '';
            if (is_thermal) {
                label = clean_text(replace(path, /\/temp$/, '/type'), 'SoC / Thermal');
                origin = 'thermal';
                if (match(lc(label), /mtk|soc|cpu|thermal/) != null) label = 'CPU / SoC';
            } else {
                let base = replace(path, /_input$/, '');
                let parent = replace(path, /\/temp[0-9]+_input$/, '');
                let chip = clean_text(parent + '/name', 'Hardware monitor');
                label = clean_text(base + '_label', chip);
                origin = 'hwmon';
            }
            uniq_push(values, seen, { id: sprintf('sensor%d', length(values)), label: label, celsius: temp, source: origin });
        }
        if (checked >= 128 || length(values) >= 20) break;
    }
    return {
        sensors: values,
        status: length(values) ? 'ok' : 'no-kernel-sensors',
        scanned: checked,
        readable: readable,
        backend: 'allure-ucode-1.2'
    };
}

return {
    'luci.allure': {
        sensors: {
            call: function() { return collect(); }
        }
    }
};
