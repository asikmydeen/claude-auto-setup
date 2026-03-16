# Vue Now UI Kit PRO

## Project Overview
Premium Vue 2 UI kit with Now UI design for landing pages and marketing sites.

## Tech Stack
- **Framework**: Vue 2.6.14
- **Build Tool**: Vue CLI 5.0.8, Gulp 4.0.2
- **UI Library**: Element UI 2.15.12
- **CSS**: Bootstrap 4.6.0, SASS 1.56.1
- **Router**: Vue Router 3.5.2

## Key Dependencies
- Element UI 2.15.12
- vue-lazyload 1.3.4 (lazy loading)
- vue2-google-maps 0.10.7 (maps)
- vue2-transitions 0.3.0 (animations)
- nouislider 15.6.1
- Rellax 1.12.1 (parallax effects)
- Gulp for build tasks

## Directory Structure
```
├── src/
│   ├── assets/
│   ├── components/
│   ├── views/
│   ├── router/
│   └── main.js
├── public/
├── docs/                # Documentation build
└── package.json
```

## Scripts
- `npm run serve` / `npm run dev` - Dev server with auto-open
- `npm run build` - Production build
- `npm run build:docs` - Build documentation
- `npm run build:all` - Build app and docs
- `npm run deploy` - Deploy to gh-pages
- `npm run lint` - Lint code

## Key Patterns
- Now UI design system
- Marketing/landing page focused
- Parallax effects with Rellax
- Image lazy loading
- Google Maps integration
- PWA support
- Documentation build system

## Known Gotchas
- Gulp used alongside Vue CLI
- Rellax for parallax scrolling
- Documentation in separate build
- PWA plugin included
