/** Sofia / Figma design tokens (JAW-9705). Prefer CSS variables from figma-theme.css at runtime. */
export const colors = {
  primary: "#00000000",
  secondary: "#ffffff",
  accent: "#c8a47e",
  background: "#637381",
  surface: "#b71d18",
  "text-primary": "#000000",
  "text-secondary": "#828282",
  border: "#ff5630",
  error: "#ffffff0c",
  success: "#e0e0e0",
  warning: "#ff563028",
  info: "#c8a47e19",
  "color-24": "#0e0d0d",
  "color-27": "#0e0d0d",
} as const;

export const typography = {
  body: {
    fontFamily: "Almarai, sans-serif",
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: "17.856px",
  },
} as const;

export const spacing = {
  "padding-32": "32px",
  "gap-20": "20px",
  "gap-48": "48px",
} as const;

export const radius = {
  "radius-10000": "10000px",
  "radius-24": "24px",
  "radius-8": "8px",
} as const;

export const shadows = {
  "drop-shadow-11": "0px 4px 4px 0px #0000003f",
} as const;
