import { Link } from 'react-router-dom';
import { HomeSubscribeForm } from '../components/HomeSubscribeForm';
import './Home.css';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Content', href: '#content' },
  { label: 'Blog', href: '#blog' },
  { label: 'Pricing', href: '#pricing' },
] as const;

const TEMPLATE_CARDS = [
  {
    id: 'house',
    alt: 'Suburban house exterior',
    quote: '[address + times]',
    image:
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'coffee',
    alt: 'Matcha and iced coffee with sunglasses',
    quote: "Phone's busy, I'm doing the best I ever have",
    image:
      'https://images.unsplash.com/photo-1495474472283-4d41bb188aea?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'courtyard',
    alt: 'Modern courtyard with outdoor seating',
    quote: 'Doing showings in [insert neighborhood and city]!',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'city',
    alt: 'Brick city apartment buildings',
    quote: "If I was moving to [City Name], here's where I'd visit first (as a local)",
    image:
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'desk',
    alt: 'Desk with headphones and notepad',
    quote: "here's what I'm working on today",
    image:
      'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'skyline',
    alt: 'City skyline at dusk',
    quote: 'What You Need To Know About This Market',
    image:
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=700&q=80',
  },
] as const;

const TESTIMONIALS = [
  {
    id: 'marcus',
    quote:
      'The Ultimate Mind has become my second brain for pricing strategy. It pulls comps and pushes back on my assumptions like a seasoned mentor would.',
    name: 'Marcus Donovan',
    role: 'Keller Williams • Denver, CO',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 'jordan-a',
    quote:
      'My listings actually look like they belong to a top-1% agent now. Three of my last four clients said the marketing is what sold them on hiring me.',
    name: 'Jordan Hayes',
    role: 'eXp Realty • Nashville, TN',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 'jordan-b',
    quote:
      'Agentwise replaced my entire marketing workflow. What used to take a full Sunday now takes a coffee break — and the content is better than anything I was making in Canva.',
    name: 'Jordan Hayes',
    role: 'eXp Realty • Nashville, TN',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 'team',
    quote:
      'New agents, team leaders, and large brokerages are using Agentwise to spend less time marketing and more time closing without sacrificing quality.',
    name: 'Ava Mitchell',
    role: 'Team Lead • Austin, TX',
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
  },
] as const;

const SOCIAL_PLATFORMS = [
  'Facebook',
  'Instagram',
  'TikTok',
  'Gmail',
  'LinkedIn',
] as const;

function AgentwiseLogo({ className = '' }: { className?: string }) {
  return (
    <Link
      to="/"
      className={`home-logo ${className}`.trim()}
      aria-label="Agentwise home"
    >
      <span className="home-logo__mark">Agentwise</span>
      <span className="home-logo__tagline">Real Estate Marketing</span>
    </Link>
  );
}

function StarRating() {
  return (
    <div className="home-testimonial__stars" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} aria-hidden="true">
          ★
        </span>
      ))}
    </div>
  );
}

