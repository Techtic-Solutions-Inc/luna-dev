import { FormEvent, useState } from 'react'
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '',
  headers: { 'Content-Type': 'application/json' },
})

const marketingImages = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=700&q=85',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=700&q=85',
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=700&q=85',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=700&q=85',
  'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=700&q=85',
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=700&q=85',
]

function AgentwiseLogo({ dark = false }: { dark?: boolean }) {
  return (
    <a
      href="/home"
      className={`inline-block text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d2aa80] ${dark ? 'text-[#d2aa80]' : 'text-white'}`}
      aria-label="Agentwise home"
    >
      <span className="block font-display text-[31px] italic leading-6 tracking-[-0.05em] sm:text-[38px]">Agentwise</span>
      <span className={`mt-1 block text-[4px] font-bold uppercase tracking-[0.28em] ${dark ? 'text-[#a78360]' : 'text-white'}`}>
        Real Estate Marketing
      </span>
    </a>
  )
}

function GoldButton({ children, type = 'button', onClick, disabled = false }: {
  children: string
  type?: 'button' | 'submit'
  onClick?: () => void
  disabled?: boolean
}) {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className="rounded-full bg-[#b28c66] px-5 py-2 text-[10px] font-bold text-white transition hover:bg-[#c8a47e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d2aa80] disabled:cursor-not-allowed disabled:opacity-60">
      {children}
    </button>
  )
}

function ContentPreview({ image, label }: { image: string; label: string }) {
  return (
    <article className="relative h-[135px] min-w-[104px] overflow-hidden rounded-[3px] bg-[#7c695d] sm:h-[220px] sm:min-w-[170px]">
      <img src={image} alt={`${label} real estate marketing example`} className="h-full w-full object-cover" />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3 pb-3 pt-10">
        <p className="font-display text-sm leading-4 text-white sm:text-xl">{label}</p>
      </div>
    </article>
  )
}

function ProductMockup({ light = false }: { light?: boolean }) {
  return (
    <div className={`rounded-sm border border-white/10 p-2 shadow-2xl ${light ? 'bg-[#fbf7f0]' : 'bg-[#171515]'}`}>
      <div className={`flex h-3 items-center gap-1 border-b px-1 ${light ? 'border-[#e5d9c9]' : 'border-white/10'}`}>
        <i className="h-1 w-1 rounded-full bg-[#b28c66]" />
        <i className="h-1 w-1 rounded-full bg-[#b28c66]/50" />
      </div>
      <div className="mt-2 flex gap-2">
        <div className={`w-7 shrink-0 space-y-2 border-r pr-1 ${light ? 'border-[#eadfce]' : 'border-white/10'}`}>
          <i className="block h-1 w-full rounded bg-[#b28c66]" />
          <i className={`block h-1 w-4/5 rounded ${light ? 'bg-[#d9cabb]' : 'bg-white/20'}`} />
          <i className={`block h-1 w-full rounded ${light ? 'bg-[#d9cabb]' : 'bg-white/20'}`} />
          <i className={`block h-1 w-3/5 rounded ${light ? 'bg-[#d9cabb]' : 'bg-white/20'}`} />
        </div>
        <div className="min-w-0 flex-1 space-y-2 py-1">
          <i className={`block h-2 w-3/5 rounded ${light ? 'bg-[#cdb397]' : 'bg-[#927a60]'}`} />
          <div className="grid grid-cols-3 gap-1">
            {marketingImages.slice(0, 3).map((image) => <img key={image} src={image} alt="" className="h-10 w-full object-cover" />)}
          </div>
          <i className={`block h-1.5 w-full rounded ${light ? 'bg-[#dfd0bf]' : 'bg-white/15'}`} />
          <i className={`block h-1.5 w-4/5 rounded ${light ? 'bg-[#dfd0bf]' : 'bg-white/15'}`} />
        </div>
      </div>
    </div>
  )
}

function SignupForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [accepted, setAccepted] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }
    if (!accepted) {
      setError('Please accept the Privacy Policy and Terms of Service.')
      return
    }

    const data = new FormData(form)
    const email = String(data.get('email'))
    setIsLoading(true)
    setError(null)
    setStatus(null)
    try {
      await api.post('/api/visitor/home/subscribe', { email })
      await api.post('/api/visitor/home/terms-acceptance')
      setStatus('Thanks — your Agentwise journey starts here.')
      form.reset()
      setAccepted(false)
    } catch (requestError: unknown) {
      const message = axios.isAxiosError<{ message?: string }>(requestError)
        ? requestError.response?.data.message
        : undefined
      setError(message ?? 'We could not submit your request. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const inputClass = 'h-10 w-full rounded-[3px] border border-white/10 bg-[#211d22] px-3 text-[10px] text-white placeholder:text-[#887f83] focus:border-[#c8a47e] focus:outline-none focus:ring-1 focus:ring-[#c8a47e]'
  return (
    <form onSubmit={(event) => void submit(event)} className="rounded-sm bg-[#151217] p-5 sm:p-7" noValidate>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-[9px] text-[#c8bdc2]">First Name<input className={`${inputClass} mt-1`} name="firstName" required /></label>
        <label className="text-[9px] text-[#c8bdc2]">Last Name<input className={`${inputClass} mt-1`} name="lastName" required /></label>
        <label className="text-[9px] text-[#c8bdc2] sm:col-span-2">Email<input className={`${inputClass} mt-1`} name="email" type="email" autoComplete="email" required /></label>
        <label className="text-[9px] text-[#c8bdc2] sm:col-span-2">Phone number<input className={`${inputClass} mt-1`} name="phone" type="tel" autoComplete="tel" required /></label>
      </div>
      <label className="mt-4 flex cursor-pointer items-start gap-2 text-[9px] leading-4 text-[#aaa0a5]">
        <input checked={accepted} onChange={(event) => setAccepted(event.target.checked)} type="checkbox" className="mt-0.5 h-3 w-3 accent-[#b28c66]" />
        <span>I agree to the <a href="/privacy-policy" className="text-[#d2aa80] underline">Privacy Policy</a> and <a href="/terms-of-service" className="text-[#d2aa80] underline">Terms of Service</a>.</span>
      </label>
      {error && <p role="alert" className="mt-3 text-[10px] text-[#edaaa4]">{error}</p>}
      {status && <p role="status" className="mt-3 text-[10px] text-[#d2aa80]">{status}</p>}
      <div className="mt-4 text-center"><GoldButton type="submit" disabled={isLoading}>{isLoading ? 'Sending…' : 'Get Started'}</GoldButton></div>
    </form>
  )
}

export default function Home() {
  return (
    <main className="overflow-hidden bg-[#080707] font-body text-white">
      <section className="relative isolate overflow-hidden bg-[radial-gradient(circle_at_85%_17%,rgba(105,39,101,.38),transparent_25%),radial-gradient(circle_at_2%_95%,rgba(0,75,51,.42),transparent_36%),linear-gradient(110deg,#120d10_0%,#120a16_52%,#09090b_100%)]">
        <div className="mx-auto max-w-[1180px] px-6 pb-14 pt-6 sm:px-10 lg:px-12 lg:pb-28">
          <header className="flex items-center justify-between">
            <AgentwiseLogo />
            <nav className="hidden items-center gap-7 text-[8px] text-[#d7d1d4] md:flex" aria-label="Primary navigation">
              <a href="#home" className="hover:text-[#d2aa80]">Home</a><a href="#services" className="hover:text-[#d2aa80]">Services</a><a href="#blog" className="hover:text-[#d2aa80]">Blog</a><a href="#contact" className="hover:text-[#d2aa80]">Contact</a>
            </nav>
            <a href="#contact" className="rounded-full border border-[#b28c66] px-3 py-1 text-[8px] text-[#d2aa80]">Get Started</a>
          </header>
          <div id="home" className="mt-16 grid items-center gap-10 lg:mt-28 lg:grid-cols-[.82fr_1.18fr]">
            <div>
              <h1 className="max-w-[430px] font-display text-[42px] leading-[.92] text-white sm:text-[58px] lg:text-[66px]">Stunning Real Estate Marketing, Personalized To Your Market In Minutes.</h1>
              <p className="mt-6 max-w-[340px] text-[10px] leading-5 text-[#b9b0b4]">Create content that makes your real estate business stand out — without the hours of design work.</p>
              <div className="mt-5 flex gap-3" aria-label="Social media links"><i className="h-4 w-4 rounded-full bg-[#4185db]" /><i className="h-4 w-4 rounded-full bg-[#ed6b72]" /><i className="h-4 w-4 rounded-full bg-[#5da6e7]" /><i className="h-4 w-4 rounded-full bg-[#5671ad]" /></div>
            </div>
            <div className="relative mx-auto w-full max-w-[660px]">
              <div className="ml-4 rounded bg-[#151517] p-4 shadow-2xl sm:ml-16 sm:p-6"><p className="text-[9px] text-[#d2aa80]">Good Morning, Ava</p><h2 className="mt-2 font-display text-2xl">What are you creating today?</h2><div className="mt-5 h-8 rounded bg-white/[.06]" /><div className="mt-3 grid grid-cols-3 gap-2">{marketingImages.slice(0, 3).map((image) => <img key={image} src={image} alt="" className="h-16 w-full object-cover" />)}</div></div>
              <div className="absolute -bottom-6 right-0 w-[43%] rounded bg-[#5e4938] p-3 text-[8px] text-white shadow-xl">Your post is ready to customize.<div className="mt-2 h-10 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80')] bg-cover" /></div>
            </div>
          </div>
          <p className="mt-14 text-center text-[9px] text-[#d2aa80]">— with Agentwise, your AI-powered marketing assistant —</p>
        </div>
      </section>

      <section className="bg-white py-10 text-[#241d1d] sm:py-14">
        <h2 className="text-center font-display text-[30px] sm:text-[40px]">Marketing That Stops The Scroll</h2>
        <p className="mt-1 text-center text-[8px] text-[#8a7e79]">Get professionally designed content that makes people pause and pay attention.</p>
        <div className="mt-6 flex gap-2 overflow-hidden px-2 sm:mt-10 sm:gap-3">{marketingImages.concat(marketingImages).map((image, index) => <ContentPreview key={`${image}-${index}`} image={image} label={index % 2 ? 'Just Listed' : 'Dream Home'} />)}</div>
      </section>

      <section id="services" className="bg-[#11100f] bg-[radial-gradient(#292521_1px,transparent_1px)] bg-[length:5px_5px] py-14 sm:py-24">
        <div className="mx-auto max-w-[850px] px-7">
          <h2 className="text-center font-display text-[34px] sm:text-[48px]">Stunning Marketing, In Three Simple Steps</h2>
          <div className="mt-12 space-y-12 sm:mt-20 sm:space-y-20">
            {[
              ['Step 01', 'Browse The Continuously Updated Collection.', false],
              ['Step 02', 'We Personalize It To Your Business And Market.', true],
              ['Step 03', 'Post, Attract, Engage, And Stand Out.', false],
            ].map(([step, title, light], index) => <div key={String(step)} className={`grid items-center gap-8 sm:grid-cols-2 ${index % 2 ? 'sm:[&>*:first-child]:order-2' : ''}`}><div><p className="text-[9px] text-[#b28c66]">{step}</p><h3 className="mt-3 max-w-[280px] font-display text-[28px] leading-[.95] sm:text-[36px]">{title}</h3><p className="mt-3 max-w-[290px] text-[9px] leading-5 text-[#a7a0a0]">Click Customize to edit the location, market data, images, or branding. Your post is ready in minutes.</p></div><ProductMockup light={Boolean(light)} /></div>)}
          </div>
          <div className="mt-12 grid overflow-hidden rounded sm:grid-cols-2">
            <div className="bg-[#295e4f] p-7"><p className="font-display text-2xl">Agentwise Ultimate Mind</p><p className="mt-3 text-[9px] leading-5 text-white/80">Help real estate professionals create content faster with ready-made templates.</p><div className="mt-4 max-w-[200px]"><ProductMockup light /></div></div>
            <div className="bg-[#115335] p-7"><p className="font-display text-[34px] leading-none">Here’s The Deal...<br /><span className="text-[#d2aa80]">Great Marketing</span> Is<br />Just The Start.</p><p className="mt-4 text-[9px] leading-5 text-white/75">Increase audience engagement through visually appealing social media posts.</p><div className="mt-5"><GoldButton onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>Get Started</GoldButton></div></div>
          </div>
        </div>
      </section>

      <section className="bg-[#fbfaf8] py-14 text-[#241d1d] sm:py-20">
        <div className="mx-auto grid max-w-[890px] gap-10 px-7 sm:grid-cols-[.8fr_1.2fr]">
          <div><h2 className="font-display text-[40px] leading-[.9]">Built For<br /><span className="text-[#c08f62]">Agents Like<br />You.</span></h2><p className="mt-5 text-[9px] leading-5 text-[#837a76]">Everything you need to create marketing that actually gets noticed, all in one place.</p></div>
          <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">{['Real estate focused', 'Made for your market', 'Marketing made simple', 'Content that converts'].map((title, index) => <article key={title} className="border-b border-[#ddd5cf] pb-4"><div className="flex items-center gap-2"><span className="h-5 w-5 rounded-full bg-[#1c1918] text-center text-[9px] leading-5 text-white">{index + 1}</span><h3 className="text-[10px] font-bold">{title}</h3></div><p className="mt-2 text-[8px] leading-4 text-[#827a76]">Built around the way successful agents show up online every day.</p></article>)}</div>
        </div>
      </section>

      <section id="contact" className="bg-[#090909] py-12 sm:py-20">
        <div className="mx-auto grid max-w-[950px] overflow-hidden rounded bg-[#141112] md:grid-cols-2">
          <div className="relative min-h-[290px] bg-[linear-gradient(90deg,rgba(20,16,17,.25),rgba(20,16,17,.7)),url('https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=85')] bg-cover bg-center p-8"><p className="absolute inset-x-5 top-1/2 -translate-y-1/2 text-center font-display text-[34px] leading-[.85]">EVERYONE’S<br />WAITING</p><p className="absolute bottom-7 text-[9px]">It’s day one. The rest is up to you.</p></div>
          <div className="p-6 sm:p-10"><div className="text-center"><span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#a98d6e] text-[#d2aa80]">?</span><h2 className="mt-3 font-display text-[34px]">Let’s Work Together</h2><p className="mt-1 text-[9px] text-[#9b9296]">Leave your details and we’ll be in touch.</p></div><div className="mt-5"><SignupForm /></div></div>
        </div>
      </section>

      <footer className="border-t border-white/[.08] bg-[#080707] px-6 py-8"><div className="mx-auto flex max-w-[1080px] flex-col items-center justify-between gap-5 text-[8px] text-[#9e9699] sm:flex-row"><AgentwiseLogo dark /><nav className="flex gap-4"><a href="#home">Home</a><a href="#services">Services</a><a href="#blog">Blog</a><a href="#contact">Contact Us</a></nav><a href="mailto:hello@agentwisemarketing.com">hello@agentwisemarketing.com</a></div></footer>
    </main>
  )
}
