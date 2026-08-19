import { FiArrowRight, FiCheckCircle, FiShield } from 'react-icons/fi';
import AppShell from '../layout/AppShell';

export default function Home() {
  return (
    <AppShell>
      <section className="overflow-hidden rounded-xl border border-white/10 bg-[radial-gradient(circle_at_top_right,_rgba(110,50,130,0.25),_transparent_40%),linear-gradient(135deg,_#1c1916,_#0b0b0b)] px-6 py-10 sm:px-10 sm:py-14">
        <p className="text-sm text-[#c8a47e]">Agentwise workspace</p>
        <h1 className="mt-3 max-w-2xl font-['EB_Garamond'] text-4xl leading-tight text-white sm:text-5xl">
          Your frontend foundation is ready.
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-6 text-[#bdbdbd] sm:text-base">
          Build secure, thoughtful real estate marketing experiences from this
          production-ready application shell.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#foundation"
            className="inline-flex items-center gap-2 rounded-full bg-[#c8a47e] px-5 py-3 text-sm font-semibold text-[#14100d] transition hover:bg-[#efe4d9]"
          >
            Explore foundation
            <FiArrowRight aria-hidden="true" />
          </a>
        </div>
      </section>

      <section
        id="foundation"
        aria-labelledby="foundation-heading"
        className="mt-6 grid gap-4 md:grid-cols-2"
      >
        <article className="rounded-xl border border-white/10 bg-[#14100d] p-6">
          <FiCheckCircle
            className="text-xl text-[#c8a47e]"
            aria-hidden="true"
          />
          <h2
            id="foundation-heading"
            className="mt-5 font-['EB_Garamond'] text-2xl text-white"
          >
            Design system connected
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#bdbdbd]">
            Figma color, typography, spacing, radius, and visual-effect tokens
            are available through the shared theme.
          </p>
        </article>
        <article className="rounded-xl border border-white/10 bg-[#14100d] p-6">
          <FiShield className="text-xl text-[#c8a47e]" aria-hidden="true" />
          <h2 className="mt-5 font-['EB_Garamond'] text-2xl text-white">
            Authentication ready
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#bdbdbd]">
            The API client uses the configured environment URL and attaches the
            saved bearer token to authenticated requests.
          </p>
        </article>
      </section>
    </AppShell>
  );
}
