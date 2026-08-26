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
] as const;

function Stars() {
  return (
    <div className="flex gap-[3px]" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index} className="text-[14px] leading-none text-color-102" aria-hidden="true">
          ★
        </span>
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section id="about" className="bg-ink px-[20px] py-[125px] md:px-[30px] lg:px-[101px]">
      <div className="mx-auto grid max-w-[1760px] items-start gap-[30px] lg:grid-cols-[1fr_2fr] lg:gap-[101px]">
        <div className="lg:sticky lg:top-[100px]">
          <h2 className="font-garamond text-[32px] font-medium leading-[1.2] text-color-101 md:text-[48px]">
            Built For <span className="text-accent">Agents Like You.</span>
          </h2>
          <p className="type-body-46 mt-[20px] max-w-[461px] text-background">
            New agents, team leaders, and large brokerages are using Agentwise to spend less time marketing and more
            time closing without sacrificing quality.
          </p>
        </div>
        <div className="flex flex-col gap-[20px]">
          {TESTIMONIALS.map((item) => (
            <article
              key={item.name}
              className="rounded-[16px] border border-background bg-ink p-[24px] shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
            >
              <Stars />
              <p className="type-body-44 mt-[12px] text-color-101">“{item.quote}”</p>
              <div className="mt-[16px] flex items-center gap-[12px]">
                <img src={item.avatar} alt="" className="h-[40px] w-[40px] rounded-[100px] object-cover" />
                <div>
                  <p className="type-body-25 text-color-101">{item.name}</p>
                  <p className="type-body-69 text-background">{item.meta}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
