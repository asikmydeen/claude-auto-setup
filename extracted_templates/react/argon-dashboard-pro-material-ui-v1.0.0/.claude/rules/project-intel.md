# Project Intelligence: argon-dashboard-material-pro-ui

## Overview
Material UI version of Argon Dashboard PRO React by Creative Tim

**Tech Stack:**
- React 17.0.1
- UI Library: Material UI
- Build Tool: Create React App
- Styling: Emotion
- State Management: React Hooks
- Routing: React Router
- TypeScript: No

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

- @emotion/react
- @emotion/styled
- @fortawesome/fontawesome-free
- @fullcalendar/core
- @fullcalendar/daygrid
- @fullcalendar/interaction
- @material-ui/core
- @material-ui/data-grid
- @material-ui/icons
- @material-ui/lab

## Build & Development

**Available Scripts:**
- `start`: react-scripts start
- `build`: react-scripts build && gulp licenses
- `test`: react-scripts test
- `eject`: react-scripts eject
- `install:clean`: rm -rf node_modules/ && rm -rf package-lock.json && npm install && npm start
- `compile:scss`: node-sass --importer node_modules/node-sass-package-importer/dist/cli.js src/assets/scss/argon-dashboard-pro-material-ui.scss src/assets/css/argon-dashboard-pro-material-ui.css
- `minify:scss`: node-sass --importer node_modules/node-sass-package-importer/dist/cli.js src/assets/scss/argon-dashboard-pro-material-ui.scss src/assets/css/argon-dashboard-pro-material-ui.min.css --output-style compressed
- `map:scss`: node-sass --importer node_modules/node-sass-package-importer/dist/cli.js src/assets/scss/argon-dashboard-pro-material-ui.scss src/assets/css/argon-dashboard-pro-material-ui.css --source-map true

## Architecture Patterns

**Component Structure:**
- Functional components with hooks
- Material UI component library
- Emotion for styling

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
- Emotion

- Material-UI theme provider for global theming

