import { useState, useRef, useEffect, useCallback, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { breakpoints } from '../../theme/breakpoints';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import {
  AuthInput,
  AuthErrorText,
  AuthSubmitButton,
  HiddenCheckbox,
  CheckboxBox,
  CheckIcon,
} from '../ui/FormPrimitives';

/* ------------------------------------------------------------------ */
/*  Shared helpers                                                     */
/* ------------------------------------------------------------------ */

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 0 24px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 0 16px;
  }
`;

const SectionHeading = styled.h2`
  font-family: 'EB Garamond', serif;
  font-weight: 500;
  color: #ffffff;
  text-align: center;
`;

/* ------------------------------------------------------------------ */
/*  NAV BAR                                                            */
/* ------------------------------------------------------------------ */

const Nav = styled.nav`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 40px;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 16px 24px;
  }
`;

const NavLogo = styled(Link)`
  font-family: 'EB Garamond', serif;
  font-size: 24px;
  font-style: italic;
  font-weight: 400;
  color: #ffffff;
  text-decoration: none;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;

  @media (max-width: ${breakpoints.tablet}) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  font-family: 'Almarai', sans-serif;
  font-size: 13px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: #ffffff;
  }
`;

const NavAnchor = styled.a`
  font-family: 'Almarai', sans-serif;
  font-size: 13px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: #ffffff;
  }
`;

const MobileNavAnchor = styled.a`
  font-family: 'Almarai', sans-serif;
  font-size: 18px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;

  &:hover {
    color: #ffffff;
  }
`;

const FooterAnchor = styled.a`
  font-family: 'Almarai', sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: #ffffff;
  }
`;

const HamburgerBtn = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: #ffffff;
  padding: 4px;

  @media (max-width: ${breakpoints.tablet}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

const MobileNav = styled.div<{ $open: boolean }>`
  display: none;

  @media (max-width: ${breakpoints.tablet}) {
    display: ${(p) => (p.$open ? 'flex' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 20;
    background: rgba(0, 0, 0, 0.95);
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24px;
  }
`;

const MobileNavClose = styled.button`
  position: absolute;
  top: 20px;
  right: 24px;
  background: none;
  border: none;
  cursor: pointer;
  color: #ffffff;
  padding: 4px;

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

const MobileNavLink = styled(Link)`
  font-family: 'Almarai', sans-serif;
  font-size: 18px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;

  &:hover {
    color: #ffffff;
  }
`;

const NavCta = styled(Link)`
  display: inline-flex;
  align-items: center;
  height: 36px;
  padding: 0 20px;
  font-family: 'Almarai', sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: #ffffff;
  background: var(--accent);
  border-radius: 8px;
  text-decoration: none;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

/* ------------------------------------------------------------------ */
/*  HERO SECTION                                                       */
/* ------------------------------------------------------------------ */

const HeroSection = styled.section`
  position: relative;
  min-height: 600px;
  background: linear-gradient(135deg, #1a0a2e 0%, #0d1117 40%, #1a1a1a 100%);
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 120px 0 80px;
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 55%;
  height: 100%;
  background: url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&h=600&fit=crop') center / cover no-repeat;
  opacity: 0.4;
  mask-image: linear-gradient(to left, rgba(0, 0, 0, 0.6), transparent);
  -webkit-mask-image: linear-gradient(to left, rgba(0, 0, 0, 0.6), transparent);

  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
    opacity: 0.2;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 520px;
  padding: 0 40px;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 0 24px;
    max-width: 100%;
  }
`;

const HeroTitle = styled.h1`
  font-family: 'EB Garamond', serif;
  font-size: 48px;
  font-weight: 500;
  line-height: 1.15;
  color: #ffffff;
  margin-bottom: 20px;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 36px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 28px;
  }
`;

const HeroDescription = styled.p`
  font-family: 'Almarai', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 24px;
  max-width: 420px;
`;

const SocialRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
`;

const SocialIcon = styled.a`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  transition: background 0.2s;
  font-size: 14px;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const HeroNote = styled.p`
  font-family: 'Almarai', sans-serif;
  font-size: 11px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.35);
  margin-bottom: 16px;
