const GALLERY = [
  {
    src: '/assets/figma/ld0pdcexwugrmn6c7l8cvcjcsjk-1-2289-17245.png',
    alt: 'Open house listing template with address and times',
  },
  {
    src: '/assets/figma/frame-2147227827-2270-16929.png',
    alt: "Lifestyle drink template — Phone's busy, I'm doing the best I ever have",
  },
  {
    src: '/assets/figma/frame-2147227828-2270-16985.png',
    alt: 'Neighborhood showing template — Doing showings in your city',
  },
  {
    src: '/assets/figma/frame-1618873431-2729-13112.png',
    alt: "Local city guide template — If I was moving here, here's where I'd visit first",
  },
  {
    src: '/assets/figma/attlgjgqkngefohwz-large-img6232-1-I2295-3482-65-2289.png',
    alt: "Day-in-the-life template — Here's what I'm working on today",
  },
  {
    src: '/assets/figma/attlgjgqkngefohwz-large-img6232-2-I2295-3482-65-2287.png',
    alt: 'Lifestyle marketing template',
  },
  {
    src: '/assets/figma/attlgjgqkngefohwz-large-img6232-3-I2295-3482-65-2290.png',
    alt: 'Real estate lifestyle template',
  },
] as const;

export function FeaturesGallery() {
  return (
    <section className="home-gallery-bg px-[20px] py-[125px] md:px-[30px] lg:px-[101px]">
      <div className="mx-auto flex max-w-[1760px] flex-col gap-[24px] text-center">
        <h2 className="font-garamond text-[32px] font-medium leading-[1.2] text-color-101 md:text-[48px]">
          Marketing That Stops The Scroll
        </h2>
        <p className="type-body-34 mx-auto max-w-[640px] text-background">
          Hand-designed by our creative team. Personalized by AI to your market. Ready to post in minutes.
        </p>
      </div>
      <div className="gallery-track mx-auto mt-[30px] flex max-w-[1760px] gap-[16px] overflow-x-auto pb-[10px]">
        {GALLERY.map((item) => (
          <img
            key={item.src}
            src={item.src}
            alt={item.alt}
            className="h-[280px] w-[200px] shrink-0 rounded-[24px] object-cover md:h-auto md:w-[240px]"
          />
        ))}
      </div>
    </section>
  );
}
