import { createTamagui } from "@tamagui/core";
import { config as defaultConfig } from "@tamagui/config/v3";

// Modern e-banking color scheme
const customTokens = {
  color: {
    primary: "#2563EB", // Modern blue
    primaryDark: "#1D4ED8",
    primaryLight: "#3B82F6",
    secondary: "#64748B", // Slate gray
    success: "#10B981", // Green
    warning: "#F59E0B", // Amber
    error: "#EF4444", // Red
    background: "#FFFFFF",
    backgroundGray: "#F8FAFC",
    text: "#0F172A",
    textSecondary: "#475569",
    textMuted: "#94A3B8",
    border: "#E2E8F0",
    cardBg: "#FFFFFF",
  },
};

export const config = createTamagui({
  ...defaultConfig,
  tokens: {
    ...defaultConfig.tokens,
    color: {
      ...defaultConfig.tokens.color,
      ...customTokens.color,
    },
  },
  themes: {
    light: {
      background: customTokens.color.background,
      backgroundHover: customTokens.color.backgroundGray,
      backgroundPress: customTokens.color.backgroundGray,
      backgroundFocus: customTokens.color.backgroundGray,
      backgroundTransparent: "transparent",
      color: customTokens.color.text,
      colorHover: customTokens.color.text,
      colorPress: customTokens.color.text,
      colorFocus: customTokens.color.text,
      colorTransparent: "transparent",
      borderColor: customTokens.color.border,
      borderColorHover: customTokens.color.border,
      borderColorFocus: customTokens.color.primary,
      borderColorPress: customTokens.color.primary,
      placeholderColor: customTokens.color.textMuted,
      primary: customTokens.color.primary,
      secondary: customTokens.color.secondary,
      success: customTokens.color.success,
      warning: customTokens.color.warning,
      error: customTokens.color.error,
    },
  },
});

export type AppConfig = typeof config;

declare module "@tamagui/core" {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config;
