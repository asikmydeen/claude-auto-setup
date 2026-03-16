# Now UI PRO Flutter

## Overview
Premium Flutter mobile app template based on Now UI Design System by Creative Tim. Modern cross-platform iOS and Android app with latest Flutter 3.22+ support.

## Tech Stack
- **Framework**: Flutter SDK >= 3.22.0
- **Language**: Dart >= 3.0.0
- **UI**: Flutter Material Design widgets
- **Navigation**: Flutter Navigator
- **Icons**: Font Awesome Flutter 10.8, Cupertino Icons
- **Linting**: flutter_lints ^6.0.0

## Key Dependencies
- carousel_slider: ^5.1.1 (image/content carousels)
- scrollable_positioned_list: ^0.3.8 (advanced list scrolling)
- url_launcher: ^6.2.2 (open URLs, emails, phone)
- font_awesome_flutter: ^10.8.0 (Font Awesome icons)
- cupertino_icons: ^1.0.8 (iOS-style icons)

## Directory Structure
```
/
├── lib/
│   ├── main.dart        # App entry point
│   ├── screens/         # App screens
│   ├── widgets/         # Reusable widgets
│   └── constants/       # Colors, styles, config
├── assets/
│   ├── imgs/           # Images (Now UI assets)
│   └── fonts/          # Custom fonts (Montserrat)
├── android/            # Android-specific config
├── ios/                # iOS-specific config
├── pubspec.yaml        # Dependencies & assets
└── README.md
```

## Key Features
- Pre-built Now UI screens (onboarding, profile, register, album gallery)
- Modern Now UI Design components
- Carousel sliders for content
- Font Awesome 10.x icons
- Montserrat custom font (Regular, Bold)
- URL launching capability
- Scrollable positioned lists
- Flutter Lints for code quality

## Commands
```bash
flutter pub get          # Install dependencies
flutter run              # Run app (debug)
flutter build apk        # Build Android APK
flutter build ios        # Build iOS app
flutter test             # Run tests
flutter analyze          # Run static analysis
flutter clean            # Clean build cache
```

## Development Workflow
1. Install Flutter SDK >= 3.22.0
2. Run `flutter doctor` to verify setup
3. Install dependencies: `flutter pub get`
4. Connect device or start emulator
5. Run app: `flutter run`
6. Hot reload: Press 'r' in terminal / IDE
7. Lint check: `flutter analyze`

## Assets
- Images: Now UI logo, register/profile backgrounds, album photos (6), platform icons
- Fonts: Montserrat (Regular, Bold)
- All assets declared in pubspec.yaml

## Platform Support
- Android: Modern SDK support
- iOS: Latest deployment targets
- Material Design widgets for both platforms
- Cupertino widgets for iOS-specific UI

## Design System
- Based on Now UI Design System
- Custom color scheme and typography
- Montserrat font family
- Font Awesome 10.x icons for rich iconography
- Modern, clean interface

## Code Quality
- flutter_lints: ^6.0.0 for static analysis
- Follows Flutter best practices
- Dart 3.0+ null safety
