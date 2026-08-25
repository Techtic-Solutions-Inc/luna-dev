import { useQuery } from 'react-query';

const fetchHomeContent = async () => {
    const response = await fetch('/api/visitor/home');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const useHomeContent = () => {
    return useQuery(['visitor', 'home'], fetchHomeContent);
};