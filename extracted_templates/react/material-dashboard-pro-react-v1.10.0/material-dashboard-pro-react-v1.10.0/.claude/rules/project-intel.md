# Project Intelligence: material-dashboard-pro-react

## Overview
Material UI Dashboard Template

**Tech Stack:**
- React 17.0.2
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

- @material-ui/core
- @material-ui/icons
- chartist
- classnames
- match-sorter
- moment
- node-sass
- nouislider
- perfect-scrollbar
- react

## Build & Development

**Available Scripts:**
- `start`: react-scripts start
- `build`: react-scripts build && gulp licenses
- `test`: react-scripts test --env=jsdom
- `eject`: react-scripts eject
- `deploy`: npm run build
- `lint:check`: eslint . --ext=js,jsx;  exit 0
- `lint:fix`: eslint . --ext=js,jsx --fix;  exit 0
- `install:clean`: rm -rf node_modules/ && rm -rf package-lock.json && npm install && npm start

## Architecture Patterns

**Component Structure:**
- Functional components with hooks
- Material UI component library
- Material-UI (JSS/Emotion) for styling

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
- Material-UI (JSS/Emotion)

- Material-UI theme provider for global theming

