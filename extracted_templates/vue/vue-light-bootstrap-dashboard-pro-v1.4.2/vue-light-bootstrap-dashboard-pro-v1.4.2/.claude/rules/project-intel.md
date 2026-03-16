# Vue Light Bootstrap Dashboard PRO

## Project Overview
Lightweight Vue 2 admin dashboard with Bootstrap 4 and minimalist design.

## Tech Stack
- **Framework**: Vue 2.7.14
- **UI Library**: Element UI 2.15.12
- **CSS**: Bootstrap 4.6.0, SASS 1.56.1
- **Build Tool**: Vue CLI 4.5.13
- **Router**: Vue Router 3.5.2
- **Charts**: Chartist 0.11.4
- **Validation**: vee-validate 3.4.11

## Key Dependencies
- Chartist 0.11.4 (lightweight charts)
- FullCalendar 5.11.3
- D3.js 7.6.1, Datamaps 0.5.9
- SweetAlert2 11.6.14
- Perfect Scrollbar 1.5.5
- easy-pie-chart 2.1.7
- vue-form-wizard 0.8.4 (multi-step forms)
- vue-nav-tabs 0.5.7 (tab navigation)
- vue2-google-maps 0.10.7
- v-tooltip 2.1.3

## Directory Structure
```
├── src/
│   ├── assets/
│   ├── components/
│   ├── views/
│   ├── router/
│   └── main.js
├── public/
└── package.json
```

## Scripts
- `npm run dev` - Dev server with auto-open
- `npm run build` - Production build
- `npm run lint` - Lint code

## Key Patterns
- Light, minimalist UI design
- Chartist for simple, responsive charts
- Element UI components
- Bootstrap 4 layout
- Form wizard for multi-step forms
- Tooltips via v-tooltip

## Known Gotchas
- Uses Chartist (not Chart.js) for lighter bundle
- easy-pie-chart for circular progress
- vue-form-wizard for stepped workflows
