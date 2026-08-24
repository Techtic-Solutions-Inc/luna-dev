import React from 'react';
import { BlogPostPreview, FooterLinks } from '../components';
import { Spinner, ErrorMessage } from '../components/common';

const Blog: React.FC = () => {
  const { data, isLoading, isError, error } = useBlogData();

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorMessage message={error.message} />;

  return (
    <div style={{ backgroundColor: '#0E0D0D', color: '#FFFFFF', padding: '32px' }}>
      {data.posts.map(post => (
        <BlogPostPreview key={post.id} title={post.title} excerpt={post.excerpt} image={post.image} />
      ))}
      <FooterLinks links={data.footerLinks} />
    </div>
  );
};

export default Blog;