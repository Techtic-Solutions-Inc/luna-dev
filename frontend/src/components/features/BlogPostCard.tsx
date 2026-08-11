import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Card from '../ui/Card';

interface BlogPostCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
}

const PostCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: var(--gap-16);
  padding: 0;
  overflow: hidden;
  background: var(--color-33);
  border-color: var(--color-58);
  box-shadow: none;
  height: 100%;
`;

const ImageWrap = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: var(--color-61);
`;

const PostImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gap-8);
  padding: var(--padding-24);

  @media (max-width: 768px) {
    padding: var(--padding-16);
  }
`;

const PostTitle = styled.h2`
  font-family: var(--font-heading-xl-31-family);
  font-size: var(--font-heading-xl-31-size);
  font-weight: var(--font-heading-xl-31-weight);
  line-height: var(--font-heading-xl-31-line-height);
  color: var(--secondary);

  @media (max-width: 768px) {
    font-family: var(--font-heading-lg-28-family);
    font-size: var(--font-heading-lg-28-size);
    font-weight: var(--font-heading-lg-28-weight);
    line-height: var(--font-heading-lg-28-line-height);
  }
`;

const PostDescription = styled.p`
  font-family: var(--font-body-3-family);
  font-size: var(--font-body-3-size);
  font-weight: var(--font-body-3-weight);
  line-height: var(--font-body-3-line-height);
  color: var(--color-93);
`;

const PostLink = styled(Link)`
  color: inherit;
  text-decoration: none;

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 4px;
    border-radius: var(--radius-4);
  }
`;

const BlogPostCard = ({ id, title, description, image }: BlogPostCardProps) => {
  const titleId = `post-title-${id}`;

  return (
    <PostCard as="article" aria-labelledby={titleId}>
      {image ? (
        <ImageWrap>
          <PostImage src={image} alt={title} />
        </ImageWrap>
      ) : null}
      <Content>
        <PostTitle id={titleId}>
          <PostLink to={`/blog/${id}`}>{title}</PostLink>
        </PostTitle>
        {description ? <PostDescription>{description}</PostDescription> : null}
      </Content>
    </PostCard>
  );
};

export default BlogPostCard;
