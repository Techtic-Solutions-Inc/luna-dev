import { BookIcon, SparklesIcon } from '@/components/icons';
import type { PromptLibraryItem } from '@/types/api';

interface PromptLibraryListProps {
  items: PromptLibraryItem[];
  onSelectPrompt: (prompt: string) => void;
  activePrompt?: string;
}

export function PromptLibraryList({
  items,
  onSelectPrompt,
  activePrompt,
}: PromptLibraryListProps) {
  return (
    <section
      aria-labelledby="dashboard-prompt-library-heading"
      className="rounded-[16px] border border-white/5 bg-[#1f1b17]/80 p-5 md:rounded-[20px] md:p-6"
    >
      <div className="mb-4 flex items-center gap-2">
        <BookIcon className="h-4 w-4 text-primary" />
        <h2
          id="dashboard-prompt-library-heading"
          className="font-display text-[20px] text-white sm:text-[22px]"
        >
          Prompt Library
        </h2>
      </div>

      <ul className="space-y-3">
        {items.map((item) => {
          const isActive = activePrompt === item.prompt;

          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onSelectPrompt(item.prompt)}
                className={[
                  'focus-ring flex w-full items-start gap-3 rounded-[12px] border px-4 py-3 text-left transition-colors',
                  isActive
                    ? 'border-primary/40 bg-primary/10'
                    : 'border-white/5 bg-[#14100d] hover:border-white/10 hover:bg-white/5',
                ].join(' ')}
                aria-pressed={isActive}
              >
                <SparklesIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="min-w-0">
                  <span className="block text-[11px] uppercase tracking-wide text-[#858585]">
                    {item.category}
                  </span>
                  <span className="mt-1 block text-sm leading-6 text-white">
                    {item.prompt}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
