# Jatie VIP App 🌟

> A premium React Native application delivering exclusive VIP experiences

[![React Native](https://img.shields.io/badge/React%20Native-0.70+-blue.svg)](https://reactnative.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-12+-green.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Commercial](https://img.shields.io/badge/License-Commercial-orange.svg)](LICENSE)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen.svg)](https://github.com/Airly-Studio/Jatie-Vip-app/actions)

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Environment Setup](#environment-setup)
- [Customization](#customization)
- [Testing](#testing)
- [Deployment](#deployment)
- [Team](#team)
- [License](#license)

## 🎯 About

Jatie VIP App is a premium mobile application developed by **Airly Studio** that provides exclusive VIP experiences and services. Built with React Native, it delivers a seamless cross-platform experience with modern architecture and cutting-edge features.

## ✨ Features

- **👑 VIP Experience**: Exclusive premium features and content
- **🏗️ Modern Architecture**: Clean, scalable folder structure
- **🔄 State Management**: Redux with Redux Persist and Redux Thunk
- **🌐 API Integration**: Robust networking with Axios
- **🧭 Smooth Navigation**: React Navigation for seamless user experience
- **🌍 Multi-language Support**: Internationalization ready
- **💾 High-Performance Storage**: MMKV for lightning-fast data persistence
- **🎨 Custom Theming**: Beautiful, consistent UI/UX
- **✅ Type Safety**: PropTypes for component validation
- **🧪 Comprehensive Testing**: Jest and React Native Testing Library
- **🚀 Multiple Environments**: Development, staging, and production configs
- **📱 Cross-platform**: Native iOS and Android support

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 12 or higher ([Download](https://nodejs.org/))
  - 💡 _Recommended: Use [nvm](https://github.com/nvm-sh/nvm) for Node version management_
- **Watchman**: Facebook's file watching service ([Install Guide](https://facebook.github.io/watchman/docs/install))
- **Xcode**: Version 12 or higher (for iOS development) ([Download](https://developer.apple.com/xcode/))
- **CocoaPods**: Version 1.10.1 or higher ([Install Guide](https://cocoapods.org/))
- **JDK**: Version 11 or higher ([Download](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html))
- **Android Studio**: Latest version with Android SDK ([Download](https://developer.android.com/studio))

## 🚀 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Airly-Studio/Jatie-Vip-app.git
   cd Jatie-Vip-app
   ```

2. **Switch to production branch**

   ```bash
   git checkout prod
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Install iOS dependencies (iOS only)**

   ```bash
   cd ios && pod install && cd ..
   ```

5. **Start the application**

   ```bash
   # For iOS
   npm run ios

   # For Android
   npm run android
   ```

## ⚙️ Configuration

### Environment Variables

The project supports multiple environments. Configure your environment variables in the respective files:

- `.env.development` - Development environment
- `.env.production` - Production environment
- `.env.staging` - Staging environment

## 🏗️ Project Structure

```
src/
├── actions/           # Redux actions for state management
├── assets/           # Images, fonts, icons, and static resources
├── components/       # Reusable UI components
├── constants/        # App constants and configuration
├── controllers/      # Network layer and API calls
├── localization/     # Language files for internationalization
├── navigation/       # Navigation configuration and routes
├── reducers/         # Redux reducers for state management
├── screens/          # Application screens and features
│   └── ScreenName/   # Individual screen folder
│       ├── Screen.js           # Screen component
│       ├── Screen.styles.js    # Screen-specific styles
│       └── Screen.test.js      # Screen unit tests
├── selectors/        # Redux selectors for data access
├── storage/          # Storage utilities and MMKV configuration
├── store/            # Redux store and middleware setup
├── theme/            # Theme configuration and global styles
└── App.js            # Root application component
```

## 📦 Core Dependencies

| Package                                                                               | Purpose                              | Version |
| ------------------------------------------------------------------------------------- | ------------------------------------ | ------- |
| [axios](https://github.com/axios/axios)                                               | HTTP client for API requests         | Latest  |
| [prop-types](https://github.com/facebook/prop-types)                                  | Runtime type checking for components | Latest  |
| [react-native-config](https://github.com/luggit/react-native-config)                  | Environment configuration management | Latest  |
| [react-navigation](https://reactnavigation.org/)                                      | Navigation library for React Native  | Latest  |
| [react-native-localization](https://github.com/stefalda/ReactNativeLocalization)      | Internationalization support         | Latest  |
| [react-native-mmkv-storage](https://github.com/ammarahm-ed/react-native-mmkv-storage) | High-performance storage solution    | Latest  |
| [redux](https://redux.js.org/)                                                        | Predictable state container          | Latest  |
| [redux-persist](https://github.com/rt2zz/redux-persist)                               | State persistence layer              | Latest  |
| [redux-thunk](https://github.com/gaearon/redux-thunk)                                 | Async action handling middleware     | Latest  |

## 🛠️ Available Scripts

```bash
# Development
npm start                 # Start Metro bundler
npm run ios              # Run iOS app in simulator
npm run android          # Run Android app in emulator
npm run ios:device       # Run iOS app on physical device
npm run android:device   # Run Android app on physical device

# Testing
npm test                 # Run all tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate test coverage report
npm run test:e2e         # Run end-to-end tests

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint errors automatically
npm run format           # Format code with Prettier
npm run type-check       # Run type checking

# Build & Release
npm run build:ios        # Build iOS release
npm run build:android    # Build Android release
npm run release:ios      # Create iOS release build
npm run release:android  # Create Android release build
```

## 🌍 Environment Setup

### Development Environment

```bash
npm run dev
# Uses .env.development configuration
```

### Staging Environment

```bash
npm run staging
# Uses .env.staging configuration
```

### Production Environment

```bash
npm run prod
# Uses .env.production configuration
```

## 🎨 Customization

### Splash Screen

Customize your splash screen using the [React Native Bootsplash CLI](https://github.com/zoontek/react-native-bootsplash#assets-generation):

```bash
npx react-native generate-bootsplash assets/jatie_vip_logo.png \
  --background-color=1A1A2E \
  --logo-width=150 \
  --assets-path=assets \
  --flavor=main
```

### Theme Configuration

Modify theme settings in `src/theme/`:

- `colors.js` - VIP color palette (gold, premium colors)
- `fonts.js` - Premium typography settings
- `spacing.js` - Consistent layout spacing
- `dimensions.js` - Responsive screen dimensions

### VIP Branding

Update branding elements in `src/assets/branding/`:

- Logo variants
- Color schemes
- Typography assets
- Icon sets

## 🧪 Testing

This project uses Jest and React Native Testing Library for comprehensive testing:

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test suite
npm test -- --testPathPattern=screens

# Run tests in watch mode during development
npm run test:watch
```

## 🚀 Deployment

### iOS Deployment

1. Configure signing in Xcode
2. Update version in `ios/JatieVip/Info.plist`
3. Run: `npm run build:ios`
4. Archive and upload to App Store Connect

### Android Deployment

1. Generate signed APK: `npm run build:android`
2. Update version in `android/app/build.gradle`
3. Upload to Google Play Console

### Continuous Integration

The project uses GitHub Actions for CI/CD. Check `.github/workflows/` for configuration.

## 📱 Platform-Specific Notes

### iOS

- Requires Xcode 12+
- Run `cd ios && pod install` after installing new dependencies
- Configure code signing for physical device testing
- Ensure proper provisioning profiles for VIP features

### Android

- Requires Android Studio with SDK 28+
- Enable Developer Options and USB Debugging
- Configure keystore for release builds
- Test on various Android versions for compatibility

### Code Style Guidelines

- Follow [React Native Community ESLint configuration](https://github.com/facebook/react-native/tree/master/packages/eslint-config-react-native-community)
- Use meaningful component and variable names
- Write clear commit messages
- Document complex functions and components
- Maintain consistent indentation and formatting

### Pull Request Process

1. Ensure your PR description clearly describes the changes
2. Include screenshots for UI changes
3. Update documentation if needed
4. Ensure all tests pass
5. Request review from team members

## 📊 Performance & Analytics

- **Performance Monitoring**: Flipper integration for debugging
- **Crash Reporting**: Integrated error tracking
- **Analytics**: User behavior tracking for VIP features
- **Performance Metrics**: App startup time, memory usage monitoring

## 🔐 Security

- **API Security**: Token-based authentication
- **Data Encryption**: Sensitive VIP data protection
- **Secure Storage**: Encrypted local storage for premium content
- **Network Security**: Certificate pinning for API calls

## 🐛 Known Issues & Solutions

### Common Issues:

1. **Metro bundler issues**: Clear cache with `npx react-native start --reset-cache`
2. **iOS pod install fails**: Run `cd ios && pod deintegrate && pod install`
3. **Android build errors**: Clean with `cd android && ./gradlew clean`

For more troubleshooting, see our [Wiki](https://github.com/Airly-Studio/Jatie-Vip-app/wiki).

## 📊 Performance & Analytics

- **Performance Monitoring**: Flipper integration for debugging
- **Crash Reporting**: Integrated error tracking
- **Analytics**: User behavior tracking for VIP features
- **Performance Metrics**: App startup time, memory usage monitoring

## 🔐 Security

- **API Security**: Token-based authentication
- **Data Encryption**: Sensitive VIP data protection
- **Secure Storage**: Encrypted local storage for premium content
- **Network Security**: Certificate pinning for API calls

## 🐛 Known Issues & Solutions

### Common Issues:

1. **Metro bundler issues**: Clear cache with `npx react-native start --reset-cache`
2. **iOS pod install fails**: Run `cd ios && pod deintegrate && pod install`
3. **Android build errors**: Clean with `cd android && ./gradlew clean`

For more troubleshooting, see our internal documentation.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

**Developed by Airly Studio**

- **[Dorjsuren Enkhbold](https://github.com/dorjsurend)** - _Lead Developer & Architect_
- **[Meraj Kazi](https://github.com/Meraj-Kazi)** - _Senior Developer_
- **[Taraqul Islam Rony](https://github.com/TIRony)** - _Full Stack Developer_

## 🙏 Acknowledgments

- React Native team for the robust framework
- Airly Studio team for their dedication and expertise
- Open source community for excellent libraries
- Beta testers who helped refine the VIP experience

## 📞 Support & Contact

- **Company**: [Airly Studio](https://airlystudio.com)
- **Repository**: [GitHub Issues](https://github.com/Airly-Studio/Jatie-Vip-app/issues)
- **Documentation**: [Project Wiki](https://github.com/Airly-Studio/Jatie-Vip-app/wiki)
- **Email**: hello@airlystudio.com

For VIP-specific features and technical inquiries, please contact our team.

---

⭐ **Star this repository if you find it valuable!**

**Made with ❤️ by Airly Studio | Delivering Premium Mobile Experiences**
