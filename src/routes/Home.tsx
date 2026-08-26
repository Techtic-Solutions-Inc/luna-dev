import React from 'react';
import { useHomeData } from '@/hooks/useHomeData';
import Button from '@/components/ui/Button';

const Home: React.FC = () => {
  const { data, loading, error, retry } = useHomeData();

  if (loading) {
    return <div className="skeleton">Loading...</div>;
  }

  if (error) {
    return <div className="alert">Error occurred. <button onClick={retry}>Retry</button></div>;
  }

  if (!data) {
    return <div>No Content Available</div>;
  }

  return (
    <div className="flex flex-col items-center px-[40px] py-[60px] bg-gradient-to-b from-[#2f2f2f] to-[#090014]">
      <h1 className="text-[50px] font-[500] text-[#ffffff]">Stunning Real Estate Marketing, Personalized To Your Market In Minutes</h1>
      <p className="text-[18px] font-[400] text-[#ffffff]">This is an example of a subheadline that provides additional context.</p>
      <Button variant="primary">Get Started</Button>
    </div>
  );
};

export default Home;