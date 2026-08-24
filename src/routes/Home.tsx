import { useEffect, useId, useRef, useState, type ChangeEvent, type FormEvent, type KeyboardEvent } from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok } from 'react-icons/fa6';
import { SiX } from 'react-icons/si';
import { Link } from 'react-router-dom';
import HomeContent from '../components/features/HomeContent';
import { Button } from '../components/ui/Button';
import { LinkList, type NavLinkItem } from '../components/ui/LinkList';
import { Checkbox, TextInput } from '../components/ui/TextInput';
import { FALLBACK_GALLERY } from '../hooks/useContentCalendar';
import { DEFAULT_HOME_STEPS, HOME_PAGE_TITLE } from '../lib/homeContent';

const NAV_LINKS: NavLinkItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Content', href: '#content' },
  { label: 'Blog', href: '#blog' },
  { label: 'Pricing', href: '#pricing' },
];

const FOOTER_LINKS: NavLinkItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Content', href: '#content' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact Us', href: '#contact' },
];

const TESTIMONIALS = [
  {
    id: '1',
    name: 'Marcus Donovan',
    role: 'Keller Williams — Denver, CO',
    text: 'Agentwise transformed how I market my listings. The templates are gorgeous and the personalization is spot-on every time.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
  },
  {
    id: '2',
    name: 'Jordan Hayes',
    role: 'eXp Realty — Nashville, TN',
    text: 'I used to spend hours on social media content. Now I create a week’s worth of posts in under 30 minutes.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
  },
  {
    id: '3',
    name: 'Sarah Chen',
    role: 'Luxury Agent — Miami, FL',
    text: 'The quality of content is unmatched. My engagement has tripled since I started using Agentwise.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
  },
];

const HERO_SOCIAL = [
  { icon: FaFacebookF, label: 'Facebook', href: 'https://facebook.com', className: 'bg-color-13' },
  {
    icon: FaInstagram,
    label: 'Instagram',
    href: 'https://instagram.com',
    className: 'bg-gradient-to-br from-color-30 to-color-122',
  },
  { icon: SiX, label: 'X (Twitter)', href: 'https://x.com', className: 'bg-color-16' },
  { icon: FaTiktok, label: 'TikTok', href: 'https://tiktok.com', className: 'bg-color-16' },
  { icon: FaLinkedinIn, label: 'LinkedIn', href: 'https://linkedin.com', className: 'bg-color-13' },
];

const FOOTER_SOCIAL = [
  { icon: FaFacebookF, label: 'Facebook', href: 'https://facebook.com' },
  { icon: SiX, label: 'X (Twitter)', href: 'https://x.com' },
  { icon: FaInstagram, label: 'Instagram', href: 'https://instagram.com' },
  { icon: FaLinkedinIn, label: 'LinkedIn', href: 'https://linkedin.com' },
];

interface ContactForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  agency: string;
  production: string;
  message: string;
  privacyPolicy: boolean;
  termsOfService: boolean;
}

const EMPTY_FORM: ContactForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  agency: '',
  production: '',
  message: '',
  privacyPolicy: false,
  termsOfService: false,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d\s\-+().]{7,20}$/;

function validateContact(form: ContactForm): Partial<Record<keyof ContactForm | 'form', string>> {
  const errors: Partial<Record<keyof ContactForm | 'form', string>> = {};
  if (!form.firstName.trim()) errors.firstName = 'First name is required.';
  if (!form.lastName.trim()) errors.lastName = 'Last name is required.';
  if (!form.email.trim()) errors.email = 'Email is required.';
  else if (!EMAIL_RE.test(form.email.trim())) errors.email = 'Please enter a valid email address.';
  if (form.phone.trim() && !PHONE_RE.test(form.phone.trim())) errors.phone = 'Please enter a valid phone number.';
  if (!form.privacyPolicy) errors.privacyPolicy = 'You must accept the Privacy Policy.';
  if (!form.termsOfService) errors.termsOfService = 'You must accept the Terms of Service.';
  return errors;
}

