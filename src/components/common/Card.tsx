import type { HTMLAttributes } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

type Props = HTMLAttributes<HTMLDivElement> & {
  tone?: 'default' | 'danger'
}

export function Card({ className, tone = 'default', ...props }: Props) {
  return (
    <div
      className={twMerge(
        clsx(
          'glass shadow-glass rounded-xl2 p-4',
          tone === 'danger' && 'border-peach-400/40',
          className,
        ),
      )}
      {...props}
    />
  )
}

