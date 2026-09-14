import type { ReactNode } from 'react';
import type { NavLink } from '@/types/home';
import { FOOTER_LEGAL_LINKS, FOOTER_NAV_LINKS } from './constants';
import { HOME_PAGE_INSET_CLASS, HOME_SECTION_STACK_CLASS } from './homeSectionLayout';

function SocialIcon({ label, children }: { label: string; children: ReactNode }) {
  return (
    <button
      type="button"
      disabled
      aria-disabled="true"
      aria-label={`${label} (coming soon)`}
      title={`${label} link coming soon`}
      className="flex h-5 w-5 cursor-not-allowed items-center justify-center text-[#ffffff]/50"
    >
      {children}
    </button>
  );
}

export interface Group33654370SectionProps {
  navLinks?: NavLink[];
}

/**
 * Group 33654370 — Home screen section 4/8 (Figma node 2270:16773).
 */
export function Group33654370Section({ navLinks = FOOTER_NAV_LINKS }: Group33654370SectionProps) {
  return (
    <section
      className={`home-group-33654370 ${HOME_SECTION_STACK_CLASS} block w-full`}
      data-figma-node="2270:16773"
      aria-label="Site footer"
    >
      <div className="w-full bg-[#000000]" data-figma-node="Rectangle 22">
        <div className={`flex w-full flex-col gap-8 py-10 lg:py-[var(--spacing-padding-40)] ${HOME_PAGE_INSET_CLASS}`}>
          <div className="flex w-full flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-9" data-figma-node="Frame 1618873375">
              <p className="font-['Kalam'] text-[32px] font-normal leading-none text-[#c8a47e]">
                Agentwise
              </p>
              <p className="font-['Public_Sans'] text-[10px] font-semibold uppercase tracking-[0.12em] text-[#c8a47e]">
                Real Estate Marketing
              </p>
            </div>

            <div className="flex items-center gap-4" data-figma-node="Group 33654336">
              <SocialIcon label="Facebook">
                <span className="font-['Public_Sans'] text-[14px] font-semibold">f</span>
              </SocialIcon>
              <SocialIcon label="X">
                <span className="font-['Public_Sans'] text-[14px] font-semibold">𝕏</span>
              </SocialIcon>
              <SocialIcon label="LinkedIn">
                <span className="font-['Public_Sans'] text-[12px] font-semibold">in</span>
              </SocialIcon>
              <SocialIcon label="Instagram">
                <span className="text-[14px]">◎</span>
              </SocialIcon>
            </div>
          </div>

          <div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <nav aria-label="Footer navigation" data-figma-node="List">
              <ul className="flex flex-wrap items-center gap-0">
                {navLinks.map((link, index) => (
                  <li
                    key={link.label}
                    className={index < navLinks.length - 1 ? 'mr-8' : undefined}
                  >
                    <a href={link.href} className="home-group-33654370__nav-link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <a
              href="mailto:hello@agentwisemarketing.com"
              className="home-group-33654370__email shrink-0 transition-colors hover:text-[#c8a47e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a47e]"
              data-figma-node="Mobile App Development"
            >
              hello@agentwisemarketing.com
            </a>
          </div>

          <div className="flex w-full flex-col gap-4" data-figma-node="Frame 1618873388">
            <div className="h-px w-full bg-[#ffffff]/30" aria-hidden="true" />

            <div className="flex flex-wrap items-center gap-4 md:justify-end">
              {FOOTER_LEGAL_LINKS.map((link, index) => (
                <span key={link.label} className="flex items-center gap-4">
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
            className="home-group-33654370__copyright m-0"
            data-figma-node="© 2026 Agentwise. All Rights Reserved."
          >
            © 2026 Agentwise. All Rights Reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
