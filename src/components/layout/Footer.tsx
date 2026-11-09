import { ArrowUpRight } from 'lucide-react'
import { navItems, services } from '../../data/content'
import { scrollToTop } from '../../lib/utils'
import { Logo } from '../ui/Logo'

interface FooterProps {
  onStartProject: () => void
}

const year = new Date().getFullYear()

export function Footer({ onStartProject }: FooterProps) {
  return (
    <footer className="border-t border-ivory/10 bg-charcoal text-ivory">
      <div className="container-aurel">
        <div className="grid grid-cols-1 gap-y-12 border-b border-ivory/10 py-14 sm:grid-cols-2 md:grid-cols-12 md:gap-6 md:py-16">
          <div className="sm:col-span-2 md:col-span-4">
            <Logo size="large" className="text-ivory" onClick={scrollToTop} />
            <p className="mt-7 max-w-[34ch] text-[13px] font-light leading-[1.85] text-ivory/55">
              An interior architecture and design studio shaping calm, enduring spaces for private
              homes, hospitality and considered commercial work.
            </p>
            <button
              type="button"
              onClick={onStartProject}
              className="group mt-7 flex min-h-11 items-center gap-3 text-[10px] font-medium uppercase tracking-[0.22em] text-ivory/75 transition-colors hover:text-ivory"
            >
              <span className="border-b border-ivory/25 pb-1 transition-colors group-hover:border-gold">
                Start a project
              </span>
              <ArrowUpRight
                className="size-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.25}
                aria-hidden="true"
              />
            </button>
          </div>

          <div className="md:col-span-2 md:col-start-6">
            <p className="eyebrow text-[8px] text-ivory/60">Explore</p>
            <ul className="mt-4 space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-block py-1.5 text-[12px] text-ivory/65 transition-colors duration-300 hover:text-gold-light"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="eyebrow text-[8px] text-ivory/60">Services</p>
            <ul className="mt-4 space-y-2">
              {services.map((service) => (
                <li key={service.id}>
                  <a
                    href="#services"
                    className="inline-block py-1.5 text-[12px] leading-[1.5] text-ivory/65 transition-colors duration-300 hover:text-gold-light"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow text-[8px] text-ivory/60">Studios</p>
            <div className="mt-5 space-y-5 text-[12px] leading-[1.75] text-ivory/65">

              <div>
                <p className="text-ivory/80">London</p>
                <p>14 Marylebone Lane</p>
                <p>London W1U 2NF</p>
              </div>
              <div>
                <p className="text-ivory/80">Copenhagen</p>
                <p>Bredgade 24</p>
                <p>1260 København K</p>
              </div>
              <div className="pt-1">
                <a
                  href="mailto:studio@aurel.design"
                  className="link-line inline-block py-1 text-ivory/75 transition-colors hover:text-ivory"
                >
                  studio@aurel.design
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 border-b border-ivory/10 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="eyebrow text-[7.5px] text-ivory/60">
            © {year} AUREL Studio
            <span className="hidden sm:inline">
              <span className="mx-2">/</span> All rights reserved
            </span>
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {['Instagram', 'Pinterest', 'LinkedIn'].map((social) => (
              <a
                key={social}
                href={`https://www.${social.toLowerCase()}.com`}
                target="_blank"
                rel="noreferrer noopener"
                className="py-2 text-[9px] uppercase tracking-[0.18em] text-ivory/60 transition-colors hover:text-gold-light"
              >
                {social}
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="group flex min-h-11 items-center gap-2.5 self-start text-[9px] uppercase tracking-[0.2em] text-ivory/55 transition-colors hover:text-ivory sm:self-auto"
          >
            Back to top
            <span className="flex size-8 items-center justify-center border border-ivory/15 transition-colors group-hover:border-gold/60">
              <ArrowUpRight className="size-3.5 -rotate-45" strokeWidth={1.25} aria-hidden="true" />
            </span>
          </button>
        </div>

        <div className="overflow-hidden pb-4 pt-8 md:pb-8">
          <div
            className="footer-watermark select-none whitespace-nowrap font-serif text-[clamp(4rem,21vw,19rem)] font-light leading-[0.8] tracking-[0.03em] text-ivory/[0.07]"
            aria-hidden="true"
          />
        </div>
      </div>
    </footer>
  )
}
