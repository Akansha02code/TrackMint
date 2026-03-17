import type { ButtonHTMLAttributes } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'danger'
  size?: 'sm' | 'md'
}

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: Props) {
  const base =
    'focus-ring inline-flex items-center justify-center gap-2 rounded-xl2 font-medium transition active:translate-y-[1px] disabled:opacity-50 disabled:pointer-events-none'
  const sizes = size === 'sm' ? 'h-9 px-3 text-sm' : 'h-11 px-4 text-sm'
  const variants =
    variant === 'primary'
      ? 'bg-base-950 text-white hover:bg-base-900 shadow-card'
      : variant === 'danger'
        ? 'bg-peach-600 text-white hover:bg-peach-700 shadow-card'
        : 'bg-transparent hover:bg-white/20 dark:hover:bg-white/10'

  return (
    <button
      className={twMerge(clsx(base, sizes, variants, className))}
      {...props}
    />
  )
}

