export const tokens = {
  colors: {
    background: "#0e0d0d",
    textPrimary: "#000000",
    textSecondary: "#828282",
    success: "#ffffff",
    info: "#c8a47e",
    surface: "#14100d",
    error: "#c5221f",
    warning: "#e0e0e0",
  },
  fonts: {
    almarai: "'Almarai', sans-serif",
    ebGaramond: "'EB Garamond', serif",
    publicSans: "'Public Sans', sans-serif",
  },
  spacing: {
    pageInset: "210px",
  },
} as const;

export type AppTheme = typeof tokens;
