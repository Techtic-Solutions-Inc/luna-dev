import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import apiClient from '../../lib/api/client';
import Spinner from '../ui/Spinner';

type SubscribeState = 'idle' | 'loading' | 'success' | 'error';

export default function Home() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [subscribeState, setSubscribeState] = useState<SubscribeState>('idle');
  const [subscribeError, setSubscribeError] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  function validateForm(): boolean {
    const errs: Record<string, string> = {};
    if (!firstName.trim()) errs.firstName = 'First name is required';
    if (!lastName.trim()) errs.lastName = 'Last name is required';
    if (!email.trim()) {
      errs.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please enter a valid email';
    }
    if (!privacyAccepted) errs.privacy = 'Required';
    if (!termsAccepted) errs.terms = 'Required';
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validateForm()) return;
    setSubscribeState('loading');
    setSubscribeError('');
    try {
      await apiClient.post('/api/visitor/home/subscribe', {
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
      });
      await apiClient.post('/api/visitor/home/terms-acceptance', {
        privacy_policy: privacyAccepted,
        terms_of_service: termsAccepted,
      });
      setSubscribeState('success');
    } catch (err: unknown) {
      setSubscribeState('error');
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setSubscribeError(err.response.data.message as string);
      } else {
        setSubscribeError('Something went wrong. Please try again.');
      }
    }
  }

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Content', href: '#content' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact Us', href: '#contact' },
  ];

  return (
    <div className="min-h-screen w-full bg-[#0f0f0f]">
      {/* ─── NAVBAR ─── */}
      <nav className="fixed top-0 z-50 flex w-full items-center justify-between px-6 py-4 md:px-12" style={{ background: 'linear-gradient(180deg, rgba(15,15,15,0.9) 0%, rgba(15,15,15,0) 100%)' }}>
        <div className="flex items-center gap-2">
          <span className="text-[24px] text-white" style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic' }}>
            Agentwise
          </span>
          <span className="text-[6px] font-light tracking-[2px] text-[#c8a47e]" style={{ fontFamily: "'Almarai', sans-serif" }}>
            REAL ESTATE MARKETING
          </span>
        </div>
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[14px] font-normal text-[#d9d9d9] transition-colors duration-200 hover:text-white"
              style={{ fontFamily: "'Almarai', sans-serif" }}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/sign-in"
            className="text-[14px] font-normal text-[#d9d9d9] transition-colors duration-200 hover:text-white"
            style={{ fontFamily: "'Almarai', sans-serif" }}
          >
            Sign In
          </Link>
          <Link
            to="/sign-up"
            className="rounded-[10000px] bg-[#c8a47e] px-5 py-2 text-[14px] font-bold text-white transition-opacity duration-200 hover:opacity-90"
            style={{ fontFamily: "'Almarai', sans-serif" }}
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* ─── HERO SECTION ─── */}
      <section className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24 pb-16 md:px-12">
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #1a1a19 0%, #2f271f 40%, #1a1a19 70%, #14100d 100%)',
          }}
        />
        <div className="absolute right-0 top-0 h-full w-1/2 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"
            alt="Luxury real estate property"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a19] to-transparent" />
        </div>

        <div className="relative z-10 max-w-[560px]">
          <h1
            className="text-[42px] font-medium leading-[54.81px] text-white"
            style={{ fontFamily: "'EB Garamond', serif" }}
          >
            Stunning Real Estate Marketing,
            <br />
            Personalized To Your Market In Minutes
          </h1>
          <p
            className="mt-4 max-w-[420px] text-[14px] font-light leading-[22px] text-[#959595]"
            style={{ fontFamily: "'Almarai', sans-serif" }}
          >
            Forget one-size-fits-all marketing platforms. Agentwise combines stunning design with
            hyper-local data to create content that actually feels like it belongs in your market.
          </p>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center gap-2">
              {['#1877f2', '#ea4335', '#000000', '#c8a47e'].map((color) => (
                <div
                  key={color}
                  className="flex h-8 w-8 items-center justify-center rounded-full"
                  style={{ backgroundColor: color }}
                  aria-hidden="true"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                    <circle cx="12" cy="12" r="4" />
                  </svg>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <p
              className="mb-3 text-[12px] font-normal text-[#959595]"
              style={{ fontFamily: "'Almarai', sans-serif" }}
            >
              Join 4,000+ Agents growing with Agentwise &amp; Experience the Difference
            </p>
            <Link
              to="/sign-up"
              className="inline-flex h-[48px] items-center justify-center rounded-[10000px] px-10 text-[16px] font-bold text-white transition-opacity duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c8a47e]"
              style={{
                fontFamily: "'Almarai', sans-serif",
                background: 'linear-gradient(90deg, #c8a47e 0%, #a3825e 100%)',
              }}
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* ─── MARKETING THAT STOPS THE SCROLL ─── */}
      <section className="bg-white px-6 py-20 md:px-12">
        <div className="mx-auto max-w-[1100px]">
          <h2
            className="text-center text-[36px] font-medium text-[#14100d]"
            style={{ fontFamily: "'EB Garamond', serif", lineHeight: '46.98px' }}
          >
            Marketing That Stops The Scroll
          </h2>
          <p
            className="mx-auto mt-3 max-w-[600px] text-center text-[14px] font-normal text-[#828282]"
            style={{ fontFamily: "'Almarai', sans-serif", lineHeight: '22px' }}
          >
            Our done-for-you social media content is designed to help you stand out, attract clients,
            and build your brand — effortlessly.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80', alt: 'Modern home interior' },
              { src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80', alt: 'Luxury bedroom' },
              { src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80', alt: 'Home exterior' },
              { src: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=80', alt: 'Estate at night' },
            ].map((img) => (
              <div key={img.alt} className="aspect-[4/5] overflow-hidden rounded-[10px]">
                <img src={img.src} alt={img.alt} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STUNNING MARKETING IN THREE SIMPLE STEPS ─── */}
      <section
        className="px-6 py-20 md:px-12"
        style={{ background: 'linear-gradient(180deg, #f7f2ec 0%, #efe4d9 100%)' }}
      >
        <div className="mx-auto max-w-[1100px]">
          <h2
            className="text-center text-[36px] font-medium text-[#14100d]"
            style={{ fontFamily: "'EB Garamond', serif", lineHeight: '46.98px' }}
          >
            Stunning Marketing, In Three Simple Steps
          </h2>

          {/* Step 1 */}
          <div className="mt-16 flex flex-col items-center gap-10 md:flex-row">
            <div className="flex-1">
              <p className="text-[12px] font-bold uppercase tracking-[2px] text-[#c8a47e]" style={{ fontFamily: "'Almarai', sans-serif" }}>
                Step 01
              </p>
              <h3
                className="mt-2 text-[26px] font-medium text-[#14100d]"
                style={{ fontFamily: "'EB Garamond', serif", lineHeight: '33.93px' }}
              >
                Browse The Continuously
                <br />
                Updated <span className="italic underline">Collection</span>.
              </h3>
              <p
                className="mt-3 max-w-[400px] text-[14px] font-normal text-[#828282]"
                style={{ fontFamily: "'Almarai', sans-serif", lineHeight: '22px' }}
              >
                Help real estate professionals create content faster with ready-made templates.
              </p>
            </div>
            <div className="w-full max-w-[440px] overflow-hidden rounded-[10px]">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80"
                alt="Content browsing interface"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Step 2 */}
          <div className="mt-16 flex flex-col-reverse items-center gap-10 md:flex-row">
            <div className="w-full max-w-[440px] overflow-hidden rounded-[10px]">
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80"
                alt="Personalization interface"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-[12px] font-bold uppercase tracking-[2px] text-[#c8a47e]" style={{ fontFamily: "'Almarai', sans-serif" }}>
                Step 02
              </p>
              <h3
                className="mt-2 text-[26px] font-medium text-[#14100d]"
                style={{ fontFamily: "'EB Garamond', serif", lineHeight: '33.93px' }}
              >
                We Personalize It To Your
                <br />
                Business And <span className="italic underline">Market</span>.
              </h3>
              <p
                className="mt-3 max-w-[400px] text-[14px] font-normal text-[#828282]"
                style={{ fontFamily: "'Almarai', sans-serif", lineHeight: '22px' }}
              >
                Increase audience engagement through visually appealing social media posts.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="mt-16 flex flex-col items-center gap-10 md:flex-row">
            <div className="flex-1">
              <p className="text-[12px] font-bold uppercase tracking-[2px] text-[#c8a47e]" style={{ fontFamily: "'Almarai', sans-serif" }}>
                Step 03
              </p>
              <h3
                className="mt-2 text-[26px] font-medium text-[#14100d]"
                style={{ fontFamily: "'EB Garamond', serif", lineHeight: '33.93px' }}
              >
                Post, Attract, Engage, And
                <br />
                <span className="italic underline">Stand Out</span>.
              </h3>
              <p
                className="mt-3 max-w-[400px] text-[14px] font-normal text-[#828282]"
                style={{ fontFamily: "'Almarai', sans-serif", lineHeight: '22px' }}
              >
                Download your finished content and share it anywhere.
              </p>
            </div>
            <div className="w-full max-w-[440px] overflow-hidden rounded-[10px]">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80"
                alt="Content posting interface"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── AGENTWISE ULTIMATE MIND + HERE'S THE DEAL ─── */}
      <section className="grid gap-3 px-6 py-20 md:grid-cols-2 md:px-12">
        <div className="rounded-[16px] bg-gradient-to-br from-[#2f271f] to-[#1a1a19] p-10">
          <p className="text-[12px] font-bold uppercase tracking-[2px] text-[#c8a47e]" style={{ fontFamily: "'Almarai', sans-serif" }}>
            Agentwise Ultimate Mind
          </p>
          <h3
            className="mt-3 text-[24px] font-medium text-white"
            style={{ fontFamily: "'EB Garamond', serif", lineHeight: '31.32px' }}
          >
            Explore Ultimate Mind
          </h3>
          <p
            className="mt-3 max-w-[360px] text-[14px] font-light text-[#959595]"
            style={{ fontFamily: "'Almarai', sans-serif", lineHeight: '22px' }}
          >
            Click Customize to edit the location, market data, images, or branding.
          </p>
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              className="rounded-[10000px] bg-[#c8a47e] px-6 py-2.5 text-[14px] font-bold text-white transition-opacity duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c8a47e]"
              style={{ fontFamily: "'Almarai', sans-serif" }}
            >
              Download
            </button>
            <button
              type="button"
              className="rounded-[10000px] border border-[#c8a47e] px-6 py-2.5 text-[14px] font-bold text-[#c8a47e] transition-colors duration-200 hover:bg-[#c8a47e] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c8a47e]"
              style={{ fontFamily: "'Almarai', sans-serif" }}
            >
              Customize
            </button>
          </div>
        </div>

        <div className="rounded-[16px] bg-[#f7f2ec] p-10">
          <h3
            className="text-[36px] font-medium text-[#14100d]"
            style={{ fontFamily: "'EB Garamond', serif", lineHeight: '46.98px' }}
          >
            Here&apos;s The Deal...
            <br />
            <span className="underline">Great Marketing</span> Is
            <br />
            Just The Start.
          </h3>
          <p
            className="mt-4 text-[14px] font-normal text-[#828282]"
            style={{ fontFamily: "'Almarai', sans-serif", lineHeight: '22px' }}
          >
            At Agentwise, every template is intentionally designed with a proven formula for maximum
            social media impact.
          </p>
        </div>
      </section>

      {/* ─── BUILT FOR AGENTS LIKE YOU ─── */}
      <section className="px-6 py-20 md:px-12">
        <div className="mx-auto flex max-w-[1100px] flex-col items-start gap-10 md:flex-row">
          <div className="flex-1">
            <h2
              className="text-[42px] font-medium text-white"
              style={{ fontFamily: "'EB Garamond', serif", lineHeight: '54.81px' }}
            >
              Built For
              <br />
              <span className="italic text-[#c8a47e]">Agents Like You</span>.
            </h2>
            <p
              className="mt-4 max-w-[420px] text-[14px] font-normal text-[#959595]"
              style={{ fontFamily: "'Almarai', sans-serif", lineHeight: '22px' }}
            >
              Every template, every feature, and every update is crafted to help real estate agents
              save time, stand out online, and grow their business with effortless marketing.
            </p>
          </div>
          <div className="w-full max-w-[480px] overflow-hidden rounded-[16px]">
            <img
              src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80"
              alt="Real estate agent testimonial"
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ─── LET'S WORK TOGETHER (Contact Form) ─── */}
      <section id="contact" className="px-6 py-20 md:px-12">
        <div className="mx-auto grid max-w-[1100px] gap-10 md:grid-cols-2">
          <div className="overflow-hidden rounded-[16px]">
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80"
              alt="Real estate marketing collage"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <h2
              className="text-[36px] font-medium text-white"
              style={{ fontFamily: "'EB Garamond', serif", lineHeight: '46.98px' }}
            >
              Let&apos;s Work Together
            </h2>

            {subscribeState === 'success' ? (
              <div className="mt-6 flex flex-col items-center gap-4 rounded-[10px] border border-[#3b6c4f] bg-[#22c55e19] px-6 py-5">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                  <circle cx="20" cy="20" r="20" fill="#22c55e33" />
                  <path d="M14 20.5L18 24.5L26 16.5" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="text-center text-[14px] text-[#d9d9d9]" style={{ fontFamily: "'Almarai', sans-serif", lineHeight: '22px' }}>
                  Thank you for reaching out! We&apos;ll be in touch shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-6 flex flex-col gap-4" noValidate>
                <div className="flex gap-3">
                  <div className="flex flex-1 flex-col gap-1.5">
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => { setFirstName(e.target.value); if (formErrors.firstName) setFormErrors((p) => { const n = { ...p }; delete n.firstName; return n; }); }}
                      placeholder="First Name"
                      aria-label="First Name"
                      aria-invalid={!!formErrors.firstName}
                      className="h-[48px] w-full rounded-[10px] border border-[#646261] bg-transparent px-4 text-[14px] text-white placeholder-[#959595] outline-none transition-colors duration-200 hover:border-[#959595] focus:border-[#c8a47e] disabled:opacity-50"
                      style={{ fontFamily: "'Almarai', sans-serif" }}
                      disabled={subscribeState === 'loading'}
                    />
                    {formErrors.firstName && <p className="px-1 text-[12px] text-[#ff2f2f]" role="alert">{formErrors.firstName}</p>}
                  </div>
                  <div className="flex flex-1 flex-col gap-1.5">
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => { setLastName(e.target.value); if (formErrors.lastName) setFormErrors((p) => { const n = { ...p }; delete n.lastName; return n; }); }}
                      placeholder="Last Name"
                      aria-label="Last Name"
                      aria-invalid={!!formErrors.lastName}
                      className="h-[48px] w-full rounded-[10px] border border-[#646261] bg-transparent px-4 text-[14px] text-white placeholder-[#959595] outline-none transition-colors duration-200 hover:border-[#959595] focus:border-[#c8a47e] disabled:opacity-50"
                      style={{ fontFamily: "'Almarai', sans-serif" }}
                      disabled={subscribeState === 'loading'}
                    />
                    {formErrors.lastName && <p className="px-1 text-[12px] text-[#ff2f2f]" role="alert">{formErrors.lastName}</p>}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (formErrors.email) setFormErrors((p) => { const n = { ...p }; delete n.email; return n; }); }}
                    placeholder="Email"
                    aria-label="Email"
                    aria-invalid={!!formErrors.email}
                    className="h-[48px] w-full rounded-[10px] border border-[#646261] bg-transparent px-4 text-[14px] text-white placeholder-[#959595] outline-none transition-colors duration-200 hover:border-[#959595] focus:border-[#c8a47e] disabled:opacity-50"
                    style={{ fontFamily: "'Almarai', sans-serif" }}
                    disabled={subscribeState === 'loading'}
                  />
                  {formErrors.email && <p className="px-1 text-[12px] text-[#ff2f2f]" role="alert">{formErrors.email}</p>}
                </div>

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone number"
                  aria-label="Phone number"
                  className="h-[48px] w-full rounded-[10px] border border-[#646261] bg-transparent px-4 text-[14px] text-white placeholder-[#959595] outline-none transition-colors duration-200 hover:border-[#959595] focus:border-[#c8a47e] disabled:opacity-50"
                  style={{ fontFamily: "'Almarai', sans-serif" }}
                  disabled={subscribeState === 'loading'}
                />

                <div className="flex flex-col gap-2">
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      checked={privacyAccepted}
                      onChange={(e) => { setPrivacyAccepted(e.target.checked); if (formErrors.privacy) setFormErrors((p) => { const n = { ...p }; delete n.privacy; return n; }); }}
                      className="h-4 w-4 shrink-0 cursor-pointer appearance-none rounded-[3px] border border-[#646261] bg-transparent transition-colors duration-200 checked:border-[#c8a47e] checked:bg-[#c8a47e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c8a47e]"
                      disabled={subscribeState === 'loading'}
                    />
                    <span className="text-[13px] text-[#959595]" style={{ fontFamily: "'Almarai', sans-serif" }}>
                      I agree to the <a href="/privacy" className="text-white underline hover:text-[#c8a47e] transition-colors duration-200">Privacy Policy</a>
                    </span>
                  </label>
                  {formErrors.privacy && <p className="pl-6 text-[12px] text-[#ff2f2f]" role="alert">{formErrors.privacy}</p>}

                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => { setTermsAccepted(e.target.checked); if (formErrors.terms) setFormErrors((p) => { const n = { ...p }; delete n.terms; return n; }); }}
                      className="h-4 w-4 shrink-0 cursor-pointer appearance-none rounded-[3px] border border-[#646261] bg-transparent transition-colors duration-200 checked:border-[#c8a47e] checked:bg-[#c8a47e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c8a47e]"
                      disabled={subscribeState === 'loading'}
                    />
                    <span className="text-[13px] text-[#959595]" style={{ fontFamily: "'Almarai', sans-serif" }}>
                      I agree to the <a href="/terms" className="text-white underline hover:text-[#c8a47e] transition-colors duration-200">Terms of Service</a>
                    </span>
                  </label>
                  {formErrors.terms && <p className="pl-6 text-[12px] text-[#ff2f2f]" role="alert">{formErrors.terms}</p>}
                </div>

                {subscribeState === 'error' && subscribeError && (
                  <p className="text-center text-[13px] text-[#ff2f2f]" style={{ fontFamily: "'Almarai', sans-serif" }} role="alert">
                    {subscribeError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={subscribeState === 'loading'}
                  className="flex h-[48px] w-full items-center justify-center rounded-[10000px] text-[16px] font-bold text-white transition-opacity duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c8a47e] active:opacity-80 disabled:cursor-not-allowed disabled:opacity-60"
                  style={{
                    fontFamily: "'Almarai', sans-serif",
                    background: 'linear-gradient(90deg, #c8a47e 0%, #a3825e 100%)',
                  }}
                >
                  {subscribeState === 'loading' ? <Spinner size="sm" className="border-white border-t-transparent" /> : 'Get Started'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-[#333333] px-6 py-10 md:px-12">
        <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-[24px] text-white" style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic' }}>
              Agentwise
            </span>
            <span className="mt-[-2px] text-[6px] font-light tracking-[2px] text-[#c8a47e]" style={{ fontFamily: "'Almarai', sans-serif" }}>
              REAL ESTATE MARKETING
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {navLinks.map((link) => (
              <a
                key={`footer-${link.label}`}
                href={link.href}
                className="text-[13px] text-[#959595] transition-colors duration-200 hover:text-white"
                style={{ fontFamily: "'Almarai', sans-serif" }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <p className="text-[12px] text-[#646261]" style={{ fontFamily: "'Almarai', sans-serif" }}>
            hello@agentwisemarketing.com
          </p>
        </div>
      </footer>
    </div>
  );
}
