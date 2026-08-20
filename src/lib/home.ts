import type { HomeSearchItem } from '../types/api';
import { asString, isRecord } from './dashboard';

export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phonePattern = /^[\d\s\-+().]{7,20}$/;

export interface HomeContactForm {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  primary_market: string;
  content_focus: string;
  message: string;
  privacy_policy: boolean;
  terms_of_service: boolean;
}

export const emptyHomeForm: HomeContactForm = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  primary_market: '',
  content_focus: '',
  message: '',
  privacy_policy: false,
  terms_of_service: false,
};

export interface GalleryCard {
  id: string;
  src: string;
  alt: string;
  caption: string;
  italic?: boolean;
}

export const defaultGallery: GalleryCard[] = [
  {
    id: 'gallery-1',
    src: '/assets/figma/content-library.png',
    alt: 'White brick home listing template',
    caption: '[address + times]',
  },
  {
    id: 'gallery-2',
    src: '/assets/figma/blog.png',
    alt: 'Lifestyle cafe marketing template',
    caption: "Phone's busy, I'm doing the best I ever have",
    italic: true,
  },
  {
    id: 'gallery-3',
    src: '/assets/figma/about-us.png',
    alt: 'Courtyard showing template',
    caption: 'Doing showings in [insert neighborhood and city]!',
  },
  {
    id: 'gallery-4',
    src: '/assets/figma/content-list.png',
    alt: 'City street neighborhood template',
    caption: "If I was moving to [City Name], here's where I'd visit first (as a local)",
  },
  {
    id: 'gallery-5',
    src: '/assets/figma/content-details.png',
    alt: 'Workspace flat-lay marketing template',
    caption: "here's what I'm working on today",
  },
  {
    id: 'gallery-6',
    src: '/assets/figma/content-library-2.png',
    alt: 'Architecture sunset marketing template',
    caption: 'What You Need To Know',
  },
];

export const homeNavItems = [
  { label: 'Apply', href: '#contact' },
  { label: 'Content', href: '#content' },
  { label: 'Blog', href: '#about' },
  { label: 'Pricing', href: '#pricing' },
] as const;

export function validateHomeForm(form: HomeContactForm): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!form.first_name.trim()) errors.first_name = 'First name is required';
  if (!form.last_name.trim()) errors.last_name = 'Last name is required';
  if (!form.email.trim()) errors.email = 'Email is required';
  else if (!emailPattern.test(form.email.trim())) errors.email = 'Enter a valid email';
  if (!form.phone.trim()) errors.phone = 'Phone number is required';
  else if (!phonePattern.test(form.phone.trim())) errors.phone = 'Enter a valid phone number';
  if (!form.privacy_policy) errors.privacy_policy = 'Please accept the Privacy Policy';
  if (!form.terms_of_service) errors.terms_of_service = 'Please accept the Terms of Service';
  return errors;
}

function readSearchItem(value: unknown, index: number): HomeSearchItem | null {
  if (!isRecord(value)) return null;
  const id = asString(value.id) ?? `search-${index}`;
  const title = asString(value.title) ?? asString(value.name) ?? '';
  const description = asString(value.description) ?? asString(value.content) ?? '';
  const image =
    asString(value.image) ??
    asString(value.image_url) ??
    asString(value.link) ??
    defaultGallery[index % defaultGallery.length]?.src ??
    '/assets/figma/content-library.png';
  const caption = asString(value.caption) ?? title;
  if (!title && !caption && !description) return null;
  return {
    id,
    title,
    description,
    image,
    caption: caption || title,
    link: asString(value.link) ?? null,
  };
}

export function normalizeHomeSearchItems(payload: object): HomeSearchItem[] {
  if (!isRecord(payload)) return [];
  const data = isRecord(payload.data) ? payload.data : payload;
  const source = Array.isArray(data)
    ? data
    : Array.isArray(data.items)
      ? data.items
      : Array.isArray(data.results)
        ? data.results
        : [];
  return source
    .map((item, index) => readSearchItem(item, index))
    .filter((item): item is HomeSearchItem => item !== null);
}

export function galleryFromSearch(items: HomeSearchItem[]): GalleryCard[] {
  return items.map((item, index) => ({
    id: item.id,
    src: item.image || defaultGallery[index % defaultGallery.length]?.src || item.image,
    alt: item.title || item.caption || 'Marketing template',
    caption: item.caption || item.title,
  }));
}

export function downloadFromUrl(url: string, filename: string): void {
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.rel = 'noopener';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}
