import { useLayoutEffect, type ReactNode } from 'react';

import { cssVariables } from './cssVariables';
import { ThemeContext, theme } from './themeContext';

export interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * Publishes the design tokens twice: as CSS custom properties on `:root` for
 * stylesheets and inline styles, and as a typed object for component logic.
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  useLayoutEffect(() => {
    const root = document.documentElement;
    const entries = Object.entries(cssVariables);

    for (const [name, value] of entries) {
      root.style.setProperty(name, value);
    }

    return () => {
      for (const [name] of entries) {
        root.style.removeProperty(name);
      }
    };
  }, []);

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}
