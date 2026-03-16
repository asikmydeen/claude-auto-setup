# Project Intelligence: argon-dashboard-pro-react

## Overview
Bootstrap/Reactstrap Dashboard Template

**Tech Stack:**
- React 18.2.0
- UI Library: Bootstrap/Reactstrap
- Build Tool: Create React App
- Styling: CSS/SCSS
- State Management: React Hooks
- Routing: React Router
- TypeScript: Yes

## Directory Structure

```
src/
  components/
  layouts/
  variables/
  views/
  assets/
```

**Key directories:**
- `components/`
- `layouts/`
- `variables/`
- `views/`
- `assets/`

## Key Dependencies

- @fortawesome/fontawesome-free
- @fullcalendar/core
- @fullcalendar/daygrid
- @fullcalendar/interaction
- bootstrap
- chart.js
- classnames
- dropzone
- list.js
- moment

## Build & Development

**Available Scripts:**
- `start`: react-scripts start
- `build`: react-scripts build
- `test`: react-scripts test
- `eject`: react-scripts eject
- `install:clean`: rm -rf node_modules/ && rm -rf package-lock.json && npm install && npm start
- `compile:scss`: sass src/assets/scss/argon-dashboard-pro-react.scss src/assets/css/argon-dashboard-pro-react.css
- `minify:scss`: sass src/assets/scss/argon-dashboard-pro-react.scss src/assets/css/argon-dashboard-pro-react.min.css --style compressed
- `build:scss`: npm run compile:scss && npm run minify:scss && npm run map:scss

## Architecture Patterns

**Component Structure:**
- Functional components with hooks
- Bootstrap/Reactstrap component library
- CSS/SCSS for styling

**Routing:**
- React Router for navigation
- Nested route structure for dashboard layouts

**State Management:**
- React Hooks
- Local component state with useState/useReducer

## Known Patterns

**Component Naming:**
- PascalCase for component files
- Kebab-case for asset files

**Import Structure:**
- React imports first
- UI library components second
- Local imports last

**Styling:**
- CSS/SCSS



