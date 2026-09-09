import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Terms = () => (
  <div className="mx-auto max-w-[800px] px-[32px] py-[64px]">
    <h1 className="font-garamond text-[32px] font-medium leading-[41.76px] text-secondary">
      Terms of Service
    </h1>
    <div className="mt-[24px] space-y-[16px] font-almarai text-[16px] leading-[28px] text-muted-foreground">
      <p>
        By using Agentwise, you agree to these Terms of Service. You must provide accurate account
        information and keep your credentials secure. You may not misuse the platform, copy content
        outside permitted use, or attempt to disrupt our services.
      </p>
      <p>
        Agentwise provides marketing content and tools on an as-is basis. We may update features,
        pricing, or these terms with reasonable notice. Continued use after changes constitutes
        acceptance.
      </p>
      <p>
        For questions about these terms, contact us at{' '}
        <a href="mailto:support@agentwise.com" className="text-accent underline-offset-4 hover:underline">
          support@agentwise.com
        </a>
        .
      </p>
    </div>
    <Button asChild variant="outline" className="mt-[32px]">
      <Link to="/signup">Back to Sign up</Link>
    </Button>
  </div>
);

export default Terms;
