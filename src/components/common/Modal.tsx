import type { PropsWithChildren } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from './Button'

type Props = PropsWithChildren<{
  open: boolean
  title: string
  onClose(): void
}>

export function Modal({ open, title, onClose, children }: Props) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            className="glass relative w-full max-w-lg rounded-xl2 shadow-glass p-4"
            initial={{ y: 18, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 18, opacity: 0, scale: 0.98 }}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <div className="font-serif text-2xl tracking-tight">{title}</div>
                <div className="text-sm text-[color:var(--muted)]">
                  Keep it lightweight, but accurate.
                </div>
              </div>
              <Button
                aria-label="Close"
                variant="ghost"
                size="sm"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

