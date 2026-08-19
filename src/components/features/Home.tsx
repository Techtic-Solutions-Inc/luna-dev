import { useState, useCallback } from 'react';
import styled from 'styled-components';
import { FiInstagram, FiFacebook, FiYoutube, FiDownload, FiArrowRight } from 'react-icons/fi';
import { FaXTwitter } from 'react-icons/fa6';
import TextInput from '../ui/TextInput';
import Checkbox from '../ui/Checkbox';
import apiClient from '../../lib/api/client';

/* ─── Styled Components ─── */

const Page = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #0f0f0f;
  color: #ffffff;
  overflow-x: hidden;
`;

/* ─── Navbar ─── */

const Nav = styled.nav`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 60px;

  @media (max-width: 768px) {
    padding: 16px 20px;
  }
`;

const NavLogo = styled.div`
  font-family: 'Kalam', cursive;
  font-size: 22px;
  font-weight: 700;
  color: #c8a47e;
  cursor: pointer;
`;

const NavLogoSub = styled.span`
  display: block;
  font-family: 'Almarai', sans-serif;
  font-size: 7px;
  font-weight: 400;
  color: #c8a47e;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  margin-top: -2px;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  font-family: 'Almarai', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #d9d9d9;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.15s ease;

  &:hover {
    color: #c8a47e;
  }
`;

const NavCTA = styled.a`
  font-family: 'Almarai', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #1a1a19;
  background: #c8a47e;
  padding: 10px 24px;
  border-radius: 50px;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: #b89468;
  }
`;

/* ─── Hero ─── */

const HeroSection = styled.section`
  position: relative;
  width: 100%;
  min-height: 680px;
  display: flex;
  align-items: center;
  padding: 140px 60px 80px;
  background: linear-gradient(135deg, #1c101d 0%, #14100d 40%, #0f0f0f 100%);
  overflow: hidden;

  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 120px 40px 60px;
    min-height: auto;
  }

  @media (max-width: 480px) {
    padding: 100px 20px 40px;
  }
`;

const HeroGlow = styled.div`
  position: absolute;
  top: -200px;
  right: -100px;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(200, 164, 126, 0.15) 0%, transparent 70%);
  pointer-events: none;
`;

const HeroLeft = styled.div`
  flex: 1;
  max-width: 580px;
  z-index: 1;

  @media (max-width: 1024px) {
    max-width: 100%;
    margin-bottom: 40px;
  }
`;

const HeroSubtitle = styled.p`
  font-family: 'Almarai', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #c8a47e;
  margin-bottom: 16px;
  letter-spacing: 1px;
`;

const HeroTitle = styled.h1`
  font-family: 'EB Garamond', serif;
  font-size: 50px;
  font-weight: 500;
  line-height: 1.15;
  color: #ffffff;
  margin: 0 0 20px;

  @media (max-width: 768px) {
    font-size: 36px;
  }

  @media (max-width: 480px) {
    font-size: 28px;
  }
`;

const HeroDescription = styled.p`
  font-family: 'Almarai', sans-serif;
  font-size: 16px;
  font-weight: 300;
  line-height: 28px;
  color: #d9d9d9;
  margin-bottom: 28px;
  max-width: 460px;
`;

const SocialRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
`;

const SocialIcon = styled.a`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid #444;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #d9d9d9;
  text-decoration: none;
  transition: border-color 0.15s ease, color 0.15s ease;

  &:hover {
    border-color: #c8a47e;
    color: #c8a47e;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const HeroSearchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;

const HeroSearchLabel = styled.p`
  font-family: 'Almarai', sans-serif;
  font-size: 12px;
  font-weight: 300;
  color: #959595;
  margin-bottom: 8px;
`;

const HeroSearchInput = styled.input`
  flex: 1;
  height: 50px;
  padding: 0 20px;
  border-radius: 50px;
  border: 1px solid #444;
  background: rgba(255, 255, 255, 0.05);
  color: #ffffff;
  font-family: 'Almarai', sans-serif;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;

  &::placeholder {
    color: #959595;
  }

  &:focus {
    border-color: #c8a47e;
  }