`;

const GetStartedBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  padding: 0 36px;
  font-family: 'Almarai', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #ffffff;
  background: var(--accent);
  border-radius: 10px;
  text-decoration: none;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;

/* ------------------------------------------------------------------ */
/*  IMAGE GALLERY — "Marketing That Stops The Scroll"                  */
/* ------------------------------------------------------------------ */

const GallerySection = styled.section`
  background: #ffffff;
  padding: 80px 0 60px;
`;

const GalleryHeading = styled(SectionHeading)`
  font-size: 32px;
  line-height: 1.3;
  color: #1a1a1a;
  margin-bottom: 12px;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 24px;
  }
`;

const GallerySubtext = styled.p`
  font-family: 'Almarai', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.6;
  color: #828282;
  text-align: center;
  max-width: 600px;
  margin: 0 auto 40px;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const GalleryImage = styled.div<{ $url: string }>`
  aspect-ratio: 3 / 4;
  border-radius: 12px;
  background: url(${(p) => p.$url}) center / cover no-repeat;
  background-color: #e8e8e8;
`;

const galleryImages = [
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300&h=400&fit=crop',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&h=400&fit=crop',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=300&h=400&fit=crop',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=300&h=400&fit=crop',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=300&h=400&fit=crop',
];

/* ------------------------------------------------------------------ */
/*  THREE STEPS SECTION                                                */
/* ------------------------------------------------------------------ */

const StepsSection = styled.section`
  background: linear-gradient(180deg, #f5f0eb 0%, #ede5db 100%);
  padding: 80px 0;
`;

const StepsHeading = styled(SectionHeading)`
  font-size: 32px;
  line-height: 1.3;
  color: #1a1a1a;
  margin-bottom: 60px;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 24px;
    margin-bottom: 40px;
  }
`;

const StepRow = styled.div<{ $reverse?: boolean }>`
  display: flex;
  align-items: center;
  gap: 60px;
  margin-bottom: 60px;
  flex-direction: ${(p) => (p.$reverse ? 'row-reverse' : 'row')};

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    gap: 24px;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const StepContent = styled.div`
  flex: 1;
`;

const StepLabel = styled.span`
  font-family: 'Almarai', sans-serif;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: #828282;
  display: block;
  margin-bottom: 12px;
`;

const StepTitle = styled.h3`
  font-family: 'EB Garamond', serif;
  font-size: 24px;
  font-weight: 500;
  line-height: 1.3;
  color: #1a1a1a;
  margin-bottom: 12px;
`;

const StepText = styled.p`
  font-family: 'Almarai', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.7;
  color: #666666;
  max-width: 400px;
`;

const StepImage = styled.div<{ $url: string }>`
  flex: 1;
  aspect-ratio: 4 / 3;
  max-width: 480px;
  border-radius: 16px;
  background: url(${(p) => p.$url}) center / cover no-repeat;
  background-color: #d4cfc9;

  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
    max-width: 100%;
  }
`;

/* ------------------------------------------------------------------ */
/*  ULTIMATE MIND SECTION                                              */
/* ------------------------------------------------------------------ */

const UltimateMindSection = styled.section`
  background: linear-gradient(135deg, #2d1f0f 0%, #1a1a1a 50%, #0f0f0f 100%);
  padding: 80px 0;
`;

const UmCard = styled.div`
  background: linear-gradient(135deg, rgba(200, 164, 126, 0.15) 0%, rgba(200, 164, 126, 0.05) 100%);
  border: 1px solid rgba(200, 164, 126, 0.2);
  border-radius: 20px;
  padding: 48px;
  display: flex;
  gap: 48px;
  align-items: center;

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    padding: 32px 24px;
    gap: 32px;
  }
`;

const UmContent = styled.div`
  flex: 1;
`;

const UmBadge = styled.span`
  display: inline-block;
  font-family: 'Almarai', sans-serif;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--accent);
  margin-bottom: 16px;
`;

const UmHeading = styled.h2`
  font-family: 'EB Garamond', serif;
  font-size: 28px;
  font-weight: 500;
  line-height: 1.3;
  color: #ffffff;
  margin-bottom: 16px;
