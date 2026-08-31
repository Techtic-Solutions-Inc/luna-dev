import { Link } from 'react-router-dom';

const COPY = {
  terms: {
    title: 'Terms of Service',
    paragraphs: [
      'By using Agentwise you agree to use the marketing platform lawfully and only for your own real-estate business. You are responsible for the accuracy of listing details, branding assets, and any waitlist information you submit. Agentwise may update these terms as the product evolves; continued use after an update means you accept the revised terms.',
      'Waitlist access is not a paid subscription. We may decline, pause, or revoke early access if we detect misuse, automated submissions, or content that violates advertising or fair-housing rules. Questions about these terms can be sent to hello@agentwisemarketing.com.',
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    paragraphs: [
      'We collect the name, email, phone number, and marketing details you enter on the waitlist form so we can contact you about Agentwise. That information is used only to operate the waitlist, improve the product, and send related updates you request.',
      'We do not sell your waitlist data. You can ask us to correct or delete your information by emailing hello@agentwisemarketing.com. This page is the privacy notice for the visitor home experience.',
    ],
  },
} as const;

export function LegalPage({ kind }: { kind: keyof typeof COPY }) {
  const page = COPY[kind];

  return (
    <main className="min-h-screen bg-sofia-text-primary px-padding-20 py-padding-60 text-sofia-secondary tablet:px-padding-40 desktop:px-[80px]">
      <div className="mx-auto flex w-full max-w-[720px] flex-col gap-gap-16">
        <Link
          to="/visitor/home"
          className="font-public-sans text-[16px] font-[600] text-sofia-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sofia-accent"
        >
          Back to home
        </Link>
        <h1 className="font-garamond text-[32px] font-[500] leading-[42px] text-sofia-secondary">
          {page.title}
        </h1>
        {page.paragraphs.map((paragraph) => (
          <p
            key={paragraph}
            className="font-almarai text-[16px] font-[400] leading-[26px] text-sofia-background"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </main>
  );
}
