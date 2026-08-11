import styled, { keyframes } from 'styled-components';
import { useBlogPosts } from '../../hooks/useBlogPosts';
import Button from '../ui/Button';
import Spinner from '../Spinner';
import BlogPostCard from './BlogPostCard';

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: var(--gap-24);
  padding: var(--padding-32) 0;

  @media (max-width: 768px) {
    gap: var(--gap-16);
    padding: var(--padding-24) 0;
  }
`;

const PostsGrid = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--gap-24);

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: var(--gap-16);
  }
`;

const StatusMessage = styled.div<{ $variant: 'error' | 'empty' }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--gap-16);
  padding: var(--padding-24);
  border-radius: var(--radius-10);
  max-width: 40rem;
  font-family: var(--font-body-sm-2-family);
  font-size: var(--font-body-sm-2-size);
  font-weight: var(--font-body-sm-2-weight);
  line-height: var(--font-body-sm-2-line-height);

  ${({ $variant }) =>
    $variant === 'error'
      ? `
        background: var(--color-33);
        border: 1px solid var(--border);
        color: var(--color-53);
      `
      : `
        background: var(--color-33);
        color: var(--color-93);
      `}
`;

const LoadingBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gap-16);
`;

const LoadingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--gap-24);

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const SkeletonCard = styled.div`
  height: 16rem;
  border-radius: var(--radius-10);
  background: linear-gradient(
    90deg,
    var(--color-33) 0%,
    var(--color-61) 50%,
    var(--color-33) 100%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.4s ease-in-out infinite;
`;

const LoadMoreWrap = styled.div`
  display: flex;
  justify-content: center;
  padding-top: var(--gap-8);
`;

const LoadMoreButton = styled(Button)`
  font-family: var(--font-body-3-family);
  font-size: var(--font-body-3-size);
  font-weight: var(--font-body-3-weight);
  line-height: var(--font-body-3-line-height);
  min-width: 10rem;
  color: var(--secondary);
`;

const BlogPostList = () => {
  const {
    visiblePosts,
    isLoading,
    error,
    isEmpty,
    hasMore,
    refetch,
    loadMore,
  } = useBlogPosts();

  return (
    <Section aria-labelledby="blog-page-title">
      {isLoading ? (
        <LoadingBlock aria-busy="true" aria-live="polite">
          <Spinner label="Loading blog posts..." />
          <LoadingGrid aria-hidden="true">
            {Array.from({ length: 4 }, (_, index) => (
              <SkeletonCard key={`skeleton-${index}`} />
            ))}
          </LoadingGrid>
        </LoadingBlock>
      ) : null}

      {error ? (
        <StatusMessage $variant="error" role="alert">
          <p>{error}</p>
          <Button type="button" onClick={() => void refetch()} aria-label="Retry loading blog posts">
            Try again
          </Button>
        </StatusMessage>
      ) : null}

      {isEmpty ? (
        <StatusMessage $variant="empty" role="status">
          <p>No blog posts are available.</p>
        </StatusMessage>
      ) : null}

      {!isLoading && !error && !isEmpty ? (
        <>
          <PostsGrid>
            {visiblePosts.map((post) => (
              <li key={post.id}>
                <BlogPostCard
                  id={post.id}
                  title={post.title}
                  description={post.description}
                  image={post.image}
                />
              </li>
            ))}
          </PostsGrid>
          {hasMore ? (
            <LoadMoreWrap>
              <LoadMoreButton
                type="button"
                onClick={loadMore}
                aria-label="Load more blog posts"
              >
                Load More
              </LoadMoreButton>
            </LoadMoreWrap>
          ) : null}
        </>
      ) : null}
    </Section>
  );
};

export default BlogPostList;
