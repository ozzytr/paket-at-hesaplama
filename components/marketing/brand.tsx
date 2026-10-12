import { PackageOpen } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap sm:gap-2.5" aria-label="PAKET AT">
      <span className={cn('flex items-center justify-center rounded-lg bg-primary text-primary-foreground', compact ? 'size-8' : 'size-8 sm:size-9')}>
        <PackageOpen className={compact ? 'size-5' : 'size-5 sm:size-6'} strokeWidth={2.1} aria-hidden="true" />
      </span>
      <span className={cn('font-heading font-extrabold tracking-[-0.055em]', compact ? 'text-lg' : 'text-xl sm:text-[23px]')}>
        PAKET AT<span className="text-primary">.</span>
      </span>
    </span>
  )
}
