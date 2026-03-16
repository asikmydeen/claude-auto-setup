# Now UI PRO React Native

## Overview
Premium React Native mobile app template based on Now UI Design System by Creative Tim. Built with Expo for cross-platform iOS and Android development.

## Tech Stack
- **Framework**: React Native 0.74.5 with Expo ~51.0
- **Navigation**: React Navigation 6.x (stack, drawer, bottom tabs)
- **UI Library**: Galio Framework 0.8.0 with Now UI Design
- **State**: React 18.2.0 with hooks
- **Language**: JavaScript (ES6+)
- **Linting**: ESLint with Airbnb config

## Key Dependencies
- expo-linear-gradient, expo-font, expo-asset, expo-app-loading
- react-native-gesture-handler, reanimated, safe-area-context
- react-native-svg (SVG support)
- galio-framework (custom UI components)
- react-navigation (stack, drawer, bottom-tabs)

## Directory Structure
```
/
├── components/     # Reusable Now UI components
├── screens/        # App screens with Now UI Design
├── navigation/     # Navigation configuration
├── constants/      # Theme, colors, images
├── assets/         # Images, fonts, icons, SVGs
├── index.js        # Entry point
└── package.json
```

## Key Files
- `index.js` - Application entry point
- `app.json` - Expo configuration
- `babel.config.js` - Babel with module resolver
- `.eslintrc.js` - ESLint configuration (Airbnb)

## Commands
```bash
npm install              # Install dependencies
npm start                # Start Expo dev server
npm run android          # Run on Android
npm run ios              # Run on iOS
npm run lint             # Run ESLint
expo eject               # Eject from Expo
```

## Development Workflow
1. Install dependencies: `npm install`
2. Start dev server: `npm start`
3. Scan QR code with Expo Go app or press 'a' (Android) / 'i' (iOS)
4. Edit files - changes hot reload automatically
5. Lint code: `npm run lint`

## Design System
- Based on Now UI Design System
- Pre-built modern UI screens
- Custom components via Galio Framework
- SVG icon support
- Linear gradients, custom fonts
- Responsive layout with safe-area handling

## Code Quality
- ESLint with Airbnb style guide
- babel-eslint parser
- JSHint for additional linting
