# Component Refactoring: AccountCarousel

## Overview

Extracted the account card carousel into a reusable component to eliminate code duplication between `AccountsScreen` and `PaymentScreen`.

## What Changed

### New Component Created

**`packages/screens/src/components/AccountCarousel.tsx`**

- Reusable horizontal scrolling carousel for account cards
- Handles card selection, styling, and animations
- Exports constants: `CARD_WIDTH`, `CARD_HEIGHT`, `CARD_SPACING`

### Updated Files

#### 1. `packages/screens/src/index.ts`

- Added export for `AccountCarousel` component

#### 2. `packages/screens/src/AccountsScreen.tsx`

**Before:**

- ~100 lines of carousel code
- Local constants for card dimensions
- Inline card rendering logic

**After:**

- Single `<AccountCarousel />` component usage
- Removed duplicate constants
- Cleaner, more maintainable code

#### 3. `packages/screens/src/PaymentScreen.tsx`

**Before:**

- ~100 lines of identical carousel code
- Duplicate constants
- Inline card rendering logic

**After:**

- Single `<AccountCarousel />` component usage
- Imports shared constants for `handleScroll` function
- Significantly reduced code

## Benefits

### ✅ Code Reusability

- Single source of truth for account carousel UI
- Changes propagate automatically to both screens

### ✅ Maintainability

- Easier to fix bugs (only one place to update)
- Consistent behavior across screens
- Reduced code duplication (~200 lines eliminated)

### ✅ Testability

- Can test carousel logic independently
- Easier to write unit tests for the component

### ✅ React Native Best Practices

- Follows component composition patterns
- Separates concerns (presentation vs logic)
- Promotes DRY (Don't Repeat Yourself) principle

## Component API

```typescript
interface AccountCarouselProps {
  accounts: Account[]; // Array of account objects
  selectedAccountIndex: number; // Currently selected account index
  onAccountSelect: (index: number) => void; // Callback when account is selected
  onMomentumScrollEnd?: (event: any) => void; // Optional scroll handler
}
```

## Usage Example

```tsx
import { AccountCarousel } from "@ebanking/screens";

<AccountCarousel
  accounts={accounts}
  selectedAccountIndex={selectedAccountIndex}
  onAccountSelect={handleAccountSelect}
  onMomentumScrollEnd={handleScroll} // Optional
/>;
```

## Exported Constants

```typescript
export const CARD_WIDTH: number; // Responsive card width
export const CARD_HEIGHT = 150; // Card height
export const CARD_SPACING = 12; // Spacing between cards
```

These constants can be imported if needed for calculations (e.g., scroll position in `PaymentScreen`).

## Is This Recommended in React Native?

**Absolutely YES!** ✅

This is a **best practice** in React Native development:

1. **Component Reusability**: React's core philosophy
2. **Composition over Duplication**: Standard React pattern
3. **Cross-Platform**: Works seamlessly on web and mobile
4. **Performance**: No performance penalty, same rendering
5. **Team Collaboration**: Easier for multiple developers to work on

## When to Extract Components?

Extract when you find:

- ✅ Identical or very similar code in multiple places
- ✅ More than 50-100 lines of reusable UI logic
- ✅ Same component used 2+ times
- ✅ Potential for future reuse

## Future Improvements

Consider extracting more common components:

- Transaction list item
- Filter tags (from AccountsScreen)
- Input field groups (from PaymentScreen)
- Empty state cards
- Error display cards
