# Argon PRO Flutter

## Overview
Premium Flutter mobile app template based on Argon Design System by Creative Tim. Cross-platform iOS and Android app with Material Design widgets.

## Tech Stack
- **Framework**: Flutter SDK (Dart 2.7.0 - 3.0.0)
- **Language**: Dart
- **UI**: Flutter Material Design widgets
- **Navigation**: Flutter Navigator
- **Icons**: Font Awesome Flutter 8.8, Cupertino Icons

## Key Dependencies
- carousel_slider: ^2.2.1 (image/content carousels)
- scrollable_positioned_list: ^0.1.7 (advanced list scrolling)
- url_launcher: ^5.5.2 (open URLs, emails, phone)
- font_awesome_flutter: ^8.8.1 (Font Awesome icons)
- cupertino_icons: ^0.1.3 (iOS-style icons)

## Directory Structure
```
/
├── lib/
│   ├── main.dart        # App entry point
│   ├── screens/         # App screens
│   ├── widgets/         # Reusable widgets
│   └── constants/       # Colors, styles, config
├── assets/
│   ├── img/            # Images
│   └── fonts/          # Custom fonts (OpenSans)
├── android/            # Android-specific config
├── ios/                # iOS-specific config
├── pubspec.yaml        # Dependencies & assets
└── README.md
```

## Key Features
- Pre-built screens (onboarding, profile, register, chat)
- Custom Argon Design components
- Carousel sliders for content
- Font Awesome icons
- OpenSans custom font (Regular, Light, Bold)
- URL launching capability
- Scrollable positioned lists

## Commands
```bash
flutter pub get          # Install dependencies
flutter run              # Run app (debug)
flutter build apk        # Build Android APK
flutter build ios        # Build iOS app
flutter test             # Run tests
flutter clean            # Clean build cache
```

## Development Workflow
1. Install Flutter SDK
2. Run `flutter doctor` to verify setup
3. Install dependencies: `flutter pub get`
4. Connect device or start emulator
5. Run app: `flutter run`
6. Hot reload: Press 'r' in terminal / IDE

## Assets
- Images: onboard-background, logos (Android, iOS, Argon), profile backgrounds
- Fonts: OpenSans (Regular, Light, Bold)
- All assets declared in pubspec.yaml

## Platform Support
- Android: Minimum SDK configured in android/app/build.gradle
- iOS: Deployment target in ios/Podfile
- Material Design widgets for both platforms

## Design System
- Based on Argon Design System
- Custom color scheme and typography
- OpenSans font family
- Font Awesome icons for rich iconography
