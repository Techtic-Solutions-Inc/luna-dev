const testimonials = [
  {
    quote:
      'Agentwise transformed how I create social content. What used to take hours now takes minutes.',
    name: 'Sarah Mitchell',
    title: 'Real Estate Advisor',
    initials: 'SM',
  },
  {
    quote:
      'The personalized templates are a game-changer. My engagement has doubled since I started using Agentwise.',
    name: 'James Rodriguez',
    title: 'Broker Associate',
    initials: 'JR',
  },
  {
    quote:
      'Finally, marketing that looks professional without hiring a designer. My clients love the content.',
    name: 'Emily Chen',
    title: 'Listing Agent',
    initials: 'EC',
  },
  {
    quote:
      'The AI advisor knows my market better than I expected. It saves me research time every week.',
    name: 'Michael Torres',
    title: 'Team Lead',
    initials: 'MT',
  },
  {
    quote:
      'I was skeptical at first, but the quality of content is outstanding. Worth every penny.',
    name: 'Lisa Anderson',
    title: 'Luxury Specialist',
    initials: 'LA',
  },
  {
    quote:
      'My team adopted Agentwise and our brand consistency improved dramatically across all channels.',
    name: 'David Park',
    title: 'Managing Broker',
    initials: 'DP',
  },
];

const StarRating = () => (
  <div className="flex gap-0.5" aria-label="5 out of 5 stars">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className="h-4 w-4 text-accent"
        fill="currentColor"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const TestimonialsSection = () => (
  <section id="about" className="bg-[var(--color-74)] px-6 py-20 lg:px-10 lg:py-28">
    <div className="mx-auto max-w-7xl">
      <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <div>
          <h2 className="font-garamond text-3xl font-medium text-[var(--color-16)] md:text-4xl lg:text-[42px] lg:leading-[55px]">
            Built For Agents Like You.
          </h2>
          <p className="mt-4 font-almarai text-base leading-relaxed text-[var(--color-60)]">
            Join thousands of real estate professionals who trust Agentwise to elevate their
            marketing and grow their business.
          </p>
        </div>

        <div className="columns-1 gap-4 sm:columns-2" aria-label="Customer testimonials">
          {testimonials.map(({ quote, name, title, initials }) => (
            <article
              key={name}
              className="mb-4 break-inside-avoid rounded-2xl border border-[var(--color-42)] bg-white p-6"
              style={{ boxShadow: 'var(--drop-shadow-39)' }}
            >
              <StarRating />
              <blockquote className="mt-4 font-almarai text-sm leading-relaxed text-[var(--color-60)]">
                &ldquo;{quote}&rdquo;
              </blockquote>
              <div className="mt-4 flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-accent font-almarai text-sm font-bold text-[var(--color-16)]"
                  aria-hidden="true"
                >
                  {initials}
                </div>
                <div>
                  <p className="font-almarai text-sm font-bold text-[var(--color-16)]">{name}</p>
                  <p className="font-almarai text-xs text-[var(--color-60)]">{title}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
