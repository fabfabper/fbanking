import React, { createContext, useContext, useEffect } from "react";
import { TamaguiProvider, Theme } from "@tamagui/core";
import config from "./tamagui.config";
import { getTheme } from "./theme";

interface ThemeContextType {
  isDark: boolean;
  theme: ReturnType<typeof getTheme>;
}

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  theme: getTheme(false),
});

export const useTheme = () => useContext(ThemeContext);

export interface UIProviderProps {
  children: React.ReactNode;
  darkMode?: boolean;
}

export const UIProvider: React.FC<UIProviderProps> = ({
  children,
  darkMode = false,
}) => {
  const themeValue = {
    isDark: darkMode,
    theme: getTheme(darkMode),
  };

  return (
    <ThemeContext.Provider value={themeValue}>
      <TamaguiProvider
        config={config}
        defaultTheme={darkMode ? "dark" : "light"}
      >
        <Theme name={darkMode ? "dark" : "light"} forceClassName>
          {children}
        </Theme>
      </TamaguiProvider>
    </ThemeContext.Provider>
  );
};
