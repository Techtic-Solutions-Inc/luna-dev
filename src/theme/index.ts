import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { colors, typography, spacing, radius, shadows } from './tokens';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body, #root {
    margin: 0;
    padding: 0;
    height: 100%;
  }

  body {
    font-family: 'Almarai', sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 17.856px;
    color: ${colors.textPrimary};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  :root {
    --color-primary: ${colors.primary};
    --color-secondary: ${colors.secondary};
    --color-accent: ${colors.accent};
    --color-background: ${colors.background};
    --color-surface: ${colors.surface};
    --color-text-primary: ${colors.textPrimary};
    --color-text-secondary: ${colors.textSecondary};
    --color-border: ${colors.border};
    --color-error: ${colors.error};
    --color-success: ${colors.success};
    --color-warning: ${colors.warning};
    --color-info: ${colors.info};
    --color-13: ${colors.color13};
    --color-14: ${colors.color14};
    --color-15: ${colors.color15};
    --color-16: ${colors.color16};
    --color-17: ${colors.color17};
    --color-18: ${colors.color18};
    --color-19: ${colors.color19};
    --color-20: ${colors.color20};
    --color-21: ${colors.color21};
    --color-22: ${colors.color22};
    --color-23: ${colors.color23};
    --color-24: ${colors.color24};
    --color-25: ${colors.color25};
    --color-26: ${colors.color26};
    --color-27: ${colors.color27};
    --color-28: ${colors.color28};
    --color-29: ${colors.color29};
    --color-30: ${colors.color30};
    --color-31: ${colors.color31};
    --color-32: ${colors.color32};
    --color-33: ${colors.color33};
    --color-34: ${colors.color34};
    --color-35: ${colors.color35};
    --color-36: ${colors.color36};
    --color-37: ${colors.color37};
    --color-38: ${colors.color38};
    --color-39: ${colors.color39};
    --color-40: ${colors.color40};
    --color-41: ${colors.color41};
    --color-42: ${colors.color42};
    --color-43: ${colors.color43};
    --color-44: ${colors.color44};
    --color-45: ${colors.color45};
    --color-46: ${colors.color46};
    --color-47: ${colors.color47};
    --color-48: ${colors.color48};
    --color-49: ${colors.color49};
    --color-50: ${colors.color50};
    --color-51: ${colors.color51};
    --color-52: ${colors.color52};
    --color-53: ${colors.color53};
    --color-54: ${colors.color54};
    --color-55: ${colors.color55};
    --color-56: ${colors.color56};
    --color-57: ${colors.color57};
    --color-58: ${colors.color58};
    --color-59: ${colors.color59};
    --color-60: ${colors.color60};
    --color-61: ${colors.color61};
    --color-62: ${colors.color62};
    --color-63: ${colors.color63};
    --color-64: ${colors.color64};
    --color-65: ${colors.color65};
    --color-66: ${colors.color66};
    --color-67: ${colors.color67};
    --color-68: ${colors.color68};
    --color-69: ${colors.color69};
    --color-70: ${colors.color70};
    --color-71: ${colors.color71};
    --color-72: ${colors.color72};
    --color-73: ${colors.color73};
    --color-74: ${colors.color74};
    --color-75: ${colors.color75};
    --color-76: ${colors.color76};
    --color-77: ${colors.color77};
    --color-78: ${colors.color78};
    --color-79: ${colors.color79};
    --color-80: ${colors.color80};
    --color-81: ${colors.color81};
    --color-82: ${colors.color82};
    --color-83: ${colors.color83};
    --color-84: ${colors.color84};
    --color-85: ${colors.color85};
    --color-86: ${colors.color86};
    --color-87: ${colors.color87};
    --color-88: ${colors.color88};
    --color-89: ${colors.color89};
    --color-90: ${colors.color90};
    --color-91: ${colors.color91};
    --color-92: ${colors.color92};
    --color-93: ${colors.color93};
    --color-94: ${colors.color94};
    --color-95: ${colors.color95};

    --font-body: ${typography.body.fontFamily};
    --font-body-size: ${typography.body.fontSize};
    --font-body-weight: ${typography.body.fontWeight};
    --font-body-lh: ${typography.body.lineHeight};

    --font-body-sm-2-family: ${typography['body-sm-2'].fontFamily};
    --font-body-sm-2-size: ${typography['body-sm-2'].fontSize};
    --font-body-sm-2-weight: ${typography['body-sm-2'].fontWeight};
    --font-body-sm-2-lh: ${typography['body-sm-2'].lineHeight};

    --font-body-3-family: ${typography['body-3'].fontFamily};
    --font-body-3-size: ${typography['body-3'].fontSize};
    --font-body-3-weight: ${typography['body-3'].fontWeight};
    --font-body-3-lh: ${typography['body-3'].lineHeight};

    --font-caption-4-family: ${typography['caption-4'].fontFamily};
    --font-caption-4-size: ${typography['caption-4'].fontSize};
    --font-caption-4-weight: ${typography['caption-4'].fontWeight};
    --font-caption-4-lh: ${typography['caption-4'].lineHeight};

    --font-caption-5-family: ${typography['caption-5'].fontFamily};
    --font-caption-5-size: ${typography['caption-5'].fontSize};
    --font-caption-5-weight: ${typography['caption-5'].fontWeight};
    --font-caption-5-lh: ${typography['caption-5'].lineHeight};

    --font-heading-md-10-family: ${typography['heading-md-10'].fontFamily};
    --font-heading-md-10-size: ${typography['heading-md-10'].fontSize};
    --font-heading-md-10-weight: ${typography['heading-md-10'].fontWeight};
    --font-heading-md-10-lh: ${typography['heading-md-10'].lineHeight};

    --font-heading-lg-24-family: ${typography['heading-lg-24'].fontFamily};
    --font-heading-lg-24-size: ${typography['heading-lg-24'].fontSize};
    --font-heading-lg-24-weight: ${typography['heading-lg-24'].fontWeight};
    --font-heading-lg-24-lh: ${typography['heading-lg-24'].lineHeight};

    --font-heading-lg-31-family: ${typography['heading-lg-31'].fontFamily};
    --font-heading-lg-31-size: ${typography['heading-lg-31'].fontSize};
    --font-heading-lg-31-weight: ${typography['heading-lg-31'].fontWeight};
    --font-heading-lg-31-lh: ${typography['heading-lg-31'].lineHeight};

    --font-heading-xl-44-family: ${typography['heading-xl-44'].fontFamily};
    --font-heading-xl-44-size: ${typography['heading-xl-44'].fontSize};
    --font-heading-xl-44-weight: ${typography['heading-xl-44'].fontWeight};
    --font-heading-xl-44-lh: ${typography['heading-xl-44'].lineHeight};

    --font-heading-xl-45-family: ${typography['heading-xl-45'].fontFamily};
    --font-heading-xl-45-size: ${typography['heading-xl-45'].fontSize};
    --font-heading-xl-45-weight: ${typography['heading-xl-45'].fontWeight};
    --font-heading-xl-45-lh: ${typography['heading-xl-45'].lineHeight};

    --font-heading-xl-46-family: ${typography['heading-xl-46'].fontFamily};
    --font-heading-xl-46-size: ${typography['heading-xl-46'].fontSize};
    --font-heading-xl-46-weight: ${typography['heading-xl-46'].fontWeight};
    --font-heading-xl-46-lh: ${typography['heading-xl-46'].lineHeight};
  }
`;

const theme = {
  colors,
  typography,
  spacing,
  radius,
  shadows,
};

export const Theme: React.FC<{ children: React.ReactNode }> = ({ children }) =>
  React.createElement(
    ThemeProvider,
    { theme },
    React.createElement(React.Fragment, null, React.createElement(GlobalStyle), children)
  );
