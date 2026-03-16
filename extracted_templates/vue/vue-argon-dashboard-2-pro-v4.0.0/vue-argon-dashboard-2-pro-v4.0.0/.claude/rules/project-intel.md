# Vue Argon Dashboard 2 PRO

## Project Overview
Premium Vue 3 admin dashboard with Bootstrap 5 and Argon design system, featuring extensive components and integrations.

## Tech Stack
- **Framework**: Vue 3.4.19
- **Build Tool**: Vue CLI 5.0.8
- **UI Framework**: Bootstrap 5.3.3 (Argon theme)
- **State Management**: Vuex 4.1.0
- **Router**: Vue Router 4.3.0
- **CSS**: SASS 1.71.1

## Key Dependencies
- FullCalendar 6.1.11 (Vue 3 version)
- Chart.js 4.4.1 (charts)
- Choices.js 10.2.0 (enhanced selects)
- Dragula 3.7.3 (drag & drop)
- Dropzone 6.0.0-beta.2 (file uploads)
- jKanban 1.3.1 (kanban)
- Leaflet 1.9.4 (maps)
- PhotoSwipe 5.4.3 (gallery)
- Quill 1.3.7 (editor)
- vue3-slider 1.9.0 (sliders)
- vue-sweetalert2 5.0.5 (alerts)

## Directory Structure
```
├── src/
│   ├── assets/          # Images, styles
│   ├── components/      # Reusable components
│   ├── views/           # Page components
│   ├── router/          # Routes
│   ├── store/           # Vuex
│   ├── examples/        # Example components
│   └── main.js
├── public/
└── package.json
```

## Scripts
- `npm run serve` - Dev server
- `npm run build` - Production build
- `npm run lint` - ESLint
- `npm run deploy` - Deploy to gh-pages

## Key Patterns
- Vue 3 with Composition API
- Bootstrap 5 utilities and components
- Vuex for global state
- Custom Argon design tokens
- SASS variables for theming

## Known Gotchas
- Node.js version specified in engines
- Uses consolidate 1.0.1 override for template engine compatibility