`;

const UmText = styled.p`
  font-family: 'Almarai', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.6);
`;

const UmImage = styled.div`
  flex: 1;
  max-width: 420px;
  aspect-ratio: 4 / 3;
  border-radius: 16px;
  background: url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&h=375&fit=crop') center / cover no-repeat;
  background-color: #2a2a2a;

  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
    max-width: 100%;
  }
`;

/* ------------------------------------------------------------------ */
/*  "HERE'S THE DEAL" CTA                                              */
/* ------------------------------------------------------------------ */

const DealSection = styled.section`
  background: #0f0f0f;
  padding: 80px 0;
`;

const DealGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const DealCard = styled.div<{ $dark?: boolean }>`
  border-radius: 20px;
  padding: 48px;
  background: ${(p) => (p.$dark ? '#1a1a1a' : 'linear-gradient(135deg, #f5f0eb 0%, #ede5db 100%)')};
  color: ${(p) => (p.$dark ? '#ffffff' : '#1a1a1a')};

  @media (max-width: ${breakpoints.mobile}) {
    padding: 32px 24px;
  }
`;

const DealHeading = styled.h2`
  font-family: 'EB Garamond', serif;
  font-size: 36px;
  font-weight: 500;
  line-height: 1.2;
  margin-bottom: 16px;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 28px;
  }
`;

const DealText = styled.p`
  font-family: 'Almarai', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.7;
  opacity: 0.7;
`;

/* ------------------------------------------------------------------ */
/*  "BUILT FOR AGENTS LIKE YOU"                                        */
/* ------------------------------------------------------------------ */

const AgentsSection = styled.section`
  background: #ffffff;
  padding: 80px 0;
`;

const AgentsGrid = styled.div`
  display: flex;
  gap: 48px;
  align-items: center;

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    gap: 32px;
  }
`;

const AgentsContent = styled.div`
  flex: 1;
`;

const AgentsHeading = styled.h2`
  font-family: 'EB Garamond', serif;
  font-size: 40px;
  font-weight: 500;
  line-height: 1.2;
  color: #1a1a1a;
  margin-bottom: 16px;

  span {
    font-style: italic;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 30px;
  }
`;

const AgentsText = styled.p`
  font-family: 'Almarai', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.7;
  color: #666666;
  margin-bottom: 24px;
  max-width: 480px;
`;

const TestimonialCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #f9f7f4;
  border-radius: 12px;
  margin-bottom: 12px;
  max-width: 360px;
`;

const TestimonialAvatar = styled.div`
  width: 40px;
  height: 40px;
  min-width: 40px;
  border-radius: 50%;
  background: #d4cfc9;
`;

const TestimonialInfo = styled.div`
  font-family: 'Almarai', sans-serif;
`;

const TestimonialName = styled.p`
  font-size: 13px;
  font-weight: 700;
  color: #1a1a1a;
`;

const TestimonialRole = styled.p`
  font-size: 11px;
  font-weight: 400;
  color: #828282;
`;

const AgentsImage = styled.div`
  flex: 1;
  max-width: 480px;
  aspect-ratio: 3 / 4;
  border-radius: 20px;
  background: url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=660&fit=crop') center / cover no-repeat;
  background-color: #e8e8e8;

  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
    max-width: 100%;
  }
`;

/* ------------------------------------------------------------------ */
/*  CONTACT FORM — "LET'S WORK TOGETHER"                               */
/* ------------------------------------------------------------------ */

const ContactSection = styled.section`
  background: #0f0f0f;
  padding: 80px 0;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const ContactImageWrap = styled.div`
  aspect-ratio: 4 / 3;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  background: url('https://images.unsplash.com/photo-1501183638710-841dd1904471?w=600&h=450&fit=crop') center / cover no-repeat;
  background-color: #2a2a2a;
`;

const ContactImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
  padding: 24px;
`;

