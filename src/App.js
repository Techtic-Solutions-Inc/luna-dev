import React from 'react';
import styled from 'styled-components';
import { ThemeProvider } from './theme/ThemeProvider';
import GlobalStyles from './components/GlobalStyles';
import ColorPalette from './components/ColorPalette';
import Typography from './components/Typography';
import Spacing from './components/Spacing';
import Borders from './components/Borders';
import Shadows from './components/Shadows';
import Breakpoints from './components/Breakpoints';
import IconLibrary from './components/IconLibrary';

const Page = styled.main`
  max-width: ${({ theme }) => theme.grid.containerMaxWidth.wide};
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.page}
    ${({ theme }) => theme.spacing.gutter};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing['2xl']};

  ${({ theme }) => theme.breakpoints.tablet} {
    padding-left: ${({ theme }) => theme.grid.margin.tablet};
    padding-right: ${({ theme }) => theme.grid.margin.tablet};
  }

  ${({ theme }) => theme.breakpoints.desktop} {
    padding-left: ${({ theme }) => theme.grid.margin.desktop};
    padding-right: ${({ theme }) => theme.grid.margin.desktop};
  }
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  padding-bottom: ${({ theme }) => theme.spacing.lg};
  border-bottom: ${({ theme }) => theme.borders.styles.subtle};
`;

const Brand = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontFamilies.display};
  font-size: ${({ theme }) => theme.typography.fontSizes['4xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.brand.primary};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacings.tight};
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 40rem;
`;

function App() {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <Page>
        <Header>
          <Brand>Jordan AI</Brand>
          <Subtitle>
            Design system tokens — color, typography, spacing, borders, shadows,
            breakpoints, and icons.
          </Subtitle>
        </Header>
        <ColorPalette />
        <Typography />
        <Spacing />
        <Borders />
        <Shadows />
        <Breakpoints />
        <IconLibrary />
      </Page>
    </ThemeProvider>
  );
}

export default App;
