# Lucide Icons Integration

## Overview
This project now uses `lucide-react-native` for icons, which provides a consistent icon library for both web and mobile platforms.

## Installation

### Root Level
```bash
npm install lucide-react-native --legacy-peer-deps
```

### Web App
```bash
cd apps/web
npm install lucide-react (automatically aliased from lucide-react-native)
```

## Configuration

### Web (Vite)
File: `apps/web/vite.config.ts`

```typescript
resolve: {
  alias: {
    // ... other aliases
    "lucide-react-native": "lucide-react", // Maps to web version
  },
},
```

### Mobile (Metro)
File: `apps/mobile/metro.config.js`

lucide-react-native works natively in React Native, no configuration needed.

## Usage

### Import Icons
```typescript
import { IconName } from "lucide-react-native";
```

### Common Icons
```typescript
import { 
  QrCode,      // QR code scanner
  Settings,    // Settings gear
  Home,        // Home icon
  User,        // User profile
  CreditCard,  // Payment/card
  ArrowLeft,   // Back arrow
  Menu,        // Hamburger menu
  X,           // Close/cancel
  Check,       // Checkmark
  AlertCircle, // Warning/alert
} from "lucide-react-native";
```

### Icon Props
```typescript
<IconName
  size={24}                    // Icon size in pixels
  color="#000000"              // Icon color
  strokeWidth={2}              // Line thickness
  absoluteStrokeWidth={false}  // Scale stroke with size
/>
```

## Implementation Examples

### 1. Web Navigation (App.tsx)
```typescript
import { Settings } from "lucide-react-native";

<Button onPress={() => navigate("/settings")}>
  <Settings size={20} color={theme.colors.textWhite} />
</Button>
```

### 2. Dashboard QR Button (DashboardScreen.tsx)
```typescript
import { QrCode } from "lucide-react-native";

<Button onPress={handleCameraOpen} title="Scan QR Code">
  <QrCode size={24} color={theme.colors.primary} />
</Button>
```

### 3. Payment Screen Icons
```typescript
import { CreditCard, Send } from "lucide-react-native";

// Payment method icon
<CreditCard size={20} color={theme.colors.primary} />

// Send payment button
<Button>
  <Send size={18} color="#fff" />
  <Text>Send Payment</Text>
</Button>
```

## Icon Catalog
Browse all available icons at:
- https://lucide.dev/icons/

## Migration from react-icons

### Before (react-icons)
```typescript
import { IoSettings } from "react-icons/io5";

<IoSettings size={20} color="#000" />
```

### After (lucide-react-native)
```typescript
import { Settings } from "lucide-react-native";

<Settings size={20} color="#000" />
```

## TypeScript Considerations

You may see TypeScript errors like:
```
Property 'color' does not exist on type 'IntrinsicAttributes & LucideProps'
```

This is a type definition issue but the code works correctly at runtime. The lucide-react types should be updated to include these props.

## Platform Differences

### Web
- Uses `lucide-react` (aliased from `lucide-react-native`)
- SVG-based icons
- Full browser support

### Mobile
- Uses `lucide-react-native` directly
- React Native compatible
- Works on iOS and Android

## Benefits

1. **Consistency**: Same icons across web and mobile
2. **Tree-shakeable**: Only imports icons you use
3. **Customizable**: Easily change size, color, and stroke
4. **Modern**: Clean, minimal design
5. **Lightweight**: Smaller bundle size than react-icons
6. **Maintained**: Active development and updates

## Common Icons Used in This Project

| Component | Icon | Usage |
|-----------|------|-------|
| Web Navigation | `Settings` | Settings button |
| Mobile Tab Bar | `Home` | Dashboard tab |
| Mobile Tab Bar | `Wallet` | Accounts tab |
| Mobile Tab Bar | `Send` | Payment tab |
| Mobile Tab Bar | `Settings` | Settings tab |
| Mobile Header | `Menu` | Hamburger menu |
| Mobile Drawer | `Home` | Dashboard menu item |
| Mobile Drawer | `Wallet` | Accounts menu item |
| Mobile Drawer | `Send` | Payment menu item |
| Mobile Drawer | `Settings` | Settings menu item |
| Mobile Drawer | `X` | Close drawer |
| Mobile Drawer | `LogOut` | Logout button |
| Dashboard | `QrCode` | QR scanner button |

## Troubleshooting

### Icon not displaying
- Check import statement is correct
- Verify lucide-react-native is installed
- Check Vite/Metro config has correct alias

### TypeScript errors
- Ignore type errors for `color` prop - it works at runtime
- Consider adding custom type declarations if needed

### Different appearance on web vs mobile
- Check that color values are the same
- Verify size is appropriate for platform
- Ensure strokeWidth is consistent

## Future Enhancements

- [ ] Create custom icon wrapper component for consistent styling
- [ ] Add icon animation support
- [ ] Create icon button component combining Button + Icon
- [ ] Add theme-aware icon colors
- [ ] Create icon size constants (sm, md, lg, xl)
