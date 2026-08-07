import React from 'react';
import styled from 'styled-components';
import { colorTokens } from '../theme/colors';

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontFamilies.mono};
  font-size: ${({ theme }) => theme.typography.fontSizes['2xl']};
  margin: 0;
`;

const Grid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: ${({ theme }) => theme.spacing.sm};
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Swatch = styled.li`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const SwatchColor = styled.div`
  width: 100%;
  aspect-ratio: 1;
  border-radius: ${({ theme }) => theme.borders.radius.md};
  background-color: ${({ $value }) => $value};
  border: ${({ theme }) => theme.borders.styles.subtle};
  box-shadow: ${({ theme }) => theme.shadows.xs};
`;

const SwatchMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const TokenName = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  word-break: break-all;
`;

const TokenValue = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.muted};
  font-family: ${({ theme }) => theme.typography.fontFamilies.mono};
`;

/**
 * Displays the design-system color palette from CSS variable tokens.
 */
export function ColorPalette({ tokens = colorTokens }) {
  const entries = Object.entries(tokens);

  return (
    <Section aria-labelledby="color-palette-heading">
      <Title id="color-palette-heading">Color Palette</Title>
      <Grid>
        {entries.map(([token, value]) => (
          <Swatch key={token}>
            <SwatchColor
              $value={value}
              role="img"
              aria-label={`${token}: ${value}`}
            />
            <SwatchMeta>
              <TokenName>{token}</TokenName>
              <TokenValue>{value}</TokenValue>
            </SwatchMeta>
          </Swatch>
        ))}
      </Grid>
    </Section>
  );
}

export default ColorPalette;
