import React from "react";
import { TextInput, Platform } from "react-native";
import { styled } from "@tamagui/core";
import { useTheme } from "./UIProvider";

const StyledTextInput = styled(TextInput, {
  borderWidth: 1,
  borderColor: "$border",
  borderRadius: "$3",
  paddingHorizontal: "$4",
  paddingVertical: "$3",
  fontSize: "$4",
  color: "$text",
  backgroundColor: "$background",
  outlineStyle: "none",
} as any);

export interface InputProps {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  secureTextEntry?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  fullWidth?: boolean;
  error?: boolean;
  size?: "sm" | "md" | "lg";
  onFocus?: () => void;
  onBlur?: () => void;
}

export const Input = React.forwardRef<TextInput, InputProps>(
  ({ size = "md", fullWidth = false, error = false, ...props }, ref) => {
    const { theme } = useTheme();

    const sizeStyles = {
      sm: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontSize: 14,
      },
      md: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
      },
      lg: {
        paddingHorizontal: 20,
        paddingVertical: 14,
        fontSize: 18,
      },
    };

    return (
      <StyledTextInput
        ref={ref}
        style={[
          {
            width: fullWidth ? "100%" : undefined,
            borderColor: error ? theme.colors.error : theme.colors.border,
            color: theme.colors.textPrimary,
            backgroundColor: theme.colors.cardBg,
            ...sizeStyles[size],
          },
          Platform.OS === "web" && {
            outlineStyle: "none",
          },
        ]}
        placeholderTextColor={theme.colors.textSecondary}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
