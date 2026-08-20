import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import styled from 'styled-components';
import Button from '../../ui/Button';
import { SectionContainer } from './homeStyles';

const HeaderBar = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: transparent;
  border-bottom: none;
`;

const HeaderInner = styled(SectionContainer)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
  padding-top: 0;
  padding-bottom: 0;
`;

const Logo = styled(Link)`
  font-family: ${({ theme }) => theme.typography['heading-lg-31'].fontFamily};
  font-size: ${({ theme }) => theme.typography['heading-lg-31'].fontSize};
  font-weight: ${({ theme }) => theme.typography['heading-lg-31'].fontWeight};
  line-height: ${({ theme }) => theme.typography['heading-lg-31'].lineHeight};
  color: ${({ theme }) => theme.colors.secondary};
  white-space: nowrap;
`;

const Nav = styled.nav`
  display: none;
  align-items: center;
  gap: ${({ theme }) => theme.spacing['gap-36']};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
  }
`;

const NavLink = styled(Link)`
  font-family: ${({ theme }) => theme.typography['body-sm-2'].fontFamily};
  font-size: ${({ theme }) => theme.typography['body-sm-2'].fontSize};
  line-height: ${({ theme }) => theme.typography['body-sm-2'].lineHeight};
  color: ${({ theme }) => theme.colors.secondary};
  transition: color 0.15s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const Actions = styled.div`
  display: none;
  align-items: center;
  gap: ${({ theme }) => theme.spacing['gap-12']};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
  }
`;

const HamburgerBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radius['radius-8']};
  color: ${({ theme }) => theme.colors.secondary};

  &:hover {
    background-color: ${({ theme }) => theme.colors['color-41']};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const MobileOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 200;
  background-color: ${({ theme }) => theme.colors['color-44']};
`;

const MobileNav = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 201;
  display: flex;
  flex-direction: column;
  width: min(320px, 85vw);
  height: 100%;
  padding: ${({ theme }) => theme.spacing['padding-24']};
  gap: ${({ theme }) => theme.spacing['gap-24']};
  background-color: ${({ theme }) => theme.colors['color-20']};
  box-shadow: ${({ theme }) => theme.shadows['drop-shadow-20']};
`;

const MobileNavHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MobileNavLinks = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing['gap-16']};
`;

const MobileNavLink = styled(Link)`
  font-family: ${({ theme }) => theme.typography['body-3'].fontFamily};
  font-size: ${({ theme }) => theme.typography['body-3'].fontSize};
  color: ${({ theme }) => theme.colors.secondary};
  padding: ${({ theme }) => theme.spacing['padding-8']} 0;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const MobileActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing['gap-12']};
  margin-top: auto;
`;

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

const HomeHeader = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const mobileNavCloseRef = useRef<HTMLButtonElement>(null);
  const wasMobileNavOpenRef = useRef(false);

  const closeMobileNav = useCallback(() => {
    setMobileNavOpen(false);
  }, []);

  const openMobileNav = () => {
    setMobileNavOpen(true);
  };

  useEffect(() => {
    if (!mobileNavOpen) {
      document.body.style.overflow = '';
      if (wasMobileNavOpenRef.current) {
        hamburgerRef.current?.focus();
        wasMobileNavOpenRef.current = false;
      }
      return;
    }

    wasMobileNavOpenRef.current = true;
    document.body.style.overflow = 'hidden';
    mobileNavCloseRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMobileNav();
        return;
      }

      if (event.key !== 'Tab' || !mobileNavRef.current) {
        return;
      }

      const focusable = Array.from(
        mobileNavRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => !el.hasAttribute('disabled'));

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

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [mobileNavOpen, closeMobileNav]);

  return (
    <>
      <HeaderBar>
        <HeaderInner>
          <Logo to="/" aria-label="Agentwise home">
            Agentwise
          </Logo>
          <Nav aria-label="Primary navigation">
            <NavLink to="/">About</NavLink>
            <NavLink to="/">Content</NavLink>
            <NavLink to="/">Blog</NavLink>
            <NavLink to="/">Pricing</NavLink>
          </Nav>
          <Actions>
            <Button variant="outline-light" size="sm" aria-label="Get started">
              Get Started
            </Button>
            <Button variant="primary" size="sm" aria-label="Login">
              Login
            </Button>
          </Actions>
          <HamburgerBtn
            ref={hamburgerRef}
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={mobileNavOpen}
            aria-controls="mobile-nav-dialog"
            onClick={openMobileNav}
          >
            <FiMenu size={22} aria-hidden="true" />
          </HamburgerBtn>
        </HeaderInner>
      </HeaderBar>

      {mobileNavOpen && (
        <>
          <MobileOverlay aria-hidden="true" onClick={closeMobileNav} />
          <MobileNav
            ref={mobileNavRef}
            id="mobile-nav-dialog"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <MobileNavHeader>
              <Logo to="/" onClick={closeMobileNav} aria-label="Agentwise home">
                Agentwise
              </Logo>
              <HamburgerBtn
                ref={mobileNavCloseRef}
                type="button"
                aria-label="Close navigation menu"
                onClick={closeMobileNav}
              >
                <FiX size={22} aria-hidden="true" />
              </HamburgerBtn>
            </MobileNavHeader>
            <MobileNavLinks aria-label="Mobile navigation">
              <MobileNavLink to="/" onClick={closeMobileNav}>
                About
              </MobileNavLink>
              <MobileNavLink to="/" onClick={closeMobileNav}>
                Content
              </MobileNavLink>
              <MobileNavLink to="/" onClick={closeMobileNav}>
                Blog
              </MobileNavLink>
              <MobileNavLink to="/" onClick={closeMobileNav}>
                Pricing
              </MobileNavLink>
            </MobileNavLinks>
            <MobileActions>
              <Button variant="outline-light" size="md" fullWidth>
                Get Started
              </Button>
              <Button variant="primary" size="md" fullWidth>
                Login
              </Button>
            </MobileActions>
          </MobileNav>
        </>
      )}
    </>
  );
};

export default HomeHeader;
