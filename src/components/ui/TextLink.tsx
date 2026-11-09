import type { ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '../../lib/utils'

interface TextLinkProps {
  children: ReactNode
  onClick?: () => void
  href?: string
  className?: string
  tone?: 'dark' | 'light'
  showArrow?: boolean
  ariaLabel?: string
}

export function TextLink({
  children,
  onClick,
  href,
  className,
  tone = 'dark',
  showArrow = true,
  ariaLabel,
}: TextLinkProps) {
  const classes = cn(
    'group inline-flex items-center gap-2.5 text-[10px] font-medium uppercase tracking-[0.22em] transition-colors duration-300',
    tone === 'dark' ? 'text-charcoal hover:text-gold-deep' : 'text-ivory hover:text-gold-light',
    className,
  )

  const content = (
    <>
      <span className="relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-500 group-hover:after:origin-left group-hover:after:scale-x-100">
        {children}
      </span>
      {showArrow && (
        <ArrowUpRight
          className="size-3.5 shrink-0 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      )}
    </>
  )

  if (href) {
    return (
      <a href={href} className={classes} aria-label={ariaLabel}>
        {content}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} className={classes} aria-label={ariaLabel}>
      {content}
    </button>
  )
}
