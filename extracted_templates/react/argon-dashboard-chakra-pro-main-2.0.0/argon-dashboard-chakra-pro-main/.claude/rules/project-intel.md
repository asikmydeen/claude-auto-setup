# Project Intelligence: argon-dashboard-chakra-pro

## Overview
Chakra UI Dashboard Template

**Tech Stack:**
- React 18.3.1
- UI Library: Chakra UI
- Build Tool: Create React App
- Styling: Styled Components
- State Management: React Hooks
- Routing: React Router
- TypeScript: No

## Directory Structure

```
src/
  contexts/
  components/
  layouts/
  theme/
  variables/
  views/
  assets/
```

**Key directories:**
- `contexts/`
- `components/`
- `layouts/`
- `theme/`
- `variables/`
- `views/`
- `assets/`

## Key Dependencies

- @asseinfo/react-kanban
- @chakra-ui/icons
- @chakra-ui/react
- @chakra-ui/theme-tools
- @emotion/cache
- @emotion/react
- @emotion/styled
- @fontsource/open-sans
- @fontsource/raleway
- @fontsource/roboto

## Build & Development

**Available Scripts:**
- `start`: react-scripts --openssl-legacy-provider start
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
- Chakra UI component library
- Styled Components for styling

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
- Styled Components
- Theme customization via Chakra UI theme object


