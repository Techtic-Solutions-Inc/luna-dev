import styled from 'styled-components';
import { FaStar } from 'react-icons/fa6';
import { TESTIMONIALS } from './homeData';
import { SectionContainer, SerifAccent } from './homeStyles';

const TestimonialsSection = styled.section`
  padding: ${({ theme }) => `${theme.spacing['padding-60']} 0`};
  background-color: ${({ theme }) => theme.colors.secondary};
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing['gap-48']};

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr 1.4fr;
    gap: ${({ theme }) => theme.spacing['gap-60']};
    align-items: start;
  }
`;

const IntroBlock = styled.div``;

const IntroTitle = styled.h2`
  font-family: ${({ theme }) => theme.typography['heading-xl-45'].fontFamily};
  font-size: clamp(32px, 4vw, ${({ theme }) => theme.typography['heading-xl-45'].fontSize});
  font-weight: ${({ theme }) => theme.typography['heading-xl-45'].fontWeight};
  line-height: 1.15;
  color: ${({ theme }) => theme.colors['color-20']};
`;

const IntroText = styled.p`
  margin-top: ${({ theme }) => theme.spacing['gap-24']};
  font-family: ${({ theme }) => theme.typography['body-21'].fontFamily};
  font-size: ${({ theme }) => theme.typography['body-21'].fontSize};
  line-height: ${({ theme }) => theme.typography['body-55'].lineHeight};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing['gap-20']};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled.article<{ $offset?: boolean }>`
  padding: ${({ theme }) => theme.spacing['padding-24']};
  border-radius: ${({ theme }) => theme.radius['radius-16']};
  background-color: ${({ theme }) => theme.colors['color-48']};
  border: 1px solid ${({ theme }) => theme.colors['color-42']};

  ${({ $offset, theme }) =>
    $offset &&
    `
    @media (min-width: ${theme.breakpoints.desktop}) {
      margin-top: 32px;
    }
  `}
`;

const Stars = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing['gap-4']};
  margin-bottom: ${({ theme }) => theme.spacing['gap-16']};
  color: ${({ theme }) => theme.colors['color-35']};
`;

const Quote = styled.p`
  font-family: ${({ theme }) => theme.typography['body-sm-38'].fontFamily};
  font-size: ${({ theme }) => theme.typography['body-sm-38'].fontSize};
  line-height: ${({ theme }) => theme.typography['body-sm-38'].lineHeight};
  color: ${({ theme }) => theme.colors['color-20']};
  margin-bottom: ${({ theme }) => theme.spacing['gap-20']};
`;

const AuthorRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing['gap-12']};
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radius['radius-10000']};
  object-fit: cover;
`;

const AuthorName = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.typography['body-sm-29'].fontFamily};
  font-size: ${({ theme }) => theme.typography['body-sm-29'].fontSize};
  font-weight: ${({ theme }) => theme.typography['body-sm-29'].fontWeight};
  color: ${({ theme }) => theme.colors['color-20']};
`;

const AuthorTitle = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.typography['caption-4'].fontFamily};
  font-size: ${({ theme }) => theme.typography['caption-4'].fontSize};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const HomeTestimonials = () => (
  <TestimonialsSection aria-labelledby="testimonials-heading">
    <SectionContainer>
      <TestimonialsGrid>
        <IntroBlock>
          <IntroTitle id="testimonials-heading">
            Built For Agents <SerifAccent>Like You.</SerifAccent>
          </IntroTitle>
          <IntroText>
            Marketing that stops the scroll. Join thousands of real estate professionals
            who trust Agentwise for stunning, personalized content.
          </IntroText>
        </IntroBlock>
        <CardsGrid>
          {TESTIMONIALS.map((testimonial, index) => (
            <Card key={testimonial.id} $offset={index % 3 === 1}>
              <Stars aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <FaStar key={starIndex} size={14} aria-hidden="true" />
                ))}
              </Stars>
              <Quote>&ldquo;{testimonial.quote}&rdquo;</Quote>
              <AuthorRow>
                <Avatar src={testimonial.avatar} alt={testimonial.name} loading="lazy" />
                <div>
                  <AuthorName>{testimonial.name}</AuthorName>
                  <AuthorTitle>{testimonial.title}</AuthorTitle>
                </div>
              </AuthorRow>
            </Card>
          ))}
        </CardsGrid>
      </TestimonialsGrid>
    </SectionContainer>
  </TestimonialsSection>
);

export default HomeTestimonials;
