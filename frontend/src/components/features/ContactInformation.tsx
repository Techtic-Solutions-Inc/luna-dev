import { type FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import type { AboutContact } from '../../types/api';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Input from '../ui/Input';

interface ContactInformationProps {
  contact: AboutContact;
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
`;

const Panel = styled(Card)`
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: var(--gap-32);
  padding: var(--padding-32);
  background: var(--secondary);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: var(--padding-24);
    gap: var(--gap-24);
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gap-16);
`;

const Heading = styled.h2`
  font-family: var(--font-heading-lg-57-family);
  font-size: var(--font-heading-lg-57-size);
  font-weight: var(--font-heading-lg-57-weight);
  line-height: var(--font-heading-lg-57-line-height);
  color: var(--color-20);
`;

const EmailLink = styled.a`
  font-family: var(--font-body-22-family);
  font-size: var(--font-body-22-size);
  font-weight: var(--font-body-22-weight);
  line-height: var(--font-body-22-line-height);
  color: var(--accent);
  width: fit-content;

  &:hover {
    text-decoration: underline;
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;

const WaitlistForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--gap-12);
`;

const FormRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap-12);
  align-items: flex-end;

  & > div {
    flex: 1 1 12rem;
  }
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--gap-10);
  margin: 0;
  padding: 0;
`;

const NavItemLink = styled(Link)`
  font-family: var(--font-body-sm-37-family);
  font-size: var(--font-body-sm-37-size);
  font-weight: var(--font-body-sm-37-weight);
  line-height: var(--font-body-sm-37-line-height);
  color: var(--color-19);
  width: fit-content;

  &:hover {
    color: var(--accent);
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;

const ExternalNavLink = styled.a`
  font-family: var(--font-body-sm-37-family);
  font-size: var(--font-body-sm-37-size);
  font-weight: var(--font-body-sm-37-weight);
  line-height: var(--font-body-sm-37-line-height);
  color: var(--color-19);
  width: fit-content;

  &:hover {
    color: var(--accent);
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;

const isInternalPath = (href: string): boolean => href.startsWith('/');

const ContactInformation = ({ contact }: ContactInformationProps) => {
  const [email, setEmail] = useState('');

  const handleWaitlistSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !contact.waitlist_href) {
      return;
    }

    const url = new URL(
      contact.waitlist_href,
      window.location.origin,
    );
    url.searchParams.set('email', trimmed);
    window.location.assign(url.toString());
  };

  return (
    <Section aria-labelledby="contact-information-heading">
      <Panel>
        <Column>
          <Heading id="contact-information-heading">Contact Information</Heading>
          <EmailLink
            href={`mailto:${contact.email}`}
            aria-label={`Email ${contact.email}`}
          >
            {contact.email}
          </EmailLink>
          <WaitlistForm onSubmit={handleWaitlistSubmit} noValidate>
            <FormRow>
              <Input
                label="Email for waitlist"
                name="waitlist-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                aria-required="true"
              />
              <Button
                type="submit"
                aria-label={contact.waitlist_label}
                disabled={!email.trim()}
              >
                {contact.waitlist_label}
              </Button>
            </FormRow>
          </WaitlistForm>
        </Column>
        <Column>
          <NavList aria-label="Site links">
            {contact.links.map((link) => (
              <li key={`${link.label}-${link.href}`}>
                {isInternalPath(link.href) ? (
                  <NavItemLink to={link.href}>{link.label}</NavItemLink>
                ) : (
                  <ExternalNavLink
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </ExternalNavLink>
                )}
              </li>
            ))}
          </NavList>
        </Column>
      </Panel>
    </Section>
  );
};

export default ContactInformation;
