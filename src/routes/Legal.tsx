import AuthShell from '@/components/layout/AuthShell';

interface LegalDocumentProps {
  title: string;
  body: string;
}

function LegalDocument({ title, body }: LegalDocumentProps) {
  return (
    <AuthShell>
      <article className="flex w-full max-w-[461px] flex-col gap-[20px] font-almarai">
        <h1 className="text-center font-garamond text-heading-xl-35 text-sofia-secondary">
          {title}
        </h1>
        <p className="text-body-16 text-sofia-background">{body}</p>
      </article>
    </AuthShell>
  );
}

export function TermsOfUse() {
  return (
    <LegalDocument
      title="Terms of Use"
      body="By creating an Agentwise account you agree to use the platform for lawful real estate marketing, keep your login credentials confidential, and follow applicable advertising rules in your market."
    />
  );
}

export function PrivacyPolicy() {
  return (
    <LegalDocument
      title="Privacy Policy"
      body="Agentwise collects the name and email you submit at sign up so we can create your account, send service messages, and process password reset requests. We do not sell this information."
    />
  );
}
