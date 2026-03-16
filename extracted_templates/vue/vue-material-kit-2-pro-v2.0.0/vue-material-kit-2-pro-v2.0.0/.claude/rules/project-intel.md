# Vue Material Kit 2 PRO

## Project Overview
Premium Vue 3 UI kit with Vite, Bootstrap 5, and Material Design for landing pages and marketing sites.

## Tech Stack
- **Framework**: Vue 3.2.36
- **Build Tool**: Vite 2.9.9
- **UI Framework**: Bootstrap 5.1.3 (Material theme)
- **State Management**: Pinia 2.0.14
- **Router**: Vue Router 4.0.15
- **CSS**: SASS 1.52.3

## Key Dependencies
- Pinia 2.0.14 (Vue 3 state management, Vuex successor)
- Choices.js 10.1.0 (select enhancement)
- Typed.js 2.0.12 (typing animation)
- vue-count-to 1.0.13 (number animations)
- vue-flatpickr-component 9.0.6 (date picker)
- @vueform/slider 2.1.1 (range slider)
- vue-clipboard3 2.0.0 (clipboard)
- Prism.js 1.28.0 (syntax highlighting)
- vue-prism-editor 2.0.0-alpha.2 (code editor)

## Directory Structure
```
├── src/
│   ├── assets/          # Styles, images
│   ├── components/      # UI components
│   ├── views/           # Pages
│   ├── router/          # Routes
│   ├── stores/          # Pinia stores
│   ├── examples/        # Example sections
│   └── main.js
├── public/
└── vite.config.js
```

## Scripts
- `npm run dev` - Vite dev server
- `npm run build` - Production build
- `npm run preview` - Preview build (port 4173)
- `npm run lint` - ESLint with auto-fix

## Key Patterns
- Vite for fast builds
- Pinia for state (replaces Vuex)
- Material Design on Bootstrap 5
- Marketing/landing page focused
- Syntax highlighting for code examples
- Typing animations
- Code editor component

## Known Gotchas
- Pinia (not Vuex) for state management
- UI kit (not admin dashboard)
- Vite config for builds
