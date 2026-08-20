import { css } from 'styled-components';
import { colors, radius, spacing } from '../../theme/tokens';
import { typographyStyle } from '../../theme/typography';

export type ButtonVariant = 'primary' | 'secondary' | 'accent';
export type ButtonShape = 'rounded' | 'pill';

export const buttonVariantStyles = ($variant: ButtonVariant) => {
  if ($variant === 'accent') {
    return css`
      background: ${colors.accent};
      color: ${colors.secondary};
      border: none;
    `;
  }
  if ($variant === 'secondary') {
    return css`
      background: transparent;
      color: ${colors.secondary};
      border: 1px solid ${colors.color49};
    `;
  }
  return css`
    background: ${colors.color16};
    color: ${colors.secondary};
    border: none;
  `;
};

/** Shared CTA chrome for Button and ButtonLink (padding, shape, type, variants, focus). */
export const buttonChromeStyles = css<{ $variant: ButtonVariant; $shape: ButtonShape }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.gap8};
  cursor: pointer;
  padding: ${spacing.padding12} ${spacing.padding24};
  border-radius: ${({ $shape }) => ($shape === 'pill' ? radius.radius10000 : radius.radius10)};
  transition: opacity 0.15s ease;
  ${typographyStyle('bodySm35')}
  ${({ $variant }) => buttonVariantStyles($variant)}

  &:hover:not(:disabled) {
    opacity: 0.92;
  }

  &:focus-visible {
    outline: 2px solid ${colors.accent};
    outline-offset: 1px;
  }
`;
