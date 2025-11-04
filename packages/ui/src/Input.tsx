import { styled } from '@tamagui/core';
import { Input as TamaguiInput } from '@tamagui/input';

export const Input = styled(TamaguiInput, {
  name: 'Input',
  borderWidth: 1,
  borderColor: '$border',
  borderRadius: '$3',
  paddingHorizontal: '$4',
  paddingVertical: '$3',
  fontSize: '$4',
  color: '$text',
  backgroundColor: '$background',
  
  focusStyle: {
    borderColor: '$primary',
    outlineWidth: 0,
  },
  
  variants: {
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
    error: {
      true: {
        borderColor: '$error',
      },
    },
  } as const,
  
  defaultVariants: {
    size: 'md',
  },
});
