# Allure Changelog

## 2.0.3 — single-line action buttons
- Process list: action buttons no longer overlap the "Memory usage" column — native-table action cells stay real table-cells (a flex td broke column negotiation); nowrap keeps the cluster on one line and the column grows to fit.
- Log out is now a plain one-click nav button with a warm hover instead of a collapsible submenu.
- Every native dropdown (`.cbi-input-select`) wears the theme regardless of app-level CSS overrides: theme font, field height, chevron, colors.
- LuCI modals are centered in both axes over the blurred scrim, with themed panel, radius, border and shadow.
- Package manager page: filter / download / actions / translation rows are grouped into soft cards with uppercase labels and consistent gaps.
- Status Overview polish: section title rows are flex with a themed "Hide" pill chip (proper padding, offset from the card edge, hover state), and `.cbi-progressbar` bars (memory, storage, active connections) are now thick rounded pills with the value rendered centered inside the fill.
- Native `<table class="table">` restored to real table geometry (columns shared between header and data rows), so key-value tables read label → value at a consistent offset and multi-column tables like DHCP Leases line up perfectly instead of scattering.
- Native `<select>` dropdowns styled as theme fields with a custom chevron; the popup follows the dark/light color scheme.
- LuCI modals (`#modal_overlay .modal`) skinned: themed panel, border, radius, shadow, blurred scrim, styled title divider.
- Action buttons in tables now always stay on one row on every page (Interfaces Restart/Stop/Edit/Delete, Wireless Disable/Edit/Remove, Processes, Startup, Forkop), desktop and mobile: action cells no longer wrap and get the width they need, while narrow screens scroll the table horizontally instead.
- Added coverage for interface-style cells whose buttons are wrapped in a single inner `div` (`:has(> div > .cbi-button + .cbi-button)`), which previously fell through all action-cell rules.
- Covered native `<table class="table">` action cells (`td.cbi-section-actions`), which the flex-row rules skipped because of the `tbody` level.
- LuCI `.controls` rows (package manager filters and actions) now wrap inside their card on narrow screens instead of bleeding into the padding.
- Removed the 360/370 px max-width caps on action cells; rows carrying three or more buttons claim a larger flex share instead.

## 2.0.2 — visual perfectionism pass
- Removed the 5 px LuCI body padding frame: the shell, topbar, sidebar and footer now reach the viewport edges on every page, and the login screen no longer shows a scrollbar or body-background strips above/below the card.
- Flex tables (`.table`) now stretch their cells: row underlines, header strips and action buttons reach the full card width instead of ending ragged mid-card (Overview, Routing, Processes, Startup, Software and friends). Buttons in action cells stay on one line on desktop.
- Fixed the breadcrumb and sidebar highlight on pages LuCI dispatches through a default child (`System Log → syslog`, `Realtime Graphs → load`, `Network Firewall → zones`): matching is now prefix-based with the deepest route winning, so these pages no longer fall back to "Control Center".
- Tabbed app views (Forkop) no longer leave empty bordered shells of inactive tabs stacked above the active tab; inactive `data-tab` sections are hidden in sync with the tab strip.
- Narrow screens: native `<table class="table">` elements now really scroll horizontally instead of widening the whole page (Software, Processes).

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
