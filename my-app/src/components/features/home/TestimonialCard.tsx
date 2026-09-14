import type { HomeTestimonial } from '@/types/home';

export function TestimonialCard({ quote, name, company, avatar }: HomeTestimonial) {
  return (
    <article className="home-group-33654437__card break-inside-avoid rounded-[16px] border border-[#eaeaea] bg-[#ffffff] p-[24px] shadow-[0_8px_16px_#919eab28]">
      <p className="home-group-33654437__stars" aria-label="5 star rating">
        ★★★★★
      </p>
      <p className="home-group-33654437__quote mt-3">&ldquo;{quote}&rdquo;</p>
      <div className="mt-4 flex items-center gap-3">
        <img
          src={avatar}
          alt={`${name} headshot`}
          className="h-10 w-10 rounded-full object-cover"
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