`;

const HeroSearchBtn = styled.button`
  height: 50px;
  padding: 0 28px;
  border-radius: 50px;
  border: none;
  background: #c8a47e;
  color: #1a1a19;
  font-family: 'Almarai', sans-serif;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s ease;

  &:hover {
    background: #b89468;
  }

  &:focus-visible {
    outline: 2px solid #c8a47e;
    outline-offset: 2px;
  }
`;

const HeroRight = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  position: relative;

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const HeroCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 200px);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    max-width: 400px;
    width: 100%;
  }
`;

const HeroCard = styled.div`
  background: rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
`;

const HeroCardImage = styled.div<{ $bg: string }>`
  width: 100%;
  height: 120px;
  background: ${({ $bg }) => $bg};
`;

const HeroCardBody = styled.div`
  padding: 12px;
`;

const HeroCardTitle = styled.p`
  font-family: 'Almarai', sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: #ffffff;
  margin: 0 0 4px;
`;

const HeroCardSub = styled.p`
  font-family: 'Almarai', sans-serif;
  font-size: 10px;
  font-weight: 300;
  color: #959595;
  margin: 0;
`;

/* ─── Marketing Gallery ─── */

const GallerySection = styled.section`
  padding: 80px 60px;
  background: #f7f2ec;
  text-align: center;

  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

const GalleryTitle = styled.h2`
  font-family: 'EB Garamond', serif;
  font-size: 36px;
  font-weight: 500;
  color: #0f0f0f;
  margin: 0 0 12px;

  @media (max-width: 480px) {
    font-size: 28px;
  }
`;

const GallerySubtitle = styled.p`
  font-family: 'Almarai', sans-serif;
  font-size: 16px;
  font-weight: 300;
  color: #666666;
  margin: 0 0 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 26px;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const GalleryItem = styled.div`
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  aspect-ratio: 4 / 3;
  background: linear-gradient(135deg, #2f271f 0%, #1a1a19 100%);

  &:hover .gallery-overlay {
    opacity: 1;
  }
`;

const GalleryOverlay = styled.div.attrs({ className: 'gallery-overlay' })`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
`;

const GalleryDlBtn = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  background: #c8a47e;
  color: #1a1a19;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: #b89468;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

/* ─── Three Steps ─── */

const StepsSection = styled.section`
  padding: 100px 60px;
  background: #ffffff;
  text-align: center;

  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

const StepsTitle = styled.h2`
  font-family: 'EB Garamond', serif;
  font-size: 36px;
  font-weight: 500;
  color: #0f0f0f;
  margin: 0 0 60px;

  @media (max-width: 480px) {
    font-size: 28px;
    margin-bottom: 40px;
  }
`;

const StepsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  max-width: 1000px;
  margin: 0 auto;
`;

const StepRow = styled.div<{ $reverse?: boolean }>`
  display: flex;
  align-items: center;
  gap: 60px;
  text-align: left;
  flex-direction: ${({ $reverse }) => ($reverse ? 'row-reverse' : 'row')};

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 24px;
  }
`;

const StepContent = styled.div`
  flex: 1;
`;

const StepLabel = styled.p`
  font-family: 'Almarai', sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: #959595;
  margin: 0 0 8px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const StepHeading = styled.h3`
  font-family: 'EB Garamond', serif;
  font-size: 26px;
  font-weight: 500;
  color: #0f0f0f;
  margin: 0 0 12px;
  line-height: 1.3;
`;

const StepUnderline = styled.span`
  text-decoration: underline;
  text-decoration-color: #c8a47e;
  text-underline-offset: 4px;
`;

const StepDescription = styled.p`
  font-family: 'Almarai', sans-serif;
  font-size: 14px;
  font-weight: 300;
  line-height: 24px;
  color: #666666;
  margin: 0;
  max-width: 400px;
`;

const StepImage = styled.div`
  flex: 1;
  aspect-ratio: 4 / 3;
  max-width: 400px;
  border-radius: 12px;
  background: linear-gradient(135deg, #efe4d9 0%, #d9d9d9 100%);

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
  }
