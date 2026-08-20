import styled from 'styled-components';
import type { HomeSearchItem } from '../../../types/visitorHome';
import Button from '../../ui/Button';
import LoadingSkeleton from '../../ui/LoadingSkeleton';
import { SectionContainer, SectionHeading, SectionSubheading, SerifAccent } from './homeStyles';

const GallerySection = styled.section`
  padding: ${({ theme }) => `${theme.spacing['padding-60']} 0`};
  background-color: ${({ theme }) => theme.colors.secondary};
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing['gap-16']};
  margin-top: ${({ theme }) => theme.spacing['gap-48']};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(6, 1fr);
    gap: ${({ theme }) => theme.spacing['gap-20']};
  }
`;

const GalleryImage = styled.img`
  width: 100%;
  aspect-ratio: 5 / 7;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radius['radius-16']};
`;

const SkeletonGrid = styled(GalleryGrid)`
  margin-top: ${({ theme }) => theme.spacing['gap-48']};
`;

const StateMessage = styled.div`
  margin-top: ${({ theme }) => theme.spacing['gap-48']};
  padding: ${({ theme }) => theme.spacing['padding-40']};
  text-align: center;
  border-radius: ${({ theme }) => theme.radius['radius-16']};
  background-color: ${({ theme }) => theme.colors['color-48']};
`;

const StateText = styled.p`
  font-family: ${({ theme }) => theme.typography['body-21'].fontFamily};
  font-size: ${({ theme }) => theme.typography['body-21'].fontSize};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing['gap-16']};
`;

const ErrorText = styled(StateText)`
  color: ${({ theme }) => theme.colors['color-45']};
`;

interface HomeGalleryProps {
  items: HomeSearchItem[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  isEmpty: boolean;
  onRetry: () => void;
}

const HomeGallery = ({
  items,
  isLoading,
  isError,
  errorMessage,
  isEmpty,
  onRetry,
}: HomeGalleryProps) => {
  return (
    <GallerySection aria-labelledby="gallery-heading">
      <SectionContainer>
        <SectionHeading $light id="gallery-heading">
          Marketing That <SerifAccent>Stops The Scroll</SerifAccent>
        </SectionHeading>
        <SectionSubheading $light>
          Increase audience engagement through visually appealing social media posts.
        </SectionSubheading>

        {isLoading && (
          <SkeletonGrid aria-busy="true" aria-label="Loading gallery">
            {Array.from({ length: 6 }).map((_, index) => (
              <LoadingSkeleton key={index} height="280px" borderRadius="16px" />
            ))}
          </SkeletonGrid>
        )}

        {!isLoading && isError && (
          <StateMessage role="alert">
            <ErrorText>{errorMessage}</ErrorText>
            <Button variant="primary" size="sm" onClick={onRetry}>
              Try again
            </Button>
          </StateMessage>
        )}

        {!isLoading && !isError && isEmpty && (
          <StateMessage>
            <StateText>No content available at the moment.</StateText>
          </StateMessage>
        )}

        {!isLoading && !isError && !isEmpty && (
          <GalleryGrid>
            {items.map((item) => (
              <GalleryImage
                key={item.id}
                src={item.image_url}
                alt={item.title}
                loading="lazy"
              />
            ))}
          </GalleryGrid>
        )}
      </SectionContainer>
    </GallerySection>
  );
};

export default HomeGallery;
