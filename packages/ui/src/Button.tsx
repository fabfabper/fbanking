import { styled } from '@tamagui/core';
import { Button as TamaguiButton } from '@tamagui/button';

export const Button = styled(TamaguiButton, {
  name: 'Button',
  backgroundColor: '$primary',
  color: 'white',
  borderRadius: '$4',
  paddingHorizontal: '$4',
  paddingVertical: '$3',
  fontSize: '$4',
  fontWeight: '600',
  cursor: 'pointer',
  
  hoverStyle: {
    backgroundColor: '$primaryDark',
  },
  
  pressStyle: {
    backgroundColor: '$primaryDark',
    scale: 0.98,
  },
  
  variants: {
    variant: {
      primary: {
        backgroundColor: '$primary',
        color: 'white',
        hoverStyle: {
          backgroundColor: '$primaryDark',
        },
      },
      secondary: {
        backgroundColor: '$backgroundGray',
        color: '$text',
        hoverStyle: {
          backgroundColor: '$border',
        },
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '$primary',
        color: '$primary',
        hoverStyle: {
          backgroundColor: '$backgroundGray',
        },
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '$primary',
        hoverStyle: {
          backgroundColor: '$backgroundGray',
        },
      },
    },
    size: {
      sm: {
        paddingHorizontal: '$3',
        paddingVertical: '$2',
        fontSize: '$3',
      },
      md: {
        paddingHorizontal: '$4',
        paddingVertical: '$3',
        fontSize: '$4',
      },
      lg: {
        paddingHorizontal: '$5',
        paddingVertical: '$4',
        fontSize: '$5',
      },
    },
    fullWidth: {
      true: {
        width: '100%',
      },
    },
  } as const,
  
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});
