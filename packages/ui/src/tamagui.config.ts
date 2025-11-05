import { createTamagui } from "@tamagui/core";
import { config as defaultConfig } from "@tamagui/config/v3";

export const config = createTamagui({
  ...defaultConfig,
  themes: {
    light: {
      background: "#F9FAFB",
      backgroundHover: "#F3F4F6",
      backgroundPress: "#F3F4F6",
      backgroundFocus: "#F3F4F6",
      backgroundTransparent: "transparent",
      backgroundGray: "#F3F4F6",
      cardBg: "#FFFFFF",
      border: "#E2E8F0",
      color: "#0F172A",
      colorHover: "#0F172A",
      colorPress: "#0F172A",
      colorFocus: "#0F172A",
      colorTransparent: "transparent",
      text: "#0F172A",
      textSecondary: "#475569",
      textMuted: "#94A3B8",
      borderColor: "#E2E8F0",
      borderColorHover: "#E2E8F0",
      borderColorFocus: "#2563EB",
      borderColorPress: "#2563EB",
      placeholderColor: "#94A3B8",
      primary: "#2563EB",
      secondary: "#64748B",
      success: "#10B981",
      warning: "#F59E0B",
      error: "#EF4444",
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
