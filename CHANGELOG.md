# Allure Changelog

## 2.1.7 — forkop tabs beyond the first
- Tabbed app views rendered flat inside `.cbi-map-tabbed` (Forkop) now stay visible after switching tabs: bootstrap's `cascade.css` collapses every `[data-tab-title]` panel (`height:0;opacity:0;overflow:hidden`) and only re-opens the one carrying `[data-tab-active="true"]`, but tab switching on these maps moved only the `li` classes and `hidden` flags, so every tab after the first rendered as an empty 32 px sliver. `syncTabbedSections()` now mirrors `data-tab-active` onto the active section (and clears it from the rest), letting the stock un-collapse rule apply; the no-active-tab fallback still shows every section.

## 2.1.6 — themed scroll pills inside modals
- Tab strips inside LuCI modals (Device/Interface Configuration in the wireless and interface editors) get the same themed horizontal-scroll pill as the rest of the UI: the body-wide scanner now covers #modal_overlay, and the pill styles apply there; a strip with a pill drops its own bottom margin so the spacing stays tight.

## 2.1.5 — modal rework
- Edit modals (wireless / interfaces) rebuilt: the modal is now the single card — nested sections are flattened (no more card-inside-card), every field fills the line (text inputs, selects, cbi-dropdowns), rows are separated by hairlines, and the wireless status badge is a full-width soft card with the signal row above the details instead of a misaligned dark tower overflowing the frame.

## 2.1.4 — modals & table action cells
- LuCI modals (edit interface / wireless network) finally wear the theme: the modal chrome mirrors the content card styles on small screens — stacked left-aligned rows, section cards, pill tab strips that scroll instead of wrapping, inline help "?" icons and a readable two-row wireless status badge. Previously the modal fell back to raw cascade layout (right-aligned labels, wrapped tabs, cramped status tower).
- Table scroll indicators no longer float above buttons: the sticky viewport-bottom pill is replaced by an in-flow indicator that sits between the table and whatever follows it.
- Table action clusters (Startup "Enabled/Start/Restart/Reload/Stop", Mounts) size their column to the content (`min-width:max-content`) instead of overflowing leftwards onto the row label; the scrollable table absorbs the width.

## 2.1.3 — tab overlap fix
- Long tab labels no longer overlap neighbouring tabs: the LuCI `li { max-width:48% }` cap is reset, so each tab sizes to its label and the strip scrolls horizontally instead.

## 2.1.2 — title button spacing
- Title-bar action buttons (e.g. "Refresh Channels" on Channel Analysis) get a flex row with an 8 px gap and 4/6 px margins, so they no longer sit flush against the content edges; left edge aligns with the tab strip below.

## 2.1.1 — alignment polish
- Tab-strip buttons no longer ride below the strip: the LuCI `li { height:25px }` baseline is reset, so labels sit vertically centered.
- The themed horizontal-scroll indicator sits tight under the tab buttons (the strip's bottom margin collapses while it is shown) instead of floating 19 px below.
- Table icon buttons (edit / trash / drag handle) center their glyph exactly: the mask icon is absolutely centered inside the 34 px square, immune to the invisible label text node that used to pull it 3 px left; text-glyph drag handles are sized 34×34 and baseline-corrected.
- "Reset" spans the full action row width on mobile again (the 42 % flex-basis override no longer beats its 100 % rule).
- Routing-rule cards sit inside the table frame with an even 6 px inset on all sides.
- Section-title label buttons (e.g. the "Hide" toggles on the Overview page) match the theme pill style regardless of the `.cbi-title` wrapper: rectangular 8 px radius, real padding, no inherited 36 px line-height, and a 3/6 px margin keeps them off the block edges.

## 2.0.6 — themed scroll indicators
- Tables that overflow horizontally on mobile now show an always-visible themed scroll pill (gradient thumb on a soft track) that tracks the scroll position; the plain native scrollbar inside tables is hidden.
- Indicators appear/disappear automatically as content changes and are removed on desktop widths.

## 2.0.5 — mobile perfectionism pass
- Table action buttons on mobile become compact 34 px icon buttons (pencil / trash / rotate / play / stop / power / check / download / …) keyed by their label, so columns stop wrapping and text stops hiding under buttons. Labels remain for screen readers and desktop is untouched.
- Block-table rows hug the left edge on mobile (Startup rows no longer bleed off both sides).
- Form labels (System, DNS, Diagnostics…) read left-aligned above their fields instead of centered.
- Inline filter rows (System Log) keep "Not + label + field" together on one wrapping line.
- Diagnostics-style layout tables stack: full-width input with the action dropdown underneath instead of letter-stacked buttons.
- Forkop routing-card layout stays authoritative on mobile (the earlier native-cell override broke it into vertical letters).

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
