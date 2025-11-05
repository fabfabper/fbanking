import React, { useEffect, useMemo } from "react";
import {
  TamaguiProvider,
  Theme,
  useTheme as useTamaguiTheme,
} from "@tamagui/core";
import config from "./tamagui.config";

export interface UIProviderProps {
  children: React.ReactNode;
  darkMode?: boolean;
}

export const UIProvider: React.FC<UIProviderProps> = ({
  children,
  darkMode = false,
}) => {
  // Update HTML root class when darkMode changes (web only)
  useEffect(() => {
    // Only run on web (check if document exists)
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      if (darkMode) {
        root.classList.remove("t_light");
        root.classList.add("t_dark");
      } else {
        root.classList.remove("t_dark");
        root.classList.add("t_light");
      }
    }
  }, [darkMode]);

  return (
    <TamaguiProvider config={config}>
      <Theme name={darkMode ? "dark" : "light"}>{children}</Theme>
    </TamaguiProvider>
  );
};

// Re-export Tamagui's useTheme as useAppTheme for compatibility with existing code
export const useAppTheme = () => {
  const theme = useTamaguiTheme();

  // Helper function to safely get string value from theme token
  const getColorValue = (token: any): string => {
    if (!token) return "#000000";
    
    // If it's already a string that looks like a color, return it
    if (typeof token === "string") {
      return token;
    }
    
    // Try multiple ways to extract the actual color value
    // 1. If it has .val property (Tamagui Variable), use that
    if (token.val !== undefined && token.val !== null) {
      const val = token.val;
      // The .val might itself be a Variable
      if (typeof val === "object" && val.val !== undefined) {
        return String(val.val);
      }
      return String(val);
    }
    
    // 2. If it has .get() method, call it and check the result
    if (typeof token.get === "function") {
      const value = token.get();
      // The result of .get() might also be a Variable with .val
      if (value && typeof value === "object" && value.val !== undefined) {
        return String(value.val);
      }
      if (typeof value === "string") {
        return value;
      }
      return String(value);
    }
    
    // 3. Otherwise, convert to string directly
    const result = String(token);
    // If String() produced something useless like "[object Object]", return a fallback
    if (result === "[object Object]") {
      console.warn("Could not extract color value from token:", token);
      return "#000000";
    }
    return result;
  };

  // Use useMemo to ensure colors object is recalculated when theme changes
  // This ensures components re-render when dark mode toggles
  const colors = useMemo(() => ({
    primary: getColorValue(theme.primary),
    primaryHover: getColorValue(theme.primaryHover || theme.primary),
    primaryLight: getColorValue(theme.primaryLight || theme.primary),
    primaryDark: getColorValue(theme.primaryDark || theme.primary),
    secondary: getColorValue(theme.secondary),
    success: getColorValue(theme.success),
    error: getColorValue(theme.error),
    warning: getColorValue(theme.warning) || "#F59E0B",
    background: getColorValue(theme.background),
    backgroundGray: getColorValue(theme.backgroundGray),
    cardBg: getColorValue(theme.cardBg),
    cardBackground: getColorValue(theme.cardBg),
    textPrimary: getColorValue(theme.text),
    textSecondary: getColorValue(theme.textSecondary),
    textLight: getColorValue(theme.textMuted || theme.textSecondary),
    textWhite: "#FFFFFF",
    border: getColorValue(theme.border),
    borderLight: getColorValue(theme.borderLight || theme.border),
    categoryIncome: getColorValue(theme.success),
    categoryExpense: getColorValue(theme.error),
    successDark: getColorValue(theme.successDark || theme.success),
    errorDark: getColorValue(theme.errorDark || theme.error),
    cardUnselected: getColorValue(theme.cardUnselected || theme.cardBg),
    cardUnselectedText: getColorValue(theme.cardUnselectedText || theme.text),
    cardUnselectedSecondary: getColorValue(
      theme.cardUnselectedSecondary || theme.textSecondary
    ),
  }), [
    theme.primary?.val,
    theme.secondary?.val,
    theme.success?.val,
    theme.error?.val,
    theme.warning?.val,
    theme.background?.val,
    theme.backgroundGray?.val,
    theme.cardBg?.val,
    theme.text?.val,
    theme.textSecondary?.val,
    theme.textMuted?.val,
    theme.border?.val,
  ]);

  // Return in the same format as before for compatibility
  return {
    theme: {
      colors,
    },
  };
};
