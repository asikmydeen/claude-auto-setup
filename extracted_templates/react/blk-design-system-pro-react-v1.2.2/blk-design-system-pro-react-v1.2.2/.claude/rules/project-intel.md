# Project Intelligence: blk-design-system-pro-react

## Overview
Bootstrap/Reactstrap Dashboard Template

**Tech Stack:**
- React 18.2.0
- UI Library: Bootstrap/Reactstrap
- Build Tool: Create React App
- Styling: CSS/SCSS
- State Management: React Hooks
- Routing: React Router
- TypeScript: No

## Directory Structure

```
src/
  components/
  variables/
  views/
  assets/
```

**Key directories:**
- `components/`
- `variables/`
- `views/`
- `assets/`

## Key Dependencies

- @fortawesome/fontawesome-free
- @testing-library/jest-dom
- @testing-library/react
- @testing-library/user-event
- bootstrap
- chart.js
- eslint-plugin-flowtype
- headroom.js
- moment
- nouislider

## Build & Development

**Available Scripts:**
- `start`: react-scripts start
- `build`: react-scripts build
- `test`: react-scripts test
- `eject`: react-scripts eject
- `install:clean`: rm -rf node_modules/ && rm -rf package-lock.json && npm install && npm start
- `compile-sass`: sass src/assets/scss/blk-design-system-pro-react.scss src/assets/css/blk-design-system-pro-react.css
- `minify-sass`: sass src/assets/scss/blk-design-system-pro-react.scss src/assets/css/blk-design-system-pro-react.min.css --style compressed

## Architecture Patterns

**Component Structure:**
- Functional components with hooks
- Bootstrap/Reactstrap component library
- CSS/SCSS for styling

**Routing:**
- React Router for navigation


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



