# Vue Argon Dashboard PRO (Bootstrap 4)

## Project Overview
Vue 3 admin dashboard with Bootstrap 4 and Argon design system.

## Tech Stack
- **Framework**: Vue 3.0.11
- **Build Tool**: Vue CLI 4.5.19
- **UI Framework**: Bootstrap 4.6.0
- **Router**: Vue Router 4.0.1
- **Validation**: vee-validate 4.7.3 + yup 0.32.11
- **CSS**: SASS 1.56.1

## Key Dependencies
- FullCalendar 5.11.3
- Chart.js 2.9.4
- D3.js 7.7.0, Datamaps 0.5.9
- Quill (via @vueup/vue-quill 1.0.0)
- Dropzone 5.9.3
- Element Plus 1.0.1-beta.24
- SweetAlert2 11.6.15
- vue-toastification 2.0.0-beta.9
- Perfect Scrollbar 1.5.5

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
- `npm run serve` - Dev server
- `npm run build` - Production build
- `npm run lint` - Lint code

## Key Patterns
- Vue 3 with Options API
- Bootstrap 4 components
- vee-validate 4 with yup schemas
- Element Plus for enhanced components
- Toast notifications via vue-toastification

## Known Gotchas
- Bootstrap 4 (not 5)
- Uses Element Plus (not Element UI)
- Perfect Scrollbar in devDependencies (should be dependency)
