import { Card } from '@/components/Card';
import { cn } from '@/lib/cn';

export interface StepCardProps {
  stepNumber: string;
  title: string;
  description: string;
  highlight?: string;
  image?: string;
  className?: string;
}

function highlightedTitle(title: string, highlight?: string) {
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

export function StepCard({ stepNumber, title, description, highlight, image, className }: StepCardProps) {
  return (
    <Card
      gradient
      align="left"
      className={cn(
        'grid gap-10 bg-transparent p-0 shadow-none md:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] md:items-center',
        className,
      )}
    >
      <div className="flex max-w-md flex-col items-start gap-5">
        <p className="inline-flex rounded-100 border border-accent px-4 py-1 font-public-sans text-sm font-medium tracking-wide text-accent">
          {stepNumber}
        </p>
        <h3 className="font-serif text-[32px] font-medium leading-tight text-white md:text-step-title">
          {highlightedTitle(title, highlight)}
        </h3>
        <p className="font-sans text-step-desc text-color-131">{description}</p>
      </div>
      {image ? (
        <img
          src={image}
          alt={`${stepNumber} product preview`}
          className="w-full rounded-24 object-contain object-left shadow-deep"
        />
      ) : null}
    </Card>
  );
}

export default StepCard;