const ContactImageText = styled.span`
  font-family: 'EB Garamond', serif;
  font-size: 24px;
  font-weight: 500;
  color: #ffffff;
  text-align: center;
  line-height: 1.3;
  font-style: italic;
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const ContactHeading = styled.h2`
  font-family: 'EB Garamond', serif;
  font-size: 32px;
  font-weight: 500;
  line-height: 1.3;
  color: #ffffff;
  margin-bottom: 8px;
`;

const ContactSubtext = styled.p`
  font-family: 'Almarai', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 24px;
`;

const FormRow = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const FormField = styled.div<{ $full?: boolean }>`
  flex: ${(p) => (p.$full ? 'unset' : '1')};
  width: ${(p) => (p.$full ? '100%' : 'auto')};
  min-width: 0;
  margin-bottom: 12px;
`;

const CheckboxRow = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 8px;
  cursor: pointer;
`;

const CheckboxLabel = styled.span`
  font-family: 'Almarai', sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  color: rgba(255, 255, 255, 0.6);

  a {
    color: rgba(255, 255, 255, 0.85);
    text-decoration: underline;
    text-underline-offset: 2px;

    &:hover {
      color: #ffffff;
    }
  }
`;

const ContactSubmitButton = styled(AuthSubmitButton)`
  margin-top: 12px;
`;

const ApiMessage = styled.div<{ $error?: boolean }>`
  width: 100%;
  padding: 12px 16px;
  margin-top: 12px;
  font-family: 'Almarai', sans-serif;
  font-size: 13px;
  font-weight: 400;
  color: ${(p) => (p.$error ? '#ff2f2f' : '#4caf50')};
  background: ${(p) => (p.$error ? 'rgba(255, 47, 47, 0.08)' : 'rgba(76, 175, 80, 0.08)')};
  border-radius: 8px;
  text-align: center;
`;

/* ------------------------------------------------------------------ */
/*  FOOTER                                                             */
/* ------------------------------------------------------------------ */

const FooterSection = styled.footer`
  background: #0a0a0a;
  padding: 40px 0 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
`;

const FooterInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
`;

const FooterLogo = styled.span`
  font-family: 'EB Garamond', serif;
  font-size: 20px;
  font-style: italic;
  font-weight: 400;
  color: #ffffff;
`;

const FooterLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
`;

const FooterLink = styled(Link)`
  font-family: 'Almarai', sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: #ffffff;
  }
`;

const FooterEmail = styled.a`
  font-family: 'Almarai', sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;

  &:hover {
    color: #ffffff;
  }
`;

const FooterCopy = styled.p`
  width: 100%;
  text-align: center;
  font-family: 'Almarai', sans-serif;
  font-size: 11px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.3);
  margin-top: 24px;
`;

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

interface ContactErrors {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  privacy: string;
  terms: string;
}

const emptyErrors: ContactErrors = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  privacy: '',
  terms: '',
};

function validateContact(
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  privacy: boolean,
  terms: boolean,
): ContactErrors {
  const e = { ...emptyErrors };
  if (!firstName.trim()) e.firstName = 'First name is required.';
  if (!lastName.trim()) e.lastName = 'Last name is required.';
  if (!email.trim()) e.email = 'Email is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Please enter a valid email.';
  if (!phone.trim()) e.phone = 'Phone number is required.';
  if (!privacy) e.privacy = 'You must agree to the Privacy Policy.';
  if (!terms) e.terms = 'You must agree to the Terms of Service.';
  return e;
}

function hasErrors(e: ContactErrors): boolean {
  return Object.values(e).some(Boolean);
}

