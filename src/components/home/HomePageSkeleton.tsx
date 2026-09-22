import { Skeleton } from "@/components/ui/skeleton";
import { SiteFooter } from "@/components/home/SiteFooter";
import { SiteHeader } from "@/components/home/SiteHeader";

export function HomePageSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main id="main" className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <Skeleton className="h-12 w-full max-w-lg" />
            <Skeleton className="h-12 w-full max-w-md" />
            <Skeleton className="h-24 w-full max-w-xl" />
            <div className="flex gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-9 w-9 rounded-full" />
              ))}
            </div>
          </div>
          <Skeleton className="h-[400px] w-full rounded-2xl lg:h-[500px]" />
        </div>
        <div className="mt-16 flex justify-center gap-4 overflow-hidden">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-[400px] w-[240px] shrink-0 rounded-3xl"
            />
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
