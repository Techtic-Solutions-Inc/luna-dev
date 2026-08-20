import { css } from 'styled-components';
import type { TypographyToken } from './tokens';
import { typography } from './tokens';

export function typographyStyle(token: TypographyToken) {
  const style = typography[token];
  return css`
    font-family: ${style.fontFamily};
    font-size: ${style.fontSize};
    font-weight: ${style.fontWeight};
    line-height: ${style.lineHeight};
    ${
      'letterSpacing' in style && style.letterSpacing
        ? css`
            letter-spacing: ${style.letterSpacing};
          `
        : ''
    }
  `;
}
