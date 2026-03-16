# Vuetify Soft UI Dashboard PRO

## Project Overview
Premium Vue 2 admin dashboard combining Vuetify components with Soft UI design system.

## Tech Stack
- **Framework**: Vue 2.6.14
- **UI Library**: Vuetify 2.5.10
- **Build Tool**: Vue CLI 4.5.14
- **Router**: Vue Router 3.5.2
- **Validation**: Vuelidate 0.7.6
- **CSS**: SASS 1.32.12

## Key Dependencies
- Vuetify 2.5.10 (Material Design components with Soft UI styling)
- FullCalendar 5.10.0
- Chart.js 3.5.1
- D3.js 7.1.1, Datamaps 0.5.9
- Dropzone 5.9.3
- Leaflet 1.7.1, vue2-leaflet 2.7.1
- Quill 1.3.7
- SweetAlert2 11.1.9, vue-sweetalert2 5.0.2
- Perfect Scrollbar 1.5.2
- vue-kanban 1.8.0
- vue-pswipe 0.15.3
- vue-round-slider 1.0.1
- Three.js 0.133.1 (3D graphics)
- orbit-controls 1.2.4 (3D camera controls)

## Directory Structure
```
├── src/
│   ├── assets/          # Images, Soft UI styles
│   ├── components/      # UI components
│   ├── views/           # Pages
│   ├── router/          # Routes
│   ├── plugins/         # Vuetify with Soft UI theme
│   └── main.js
├── public/
└── package.json
```

## Scripts
- `npm run serve` / `npm run dev` - Dev server with auto-open
- `npm run build` - Production build
- `npm run lint` - Lint code

## Key Patterns
- Vuetify components styled with Soft UI design
- Material Design + Soft UI hybrid
- Vuelidate for validation
- Three.js for 3D visualizations
- vue2-leaflet for maps
- Custom Soft UI theme on Vuetify

## Known Gotchas
- Vuetify with custom Soft UI theming
- Three.js + orbit-controls for 3D features
- Large bundle due to Vuetify + Three.js
- Hybrid design system (Material + Soft UI)
