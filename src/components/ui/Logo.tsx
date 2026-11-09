import { cn } from '../../lib/utils'

interface LogoProps {
  className?: string
  size?: 'default' | 'large'
  onClick?: () => void
}

export function Logo({ className, size = 'default', onClick }: LogoProps) {
  return (
    <a
      href="#top"
      onClick={(event) => {
        if (!onClick) return
        event.preventDefault()
        onClick()
      }}
      aria-label="AUREL Interior Architecture — back to top"
      className={cn('group inline-flex flex-col justify-center leading-none', className)}
    >
      <span
        className={cn(
          'font-serif font-light uppercase tracking-[0.3em] transition-colors duration-500',
          size === 'large' ? 'text-[clamp(2rem,4vw,3rem)]' : 'text-[1.45rem] md:text-[1.6rem]',
        )}
      >
        Aurel
      </span>
      <span
        className={cn(
          'mt-1.5 uppercase tracking-[0.32em] opacity-65 transition-opacity duration-500 group-hover:opacity-90',
          size === 'large' ? 'text-[8px]' : 'text-[6.5px]',
        )}
      >
        Interior Architecture
      </span>
    </a>
  )
}
