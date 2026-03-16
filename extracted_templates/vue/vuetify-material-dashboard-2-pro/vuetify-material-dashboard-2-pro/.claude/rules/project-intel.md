# Vuetify Material Dashboard 2 PRO

## Project Overview
Premium Vue 2 admin dashboard built with Vuetify 2 and Material Design components.

## Tech Stack
- **Framework**: Vue 2.6.14
- **UI Library**: Vuetify 2.5.10
- **Build Tool**: Vue CLI 4.5.14
- **Router**: Vue Router 3.5.2
- **Validation**: Vuelidate 0.7.6
- **CSS**: SASS 1.32.12

## Key Dependencies
- Vuetify 2.5.10 (comprehensive Material Design component library)
- FullCalendar 5.10.0
- Chart.js 3.5.1
- D3.js 7.1.1, Datamaps 0.5.9
- Dropzone 5.9.3
- jsvectormap 1.4.5 (vector maps)
- Leaflet 1.7.1, vue2-leaflet 2.7.1 (maps)
- Quill 1.3.7 (rich text editor)
- SweetAlert2 11.1.9, vue-sweetalert2 5.0.2
- Perfect Scrollbar 1.5.2
- vue-kanban 1.8.0 (kanban boards)
- vue-pswipe 0.15.3 (image gallery)
- vue-round-slider 1.0.1

## Directory Structure
```
├── src/
│   ├── assets/          # Images, styles
│   ├── components/      # UI components
│   ├── views/           # Pages
│   ├── router/          # Routes
│   ├── plugins/         # Vuetify config
│   └── main.js
├── public/
└── package.json
```

## Scripts
- `npm run serve` / `npm run dev` - Dev server with auto-open
- `npm run build` - Production build
- `npm run lint` - Lint code

## Key Patterns
- Vuetify Material Design components (v-* prefix)
- Material Design 2 specifications
- Comprehensive component library
- Vuelidate for form validation
- vue2-leaflet for maps
- vue-kanban for project boards
- SASS variables for theming

## Known Gotchas
- Vuetify 2.5.10 (comprehensive but large bundle)
- vue-cli-plugin-vuetify for integration
- FontAwesome Free in devDependencies
- Vuelidate (not vee-validate)
