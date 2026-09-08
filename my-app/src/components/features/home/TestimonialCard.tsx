import type { Testimonial } from './constants';

export function TestimonialCard({ quote, name, company, avatar }: Testimonial) {
  return (
    <article className="home-group-33654437__card break-inside-avoid rounded-[16px] border border-[#eaeaea] bg-[#ffffff] p-[24px] shadow-[0_8px_16px_#919eab28]">
      <p className="home-group-33654437__stars" aria-label="5 star rating">
        ★★★★★
      </p>
      <p className="home-group-33654437__quote mt-[12px]">&ldquo;{quote}&rdquo;</p>
      <div className="mt-[16px] flex items-center gap-[12px]">
        <img
          src={avatar}
          alt={`${name} headshot`}
          className="h-[40px] w-[40px] rounded-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div>
          <p className="home-group-33654437__name">{name}</p>
          <p className="home-group-33654437__company">{company}</p>
        </div>
      </div>
    </article>
  );
}
