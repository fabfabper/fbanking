# F-Banking - Modern E-Banking Application

A modern, minimalistic e-banking application built with React and React Native (Expo) in an Nx monorepo. This project provides a shared codebase for both web and mobile platforms with a clean, flat design.

## 🏗 Architecture

This is an Nx monorepo containing:

### Applications
- **web** - React web application (Vite + React)
- **mobile** - React Native mobile application (Expo)

### Shared Libraries
- **ui** - Shared UI components (Button, Input, Card) with platform-specific implementations
- **theme** - Centralized theming and design tokens
- **i18n** - Internationalization with English and German translations

## 🎨 Design System

### Colors
- **Primary Color**: Light Blue (#4A9FE8) - Configurable via theme
- **Design Style**: Minimalistic, flat, modern
- **Platform**: Responsive design for web and mobile

## 🌍 Internationalization

Supported languages:
- **English** (default)
- **German**

## 📦 Installation

```bash
cd fbanking
npm install
```

## 🚀 Running the Applications

### Web Application
```bash
npx nx serve web
```
The web app will be available at http://localhost:4200

### Mobile Application (Expo)
```bash
npx nx start mobile
```

Then:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app on your phone

## 📱 Features

### Implemented Screens
- Login Screen with email/password
- Dashboard with account overview
- Transaction list
- Multi-language support (EN/DE)

## 🔧 Development

### Building
```bash
# Web
npx nx build web

# Mobile
npx nx run mobile:build --platform ios
npx nx run mobile:build --platform android
```

### Testing
```bash
npx nx run-many --target=test --all
```

---

Built with ❤️ using Nx, React, React Native, and Expo
