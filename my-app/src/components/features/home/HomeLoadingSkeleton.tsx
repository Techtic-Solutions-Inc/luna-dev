import { Skeleton } from '@/components/ui/skeleton'

export function HomeLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[var(--vh-color-105)]">
      <div className="px-[40px] py-[24px]">
        <Skeleton className="h-[32px] w-[140px] rounded-md bg-[#ffffff]/10" />
      </div>

      <div className="px-[40px] py-[60px]">
        <div className="mx-auto grid max-w-[1920px] gap-[60px] lg:grid-cols-2">
          <div className="space-y-[20px]">
            <Skeleton className="h-[52px] w-full max-w-[520px] rounded-md bg-[#ffffff]/10" />
            <Skeleton className="h-[52px] w-full max-w-[480px] rounded-md bg-[#ffffff]/10" />
            <Skeleton className="h-[24px] w-full max-w-[400px] rounded-md bg-[#ffffff]/10" />
            <div className="flex gap-[12px] pt-[10px]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-[36px] w-[36px] rounded-full bg-[#ffffff]/10" />
              ))}
            </div>
          </div>
          <Skeleton className="h-[400px] w-full rounded-[16px] bg-[#ffffff]/10" />
        </div>
      </div>

      <div className="flex flex-col items-center gap-[20px] px-[40px] pb-[80px]">
        <Skeleton className="h-[24px] w-[400px] max-w-full rounded-md bg-[#ffffff]/10" />
        <Skeleton className="h-[44px] w-[160px] rounded-[100px] bg-[#ffffff]/10" />
      </div>

      <div className="bg-[#ffffff] px-[40px] py-[80px]">
        <Skeleton className="mx-auto h-[48px] w-[500px] max-w-full rounded-md bg-[#637381]/20" />
        <Skeleton className="mx-auto mt-[20px] h-[24px] w-[600px] max-w-full rounded-md bg-[#637381]/20" />
        <div className="mt-[40px] flex gap-[20px] overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-[552px] w-[316px] shrink-0 rounded-[24px] bg-[#637381]/20" />
          ))}
        </div>
      </div>
    </div>
  )
}
