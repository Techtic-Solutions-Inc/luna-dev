import type { HomeContent, HomeLink, MarketingItem } from '../types/home';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function parseLinks(value: unknown): HomeLink[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.flatMap((item) => {
    if (!isRecord(item)) {
      return [];
    }
    const label = item.label;
    const href = item.href;
    if (typeof label !== 'string' || typeof href !== 'string') {
      return [];
    }
    return [{ label, href }];
  });
}

function parseMarketing(value: unknown): MarketingItem[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.flatMap((item) => {
    if (!isRecord(item)) {
      return [];
    }
    const title = item.title;
    const description = item.description;
    const image = item.image;
    if (typeof title !== 'string' || typeof description !== 'string') {
      return [];
    }
    return [
      {
        title,
        description,
        image: typeof image === 'string' ? image : undefined,
      },
    ];
  });
}

export function parseHomeContent(value: unknown): HomeContent | null {
  if (!isRecord(value)) {
    return null;
  }
  const headings = Array.isArray(value.headings)
    ? value.headings.filter((item): item is string => typeof item === 'string')
    : [];
  const links = parseLinks(value.links);
  const marketing = parseMarketing(value.marketing);
  if (headings.length === 0 && links.length === 0 && marketing.length === 0) {
    return null;
  }
  return { headings, links, marketing };
}

export const FALLBACK_HOME_CONTENT: HomeContent = {
  headings: [
    'Built For Agents Like You.',
    "Here's the deal… Great Marketing is Just the Start.",
    'Hundreds',
    'Marketing that stops the scroll',
    'A custom business dashboard and a personalized AI advisor built into every plan.',
    'Stunning marketing',
    'in three simple steps',
    'Hand-designed by our creative team. Personalized by AI to your market. Ready to post in minutes.',
    'New agents, team leaders, and large brokerages are using Agentwise to spend less time marketing and more time closing without sacrificing quality.',
  ],
  links: [
    { label: 'App', href: '/about' },
    { label: 'Learn More', href: '/learn-more' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Get Started', href: '/signup' },
    { label: 'Log in', href: '/signin' },
    { label: 'Join', href: '/signup' },
    { label: 'Blog', href: '/blog' },
    { label: 'Content', href: '/content' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Contact Us', href: '/contact' },
  ],
  marketing: [
    {
      title: 'Stunning marketing, in three simple steps',
      description: 'Browse the continuously updated collection.',
      image: '/assets/figma/frame-2147227816-2270-14191.png',
    },
  ],
};
