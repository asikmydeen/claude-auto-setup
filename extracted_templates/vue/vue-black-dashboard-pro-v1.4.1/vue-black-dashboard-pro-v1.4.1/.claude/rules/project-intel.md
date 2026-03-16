# Vue Black Dashboard PRO

## Project Overview
Premium Vue 2 admin dashboard with dark theme, Bootstrap 4, and comprehensive UI components.

## Tech Stack
- **Framework**: Vue 2.7.14
- **UI Library**: Element UI 2.15.12
- **CSS**: Bootstrap 4.6.0, SASS 1.56.1
- **Build Tool**: Vue CLI 4.5.13
- **Router**: Vue Router 3.5.2
- **Validation**: vee-validate 3.4.11
- **i18n**: vue-i18n 8.25.0

## Key Dependencies
- FullCalendar 5.11.3
- Chart.js 2.9.3, vue-chartjs 3.5.1
- D3.js 7.6.1, Datamaps 0.5.9
- SweetAlert2 11.6.14
- Perfect Scrollbar 1.5.5
- vue2-google-maps 0.10.7
- vue-router-prefetch 1.6.3 (route prefetching)
- @tweenjs/tween.js 18.6.4 (animations)

## Directory Structure
```
├── src/
│   ├── assets/          # Images, styles
│   ├── components/      # UI components
│   ├── views/           # Pages
│   ├── router/          # Routes with prefetch
│   ├── i18n/            # Translations
│   ├── registerServiceWorker.js
│   └── main.js
├── public/
└── package.json
```

## Scripts
- `npm run serve` / `npm run dev` - Dev server (NODE_OPTIONS=--openssl-legacy-provider)
- `npm run build` - Production build
- `npm run lint` - Lint code

## Key Patterns
- Dark theme design system
- PWA support (service worker)
- Internationalization (i18n)
- Route prefetching
- Element UI for components
- Bootstrap 4 grid and utilities
- Custom chart configurations

## Known Gotchas
- Requires NODE_OPTIONS=--openssl-legacy-provider for serve command
- PWA plugin included
- vue-i18n for multi-language support
