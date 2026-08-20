import styled from 'styled-components';
import Button from '../../ui/Button';
import { SectionContainer } from './homeStyles';

const Banner = styled.div`
  padding: ${({ theme }) => `${theme.spacing['padding-16']} 0`};
  background-color: ${({ theme }) => theme.colors['color-20']};
  border-top: 1px solid ${({ theme }) => theme.colors['color-41']};
  border-bottom: 1px solid ${({ theme }) => theme.colors['color-41']};
`;

const BannerInner = styled(SectionContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing['gap-16']};
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: row;
    text-align: left;
  }
`;

const BannerText = styled.p`
  font-family: ${({ theme }) => theme.typography['body-21'].fontFamily};
  font-size: ${({ theme }) => theme.typography['body-21'].fontSize};
  line-height: ${({ theme }) => theme.typography['body-21'].lineHeight};
  color: ${({ theme }) => theme.colors['color-61']};

  strong {
    color: ${({ theme }) => theme.colors.secondary};
    font-weight: 700;
  }
`;

const HomeNewsletter = () => (
  <Banner aria-label="Newsletter signup banner">
    <BannerInner>
      <BannerText>
        Join <strong>15,000+</strong> other agents on the newsletter in just one click
      </BannerText>
      <Button variant="primary" size="sm">
        Get Started
      </Button>
    </BannerInner>
  </Banner>
);

export default HomeNewsletter;
