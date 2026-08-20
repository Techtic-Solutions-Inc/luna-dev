const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=600&fit=crop',
    alt: 'Modern luxury home exterior with pool',
  },
  {
    src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=600&fit=crop',
    alt: 'Coffee cup on desk with laptop',
  },
  {
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=600&fit=crop',
    alt: 'Contemporary courtyard with natural light',
  },
  {
    src: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400&h=600&fit=crop',
    alt: 'City street at night with lights',
  },
  {
    src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=600&fit=crop',
    alt: 'Modern office desk with headphones',
  },
  {
    src: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400&h=600&fit=crop',
    alt: 'Elegant living room interior design',
  },
];

const MarketingGallerySection = () => (
  <section id="content" className="bg-[var(--color-74)] px-6 py-20 lg:px-10 lg:py-28">
    <div className="mx-auto max-w-7xl text-center">
      <h2 className="font-garamond text-3xl font-medium text-[var(--color-16)] md:text-4xl lg:text-[42px] lg:leading-[55px]">
        Marketing That Stops The Scroll
      </h2>
      <p className="mx-auto mt-4 max-w-2xl font-almarai text-base text-[var(--color-60)] md:text-lg">
        Help real estate professionals create content faster with ready-made templates. Increase
        audience engagement through visually appealing social media posts.
      </p>

      <div
        className="mt-12 flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible lg:grid-cols-6"
        aria-label="Marketing content gallery"
      >
        {galleryImages.map(({ src, alt }) => (
          <div
            key={alt}
            className="w-40 shrink-0 overflow-hidden rounded-2xl md:w-auto"
            style={{ boxShadow: 'var(--drop-shadow-39)' }}
          >
            <img src={src} alt={alt} className="aspect-[2/3] w-full object-cover" loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default MarketingGallerySection;
