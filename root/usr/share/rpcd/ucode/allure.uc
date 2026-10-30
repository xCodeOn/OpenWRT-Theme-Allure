'use strict';

// This RPC endpoint is read-only and exposes only limited numerical temperature
// data. No shell calls, no user-controlled paths, no configuration writes.
import * as fs from 'fs';

function read_temp(path) {
    let raw = fs.readfile(path);
    if (raw == null) return null;
    let num = +raw;
    if (!(num >= -50 && num <= 250000)) return null;
    if (num > 1000) num /= 1000.0;
    if (!(num >= -20 && num <= 125)) return null;
    return +sprintf('%.1f', num);
}

function read_label(path, fallback) {
    let raw = fs.readfile(path);
    if (raw == null) return fallback;
    let clean = replace(raw, /[^a-zA-Z0-9 _.-]/g, '');
    return length(clean) ? substr(clean, 0, 40) : fallback;
}

const methods = {
    sensors: {
        call: function() {
            let readings = [];
            // Standard OpenWrt thermal zones, particularly useful on MT7981.
            for (let i = 0; i < 16; i++) {
                let path = '/sys/class/thermal/thermal_zone' + i;
                let value = read_temp(path + '/temp');
                if (value == null) continue;
                let type = read_label(path + '/type', 'Thermal ' + i);
                push(readings, { id: 'tz' + i, label: type, celsius: value, source: 'thermal' });
            }
            // Some firmware builds expose board, Wi-Fi, or PHY via hwmon only.
            for (let i = 0; i < 12; i++) {
                for (let j = 1; j <= 4; j++) {
                    let base = '/sys/class/hwmon/hwmon' + i + '/temp' + j;
                    let value = read_temp(base + '_input');
                    if (value == null) continue;
                    let label = read_label(base + '_label', 'hwmon' + i + ' / sensor ' + j);
                    push(readings, { id: 'hw' + i + 't' + j, label: label, celsius: value, source: 'hwmon' });
                }
            }
            return { sensors: readings };
        }
    }
};

return { 'luci.allure': methods };