function SiteHeader() {
  const [open, setOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);
  const titleId = useId();

  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return undefined;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (wasOpen.current && !open) {
      hamburgerRef.current?.focus();
    }
    wasOpen.current = open;
  }, [open]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      close();
      return;
    }
    if (event.key !== 'Tab' || !dialogRef.current) return;
    const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-color-24/90 backdrop-blur-sm border-b border-color-20">
      <div className="mx-auto max-w-[1440px] grid grid-cols-[1fr_auto_1fr] items-center px-padding-16 tablet:px-padding-24 desktop:px-padding-40 py-padding-16">
        <Link
          to="/"
          className="font-garamond text-heading-lg-26 text-secondary hover:text-accent transition-colors justify-self-start"
          aria-label="Agentwise home"
        >
          Agentwise
        </Link>
        <LinkList
          links={NAV_LINKS}
          ariaLabel="Main navigation"
          className="hidden desktop:flex items-center justify-center gap-40 justify-self-center"
        />
        <div className="hidden desktop:flex items-center justify-end gap-16 justify-self-end">
          <Link to="/signup" aria-label="Get started with Agentwise">
            <Button variant="outline" size="sm">
              Get Started
            </Button>
          </Link>
          <Link to="/signin" aria-label="Log in to Agentwise">
            <Button variant="primary" size="sm">
              Log in
            </Button>
          </Link>
        </div>
        <button
          ref={hamburgerRef}
          type="button"
          className="desktop:hidden col-start-3 justify-self-end flex items-center justify-center w-10 h-10 text-secondary hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-radius-8 transition-colors"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span aria-hidden="true">{open ? '✕' : '☰'}</span>
        </button>
      </div>
      {open ? (
        <div
          id="mobile-nav"
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="desktop:hidden fixed inset-0 top-[64px] bg-color-24/90 backdrop-blur-sm"
          onKeyDown={onKeyDown}
        >
          <div className="flex flex-col gap-24 p-padding-32">
            <div className="flex items-center justify-between">
              <p id={titleId} className="font-garamond text-heading-lg-26 text-secondary">
                Menu
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                className="w-10 h-10 rounded-radius-8 text-secondary hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>
            <ul className="flex flex-col gap-16">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={close}
                    className="font-almarai text-body-34 text-secondary hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link to="/signup" onClick={close} className="block py-padding-8">
                  Get Started
                </Link>
              </li>
              <li>
                <Link to="/signin" onClick={close}>
                  <Button variant="primary" size="md" fullWidth aria-label="Log in">
                    Log in
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function ContactSection() {
  const [form, setForm] = useState<ContactForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm | 'form', string>>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onCheck = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setForm((prev) => ({ ...prev, [name]: checked }));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateContact(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus('error');
      return;
    }
    setStatus('submitting');
    window.setTimeout(() => setStatus('success'), 400);
  };

  return (
    <section
      id="contact"
      className="bg-[linear-gradient(180deg,theme(colors.color-24)_0%,theme(colors.color-16)_100%)] py-padding-32 tablet:py-padding-60 px-padding-16 tablet:px-padding-24 desktop:px-padding-40"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col desktop:flex-row gap-24 tablet:gap-32 rounded-radius-20 overflow-hidden">
          <div className="relative desktop:w-1/3 min-h-[400px]">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=800&fit=crop"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-color-16/90" />
            <p className="relative z-10 p-padding-32 font-garamond text-heading-lg-19 text-secondary">
              EVERYONE&apos;S WAITING
              <br />
              to buy until
              <br />
              &apos;the market is right&apos;
            </p>
          </div>
          <div className="flex-1 p-padding-24 tablet:p-padding-32 desktop:p-padding-40 bg-color-44">
            <h2
              id="contact-heading"
              className="font-garamond text-heading-xl-37 desktop:text-heading-xl-45 text-secondary mb-32"
            >
              Let&apos;s Work Together
            </h2>
            {status === 'success' ? (
              <div role="status" className="text-center py-padding-40">
                <p className="font-garamond text-heading-lg-26 text-accent mb-16">Thank you!</p>
                <p className="font-almarai text-body-34 text-text-secondary">
                  We&apos;ve received your message and will be in touch soon.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col gap-16" noValidate>
                <div className="grid grid-cols-1 tablet:grid-cols-2 gap-16">
                  <TextInput
                    label="First Name"
                    name="firstName"
                    placeholder="First Name"
                    required
                    hideLabel
                    value={form.firstName}
                    onChange={onChange}
                    error={errors.firstName}
                  />
                  <TextInput
                    label="Last Name"
                    name="lastName"
                    placeholder="Last Name"
                    required
                    hideLabel
                    value={form.lastName}
                    onChange={onChange}
                    error={errors.lastName}
                  />
                </div>
                <TextInput
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                  hideLabel
                  autoComplete="email"
                  value={form.email}
                  onChange={onChange}
                  error={errors.email}
                />
                <TextInput
                  label="Phone number"
                  name="phone"
                  type="tel"
                  placeholder="Phone number"
                  hideLabel
                  autoComplete="tel"
                  value={form.phone}
                  onChange={onChange}
                  error={errors.phone}
                />
                <TextInput
                  label="Agency"
                  name="agency"
                  placeholder="Agency"
                  hideLabel
                  value={form.agency}
                  onChange={onChange}
                />
                <TextInput
                  label="What is your current real estate production?"
                  name="production"
                  placeholder="What is your current real estate production?"
                  hideLabel
                  value={form.production}
                  onChange={onChange}
                />
                <div className="flex flex-col gap-4">
                  <label htmlFor="message" className="sr-only">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Your Message"
                    rows={4}
                    value={form.message}
                    onChange={onChange}
                    aria-label="Your message"
                    className="w-full rounded-radius-10 border border-color-20 bg-color-16 px-padding-16 py-padding-12 font-almarai text-body-77 text-secondary placeholder:text-text-secondary hover:border-color-14 focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors resize-none"
                  />
                </div>
                <Checkbox
                  name="privacyPolicy"
                  checked={form.privacyPolicy}
                  onChange={onCheck}
                  error={errors.privacyPolicy}
                  label={
                    <>
                      I agree to the{' '}
                      <a
                        href="#privacy"
                        aria-label="Read the Privacy Policy"
                        className="text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        Privacy Policy
                      </a>
                    </>
                  }
                />
                <Checkbox
                  name="termsOfService"
                  checked={form.termsOfService}
                  onChange={onCheck}
                  error={errors.termsOfService}
                  label={
                    <>
                      I agree to the{' '}
                      <a
                        href="#terms"
                        aria-label="Read the Terms of Service"
                        className="text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        Terms of Service
                      </a>
                    </>
                  }
                />
                {status === 'error' && errors.form ? (
                  <p role="alert" className="font-almarai text-body-sm-106 text-color-51">
                    {errors.form}
                  </p>
                ) : null}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={status === 'submitting'}
                  aria-label="Let's talk with a pro"
                >
                  {status === 'submitting' ? 'Submitting...' : "Let's talk with a pro"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="bg-color-16 px-padding-16 tablet:px-padding-24 desktop:px-padding-40 py-padding-32">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="font-garamond text-heading-lg-26 text-secondary hover:text-accent transition-colors"
            aria-label="Agentwise home"
          >
            Agentwise
          </Link>
          <div className="flex items-center gap-16">
            {FOOTER_SOCIAL.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-color-20 text-color-14 hover:text-accent hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
        <div className="mt-32 flex flex-col gap-16 tablet:flex-row tablet:items-center tablet:justify-between border-t border-color-20 pt-32">
          <LinkList
            links={FOOTER_LINKS}
            ariaLabel="Footer navigation"
            className="flex flex-wrap gap-24"
            itemClassName="font-almarai text-body-sm-106 text-color-14 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors"
          />
          <a
            href="mailto:hello@agentwisemarketing.com"
            className="font-almarai text-body-sm-106 text-color-14 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors"
          >
            hello@agentwisemarketing.com
          </a>
        </div>
        <div className="mt-24 flex flex-col gap-8 tablet:flex-row tablet:items-center tablet:justify-between border-t border-color-20 pt-24">
          <p className="font-almarai text-caption-49 text-color-14">© 2024 Agentwise. All rights Reserved.</p>
          <div className="flex gap-24">
            <a
              href="#terms"
              className="font-almarai text-caption-49 text-color-14 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#privacy"
              className="font-almarai text-caption-49 text-color-14 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-color-24 text-secondary antialiased">
      <SiteHeader />
      <main>
        <section
          className="relative pt-[100px] tablet:pt-[100px] pb-padding-32 tablet:pb-padding-60 px-padding-16 tablet:px-padding-24 desktop:px-padding-40 overflow-hidden"
          aria-labelledby="hero-heading"
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,theme(colors.color-45/20)_0%,transparent_60%),radial-gradient(ellipse_at_20%_80%,theme(colors.accent/13)_0%,transparent_50%)]"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-[1440px]">
            <div className="flex flex-col desktop:flex-row desktop:items-center gap-32 desktop:gap-60">
              <div className="flex-1 flex flex-col gap-24">
                <h1
                  id="hero-heading"
                  className="font-garamond text-heading-xl-37 desktop:text-heading-xl-45 text-secondary text-balance"
                >
                  Stunning Real Estate Marketing, <span className="text-accent">Personalized</span> To Your Market
                  In Minutes
                </h1>
                <p className="font-almarai text-body-34 text-text-secondary max-w-xl">
                  Agentwise is the all-in-one marketing platform for residential real estate agents. A custom business
                  dashboard and a personalized AI advisor built into every plan.
                </p>
                <div className="flex items-center gap-12" aria-label="Social networks">
                  {HERO_SOCIAL.map(({ icon: Icon, label, href, className }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className={[
                        'flex h-10 w-10 items-center justify-center rounded-full text-secondary hover:opacity-80 active:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-opacity',
                        className,
                      ].join(' ')}
                    >
                      <Icon size={16} aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex-1 relative">
                <div className="shadow-drop-shadow-18 rounded-radius-20 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=600&fit=crop"
                    alt="Agentwise dashboard showing content library and calendar"
                    className="w-full h-auto"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
            <div className="mt-32 tablet:mt-60 text-center flex flex-col items-center gap-16 tablet:gap-24">
              <p className="font-almarai text-body-34 text-text-secondary max-w-xl">
                Join <span className="text-accent font-bold">10,000+</span> other agents on the newsletter at Agentwise.
              </p>
              <Link to="/signup" aria-label="Get started with Agentwise">
                <Button size="lg">Get Started</Button>
              </Link>
            </div>
          </div>
        </section>

        <HomeContent
          title={HOME_PAGE_TITLE}
          steps={DEFAULT_HOME_STEPS}
          contentLibrary={FALLBACK_GALLERY}
        />

        <section
          id="about"
          className="py-padding-32 tablet:py-padding-60 px-padding-16 tablet:px-padding-24 desktop:px-padding-40"
          aria-labelledby="ultimate-mind-heading"
        >
          <div className="mx-auto max-w-[1440px]">
            <div className="flex flex-col desktop:flex-row rounded-radius-20 overflow-hidden">
              <div className="flex-1 bg-color-93 p-padding-24 tablet:p-padding-32 desktop:p-padding-40">
                <div className="flex flex-col gap-16 tablet:gap-24">
                  <h3 id="ultimate-mind-heading" className="font-garamond text-heading-lg-26 text-secondary">
                    Agentwise Ultimate Mind
                  </h3>
                  <p className="font-almarai text-body-34 text-text-secondary">
                    Your strategic advisor — trained on your business, your market, and your voice. Ask anything.
                  </p>
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop"
                    alt="Agentwise Ultimate Mind interface"
                    className="w-full rounded-radius-12 shadow-drop-shadow-39"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="flex-1 bg-color-41 p-padding-24 tablet:p-padding-32 desktop:p-padding-40 flex flex-col justify-center gap-24">
                <h2 className="font-garamond text-heading-xl-37 desktop:text-heading-xl-45 text-color-16 text-balance">
                  Here&apos;s The Deal... <span className="text-accent">Great Marketing</span> Is Just The Start.
                </h2>
                <p className="font-almarai text-body-34 text-color-14">
                  Agentwise helps you build and personalize a brand for your real estate career. Our AI learns your
                  market, your brand, and your voice.
                </p>
                <div>
                  <Link to="/signup">
                    <Button variant="primary" size="md" aria-label="Learn more about Agentwise Ultimate Mind">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="blog"
          className="bg-color-61 py-padding-32 tablet:py-padding-60 px-padding-16 tablet:px-padding-24 desktop:px-padding-40"
          aria-labelledby="testimonials-heading"
        >
          <div className="mx-auto max-w-[1440px]">
            <div className="flex flex-col desktop:flex-row gap-24 tablet:gap-40">
              <div className="desktop:w-1/3 flex flex-col gap-16 tablet:gap-24">
                <h2
                  id="testimonials-heading"
                  className="font-garamond text-heading-xl-37 desktop:text-heading-xl-45 text-color-16 text-balance"
                >
                  Built For <span className="text-accent">Agents Like You.</span>
                </h2>
                <p className="font-almarai text-body-34 text-text-secondary">
                  New agents, team leaders, and large brokerages are using Agentwise to spend less time marketing and
                  more time closing without sacrificing quality.
                </p>
              </div>
              <div
                className="desktop:w-2/3 grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-24"
                role="list"
                aria-label="Customer testimonials"
              >
                {TESTIMONIALS.map((item) => (
                  <article
                    key={item.id}
                    role="listitem"
                    className="p-padding-24 bg-secondary rounded-radius-16 shadow-drop-shadow-40"
                  >
                    <div className="flex gap-1 mb-12" aria-label={`${item.rating} out of 5 stars`}>
                      {Array.from({ length: item.rating }).map((_, index) => (
                        <span key={index} className="text-accent" aria-hidden="true">
                          ★
                        </span>
                      ))}
                    </div>
                    <blockquote className="font-almarai text-body-15 text-color-16 mb-16">
                      “{item.text}”
                    </blockquote>
                    <footer className="flex items-center gap-12">
                      <img src={item.avatar} alt="" className="h-10 w-10 rounded-full object-cover" loading="lazy" />
                      <div>
                        <p className="font-almarai text-body-115 text-color-16">{item.name}</p>
                        <p className="font-almarai text-body-sm-106 text-color-14">{item.role}</p>
                      </div>
                    </footer>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div id="pricing" className="sr-only">
          Pricing
        </div>
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
