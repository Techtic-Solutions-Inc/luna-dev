import styled from 'styled-components';

interface FooterProps {
  copyright: string;
}

const FooterRoot = styled.footer`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--gap-12);
  padding-top: var(--padding-24);
  border-top: 1px solid var(--color-46);
`;

const Copyright = styled.p`
  font-family: var(--font-caption-54-family);
  font-size: var(--font-caption-54-size);
  font-weight: var(--font-caption-54-weight);
  line-height: var(--font-caption-54-line-height);
  color: var(--text-secondary);
`;

const Footer = ({ copyright }: FooterProps) => (
  <FooterRoot>
    <Copyright>{copyright}</Copyright>
  </FooterRoot>
);

export default Footer;
