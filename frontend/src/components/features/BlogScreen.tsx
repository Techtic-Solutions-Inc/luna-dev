import { useId, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import BlogPostList from './BlogPostList';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gap-24);
  width: min(100%, 72rem);
  margin: 0 auto;
  padding: var(--padding-32);
  background: var(--color-23);
  color: var(--secondary);
  border-radius: var(--radius-10);
  min-height: 100%;

  @media (max-width: 768px) {
    gap: var(--gap-16);
    padding: var(--padding-16);
    border-radius: 0;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    padding: var(--padding-24);
  }
`;

const Agreements = styled.fieldset`
  border: none;
  margin: 0;
  padding: var(--padding-32) 0;
  display: flex;
  flex-direction: column;
  gap: var(--gap-12);

  @media (max-width: 768px) {
    padding: var(--padding-24) 0;
  }
`;

const Legend = styled.legend`
  font-family: var(--font-body-sm-29-family);
  font-size: var(--font-body-sm-29-size);
  font-weight: var(--font-body-sm-29-weight);
  line-height: var(--font-body-sm-29-line-height);
  color: var(--secondary);
  margin-bottom: var(--gap-8);
  padding: 0;
`;

const CheckboxRow = styled.label`
  display: inline-flex;
  align-items: flex-start;
  gap: var(--gap-10);
  cursor: pointer;
  width: fit-content;
  max-width: 40rem;
  font-family: var(--font-body-sm-37-family);
  font-size: var(--font-body-sm-37-size);
  font-weight: var(--font-body-sm-37-weight);
  line-height: var(--font-body-sm-37-line-height);
  color: var(--color-93);
`;

const CheckboxInput = styled.input`
  width: 1.125rem;
  height: 1.125rem;
  margin-top: 0.2rem;
  flex-shrink: 0;
  accent-color: var(--accent);
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;

const InlineLink = styled(Link)`
  color: var(--accent);
  text-decoration: underline;
  text-underline-offset: 3px;

  &:hover {
    color: var(--color-48);
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;

const BlogHeader = Header;

const BlogScreen = () => {
  const agreementsId = useId();
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  return (
    <Page>
      <BlogHeader title="Blogs" />
      <BlogPostList />
      <Agreements aria-labelledby={`${agreementsId}-legend`}>
        <Legend id={`${agreementsId}-legend`}>Legal agreements</Legend>
        <CheckboxRow htmlFor={`${agreementsId}-privacy`}>
          <CheckboxInput
            id={`${agreementsId}-privacy`}
            name="privacy_policy"
            type="checkbox"
            checked={privacyAccepted}
            onChange={(event) => setPrivacyAccepted(event.target.checked)}
          />
          <span>
            I agree to the{' '}
            <InlineLink to="/privacy-policy">Privacy Policy</InlineLink>
          </span>
        </CheckboxRow>
        <CheckboxRow htmlFor={`${agreementsId}-terms`}>
          <CheckboxInput
            id={`${agreementsId}-terms`}
            name="terms_of_service"
            type="checkbox"
            checked={termsAccepted}
            onChange={(event) => setTermsAccepted(event.target.checked)}
          />
          <span>
            I agree to the{' '}
            <InlineLink to="/terms-of-service">Terms of Service</InlineLink>
          </span>
        </CheckboxRow>
      </Agreements>
      <Footer />
    </Page>
  );
};

export default BlogScreen;
