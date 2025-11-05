import React, { useEffect } from "react";
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
  // Update HTML root class when darkMode changes
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.remove("t_light");
      root.classList.add("t_dark");
    } else {
      root.classList.remove("t_dark");
      root.classList.add("t_light");
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

  // Use .get() to get reactive values that update when theme changes
  // Return in the same format as before for compatibility
  return {
    theme: {
      colors: {
        primary: theme.primary.get(),
        primaryHover: theme.primaryHover?.get() || theme.primary.get(),
        primaryLight: theme.primaryLight?.get() || theme.primary.get(),
        primaryDark: theme.primaryDark?.get() || theme.primary.get(),
        secondary: theme.secondary.get(),
        success: theme.success.get(),
        error: theme.error.get(),
        warning: theme.warning?.get() || "#F59E0B",
        background: theme.background.get(),
        backgroundGray: theme.backgroundGray.get(),
        cardBg: theme.cardBg.get(),
        cardBackground: theme.cardBg.get(),
        textPrimary: theme.text.get(),
        textSecondary: theme.textSecondary.get(),
        textLight: theme.textMuted?.get() || theme.textSecondary.get(),
        textWhite: "#FFFFFF",
        border: theme.border.get(),
        borderLight: theme.borderLight?.get() || theme.border.get(),
        categoryIncome: theme.success.get(),
        categoryExpense: theme.error.get(),
        successDark: theme.successDark?.get() || theme.success.get(),
        errorDark: theme.errorDark?.get() || theme.error.get(),
        cardUnselected: theme.cardUnselected?.get() || theme.cardBg.get(),
        cardUnselectedText: theme.cardUnselectedText?.get() || theme.text.get(),
        cardUnselectedSecondary:
          theme.cardUnselectedSecondary?.get() || theme.textSecondary.get(),
      },
    },
  };
};
