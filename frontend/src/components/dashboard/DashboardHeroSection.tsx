import type { ReactNode } from 'react';
import { AnnouncementsCarousel } from '@/components/dashboard/AnnouncementsCarousel';
import type { DashboardAnnouncement } from '@/types/api';

interface DashboardHeroSectionProps {
  headline: string;
  description: string;
  promptSearch: ReactNode;
  actionButtons: ReactNode;
  announcements: DashboardAnnouncement[];
  announcementsLoading?: boolean;
}

export function DashboardHeroSection({
  headline,
  description,
  promptSearch,
  actionButtons,
  announcements,
  announcementsLoading = false,
}: DashboardHeroSectionProps) {
  return (
    <section
      aria-labelledby="dashboard-hero-heading"
      className="relative overflow-hidden rounded-[16px] border border-white/5 bg-[#1f1b17]/90 p-5 md:rounded-[20px] md:p-6 lg:p-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 left-1/4 h-48 w-48 rounded-full bg-[#8B7355]/20 blur-3xl"
      />

      <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start lg:gap-8">
        <div className="space-y-4">
          <div>
            <h2
              id="dashboard-hero-heading"
              className="font-display text-[22px] font-medium leading-tight text-primary sm:text-[28px]"
            >
              {headline}
            </h2>
            <p className="mt-2 max-w-[560px] text-sm leading-6 text-[#A6A4A2] sm:text-[15px] sm:leading-7">
              {description}
            </p>
          </div>

          <div className="space-y-4">
            {promptSearch}
            {actionButtons}
          </div>
        </div>

        <AnnouncementsCarousel
          items={announcements}
          loading={announcementsLoading}
        />
      </div>
    </section>
  );
}
