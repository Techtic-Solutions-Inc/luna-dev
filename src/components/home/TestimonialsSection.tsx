import { Star } from "lucide-react";
import { Heading } from "@/components/ui/heading";
import { homeContainerClass, homeSectionXClass } from "@/lib/home-page-ui";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    quote:
      "The Ultimate Mind has become my second brain for pricing strategy. It pulls comps and pushes back on my assumptions like a seasoned mentor would.",
    name: "Marcus Donovan",
    detail: "Keller Williams · Denver, CO",
    initials: "MD",
  },
  {
    quote:
      "My listings actually look like they belong to a top-1% agent now. Three of my last four clients said the marketing is what sold them on hiring me.",
    name: "Jordan Hayes",
    detail: "eXp Realty · Nashville, TN",
    initials: "JH",
  },
  {
    quote:
      "Agentwise replaced my entire marketing workflow. What used to take a full Sunday now takes a coffee break — and the content is better than anything I was making in Canva.",
    name: "Priya Shah",
    detail: "Compass · Austin, TX",
    initials: "PS",
  },
] as const;

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="h-4 w-4 fill-text-on-light text-text-on-light"
          aria-hidden
        />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section
      className={cn("bg-marketing-surface py-[96px]", homeSectionXClass)}
      aria-labelledby="testimonials-heading"
    >
      <div
        className={cn(
          homeContainerClass,
          "grid gap-12 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-[64px]",
        )}
      >
        <div>
          <Heading
            id="testimonials-heading"
            as="h2"
            variant="section"
            className="text-left"
          >
            Built For{" "}
            <span className="text-accent">Agents Like You.</span>
          </Heading>
          <p className="mt-6 font-sans text-[16px] leading-[26px] text-muted">
            New agents, team leaders, and large brokerages are using Agentwise to
            spend less time marketing and more time closing without sacrificing
            quality.
          </p>
        </div>
        <div className="columns-1 gap-4 sm:columns-2">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="mb-4 break-inside-avoid rounded-2xl border border-border bg-marketing-surface p-6 shadow-sm"
            >
              <Stars />
              <blockquote className="mt-4 text-sm leading-relaxed text-text-on-light">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <footer className="mt-6 flex items-center gap-3">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/20 text-sm font-semibold text-accent"
                  aria-hidden
                >
                  {item.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-on-light">
                    {item.name}
                  </p>
                  <p className="text-xs text-muted">{item.detail}</p>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
