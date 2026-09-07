export interface NavLink {
  label: string
  href: string
}

export interface GalleryImage {
  src: string
  alt: string
  overlay?: string
}

export const NAV_LINKS: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Content', href: '#content' },
  { label: 'Blog', href: '#blog' },
  { label: 'Pricing', href: '#pricing' },
]

export const FOOTER_NAV_LINKS: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Content', href: '#content' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact Us', href: '#contact' },
]

export const FOOTER_LEGAL_LINKS: NavLink[] = [
  { label: 'Terms of Service', href: '#terms' },
  { label: 'Privacy Policy', href: '#privacy' },
]

export const DEFAULT_GALLERY_IMAGES: GalleryImage[] = [
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
]

export const TESTIMONIALS = [
  {
    quote:
      'The Ultimate Mind has become my second brain for pricing strategy. It pulls comps and pushes back on my assumptions like a seasoned mentor would.',
    name: 'Marcus Donovan',
    company: 'Keller Williams · Denver, CO',
    avatar: '/assets/figma/attlgjgqkngefohwz-large-img6232-1-I2295-3482-65-2289.png',
  },
  {
    quote:
      'My listings actually look like they belong to a top-1% agent now. Three of my last four clients said the marketing is what sold them on hiring me.',
    name: 'Jordan Hayes',
    company: 'eXp Realty · Nashville, TN',
    avatar: '/assets/figma/attlgjgqkngefohwz-large-img6232-2-I2295-3482-65-2287.png',
  },
  {
    quote:
      'Agentwise replaced my entire marketing workflow. What used to take a full Sunday now takes a coffee break — and the content is better than anything I was making in Canva.',
    name: 'Jordan Hayes',
    company: 'eXp Realty · Nashville, TN',
    avatar: '/assets/figma/attlgjgqkngefohwz-large-img6232-3-I2295-3482-65-2290.png',
  },
]
