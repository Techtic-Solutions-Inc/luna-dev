import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCheck,
  faTimes,
  faExclamationTriangle,
  faInfoCircle,
  faUser,
  faEnvelope,
  faLock,
  faSearch,
  faChevronRight,
  faChevronLeft,
  faChevronDown,
  faChevronUp,
  faPlus,
  faMinus,
  faHome,
  faCog,
  faSignOutAlt,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import {
  faUser as faUserRegular,
  faEnvelope as faEnvelopeRegular,
} from '@fortawesome/free-regular-svg-icons';
import styled from 'styled-components';

library.add(
  faCheck,
  faTimes,
  faExclamationTriangle,
  faInfoCircle,
  faUser,
  faEnvelope,
  faLock,
  faSearch,
  faChevronRight,
  faChevronLeft,
  faChevronDown,
  faChevronUp,
  faPlus,
  faMinus,
  faHome,
  faCog,
  faSignOutAlt,
  faBars,
  faUserRegular,
  faEnvelopeRegular
);

export const icons = {
  check: faCheck,
  times: faTimes,
  warning: faExclamationTriangle,
  info: faInfoCircle,
  user: faUser,
  envelope: faEnvelope,
  lock: faLock,
  search: faSearch,
  chevronRight: faChevronRight,
  chevronLeft: faChevronLeft,
  chevronDown: faChevronDown,
  chevronUp: faChevronUp,
  plus: faPlus,
  minus: faMinus,
  home: faHome,
  cog: faCog,
  signOut: faSignOutAlt,
  bars: faBars,
  userRegular: faUserRegular,
  envelopeRegular: faEnvelopeRegular,
};

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
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Item = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Label = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.muted};
  font-family: ${({ theme }) => theme.typography.fontFamilies.mono};
`;

/**
 * Accessible Font Awesome icon wrapper.
 */
export function Icon({ icon, title, size = '1x', ...rest }) {
  const resolved = typeof icon === 'string' ? icons[icon] : icon;
  if (!resolved) return null;

  return (
    <FontAwesomeIcon
      icon={resolved}
      size={size}
      title={title}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      {...rest}
    />
  );
}

/**
 * Icon library catalog for design-system reference.
 */
export function IconLibrary() {
  return (
    <Section aria-labelledby="icon-library-heading">
      <Title id="icon-library-heading">Icon Library</Title>
      <Grid>
        {Object.entries(icons).map(([name, icon]) => (
          <Item key={name}>
            <Icon icon={icon} title={name} size="lg" />
            <Label>{name}</Label>
          </Item>
        ))}
      </Grid>
    </Section>
  );
}

export default IconLibrary;