`;

/* ─── Ultimate Mind + Deal ─── */

const UltimateMindSection = styled.section`
  display: flex;
  min-height: 500px;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const UMLeft = styled.div`
  flex: 1;
  background: linear-gradient(135deg, #2f271f 0%, #1a1a19 100%);
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

const UMBadge = styled.span`
  display: inline-block;
  font-family: 'Almarai', sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: #c8a47e;
  border: 1px solid #c8a47e;
  border-radius: 50px;
  padding: 6px 16px;
  margin-bottom: 20px;
  width: fit-content;
`;

const UMTitle = styled.h2`
  font-family: 'EB Garamond', serif;
  font-size: 30px;
  font-weight: 500;
  color: #ffffff;
  margin: 0 0 16px;
  line-height: 1.3;
`;

const UMDescription = styled.p`
  font-family: 'Almarai', sans-serif;
  font-size: 14px;
  font-weight: 300;
  line-height: 24px;
  color: #d9d9d9;
  margin: 0 0 28px;
  max-width: 420px;
`;

const UMButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'Almarai', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #c8a47e;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.15s ease;

  &:hover {
    color: #e0c4a0;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const UMRight = styled.div`
  flex: 1;
  background: #efe4d9;
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

const DealTitle = styled.h2`
  font-family: 'EB Garamond', serif;
  font-size: 42px;
  font-weight: 500;
  color: #0f0f0f;
  margin: 0 0 16px;
  line-height: 1.2;

  @media (max-width: 480px) {
    font-size: 32px;
  }
`;

const DealHighlight = styled.span`
  text-decoration: underline;
  text-decoration-color: #c8a47e;
  text-underline-offset: 4px;
`;

const DealDescription = styled.p`
  font-family: 'Almarai', sans-serif;
  font-size: 14px;
  font-weight: 300;
  line-height: 24px;
  color: #666666;
  margin: 0 0 28px;
  max-width: 420px;
`;

const CustomizeBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 48px;
  padding: 0 28px;
  border-radius: 50px;
  border: 2px solid #0f0f0f;
  background: transparent;
  color: #0f0f0f;
  font-family: 'Almarai', sans-serif;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;

  &:hover {
    background: #0f0f0f;
    color: #ffffff;
  }

  &:focus-visible {
    outline: 2px solid #c8a47e;
    outline-offset: 2px;
  }
`;

/* ─── Built For Agents ─── */

const AgentsSection = styled.section`
  padding: 100px 60px;
  background: #ffffff;
  display: flex;
  gap: 60px;
  align-items: center;
  max-width: 1440px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 60px 40px;
  }

  @media (max-width: 480px) {
    padding: 40px 20px;
  }
`;

const AgentsLeft = styled.div`
  flex: 1;
`;

const AgentsTagline = styled.p`
  font-family: 'Almarai', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #c8a47e;
  margin: 0 0 8px;
`;

const AgentsTitle = styled.h2`
  font-family: 'EB Garamond', serif;
  font-size: 42px;
  font-weight: 500;
  color: #0f0f0f;
  margin: 0 0 20px;
  line-height: 1.2;

  @media (max-width: 480px) {
    font-size: 32px;
  }
`;

const AgentsItalic = styled.em`
  font-style: italic;
`;

const AgentsDescription = styled.p`
  font-family: 'Almarai', sans-serif;
  font-size: 16px;
  font-weight: 300;
  line-height: 28px;
  color: #666666;
  margin: 0 0 32px;
  max-width: 460px;
`;

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FeatureItem = styled.div`
  display: flex;
  gap: 14px;
  align-items: flex-start;
`;

const FeatureDot = styled.div`
  width: 8px;
  height: 8px;
  min-width: 8px;
  border-radius: 50%;
  background: #c8a47e;
  margin-top: 6px;
`;

const FeatureText = styled.p`
  font-family: 'Almarai', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: #333333;
  margin: 0;
`;

const AgentsRight = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const TestimonialCard = styled.div`
  background: #f7f2ec;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  gap: 16px;
  align-items: flex-start;
`;

const TestimonialAvatar = styled.div`
  width: 40px;
  height: 40px;
  min-width: 40px;
  border-radius: 50%;
  background: #c8a47e;
`;

const TestimonialContent = styled.div`
  flex: 1;
`;

const TestimonialName = styled.p`
  font-family: 'Almarai', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #0f0f0f;
  margin: 0 0 4px;
