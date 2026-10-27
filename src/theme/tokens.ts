/** Sofia / Figma design tokens (JAW-9705). Mirrored in GlobalStyle :root and figma-theme.css. */
export const colors = {
  primary: "#000000",
  secondary: "#ffffff",
  accent: "#c8a47e",
  background: "#0e0d0d",
  surface: "#b71d18",
  "text-primary": "#000000",
  "text-secondary": "#828282",
  border: "#616161",
  error: "#ff5630",
  success: "#ffffff",
  warning: "#e0e0e0",
  info: "#c8a47e",
  "color-19": "#333333",
  "color-24": "#0e0d0d",
  "color-25": "#2f2f2f",
  "color-26": "#d9d9d9",
  "color-27": "#0e0d0d",
  "color-56": "#616161",
  "color-46": "#0b0b0b",
  "panel-dark": "#1b1b1b",
  "icon-muted": "#868686",
} as const;

export const typography = {
  body: {
    fontFamily: "Almarai, sans-serif",
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: "17.856px",
  },
  "body-6": {
    fontFamily: "Almarai, sans-serif",
    fontSize: "18px",
    fontWeight: 400,
    lineHeight: "20px",
  },
  "heading-lg-31": {
    fontFamily: "Almarai, sans-serif",
    fontSize: "24px",
    fontWeight: 700,
    lineHeight: "27px",
  },
  "heading-xl-36": {
    fontFamily: "'EB Garamond', serif",
    fontSize: "36px",
    fontWeight: 400,
    lineHeight: "47px",
  },
} as const;

export const spacing = {
  "padding-32": "32px",
  "gap-20": "20px",
  "gap-48": "48px",
  "padding-20": "20px",
  "padding-10": "10px",
} as const;

export const radius = {
  "radius-10000": "10000px",
  "radius-24": "24px",
  "radius-8": "8px",
  "radius-20": "20px",
} as const;

export const shadows = {
  "drop-shadow-11": "0px 4px 4px 0px #0000003f",
  "hero-card": "10px 10px 20px 0px rgba(0, 0, 0, 0.5)",
} as const;

export const effects = {
  "gradient-18": "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)",
} as const;
