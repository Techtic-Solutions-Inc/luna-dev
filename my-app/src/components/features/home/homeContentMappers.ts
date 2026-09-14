import type {
  GalleryImage,
  HomeContentProps,
  HomeItem,
  HomeTestimonial,
  NavLink,
} from '@/types/home';
import { TESTIMONIAL_PORTRAIT_AVATARS } from './constants';

export type { HomeContentProps, HomeSectionAvailability } from '@/types/home';

export function mapApiNavLinks(items: HomeItem[]): NavLink[] {
  return items
    .filter((item) => item.category === 'link' && item.link)
    .map((item) => ({
      label: item.title || item.name,
      href: item.link,
    }));
}

export function mapApiHeadline(items: HomeItem[]): string | undefined {
  const headlineItem = items.find((item) => item.name === 'headline');
  if (headlineItem) {
    return headlineItem.title || headlineItem.description || undefined;
  }

  const hero = items.find((item) => item.category === 'hero');
  return hero?.title || undefined;
}

export function mapApiSubheadline(items: HomeItem[]): string | undefined {
  const subheadlineItem = items.find((item) => item.name === 'subheadline');
  if (subheadlineItem) {
    return subheadlineItem.description || subheadlineItem.title || undefined;
  }

  const hero = items.find((item) => item.category === 'hero');
  return hero?.description || undefined;
}

export function mapApiGalleryImages(items: HomeItem[]): GalleryImage[] {
  return items
    .filter((item) => item.category === 'image' || item.category === 'gallery')
    .map((item) => ({
      src: item.image_url || item.image,
      alt: item.title || item.name || 'Marketing content',
      overlay: item.description || undefined,
    }))
    .filter((image) => Boolean(image.src));
}

function mapTestimonialCompany(item: HomeItem): string {
  if (item.tags?.length) {
    return item.tags.join(' · ');
  }
  return item.title || item.name || 'Agent';
}

export function mapApiTestimonials(items: HomeItem[]): HomeTestimonial[] {
  return items
    .filter((item) => item.category === 'testimonial')
    .map((item, index) => ({
      quote: item.description || item.title,
      name: item.full_name || item.title || item.name,
      company: mapTestimonialCompany(item),
      avatar:
        item.image_url ||
        item.image ||
        TESTIMONIAL_PORTRAIT_AVATARS[index % TESTIMONIAL_PORTRAIT_AVATARS.length],
    }));
}

export function buildHomeContentProps(items: HomeItem[]): HomeContentProps {
  const headline = mapApiHeadline(items);
  const subheadline = mapApiSubheadline(items);
  const galleryImages = mapApiGalleryImages(items);
  const testimonials = mapApiTestimonials(items);
  const navLinks = mapApiNavLinks(items);

  return {
    headline,
    subheadline,
    galleryImages,
    testimonials,
    navLinks,
    sections: {
      hero: Boolean(headline || subheadline),
      gallery: galleryImages.length > 0,
      testimonials: testimonials.length > 0,
      navLinks: navLinks.length > 0,
    },
  };
}
