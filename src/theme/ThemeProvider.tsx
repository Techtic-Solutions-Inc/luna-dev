import { ThemeProvider as SCThemeProvider } from "styled-components";
import type { ReactNode } from "react";
import { tokens, type AppTheme } from "./tokens";

const theme: AppTheme = tokens;

export function ThemeProvider({ children }: { children: ReactNode }) {
  return <SCThemeProvider theme={theme}>{children}</SCThemeProvider>;
}
