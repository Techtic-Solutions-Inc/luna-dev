/**
 * Static marketing copy from Figma frames until visitor API ships.
 * Sources: .luna/figma/blog.png, .luna/figma/pricing-2.png
 */

export const blogExcerpt =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.";

export interface BlogPost {
  id: string;
  category: string;
  title: string;
  featured?: boolean;
  tone: string;
  imageLabel?: string;
}

/** blog.png — 2 featured + 6 grid cards */
export const blogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    category: 'Marketing',
    title: 'Hates To See Me Coming',
    featured: true,
    tone: 'from-color-56 to-color-63',
    imageLabel: 'update one more contract or update your upstairs bathroom',
  },
  {
    id: 'blog-2',
    category: 'Instagram Growth and Strategy',
    title: 'Hates To See Me Coming',
    featured: true,
    tone: 'from-color-63 to-color-64',
  },
  {
    id: 'blog-3',
    category: 'Marketing',
    title: 'Hates To See Me Coming',
    tone: 'from-color-67 to-color-20',
  },
  {
    id: 'blog-4',
    category: 'Marketing',
    title: 'Hates To See Me Coming',
    tone: 'from-color-68 to-color-56',
    imageLabel: 'JUST SOLD',
  },
  {
    id: 'blog-5',
    category: 'Marketing',
    title: 'Hates To See Me Coming',
    tone: 'from-color-69 to-color-72',
  },
  {
    id: 'blog-6',
    category: 'Marketing',
    title: 'Hates To See Me Coming',
    tone: 'from-color-56 to-color-20',
    imageLabel: 'JUST SOLD',
  },
  {
    id: 'blog-7',
    category: 'Marketing',
    title: 'Hates To See Me Coming',
    tone: 'from-color-63 to-color-67',
  },
  {
    id: 'blog-8',
    category: 'Marketing',
    title: 'Hates To See Me Coming',
    tone: 'from-color-64 to-color-68',
  },
];

/** pricing-2.png — shared plan features */
export const pricingFeatures = [
  'Full access to professional-level and personalized content library',
  'Access to Agentwise AI - Ultimate Mind',
  '20 AI-generated template design downloads for your business',
  'Access to training library and marketing round tables',
];

export const pricingPlanDescription =
  'Perfect for the starter agent who needs great content.';

/** pricing-2.png — four tiers */
export const pricingPlans = [
  {
    id: 'starter',
    name: 'Starter Plan',
    monthlyPrice: 29,
    badge: 'Solo Agent',
  },
  {
    id: 'growth',
    name: 'Growth Plan',
    monthlyPrice: 59,
    badge: 'Consistent Presence',
  },
  {
    id: 'pro',
    name: 'Pro Plan',
    monthlyPrice: 99,
    badge: 'Industry Leader',
  },
  {
    id: 'enterprise',
    name: 'Enterprise Plan',
    monthlyPrice: 250,
    badge: 'Team Advantage',
  },
];

/** pricing-2.png — Compare Our Plans table */
export const pricingComparison = {
  title: 'Compare Our Plans',
  columns: [
    { id: 'pro', label: 'Pro Plan ($29)' },
    { id: 'closer', label: 'Closer Plan ($49)' },
  ],
  rows: [
    { feature: 'Template Downloads', pro: '20/month', closer: 'Unlimited' },
    { feature: 'AI Usage', pro: 'Limited', closer: 'Unlimited' },
    { feature: 'AI Captions', pro: false, closer: true },
    { feature: 'Content Calendar', pro: false, closer: true },
    { feature: 'Training Library', pro: true, closer: true },
    { feature: 'Everything in Pro', pro: '—', closer: true },
  ],
};
