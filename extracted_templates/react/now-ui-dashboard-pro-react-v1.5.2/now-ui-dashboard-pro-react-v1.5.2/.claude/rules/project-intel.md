# Project Intelligence: now-ui-dashboard-pro-react

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

- bootstrap
- chart.js
- classnames
- match-sorter
- moment
- sass
- nouislider
- perfect-scrollbar
- react
- react-big-calendar

## Build & Development

**Available Scripts:**
- `start`: react-scripts start
- `build`: react-scripts build
- `test`: react-scripts test
- `eject`: react-scripts eject
- `compile-sass`: node-sass src/assets/scss/now-ui-dashboard.scss src/assets/css/now-ui-dashboard.css
- `minify-sass`: node-sass src/assets/scss/now-ui-dashboard.scss src/assets/css/now-ui-dashboard.min.css --output-style compressed
- `map-sass`: node-sass src/assets/scss/now-ui-dashboard.scss src/assets/css/now-ui-dashboard.css --source-map true
- `install:clean`: rm -rf node_modules/ && rm -rf package-lock.json && npm install && npm start

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



