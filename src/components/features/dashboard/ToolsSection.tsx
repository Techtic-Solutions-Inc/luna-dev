import { LuArrowUpRight } from 'react-icons/lu';
import Button from '../../ui/Button';
import Card from '../../ui/Card';

export default function ToolsSection() {
  const startSession = () => {
    const search = document.querySelector<HTMLInputElement>('input[name="prompt"]');
    search?.focus();
  };

  return (
    <section id="tools" aria-labelledby="tools-heading">
      <h2 id="tools-heading" className="font-garamond text-2xl font-medium text-secondary">
        Your Tools
      </h2>
      <p className="mt-1 font-almarai text-sm text-[var(--color-57)]">Two places to do the work.</p>
      <Card className="mt-5 flex flex-col gap-4 bg-[var(--color-20)] p-5 sm:flex-row sm:items-center sm:justify-between">
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
        <Button
          className="self-start px-5 py-2.5 sm:self-center"
          aria-label="Start an Ultimate Mind session"
          onClick={startSession}
        >
          Start a session
          <LuArrowUpRight size={16} aria-hidden="true" />
        </Button>
      </Card>
    </section>
  );
}