export default function Home() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [privacy, setPrivacy] = useState(false);
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState<ContactErrors>(emptyErrors);
  const [apiError, setApiError] = useState('');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const mobileNavCloseRef = useRef<HTMLButtonElement>(null);

  const closeMobileNav = useCallback(() => setMobileNavOpen(false), []);

  useEffect(() => {
    if (mobileNavOpen && mobileNavCloseRef.current) {
      mobileNavCloseRef.current.focus();
    }
  }, [mobileNavOpen]);

  const mobileNavRef = useRef<HTMLDivElement>(null);

  function handleMobileNavKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      closeMobileNav();
      return;
    }
    if (e.key === 'Tab' && mobileNavRef.current) {
      const focusable = mobileNavRef.current.querySelectorAll<HTMLElement>(
        'a[href], button, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setApiError('');
    const v = validateContact(firstName, lastName, email, phone, privacy, terms);
    setErrors(v);
    if (hasErrors(v)) return;
    setApiError('The subscribe endpoint is not yet available. Please try again later.');
  }

  return (
    <>
      {/* NAV */}
      <Nav aria-label="Main navigation">
        <NavLogo to="/">Agentwise</NavLogo>
        <NavLinks>
          <NavLink to="/">Home</NavLink>
          <NavAnchor href="#steps">Content</NavAnchor>
          <NavAnchor href="#ultimate-mind">Pricing</NavAnchor>
          <NavAnchor href="#agents">Blog</NavAnchor>
          <NavAnchor href="#contact">Contact Us</NavAnchor>
          <NavCta to="/signup">Get Started</NavCta>
        </NavLinks>
        <HamburgerBtn
          type="button"
          onClick={() => setMobileNavOpen(true)}
          aria-label="Open navigation menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </HamburgerBtn>
      </Nav>

      <MobileNav
        ref={mobileNavRef}
        $open={mobileNavOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        onKeyDown={handleMobileNavKeyDown}
      >
        <MobileNavClose
          ref={mobileNavCloseRef}
          type="button"
          onClick={closeMobileNav}
          aria-label="Close navigation menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </MobileNavClose>
        <MobileNavLink to="/" onClick={closeMobileNav}>Home</MobileNavLink>
        <MobileNavAnchor href="#steps" onClick={closeMobileNav}>Content</MobileNavAnchor>
        <MobileNavAnchor href="#ultimate-mind" onClick={closeMobileNav}>Pricing</MobileNavAnchor>
        <MobileNavAnchor href="#agents" onClick={closeMobileNav}>Blog</MobileNavAnchor>
        <MobileNavAnchor href="#contact" onClick={closeMobileNav}>Contact Us</MobileNavAnchor>
        <NavCta to="/signup" onClick={closeMobileNav}>Get Started</NavCta>
      </MobileNav>

      {/* HERO */}
      <HeroSection>
        <HeroOverlay aria-hidden="true" />
        <HeroContent>
          <HeroTitle>
            Stunning Real Estate Marketing,{' '}
            Personalized To Your Market In Minutes
          </HeroTitle>
          <HeroDescription>
            Forget generic marketing. Agentwise creates personalized, professional
            content tailored to your listings, your market, and your brand — all in minutes.
          </HeroDescription>
          <SocialRow>
            <SocialIcon href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF size={14} /></SocialIcon>
            <SocialIcon href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaXTwitter size={14} /></SocialIcon>
            <SocialIcon href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram size={14} /></SocialIcon>
            <SocialIcon href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedinIn size={14} /></SocialIcon>
          </SocialRow>
          <HeroNote>400+ Properties powered by Agentwise</HeroNote>
          <GetStartedBtn to="/signup">Get Started</GetStartedBtn>
        </HeroContent>
      </HeroSection>

      {/* GALLERY */}
      <GallerySection>
        <Container>
          <GalleryHeading>Marketing That Stops The Scroll</GalleryHeading>
          <GallerySubtext>
            Real examples from real agents. These marketing pieces were created with Agentwise and shared across Instagram, Facebook, and more.
          </GallerySubtext>
          <GalleryGrid>
            {galleryImages.map((url, i) => (
              <GalleryImage key={url} $url={url} role="img" aria-label={`Marketing example ${i + 1}`} />
            ))}
          </GalleryGrid>
        </Container>
      </GallerySection>

      {/* THREE STEPS */}
      <StepsSection id="steps">
        <Container>
          <StepsHeading>Stunning Marketing, In Three Simple Steps</StepsHeading>

          <StepRow>
            <StepContent>
              <StepLabel>Step 01</StepLabel>
              <StepTitle>Browse The Continuously Updated <em>Collection.</em></StepTitle>
              <StepText>
                Explore our ever-growing library of professionally designed templates built specifically for real estate marketing.
              </StepText>
            </StepContent>
            <StepImage $url="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&h=375&fit=crop" />
          </StepRow>

          <StepRow $reverse>
            <StepContent>
              <StepLabel>Step 02</StepLabel>
              <StepTitle>We Personalize It To Your Business <em>And Market.</em></StepTitle>
              <StepText>
                Click Customize to edit the location, market data, images, or branding. Our AI tailors every detail to your market.
              </StepText>
            </StepContent>
            <StepImage $url="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&h=375&fit=crop" />
          </StepRow>

          <StepRow>
            <StepContent>
              <StepLabel>Step 03</StepLabel>
              <StepTitle>Post, Attract, Engage, And <em>Stand Out.</em></StepTitle>
              <StepText>
                Download your finished content and share it anywhere. Build authority, attract leads, and stand out from the competition.
              </StepText>
            </StepContent>
            <StepImage $url="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=500&h=375&fit=crop" />
          </StepRow>
        </Container>
      </StepsSection>

      {/* ULTIMATE MIND */}
      <UltimateMindSection id="ultimate-mind">
        <Container>
          <UmCard>
            <UmContent>
              <UmBadge>Agentwise Ultimate Mind</UmBadge>
              <UmHeading>Explore Ultimate Mind</UmHeading>
              <UmText>
                Help real estate professionals create content faster with ready-made templates.
                Increase audience engagement through visually appealing social media posts.
              </UmText>
            </UmContent>
            <UmImage />
          </UmCard>
        </Container>
      </UltimateMindSection>

      {/* HERE'S THE DEAL */}
      <DealSection>
        <Container>
          <DealGrid>
            <DealCard>
              <DealHeading>Here&apos;s The Deal...<br /><em>Great Marketing</em> Is Just The Start.</DealHeading>
              <DealText>
                At your very first interaction with Agentwise, your personalized marketing strategy is already in motion.
              </DealText>
            </DealCard>
            <DealCard $dark>
              <DealHeading style={{ color: '#ffffff' }}>
                Good morning,<br />Ava.
              </DealHeading>
              <DealText>
                Browse the continuously updated collection tailored specifically for your market.
              </DealText>
            </DealCard>
          </DealGrid>
        </Container>
      </DealSection>

      {/* BUILT FOR AGENTS */}
      <AgentsSection id="agents">
        <Container>
          <AgentsGrid>
            <AgentsContent>
              <AgentsHeading>
                Built For<br />
                <span>Agents Like You.</span>
              </AgentsHeading>
              <AgentsText>
                Agentwise is built exclusively for real estate professionals who want
                a smarter way to create marketing content that drives results and saves time.
              </AgentsText>
              <TestimonialCard>
                <TestimonialAvatar />
                <TestimonialInfo>
                  <TestimonialName>Marvin McKinney</TestimonialName>
                  <TestimonialRole>Real Estate Agent</TestimonialRole>
                </TestimonialInfo>
              </TestimonialCard>
              <TestimonialCard>
                <TestimonialAvatar />
                <TestimonialInfo>
                  <TestimonialName>Kathryn Murphy</TestimonialName>
                  <TestimonialRole>Real Estate Broker</TestimonialRole>
                </TestimonialInfo>
              </TestimonialCard>
            </AgentsContent>
            <AgentsImage />
          </AgentsGrid>
        </Container>
      </AgentsSection>

      {/* CONTACT FORM */}
      <ContactSection id="contact">
        <Container>
          <ContactGrid>
            <ContactImageWrap>
              <ContactImageOverlay>
                <ContactImageText>
                  EVERYONE&apos;S WAITING<br />
                  <span style={{ fontSize: '14px', fontFamily: "'Almarai', sans-serif", fontStyle: 'normal', opacity: 0.7 }}>
                    to buy until &quot;the market is right...&quot;
                  </span>
                </ContactImageText>
              </ContactImageOverlay>
            </ContactImageWrap>

            <ContactForm onSubmit={handleSubmit} noValidate>
              <ContactHeading>Let&apos;s Work Together</ContactHeading>
              <ContactSubtext>
                Reach out and let&apos;s discuss how Agentwise can help grow your business.
              </ContactSubtext>

              <FormRow>
                <FormField>
                  <AuthInput
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    $hasError={!!errors.firstName}
                    aria-label="First Name"
                    aria-invalid={!!errors.firstName}
                  />
                  {errors.firstName && <AuthErrorText role="alert">{errors.firstName}</AuthErrorText>}
                </FormField>
                <FormField>
                  <AuthInput
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    $hasError={!!errors.lastName}
                    aria-label="Last Name"
                    aria-invalid={!!errors.lastName}
                  />
                  {errors.lastName && <AuthErrorText role="alert">{errors.lastName}</AuthErrorText>}
                </FormField>
              </FormRow>

              <FormField $full>
                <AuthInput
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  $hasError={!!errors.email}
                  aria-label="Email"
                  aria-invalid={!!errors.email}
                  autoComplete="email"
                />
                {errors.email && <AuthErrorText role="alert">{errors.email}</AuthErrorText>}
              </FormField>

              <FormField $full>
                <AuthInput
                  type="tel"
                  placeholder="Phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  $hasError={!!errors.phone}
                  aria-label="Phone number"
                  aria-invalid={!!errors.phone}
                  autoComplete="tel"
                />
                {errors.phone && <AuthErrorText role="alert">{errors.phone}</AuthErrorText>}
              </FormField>

              <CheckboxRow>
                <HiddenCheckbox
                  type="checkbox"
                  checked={privacy}
                  onChange={(e) => { setPrivacy(e.target.checked); if (errors.privacy) setErrors((p) => ({ ...p, privacy: '' })); }}
                  aria-label="I agree to the Privacy Policy"
                />
                <CheckboxBox $checked={privacy} $hasError={!!errors.privacy}>
                  {privacy && <CheckIcon />}
                </CheckboxBox>
                <CheckboxLabel>
                  I agree to the{' '}
                  <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                </CheckboxLabel>
              </CheckboxRow>
              {errors.privacy && <AuthErrorText role="alert" style={{ marginBottom: '4px', marginLeft: '28px' }}>{errors.privacy}</AuthErrorText>}

              <CheckboxRow>
                <HiddenCheckbox
                  type="checkbox"
                  checked={terms}
                  onChange={(e) => { setTerms(e.target.checked); if (errors.terms) setErrors((p) => ({ ...p, terms: '' })); }}
                  aria-label="I agree to the Terms of Service"
                />
                <CheckboxBox $checked={terms} $hasError={!!errors.terms}>
                  {terms && <CheckIcon />}
                </CheckboxBox>
                <CheckboxLabel>
                  I agree to the{' '}
                  <a href="/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a>
                </CheckboxLabel>
              </CheckboxRow>
              {errors.terms && <AuthErrorText role="alert" style={{ marginBottom: '4px', marginLeft: '28px' }}>{errors.terms}</AuthErrorText>}

              <ContactSubmitButton type="submit">
                Get Started
              </ContactSubmitButton>

              {apiError && <ApiMessage $error role="alert">{apiError}</ApiMessage>}
            </ContactForm>
          </ContactGrid>
        </Container>
      </ContactSection>

      {/* FOOTER */}
      <FooterSection>
        <Container>
          <FooterInner>
            <FooterLogo>Agentwise</FooterLogo>
            <FooterLinks>
              <FooterLink to="/">Home</FooterLink>
              <FooterAnchor href="#steps">Content</FooterAnchor>
              <FooterAnchor href="#ultimate-mind">Pricing</FooterAnchor>
              <FooterAnchor href="#agents">Blog</FooterAnchor>
              <FooterAnchor href="#contact">Contact Us</FooterAnchor>
            </FooterLinks>
            <FooterEmail href="mailto:info@agentwisemarketing.com">
              info@agentwisemarketing.com
            </FooterEmail>
          </FooterInner>
          <FooterCopy>
            © {new Date().getFullYear()} Agentwise Inc. · All rights reserved.
          </FooterCopy>
        </Container>
      </FooterSection>
    </>
  );
}
