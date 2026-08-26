import { Button } from '../ui/Button';

const GALLERY = [
  {
    src: '/assets/figma/ld0pdcexwugrmn6c7l8cvcjcsjk-1-2289-17245.png',
    alt: 'Open house listing template with address and times',
  },
  {
    src: '/assets/figma/frame-2147227827-2270-16929.png',
    alt: 'Lifestyle drink template — Phone\'s busy, I\'m doing the best I ever have',
  },
  {
    src: '/assets/figma/frame-2147227828-2270-16985.png',
    alt: 'Neighborhood showing template — Doing showings in your city',
  },
  {
    src: '/assets/figma/frame-1618873431-2729-13112.png',
    alt: 'Local city guide template — If I was moving here, here\'s where I\'d visit first',
  },
  {
    src: '/assets/figma/attlgjgqkngefohwz-large-img6232-1-I2295-3482-65-2289.png',
    alt: 'Day-in-the-life template — Here\'s what I\'m working on today',
  },
];

const STEPS = [
  {
    step: 'Step 01',
    filled: true,
    title: (
      <>
        Browse The Continuously <span className="text-accent">Updated</span>{' '}
        <span className="text-accent">Collection.</span>
      </>
    ),
    body: 'Explore hundreds of hand-designed templates for social, email, and more. Save the ones that fit your style.',
    image: '/assets/figma/group-33654428-2264-10401.png',
    alt: 'Agentwise Content Library',
  },
  {
    step: 'Step 02',
    filled: false,
    title: (
      <>
        We Personalize It To Your <span className="text-accent">Business And Market.</span>
      </>
    ),
    body: 'Our AI customizes every template with your brand, your market, and your neighborhood — automatically. What used to take hours now takes seconds.',
    image: '/assets/figma/frame-2147227816-2270-14191.png',
    alt: 'Agentwise Ultimate Mind personalization',
  },
  {
    step: 'Step 03',
    filled: false,
    title: (
      <>
        Post, Attract, Engage, And <span className="text-accent">Stand Out.</span>
      </>
    ),
    body: 'Download your finished content and share it anywhere. Looks like you have a full-scale marketing team (and with Agentwise, you do.)',
    image: '/assets/figma/frame-2147227818-2270-14699.png',
    alt: 'Content library download preview',
  },
];

const TESTIMONIALS = [
  {
    quote:
      'The Ultimate Mind has become my second brain for pricing strategy. It pulls comps and pushes back on my assumptions like a seasoned mentor would.',
    name: 'Marcus Donovan',
    meta: 'Keller Williams · Denver, CO',
    avatar: '/assets/figma/attlgjgqkngefohwz-large-img6232-1-I2295-3482-323-1646.png',
  },
  {
    quote:
      'My listings actually look like they belong to a top-1% agent now. Three of my last four clients said the marketing is what sold them on hiring me.',
    name: 'Jordan Hayes',
    meta: 'eXp Realty · Nashville, TN',
    avatar: '/assets/figma/attlgjgqkngefohwz-large-img6232-2-I2295-3482-323-1644.png',
  },
];

function Stars() {
  return (
    <div className="flex gap-[3px]" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index} className="text-[14px] text-color-101" aria-hidden="true">
          ★
        </span>
      ))}
    </div>
  );
}

