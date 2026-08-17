import { type FormEvent, useState } from 'react';
import { FiArrowRight, FiCheck, FiInstagram, FiLinkedin, FiTwitter } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import Checkbox from '../ui/Checkbox';
import InputField from '../ui/InputField';

const marketingTiles = [
  'from-[#746050] via-[#d8c4a0] to-[#2f3e2f]',
  'from-[#1d1b1b] via-[#c8a47e] to-[#665044]',
  'from-[#97a6a6] via-[#d9d1bd] to-[#32403c]',
  'from-[#5e665e] via-[#d4a879] to-[#251e1c]',
  'from-[#292321] via-[#d2c3af] to-[#121716]',
  'from-[#bdaf97] via-[#5c463e] to-[#202b2c]',
];

const steps = [
  {
    number: '01',
    title: 'Browse The Continuously Updated Collection.',
    description: 'Explore hundreds of hand-designed templates for social, email, and more. Save the ones that fit your style.',
  },
  {
    number: '02',
    title: 'We Personalize It To Your Business And Market.',
    description: 'Add your market and branding once, then make every design feel like it was made just for you.',
  },
  {
    number: '03',
    title: 'Post, Attract, Engage, And Stand Out.',
    description: 'Download beautiful marketing in minutes and share it everywhere your clients are looking.',
  },
];

function InformationalText({ children }: { children: string }) {
  return <p className="font-['Almarai'] text-sm leading-6 text-[#bdbdbd]">{children}</p>;
}

function MarketingPreview({ index }: { index: number }) {
  return (
    <div
      aria-hidden="true"
      className={`relative h-[220px] overflow-hidden rounded-md bg-gradient-to-br ${marketingTiles[index % marketingTiles.length]}`}
    >
      <div className="absolute inset-x-4 top-5 h-8 rounded border border-white/30 bg-black/20" />
      <div className="absolute inset-x-5 top-16 h-16 border border-white/30 bg-white/15" />
      <div className="absolute bottom-5 left-5 h-2 w-2/3 rounded bg-white/70" />
      <div className="absolute bottom-9 left-5 h-2 w-1/2 rounded bg-white/50" />
    </div>
  );
}

