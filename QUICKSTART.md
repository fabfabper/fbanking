# Quick Start Guide - F-Banking

## Getting Started

### 1. Install Dependencies
```bash
cd fbanking
npm install
```

### 2. Start the Web App
```bash
npx nx serve web
```
Open http://localhost:4200 in your browser

### 3. Start the Mobile App
```bash
npx nx start mobile
```

For iOS: Press `i`  
For Android: Press `a`  
For Expo Go: Scan the QR code

## Project Structure

```
fbanking/
├── apps/
│   ├── mobile/          # React Native Expo app
│   └── web/             # React web app
├── ui/                  # Shared UI components
├── theme/               # Theme & design tokens
└── i18n/                # Translations (EN/DE)
```

## Changing the Language

The app uses i18next. To change language:

```typescript
import { i18n } from '@fbanking/i18n';

// Switch to German
i18n.changeLanguage('de');

// Switch to English  
i18n.changeLanguage('en');
```

## Customizing the Theme

Edit `/theme/src/lib/theme.ts`:

```typescript
// Change the primary color
const defaultPrimaryColor = '#YOUR_COLOR';
```

The default is a light blue (#4A9FE8).

## Available Shared Components

### Button
```tsx
import { Button } from '@fbanking/ui';

<Button 
  variant="primary"  // primary | secondary | outline | text
  size="large"       // small | medium | large
  fullWidth
  onPress={() => {}}
>
  Sign In
</Button>
```

### Input
```tsx
import { Input } from '@fbanking/ui';

<Input
  label="Email"
  type="email"
  value={email}
  onChangeText={setEmail}
  placeholder="Enter email"
  required
  error="Error message"
/>
```

### Card
```tsx
import { Card } from '@fbanking/ui';

<Card title="Title" subtitle="Subtitle">
  <Text>Content</Text>
</Card>
```

## Building for Production

### Web
```bash
npx nx build web
```
Output: `web/dist/`

### Mobile
```bash
# iOS
npx nx run mobile:build --platform ios

# Android
npx nx run mobile:build --platform android
```

## Common Commands

```bash
# Run tests
npx nx run-many --target=test --all

# Lint code
npx nx run-many --target=lint --all

# Build all apps
npx nx run-many --target=build --all

# Clean cache
npx nx reset
```

## Troubleshooting

### Web app not loading?
- Clear browser cache
- Run `npx nx reset` to clear Nx cache
- Check console for errors

### Mobile app not connecting?
- Ensure phone and computer are on the same network
- Restart Expo Dev Server
- Clear Expo cache: `npx expo start --clear`

### Import errors?
- Run `npm install` again
- Check that all libraries are built: `npx nx run-many --target=build --projects=ui,theme,i18n`

## Next Steps

1. Implement real authentication
2. Connect to a backend API
3. Add more screens (Transfers, Settings, etc.)
4. Add navigation (React Navigation for mobile)
5. Implement state management (Redux/Context API)
6. Add unit and integration tests
7. Set up CI/CD pipeline

---

Happy coding! 🚀