export function HomeSections() {
  return (
    <>
      <section id="features" className="home-gallery-bg px-[20px] py-[60px] md:px-[40px] lg:px-[80px]">
        <div className="mx-auto max-w-[1000px] text-center">
          <h2 className="font-garamond text-[32px] font-medium leading-[1.2] text-color-103 md:text-[48px]">
            Marketing That Stops The Scroll
          </h2>
          <p className="type-body-16 mt-[16px] text-color-111">
            Hand-designed by our creative team. Personalized by AI to your market. Ready to post in
            minutes.
          </p>
        </div>
        <div className="gallery-track mt-[40px] flex gap-[16px] overflow-x-auto pb-[10px]">
          {GALLERY.map((card) => (
            <figure
              key={card.src}
              className="relative h-[420px] w-[240px] shrink-0 overflow-hidden rounded-24 md:h-[480px] md:w-[260px]"
            >
              <img src={card.src} alt={card.alt} className="h-full w-full object-cover" />
            </figure>
          ))}
        </div>
      </section>

      <section className="home-steps-bg px-[20px] py-[80px] md:px-[40px] lg:px-[80px]">
        <h2 className="mx-auto max-w-[1000px] text-center font-garamond text-[32px] font-medium leading-[1.2] text-ink md:text-[48px]">
          Stunning Marketing, In Three Simple Steps
        </h2>
        <div className="mx-auto mt-[60px] flex max-w-[1760px] flex-col gap-[80px]">
          {STEPS.map((item) => (
            <div
              key={item.step}
              className="grid items-center gap-[40px] lg:grid-cols-2 lg:gap-[60px]"
            >
              <div>
                <span
                  className={
                    item.filled
                      ? 'inline-flex rounded-pill bg-accent px-[16px] py-[6px] font-grotesk text-[12px] font-medium uppercase tracking-[0.12em] text-color-101'
                      : 'inline-flex rounded-pill border border-accent px-[16px] py-[6px] font-grotesk text-[12px] font-medium uppercase tracking-[0.12em] text-accent'
                  }
                >
                  {item.step}
                </span>
                <h3 className="mt-[20px] max-w-[480px] font-garamond text-[28px] font-medium leading-[1.2] text-ink md:text-[40px]">
                  {item.title}
                </h3>
                <p className="type-body-16 mt-[16px] max-w-[461px] text-background">{item.body}</p>
              </div>
              <img
                src={item.image}
                alt={item.alt}
                className="h-auto w-full max-w-full rounded-16 object-contain"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="home-steps-bg px-[20px] pb-[80px] md:px-[40px] lg:px-[80px]">
        <div className="home-green-panel mx-auto grid max-w-[1760px] gap-[40px] rounded-[40px] px-[24px] py-[40px] md:px-[60px] md:py-[80px] lg:grid-cols-2 lg:gap-[60px]">
          <div>
            <h2 className="font-garamond text-[32px] font-medium leading-[1.2] text-ink md:text-[40px]">
              Agentwise Ultimate Mind
            </h2>
            <p className="type-body-16 mt-[16px] max-w-[560px] text-ink">
              A bold, strategic AI advisor trained on your market, your business, and the realities
              of residential real estate. Brainstorm campaigns, pressure-test pricing, develop your
              growth plan, and get a second opinion 24/7 from a partner who actually knows your
              business.
            </p>
            <img
              src="/assets/figma/frame-2147227817-2270-14193.png"
              alt="Agentwise Ultimate Mind"
              className="mt-[32px] h-auto w-full max-w-full rounded-16 object-contain"
            />
          </div>
          <div className="flex flex-col justify-center lg:pl-[20px]">
            <h3 className="font-garamond text-[32px] font-medium leading-[1.15] text-ink md:text-[48px]">
              Here’s The Deal…
              <span className="mt-[8px] block text-accent">Great Marketing Is Just The Start.</span>
            </h3>
            <p className="type-body-3 mt-[20px] text-ink">
              A custom business dashboard and a personalized AI advisor built into every plan.
            </p>
            <Button to="#features" variant="primary" className="mt-[32px] w-fit min-w-[160px]">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <section id="about" className="bg-ink px-[20px] py-[80px] md:px-[40px] lg:px-[80px]">
        <div className="mx-auto grid max-w-[1760px] gap-[40px] lg:grid-cols-[1fr_2fr] lg:gap-[60px]">
          <div className="lg:sticky lg:top-[100px] lg:self-start">
            <h2 className="font-garamond text-[32px] font-medium leading-[1.2] text-color-101 md:text-[48px]">
              Built For <span className="text-accent">Agents Like You.</span>
            </h2>
            <p className="type-body-34 mt-[16px] max-w-[461px] text-color-111">
              New agents, team leaders, and large brokerages are using Agentwise to spend less time
              marketing and more time closing without sacrificing quality.
            </p>
          </div>
          <div className="testimonial-grid columns-1 gap-x-[24px] sm:columns-2">
            {TESTIMONIALS.map((item) => (
              <article
                key={item.name}
                className="mb-[16px] break-inside-avoid rounded-16 border border-line bg-ink p-[24px] shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
              >
                <Stars />
                <p className="type-body-16 mt-[12px] text-color-103">“{item.quote}”</p>
                <div className="mt-[16px] flex items-center gap-[12px]">
                  <img
                    src={item.avatar}
                    alt=""
                    className="h-[40px] w-[40px] rounded-full object-cover"
                  />
                  <div>
                    <p className="font-public text-[14px] font-semibold leading-[18px] text-color-101">
                      {item.name}
                    </p>
                    <p className="type-body-69 text-color-111">{item.meta}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
