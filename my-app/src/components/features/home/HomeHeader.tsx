import { Link } from 'react-router-dom'
import { LinkList } from './LinkList'
import { FOOTER_NAV_LINKS, NAV_LINKS } from './constants'

function SocialIcon({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="flex h-[20px] w-[20px] items-center justify-center text-[#ffffff] transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--vh-accent)]"
    >
      {children}
    </a>
  )
}

export function HomeHeader() {
  return (
    <header className="relative z-20 w-full px-[40px] py-[24px]">
      <div className="mx-auto flex max-w-[1920px] items-center justify-between">
        <Link
          to="/visitor/home"
          className="vh-font-kalam text-[28px] font-[400] leading-none text-[#ffffff] transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--vh-accent)]"
          aria-label="Agentwise home"
        >
          Agentwise
        </Link>

        <div className="hidden items-center lg:flex">
          <LinkList links={NAV_LINKS} className="gap-[30px]" />
        </div>

        <div className="flex items-center gap-[12px]">
          <Link
            to="#get-started"
            className="vh-btn-outline h-[44px] px-[20px] hover:text-[#ffffff]"
          >
            Get Started
          </Link>
          <Link to="/" className="vh-btn-accent h-[44px] px-[20px]">
            Log in
          </Link>
        </div>
      </div>
    </header>
  )
}

export function HomeFooter() {
  return (
    <footer className="bg-[var(--vh-color-101)] px-[40px] py-[60px]">
      <div className="mx-auto flex max-w-[1920px] flex-col gap-[30px]">
        <div className="flex flex-col items-start justify-between gap-[24px] md:flex-row md:items-center">
          <div>
            <p className="vh-font-kalam text-[32px] font-[400] leading-none text-[var(--vh-accent)]">
              Agentwise
            </p>
            <p className="vh-font-public-sans mt-[4px] text-[10px] font-[600] uppercase tracking-[0.12em] text-[var(--vh-accent)]">
              Real Estate Marketing
            </p>
          </div>
          <div className="flex items-center gap-[16px]">
            <SocialIcon label="Facebook">
              <span className="vh-font-public-sans text-[14px] font-[600]">f</span>
            </SocialIcon>
            <SocialIcon label="X">
              <span className="vh-font-public-sans text-[14px] font-[600]">𝕏</span>
            </SocialIcon>
            <SocialIcon label="LinkedIn">
              <span className="vh-font-public-sans text-[12px] font-[600]">in</span>
            </SocialIcon>
            <SocialIcon label="Instagram">
              <span className="text-[14px]">◎</span>
            </SocialIcon>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-[24px] md:flex-row md:items-center">
          <LinkList links={FOOTER_NAV_LINKS} variant="footer" className="gap-[30px]" />
          <a
            href="mailto:hello@agentwisemarketing.com"
            className="vh-font-almarai vh-body text-[#ffffff] transition-colors hover:text-[var(--vh-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--vh-accent)]"
          >
            hello@agentwisemarketing.com
          </a>
        </div>

        <div className="h-px w-full bg-[var(--vh-background-muted)]/30" />

        <div className="flex flex-col items-start justify-between gap-[16px] md:flex-row md:items-center">
          <p className="vh-font-almarai text-[14px] font-[400] leading-[17.856px] text-[#ffffff]/50">
            © 2026 Agentwise. All Rights Reserved.
          </p>
          <div className="flex items-center gap-[8px]">
            <a
              href="#terms"
              className="vh-font-almarai text-[14px] font-[400] text-[#ffffff]/50 transition-colors hover:text-[#ffffff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--vh-accent)]"
            >
              Terms of Service
            </a>
            <span className="text-[#ffffff]/30">|</span>
            <a
              href="#privacy"
              className="vh-font-almarai text-[14px] font-[400] text-[#ffffff]/50 transition-colors hover:text-[#ffffff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--vh-accent)]"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
