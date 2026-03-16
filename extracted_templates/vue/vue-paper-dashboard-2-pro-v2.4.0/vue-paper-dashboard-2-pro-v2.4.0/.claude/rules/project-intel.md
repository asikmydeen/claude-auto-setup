# Vue Paper Dashboard 2 PRO

## Project Overview
Premium Vue 2 admin dashboard with Paper design system and Bootstrap 4.

## Tech Stack
- **Framework**: Vue 2.6.14
- **Build Tool**: Vue CLI 4.5.14
- **UI Library**: Element UI 2.15.6
- **CSS**: Bootstrap (Paper theme), SASS 1.43.2
- **Router**: Vue Router 3.5.2
- **Validation**: vee-validate 3.4.13

## Key Dependencies
- FullCalendar 5.10.0
- Chart.js 2.9.3, vue-chartjs 3.5.1
- D3.js 7.1.1, Datamaps 0.5.9
- SweetAlert2 11.1.8
- Perfect Scrollbar 1.5.2
- vue-notifyjs 0.4.3 (notifications)
- nprogress 0.2.0 (loading bar)
- vue-clickaway 2.2.2

## Directory Structure
```
├── src/
│   ├── assets/
│   ├── components/
│   ├── views/
│   ├── router/
│   ├── registerServiceWorker.js
│   └── main.js
├── public/
└── package.json
```

## Scripts
- `npm run dev` - Dev server with auto-open
- `npm run build` - Production build

## Key Patterns
- Paper design system (handcrafted feel)
- PWA support (service worker)
- Element UI components
- vue-notifyjs for notifications
- nprogress for loading states
- Chart.js for visualizations

## Known Gotchas
- Paper design aesthetic (not Material)
- PWA plugin included
- Node.js >= 8.9.0, npm >= 5.0.0 required
