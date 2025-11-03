/**
 * Theme configuration for the e-banking application
 * Supports both light and dark modes with a customizable color palette
 */

export interface ThemeColors {
  primary: string;
  primaryDark: string;
  primaryLight: string;
  secondary: string;
  background: string;
  surface: string;
  error: string;
  success: string;
  warning: string;
  info: string;
  text: {
    primary: string;
    secondary: string;
    disabled: string;
    inverse: string;
  };
  border: string;
  divider: string;
}

export interface ThemeSpacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

export interface ThemeTypography {
  fontFamily: {
    regular: string;
    medium: string;
    bold: string;
  };
  fontSize: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  lineHeight: {
    tight: number;
    normal: number;
    relaxed: number;
  };
}

export interface ThemeBorderRadius {
  none: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  full: number;
}

export interface Theme {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  typography: ThemeTypography;
  borderRadius: ThemeBorderRadius;
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
}

// Default light blue corporate color
const defaultPrimaryColor = '#4A9FE8';

// Light theme configuration
export const lightTheme: Theme = {
  colors: {
    primary: defaultPrimaryColor,
    primaryDark: '#3A8FD8',
    primaryLight: '#6BB5F0',
    secondary: '#64748B',
    background: '#F8FAFC',
    surface: '#FFFFFF',
    error: '#EF4444',
    success: '#10B981',
    warning: '#F59E0B',
    info: '#3B82F6',
    text: {
      primary: '#1E293B',
      secondary: '#64748B',
      disabled: '#94A3B8',
      inverse: '#FFFFFF',
    },
    border: '#E2E8F0',
    divider: '#E2E8F0',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  typography: {
    fontFamily: {
      regular: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      medium: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      bold: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 24,
      xxl: 32,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  borderRadius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },
};

// Dark theme configuration
export const darkTheme: Theme = {
  ...lightTheme,
  colors: {
    primary: defaultPrimaryColor,
    primaryDark: '#3A8FD8',
    primaryLight: '#6BB5F0',
    secondary: '#94A3B8',
    background: '#0F172A',
    surface: '#1E293B',
    error: '#EF4444',
    success: '#10B981',
    warning: '#F59E0B',
    info: '#3B82F6',
    text: {
      primary: '#F8FAFC',
      secondary: '#CBD5E1',
      disabled: '#64748B',
      inverse: '#1E293B',
    },
    border: '#334155',
    divider: '#334155',
  },
};

/**
 * Create a custom theme with a specific primary color
 * @param primaryColor - The primary brand color
 * @param mode - 'light' or 'dark' theme mode
 * @returns A customized theme object
 */
export function createTheme(
  primaryColor: string = defaultPrimaryColor,
  mode: 'light' | 'dark' = 'light'
): Theme {
  const baseTheme = mode === 'light' ? lightTheme : darkTheme;
  
  // Calculate darker and lighter variants
  // This is a simplified approach - in production, you might want to use a color manipulation library
  const primaryDark = primaryColor; // You can adjust this with color manipulation
  const primaryLight = primaryColor; // You can adjust this with color manipulation
  
  return {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      primary: primaryColor,
      primaryDark,
      primaryLight,
    },
  };
}

export type { Theme as ThemeType };
