import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MARKETING_GALLERY_IMAGES } from '../constants';
import { AppSidebar } from './AppSidebar';
import { MockWindow } from './MockWindow';

export function ContentDetailDashboard({ className }: { className?: string }) {
  const cards = MARKETING_GALLERY_IMAGES.slice(0, 4);

  return (
    <MockWindow className={cn('relative min-h-[460px]', className)}>
      <div className="flex min-h-[460px]">
        <AppSidebar active="Content Library" />
        <div className="min-w-0 flex-1 p-[18px]">
          <h3 className="font-['EB_Garamond'] text-[22px] font-[500] text-[#ffffff]">
            The Complete Agentwise Content Library
          </h3>
          <div className="mt-[14px] grid grid-cols-2 gap-[10px] opacity-50">
            {cards.map((card) => (
              <img
                key={card.src}
                src={card.src}
                alt=""
                aria-hidden="true"
                className="h-[120px] w-full rounded-[12px] object-cover"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="absolute inset-y-[18px] right-[18px] w-[min(320px,46%)] overflow-hidden rounded-[16px] bg-[#f7f2ec] p-[14px] shadow-[0_34px_44px_#00000072]">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-['EB_Garamond'] text-[16px] font-[500] text-[#1a1a1a]">
              Market update — Austin Q2
            </p>
            <p className="font-['Almarai'] text-[11px] text-[#666666]">Instagram Reel</p>
          </div>
          <button
            type="button"
            className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#ffffff] text-[#1a1a1a]"
            aria-label="Close preview"
          >
            <X className="h-[12px] w-[12px]" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-[10px] flex flex-wrap gap-[6px]">
          <span className="rounded-[100px] bg-[#1a1a1a] px-[10px] py-[4px] font-['Almarai'] text-[10px] text-[#ffffff]">
            Customize
          </span>
          <span className="rounded-[100px] bg-[#c8a47e] px-[10px] py-[4px] font-['Almarai'] text-[10px] text-[#11161c]">
            Copy Caption
          </span>
        </div>
        <div className="relative mt-[12px]">
          <button
            type="button"
            className="absolute left-[-6px] top-1/2 z-10 flex h-[22px] w-[22px] -translate-y-1/2 items-center justify-center rounded-full bg-[#ffffff] text-[#1a1a1a] shadow-sm"
            aria-label="Previous template"
          >
            <ArrowLeft className="h-[12px] w-[12px]" aria-hidden="true" />
          </button>
          <img
            src={cards[0]?.src ?? MARKETING_GALLERY_IMAGES[0].src}
            alt="Market update template preview"
            className="mx-auto h-[160px] w-[110px] rounded-[12px] object-cover"
          />
          <button
            type="button"
            className="absolute right-[-6px] top-1/2 z-10 flex h-[22px] w-[22px] -translate-y-1/2 items-center justify-center rounded-full bg-[#ffffff] text-[#1a1a1a] shadow-sm"
            aria-label="Next template"
          >
            <ArrowRight className="h-[12px] w-[12px]" aria-hidden="true" />
          </button>
        </div>
        <p className="mt-[12px] font-['EB_Garamond'] text-[14px] font-[500] text-[#1a1a1a]">
          About This Template
        </p>
        <p className="mt-[4px] font-['Almarai'] text-[11px] leading-[16px] text-[#666666]">
          A ready-to-post market update reel personalized to your city, your brand, and this
          quarter&apos;s numbers.
        </p>
      </div>
    </MockWindow>
  );
}