`;

const TestimonialRole = styled.p`
  font-family: 'Almarai', sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: #959595;
  margin: 0 0 8px;
`;

const TestimonialText = styled.p`
  font-family: 'Almarai', sans-serif;
  font-size: 14px;
  font-weight: 300;
  line-height: 22px;
  color: #666666;
  margin: 0;
`;

/* ─── CTA Banner ─── */

const CTABanner = styled.section`
  background: linear-gradient(135deg, #14100d 0%, #2f271f 50%, #14100d 100%);
  padding: 80px 60px;
  display: flex;
  align-items: center;
  gap: 60px;

  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 60px 40px;
  }

  @media (max-width: 480px) {
    padding: 40px 20px;
  }
`;

const CTALeft = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
`;

const CTAImagePlaceholder = styled.div`
  width: 100%;
  max-width: 400px;
  aspect-ratio: 4 / 3;
  border-radius: 16px;
  background: linear-gradient(135deg, #2f271f 0%, #473e33 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const CTAOverlayText = styled.div`
  font-family: 'EB Garamond', serif;
  font-size: 28px;
  font-weight: 500;
  color: #ffffff;
  text-align: center;
  line-height: 1.3;
  padding: 20px;
`;

/* ─── Contact / Let's Work Together ─── */

const ContactRight = styled.div`
  flex: 1;
  background: #1a1a19;
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

