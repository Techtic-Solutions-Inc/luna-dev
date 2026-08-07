import React from 'react';
import styled from 'styled-components';
import { borderRadii, borderWidths } from '../theme/borders';

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
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Item = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Box = styled.div`
  width: 72px;
  height: 72px;
  background-color: ${({ theme }) => theme.colors.backgroundSubtle};
  border: ${({ $borderWidth, theme }) =>
    `${$borderWidth || theme.borders.width.medium} solid ${theme.colors.brand.secondary}`};
  border-radius: ${({ $radius }) => $radius};
`;

const Label = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-family: ${({ theme }) => theme.typography.fontFamilies.mono};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
`;

/**
 * Border radius and width token reference.
 */
export function Borders() {
  return (
    <Section aria-labelledby="borders-heading">
      <Title id="borders-heading">Borders</Title>
      <Grid aria-label="Border radius tokens">
        {Object.entries(borderRadii).map(([name, value]) => (
          <Item key={name}>
            <Box
              $radius={value}
              role="img"
              aria-label={`Border radius ${name}: ${value}`}
            />
            <Label>
              {name} · {value}
            </Label>
          </Item>
        ))}
      </Grid>
      <Grid aria-label="Border width tokens">
        {Object.entries(borderWidths).map(([name, value]) => (
          <Item key={`width-${name}`}>
            <Box
              $radius={borderRadii.md}
              $borderWidth={value === '0' ? '0' : value}
              role="img"
              aria-label={`Border width ${name}: ${value}`}
            />
            <Label>
              width/{name} · {value}
            </Label>
          </Item>
        ))}
      </Grid>
    </Section>
  );
}

export default Borders;
