export const tokens = {
  colors: {
    background: "#0e0d0d",
    textPrimary: "#ffffff",
    textSecondary: "#828282",
    textMuted: "#868686",
    success: "#ffffff",
    info: "#c8a47e",
    accent: "#c8a47e",
    accentHover: "#8b6843",
    surface: "#14100d",
    color20: "#1a1a19",
    color23: "#0b0b0b",
    error: "#c5221f",
    warning: "#e0e0e0",
    onLight: "#000000",
  },
  fonts: {
    almarai: "'Almarai', sans-serif",
    ebGaramond: "'EB Garamond', serif",
    publicSans: "'Public Sans', sans-serif",
  },
  spacing: {
    pageInset: "210px",
    padding20: "20px",
  },
  radius: {
    pill: "1000px",
    card: "20px",
  },
  shadows: {
    card: "10px 10px 20px 0px rgba(0, 0, 0, 0.5)",
  },
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    figma: "1920px",
  },
} as const;

export type AppTheme = typeof tokens;
