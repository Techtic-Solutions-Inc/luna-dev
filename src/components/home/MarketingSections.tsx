import { useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const gallery = [
  { src: "/images/gallery-partial-left.png", alt: "Lifestyle story template" },
  { src: "/images/gallery-house.png", alt: "Listing story with house exterior" },
  { src: "/assets/figma/attlgjgqkngefohwz-large-img6232-2-I2295-3482-65-2287.png", alt: "Lifestyle coffee story template" },
  { src: "/images/gallery-courtyard.png", alt: "Courtyard showing story template" },
  { src: "/assets/figma/attlgjgqkngefohwz-large-img6232-1-I2295-3482-65-2289.png", alt: "City street story template" },
  { src: "/images/gallery-workspace.png", alt: "Workspace story template" },
  { src: "/images/gallery-skyscraper.png", alt: "City skyline story template" },
];

const steps: Array<{ n: string; title: ReactNode; copy: string; img: string; alt: string }> = [
  {
    n: "01",
    title: (
      <>
        Browse The Continuously <span className="text-accent">Updated</span> Collection.
      </>
    ),
    copy: "Explore hundreds of hand-designed templates for social, email, and more. Save the ones that fit your style.",
    img: "/images/step-01.png",
    alt: "Content library",
  },
  {
    n: "02",
    title: (
      <>
        We Personalize It To Your <span className="text-accent">Business</span> And Market.
      </>
    ),
    copy: "Our AI customizes every template with your brand, your market, and your neighborhood — automatically. What used to take hours now takes seconds.",
    img: "/images/step-02.png",
    alt: "Ultimate Mind personalization",
  },
  {
    n: "03",
    title: (
      <>
        Post, Attract, Engage, And <span className="text-accent">Stand Out.</span>
      </>
    ),
    copy: "Download your finished content and share it anywhere. Looks like you have a full-scale marketing team (and with Agentwise, you do.)",
    img: "/images/step-03.png",
    alt: "Finished content preview",
  },
];

const quotes = [
  {
    quote:
      "The Ultimate Mind has become my second brain for pricing strategy. It pulls comps and pushes back on my assumptions like a seasoned mentor would.",
    name: "Marcus Donovan",
    role: "Keller Williams • Denver, CO",
    avatar: "/assets/figma/attlgjgqkngefohwz-large-img6232-1-I2295-3482-65-2289.png",
  },
  {
    quote:
      "My listings actually look like they belong to a top-1% agent now. Three of my last four clients said the marketing is what sold them on hiring me.",
    name: "Jordan Hayes",
    role: "eXp Realty • Nashville, TN",
    avatar: "/assets/figma/attlgjgqkngefohwz-large-img6232-1-I2295-3482-323-1646.png",
  },
  {
    quote:
      "Agentwise replaced my entire marketing workflow. What used to take a full Sunday now takes a coffee break — and the content is better than anything I was making in Canva.",
    name: "Jordan Hayes",
    role: "eXp Realty • Nashville, TN",
    avatar: "/assets/figma/attlgjgqkngefohwz-large-img6232-2-I2295-3482-323-1644.png",
  },
];

export function MarketingSections() {
  return (
    <>
      <section id="content" className="bg-secondary px-20 py-60 text-color-16 lg:px-60">
        <h2 className="text-center font-garamond text-page-title">Marketing That Stops The Scroll</h2>
        <p className="mx-auto mt-16 max-w-[720px] text-center font-public-sans text-almarai-16-24 text-color-132">
          Hand-designed by our creative team. Personalized by AI to your market. Ready to post in minutes.
        </p>
        <div className="-mx-20 mt-40 flex gap-20 overflow-x-auto px-20 pb-8 lg:-mx-60 lg:px-60">
          {gallery.map((item) => (
            <img
              key={item.src}
              src={item.src}
              alt={item.alt}
              className="h-[420px] w-[240px] shrink-0 rounded-28 object-cover"
            />
          ))}
        </div>
      </section>

      <section className="home-grid-bg px-20 py-80 lg:px-60">
        <h2 className="text-center font-garamond text-page-title text-secondary">
          Stunning Marketing, In Three Simple Steps
        </h2>
        <div className="mx-auto mt-64 flex max-w-[1200px] flex-col gap-80">
          {steps.map((step) => (
            <article key={step.n} className="grid items-center gap-40 lg:grid-cols-2">
              <div>
                <p className="inline-flex h-28 items-center rounded-1000 border border-accent px-16 font-garamond text-almarai-14 text-accent">
                  Step {step.n}
                </p>
                <h3 className="mt-20 max-w-[460px] font-garamond text-section-title text-secondary">{step.title}</h3>
                <p className="mt-16 max-w-[420px] font-public-sans text-almarai-16-24 text-color-131">{step.copy}</p>
              </div>
              <img src={step.img} alt={step.alt} className="w-full rounded-24 object-cover shadow-elevatedDark" />
            </article>
          ))}
        </div>
      </section>

      <section id="pricing" className="home-grid-bg px-20 pb-80 lg:px-60">
        <div className="mx-auto grid max-w-[1440px] overflow-hidden rounded-28 bg-color-121 lg:grid-cols-2">
          <article className="p-32 lg:p-48">
            <h3 className="font-garamond text-section-title text-secondary">Agentwise Ultimate Mind</h3>
            <p className="mt-16 max-w-[480px] font-public-sans text-almarai-16-24 text-secondary">
              A bold, strategic AI advisor trained on your market, your business, and the realities of residential real
              estate. Brainstorm campaigns, pressure-test pricing, develop your growth plan, and get a second opinion
              24/7 from a partner who actually knows your business.
            </p>
            <img
              src="/images/updated-dashboard.png"
              alt="Updated Dashboard"
              className="mt-32 h-[260px] w-full rounded-16 object-cover object-top shadow-drop"
            />
          </article>
          <article className="flex flex-col justify-center p-32 lg:p-48">
            <h3 className="font-garamond text-page-title text-secondary">
              Here’s The Deal...
              <br />
              <span className="text-accent">Great Marketing Is</span>
              <br />
              Just The Start.
            </h3>
            <p className="mt-20 max-w-[420px] font-public-sans text-almarai-16-24 text-secondary">
              A custom business dashboard and a personalized AI advisor built into every plan.
            </p>
            <a
              href="#about"
              className="mt-32 inline-flex h-44 w-fit items-center rounded-1000 bg-accent px-24 text-almarai-16-bold text-secondary transition hover:bg-color-102 focus-visible:ring-2 focus-visible:ring-accent active:brightness-90"
            >
              Learn More
            </a>
          </article>
        </div>
      </section>

      <section id="blog" className="bg-secondary px-20 py-80 text-color-16 lg:px-60">
        <div className="mx-auto grid max-w-[1440px] items-start gap-40 lg:grid-cols-2">
          <div>
            <h2 id="about" className="max-w-[360px] font-garamond text-page-title">
              Built For
              <br />
              <span className="text-accent">Agents Like</span>
              <br />
              You.
            </h2>
            <p className="mt-20 max-w-[420px] font-public-sans text-almarai-16-24 text-color-132">
              New agents, team leaders, and large brokerages are using Agentwise to spend less time marketing and more
              time closing without sacrificing quality.
            </p>
          </div>
          <div className="grid gap-16 sm:grid-cols-2">
            {quotes.map((item, index) => (
              <article
                key={`${item.name}-${index}`}
                className={`rounded-24 border border-color-128 bg-secondary p-24 shadow-soft ${index === 1 ? "sm:mt-32" : ""}`}
              >
                <p className="flex gap-2 text-accent" aria-label="5 star rating">
                  {Array.from({ length: 5 }).map((_, star) => (
                    <Star key={star} />
                  ))}
                </p>
                <p className="mt-12 font-garamond text-garamond-17 text-color-16">{item.quote}</p>
                <div className="mt-20 flex items-center gap-12">
                  <img src={item.avatar} alt="" className="h-40 w-40 rounded-1000 object-cover" />
                  <div>
                    <p className="font-public-sans text-public-16 text-color-16">{item.name}</p>
                    <p className="text-almarai-14 text-color-132">{item.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ContactBlock />
    </>
  );
}

function Star() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="m12 2 2.9 6.7L22 9.2l-5 4.6 1.4 7.2L12 17.8 5.6 21l1.4-7.2-5-4.6 7.1-.5L12 2Z" />
    </svg>
  );
}

function ContactBlock() {
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <section id="contact" className="bg-color-16 px-20 py-80 lg:px-60">
      <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-2">
        <figure className="relative min-h-[480px] overflow-hidden rounded-28">
          <img
            src="/images/contact-portrait.png"
            alt="Everyone's waiting to buy until the market is right"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </figure>
        <form
          className="signup-glow relative flex flex-col gap-16 rounded-28 p-32 lg:p-40"
          onSubmit={onSubmit}
          noValidate={false}
        >
          <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-1000 border border-secondary/40 font-kalam text-[28px] text-secondary">
            A
          </div>
          <h2 className="text-center font-garamond text-section-title text-secondary">Let’s Work Together</h2>
          <div className="grid gap-16 sm:grid-cols-2">
            <Input label="First Name" name="first_name" placeholder="First Name" shape="pill" required />
            <Input label="Last Name" name="last_name" placeholder="Last Name" shape="pill" required />
          </div>
          <div className="grid gap-16 sm:grid-cols-2">
            <Input label="Email" name="email" type="email" placeholder="Email" shape="pill" required />
            <Input label="Phone number" name="phone" placeholder="Phone number" shape="pill" />
          </div>
          <Input
            label="How long have you been in Real Estate?"
            name="tenure"
            placeholder="How long have you been in Real Estate?"
            shape="pill"
          />
          <Input
            label="What do you currently do for marketing your business?"
            name="marketing"
            placeholder="What do you currently do for marketing your business?"
            shape="pill"
          />
          <label className="flex flex-col gap-8 text-almarai-14 text-color-131" htmlFor="message">
            <span>Your Message</span>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Your Message"
              className="min-h-[120px] rounded-28 border border-secondary bg-color-106 px-16 py-16 text-almarai-16 text-secondary placeholder:text-color-135 transition hover:border-accent focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-50"
            />
          </label>
          {sent ? (
            <p className="text-center text-almarai-16-24 text-accent" role="status">
              You’re on the waitlist. We’ll be in touch.
            </p>
          ) : (
            <Button
              type="submit"
              variant="secondary"
              className="mx-auto h-52 min-w-[220px] rounded-1000 border-color-111 bg-color-107 px-32 text-secondary hover:border-accent hover:text-accent"
            >
              Join the waitlist now
            </Button>
          )}
        </form>
      </div>
    </section>
  );
}
