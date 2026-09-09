import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { FOOTER_LEGAL_LINKS, type NavLink } from './constants';
import { HomeSectionEmptyState } from './HomeSectionEmptyState';

function SocialIcon({ label, children }: { label: string; children: ReactNode }) {
  return (
    <button
      type="button"
      disabled
      aria-disabled="true"
      aria-label={`${label} (coming soon)`}
      title={`${label} link coming soon`}
      className="flex h-[20px] w-[20px] cursor-not-allowed items-center justify-center text-[#ffffff]/50"
    >
      {children}
    </button>
  );
}

export interface Group33654370SectionProps {
  className?: string;
  navLinks: NavLink[];
  showEmptyState?: boolean;
}

/**
 * Group 33654370 — Home screen section 4/12 (Figma node 2270:16773).
 */
export function Group33654370Section({
  className,
  navLinks,
  showEmptyState = false,
}: Group33654370SectionProps) {
  return (
    <section
      className={cn('home-group-33654370 block w-full', className)}
      data-figma-node="2270:16773"
      aria-label="Site footer"
    >
      <div className="relative w-full bg-[#000000]" data-figma-node="Rectangle 22">
        <div className="relative flex w-full flex-col gap-[30px] px-[var(--spacing-padding-60)] py-[var(--spacing-padding-40)]">
          <div className="relative flex w-full flex-col items-start justify-between gap-[24px] md:flex-row md:items-center">
            <div data-figma-node="Frame 1618873375">
              <p className="font-['Kalam'] text-[32px] font-[400] leading-none text-[#c8a47e]">
                Agentwise
              </p>
              <p className="mt-[4px] font-['Public_Sans'] text-[10px] font-[600] uppercase tracking-[0.12em] text-[#c8a47e]">
                Real Estate Marketing
              </p>
            </div>

            <div className="flex items-center gap-[16px]" data-figma-node="Group 33654336">
              <SocialIcon label="Facebook">
                <span className="font-['Public_Sans'] text-[14px] font-[600]">f</span>
              </SocialIcon>
              <SocialIcon label="X">
                <span className="font-['Public_Sans'] text-[14px] font-[600]">𝕏</span>
              </SocialIcon>
              <SocialIcon label="LinkedIn">
                <span className="font-['Public_Sans'] text-[12px] font-[600]">in</span>
              </SocialIcon>
              <SocialIcon label="Instagram">
                <span className="text-[14px]">◎</span>
              </SocialIcon>
            </div>
          </div>

          <div className="relative w-full min-h-[26.784px]">
            {showEmptyState ? (
              <HomeSectionEmptyState
                title="Navigation links unavailable"
                description="No footer navigation links were returned for this page."
              />
            ) : (
              <nav aria-label="Footer navigation" data-figma-node="List">
                <ul className="home-group-33654370__nav-list flex flex-wrap items-center gap-[30px]">
                  {navLinks.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="home-group-33654370__nav-link">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            <a
              href="mailto:hello@agentwisemarketing.com"
              className="home-group-33654370__email absolute right-0 top-0 transition-colors hover:text-[#c8a47e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a47e]"
              data-figma-node="Mobile App Development"
            >
              hello@agentwisemarketing.com
            </a>
          </div>

          <div className="relative w-full min-h-[17.856px]" data-figma-node="Frame 1618873388">
            <div className="mb-[16px] h-px w-full bg-[#ffffff]/30" aria-hidden="true" />

            <div className="flex flex-col items-start justify-end gap-[12px] md:flex-row md:items-center md:justify-end">
              <div className="flex items-center gap-[8px]">
                {FOOTER_LEGAL_LINKS.map((link, index) => (
                  <span key={link.label} className="flex items-center gap-[8px]">
                    {index > 0 && <span className="text-[#ffffff]/30">|</span>}
                    <a
                      href={link.href}
                      className="home-group-33654370__legal-link transition-colors hover:text-[#ffffff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a47e]"
                    >
                      {link.label}
                    </a>
                  </span>
                ))}
              </div>
            </div>

            <p
              className="home-group-33654370__copyright absolute bottom-0 left-0"
              data-figma-node="© 2026 Agentwise. All Rights Reserved."
            >
              © 2026 Agentwise. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
