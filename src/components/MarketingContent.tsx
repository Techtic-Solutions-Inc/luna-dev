import { Card } from '@/components/Card';
import { cn } from '@/lib/cn';
import type { MarketingStep } from '@/types/home';

export interface MarketingContentProps {
  title: string;
  steps: MarketingStep[];
  className?: string;
}

function highlightedTitle(title: string, highlight: string) {
  if (!highlight || !title.includes(highlight)) {
    return <span>{title}</span>;
  }
  const index = title.lastIndexOf(highlight);
  const before = title.slice(0, index);
  const after = title.slice(index + highlight.length);
  return (
    <>
      {before}
      <span className="text-accent">{highlight}</span>
      {after}
    </>
  );
}

export function MarketingContent({ title, steps, className }: MarketingContentProps) {
  return (
    <section className={cn('bg-grid bg-color-105', className)} aria-labelledby="marketing-steps-heading">
      <div className="mx-auto max-w-content px-6 py-24 md:px-16 lg:px-20">
        <h2
          id="marketing-steps-heading"
          className="mb-20 text-center font-serif text-4xl font-medium text-white md:text-5xl lg:text-[56px] lg:leading-[1.1]"
        >
          {title}
        </h2>

        <ol className="flex flex-col gap-50">
          {steps.map((step) => (
            <li key={step.label}>
              <Card
                gradient={false}
                align="left"
                className="grid gap-10 bg-transparent p-0 shadow-none md:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] md:items-center"
              >
                <div className="flex max-w-md flex-col items-start gap-5">
                  <span className="inline-flex rounded-100 border border-accent px-4 py-1 font-public-sans text-sm font-semibold tracking-wide text-accent">
                    {step.label}
                  </span>
                  <h3 className="font-serif text-3xl font-medium leading-tight text-white md:text-step-title">
                    {highlightedTitle(step.title, step.highlight)}
                  </h3>
                  <p className="font-sans text-step-desc text-color-131">{step.description}</p>
                </div>
                <img
                  src={step.image}
                  alt={`${step.label} product preview`}
                  className="w-full rounded-24 object-cover object-left shadow-deep"
                />
              </Card>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
