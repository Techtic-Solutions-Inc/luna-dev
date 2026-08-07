import React from 'react';
import styled from 'styled-components';
import { typography } from '../theme/fonts';

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

const SampleList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Sample = styled.li`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  padding-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: ${({ theme }) => theme.borders.styles.subtle};
`;

const SampleLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text.muted};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacings.wide};
  text-transform: uppercase;
`;

const SampleText = styled.p`
  margin: 0;
  font-family: ${({ $style }) => $style.fontFamily};
  font-size: ${({ $style }) => $style.fontSize};
  font-weight: ${({ $style }) => $style.fontWeight};
  line-height: ${({ $style }) => $style.lineHeight};
  letter-spacing: ${({ $style }) => $style.letterSpacing || 'normal'};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const FamilyRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
`;

const FamilyChip = styled.span`
  font-family: ${({ $family }) => $family};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text.primary};
`;

/**
 * Typography token reference — font families and named text styles.
 */
export function Typography() {
  const styles = Object.entries(typography.styles);
  const families = Object.entries(typography.fontFamilies);

  return (
    <Section aria-labelledby="typography-heading">
      <Title id="typography-heading">Typography</Title>
      <FamilyRow aria-label="Font families">
        {families.map(([name, family]) => (
          <FamilyChip key={name} $family={family}>
            {name}: The quick brown fox
          </FamilyChip>
        ))}
      </FamilyRow>
      <SampleList>
        {styles.map(([name, style]) => (
          <Sample key={name}>
            <SampleLabel>{name}</SampleLabel>
            <SampleText $style={style}>
              The quick brown fox jumps over the lazy dog
            </SampleText>
          </Sample>
        ))}
      </SampleList>
    </Section>
  );
}

export default Typography;
