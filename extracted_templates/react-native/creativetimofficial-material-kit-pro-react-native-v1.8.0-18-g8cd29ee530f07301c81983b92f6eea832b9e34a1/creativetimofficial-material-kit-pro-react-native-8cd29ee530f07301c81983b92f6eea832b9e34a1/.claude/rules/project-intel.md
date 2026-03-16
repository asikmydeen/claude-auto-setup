# Material Kit PRO React Native

## Overview
Premium React Native mobile app template based on Material Design by Creative Tim. Built with Expo for cross-platform iOS and Android development.

## Tech Stack
- **Framework**: React Native 0.74.5 with Expo ~51.0
- **Navigation**: React Navigation 6.x (stack, drawer)
- **UI Library**: Galio Framework 0.8.0 with Material Design
- **State**: React 18.2.0 with hooks
- **Language**: JavaScript (ES6+)
- **Testing**: Jest with jest-expo preset

## Key Dependencies
- expo-linear-gradient, expo-font, expo-asset
- react-native-gesture-handler, reanimated, safe-area-context
- galio-framework (custom UI components)
- react-navigation (stack, drawer)
- react-native-dropdown-picker (enhanced form controls)

## Directory Structure
```
/
├── components/     # Reusable Material Design components
├── screens/        # App screens with Material Design
├── navigation/     # Navigation configuration
├── constants/      # Material theme, colors, images
├── assets/         # Images, fonts, icons
├── index.js        # Entry point
└── package.json
```

## Commands
```bash
npm install              # Install dependencies
npm start                # Start Expo dev server
npm run android          # Run on Android
npm run ios              # Run on iOS
npm test                 # Run Jest tests
expo eject               # Eject from Expo
```

## Development Workflow
1. Install dependencies: `npm install`
2. Start dev server: `npm start` (uses VS Code as REACT_EDITOR)
3. Scan QR code with Expo Go app or press 'a' (Android) / 'i' (iOS)
4. Edit files - changes hot reload automatically
5. Run tests: `npm test`

## Design System
- Based on Material Design guidelines
- Pre-built Material Design screens
- Custom components via Galio Framework
- Material Design colors, typography, shadows
- Dropdown pickers and enhanced form controls
- Responsive layout with safe-area handling

## Testing
- Jest with jest-expo preset configured
- Test runner: `node ./node_modules/jest/bin/jest.js --watchAll`
