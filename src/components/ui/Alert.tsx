import type { ReactNode } from 'react';
import styled from 'styled-components';
import { colors, radius, spacing } from '../../theme/tokens';
import { typographyStyle } from '../../theme/typography';

type AlertVariant = 'error' | 'success';

type AlertProps = {
  variant?: AlertVariant;
  children: ReactNode;
};

const Banner = styled.div<{ $variant: AlertVariant }>`
  width: 100%;
  padding: ${spacing.padding12} ${spacing.padding16};
  border-radius: ${radius.radius8};
  ${typographyStyle('caption4')}
  background: ${({ $variant }) => ($variant === 'error' ? colors.error : colors.color39)};
  color: ${({ $variant }) => ($variant === 'error' ? colors.color45 : colors.color17)};
  border: 1px solid ${({ $variant }) => ($variant === 'error' ? colors.color45 : colors.color17)};
`;

export default function Alert({ variant = 'error', children }: AlertProps) {
  return (
    <Banner role="alert" $variant={variant}>
      {children}
    </Banner>
  );
}
