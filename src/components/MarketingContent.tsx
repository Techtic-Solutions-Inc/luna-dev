import { StepCard } from '@/components/StepCard';
import { cn } from '@/lib/cn';
import type { MarketingStep } from '@/types/home';

export interface MarketingContentProps {
  title: string;
  steps: MarketingStep[];
  className?: string;
}

export function MarketingContent({ title, steps, className }: MarketingContentProps) {
  return (
    <section className={cn('overflow-x-hidden bg-grid bg-color-105', className)} aria-labelledby="marketing-steps-heading">
      <div className="mx-auto max-w-content px-6 py-24 md:px-16 lg:px-20">
        <h2
          id="marketing-steps-heading"
          className="mb-20 text-center font-serif text-4xl font-medium text-white md:text-5xl lg:text-[56px] lg:leading-[1.1]"
        >
          {title}
        </h2>

        {steps.length === 0 ? (
          <p className="text-center font-sans text-step-desc text-color-131" role="status">
            No content is available.
          </p>
        ) : (
          <ol className="flex flex-col gap-50">
            {steps.map((step) => (
              <li key={step.label}>
                <StepCard
                  stepNumber={step.label}
                  title={step.title}
                  description={step.description}
                  highlight={step.highlight}
                  image={step.image}
                />
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
