# Vite Soft UI Dashboard PRO

## Project Overview
Modern dashboard built with Vue 3 and Vite, featuring Soft UI design system and Bootstrap 5.

## Tech Stack
- **Framework**: Vue 3.2.25
- **Build Tool**: Vite 2.8.0
- **UI Framework**: Bootstrap 5.1.3 (custom Soft UI theme)
- **State Management**: Vuex 4.0.2
- **Router**: Vue Router 4.0.14
- **CSS**: SASS 1.49.9

## Key Dependencies
- FullCalendar 5.10.1 (Vue 3 version)
- Chart.js 3.6.0 (data visualization)
- Quill 1.3.7 (rich text editor)
- Choices.js 10.1.0 (select enhancement)
- Dropzone 6.0.0-beta.2 (file uploads)
- jKanban 1.3.1 (kanban boards)
- Leaflet 1.7.1 (maps)
- PhotoSwipe 4.1.3 (image gallery)
- Three.js 0.124.0 (3D graphics)
- vue-sweetalert2 5.0.2 (modals)

## Directory Structure
```
├── src/
│   ├── assets/          # Static assets and styles
│   ├── components/      # Reusable components
│   ├── views/           # Page components
│   ├── router/          # Route config
│   ├── store/           # Vuex store
│   ├── App.vue
│   └── main.js
├── public/
└── vite.config.js
```

## Scripts
- `npm run dev` - Start Vite dev server
- `npm run build` - Production build
- `npm run preview` - Preview production build (port 8080)
- `npm run lint` - ESLint with auto-fix
- `npm run format` - Prettier formatting

## Key Patterns
- Vite for fast HMR and builds
- Vue 3 Composition API
- Vuex for centralized state
- Bootstrap 5 utility classes
- SASS for theming
- Custom Soft UI design tokens

## Known Gotchas
- Vite requires ES modules (no CommonJS)
- Uses Vue 3 FullCalendar plugin (@fullcalendar/vue3)
- Dropzone beta version may have API changes
