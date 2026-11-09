import { cn } from '../../lib/utils'

interface SectionLabelProps {
  index: string
  label: string
  tone?: 'dark' | 'light'
  className?: string
}

export function SectionLabel({ index, label, tone = 'dark', className }: SectionLabelProps) {
  return (
    <div className={cn('flex items-center gap-3.5', className)}>
      <span className={cn('eyebrow', tone === 'dark' ? 'text-gold-deep' : 'text-gold')}>{index}</span>
      <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
      <span className={cn('eyebrow', tone === 'dark' ? 'text-stone' : 'text-ivory/60')}>{label}</span>
    </div>
  )
}
