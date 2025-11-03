# Component Architecture

## How Components Work Across Platforms

### Button Component Example

```
ui/src/lib/components/Button/
├── Button.tsx         ← Web version (uses CSS)
├── Button.css         ← Web styles
├── Button.native.tsx  ← Mobile version (uses StyleSheet)
└── index.ts           ← Exports the component
```

When you import:
```typescript
import { Button } from '@fbanking/ui';
```

- **On Web**: Metro/Vite resolves to `Button.tsx`
- **On Mobile**: Metro resolves to `Button.native.tsx`

### Platform Detection

React Native's Metro bundler automatically uses `.native.tsx` files when building for mobile.

## Shared Libraries Flow

```
┌─────────────────────────────────────────────────────────┐
│                    @fbanking/theme                      │
│  ┌─────────────────────────────────────────────────┐   │
│  │  • Colors (primary, secondary, etc.)            │   │
│  │  • Typography (fonts, sizes)                    │   │
│  │  • Spacing (margins, padding)                   │   │
│  │  • Border Radius                                │   │
│  │  • Shadows                                      │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                     @fbanking/ui                        │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Button (primary, secondary, outline, text)     │   │
│  │  Input (email, password, text, number)          │   │
│  │  Card (with optional title/subtitle)            │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                    @fbanking/i18n                       │
│  ┌─────────────────────────────────────────────────┐   │
│  │  English translations                           │   │
│  │  German translations                            │   │
│  │  i18next configuration                          │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                          ↓
        ┌─────────────────┴─────────────────┐
        ↓                                   ↓
┌──────────────────┐              ┌──────────────────┐
│   Web App        │              │   Mobile App     │
│   (React)        │              │   (React Native) │
│                  │              │                  │
│  LoginScreen     │              │  LoginScreen     │
│  DashboardScreen │              │  DashboardScreen │
│                  │              │                  │
│  Port: 4200      │              │  Expo Go         │
└──────────────────┘              └──────────────────┘
```

## Translation Flow

```typescript
// In i18n library
export const en = {
  auth: {
    signIn: 'Sign In',
    welcomeBack: 'Welcome Back',
  },
  dashboard: {
    title: 'Dashboard',
    totalBalance: 'Total Balance',
  }
};

export const de = {
  auth: {
    signIn: 'Anmelden',
    welcomeBack: 'Willkommen zurück',
  },
  dashboard: {
    title: 'Dashboard',
    totalBalance: 'Gesamtsaldo',
  }
};
```

```typescript
// In your screens
import { useTranslation } from 'react-i18next';

function LoginScreen() {
  const { t } = useTranslation();
  
  return <h1>{t('auth.welcomeBack')}</h1>;
  // Shows: "Welcome Back" (EN) or "Willkommen zurück" (DE)
}
```

## Theme Flow

```typescript
// Define theme
// theme/src/lib/theme.ts
export const lightTheme = {
  colors: {
    primary: '#4A9FE8',    // Light blue
    background: '#F8FAFC',
    text: {
      primary: '#1E293B',
      secondary: '#64748B',
    }
  },
  spacing: {
    sm: 8,
    md: 16,
    lg: 24,
  }
};
```

```css
/* Use in web CSS */
/* Button.css */
.btn-primary {
  background-color: #4A9FE8;  /* theme.colors.primary */
  padding: 12px 24px;          /* theme.spacing.md */
}
```

```typescript
// Use in mobile StyleSheet
// Button.native.tsx
const styles = StyleSheet.create({
  buttonPrimary: {
    backgroundColor: '#4A9FE8',  // theme.colors.primary
    paddingVertical: 12,         // theme.spacing.md
    paddingHorizontal: 24,
  }
});
```

## Bundler Configuration

### Web (Vite)
```javascript
// web/vite.config.ts
export default {
  resolve: {
    alias: {
      '@fbanking/ui': path.resolve(__dirname, '../ui/src/index.ts'),
      '@fbanking/theme': path.resolve(__dirname, '../theme/src/index.ts'),
      '@fbanking/i18n': path.resolve(__dirname, '../i18n/src/index.ts'),
    },
  },
};
```

### Mobile (Metro)
```javascript
// apps/mobile/metro.config.js
module.exports = {
  resolver: {
    extraNodeModules: {
      '@fbanking/ui': path.resolve(__dirname, '../../ui/src'),
      '@fbanking/theme': path.resolve(__dirname, '../../theme/src'),
      '@fbanking/i18n': path.resolve(__dirname, '../../i18n/src'),
    },
  },
  watchFolders: [
    path.resolve(__dirname, '../../ui'),
    path.resolve(__dirname, '../../theme'),
    path.resolve(__dirname, '../../i18n'),
  ],
};
```

## Development Workflow

```
1. Make changes to shared library (e.g., add a new button variant)
   └─→ ui/src/lib/components/Button/Button.tsx
   └─→ ui/src/lib/components/Button/Button.native.tsx

2. Changes are automatically available to both apps
   └─→ web/src/app/screens/LoginScreen.tsx
   └─→ apps/mobile/src/app/screens/LoginScreen.tsx

3. Both apps hot-reload with the changes
   └─→ Web: http://localhost:4200
   └─→ Mobile: Expo Go app
```

## Build Process

```
npm run build
   │
   ├─→ Build @fbanking/theme
   │   └─→ theme/dist/
   │
   ├─→ Build @fbanking/i18n
   │   └─→ i18n/dist/
   │
   ├─→ Build @fbanking/ui (depends on theme)
   │   └─→ ui/dist/
   │
   └─→ Build apps (depend on all libraries)
       ├─→ web/dist/
       └─→ Mobile bundles via Expo
```

## Key Takeaways

1. **One Codebase** - Shared logic and components
2. **Platform-Specific UI** - Native look and feel
3. **Type Safety** - TypeScript everywhere
4. **Hot Reload** - Fast development
5. **Scalable** - Easy to add features
6. **Maintainable** - Clear separation of concerns

---

This architecture allows you to:
- Write once, run everywhere (with platform-specific tweaks)
- Maintain consistent branding and behavior
- Scale from 2 apps to 10+ platforms
- Onboard new developers quickly
- Test components in isolation
