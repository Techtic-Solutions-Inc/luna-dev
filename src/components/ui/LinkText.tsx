import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { typographyStyle } from '../../theme/typography';

export const TextLink = styled(Link)`
  ${typographyStyle('body-sm-2')}
  color: var(--accent);
  text-decoration: none;

  &:hover,
  &:focus-visible {
    text-decoration: underline;
  }
`;

export const ExternalLink = styled.a`
  ${typographyStyle('body-sm-2')}
  color: var(--accent);
  text-decoration: none;

  &:hover,
  &:focus-visible {
    text-decoration: underline;
  }
`;
