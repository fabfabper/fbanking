import { styled } from '@tamagui/core';
import { YStack as TamaguiYStack } from '@tamagui/stacks';

export const Card = styled(TamaguiYStack, {
  name: 'Card',
  backgroundColor: '$cardBg',
  borderRadius: '$4',
  padding: '$4',
  borderWidth: 1,
  borderColor: '$border',
  
  variants: {
    hoverable: {
      true: {
        cursor: 'pointer',
        hoverStyle: {
          borderColor: '$primary',
        },
      },
    },
    padding: {
      none: { padding: 0 },
      sm: { padding: '$2' },
      md: { padding: '$4' },
      lg: { padding: '$6' },
    },
  } as const,
  
  defaultVariants: {
    padding: 'md',
  },
});
