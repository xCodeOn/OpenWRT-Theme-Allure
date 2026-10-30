# Allure Changelog

## 2.0.1 — desktop action-row hotfix
- Fixed desktop alignment for native LuCI action cells: buttons now stay in a horizontal row on wider screens when a page renders multiple actions in the same last table cell.
- Applied the fix to interface- and service-style pages without changing mobile behavior.
- Reduced phantom gaps between tab strips and the first content card on affected plugin pages.

## 2.0.0 — full LuCI layout stabilization
- Removed conflicting `allure-refined.css`, `allure-refined.js`, `allure-adaptive.js`.
- New presentation-only `allure-system.css`, respecting native table and LuCI flex table architecture.
- Fixed CBI form alignment, controls, panel sizing and tab spacing.
- Fixed multi-button action cells in processes/startup tables.
- Native mobile table scrolling with horizontal access to all actions.
- Safe, narrowly recognized mobile routing rule cards, with no form-event rewrites.
- Improved compact topbar at 320 px; no viewport overflow.
- Preserved login animation, RU/EN, sidebar, appearance toggles and telemetry.
- Added 11 realistic test fixtures and 33 browser viewport checks.
