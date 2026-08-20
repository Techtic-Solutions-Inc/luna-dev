import { FaStar } from 'react-icons/fa6';

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  title: string;
  initials: string;
  avatarColor: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    quote:
      'Agentwise transformed how I create social content. What used to take hours now takes minutes.',
    name: 'Marcus Donovan',
    title: 'Real Estate Specialist',
    initials: 'MD',
    avatarColor: 'bg-color-67',
  },
  {
    id: '2',
    quote:
      'The personalized templates are a game-changer. My listings get more engagement than ever.',
    name: 'Sarah Chen',
    title: 'Broker, Austin TX',
    initials: 'SC',
    avatarColor: 'bg-color-68',
  },
  {
    id: '3',
    quote: 'Ultimate Mind feels like having a marketing strategist on my team. Highly recommend.',
    name: 'James Rivera',
    title: 'Agent, Miami FL',
    initials: 'JR',
    avatarColor: 'bg-color-69',
  },
  {
    id: '4',
    quote: 'Beautiful designs that actually convert. My clients love the professional look.',
    name: 'Emily Watson',
    title: 'Team Lead, Denver CO',
    initials: 'EW',
    avatarColor: 'bg-color-56',
  },
];

function StarRating() {
  return (
    <div className="flex gap-4" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }, (_, index) => (
        <FaStar
          key={`star-${String(index)}`}
          aria-hidden="true"
          className="text-accent"
          size={12}
        />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="bg-white px-20 py-60 tablet:py-80 desktop:py-102"
    >
      <div className="mx-auto w-full max-w-[1164px]">
        <div className="desktop:flex desktop:gap-60">
          <div className="desktop:w-[380px] desktop:shrink-0">
            <h2 id="testimonials-heading" className="type-heading-xl-63 text-color-16">
              Built For Agents Like You.
            </h2>
            <p className="type-body-68 mt-16 text-color-46">
              Join hundreds of real estate professionals who are creating better marketing content
              faster with Agentwise.
            </p>
          </div>

          <div
            className="mt-40 grid grid-cols-1 gap-16 tablet:grid-cols-2 desktop:mt-0 desktop:flex-1"
            role="list"
            aria-label="Customer testimonials"
          >
            {testimonials.map((testimonial) => (
              <article
                key={testimonial.id}
                role="listitem"
                className="rounded-16 border border-color-40 bg-color-48 p-24"
              >
                <StarRating />
                <blockquote className="type-body-sm-87 mt-16 italic text-color-19">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <footer className="mt-20 flex items-center gap-12">
                  <span
                    className={`flex h-36 w-36 shrink-0 items-center justify-center rounded-full ${testimonial.avatarColor} type-caption-58 font-bold text-white`}
                    aria-hidden="true"
                  >
                    {testimonial.initials}
                  </span>
                  <div>
                    <cite className="type-body-sm-29 not-italic text-color-16">
                      {testimonial.name}
                    </cite>
                    <p className="type-caption-58 text-color-46">{testimonial.title}</p>
                  </div>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
