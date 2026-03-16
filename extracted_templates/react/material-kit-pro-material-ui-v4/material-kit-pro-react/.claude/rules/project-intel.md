# Project Intelligence: material-kit-pro-react

## Overview
Material UI Dashboard Template

**Tech Stack:**
- React 16.13.1
- UI Library: Material UI
- Build Tool: Create React App
- Styling: Material-UI (JSS/Emotion)
- State Management: React Hooks
- Routing: React Router
- TypeScript: No

## Directory Structure

```
src/
  components/
  views/
  assets/
```

**Key directories:**
- `components/`
- `views/`
- `assets/`

## Key Dependencies

- @material-ui/core
- @material-ui/icons
- animate.css
- classnames
- history
- moment
- node-sass
- nouislider
- prop-types
- react

## Build & Development

**Available Scripts:**
- `start`: react-scripts start
- `build`: react-scripts build && gulp licenses
- `test`: react-scripts test --env=jsdom
- `eject`: react-scripts eject
- `lint:check`: eslint . --ext=js,jsx;  exit 0
- `lint:fix`: eslint . --ext=js,jsx --fix;  exit 0
- `install:clean`: rm -rf node_modules/ && rm -rf package-lock.json && npm install && npm start
- `compile-sass`: node-sass src/assets/scss/material-kit-pro-react.scss src/assets/css/material-kit-pro-react.css

## Architecture Patterns

**Component Structure:**
- Functional components with hooks
- Material UI component library
- Material-UI (JSS/Emotion) for styling

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
- Material-UI (JSS/Emotion)

- Material-UI theme provider for global theming

