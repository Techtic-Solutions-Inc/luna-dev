import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Privacy = () => (
  <div className="mx-auto max-w-[800px] px-[32px] py-[64px]">
    <h1 className="font-garamond text-[32px] font-medium leading-[41.76px] text-secondary">
      Privacy Policy
    </h1>
    <div className="mt-[24px] space-y-[16px] font-almarai text-[16px] leading-[28px] text-muted-foreground">
      <p>
        Agentwise collects account information you provide at registration, including your name,
        email address, and usage data needed to deliver the service. We use this information to
        authenticate you, personalize content, and improve the product.
      </p>
      <p>
        We do not sell your personal information. Data is stored securely and shared only with
        service providers required to operate the platform, or when required by law.
      </p>
      <p>
        You may request access to or deletion of your account data by contacting{' '}
        <a href="mailto:privacy@agentwise.com" className="text-accent underline-offset-4 hover:underline">
          privacy@agentwise.com
        </a>
        .
      </p>
    </div>
    <Button asChild variant="outline" className="mt-[32px]">
      <Link to="/signup">Back to Sign up</Link>
    </Button>
  </div>
);

export default Privacy;
