import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '../../lib/utils'

type Variant = 'solid-light' | 'solid-dark' | 'outline-light' | 'outline-dark' | 'gold'

const variants: Record<Variant, string> = {
  'solid-light':
    'border-ivory bg-ivory text-charcoal hover:border-gold hover:bg-gold hover:text-charcoal',
  'solid-dark':
    'border-charcoal bg-charcoal text-ivory hover:border-gold hover:bg-gold hover:text-charcoal',
  'outline-light':
    'border-ivory/35 bg-transparent text-ivory hover:border-ivory hover:bg-ivory hover:text-charcoal',
  'outline-dark':
    'border-charcoal/25 bg-transparent text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-ivory',
  gold: 'border-gold bg-gold text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-ivory',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: Variant
  showIcon?: boolean
  fullWidth?: boolean
}

export function Button({
  children,
  variant = 'solid-dark',
  showIcon = true,
  fullWidth = false,
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'group inline-flex min-h-12 items-center justify-center gap-3 border px-6 py-3.5 text-[10px] font-medium uppercase tracking-[0.22em] transition-colors duration-500 disabled:pointer-events-none disabled:opacity-40',
        fullWidth && 'w-full',
        variants[variant],
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      {showIcon && (
        <ArrowUpRight
          className="size-3.5 shrink-0 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      )}
    </button>
  )
}
