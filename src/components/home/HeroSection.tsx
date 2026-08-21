import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import { StaticImage } from '../ui/StaticImage';

const SOCIALS = [
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    icon: FaFacebookF,
    className: 'bg-[#1877F2] text-white',
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: FaInstagram,
    className: 'bg-[linear-gradient(45deg,#f58529,#dd2a7b,#8134af)] text-white',
  },
  {
    label: 'TikTok',
    href: 'https://tiktok.com',
    icon: FaTiktok,
    className: 'bg-black text-white',
  },
  {
    label: 'Email',
    href: 'mailto:hello@agentwisemarketing.com',
    icon: SiGmail,
    className: 'bg-white text-[#EA4335]',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: FaLinkedinIn,
    className: 'bg-[#0A66C2] text-white',
  },
] as const;

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-16 pt-4 md:pb-24 md:pt-8" aria-labelledby="hero-heading">
      <div
        className="pointer-events-none absolute inset-0 bg-grid"
        style={{ backgroundSize: '48px 48px' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-24 top-0 h-[520px] w-[520px] rounded-full opacity-70"
        style={{ background: 'radial-gradient(circle, rgba(90,30,70,0.55) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-[18%] top-10 h-[420px] w-[420px] rounded-full opacity-80"
        style={{ background: 'radial-gradient(circle, rgba(200,164,126,0.22) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-10 bottom-10 h-[380px] w-[380px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(40,50,140,0.35) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative mx-auto grid w-full max-w-[1920px] items-center gap-10 px-5 md:px-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:px-[100px] xl:px-[120px]">
        <div className="max-w-[640px]">
          <h1
            id="hero-heading"
            className="font-serif text-[36px] font-medium leading-[1.12] text-white md:text-[48px] lg:text-[56px] xl:text-[64px]"
          >
            Stunning Real Estate Marketing, Personalized To Your Market In Minutes.
          </h1>
          <p className="mt-8 max-w-[520px] text-[16px] font-light leading-[1.55] text-white/80 md:text-[18px]">
            The all-in-one marketing platform for residential real estate agents. AI-personalized
            content, a custom business dashboard, and a strategic AI advisor that knows your market.
          </p>
          <ul className="mt-10 flex items-center gap-3" aria-label="Social platforms">
            {SOCIALS.map(({ label, href, icon: Icon, className }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noreferrer' : undefined}
                  aria-label={label}
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-full ${className}`}
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative min-h-[280px]">
          <StaticImage
            src="/assets/figma/hero-dashboard.jpg"
            alt="Agentwise dashboard product preview"
            className="relative z-10 w-full max-w-none rounded-2xl shadow-card"
            width={1268}
            height={738}
          />
        </div>
      </div>

      <div className="relative mx-auto mt-10 flex max-w-[1920px] flex-col items-center px-5 text-center md:mt-6 md:px-10">
        <p className="text-[16px] text-white md:text-[18px]">
          Join <span className="font-bold text-gold">Hundreds</span> of other agents on the waitlist
          for Agentwise
        </p>
        <a
          href="#contact"
          className="mt-6 inline-flex h-12 min-w-[200px] items-center justify-center rounded-full bg-gold px-10 text-[16px] font-bold text-[#1a1210] transition-opacity hover:opacity-90"
        >
          Get Started
        </a>
      </div>
    </section>
  );
}
