import Card from '../ui/Card';

interface StepCardProps {
  stepNumber: number;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  reversed?: boolean;
}

const StepCard = ({
  stepNumber,
  title,
  description,
  imageSrc,
  imageAlt,
  reversed = false,
}: StepCardProps) => (
  <article
    className={[
      'flex flex-col gap-gap-24 desktop:gap-gap-50 desktop:items-center',
      reversed ? 'desktop:flex-row-reverse' : 'desktop:flex-row',
    ].join(' ')}
    aria-labelledby={`step-${stepNumber}-title`}
  >
    <div className="flex-1 flex flex-col gap-gap-16 desktop:gap-gap-20">
      <span
        className="inline-flex self-start items-center justify-center rounded-radius-8 bg-accent px-padding-12 py-padding-6 font-almarai text-body-sm-106 font-bold text-color-16"
        aria-label={`Step ${stepNumber}`}
      >
        Step {String(stepNumber).padStart(2, '0')}
      </span>
      <h1
        id={`step-${stepNumber}-title`}
        className="font-garamond text-heading-xl-37 text-secondary capitalize"
      >
        {title}
      </h1>
      <p className="font-almarai text-body-34 text-text-secondary max-w-lg">{description}</p>
    </div>

    <div className="flex-1 w-full">
      <Card
        variant="gradient"
        className="rounded-radius-20 shadow-drop-shadow-18 p-padding-16"
      >
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-auto rounded-radius-12 object-cover"
          loading="lazy"
        />
      </Card>
    </div>
  </article>
);

export default StepCard;
