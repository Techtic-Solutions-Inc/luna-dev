import React from 'react';
import { useHomeContent } from '../hooks/useHomeContent';
import { HomeContent } from '../components/HomeContent';

const Home: React.FC = () => {
    const { data, isLoading, isError, refetch } = useHomeContent();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading content. <button onClick={refetch}>Retry</button></div>;
    }

    if (!data) {
        return <div>No Content Available</div>;
    }

    return <HomeContent data={data} />;
};

export default Home;