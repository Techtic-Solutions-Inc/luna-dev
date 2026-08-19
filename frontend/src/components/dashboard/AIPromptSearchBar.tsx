import { useState, type FormEvent } from 'react';
import { SearchIcon } from '@/components/icons';
import {
  askDashboardQuestion,
  getDashboardQuestionErrorMessage,
} from '@/lib/api/dashboard';

interface AIPromptSearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
}

export function AIPromptSearchBar({
  value: controlledValue,
  onChange,
}: AIPromptSearchBarProps) {
  const [internalValue, setInternalValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const value = controlledValue ?? internalValue;

  const handleChange = (next: string) => {
    if (onChange) {
      onChange(next);
    } else {
      setInternalValue(next);
    }
    setAnswer(null);
    setError(null);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const message = value.trim();
    if (!message || loading) return;

    setLoading(true);
    setError(null);
    setAnswer(null);

    try {
      const response = await askDashboardQuestion({ message });
      if (response.answer) {
        setAnswer(response.answer);
      }
    } catch (submitError) {
      setError(getDashboardQuestionErrorMessage(submitError));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <form onSubmit={handleSubmit} className="relative">
        <label htmlFor="dashboard-ai-prompt" className="sr-only">
          AI prompt search
        </label>
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#858585]" />
        <input
          id="dashboard-ai-prompt"
          type="search"
          value={value}
          onChange={(event) => handleChange(event.target.value)}
          placeholder="Generate captions, listing descriptions, email blasts, and Reels scripts in your brand voice."
          className="focus-ring h-12 w-full rounded-full border border-white/10 bg-[#1f1b17] py-3 pl-12 pr-5 text-sm text-white placeholder:text-[#858585] sm:h-[52px] sm:text-[15px]"
          disabled={loading}
        />
      </form>

      {loading ? (
        <p className="text-sm text-[#A6A4A2]" aria-live="polite">
          Generating response…
        </p>
      ) : null}

      {error ? (
        <p className="text-sm text-[#ff5630]" role="alert">
          {error}
        </p>
      ) : null}

      {answer ? (
        <div
          className="rounded-[12px] border border-white/5 bg-[#1f1b17] px-4 py-3 text-sm leading-6 text-[#fdfdfd]"
          aria-live="polite"
        >
          {answer}
        </div>
      ) : null}
    </div>
  );
}
