import { useVisitorHome, useVisitorHomeErrorMessage } from '@/hooks/useVisitorHome';
import { VisitorHomeView } from '@/components/features/visitor-home/VisitorHomeView';
import {
  visitorFontAlmarai,
  visitorFontPublicSans,
} from '@/components/features/visitor-home/chrome';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';
import { ErrorState } from '@/components/shared/ErrorState';
import { EmptyState } from '@/components/shared/EmptyState';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const query = useVisitorHome();
  const errorMessage = useVisitorHomeErrorMessage(query.error);
  const items = query.data?.items ?? [];

  if (query.isLoading) {
    return <LoadingSkeleton />;
  }

  if (query.isError) {
    return (
      <div className="visitor-home bg-[#11161c]" style={{ fontFamily: visitorFontAlmarai }}>
        <div className="mx-auto max-w-[720px] px-[24px] py-[24px]">
          <ErrorState
            title="Unable to load home content"
            message={errorMessage}
            onRetry={() => {
              void query.refetch();
            }}
            className="border-[#ff5630]/40"
          />
        </div>
        <VisitorHomeView items={[]} />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div
        className="visitor-home flex min-h-screen items-center justify-center bg-[#11161c] px-[30px] py-[60px]"
        style={{ fontFamily: visitorFontAlmarai }}
      >
        <EmptyState
          title="No Content Available"
          description="Home content has not been published yet."
          className="border-[#637381] text-[#11161c]"
          action={
            <Button
              type="button"
              className="typo-public bg-[#c8a47e] text-[#11161c] hover:bg-[#8b6842] hover:text-[#11161c]"
              style={{
                fontFamily: visitorFontPublicSans,
                color: '#11161c',
                backgroundColor: '#c8a47e',
              }}
              onClick={() => {
                void query.refetch();
              }}
            >
              Refresh
            </Button>
          }
        />
      </div>
    );
  }

  return <VisitorHomeView items={items} />;
}
