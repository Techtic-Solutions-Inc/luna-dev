import { Link } from 'react-router-dom';

const GALLERY_IMAGES = [
  {
    src: '/assets/figma/ld0pdcexwugrmn6c7l8cvcjcsjk-1-2289-17245.png',
    alt: 'Real estate social content template featuring a home exterior',
  },
  {
    src: '/assets/figma/attlgjgqkngefohwz-large-img6232-2-I2295-3482-323-1644.png',
    alt: 'Lifestyle content template with iced coffee',
  },
  {
    src: '/assets/figma/attlgjgqkngefohwz-large-img6232-2-I2295-3482-65-2287.png',
    alt: 'Neighborhood showing content template',
  },
  {
    src: '/assets/figma/attlgjgqkngefohwz-large-img6232-1-I2295-3482-323-1646.png',
    alt: 'City street content template',
  },
  {
    src: '/assets/figma/frame-2147227827-2270-16929.png',
    alt: 'Workspace content template',
  },
  {
    src: '/assets/figma/frame-2147227828-2270-16985.png',
    alt: 'Architecture content template',
  },
  {
    src: '/assets/figma/group-33654450-3654-11562.png',
    alt: 'Marketing content card template',
  },
];

const STEPS = [
  {
    badge: 'Step 01',
    title: (
      <>
        Browse The Continuously <span className="text-accent">Updated</span> Collection.
      </>
    ),
    body: 'Explore hundreds of hand-designed templates for social, email, and more. Save the ones that fit your style.',
    image: '/assets/figma/group-33654428-2264-10401.png',
    imageAlt: 'Agentwise content library dashboard',
  },
  {
    badge: 'Step 02',
    title: (
      <>
        We Personalize It To Your <span className="text-accent">Business And Market.</span>
      </>
    ),
    body: 'Our AI customizes every template with your brand, your market, and your neighborhood — automatically. What used to take hours now takes seconds.',
    image: '/assets/figma/frame-2147227817-2270-14193.png',
    imageAlt: 'Agentwise Ultimate Mind personalization interface',
  },
  {
    badge: 'Step 03',
    title: (
      <>
        Post, Attract, Engage, And <span className="text-accent">Stand Out.</span>
      </>
    ),
    body: 'Download your finished content and share it anywhere. Looks like you have a full-scale marketing team (and with Agentwise, you do.)',
    image: '/assets/figma/frame-2147227818-2270-14699.png',
    imageAlt: 'Content customization and download interface',
  },
];

const TESTIMONIALS = [
  {
    quote:
      'The Ultimate Mind has become my second brain for pricing strategy. It pulls comps and pushes back on my assumptions like a seasoned mentor would.',
    name: 'Marcus Donovan',
    role: 'Keller Williams · Denver, CO',
    avatar: '/assets/figma/attlgjgqkngefohwz-large-img6232-1-I2295-3482-65-2289.png',
  },
  {
    quote:
      'Agentwise replaced my entire marketing workflow. What used to take a full Sunday now takes a coffee break — and the content is better than anything I was making in Canva.',
    name: 'Jordan Hayes',
    role: 'eXp Realty · Nashville, TN',
    avatar: '/assets/figma/attlgjgqkngefohwz-large-img6232-1-I2295-3482-323-1646.png',
  },
  {
    quote:
      'My team of twelve agents finally has consistent branding across every channel. The content library alone paid for itself in the first month.',
    name: 'Sarah Mitchell',
    role: 'Compass · Austin, TX',
    avatar: '/assets/figma/group-33654450-3654-11562.png',
  },
  {
    quote:
      'I was skeptical about AI content, but Agentwise understands my market. The templates feel like they were written by someone who lives here.',
    name: 'David Chen',
    role: 'RE/MAX · Seattle, WA',
    avatar: '/assets/figma/frame-1618873431-2729-13112.png',
  },
  {
    quote:
      'Who You\'re Working With Matters — and Agentwise helps me show that every single day on social. My engagement has tripled.',
    name: 'Emily Torres',
    role: 'Coldwell Banker · Miami, FL',
    avatar: '/assets/figma/attlgjgqkngefohwz-large-img6232-2-I2295-3482-65-2287.png',
  },
  {
    quote:
      'The content calendar keeps my whole brokerage on track. We post daily now without anyone burning out on Canva.',
    name: 'James Wright',
    role: 'Century 21 · Phoenix, AZ',
    avatar: '/assets/figma/attlgjgqkngefohwz-large-img6232-2-I2295-3482-323-1644.png',
  },
];

