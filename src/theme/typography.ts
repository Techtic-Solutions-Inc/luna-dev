import { css, type RuleSet } from 'styled-components';
import { typography, type TypographyTokenKey } from './tokens';

type TypographyValue = (typeof typography)[TypographyTokenKey];

function getLetterSpacing(token: TypographyValue): string | undefined {
  if ('letterSpacing' in token && typeof token.letterSpacing === 'string') {
    return token.letterSpacing;
  }
  return undefined;
}

export function typographyStyle(token: TypographyTokenKey): RuleSet<object> {
  const t = typography[token];
  const letterSpacing = getLetterSpacing(t);

  return css`
    font-family: ${t.fontFamily};
    font-size: ${t.fontSize};
    font-weight: ${t.fontWeight};
    line-height: ${t.lineHeight};
    ${letterSpacing ? `letter-spacing: ${letterSpacing};` : ''}
  `;
}
