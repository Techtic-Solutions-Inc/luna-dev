import React from 'react';
import { useHomeContent } from '@/hooks/useHomeContent';
import { HomeContent } from '@/components/home/HomeContent';
import { LinkList } from '@/components/home/LinkList';
import { ImageGallery } from '@/components/home/ImageGallery';
import { Button } from '@/components/ui/button';

const Home: React.FC = () => {
  const { data, isLoading, isError, refetch } = useHomeContent();

  if (isLoading) {
    return <div className="skeleton">Loading...</div>;
  }

  if (isError) {
    return <div className="alert">Error loading content. <button onClick={refetch}>Retry</button></div>;
  }

  if (!data) {
    return <div>No Content Available</div>;
  }

  return (
    <div className="home">
      <section className="hero-section bg-gradient-to-b from-gray-800 to-gray-900 px-10 py-15 flex flex-col items-center">
        <h1 className="text-white text-5xl font-medium">Stunning Real Estate Marketing, Personalized To Your Market In Minutes</h1>
        <p className="text-white text-lg font-normal">This is an example of a subheadline that provides additional context.</p>
        <Button className="bg-yellow-500 text-black p-3 rounded-lg">Get Started</Button>
      </section>
      <HomeContent data={data} />
      <LinkList />
      <ImageGallery />
    </div>
  );
};

export default Home;