function Stars() {
  return (
    <div className="flex gap-[2px]" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="#000001">
          <path d="M8 1.2l1.76 3.57 3.94.57-2.85 2.78.67 3.92L8 10.47l-3.52 1.85.67-3.92L2.3 5.34l3.94-.57L8 1.2z" />
        </svg>
      ))}
    </div>
  );
}

function StepBadge({ children }: { children: string }) {
  return (
    <span className="inline-flex h-[32px] items-center rounded-[100px] border border-accent px-[16px] text-[14px] font-normal leading-[15.624px] text-accent">
      {children}
    </span>
  );
}

export function HomeSections() {
  return (
    <>
      {/* Section 2 — Marketing gallery */}
      <section id="content" className="home-grid-bg px-6 py-[80px] md:px-[40px]">
        <div className="mx-auto max-w-[1920px]">
          <div className="mb-[40px] text-center">
            <h2 className="text-[36px] font-medium leading-[1.2] text-[#000001] md:text-[48px]">
              Marketing That Stops The Scroll
            </h2>
            <p className="mx-auto mt-[16px] max-w-[640px] text-[16px] font-normal leading-[24px] text-[#554545]">
              Hand-designed by our creative team. Personalized by AI to your market.
              Ready to post in minutes.
            </p>
          </div>

          <div className="flex gap-[16px] overflow-x-auto pb-[10px] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {GALLERY_IMAGES.map((item) => (
              <div
                key={item.src}
                className="h-[420px] w-[240px] shrink-0 overflow-hidden rounded-[20px] md:h-[480px] md:w-[260px]"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — Three steps */}
      <section id="learn-more" className="home-steps-bg px-6 py-[80px] md:px-[40px]">
        <div className="mx-auto max-w-[1920px]">
          <h2 className="mb-[60px] text-center text-[36px] font-medium leading-[1.2] text-ink md:text-[48px]">
            Stunning Marketing, In Three Simple Steps
          </h2>

          <div className="flex flex-col gap-[80px]">
            {STEPS.map((step) => (
              <article
                key={step.badge}
                className="grid items-center gap-[40px] lg:grid-cols-2 lg:gap-[60px]"
              >
                <div className="flex flex-col gap-[20px]">
                  <StepBadge>{step.badge}</StepBadge>
                  <h3 className="text-[32px] font-medium leading-[1.2] text-ink md:text-[40px]">
                    {step.title}
                  </h3>
                  <p className="max-w-[480px] text-[16px] font-normal leading-[26px] text-ink/70">
                    {step.body}
                  </p>
                </div>
                <div className="overflow-hidden rounded-[10px]">
                  <img
                    src={step.image}
                    alt={step.imageAlt}
                    className="w-full object-contain"
                    loading="lazy"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 — Ultimate Mind */}
      <section id="ultimate-mind" className="bg-[#050505] px-6 py-[80px] md:px-[40px]">
        <div className="home-green-panel mx-auto max-w-[1920px] overflow-hidden rounded-[24px] px-6 py-[60px] md:px-[60px] md:py-[80px]">
          <div className="grid items-center gap-[40px] lg:grid-cols-2 lg:gap-[60px]">
            <div className="flex flex-col gap-[20px]">
              <h2 className="text-[24px] font-bold leading-[28px] text-ink md:text-[28px]">
                Agentwise Ultimate Mind
              </h2>
              <p className="text-[16px] font-normal leading-[26px] text-ink/70">
                A bold, strategic AI advisor trained on your market, your business, and
                the realities of residential real estate. Brainstorm campaigns,
                pressure-test pricing, develop your growth plan, and get a second
                opinion 24/7 from a partner who actually knows your business.
              </p>
              <div className="mt-[10px] overflow-hidden rounded-[10px]">
                <img
                  src="/assets/figma/frame-2147227816-2270-14191.png"
                  alt="Agentwise Ultimate Mind dashboard interface"
                  className="w-full object-contain"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="flex flex-col gap-[20px] lg:pl-[20px]">
              <h2 className="text-[36px] font-medium leading-[1.15] text-ink md:text-[48px]">
                Here&apos;s The Deal...
                <br />
                <span className="text-accent">Great Marketing</span>
                <br />
                Is Just The Start.
              </h2>
              <p className="text-[16px] font-normal leading-[26px] text-ink/70">
                A custom business dashboard and a personalized AI advisor built into
                every plan.
              </p>
              <a
                href="#contact"
                className="mt-[10px] inline-flex h-[52px] w-fit items-center rounded-[100px] bg-accent px-[32px] text-[16px] font-semibold leading-6 text-[#000001] transition-all hover:brightness-90 active:brightness-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 — Testimonials */}
      <section id="pricing" className="home-grid-bg px-6 py-[80px] md:px-[40px]">
        <div className="mx-auto grid max-w-[1920px] gap-[40px] lg:grid-cols-[1fr_2fr] lg:gap-[60px]">
          <div className="flex flex-col gap-[20px] lg:sticky lg:top-[100px] lg:self-start">
            <h2 className="text-[36px] font-medium leading-[1.15] text-[#000001] md:text-[48px]">
              Built For{' '}
              <span className="text-accent">Agents Like You.</span>
            </h2>
            <p className="text-[16px] font-normal leading-[26px] text-[#554545]">
              New agents, team leaders, and large brokerages are using Agentwise to
              spend less time marketing and more time closing without sacrificing
              quality.
            </p>
            <Link
              to="/signup"
              className="mt-[10px] inline-flex h-[52px] w-fit items-center rounded-[100px] bg-accent px-[32px] text-[16px] font-semibold leading-6 text-[#000001] transition-all hover:brightness-90 active:brightness-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Join
            </Link>
          </div>

          <div className="columns-1 gap-[16px] sm:columns-2 xl:columns-3">
            {TESTIMONIALS.map((t) => (
              <article
                key={t.name}
                className="mb-[16px] break-inside-avoid rounded-[16px] border border-[#e5e5e5] bg-white p-[24px]"
              >
                <Stars />
                <blockquote className="mt-[16px] text-[16px] font-normal leading-[26px] text-[#000001]">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <footer className="mt-[20px] flex items-center gap-[12px]">
                  <img
                    src={t.avatar}
                    alt=""
                    className="h-[44px] w-[44px] rounded-full object-cover"
                    loading="lazy"
                  />
                  <div>
                    <p className="text-[16px] font-bold leading-[20px] text-[#000001]">
                      {t.name}
                    </p>
                    <p className="text-[14px] leading-[18px] text-[#554545]">{t.role}</p>
                  </div>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Blog anchor section */}
      <section id="blog" className="home-steps-bg px-6 py-[60px] md:px-[40px]">
        <div className="mx-auto max-w-[800px] text-center">
          <h2 className="text-[32px] font-medium leading-[1.2] text-ink md:text-[40px]">
            Blog
          </h2>
          <p className="mt-[16px] text-[16px] leading-[26px] text-ink/70">
            Tips, strategies, and market insights to help you stand out in your area.
          </p>
        </div>
      </section>
    </>
  );
}
