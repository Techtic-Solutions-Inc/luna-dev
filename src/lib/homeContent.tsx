import type { HomeStep } from '../components/features/HomeContent';

export const DEFAULT_HOME_STEPS: HomeStep[] = [
  {
    stepNumber: 1,
    title: (
      <>
        Browse The <span className="text-accent">Continuously Updated</span> Collection.
      </>
    ),
    description:
      'Explore hundreds of hand-designed templates for social, email, and more. Save the ones that fit your style.',
    imageSrc:
      'https://images.unsplash.com/photo-1611162616305-c69b3fa7dbd6?w=800&h=500&fit=crop',
    imageAlt: 'Content library grid showing marketing templates',
  },
  {
    stepNumber: 2,
    title: (
      <>
        We <span className="text-accent">Personalize It</span> To Your Business And Market.
      </>
    ),
    description:
      'Help real estate professionals create content faster with ready-made templates. Our AI adapts every template to your brand, voice, and local market.',
    imageSrc: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
    imageAlt: 'Personalization interface with branding options',
    reversed: true,
  },
  {
    stepNumber: 3,
    title: (
      <>
        Post, <span className="text-accent">Attract, Engage,</span> And Stand Out.
      </>
    ),
    description:
      'Increase audience engagement through visually appealing social media posts. Download your finished content and share it anywhere.',
    imageSrc: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=500&fit=crop',
    imageAlt: 'Mobile preview of a social media post',
  },
];

export const HOME_PAGE_TITLE = 'Stunning Marketing, In Three Simple Steps';

export const CONTENT_LIBRARY_DESCRIPTION =
  'Hand-designed by our creative team. Personalized by AI to your market. Ready to post in minutes.';
