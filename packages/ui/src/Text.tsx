import { styled } from '@tamagui/core';
import { SizableText } from '@tamagui/text';

export const Text = styled(SizableText, {
  name: 'Text',
  color: '$text',
  fontFamily: '$body',
  
  variants: {
    size: {
      xs: { fontSize: '$1' },
      sm: { fontSize: '$2' },
      md: { fontSize: '$3' },
      lg: { fontSize: '$4' },
      xl: { fontSize: '$6' },
      '2xl': { fontSize: '$8' },
      '3xl': { fontSize: '$10' },
    },
    weight: {
      normal: { fontWeight: '400' },
      medium: { fontWeight: '500' },
      semibold: { fontWeight: '600' },
      bold: { fontWeight: '700' },
    },
    color: {
      primary: { color: '$primary' },
      secondary: { color: '$textSecondary' },
      muted: { color: '$textMuted' },
      white: { color: 'white' },
      success: { color: '$success' },
      error: { color: '$error' },
    },
  } as const,
  
  defaultVariants: {
    size: 'md',
    weight: 'normal',
  },
});
