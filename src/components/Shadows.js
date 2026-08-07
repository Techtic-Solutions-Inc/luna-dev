import React from 'react';
import styled from 'styled-components';
import { shadows } from '../theme/shadows';

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
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  list-style: none;
  margin: 0;
  padding: ${({ theme }) => theme.spacing.md};
`;

const Item = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Card = styled.div`
  width: 100%;
  height: 96px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borders.radius.lg};
  box-shadow: ${({ $shadow }) => $shadow};
`;

const Label = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-family: ${({ theme }) => theme.typography.fontFamilies.mono};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

/**
 * Shadow / elevation token reference.
 */
export function Shadows() {
  return (
    <Section aria-labelledby="shadows-heading">
      <Title id="shadows-heading">Shadows</Title>
      <Grid>
        {Object.entries(shadows).map(([name, value]) => (
          <Item key={name}>
            <Card
              $shadow={value}
              role="img"
              aria-label={`Shadow ${name}`}
            />
            <Label>{name}</Label>
          </Item>
        ))}
      </Grid>
    </Section>
  );
}

export default Shadows;
