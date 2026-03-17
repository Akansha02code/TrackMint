import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function ProgressBar({
  value,
  className,
}: {
  value: number
  className?: string
}) {
  const clamped = Math.max(0, Math.min(1, value))
  const danger = value > 1
  return (
    <div
      className={twMerge(
        clsx(
          'h-2 w-full rounded-full bg-black/10 dark:bg-white/10 overflow-hidden',
          className,
        ),
      )}
    >
      <div
        className={clsx(
          'h-full rounded-full transition-[width] duration-500',
          danger ? 'bg-peach-500' : 'bg-mint-500',
        )}
        style={{ width: `${Math.min(1, clamped) * 100}%` }}
      />
    </div>
  )
}

