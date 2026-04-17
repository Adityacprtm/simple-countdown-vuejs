# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static vanilla HTML/CSS/JS birthday countdown. No build step, no package manager. Open `index.html` directly in a browser or serve with any static file server:

```bash
npx serve .
# or
python3 -m http.server
```

## Architecture

Single-page app with three files:

- **`index.html`** — markup + Vue template (`{{ }}` bindings, `:style` directives)
- **`style.css`** — all styles; uses CSS custom properties defined in `:root` for the design system
- **`app.js`** — Vue 2 instance (CDN); all logic lives here

### app.js structure

- **Constants** at top: `BIRTHDAY_MONTH`, `BIRTHDAY_DAY`, `JAKARTA_TZ`, time unit ms values
- **Pure functions**: `nextBirthday()`, `pad()`, `yearProgressPercent()` — defined outside the Vue instance
- **`computed`**: `target` (next birthday Date), `targetDate`, `targetWeekday` — derived from `target`, not updated every tick
- **`tick()`**: called every second via `setInterval`; updates countdown units, `yearProgress`, and all three timezone strings
- **Lifecycle**: `mounted` starts the interval; `beforeDestroy` clears it

### Design tokens (style.css `:root`)

Matches the portfolio at `~/dev/personal/new/portfolio-frontend`. Key variables: `--bg`, `--surface`, `--border`, `--accent` (`#5b8def`), `--muted`, `--heading`. Always use these vars — no hardcoded colors.

## Birthday date

Change `BIRTHDAY_MONTH` and `BIRTHDAY_DAY` constants in `app.js` to update the target date. The app automatically rolls over to the next year once the date passes.