const ContactTitle = styled.h2`
  font-family: 'EB Garamond', serif;
  font-size: 36px;
  font-weight: 500;
  color: #ffffff;
  margin: 0 0 32px;
  line-height: 1.2;

  @media (max-width: 480px) {
    font-size: 28px;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 24px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const FormFullRow = styled.div`
  grid-column: 1 / -1;
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 32px;
`;

const SubmitBtn = styled.button<{ $loading?: boolean }>`
  width: 100%;
  height: 52px;
  border-radius: 50px;
  border: none;
  background: #c8a47e;
  color: #1a1a19;
  font-family: 'Almarai', sans-serif;
  font-size: 16px;
  font-weight: 700;
  cursor: ${({ $loading }) => ($loading ? 'not-allowed' : 'pointer')};
  opacity: ${({ $loading }) => ($loading ? 0.7 : 1)};
  transition: background 0.15s ease;

  &:hover:not(:disabled) {
    background: #b89468;
  }

  &:focus-visible {
    outline: 2px solid #c8a47e;
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const SuccessMsg = styled.p`
  font-family: 'Almarai', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #22c55e;
  margin: 12px 0 0;
`;

const ErrorMsg = styled.p`
  font-family: 'Almarai', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #ff2f2f;
  margin: 12px 0 0;
`;

/* ─── Footer ─── */

const FooterSection = styled.footer`
  background: #0f0f0f;
  border-top: 1px solid #232323;
  padding: 40px 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 768px) {
    padding: 30px 20px;
    flex-direction: column;
    text-align: center;
  }
`;

const FooterLogo = styled.div`
  font-family: 'Kalam', cursive;
  font-size: 22px;
  font-weight: 700;
  color: #c8a47e;
`;

const FooterLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
  justify-content: center;
`;

const FooterLink = styled.a`
  font-family: 'Almarai', sans-serif;
  font-size: 13px;
  font-weight: 400;
  color: #959595;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.15s ease;

  &:hover {
    color: #c8a47e;
  }
`;

const FooterRight = styled.div`
  font-family: 'Almarai', sans-serif;
  font-size: 13px;
  font-weight: 400;
  color: #959595;
`;

/* ─── Form Validation ─── */

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  privacyPolicy: boolean;
  termsOfService: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  privacyPolicy?: string;
  termsOfService?: string;
}

const validateForm = (form: FormState): FormErrors => {
  const errors: FormErrors = {};
  if (!form.firstName.trim()) errors.firstName = 'First name is required';
  if (!form.lastName.trim()) errors.lastName = 'Last name is required';
  if (!form.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email';
  }
  if (!form.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!/^\+?[\d\s()-]{7,20}$/.test(form.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }
  if (!form.privacyPolicy) errors.privacyPolicy = 'You must accept the Privacy Policy';
  if (!form.termsOfService) errors.termsOfService = 'You must accept the Terms of Service';
  return errors;
};

/* ─── Home Component ─── */

const Home: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    privacyPolicy: false,
    termsOfService: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [submitError, setSubmitError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }, []);

  const handleCheckboxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: checked }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitState('loading');
    setSubmitError('');

    try {
      await apiClient.post('/api/visitor/home/subscribe', {
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.email,
        phone: form.phone,
      });

      await apiClient.post('/api/visitor/home/terms-acceptance', {
        email: form.email,
        privacy_policy: form.privacyPolicy,
        terms_of_service: form.termsOfService,
      });

      setSubmitState('success');
      setForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        privacyPolicy: false,
        termsOfService: false,
      });
    } catch (err: unknown) {
      setSubmitState('error');
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setSubmitError(axiosErr.response?.data?.message ?? 'Something went wrong. Please try again.');
      } else {
        setSubmitError('Something went wrong. Please try again.');
      }
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    try {
      await apiClient.get('/api/visitor/home/search', {
        params: { q: searchQuery },
      });
    } catch {
      // Search is non-blocking
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <Page>
      {/* ─── Navbar ─── */}
      <Nav aria-label="Main navigation">
        <NavLogo>
          Agentwise
          <NavLogoSub>Real Estate Marketing</NavLogoSub>
        </NavLogo>
        <NavLinks>
          <NavLink href="#home">Home</NavLink>
          <NavLink href="#content">Content</NavLink>
          <NavLink href="#pricing">Pricing</NavLink>
          <NavLink href="#blog">Blog</NavLink>
          <NavLink href="#contact">Contact Us</NavLink>
        </NavLinks>
        <NavCTA href="/signin">Get Started</NavCTA>
      </Nav>

      {/* ─── Hero ─── */}
      <HeroSection id="home">
        <HeroGlow />
        <HeroLeft>
          <HeroSubtitle>Personalized to Your Market in Minutes</HeroSubtitle>
          <HeroTitle>
            Stunning Real Estate Marketing,<br />
            Personalized To Your Market In Minutes
          </HeroTitle>
          <HeroDescription>
            Empower your real estate marketing with professional, ready-to-use content
            tailored specifically to your market and brand identity.
          </HeroDescription>
          <SocialRow>
            <SocialIcon href="#" aria-label="Instagram">
              <FiInstagram />
            </SocialIcon>
            <SocialIcon href="#" aria-label="Facebook">
              <FiFacebook />
            </SocialIcon>
            <SocialIcon href="#" aria-label="X (Twitter)">
              <FaXTwitter />
            </SocialIcon>
            <SocialIcon href="#" aria-label="YouTube">
              <FiYoutube />
            </SocialIcon>
          </SocialRow>
          <HeroSearchLabel>Click Customize to edit the location, market data, images, or branding.</HeroSearchLabel>
          <HeroSearchWrapper>
            <HeroSearchInput
              type="text"
              placeholder="Search content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              aria-label="Search content"
            />
            <HeroSearchBtn onClick={handleSearch} type="button">
              Get Started
            </HeroSearchBtn>
          </HeroSearchWrapper>
        </HeroLeft>
        <HeroRight>
          <HeroCardGrid>
            <HeroCard>
              <HeroCardImage $bg="linear-gradient(135deg, #473e33 0%, #2f271f 100%)" />
              <HeroCardBody>
                <HeroCardTitle>Social Posting - Tue</HeroCardTitle>
                <HeroCardSub>Ready to Post</HeroCardSub>
              </HeroCardBody>
            </HeroCard>
            <HeroCard>
              <HeroCardImage $bg="linear-gradient(135deg, #3b6c4f 0%, #2f271f 100%)" />
              <HeroCardBody>
                <HeroCardTitle>Open House Flyer</HeroCardTitle>
                <HeroCardSub>Customize Now</HeroCardSub>
              </HeroCardBody>
            </HeroCard>
            <HeroCard>
              <HeroCardImage $bg="linear-gradient(135deg, #376292 0%, #2f271f 100%)" />
              <HeroCardBody>
                <HeroCardTitle>Just Sold Template</HeroCardTitle>
                <HeroCardSub>Download</HeroCardSub>
              </HeroCardBody>
            </HeroCard>
            <HeroCard>
              <HeroCardImage $bg="linear-gradient(135deg, #6c5082 0%, #2f271f 100%)" />
              <HeroCardBody>
                <HeroCardTitle>Market Update</HeroCardTitle>
                <HeroCardSub>View Details</HeroCardSub>
              </HeroCardBody>
            </HeroCard>
          </HeroCardGrid>
        </HeroRight>
      </HeroSection>

      {/* ─── Marketing Gallery ─── */}
      <GallerySection>
        <GalleryTitle>Marketing That Stops The Scroll</GalleryTitle>
        <GallerySubtitle>
          Professional marketing content that captures attention. Browse our library of ready-to-use
          templates designed specifically for real estate professionals.
        </GallerySubtitle>
        <GalleryGrid>
          {[0, 1, 2, 3].map((i) => (
            <GalleryItem key={i}>
              <GalleryOverlay>
                <GalleryDlBtn aria-label="Download content">
                  <FiDownload />
                </GalleryDlBtn>
              </GalleryOverlay>
            </GalleryItem>
          ))}
        </GalleryGrid>
      </GallerySection>

      {/* ─── Three Steps ─── */}
      <StepsSection>
        <StepsTitle>Stunning Marketing, In Three Simple Steps</StepsTitle>
        <StepsList>
          <StepRow>
            <StepContent>
              <StepLabel>Step 01</StepLabel>
              <StepHeading>
                Browse The Continuously <StepUnderline>Updated Collection.</StepUnderline>
              </StepHeading>
              <StepDescription>
                Help real estate professionals create content faster with ready-made templates.
              </StepDescription>
            </StepContent>
            <StepImage aria-hidden="true" />
          </StepRow>
          <StepRow $reverse>
            <StepContent>
              <StepLabel>Step 02</StepLabel>
              <StepHeading>
                We Personalize It To Your Business <StepUnderline>And Market.</StepUnderline>
              </StepHeading>
              <StepDescription>
                Increase audience engagement through visually appealing social media posts.
              </StepDescription>
            </StepContent>
            <StepImage aria-hidden="true" />
          </StepRow>
          <StepRow>
            <StepContent>
              <StepLabel>Step 03</StepLabel>
              <StepHeading>
                Post, Attract, Engage, And <StepUnderline>Stand Out.</StepUnderline>
              </StepHeading>
              <StepDescription>
                Download your finished content and share it anywhere.
              </StepDescription>
            </StepContent>
            <StepImage aria-hidden="true" />
          </StepRow>
        </StepsList>
      </StepsSection>

      {/* ─── Ultimate Mind + Deal ─── */}
      <UltimateMindSection>
        <UMLeft>
          <UMBadge>Explore Ultimate Mind</UMBadge>
          <UMTitle>Agentwise Ultimate Mind</UMTitle>
          <UMDescription>
            Your AI-powered marketing assistant that creates personalized content,
            answers your marketing questions, and helps you stand out in your market.
          </UMDescription>
          <UMButton href="/signin">
            Get Started <FiArrowRight />
          </UMButton>
        </UMLeft>
        <UMRight>
          <DealTitle>
            Here&apos;s The Deal...{' '}
            <DealHighlight>Great Marketing</DealHighlight> Is Just The Start.
          </DealTitle>
          <DealDescription>
            Every template is professionally designed with a purpose: to attract buyers,
            convert leads, and elevate your brand presence in the market.
          </DealDescription>
          <CustomizeBtn type="button">
            Customize
          </CustomizeBtn>
        </UMRight>
      </UltimateMindSection>

      {/* ─── Built For Agents ─── */}
      <AgentsSection>
        <AgentsLeft>
          <AgentsTagline>Built For</AgentsTagline>
          <AgentsTitle>
            <AgentsItalic>Agents</AgentsItalic> Like You.
          </AgentsTitle>
          <AgentsDescription>
            Whether you are a solo agent or part of a team, our marketing tools are built
            specifically to help real estate professionals like you grow your business and
            stand out in your market.
          </AgentsDescription>
          <FeatureList>
            <FeatureItem>
              <FeatureDot />
              <FeatureText>
                Help real estate professionals create content faster with ready-made templates.
              </FeatureText>
            </FeatureItem>
            <FeatureItem>
              <FeatureDot />
              <FeatureText>
                Increase audience engagement through visually appealing social media posts.
              </FeatureText>
            </FeatureItem>
            <FeatureItem>
              <FeatureDot />
              <FeatureText>
                Download your finished content and share it anywhere.
              </FeatureText>
            </FeatureItem>
          </FeatureList>
        </AgentsLeft>
        <AgentsRight>
          <TestimonialCard>
            <TestimonialAvatar />
            <TestimonialContent>
              <TestimonialName>Sarah Johnson</TestimonialName>
              <TestimonialRole>Real Estate Agent</TestimonialRole>
              <TestimonialText>
                Agentwise has completely transformed how I market my listings. The templates
                are professional and save me hours every week.
              </TestimonialText>
            </TestimonialContent>
          </TestimonialCard>
          <TestimonialCard>
            <TestimonialAvatar />
            <TestimonialContent>
              <TestimonialName>Michael Chen</TestimonialName>
              <TestimonialRole>Broker</TestimonialRole>
              <TestimonialText>
                The AI-powered content suggestions are incredibly accurate and relevant
                to my local market. Highly recommended!
              </TestimonialText>
            </TestimonialContent>
          </TestimonialCard>
        </AgentsRight>
      </AgentsSection>

      {/* ─── CTA Banner ─── */}
      <CTABanner>
        <CTALeft>
          <CTAImagePlaceholder>
            <CTAOverlayText>
              EVERYONE&apos;S WAITING<br />
              to hear what the market is really doing
            </CTAOverlayText>
          </CTAImagePlaceholder>
        </CTALeft>
        <ContactRight style={{ background: 'transparent' }}>
          <ContactTitle id="contact">Let&apos;s Work Together</ContactTitle>
          <form onSubmit={handleSubmit} noValidate>
            <FormGrid>
              <TextInput
                label="First Name"
                name="firstName"
                value={form.firstName}
                onChange={handleInputChange}
                placeholder="Enter first name"
                error={errors.firstName}
              />
              <TextInput
                label="Last Name"
                name="lastName"
                value={form.lastName}
                onChange={handleInputChange}
                placeholder="Enter last name"
                error={errors.lastName}
              />
              <FormFullRow>
                <TextInput
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  error={errors.email}
                />
              </FormFullRow>
              <FormFullRow>
                <TextInput
                  label="Phone number"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                  error={errors.phone}
                />
              </FormFullRow>
            </FormGrid>
            <CheckboxGroup>
              <Checkbox
                label={
                  <>I agree to the <a href="/privacy-policy">Privacy Policy</a></>
                }
                name="privacyPolicy"
                checked={form.privacyPolicy}
                onChange={handleCheckboxChange}
                error={errors.privacyPolicy}
              />
              <Checkbox
                label={
                  <>I agree to the <a href="/terms-of-service">Terms of Service</a></>
                }
                name="termsOfService"
                checked={form.termsOfService}
                onChange={handleCheckboxChange}
                error={errors.termsOfService}
              />
            </CheckboxGroup>
            <SubmitBtn
              type="submit"
              disabled={submitState === 'loading'}
              $loading={submitState === 'loading'}
            >
              {submitState === 'loading' ? 'Submitting...' : 'Get Started'}
            </SubmitBtn>
            {submitState === 'success' && (
              <SuccessMsg>Thank you! We&apos;ll be in touch soon.</SuccessMsg>
            )}
            {submitState === 'error' && (
              <ErrorMsg>{submitError}</ErrorMsg>
            )}
          </form>
        </ContactRight>
      </CTABanner>

      {/* ─── Footer ─── */}
      <FooterSection>
        <FooterLogo>Agentwise</FooterLogo>
        <FooterLinks>
          <FooterLink href="#home">Home</FooterLink>
          <FooterLink href="#content">Content</FooterLink>
          <FooterLink href="#pricing">Pricing</FooterLink>
          <FooterLink href="#blog">Blog</FooterLink>
          <FooterLink href="#contact">Contact Us</FooterLink>
        </FooterLinks>
        <FooterRight>info@agentwiserealestate.com</FooterRight>
      </FooterSection>
    </Page>
  );
};

export default Home;
