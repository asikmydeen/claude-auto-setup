# Muse Vue Ant Design Dashboard PRO

## Project Overview
Premium dashboard template built with Vue 2 and Ant Design Vue, featuring modern UI components and business intelligence widgets.

## Tech Stack
- **Framework**: Vue 2.6.14
- **UI Library**: Ant Design Vue 1.7.7
- **CSS**: SCSS/SASS
- **Build Tool**: Vue CLI 4.5.13
- **Router**: Vue Router 3.5.2
- **Charts**: Chart.js 3.5.1

## Key Dependencies
- FullCalendar 5.9.0 (calendar components)
- Quill 1.3.7, vue-quill-editor 3.0.6 (rich text editor)
- vue-pswipe 0.15.3 (image gallery)
- vuedraggable 2.24.3 (drag & drop)

## Directory Structure
```
├── src/
│   ├── assets/          # Static assets
│   ├── components/      # Reusable components
│   ├── views/           # Page components
│   ├── router/          # Routes
│   ├── App.vue
│   └── main.js
├── public/
└── package.json
```

## Scripts
- `npm run serve` / `npm run dev` - Start development server (opens browser)
- `npm run build` - Production build

## Key Patterns
- Ant Design Vue component library (a-* prefix)
- SCSS for styling
- FullCalendar for event management
- Quill for rich text editing
- Vue Router for SPA navigation

## Known Gotchas
- Uses Vue 2.6.14 (no Composition API)
- Ant Design Vue 1.x (older version)
- node-sass for SCSS compilation
