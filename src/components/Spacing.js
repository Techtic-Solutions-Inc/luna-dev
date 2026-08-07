import React from 'react';
import styled from 'styled-components';
import { spacingScale, spacingPixels } from '../theme/spacing';

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

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Row = styled.li`
  display: grid;
  grid-template-columns: 4rem 5rem 1fr;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Token = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamilies.mono};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const Pixels = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.muted};
`;

const Bar = styled.div`
  height: ${({ theme }) => theme.spacing[3]};
  width: ${({ $width }) => $width};
  max-width: 100%;
  background-color: ${({ theme }) => theme.colors.brand.secondary};
  border-radius: ${({ theme }) => theme.borders.radius.sm};
`;

/**
 * Spacing scale reference with pixel values.
 */
export function Spacing() {
  const entries = Object.keys(spacingScale).map((key) => ({
    key,
    value: spacingScale[key],
    pixels: spacingPixels[key],
  }));

  return (
    <Section aria-labelledby="spacing-heading">
      <Title id="spacing-heading">Spacing</Title>
      <List>
        {entries.map(({ key, value, pixels }) => (
          <Row key={key}>
            <Token>{key}</Token>
            <Pixels>{pixels}px</Pixels>
            <Bar $width={value} role="img" aria-label={`Spacing ${key}: ${pixels}px`} />
          </Row>
        ))}
      </List>
    </Section>
  );
}

export default Spacing;
