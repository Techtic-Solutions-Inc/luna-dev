import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { LinkList } from './LinkList'
import { FOOTER_NAV_LINKS, NAV_LINKS, type NavLink } from './constants'

function SocialIcon({ label, children }: { label: string; children: ReactNode }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="flex h-[20px] w-[20px] items-center justify-center text-[#ffffff] transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--vh-cta-primary)]"
    >
      {children}
    </a>
  )
}

interface HomeHeaderProps {
  navLinks?: NavLink[]
}

export function HomeHeader({ navLinks = NAV_LINKS }: HomeHeaderProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <header className="relative z-20 w-full py-[24px]">
      <div className="mx-auto flex max-w-[1920px] items-center justify-between gap-[12px]">
        <Link
          to="/visitor/home"
          className="vh-font-kalam text-[28px] font-[400] leading-none text-[#ffffff] transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--vh-cta-primary)]"
          aria-label="Agentwise home"
        >
          Agentwise
        </Link>

        <div className="hidden items-center lg:flex">
          <LinkList links={navLinks} className="gap-[30px]" />
        </div>

        <div className="flex items-center gap-[12px]">
          <Dialog open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
            <DialogTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className="vh-btn-outline h-[44px] w-[44px] px-0 lg:hidden"
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </Button>
            </DialogTrigger>
            <DialogContent className="border-[var(--vh-color-103)] bg-[var(--vh-color-103)] text-[#ffffff]">
              <DialogHeader>
                <DialogTitle className="vh-font-eb-garamond text-left text-[#ffffff]">
                  Menu
                </DialogTitle>
              </DialogHeader>
              <nav
                aria-label="Mobile navigation"
                className="flex flex-col gap-[16px]"
                onClick={() => setMobileNavOpen(false)}
              >
                <LinkList links={navLinks} className="flex-col items-start gap-[16px]" />
                <Button asChild className="vh-btn-accent h-[44px] w-full">
                  <a href="#get-started">Get Started</a>
                </Button>
              </nav>
            </DialogContent>
          </Dialog>

          <Button asChild className="vh-btn-outline hidden h-[44px] px-[20px] sm:inline-flex">
            <a href="#get-started">Get Started</a>
          </Button>
          <Button asChild className="vh-btn-accent-tan h-[44px] px-[20px]">
            <Link to="/">Log in</Link>
          </Button>
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
            className="vh-font-almarai vh-body text-[#ffffff] transition-colors hover:text-[var(--vh-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--vh-cta-primary)]"
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
              className="vh-font-almarai text-[14px] font-[400] text-[#ffffff]/50 transition-colors hover:text-[#ffffff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--vh-cta-primary)]"
            >
              Terms of Service
            </a>
            <span className="text-[#ffffff]/30">|</span>
            <a
              href="#privacy"
              className="vh-font-almarai text-[14px] font-[400] text-[#ffffff]/50 transition-colors hover:text-[#ffffff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--vh-cta-primary)]"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