export default function Home() {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formError, setFormError] = useState('');
  const [sent, setSent] = useState(false);

  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !phoneNumber.trim()) {
      setFormError('Please complete all contact fields.');
      setSent(false);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setFormError('Enter a valid email address.');
      setSent(false);
      return;
    }
    if (!termsAccepted) {
      setFormError('Please accept the Privacy Policy and Terms of Service.');
      setSent(false);
      return;
    }
    setFormError('');
    setSent(true);
  };

  return (
    <main className="bg-[#0e0d0d] font-['Almarai'] text-[#f2f2f2]">
      <section className="relative isolate overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_82%_22%,rgba(103,21,95,.45),transparent_25%),radial-gradient(circle_at_6%_94%,rgba(0,76,53,.52),transparent_24%),linear-gradient(105deg,#100d0e_10%,#25121d_58%,#130d0f)]">
        <div className="absolute inset-0 -z-10 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.09)_1px,transparent_1px)] [background-size:24px_24px]" />
        <header className="mx-auto flex max-w-[1320px] items-center justify-between px-6 py-6 lg:px-8">
          <a href="#top" className="font-['EB_Garamond'] text-2xl italic text-[#c8a47e]">Agentwise</a>
          <nav aria-label="Main navigation" className="hidden items-center gap-8 text-xs text-white/80 md:flex">
            <a href="#how-it-works" className="hover:text-[#c8a47e]">About</a>
            <a href="#library" className="hover:text-[#c8a47e]">Explore</a>
            <a href="#contact" className="hover:text-[#c8a47e]">Help</a>
            <Link to="/signin" className="hover:text-[#c8a47e]">Sign in</Link>
          </nav>
          <Link to="/signup" className="rounded-full border border-[#c8a47e] px-4 py-2 text-xs text-[#c8a47e] hover:bg-[#c8a47e] hover:text-[#14100d]">Get started</Link>
        </header>

        <div id="top" className="mx-auto grid max-w-[1320px] items-center gap-12 px-6 pb-20 pt-14 lg:grid-cols-[.88fr_1.12fr] lg:px-8 lg:pb-28 lg:pt-24">
          <div>
            <h1 className="max-w-[610px] font-['EB_Garamond'] text-5xl leading-[.95] sm:text-6xl lg:text-[84px]">Stunning Real Estate Marketing.<br />Personalized To Your Market In Minutes.</h1>
            <InformationalText>Market like the top agents in your area with content built for the way people buy and sell today.</InformationalText>
            <div className="mt-8 flex items-center gap-3">
              <Link to="/signup" className="inline-flex items-center gap-2 rounded-full bg-[#c8a47e] px-5 py-3 text-sm text-[#14100d] transition hover:bg-[#efe4d9]">Get Started <FiArrowRight aria-hidden="true" /></Link>
              <a href="#library" className="text-sm underline underline-offset-4 hover:text-[#c8a47e]">Explore the library</a>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[660px] rounded-lg border border-white/15 bg-[#11100f]/90 p-3 shadow-2xl shadow-black/60">
            <div className="flex gap-2 border-b border-white/10 pb-3 text-[10px] text-[#bdbdbd]"><span className="rounded bg-[#c8a47e] px-2 py-1 text-[#14100d]">Agentwise</span><span className="px-2 py-1">Library</span><span className="px-2 py-1">Calendar</span></div>
            <div className="grid grid-cols-[90px_1fr] gap-3 pt-3">
              <div className="space-y-3 border-r border-white/10 pr-3"><div className="h-2 w-full rounded bg-white/20" /><div className="h-2 w-3/4 rounded bg-white/10" /><div className="h-2 w-full rounded bg-white/10" /><div className="h-2 w-2/3 rounded bg-white/10" /></div>
              <div><div className="mb-3 h-8 rounded bg-white/10" /><div className="grid grid-cols-3 gap-2">{marketingTiles.slice(0, 3).map((tile) => <div key={tile} className={`h-28 rounded bg-gradient-to-br ${tile}`} />)}</div></div>
            </div>
          </div>
        </div>
      </section>

      <section id="library" className="bg-[#f7f2ec] py-16 text-[#14100d] lg:py-20">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-8">
          <div className="text-center"><h2 className="font-['EB_Garamond'] text-4xl sm:text-5xl">Marketing That Stops The Scroll</h2><p className="mt-2 text-xs text-[#44413e]">Built by real estate marketers. Personalized for you.</p></div>
          <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">{marketingTiles.map((_, index) => <MarketingPreview key={index} index={index} />)}</div>
        </div>
      </section>

      <section id="how-it-works" className="bg-[#0e0d0d] py-20 lg:py-28">
        <div className="mx-auto max-w-[1060px] px-6 lg:px-8"><h2 className="text-center font-['EB_Garamond'] text-4xl sm:text-5xl">Stunning Marketing, In Three Simple Steps</h2>
          <div className="mt-16 space-y-14">{steps.map((step, index) => <article key={step.number} className={`grid items-center gap-8 md:grid-cols-2 ${index % 2 ? 'md:[&>*:first-child]:order-2' : ''}`}><div><span className="text-xs text-[#c8a47e]">Step {step.number}</span><h3 className="mt-3 max-w-md font-['EB_Garamond'] text-3xl leading-tight sm:text-[42px]">{step.title}</h3><p className="mt-4 max-w-md text-sm leading-6 text-[#bdbdbd]">{step.description}</p></div><div className="rounded bg-[#181716] p-4"><MarketingPreview index={index + 2} /></div></article>)}</div>
          <div className="mt-16 grid overflow-hidden rounded-md bg-[#164d37] md:grid-cols-2"><div className="min-h-[280px] bg-[linear-gradient(140deg,#f6f1e9_0%,#b6a690_100%)] p-8"><div className="h-full rounded border border-[#51483e]/25 bg-white/50 p-5"><p className="font-['EB_Garamond'] text-3xl text-[#3c332c]">Your market, your brand.</p></div></div><div className="p-8 sm:p-12"><p className="text-sm text-[#c8a47e]">Agentwise Ultimate Mind</p><h3 className="mt-5 font-['EB_Garamond'] text-4xl leading-tight">Here’s The Deal… <span className="text-[#c8a47e]">Great Marketing</span> Is Just The Start.</h3><Link to="/signup" className="mt-7 inline-flex rounded-full bg-[#c8a47e] px-5 py-3 text-sm text-[#14100d] hover:bg-[#efe4d9]">Get started</Link></div></div>
        </div>
      </section>

      <section className="bg-[#f7f2ec] py-20 text-[#14100d]"><div className="mx-auto grid max-w-[1060px] gap-12 px-6 lg:grid-cols-[.8fr_1.2fr] lg:px-8"><div><p className="font-['EB_Garamond'] text-4xl leading-none">Built For<br /><span className="text-[#c8a47e]">Agents Like<br />You.</span></p><p className="mt-6 max-w-xs text-sm leading-6 text-[#44413e]">Everything you need to create marketing that makes a lasting impression.</p></div><div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">{['A marketing assistant that knows real estate.', 'Content designed to make you memorable.', 'A simpler path from idea to post.', 'More consistency in your brand.'].map((text) => <div key={text} className="border-t border-[#c8a47e]/60 pt-4"><FiCheck className="text-[#c8a47e]" aria-hidden="true" /><p className="mt-3 text-sm leading-6">{text}</p></div>)}</div></div></section>

      <section id="contact" className="bg-[#0e0d0d] py-20"><div className="mx-auto grid max-w-[1060px] overflow-hidden rounded-md border border-white/10 md:grid-cols-2"><div className="min-h-[380px] bg-[linear-gradient(135deg,#a89d8f,#4b423c_48%,#1b1918)] p-8"><p className="mt-52 font-['EB_Garamond'] text-5xl leading-none text-white">EVERYONE’S<br />WAITING</p></div><div className="bg-[#171514] p-8 sm:p-12"><h2 className="font-['EB_Garamond'] text-4xl">Let’s Work Together</h2><p className="mt-3 text-sm text-[#bdbdbd]">Tell us a little about yourself and we’ll be in touch.</p><form className="mt-8 space-y-4" noValidate onSubmit={submitContact}><div className="grid gap-4 sm:grid-cols-2"><InputField id="home-first-name" label="First Name" value={firstName} onChange={(event) => { setFirstName(event.target.value); setFormError(''); setSent(false); }} /><InputField id="home-last-name" label="Last Name" value={lastName} onChange={(event) => { setLastName(event.target.value); setFormError(''); setSent(false); }} /></div><InputField id="home-email" label="Email address" type="email" value={email} error={formError} onChange={(event) => { setEmail(event.target.value); setFormError(''); setSent(false); }} /><InputField id="home-phone" label="Phone number" type="tel" autoComplete="tel" value={phoneNumber} onChange={(event) => { setPhoneNumber(event.target.value); setFormError(''); setSent(false); }} /><Checkbox id="home-terms" checked={termsAccepted} onChange={(event) => { setTermsAccepted(event.target.checked); setFormError(''); }}>I agree to the <a className="underline hover:text-white" href="/privacy">Privacy Policy</a> and <a className="underline hover:text-white" href="/terms">Terms of Service</a>.</Checkbox><Button type="submit" className="mt-2 bg-[#c8a47e] text-[#14100d] hover:bg-[#efe4d9]">Submit enquiry</Button>{sent && <p role="status" className="text-sm text-[#51ca7e]">Thanks — we’ll be in touch shortly.</p>}</form></div></div></section>

      <footer className="border-t border-white/10 px-6 py-10"><div className="mx-auto flex max-w-[1320px] flex-col gap-6 text-xs text-[#bdbdbd] md:flex-row md:items-center md:justify-between"><p className="font-['EB_Garamond'] text-xl italic text-[#c8a47e]">Agentwise</p><nav className="flex flex-wrap gap-x-5 gap-y-2"><a href="#how-it-works">About</a><a href="#library">Explore</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a></nav><div className="flex gap-4"><a aria-label="Agentwise on Instagram" href="https://www.instagram.com/"><FiInstagram /></a><a aria-label="Agentwise on X" href="https://x.com/"><FiTwitter /></a><a aria-label="Agentwise on LinkedIn" href="https://www.linkedin.com/"><FiLinkedin /></a></div></div><p className="mx-auto mt-8 max-w-[1320px] text-xs text-[#666]">© 2026 Agentwise. All rights reserved.</p></footer>
    </main>
  );
}
