import React from "react";
import { Platform, StyleSheet } from "react-native";
import { useAppTheme } from "./UIProvider";

export interface DateInputProps {
  value: string;
  onChange: (date: string) => void;
  placeholder?: string;
  style?: any;
}

export const DateInput: React.FC<DateInputProps> = ({
  value,
  onChange,
  placeholder = "YYYY-MM-DD",
  style,
}) => {
  const { theme } = useAppTheme();

  if (Platform.OS === "web") {
    // Use native HTML5 date input for web
    return React.createElement("input", {
      type: "date",
      value: value,
      onChange: (e: any) => onChange(e.target.value),
      placeholder: placeholder,
      style: {
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: 8,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 12,
        paddingBottom: 12,
        fontSize: 16,
        color: theme.colors.textPrimary,
        backgroundColor: theme.colors.cardBg,
        width: "100%",
        fontFamily: "system-ui, -apple-system, sans-serif",
        ...style,
      },
    });
  }

  // For mobile, we'll use a simple text input
  // In a production app, you might want to use a library like react-native-date-picker
  const TextInput = require("react-native").TextInput;

  return (
    <TextInput
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      style={[
        {
          borderWidth: 1,
          borderColor: theme.colors.border,
          borderRadius: 8,
          paddingHorizontal: 16,
          paddingVertical: 12,
          fontSize: 16,
          color: theme.colors.textPrimary,
          backgroundColor: theme.colors.cardBg,
        },
        style,
      ]}
      placeholderTextColor={theme.colors.textSecondary}
    />
  );
};
