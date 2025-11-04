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
    background: "#F9FAFB",
    backgroundGray: "#F3F4F6",
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
      backgroundGray: customTokens.color.backgroundGray,
      cardBg: customTokens.color.cardBg,
      border: customTokens.color.border,
      color: customTokens.color.text,
      colorHover: customTokens.color.text,
      colorPress: customTokens.color.text,
      colorFocus: customTokens.color.text,
      colorTransparent: "transparent",
      text: customTokens.color.text,
      textSecondary: customTokens.color.textSecondary,
      textMuted: customTokens.color.textMuted,
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
    dark: {
      background: "#0F172A",
      backgroundHover: "#1E293B",
      backgroundPress: "#1E293B",
      backgroundFocus: "#1E293B",
      backgroundTransparent: "transparent",
      backgroundGray: "#1E293B",
      cardBg: "#1E293B",
      border: "#334155",
      color: "#F1F5F9",
      colorHover: "#F1F5F9",
      colorPress: "#F1F5F9",
      colorFocus: "#F1F5F9",
      colorTransparent: "transparent",
      text: "#F1F5F9",
      textSecondary: "#94A3B8",
      textMuted: "#64748B",
      borderColor: "#334155",
      borderColorHover: "#334155",
      borderColorFocus: "#3B82F6",
      borderColorPress: "#3B82F6",
      placeholderColor: "#64748B",
      primary: "#3B82F6",
      secondary: "#94A3B8",
      success: "#10B981",
      warning: "#F59E0B",
      error: "#EF4444",
    },
  },
  themeClassNameOnRoot: true,
});

export type AppConfig = typeof config;

declare module "@tamagui/core" {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config;
