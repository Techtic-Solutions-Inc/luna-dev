import React from 'react';
import { ShareButton, FooterLinks } from '../components';
import { Spinner, ErrorMessage } from '../components/common';

const BlogDetails: React.FC = () => {
  const { data, isLoading, isError, error } = useBlogDetailsData();

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorMessage message={error.message} />;

  return (
    <div style={{ backgroundColor: '#0E0D0D', color: '#FFFFFF', padding: '40px' }}>
      <h1 style={{ fontSize: '50px', fontWeight: 500 }}>{data.title}</h1>
      <ShareButton icon="share" label="Share" />
      <div>{data.content}</div>
      <FooterLinks links={data.footerLinks} />
    </div>
  );
};

export default BlogDetails;