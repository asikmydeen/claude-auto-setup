# Argon PRO React Native

## Overview
Premium React Native mobile app template based on Argon Design System by Creative Tim. Built with Expo for cross-platform iOS and Android development.

## Tech Stack
- **Framework**: React Native 0.74.5 with Expo ~51.0
- **Navigation**: React Navigation 6.x (stack, drawer, bottom tabs)
- **UI Library**: Galio Framework 0.8.0
- **State**: React 18.2.0 with hooks
- **Language**: JavaScript (ES6+)

## Key Dependencies
- expo-linear-gradient, expo-font, expo-asset
- react-native-gesture-handler, reanimated, safe-area-context
- galio-framework (custom UI components)
- react-navigation (stack, drawer, bottom-tabs)

## Directory Structure
```
/
├── components/     # Reusable UI components
├── screens/        # App screens (24 screens)
├── navigation/     # Navigation configuration
├── constants/      # Theme, colors, images
├── assets/         # Images, fonts, icons
├── App.js          # Entry point
└── package.json
```

## Key Files
- `App.js` - Application entry point with navigation setup
- `app.json` - Expo configuration
- `babel.config.js` - Babel configuration with module resolver
- `constants/` - Theme constants, colors, images

## Commands
```bash
npm install              # Install dependencies
npm start                # Start Expo dev server
npm run android          # Run on Android
npm run ios              # Run on iOS
expo eject               # Eject from Expo
```

## Development Workflow
1. Install dependencies: `npm install`
2. Start dev server: `npm start`
3. Scan QR code with Expo Go app or press 'a' (Android) / 'i' (iOS)
4. Edit files - changes hot reload automatically

## Design System
- Based on Argon Design System
- 24+ pre-built screens
- Custom components via Galio Framework
- Linear gradients, custom fonts
- Responsive layout with safe-area handling
