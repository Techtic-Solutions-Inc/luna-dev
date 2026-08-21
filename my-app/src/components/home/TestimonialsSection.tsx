import styled from 'styled-components';
import { FaStar } from 'react-icons/fa';
import {
  AccentText,
  BodyText,
  Container,
  Section,
  SerifHeading,
  SkeletonBlock,
} from './shared';

const TestimonialsSection = styled(Section)`
  background: ${({ theme }) => theme.colors['color-16']};
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: ${({ theme }) => theme.spacing['gap-48']};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
  }
`;

const Intro = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing['gap-16']};
`;

const Title = styled(SerifHeading)`
  font-size: clamp(28px, 3.5vw, 36px);
  line-height: 1.25;
  color: ${({ theme }) => theme.colors.accent};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing['gap-24']};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.article`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing['gap-16']};
  padding: ${({ theme }) => theme.spacing['padding-24']};
  border-radius: ${({ theme }) => theme.borderRadius['radius-16']};
  border: 1px solid ${({ theme }) => theme.colors['color-63']};
  background: ${({ theme }) => theme.colors['color-24']};
`;

const Stars = styled.div`
  display: flex;
  gap: 4px;
  color: ${({ theme }) => theme.colors['color-49']};
`;

const Quote = styled(BodyText)`
  color: ${({ theme }) => theme.colors.secondary};
`;

const AuthorRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing['gap-12']};
  margin-top: auto;
`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
`;

const AuthorName = styled.p`
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.secondary};
  margin: 0;
`;

const AuthorMeta = styled.p`
  font-size: 12px;
  line-height: 18px;
  color: ${({ theme }) => theme.colors['color-96']};
  margin: 0;
`;

const testimonials = [
  {
    quote:
      'Agentwise cut my content creation time in half. The templates look like I hired a full creative team.',
    name: 'Marcus Donovan',
    role: 'Keller Williams, Denver, CO',
    avatar: '/assets/figma/testimonial-1.png',
  },
  {
    quote:
      'My Instagram engagement doubled within the first month. The personalized posts feel authentically mine.',
    name: 'Sarah Chen',
    role: 'Compass, Austin, TX',
    avatar: '/assets/figma/testimonial-2.png',
  },
  {
    quote:
      'Finally, marketing that stops the scroll. My listings get more views and my brand looks premium.',
    name: 'James Rivera',
    role: 'RE/MAX, Miami, FL',
    avatar: '/assets/figma/testimonial-3.png',
  },
];

interface TestimonialsProps {
  isLoading?: boolean;
}

const Testimonials = ({ isLoading = false }: TestimonialsProps) => (
  <TestimonialsSection aria-labelledby="testimonials-heading">
    <Container>
      <Layout>
        <Intro>
          <Title id="testimonials-heading">
            Built For Agents <AccentText>Like You.</AccentText>
          </Title>
          <BodyText>
            Real estate professionals across the country use Agentwise to create stunning marketing
            that attracts, engages, and converts.
          </BodyText>
        </Intro>
        {isLoading ? (
          <Grid aria-hidden="true">
            {[1, 2, 3].map((item) => (
              <SkeletonBlock key={item} $height="220px" />
            ))}
          </Grid>
        ) : (
          <Grid>
            {testimonials.map((item) => (
              <Card key={item.name}>
                <Stars aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <FaStar key={index} aria-hidden="true" size={14} />
                  ))}
                </Stars>
                <Quote>&ldquo;{item.quote}&rdquo;</Quote>
                <AuthorRow>
                  <Avatar src={item.avatar} alt={item.name} />
                  <div>
                    <AuthorName>{item.name}</AuthorName>
                    <AuthorMeta>{item.role}</AuthorMeta>
                  </div>
                </AuthorRow>
              </Card>
            ))}
          </Grid>
        )}
      </Layout>
    </Container>
  </TestimonialsSection>
);

export default Testimonials;
