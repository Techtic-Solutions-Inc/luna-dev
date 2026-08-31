import {
  isVisitorHomeNotFound,
  useVisitorHome,
  useVisitorHomeErrorMessage,
} from '@/hooks/useVisitorHome';
import { VisitorHomeView } from '@/components/features/visitor-home/VisitorHomeView';
import { visitorFontAlmarai } from '@/components/features/visitor-home/chrome';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';
import { ErrorState } from '@/components/shared/ErrorState';

export default function HomePage() {
  const query = useVisitorHome();
  const errorMessage = useVisitorHomeErrorMessage(query.error);
  const items = query.data?.items ?? [];
  const endpointMissing = isVisitorHomeNotFound(query.error);

  if (query.isLoading) {
    return <LoadingSkeleton />;
  }

  if (query.isError && !endpointMissing) {
    return (
      <div
        className="visitor-home min-h-screen bg-[#11161c]"
        style={{ fontFamily: visitorFontAlmarai }}
      >
        <div className="mx-auto max-w-[720px] px-[24px] py-[24px]">
          <ErrorState
            titleAs="h1"
            title="Unable to load home content"
            message={errorMessage}
            onRetry={() => {
              void query.refetch();
            }}
            className="border-[#eaeaea] bg-white text-[#11161c] [&_.text-foreground]:text-[#11161c] [&_.text-muted-foreground]:text-[#637381] [&_.text-destructive-foreground]:text-[#ff5630]"
          />
        </div>
      </div>
    );
  }

  return <VisitorHomeView items={items} />;
}
