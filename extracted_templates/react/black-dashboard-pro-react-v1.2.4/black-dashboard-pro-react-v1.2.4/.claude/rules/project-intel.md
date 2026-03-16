# Project Intelligence: black-dashboard-pro-react

## Overview
Custom Dashboard Template

**Tech Stack:**
- React 18.3.1
- UI Library: Custom
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

- ajv
- autoprefixer
- bootstrap
- chart.js
- classnames
- match-sorter
- moment
- nouislider
- perfect-scrollbar
- postcss

## Build & Development

**Available Scripts:**
- `start`: react-scripts start
- `build`: react-scripts build
- `test`: react-scripts test
- `eject`: react-scripts eject
- `install:clean`: rm -rf node_modules/ && rm -rf package-lock.json && npm install && npm start
- `compile-sass`: sass src/assets/scss/black-dashboard-pro-react.scss src/assets/css/black-dashboard-pro-react.css
- `minify-sass`: sass src/assets/scss/black-dashboard-pro-react.scss src/assets/css/black-dashboard-pro-react.min.css --style compressed

## Architecture Patterns

**Component Structure:**
- Functional components with hooks
- Custom component library
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