export function Home() {
  return (
    <div className="home-page">
      <a className="home-skip-link" href="#main-content">
        Skip to main content
      </a>

      <header className="home-header">
        <div className="home-header__inner">
          <AgentwiseLogo />

          <nav className="home-header__nav" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <a key={link.href} className="home-header__link" href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="home-header__actions">
            <Link className="home-btn home-btn--outline" to="/signup">
              Get Started
            </Link>
            <Link className="home-btn home-btn--accent" to="/signin">
              Log in
            </Link>
          </div>
        </div>
      </header>

      <main id="main-content">
        <section className="home-hero" aria-labelledby="home-hero-heading">
          <div className="home-hero__glow" aria-hidden="true" />
          <div className="home-hero__grid" aria-hidden="true" />

          <div className="home-hero__content">
            <div className="home-hero__copy">
              <h1 id="home-hero-heading" className="home-hero__heading">
                Stunning Real Estate Marketing, Personalized To Your Market In
                Minutes
              </h1>
              <p className="home-hero__lead">
                The all-in-one marketing platform for residential real estate
                agents. AI-personalized content, a custom business dashboard,
                and a strategic AI advisor that knows your market.
              </p>

              <ul className="home-hero__social" aria-label="Supported platforms">
                {SOCIAL_PLATFORMS.map((platform) => (
                  <li key={platform}>
                    <span
                      className={`home-hero__social-icon home-hero__social-icon--${platform.toLowerCase()}`}
                      title={platform}
                      aria-label={platform}
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div className="home-hero__visual" aria-hidden="true">
              <div className="home-hero__mock">
                <aside className="home-hero__mock-sidebar">
                  <p className="home-hero__mock-brand">Agentwise</p>
                  <p className="home-hero__mock-section">Studio</p>
                  <p>Overview</p>
                  <p>Content Library</p>
                  <p>Content Calendar</p>
                  <p className="home-hero__mock-section">Tools</p>
                  <p className="home-hero__mock-active">Ultimate Mind</p>
                </aside>
                <div className="home-hero__mock-main">
                  <p className="home-hero__mock-greeting">Good Morning, Ava.</p>
                  <p className="home-hero__mock-prompt">
                    Generate captions, listing descriptions, email blasts, and
                    Reels scripts in your brand voice.
                  </p>
                  <div className="home-hero__mock-actions">
                    <span>Plan My Week</span>
                    <span>My Content Calendar</span>
                  </div>
                  <div className="home-hero__mock-gallery">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>

              <article className="home-hero__callout home-hero__callout--calendar">
                <h2>This Week&apos;s Content Calendar</h2>
                <p>
                  See what&apos;s on deck to be published this week and how your
                  social posts are performing.
                </p>
              </article>

              <article className="home-hero__callout home-hero__callout--mind">
                <h2>Agentwise Ultimate Mind</h2>
                <p>
                  Your strategic advisor and business partner — customized for
                  your business, not just a generic chatbot.
                </p>
              </article>
            </div>
          </div>

          <p className="home-hero__waitlist">
            Join <span>Hundreds</span> of other agents on the waitlist for
            Agentwise
          </p>

          <div className="home-hero__cta-wrap">
            <Link className="home-btn home-btn--accent home-btn--lg" to="/signup">
              Get Started
            </Link>
          </div>
        </section>

        <section
          id="content"
          className="home-scroll"
          aria-labelledby="home-scroll-heading"
        >
          <h2 id="home-scroll-heading" className="home-scroll__heading">
            Marketing That Stops The Scroll
          </h2>
          <p className="home-scroll__lead">
            Hand-designed by our creative team. Personalized by AI to your
            market. Ready to post in minutes.
          </p>

          <div className="home-scroll__track" role="list">
            {TEMPLATE_CARDS.map((card) => (
              <figure
                key={card.id}
                className="home-scroll__card"
                role="listitem"
              >
                <img src={card.image} alt={card.alt} loading="lazy" />
                <figcaption>{card.quote}</figcaption>
              </figure>
            ))}
          </div>

          <div className="home-scroll__links">
            <a className="home-text-link" href="#content">
              Browse all
            </a>
            <Link className="home-text-link" to="/signup">
              Get Started
            </Link>
          </div>
        </section>

        <section
          id="about"
          className="home-steps"
          aria-labelledby="home-steps-heading"
        >
          <div className="home-steps__grid-bg" aria-hidden="true" />
          <h2 id="home-steps-heading" className="home-steps__heading">
            Stunning Marketing, In Three Simple Steps
          </h2>

          <article className="home-step">
            <div className="home-step__copy">
              <p className="home-step__badge">Step 01</p>
              <h3>
                Browse The Continuously{' '}
                <span>Updated Collection.</span>
              </h3>
              <p>
                Explore hundreds of hand-designed templates for social, email,
                and more. Save the ones that fit your style.
              </p>
            </div>
            <div className="home-step__visual home-step__visual--library" aria-hidden="true">
              <div className="home-step__panel">
                <p className="home-step__panel-title">
                  The Complete Agentwise Content Library
                </p>
                <div className="home-step__thumbs">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          </article>

          <article className="home-step">
            <div className="home-step__copy">
              <p className="home-step__badge">Step 02</p>
              <h3>
                We Personalize It To Your{' '}
                <span>Business And Market.</span>
              </h3>
              <p>
                Our AI customizes every template with your brand, your market,
                and your neighborhood — automatically. What used to take hours
                now takes seconds.
              </p>
            </div>
            <div className="home-step__visual home-step__visual--mind" aria-hidden="true">
              <div className="home-step__panel home-step__panel--light">
                <p className="home-step__panel-title">Agentwise Ultimate Mind</p>
                <p className="home-step__panel-body">
                  Ask the Mind anything about your business...
                </p>
                <div className="home-step__chips">
                  <span>What should I post this week?</span>
                  <span>Draft a positioning statement</span>
                  <span>How do I price this listing?</span>
                  <span>Build a 30-day content plan</span>
                </div>
              </div>
            </div>
          </article>

          <article className="home-step">
            <div className="home-step__copy">
              <p className="home-step__badge">Step 03</p>
              <h3>
                Post, Attract, Engage, And <span>Stand Out.</span>
              </h3>
              <p>
                Download your finished content and share it anywhere. Looks like
                you have a full-scale marketing team (and with Agentwise, you
                do.)
              </p>
              <a className="home-text-link home-text-link--on-dark" href="#contact">
                Download
              </a>
            </div>
            <div className="home-step__visual home-step__visual--download" aria-hidden="true">
              <div className="home-step__panel home-step__panel--cream">
                <div className="home-step__panel-actions">
                  <span>Customize</span>
                  <span>Copy Caption</span>
                  <span>Download</span>
                </div>
                <div className="home-step__panel-photo" />
                <p className="home-step__panel-caption">About This Template</p>
              </div>
            </div>
          </article>
        </section>

        <section
          id="pricing"
          className="home-ultimate"
          aria-labelledby="home-ultimate-heading"
        >
          <div className="home-ultimate__card">
            <div className="home-ultimate__intro">
              <h2 id="home-ultimate-heading">Agentwise Ultimate Mind</h2>
              <p>
                A bold, strategic AI advisor trained on your market, your
                business, and the realities of residential real estate.
                Brainstorm campaigns, pressure-test pricing, develop your growth
                plan, and get a second opinion 24/7 from a partner who actually
                knows your market.
              </p>
              <p>
                Help real estate professionals create content faster with
                ready-made templates. Increase audience engagement through
                visually appealing social media posts.
              </p>
              <Link className="home-text-link home-text-link--on-dark" to="/signup">
                Explore Ultimate Mind
              </Link>
            </div>

            <div className="home-ultimate__deal">
              <h3>
                Here&apos;s The Deal...
                <br />
                <span>Great Marketing Is</span>
                <br />
                Just The Start.
              </h3>
              <p>
                A custom business dashboard and a personalized AI advisor built
                into every plan.
              </p>
              <Link className="home-btn home-btn--accent" to="/signup">
                Learn More
              </Link>
            </div>
          </div>
        </section>

        <section
          className="home-testimonials"
          aria-labelledby="home-testimonials-heading"
        >
          <div className="home-testimonials__intro">
            <h2 id="home-testimonials-heading">
              Built For
              <br />
              <span>Agents Like You.</span>
            </h2>
            <p>
              How to use this content: Download the final design and publish it
              to your preferred social platform.
            </p>
          </div>

          <div className="home-testimonials__grid">
            {TESTIMONIALS.map((item) => (
              <article key={item.id} className="home-testimonial">
                <StarRating />
                <blockquote>&ldquo;{item.quote}&rdquo;</blockquote>
                <footer>
                  <img src={item.avatar} alt="" width={40} height={40} />
                  <div>
                    <cite>{item.name}</cite>
                    <p>{item.role}</p>
                  </div>
                </footer>
              </article>
            ))}
          </div>
        </section>

        <section
          id="contact"
          className="home-contact"
          aria-labelledby="home-contact-heading"
        >
          <div className="home-contact__media">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80"
              alt="Real estate professional on a phone call"
            />
            <div className="home-contact__overlay">
              <p className="home-contact__overlay-kicker">EVERYONE&apos;S WAITING</p>
              <p className="home-contact__overlay-sub">
                to buy until &lsquo;the market is right&rsquo;
              </p>
            </div>
          </div>

          <div className="home-contact__form-card">
            <h2 id="home-contact-heading" className="visually-hidden">
              Let&apos;s Work Together
            </h2>
            <HomeSubscribeForm />
          </div>
        </section>
      </main>

      <footer className="home-footer" id="blog">
        <div className="home-footer__top">
          <AgentwiseLogo className="home-logo--footer" />
          <ul className="home-footer__social" aria-label="Social media">
            <li>
              <a href="https://facebook.com" aria-label="Facebook">
                f
              </a>
            </li>
            <li>
              <a href="https://x.com" aria-label="X">
                𝕏
              </a>
            </li>
            <li>
              <a href="https://linkedin.com" aria-label="LinkedIn">
                in
              </a>
            </li>
            <li>
              <a href="https://instagram.com" aria-label="Instagram">
                ○
              </a>
            </li>
          </ul>
        </div>

        <div className="home-footer__middle">
          <nav className="home-footer__nav" aria-label="Footer">
            <a href="#about">About</a>
            <a href="#content">Content</a>
            <a href="#pricing">Pricing</a>
            <a href="#blog">Blog</a>
            <a href="#contact">Contact Us</a>
          </nav>
          <a
            className="home-footer__email"
            href="mailto:hello@agentwisemarketing.com"
          >
            hello@agentwisemarketing.com
          </a>
        </div>

        <div className="home-footer__bottom">
          <p>© 2026 Agentwise. All Rights Reserved.</p>
          <p>
            <Link to="/terms">Terms of Service</Link>
            <span aria-hidden="true"> | </span>
            <Link to="/privacy">Privacy Policy</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
