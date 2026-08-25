import React from 'react';
import { LinkList } from './LinkList';
import { ImageGallery } from './ImageGallery';

interface HomeContentProps {
    data: any;
}

export const HomeContent: React.FC<HomeContentProps> = ({ data }) => {
    return (
        <div className="flex flex-col items-center px-[40px] py-[60px] bg-gradient-to-b from-[#2f2f2f] to-[#090014]">
            <h1 className="text-[50px] font-[500] text-white">Stunning Real Estate Marketing, Personalized To Your Market In Minutes</h1>
            <p className="text-[18px] font-[400] text-white">This is an example of a subheadline that provides additional context.</p>
            <Button variant="primary">Get Started</Button>
            <LinkList links={data.links} />
            <ImageGallery images={data.images} />
        </div>
    );
};