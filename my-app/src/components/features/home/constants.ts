import type { GalleryImage, HomeTestimonial, NavLink } from '@/types/home';

/** Figma asset for Mask group → Ld0PDcExWUGrmN6c7l8cvcjcsJk 1 (node 2289:17245) */
export const HOME_MASK_IMAGE = '/assets/figma/ld0pdcexwugrmn6c7l8cvcjcsjk-1-2289-17245.png';

/** Figma export for Frame 2147227816 (node 2270:14191) — Content Library preview source */
export const HOME_FRAME_2147227816_IMAGE =
  '/assets/figma/frame-2147227816-2270-14191.png';

/** Figma export for Frame 2147227817 (node 2270:14193) — Ultimate Mind preview source */
export const HOME_FRAME_2147227817_IMAGE =
  '/assets/figma/frame-2147227817-2270-14193.png';

/** Figma export for Frame 2147227818 (node 2270:14699) — Content detail preview source */
export const HOME_FRAME_2147227818_IMAGE =
  '/assets/figma/frame-2147227818-2270-14699.png';

/** Agent portrait for contact / waitlist left panel */
export const HOME_CONTACT_AGENT_IMAGE =
  '/assets/figma/attlgjgqkngefohwz-large-img6232-1-I2295-3482-65-2289.png';

export const ULTIMATE_MIND_INTRO_COPY = {
  heading: 'Agentwise Ultimate Mind',
  body:
    'A bold, strategic AI advisor trained on your market, your business, and the realities of residential real estate. Brainstorm campaigns, pressure-test pricing, develop your growth plan, and get a second opinion 24/7 from a partner who actually knows your business.',
} as const;

export const ULTIMATE_MIND_SECTION_12_COPY = {
  heading: 'See Ultimate Mind In Action',
  body:
    'Explore starter prompts, chat with your market-trained advisor, and preview the strategic guidance available inside every Agentwise plan.',
} as const;

export type Testimonial = HomeTestimonial;

export const NAV_LINKS: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Content', href: '#content' },
  { label: 'Blog', href: '#blog' },
  { label: 'Pricing', href: '#pricing' },
];

export const FOOTER_NAV_LINKS: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Content', href: '#content' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact Us', href: '#contact' },
];

export const FOOTER_LEGAL_LINKS: NavLink[] = [
  { label: 'Terms of Service', href: '#terms' },
  { label: 'Privacy Policy', href: '#privacy' },
];

export const MARKETING_GALLERY_IMAGES: GalleryImage[] = [
  {
    src: '/assets/figma/frame-2147227818-2270-14699.png',
    alt: 'Modern interior',
  },
  {
    src: '/assets/figma/attlgjgqkngefohwz-large-img6232-1-I2295-3482-323-1646.png',
    alt: 'Suburban home listing',
    overlay: '[address + times]',
  },
  {
    src: '/assets/figma/attlgjgqkngefohwz-large-img6232-2-I2295-3482-323-1644.png',
    alt: 'Iced drinks on marble table',
    overlay: "Phone's busy, I'm doing the best I ever have",
  },
  {
    src: '/assets/figma/attlgjgqkngefohwz-large-img6232-3-I2295-3482-323-1647.png',
    alt: 'Modern patio courtyard',
    overlay: 'Doing showings in [insert neighborhood and city]!',
  },
  {
    src: '/assets/figma/frame-2147227817-2270-14193.png',
    alt: 'Historic brick building at dusk',
    overlay: "If I was moving to [City Name], here's where I'd visit first (as a local)",
  },
  {
    src: '/assets/figma/frame-2147227828-2270-16985.png',
    alt: 'Desk setup with laptop and headphones',
    overlay: "here's what I'm working on today",
  },
  {
    src: '/assets/figma/frame-2147227827-2270-16929.png',
    alt: 'Glass skyscraper at sunset',
    overlay: 'What You...',
  },
];

export const TESTIMONIAL_PORTRAIT_AVATARS = [
  '/assets/figma/attlgjgqkngefohwz-large-img6232-1-I2295-3482-65-2289.png',
  '/assets/figma/attlgjgqkngefohwz-large-img6232-2-I2295-3482-65-2287.png',
  '/assets/figma/attlgjgqkngefohwz-large-img6232-3-I2295-3482-65-2290.png',
] as const;

export const TESTIMONIALS: HomeTestimonial[] = [
  {
    quote:
      'The Ultimate Mind has become my second brain. I ask it what to post, how to position myself, and it knows my market inside out.',
    name: 'Marcus Donovan',
    company: 'Keller Williams · Denver, CO',
    avatar: TESTIMONIAL_PORTRAIT_AVATARS[0],
  },
  {
    quote:
      'I went from posting once a week to daily content that actually looks like me. My engagement tripled in the first month.',
    name: 'Jordan Hayes',
    company: 'eXp Realty · Nashville, TN',
    avatar: TESTIMONIAL_PORTRAIT_AVATARS[1],
  },
  {
    quote:
      'Our team of 12 agents all use Agentwise now. The content library alone saved us thousands in design costs.',
    name: 'Sarah Chen',
    company: 'Compass · Austin, TX',
    avatar: TESTIMONIAL_PORTRAIT_AVATARS[2],
  },
  {
    quote:
      "Finally, marketing that doesn't feel generic. Every template feels like it was made for my neighborhood.",
    name: 'David Okonkwo',
    company: 'RE/MAX · Charlotte, NC',
    avatar: TESTIMONIAL_PORTRAIT_AVATARS[0],
  },
  {
    quote:
      'The content calendar keeps me consistent without the stress. I open the app Monday morning and my week is planned.',
    name: 'Emily Rodriguez',
    company: 'Coldwell Banker · Miami, FL',
    avatar: TESTIMONIAL_PORTRAIT_AVATARS[1],
  },
  {
    quote:
      "As a new agent, Agentwise gave me the marketing presence of someone who's been in the business for years.",
    name: 'Tyler Brooks',
    company: 'Century 21 · Portland, OR',
    avatar: TESTIMONIAL_PORTRAIT_AVATARS[2],
  },
];
