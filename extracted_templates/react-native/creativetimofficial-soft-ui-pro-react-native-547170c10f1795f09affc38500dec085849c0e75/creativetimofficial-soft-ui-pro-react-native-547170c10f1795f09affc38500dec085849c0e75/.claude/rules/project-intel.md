# Soft UI PRO React Native

## Overview
Premium React Native mobile app template with Soft UI Design System by Creative Tim. Built with Expo and TypeScript for cross-platform iOS, Android, and Web development.

## Tech Stack
- **Framework**: React Native 0.79.2 with Expo 53
- **Navigation**: React Navigation 7.x (stack, drawer)
- **Language**: TypeScript 5.8.3
- **State**: React 19.0.0 with hooks
- **UI**: Custom Soft UI components
- **Testing**: Jest with jest-expo preset
- **Internationalization**: i18n-js with expo-localization

## Key Dependencies
- expo-linear-gradient, expo-blur, expo-haptics
- react-native-gesture-handler 2.24, reanimated 3.17
- react-native-calendars, gifted-chat (chat UI)
- react-native-keyboard-aware-scroll-view
- @react-native-async-storage/async-storage
- dayjs (date handling), nanoid (ID generation)

## Directory Structure
```
/
├── src/              # Source code (TypeScript)
│   ├── components/  # Reusable Soft UI components
│   ├── screens/     # App screens
│   ├── navigation/  # Navigation configuration
│   ├── constants/   # Theme, colors, types
│   └── utils/       # Utilities, helpers
├── assets/          # Images, fonts, icons
├── index.js         # Entry point
└── package.json
```

## Key Features
- **TypeScript**: Full type safety
- **Multi-platform**: iOS, Android, Web support
- **Modern React**: React 19 with latest features
- **Chat UI**: react-native-gifted-chat integration
- **Calendar**: react-native-calendars for date selection
- **Haptic Feedback**: expo-haptics for tactile feedback
- **Blur Effects**: expo-blur for modern UI effects
- **i18n**: Multi-language support with i18n-js

## Commands
```bash
npm install              # Install dependencies
npm start                # Start Expo dev server
npm run android          # Run on Android
npm run ios              # Run on iOS
npm run web              # Run on Web
npm test                 # Run Jest tests
npm run lint             # Run ESLint (TypeScript)
npx expo eject           # Eject from Expo
```

## Development Workflow
1. Install dependencies: `npm install`
2. Start dev server: `npm start`
3. Scan QR code with Expo Go app or press 'a' (Android) / 'i' (iOS) / 'w' (Web)
4. Edit TypeScript files - changes hot reload automatically
5. Run tests: `npm test`
6. Lint code: `npm run lint`

## Design System
- Soft UI Design System
- Modern, clean interface with blur effects
- Chat functionality with Gifted Chat
- Calendar/date picker integration
- Haptic feedback for interactions
- Linear gradients and soft shadows
- Responsive layout with safe-area handling

## TypeScript Configuration
- Strict type checking enabled
- ESLint for TypeScript (.ts, .tsx)
- Types for i18n-js, calendars, and all major deps

## Requirements
- Node.js >= 20.0.0
- Expo SDK 53
- React Native 0.79.2
