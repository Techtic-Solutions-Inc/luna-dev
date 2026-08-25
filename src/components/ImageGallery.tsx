import React from 'react';

interface ImageGalleryProps {
    images: Array<{ src: string; alt: string }>;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
    return (
        <div className="grid grid-cols-3 gap-[20px]">
            {images.map((image, index) => (
                <img key={index} src={image.src} alt={image.alt} className="w-full h-auto rounded-[10px]" />
            ))}
        </div>
    );
};