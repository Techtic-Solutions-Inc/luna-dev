import { Link } from 'react-router-dom';
import { Card } from './Card';

export interface MarketingContentProps {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  ctaHref?: string;
  ctaLabel?: string;
}

function MarketingCta({ href, label }: { href: string; label: string }) {
  const isExternal = href.startsWith('http');
  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="btn-primary mt-gap-20"
      >
        {label}
      </a>
    );
  }
  return (
    <Link to={href} className="btn-primary mt-gap-20">
      {label}
    </Link>
  );
}

export function MarketingContent({
  title,
  description,
  image,
  imageAlt = '',
  ctaHref,
  ctaLabel = 'Learn More',
}: MarketingContentProps) {
  return (
    <Card gradient rounded className="p-section-pad md:p-12">
      <div className="grid items-center gap-section md:grid-cols-2">
        <div>
          <h3 className="font-garamond text-section-heading font-medium leading-tight text-white">
            {title}
          </h3>
          <p className="mt-gap-16 font-almarai text-body-18 text-color-134">{description}</p>
          {ctaHref ? <MarketingCta href={ctaHref} label={ctaLabel} /> : null}
        </div>
        {image ? (
          <div className="overflow-hidden rounded-16 shadow-mockup">
            <img src={image} alt={imageAlt} className="h-auto w-full object-cover" />
          </div>
        ) : null}
      </div>
    </Card>
  );
}
