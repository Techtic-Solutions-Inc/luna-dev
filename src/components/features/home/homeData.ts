import type { HomeSearchItem } from '../../../types/visitorHome';

export const GALLERY_FALLBACK_ITEMS: HomeSearchItem[] = [
  {
    id: 'fallback-1',
    title: 'Modern home exterior',
    image_url:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=700&q=85',
    description: 'Just listed marketing template',
  },
  {
    id: 'fallback-2',
    title: 'Luxury kitchen',
    image_url:
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=700&q=85',
    description: 'Dream home showcase',
  },
  {
    id: 'fallback-3',
    title: 'Living room staging',
    image_url:
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=700&q=85',
    description: 'Interior design post',
  },
  {
    id: 'fallback-4',
    title: 'Poolside retreat',
    image_url:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=700&q=85',
    description: 'Luxury listing highlight',
  },
  {
    id: 'fallback-5',
    title: 'Urban loft',
    image_url:
      'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=700&q=85',
    description: 'City living feature',
  },
  {
    id: 'fallback-6',
    title: 'Coastal property',
    image_url:
      'https://images.unsplash.com/photo-1605276374101-dee2a0ed3cd6?auto=format&fit=crop&w=700&q=85',
    description: 'Waterfront listing feature',
  },
];

export const TESTIMONIALS = [
  {
    id: 't1',
    quote:
      'Agentwise transformed how I create social content. What used to take hours now takes minutes.',
    name: 'Marcus Donovan',
    title: 'Real Estate Mentor',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
  },
  {
    id: 't2',
    quote:
      'The templates are gorgeous and the personalization is spot-on for my local market.',
    name: 'Sarah Chen',
    title: 'Luxury Agent, Miami',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
  },
  {
    id: 't3',
    quote:
      'My engagement doubled within the first month. This is a game-changer for agents.',
    name: 'James Rivera',
    title: 'Broker, Austin TX',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
  },
  {
    id: 't4',
    quote: 'Finally, marketing that looks as professional as the properties I sell.',
    name: 'Emily Watson',
    title: 'Team Lead, Denver',
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face',
  },
  {
    id: 't5',
    quote: 'The Ultimate Mind feature saves me so much time on market-specific content.',
    name: 'David Park',
    title: 'Commercial Agent',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face',
  },
  {
    id: 't6',
    quote: 'My clients love the polished look of my social posts. Highly recommend.',
    name: 'Lisa Thompson',
    title: 'Realtor, Seattle',
    avatar:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face',
  },
] as const;
