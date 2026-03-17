import type { InputHTMLAttributes } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  hint?: string
  error?: string
}

export function Input({ label, hint, error, className, ...props }: Props) {
  return (
    <label className="block">
      {label ? (
        <div className="text-sm font-medium mb-1 text-[color:var(--text)]">
          {label}
        </div>
      ) : null}
      <input
        className={twMerge(
          clsx(
            'focus-ring h-11 w-full rounded-xl2 px-3 bg-white/60 dark:bg-white/5 border border-white/60 dark:border-white/10',
            'placeholder:text-black/40 dark:placeholder:text-white/40',
            error && 'border-peach-500/60',
            className,
          ),
        )}
        {...props}
      />
      {error ? (
        <div className="mt-1 text-xs text-peach-700 dark:text-peach-200">
          {error}
        </div>
      ) : hint ? (
        <div className="mt-1 text-xs text-[color:var(--muted)]">{hint}</div>
      ) : null}
    </label>
  )
}

