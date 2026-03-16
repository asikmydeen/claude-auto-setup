# Vue Argon Design System PRO

## Project Overview
Premium design system and UI kit for Vue 2 with Bootstrap-Vue and Argon design language. Marketing/landing page focused.

## Tech Stack
- **Framework**: Vue 2.7.14
- **UI Library**: Bootstrap-Vue 2.23.1, Element UI 2.15.12
- **Router**: Vue Router 3.6.5
- **CSS**: SASS 1.56.1
- **Build Tool**: Vue CLI 4.5.8

## Key Dependencies
- Bootstrap-Vue 2.23.1 (primary UI framework)
- Element UI 2.15.12 (additional components)
- vue-glide-js 1.3.14 (carousel/slider)
- vue2-google-maps 0.10.7 (map integration)
- vue2-transitions 0.3.0 (animations)
- Headroom.js 0.12.0 (sticky header)
- nouislider 15.6.1 (range sliders)
- Choices.js 9.1.0 (select enhancement)
- vue-flatpickr-component 11.0.1 (date picker)

## Directory Structure
```
├── src/
│   ├── assets/          # Images, SCSS
│   ├── components/      # UI components
│   ├── views/           # Page components
│   ├── router/          # Routes
│   ├── plugins/         # Plugin configs
│   └── main.js
├── public/
└── package.json
```

## Scripts
- `npm run serve` - Dev server
- `npm run build` - Production build
- `npm run lint` - Lint code

## Key Patterns
- Bootstrap-Vue for layout and components
- Element UI for form elements
- Glide.js for carousels and sliders
- Google Maps integration
- Headroom for header behavior
- Custom transitions

## Known Gotchas
- Design system focused (not admin dashboard)
- Vue 2.7 with Composition API support
- Bootstrap-Vue requires specific setup
