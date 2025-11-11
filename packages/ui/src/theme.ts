export const lightColors = {
  // Primary brand colors
  primary: "#2563EB",
  primaryHover: "#1D4ED8",
  primaryLight: "#3B82F6",
  primaryDark: "#1E40AF",

  // Secondary colors
  secondary: "#64748B",
  secondaryLight: "#94A3B8",
  secondaryDark: "#475569",

  // Status colors
  success: "#10B981",
  successLight: "#ECFDF5",
  successDark: "#059669",
  error: "#EF4444",
  errorLight: "#FEF2F2",
  errorDark: "#DC2626",
  warning: "#F59E0B",
  info: "#3B82F6",

  // Backgrounds
  background: "#F9FAFB",
  backgroundGray: "#F3F4F6",
  backgroundElevatedLight: "#FFFFFF",
  cardBg: "#FFFFFF",

  // Text colors
  textPrimary: "#1F2937",
  textSecondary: "#64748B",
  textLight: "#9CA3AF",
  textWhite: "#FFFFFF",

  // Account card colors (unselected)
  cardUnselected: "#FFFFFF",
  cardUnselectedText: "#1F2937",
  cardUnselectedSecondary: "#64748B",

  // Borders
  border: "#E5E7EB",
  borderLight: "#F3F4F6",

  // Transaction category badge backgrounds
  categoryIncome: "#ECFDF5",
  categoryExpense: "#FEF2F2",

  // Hover states
  hoverOverlay: "rgba(255, 255, 255, 0.1)",
  hoverOverlayDark: "rgba(0, 0, 0, 0.05)",
};

export const darkColors = {
  // Primary brand colors
  primary: "#3B82F6",
  primaryHover: "#2563EB",
  primaryLight: "#60A5FA",
  primaryDark: "#1D4ED8",

  // Secondary colors
  secondary: "#94A3B8",
  secondaryLight: "#CBD5E1",
  secondaryDark: "#64748B",

  // Status colors
  success: "#10B981",
  successLight: "#065F46",
  successDark: "#34D399",
  error: "#EF4444",
  errorLight: "#7F1D1D",
  errorDark: "#F87171",
  warning: "#F59E0B",
  info: "#3B82F6",

  // Backgrounds
  background: "#0F172A",
  backgroundGray: "#1E293B",
  backgroundElevatedLight: "#273447",
  cardBg: "#1E293B",

  // Text colors
  textPrimary: "#F1F5F9",
  textSecondary: "#94A3B8",
  textLight: "#64748B",
  textWhite: "#FFFFFF",

  // Account card colors (unselected)
  cardUnselected: "#334155",
  cardUnselectedText: "#E2E8F0",
  cardUnselectedSecondary: "#94A3B8",

  // Borders
  border: "#334155",
  borderLight: "#1E293B",

  // Transaction category badge backgrounds
  categoryIncome: "#065F46",
  categoryExpense: "#7F1D1D",

  // Hover states
  hoverOverlay: "rgba(255, 255, 255, 0.1)",
  hoverOverlayDark: "rgba(0, 0, 0, 0.2)",
};

export const theme = {
  colors: lightColors,

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },

  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
  },

  shadows: {
    sm: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 3,
      elevation: 1,
    },
    md: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
    },
    lg: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 10,
      elevation: 5,
    },
  },
};

export type Theme = typeof theme;

export const getTheme = (isDark: boolean) => ({
  ...theme,
  colors: isDark ? darkColors : lightColors,
});
