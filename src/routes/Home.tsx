import { Footer } from '../components/layout/Footer';
import { NavBar } from '../components/layout/NavBar';
import { EmailForm } from '../components/home/EmailForm';
import { HeroSection } from '../components/home/HeroSection';
import { StaticImage } from '../components/ui/StaticImage';

const STEPS = [
  {
    number: '01',
    title: (
      <>
        Browse The Continuously <span className="text-gold">Updated Collection.</span>
      </>
    ),
    body: 'Explore hundreds of hand-designed templates for social, email, and more. Save the ones that fit your style.',
    image: '/assets/figma/step-01.jpg',
    alt: 'Agentwise content library product preview',
  },
  {
    number: '02',
    title: (
      <>
        We Personalize It To Your <span className="italic text-gold">Business</span> And Market.
      </>
    ),
    body: 'Our AI customizes every template with your brand, your market, and your neighborhood — automatically. What used to take hours now takes seconds.',
    image: '/assets/figma/step-02.jpg',
    alt: 'Agentwise personalization product preview',
  },
  {
    number: '03',
    title: (
      <>
        Post, Attract, Engage, And <span className="text-gold">Stand Out.</span>
      </>
    ),
    body: 'Download your finished content and share it anywhere. Looks like you have a full-scale marketing team (and with Agentwise, you do.)',
    image: '/assets/figma/step-03.jpg',
    alt: 'Agentwise finished post preview',
  },
] as const;

export function Home() {
  return (
    <div className="min-h-screen bg-ink text-white">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <main id="main-content">
      <div
        className="relative overflow-hidden bg-[#110611]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      >
          <NavBar />
          <HeroSection />
      </div>

      <section
        className="bg-white py-20 text-black md:py-28"
        aria-labelledby="marketing-heading"
      >
        <div className="mx-auto max-w-[920px] px-5 text-center">
          <h2
            id="marketing-heading"
            className="font-serif text-[36px] font-medium leading-tight md:text-[48px] lg:text-[56px]"
          >
            Marketing That Stops The Scroll
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-[#6b6b6b] md:text-[18px]">
            Hand-designed by our creative team. Personalized by AI to your market. Ready to post in
            minutes.
          </p>
        </div>
        <div className="mt-12 overflow-hidden md:mt-16">
          <StaticImage
            src="/assets/figma/marketing-cards.jpg"
            alt="Hand-designed social marketing templates"
            className="mx-auto block w-full max-w-[1920px] object-cover"
            width={1880}
            height={670}
          />
        </div>
      </section>

      <section
        className="relative overflow-hidden bg-[#0b0a0a] py-20 md:py-28"
        aria-labelledby="steps-heading"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      >
        <h2
          id="steps-heading"
          className="mx-auto max-w-[980px] px-5 text-center font-serif text-[36px] font-medium leading-tight text-white md:text-[48px] lg:text-[56px]"
        >
          Stunning Marketing, In Three Simple Steps
        </h2>

        <div className="mx-auto mt-16 flex w-full max-w-[1920px] flex-col gap-20 px-5 md:mt-24 md:gap-28 md:px-10 lg:px-[100px] xl:px-[120px]">
          {STEPS.map((step) => (
            <article
              key={step.number}
              className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16"
            >
              <div className="max-w-[520px]">
                <p className="inline-flex rounded-full border border-gold/70 px-4 py-1.5 font-serif text-[15px] text-gold">
                  Step {step.number}
                </p>
                <h3 className="mt-6 font-serif text-[32px] font-medium leading-tight text-white md:text-[42px]">
                  {step.title}
                </h3>
                <p className="mt-5 text-[16px] leading-relaxed text-white/65 md:text-[17px]">
                  {step.body}
                </p>
              </div>
              <StaticImage
                src={step.image}
                alt={step.alt}
                className="w-full rounded-2xl shadow-card"
              />
            </article>
          ))}
        </div>
      </section>

      <section
        className="bg-[#0b0a0a] px-5 py-10 md:px-10 lg:px-[80px] xl:px-[100px]"
        aria-labelledby="ultimate-heading"
      >
        <div
          className="mx-auto grid max-w-[1720px] overflow-hidden rounded-[32px] lg:grid-cols-2"
          style={{ background: 'linear-gradient(90deg, #14281c 0%, #102018 48%, #0b0b0b 100%)' }}
        >
          <div className="px-8 py-12 md:px-14 md:py-16">
            <h2 id="ultimate-heading" className="font-serif text-[36px] font-medium text-white md:text-[44px]">
              Agentwise Ultimate Mind
            </h2>
            <p className="mt-5 max-w-[520px] text-[16px] leading-relaxed text-white/75">
              A bold, strategic AI advisor trained on your market, your business, and the realities of
              residential real estate. Brainstorm campaigns, pressure-test pricing, develop your growth
              plan, and get a second opinion 24/7 from a partner who actually knows your business.
            </p>
            <StaticImage
              src="/assets/figma/ultimate-mind.jpg"
              alt="Agentwise Ultimate Mind product preview"
              className="mt-10 w-full rounded-2xl shadow-card"
            />
          </div>
          <div className="flex flex-col justify-center px-8 py-12 md:px-14 md:py-16">
            <p className="font-serif text-[40px] font-medium leading-[1.15] text-white md:text-[52px]">
              Here&apos;s The Deal...
              <br />
              <span className="text-gold">Great Marketing</span>
              <br />
              Is Just The Start.
            </p>
            <p className="mt-8 max-w-[420px] text-[16px] text-white/80">
              A custom business dashboard and a personalized AI advisor built into every plan.
            </p>
            <a
              href="#contact"
              className="mt-10 inline-flex h-12 w-fit items-center justify-center rounded-full bg-gold px-8 text-[15px] font-bold text-[#1a1210] transition-opacity hover:opacity-90"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      <section
        className="bg-white py-20 text-black md:py-28"
        aria-labelledby="agents-heading"
      >
        <div className="mx-auto grid w-full max-w-[1720px] items-center gap-12 px-5 md:px-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:px-16">
          <div className="max-w-[520px]">
            <h2 id="agents-heading" className="font-serif text-[40px] font-medium leading-tight md:text-[52px]">
              Built For <span className="text-gold">Agents Like You.</span>
            </h2>
            <p className="mt-6 text-[16px] leading-relaxed text-[#6b6b6b] md:text-[18px]">
              New agents, team leaders, and large brokerages are using Agentwise to spend less time
              marketing and more time closing without sacrificing quality.
            </p>
          </div>
          <StaticImage
            src="/assets/figma/testimonials.jpg"
            alt="Agentwise customer testimonials"
            className="w-full"
          />
        </div>
      </section>

      <section id="contact" className="bg-[#0e0d0d] py-16 md:py-24" aria-labelledby="contact-heading">
        <h2 id="contact-heading" className="sr-only">
          Contact Agentwise
        </h2>
        <div className="mx-auto grid w-full max-w-[1720px] gap-6 px-5 md:px-10 lg:grid-cols-2 lg:px-16">
          <StaticImage
            src="/assets/figma/form-portrait.jpg"
            alt="Everyone's waiting to buy until the market is right"
            className="h-full min-h-[420px] w-full rounded-[28px] object-cover"
          />
          <EmailForm />
        </div>
      </section>
        </main>

      <Footer />
    </div>
  );
}
