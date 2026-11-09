import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import { navItems } from '../../data/content'
import { useDialog } from '../../hooks/useUi'
import { EASE, EASE_IN_OUT } from '../../lib/motion'
import { cn, scrollToSection, scrollToTop } from '../../lib/utils'
import type { SectionId } from '../../types'
import { Button } from '../ui/Button'
import { Logo } from '../ui/Logo'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
  onStartProject: () => void
}

export function MobileMenu({ open, onClose, onStartProject }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useDialog({ open, onClose, panelRef, initialFocusRef: closeRef })

  const goTo = (href: string) => {
    onClose()
    const id = href.replace('#', '')
    window.setTimeout(() => scrollToSection(id), 420)
  }

  const startProject = () => {
    onClose()
    window.setTimeout(onStartProject, 420)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          key="mobile-menu"
          id="mobile-menu-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          tabIndex={-1}
          initial={{ y: '-100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.7, ease: EASE_IN_OUT }}
          className="fixed inset-0 z-[90] flex flex-col bg-ivory text-charcoal outline-none"
        >
          <div className="flex h-20 shrink-0 items-center justify-between border-b border-line px-5 md:h-[88px] md:px-10">
            <Logo onClick={() => { onClose(); window.setTimeout(scrollToTop, 300) }} />
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="group flex min-h-11 items-center gap-2.5 text-[10px] font-medium uppercase tracking-[0.22em] text-charcoal/70 transition-colors hover:text-charcoal"
              aria-label="Close menu"
            >
              <span className="hidden sm:inline">Close</span>
              <span className="flex size-10 items-center justify-center border border-charcoal/15 transition-colors group-hover:border-charcoal/50">
                <X className="size-4" strokeWidth={1.25} aria-hidden="true" />
              </span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain px-5 pb-8 pt-8 md:px-10 md:pt-12">
            <nav aria-label="Mobile navigation">
              <ul>
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, delay: 0.18 + index * 0.07, ease: EASE }}
                    className="border-b border-line/80"
                  >
                    <a
                      href={item.href}
                      onClick={(event) => {
                        event.preventDefault()
                        goTo(item.href)
                      }}
                      className="group flex items-baseline justify-between py-4 md:py-5"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="eyebrow text-gold-deep">0{index + 1}</span>
                        <span className="serif-display text-[clamp(2.6rem,9vw,4.2rem)] text-charcoal transition-colors duration-300 group-hover:text-gold-deep">
                          {item.label}
                        </span>
                      </span>
                      <ArrowUpRight
                        className="size-4 text-stone transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        strokeWidth={1.25}
                        aria-hidden="true"
                      />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
              className="mt-9"
            >
              <Button variant="solid-dark" fullWidth onClick={startProject}>
                Start a project
              </Button>

              <div className="mt-8 grid grid-cols-2 gap-6 border-t border-line pt-6">
                <div>
                  <p className="eyebrow text-stone">Enquiries</p>
                  <a
                    href="mailto:studio@aurel.design"
                    className="link-line mt-2 inline-block text-sm text-charcoal/85"
                  >
                    studio@aurel.design
                  </a>
                </div>
                <div>
                  <p className="eyebrow text-stone">Studios</p>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/85">
                    London
                    <br />
                    Copenhagen
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

interface NavbarProps {
  onStartProject: () => void
  activeSection: SectionId | null
}

export function Navbar({ onStartProject, activeSection }: NavbarProps) {
  const [scrolled, setScrolled] = useState(() => window.scrollY > 32)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 32)
  })

  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)')
    const handleChange = () => {
      if (media.matches) setMenuOpen(false)
    }
    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [])

  const solid = scrolled

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-[80] border-b transition-[background-color,border-color,backdrop-filter] duration-500',
          solid
            ? 'border-line/70 bg-ivory/85 backdrop-blur-2xl'
            : 'border-ivory/10 bg-charcoal/30 backdrop-blur-xl',
        )}
      >
        <div
          className={cn(
            'container-aurel flex items-center justify-between transition-[height] duration-500',
            solid ? 'h-[68px]' : 'h-[82px] md:h-[92px]',
          )}
        >
          <Logo
            className={cn(
              'shrink-0 transition-colors duration-500',
              solid ? 'text-charcoal' : 'text-ivory',
            )}
            onClick={scrollToTop}
          />

          <nav aria-label="Primary navigation" className="hidden md:block">
            <ul className="flex items-center gap-5 lg:gap-8">
              {navItems.map((item) => {
                const active = activeSection === item.section
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={active ? 'true' : undefined}
                      className={cn(
                        'group relative flex items-center gap-2 py-2 text-[9px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 lg:text-[10px] lg:tracking-[0.22em]',
                        solid
                          ? active
                            ? 'text-charcoal'
                            : 'text-charcoal/70 hover:text-charcoal'
                          : active
                            ? 'text-ivory'
                            : 'text-ivory/80 hover:text-ivory',
                      )}
                    >
                      <span
                        className={cn(
                          'size-1 bg-gold transition-opacity duration-300',
                          active ? 'opacity-100' : 'opacity-0',
                        )}
                        aria-hidden="true"
                      />
                      {item.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <Button
                variant={solid ? 'outline-dark' : 'outline-light'}
                showIcon={false}
                onClick={onStartProject}
                className="h-10 min-h-0 px-4 py-2.5 text-[9px] tracking-[0.2em] lg:h-11 lg:px-5 lg:text-[10px]"
              >
                Start a project
              </Button>
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className={cn(
                'group flex min-h-11 items-center gap-3 px-1 text-[10px] font-medium uppercase tracking-[0.22em] transition-colors duration-500 md:hidden',
                solid ? 'text-charcoal' : 'text-ivory',
              )}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu-panel"
            >
              <span>Menu</span>
              <span className="flex w-6 flex-col items-end gap-1.5" aria-hidden="true">
                <span className="h-px w-6 bg-current transition-all duration-300 group-hover:w-4" />
                <span className="h-px w-4 bg-current transition-all duration-300 group-hover:w-6" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} onStartProject={onStartProject} />
    </>
  )
}
