import { PageHeader } from '@/components/shared/PageHeader';
import ProfileForm from '@/components/features/ProfileForm';

export default function ProfilePage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-gap-24">
      <PageHeader
        title="Profile"
        description="Review the account attached to your current session."
      />
      <ProfileForm />
    </div>
  );
}
