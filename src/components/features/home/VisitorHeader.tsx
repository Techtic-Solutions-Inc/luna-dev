import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { breakpoints } from '../../../theme/breakpoints';
import { tokens } from '../../../theme/tokens';
import { Container, GhostButton, GoldButton } from './shared';

const HeaderBar = styled.header`
  position: sticky;
  top: 0;
  z-index: 20;
  background: linear-gradient(180deg, var(--color-16) 0%, rgba(11, 11, 11, 0.92) 100%);
  border-bottom: 1px solid var(--color-49);
  backdrop-filter: blur(8px);
`;

const Inner = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${tokens.spacing['gap-16']};
  min-height: 72px;
`;

const Logo = styled(Link)`
  color: var(--secondary);
  text-decoration: none;
  font-family: ${tokens.typography['heading-lg-108'].fontFamily}, cursive;
  font-size: ${tokens.typography['heading-lg-108'].fontSize};
  font-weight: ${tokens.typography['heading-lg-108'].fontWeight};
  line-height: ${tokens.typography['heading-lg-108'].lineHeight};
`;

const DesktopNav = styled.nav`
  display: none;
  align-items: center;
  gap: ${tokens.spacing['gap-24']};

  @media (min-width: ${breakpoints.desktop}) {
    display: flex;
  }
`;

const NavLink = styled.a`
  color: var(--secondary);
  text-decoration: none;
  font-family: ${tokens.typography['body-sm-38'].fontFamily}, sans-serif;
  font-size: ${tokens.typography['body-sm-38'].fontSize};
  line-height: ${tokens.typography['body-sm-38'].lineHeight};

  &:hover,
  &:focus-visible {
    color: var(--accent);
  }
`;

const Actions = styled.div`
  display: none;
  align-items: center;
  gap: ${tokens.spacing['gap-12']};

  @media (min-width: ${breakpoints.desktop}) {
    display: flex;
  }
`;

const StyledGoldLink = styled(GoldButton)`
  text-decoration: none;
`;

const StyledGhostLink = styled(GhostButton)`
  text-decoration: none;
`;

const Hamburger = styled.button`
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border: 1px solid var(--color-49);
  border-radius: ${tokens.radius['radius-8']};
  background: transparent;
  color: var(--secondary);
  cursor: pointer;

  @media (min-width: ${breakpoints.desktop}) {
    display: none;
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 30;
  background: rgba(0, 0, 0, 0.55);
`;

const MobileNav = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 40;
  width: min(100%, 320px);
  height: 100%;
  padding: ${tokens.spacing['padding-24']};
  background: var(--color-33);
  border-left: 1px solid var(--color-49);
  display: grid;
  grid-template-rows: auto 1fr;
  gap: ${tokens.spacing['gap-24']};
`;

const MobileTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MobileLinks = styled.nav`
  display: grid;
  gap: ${tokens.spacing['gap-16']};
`;

const MobileLink = styled.a`
  color: var(--secondary);
  text-decoration: none;
  font-family: ${tokens.typography.body.fontFamily}, sans-serif;
  font-size: ${tokens.typography.body.fontSize};
  line-height: ${tokens.typography.body.lineHeight};
`;

const MobileActions = styled.div`
  display: grid;
  gap: ${tokens.spacing['gap-12']};
  align-content: start;
`;

const CloseBtn = styled.button`
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border: 1px solid var(--color-49);
  border-radius: ${tokens.radius['radius-8']};
  background: transparent;
  color: var(--secondary);
  cursor: pointer;
`;

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Content', href: '#content' },
  { label: 'Blog', href: '#blog' },
  { label: 'Pricing', href: '#pricing' },
];

const VisitorHeader = () => {
  const [open, setOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const closeNav = () => {
    setOpen(false);
    hamburgerRef.current?.focus();
  };

  useEffect(() => {
    if (!open) {
      return undefined;
    }
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      closeNav();
      return;
    }
    if (event.key !== 'Tab' || !panelRef.current) {
      return;
    }
    const focusable = panelRef.current.querySelectorAll<HTMLElement>(
      'a, button, input, textarea, select',
    );
    if (focusable.length === 0) {
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <HeaderBar>
      <Inner>
        <Logo to="/">Agentwise</Logo>
        <DesktopNav aria-label="Primary">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </DesktopNav>
        <Actions>
          <StyledGhostLink as={Link} to="/sign-up">
            Get Started
          </StyledGhostLink>
          <StyledGoldLink as={Link} to="/sign-in">
            Login
          </StyledGoldLink>
        </Actions>
        <Hamburger
          ref={hamburgerRef}
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="visitor-mobile-nav"
          onClick={() => setOpen(true)}
        >
          <FiMenu aria-hidden="true" />
        </Hamburger>
      </Inner>

      {open ? (
        <>
          <Overlay aria-hidden="true" onClick={closeNav} />
          <MobileNav
            id="visitor-mobile-nav"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            onKeyDown={onKeyDown}
          >
            <MobileTop>
              <Logo to="/" onClick={closeNav}>
                Agentwise
              </Logo>
              <CloseBtn ref={closeRef} type="button" aria-label="Close menu" onClick={closeNav}>
                <FiX aria-hidden="true" />
              </CloseBtn>
            </MobileTop>
            <MobileLinks aria-label="Primary">
              {navItems.map((item) => (
                <MobileLink key={item.href} href={item.href} onClick={closeNav}>
                  {item.label}
                </MobileLink>
              ))}
            </MobileLinks>
            <MobileActions>
              <StyledGhostLink as={Link} to="/sign-up" onClick={closeNav}>
                Get Started
              </StyledGhostLink>
              <StyledGoldLink as={Link} to="/sign-in" onClick={closeNav}>
                Login
              </StyledGoldLink>
            </MobileActions>
          </MobileNav>
        </>
      ) : null}
    </HeaderBar>
  );
};

export default VisitorHeader;
