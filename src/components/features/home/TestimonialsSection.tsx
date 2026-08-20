import styled from 'styled-components';
import { breakpoints } from '../../../theme/breakpoints';
import { tokens } from '../../../theme/tokens';
import { testimonials } from './content';
import { AccentText, BodyCopy, Container, Section, SerifDisplay } from './shared';

const LightSection = styled(Section)`
  background: var(--secondary);
  color: var(--text-primary);
`;

const Grid = styled.div`
  display: grid;
  gap: ${tokens.spacing['gap-32']};

  @media (min-width: ${breakpoints.desktop}) {
    grid-template-columns: 0.9fr 1.1fr;
    gap: ${tokens.spacing['gap-48']};
  }
`;

const Intro = styled.div`
  display: grid;
  gap: ${tokens.spacing['gap-16']};
`;

const LightTitle = styled(SerifDisplay)`
  color: var(--text-primary);

  span {
    color: var(--accent);
  }
`;

const LightBody = styled(BodyCopy)`
  color: var(--text-secondary);
`;

const Cards = styled.div`
  display: grid;
  gap: ${tokens.spacing['gap-16']};

  @media (min-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Card = styled.blockquote`
  margin: 0;
  padding: ${tokens.spacing['padding-20']};
  border-radius: ${tokens.radius['radius-12']};
  border: 1px solid var(--color-42);
  background: var(--color-48);
  display: grid;
  gap: ${tokens.spacing['gap-16']};
`;

const Stars = styled.p`
  margin: 0;
  color: var(--accent);
  letter-spacing: 0.08em;
  font-family: ${tokens.typography['caption-4'].fontFamily}, sans-serif;
  font-size: ${tokens.typography['caption-4'].fontSize};
  line-height: ${tokens.typography['caption-4'].lineHeight};
`;

const Quote = styled.p`
  margin: 0;
  color: var(--text-primary);
  font-family: ${tokens.typography['body-sm-38'].fontFamily}, sans-serif;
  font-size: ${tokens.typography['body-sm-38'].fontSize};
  line-height: ${tokens.typography['body-3'].lineHeight};
`;

const Author = styled.footer`
  display: grid;
  gap: ${tokens.spacing['gap-4']};
`;

const Name = styled.cite`
  font-style: normal;
  color: var(--text-primary);
  font-family: ${tokens.typography['body-sm-35'].fontFamily}, sans-serif;
  font-size: ${tokens.typography['body-sm-35'].fontSize};
  font-weight: ${tokens.typography['body-sm-35'].fontWeight};
  line-height: ${tokens.typography['body-sm-35'].lineHeight};
`;

const Role = styled.p`
  margin: 0;
  color: var(--text-secondary);
  font-family: ${tokens.typography['caption-4'].fontFamily}, sans-serif;
  font-size: ${tokens.typography['caption-4'].fontSize};
  line-height: ${tokens.typography['caption-4'].lineHeight};
`;

const TestimonialsSection = () => (
  <LightSection>
    <Container>
      <Grid>
        <Intro>
          <LightTitle>
            Built For <AccentText>Agents Like You.</AccentText>
          </LightTitle>
          <LightBody>
            Marketing that stops the scroll starts with templates designed for real estate
            professionals who need speed, polish, and local relevance.
          </LightBody>
        </Intro>
        <Cards aria-label="Agent testimonials">
          {testimonials.map((item) => (
            <Card key={item.id}>
              <Stars aria-label="5 out of 5 stars">★★★★★</Stars>
              <Quote>{item.quote}</Quote>
              <Author>
                <Name>{item.name}</Name>
                <Role>{item.role}</Role>
              </Author>
            </Card>
          ))}
        </Cards>
      </Grid>
    </Container>
  </LightSection>
);

export default TestimonialsSection;
