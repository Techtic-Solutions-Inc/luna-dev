import { LuArrowUpRight } from 'react-icons/lu';

const ToolsSection = () => (
  <section
    className="rounded-2xl border border-[var(--color-41)] bg-[var(--color-36)] p-6"
    aria-labelledby="tools-heading"
  >
    <h2 id="tools-heading" className="font-garamond text-xl font-medium text-secondary">
      Your Tools
    </h2>
    <p className="mt-1 font-almarai text-sm text-[var(--color-57)]">Two places to do the work.</p>

    <div className="mt-5 flex flex-col gap-4 rounded-xl border border-[var(--color-41)] bg-[var(--color-20)] p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent font-garamond text-lg font-bold text-[var(--color-16)]"
          aria-hidden="true"
        >
          a
        </div>
        <div>
          <p className="font-almarai text-base font-bold text-secondary">Agentwise Ultimate Mind</p>
          <p className="mt-0.5 max-w-md font-almarai text-sm leading-[20px] text-[var(--color-57)]">
            Your strategic AI advisor that knows your market, your brand, and your goals.
          </p>
        </div>
      </div>
      <button
        type="button"
        className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-accent px-5 py-2.5 font-almarai text-sm font-bold text-[var(--color-16)] transition-opacity hover:opacity-90 sm:self-center"
        aria-label="Start an Ultimate Mind session"
      >
        Start a session
        <LuArrowUpRight size={16} aria-hidden="true" />
      </button>
    </div>
  </section>
);

export default ToolsSection;
