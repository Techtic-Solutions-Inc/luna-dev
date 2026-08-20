export interface ContentCard {
  id: string;
  title: string;
  gradient: string;
}

export const contentCards: ContentCard[] = [
  {
    id: 'coffee-homes',
    title: 'Coffee & Homes',
    gradient: 'linear-gradient(180deg, var(--color-68) 0%, var(--color-43) 100%)',
  },
  {
    id: 'modern-living',
    title: 'Modern Living',
    gradient: 'linear-gradient(180deg, var(--color-67) 0%, var(--color-20) 100%)',
  },
  {
    id: 'luxury-estates',
    title: 'Luxury Estates',
    gradient: 'linear-gradient(180deg, var(--color-69) 0%, var(--color-16) 100%)',
  },
  {
    id: 'open-house',
    title: 'Open House',
    gradient: 'linear-gradient(180deg, var(--accent) 0%, var(--color-56) 100%)',
  },
  {
    id: 'market-update',
    title: 'Market Update',
    gradient: 'linear-gradient(180deg, var(--color-63) 0%, var(--color-66) 100%)',
  },
  {
    id: 'neighborhood',
    title: 'Neighborhood',
    gradient: 'linear-gradient(180deg, var(--color-68) 0%, var(--color-41) 100%)',
  },
];

export const testimonials = [
  {
    id: 't1',
    quote:
      'Agentwise cut my content creation time in half. The templates look polished and my engagement has never been higher.',
    name: 'Sarah Mitchell',
    role: 'Realtor, Austin TX',
  },
  {
    id: 't2',
    quote:
      'I finally have marketing that matches the quality of my listings. Clients notice the difference on social immediately.',
    name: 'James Porter',
    role: 'Broker, Denver CO',
  },
  {
    id: 't3',
    quote:
      'The Ultimate Mind planner keeps me consistent. I open Agentwise every morning and my pipeline feels organized.',
    name: 'Ina Rodriguez',
    role: 'Agent, Miami FL',
  },
  {
    id: 't4',
    quote:
      'Customize lets me swap market stats and branding in minutes. It feels built specifically for agents like me.',
    name: 'David Chen',
    role: 'Team Lead, Seattle WA',
  },
];
