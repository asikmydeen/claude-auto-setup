# BootstrapVue Argon Dashboard PRO

## Project Overview
Premium admin dashboard built with Vue 2 and Bootstrap-Vue, featuring a rich set of UI components and data visualizations.

## Tech Stack
- **Framework**: Vue 2.7.14
- **UI Library**: Bootstrap-Vue 2.23.1, Element UI 2.15.12
- **CSS**: Bootstrap 4.6.0, SASS/SCSS
- **Build Tool**: Vue CLI 4.5.13
- **Router**: Vue Router 3.5.2
- **Charts**: Chart.js 2.9.4, vue-chartjs 3.5.1
- **Validation**: vee-validate 3.4.13

## Key Dependencies
- FullCalendar 5.11.3 (calendar components)
- Google Maps API loader 1.15.1
- D3.js 7.7.0, Datamaps 0.5.9 (data visualization)
- Quill 1.3.7 (rich text editor)
- Dropzone 5.9.3 (file uploads)
- SweetAlert2 11.6.15 (modals)
- Flatpickr 4.6.13 (date picker)

## Directory Structure
```
├── src/
│   ├── assets/          # Static assets (images, styles)
│   ├── components/      # Reusable Vue components
│   ├── views/           # Page-level components
│   ├── router/          # Route definitions
│   ├── plugins/         # Plugin configurations
│   ├── App.vue          # Root component
│   └── main.js          # Application entry
├── public/              # Static files
└── package.json
```

## Scripts
- `npm run serve` / `npm run dev` - Start development server with auto-open
- `npm run build` - Production build
- `npm run lint` - Lint and fix code

## Key Patterns
- Bootstrap-Vue component library for UI elements
- Element UI for additional form components
- SCSS for styling with Bootstrap variables
- Vue Router for navigation
- Chart.js for data visualizations
- Custom transitions via vue2-transitions

## Known Gotchas
- Uses Vue 2.7 (latest Vue 2 with Composition API backport)
- Bootstrap 4 (not Bootstrap 5)
- Requires Node.js for build process
- Element UI uses on-demand component loading via babel-plugin-component
